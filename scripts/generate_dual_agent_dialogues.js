#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const ANALYSE = path.resolve(ROOT, "..");
const DATA = path.join(ROOT, "src", "data");
const OUTPUT = path.join(ANALYSE, "output");

const readJson = (file) => JSON.parse(fs.readFileSync(file, "utf8"));
const writeJson = (file, payload) => fs.writeFileSync(file, `${JSON.stringify(payload, null, 2)}\n`);

const characters = readJson(path.join(DATA, "characters.json"));
const areas = readJson(path.join(DATA, "areas.json"));
const maps = readJson(path.join(DATA, "maps.json"));
const storyDatabase = readJson(path.join(DATA, "story_database.json"));
const cgUnlocks = readJson(path.join(DATA, "cg_unlocks.json"));
const persona = readJson(path.join(OUTPUT, "persona_analysis.json"));
const relationships = readJson(path.join(OUTPUT, "relationship_analysis.json"));

const areaById = new Map(areas.map((area) => [area.id, area]));
const mapById = new Map(maps.map((map) => [map.id, map]));
const storyById = new Map((storyDatabase.characterStories || []).map((story) => [story.id, story]));
const characterById = new Map(characters.map((char) => [char.id, char]));
const personaByName = new Map(Object.values(persona.members || {}).map((member) => [member.name, member]));
const relationNodeByName = new Map((relationships.nodes || []).map((node) => [node.label, node]));

const voiceOverrides = {
  role_001: ["何意味", "[[呵呵]]", "图呢", "怎么说呢", "无敌了"],
  role_002: ["何意味", "羡慕你", "还真是", "笑死我了", "😭"],
  role_003: ["？", "神秘", "有没有懂的", "想你们", "这是什么"],
  role_004: ["我醒了", "嚯嚯嚯", "我好孤独", "有游戏没有"],
  role_005: ["唉我草", "羡慕你", "多少钱", "什么时候", "多发点"],
  role_006: ["还真是", "不赖", "这是你", "确实"],
  role_007: ["zsn", "何意味", "有没有懂的", "有感觉吗"],
  role_008: ["笑死了", "有没有懂的", "有感觉吗", "我的呢"],
  role_009: ["[/太好笑]", "[[呵呵]]", "不知道", "忍不住了"],
  role_010: ["这是你", "妈妈", "我的呢", "@NNZ"],
  role_011: ["何意味", "这是你", "好压抑", "压抑了"],
  role_012: ["这是你", "晚安", "早", "老婆", "香草泥"],
  role_013: ["这是你", "[[呵呵]]", "羡慕你", "是本人吗"],
  role_014: ["舒服了", "睡醒了", "下班了", "这是你"],
  role_015: ["[[上班]]", "[/耶]", "[/敬礼]", "想你"],
  role_016: ["毛鸽", "@NNZ", "？？？", "这是你"],
  role_017: ["何意味", "有感觉吗", "后续呢", "无敌了"],
  role_018: ["别闹了", "不知道", "可以啊", "你猜？"],
  role_019: ["何意味", "有没有懂的", "无敌了", "羡慕你"],
  role_020: ["...", "没绷住", "好玩吗", "靴子呢"],
};

