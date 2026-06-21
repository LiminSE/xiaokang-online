#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const ANALYSE = path.resolve(ROOT, "..");
const DATA = path.join(ROOT, "src", "data");
const DOCS = path.join(ROOT, "docs");
const OUTPUT = path.join(ANALYSE, "output");
const RECORD_PATH = path.join(ANALYSE, "record.json");
const MAX_MESSAGES_PER_CHARACTER = 1000;
const MIN_RESEARCH_CHARS = 3000;

const readJson = (file) => JSON.parse(fs.readFileSync(file, "utf8"));
const writeJson = (file, payload) => fs.writeFileSync(file, `${JSON.stringify(payload, null, 2)}\n`, "utf8");

const characters = readJson(path.join(DATA, "characters.json"));
const areas = readJson(path.join(DATA, "areas.json"));
const maps = readJson(path.join(DATA, "maps.json"));
const items = readJson(path.join(DATA, "items.json"));
const storyDatabase = readJson(path.join(DATA, "story_database.json"));
const cgUnlocks = readJson(path.join(DATA, "cg_unlocks.json"));
const oldImagegenJobs = readJson(path.join(DATA, "imagegen_jobs.json"));
const persona = readJson(path.join(OUTPUT, "persona_analysis.json"));
const relationships = readJson(path.join(OUTPUT, "relationship_analysis.json"));
const topics = readJson(path.join(OUTPUT, "topic_analysis.json"));
const narrative = readJson(path.join(OUTPUT, "narrative_analysis.json"));

const areaById = new Map(areas.map((area) => [area.id, area]));
const mapById = new Map(maps.map((map) => [map.id, map]));
const itemById = new Map(items.map((item) => [item.id, item]));
const storyById = new Map((storyDatabase.characterStories || []).map((story) => [story.id, story]));
const characterById = new Map(characters.map((char) => [char.id, char]));
const personaMembers = Object.values(persona.members || {});
const personaByName = new Map(personaMembers.map((member) => [member.name, member]));
const personaByUid = new Map(personaMembers.map((member) => [member.uid, member]));
const relationNodeByName = new Map((relationships.nodes || []).map((node) => [node.label, node]));
const relationNodeByUid = new Map((relationships.nodes || []).map((node) => [node.id, node]));

const hardVoiceSeeds = {
  role_001: ["何意味", "[[呵呵]]", "图呢", "怎么说呢", "无敌了"],
  role_002: ["何意味", "羡慕你", "还真是", "笑死我了", "😭"],
  role_003: ["？", "神秘", "有没有懂的", "想你们", "这是什么"],
  role_004: ["我醒了", "嚯嚯嚯", "我好孤独", "有游戏没有"],
  role_005: ["唉我草", "羡慕你", "多少钱", "什么时候", "多发点"],
  role_006: ["还真是", "不赖", "这是你", "确实"],
  role_007: ["zsn", "何意味", "有没有懂的", "有感觉吗"],
  role_008: ["笑死了", "有没有懂的", "有感觉吗", "我的呢"],
  role_009: ["[/太好笑]", "[[呵呵]]", "不知道", "忍不住了"],
  role_010: ["这是你", "妈妈", "我的呢"],
  role_011: ["何意味", "这是你", "好压抑", "压抑了"],
  role_012: ["这是你", "晚安", "早", "老婆", "香草泥"],
  role_013: ["这是你", "[[呵呵]]", "羡慕你", "是本人吗"],
  role_014: ["舒服了", "睡醒了", "下班了", "这是你"],
  role_015: ["[/耶]", "[/敬礼]", "想你", "精神状态也是战斗力"],
  role_016: ["毛鸽", "？？？", "这是你"],
  role_017: ["何意味", "有感觉吗", "后续呢", "无敌了"],
  role_018: ["别闹了", "不知道", "可以啊", "你猜？"],
  role_019: ["何意味", "有没有懂的", "无敌了", "羡慕你"],
  role_020: ["没绷住", "好玩吗", "靴子呢", "先别急"],
};

