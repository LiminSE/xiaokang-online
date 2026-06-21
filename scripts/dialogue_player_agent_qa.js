#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DATA = path.join(ROOT, "src", "data");
const DOCS = path.join(ROOT, "docs");

const readJson = (name) => JSON.parse(fs.readFileSync(path.join(DATA, `${name}.json`), "utf8"));
const writeJson = (file, payload) => fs.writeFileSync(file, `${JSON.stringify(payload, null, 2)}\n`, "utf8");

const dialogues = readJson("dialogues");
const characters = readJson("characters");
const storyDatabase = readJson("story_database");
const cgUnlocks = readJson("cg_unlocks");
const areas = readJson("areas");
const maps = readJson("maps");

const characterIds = new Set(characters.map((char) => char.id));
const areaIds = new Set(areas.map((area) => area.id));
const characterById = new Map(characters.map((char) => [char.id, char]));
const mapById = new Map(maps.map((map) => [map.id, map]));

const forbidden = [
  /高能量发言者|支线入口|装无辜|发光物件|发光物|别问，问就是/,
  /我是.+?(型|者|角色|定位)|我的功能是|作为一个/,
  /手机号|身份证|宿舍|工位|公司|学校|学院|大学|\d{2,4}\s*级/,
  /lolicon|里番|色情|色图|打胶|女大学生|屁股|妹妹/i,
  /\b(task|quest|cg|npc|prompt|agent)\b/i,
];

const weakGeneric = [
  "可以",
  "确实",
  "有内味了",
  "这句能接",
  "别急",
  "这图有说法",
  "接了，别让它掉地上。",
];

function normalizeText(text = "") {
  return String(text).replace(/\s+/g, " ").trim();
}

function lineText(line) {
  return normalizeText(typeof line === "string" ? line : line?.text || "");
}

function speakerOf(line, fallback = "narrator") {
  return typeof line === "string" ? fallback : line?.speaker || fallback;
}

function collectDialogueUnits() {
  const units = [];
  for (const dialogue of dialogues) {
    units.push({
      id: dialogue.id,
      area: dialogue.area,
      speaker: dialogue.speaker,
      source: "dialogues",
      lines: dialogue.lines || [],
    });
    for (const choice of dialogue.choices || []) {
      units.push({
        id: `${dialogue.id}/${choice.id}`,
        area: dialogue.area,
        speaker: dialogue.speaker,
        source: "dialogue_choice",
        lines: choice.lines || [],
      });
    }
  }
  for (const char of characters) {
    units.push({
      id: `${char.id}/playerIntro`,
      area: char.defaultArea,
      speaker: char.id,
      source: "player_intro",
      lines: char.playerIntro || [],
    });
    for (const choice of char.playerIntroChoices || []) {
      units.push({
        id: `${char.id}/playerIntro/${choice.id}`,
        area: char.defaultArea,
        speaker: char.id,
        source: "player_intro_choice",
        lines: choice.lines || [],
      });
    }
  }
  for (const story of storyDatabase.characterStories || []) {
    for (const key of ["entrance", "casual", "task", "deep"]) {
      const lines = story.agentLines?.[key];
      if (Array.isArray(lines)) {
        units.push({
          id: `${story.id}/story/${key}`,
          area: story.area,
          speaker: story.id,
          source: "story_agent_lines",
          lines,
        });
      }
    }
  }
  for (const pair of storyDatabase.pairStories || []) {
    units.push({
      id: `${pair.id}/pairAgent`,
      area: pair.area,
      speaker: pair.a,
      source: "pair_agent_lines",
      lines: pair.agentLines || [],
      pair,
    });
  }
  return units;
}

function areaProps(areaId) {
  const map = mapById.get(areaId);
  return [
    ...(map?.interactions || []).map((item) => item.label),
    ...(map?.transitions || []).map((item) => item.label),
  ].filter(Boolean);
}

function hasAreaGrounding(unit) {
  if (!unit.area || !areaIds.has(unit.area)) return true;
  const blob = unit.lines.map(lineText).join("");
  return areaProps(unit.area).some((prop) => blob.includes(prop)) ||
    (unit.lines.length <= 3 && unit.source !== "pair_agent_lines");
}

function speakerKnown(speaker) {
  return speaker === "narrator" || speaker === "player" || characterIds.has(speaker);
}

