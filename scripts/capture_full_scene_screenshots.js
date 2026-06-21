const fs = require("fs");
const http = require("http");
const path = require("path");
const { chromium } = require("playwright");

const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "docs", "screenshots");

const AREAS = [
  "town_center",
  "restaurant",
  "dragon_card_house",
  "livehouse",
  "echo_lake",
  "care_home",
  "atelier",
  "northern_wilds",
  "server_room",
];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

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

async function waitForImages(page) {
  await page.waitForFunction(() =>
    [...document.images]
      .filter((img) => img.offsetParent !== null)
      .every((img) => img.complete && img.naturalWidth > 0),
    null,
    { timeout: 5000 }
  ).catch(() => {});
}

async function shot(page, name, note, report) {
  await waitForImages(page);
  await page.evaluate(() => {
    if (typeof drawMap === "function") drawMap();
  }).catch(() => {});
  await page.waitForTimeout(450);
  const rel = `docs/screenshots/${name}.png`;
  const full = path.join(ROOT, rel);
  await page.screenshot({ path: full, fullPage: false });
  const stat = fs.statSync(full);
  report.screenshots.push({ name, note, path: rel, bytes: stat.size });
}

async function setArea(page, areaId) {
  await page.evaluate((targetAreaId) => {
    closeDialogue();
    closeModal();
    state.areaId = targetAreaId;
    state.unlockedAreas.add(targetAreaId);
    const point = localToWorld(targetAreaId, 14, 10);
    state.x = point.x;
    state.y = point.y;
    state.time = targetAreaId === "echo_lake" ? "night" : targetAreaId === "livehouse" ? "dusk" : "day";
    const areaCg = (DATA.task_cgs || []).find((cg) => cg.areaIds.includes(targetAreaId));
    const questId = areaCg?.questIds?.find((id) => DATA.quests.some((quest) => quest.id === id));
    if (questId) {
      state.activeQuests = new Set([questId]);
      state.completedQuests.delete(questId);
    }
    updateHud();
    drawMap();
  }, areaId);
}

async function main() {
  ensureDir(OUT_DIR);
  const server = await startStaticServer();
  const baseUrl = `http://127.0.0.1:${server.address().port}/index.html`;
  const report = {
    generatedAt: new Date().toISOString(),
    baseUrl,
    screenshots: [],
    consoleErrors: [],
    missingImages: [],
    taskChecks: [],
    areaChecks: [],
  };

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
  await page.addInitScript(() => {
    window.__XIAOKANG_SCREENSHOT_MODE = true;
  });
  page.on("console", (msg) => {
    if (["error", "warning"].includes(msg.type())) {
      report.consoleErrors.push({ type: msg.type(), text: msg.text() });
    }
  });
  page.on("pageerror", (error) => {
    report.consoleErrors.push({ type: "pageerror", text: error.message });
  });

  await page.goto(baseUrl, { waitUntil: "networkidle" });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: "networkidle" });
  await shot(page, "00_boot_logo", "启动页与 logo 一体性", report);

  await page.click('[data-action="start"]');
  await shot(page, "01_character_select", "角色选择页与 36 名角色资源", report);

  await page.click('.character-choice-detail [data-select]');
  await page.waitForSelector("#gameScreen.is-active");
  await shot(page, "02_game_intro_dialogue", "进入游戏后的开场对话与立绘", report);
  await page.click('[data-action="closeDialogue"]');

  for (const areaId of AREAS) {
    await setArea(page, areaId);
    await shot(page, `area_${areaId}`, `场景地图验收：${areaId}`, report);
    const areaState = await page.evaluate(() => ({
      areaId: state.areaId,
      areaName: document.querySelector("#areaName")?.textContent || "",
      cgName: document.querySelector("#questCgName")?.textContent || "",
      npcCount: npcsForMap().length,
      interactionCount: interactionsForMap().length,
    }));
    report.areaChecks.push(areaState);
  }

  await page.click('[data-action="openQuestLog"]');
  await shot(page, "90_quest_log_with_cg", "任务日志与任务 CG 缩略图", report);
  await page.click('[data-action="closeModal"]');

  await page.click('[data-action="openCgGallery"]');
  await shot(page, "91_task_cg_gallery", "任务特殊 CG 图鉴", report);
  await page.click('[data-action="closeModal"]');

  await page.click('#gameScreen [data-action="openCodex"]');
  await shot(page, "92_codex_art_assets", "角色图鉴与头像资源", report);
  await page.click('[data-action="closeModal"]');

  await page.click('#gameScreen [data-action="openSettings"]');
  await shot(page, "93_settings_panel", "设置面板视觉一致性", report);
  await page.click('[data-action="closeModal"]');

  report.missingImages = await page.evaluate(() =>
    [...document.images]
      .filter((img) => !img.complete || img.naturalWidth === 0)
      .map((img) => img.getAttribute("src") || img.currentSrc || img.alt)
  );

  report.taskChecks = await page.evaluate(() => (DATA.task_cgs || []).map((cg) => ({
    id: cg.id,
    path: cg.path,
    questIds: cg.questIds,
    areaIds: cg.areaIds,
  })));

  await browser.close();
  server.close();
  const reportPath = path.join(ROOT, "docs", "full_scene_screenshot_report.json");
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  const mdLines = [
    "# XiaokangOnline 全场景截图验收",
    "",
    `- 生成时间：${report.generatedAt}`,
    `- 截图数量：${report.screenshots.length}`,
    `- 控制台错误：${report.consoleErrors.length}`,
    `- 缺失图片：${report.missingImages.length}`,
    `- 覆盖区域：${report.areaChecks.length}`,
    `- 任务 CG：${report.taskChecks.length}`,
    "",
  ];
  for (const screenshot of report.screenshots) {
    const relativeFromDocs = screenshot.path.replace(/^docs\//, "");
    mdLines.push(`## ${screenshot.name}`);
    mdLines.push("");
    mdLines.push(screenshot.note);
    mdLines.push("");
    mdLines.push(`![${screenshot.name}](${relativeFromDocs})`);
    mdLines.push("");
  }
  fs.writeFileSync(path.join(ROOT, "docs", "full_scene_screenshot_report.md"), mdLines.join("\n"), "utf8");
  console.log(JSON.stringify({
    screenshots: report.screenshots.length,
    consoleErrors: report.consoleErrors.length,
    missingImages: report.missingImages.length,
    report: "docs/full_scene_screenshot_report.json",
  }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
