const DATA = window.XIAOKANG_DATA;
const SAVE_KEY = "xiaokang-online-save-v1";
const SAVE_VERSION = 2;
const TILE = 48;
const DISTRICT_GAP = 0;
const DISTRICT_COLUMNS = 1;
const DISTRICT_ROWS = 1;
const DISTRICT_GRID = [["town_center"]];
const DISTRICT_WIDTH = 28;
const DISTRICT_HEIGHT = 20;
const WORLD_WIDTH = DISTRICT_WIDTH;
const WORLD_HEIGHT = DISTRICT_HEIGHT;
const WORLD_BACKGROUND = "assets/imagegen/environment/full_maps/xiaokang_town_overworld_imagegen.png";
const LEGACY_CONDITION_FEEDBACK_KEYWORD = "没有重连";
const INDOOR_AREAS = new Set(["restaurant", "dragon_card_house", "livehouse", "care_home", "atelier", "server_room"]);
const SCENE_AREAS = new Set(["restaurant", "dragon_card_house", "livehouse", "echo_lake", "care_home", "atelier", "northern_wilds", "server_room"]);
const DISTRICT_LAYOUT = new Map();

DISTRICT_GRID.forEach((row, rowIndex) => {
  row.forEach((areaId, columnIndex) => {
    DISTRICT_LAYOUT.set(areaId, {
      id: areaId,
      x: columnIndex * (DISTRICT_WIDTH + DISTRICT_GAP),
      y: rowIndex * (DISTRICT_HEIGHT + DISTRICT_GAP),
      width: DISTRICT_WIDTH,
      height: DISTRICT_HEIGHT,
    });
  });
});

const camera = { x: 0, y: 0 };

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const state = {
  screen: "boot",
  playerId: null,
  areaId: "town_center",
  x: 44,
  y: 32,
  time: "day",
  facing: "down",
  path: [],
  pendingAction: null,
  lastStepAt: 0,
  keys: new Set(),
  unlockedAreas: new Set(["town_center", "restaurant", "dragon_card_house"]),
  completedQuests: new Set(),
  activeQuests: new Set(["main_quest_01"]),
  trackedQuestId: "main_quest_01",
  codex: new Set(),
  memories: new Set(),
  inventory: {
    star_sand: 0,
    online_echo: 0,
    poem_page: 0,
    card_shard: 0,
    meal_ticket: 0,
    palette_chip: 0,
  },
  pickedInteractions: new Set(),
  bonds: {},
  settings: {
    textSpeed: 1,
    volume: 60,
    showGrid: false,
    pixelatedMap: true,
  },
  selectedCandidateId: null,
  dialogue: null,
  dialogueTyping: {
    timer: null,
    fullText: "",
    done: true,
  },
  lastTick: 0,
  nearby: null,
};

const ALL_CGS = [
  ...(DATA.cg_unlocks?.main || []),
  ...(DATA.cg_unlocks?.task || []),
  ...(DATA.cg_unlocks?.pair || []),
  ...(DATA.cg_unlocks?.final || []),
];

const indexes = {
  characters: new Map(DATA.characters.map((item) => [item.id, item])),
  areas: new Map(DATA.areas.map((item) => [item.id, item])),
  maps: new Map(DATA.maps.map((item) => [item.id, item])),
  quests: new Map(DATA.quests.map((item) => [item.id, item])),
  tiles: new Map((DATA.tiles?.baseTiles || []).map((item) => [item.id, item])),
  decor: new Map((DATA.tiles?.decorGroups || []).map((item) => [item.id, item])),
  taskCgs: new Map((DATA.task_cgs || []).map((item) => [item.id, item])),
  dialoguesBySpeaker: new Map(),
  dialoguesByArea: new Map(),
  storyByCharacter: new Map((DATA.story_database?.characterStories || []).map((item) => [item.id, item])),
  cgs: new Map(ALL_CGS.map((item) => [item.id, item])),
  pairStoriesByCharacter: new Map(),
};

for (const dialogue of DATA.dialogues) {
  if (dialogue.speaker) {
    if (!indexes.dialoguesBySpeaker.has(dialogue.speaker)) indexes.dialoguesBySpeaker.set(dialogue.speaker, []);
    indexes.dialoguesBySpeaker.get(dialogue.speaker).push(dialogue);
  }
  if (!indexes.dialoguesByArea.has(dialogue.area)) indexes.dialoguesByArea.set(dialogue.area, []);
  indexes.dialoguesByArea.get(dialogue.area).push(dialogue);
}

for (const story of DATA.story_database?.pairStories || []) {
  for (const charId of [story.a, story.b]) {
    if (!indexes.pairStoriesByCharacter.has(charId)) indexes.pairStoriesByCharacter.set(charId, []);
    indexes.pairStoriesByCharacter.get(charId).push(story);
  }
}

const canvas = $("#gameCanvas");
const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;
const imageCache = new Map();
const maskDataCache = new Map();
const musicState = {
  ctx: null,
  master: null,
  dry: null,
  scheduler: null,
  nextNoteTime: 0,
  step: 0,
  areaId: "",
};

const AREA_MUSIC_PRESETS = {
  town_center: {
    tempo: 78,
    bassVelocity: 0.13,
    chordVelocity: 0.075,
    melodyVelocity: 0.052,
    progression: [
      { bass: "C3", chord: ["C4", "E4", "G4", "B4"], melody: ["E5", null, "G5", null, "B4", null, "G5", null] },
      { bass: "G2", chord: ["D4", "G4", "B4", "D5"], melody: ["D5", null, "B4", null, "G4", null, "A4", null] },
      { bass: "A2", chord: ["C4", "E4", "A4", "C5"], melody: ["C5", null, "E5", null, "A4", null, "G4", null] },
      { bass: "F2", chord: ["C4", "F4", "A4", "C5"], melody: ["A4", null, "C5", null, "F5", null, "E5", null] },
    ],
  },
  restaurant: {
    tempo: 92,
    bassVelocity: 0.11,
    chordVelocity: 0.07,
    melodyVelocity: 0.055,
    progression: [
      { bass: "F3", chord: ["A3", "C4", "F4", "G4"], melody: ["C5", "A4", null, "C5", "D5", null, "C5", null] },
      { bass: "C3", chord: ["G3", "C4", "E4", "A4"], melody: ["E5", null, "D5", null, "C5", "A4", null, null] },
      { bass: "D3", chord: ["F3", "A3", "D4", "F4"], melody: ["A4", "C5", null, "D5", null, "C5", "A4", null] },
      { bass: "G2", chord: ["G3", "B3", "D4", "F4"], melody: ["B4", null, "D5", null, "F5", "D5", null, null] },
    ],
  },
  dragon_card_house: {
    tempo: 86,
    bassVelocity: 0.12,
    chordVelocity: 0.072,
    melodyVelocity: 0.05,
    progression: [
      { bass: "D3", chord: ["D4", "F4", "A4", "C5"], melody: ["A5", null, "F5", null, "D5", null, "C5", null] },
      { bass: "A2", chord: ["C4", "E4", "A4", "C5"], melody: ["E5", "A5", null, "G5", null, "E5", null, null] },
      { bass: "B2", chord: ["B3", "D4", "F4", "A4"], melody: ["F5", null, "D5", null, "B4", null, "A4", null] },
      { bass: "E3", chord: ["B3", "E4", "G4", "B4"], melody: ["G5", null, "B5", null, "E5", null, "D5", null] },
    ],
  },
  livehouse: {
    tempo: 102,
    bassVelocity: 0.12,
    chordVelocity: 0.082,
    melodyVelocity: 0.06,
    progression: [
      { bass: "E3", chord: ["E4", "G4", "B4", "D5"], melody: ["B5", null, "G5", "E5", null, "G5", "A5", null] },
      { bass: "C3", chord: ["E4", "G4", "C5", "E5"], melody: ["C6", null, "B5", null, "G5", "E5", null, null] },
      { bass: "G2", chord: ["D4", "G4", "B4", "D5"], melody: ["D6", "B5", null, "G5", null, "A5", "B5", null] },
      { bass: "D3", chord: ["D4", "F4", "A4", "C5"], melody: ["A5", null, "F5", null, "D5", null, "E5", null] },
    ],
  },
  echo_lake: {
    tempo: 66,
    bassVelocity: 0.1,
    chordVelocity: 0.052,
    melodyVelocity: 0.045,
    progression: [
      { bass: "A2", chord: ["C4", "E4", "A4", "B4"], melody: ["E5", null, null, "A5", null, "B5", null, null] },
      { bass: "F2", chord: ["C4", "F4", "A4", "C5"], melody: ["C5", null, "E5", null, "A4", null, null, null] },
      { bass: "C3", chord: ["G3", "C4", "E4", "G4"], melody: ["G5", null, null, "E5", null, "C5", null, null] },
      { bass: "G2", chord: ["D4", "G4", "B4", "D5"], melody: ["D5", null, "B4", null, "G4", null, null, null] },
    ],
  },
  care_home: {
    tempo: 70,
    bassVelocity: 0.1,
    chordVelocity: 0.055,
    melodyVelocity: 0.044,
    progression: [
      { bass: "F2", chord: ["A3", "C4", "F4", "A4"], melody: ["C5", null, "A4", null, "F4", null, "A4", null] },
      { bass: "C3", chord: ["G3", "C4", "E4", "G4"], melody: ["E5", null, "C5", null, "G4", null, null, null] },
      { bass: "D3", chord: ["A3", "D4", "F4", "A4"], melody: ["F5", null, "D5", null, "A4", null, "C5", null] },
      { bass: "B2", chord: ["G3", "B3", "D4", "G4"], melody: ["D5", null, "B4", null, "G4", null, null, null] },
    ],
  },
  atelier: {
    tempo: 88,
    bassVelocity: 0.11,
    chordVelocity: 0.07,
    melodyVelocity: 0.055,
    progression: [
      { bass: "G2", chord: ["B3", "D4", "G4", "A4"], melody: ["D5", "G5", null, "A5", null, "G5", "D5", null] },
      { bass: "E3", chord: ["B3", "E4", "G4", "B4"], melody: ["E5", null, "G5", null, "B5", null, "G5", null] },
      { bass: "C3", chord: ["C4", "E4", "G4", "C5"], melody: ["C5", "E5", null, "G5", null, "C6", null, null] },
      { bass: "D3", chord: ["A3", "D4", "F4", "A4"], melody: ["A5", null, "F5", null, "D5", null, "E5", null] },
    ],
  },
  northern_wilds: {
    tempo: 76,
    bassVelocity: 0.13,
    chordVelocity: 0.06,
    melodyVelocity: 0.05,
    progression: [
      { bass: "E2", chord: ["B3", "E4", "G4", "B4"], melody: ["G5", null, "E5", null, "B4", null, "E5", null] },
      { bass: "G2", chord: ["D4", "G4", "B4", "D5"], melody: ["B5", null, "G5", null, "D5", null, null, null] },
      { bass: "D3", chord: ["A3", "D4", "F4", "A4"], melody: ["A5", null, "F5", null, "D5", null, "C5", null] },
      { bass: "C3", chord: ["G3", "C4", "E4", "G4"], melody: ["E5", null, "G5", null, "C6", null, "B5", null] },
    ],
  },
  server_room: {
    tempo: 96,
    bassVelocity: 0.12,
    chordVelocity: 0.065,
    melodyVelocity: 0.048,
    progression: [
      { bass: "C2", chord: ["G3", "C4", "E4", "G4"], melody: ["C5", null, "G5", null, "E5", null, "C5", null] },
      { bass: "E2", chord: ["B3", "E4", "G4", "B4"], melody: ["B5", null, "G5", null, "E5", null, "D5", null] },
      { bass: "A2", chord: ["C4", "E4", "A4", "C5"], melody: ["A5", null, "C6", null, "E5", null, "A5", null] },
      { bass: "G2", chord: ["B3", "D4", "G4", "B4"], melody: ["G5", null, "D5", null, "B4", null, "G4", null] },
    ],
  },
};

function getImage(src) {
  if (!imageCache.has(src)) {
    const img = new Image();
    img.src = src;
    imageCache.set(src, img);
  }
  return imageCache.get(src);
}

function ensureMusic() {
  if (window.__XIAOKANG_SCREENSHOT_MODE || state.settings.volume <= 0) return;
  if (musicState.ctx) {
    if (musicState.ctx.state === "suspended") musicState.ctx.resume();
    updateMusicVolume();
    return;
  }
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;
  try {
    const audioCtx = new AudioContextClass();
    const master = audioCtx.createGain();
    master.gain.value = 0;
    master.connect(audioCtx.destination);

    const dry = audioCtx.createGain();
    dry.gain.value = 0.9;
    const warmth = audioCtx.createBiquadFilter();
    warmth.type = "lowpass";
    warmth.frequency.value = 2600;
    warmth.Q.value = 0.45;
    dry.connect(warmth);
    warmth.connect(master);

    const delay = audioCtx.createDelay(1.2);
    delay.delayTime.value = 0.32;
    const feedback = audioCtx.createGain();
    feedback.gain.value = 0.18;
    const echo = audioCtx.createGain();
    echo.gain.value = 0.12;
    dry.connect(delay);
    delay.connect(feedback);
    feedback.connect(delay);
    delay.connect(echo);
    echo.connect(master);

    musicState.ctx = audioCtx;
    musicState.master = master;
    musicState.dry = dry;
    musicState.nextNoteTime = audioCtx.currentTime + 0.08;
    musicState.step = 0;
    musicState.scheduler = window.setInterval(scheduleMusicLoop, 90);
    updateMusicVolume();
  } catch {
    musicState.ctx = null;
  }
}

function updateMusicVolume() {
  if (!musicState.master || !musicState.ctx) return;
  musicState.master.gain.setTargetAtTime(state.settings.volume / 850, musicState.ctx.currentTime, 0.35);
}

