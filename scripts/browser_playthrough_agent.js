#!/usr/bin/env node
const fs = require("fs");
const http = require("http");
const path = require("path");
const { chromium } = require("playwright");

const ROOT = path.resolve(__dirname, "..");
const DOCS = path.join(ROOT, "docs");
const MAIN_QUEST_IDS = ["main_quest_01", "main_quest_02", "main_quest_03", "main_quest_04", "main_quest_05"];

function contentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return {
    ".html": "text/html; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".svg": "image/svg+xml",
  }[ext] || "application/octet-stream";
}

function startStaticServer() {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, "http://127.0.0.1");
    const requested = url.pathname === "/" ? "/index.html" : decodeURIComponent(url.pathname);
    const filePath = path.resolve(ROOT, `.${requested}`);
    if (!filePath.startsWith(ROOT) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    res.writeHead(200, { "Content-Type": contentType(filePath) });
    fs.createReadStream(filePath).pipe(res);
  });
  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => resolve(server));
  });
}

async function snapshot(page) {
  return page.evaluate((mainQuestIds) => {
    const mainQuests = mainQuestIds.map((id) => indexes.quests.get(id)).filter(Boolean);
    const active = mainQuests.find((quest) => state.activeQuests.has(quest.id) && !state.completedQuests.has(quest.id));
    const activeStepIndex = active ? getQuestProgress(active.id) : -1;
    const activeStep = active ? active.steps[activeStepIndex] || null : null;
    return {
      screen: state.screen,
      areaId: state.areaId,
      areaName: currentArea()?.name || state.areaId,
      playerId: state.playerId,
      playerName: indexes.characters.get(state.playerId)?.displayName || "",
      x: state.x,
      y: state.y,
      activeQuest: active ? {
        id: active.id,
        name: active.name,
        progress: activeStepIndex,
        total: active.steps.length,
        step: activeStep,
      } : null,
      completedMainQuests: mainQuestIds.filter((id) => state.completedQuests.has(id)),
      activeQuests: [...state.activeQuests],
      unlockedAreas: [...state.unlockedAreas],
      pickedInteractions: [...state.pickedInteractions],
      dialogueOpen: !document.querySelector("#dialogueBox")?.hidden,
      modalOpen: !document.querySelector("#modalLayer")?.hidden,
      modalTitle: document.querySelector("#modalTitle")?.textContent || "",
    };
  }, MAIN_QUEST_IDS);
}

async function canvasPointForTile(page, target) {
  return page.evaluate(({ x, y }) => {
    updateCamera();
    const center = centerOfTile(x, y);
    const rect = canvas.getBoundingClientRect();
    const clientX = rect.left + (center.x / canvas.width) * rect.width;
    const clientY = rect.top + (center.y / canvas.height) * rect.height;
    return {
      clientX,
      clientY,
      inside: clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom,
    };
  }, target);
}

async function clickTile(page, target, report, label) {
  const point = await canvasPointForTile(page, target);
  await page.mouse.click(point.clientX, point.clientY);
  report.clicks += 1;
  report.actions.push({ type: "canvasClick", label, target, insideCanvas: point.inside });
}

async function clickVisibleWaypointToward(page, target, report) {
  const waypoint = await page.evaluate(({ x, y }) => {
    updateCamera();
    const minX = Math.floor(camera.x / TILE) + 1;
    const maxX = Math.floor((camera.x + canvas.width) / TILE) - 2;
    const minY = Math.floor(camera.y / TILE) + 1;
    const maxY = Math.floor((camera.y + canvas.height) / TILE) - 2;
    const desired = {
      x: clamp(Math.round(x), minX, maxX),
      y: clamp(Math.round(y), minY, maxY),
    };
    const entities = [...npcsForWorld(), ...interactionsForWorld(), ...transitionsForWorld()];
    const inside = (point) => point.x >= minX && point.x <= maxX && point.y >= minY && point.y <= maxY;
    const isSafe = (point) =>
      inside(point) &&
      !tileBlocked(point.x, point.y) &&
      entities.every((entity) => Math.hypot(point.x - entity.x, point.y - entity.y) > 1.15);
    let open = null;
    for (let radius = 0; radius <= 6 && !open; radius += 1) {
      const candidates = [];
      for (let dx = -radius; dx <= radius; dx += 1) {
        for (let dy = -radius; dy <= radius; dy += 1) {
          candidates.push({ x: desired.x + dx, y: desired.y + dy });
        }
      }
      open = candidates
        .filter(isSafe)
        .sort((a, b) => Math.hypot(a.x - desired.x, a.y - desired.y) - Math.hypot(b.x - desired.x, b.y - desired.y))[0] || null;
    }
    open ||= nearestOpenTarget(desired.x, desired.y) || desired;
    const center = centerOfTile(open.x, open.y);
    const rect = canvas.getBoundingClientRect();
    return {
      x: open.x,
      y: open.y,
      clientX: rect.left + (center.x / canvas.width) * rect.width,
      clientY: rect.top + (center.y / canvas.height) * rect.height,
    };
  }, target);
  await page.mouse.click(waypoint.clientX, waypoint.clientY);
  report.clicks += 1;
  report.actions.push({ type: "waypointClick", target, waypoint: { x: waypoint.x, y: waypoint.y } });
  await waitForPathIdle(page);
}