function naturalnessIssues(unit) {
  const issues = [];
  const texts = unit.lines.map(lineText).filter(Boolean);
  const speakers = unit.lines.map((line) => speakerOf(line, unit.speaker));
  if (!unit.lines.length) issues.push("空对话");
  if (unit.area && !areaIds.has(unit.area)) issues.push(`未知区域 ${unit.area}`);
  for (let i = 0; i < unit.lines.length; i += 1) {
    const speaker = speakers[i];
    const text = texts[i] || "";
    if (!speakerKnown(speaker)) issues.push(`未知说话人 ${speaker}`);
    if (!text) issues.push(`第 ${i + 1} 句为空`);
    if (text.length > 150) issues.push(`第 ${i + 1} 句过长`);
    if (forbidden.some((pattern) => pattern.test(text))) issues.push(`第 ${i + 1} 句含出戏或敏感表达：${text.slice(0, 40)}`);
    if (/^[a-z0-9_ .:/-]{3,}$/i.test(text) && !/小康Online/.test(text)) issues.push(`第 ${i + 1} 句英文/代码感过重`);
  }
  const characterLineCount = speakers.filter((speaker) => characterIds.has(speaker)).length;
  if (unit.source === "pair_agent_lines") {
    const pairSpeakers = new Set(speakers.filter((speaker) => characterIds.has(speaker)));
    if (pairSpeakers.size < 2) issues.push("双人羁绊没有形成双方来回");
    if (!hasAreaGrounding(unit)) issues.push("双人羁绊缺少地图物件落点");
  }
  if (!["player_intro", "player_intro_choice"].includes(unit.source) && texts.length >= 4 && characterLineCount === 0) {
    issues.push("缺少角色本人发言");
  }
  const genericCount = texts.filter((text) => weakGeneric.includes(text)).length;
  if (texts.length >= 5 && genericCount >= Math.ceil(texts.length * 0.55)) {
    issues.push("泛用短句占比过高，像随机拼贴");
  }
  let repeated = 0;
  for (let i = 1; i < texts.length; i += 1) {
    if (texts[i] === texts[i - 1]) repeated += 1;
  }
  if (repeated >= 2) issues.push("连续重复句过多");
  if (texts.join("").includes("这段算剧情")) issues.push("出现模板元叙事");
  return issues;
}

function inspectCgPrompts() {
  const issues = [];
  for (const cg of cgUnlocks.pair || []) {
    if (!cg.prompt?.includes("Dialogue basis")) issues.push(`${cg.id} 缺少对话基础`);
    if (!cg.prompt?.includes("具体物件")) issues.push(`${cg.id} 缺少具体物件`);
    if (/两人同框，星露谷式温暖像素动漫画风，围绕地图物件自然接话/.test(cg.prompt || "")) {
      issues.push(`${cg.id} 仍是旧模板 prompt`);
    }
  }
  return issues;
}

function main() {
  const units = collectDialogueUnits();
  const failedUnits = [];
  for (const unit of units) {
    const issues = naturalnessIssues(unit);
    if (issues.length) failedUnits.push({ id: unit.id, source: unit.source, issues });
  }
  const cgIssues = inspectCgPrompts();
  const report = {
    generatedAt: new Date().toISOString(),
    agent: "player_reader_agent",
    policy: [
      "像普通玩家一样连续读对话，优先检查是否自然、是否接得上、是否像群聊而不是说明书。",
      "允许群聊短句和问号，但不允许连续随机短语、缺少地图落点、敏感现实信息或英文代码腔。",
      "羁绊插画 prompt 必须来自双人聊天结果。",
    ],
    totalUnits: units.length,
    failedUnits,
    cgIssues,
    passed: failedUnits.length === 0 && cgIssues.length === 0,
  };
  writeJson(path.join(DOCS, "player_dialogue_agent_report.json"), report);
  if (!report.passed) {
    console.error(JSON.stringify(report, null, 2));
    process.exit(1);
  }
  console.log(JSON.stringify({
    passed: true,
    totalUnits: report.totalUnits,
    checkedPairPrompts: (cgUnlocks.pair || []).length,
    report: "docs/player_dialogue_agent_report.json",
  }, null, 2));
}

main();