function noteFrequency(note) {
  const match = /^([A-G])(#?)(-?\d)$/.exec(note);
  if (!match) return 440;
  const semitones = { C: -9, D: -7, E: -5, F: -4, G: -2, A: 0, B: 2 };
  const [, name, sharp, octaveText] = match;
  const octave = Number(octaveText);
  return 440 * 2 ** ((semitones[name] + (sharp ? 1 : 0) + (octave - 4) * 12) / 12);
}

function playPianoNote(note, start, duration = 0.62, velocity = 0.16) {
  const audioCtx = musicState.ctx;
  if (!audioCtx || !musicState.dry) return;
  const freq = noteFrequency(note);
  const gain = audioCtx.createGain();
  const tone = audioCtx.createOscillator();
  const shimmer = audioCtx.createOscillator();
  const filter = audioCtx.createBiquadFilter();
  tone.type = "triangle";
  shimmer.type = "sine";
  tone.frequency.setValueAtTime(freq, start);
  shimmer.frequency.setValueAtTime(freq * 2.01, start);
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(2100 + velocity * 2600, start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(Math.max(0.002, velocity), start + 0.025);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  tone.connect(filter);
  shimmer.connect(filter);
  filter.connect(gain);
  gain.connect(musicState.dry);
  tone.start(start);
  shimmer.start(start);
  tone.stop(start + duration + 0.08);
  shimmer.stop(start + duration + 0.08);
}

function playButtonDing() {
  const audioCtx = musicState.ctx;
  if (window.__XIAOKANG_SCREENSHOT_MODE || state.settings.volume <= 0 || !audioCtx || !musicState.dry) return;
  const start = audioCtx.currentTime;
  const gain = audioCtx.createGain();
  const chime = audioCtx.createOscillator();
  const sparkle = audioCtx.createOscillator();
  const filter = audioCtx.createBiquadFilter();
  chime.type = "sine";
  sparkle.type = "triangle";
  chime.frequency.setValueAtTime(noteFrequency("E6"), start);
  sparkle.frequency.setValueAtTime(noteFrequency("B6"), start + 0.015);
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(4200, start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(0.12, start + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.18);
  chime.connect(filter);
  sparkle.connect(filter);
  filter.connect(gain);
  gain.connect(musicState.dry);
  chime.start(start);
  sparkle.start(start + 0.015);
  chime.stop(start + 0.2);
  sparkle.stop(start + 0.18);
}

function playQuestCompleteDing() {
  if (window.__XIAOKANG_SCREENSHOT_MODE || state.settings.volume <= 0) return;
  ensureMusic();
  const audioCtx = musicState.ctx;
  if (!audioCtx || !musicState.dry) return;
  const start = audioCtx.currentTime + 0.02;
  const notes = ["C6", "E6", "G6", "C7"];
  notes.forEach((note, index) => {
    playPianoNote(note, start + index * 0.105, 0.32, index === notes.length - 1 ? 0.11 : 0.085);
  });
}

function playAreaUnlockDing() {
  if (window.__XIAOKANG_SCREENSHOT_MODE || state.settings.volume <= 0) return;
  ensureMusic();
  const audioCtx = musicState.ctx;
  if (!audioCtx || !musicState.dry) return;
  const start = audioCtx.currentTime + 0.03;
  ["G5", "B5", "D6"].forEach((note, index) => {
    playPianoNote(note, start + index * 0.12, 0.42, 0.075);
  });
}

function scheduleMusicLoop() {
  const audioCtx = musicState.ctx;
  if (!audioCtx || state.settings.volume <= 0) return;
  const preset = AREA_MUSIC_PRESETS[state.areaId] || AREA_MUSIC_PRESETS.town_center;
  if (musicState.areaId !== state.areaId) {
    musicState.areaId = state.areaId;
    musicState.step = 0;
    musicState.nextNoteTime = Math.max(musicState.nextNoteTime, audioCtx.currentTime + 0.08);
  }
  const secondsPerBeat = 60 / (preset.tempo || 78);
  const stepDuration = secondsPerBeat / 2;
  const progression = preset.progression || AREA_MUSIC_PRESETS.town_center.progression;
  const horizon = audioCtx.currentTime + 0.45;
  while (musicState.nextNoteTime < horizon) {
    const localStep = musicState.step % (progression.length * 8);
    const bar = progression[Math.floor(localStep / 8)];
    const beatStep = localStep % 8;
    const t = musicState.nextNoteTime;
    const nightScale = state.time === "night" ? 0.88 : state.time === "dusk" ? 0.94 : 1;
    if (beatStep === 0) playPianoNote(bar.bass, t, stepDuration * 3.5, (preset.bassVelocity || 0.13) * nightScale);
    const chordNote = bar.chord[beatStep % bar.chord.length];
    playPianoNote(chordNote, t, stepDuration * 1.7, (preset.chordVelocity || 0.075) * nightScale);
    if (bar.melody[beatStep]) playPianoNote(bar.melody[beatStep], t + 0.02, stepDuration * 1.35, (preset.melodyVelocity || 0.052) * nightScale);
    if (beatStep === 4) playPianoNote(bar.bass, t, stepDuration * 2.1, (preset.bassVelocity || 0.13) * 0.54 * nightScale);
    musicState.nextNoteTime += stepDuration;
    musicState.step += 1;
  }
}

function getMaskData(map) {
  if (!map?.walkMask) return null;
  const img = getImage(map.walkMask);
  if (!img.complete || img.naturalWidth === 0) return null;
  const key = `${map.id}:${img.naturalWidth}x${img.naturalHeight}`;
  if (maskDataCache.has(key)) return maskDataCache.get(key);
  try {
    const offscreen = document.createElement("canvas");
    offscreen.width = img.naturalWidth;
    offscreen.height = img.naturalHeight;
    const offCtx = offscreen.getContext("2d", { willReadFrequently: true });
    offCtx.drawImage(img, 0, 0);
    const payload = {
      width: img.naturalWidth,
      height: img.naturalHeight,
      data: offCtx.getImageData(0, 0, img.naturalWidth, img.naturalHeight).data,
    };
    maskDataCache.set(key, payload);
    return payload;
  } catch {
    return null;
  }
}

function maskAllowsTile(map, x, y) {
  const mask = getMaskData(map);
  if (!mask) return null;
  const px = clamp(Math.floor(((x + 0.5) / map.width) * mask.width), 0, mask.width - 1);
  const py = clamp(Math.floor(((y + 0.5) / map.height) * mask.height), 0, mask.height - 1);
  const index = (py * mask.width + px) * 4;
  const brightness = (mask.data[index] + mask.data[index + 1] + mask.data[index + 2]) / 3;
  return brightness > 128;
}

function nowMs() {
  return typeof performance !== "undefined" && performance.now ? performance.now() : Date.now();
}

function localToWorld(areaId, x, y) {
  return { x, y };
}

function worldToLocal(areaId, x, y) {
  return { x, y };
}

function districtAt(x, y) {
  if (x < 0 || y < 0 || x >= WORLD_WIDTH || y >= WORLD_HEIGHT) return null;
  return { id: state.areaId, x: 0, y: 0, width: WORLD_WIDTH, height: WORLD_HEIGHT };
}

function districtCenter(areaId) {
  return {
    x: Math.floor(WORLD_WIDTH / 2),
    y: Math.floor(WORLD_HEIGHT / 2),
  };
}

function isAreaUnlocked(areaId) {
  return state.unlockedAreas.has(areaId);
}

function worldToScreen(x, y) {
  return {
    x: x * TILE - camera.x,
    y: y * TILE - camera.y,
  };
}

function centerOfTile(x, y) {
  const screen = worldToScreen(x, y);
  return {
    x: screen.x + TILE / 2,
    y: screen.y + TILE / 2,
  };
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function updateCamera() {
  const worldPixelWidth = WORLD_WIDTH * TILE;
  const worldPixelHeight = WORLD_HEIGHT * TILE;
  camera.x = clamp(state.x * TILE + TILE / 2 - canvas.width / 2, 0, Math.max(0, worldPixelWidth - canvas.width));
  camera.y = clamp(state.y * TILE + TILE / 2 - canvas.height / 2, 0, Math.max(0, worldPixelHeight - canvas.height));
}

function showScreen(name) {
  state.screen = name;
  if (document.body?.dataset) document.body.dataset.screen = name;
  if (name === "select") renderCharacterSelect();
  $$(".screen").forEach((screen) => screen.classList.remove("is-active"));
  $(`#${name}Screen`)?.classList.add("is-active");
}

function toast(text, duration = 2300) {
  const el = $("#toast");
  el.textContent = text;
  el.hidden = false;
  window.clearTimeout(toast.timer);
  toast.timer = window.setTimeout(() => {
    el.hidden = true;
  }, duration);
}

// 居中任务提示弹窗——手动关闭 + 自动消失
let questNotifyTimer = null;
function questNotify(title, body, duration = 5000) {
  const el = $("#questNotify");
  if (!el) return;
  const titleEl = $("#questNotifyTitle");
  const bodyEl = $("#questNotifyBody");
  if (titleEl) titleEl.textContent = title;
  if (bodyEl) bodyEl.textContent = body;
  el.hidden = false;
  el.classList.add("is-active");
  playButtonDing();
  window.clearTimeout(questNotifyTimer);
  if (duration > 0) {
    questNotifyTimer = window.setTimeout(() => {
      el.classList.remove("is-active");
      window.setTimeout(() => { el.hidden = true; }, 300);
    }, duration);
  }
}
function closeQuestNotify() {
  const el = $("#questNotify");
  if (!el) return;
  window.clearTimeout(questNotifyTimer);
  el.classList.remove("is-active");
  window.setTimeout(() => { el.hidden = true; }, 300);
}

function saveGame(options = {}) {
  const payload = {
    version: SAVE_VERSION,
    playerId: state.playerId,
    areaId: state.areaId,
    x: state.x,
    y: state.y,
    time: state.time,
    unlockedAreas: [...state.unlockedAreas],
    completedQuests: [...state.completedQuests],
    activeQuests: [...state.activeQuests],
    trackedQuestId: state.trackedQuestId,
    codex: [...state.codex],
    memories: [...state.memories],
    inventory: state.inventory,
    pickedInteractions: [...state.pickedInteractions],
    bonds: state.bonds,
    settings: state.settings,
  };
  localStorage.setItem(SAVE_KEY, JSON.stringify(payload));
  if (!options.silent) toast("进度已保存");
}

function loadGame() {
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) {
    toast("还没有存档");
    return false;
  }
  try {
    const payload = JSON.parse(raw);
    state.playerId = payload.playerId;
    state.areaId = payload.areaId || "town_center";
    if (payload.version === SAVE_VERSION) {
      state.x = payload.x || districtCenter(state.areaId).x;
      state.y = payload.y || districtCenter(state.areaId).y;
    } else {
      const point = localToWorld(state.areaId, payload.x || 14, payload.y || 10);
      state.x = point.x;
      state.y = point.y;
    }
    state.time = payload.time || "day";
    state.unlockedAreas = new Set(payload.unlockedAreas || ["town_center", "restaurant", "dragon_card_house"]);
    state.completedQuests = new Set(payload.completedQuests || []);
    state.activeQuests = new Set(payload.activeQuests || ["main_quest_01"]);
    state.trackedQuestId = payload.trackedQuestId || state.activeQuests.values().next().value || "main_quest_01";
    state.codex = new Set(payload.codex || []);
    state.memories = new Set(payload.memories || []);
    state.inventory = { ...state.inventory, ...(payload.inventory || {}) };
    state.pickedInteractions = new Set(payload.pickedInteractions || []);
    state.bonds = payload.bonds || {};
    state.settings = { ...state.settings, ...(payload.settings || {}) };
    updateAreaFromPosition(false);
    showScreen("game");
    updateHud();
    toast("存档读取完成");
    return true;
  } catch {
    toast("存档损坏，已保留原文件");
    return false;
  }
}

function resetGame() {
  localStorage.removeItem(SAVE_KEY);
  location.reload();
}

function cssVarColor(hex, fallback) {
  return /^#[0-9a-f]{6}$/i.test(hex) ? hex : fallback;
}

function avatarMarkup(char) {
  const colors = char.avatarVisualDNA.primaryColors;
  return `<div class="avatar-frame" style="--asset-a:${cssVarColor(colors[0], "#d65f5b")};--asset-b:${cssVarColor(colors[1], "#5da1a0")}">
    <img src="${char.avatar}" alt="${char.displayName} 像素头像" onerror="this.remove(); this.parentElement.textContent='待导入';" />
  </div>`;
}

function renderCharacterSelect() {
  const grid = $("#characterGrid");
  if (!state.selectedCandidateId) state.selectedCandidateId = randomCharacterId();
  const selected = indexes.characters.get(state.selectedCandidateId) || DATA.characters[0];
  const story = indexes.storyByCharacter.get(selected.id);
  const intro = polishText(story?.selfTalk?.[0] || selected.codexBlurb || selected.storyChapters?.[0] || "这个人刚上线，空气里已经有梗在排队。", selected.id);
  grid.innerHTML = `<div class="character-showcase" aria-label="角色橱窗">
    ${DATA.characters
      .map((char) => `<button class="character-card ${char.id === selected.id ? "is-selected" : ""}" data-preview="${char.id}" title="${char.displayName}">
        <span class="select-portrait">
          <img src="${char.portrait}" alt="${char.displayName} 立绘" />
        </span>
        <span class="select-name">${char.displayName}</span>
      </button>`)
      .join("")}
  </div>
  <aside class="character-choice-detail">
    <div class="choice-art">
      <img src="${selected.portrait}" alt="${selected.displayName} 立绘" />
    </div>
    <div class="choice-copy">
      <p class="server-name">当前选择</p>
      <h3>${selected.displayName}</h3>
      <p>${selected.title}</p>
      <p class="muted">${intro}</p>
      <p class="gacha-copy">命运抽签结果已出炉。要是这位主角气场不对，直接重抽，群聊宇宙不会追究。</p>
      <div class="choice-actions">
        <button data-action="rollCharacter">重新抽取</button>
        <button class="primary" data-select="${selected.id}">继续</button>
      </div>
    </div>
  </aside>`;
}

function randomCharacterId(exceptId = "") {
  const pool = DATA.characters.filter((char) => char.id !== exceptId);
  const picks = pool.length ? pool : DATA.characters;
  return picks[Math.floor(Math.random() * picks.length)]?.id || DATA.characters[0]?.id;
}

function rollCharacter() {
  state.selectedCandidateId = randomCharacterId(state.selectedCandidateId);
  renderCharacterSelect();
}

function selectCandidate(charId) {
  if (!indexes.characters.has(charId)) return;
  state.selectedCandidateId = charId;
  renderCharacterSelect();
}

function renderBootCast() {
  const cast = $("#bootCast");
  if (!cast) return;
  const picks = DATA.characters.slice(0, 10);
  cast.innerHTML = picks
    .map((char, index) => {
      const left = 43 + index * 6.2;
      const delay = (index % 5) * -0.42;
      const scale = 0.86 + (index % 4) * 0.08;
      return `<img src="${char.portrait}" alt="" style="left:${left}%; animation-delay:${delay}s; transform:scale(${scale});" />`;
    })
    .join("");
}

function startGame(playerId) {
  ensureMusic();
  state.playerId = playerId;
  state.areaId = "town_center";
  const start = localToWorld("town_center", 14, 10);
  state.x = start.x;
  state.y = start.y;
  state.path = [];
  state.pendingAction = null;
  state.codex.add(playerId);
  state.activeQuests.add("main_quest_01");
  state.trackedQuestId = "main_quest_01";
  showScreen("game");
  updateHud();
  openPlayerIntro(playerId);
  saveGame();
}

function currentMap() {
  return indexes.maps.get(state.areaId);
}

function currentArea() {
  return indexes.areas.get(state.areaId);
}

function isTransitionBoundaryTile(map, x, y) {
  return (map.transitions || []).some((transition) => {
    if (x === 0 && transition.x <= 1 && y === transition.y) return true;
    if (x === map.width - 1 && transition.x >= map.width - 2 && y === transition.y) return true;
    if (y === 0 && transition.y <= 1 && x === transition.x) return true;
    if (y === map.height - 1 && transition.y >= map.height - 2 && x === transition.x) return true;
    return false;
  });
}

function localTileBlocked(map, x, y) {
  if (!map || x < 0 || y < 0 || x >= map.width || y >= map.height) return false;
  if ((map.walkOverrides || []).some((point) => point.x === x && point.y === y)) return false;
  const maskAllows = maskAllowsTile(map, x, y);
  if (maskAllows !== null) return !maskAllows;
  if (x === 0 || y === 0 || x === map.width - 1 || y === map.height - 1) {
    return !isTransitionBoundaryTile(map, x, y);
  }
  return map.collision[y]?.[x] === 1;
}

function blockedMessage(x, y) {
  if (x < 0 || y < 0 || x >= WORLD_WIDTH || y >= WORLD_HEIGHT) return "再往外就是聊天记录的天涯海角了";
  return "这里走不过去";
}

function tileBlocked(x, y) {
  if (x < 0 || y < 0 || x >= WORLD_WIDTH || y >= WORLD_HEIGHT) return true;
  const map = currentMap();
  return localTileBlocked(map, x, y);
}

function updateAreaFromPosition(announce = true) {
  state.codex.add(`area_${state.areaId}`);
}

function movePlayerTo(nx, ny, announceArea = true) {
  state.x = nx;
  state.y = ny;
  updateAreaFromPosition(announceArea);
  checkTransition();
  updateNearby();
  updateHud();
}

function tryMove(dx, dy, fromPath = false) {
  if ($("#dialogueBox").hidden === false || $("#modalLayer").hidden === false) return;
  if (!fromPath) {
    state.path = [];
    state.pendingAction = null;
  }
  const nx = state.x + dx;
  const ny = state.y + dy;
  if (dx > 0) state.facing = "right";
  if (dx < 0) state.facing = "left";
  if (dy > 0) state.facing = "down";
  if (dy < 0) state.facing = "up";
  if (tileBlocked(nx, ny)) {
    toast(blockedMessage(nx, ny));
    return;
  }
  movePlayerTo(nx, ny);
}

function checkTransition() {
  const map = currentMap();
  const local = worldToLocal(state.areaId, state.x, state.y);
  const transition = map.transitions.find((item) => item.x === local.x && item.y === local.y);
  if (!transition) return;
  if (!state.path.length) applyTransition(transition);
}

function applyTransition(transition) {
  if (!canEnterTransition(transition)) {
    toast(transition.requires ? `入口还在等剧情：先完成 ${questName(transition.requires)}` : `${areaName(transition.to)} 入口暂时在装死`);
    return false;
  }
  fadeScene(() => enterScene(transition));
  return true;
}

function canEnterTransition(transition) {
  if (transition.to === "town_center") return true;
  if (transition.requires && !state.completedQuests.has(transition.requires)) return false;
  return state.unlockedAreas.has(transition.to) || !transition.requires;
}

function questName(questId) {
  return indexes.quests.get(questId)?.name || questId;
}

function fadeScene(callback) {
  const fade = $("#screenFade");
  if (!fade || window.__XIAOKANG_SCREENSHOT_MODE) {
    callback();
    return;
  }
  const origin = transitionOrigin();
  fade.style.setProperty("--fade-x", origin.x);
  fade.style.setProperty("--fade-y", origin.y);
  fade.classList.remove("is-opening");
  fade.classList.add("is-active");
  requestAnimationFrame(() => fade.classList.add("is-closing"));
  window.setTimeout(() => {
    callback();
    fade.classList.remove("is-closing");
    fade.classList.add("is-opening");
    window.setTimeout(() => {
      fade.classList.remove("is-active", "is-opening");
    }, 360);
  }, 360);
}

function transitionOrigin() {
  const center = centerOfTile(state.x, state.y);
  const rect = typeof canvas.getBoundingClientRect === "function" ? canvas.getBoundingClientRect() : null;
  if (!rect?.width || !rect?.height) return { x: "50%", y: "50%" };
  const x = rect.left + (center.x / canvas.width) * rect.width;
  const y = rect.top + (center.y / canvas.height) * rect.height;
  return { x: `${Math.round(x)}px`, y: `${Math.round(y)}px` };
}

function enterScene(transition) {
  if (transition.to !== "town_center") {
    state.unlockedAreas.add(transition.to);
  }
  state.areaId = transition.to;
  state.x = transition.targetX;
  state.y = transition.targetY;
  state.path = [];
  state.pendingAction = null;
  state.codex.add(`area_${transition.to}`);
  toast(transition.to === "town_center" ? "回到小镇广场" : `进入 ${currentArea().name}`);
  updateAreaQuests(transition.to);
  saveGame();
  updateHud();
}

function npcsForMap() {
  return npcsForArea(state.areaId);
}

function npcsForArea(areaId) {
  const map = indexes.maps.get(areaId);
  return map.npcs
    .map((id, index) => {
      const slot = npcSpawnSlot(map, index);
      const world = localToWorld(areaId, slot.x, slot.y);
      return { type: "npc", areaId, id, localX: slot.x, localY: slot.y, x: world.x, y: world.y, char: indexes.characters.get(id) };
    })
    .filter((npc) => npc.char);
}

function npcsForWorld() {
  return npcsForArea(state.areaId);
}

function npcSpawnSlot(map, index) {
  const fixed = map.npcSlots[index] || { x: 6 + index, y: 6 };
  const pool = map.npcSpawnPools?.[index]?.points || [];
  const candidates = [fixed, ...pool]
    .filter(Boolean)
    .filter((point) => !localTileBlocked(map, point.x, point.y));
  if (!candidates.length) return fixed;
  const timeOffset = { day: 0, dusk: 1, night: 2 }[state.time] || 0;
  return candidates[(index + timeOffset + map.id.length) % candidates.length];
}

function interactionsForMap() {
  return interactionsForArea(state.areaId);
}

function interactionsForArea(areaId) {
  return (indexes.maps.get(areaId)?.interactions || [])
    .filter((item) => !state.pickedInteractions.has(item.id))
    .map((item) => {
      const world = localToWorld(areaId, item.x, item.y);
      return { ...item, areaId, localX: item.x, localY: item.y, x: world.x, y: world.y, type: "interact" };
    });
}

function interactionsForWorld() {
  return interactionsForArea(state.areaId);
}

function transitionsForMap() {
  return transitionsForArea(state.areaId);
}

function transitionsForArea(areaId) {
  return (indexes.maps.get(areaId)?.transitions || []).map((item) => {
    const world = localToWorld(areaId, item.x, item.y);
    return { ...item, areaId, localX: item.x, localY: item.y, x: world.x, y: world.y, type: "exit" };
  });
}

function transitionsForWorld() {
  return transitionsForArea(state.areaId);
}

function distance(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

function updateNearby() {
  const player = { x: state.x, y: state.y };
  const nearNpc = npcsForWorld().find((npc) => distance(player, npc) <= 2);
  const nearPoint = interactionsForWorld().find((point) => distance(player, point) <= 1);
  const nearExit = transitionsForWorld().find((point) => distance(player, point) <= 1);
  state.nearby = nearNpc || nearPoint || nearExit || null;
  const hint = $("#nearbyHint");
  if (!state.nearby) {
    hint.textContent = state.path.length ? "自动赶路中，感觉很有主角感" : "点击地面移动，靠近居民或物件";
  } else if (state.nearby.type === "npc") {
    hint.textContent = `按确认键与 ${state.nearby.char.displayName} 对话`;
  } else if (state.nearby.type === "interact") {
    hint.textContent = `按确认键捡起 ${itemIcon(state.nearby.item)} ${state.nearby.label}`;
  } else {
    hint.textContent = canEnterTransition(state.nearby)
      ? `按确认键前往 ${areaName(state.nearby.to)}`
      : `剧情推进后可进入 ${areaName(state.nearby.to)}`;
  }
}

function interact() {
  updateNearby();
  if (!state.nearby) {
    collectNearby();
    return;
  }
  if (state.nearby.type === "npc") {
    talkToNpc(state.nearby.id);
  } else if (state.nearby.type === "exit") {
    applyTransition(state.nearby);
  } else {
    triggerInteraction(state.nearby);
  }
}

function collectNearby() {
  toast("附近没有可捡的 emoji 道具");
}

function itemIcon(id) {
  return DATA.items.find((item) => item.id === id)?.icon || "🎒";
}

function itemDetails(id) {
  return DATA.items.find((entry) => entry.id === id) || {
    id,
    name: id,
    icon: "🎒",
    description: "这件东西来得突然，像聊天里刚冒出来的新伏笔。",
    flavor: "先收着，等剧情自己解释。",
  };
}

function itemName(id) {
  const item = itemDetails(id);
  return item ? `${item.icon || ""} ${item.name}`.trim() : id;
}

function itemShortDescription(id) {
  const item = itemDetails(id);
  const description = item?.flavor || item?.description || "它闪了一下，像在等你发弹幕";
  return description.split(/[。；]/)[0];
}

function inventoryEntries() {
  return Object.entries(state.inventory)
    .filter(([, count]) => Number(count) > 0)
    .map(([id, count]) => ({ ...itemDetails(id), count: Number(count) }))
    .sort((a, b) => DATA.items.findIndex((item) => item.id === a.id) - DATA.items.findIndex((item) => item.id === b.id));
}

function inventoryCount() {
  return inventoryEntries().reduce((sum, item) => sum + item.count, 0);
}

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function talkToNpc(charId) {
  const firstMeet = !state.codex.has(charId);
  state.codex.add(charId);
  const quest = nextQuestForNpc(charId);
  if (quest) {
    activateQuest(quest.id);
    progressTalkQuests(charId);
  }
  openNpcDialogueMenu(charId, firstMeet, quest);
}

function pickDialogue(charId) {
  const options = indexes.dialoguesBySpeaker.get(charId) || [];
  return (
    options.find((d) => d.area === state.areaId && (d.time === "any" || d.time === state.time)) ||
    options.find((d) => d.id === `daily_${charId}`) ||
    options.find((d) => d.id === `intro_${charId}`) ||
    options[0]
  );
}

const ACTIVE_TRAIT_COPY = {
  palette_pick: "配色敏锐，一眼能看出色板偏移。",
  topic_spark: "话题发动机，三句话就能带热气氛。",
  rule_lens: "规则直觉强，能快速找到逻辑漏洞。",
  echo_mend: "善于接住冷场，把掉在地上的话捡起来。",
};

const PASSIVE_TRAIT_COPY = {
  bridge_chorus: "接话时容易把其他人拉进同一段对话。",
  late_night_spawn: "夜间出现率更高，台词也更放得开。",
  reply_tailwind: "擅长补最后一拍，让对话完整收束。",
  area_regular: "对常驻区域了如指掌，能发现隐藏细节。",
};

function openNpcDialogueMenu(charId, firstMeet = false, quest = null) {
  const char = indexes.characters.get(charId);
  if (!char) return;
  const story = indexes.storyByCharacter.get(charId);
  const area = indexes.areas.get(char.defaultArea) || currentArea();
  const greeting = firstMeet
    ? [
      ...(story?.introNarration?.length
        ? story.introNarration.slice(0, 2)
        : [{ speaker: "narrator", text: `旁白：你在${area.name}遇到了${char.displayName}。` }]),
      { speaker: charId, text: entranceLine(char, story, area) },
    ]
    : [
      { speaker: charId, text: quickGreeting(char, story) },
      { speaker: "player", text: "好。你是今天第一个跟我打招呼的人。" },
    ];
  state.dialogue = {
    speaker: charId,
    lines: normalizeLines(greeting, charId),
    choices: characterMenuChoices(charId, quest),
    index: 0,
  };
  renderDialogue();
}

function entranceLine(char, story, area) {
  const agentLine = story?.agentLines?.entrance?.find((line) => line.speaker === char.id)?.text;
  if (agentLine) return polishText(agentLine, char.id);
  const selfLine = story?.selfTalk?.[0] ? polishText(story.selfTalk[0], char.id) : "";
  if (selfLine && selfLine.length < 88) return selfLine;
  return `你来了。${area.name}刚才还在念叨怎么今天还没人上线。`;
}

function quickGreeting(char, story) {
  if (story?.agentLines?.idle) return polishText(story.agentLines.idle, char.id);
  const topic = story?.casualTopics?.[0]?.lines?.[0];
  if (topic) return polishText(topic, char.id);
  return `又见面了。今天想聊什么方向？`;
}

function characterMenuChoices(charId, quest = null) {
  const char = indexes.characters.get(charId);
  const story = indexes.storyByCharacter.get(charId);
  // 确保拿到的是daily对话（有choices）而不是reaction对话（无choices）
  const dailyOptions = indexes.dialoguesBySpeaker.get(charId) || [];
  const daily = dailyOptions.find(d => d.id === `daily_${charId}`) || pickDialogue(charId);
  // 随机选关系剧情——优先当前区域匹配的pair，增加多样性
  const allPairs = indexes.pairStoriesByCharacter.get(charId) || [];
  const areaPairs = allPairs.filter(p => p.area === state.areaId);
  const pool = areaPairs.length > 0 ? areaPairs : allPairs;
  // 基于时间和区域做确定性随机——同一会话内保持一致，不同区域/时间不同
  let pairIdx = 0;
  const pairSeed = charId + state.areaId + state.time;
  for (let i = 0; i < pairSeed.length; i++) {
    pairIdx = (pairIdx * 31 + pairSeed.charCodeAt(i)) & 0x7fffffff;
  }
  pairIdx = pairIdx % Math.max(1, pool.length);
  const pair = pool.length > 0 ? pool[pairIdx] : null;

  // 随机选一个闲谈话题
  const casualChoices = (daily?.choices || []).filter(c => c.label.includes("闲谈"));
  let casualVariant = null;
  if (casualChoices.length > 0) {
    let casualIdx = 0;
    const casualSeed = charId + state.areaId + state.time + "casual";
    for (let i = 0; i < casualSeed.length; i++) {
      casualIdx = (casualIdx * 31 + casualSeed.charCodeAt(i)) & 0x7fffffff;
    }
    casualIdx = casualIdx % casualChoices.length;
    casualVariant = casualChoices[casualIdx];
  }
  const casualLines = casualVariant?.lines?.length
    ? casualVariant.lines
    : [
        { speaker: "player", text: "今天有什么有意思的事吗？" },
        ...(story?.agentLines?.casual?.length ? story.agentLines.casual : [{ speaker: charId, text: "今天频道挺安静的，适合闲聊。" }]),
      ];

  const taskLines = [
    { speaker: "player", text: "正事的话——现在应该做什么？" },
    ...(story?.agentLines?.task?.length ? story.agentLines.task : [{ speaker: charId, text: quest ? questIntroLine(char, quest) : currentQuestHint(charId) }]),
  ];
  const choices = [
    {
      id: `menu_${charId}_casual`,
      label: casualVariant?.label || "闲谈",
      lines: normalizeLines(casualLines, charId),
      rewards: [`memory_daily_talk_${charId}`],
    },
    {
      id: `menu_${charId}_task`,
      label: "关于任务",
      lines: normalizeLines(taskLines, charId),
      rewards: [`memory_task_hint_${charId}`],
    },
  ];
  if (pair) {
    const otherChar = indexes.characters.get(pair.a === charId ? pair.b : pair.a);
    const otherName = otherChar?.displayName || "某人";
    choices.push({
      id: `menu_${charId}_pair`,
      label: `关系剧情：与${otherName}`,
      lines: pairStoryLines(pair),
      rewards: [pair.unlockMemory],
      event: `duo_${pair.a}_${pair.b}`,
    });
  }
  // 随机选一个长聊话题——保留话题标签
  const deepChoices = (daily?.choices || []).filter(c => c.label.includes("长聊"));
  let deeper = null;
  if (deepChoices.length > 0) {
    // 基于时间做确定性随机——不同时间不同话题
    let deepIdx = 0;
    const deepSeed = charId + state.areaId + state.time + "deep";
    for (let i = 0; i < deepSeed.length; i++) {
      deepIdx = (deepIdx * 31 + deepSeed.charCodeAt(i)) & 0x7fffffff;
    }
    deepIdx = deepIdx % deepChoices.length;
    deeper = deepChoices[deepIdx];
  }
  if (deeper) {
    choices.push({ ...deeper, id: `menu_${charId}_deep`, lines: normalizeLines(deeper.lines, charId) });
  } else if (story?.agentLines?.deep?.length) {
    choices.push({
      id: `menu_${charId}_deep`,
      label: "长聊一下",
      lines: normalizeLines(story.agentLines.deep, charId),
      rewards: [`memory_deep_chat_${charId}`],
    });
  }
  return choices;
}

function questIntroLine(char, quest) {
  const firstStep = quest.steps?.[getQuestProgress(quest.id)] || quest.steps?.[0];
  const item = firstStep?.item ? `顺手留意${itemName(firstStep.item)}。` : "";
  return `"${quest.name}"——${firstStep?.hint || "先去起点看看。"}${item}`;
}

function topicLines(topics = [], charId) {
  return topics
    .slice(0, 2)
    .flatMap((topic) => (topic.lines || []).map((text) => ({ speaker: charId, text })));
}

function currentQuestHint(charId) {
  const quest = activeQuestObjects().find((item) => item.startNpc === charId) || activeQuestObjects()[0];
  const char = indexes.characters.get(charId);
  if (!quest) return `今天没有硬性任务。随便逛逛，线索自己会冒出来。`;
  const step = quest.steps[getQuestProgress(quest.id)] || quest.steps[0];
  return `当前任务"${quest.name}"：${step.hint}`;
}

function pairStoryLines(pair) {
  if (pair?.agentLines?.length) return normalizeLines(pair.agentLines, pair.a);
  const a = indexes.characters.get(pair.a);
  const b = indexes.characters.get(pair.b);
  if (!a || !b) return [{ speaker: "narrator", text: "旁白：两个人擦肩而过，像两条还没交叉的故事线。" }];
  return normalizeLines([
    { speaker: "narrator", text: `旁白：${a.displayName}和${b.displayName}在${areaName(state.areaId)}碰上了。` },
    { speaker: pair.a, text: pair.activePassive?.[0] || "你也在这？" },
    { speaker: pair.b, text: pair.activePassive?.[1] || "嗯，刚好路过。" },
    { speaker: "player", text: "你们之间有一种不用多说就能接住对方话题的感觉。" },
    { speaker: "narrator", text: `旁白：对话收束成一枚回忆。` },
  ], pair.a);
}

function normalizeLines(lines, fallbackSpeaker = "narrator") {
  return (lines || []).map((line) => {
    if (typeof line === "string") return { speaker: fallbackSpeaker, text: polishText(line, fallbackSpeaker) };
    const speaker = line.speaker || fallbackSpeaker;
    return { speaker, text: polishText(line.text || String(line), speaker) };
  });
}

function polishText(text = "", speakerId = "") {
  // 轻小说作家Agent已统一重写所有文案
  return String(text).trim();
}

function triggerInteraction(point) {
  if (state.pickedInteractions.has(point.id)) {
    toast("这个道具已经收进背包了");
    updateNearby();
    return;
  }
  const item = point.item || itemForEvent(point.event);
  state.inventory[item] = (state.inventory[item] || 0) + 1;
  state.pickedInteractions.add(point.id);
  if (point.memory) state.memories.add(point.memory);
  progressInteractQuests(point.id);
  progressEventQuests(point.event);
  progressCollectQuests(item);
  toast(`捡到 ${itemName(item)} ×1：${itemShortDescription(item)}`);
  renderBackpackPreview();
  if (point.event === "event_center_bell" && state.completedQuests.has("main_quest_04")) {
    showEnding();
  } else {
    openAreaDialogue(point);
  }
  saveGame({ silent: true });
  updateNearby();
}

function itemForEvent(eventId = "") {
  if (eventId.includes("poem") || eventId.includes("moon")) return "poem_page";
  if (eventId.includes("card") || eventId.includes("deck")) return "card_shard";
  if (eventId.includes("dinner") || eventId.includes("sugar")) return "meal_ticket";
  if (eventId.includes("palette") || eventId.includes("portrait")) return "palette_chip";
  if (eventId.includes("cache") || eventId.includes("constant")) return "online_echo";
  return "star_sand";
}

function openAreaDialogue(point) {
  const area = indexes.areas.get(point.areaId || state.areaId) || currentArea();
  const char = npcsForArea(point.areaId || state.areaId)[0]?.char || indexes.characters.get(state.playerId);
  const lines = point.lines || [
    { speaker: "narrator", text: `你调查了${area.name}的${point.label}。它轻轻一响，像群聊里有人突然发了张意味深长的图。` },
    { speaker: "player", text: `好，${itemName(point.item || itemForEvent(point.event))}到手。` },
    { speaker: char.id, text: point.comment || `先收着。${itemShortDescription(point.item || itemForEvent(point.event))}这种东西通常不是道具，是剧情把手。` },
  ];
  state.dialogue = {
    speaker: char.id,
    lines: normalizeLines(lines.map((line) => ({ ...line, speaker: line.speaker === "guide" ? char.id : line.speaker })), char.id),
    index: 0,
  };
  renderDialogue();
}

function openDialogue(dialogueId) {
  const dialogue = DATA.dialogues.find((item) => item.id === dialogueId);
  if (!dialogue) return;
  grantRewards(dialogue.rewards || []);
  state.dialogue = {
    speaker: dialogue.speaker,
    lines: normalizeLines(dialogue.lines, dialogue.speaker),
    choices: (dialogue.choices || []).map((choice) => ({ ...choice, lines: normalizeLines(choice.lines, dialogue.speaker) })),
    index: 0,
  };
  renderDialogue();
}

function chooseDialogue(choiceId) {
  if (!state.dialogue?.choices?.length) return;
  const choice = state.dialogue.choices.find((item) => item.id === choiceId);
  if (!choice) return;
  grantRewards(choice.rewards || []);
  if (choice.event) progressEventQuests(choice.event);
  if (choice.action === "openQuestLog") {
    closeDialogue();
    openQuestLog();
    return;
  }
  state.dialogue = {
    speaker: state.dialogue.speaker,
    lines: choice.lines?.length ? normalizeLines(choice.lines, state.dialogue.speaker) : [{ speaker: "narrator", text: "旁白：你们互相看了一眼，小镇空气里写满了：此处需要一段名场面。" }],
    choices: choice.nextChoices || [],
    index: 0,
  };
  renderDialogue();
}

function grantRewards(rewards = []) {
  for (const reward of rewards) {
    if (reward.startsWith("codex_")) state.codex.add(reward.replace("codex_", ""));
    if (reward.startsWith("quest_")) activateQuest(reward.replace("quest_", ""));
    if (reward.startsWith("area_stamp_")) state.codex.add(reward);
    if (reward.startsWith("expression_")) state.memories.add(reward);
    if (reward === "all_online") state.bonds.allOnline = true;
    if (reward.startsWith("memory_")) {
      const isNew = !state.memories.has(reward);
      state.memories.add(reward);
      if (isNew) announceCgUnlockForReward(reward);
    }
    if (reward.startsWith("bond_")) state.bonds[reward] = true;
  }
  updateHud();
}

function announceCgUnlockForReward(reward) {
  const cg = ALL_CGS.find((item) => item.unlock === reward || reversePairMemory(item.unlock) === reward);
  if (cg) toast(`解锁隐藏插画：${displayCgName(cg.name)}`);
}

function reversePairMemory(value = "") {
  const match = value.match(/^memory_pair_(role_\d+)_(role_\d+)$/);
  if (!match) return "";
  return `memory_pair_${match[2]}_${match[1]}`;
}

function openPlayerIntro(playerId) {
  const char = indexes.characters.get(playerId);
  const home = areaName(char.defaultArea);
  const meme = char.memeSeeds?.[0] || "梗";
  if (char.playerIntro?.length) {
    state.dialogue = {
      speaker: playerId,
      lines: normalizeLines(char.playerIntro, playerId),
      choices: (char.playerIntroChoices || []).map((choice) => ({ ...choice, lines: normalizeLines(choice.lines, playerId) })),
      index: 0,
    };
    renderDialogue();
    return;
  }
  state.dialogue = {
    speaker: playerId,
    lines: [
      { speaker: "narrator", text: "旁白：小康在线镇，凌晨，群聊小镇突然炸服。路灯在刷屏，喷泉在复读，连地砖都露出一种“怎么又是我”的表情。" },
      { speaker: "player", text: `${char.displayName}上线。很好，今天的主角看起来不像能早睡的样子。` },
      { speaker: "narrator", text: `你的魂印指向${home}，随身梗包里掉出一枚${meme}。这很不科学，但很小康。` },
      { speaker: "role_001", text: "别愣着，先把喷泉边的星砂捡起来。小镇现在的情况是：梗太多，服务器正在地砖上写检讨。" },
    ],
    choices: [],
    index: 0,
  };
  renderDialogue();
}

function renderDialogue() {
  const box = $("#dialogueBox");
  const line = state.dialogue.lines[state.dialogue.index];
  const isLastLine = state.dialogue.index === state.dialogue.lines.length - 1;
  const isNarrator = line.speaker === "narrator";
  const speakerId = line.speaker === "player" ? state.playerId : line.speaker;
  const char = indexes.characters.get(speakerId) || indexes.characters.get(state.playerId);
  $("#dialogueSpeaker").textContent = isNarrator ? "旁白" : line.speaker === "player" ? "你" : char.displayName;
  const formattedText = formatDialogueText(polishText(line.text, speakerId));
  const portrait = $("#dialoguePortrait");
  const standee = $("#dialogueStandee");
  if (isNarrator) {
    portrait.style.setProperty("--asset-a", "#2c5761");
    portrait.style.setProperty("--asset-b", "#332b4b");
    portrait.innerHTML = `<div class="narrator-sigil">小康Online</div>`;
    standee.hidden = true;
    standee.innerHTML = "";
  } else {
    const colors = char.avatarVisualDNA.primaryColors;
    const expression = inferExpression(line.text);
    const expressionSrc = char.expressions?.[expression] || char.portrait;
    portrait.style.setProperty("--asset-a", colors[0]);
    portrait.style.setProperty("--asset-b", colors[1]);
    // 表情切换时加入短暂CSS动画
    const prevSrc = portrait.querySelector("img")?.src || "";
    portrait.innerHTML = `<img src="${expressionSrc}" alt="${char.displayName} 对话立绘" class="${prevSrc !== expressionSrc ? 'expr-switch' : ''}" onerror="this.remove(); this.parentElement.textContent='立绘待导入';" />`;
    // 半身立绘也同步切换表情
    const standeeExpr = char.expressions?.[expression] || char.expressions?.neutral || char.portrait;
    standee.innerHTML = `<img src="${standeeExpr}" alt="${char.displayName} 半身立绘" onerror="this.remove();" />`;
    standee.hidden = false;
  }
  const choices = isLastLine ? state.dialogue.choices || [] : [];
  $("#dialogueChoices").innerHTML = choices.length
    ? choices.map((choice) => `<button data-choice="${choice.id}">${choice.label}</button>`).join("")
    : isLastLine
      ? `<button data-action="closeDialogue">继续探索</button><button data-action="openQuestLog">查看任务</button>`
      : "";
  const nextButton = $("#dialogueBox [data-action='nextDialogue']");
  if (nextButton) nextButton.hidden = isLastLine && choices.length > 0;
  box.hidden = false;
  startDialogueTypewriter(formattedText);
}

function formatDialogueText(text = "") {
  const value = String(text).replace(/\s+/g, " ").trim();
  if (value.length <= 16) return value;
  const chunks = [];
  let buffer = "";
  for (const char of value) {
    buffer += char;
    const shouldBreak = /[。！？!?；;]/.test(char) || (/[，,、]/.test(char) && buffer.length >= 14) || buffer.length >= 24;
    if (shouldBreak) {
      chunks.push(buffer.trim());
      buffer = "";
    }
  }
  if (buffer.trim()) chunks.push(buffer.trim());
  return chunks.slice(0, 4).join("\n");
}

function clearDialogueTypewriter() {
  if (state.dialogueTyping.timer) {
    window.clearTimeout(state.dialogueTyping.timer);
    state.dialogueTyping.timer = null;
  }
}

function typewriterDelay() {
  const speed = Number(state.settings.textSpeed || 1);
  return { 1: 34, 2: 22, 3: 12 }[speed] || 22;
}

function startDialogueTypewriter(fullText) {
  clearDialogueTypewriter();
  const target = $("#dialogueText");
  state.dialogueTyping.fullText = fullText;
  state.dialogueTyping.done = false;
  if (window.__XIAOKANG_SCREENSHOT_MODE) {
    finishDialogueTypewriter();
    return;
  }
  target.textContent = "";
  const chars = [...fullText];
  let index = 0;
  const tick = () => {
    index += 1;
    target.textContent = chars.slice(0, index).join("");
    if (index >= chars.length) {
      state.dialogueTyping.done = true;
      state.dialogueTyping.timer = null;
      return;
    }
    state.dialogueTyping.timer = window.setTimeout(tick, typewriterDelay());
  };
  tick();
}

function finishDialogueTypewriter() {
  clearDialogueTypewriter();
  $("#dialogueText").textContent = state.dialogueTyping.fullText;
  state.dialogueTyping.done = true;
}

function inferExpression(text = "") {
  // 开心 — 笑、温暖、感谢、夸赞、好消息
  if (/笑|😭|嚯嚯嚯|好耶|名场面|有内味|舒服了|睡醒了|下班了|羡慕|感谢|真好|太棒|赢了|成功|可以啊|不赖|开心|温暖|治愈|感动|笑了|哈哈|嘿嘿|呵呵|真不错|绝了|无敌了.*[^？]/i.test(text)) return "happy";
  if (/[/太好笑]|[/耶]|[[]呵呵[]]|香草泥|忍不住了/.test(text)) return "happy";
  // 调侃/吐槽 — 反讽、自嘲、轻松吐槽
  if (/压抑了|好压抑|没绷住|别闹了|你猜|装死|摆路人脸|心虚|拆台|甩锅|离谱|不是.*是|先别急|你怎么|你说呢|谁.*的|什么鬼|太.*了|确实.*但|还真是.*但|靴子呢/.test(text)) return "tease";
  if (/^[？?]$|^何意味$|^图呢$|^我的呢$/.test(text)) return "tease";
  // 认真/深沉 — 深度思考、坦诚、担忧、重要信息
  if (/认真|重要|核心|服务器|异常|危险|重启|真相|最终|结局|存档|主线|任务|规则|判定|数据|研究|实验|发现|规律|原理|分析|逻辑/.test(text)) return "serious";
  if (/你知道吗|说实话|其实|我觉得|我相信|我希望|我想.*的是|有时候|我在想|以前|后来|有一天|如果.*的话/.test(text)) return "serious";
  if (/不是.*是|因为|所以|但是|可是|不过|虽然|然而|因此/.test(text) && text.length > 40) return "serious";
  // 默认
  return "neutral";
}

function nextDialogue() {
  if (!state.dialogue) return;
  if (!state.dialogueTyping.done) {
    finishDialogueTypewriter();
    return;
  }
  if (state.dialogue.index === state.dialogue.lines.length - 1 && state.dialogue.choices?.length) return;
  state.dialogue.index += 1;
  if (state.dialogue.index >= state.dialogue.lines.length) {
    $("#dialogueBox").hidden = true;
    $("#dialogueStandee").hidden = true;
    clearDialogueTypewriter();
    state.dialogue = null;
    return;
  }
  renderDialogue();
}

function closeDialogue() {
  clearDialogueTypewriter();
  $("#dialogueBox").hidden = true;
  $("#dialogueStandee").hidden = true;
  state.dialogue = null;
}

function nextQuestForNpc(charId) {
  return DATA.quests.find((quest) => {
    if (state.completedQuests.has(quest.id) || state.activeQuests.has(quest.id)) return false;
    if (quest.startNpc !== charId) return false;
    if (!state.unlockedAreas.has(quest.startArea)) return false;
    return true;
  });
}

function activateQuest(questId) {
  const quest = indexes.quests.get(questId);
  if (!quest) return;
  if (!state.completedQuests.has(questId)) {
    state.activeQuests.add(questId);
    playButtonDing();
    const typeLabel = quest.type === "main" ? "主线" : quest.type === "bond" ? "羁绊" : quest.type === "area" ? "区域" : quest.type === "easter" ? "彩蛋" : "任务";
    questNotify(
      `📋 ${typeLabel}：${quest.name}`,
      quest.story?.slice(0, 100) || "没有故事概述",
      6000
    );
  }
}

function questProgressKey(questId) {
  return `quest_${questId}`;
}

function getQuestProgress(questId) {
  state.bonds[questProgressKey(questId)] ||= 0;
  return state.bonds[questProgressKey(questId)];
}

function setQuestProgress(questId, value) {
  state.bonds[questProgressKey(questId)] = value;
}

function activeQuestObjects() {
  return [...state.activeQuests].map((id) => indexes.quests.get(id)).filter((quest) => quest && quest.type !== "easter");
}

function isQuestVisible(quest) {
  return quest &&
    quest.type !== "easter" &&
    (
      state.completedQuests.has(quest.id) ||
      state.activeQuests.has(quest.id) ||
      state.unlockedAreas.has(quest.startArea)
    );
}

function visibleQuestObjects() {
  return DATA.quests.filter(isQuestVisible);
}

function trackedQuestObject() {
  const visible = visibleQuestObjects();
  const tracked = visible.find((quest) => quest.id === state.trackedQuestId);
  if (tracked && !state.completedQuests.has(tracked.id)) return tracked;
  const active = activeQuestObjects()[0] || visible.find((quest) => !state.completedQuests.has(quest.id)) || tracked || visible[0] || null;
  state.trackedQuestId = active?.id || "";
  return active;
}

function setTrackedQuest(questId) {
  const quest = visibleQuestObjects().find((item) => item.id === questId);
  if (!quest) {
    toast("这个任务还没解锁，先推进前面的剧情。");
    return;
  }
  state.trackedQuestId = questId;
  saveGame({ silent: true });
  updateHud();
  toast(`正在跟踪：${quest.name}`);
  const title = $("#modalTitle")?.textContent || "";
  if ($("#modalLayer")?.hidden === false) {
    if (title === "任务日志") openQuestLog();
    if (title === "攻略") openGuide();
  }
}

function questStepSound() {
  const audioCtx = musicState.ctx;
  if (window.__XIAOKANG_SCREENSHOT_MODE || state.settings.volume <= 0 || !audioCtx) return;
  const t = audioCtx.currentTime;
  playPianoNote("E5", t, 0.15, 0.1);
  playPianoNote("G5", t + 0.08, 0.18, 0.08);
  playPianoNote("C6", t + 0.16, 0.25, 0.06);
}

function questCompleteSound() {
  const audioCtx = musicState.ctx;
  if (window.__XIAOKANG_SCREENSHOT_MODE || state.settings.volume <= 0 || !audioCtx) return;
  const t = audioCtx.currentTime;
  playPianoNote("C4", t, 0.4, 0.12);
  playPianoNote("E4", t + 0.1, 0.3, 0.1);
  playPianoNote("G4", t + 0.2, 0.3, 0.1);
  playPianoNote("C5", t + 0.3, 0.5, 0.08);
  playPianoNote("E5", t + 0.4, 0.6, 0.06);
}

function progressQuests(predicate) {
  for (const quest of activeQuestObjects()) {
    if (state.completedQuests.has(quest.id)) continue;
    let stepIndex = getQuestProgress(quest.id);
    let advanced = false;
    let completedStepText = "";
    while (stepIndex < quest.steps.length) {
      const step = quest.steps[stepIndex];
      if (!step || !(predicate(step, quest) || archivedStepSatisfied(step))) break;
      if (step.onComplete) completedStepText = step.onComplete;
      stepIndex += 1;
      setQuestProgress(quest.id, stepIndex);
      advanced = true;
      if (stepIndex >= quest.steps.length) {
        completeQuest(quest);
        break;
      }
    }
    if (advanced && !state.completedQuests.has(quest.id)) {
      questStepSound();
      const stepNum = getQuestProgress(quest.id);
      questNotify(
        `「${quest.name}」第${stepNum}/${quest.steps.length}步`,
        completedStepText || quest.steps[stepNum - 1]?.hint || "",
        6000
      );
    }
  }
  updateHud();
}

function archivedStepSatisfied(step) {
  if (step.type === "interact") return state.pickedInteractions.has(step.target);
  if (step.type === "collect") return state.inventory[step.item] >= step.count;
  if (step.type === "visit") return state.areaId === step.target;
  return false;
}

function progressTalkQuests(charId) {
  progressQuests((step) => ["talk", "return"].includes(step.type) && step.target === charId);
}

function progressInteractQuests(targetId) {
  progressQuests((step) => step.type === "interact" && step.target === targetId);
}

function progressEventQuests(eventId) {
  progressQuests((step) => step.type === "event" && (step.target === eventId || step.target === reverseDuoEvent(eventId)));
}

function reverseDuoEvent(eventId = "") {
  const match = eventId.match(/^duo_(role_\d+)_(role_\d+)$/);
  return match ? `duo_${match[2]}_${match[1]}` : "";
}

function progressCollectQuests(item) {
  progressQuests((step) => {
    if (step.type !== "collect" || step.item !== item) return false;
    return state.inventory[item] >= step.count;
  });
}

function updateAreaQuests(areaId) {
  progressQuests((step) => step.type === "visit" && step.target === areaId);
}

function completeQuest(quest) {
  state.completedQuests.add(quest.id);
  state.activeQuests.delete(quest.id);
  for (const reward of quest.rewards || []) {
    if (reward.startsWith("memory_")) {
      state.memories.add(reward);
      announceCgUnlockForReward(reward);
    }
    if (reward.startsWith("bond_")) {
      state.bonds[reward] = true;
      const finalCg = ALL_CGS.find((cg) => cg.type === "final" && `${cg.unlock}_lv3` === reward);
      if (finalCg) toast(`解锁角色最终插画：${displayCgName(finalCg.name)}`);
    }
    if (reward.startsWith("unlock_")) state.memories.add(reward);
    if (reward.startsWith("area_stamp_")) state.codex.add(reward);
    if (reward.startsWith("expression_")) state.memories.add(reward);
    if (reward === "all_online") state.bonds.allOnline = true;
    if (reward === "ending_true_point") state.bonds.endingTruePoints = (state.bonds.endingTruePoints || 0) + 1;
  }
  questCompleteSound();
  const lastStep = quest.steps?.[quest.steps.length - 1];
  const doneLabel = quest.type === "main" ? "主线完成" : quest.type === "bond" ? "羁绊达成" : quest.type === "area" ? "区域修复" : quest.type === "easter" ? "彩蛋解锁" : "任务完成";
  // 任务完成弹窗——显示故事收尾总结
  questNotify(
    `🎉 ${doneLabel}：${quest.name}`,
    quest.conclusion || lastStep?.onComplete || quest.story?.slice(0, 80) || "",
    10000
  );
  // 主线/羁绊完成后额外弹出收尾对话
  if ((quest.type === "main" || quest.type === "bond") && quest.conclusion) {
    window.setTimeout(() => {
      const questGiver = indexes.characters.get(quest.startNpc);
      const giverName = questGiver?.displayName || "引导者";
      state.dialogue = {
        speaker: quest.startNpc,
        lines: [
          { speaker: "narrator", text: `旁白：${quest.name}——完成。小镇的记录里多了一页。` },
          { speaker: quest.startNpc, text: quest.conclusion },
          { speaker: "player", text: quest.type === "main" ? "主线的每一章都让这座小镇更像一个家了。" : "了解一个人不需要大道理——只需要完成一件小事。" },
        ],
        index: 0,
      };
      renderDialogue();
    }, 2500);
  }
  const newlyUnlockedAreas = [];
  for (const areaId of quest.unlockAreas || []) {
    if (!state.unlockedAreas.has(areaId)) newlyUnlockedAreas.push(areaId);
    state.unlockedAreas.add(areaId);
  }
  if (quest.id === "main_quest_01") state.activeQuests.add("main_quest_02");
  if (quest.id === "main_quest_02") state.activeQuests.add("main_quest_03");
  if (quest.id === "main_quest_03") state.activeQuests.add("main_quest_04");
  if (quest.id === "main_quest_04") state.activeQuests.add("main_quest_05");
  if (state.trackedQuestId === quest.id) {
    state.trackedQuestId = activeQuestObjects()[0]?.id || visibleQuestObjects().find((item) => !state.completedQuests.has(item.id))?.id || "";
  }
  playQuestCompleteDing();
  showQuestCompleteBanner(quest);
  if (newlyUnlockedAreas.length) showAreaUnlockPopup(newlyUnlockedAreas);
  toast(`完成任务：${quest.name}`);
  saveGame();
  if (quest.id === "main_quest_05") {
    window.setTimeout(showEnding, 120);
  }
}

function drawMap() {
  tickAutoMove();
  updateCamera();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#7fb477";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawSceneBackground();
  drawSemanticTiles();
  drawDecor();
  for (const transition of transitionsForWorld()) drawTransition(transition);
  for (const point of interactionsForWorld()) drawInteraction(point);
  const actors = [
    ...npcsForWorld().map((npc) => ({ ...npc, isPlayer: false })),
    { x: state.x, y: state.y, char: indexes.characters.get(state.playerId), isPlayer: true },
  ].sort((a, b) => characterGroundPoint(a.x, a.y).y - characterGroundPoint(b.x, b.y).y);
  for (const actor of actors) drawCharacter(actor.x, actor.y, actor.char, actor.isPlayer);
  if (!window.__XIAOKANG_SCREENSHOT_MODE) requestAnimationFrame(drawMap);
}

function drawSceneBackground() {
  const map = currentMap();
  const src = map?.areaBackground || (state.areaId === "town_center" ? WORLD_BACKGROUND : null);
  if (!src) {
    drawWorldGround();
    return;
  }
  const img = getImage(src);
  if (!img.complete || img.naturalWidth === 0) {
    drawWorldGround();
    return;
  }
  ctx.save();
  ctx.imageSmoothingEnabled = !state.settings.pixelatedMap;
  ctx.drawImage(img, -camera.x, -camera.y, WORLD_WIDTH * TILE, WORLD_HEIGHT * TILE);
  ctx.restore();
  ctx.imageSmoothingEnabled = false;
}

function drawAreaBackground(map) {
  if (!map.areaBackground) return;
  const img = getImage(map.areaBackground);
  if (!img.complete || img.naturalWidth === 0) return;
  const district = DISTRICT_LAYOUT.get(map.id);
  if (!district) return;
  const sx = district.x * TILE - camera.x;
  const sy = district.y * TILE - camera.y;
  const sw = district.width * TILE;
  const sh = district.height * TILE;
  if (sx > canvas.width || sy > canvas.height || sx + sw < 0 || sy + sh < 0) return;
  ctx.save();
  ctx.imageSmoothingEnabled = !state.settings.pixelatedMap;
  ctx.globalAlpha = isAreaUnlocked(map.id) ? 1 : 0.34;
  ctx.drawImage(img, sx, sy, sw, sh);
  if (!isAreaUnlocked(map.id)) {
    ctx.fillStyle = "rgba(12, 12, 18, .58)";
    ctx.fillRect(sx, sy, sw, sh);
  }
  ctx.restore();
  ctx.imageSmoothingEnabled = false;
}

function drawWorldGround() {
  ctx.save();
  const bg = getImage(WORLD_BACKGROUND);
  if (bg.complete && bg.naturalWidth > 0) {
    ctx.imageSmoothingEnabled = !state.settings.pixelatedMap;
    ctx.drawImage(bg, -camera.x, -camera.y, WORLD_WIDTH * TILE, WORLD_HEIGHT * TILE);
    ctx.imageSmoothingEnabled = false;
    ctx.restore();
    return;
  }
  const road = "#d9c27a";
  const roadShadow = "rgba(79, 61, 58, .18)";
  ctx.fillStyle = "#6da86d";
  ctx.fillRect(-camera.x, -camera.y, WORLD_WIDTH * TILE, WORLD_HEIGHT * TILE);

  const centers = [...DISTRICT_LAYOUT.values()].map((district) => ({
    x: (district.x + district.width / 2) * TILE - camera.x,
    y: (district.y + district.height / 2) * TILE - camera.y,
  }));
  const town = districtCenter("town_center");
  const hub = { x: town.x * TILE + TILE / 2 - camera.x, y: town.y * TILE + TILE / 2 - camera.y };
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  for (const center of centers) {
    ctx.strokeStyle = roadShadow;
    ctx.lineWidth = TILE * 1.25;
    ctx.beginPath();
    ctx.moveTo(hub.x, hub.y + 4);
    ctx.lineTo(center.x, center.y + 4);
    ctx.stroke();
    ctx.strokeStyle = road;
    ctx.lineWidth = TILE * 0.94;
    ctx.beginPath();
    ctx.moveTo(hub.x, hub.y);
    ctx.lineTo(center.x, center.y);
    ctx.stroke();
  }
  ctx.restore();
}

function drawLockedDistrictMask() {
  ctx.save();
  for (const area of DATA.areas) {
    if (isAreaUnlocked(area.id)) continue;
    const district = DISTRICT_LAYOUT.get(area.id);
    if (!district) continue;
    const sx = district.x * TILE - camera.x;
    const sy = district.y * TILE - camera.y;
    const sw = district.width * TILE;
    const sh = district.height * TILE;
    if (sx > canvas.width || sy > canvas.height || sx + sw < 0 || sy + sh < 0) continue;
    ctx.fillStyle = "rgba(12, 12, 18, .50)";
    ctx.fillRect(sx, sy, sw, sh);
  }
  ctx.restore();
}

function drawSemanticTiles() {
  if (!state.settings.showGrid) return;
  for (let y = 0; y < WORLD_HEIGHT; y++) {
    for (let x = 0; x < WORLD_WIDTH; x++) {
      const px = x * TILE - camera.x;
      const py = y * TILE - camera.y;
      if (px > canvas.width || py > canvas.height || px + TILE < 0 || py + TILE < 0) continue;
      const blocked = tileBlocked(x, y);
      ctx.strokeStyle = blocked ? "rgba(42,32,32,.2)" : "rgba(255,255,255,.12)";
      ctx.strokeRect(px, py, TILE, TILE);
    }
  }
}

function shade(hex, amount) {
  const value = hex.replace("#", "");
  const num = parseInt(value, 16);
  const r = Math.max(0, Math.min(255, (num >> 16) + amount));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 255) + amount));
  const b = Math.max(0, Math.min(255, (num & 255) + amount));
  return `rgb(${r}, ${g}, ${b})`;
}

function drawDecor() {
  ctx.save();
  const area = currentArea();
  ctx.fillStyle = "rgba(34, 29, 38, .74)";
  ctx.fillRect(14, 14, Math.min(canvas.width - 28, 300), 40);
  ctx.fillStyle = "#fff7dc";
  ctx.font = "bold 20px sans-serif";
  ctx.fillText(area?.name || "小康在线镇", 28, 41);
  if (state.areaId === "town_center") {
    for (const transition of transitionsForWorld()) {
      const center = centerOfTile(transition.x, transition.y);
      if (center.x < -80 || center.y < -80 || center.x > canvas.width + 80 || center.y > canvas.height + 80) continue;
      drawAreaAvatarHints(transition.to, center.x - 88, center.y + 46, 176);
    }
  } else {
    drawAreaAvatarHints(state.areaId, 20, 62, 280);
  }
  ctx.restore();
}

function drawAreaAvatarHints(areaId, sx, sy, maxWidth) {
  const map = indexes.maps.get(areaId);
  if (!map) return;
  const ids = [...new Set(map.npcs || [])].slice(0, 6);
  if (!ids.length) return;
  const size = 30;
  const gap = 7;
  const width = Math.min(maxWidth, ids.length * size + (ids.length - 1) * gap + 16);
  ctx.save();
  ctx.fillStyle = "rgba(34, 29, 38, .66)";
  ctx.fillRect(sx, sy, width, size + 14);
  ids.forEach((id, index) => {
    const char = indexes.characters.get(id);
    if (!char) return;
    const x = sx + 8 + index * (size + gap);
    const y = sy + 7;
    const avatar = getImage(char.avatar);
    ctx.save();
    ctx.beginPath();
    ctx.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2);
    ctx.clip();
    if (avatar.complete && avatar.naturalWidth > 0) {
      ctx.drawImage(avatar, x, y, size, size);
    } else {
      const colors = char.avatarVisualDNA.primaryColors;
      ctx.fillStyle = colors[0] || "#d65f5b";
      ctx.fillRect(x, y, size, size);
      ctx.fillStyle = colors[1] || "#5da1a0";
      ctx.fillRect(x, y + size / 2, size, size / 2);
    }
    ctx.restore();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(x + size / 2, y + size / 2, size / 2 + 1, 0, Math.PI * 2);
    ctx.stroke();
  });
  ctx.restore();
}