async function ensureTileVisible(page, target, report) {
  for (let i = 0; i < 8; i += 1) {
    const point = await canvasPointForTile(page, target);
    if (point.inside) return;
    await clickVisibleWaypointToward(page, target, report);
  }
  throw new Error(`目标位置仍不可见：${target.x},${target.y}`);
}

async function waitForPathIdle(page) {
  await page.waitForFunction(() => state.path.length === 0 && !state.pendingAction, null, { timeout: 15000 });
  await page.waitForTimeout(180);
}

async function entityInfo(page, type, idOrTo) {
  return page.evaluate(({ type, idOrTo }) => {
    const entities = type === "npc"
      ? npcsForWorld()
      : type === "interact"
        ? interactionsForWorld()
        : transitionsForWorld();
    const entity = entities.find((item) =>
      type === "exit" ? item.to === idOrTo : item.id === idOrTo
    );
    if (!entity) return null;
    return {
      id: entity.id || entity.to,
      to: entity.to || null,
      label: entity.label || entity.char?.displayName || entity.to || entity.id,
      type: entity.type,
      areaId: entity.areaId,
      x: entity.x,
      y: entity.y,
    };
  }, { type, idOrTo });
}

async function clickEntity(page, type, idOrTo, report) {
  const entity = await entityInfo(page, type, idOrTo);
  if (!entity) throw new Error(`当前区域找不到 ${type}:${idOrTo}`);
  await ensureTileVisible(page, entity, report);
  await clickTile(page, { x: entity.x, y: entity.y }, report, `${type}:${idOrTo}`);
  await waitForPathIdle(page);
  return entity;
}

async function areaForTarget(page, type, id) {
  return page.evaluate(({ type, id }) => {
    for (const map of DATA.maps) {
      if (type === "npc" && (map.npcs || []).includes(id)) return map.id;
      if (type === "interact" && (map.interactions || []).some((item) => item.id === id)) return map.id;
    }
    return null;
  }, { type, id });
}

async function goToArea(page, targetAreaId, report) {
  for (let i = 0; i < 6; i += 1) {
    const current = await snapshot(page);
    if (current.areaId === targetAreaId) return;
    const nextTarget = current.areaId === "town_center" ? targetAreaId : "town_center";
    const exit = await entityInfo(page, "exit", nextTarget);
    if (!exit) throw new Error(`从 ${current.areaId} 找不到去 ${nextTarget} 的入口`);
    report.actions.push({ type: "navigate", from: current.areaId, to: nextTarget });
    await clickEntity(page, "exit", nextTarget, report);
    await page.waitForFunction((areaId) => state.areaId === areaId, nextTarget, { timeout: 15000 });
    await page.waitForTimeout(260);
  }
  const finalState = await snapshot(page);
  throw new Error(`区域切换失败：目标 ${targetAreaId}，当前 ${finalState.areaId}`);
}

async function drainDialogue(page, report, context) {
  const seen = new Set();
  for (let i = 0; i < 120; i += 1) {
    const info = await page.evaluate(() => {
      const box = document.querySelector("#dialogueBox");
      const choices = [...document.querySelectorAll("#dialogueChoices [data-choice]")].map((button) => ({
        id: button.dataset.choice,
        label: button.textContent.trim(),
      }));
      return {
        open: box && !box.hidden,
        typingDone: state.dialogueTyping.done,
        speaker: document.querySelector("#dialogueSpeaker")?.textContent || "",
        text: document.querySelector("#dialogueText")?.textContent || "",
        choices,
      };
    });
    if (!info.open) return;
    if (info.typingDone && info.text) {
      const key = `${context}:${info.speaker}:${info.text}`;
      if (!seen.has(key)) {
        seen.add(key);
        if (report.dialogueReads.length < 260) {
          report.dialogueReads.push({ context, speaker: info.speaker, text: info.text });
        }
      }
    }
    if (!info.typingDone) {
      await page.evaluate(() => finishDialogueTypewriter());
      await page.waitForTimeout(35);
      continue;
    }
    if (info.choices.length) {
      const choice = info.choices.find((item) => item.label.includes("关于任务")) || info.choices[0];
      await page.click(`[data-choice="${choice.id}"]`);
      report.clicks += 1;
      report.actions.push({ type: "dialogueChoice", context, label: choice.label });
      await page.waitForTimeout(70);
      continue;
    }
    await page.click('[data-action="nextDialogue"]');
    report.clicks += 1;
    await page.waitForTimeout(50);
  }
  throw new Error(`对话没有正常关闭：${context}`);
}