const sensitivePattern = /(@|\[回复|\[图片|https?:|手机号|身份证|住址|宿舍|工位|公司|学校|学院|大学|\d{2,4}\s*级|杀|色图|色情|里番|打胶|女大学生|妹妹|ltp|ZW|zw|QQ|qq|[A-Za-z]{5,})/;
const boilerplatePattern = /(高能量|支线入口|装无辜|发光物|吐槽|离谱|你来抓我|别问，问就是)/;

function hash(value) {
  let h = 2166136261;
  for (const ch of String(value)) {
    h ^= ch.codePointAt(0);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h >>> 0);
}

function pick(list, key, fallback = "") {
  const pool = list.filter(Boolean);
  if (!pool.length) return fallback;
  return pool[hash(key) % pool.length];
}

function cleanText(text = "") {
  return String(text)
    .replace(/ACGN|acg/g, "二次元")
    .replace(/\bCG\b/g, "插画")
    .replace(/发光物件/g, "线索物")
    .replace(/发光物/g, "线索物")
    .replace(/装无辜/g, "摆路人脸")
    .replace(/离谱/g, "超展开")
    .replace(/吐槽达人/g, "弹幕达人")
    .replace(/吐槽/g, "弹幕")
    .replace(/高能量发言者/g, "自带开场音效的人")
    .replace(/高能量/g, "开场音效拉满")
    .replace(/支线入口/g, "剧情把手")
    .replace(/你来抓我啊/g, "看你能不能接住我")
    .replace(/别问，问就是/g, "先别急，这段算")
    .replace(/\s+/g, " ")
    .trim();
}

function safeOriginalsFor(char) {
  const names = [char.groupNickname, char.displayName, char.qqNickname].filter(Boolean);
  const dossierPath = names
    .map((name) => path.join(OUTPUT, "detective_dossiers", `${name}.json`))
    .find((file) => fs.existsSync(file));
  if (!dossierPath) return [];
  const dossier = readJson(dossierPath);
  return Object.values(dossier.originals || {})
    .map((entry) => cleanText(entry.txt || ""))
    .filter((text) => text.length >= 2 && text.length <= 18)
    .filter((text) => !sensitivePattern.test(text))
    .filter((text) => !boilerplatePattern.test(text))
    .filter((text, index, all) => all.indexOf(text) === index)
    .slice(0, 80);
}

function statsFor(char) {
  const dossierPath = [char.groupNickname, char.displayName, char.qqNickname]
    .filter(Boolean)
    .map((name) => path.join(OUTPUT, "detective_dossiers", `${name}.json`))
    .find((file) => fs.existsSync(file));
  if (dossierPath) {
    const dossier = readJson(dossierPath);
    return dossier.stats || {};
  }
  const member = personaByName.get(char.groupNickname) || personaByName.get(char.displayName);
  return {
    avg_len: member?.profile?.avg_text_len || member?.language_style?.avg_message_length || 12,
    q_pct: (member?.language_style?.question_ratio || 0.1) * 100,
    night_pct: 25,
    at_pct: 8,
  };
}

function styleFlags(char, stats) {
  const tags = char.dialogueStyle || "";
  return {
    short: (stats.avg_len || 12) <= 15,
    asks: (stats.q_pct || 0) >= 12 || tags.includes("好问型"),
    night: (stats.night_pct || 0) >= 30 || tags.includes("夜猫子型"),
    support: tags.includes("情绪支持型") || tags.includes("调解者"),
    rational: tags.includes("理性分析型") || tags.includes("长篇输出型"),
    bridge: tags.includes("核心连接者") || tags.includes("信息源"),
    image: tags.includes("图片分享者") || tags.includes("表情包使用者"),
    active: tags.includes("话题发起者") || tags.includes("开团接梗型"),
  };
}

function areaName(areaId) {
  return areaById.get(areaId)?.name || "小镇";
}

function areaProps(areaId) {
  const interactions = mapById.get(areaId)?.interactions || [];
  return interactions.map((item) => item.label).filter(Boolean);
}

function itemByArea(areaId, key) {
  return pick(areaProps(areaId), `${areaId}:${key}`, "路灯");
}

function relationNames(char) {
  return (char.keyRelations || []).map((rel) => rel.name).filter(Boolean);
}

function voiceAgentProfile(char) {
  const stats = statsFor(char);
  const flags = styleFlags(char, stats);
  const originals = safeOriginalsFor(char);
  const member = personaByName.get(char.groupNickname) || personaByName.get(char.displayName);
  const node = relationNodeByName.get(char.groupNickname) || relationNodeByName.get(char.displayName);
  const topWords = (member?.language_style?.top_keywords || [])
    .map((item) => cleanText(item.word))
    .filter((word) => word && word.length <= 6 && !sensitivePattern.test(word))
    .slice(0, 8);
  const anchors = originals.length ? originals.slice(0, 10) : (char.memeSeeds || []).slice(0, 10);
  const overrideHooks = voiceOverrides[char.id] || [];
  const cadence = flags.short ? "短句连发" : flags.rational ? "先铺条件再下判断" : "一问一接";
  const responseMode = flags.support
    ? "先接住对方，再补一句小请求"
    : flags.rational
      ? "先判断条件，再给结论"
      : flags.asks
        ? "先抛问题，再把话题拽回来"
        : flags.image
          ? "先看图感，再给一句短评"
          : "先短反应，再顺手开新话题";
  return {
    id: char.id,
    name: char.displayName,
    avgLen: Number(stats.avg_len || 12).toFixed(1),
    questionPercent: Number(stats.q_pct || 0).toFixed(1),
    nightPercent: Number(stats.night_pct || 0).toFixed(1),
    influence: node?.influence || null,
    cadence,
    responseMode,
    flags,
    anchors: [...overrideHooks, ...anchors].filter((item, index, all) => all.indexOf(item) === index).slice(0, 12),
    topWords,
    avoid: ["功能自述", "攻略说明腔", "物件拟人过载", "统一弹幕役标签", "像任务提示一样解释自己"],
  };
}

function line(speaker, text) {
  return { speaker, text: cleanText(text).slice(0, 138) };
}

function roleLine(char, profile, contextKey) {
  const flags = profile.flags;
  const anchor = pick(profile.anchors, `${contextKey}:anchor`, char.memeSeeds?.[0] || "可以");
  if (flags.support) return pick([anchor, "你先说，我在", "多发点", "我接一下", "羡慕你"], contextKey);
  if (flags.rational) return pick([anchor, "还真是", "确实", "先别急着判", "这个要分情况"], contextKey);
  if (flags.asks) return pick([anchor, "何意味", "有没有懂的", "这又是什么", "有感觉吗"], contextKey);
  if (flags.night) return pick([anchor, "有游戏没有", "我醒了", "先别睡", "夜间频道启动"], contextKey);
  if (flags.image) return pick([anchor, "图呢", "哪来的", "保存了", "这图有说法"], contextKey);
  return pick([anchor, "可以", "这句我认", "别急", "有内味了"], contextKey);
}

function styleAgentCritique(profile, draftLines) {
  const text = draftLines.map((entry) => entry.text).join(" ");
  const issues = [];
  if (text.includes("任务") && text.includes("线索") && text.includes("剧情")) issues.push("解释感偏重，删掉任务说明腔。");
  if ((text.match(/小镇/g) || []).length > 2) issues.push("小镇二字重复，换成具体物件。");
  if (draftLines.some((entry) => entry.text.length > 48) && profile.flags.short) issues.push("该角色原始短句多，压短。");
  if (!draftLines.some((entry) => profile.anchors.some((anchor) => entry.text.includes(anchor.slice(0, Math.min(anchor.length, 5)))))) {
    issues.push("缺少原始发言回声，加入一条短口癖。");
  }
  return issues.length ? issues : ["节奏通过，保留短反应和接话空隙。"];
}

function makeIntro(char, profile) {
  const prop = itemByArea(char.defaultArea, "intro");
  const first = roleLine(char, profile, "intro:first");
  const rel = pick(relationNames(char), `intro:${char.id}`, "");
  return [
    line("narrator", `旁白：${char.displayName}刚上线，${areaName(char.defaultArea)}的${prop}先晃了一下。`),
    line(char.id, first),
    line("player", profile.flags.short ? "这句很本人。" : "你这开场有点熟悉。"),
    line(char.id, rel ? `${rel}在的话，这段还能再歪一次` : roleLine(char, profile, "intro:last")),
  ];
}

function makeDaily(char, profile) {
  const prop = itemByArea(char.defaultArea, "daily");
  const rel = pick(relationNames(char), `daily:${char.id}`, "");
  const opener = roleLine(char, profile, "daily:open");
  const bridge = profile.flags.bridge ? `${rel || "有人"}刚才也在` : `${prop}那边刚动了一下`;
  return [
    line("narrator", `旁白：你在${areaName(char.defaultArea)}碰见${char.displayName}，${prop}旁边刚好空出一格。`),
    line(char.id, opener),
    line("player", profile.flags.asks ? "你先问还是我先问？" : "懂，先不聊正事。"),
    line(char.id, bridge),
    line(char.id, roleLine(char, profile, "daily:end")),
  ];
}

function makeCasualChoice(char, profile) {
  const prop = itemByArea(char.defaultArea, "casual");
  return [
    line("player", "今天频道什么画风？"),
    line(char.id, roleLine(char, profile, "casual:1")),
    line(char.id, `${prop}刚才响了一下`),
    line("player", "有内味了，继续。"),
    line(char.id, roleLine(char, profile, "casual:2")),
    line("narrator", `旁白：${prop}轻轻一响，这段闲聊被收进回忆。`),
  ];
}

function makeTaskChoice(char, profile) {
  const prop = itemByArea(char.defaultArea, "task");
  return [
    line("player", "那正事怎么走？"),
    line(char.id, profile.flags.rational ? `先看${prop}，再看谁接话` : `先去${prop}那边看一眼`),
    line(char.id, roleLine(char, profile, "task:2")),
    line("player", "行，比任务提示像人话。"),
  ];
}

function makeDeepChoice(char, profile) {
  const rel = pick(relationNames(char), `deep:${char.id}`, "");
  return [
    line("player", "你别只当路标，讲点自己的。"),
    line(char.id, roleLine(char, profile, "deep:1")),
    line(char.id, rel ? `${rel}一接，这句就能歪` : "没人接我也能先垫一句"),
    line("narrator", "旁白：这段话没有喊口号，只是自然地停在了回忆栏里。"),
  ];
}

function makeReactions(char, profile) {
  const picks = [...new Set([char.defaultArea, "town_center", pick(areas.map((area) => area.id), `react:${char.id}`)])].slice(0, 3);
  while (picks.length < 3) picks.push(areas[picks.length].id);
  return picks.map((areaId, index) => {
    const prop = itemByArea(areaId, `${char.id}:${index}`);
    return {
      id: `react_${char.id}_${areaId}`,
      speaker: char.id,
      area: areaId,
      time: "any",
      lines: [
        line("narrator", `旁白：${areaName(areaId)}的${prop}把镜头递给${char.displayName}。`),
        line(char.id, roleLine(char, profile, `react:${areaId}`)),
        line("player", "收到，地图开始像群聊了。"),
      ],
      rewards: [`area_stamp_${areaId}`],
    };
  });
}

function makePlayerIntro(char, profile) {
  const prop = itemByArea(char.defaultArea, "playerIntro");
  return [
    line("narrator", `旁白：抽卡停在${char.displayName}。${prop}闪了一下，像在确认本人上线。`),
    line("player", roleLine(char, profile, "player:intro")),
    line("player", profile.flags.night ? "先说好，夜间频道我可能更会接。" : "先逛，任务自己会露头。"),
    line("narrator", "旁白：没有宏大宣言，只有一条很像群聊的开场。"),
  ];
}

function makePlayerChoices(char, profile) {
  return [
    {
      id: `intro_${char.id}_loiter`,
      label: "先水两句",
      lines: [
        line("player", roleLine(char, profile, "player:loiter")),
        line("narrator", "旁白：你决定先听听小镇怎么接话。"),
      ],
      rewards: [`memory_intro_${char.id}_loiter`],
    },
    {
      id: `intro_${char.id}_move`,
      label: "直接开走",
      lines: [
        line("player", "行，边走边聊。"),
        line("narrator", "旁白：地图展开，闲聊和任务挤在同一条路上。"),
      ],
      rewards: [`memory_intro_${char.id}_move`],
    },
  ];
}

function makePairLines(pair, profiles) {
  const a = characterById.get(pair.a);
  const b = characterById.get(pair.b);
  if (!a || !b) return [];
  const pa = profiles[a.id];
  const pb = profiles[b.id];
  const areaId = a.defaultArea || pair.area || "town_center";
  const prop = itemByArea(areaId, `${a.id}:${b.id}`);
  return [
    line("narrator", `旁白：${a.displayName}和${b.displayName}在${areaName(areaId)}撞上，${prop}刚好在中间。`),
    line(a.id, roleLine(a, pa, `pair:${b.id}:a`)),
    line(b.id, roleLine(b, pb, `pair:${a.id}:b`)),
    line(a.id, pa.flags.short ? "你接。" : `这个节奏像你会接`),
    line(b.id, pb.flags.asks ? "那我问一句，谁先心虚？" : "接了，别让它掉地上"),
    line("player", "你们别演了，这已经是羁绊回合。"),
    line("narrator", "旁白：锁孔轻轻一响，羁绊插画页多了一格剪影。"),
  ];
}

function makeMultiDialogues(profiles) {
  const groups = [
    ["dialogue_multi_card_table", "dragon_card_house", ["role_001", "role_006", "role_010"], "牌桌"],
    ["dialogue_multi_livehouse_stage", "livehouse", ["role_004", "role_012", "role_017"], "舞台"],
    ["dialogue_multi_dinner_call", "restaurant", ["role_005", "role_013", "role_020"], "饭点"],
  ];
  return groups.map(([id, area, ids, topic]) => ({
    id,
    speaker: ids[0],
    area,
    time: "any",
    characters: ids,
    lines: [
      line("narrator", `旁白：${topic}群像回合开始，三个人同时把话头挤上桌。`),
      line(ids[0], roleLine(characterById.get(ids[0]), profiles[ids[0]], `${id}:1`)),
      line(ids[1], roleLine(characterById.get(ids[1]), profiles[ids[1]], `${id}:2`)),
      line(ids[2], roleLine(characterById.get(ids[2]), profiles[ids[2]], `${id}:3`)),
      line("player", "好，这才像群里同时三个人打字。"),
    ],
    rewards: [`memory_${id}`],
  }));
}

const sessions = {
  source: "dual_agent_voice_pipeline",
  generatedAt: new Date().toISOString(),
  method: [
    "voice_agent: 从 persona/detective_dossier 提取短句长度、提问率、夜间率、互动对象、原始安全短句。",
    "scene_agent: 按角色常驻区域和地图物件起草闲聊。",
    "voice_agent: 再检查解释腔、模板句、过长台词，压成更像群聊的短回合。",
  ],
  profiles: {},
  characterSessions: {},
  pairSessions: {},
};

const profiles = {};
for (const char of characters) {
  const profile = voiceAgentProfile(char);
  profiles[char.id] = profile;
  sessions.profiles[char.id] = profile;
}

const dialogues = [];
for (const char of characters) {
  const profile = profiles[char.id];
  const introLines = makeIntro(char, profile);
  const dailyLines = makeDaily(char, profile);
  const casual = makeCasualChoice(char, profile);
  const task = makeTaskChoice(char, profile);
  const deep = makeDeepChoice(char, profile);
  const critique = styleAgentCritique(profile, dailyLines);

  char.playerIntro = makePlayerIntro(char, profile);
  char.playerIntroChoices = makePlayerChoices(char, profile);

  const story = storyById.get(char.id);
  if (story) {
    story.agentLines = {
      entrance: introLines.filter((entry) => entry.speaker === char.id).slice(0, 2),
      idle: dailyLines.find((entry) => entry.speaker === char.id)?.text || roleLine(char, profile, "idle"),
      casual,
      task,
      deep,
    };
    story.selfTalk = char.playerIntro.filter((entry) => entry.speaker === "player").map((entry) => entry.text);
    story.casualTopics = [{ label: "双agent闲聊", lines: casual.filter((entry) => entry.speaker === char.id).map((entry) => entry.text) }];
    story.taskTopics = [{ label: "双agent任务问答", lines: task.filter((entry) => entry.speaker === char.id).map((entry) => entry.text) }];
    story.introNarration = introLines;
  }

  dialogues.push({
    id: `intro_${char.id}`,
    speaker: char.id,
    area: char.defaultArea,
    time: "any",
    lines: introLines,
    rewards: [`codex_${char.id}`],
  });
  dialogues.push({
    id: `daily_${char.id}`,
    speaker: char.id,
    area: char.defaultArea,
    time: "any",
    lines: dailyLines,
    choices: [
      { id: `choice_${char.id}_chat`, label: "闲谈", lines: casual, rewards: [`memory_intro_chat_${char.id}`] },
      { id: `choice_${char.id}_task`, label: "关于任务", lines: task, rewards: [`memory_task_chat_${char.id}`] },
      { id: `choice_${char.id}_deep`, label: "长聊一下", lines: deep, rewards: [`memory_deep_chat_${char.id}`] },
    ],
    rewards: [`codex_${char.id}`],
  });
  dialogues.push(...makeReactions(char, profile));

  sessions.characterSessions[char.id] = {
    voiceAgent: {
      learned: {
        cadence: profile.cadence,
        responseMode: profile.responseMode,
        anchors: profile.anchors.slice(0, 6),
      },
    },
    sceneAgent: {
      draftDaily: dailyLines,
    },
    voiceAgentReview: critique,
    finalDialogueIds: [`intro_${char.id}`, `daily_${char.id}`],
  };
}

dialogues.push({
  id: "intro_boot_error",
  speaker: "narrator",
  area: "town_center",
  time: "any",
  lines: [
    line("narrator", "旁白：小康钟只响了半声，喷泉弹幕突然刷屏。"),
    line("role_001", "图呢，我先看一眼。"),
    line("player", "所以不是世界末日，是群聊换成地图了？"),
    line("role_001", "差不多，先找人，别急着写总结。"),
    line("narrator", "旁白：开场没有讲大道理，只把你推到广场中间。"),
  ],
  rewards: ["memory_intro_boot_error"],
});

for (const [id, time, text] of [
  ["dialogue_time_day", "day", "白天频道亮着，短句更容易被接住。"],
  ["dialogue_time_dusk", "dusk", "黄昏一到，关系剧情会自己靠近。"],
  ["dialogue_time_night", "night", "夜间频道启动，很多人说话会更像本人。"],
]) {
  dialogues.push({
    id,
    speaker: "narrator",
    area: "town_center",
    time,
    lines: [line("narrator", `旁白：${text}`), line("player", "懂，时间也是聊天滤镜。")],
    rewards: [`memory_${id}`],
  });
}

for (const pair of storyDatabase.pairStories || []) {
  const lines = makePairLines(pair, profiles);
  if (!lines.length) continue;
  pair.agentLines = lines;
  pair.activePassive = lines.filter((entry) => entry.speaker === pair.a || entry.speaker === pair.b).slice(0, 2).map((entry) => entry.text);
  pair.beats = lines.slice(1, 6).map((entry) => entry.text);
  pair.cgPrompt = `小康Online双人羁绊插画，imagegen 生成：${pair.name || `${pair.a}与${pair.b}`}，${pair.area || "小镇"}，星露谷式温暖像素动漫画风，角色围绕一个具体地图物件自然接话，无可读文字，无界面。`;
  dialogues.push({
    id: `dialogue_duo_${pair.a}_${pair.b}`,
    speaker: pair.a,
    area: characterById.get(pair.a)?.defaultArea || pair.area || "town_center",
    time: "any",
    characters: [pair.a, pair.b],
    lines,
    rewards: [pair.unlockMemory || `memory_pair_${pair.a}_${pair.b}`],
  });
  sessions.pairSessions[`${pair.a}_${pair.b}`] = {
    voiceAgentA: profiles[pair.a]?.cadence,
    voiceAgentB: profiles[pair.b]?.cadence,
    sceneAgent: `围绕 ${itemByArea(characterById.get(pair.a)?.defaultArea || "town_center", `${pair.a}:${pair.b}`)} 起草`,
    finalLines: lines,
    cg: "imagegen",
  };
}

dialogues.push(...makeMultiDialogues(profiles));

for (const cg of cgUnlocks.pair || []) {
  const [aId, bId] = cg.characters || [];
  const a = characterById.get(aId);
  const b = characterById.get(bId);
  cg.source = "imagegen";
  cg.sourceTool = "imagegen";
  cg.assetKind = "bond_cg";
  cg.name = `${a?.displayName || aId} × ${b?.displayName || bId}：接住这句`;
  cg.hint = `触发${a?.displayName || "两人"}和${b?.displayName || "对方"}的双人长聊后解锁。`;
  cg.prompt = `小康Online双人羁绊插画，imagegen 生成：${a?.displayName || aId}与${b?.displayName || bId}同框，星露谷式温暖像素动漫画风，围绕地图物件自然接话，无可读文字，无界面。`;
}

for (const cg of cgUnlocks.final || []) {
  cg.source = "imagegen";
  cg.sourceTool = "imagegen";
}

for (const cg of cgUnlocks.main || []) {
  cg.source = "imagegen";
  cg.sourceTool = "imagegen";
  cg.assetKind = "main_cg";
  cg.prompt ||= "小康Online主线最终大插画，imagegen 生成：全员在小镇广场上线，星露谷式温暖像素动漫画风，黑夜后重新亮起的小康钟，群聊轻喜剧收束，无可读文字，无界面。";
}

writeJson(path.join(DATA, "characters.json"), characters);
writeJson(path.join(DATA, "dialogues.json"), dialogues);
writeJson(path.join(DATA, "story_database.json"), storyDatabase);
writeJson(path.join(DATA, "cg_unlocks.json"), cgUnlocks);
writeJson(path.join(DATA, "dialogue_agent_sessions.json"), sessions);

console.log(JSON.stringify({
  characters: characters.length,
  dialogues: dialogues.length,
  pairDialogues: dialogues.filter((dialogue) => dialogue.id.startsWith("dialogue_duo_")).length,
  pairCgsTaggedImagegen: (cgUnlocks.pair || []).filter((cg) => cg.source === "imagegen").length,
}, null, 2));