function drawTransition(transition) {
  const center = centerOfTile(transition.x, transition.y);
  const x = center.x;
  const y = center.y;
  const unlocked = canEnterTransition(transition);
  const label = areaName(transition.to);
  const text = transition.to === "town_center" ? "回到小镇" : unlocked ? `入口：${label}` : "剧情后进入";
  ctx.save();
  if (x < -80 || y < -80 || x > canvas.width + 80 || y > canvas.height + 80) {
    ctx.restore();
    return;
  }
  ctx.fillStyle = "rgba(34, 29, 38, .68)";
  ctx.beginPath();
  ctx.ellipse(x, y + 15, 38, 13, 0, 0, Math.PI * 2);
  ctx.fill();
  drawTransitionShape(transition.shape || "door", x, y, unlocked, transition.to);
  ctx.fillStyle = unlocked ? "#4c3839" : "#fff7dc";
  ctx.font = "bold 13px sans-serif";
  const textWidth = typeof ctx.measureText === "function" ? ctx.measureText(text).width : text.length * 13;
  const boxW = textWidth + 12;
  const boxH = 24;
  const boxX = Math.min(canvas.width - boxW - 4, Math.max(4, x - boxW / 2));
  const boxY = y - 54;
  ctx.fillStyle = "rgba(43, 37, 48, .84)";
  ctx.fillRect(boxX, boxY, boxW, boxH);
  ctx.fillStyle = "#fff7dc";
  ctx.fillText(text, boxX + 6, boxY + 17);
  ctx.restore();
}