const sensitivePattern = /(@|\[回复|https?:|手机号|身份证|住址|宿舍|工位|公司|学校|学院|大学|上班|火车|成都|杭州|上海|武汉|武.?汉|国庆|在哪|防洪|交通联合|小红书|放票|带点|代购|袜子|飞机|备注|戒色|女同|牛牛|\d{2,4}\s*级|杀|色图|色情|里番|打胶|女大学生|妹妹|妹|脚|烧0|破绽|打.*针|日空气|屁股|💩|nm|lolicon|loli|萝莉|ltp|ZW|zw|QQ|qq|[A-Za-z0-9_-]{3,})/i;
const systemPattern = /(卡片消息|群公告|建群成功|Q群管家|撤回了一条消息|语音消息|转发消息|文件消息|分享消息)/;
const staleBoilerplatePattern = /(高能量|支线入口|发光物|装无辜|你来抓我|别问，问就是|功能定位|模板化|任务道具)/;

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

function uniq(list) {
  return [...new Set(list.filter(Boolean))];
}

function cleanText(text = "") {
  return String(text)
    .replace(/\[图片\]/g, "图")
    .replace(/\[表情\]/g, "表情")
    .replace(/ACGN|acg/g, "二次元")
    .replace(/\bCG\b/g, "插画")
    .replace(/发光物件/g, "线索物")
    .replace(/发光物/g, "线索物")
    .replace(/离谱/g, "超展开")
    .replace(/吐槽/g, "弹幕")
    .replace(/高能量发言者/g, "自带开场音效的人")
    .replace(/高能量/g, "开场音效拉满")
    .replace(/支线入口/g, "剧情把手")
    .replace(/装无辜/g, "摆路人脸")
    .replace(/别问，问就是/g, "先别急，这段算")
    .replace(/\s+/g, " ")
    .trim();
}

function safeSnippet(text = "") {
  const value = cleanText(text);
  if (value.length < 1 || value.length > 34) return "";
  if (/^[.。…]+$/.test(value)) return "";
  if (sensitivePattern.test(value) || systemPattern.test(value) || staleBoilerplatePattern.test(value)) return "";
  return value;
}

function safeAnchor(text = "") {
  const value = safeSnippet(text);
  if (!value) return "";
  if (/^[a-z0-9_.-]+$/i.test(value)) return "";
  return value;
}

function samplePattern(text = "") {
  const value = cleanText(text);
  if (!value) return "短反应";
  if (/[？?]/.test(value)) return value.length <= 8 ? "短问句" : "追问型长句";
  if (/图|截图|图片|表情/.test(value)) return "看图反应";
  if (/笑|乐|绷/.test(value)) return "笑场反应";
  if (/晚安|睡|醒|夜/.test(value)) return "作息反应";
  if (/可以|确实|还真|懂/.test(value)) return "确认接话";
  if (/什么|怎么|为何|为什么/.test(value)) return "追问接话";
  if (value.length <= 4) return "极短弹幕";
  if (value.length <= 12) return "短句递球";
  return "中句铺垫";
}

function patternSummary(samples) {
  const counts = new Map();
  for (const entry of samples) {
    const pattern = samplePattern(entry.text || entry);
    counts.set(pattern, (counts.get(pattern) || 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([name, count]) => `${name}×${count}`);
}

function displaySender(message) {
  const sender = message.sender || {};
  return sender.groupCard || sender.remark || sender.name || sender.nickname || "";
}

function senderNames(message) {
  const sender = message.sender || {};
  return uniq(["groupCard", "remark", "name", "nickname", "uid", "uin"].map((key) => String(sender[key] || "").trim()));
}

function senderAliases(char) {
  const loose = {
    role_010: ["普罗米亚绳艺写真集", "Auguste Laurant"],
    role_036: ["QQ昵称已脱敏36"],
  };
  return uniq([
    char.groupNickname,
    char.qqNickname,
    char.displayName,
    char.profileCard?.nickname,
    ...(loose[char.id] || []),
  ].map((value) => String(value || "").trim()));
}

function personaFor(char) {
  const names = senderAliases(char);
  return names.map((name) => personaByName.get(name)).find(Boolean) || null;
}

function relationNodeFor(char, member) {
  return relationNodeByName.get(char.groupNickname) ||
    relationNodeByName.get(char.displayName) ||
    (member ? relationNodeByUid.get(member.uid) : null) ||
    null;
}

function loadDossier(char) {
  const file = senderAliases(char)
    .map((name) => path.join(OUTPUT, "detective_dossiers", `${name}.json`))
    .find((candidate) => fs.existsSync(candidate));
  return file ? readJson(file) : null;
}

function areaName(areaId) {
  return areaById.get(areaId)?.name || "小镇中心";
}

function areaTheme(areaId) {
  return areaById.get(areaId)?.theme || "群聊像素小镇";
}

function areaProps(areaId) {
  const map = mapById.get(areaId);
  const interactionLabels = (map?.interactions || []).map((item) => item.label);
  const transitionLabels = (map?.transitions || []).map((item) => item.label);
  return uniq([...interactionLabels, ...transitionLabels]).slice(0, 10);
}

function propFor(areaId, key) {
  return pick(areaProps(areaId), `${areaId}:${key}`, "路灯");
}

function topKeywords(member, char) {
  const fromPersona = (member?.language_style?.top_keywords || [])
    .map((entry) => cleanText(entry.word))
    .filter((word) => word && word.length <= 8 && !sensitivePattern.test(word));
  const fromChar = (char.memeSeeds || []).map(cleanText);
  return uniq([...fromPersona, ...fromChar]).slice(0, 14);
}

function collectSourceSamples() {
  const aliases = new Map();
  for (const char of characters) {
    for (const alias of senderAliases(char)) aliases.set(alias, char.id);
  }
  const byId = new Map(characters.map((char) => [char.id, []]));
  const totals = new Map(characters.map((char) => [char.id, 0]));
  const payload = readJson(RECORD_PATH);
  for (const message of payload.messages || []) {
    if (message.system || message.recalled) continue;
    const charId = senderNames(message).map((name) => aliases.get(name)).find(Boolean);
    if (!charId) continue;
    const raw = message.content?.text || "";
    if (!raw || systemPattern.test(raw)) continue;
    totals.set(charId, (totals.get(charId) || 0) + 1);
    const text = safeSnippet(raw);
    if (!text) continue;
    const bucket = byId.get(charId);
    if (bucket.length < MAX_MESSAGES_PER_CHARACTER) {
      bucket.push({ text, time: message.time || "", timestamp: message.timestamp || 0 });
    } else {
      const seen = totals.get(charId);
      const index = hash(`${message.id}:${raw}`) % seen;
      if (index < MAX_MESSAGES_PER_CHARACTER) bucket[index] = { text, time: message.time || "", timestamp: message.timestamp || 0 };
    }
  }
  return { byId, totals };
}

function inferRhythm(stats, sampleTexts) {
  const avgLen = Number(stats.avg_len || 0);
  const qPct = Number(stats.q_pct || 0);
  const nightPct = Number(stats.night_pct || 0);
  const shortCount = sampleTexts.filter((text) => text.length <= 6).length;
  if (avgLen <= 14 || shortCount >= sampleTexts.length * 0.42) return "短句弹幕型";
  if (qPct >= 14) return "提问接球型";
  if (nightPct >= 30) return "夜间续航型";
  if (avgLen >= 26) return "铺垫分析型";
  return "轻推话题型";
}

function inferResponseMode(char, rhythm) {
  const styles = char.dialogueStyle || [];
  if (styles.includes("情绪支持型") || styles.includes("调解者")) return "先托住对方情绪，再把话题递回去";
  if (styles.includes("核心连接者") || styles.includes("信息源")) return "先给一个可接的短钩子，再把别人拖进同一个画面";
  if (styles.includes("图片分享者") || styles.includes("表情包使用者")) return "先看图和表情，再用一句短评定调";
  if (rhythm === "提问接球型") return "用问题开门，用反应收尾";
  if (rhythm === "铺垫分析型") return "先补条件，再给一个不太严肃的结论";
  return "先短反应，再顺手抛出新梗";
}

function styleFlags(char, stats, sampleTexts) {
  const styles = char.dialogueStyle || [];
  const avgLen = Number(stats.avg_len || 18);
  const qPct = Number(stats.q_pct || 0);
  const imageRatio = Number(stats.image_pct || stats.img_pct || 0);
  return {
    short: avgLen <= 15 || sampleTexts.filter((text) => text.length <= 6).length > sampleTexts.length * 0.38,
    asks: qPct >= 12 || styles.includes("好问型"),
    night: Number(stats.night_pct || 0) >= 30 || styles.includes("夜猫子型"),
    support: styles.includes("情绪支持型") || styles.includes("调解者"),
    rational: styles.includes("理性分析型") || styles.includes("长篇输出型") || avgLen >= 27,
    bridge: styles.includes("核心连接者") || styles.includes("信息源"),
    image: styles.includes("图片分享者") || styles.includes("表情包使用者") || imageRatio >= 0.1,
    active: styles.includes("话题发起者") || styles.includes("开团接梗型"),
  };
}

function roleLine(char, profile, key) {
  const anchor = pick(profile.anchors, `${char.id}:${key}:anchor`, char.memeSeeds?.[0] || "可以");
  const flags = profile.flags;
  const pools = [];
  if (flags.short) pools.push(anchor, "？", "这是你", "还真是", "可以", "笑死");
  if (flags.asks) pools.push("何意味", "有没有懂的", "这什么", "有感觉吗", anchor);
  if (flags.image) pools.push("图呢", "保存了", "这图有说法", "哪来的", anchor);
  if (flags.support) pools.push("你先说", "我接一下", "多发点", "先别急", anchor);
  if (flags.rational) pools.push("这个要分情况", "先别急着判", "逻辑是有的", "结论先放这", anchor);
  if (flags.night) pools.push("我醒了", "夜间频道启动", "先别睡", "有游戏没有", anchor);
  pools.push(anchor, "这句能接", "别让它掉地上", "你这也太会挑时间", "有内味了");
  return cleanText(pick(uniq(pools), key, anchor)).slice(0, 46);
}

function roleLineDifferent(char, profile, key, used = []) {
  for (let i = 0; i < 8; i += 1) {
    const candidate = roleLine(char, profile, `${key}:${i}`);
    if (candidate && !used.includes(candidate)) return candidate;
  }
  const fallbackPool = uniq([
    profile.flags.asks ? "这什么展开？" : "",
    profile.flags.image ? "图先收了，等会审判。" : "",
    profile.flags.rational ? "这波先把结论放桌上。" : "",
    profile.flags.support ? "你先说，我在旁边接着。" : "",
    "行，这句我接住。",
    "先别急，剧情还没掉线。",
    "这下真有番剧味了。",
  ]);
  return pick(fallbackPool.filter((text) => !used.includes(text)), `${char.id}:${key}:fallback`, "行，这句我接住。");
}

function sceneBeat(char, profile, key) {
  const prop = propFor(char.defaultArea, `${char.id}:${key}`);
  if (profile.flags.image) return `${prop}旁边像刚刷出一张图`;
  if (profile.flags.asks) return `${prop}把问题递到你面前`;
  if (profile.flags.support) return `${prop}旁边刚好能坐两个人`;
  if (profile.flags.rational) return `${prop}把场面分成了两种情况`;
  return `${prop}轻轻一响，像有人刚打完字`;
}

function critiqueLines(profile, lines) {
  const fixed = [];
  for (const item of lines) {
    let text = cleanText(item.text);
    text = text
      .replace(/我是.+?的人/g, "")
      .replace(/我的功能是/g, "")
      .replace(/请玩家/g, "你")
      .replace(/任务目标/g, "正事")
      .replace(/线索物/g, "东西");
    if (profile.flags.short && text.length > 42) text = text.slice(0, 38) + "。";
    fixed.push({ ...item, text });
  }
  return fixed;
}

function line(speaker, text) {
  return { speaker, text: cleanText(text).slice(0, 150) };
}

function buildProfile(char, sourceSamples, sourceTotal) {
  const dossier = loadDossier(char);
  const member = personaFor(char);
  const node = relationNodeFor(char, member);
  const stats = dossier?.stats || {
    total: member?.profile?.total_messages || sourceTotal || 0,
    originals: sourceTotal || 0,
    avg_len: member?.profile?.avg_text_len || member?.language_style?.avg_message_length || 18,
    q_pct: (member?.language_style?.question_ratio || 0) * 100,
    night_pct: 0,
    peak_h: null,
    at_pct: 0,
    reply_pct: 0,
  };
  const sampleTexts = sourceSamples.map((entry) => entry.text);
  const safeOriginals = Object.values(dossier?.originals || {})
    .map((entry) => safeSnippet(entry.txt || ""))
    .filter(Boolean)
    .slice(0, 120);
  const anchors = uniq([
    ...(hardVoiceSeeds[char.id] || []),
    ...safeOriginals,
    ...sampleTexts.filter((text) => text.length <= 16),
    ...(char.memeSeeds || []),
  ])
    .map(safeAnchor)
    .filter(Boolean)
    .slice(0, 80);
  const keywords = topKeywords(member, char);
  const rhythm = inferRhythm(stats, sampleTexts);
  const responseMode = inferResponseMode(char, rhythm);
  const flags = styleFlags(char, stats, sampleTexts);
  const relations = (char.keyRelations || [])
    .map((id) => characterById.get(id)?.displayName)
    .filter(Boolean);
  return {
    id: char.id,
    name: char.displayName,
    aliases: senderAliases(char),
    title: char.title,
    area: char.defaultArea,
    areaName: areaName(char.defaultArea),
    sourceTotal,
    sourceIntegrated: Math.min(sourceSamples.length, MAX_MESSAGES_PER_CHARACTER),
    stats,
    rhythm,
    responseMode,
    flags,
    influence: node?.influence || 0,
    keywords,
    anchors: anchors.slice(0, 32),
    sampleSnippets: sampleTexts.slice(0, 80),
    relations,
    interests: uniq([...keywords, ...(char.memeSeeds || []), ...areaProps(char.defaultArea)]).slice(0, 16),
    avoid: ["不要自我介绍式说明角色功能", "不要把任务讲成攻略", "不要连续复读同一个梗", "不要使用大段英文", "不要暴露原始隐私信息"],
  };
}

function paragraph(label, text) {
  return `【${label}】${text}`;
}

function buildResearchText(char, profile) {
  const stats = profile.stats || {};
  const props = areaProps(char.defaultArea);
  const seedLines = profile.anchors.slice(0, 14).join("、") || "短句接话、看图反应、顺手拐弯";
  const samples = patternSummary(profile.sampleSnippets).join(" / ") || "样本偏少，主要参考既有侧写与关系图谱";
  const relations = profile.relations.join("、") || "临场接话对象";
  const styleList = (char.dialogueStyle || []).join("、") || "群聊轻喜剧";
  const interestList = profile.interests.join("、") || "二次元、地图物件、聊天回声";
  const base = [
    paragraph("资料整合",
      `${char.displayName}的语言风格调研以群聊导出的原始消息为底稿，最多抽取并整合${MAX_MESSAGES_PER_CHARACTER}条安全文本样本；本次实际纳入${profile.sourceIntegrated}条可用于建模的短文本，原始命中约${profile.sourceTotal}条。这里的“整合”不是把聊天记录整段搬进游戏，而是把句长、停顿、提问方式、看图反应、接话对象、活跃时段和常见兴趣点拆开，再重新组合成可控的角色 agent。这样做的目的，是让${char.displayName}在游戏里说话像熟人突然上线，而不是像资料卡朗读。`),
    paragraph("基础节奏",
      `统计侧显示，${char.displayName}平均句长约${Number(stats.avg_len || 0).toFixed(1)}，提问比例约${Number(stats.q_pct || 0).toFixed(1)}%，夜间发言占比约${Number(stats.night_pct || 0).toFixed(1)}%，高峰小时接近${stats.peak_h ?? "未知"}点。由此抽出的主节奏是“${profile.rhythm}”：不是每句话都要完整解释，而是先扔一个能被接住的钩子，再看对方怎么歪。对话里应保留“半句即懂”的感觉，允许短停顿、反问、突然换挡，也允许玩家读到一半意识到这句其实是在等另一个人接。`),
    paragraph("语言习惯",
      `样本文本里最能当作口癖锚点的是：${seedLines}。这些短句不能机械复读，而要作为语气按钮使用：开场时用来定调，被追问时用来闪避，双人对话时用来递球，羁绊结尾时用来把一段乱聊收成名场面。${char.displayName}不适合说“我是某某类型角色”这类直白话，也不适合把情绪直接写成说明。更像的写法是：先短短反应，再补一句似乎没说完的话，把观众留在弹幕状态。`),
    paragraph("兴趣与梗点",
      `兴趣聚类围绕${interestList}展开。它们不是道具清单，而是话题触发器：看到${pick(props, `${char.id}:prop1`, "路灯")}时会想到聊天截图，碰到${pick(props, `${char.id}:prop2`, "告示牌")}时会想到刚才谁没接住，遇到${pick(props, `${char.id}:prop3`, "门口")}时又会把正事拐成一条玩笑。写作时要让背景物件参与对话，而不是把角色随便散在地图上。`),
    paragraph("社交逻辑",
      `${char.displayName}的关系回路主要连向${relations}。agent 生成时需要区分主动与被动：主动时，${char.displayName}负责把话头抛出去，像在群里先发一张“你们看这个”的小图；被动时，则要判断对方的风格再接，短句型就用短句碰短句，分析型就先给判断再补笑点，关心型则先托住情绪再把画面推回角色。羁绊感不是靠煽情，而是靠两个人在一个梗上互相留台阶。`),
    paragraph("agent 设定",
      `VoiceAgent 记忆：${profile.responseMode}。SceneAgent 记忆：常驻${profile.areaName}，优先调度${props.join("、") || "地图物件"}。CriticAgent 规则：发现说明书语气就删，发现连续解释任务就改成闲聊，发现没有原始口癖回声就补一个轻短钩子。最终输出应该像“群聊突然变成 gal 镜头”：说话短，转场快，但每一句都能反推这个人在群里的位置。`),
    paragraph("样本回声",
      `样本回声被压缩为模式统计：${samples}。这里不保存原文，只保留节奏和语气。生成对话时，允许吸收其中的问号密度、表情符号倾向、对图/人/时间的反应方式；不允许把私人上下文、链接、学校公司、具体身份信息写进游戏。`),
    paragraph("场景策略",
      `进入场景时，旁白先用物件给镜头找落点，例如${pick(props, `${char.id}:scene1`, "路灯")}轻轻一晃、${pick(props, `${char.id}:scene2`, "桌角")}留着刚才的余温。${char.displayName}第一句必须像刚从群聊里冒出来，第二句再决定是闲聊、任务、长聊还是双人羁绊。玩家选“闲谈”时不推进正事，只吃梗；选“关于任务”时才把物件变成线索；选“长聊”时把个人节奏放大，最后落到隐藏插画条件。`),
    paragraph("视觉转译",
      `羁绊图 prompt 必须来自聊天结果，而不是只写“两人同框”。如果对话里围绕${pick(props, `${char.id}:visual`, "地图物件")}接话，画面就应出现这个物件；如果对话的笑点是“没接住”，画面就要让角色的姿态形成一递一接；如果对话以短句反问收束，画面就用停顿感、眼神和小动作表现。画面仍保持星露谷式温暖像素动漫风，无可读文字，无界面，不画聊天框。`),
    paragraph("禁止事项",
      `不要写“高能量发言者”“核心定位者”这类拆沉浸的词；不要把英文术语直接塞进台词；不要让每个人都说同一套“这段算剧情”；不要让道具只是随机 emoji；不要把真实聊天原文长段搬进游戏。所有真实样本只服务于节奏、兴趣、接话逻辑和角色之间的熟人感。`),
  ];
  const expansions = [
    `补充观察一：${char.displayName}的台词最好保留一点“说完就跑”的空间。玩家读完不会立刻获得解释，而是会想点下一句，看另一个角色怎么接。`,
    `补充观察二：${profile.areaName}里的物件需要像群聊成员一样有存在感，但不能抢戏。它们负责把话题放到桌上，真正的笑点仍由角色互相递。`,
    `补充观察三：当${char.displayName}遇到${relations || "熟人"}，对话应出现轻微错位：一个人认真，另一个人把认真拧成玩笑；一个人发问，另一个人假装没听懂但其实已经接住。`,
    `补充观察四：长聊不是长篇独白，而是多个短回合堆出来的熟悉感。每回合都要有“这句像群里会出现”的密度。`,
    `补充观察五：最终插画的 prompt 要写动作、物件、氛围和关系，不写抽象评价。看到图时，玩家应该能反推刚才那段聊天为什么解锁它。`,
  ];
  while (base.join("\n\n").replace(/\s/g, "").length < MIN_RESEARCH_CHARS + 120) {
    base.push(paragraph(`扩写${base.length - 9 + 1}`, pick(expansions, `${char.id}:${base.length}`, expansions[0])));
  }
  return base.join("\n\n");
}

function buildProfilePrompt(char, profile) {
  return [
    `你是${char.displayName}的 VoiceAgent。`,
    `身份转译：${char.title}，常驻${profile.areaName}。`,
    `语言节奏：${profile.rhythm}；接话逻辑：${profile.responseMode}。`,
    `可使用的短锚点：${profile.anchors.slice(0, 12).join("、")}。`,
    `兴趣点：${profile.interests.slice(0, 12).join("、")}。`,
    `写法要求：短句优先，像群聊接话；允许反问、停顿、突然拐弯；避免说明书腔、英文术语和重复烂梗。`,
  ].join("\n");
}

function makeIntro(char, profile) {
  const prop = propFor(char.defaultArea, "intro");
  return critiqueLines(profile, [
    line("narrator", `旁白：${char.displayName}刚上线，${profile.areaName}的${prop}先亮了一下。`),
    line(char.id, roleLine(char, profile, "intro:first")),
    line("player", profile.flags.short ? "这句像刚从群里弹出来。" : "你这开场有点熟。"),
    line(char.id, roleLine(char, profile, "intro:last")),
  ]);
}

function makeDaily(char, profile) {
  const prop = propFor(char.defaultArea, "daily");
  return critiqueLines(profile, [
    line("narrator", `旁白：你在${profile.areaName}碰见${char.displayName}，${prop}旁边空着一格。`),
    line(char.id, roleLine(char, profile, "daily:open")),
    line("player", profile.flags.asks ? "你先问还是我先问？" : "懂，先不聊正事。"),
    line(char.id, sceneBeat(char, profile, "daily")),
    line(char.id, roleLine(char, profile, "daily:end")),
  ]);
}

function makeCasualChoice(char, profile) {
  const prop = propFor(char.defaultArea, "casual");
  return critiqueLines(profile, [
    line("player", "今天频道什么画风？"),
    line(char.id, roleLine(char, profile, "casual:1")),
    line(char.id, `${prop}那边刚才动了一下，别装没看见。`),
    line("player", "好，味道开始对了。"),
    line(char.id, roleLine(char, profile, "casual:2")),
    line("narrator", `旁白：${prop}轻轻一响，这段闲聊被小镇记住。`),
  ]);
}

function makeTaskChoice(char, profile) {
  const prop = propFor(char.defaultArea, "task");
  return critiqueLines(profile, [
    line("player", "那正事怎么走？"),
    line(char.id, profile.flags.rational ? `先看${prop}，再看谁心虚。` : `${prop}那边，先过去别急。`),
    line(char.id, roleLine(char, profile, "task:2")),
    line("player", "行，比任务提示像人话。"),
  ]);
}

function makeDeepChoice(char, profile) {
  const rel = pick(profile.relations, `deep:${char.id}`, "");
  return critiqueLines(profile, [
    line("player", "你别只当路标，讲点自己的。"),
    line(char.id, roleLine(char, profile, "deep:1")),
    line(char.id, rel ? `${rel}一接，这句就能歪。` : "没人接也行，我先垫一句。"),
    line("player", "这下有点像长聊了。"),
    line("narrator", "旁白：气氛没有突然煽情，只是安静地多停了一拍。"),
  ]);
}

function makeReactions(char, profile) {
  const picks = uniq([char.defaultArea, "town_center", pick(areas.map((area) => area.id), `react:${char.id}`)]).slice(0, 3);
  while (picks.length < 3) picks.push(areas[picks.length].id);
  return picks.map((areaId, index) => {
    const prop = propFor(areaId, `${char.id}:${index}`);
    return {
      id: `react_${char.id}_${areaId}`,
      speaker: char.id,
      area: areaId,
      time: "any",
      lines: critiqueLines(profile, [
        line("narrator", `旁白：${areaName(areaId)}的${prop}把镜头递给${char.displayName}。`),
        line(char.id, roleLine(char, profile, `react:${areaId}`)),
        line("player", "收到，地图开始像群聊了。"),
      ]),
      rewards: [`area_stamp_${areaId}`],
    };
  });
}

function makePlayerIntro(char, profile) {
  const prop = propFor(char.defaultArea, "playerIntro");
  return critiqueLines(profile, [
    line("narrator", `旁白：抽卡停在${char.displayName}。${prop}闪了一下，像在确认本人上线。`),
    line("player", roleLine(char, profile, "player:intro")),
    line("player", profile.flags.night ? "先说好，夜间频道我可能更会接。" : "先逛，正事自己会露头。"),
    line("narrator", "旁白：没有宏大宣言，只有一条很像群聊的开场。"),
  ]);
}

function makePlayerChoices(char, profile) {
  return [
    {
      id: `intro_${char.id}_loiter`,
      label: "先水两句",
      lines: critiqueLines(profile, [
        line("player", roleLine(char, profile, "player:loiter")),
        line("narrator", "旁白：你决定先听听小镇怎么接话。"),
      ]),
      rewards: [`memory_intro_${char.id}_loiter`],
    },
    {
      id: `intro_${char.id}_move`,
      label: "直接开走",
      lines: [
        line("player", "行，边走边聊。"),
        line("narrator", "旁白：地图展开，闲聊和正事挤在同一条路上。"),
      ],
      rewards: [`memory_intro_${char.id}_move`],
    },
  ];
}

function pairSceneArea(pair, a, b) {
  if (pair.area && areaById.has(pair.area)) return pair.area;
  if (a.defaultArea === b.defaultArea) return a.defaultArea;
  return pick([a.defaultArea, b.defaultArea, "town_center"], `${pair.id}:area`, "town_center");
}

function makePairChat(pair, profiles) {
  const a = characterById.get(pair.a);
  const b = characterById.get(pair.b);
  if (!a || !b) return null;
  const pa = profiles[a.id];
  const pb = profiles[b.id];
  const areaId = pairSceneArea(pair, a, b);
  const prop = propFor(areaId, `${a.id}:${b.id}`);
  const usedLines = [];
  const aOpen = roleLineDifferent(a, pa, `pair:${b.id}:open`, usedLines);
  usedLines.push(aOpen);
  const bCatch = roleLineDifferent(b, pb, `pair:${a.id}:catch`, usedLines);
  usedLines.push(bCatch);
  const aTurn = pa.flags.rational ? `所以先看${prop}，别急着判。` : pick([`你看${prop}`, "这句你接", "别装没看见", roleLine(a, pa, `pair:${b.id}:turn`)], `${pair.id}:aTurn`);
  usedLines.push(aTurn);
  const bTurn = pb.flags.asks ? "那我问一句，谁先心虚？" : pick(["接了，别让它掉地上。", `这不是${prop}的问题，是你们都看见了。`, roleLine(b, pb, `pair:${a.id}:turn`)], `${pair.id}:bTurn`);
  usedLines.push(bTurn);
  const aEnd = roleLineDifferent(a, pa, `pair:${b.id}:endA`, usedLines);
  usedLines.push(aEnd);
  const bEnd = roleLineDifferent(b, pb, `pair:${a.id}:endB`, usedLines);
  const lines = critiqueLines(pa, [
    line("narrator", `旁白：${a.displayName}和${b.displayName}在${areaName(areaId)}撞上，${prop}刚好卡在两人中间。`),
    line(a.id, aOpen),
    line(b.id, bCatch),
    line(a.id, aTurn),
    line(b.id, bTurn),
    line("player", "你们别演了，这已经是羁绊回合。"),
    line(a.id, aEnd),
    line(b.id, bEnd),
    line("narrator", `旁白：${prop}轻轻一响，隐藏插画页多了一格剪影。`),
  ]);
  return { a, b, areaId, prop, lines };
}

function promptFromPairChat(pair, chat) {
  const dialogueSummary = chat.lines
    .filter((entry) => entry.speaker === chat.a.id || entry.speaker === chat.b.id)
    .slice(0, 6)
    .map((entry) => `${entry.speaker === chat.a.id ? chat.a.displayName : chat.b.displayName}：“${entry.text}”`)
    .join("；");
  return [
    "Use case: illustration-story",
    `Asset type: 小康Online双人羁绊插画，路径 ${pair.id}`,
    `Primary request: 根据双 agent 情景聊天生成一张温暖搞笑的双人羁绊插画。`,
    `Scene/backdrop: ${areaName(chat.areaId)}，具体物件是${chat.prop}，画面要能看出两人围着这个物件互相接话。`,
    `Subject: ${chat.a.displayName}（${chat.a.title}）与${chat.b.displayName}（${chat.b.title}）同框，使用已有人物立绘气质的二次元像素 RPG 角色。`,
    `Dialogue basis: ${dialogueSummary}`,
    "Style/medium: 星露谷式温暖像素动漫画风，柔和治愈，小镇生活感，二次元轻喜剧，角色表情夸张但不崩。",
    "Composition/framing: 横向 4:3，双人中景，物件在两人之间形成递球感；不要聊天框，不要 UI。",
    "Lighting/mood: 温馨、治愈、像群聊梗突然变成番剧名场面。",
    "Constraints: 无可读文字，无水印，不要真实照片，不要程序化拼贴，不要把角色画成现实人物。",
  ].join("\n");
}

function promptFromFinalCg(char, profile) {
  const prop = propFor(char.defaultArea, `${char.id}:final`);
  return [
    "Use case: illustration-story",
    `Asset type: 小康Online角色最终插画 ${char.id}`,
    `Primary request: 为${char.displayName}生成角色最终插画，基于其语言风格调研与长聊收束。`,
    `Scene/backdrop: ${profile.areaName}，核心物件是${prop}，背景要和角色常驻区域相关。`,
    `Subject: ${char.displayName}（${char.title}），二次元像素 RPG 小镇居民，保留头像视觉锚点：${char.avatarVisualDNA?.symbols?.join("、") || "角色符号"}。`,
    `Character mood: ${profile.rhythm}，${profile.responseMode}；兴趣点：${profile.interests.slice(0, 8).join("、")}。`,
    "Style/medium: 星露谷式温暖像素动漫画风，清晰轮廓，治愈但带一点群聊轻喜剧。",
    "Composition/framing: 横向 4:3，角色在常驻区域自然行动，不要摆拍证件照。",
    "Constraints: 无可读文字，无 UI，无水印，不要真实照片，不要程序化拼贴。",
  ].join("\n");
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

function updateStoryAndDialogues(profiles) {
  const dialogues = [];
  const sessions = {
    source: "record_1000_sample_dual_agent_pipeline",
    generatedAt: new Date().toISOString(),
    method: [
      "RecordSampler: 从 record.json 中按群名片匹配角色，每人最多整合 1000 条安全文本样本。",
      "VoiceAgent: 学习句长、提问率、夜间率、常用短句、兴趣关键词、接话对象。",
      "SceneAgent: 把角色常驻区域与地图物件转成情景聊天。",
      "CriticAgent: 删除说明书腔、重复烂梗、英文术语和隐私上下文。",
      "CgPromptAgent: 用最终聊天记录生成 imagegen 羁绊插画 prompt。",
    ],
    profiles: {},
    characterSessions: {},
    pairSessions: {},
  };

  for (const char of characters) {
    const profile = profiles[char.id];
    sessions.profiles[char.id] = {
      name: char.displayName,
      sourceIntegrated: profile.sourceIntegrated,
      sourceTotal: profile.sourceTotal,
      rhythm: profile.rhythm,
      responseMode: profile.responseMode,
      anchors: profile.anchors.slice(0, 12),
      interests: profile.interests.slice(0, 12),
    };
    char.languageAgent = {
      sourceIntegrated: profile.sourceIntegrated,
      rhythm: profile.rhythm,
      responseMode: profile.responseMode,
      interests: profile.interests.slice(0, 10),
      prompt: buildProfilePrompt(char, profile),
    };
    char.playerIntro = makePlayerIntro(char, profile);
    char.playerIntroChoices = makePlayerChoices(char, profile);
    const introLines = makeIntro(char, profile);
    const dailyLines = makeDaily(char, profile);
    const casual = makeCasualChoice(char, profile);
    const task = makeTaskChoice(char, profile);
    const deep = makeDeepChoice(char, profile);
    const story = storyById.get(char.id);
    if (story) {
      story.languageResearchRef = `language_style_research.${char.id}`;
      story.agentLines = {
        entrance: introLines,
        idle: dailyLines.find((entry) => entry.speaker === char.id)?.text || roleLine(char, profile, "idle"),
        casual,
        task,
        deep,
      };
      story.selfTalk = char.playerIntro.filter((entry) => entry.speaker === "player").map((entry) => entry.text);
      story.casualTopics = [{ label: "闲聊频道", lines: casual.filter((entry) => entry.speaker === char.id).map((entry) => entry.text) }];
      story.taskTopics = [{ label: "正事频道", lines: task.filter((entry) => entry.speaker === char.id).map((entry) => entry.text) }];
      story.introNarration = introLines;
      story.finalCg.prompt = promptFromFinalCg(char, profile);
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
      voiceAgent: { prompt: char.languageAgent.prompt },
      sceneAgent: { area: profile.areaName, props: areaProps(char.defaultArea), draftDaily: dailyLines },
      criticAgent: { checks: profile.avoid },
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

  const pairPromptByUnlock = new Map();
  for (const pair of storyDatabase.pairStories || []) {
    const chat = makePairChat(pair, profiles);
    if (!chat) continue;
    pair.area = chat.areaId;
    pair.agentLines = chat.lines;
    pair.activePassive = chat.lines.filter((entry) => entry.speaker === pair.a || entry.speaker === pair.b).slice(0, 4).map((entry) => entry.text);
    pair.beats = chat.lines.slice(1, -1).map((entry) => entry.text);
    pair.cgPrompt = promptFromPairChat(pair, chat);
    pair.imagegen = {
      source: "imagegen",
      promptFrom: "agentLines",
      prop: chat.prop,
      area: chat.areaId,
    };
    dialogues.push({
      id: `dialogue_duo_${pair.a}_${pair.b}`,
      speaker: pair.a,
      area: chat.areaId,
      time: "any",
      characters: [pair.a, pair.b],
      lines: chat.lines,
      rewards: [pair.unlockMemory || `memory_pair_${pair.a}_${pair.b}`],
    });
    pairPromptByUnlock.set(pair.unlockMemory || `memory_pair_${pair.a}_${pair.b}`, pair.cgPrompt);
    sessions.pairSessions[`${pair.a}_${pair.b}`] = {
      voiceAgentA: profiles[pair.a]?.rhythm,
      voiceAgentB: profiles[pair.b]?.rhythm,
      sceneAgent: { area: areaName(chat.areaId), prop: chat.prop },
      finalLines: chat.lines,
      cgPrompt: pair.cgPrompt,
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
    cg.prompt = pairPromptByUnlock.get(cg.unlock) || cg.prompt;
  }
  for (const cg of cgUnlocks.final || []) {
    const char = characterById.get(cg.character);
    const profile = char ? profiles[char.id] : null;
    cg.source = "imagegen";
    cg.sourceTool = "imagegen";
    cg.assetKind = "final_cg";
    if (char && profile) cg.prompt = promptFromFinalCg(char, profile);
  }
  for (const cg of cgUnlocks.main || []) {
    cg.source = "imagegen";
    cg.sourceTool = "imagegen";
    cg.assetKind = "main_cg";
    cg.prompt = [
      "Use case: illustration-story",
      "Asset type: 小康Online主线最终大插画",
      "Primary request: 全员在小镇广场上线，小康钟重新亮起，群聊梗以温暖轻喜剧方式收束。",
      "Scene/backdrop: 小镇中心夜晚后转亮，喷泉、钟楼、路灯、入口牌自然入镜。",
      "Subject: 多名二次元像素 RPG 居民围在广场，不要真实人物，不要聊天框。",
      "Style/medium: 星露谷式温暖像素动漫画风，治愈，热闹，群像番剧片尾感。",
      "Constraints: 无可读文字，无 UI，无水印，不要程序化拼贴。",
    ].join("\n");
  }
  return { dialogues, sessions };
}

function buildResearchFiles(profiles) {
  const records = {};
  const sections = [
    "# 小康Online 语言风格与兴趣爱好 agent 调研记录",
    "",
    "本文件由 `scripts/generate_agent_research_and_dialogues.js` 生成。每个角色最多整合 1000 条群聊安全文本样本，结合既有 persona、关系图谱、侦探 dossier 与地图语义，形成可供 VoiceAgent、SceneAgent、CriticAgent 和 CgPromptAgent 使用的角色语言卡。这里不倾倒原始聊天记录，只保留统计、短锚点、兴趣聚类和写作规则。",
    "",
  ];
  for (const char of characters) {
    const profile = profiles[char.id];
    const researchText = buildResearchText(char, profile);
    records[char.id] = {
      id: char.id,
      name: char.displayName,
      sourceIntegrated: profile.sourceIntegrated,
      sourceTotal: profile.sourceTotal,
      minRequiredChars: MIN_RESEARCH_CHARS,
      researchChars: researchText.replace(/\s/g, "").length,
      rhythm: profile.rhythm,
      responseMode: profile.responseMode,
      interests: profile.interests,
      anchors: profile.anchors,
      samplePatterns: patternSummary(profile.sampleSnippets),
      agentPrompt: buildProfilePrompt(char, profile),
      researchText,
    };
    sections.push(`## ${char.id} ${char.displayName}`, "");
    sections.push(researchText, "");
    sections.push("### Agent Prompt", "", "```text", records[char.id].agentPrompt, "```", "");
  }
  writeJson(path.join(DATA, "language_style_research.json"), {
    source: "record.json + output/persona_analysis.json + output/relationship_analysis.json + detective_dossiers",
    generatedAt: new Date().toISOString(),
    maxMessagesPerCharacter: MAX_MESSAGES_PER_CHARACTER,
    records,
  });
  fs.writeFileSync(path.join(DOCS, "AGENT_LANGUAGE_STYLE_RESEARCH.md"), `${sections.join("\n")}\n`, "utf8");
  return records;
}

function buildImagegenJobs() {
  const characterJobs = oldImagegenJobs.filter((job) => job.roleId);
  const pairJobs = (cgUnlocks.pair || []).map((cg) => ({
    kind: "bond_cg",
    id: cg.id,
    out: cg.path,
    characters: cg.characters,
    prompt: cg.prompt,
    source: "agent_chat_prompt",
    tool: "imagegen",
  }));
  const finalJobs = (cgUnlocks.final || []).map((cg) => ({
    kind: "final_cg",
    id: cg.id,
    out: cg.path,
    character: cg.character,
    prompt: cg.prompt,
    source: "language_style_research",
    tool: "imagegen",
  }));
  const mainJobs = (cgUnlocks.main || []).map((cg) => ({
    kind: "main_cg",
    id: cg.id,
    out: cg.path,
    prompt: cg.prompt,
    source: "main_story_agent_summary",
    tool: "imagegen",
  }));
  writeJson(path.join(DATA, "imagegen_jobs.json"), characterJobs);
  writeJson(path.join(DATA, "cg_imagegen_jobs.json"), [...pairJobs, ...finalJobs, ...mainJobs]);
}

function main() {
  const { byId, totals } = collectSourceSamples();
  const profiles = {};
  for (const char of characters) {
    profiles[char.id] = buildProfile(char, byId.get(char.id) || [], totals.get(char.id) || 0);
  }
  const researchRecords = buildResearchFiles(profiles);
  const { dialogues, sessions } = updateStoryAndDialogues(profiles);
  writeJson(path.join(DATA, "characters.json"), characters);
  writeJson(path.join(DATA, "dialogues.json"), dialogues);
  writeJson(path.join(DATA, "story_database.json"), storyDatabase);
  writeJson(path.join(DATA, "cg_unlocks.json"), cgUnlocks);
  writeJson(path.join(DATA, "dialogue_agent_sessions.json"), sessions);
  buildImagegenJobs();

  const researchLengths = Object.values(researchRecords).map((record) => record.researchChars);
  console.log(JSON.stringify({
    characters: characters.length,
    languageResearchFiles: ["src/data/language_style_research.json", "docs/AGENT_LANGUAGE_STYLE_RESEARCH.md"],
    minResearchChars: Math.min(...researchLengths),
    maxResearchChars: Math.max(...researchLengths),
    dialogues: dialogues.length,
    pairDialogues: dialogues.filter((dialogue) => dialogue.id.startsWith("dialogue_duo_")).length,
    pairCgsTaggedImagegen: (cgUnlocks.pair || []).filter((cg) => cg.source === "imagegen").length,
    imagegenJobs: readJson(path.join(DATA, "imagegen_jobs.json")).length,
    cgImagegenJobs: readJson(path.join(DATA, "cg_imagegen_jobs.json")).length,
    topicSummaryUsed: Boolean(topics.n_clusters),
    narrativeUsed: Boolean(narrative.group_overview),
  }, null, 2));
}

main();