async function playQuestStep(page, report) {
  const before = await snapshot(page);
  const quest = before.activeQuest;
  if (!quest?.step) throw new Error("没有可推进的主线任务");
  const step = quest.step;
  report.questSteps.push({
    questId: quest.id,
    questName: quest.name,
    progress: quest.progress,
    step,
    areaBefore: before.areaId,
  });

  if (step.type === "visit") {
    await goToArea(page, step.target, report);
    return;
  }

  if (step.type === "talk" || step.type === "return") {
    const areaId = await areaForTarget(page, "npc", step.target);
    if (!areaId) throw new Error(`找不到角色所在区域：${step.target}`);
    await goToArea(page, areaId, report);
    await clickEntity(page, "npc", step.target, report);
    await drainDialogue(page, report, `${quest.id}:${step.type}:${step.target}`);
    return;
  }

  if (step.type === "interact") {
    const areaId = await areaForTarget(page, "interact", step.target);
    if (!areaId) throw new Error(`找不到交互物件所在区域：${step.target}`);
    await goToArea(page, areaId, report);
    await clickEntity(page, "interact", step.target, report);
    await drainDialogue(page, report, `${quest.id}:${step.type}:${step.target}`);
    return;
  }

  throw new Error(`游玩 agent 暂不认识任务步骤：${JSON.stringify(step)}`);
}

async function main() {
  fs.mkdirSync(DOCS, { recursive: true });
  const server = await startStaticServer();
  const baseUrl = `http://127.0.0.1:${server.address().port}/index.html`;
  const report = {
    generatedAt: new Date().toISOString(),
    agent: "browser_playthrough_agent",
    baseUrl,
    passed: false,
    clicks: 0,
    rerolls: [],
    questSteps: [],
    dialogueReads: [],
    actions: [],
    consoleMessages: [],
    finalState: null,
    endingScreenshot: null,
  };

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
  page.on("console", (msg) => {
    if (["error", "warning"].includes(msg.type())) report.consoleMessages.push({ type: msg.type(), text: msg.text() });
  });
  page.on("pageerror", (error) => {
    report.consoleMessages.push({ type: "pageerror", text: error.message });
  });

  try {
    await page.goto(baseUrl, { waitUntil: "networkidle" });
    await page.evaluate(() => localStorage.clear());
    await page.reload({ waitUntil: "networkidle" });
    await page.evaluate(() => {
      state.settings.volume = 0;
      state.settings.textSpeed = 3;
    });

    await page.waitForSelector("#bootScreen.is-active [data-action='start']", { timeout: 10000 });
    await page.click("#bootScreen.is-active [data-action='start']");
    report.clicks += 1;
    await page.waitForSelector("#selectScreen.is-active");
    for (let i = 0; i < 3; i += 1) {
      const before = await page.$eval(".character-choice-detail h3", (el) => el.textContent.trim());
      await page.click('[data-action="rollCharacter"]');
      report.clicks += 1;
      await page.waitForTimeout(80);
      const after = await page.$eval(".character-choice-detail h3", (el) => el.textContent.trim());
      report.rerolls.push({ before, after });
    }

    const selectedName = await page.$eval(".character-choice-detail h3", (el) => el.textContent.trim());
    await page.click(".character-choice-detail [data-select]");
    report.clicks += 1;
    await page.waitForSelector("#gameScreen.is-active");
    await page.evaluate(() => {
      state.settings.volume = 0;
      state.settings.textSpeed = 3;
    });
    report.actions.push({ type: "selectedCharacter", name: selectedName });
    await drainDialogue(page, report, "player_intro");

    for (let guard = 0; guard < 60; guard += 1) {
      const current = await snapshot(page);
      if (MAIN_QUEST_IDS.every((id) => current.completedMainQuests.includes(id))) break;
      await playQuestStep(page, report);
      await page.waitForTimeout(220);
    }

    await page.waitForTimeout(600);
    report.finalState = await snapshot(page);
    report.passed =
      MAIN_QUEST_IDS.every((id) => report.finalState.completedMainQuests.includes(id)) &&
      report.finalState.modalOpen &&
      /结局|通关|小康Online/.test(report.finalState.modalTitle);

    const screenshotPath = path.join(DOCS, "browser_playthrough_agent_ending.png");
    await page.screenshot({ path: screenshotPath, fullPage: false });
    report.endingScreenshot = "docs/browser_playthrough_agent_ending.png";

    if (!report.passed) {
      throw new Error(`主线未打通：${JSON.stringify(report.finalState)}`);
    }
  } finally {
    await browser.close();
    server.close();
    fs.writeFileSync(path.join(DOCS, "browser_playthrough_agent_report.json"), `${JSON.stringify(report, null, 2)}\n`, "utf8");
  }

  console.log(JSON.stringify({
    passed: true,
    clicks: report.clicks,
    questSteps: report.questSteps.length,
    completedMainQuests: report.finalState.completedMainQuests,
    selectedRerolls: report.rerolls.length,
    report: "docs/browser_playthrough_agent_report.json",
    endingScreenshot: report.endingScreenshot,
  }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