function drawTransitionShape(shape, x, y, unlocked, toArea) {
  const dim = unlocked ? 1 : 0.45;
  ctx.save();
  ctx.globalAlpha = dim;
  ctx.strokeStyle = "#4c3839";
  ctx.lineWidth = 3;
  if (shape === "wood_pier") {
    ctx.fillStyle = "#8b6847";
    ctx.fillRect(x - 34, y - 8, 68, 30);
    for (let i = -28; i <= 24; i += 13) ctx.fillRect(x + i, y - 18, 7, 44);
    ctx.strokeRect(x - 34, y - 8, 68, 30);
  } else if (shape === "neon_arch") {
    ctx.fillStyle = "#4b326f";
    ctx.fillRect(x - 28, y - 28, 56, 48);
    ctx.strokeRect(x - 28, y - 28, 56, 48);
    ctx.strokeStyle = "#ffdc7a";
    ctx.beginPath();
    ctx.arc(x, y - 4, 24, Math.PI, 0);
    ctx.stroke();
  } else if (shape === "card_gate") {
    ctx.fillStyle = "#8e3d39";
    ctx.fillRect(x - 28, y - 30, 56, 52);
    ctx.strokeRect(x - 28, y - 30, 56, 52);
    ctx.fillStyle = "#fff2a1";
    ctx.fillRect(x - 12, y - 20, 24, 34);
    ctx.strokeRect(x - 12, y - 20, 24, 34);
  } else if (shape === "garden_gate" || shape === "forest_path") {
    ctx.fillStyle = shape === "garden_gate" ? "#9fbf77" : "#5f935a";
    ctx.beginPath();
    ctx.arc(x - 18, y - 4, 18, 0, Math.PI * 2);
    ctx.arc(x + 18, y - 4, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "#7b5b3f";
    ctx.fillRect(x - 28, y + 4, 56, 18);
    ctx.strokeRect(x - 28, y + 4, 56, 18);
  } else if (shape === "paint_door") {
    ctx.fillStyle = "#5aa6a0";
    ctx.fillRect(x - 24, y - 30, 48, 54);
    ctx.strokeRect(x - 24, y - 30, 48, 54);
    ctx.fillStyle = "#e9bc4f";
    ctx.beginPath();
    ctx.arc(x + 12, y - 4, 5, 0, Math.PI * 2);
    ctx.fill();
  } else if (shape === "blue_lift") {
    ctx.fillStyle = "#506274";
    ctx.fillRect(x - 28, y - 32, 56, 56);
    ctx.strokeRect(x - 28, y - 32, 56, 56);
    ctx.fillStyle = "#8bd7ff";
    ctx.fillRect(x - 19, y - 22, 38, 12);
    ctx.fillRect(x - 19, y - 4, 38, 12);
  } else {
    ctx.fillStyle = toArea === "town_center" ? "#d59f64" : "#fff1cf";
    ctx.fillRect(x - 24, y - 30, 48, 54);
    ctx.strokeRect(x - 24, y - 30, 48, 54);
    ctx.fillStyle = "#b94f4b";
    ctx.fillRect(x - 30, y - 36, 60, 12);
    ctx.strokeRect(x - 30, y - 36, 60, 12);
  }
  if (!unlocked) {
    ctx.fillStyle = "rgba(43, 37, 48, .56)";
    ctx.fillRect(x - 34, y - 38, 68, 66);
  }
  ctx.restore();
}

function drawInteraction(point) {
  const center = centerOfTile(point.x, point.y);
  const x = center.x;
  const y = center.y;
  if (x < -60 || y < -60 || x > canvas.width + 60 || y > canvas.height + 60) return;
  const bob = Math.sin(nowMs() / 320 + point.x) * 4;
  const icon = itemIcon(point.item);
  ctx.save();
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.shadowColor = "rgba(43, 37, 48, .42)";
  ctx.shadowBlur = 6;
  ctx.font = "34px Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji, sans-serif";
  ctx.fillText(icon, x, y + bob - 2);
  ctx.shadowBlur = 0;
  ctx.fillStyle = "rgba(255, 247, 220, .72)";
  ctx.beginPath();
  ctx.ellipse(x, y + 20, 18, 5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(43,37,48,.78)";
  ctx.font = "bold 12px sans-serif";
  const label = point.label || "物件";
  const textWidth = typeof ctx.measureText === "function" ? ctx.measureText(label).width : label.length * 12;
  ctx.fillRect(x - textWidth / 2 - 5, y + 28, textWidth + 10, 20);
  ctx.fillStyle = "#fff7dc";
  ctx.textBaseline = "alphabetic";
  ctx.fillText(label, x, y + 43);
  ctx.restore();
}

const spriteTrimCache = new Map();
const RED_GUIDE_ALPHA_THRESHOLD = 12;
const CHARACTER_GROUND_OFFSET = TILE * 0.36;

function defaultSpriteTrim(sx, sy, sw, sh) {
  return {
    sx,
    sy,
    sw,
    sh,
    cropX: 0,
    cropY: 0,
    minX: 0,
    minY: 0,
    maxX: sw - 1,
    maxY: sh - 1,
    footX: sw / 2,
    footY: sh - 1,
    opaqueWidth: sw,
    opaqueHeight: sh,
  };
}

function isGuidePixel(data, index) {
  return data[index + 3] > RED_GUIDE_ALPHA_THRESHOLD &&
    data[index] > 210 &&
    data[index + 1] < 70 &&
    data[index + 2] < 70;
}

function spriteTrim(img, key, sx, sy, sw, sh) {
  const cacheKey = `${key}:${sx}:${sy}:${sw}:${sh}:${img.naturalWidth}:${img.naturalHeight}`;
  if (spriteTrimCache.has(cacheKey)) return spriteTrimCache.get(cacheKey);
  let trim = defaultSpriteTrim(sx, sy, sw, sh);
  try {
    const offscreen = document.createElement("canvas");
    offscreen.width = sw;
    offscreen.height = sh;
    const offCtx = offscreen.getContext("2d", { willReadFrequently: true });
    offCtx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);
    const data = offCtx.getImageData(0, 0, sw, sh).data;
    let minX = sw;
    let minY = sh;
    let maxX = -1;
    let maxY = -1;
    const rowCounts = Array.from({ length: sh }, () => 0);
    const rowMinX = Array.from({ length: sh }, () => sw);
    const rowMaxX = Array.from({ length: sh }, () => -1);
    for (let py = 0; py < sh; py++) {
      for (let px = 0; px < sw; px++) {
        const index = (py * sw + px) * 4;
        if (data[index + 3] <= RED_GUIDE_ALPHA_THRESHOLD || isGuidePixel(data, index)) continue;
        minX = Math.min(minX, px);
        minY = Math.min(minY, py);
        maxX = Math.max(maxX, px);
        maxY = Math.max(maxY, py);
        rowCounts[py] += 1;
        rowMinX[py] = Math.min(rowMinX[py], px);
        rowMaxX[py] = Math.max(rowMaxX[py], px);
      }
    }
    if (maxX >= minX && maxY >= minY) {
      const pad = 2;
      const opaqueWidth = maxX - minX + 1;
      const opaqueHeight = maxY - minY + 1;
      const bottomRowThreshold = Math.max(2, Math.round(opaqueWidth * 0.035));
      let footY = maxY;
      for (let py = maxY; py >= minY; py--) {
        if (rowCounts[py] >= bottomRowThreshold) {
          footY = py;
          break;
        }
      }
      let footMinX = sw;
      let footMaxX = -1;
      for (let py = Math.max(minY, footY - 8); py <= footY; py++) {
        if (rowCounts[py] < bottomRowThreshold) continue;
        footMinX = Math.min(footMinX, rowMinX[py]);
        footMaxX = Math.max(footMaxX, rowMaxX[py]);
      }
      const footX = footMaxX >= footMinX ? (footMinX + footMaxX) / 2 : (minX + maxX) / 2;
      const cropX = Math.max(0, minX - pad);
      const cropY = Math.max(0, minY - pad);
      const cropRight = Math.min(sw - 1, maxX + pad);
      const cropBottom = Math.min(sh - 1, maxY + pad);
      trim = {
        sx: sx + cropX,
        sy: sy + cropY,
        sw: cropRight - cropX + 1,
        sh: cropBottom - cropY + 1,
        cropX,
        cropY,
        minX,
        minY,
        maxX,
        maxY,
        footX,
        footY,
        opaqueWidth,
        opaqueHeight,
      };
    }
  } catch {
    trim = defaultSpriteTrim(sx, sy, sw, sh);
  }
  spriteTrimCache.set(cacheKey, trim);
  return trim;
}

function characterGroundPoint(x, y) {
  const center = centerOfTile(x, y);
  return {
    x: center.x,
    y: center.y + CHARACTER_GROUND_OFFSET,
  };
}

function drawCharacterShadow(x, y, isPlayer, scale = 1) {
  ctx.fillStyle = "rgba(0,0,0,.2)";
  ctx.beginPath();
  ctx.ellipse(x, y + 2, (isPlayer ? 21 : 17) * scale, (isPlayer ? 7 : 5.5) * scale, 0, 0, Math.PI * 2);
  ctx.fill();
}

function drawImageWithWhiteOutline(img, sx, sy, sw, sh, dx, dy, dw, dh) {
  ctx.save();
  ctx.filter = "brightness(0) invert(1)";
  for (const [ox, oy] of [[-3, 0], [3, 0], [0, -3], [0, 3], [-2, -2], [2, -2], [-2, 2], [2, 2]]) {
    ctx.drawImage(img, sx, sy, sw, sh, dx + ox, dy + oy, dw, dh);
  }
  ctx.restore();
  ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
}

function drawCharacter(x, y, char, isPlayer) {
  if (!char) return;
  const ground = characterGroundPoint(x, y);
  const px = ground.x;
  const groundY = ground.y;
  if (px < -120 || groundY < -180 || px > canvas.width + 120 || groundY > canvas.height + 140) return;
  const colors = char.avatarVisualDNA.primaryColors;
  const sprite = getImage(char.sprite);
  const meta = DATA.sprite_meta?.[char.id];
  if (sprite.complete && sprite.naturalWidth > 0 && meta?.columns === 4 && meta?.rows === 4) {
    const columns = 4;
    const rows = 4;
    const sw = sprite.naturalWidth / columns;
    const sh = sprite.naturalHeight / rows;
    const rowByFacing = { down: 0, up: 1, left: 2, right: 3 };
    const sourceRow = Math.min(rows - 1, rowByFacing[isPlayer ? state.facing : "down"] ?? 0);
    const sourceColumn = Math.floor(nowMs() / 360 + x + y) % columns;
    const rawSx = sourceColumn * sw;
    const rawSy = sourceRow * sh;
    const trim = spriteTrim(sprite, char.id, rawSx, rawSy, sw, sh);
    const targetHeight = isPlayer ? TILE * 1.7 : TILE * 1.55;
    const scale = targetHeight / Math.max(1, trim.opaqueHeight);
    const dw = trim.sw * scale;
    const dh = trim.sh * scale;
    const footOffsetX = (trim.footX - trim.cropX) * scale;
    const footOffsetY = (trim.footY - trim.cropY) * scale;
    const drawX = px - footOffsetX;
    const drawY = groundY - footOffsetY;
    const opaqueTopY = drawY + (trim.minY - trim.cropY) * scale;
    ctx.save();
    drawCharacterShadow(px, groundY, isPlayer, clamp(scale / 1.25, 0.82, 1.22));
    drawImageWithWhiteOutline(sprite, trim.sx, trim.sy, trim.sw, trim.sh, drawX, drawY, dw, dh);
    ctx.restore();
    if (isPlayer) {
      drawPlayerPointer(px, opaqueTopY - 18);
    }
    return;
  }
  drawCharacterShadow(px, groundY, isPlayer);
  const img = getImage(char.avatar);
  if (img.complete && img.naturalWidth > 0) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(px, groundY - 30, isPlayer ? 18 : 15, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(img, px - (isPlayer ? 19 : 16), groundY - (isPlayer ? 49 : 46), isPlayer ? 38 : 32, isPlayer ? 38 : 32);
    ctx.restore();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = isPlayer ? 5 : 4;
    ctx.beginPath();
    ctx.arc(px, groundY - 30, isPlayer ? 19 : 16, 0, Math.PI * 2);
    ctx.stroke();
    if (isPlayer) drawPlayerPointer(px, groundY - 82);
    return;
  }
  ctx.fillStyle = colors[0];
  ctx.fillRect(px - 11, groundY - 46, 22, 24);
  ctx.fillStyle = "#ffd9bd";
  ctx.fillRect(px - 12, groundY - 53, 24, 18);
  ctx.fillStyle = colors[1] || "#4f3d3a";
  ctx.fillRect(px - 15, groundY - 58, 30, 9);
  ctx.fillStyle = "#2b2530";
  ctx.fillRect(px - 7, groundY - 46, 4, 4);
  ctx.fillRect(px + 4, groundY - 46, 4, 4);
  ctx.fillStyle = isPlayer ? "#fff2a1" : "#ffffff";
  ctx.fillRect(px - 8, groundY - 21, 16, 5);
  if (isPlayer) drawPlayerPointer(px, groundY - 88);
}

function drawPlayerPointer(px, py) {
  const alpha = 0.48 + Math.sin(nowMs() / 190) * 0.36;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.shadowColor = "rgba(0, 0, 0, .42)";
  ctx.shadowBlur = 6;
  ctx.fillStyle = "#fff2a1";
  ctx.strokeStyle = "#4c3839";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(px, py + 24);
  ctx.lineTo(px - 16, py);
  ctx.lineTo(px + 16, py);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function updateHud() {
  applyPixelMode();
  const area = currentArea();
  $("#areaName").textContent = area.name;
  $("#areaTheme").textContent = area.theme;
  $("#timeButton").textContent = timeLabel(state.time);
  const player = indexes.characters.get(state.playerId) || DATA.characters[0];
  $("#playerName").textContent = player.displayName;
  const bagCount = inventoryCount();
  $("#playerTrait").textContent = `${player.title}，常驻${areaName(player.defaultArea)}，背包 ${bagCount} 件`;
  $("#playerAvatar").outerHTML = avatarMarkup(player).replace("avatar-frame", "avatar-frame").replace("<div", '<div id="playerAvatar"');
  renderActiveQuest();
  renderBackpackPreview();
  renderAssetStatus();
  updateNearby();
}

function applyPixelMode() {
  const shell = canvas.closest?.(".map-shell");
  if (shell) shell.classList.toggle("is-pixelated", Boolean(state.settings.pixelatedMap));
  canvas.style.imageRendering = state.settings.pixelatedMap ? "pixelated" : "auto";
}

function timeLabel(time) {
  return { day: "白天", dusk: "黄昏", night: "夜晚" }[time] || time;
}

function cycleTime() {
  state.time = state.time === "day" ? "dusk" : state.time === "dusk" ? "night" : "day";
  toast(`时间切换：${timeLabel(state.time)}`);
  updateHud();
}

function renderActiveQuest() {
  const quest = trackedQuestObject();
  const guideNode = $("#activeQuestGuide");
  renderQuestCg(quest);
  if (!quest) {
    $("#activeQuestName").textContent = "自由探索";
    $("#activeQuestSteps").innerHTML = "<li>找居民闲谈，看到线索物就顺手问一句：你是不是藏剧情。</li>";
    if (guideNode) guideNode.innerHTML = "<strong>下一步：</strong>随便找人聊天，或者点地图上的 emoji 线索物。";
    return;
  }
  $("#activeQuestName").textContent = quest.name;
  const progress = getQuestProgress(quest.id);
  $("#activeQuestSteps").innerHTML = quest.steps
    .map((step, index) => {
      const className = index < progress ? "done" : index === progress ? "active" : "";
      return `<li class="${className}">${index < progress ? "✓ " : ""}${formatQuestStep(step)}</li>`;
    })
    .join("");
  const currentStep = quest.steps[progress];
  if (guideNode) guideNode.innerHTML = `<strong>下一步：</strong>${escapeHtml(nextClickInstruction(currentStep))}`;
}

function renderBackpackPreview() {
  const count = inventoryCount();
  const countNode = $("#backpackCount");
  const itemsNode = $("#backpackItems");
  if (!countNode || !itemsNode) return;
  countNode.textContent = `${count} 件物件`;
  const entries = inventoryEntries();
  if (!entries.length) {
    itemsNode.innerHTML = `<span class="bag-chip is-empty"><span class="bag-icon">🎒</span><span class="bag-name">空空如也</span></span>`;
    return;
  }
  const visible = entries.slice(0, 6);
  const rest = entries.length - visible.length;
  itemsNode.innerHTML = `${visible
    .map((item) => `<span class="bag-chip" title="${escapeHtml(item.name)}：${escapeHtml(item.flavor || item.description)}">
      <span class="bag-icon">${escapeHtml(item.icon || "🎒")}</span>
      <span class="bag-name">${escapeHtml(item.name)}</span>
      <span>×${item.count}</span>
    </span>`)
    .join("")}${rest > 0 ? `<span class="bag-chip">+${rest}</span>` : ""}`;
}

function formatQuestStep(step) {
  const icon = step.item ? `${DATA.items.find((item) => item.id === step.item)?.icon || "🎒"} ` : "";
  return `${icon}${polishText(step.hint || "推进剧情")}`;
}

function nextClickInstruction(step) {
  if (!step) return "这个任务已经收束，去找居民闲聊或者打开攻略看隐藏插画条件。";
  if (step.type === "visit") return travelClickInstruction(step.target);
  if (step.type === "talk" || step.type === "return") {
    const char = indexes.characters.get(step.target);
    const areaId = areaForNpc(step.target) || char?.defaultArea || state.areaId;
    if (state.areaId !== areaId) return `${travelClickInstruction(areaId)} 到了以后点"${char?.displayName || step.target}"，选“关于任务”。`;
    return `点"${char?.displayName || step.target}"，然后选“关于任务”。`;
  }
  if (step.type === "interact") {
    const point = interactionById(step.target);
    const areaId = point?.areaId || state.areaId;
    if (state.areaId !== areaId) return `${travelClickInstruction(areaId)} 到了以后点"${point?.label || step.target}"。`;
    const item = point?.item ? `${itemIcon(point.item)} ` : "";
    return `点"${item}${point?.label || step.target}"。`;
  }
  if (step.type === "collect") return `去点带 emoji 的线索物，收集"${itemName(step.item)}"到 ${step.count || 1} 个。`;
  if (step.type === "event") return polishText(step.hint || "触发对应剧情事件。");
  return polishText(step.hint || "继续推进剧情。");
}

function travelClickInstruction(targetAreaId) {
  if (!targetAreaId || state.areaId === targetAreaId) return `已经在"${areaName(targetAreaId || state.areaId)}"，直接找目标点。`;
  if (targetAreaId === "town_center") return "点当前区域的“回到小镇”入口。";
  if (state.areaId !== "town_center") return `先点“回到小镇”入口，再点"${areaName(targetAreaId)}"入口。`;
  return `点"${areaName(targetAreaId)}"入口。`;
}

function areaForNpc(charId) {
  const map = DATA.maps.find((entry) => (entry.npcs || []).includes(charId));
  return map?.id || null;
}

function cgForQuest(quest) {
  if (quest) {
    const direct = (DATA.task_cgs || []).find((cg) => cg.questIds.includes(quest.id));
    if (direct) return direct;
    const byArea = (DATA.task_cgs || []).find((cg) => cg.areaIds.includes(quest.startArea));
    if (byArea) return byArea;
  }
  return (DATA.task_cgs || []).find((cg) => cg.areaIds.includes(state.areaId)) || (DATA.task_cgs || [])[0];
}

function renderQuestCg(quest) {
  const cg = cgForQuest(quest);
  const card = $("#questCgCard");
  if (!cg || !card) return;
  $("#questCgImage").src = cg.path;
  $("#questCgImage").alt = `${cg.name} 插画`;
  $("#questCgName").textContent = displayCgName(cg.name);
}

function renderAssetStatus() {
  const total = DATA.art_assets.length;
  const imported = DATA.art_assets.filter((asset) => asset.status.matchCheck === "通过").length;
  const cgCount = ALL_CGS.length || DATA.task_cgs?.length || 0;
  const sceneCount = Object.keys(DATA.tiles?.areaBackgrounds || {}).length;
  $("#assetStatusText").textContent = `居民 ${imported}/${total}，隐藏插画 ${cgCount} 张，场景 ${sceneCount} 个。`;
}

function openModal(title, html) {
  $("#modalTitle").textContent = title;
  $("#modalBody").innerHTML = html;
  $("#modalLayer").hidden = false;
}

function closeModal() {
  $("#modalLayer").hidden = true;
}

function showQuestCompleteBanner(quest) {
  const banner = $("#questCompleteBanner");
  const name = $("#questCompleteName");
  if (!banner || !name) return;
  name.textContent = quest?.name || "小镇已更新";
  banner.hidden = false;
  banner.classList.remove("is-playing");
  void banner.offsetWidth;
  banner.classList.add("is-playing");
  window.clearTimeout(showQuestCompleteBanner.timer);
  showQuestCompleteBanner.timer = window.setTimeout(() => {
    banner.hidden = true;
    banner.classList.remove("is-playing");
  }, 2600);
}

function showAreaUnlockPopup(areaIds = []) {
  const popup = $("#areaUnlockPopup");
  const name = $("#areaUnlockName");
  if (!popup || !name || !areaIds.length) return;
  const names = areaIds.map(areaName).join("、");
  name.textContent = names;
  popup.hidden = false;
  popup.classList.remove("is-playing");
  void popup.offsetWidth;
  popup.classList.add("is-playing");
  playAreaUnlockDing();
  window.clearTimeout(showAreaUnlockPopup.timer);
  showAreaUnlockPopup.timer = window.setTimeout(() => {
    popup.hidden = true;
    popup.classList.remove("is-playing");
  }, 3600);
}

function openBackpack() {
  const entries = inventoryEntries();
  if (!entries.length) {
    openModal(
      "背包",
      `<article class="info-card">
        <p class="server-name">当前物件</p>
        <h3>还没有收进来的东西</h3>
        <p class="muted">去小镇里靠近带 emoji 的线索物，确认后它们就会进背包。收进来的不只是道具，也是梗的存档点。</p>
      </article>`
    );
    return;
  }
  const html = `<div class="backpack-grid">${entries
    .map((item) => `<article class="info-card backpack-item-card">
      <div class="backpack-item-icon">${escapeHtml(item.icon || "🎒")}</div>
      <div>
        <p class="server-name">数量 ×${item.count}</p>
        <h3>${escapeHtml(item.name)}</h3>
        <p>${escapeHtml(item.flavor || item.description)}</p>
        <p class="muted">${escapeHtml(item.description || item.flavor || "这件东西正在等待自己的名场面。")}</p>
      </div>
    </article>`)
    .join("")}</div>`;
  openModal("背包", html);
}

function openQuestLog() {
  const visibleQuests = visibleQuestObjects();
  const html = `<div class="track-switch-callout">
    <strong>切换跟踪任务</strong>
    <span>点任务卡里的“跟踪此任务”，右侧任务指引和下一步提示会立刻换过去。</span>
  </div>
  <div class="quest-grid">${visibleQuests
    .map((quest) => {
      const status = state.completedQuests.has(quest.id)
        ? "completed"
        : state.activeQuests.has(quest.id)
          ? "active"
          : state.unlockedAreas.has(quest.startArea)
            ? "available"
            : "hidden";
      const progress = getQuestProgress(quest.id);
      const cg = cgForQuest(quest);
      return `<article class="info-card">
        ${cg ? `<img class="quest-card-cg" src="${cg.path}" alt="${displayCgName(cg.name)} 插画" />` : ""}
        <p class="server-name">${questTypeLabel(quest.type)} / ${questStatusLabel(status)}${state.trackedQuestId === quest.id ? " / 正在跟踪" : ""}</p>
        <h3>${quest.name}</h3>
        <p class="muted">起点：${areaName(quest.startArea)} / 进度 ${progress}/${quest.steps.length}</p>
        <button class="track-quest-button ${state.trackedQuestId === quest.id ? "is-tracked" : ""}" data-track-quest="${quest.id}">
          ${state.trackedQuestId === quest.id ? "正在跟踪" : "跟踪此任务"}
        </button>
        <ol>${quest.steps.map((step, index) => `<li>${index < progress ? "✓ " : ""}${formatQuestStep(step)}</li>`).join("")}</ol>
      </article>`;
    })
    .join("")}</div>`;
  openModal("任务日志", html);
}

function openGuide() {
  const mainQuests = DATA.quests.filter((quest) => quest.type === "main");
  const guideQuest = trackedQuestObject();
  const visibleQuests = visibleQuestObjects();
  const currentStep = guideQuest?.steps?.[getQuestProgress(guideQuest.id)] || null;
  const switchHtml = `<article class="info-card track-switch-panel">
    <p class="server-name">切换跟踪任务</p>
    <h3>想看哪条线，就点哪条</h3>
    <p class="muted">切换后，右侧任务指引会立刻改成对应任务的“下一步该点什么”。</p>
    <div class="track-switch-buttons">${visibleQuests
      .map((quest) => `<button class="track-quest-button ${state.trackedQuestId === quest.id ? "is-tracked" : ""}" data-track-quest="${quest.id}">
        ${state.trackedQuestId === quest.id ? "正在跟踪：" : "跟踪："}${escapeHtml(quest.name)}
      </button>`)
      .join("")}</div>
  </article>`;
  const currentHtml = guideQuest && currentStep
    ? `<article class="info-card guide-current">
      <p class="server-name">现在就干这个</p>
      <h3>${escapeHtml(guideQuest.name)}</h3>
      <p>${escapeHtml(guideStepSentence(currentStep))}</p>
      <p class="muted">别想太多，点到对应人或物件就行。这个小镇主要是来聊天看梗的，不是来考路线规划的。</p>
    </article>`
    : `<article class="info-card guide-current">
      <p class="server-name">当前状态</p>
      <h3>主线已经收束</h3>
      <p>可以去找居民闲聊、开关系剧情、翻隐藏插画。现在属于小镇自由水群时间。</p>
    </article>`;
  const routeHtml = `<article class="info-card guide-route">
    <p class="server-name">主线速通路线</p>
    <h3>照这个点，服务器不敢装死</h3>
    <ol>
      <li>去龙牌馆找弧形反叛超量🐉，再回广场点喷泉弹幕井和小康钟，最后回去汇报。</li>
      <li>进小康餐厅点晚饭召集锅，再进龙牌馆点无效门禁。</li>
      <li>进夜雀舞台点深夜灯控台，再去湖边回声栈道点漂流诗页。</li>
      <li>进头像工坊点同步色板，再去北境野地点野外信号塔，最后去小康养老院打个卡。</li>
      <li>进服务器机房，依次点缓存清理台和核心重启杆，然后回小镇中心看结局。</li>
    </ol>
  </article>`;
  const questHtml = mainQuests
    .map((quest) => {
      const progress = getQuestProgress(quest.id);
      const status = state.completedQuests.has(quest.id)
        ? "已完成"
        : state.activeQuests.has(quest.id)
          ? "进行中"
          : "后面会开";
      return `<article class="info-card">
        <p class="server-name">主线 / ${status}</p>
        <h3>${escapeHtml(quest.name)}</h3>
        <ol class="guide-steps">${quest.steps
          .map((step, index) => `<li class="${index < progress ? "done" : index === progress && state.activeQuests.has(quest.id) ? "active" : ""}">
            ${index < progress ? "✓ " : ""}${escapeHtml(guideStepSentence(step))}
          </li>`)
          .join("")}</ol>
      </article>`;
    })
    .join("");
  const tipsHtml = `<article class="info-card guide-tips">
    <p class="server-name">不想卡住就记这个</p>
    <h3>小镇通关基本法</h3>
    <ul>
      <li>所有大区域都从小镇中心入口进，进错了就点“回到小镇”。</li>
      <li>遇到人先选“闲谈”也没事，主线推进看“关于任务”。</li>
      <li>带 emoji 的物件就是可点线索，点完会进背包，道具消失是正常的。</li>
      <li>隐藏插画主要靠长聊、关系剧情和主线完成，不用满地图刮地皮。</li>
    </ul>
  </article>`;
  openModal("攻略", `<div class="guide-panel">${switchHtml}${currentHtml}${routeHtml}${tipsHtml}${questHtml}</div>`);
}

function guideStepSentence(step) {
  if (!step) return "随便逛逛，找人聊天，看到 emoji 物件就点。";
  if (step.type === "visit") return `前往"${areaName(step.target)}"。入口通常在小镇中心，靠近入口点一下就能进。`;
  if (step.type === "talk") {
    const char = indexes.characters.get(step.target);
    return `去找"${char?.displayName || step.target}"说话，见面后选“关于任务”。`;
  }
  if (step.type === "return") {
    const char = indexes.characters.get(step.target);
    return `回去找"${char?.displayName || step.target}"交差，继续选“关于任务”。`;
  }
  if (step.type === "interact") {
    const point = interactionById(step.target);
    return `调查"${point?.label || step.target}"，位置在"${areaName(point?.areaId || state.areaId)}"。看到 emoji 线索就点它。`;
  }
  if (step.type === "collect") return `收集 ${step.count || 1} 个"${itemName(step.item)}"。`;
  if (step.type === "event") return polishText(step.hint || "触发对应剧情事件。");
  return polishText(step.hint || "推进剧情。");
}

function interactionById(interactionId) {
  for (const map of DATA.maps) {
    const point = (map.interactions || []).find((item) => item.id === interactionId);
    if (point) return { ...point, areaId: map.id };
  }
  return null;
}

function questTypeLabel(type) {
  return { main: "主线", area: "街区", bond: "羁绊", easter: "隐藏" }[type] || "任务";
}

function questStatusLabel(status) {
  return {
    completed: "已完成",
    active: "进行中",
    available: "可接取",
    hidden: "未发现",
  }[status] || status;
}

function areaName(areaId) {
  return indexes.areas.get(areaId)?.name || areaId;
}

function openCgGallery() {
  const html = `<div class="cg-grid">${ALL_CGS
    .map((cg) => {
      const unlocked = isCgUnlocked(cg);
      const name = displayCgName(cg.name);
      return `<article class="info-card cg-card ${unlocked ? "is-unlocked" : "is-locked"}">
        ${unlocked
          ? `<img src="${cg.path}" alt="${name} 插画" onerror="this.remove(); this.closest('.cg-card').classList.add('is-missing');" />`
          : `<div class="cg-lock" aria-hidden="true">?</div>`}
        <p class="server-name">${cgTypeLabel(cg.type)} / ${unlocked ? "已解锁" : "未解锁"}</p>
        <h3>${name}</h3>
        <p class="muted">${unlocked ? cgUnlockedNote(cg) : cg.hint || "继续聊天和推进任务后会出现线索。"}</p>
      </article>`;
    })
    .join("")}</div>`;
  openModal("隐藏插画", html);
}

function displayCgName(name = "隐藏插画") {
  return name.replace(/CG/g, "插画");
}

function cgTypeLabel(type) {
  return { main: "主线", task: "任务", pair: "羁绊", final: "最终" }[type] || "插画";
}

function cgUnlockedNote(cg) {
  if (cg.type === "pair") return "长对话已经归档。回看时记得带上弹幕，不然画面会害羞。";
  if (cg.type === "final") return "角色最终章已完成，这张图正式从小镇缓存里捞出来了。";
  if (cg.type === "main") return "主线收束后解锁的大画面，全员在线，服务器不许躺平。";
  return "任务节点已完成，插画进入回放。";
}

function isCgUnlocked(cg) {
  if (!cg) return false;
  if (cg.type === "task") {
    return state.completedQuests.has(cg.unlock) || (cg.questIds || []).some((id) => state.completedQuests.has(id));
  }
  if (cg.type === "main") return state.completedQuests.has(cg.unlock);
  if (cg.type === "pair") return state.memories.has(cg.unlock) || state.memories.has(reversePairMemory(cg.unlock));
  if (cg.type === "final") {
    return Boolean(state.bonds[`${cg.unlock}_lv3`] || state.bonds[cg.unlock] || state.memories.has(`memory_${cg.unlock}`) || state.completedQuests.has(cg.unlock));
  }
  return false;
}

function openCodex() {
  const unlockedCharacters = DATA.characters.filter((char) => state.codex.has(char.id) || char.id === state.playerId);
  const html = unlockedCharacters.length
    ? `<div class="codex-grid">${unlockedCharacters
      .map((char) => {
        const story = indexes.storyByCharacter.get(char.id);
        return `<article class="info-card profile-card">
        ${avatarMarkup(char)}
        <div>
          <p class="server-name">${char.title}</p>
          <h3>${char.displayName}</h3>
          <p class="muted">群昵称：${char.groupNickname}</p>
          <p class="muted">魂印线索：${char.avatarVisualDNA.symbols.join("、")}</p>
          <p class="muted">常驻区域：${areaName(char.defaultArea)}</p>
          <p class="muted">${char.codexBlurb || char.storyChapters?.[0] || "档案还在加载，像群聊里突然失踪的上文。"}</p>
          ${story?.archiveText ? `<details class="archive-text"><summary>完整档案</summary><p>${polishText(story.archiveText, char.id)}</p></details>` : ""}
        </div>
      </article>`;
      })
      .join("")}</div>`
    : `<article class="info-card"><h3>图鉴未激活</h3><p class="muted">和居民对话后，对应角色才会记录到这里。</p></article>`;
  openModal("角色图鉴", html);
}

function openSettings() {
  const html = `<div class="area-grid">
    <article class="info-card">
      <h3>声音</h3>
      <input id="volumeInput" type="range" min="0" max="100" value="${state.settings.volume}" />
    </article>
    <article class="info-card">
      <h3>文字速度</h3>
      <input id="textSpeedInput" type="range" min="1" max="3" value="${state.settings.textSpeed}" />
    </article>
    <article class="info-card">
      <h3>显示网格</h3>
      <label><input id="gridInput" type="checkbox" ${state.settings.showGrid ? "checked" : ""} /> 开启</label>
    </article>
    <article class="info-card">
      <h3>像素化地图</h3>
      <label><input id="pixelInput" type="checkbox" ${state.settings.pixelatedMap ? "checked" : ""} /> 放大时显示硬边像素</label>
    </article>
    <article class="info-card">
      <h3>存档</h3>
      <button data-action="manualSave">保存</button>
      <button data-action="resetGame">重置</button>
    </article>
  </div>`;
  openModal("设置", html);
  $("#volumeInput").addEventListener("input", (event) => {
    state.settings.volume = Number(event.target.value);
    ensureMusic();
    updateMusicVolume();
    saveGame();
  });
  $("#textSpeedInput").addEventListener("input", (event) => {
    state.settings.textSpeed = Number(event.target.value);
    saveGame();
  });
  $("#gridInput").addEventListener("change", (event) => {
    state.settings.showGrid = event.target.checked;
    saveGame();
  });
  $("#pixelInput").addEventListener("change", (event) => {
    state.settings.pixelatedMap = event.target.checked;
    applyPixelMode();
    saveGame();
  });
}

function showEnding() {
  const bondCount = Object.keys(state.bonds).filter((key) => key.includes("_lv3")).length;
  const truePoints = state.bonds.endingTruePoints || 0;
  const ending = truePoints >= 8 ? "真结局" : bondCount >= 10 ? "羁绊结局" : "普通结局";
  openModal(
    ending,
    `<div class="info-card">
      <h3>全员上线</h3>
      <p class="muted">小康钟被敲响，在线回声重新归档。当前完成：任务 ${state.completedQuests.size}/${DATA.quests.filter((quest) => quest.type !== "easter").length}，回忆 ${state.memories.size}，深层回声 ${truePoints}。</p>
      <p>小镇恢复稳定，小康Online 进入常驻在线准备状态。</p>
    </div>`
  );
}

function keyForPoint(x, y) {
  return `${x},${y}`;
}

function neighbors(point) {
  return [
    { x: point.x + 1, y: point.y },
    { x: point.x - 1, y: point.y },
    { x: point.x, y: point.y + 1 },
    { x: point.x, y: point.y - 1 },
  ];
}

function nearestOpenTarget(x, y) {
  const start = { x: Math.round(x), y: Math.round(y) };
  if (!tileBlocked(start.x, start.y)) return start;
  const queue = [start];
  const seen = new Set([keyForPoint(start.x, start.y)]);
  while (queue.length) {
    const current = queue.shift();
    if (Math.abs(current.x - start.x) + Math.abs(current.y - start.y) > 5) break;
    for (const next of neighbors(current)) {
      const key = keyForPoint(next.x, next.y);
      if (seen.has(key) || next.x < 0 || next.y < 0 || next.x >= WORLD_WIDTH || next.y >= WORLD_HEIGHT) continue;
      if (!tileBlocked(next.x, next.y)) return next;
      seen.add(key);
      queue.push(next);
    }
  }
  return null;
}

function findPathTo(target) {
  const start = { x: state.x, y: state.y };
  const goal = nearestOpenTarget(target.x, target.y);
  if (!goal) return [];
  if (start.x === goal.x && start.y === goal.y) return [];
  const queue = [start];
  const seen = new Set([keyForPoint(start.x, start.y)]);
  const previous = new Map();
  while (queue.length) {
    const current = queue.shift();
    if (current.x === goal.x && current.y === goal.y) break;
    for (const next of neighbors(current)) {
      const key = keyForPoint(next.x, next.y);
      if (seen.has(key) || tileBlocked(next.x, next.y)) continue;
      seen.add(key);
      previous.set(key, current);
      queue.push(next);
    }
  }
  const goalKey = keyForPoint(goal.x, goal.y);
  if (!previous.has(goalKey)) return [];
  const path = [goal];
  let cursor = previous.get(goalKey);
  while (cursor && !(cursor.x === start.x && cursor.y === start.y)) {
    path.push(cursor);
    cursor = previous.get(keyForPoint(cursor.x, cursor.y));
  }
  return path.reverse();
}

function startAutoPath(target, pendingAction = null) {
  const path = findPathTo(target);
  if (!path.length) {
    toast("这条路暂时没想通，换个点试试");
    return;
  }
  state.path = path;
  state.pendingAction = pendingAction;
  state.lastStepAt = 0;
  updateNearby();
}

function adjacentTargetFor(entity) {
  const candidates = neighbors(entity)
    .filter((point) => !tileBlocked(point.x, point.y))
    .sort((a, b) => distance(a, state) - distance(b, state));
  return candidates[0] || { x: entity.x, y: entity.y };
}

function walkToEntity(entity) {
  if (distance(state, entity) <= (entity.type === "npc" ? 2 : 1)) {
    runActionForEntity(entity);
    return;
  }
  startAutoPath(adjacentTargetFor(entity), { type: entity.type, id: entity.id, areaId: entity.areaId, to: entity.to });
}

function runActionForEntity(entity) {
  if (entity.type === "npc") talkToNpc(entity.id);
  else if (entity.type === "exit") applyTransition(entity);
  else if (entity.type === "interact") triggerInteraction(entity);
}

function tickAutoMove() {
  if (!state.path.length) return;
  const time = nowMs();
  if (time - state.lastStepAt < 118) return;
  const next = state.path.shift();
  state.lastStepAt = time;
  const dx = next.x - state.x;
  const dy = next.y - state.y;
  if (dx > 0) state.facing = "right";
  if (dx < 0) state.facing = "left";
  if (dy > 0) state.facing = "down";
  if (dy < 0) state.facing = "up";
  movePlayerTo(next.x, next.y, true);
  if (!state.path.length && state.pendingAction) {
    const allEntities = [...npcsForWorld(), ...interactionsForWorld(), ...transitionsForWorld()];
    const entity = allEntities.find((item) =>
      item.type === state.pendingAction.type &&
      item.id === state.pendingAction.id &&
      (state.pendingAction.areaId ? item.areaId === state.pendingAction.areaId : true) &&
      (state.pendingAction.to ? item.to === state.pendingAction.to : true)
    );
    state.pendingAction = null;
    if (entity && distance(state, entity) <= (entity.type === "npc" ? 2 : 1)) runActionForEntity(entity);
  }
}

function canvasPoint(event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: (event.clientX - rect.left) / rect.width * canvas.width / TILE + camera.x / TILE,
    y: (event.clientY - rect.top) / rect.height * canvas.height / TILE + camera.y / TILE,
  };
}

function clickDistance(point, target) {
  return Math.hypot(point.x - (target.x + 0.5), point.y - (target.y + 0.5));
}

function handleCanvasClick(event) {
  if (state.screen !== "game") return;
  if ($("#dialogueBox").hidden === false || $("#modalLayer").hidden === false) return;
  const point = canvasPoint(event);
  const exit = transitionsForWorld().find((target) => clickDistance(point, target) <= 0.82);
  if (exit) {
    walkToEntity(exit);
    return;
  }
  const interaction = interactionsForWorld().find((target) => clickDistance(point, target) <= 0.9);
  if (interaction) {
    walkToEntity(interaction);
    return;
  }
  const npc = npcsForWorld().find((target) => clickDistance(point, target) <= 1.05);
  if (npc) {
    walkToEntity(npc);
    return;
  }
  startAutoPath({ x: Math.floor(point.x), y: Math.floor(point.y) });
}

canvas.addEventListener("click", handleCanvasClick);

document.addEventListener("click", (event) => {
  ensureMusic();
  const button = event.target.closest("button");
  if (button && !button.disabled) playButtonDing();
  const action = event.target.closest("[data-action]")?.dataset.action;
  const choice = event.target.closest("[data-choice]")?.dataset.choice;
  const select = event.target.closest("[data-select]")?.dataset.select;
  const preview = event.target.closest("[data-preview]")?.dataset.preview;
  const trackQuest = event.target.closest("[data-track-quest]")?.dataset.trackQuest;
  const move = event.target.closest("[data-move]")?.dataset.move;
  if (preview) {
    selectCandidate(preview);
    return;
  }
  if (trackQuest) {
    setTrackedQuest(trackQuest);
    return;
  }
  if (choice) {
    if (state.dialogue && !state.dialogueTyping.done) {
      finishDialogueTypewriter();
      return;
    }
    chooseDialogue(choice);
    return;
  }
  if (select) {
    startGame(select);
    return;
  }
  if (move) {
    const dirs = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
    tryMove(...dirs[move]);
  }
  if (!action) return;
  const actions = {
    start: () => showScreen("select"),
    load: loadGame,
    backBoot: () => showScreen("boot"),
    rollCharacter,
    openQuestLog,
    openGuide,
    openBackpack,
    openCgGallery,
    openCodex,
    openSettings,
    closeModal,
    manualSave: saveGame,
    resetGame,
    cycleTime,
    interact,
    nextDialogue,
    closeDialogue,
  };
  actions[action]?.();
});

document.addEventListener("keydown", (event) => {
  ensureMusic();
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    playButtonDing();
    if (!$("#dialogueBox").hidden) nextDialogue();
    else interact();
    return;
  }
  const dirs = {
    ArrowUp: [0, -1],
    w: [0, -1],
    W: [0, -1],
    ArrowDown: [0, 1],
    s: [0, 1],
    S: [0, 1],
    ArrowLeft: [-1, 0],
    a: [-1, 0],
    A: [-1, 0],
    ArrowRight: [1, 0],
    d: [1, 0],
    D: [1, 0],
  };
  if (dirs[event.key]) {
    event.preventDefault();
    tryMove(...dirs[event.key]);
  }
});

// 预加载所有地图和关键图片
function preloadAssets() {
  const toPreload = new Set();
  // 所有区域背景图
  for (const map of DATA.maps) {
    if (map.walkMask) toPreload.add(map.walkMask);
    if (map.areaBackground) toPreload.add(map.areaBackground);
  }
  // 世界地图
  toPreload.add("assets/imagegen/environment/full_maps/xiaokang_town_overworld_imagegen.png");
  // 所有角色立绘和头像
  for (const char of DATA.characters) {
    if (char.portrait) toPreload.add(char.portrait);
    if (char.avatar) toPreload.add(char.avatar);
    if (char.sprite) toPreload.add(char.sprite);
    if (char.expressions) {
      for (const expr of Object.values(char.expressions)) {
        if (expr) toPreload.add(expr);
      }
    }
  }
  // 所有交互物品图标
  for (const item of DATA.items || []) {
    if (item.icon) toPreload.add(item.icon);
  }
  // CG插画
  for (const cg of ALL_CGS) {
    if (cg.path) toPreload.add(cg.path);
  }

  let loaded = 0;
  const total = toPreload.size;
  for (const src of toPreload) {
    if (!src || imageCache.has(src)) continue;
    const img = new Image();
    img.onload = img.onerror = () => {
      loaded++;
      if (loaded % 20 === 0 || loaded === total) {
        const pct = Math.round((loaded / total) * 100);
        const el = $("#assetStatusText");
        if (el) el.textContent = `预加载 ${pct}% (${loaded}/${total})`;
      }
    };
    img.src = src;
    imageCache.set(src, img);
  }
}

// 移动端触摸滑动支持
let touchStartX = 0, touchStartY = 0;
canvas.addEventListener("touchstart", (e) => {
  if (e.touches.length === 1) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }
}, { passive: true });
canvas.addEventListener("touchend", (e) => {
  if (e.changedTouches.length === 1) {
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    const absDx = Math.abs(dx), absDy = Math.abs(dy);
    if (Math.max(absDx, absDy) < 20) {
      // 轻触 = 互动
      ensureMusic();
      interact();
    } else if (absDx > absDy) {
      tryMove(dx > 0 ? 1 : -1, 0);
    } else {
      tryMove(0, dy > 0 ? 1 : -1);
    }
  }
});

function boot() {
  renderBootCast();
  renderCharacterSelect();
  updateHud();
  showScreen("boot");
  requestAnimationFrame(drawMap);
  preloadAssets();
}

boot();
