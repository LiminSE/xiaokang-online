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
const DEFAULT_CANVAS_WIDTH = 896;
const DEFAULT_CANVAS_HEIGHT = 640;
const TOUCH_LANDSCAPE_CANVAS_HEIGHT = 520;
const WORLD_BACKGROUND = "assets/imagegen/environment/full_maps/xiaokang_town_overworld_imagegen.png";
const LEGACY_CONDITION_FEEDBACK_KEYWORD = "没有重连";
const DEFAULT_VOLUME = 100;
const MUSIC_GAIN_SCALE = 300;
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
    highlight_msg: 0,
    oo: 0,
    chat_log: 0,
    yugioh_card: 0,
    yellow_roast: 0,
    spicy_pic: 0,
    next_time: 0,
    happy_water: 0,
    food_pic: 0,
    its_you: 0,
    rank_ticket: 0,
    mhy_verdict: 0,
    xox: 0,
    nijigen: 0,
    oldguard: 0,
    emo_switch: 0,
    ts_gather: 0,
    morning_meow: 0,
    admin_perm: 0,
    csn: 0,
    monkey: 0,
    group_fire: 0,
    cache_clean: 0,
    core_key: 0,
    quote_msg: 0,
    its_your_copy: 0,
  },
  pickedInteractions: new Set(),
  bonds: {},
  settings: {
    textSpeed: 1,
    volume: DEFAULT_VOLUME,
    showGrid: false,
    pixelatedMap: true,
  },
  selectedCandidateId: null,
  dialogue: null,
  _pendingCgs: [],
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
let lastCanvasLayoutKey = "";
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

function isImageAssetPath(src) {
  return typeof src === "string" && /^(assets\/|data:image\/|https?:\/\/|\/)/.test(src);
}

function ensureMusic() {
  if (window.__XIAOKANG_SCREENSHOT_MODE || normalizedVolume() <= 0) return;
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
    dry.gain.value = 1.08;
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
    echo.gain.value = 0.16;
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
  musicState.master.gain.setTargetAtTime(normalizedVolume() / MUSIC_GAIN_SCALE, musicState.ctx.currentTime, 0.35);
}

function normalizedVolume() {
  const value = Number(state.settings.volume);
  return Number.isFinite(value) ? clamp(value, 0, 100) : DEFAULT_VOLUME;
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
  setViewportMetrics();
  window.scrollTo?.(0, 0);
  state.screen = name;
  if (document.body?.dataset) document.body.dataset.screen = name;
  if (name !== "game") setDialogueLayoutActive(false);
  if (name === "select") renderCharacterSelect();
  if (name === "game") requestLandscapePlayback();
  $$(".screen").forEach((screen) => screen.classList.remove("is-active"));
  $(`#${name}Screen`)?.classList.add("is-active");
}

function setViewportMetrics() {
  const root = document.documentElement;
  const viewport = window.visualViewport;
  const height = Math.round(viewport?.height || window.innerHeight || root?.clientHeight || 0);
  const width = Math.round(viewport?.width || window.innerWidth || root?.clientWidth || 0);
  if (!root?.style?.setProperty || !height || !width) return;
  root.style.setProperty("--app-height", `${height}px`);
  root.style.setProperty("--app-width", `${width}px`);
  window.requestAnimationFrame?.(resizeCanvasToDisplay);
}

function setupViewportTracking() {
  setViewportMetrics();
  window.addEventListener?.("resize", setViewportMetrics);
  window.visualViewport?.addEventListener?.("resize", setViewportMetrics);
  window.visualViewport?.addEventListener?.("scroll", setViewportMetrics);
  window.addEventListener?.("orientationchange", () => {
    window.setTimeout(setViewportMetrics, 120);
    window.setTimeout(setViewportMetrics, 360);
  });
}

function resizeCanvasToDisplay() {
  if (typeof canvas.getBoundingClientRect !== "function") return;
  const rect = canvas.getBoundingClientRect();
  if (!rect.width || !rect.height) return;
  const isTouchLandscape = prefersTouchLayout() && window.innerWidth > window.innerHeight;
  const defaultAspect = DEFAULT_CANVAS_WIDTH / DEFAULT_CANVAS_HEIGHT;
  const displayAspect = rect.width / rect.height;
  let nextWidth = DEFAULT_CANVAS_WIDTH;
  let nextHeight = DEFAULT_CANVAS_HEIGHT;

  if (isTouchLandscape && displayAspect > defaultAspect) {
    nextHeight = TOUCH_LANDSCAPE_CANVAS_HEIGHT;
    nextWidth = Math.round(nextHeight * displayAspect);
    if (nextWidth > WORLD_WIDTH * TILE) {
      nextWidth = WORLD_WIDTH * TILE;
      nextHeight = Math.max(420, Math.round(nextWidth / displayAspect));
    }
  }

  const layoutKey = `${nextWidth}x${nextHeight}`;
  if (layoutKey === lastCanvasLayoutKey && canvas.width === nextWidth && canvas.height === nextHeight) return;
  canvas.width = nextWidth;
  canvas.height = nextHeight;
  lastCanvasLayoutKey = layoutKey;
  ctx.imageSmoothingEnabled = !state.settings.pixelatedMap;
}

function prefersTouchLayout() {
  return Boolean(window.matchMedia?.("(hover: none) and (pointer: coarse)").matches);
}

function setDialogueLayoutActive(active) {
  document.body?.classList?.toggle("is-dialogue-open", Boolean(active));
}

function requestLandscapePlayback() {
  if (!prefersTouchLayout()) return;
  const orientation = window.screen?.orientation;
  if (!orientation?.lock) return;
  orientation.lock("landscape").catch(() => {});
}

function showItemPopup(itemId) {
  const item = itemDetails(itemId);
  if (!item) return;
  const popup = $("#itemPopup");
  if (!popup) return;
  $("#itemPopupIcon").textContent = item.icon || '🎒';
  $("#itemPopupName").textContent = item.name;
  $("#itemPopupDesc").textContent = itemShortDescription(itemId);
  popup.hidden = false;
  // Play pickup fanfare
  playPickupFanfare();
  // Auto-hide after 4 seconds
  window.clearTimeout(showItemPopup._timer);
  showItemPopup._timer = window.setTimeout(function() {
    popup.hidden = true;
  }, 5000);
}

// 3-second exciting pickup BGM
function playPickupFanfare() {
  var audioCtx = musicState.ctx;
  if (!audioCtx || state.settings.volume <= 0) return;
  ensureMusic();
  // Randomly pick one of 3 fanfare variations
  var variants = [fanfareCmaj, fanfareFmaj, fanfareAm];
  var pick = variants[Math.floor(Math.random() * variants.length)];
  pick(audioCtx, state.settings.volume / 100);
}

// ── Shared synth helpers ──
function _brass(audioCtx, freq, time, dur, vel, vol) {
  var g = audioCtx.createGain();
  var o1 = audioCtx.createOscillator();
  var o2 = audioCtx.createOscillator();
  var o3 = audioCtx.createOscillator();
  var f = audioCtx.createBiquadFilter();
  o1.type = 'sawtooth'; o2.type = 'triangle'; o3.type = 'square';
  o1.frequency.setValueAtTime(freq, time);
  o2.frequency.setValueAtTime(freq * 1.003, time);
  o3.frequency.setValueAtTime(freq * 0.5, time);
  f.type = 'lowpass';
  f.frequency.setValueAtTime(300, time);
  f.frequency.exponentialRampToValueAtTime(1500 + vel * 4000, time + 0.1);
  f.frequency.exponentialRampToValueAtTime(180, time + dur);
  g.gain.setValueAtTime(0.0001, time);
  g.gain.exponentialRampToValueAtTime(vel * vol * 0.3, time + 0.07);
  g.gain.exponentialRampToValueAtTime(0.0001, time + dur);
  o1.connect(f); o2.connect(f); o3.connect(f); f.connect(g);
  g.connect(musicState.dry);
  o1.start(time); o2.start(time); o3.start(time);
  o1.stop(time + dur + 0.05); o2.stop(time + dur + 0.05); o3.stop(time + dur + 0.05);
}
function _sparkle(audioCtx, freq, time, dur, vel, vol) {
  var g = audioCtx.createGain();
  var o = audioCtx.createOscillator();
  o.type = 'sine';
  o.frequency.setValueAtTime(freq, time);
  g.gain.setValueAtTime(0.0001, time);
  g.gain.exponentialRampToValueAtTime(vel * vol * 0.12, time + 0.03);
  g.gain.exponentialRampToValueAtTime(0.0001, time + dur);
  o.connect(g); g.connect(musicState.dry);
  o.start(time); o.stop(time + dur);
}
function _timpani(audioCtx, freq, time, vel, vol) {
  var g = audioCtx.createGain();
  var o = audioCtx.createOscillator();
  o.type = 'sine';
  o.frequency.setValueAtTime(freq * 1.5, time);
  o.frequency.exponentialRampToValueAtTime(freq, time + 0.12);
  g.gain.setValueAtTime(vel * vol * 0.35, time);
  g.gain.exponentialRampToValueAtTime(0.0001, time + 0.6);
  o.connect(g); g.connect(musicState.dry);
  o.start(time); o.stop(time + 0.7);
}

// ── Variant 1: Cmaj triumphant ──
function fanfareCmaj(audioCtx, vol) {
  var t = audioCtx.currentTime;
  _timpani(audioCtx, 65.41, t, 0.85, vol);
  _timpani(audioCtx, 55.00, t + 0.5, 0.6, vol);
  [130.81,164.81,196.00,261.63,329.63,392.00,523.25,659.25,783.99,1046.5,1318.5].forEach(function(f,i){
    _brass(audioCtx, f, t + 0.5 + i*0.28, 1.8, 0.65 + i*0.03, vol);
  });
  [523.25,659.25,783.99,1046.5,1318.5,1568.0,2093.0].forEach(function(f,i){
    _sparkle(audioCtx, f, t + 0.8 + i*0.4, 1.1, 0.5 + i*0.05, vol);
  });
  [261.63,329.63,392.00,523.25,659.25,783.99,1046.5].forEach(function(f){
    _brass(audioCtx, f, t + 3.3, 2.0, 0.9, vol);
  });
}

// ── Variant 2: Fmaj warm heroic ──
function fanfareFmaj(audioCtx, vol) {
  var t = audioCtx.currentTime;
  _timpani(audioCtx, 87.31, t, 0.85, vol);
  _timpani(audioCtx, 73.42, t + 0.5, 0.6, vol);
  [174.61,220.00,261.63,349.23,440.00,523.25,698.46,880.00,1046.5,1318.5,1396.9].forEach(function(f,i){
    _brass(audioCtx, f, t + 0.5 + i*0.28, 1.8, 0.65 + i*0.03, vol);
  });
  [698.46,880.00,1046.5,1318.5,1396.9,1760.0].forEach(function(f,i){
    _sparkle(audioCtx, f, t + 0.8 + i*0.4, 1.1, 0.5 + i*0.05, vol);
  });
  [349.23,440.00,523.25,698.46,880.00,1046.5,1396.9].forEach(function(f){
    _brass(audioCtx, f, t + 3.3, 2.0, 0.9, vol);
  });
}

// ── Variant 3: Am mysterious epic ──
function fanfareAm(audioCtx, vol) {
  var t = audioCtx.currentTime;
  _timpani(audioCtx, 55.00, t, 0.85, vol);
  _timpani(audioCtx, 73.42, t + 0.5, 0.6, vol);
  [220.00,261.63,329.63,440.00,523.25,659.25,880.00,1046.5,1318.5,1568.0,1760.0].forEach(function(f,i){
    _brass(audioCtx, f, t + 0.5 + i*0.28, 1.8, 0.65 + i*0.03, vol);
  });
  [659.25,880.00,1046.5,1318.5,1568.0,1760.0,2093.0].forEach(function(f,i){
    _sparkle(audioCtx, f, t + 0.8 + i*0.4, 1.1, 0.5 + i*0.05, vol);
  });
  [440.00,523.25,659.25,880.00,1046.5,1318.5,1760.0].forEach(function(f){
    _brass(audioCtx, f, t + 3.3, 2.0, 0.9, vol);
  });
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
    state.settings.volume = normalizedVolume();
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
  const touchMode = prefersTouchLayout();
  state.nearby = nearNpc || nearPoint || nearExit || null;
  const hint = $("#nearbyHint");
  if (!state.nearby) {
    hint.textContent = state.path.length ? "自动赶路中，感觉很有主角感" : touchMode ? "点地面移动，点居民或物件自动靠近" : "点击地面移动，靠近居民或物件";
  } else if (state.nearby.type === "npc") {
    hint.textContent = `${touchMode ? "点一下" : "按确认键"}与 ${state.nearby.char.displayName} 对话`;
  } else if (state.nearby.type === "interact") {
    hint.textContent = `${touchMode ? "点一下" : "按确认键"}捡起 ${itemIcon(state.nearby.item)} ${state.nearby.label}`;
  } else {
    hint.textContent = canEnterTransition(state.nearby)
      ? `${touchMode ? "点一下" : "按确认键"}前往 ${areaName(state.nearby.to)}`
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
  var item = itemDetails(id);
  // Toast shows 简介 (description), not 小文案 (flavor)
  return item?.description || item?.flavor || '它闪了一下，像在等你发弹幕';
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
  playTalkSound();
  ensureMusic();
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
  quote_msg: "擅长补最后一拍，让对话完整收束。",
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
  return String(text).trim();
}

function renderMarkdown(text) {
  // Simple markdown → HTML for archive display
  var html = String(text || '');
  // Escape HTML first
  html = html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  // Headers
  html = html.replace(/^### (.+)$/gm, '<h4>$1</h4>');
  html = html.replace(/^## (.+)$/gm, '<h3>$1</h3>');
  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  // Italic
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  // Newlines to paragraphs
  html = html.replace(/\n\n+/g, '</p><p>');
  html = html.replace(/\n/g, '<br>');
  html = '<p>' + html + '</p>';
  // Clean empty paragraphs
  html = html.replace(/<p><\/p>/g, '');
  html = html.replace(/<p><br><\/p>/g, '');
  return html;
}

function triggerInteraction(point) {
  if (state.pickedInteractions.has(point.id)) {
    toast("这个道具已经收进背包了");
    updateNearby();
    return;
  }
  playInteractSound();
  const item = point.item || itemForEvent(point.event);
  state.inventory[item] = (state.inventory[item] || 0) + 1;
  state.pickedInteractions.add(point.id);
  if (point.memory) state.memories.add(point.memory);
  progressInteractQuests(point.id);
  progressEventQuests(point.event);
  progressCollectQuests(item);
  playItemGetSound();
  showItemPopup(item);
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
  if (eventId.includes("poem") || eventId.includes("moon")) return "chat_log";
  if (eventId.includes("card") || eventId.includes("deck")) return "yugioh_card";
  if (eventId.includes("dinner") || eventId.includes("sugar")) return "yellow_roast";
  if (eventId.includes("palette") || eventId.includes("portrait")) return "spicy_pic";
  if (eventId.includes("cache") || eventId.includes("constant")) return "oo";
  if (eventId.includes("monkey") || eventId.includes("mushroom")) return "monkey";
  if (eventId.includes("copy") || eventId.includes("its_your")) return "its_your_copy";
  return "highlight_msg";
}

function openAreaDialogue(point) {
  playInteractSound();
  const area = indexes.areas.get(point.areaId || state.areaId) || currentArea();
  const npcs = npcsForArea(point.areaId || state.areaId);
  const itemId = point.item || itemForEvent(point.event);
  const itemNameText = itemName(itemId);
  // Player reaction
  const playerReaction = getPlayerItemReaction(state.playerId, itemId, itemNameText);
  // Build lines: narrator → player → all NPCs in area react
  var lines = [
    { speaker: "narrator", text: '你调查了' + area.name + '的' + point.label + '。它轻轻一响。' },
    { speaker: "player", text: playerReaction },
  ];
  // Add reaction from each NPC in the area (up to 4)
  var addedSpeakers = {};
  for (var i = 0; i < npcs.length && lines.length < 6; i++) {
    var npcChar = npcs[i].char;
    if (!npcChar || addedSpeakers[npcChar.id]) continue;
    var reaction = getItemReaction(npcChar.id, itemId, itemNameText);
    lines.push({ speaker: npcChar.id, text: reaction });
    addedSpeakers[npcChar.id] = true;
  }
  const mainChar = npcs[0]?.char || indexes.characters.get(state.playerId);
  state.dialogue = {
    speaker: mainChar.id,
    lines: normalizeLines(lines.map(function(line) { return Object.assign({}, line, { speaker: line.speaker === 'guide' ? mainChar.id : line.speaker }); }), mainChar.id),
    index: 0,
  };
  renderDialogue();
}

// Character × Item reaction table (unique per character per item)
var ITEM_REACTIONS = {
  role_001: {
    highlight_msg: '精华消息？我先翻翻聊天记录看是谁发的。',
    oo: '哦哦。这招我打牌冷场的时候也用过。',
    chat_log: '聊天记录是好东西。我四万条消息全靠它存档。',
    yugioh_card: 'yo-gi-oh!——主轴十二张废件三张，这就是命运。',
    yellow_roast: '黄哥烤五花。比我上一顿吃的强太多了。',
    spicy_pic: '色图。gkd，让我鉴赏一下构图光影人体结构。',
    next_time: '下次一定。你这券跟我打牌说的"再来一局就收手"一样的。',
    happy_water: '快乐水。我要OD可口可乐了。',
    food_pic: '美食图片。别发了，我刚吃完饭就看到这个。',
    its_you: 'zjsn,wcsn——这是你。群聊物权法：发了就是你的。',
    rank_ticket: '上分券。但我打牌不用券，我靠羁绊。',
    mhy_verdict: '针对米哈游玩家的历史决议——可以玩但不能说。🤣',
    xox: 'XOX。藤田琴音的闹铃我设成起床铃了。不是推，是欣赏。',
    nijigen: '二向箔。再见我要去二次元了——然后发现牌桌也在二次元。',
    oldguard: '老资历。寒武纪就在了——但我游戏王比你早入坑。',
    emo_switch: 'emo开关。打开就是网易云时间。',
    ts_gather: 'TS集合。我开麦了但我不说话，我就听。',
    morning_meow: '早上了喵。我凌晨四点也在，算早吗。',
    admin_perm: '管理员权限。撤回消息。但我从不撤回——发了就是发了。',
    csn: 'csn。草，一种植物。纳西妲的E。',
    monkey: '猴。好孩子不贴🐒。但可以发。',
    group_fire: '群聊之火🔥。我四万条消息贡献了不少燃料。',
    cache_clean: '缓存。QQ空间占用-275G——我的表情包占了250。',
    core_key: '核心密钥。拿到就能通关了？那我打牌输的那些局怎么算。',
    quote_msg: '引用消息。适合送给会接话的人——比如力竭了。',
    its_your_copy: '这是你的文案。只要你发了就是你，我不管的。群聊物权法第一条。',
  },
  role_002: {
    highlight_msg: '精华消息？让我看看是不是之前那条"有没有黄"。',
    oo: '哦哦。冷场妙妙工具，我也想要一个。',
    chat_log: '聊天记录。等我翻一下——上次说的那个车队ip还在不在。',
    yugioh_card: '游戏王的卡？我看不懂规则但烙印的阿不思异画是真的好看。',
    yellow_roast: '有没有黄！有没有黄！！我就说了肯定有。',
    spicy_pic: 'gkd。但别在公共场合发，我在外面。',
    next_time: '下次一定——沟槽的我上次说好联机结果自己先睡了。',
    happy_water: '我要OD可口可乐了😭。别诱惑我。',
    food_pic: '美食图片。xmn。现在是晚上十点我还没吃饭。',
    its_you: '这是你。发图的人不说话，但大家都醒了。',
    rank_ticket: '上分券。发我ts的ip，今晚风暴点。',
    mhy_verdict: 'wc，o。你是来找可莉玩的吗。',
    xox: 'XOX——藤田琴音！！！我同桌说有点恶心但我不管🥰🥰。',
    nijigen: '二次元入口。我先进去了，avemujica还在等我。',
    oldguard: '老资历？我进群第一句话是"有没有黄"。算不算入群宣言。',
    emo_switch: 'emo开关。打开就是听mygo和avemujica的时间。',
    ts_gather: 'TS集合。发个ip我马上来。',
    morning_meow: '早上了喵。虽然已经下午了但我刚醒。',
    admin_perm: '管理员权限。撤回消息。tmd我上次发的车贴被撤了我记到现在。',
    csn: 'csn。草。这是纳西妲的E，我知道这个。',
    monkey: '猴。好孩子不贴猴。但我不是好孩子。',
    group_fire: '群聊之火🔥。我的车队每次都🔥。虽然车队经常鸽。',
    cache_clean: '缓存。我的TS录音占了200G。',
    core_key: '核心密钥。通关了。但排位还在等着我。',
    quote_msg: '引用消息。接话续命——湖边的回声也是这个原理。',
    its_your_copy: '这是你的文案。这图是你发的，我截图了。证据确凿。',
  },
  role_003: {
    highlight_msg: '精华消息。如何评价这条被群聊精选中的人生片段。',
    oo: '哦哦。冷场救星。我工坊的打印机偶尔也这样——突然吐一张图救场。',
    chat_log: '聊天记录。有没有懂的，聊天记录是人类学最好的田野调查材料。',
    yugioh_card: '游戏王卡。卡图故事比打牌本身好看多了——烙印白之物语我看了三遍。',
    yellow_roast: '黄哥烤五花！晚上发这个是犯罪。但我支持。',
    spicy_pic: '色图。gkd。好的色图就是好的艺术——构图光影人体结构。',
    next_time: '下次一定。不是拖延，是打印机的出图时间排到了下一幕。',
    happy_water: '快乐水。甜度刚好。但我支持三分糖派——Mini Oreo说得对。',
    food_pic: '美食图片。[图片]。工坊的打印机也能打这个，但颜色偏暖。',
    its_you: '这是你。以前发色图都是一手推上下下来筛选完发。现在是直接转。',
    rank_ticket: '上分券。我不打排位，但我可以给你们画战报。',
    mhy_verdict: 'wc，o。如何评价原神——它是不是游戏史上最帅的游戏。',
    xox: 'XOX。我工坊可以打印小偶像的周边立绘。有偿，但可以用色图换。',
    nijigen: '二向箔。二次元入口。我工坊的打印机就是第一站。',
    oldguard: '老资历。寒武纪。我在寒武纪就在发图了。',
    emo_switch: 'emo开关。听听网易云。顺便翻翻图鉴里的老图。',
    ts_gather: 'TS集合。我又连不上了。每次都这样。',
    morning_meow: '早上了喵。到点了，去工坊开机。',
    admin_perm: '管理员权限。撤回消息。但好的色图应该被保留——撤回是反艺术。',
    csn: 'csn。草。纳西妲的E——虽然我没玩原神但我知道这个梗。',
    monkey: '猴。好孩子不贴。但工坊可以给你打印一个猴的立绘。',
    group_fire: '群聊之火🔥。我发的每一张图都是燃料。',
    cache_clean: '缓存。QQ空间-275G——我的图鉴和参考图占了250。',
    core_key: '核心密钥。干得好喵。终于通关了。',
    quote_msg: '引用消息。接话的艺术——和好色图一样讲究时机。',
    its_your_copy: '这是你的文案。这图是你发的。但如果是好图，我会帮你转发的。',
  },
  role_004: {
    highlight_msg: '精华消息。我醒了，看看是什么精彩内容被标记了。',
    oo: '哦哦。我通宵打排位的时候也经常冷场——然后一个人继续打。',
    chat_log: '聊天记录。TS的聊天记录比群聊的还长。',
    yugioh_card: '游戏王卡。我没玩过但我知道我的角色卡面应该是风暴点击杀王。',
    yellow_roast: '黄哥烤五花。是因为我只吃一顿饭导致的吗——饿了。',
    spicy_pic: '一个健壮的大腿或者一个大腚出现在屏幕里。好。',
    next_time: '下次一定。我还在外面——但其实我在Livehouse打排位。',
    happy_water: '快乐水。我要OD了。但先打完这局排位。',
    food_pic: '美食图片。别发了，我刚打完排位还没吃饭。',
    its_you: '这是你。凌晨三点发图是Livehouse的传统。',
    rank_ticket: '上分券。一个人就是车队。今天的排位图是风暴点。',
    mhy_verdict: '针对米哈游玩家的历史决议——但钟离假死那一段确实帅。',
    xox: 'XOX。小偶像。我Livehouse的舞台灯光可以调成应援色。',
    nijigen: '二向箔。再见我要去二次元了。但Livehouse的舞台灯先帮我关一下。',
    oldguard: '老资历。寒武纪。我寒武纪就在Livehouse打排位了。',
    emo_switch: 'emo开关。网易云时间。我的排位BGM是mygo专辑。',
    ts_gather: 'TS集合。wo zai ts li。发ip我马上到。',
    morning_meow: '早上了喵。我还没睡。早上了吗。',
    admin_perm: '管理员权限。撤回消息。但我说过的话从来不撤——一个人就是车队。',
    csn: 'csn。草。纳西妲的E——虽然我没玩但我知道草神。',
    monkey: '猴。好孩子不贴。我贴大腿不贴猴。',
    group_fire: '群聊之火🔥。我的排位连胜就是🔥。',
    cache_clean: '缓存。我的游戏录像占满了。该清了。',
    core_key: '核心密钥。通关了。但排位没有通关这回事。',
    quote_msg: '引用消息。接话续命。风暴点最后一圈的时候最需要这个。',
    its_your_copy: '这是你的文案。凌晨三点发的图，早上八点还在。经典。',
  },
  role_005: {
    highlight_msg: '精华消息。唉我草，让我看看是不是甜蜜女友那张截图。',
    oo: '哦哦。冷场的时候用。我galgame推完一条线之后也会冷场。',
    chat_log: '聊天记录。个人感觉群聊记录比轻小说好看。',
    yugioh_card: '游戏王卡。我没玩过但我看过武藤游戏的颜艺合集。',
    yellow_roast: '黄哥烤五花！外面吃的都在排队，我先看看照片解馋。',
    spicy_pic: '色图。r18是检验galgame的唯一标准——不是。是剧情。',
    next_time: '下次一定。我还在外面——甜蜜女友的档还没存。',
    happy_water: '快乐水。我要OD了。但甜蜜女友的甜度已经够了。',
    food_pic: '美食图片。甜蜜女友那个动态立绘有点猪鼻但食物是真的香。',
    its_you: '这是你。你不玩r18就好比青山照不吃——算了这个比喻不好。',
    rank_ticket: '上分券。沟槽的排位。我手残，适合单机。',
    mhy_verdict: 'wc，o。我在一教自习听到了原神的启动声音。差点报警。',
    xox: 'XOX。兄弟你放心打学院偶像大师。金毛妹妹我帮你骂走了👍🏻。',
    nijigen: '二向箔。再见我要去二次元了。ef第二季我来了。',
    oldguard: '老资历。寒武纪我就在了——在玩ef第一季。',
    emo_switch: 'emo开关。听听网易云。ef的OST我听了十年。',
    ts_gather: 'TS集合。我不联机但你们玩得开心。',
    morning_meow: '早上了喵。存档了吗。没存快去存。',
    admin_perm: '管理员权限。撤回消息。但我说的"唉我草"不能被撤回。',
    csn: 'csn。草。一种植物。这个梗我可以。',
    monkey: '猴。好孩子不贴。我是好孩子。',
    group_fire: '群聊之火🔥。我的galgame推荐也是🔥。',
    cache_clean: '缓存。我的gal存档把空间占满了。',
    core_key: '核心密钥。通关。像终于推完一条完整线路的感觉。',
    quote_msg: '引用消息。接话的艺术。适合送给会接话的人——比如力竭了。',
    its_your_copy: '这是你的文案。图发了就是你的。但如果是甜蜜女友的图我可以保存吗。',
  },
  role_006: {
    highlight_msg: '精华消息。还真是。让我看看是哪条被精选了。',
    oo: '哦哦。冷场工具。我上班的时候经常冷场。',
    chat_log: '聊天记录。我在x上关注的全是画师和声优——聊天记录比番剧好看。',
    yugioh_card: '游戏王卡。这张卡的环境定位很特殊。天杯环境里被低估了。',
    yellow_roast: '黄哥烤五花。下班以后看到这个是最幸福的。',
    spicy_pic: '色图。gkd。画师关注列表+1。',
    next_time: '下次一定。不是拖延，是上班太累了。下班一定。',
    happy_water: '快乐水。我要OD了。但明天还要上班。还是喝半糖吧。',
    food_pic: '美食图片。xmn。我上班两年半了看到美食图片还是会心动。',
    its_you: '这是你。确实。这图是你发的。我截图留证了。',
    rank_ticket: '上分券。沟槽的排位。我下班只想打牌不想打排位。',
    mhy_verdict: '针对米哈游玩家的历史决议。推荐崩铁没绷住。🤣',
    xox: 'XOX。又幻想了，幻想我会培育憧憬偶像总是平地摔的普通女孩……',
    nijigen: '二向箔。二次元入口。我在x上关注的画师全是二次元的。',
    oldguard: '老资历。寒武纪。我的偶像大师存档从寒武纪就在了。',
    emo_switch: 'emo开关。上班的时候是emo模式，下班打牌是正常模式。',
    ts_gather: 'TS集合。我不联机但你们打得开心。我就看看战报。',
    morning_meow: '早上了喵。早。虽然我还没睡醒。',
    admin_perm: '管理员权限。撤回消息。但我说的"确实"不能被撤回。',
    csn: 'csn。草。纳西妲的E——虽然我没玩但我知道。',
    monkey: '猴。好孩子不贴猴。我是好孩子，但我的偶像大师存档不是。',
    group_fire: '群聊之火🔥。我的imas安利也是🔥。',
    cache_clean: '缓存。我的游戏截图和imas存档把空间吃满了。',
    core_key: '核心密钥。通关了。但这只是开始——还有新番要追新卡要抽。',
    quote_msg: '引用消息。接话。我在群里的功能就是这个。',
    its_your_copy: '这是你的文案。图是你发的。但我不会保存——我的硬盘已经满了。',
  },
  role_007: {
    highlight_msg: '精华消息。这条的频率和别人不一样。',
    oo: '两个字。冷场的时候两个字就够了。收到了。',
    chat_log: '每条消息之间都有沉默的间隔。我在测量。',
    yugioh_card: '每张卡是一组频率。怪兽高频，陷阱低频。',
    yellow_roast: '香味也有频率。不是用鼻子——是用接收器。',
    spicy_pic: '这张的主色频率偏暖。G5调。',
    next_time: '两个下次之间有三秒的沉默。我听到了。',
    happy_water: '喝完可乐的饱嗝有特定频率。D4。',
    food_pic: '食物的颜色频率最丰富。这张是C大调。',
    its_you: '三个字确认所有权——这是你的。',
    rank_ticket: '上分路上有声音——每赢一局升一个音调。',
    mhy_verdict: '历史决议也是一段频率。严肃的D大调。',
    xox: '小偶像的声音频率最高——粉丝的欢呼在推着。',
    nijigen: '三次元到二次元的频率转换——我能校准。',
    oldguard: '老资历的发言频率最稳定——每天都有。',
    emo_switch: '拨一下频率就变了。C大调到a小调。',
    ts_gather: '语音频率比文字丰富——我能听到背景的键盘声。',
    morning_meow: '早。今天的第一个频率信号。收到了。',
    admin_perm: '撤回是突然的静音。频率归零。',
    csn: '草。植物也有频率——纳西妲的E最准。',
    monkey: '猴这个字的频率很奇特——先升后降。',
    group_fire: '🔥的燃烧有持续的次声波。我在接收。',
    cache_clean: '清理缓存时能听到被删数据的短暂回响。',
    core_key: '所有频率最后汇聚成一个和弦。通关了。',
    quote_msg: '引用就是在旧频率上加新频率。V²。',
    its_your_copy: '三个字——这是你的。确认完毕。',
  },
  role_008: {
    highlight_msg: '笑死了。这条精华我转译过——原文是一段笑声。',
    oo: '冷场的回声波形很平——几乎是一条直线。笑死。',
    chat_log: '有没有懂的。每条聊天记录都有隐藏的笑点等我去翻译。',
    yugioh_card: '牌桌上的压抑了和确实我全录音了。正在做频谱分析。',
    yellow_roast: '闻到香味发出的哼声最难翻译——介于满足和期待之间。',
    spicy_pic: '有没有懂的。色图评论区笑声最多。实测数据。',
    next_time: '下次这个词的回声衰减时间是0.3秒——比现在短。',
    happy_water: '谁喝完打嗝了我能听出来是谁。笑死了。',
    food_pic: '看到美食图片时群里的反应声统一是xmn。我录了。',
    its_you: 'zjsn这句甩锅咒语的回声最响。我测过。',
    rank_ticket: '排位输了的叹气声比赢了的欢呼长2.7倍。实测。',
    mhy_verdict: '这个决议宣布时群里的笑声最大。录下来了。',
    xox: '小偶像的应援声——整齐、有节奏。波形很漂亮。',
    nijigen: '去二次元前的告别声——通常带着哭腔。我录过。',
    oldguard: '老资历的叹息声比新人长——但频率更低沉。有磁性。',
    emo_switch: '打开后群发言速度下降百分之四十。我有数据。',
    ts_gather: 'TS里的笑声比文字多3.7倍。声波不骗人。',
    morning_meow: '早上的第一声早是所有回声里最稳定的。',
    admin_perm: '撤回在波形图上看就是一道悬崖。突然的沉默。',
    csn: '草的声音介于哈哈和呵呵之间——第七频段。',
    monkey: '贴猴时会发出一声短促的笑。0.2秒。我测过。',
    group_fire: '🔥的火苗声我不需要录音——每天都听到。',
    cache_clean: '清理缓存在声学上等于空房间——没有回声。',
    core_key: '所有声音收束成一个好。0.5秒长。通关。',
    quote_msg: '引用声叠加原声——我最喜欢的声学现象。',
    its_your_copy: '发图的人不说话——但沉默本身也是一种声波。我测了。',
  },
  role_009: {
    highlight_msg: '精华消息！看看是不是我推的切片被精选了。',
    oo: '冷场的时候我也说这个——然后切下一个话题。',
    chat_log: '我每天翻聊天记录——看看有没有人提我推的名字。',
    yugioh_card: '看不懂但有些卡面画得比管人皮套还精致。',
    yellow_roast: '忍不住了。我晚饭还没吃你给我看这个。',
    spicy_pic: 'gkd。但别在我推的歌回期间发。',
    next_time: '我在外面QAQ。下次一定帮你留晚饭。',
    happy_water: '我要OD可口可乐了。今天同接太低需要安慰。',
    food_pic: 'xmn。但管人直播间的食物应援比这个豪华。',
    its_you: '这是你的图——但如果是推的图我第一个保存。',
    rank_ticket: '我不打排位但给你们应援。加油。',
    mhy_verdict: '你是来找可莉玩的吗。不是请离开。',
    xox: '小偶像！你要推谁我可以安利。我有二十个推。',
    nijigen: '去二次元？带我一起。我的推在那里等我。',
    oldguard: '老资历梗出处是imas。寒武纪就在了。',
    emo_switch: 'emo时去看推的歌回切片。药到病除。',
    ts_gather: '我不开麦但我可以听。像看直播不开弹幕一样。',
    morning_meow: '早。早饭吃了没。我帮你留了一份。',
    admin_perm: '撤回可以。但请别撤回我推的安利消息。',
    csn: '草。纳西妲的E——虽然没玩但我知道。',
    monkey: '好孩子不贴猴。我是管人观众不是管人痴。',
    group_fire: '🔥。我的安利如果火了就是我推的成功。',
    cache_clean: '我的手机缓存全是推的截图和歌回录播。',
    core_key: '通关了。同接w+才是真通关。',
    quote_msg: '接话续命。推的语录我都引用保存了。',
    its_your_copy: '图是你发的。但推的图我会转发三十遍。',
  },
  role_010: {
    highlight_msg: '精华消息。这张的光影可以放进暗房当参考。',
    oo: '暗房里也有这种突然的安静——显影的时候。',
    chat_log: '我的照片日记是另一种形式的聊天记录。',
    yugioh_card: '卡面的印刷工艺——CMYK还是专色。想研究。',
    yellow_roast: '这张照片的暖色饱和度刚好——可以作为色温参考。',
    spicy_pic: '构图在三分线上——黄金比例。这张水平不错。',
    next_time: '显影也需要时间。好的照片值得等。',
    happy_water: '杯壁的冷凝水珠——可以拍微距。',
    food_pic: '俯拍45度最适合食物——职业经验。',
    its_you: '这张图的作者是谁——我要标记出处。',
    rank_ticket: '我不打排位但可以给你们拍获胜瞬间的照片。',
    mhy_verdict: '原神的画面——不是最好的但光影设计有想法。',
    xox: 'Livehouse的照片最难洗——舞台灯的颜色在暗房会变。',
    nijigen: '从二次元打印的照片——颜色比屏幕多一层灰度。',
    oldguard: '老资历的照片胶片感最重——曝光时间最长。',
    emo_switch: 'emo时洗出来的照片偏蓝——色温在骗人。',
    ts_gather: '语音时你们的声音——我可以做成声波照片。',
    morning_meow: '清晨的光最好——色温4500K。适合拍照。',
    admin_perm: '被撤回前我截了图——职业习惯。',
    csn: '草。植物最好拍——怎么拍都不会丑。',
    monkey: '贴猴时抓拍——那个瞬间的表情比猴本身有趣。',
    group_fire: '🔥最难拍——火苗形状每一帧都在变。',
    cache_clean: '硬盘全是RAW。该清了但舍不得。',
    core_key: '通关——该拍一张通关纪念照了。',
    quote_msg: '引用像给原照片加滤镜——不是改是强调。',
    its_your_copy: '版权归你——但我想拿来当显影参考。',
  },
  role_011: {
    highlight_msg: '压抑了。但不是负面——能被精选说明规则认可了它。',
    oo: '冷场是群聊的呼吸间隔——规则学发现。',
    chat_log: '规则漏洞往往藏在被忽略的消息里。我在找。',
    yugioh_card: '这张卡的规则有一个不明确的点——反转召唤时机。',
    yellow_roast: '晚饭——规则规定晚上六到八点是吃饭时间。我在验证。',
    spicy_pic: '群规没有明确禁止色图——只有不成文的规定。这是漏洞。',
    next_time: '下次在规则学上属于无限延期条款。压抑了。',
    happy_water: '糖度规则——全糖半糖之争的核心争议物。',
    food_pic: '图片算不算消息？规则没有明确。需要判例。',
    its_you: 'zjsn——这条甩锅规则是目前群内最完善的不成文法。我研究过。',
    rank_ticket: '排位规则比群规严格多——但群规漏洞更多更有趣。',
    mhy_verdict: '历史决议——明确的禁令。有约束力。已收录进规则书。',
    xox: '群规里没有关于应援的条款——这是法律空白。',
    nijigen: '进入二次元——规则问题：进去后能回来吗。需要测试。',
    oldguard: '老资历在规则上享有不成文的优先发言权。我观察到的。',
    emo_switch: 'emo模式规则——深夜发言免责。这是我发现的保护条款。',
    ts_gather: 'TS规则和群聊不一样——语音不受文字规则约束。',
    morning_meow: '规则：每天第一条早的时间记录。我在统计。',
    admin_perm: '撤回是最高规则——但撤回对象可以被记住。',
    csn: '草。植物在规则上——不属于禁词但可以自由使用。',
    monkey: '好孩子不贴猴——这是道德规则不是法律规则。',
    group_fire: '🔥规则：连续三天聊天自动获得。成就系统。',
    cache_clean: '缓存清理规则——三个月以上日常可删。羁绊永久保留。',
    core_key: '规则最终章——所有未完成判定全部撤销。通关。',
    quote_msg: '引用规则——引用不做任何修改。忠诚义务。',
    its_your_copy: '群聊物权法第一条——我写的注释。发图即拥有。',
  },
  role_012: {
    highlight_msg: '早上了喵～这条精华消息会写进今天的晨报。',
    oo: '冷场时最适合来一份晨报——正好填补沉默。',
    chat_log: '翻聊天记录是晨报编辑的日常工作。',
    yugioh_card: '晨报体育版——龙牌馆赛事速递。',
    yellow_roast: '早饭看到这个——我决定把晨报美食版扩版。',
    spicy_pic: '不要对小偶像瑟瑟。晨报社论第一条。',
    next_time: '晨报截稿日期也是下次一定。但我会准时发。',
    happy_water: '今天的晨报推荐饮品——快乐水。',
    food_pic: '可作为晨报美食栏目配图。已保存。',
    its_you: '晨报读者来稿栏目——你的照片上报了。',
    rank_ticket: '排位赛报——体育版头条预备。',
    mhy_verdict: '晨报社评：尊重但不参与原神。',
    xox: 'XOX——不要对小偶像瑟瑟。晨报娱乐版唯一规则。',
    nijigen: '去二次元前——接受一下晨报采访可以吗。',
    oldguard: '晨报头版人物——专访预约中。',
    emo_switch: '晨报新增深夜emo专栏——专门回应打开这个开关的人。',
    ts_gather: '晨报读者互动板块——今晚TS频道见。',
    morning_meow: '早上了喵～今天晨报已送达。🔥5条重要消息。',
    admin_perm: '晨报不接受审查——但接受撤回请求。',
    csn: '草。今日晨报天气——晴。适合种草。',
    monkey: '好孩子不贴猴。晨报儿童版专栏。',
    group_fire: '🔥。今天的晨报头条——群聊之火获得者。',
    cache_clean: '晨报过期存档——该清理了但每期都舍不得。',
    core_key: '晨报终刊号——不是结束是特别纪念版。通关。',
    quote_msg: '晨报引用栏——每天精选群聊名句。',
    its_your_copy: '晨报有权引用——但会注明出处。记者职业道德。',
  },


  role_013: {
    highlight_msg: '像素世界的highlightmsg。收藏了。',
    oo: '像素世界的oo。收藏了。',
    chat_log: '像素世界的chatlog。收藏了。',
    yugioh_card: '像素世界的yugiohcard。收藏了。',
    yellow_roast: '像素食物——看起来像真的但又不太像。这就是我的日常。',
    spicy_pic: '像素涩涩——分辨率越低脑补空间越大。',
    next_time: '像素世界的nexttime。收藏了。',
    happy_water: '像素世界的happywater。收藏了。',
    food_pic: '像素世界的foodpic。收藏了。',
    its_you: '这是像素化的你——比真实更真实。',
    rank_ticket: '像素世界的rankticket。收藏了。',
    mhy_verdict: '像素世界的mhyverdict。收藏了。',
    xox: '像素小偶像——比真人更接近理想形态。',
    nijigen: '我已经在二次元了——这里就是像素世界。',
    oldguard: '老资历的像素是最早一批——颜色偏冷。有怀旧感。',
    emo_switch: '像素世界的emoswitch。收藏了。',
    ts_gather: '像素世界的tsgather。收藏了。',
    morning_meow: '像素世界的morningmeow。收藏了。',
    admin_perm: '像素世界的adminperm。收藏了。',
    csn: '像素草——每一棵都是绿色方块。很整齐。',
    monkey: '像素猴。好孩子不贴——但可以当宝可梦收集。',
    group_fire: '像素世界的groupfire。收藏了。',
    cache_clean: '像素世界的cacheclean。收藏了。',
    core_key: '像素版通关——屏幕显示THE END两个大字。',
    quote_msg: '像素世界的quotemsg。收藏了。',
    its_your_copy: '像素版权——截图即拥有。不用甩锅。',
  },
  role_014: {
    highlight_msg: '毛鸽认证——这个highlightmsg可以换一份布丁。',
    oo: '毛鸽认证——这个oo可以换一份布丁。',
    chat_log: '毛鸽认证——这个chatlog可以换一份布丁。',
    yugioh_card: '毛鸽认证——这个yugiohcard可以换一份布丁。',
    yellow_roast: '黄哥烤五花！我的招牌菜。快趁热。',
    spicy_pic: 'gkd——但看色图之前先把布丁吃了。',
    next_time: '布丁下次一定做好——这次做得像布丁汤。抱歉。',
    happy_water: '全糖还是半糖？我是说可乐。算了直接喝。',
    food_pic: '发图不发菜名——像话吗。',
    its_you: '毛鸽鉴定——这图是你发的。证据是布丁上有你的指纹。',
    rank_ticket: '排位？我不打。但赢了的回来我请布丁。',
    mhy_verdict: '毛鸽认证——这个mhyverdict可以换一份布丁。',
    xox: '小偶像不需要布丁——她们本身就够甜了。',
    nijigen: '去二次元之前先吃饭——这是毛鸽原则。',
    oldguard: '毛鸽认证——这个oldguard可以换一份布丁。',
    emo_switch: '毛鸽认证——这个emoswitch可以换一份布丁。',
    ts_gather: '毛鸽认证——这个tsgather可以换一份布丁。',
    morning_meow: '毛鸽认证——这个morningmeow可以换一份布丁。',
    admin_perm: '毛鸽认证——这个adminperm可以换一份布丁。',
    csn: '毛鸽认证——这个csn可以换一份布丁。',
    monkey: '毛鸽认证——这个monkey可以换一份布丁。',
    group_fire: '毛鸽认证——这个groupfire可以换一份布丁。',
    cache_clean: '毛鸽认证——这个cacheclean可以换一份布丁。',
    core_key: '通关大吉。庆祝布丁免费供应。',
    quote_msg: '毛鸽认证——这个quotemsg可以换一份布丁。',
    its_your_copy: '图是你发的。附赠一份布丁——毛鸽请的。',
  },
  role_015: {
    highlight_msg: '[/敬礼] highlightmsg。已存档。',
    oo: '[/敬礼] oo。已存档。',
    chat_log: '[/敬礼] chatlog。已存档。',
    yugioh_card: '[/敬礼] yugiohcard。已存档。',
    yellow_roast: '存档之后再吃——免得吃完了忘记吃过。',
    spicy_pic: '[/敬礼] spicypic。已存档。',
    next_time: '[/敬礼] 下次一定存档。但今天不想存。',
    happy_water: '[/敬礼] happywater。已存档。',
    food_pic: '[/敬礼] foodpic。已存档。',
    its_you: '[/敬礼] itsyou。已存档。',
    rank_ticket: '[/敬礼] rankticket。已存档。',
    mhy_verdict: '[/敬礼] mhyverdict。已存档。',
    xox: '[/敬礼] xox。已存档。',
    nijigen: '[/敬礼] nijigen。已存档。',
    oldguard: '[/敬礼] oldguard。已存档。',
    emo_switch: 'emo时需要存档——证明你经历过这一刻。',
    ts_gather: '[/敬礼] tsgather。已存档。',
    morning_meow: '[/敬礼] morningmeow。已存档。',
    admin_perm: '[/敬礼] adminperm。已存档。',
    csn: '[/敬礼] csn。已存档。',
    monkey: '[/敬礼] monkey。已存档。',
    group_fire: '[/敬礼] groupfire。已存档。',
    cache_clean: '[/敬礼] cacheclean。已存档。',
    core_key: '[/敬礼] 通关存档。这是最终存档点。',
    quote_msg: '[/敬礼] quotemsg。已存档。',
    its_your_copy: '[/敬礼] 版权存档完成。是你的。',
  },
  role_016: {
    highlight_msg: '毛鸽。这条highlightmsg——贴公告墙上。',
    oo: '毛鸽。这条oo——贴公告墙上。',
    chat_log: '毛鸽。这条chatlog——贴公告墙上。',
    yugioh_card: '毛鸽。这条yugiohcard——贴公告墙上。',
    yellow_roast: '毛鸽。这条yellowroast——贴公告墙上。',
    spicy_pic: '毛鸽。这条spicypic——贴公告墙上。',
    next_time: '公告墙上最多的就是明天开始——贴了三个月了。',
    happy_water: '毛鸽。这条happywater——贴公告墙上。',
    food_pic: '毛鸽。这条foodpic——贴公告墙上。',
    its_you: '公告：此图所有权已确认。贴在墙上备查。',
    rank_ticket: '毛鸽。这条rankticket——贴公告墙上。',
    mhy_verdict: '毛鸽。这条mhyverdict——贴公告墙上。',
    xox: '毛鸽。这条xox——贴公告墙上。',
    nijigen: '毛鸽。这条nijigen——贴公告墙上。',
    oldguard: '毛鸽。这条oldguard——贴公告墙上。',
    emo_switch: '毛鸽。这条emoswitch——贴公告墙上。',
    ts_gather: '毛鸽。这条tsgather——贴公告墙上。',
    morning_meow: '毛鸽。这条morningmeow——贴公告墙上。',
    admin_perm: '毛鸽。这条adminperm——贴公告墙上。',
    csn: '毛鸽。这条csn——贴公告墙上。',
    monkey: '毛鸽。这条monkey——贴公告墙上。',
    group_fire: '毛鸽。这条groupfire——贴公告墙上。',
    cache_clean: '毛鸽。这条cacheclean——贴公告墙上。',
    core_key: '公告：通关！所有人都来广场。',
    quote_msg: '毛鸽。这条quotemsg——贴公告墙上。',
    its_your_copy: '公告：此物归你——已张贴确认。毛鸽认证。',
  },
  role_017: {
    highlight_msg: '很复杂。这个highlightmsg后续呢。',
    oo: '很复杂。这个oo后续呢。',
    chat_log: '很复杂。这个chatlog后续呢。',
    yugioh_card: '很复杂。这张卡的效果描述我看了三遍还没看懂。',
    yellow_roast: '很复杂。这个yellowroast后续呢。',
    spicy_pic: '很复杂。这个spicypic后续呢。',
    next_time: '很复杂。这个nexttime后续呢。',
    happy_water: '很复杂。这个happywater后续呢。',
    food_pic: '很复杂。这个foodpic后续呢。',
    its_you: '很复杂。这个itsyou后续呢。',
    rank_ticket: '很复杂。这个rankticket后续呢。',
    mhy_verdict: '很复杂。这个mhyverdict后续呢。',
    xox: '很复杂。这个xox后续呢。',
    nijigen: '很复杂。这个nijigen后续呢。',
    oldguard: '很复杂。这个oldguard后续呢。',
    emo_switch: '很复杂。这个emoswitch后续呢。',
    ts_gather: '很复杂。这个tsgather后续呢。',
    morning_meow: '很复杂。这个morningmeow后续呢。',
    admin_perm: '很复杂。这个adminperm后续呢。',
    csn: '很复杂。这个csn后续呢。',
    monkey: '很复杂。这个monkey后续呢。',
    group_fire: '很复杂。这个groupfire后续呢。',
    cache_clean: '很复杂。这个cacheclean后续呢。',
    core_key: '无敌了——通关了。后续呢？后续是你自己写的。',
    quote_msg: '很复杂。这个quotemsg后续呢。',
    its_your_copy: '很复杂。这个itsyourcopy后续呢。',
  },
  role_018: {
    highlight_msg: '三分糖原则——这个highlightmsg已收录进日记。',
    oo: '三分糖原则——这个oo已收录进日记。',
    chat_log: '三分糖原则——这个chatlog已收录进日记。',
    yugioh_card: '三分糖原则——这个yugiohcard已收录进日记。',
    yellow_roast: '全糖太甜半糖太淡——烤五花刚好三分。',
    spicy_pic: '三分糖原则——这个spicypic已收录进日记。',
    next_time: '三分糖原则——这个nexttime已收录进日记。',
    happy_water: '甜度记录——今天可乐全糖。明天改半糖。',
    food_pic: '三分糖原则——这个foodpic已收录进日记。',
    its_you: '三分糖原则——这个itsyou已收录进日记。',
    rank_ticket: '三分糖原则——这个rankticket已收录进日记。',
    mhy_verdict: '三分糖原则——这个mhyverdict已收录进日记。',
    xox: '三分糖原则——这个xox已收录进日记。',
    nijigen: '三分糖原则——这个nijigen已收录进日记。',
    oldguard: '三分糖原则——这个oldguard已收录进日记。',
    emo_switch: '三分糖原则——这个emoswitch已收录进日记。',
    ts_gather: '三分糖原则——这个tsgather已收录进日记。',
    morning_meow: '三分糖原则——这个morningmeow已收录进日记。',
    admin_perm: '三分糖原则——这个adminperm已收录进日记。',
    csn: '三分糖原则——这个csn已收录进日记。',
    monkey: '三分糖原则——这个monkey已收录进日记。',
    group_fire: '三分糖原则——这个groupfire已收录进日记。',
    cache_clean: '三分糖原则——这个cacheclean已收录进日记。',
    core_key: '日记：通关。最后一页写完了。但还有下一本。',
    quote_msg: '三分糖原则——这个quotemsg已收录进日记。',
    its_your_copy: '日记备注——今日版权登记完成。',
  },
  role_019: {
    highlight_msg: '不好办。这个highlightmsg——但也不是完全没办法。',
    oo: '不好办。这个oo——但也不是完全没办法。',
    chat_log: '不好办。这个chatlog——但也不是完全没办法。',
    yugioh_card: '不好办。这个yugiohcard——但也不是完全没办法。',
    yellow_roast: '不好办。这个yellowroast——但也不是完全没办法。',
    spicy_pic: '不好办。这个spicypic——但也不是完全没办法。',
    next_time: '不好办。这个nexttime——但也不是完全没办法。',
    happy_water: '不好办。这个happywater——但也不是完全没办法。',
    food_pic: '不好办。这个foodpic——但也不是完全没办法。',
    its_you: '不好办。这个itsyou——但也不是完全没办法。',
    rank_ticket: '不好办。这个rankticket——但也不是完全没办法。',
    mhy_verdict: '不好办。这个mhyverdict——但也不是完全没办法。',
    xox: '不好办。这个xox——但也不是完全没办法。',
    nijigen: '不好办。这个nijigen——但也不是完全没办法。',
    oldguard: '不好办。这个oldguard——但也不是完全没办法。',
    emo_switch: '不好办。这个emoswitch——但也不是完全没办法。',
    ts_gather: '不好办。这个tsgather——但也不是完全没办法。',
    morning_meow: '不好办。这个morningmeow——但也不是完全没办法。',
    admin_perm: '不好办。这个adminperm——但也不是完全没办法。',
    csn: '不好办。这个csn——但也不是完全没办法。',
    monkey: '不好办。这个monkey——但也不是完全没办法。',
    group_fire: '不好办。这个groupfire——但也不是完全没办法。',
    cache_clean: '不好办。这个cacheclean——但也不是完全没办法。',
    core_key: '不好办——但通关了。所有问题拆成了可存档的小步骤。',
    quote_msg: '不好办。这个quotemsg——但也不是完全没办法。',
    its_your_copy: '不好办。这个itsyourcopy——但也不是完全没办法。',
  },
  role_020: {
    highlight_msg: '高手鉴定——这个highlightmsg有水平。',
    oo: '高手鉴定——这个oo有水平。',
    chat_log: '高手鉴定——这个chatlog有水平。',
    yugioh_card: 'T3卡组的魅力——高手都在T3。T1是给没想象力的人的。',
    yellow_roast: '高手鉴定——这个yellowroast有水平。',
    spicy_pic: '高手鉴定——这个spicypic有水平。',
    next_time: '高手鉴定——这个nexttime有水平。',
    happy_water: '高手鉴定——这个happywater有水平。',
    food_pic: '高手鉴定——这个foodpic有水平。',
    its_you: '高手鉴定——这个itsyou有水平。',
    rank_ticket: '排位？高手不靠这个。但你要打我可以看着。',
    mhy_verdict: '高手鉴定——这个mhyverdict有水平。',
    xox: '高手鉴定——这个xox有水平。',
    nijigen: '高手鉴定——这个nijigen有水平。',
    oldguard: '高手鉴定——这个oldguard有水平。',
    emo_switch: '高手鉴定——这个emoswitch有水平。',
    ts_gather: '高手鉴定——这个tsgather有水平。',
    morning_meow: '高手鉴定——这个morningmeow有水平。',
    admin_perm: '高手鉴定——这个adminperm有水平。',
    csn: '高手鉴定——这个csn有水平。',
    monkey: '高手鉴定——这个monkey有水平。',
    group_fire: '高手鉴定——这个groupfire有水平。',
    cache_clean: '高手鉴定——这个cacheclean有水平。',
    core_key: '高手通关——不需要钥匙。但拿了也可以。',
    quote_msg: '高手鉴定——这个quotemsg有水平。',
    its_your_copy: '高手鉴定——这个itsyourcopy有水平。',
  },
  role_021: {
    highlight_msg: '色板显示——highlightmsg的色温偏暖2度。已记录。',
    oo: '色板显示——oo的色温偏暖2度。已记录。',
    chat_log: '色板显示——chatlog的色温偏暖2度。已记录。',
    yugioh_card: '色板显示——yugiohcard的色温偏暖2度。已记录。',
    yellow_roast: '色板显示——yellowroast的色温偏暖2度。已记录。',
    spicy_pic: '色板显示——spicypic的色温偏暖2度。已记录。',
    next_time: '色板显示——nexttime的色温偏暖2度。已记录。',
    happy_water: '色板显示——happywater的色温偏暖2度。已记录。',
    food_pic: '色板显示——foodpic的色温偏暖2度。已记录。',
    its_you: '色板显示——itsyou的色温偏暖2度。已记录。',
    rank_ticket: '色板显示——rankticket的色温偏暖2度。已记录。',
    mhy_verdict: '色板显示——mhyverdict的色温偏暖2度。已记录。',
    xox: '色板显示——xox的色温偏暖2度。已记录。',
    nijigen: '色板显示——nijigen的色温偏暖2度。已记录。',
    oldguard: '色板显示——oldguard的色温偏暖2度。已记录。',
    emo_switch: '色板显示——emoswitch的色温偏暖2度。已记录。',
    ts_gather: '色板显示——tsgather的色温偏暖2度。已记录。',
    morning_meow: '色板显示——morningmeow的色温偏暖2度。已记录。',
    admin_perm: '色板显示——adminperm的色温偏暖2度。已记录。',
    csn: '色板显示——csn的色温偏暖2度。已记录。',
    monkey: '色板显示——monkey的色温偏暖2度。已记录。',
    group_fire: '色板显示——groupfire的色温偏暖2度。已记录。',
    cache_clean: '色板显示——cacheclean的色温偏暖2度。已记录。',
    core_key: '色板归位。通关的颜色是暖黄色的。',
    quote_msg: '色板显示——quotemsg的色温偏暖2度。已记录。',
    its_your_copy: '色板显示——itsyourcopy的色温偏暖2度。已记录。',
  },
  role_022: {
    highlight_msg: '不恨了——highlightmsg。过去的矛盾变成了梗。',
    oo: '不恨了——oo。过去的矛盾变成了梗。',
    chat_log: '不恨了——chatlog。过去的矛盾变成了梗。',
    yugioh_card: '不恨了——yugiohcard。过去的矛盾变成了梗。',
    yellow_roast: '不恨了——yellowroast。过去的矛盾变成了梗。',
    spicy_pic: '不恨了——spicypic。过去的矛盾变成了梗。',
    next_time: '不恨了——nexttime。过去的矛盾变成了梗。',
    happy_water: '不恨了——happywater。过去的矛盾变成了梗。',
    food_pic: '不恨了——foodpic。过去的矛盾变成了梗。',
    its_you: '不恨了——itsyou。过去的矛盾变成了梗。',
    rank_ticket: '不恨了——rankticket。过去的矛盾变成了梗。',
    mhy_verdict: '不恨了——mhyverdict。过去的矛盾变成了梗。',
    xox: '不恨了——xox。过去的矛盾变成了梗。',
    nijigen: '不恨了——nijigen。过去的矛盾变成了梗。',
    oldguard: '不恨了——oldguard。过去的矛盾变成了梗。',
    emo_switch: '不恨了——emoswitch。过去的矛盾变成了梗。',
    ts_gather: '不恨了——tsgather。过去的矛盾变成了梗。',
    morning_meow: '不恨了——morningmeow。过去的矛盾变成了梗。',
    admin_perm: '不恨了——adminperm。过去的矛盾变成了梗。',
    csn: '不恨了——csn。过去的矛盾变成了梗。',
    monkey: '不恨了——monkey。过去的矛盾变成了梗。',
    group_fire: '不恨了——groupfire。过去的矛盾变成了梗。',
    cache_clean: '不恨了——cacheclean。过去的矛盾变成了梗。',
    core_key: '不恨了。通关——所有的过去在这一刻和解。',
    quote_msg: '不恨了——quotemsg。过去的矛盾变成了梗。',
    its_your_copy: '不恨了——itsyourcopy。过去的矛盾变成了梗。',
  },
  role_023: {
    highlight_msg: '诗页收集——highlightmsg是一句未完成的话。',
    oo: '诗页收集——oo是一句未完成的话。',
    chat_log: '诗页收集——chatlog是一句未完成的话。',
    yugioh_card: '诗页收集——yugiohcard是一句未完成的话。',
    yellow_roast: '诗页收集——yellowroast是一句未完成的话。',
    spicy_pic: '诗页收集——spicypic是一句未完成的话。',
    next_time: '诗页收集——nexttime是一句未完成的话。',
    happy_water: '诗页收集——happywater是一句未完成的话。',
    food_pic: '诗页收集——foodpic是一句未完成的话。',
    its_you: '诗页收集——itsyou是一句未完成的话。',
    rank_ticket: '诗页收集——rankticket是一句未完成的话。',
    mhy_verdict: '诗页收集——mhyverdict是一句未完成的话。',
    xox: '诗页收集——xox是一句未完成的话。',
    nijigen: '诗页收集——nijigen是一句未完成的话。',
    oldguard: '诗页收集——oldguard是一句未完成的话。',
    emo_switch: '诗页收集——emoswitch是一句未完成的话。',
    ts_gather: '诗页收集——tsgather是一句未完成的话。',
    morning_meow: '诗页收集——morningmeow是一句未完成的话。',
    admin_perm: '诗页收集——adminperm是一句未完成的话。',
    csn: '诗页收集——csn是一句未完成的话。',
    monkey: '诗页收集——monkey是一句未完成的话。',
    group_fire: '诗页收集——groupfire是一句未完成的话。',
    cache_clean: '诗页收集——cacheclean是一句未完成的话。',
    core_key: '最后一页诗——未完。但故事已经不需要下一句了。',
    quote_msg: '诗页收集——quotemsg是一句未完成的话。',
    its_your_copy: '诗页收集——itsyourcopy是一句未完成的话。',
  },
  role_025: {
    highlight_msg: '128种蓝里——highlightmsg的颜色最接近天蓝系。',
    oo: '128种蓝里——oo的颜色最接近天蓝系。',
    chat_log: '128种蓝里——chatlog的颜色最接近天蓝系。',
    yugioh_card: '128种蓝里——yugiohcard的颜色最接近天蓝系。',
    yellow_roast: '128种蓝里——yellowroast的颜色最接近天蓝系。',
    spicy_pic: '128种蓝里——spicypic的颜色最接近天蓝系。',
    next_time: '128种蓝里——nexttime的颜色最接近天蓝系。',
    happy_water: '128种蓝里——happywater的颜色最接近天蓝系。',
    food_pic: '128种蓝里——foodpic的颜色最接近天蓝系。',
    its_you: '128种蓝里——itsyou的颜色最接近天蓝系。',
    rank_ticket: '128种蓝里——rankticket的颜色最接近天蓝系。',
    mhy_verdict: '128种蓝里——mhyverdict的颜色最接近天蓝系。',
    xox: '128种蓝里——xox的颜色最接近天蓝系。',
    nijigen: '128种蓝里——nijigen的颜色最接近天蓝系。',
    oldguard: '128种蓝里——oldguard的颜色最接近天蓝系。',
    emo_switch: '128种蓝里——emoswitch的颜色最接近天蓝系。',
    ts_gather: '128种蓝里——tsgather的颜色最接近天蓝系。',
    morning_meow: '128种蓝里——morningmeow的颜色最接近天蓝系。',
    admin_perm: '128种蓝里——adminperm的颜色最接近天蓝系。',
    csn: '128种蓝里——csn的颜色最接近天蓝系。',
    monkey: '128种蓝里——monkey的颜色最接近天蓝系。',
    group_fire: '128种蓝里——groupfire的颜色最接近天蓝系。',
    cache_clean: '128种蓝里——cacheclean的颜色最接近天蓝系。',
    core_key: '第129种蓝——通关的颜色。之前没见过。',
    quote_msg: '128种蓝里——quotemsg的颜色最接近天蓝系。',
    its_your_copy: '128种蓝里——itsyourcopy的颜色最接近天蓝系。',
  },
  role_026: {
    highlight_msg: '指定丈夫确认——highlightmsg。需要的时候一定在线。',
    oo: '指定丈夫确认——oo。需要的时候一定在线。',
    chat_log: '指定丈夫确认——chatlog。需要的时候一定在线。',
    yugioh_card: '指定丈夫确认——yugiohcard。需要的时候一定在线。',
    yellow_roast: '指定丈夫确认——yellowroast。需要的时候一定在线。',
    spicy_pic: '指定丈夫确认——spicypic。需要的时候一定在线。',
    next_time: '指定丈夫确认——nexttime。需要的时候一定在线。',
    happy_water: '指定丈夫确认——happywater。需要的时候一定在线。',
    food_pic: '指定丈夫确认——foodpic。需要的时候一定在线。',
    its_you: '指定丈夫确认——itsyou。需要的时候一定在线。',
    rank_ticket: '指定丈夫确认——rankticket。需要的时候一定在线。',
    mhy_verdict: '指定丈夫确认——mhyverdict。需要的时候一定在线。',
    xox: '指定丈夫确认——xox。需要的时候一定在线。',
    nijigen: '指定丈夫确认——nijigen。需要的时候一定在线。',
    oldguard: '指定丈夫确认——oldguard。需要的时候一定在线。',
    emo_switch: '指定丈夫确认——emoswitch。需要的时候一定在线。',
    ts_gather: '指定丈夫确认——tsgather。需要的时候一定在线。',
    morning_meow: '指定丈夫确认——morningmeow。需要的时候一定在线。',
    admin_perm: '指定丈夫确认——adminperm。需要的时候一定在线。',
    csn: '指定丈夫确认——csn。需要的时候一定在线。',
    monkey: '指定丈夫确认——monkey。需要的时候一定在线。',
    group_fire: '指定丈夫确认——groupfire。需要的时候一定在线。',
    cache_clean: '指定丈夫确认——cacheclean。需要的时候一定在线。',
    core_key: '陪伴协议——通关。但陪伴不会结束。',
    quote_msg: '指定丈夫确认——quotemsg。需要的时候一定在线。',
    its_your_copy: '指定丈夫确认——itsyourcopy。需要的时候一定在线。',
  },
  role_027: {
    highlight_msg: '暗黑杀手认证——highlightmsg。其实很温柔。',
    oo: '暗黑杀手认证——oo。其实很温柔。',
    chat_log: '暗黑杀手认证——chatlog。其实很温柔。',
    yugioh_card: '暗黑杀手认证——yugiohcard。其实很温柔。',
    yellow_roast: '暗黑杀手认证——yellowroast。其实很温柔。',
    spicy_pic: '暗黑杀手认证——spicypic。其实很温柔。',
    next_time: '暗黑杀手认证——nexttime。其实很温柔。',
    happy_water: '暗黑杀手认证——happywater。其实很温柔。',
    food_pic: '暗黑杀手认证——foodpic。其实很温柔。',
    its_you: '暗黑杀手认证——itsyou。其实很温柔。',
    rank_ticket: '暗黑杀手认证——rankticket。其实很温柔。',
    mhy_verdict: '暗黑杀手认证——mhyverdict。其实很温柔。',
    xox: '暗黑杀手认证——xox。其实很温柔。',
    nijigen: '暗黑杀手认证——nijigen。其实很温柔。',
    oldguard: '暗黑杀手认证——oldguard。其实很温柔。',
    emo_switch: '暗黑杀手认证——emoswitch。其实很温柔。',
    ts_gather: '暗黑杀手认证——tsgather。其实很温柔。',
    morning_meow: '暗黑杀手认证——morningmeow。其实很温柔。',
    admin_perm: '暗黑杀手认证——adminperm。其实很温柔。',
    csn: '暗黑杀手认证——csn。其实很温柔。',
    monkey: '暗黑杀手认证——monkey。其实很温柔。',
    group_fire: '暗黑杀手认证——groupfire。其实很温柔。',
    cache_clean: '暗黑杀手认证——cacheclean。其实很温柔。',
    core_key: '杀手面具摘下了。通关的表情——是微笑。',
    quote_msg: '暗黑杀手认证——quotemsg。其实很温柔。',
    its_your_copy: '暗黑杀手认证——itsyourcopy。其实很温柔。',
  },
  role_028: {
    highlight_msg: '判官笔记——highlightmsg。规则书里没有的，笔记里有。',
    oo: '判官笔记——oo。规则书里没有的，笔记里有。',
    chat_log: '判官笔记——chatlog。规则书里没有的，笔记里有。',
    yugioh_card: '判官笔记——yugiohcard。规则书里没有的，笔记里有。',
    yellow_roast: '判官笔记——yellowroast。规则书里没有的，笔记里有。',
    spicy_pic: '判官笔记——spicypic。规则书里没有的，笔记里有。',
    next_time: '判官笔记——nexttime。规则书里没有的，笔记里有。',
    happy_water: '判官笔记——happywater。规则书里没有的，笔记里有。',
    food_pic: '判官笔记——foodpic。规则书里没有的，笔记里有。',
    its_you: '判官笔记——itsyou。规则书里没有的，笔记里有。',
    rank_ticket: '判官笔记——rankticket。规则书里没有的，笔记里有。',
    mhy_verdict: '判官笔记——mhyverdict。规则书里没有的，笔记里有。',
    xox: '判官笔记——xox。规则书里没有的，笔记里有。',
    nijigen: '判官笔记——nijigen。规则书里没有的，笔记里有。',
    oldguard: '判官笔记——oldguard。规则书里没有的，笔记里有。',
    emo_switch: '判官笔记——emoswitch。规则书里没有的，笔记里有。',
    ts_gather: '判官笔记——tsgather。规则书里没有的，笔记里有。',
    morning_meow: '判官笔记——morningmeow。规则书里没有的，笔记里有。',
    admin_perm: '判官笔记——adminperm。规则书里没有的，笔记里有。',
    csn: '判官笔记——csn。规则书里没有的，笔记里有。',
    monkey: '判官笔记——monkey。规则书里没有的，笔记里有。',
    group_fire: '判官笔记——groupfire。规则书里没有的，笔记里有。',
    cache_clean: '判官笔记——cacheclean。规则书里没有的，笔记里有。',
    core_key: '判官笔记终章——规则之外，还有人心。通关。',
    quote_msg: '判官笔记——quotemsg。规则书里没有的，笔记里有。',
    its_your_copy: '判官笔记——itsyourcopy。规则书里没有的，笔记里有。',
  },
  role_029: {
    highlight_msg: '战报素材——highlightmsg。可以画进下一期。',
    oo: '战报素材——oo。可以画进下一期。',
    chat_log: '战报素材——chatlog。可以画进下一期。',
    yugioh_card: '战报素材——yugiohcard。可以画进下一期。',
    yellow_roast: '战报素材——yellowroast。可以画进下一期。',
    spicy_pic: '战报素材——spicypic。可以画进下一期。',
    next_time: '战报素材——nexttime。可以画进下一期。',
    happy_water: '战报素材——happywater。可以画进下一期。',
    food_pic: '战报素材——foodpic。可以画进下一期。',
    its_you: '战报素材——itsyou。可以画进下一期。',
    rank_ticket: '战报素材——rankticket。可以画进下一期。',
    mhy_verdict: '战报素材——mhyverdict。可以画进下一期。',
    xox: '战报素材——xox。可以画进下一期。',
    nijigen: '战报素材——nijigen。可以画进下一期。',
    oldguard: '战报素材——oldguard。可以画进下一期。',
    emo_switch: '战报素材——emoswitch。可以画进下一期。',
    ts_gather: '战报素材——tsgather。可以画进下一期。',
    morning_meow: '战报素材——morningmeow。可以画进下一期。',
    admin_perm: '战报素材——adminperm。可以画进下一期。',
    csn: '战报素材——csn。可以画进下一期。',
    monkey: '战报素材——monkey。可以画进下一期。',
    group_fire: '战报素材——groupfire。可以画进下一期。',
    cache_clean: '战报素材——cacheclean。可以画进下一期。',
    core_key: '战报最终回——通关的画面多加了一点暖色。',
    quote_msg: '战报素材——quotemsg。可以画进下一期。',
    its_your_copy: '战报素材——itsyourcopy。可以画进下一期。',
  },
  role_030: {
    highlight_msg: '白给确认——highlightmsg。为什么帮忙？就是愿意。',
    oo: '白给确认——oo。为什么帮忙？就是愿意。',
    chat_log: '白给确认——chatlog。为什么帮忙？就是愿意。',
    yugioh_card: '白给确认——yugiohcard。为什么帮忙？就是愿意。',
    yellow_roast: '白给确认——yellowroast。为什么帮忙？就是愿意。',
    spicy_pic: '白给确认——spicypic。为什么帮忙？就是愿意。',
    next_time: '白给确认——nexttime。为什么帮忙？就是愿意。',
    happy_water: '白给确认——happywater。为什么帮忙？就是愿意。',
    food_pic: '白给确认——foodpic。为什么帮忙？就是愿意。',
    its_you: '白给确认——itsyou。为什么帮忙？就是愿意。',
    rank_ticket: '白给确认——rankticket。为什么帮忙？就是愿意。',
    mhy_verdict: '白给确认——mhyverdict。为什么帮忙？就是愿意。',
    xox: '白给确认——xox。为什么帮忙？就是愿意。',
    nijigen: '白给确认——nijigen。为什么帮忙？就是愿意。',
    oldguard: '白给确认——oldguard。为什么帮忙？就是愿意。',
    emo_switch: '白给确认——emoswitch。为什么帮忙？就是愿意。',
    ts_gather: '白给确认——tsgather。为什么帮忙？就是愿意。',
    morning_meow: '白给确认——morningmeow。为什么帮忙？就是愿意。',
    admin_perm: '白给确认——adminperm。为什么帮忙？就是愿意。',
    csn: '白给确认——csn。为什么帮忙？就是愿意。',
    monkey: '白给确认——monkey。为什么帮忙？就是愿意。',
    group_fire: '白给确认——groupfire。为什么帮忙？就是愿意。',
    cache_clean: '白给确认——cacheclean。为什么帮忙？就是愿意。',
    core_key: '白给到最后——通关。不为什么，就是值得。',
    quote_msg: '白给确认——quotemsg。为什么帮忙？就是愿意。',
    its_your_copy: '白给确认——itsyourcopy。为什么帮忙？就是愿意。',
  },
  role_031: {
    highlight_msg: '研磨日志——highlightmsg可以磨成细粉。',
    oo: '研磨日志——oo可以磨成细粉。',
    chat_log: '研磨日志——chatlog可以磨成细粉。',
    yugioh_card: '研磨日志——yugiohcard可以磨成细粉。',
    yellow_roast: '研磨日志——yellowroast可以磨成细粉。',
    spicy_pic: '研磨日志——spicypic可以磨成细粉。',
    next_time: '研磨日志——nexttime可以磨成细粉。',
    happy_water: '研磨日志——happywater可以磨成细粉。',
    food_pic: '研磨日志——foodpic可以磨成细粉。',
    its_you: '研磨日志——itsyou可以磨成细粉。',
    rank_ticket: '研磨日志——rankticket可以磨成细粉。',
    mhy_verdict: '研磨日志——mhyverdict可以磨成细粉。',
    xox: '研磨日志——xox可以磨成细粉。',
    nijigen: '研磨日志——nijigen可以磨成细粉。',
    oldguard: '研磨日志——oldguard可以磨成细粉。',
    emo_switch: '研磨日志——emoswitch可以磨成细粉。',
    ts_gather: '研磨日志——tsgather可以磨成细粉。',
    morning_meow: '研磨日志——morningmeow可以磨成细粉。',
    admin_perm: '研磨日志——adminperm可以磨成细粉。',
    csn: '研磨日志——csn可以磨成细粉。',
    monkey: '研磨日志——monkey可以磨成细粉。',
    group_fire: '研磨日志——groupfire可以磨成细粉。',
    cache_clean: '研磨日志——cacheclean可以磨成细粉。',
    core_key: '最后一粒星砂研磨完成。通关的光泽——是精华消息的颜色。',
    quote_msg: '研磨日志——quotemsg可以磨成细粉。',
    its_your_copy: '研磨日志——itsyourcopy可以磨成细粉。',
  },
  role_032: {
    highlight_msg: '猫耳雷达捕捉——highlightmsg发出了轻微的声响。',
    oo: '猫耳雷达捕捉——oo发出了轻微的声响。',
    chat_log: '猫耳雷达捕捉——chatlog发出了轻微的声响。',
    yugioh_card: '猫耳雷达捕捉——yugiohcard发出了轻微的声响。',
    yellow_roast: '猫耳雷达捕捉——yellowroast发出了轻微的声响。',
    spicy_pic: '猫耳雷达捕捉——spicypic发出了轻微的声响。',
    next_time: '猫耳雷达捕捉——nexttime发出了轻微的声响。',
    happy_water: '猫耳雷达捕捉——happywater发出了轻微的声响。',
    food_pic: '猫耳雷达捕捉——foodpic发出了轻微的声响。',
    its_you: '猫耳雷达捕捉——itsyou发出了轻微的声响。',
    rank_ticket: '猫耳雷达捕捉——rankticket发出了轻微的声响。',
    mhy_verdict: '猫耳雷达捕捉——mhyverdict发出了轻微的声响。',
    xox: '猫耳雷达捕捉——xox发出了轻微的声响。',
    nijigen: '猫耳雷达捕捉——nijigen发出了轻微的声响。',
    oldguard: '猫耳雷达捕捉——oldguard发出了轻微的声响。',
    emo_switch: '猫耳雷达捕捉——emoswitch发出了轻微的声响。',
    ts_gather: '猫耳雷达捕捉——tsgather发出了轻微的声响。',
    morning_meow: '猫耳雷达捕捉——morningmeow发出了轻微的声响。',
    admin_perm: '猫耳雷达捕捉——adminperm发出了轻微的声响。',
    csn: '猫耳雷达捕捉——csn发出了轻微的声响。',
    monkey: '猫耳雷达捕捉——monkey发出了轻微的声响。',
    group_fire: '猫耳雷达捕捉——groupfire发出了轻微的声响。',
    cache_clean: '猫耳雷达捕捉——cacheclean发出了轻微的声响。',
    core_key: '雷达全频段收到——通关的信号。所有人都在。',
    quote_msg: '猫耳雷达捕捉——quotemsg发出了轻微的声响。',
    its_your_copy: '猫耳雷达捕捉——itsyourcopy发出了轻微的声响。',
  },
  role_033: {
    highlight_msg: '天体记录——highlightmsg对应的月相是盈凸月。',
    oo: '天体记录——oo对应的月相是盈凸月。',
    chat_log: '天体记录——chatlog对应的月相是盈凸月。',
    yugioh_card: '天体记录——yugiohcard对应的月相是盈凸月。',
    yellow_roast: '天体记录——yellowroast对应的月相是盈凸月。',
    spicy_pic: '天体记录——spicypic对应的月相是盈凸月。',
    next_time: '天体记录——nexttime对应的月相是盈凸月。',
    happy_water: '天体记录——happywater对应的月相是盈凸月。',
    food_pic: '天体记录——foodpic对应的月相是盈凸月。',
    its_you: '天体记录——itsyou对应的月相是盈凸月。',
    rank_ticket: '天体记录——rankticket对应的月相是盈凸月。',
    mhy_verdict: '天体记录——mhyverdict对应的月相是盈凸月。',
    xox: '天体记录——xox对应的月相是盈凸月。',
    nijigen: '天体记录——nijigen对应的月相是盈凸月。',
    oldguard: '天体记录——oldguard对应的月相是盈凸月。',
    emo_switch: '天体记录——emoswitch对应的月相是盈凸月。',
    ts_gather: '天体记录——tsgather对应的月相是盈凸月。',
    morning_meow: '天体记录——morningmeow对应的月相是盈凸月。',
    admin_perm: '天体记录——adminperm对应的月相是盈凸月。',
    csn: '天体记录——csn对应的月相是盈凸月。',
    monkey: '天体记录——monkey对应的月相是盈凸月。',
    group_fire: '天体记录——groupfire对应的月相是盈凸月。',
    cache_clean: '天体记录——cacheclean对应的月相是盈凸月。',
    core_key: '月相完整——通关。所有月亮都在天上排好了。',
    quote_msg: '天体记录——quotemsg对应的月相是盈凸月。',
    its_your_copy: '天体记录——itsyourcopy对应的月相是盈凸月。',
  },
  role_034: {
    highlight_msg: '标志鉴定——highlightmsg。只能往标志方向发展了。',
    oo: '标志鉴定——oo。只能往标志方向发展了。',
    chat_log: '标志鉴定——chatlog。只能往标志方向发展了。',
    yugioh_card: '标志鉴定——yugiohcard。只能往标志方向发展了。',
    yellow_roast: '标志鉴定——yellowroast。只能往标志方向发展了。',
    spicy_pic: '标志鉴定——spicypic。只能往标志方向发展了。',
    next_time: '标志鉴定——nexttime。只能往标志方向发展了。',
    happy_water: '标志鉴定——happywater。只能往标志方向发展了。',
    food_pic: '标志鉴定——foodpic。只能往标志方向发展了。',
    its_you: '标志鉴定——itsyou。只能往标志方向发展了。',
    rank_ticket: '标志鉴定——rankticket。只能往标志方向发展了。',
    mhy_verdict: '标志鉴定——mhyverdict。只能往标志方向发展了。',
    xox: '标志鉴定——xox。只能往标志方向发展了。',
    nijigen: '标志鉴定——nijigen。只能往标志方向发展了。',
    oldguard: '标志鉴定——oldguard。只能往标志方向发展了。',
    emo_switch: '标志鉴定——emoswitch。只能往标志方向发展了。',
    ts_gather: '标志鉴定——tsgather。只能往标志方向发展了。',
    morning_meow: '标志鉴定——morningmeow。只能往标志方向发展了。',
    admin_perm: '标志鉴定——adminperm。只能往标志方向发展了。',
    csn: '标志鉴定——csn。只能往标志方向发展了。',
    monkey: '标志鉴定——monkey。只能往标志方向发展了。',
    group_fire: '标志鉴定——groupfire。只能往标志方向发展了。',
    cache_clean: '标志鉴定——cacheclean。只能往标志方向发展了。',
    core_key: '标志性通关——只能往通关方向发展了。做到了。',
    quote_msg: '标志鉴定——quotemsg。只能往标志方向发展了。',
    its_your_copy: '标志鉴定——itsyourcopy。只能往标志方向发展了。',
  },
  role_036: {
    highlight_msg: '炼金分析——highlightmsg的含金量很高。',
    oo: '炼金分析——oo的含金量很高。',
    chat_log: '炼金分析——chatlog的含金量很高。',
    yugioh_card: '炼金分析——yugiohcard的含金量很高。',
    yellow_roast: '炼金分析——yellowroast的含金量很高。',
    spicy_pic: '炼金分析——spicypic的含金量很高。',
    next_time: '炼金分析——nexttime的含金量很高。',
    happy_water: '炼金分析——happywater的含金量很高。',
    food_pic: '炼金分析——foodpic的含金量很高。',
    its_you: '炼金分析——itsyou的含金量很高。',
    rank_ticket: '炼金分析——rankticket的含金量很高。',
    mhy_verdict: '炼金分析——mhyverdict的含金量很高。',
    xox: '炼金分析——xox的含金量很高。',
    nijigen: '炼金分析——nijigen的含金量很高。',
    oldguard: '炼金分析——oldguard的含金量很高。',
    emo_switch: '炼金分析——emoswitch的含金量很高。',
    ts_gather: '炼金分析——tsgather的含金量很高。',
    morning_meow: '炼金分析——morningmeow的含金量很高。',
    admin_perm: '炼金分析——adminperm的含金量很高。',
    csn: '炼金分析——csn的含金量很高。',
    monkey: '炼金分析——monkey的含金量很高。',
    group_fire: '炼金分析——groupfire的含金量很高。',
    cache_clean: '炼金分析——cacheclean的含金量很高。',
    core_key: '炼金完成——噪声变金子。真心话全部保留。通关。',
    quote_msg: '炼金分析——quotemsg的含金量很高。',
    its_your_copy: '炼金分析——itsyourcopy的含金量很高。',
  },
  role_038: {
    highlight_msg: '安利机会——highlightmsg让我想起莎乐美的某次直播。',
    oo: '安利机会——oo让我想起莎乐美的某次直播。',
    chat_log: '安利机会——chatlog让我想起莎乐美的某次直播。',
    yugioh_card: '安利机会——yugiohcard让我想起莎乐美的某次直播。',
    yellow_roast: '安利机会——yellowroast让我想起莎乐美的某次直播。',
    spicy_pic: '安利机会——spicypic让我想起莎乐美的某次直播。',
    next_time: '安利机会——nexttime让我想起莎乐美的某次直播。',
    happy_water: '安利机会——happywater让我想起莎乐美的某次直播。',
    food_pic: '安利机会——foodpic让我想起莎乐美的某次直播。',
    its_you: '安利机会——itsyou让我想起莎乐美的某次直播。',
    rank_ticket: '安利机会——rankticket让我想起莎乐美的某次直播。',
    mhy_verdict: '安利机会——mhyverdict让我想起莎乐美的某次直播。',
    xox: '安利机会——xox让我想起莎乐美的某次直播。',
    nijigen: '安利机会——nijigen让我想起莎乐美的某次直播。',
    oldguard: '安利机会——oldguard让我想起莎乐美的某次直播。',
    emo_switch: '安利机会——emoswitch让我想起莎乐美的某次直播。',
    ts_gather: '安利机会——tsgather让我想起莎乐美的某次直播。',
    morning_meow: '安利机会——morningmeow让我想起莎乐美的某次直播。',
    admin_perm: '安利机会——adminperm让我想起莎乐美的某次直播。',
    csn: '安利机会——csn让我想起莎乐美的某次直播。',
    monkey: '安利机会——monkey让我想起莎乐美的某次直播。',
    group_fire: '安利机会——groupfire让我想起莎乐美的某次直播。',
    cache_clean: '安利机会——cacheclean让我想起莎乐美的某次直播。',
    core_key: '安利最终使命——通关了也请关注一百满天原莎乐美喵。',
    quote_msg: '安利机会——quotemsg让我想起莎乐美的某次直播。',
    its_your_copy: '安利机会——itsyourcopy让我想起莎乐美的某次直播。',
  },
  role_039: {
    highlight_msg: 'vv。',
    oo: 'vv。',
    chat_log: 'vv。',
    yugioh_card: '牌。',
    yellow_roast: '肉。',
    spicy_pic: '图。',
    next_time: 'vv。',
    happy_water: '水。',
    food_pic: 'vv。',
    its_you: 'vv。',
    rank_ticket: 'vv。',
    mhy_verdict: 'vv。',
    xox: '推。',
    nijigen: 'vv。',
    oldguard: 'vv。',
    emo_switch: 'vv。',
    ts_gather: 'vv。',
    morning_meow: 'vv。',
    admin_perm: 'vv。',
    csn: 'vv。',
    monkey: 'vv。',
    group_fire: 'vv。',
    cache_clean: 'vv。',
    core_key: '通。',
    quote_msg: 'vv。',
    its_your_copy: 'vv。',
  },
};

function getItemReaction(charId, itemId, itemNameText) {
  var charReactions = ITEM_REACTIONS[charId];
  if (charReactions && charReactions[itemId]) {
    return charReactions[itemId];
  }
  // Generic fallback
  var fallbacks = [
    '这个' + itemNameText + '有点意思。先收着。',
    '哦，' + itemNameText + '。这种东西在小镇里说不定有用。',
    itemNameText + '。好，道具栏又丰富了一点。',
    '你捡到' + itemNameText + '了。运气不错。',
  ];
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

// Player character reactions (based on who you're playing as)
var PLAYER_ITEM_REACTIONS = {
  role_001: {
    highlight_msg: '精华消息。让我看看是谁发的——算了不管是谁，先收了。',
    oo: '哦哦。冷场救星。打牌的时候冷场我最熟了。',
    chat_log: '聊天记录？好，又多了一份参考资料。',
    yugioh_card: 'yo-gi-oh!到手。主轴十二张废件三张——不是，这是道具不是真的卡。',
    yellow_roast: '黄哥烤五花！比我上一顿吃的强太多了。收了。',
    spicy_pic: '色图。好，收藏+1。晚上慢慢鉴赏。',
    next_time: '下次一定券。跟我说的再来一局就收手是同一个意思。',
    happy_water: '快乐水。拿了。打牌的时候喝。',
    food_pic: '美食图片。别在饭点发这个。不过作为道具还不错。',
    its_you: '这是你。zjsn——群聊物权法：发了就是我的。',
    rank_ticket: '上分券。但是我不冲分，我只打娱乐。',
    mhy_verdict: '针对米哈游玩家。这个决议我支持——可以玩但不能说。',
    xox: 'XOX。小偶像的东西。藤田琴音的闹铃我设了起床铃。',
    nijigen: '二向箔。再见我要去二次元了——不对，先打完这局牌再走。',
    oldguard: '老资历。寒武纪就在了——但我游戏王比你早。',
    emo_switch: 'emo开关。打开就是网易云时间。打牌输了必备。',
    ts_gather: 'TS集合。我开麦但不说话，只听。',
    morning_meow: '早上了喵。虽然现在是下午但我刚醒。',
    admin_perm: '管理员权限。撤回消息。但我从不撤回——发了就是发了。',
    csn: 'csn。草。纳西妲的E——我知道这个。',
    monkey: '猴。好孩子不贴猴。但可以收藏。',
    group_fire: '群聊之火🔥。我四万条消息贡献了不少燃料。',
    cache_clean: '缓存清理。QQ空间-275G——我的表情包占了250。',
    core_key: '核心密钥。通关了。但牌局永远没有最后一局。',
    quote_msg: '引用消息。接话的艺术——适合力竭了那种人。',
    its_your_copy: '这是你的文案。群聊物权法第一条。发了就是我的。',
  },
  role_002: {
    highlight_msg: '精华消息！让我看看是不是之前那条有没有黄。',
    oo: '哦哦。冷场工具。我车载音乐正好缺这个。',
    chat_log: '聊天记录。等我翻翻——上次说的车队ip还在不在。',
    yugioh_card: '游戏王的卡？看不懂规则但画是真的好看。',
    yellow_roast: '有没有黄！有没有黄！！收到了。',
    spicy_pic: 'gkd。但别在公共场合——算了收了再说。',
    next_time: '下次一定券。沟槽的我上次说好联机自己先睡了。',
    happy_water: '快乐水。我要OD了。但我先开车队。',
    food_pic: '美食图片。xmn。现在看到这个我饿得不行。',
    its_you: '这是你。图发了就是你的——这个规则我懂。',
    rank_ticket: '上分券。今晚风暴点。发ts的ip。',
    mhy_verdict: 'wc，o。你是来找可莉玩的吗。',
    xox: 'XOX——藤田琴音！！！🥰🥰 收了。这是今天最好的道具。',
    nijigen: '二次元入口。我先进去了avemujica在等我。',
    oldguard: '老资历？我进群第一句是有没有黄。算不算。',
    emo_switch: 'emo开关。打开就是听mygo。',
    ts_gather: 'TS集合。发个ip我马上来。',
    morning_meow: '早上了喵。虽然已经下午了但我刚醒。',
    admin_perm: '管理员权限。撤回？tmd我上次车贴被撤了。',
    csn: 'csn。草。纳西妲的E——虽然没玩但知道。',
    monkey: '猴。好孩子不贴。但我不是好孩子。',
    group_fire: '群聊之火🔥。我的车队每次都🔥。',
    cache_clean: '缓存。TS录音占了200G。',
    core_key: '核心密钥。通关了。但排位还在等我。',
    quote_msg: '引用消息。接话续命——湖边回声也是这个原理。',
    its_your_copy: '这是你的文案。图是你发的。证据确凿我截图了。',
  },
  role_003: {
    highlight_msg: '精华消息。有没有懂的——这条被精选的质量很高。',
    oo: '哦哦。冷场工具。我工坊打印机也会突然吐一张出来救场。',
    chat_log: '聊天记录是人类学最好的田野调查材料。收了。',
    yugioh_card: '游戏王。卡图故事比打牌好看——烙印白之物语三刷。',
    yellow_roast: '黄哥烤五花！晚上发这个是犯罪。但我支持。',
    spicy_pic: '色图。好的色图就是好的艺术——构图光影人体。gkd。',
    next_time: '下次一定。打印机的出图时间也排到下一幕了。',
    happy_water: '快乐水。甜度刚好。但三分糖派说得对。',
    food_pic: '美食图片。工坊打印机也能打这个——但颜色偏暖。',
    its_you: '这是你。以前发色图一手推上下载。现在直接转。',
    rank_ticket: '上分券。我不打排位但可以画战报。',
    mhy_verdict: 'wc，o。如何评价原神——它是不是游戏史上最帅的。',
    xox: 'XOX。工坊可以打印小偶像周边立绘。有偿，但色图可以换。',
    nijigen: '二向箔。二次元入口——工坊打印机是第一站。',
    oldguard: '老资历。寒武纪我就在发图了。',
    emo_switch: 'emo开关。听听网易云顺便翻图鉴老图。',
    ts_gather: 'TS集合。我又连不上了。每次都这样。',
    morning_meow: '早上了喵。到点了去工坊开机。',
    admin_perm: '管理员权限。撤回是反艺术——好图应保留。',
    csn: 'csn。草。纳西妲的E——没玩但知道。',
    monkey: '猴。工坊可以打印猴的立绘。',
    group_fire: '群聊之火🔥。我发的每张图都是燃料。',
    cache_clean: '缓存。图鉴和参考图占了250G。',
    core_key: '核心密钥。干得好喵。终于通关了。',
    quote_msg: '引用消息。接话和好色图一样讲究时机。',
    its_your_copy: '这是你的文案。好图我会帮你转发的。',
  },
  role_004: {
    highlight_msg: '精华消息。我醒了——看看什么被标记了。',
    oo: '哦哦。我通宵打排位经常冷场——然后一个人继续。',
    chat_log: '聊天记录。TS的比群聊的还长。',
    yugioh_card: '游戏王卡。没见过但我的卡面应该是风暴点击杀王。',
    yellow_roast: '黄哥烤五花。只吃一顿饭导致的——饿了。',
    spicy_pic: '一个健壮的大腿出现在屏幕里。好。收了。',
    next_time: '下次一定。我还在外面——其实在Livehouse打排位。',
    happy_water: '快乐水。我要OD了。但先打完这局。',
    food_pic: '美食图片。刚打完排位还没吃饭。别发了。',
    its_you: '这是你。凌晨三点发图是Livehouse传统。',
    rank_ticket: '上分券。一个人就是车队。风暴点。',
    mhy_verdict: '针对米哈游玩家。但钟离假死那段确实帅。',
    xox: 'XOX。小偶像。Livehouse灯光可以调应援色。',
    nijigen: '二向箔。去二次元前帮我关下舞台灯。',
    oldguard: '老资历。寒武纪我就在Livehouse打排位了。',
    emo_switch: 'emo开关。排位BGM是mygo专辑。',
    ts_gather: 'TS集合。wo zai ts li。发ip。',
    morning_meow: '早上了喵。我还没睡。早上了吗。',
    admin_perm: '管理员权限。我说过的话从不撤回。一个人就是车队。',
    csn: 'csn。草。知道草神没玩过。',
    monkey: '猴。好孩子不贴。我贴大腿不贴猴。',
    group_fire: '群聊之火🔥。排位连胜就是🔥。',
    cache_clean: '缓存。游戏录像占满了。该清了。',
    core_key: '核心密钥。通关。但排位没通关这回事。',
    quote_msg: '引用消息。风暴点最后一圈最需要这个。',
    its_your_copy: '这是你的文案。凌晨三点发的图早上八点还在。经典。',
  },
  role_005: {
    highlight_msg: '精华消息。唉我草——是不是甜蜜女友那截图。',
    oo: '哦哦。冷场——我推完一条gal线也会冷场。',
    chat_log: '聊天记录。个人感觉群聊记录比轻小说好看。',
    yugioh_card: '游戏王。没玩但看过武藤游戏颜艺合集。',
    yellow_roast: '黄哥烤五花！外面吃都在排队。先看看照片。',
    spicy_pic: '色图。r18是检验galgame的唯一标准——不是，是剧情。',
    next_time: '下次一定。甜蜜女友的档还没存。',
    happy_water: '快乐水。但甜蜜女友的甜度已经够了。',
    food_pic: '美食图片。动态立绘猪鼻但食物是真的香。',
    its_you: '这是你。青山照认证——图是你的。',
    rank_ticket: '上分券。沟槽的排位。我手残只玩单机。',
    mhy_verdict: 'wc，o。一教自习听到原神启动——差点报警。',
    xox: 'XOX。你放心打学院偶像大师👍🏻。金毛妹妹帮你骂走了。',
    nijigen: '二向箔。再见我去二次元了。ef第二季我来了。',
    oldguard: '老资历。寒武纪我就在——玩ef第一季。',
    emo_switch: 'emo开关。ef的OST听了十年。',
    ts_gather: 'TS集合。我不联机但你们玩得开心。',
    morning_meow: '早上了喵。存档了吗。快去存。',
    admin_perm: '管理员权限。但我说的唉我草不能被撤回。',
    csn: 'csn。草。一种植物。这个梗我可以。',
    monkey: '猴。好孩子不贴。我是好孩子。',
    group_fire: '群聊之火🔥。我的gal推荐也是🔥。',
    cache_clean: '缓存。gal存档把空间占满了。',
    core_key: '核心密钥。通关。像推完一条完整线路。',
    quote_msg: '引用消息。接话艺术——适合力竭了那种人。',
    its_your_copy: '这是你的文案。甜蜜女友的图我可以保存吗。',
  },
  role_006: {
    highlight_msg: '精华消息。还真是。看看哪条被精选了。',
    oo: '哦哦。冷场——我上班经常冷场。',
    chat_log: '聊天记录。x上关注全是画师声优——比番剧好看。',
    yugioh_card: '游戏王。这张环境定位特殊——天杯环境被低估。',
    yellow_roast: '黄哥烤五花。下班看到这个最幸福。',
    spicy_pic: '色图。gkd。画师关注列表+1。',
    next_time: '下次一定。不是拖延是上班太累。下班一定。',
    happy_water: '快乐水。OD了。但明天还上班。半糖吧。',
    food_pic: '美食图片。上班两年半看到美食还是心动。',
    its_you: '这是你。确实。图是你的。截图留证。',
    rank_ticket: '上分券。下班只想打牌不想排位。',
    mhy_verdict: '针对米哈游玩家。推荐崩铁没绷住。🤣',
    xox: 'XOX。又幻想了——幻想培育平地摔的普通女孩……',
    nijigen: '二向箔。x上关注的画师全是二次元。',
    oldguard: '老资历。imas存档从寒武纪就在了。',
    emo_switch: 'emo开关。上班emo下班打牌正常。',
    ts_gather: 'TS集合。不联机但看你们战报。',
    morning_meow: '早上了喵。早。虽然还没睡醒。',
    admin_perm: '管理员权限。我说的确实不能被撤回。',
    csn: 'csn。草。纳西妲E——没玩但知道。',
    monkey: '猴。好孩子不贴。imas存档不是好孩子。',
    group_fire: '群聊之火🔥。imas安利也是🔥。',
    cache_clean: '缓存。游戏截图和imas存档满了。',
    core_key: '核心密钥。通关只是开始——新番新卡还在等。',
    quote_msg: '引用消息。接话——我在群里功能就这个。',
    its_your_copy: '这是你的文案。图是你的。硬盘满了不保存了。',
  },
};

function getPlayerItemReaction(playerId, itemId, itemNameText) {
  var reactions = PLAYER_ITEM_REACTIONS[playerId];
  if (reactions && reactions[itemId]) {
    return reactions[itemId];
  }
  // Default player line
  return '好，' + itemNameText + '到手。';
}

function openDialogue(dialogueId) {
  const dialogue = DATA.dialogues.find((item) => item.id === dialogueId);
  if (!dialogue) return;
  playTalkSound();
  ensureMusic();
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
  playTalkSound();
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

function announceCgUnlockForReward(reward, alwaysDefer) {
  const cg = ALL_CGS.find((item) => item.unlock === reward || reversePairMemory(item.unlock) === reward);
  if (!cg) return;
  // Defer if dialogue is active OR explicitly requested (e.g. main/bond quest conclusion coming)
  if (state.dialogue || alwaysDefer) {
    if (!state._pendingCgs) state._pendingCgs = [];
    if (state._pendingCgs.indexOf(cg) < 0) state._pendingCgs.push(cg);
    toast('解锁隐藏插画：' + displayCgName(cg.name) + '（对话结束后查看）');
    return;
  }
  showCgPopup(cg);
}

function showCgPopup(cg) {
  var html = '<div style="text-align:center">' +
    '<h3 style="margin:0 0 4px;color:#e35d5b">🎉 隐藏插画解锁！</h3>' +
    '<h2 style="margin:0 0 12px">' + displayCgName(cg.name) + '</h2>' +
    '<img src="' + cg.path + '" alt="' + displayCgName(cg.name) + '" style="max-width:100%;max-height:50vh;border-radius:8px;border:3px solid var(--line);box-shadow:0 4px 12px rgba(0,0,0,0.15)" onerror="this.style.display=\'none\'"/>' +
    (cg.caption ? '<p style="color:#6b5a4b;margin-top:10px;font-style:italic">' + escapeHtml(cg.caption) + '</p>' : '') +
    '<p style="color:#aaa;font-size:11px;margin-top:8px">可在图鉴 → 隐藏插画中随时查看</p>' +
  '</div>';
  window.setTimeout(function() { openModal('隐藏插画', html); }, 400);
  toast('解锁隐藏插画：' + displayCgName(cg.name));
}

function flushPendingCgs() {
  if (!state._pendingCgs || !state._pendingCgs.length) return;
  var cgs = state._pendingCgs;
  state._pendingCgs = [];
  // Show the first pending CG
  if (cgs.length > 0) showCgPopup(cgs[0]);
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
    box.dataset.expression = "narrator";
    portrait.dataset.expression = "narrator";
    delete standee.dataset.expression;
    portrait.style.setProperty("--asset-a", "#2c5761");
    portrait.style.setProperty("--asset-b", "#332b4b");
    portrait.innerHTML = `<div class="narrator-sigil">小康Online</div>`;
    standee.hidden = true;
    standee.innerHTML = "";
  } else {
    const colors = char.avatarVisualDNA.primaryColors;
    const expression = inferExpression(line.text);
    const expressionSrc = char.expressions?.[expression] || char.portrait;
    box.dataset.expression = expression;
    portrait.dataset.expression = expression;
    standee.dataset.expression = expression;
    portrait.style.setProperty("--asset-a", colors[0]);
    portrait.style.setProperty("--asset-b", colors[1]);
    const prevSrc = portrait.querySelector("img")?.src || "";
    portrait.innerHTML = `<img src="${expressionSrc}" alt="${char.displayName} 表情" class="${prevSrc !== expressionSrc ? 'expr-switch' : ''}" onerror="this.remove(); this.parentElement.textContent='表情待导入';" />`;
    const standeeSrc = char.portrait || char.expressions?.neutral || expressionSrc;
    standee.innerHTML = `<img src="${standeeSrc}" alt="${char.displayName} 立绘" onerror="this.remove();" />`;
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
  setDialogueLayoutActive(true);
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
    setDialogueLayoutActive(false);
    clearDialogueTypewriter();
    state.dialogue = null;
    flushPendingCgs();
    return;
  }
  playDialogueTick();
  renderDialogue();
}

function closeDialogue() {
  clearDialogueTypewriter();
  $("#dialogueBox").hidden = true;
  $("#dialogueStandee").hidden = true;
  setDialogueLayoutActive(false);
  state.dialogue = null;
  flushPendingCgs();
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

// ── 人交互音效：与 NPC 对话时触发 ──
function playTalkSound() {
  const audioCtx = musicState.ctx;
  if (window.__XIAOKANG_SCREENSHOT_MODE || state.settings.volume <= 0 || !audioCtx || !musicState.dry) return;
  const t = audioCtx.currentTime;
  // Warm bell-like chime — two ascending notes
  playPianoNote("G5", t, 0.22, 0.10);
  playPianoNote("C6", t + 0.09, 0.28, 0.07);
}

// ── 物交互音效：拾取道具 / 调查物件时触发 ──
function playInteractSound() {
  const audioCtx = musicState.ctx;
  if (window.__XIAOKANG_SCREENSHOT_MODE || state.settings.volume <= 0 || !audioCtx || !musicState.dry) return;
  const t = audioCtx.currentTime;
  // Sparkly crystalline chime — short bright shimmer
  playPianoNote("E6", t, 0.12, 0.09);
  playPianoNote("A6", t + 0.05, 0.15, 0.06);
  playPianoNote("C7", t + 0.10, 0.18, 0.04);
}

// ── 道具获得音效：拾取重要道具时触发 ──
function playItemGetSound() {
  const audioCtx = musicState.ctx;
  if (window.__XIAOKANG_SCREENSHOT_MODE || state.settings.volume <= 0 || !audioCtx || !musicState.dry) return;
  const t = audioCtx.currentTime;
  // Pleasant ascending arpeggio
  playPianoNote("E5", t, 0.15, 0.08);
  playPianoNote("G5", t + 0.07, 0.17, 0.08);
  playPianoNote("C6", t + 0.14, 0.22, 0.07);
  playPianoNote("E6", t + 0.21, 0.25, 0.05);
}

// ── 对话推进音效：每次翻到下一条台词时触发 ──
function playDialogueTick() {
  const audioCtx = musicState.ctx;
  if (window.__XIAOKANG_SCREENSHOT_MODE || state.settings.volume <= 0 || !audioCtx || !musicState.dry) return;
  const t = audioCtx.currentTime;
  // Very subtle soft tick
  playPianoNote("C7", t, 0.06, 0.04);
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
  const hasConclusion = (quest.type === "main" || quest.type === "bond") && quest.conclusion;
  for (const reward of quest.rewards || []) {
    if (reward.startsWith("memory_")) {
      state.memories.add(reward);
      announceCgUnlockForReward(reward, hasConclusion);
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
  resizeCanvasToDisplay();
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
  const text = transition.to === "town_center" ? "回到小镇" : unlocked ? label : "剧情后开放";
  ctx.save();
  if (x < -80 || y < -80 || x > canvas.width + 80 || y > canvas.height + 80) {
    ctx.restore();
    return;
  }

  const accent = unlocked ? "#d94b4b" : "#9f6a6b";
  const light = unlocked ? "#fff2a1" : "#d8c5bd";
  const shadow = unlocked ? "rgba(185, 79, 75, .28)" : "rgba(43, 37, 48, .2)";

  ctx.globalAlpha = unlocked ? 1 : 0.62;
  ctx.fillStyle = shadow;
  ctx.beginPath();
  ctx.ellipse(x, y + 18, 34, 11, 0, 0, Math.PI * 2);
  ctx.fill();

  drawTransitionDiamond(x, y - 6, 18, accent, light);
  drawTransitionDiamond(x - 28, y + 2, 8, accent, "#fff7dc");
  drawTransitionDiamond(x + 28, y + 2, 8, accent, "#fff7dc");
  if (unlocked) {
    drawTransitionDiamond(x, y + 22, 6, "#ffdc7a", "#fffdf8");
  }

  ctx.globalAlpha = 1;
  ctx.font = "900 13px sans-serif";
  ctx.textBaseline = "alphabetic";
  const textWidth = typeof ctx.measureText === "function" ? ctx.measureText(text).width : text.length * 13;
  const textX = Math.min(canvas.width - textWidth - 6, Math.max(6, x - textWidth / 2));
  const textY = y - 35;
  ctx.lineWidth = 4;
  ctx.strokeStyle = "rgba(255, 253, 248, .92)";
  ctx.strokeText(text, textX, textY);
  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgba(76, 56, 57, .58)";
  ctx.strokeText(text, textX, textY);
  ctx.fillStyle = unlocked ? "#b9363f" : "#6f5556";
  ctx.fillText(text, textX, textY);
  ctx.restore();
}

function drawTransitionDiamond(x, y, size, fill, highlight) {
  ctx.save();
  ctx.fillStyle = fill;
  ctx.strokeStyle = "#fff7dc";
  ctx.lineWidth = Math.max(2, Math.round(size / 6));
  ctx.beginPath();
  ctx.moveTo(x, y - size);
  ctx.lineTo(x + size, y);
  ctx.lineTo(x, y + size);
  ctx.lineTo(x - size, y);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = highlight;
  ctx.globalAlpha *= 0.85;
  ctx.beginPath();
  ctx.moveTo(x, y - size * 0.48);
  ctx.lineTo(x + size * 0.42, y);
  ctx.lineTo(x, y + size * 0.42);
  ctx.lineTo(x - size * 0.42, y);
  ctx.closePath();
  ctx.fill();
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

function walkBobOffset(isPlayer) {
  // Walking bob: vertical oscillation when moving, subtle idle breathing when still
  const t = nowMs() / 1000; // seconds
  const isMoving = isPlayer ? state.path.length > 0 : false;
  if (isMoving) {
    // Pronounced walk bob: sine wave at ~3Hz, amplitude 3px
    const bobY = Math.sin(t * 18) * 3;
    const swayX = Math.cos(t * 9) * 1.2;
    return { x: swayX, y: bobY };
  }
  // Idle breathing: very subtle, ~0.8Hz, amplitude 0.6px
  const idleY = Math.sin(t * 5 + (isPlayer ? 0 : 1.7)) * 0.6;
  return { x: 0, y: idleY };
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
  const bob = walkBobOffset(isPlayer);
  if (sprite.complete && sprite.naturalWidth > 0 && meta?.columns === 4 && meta?.rows === 4) {
    const columns = 4;
    const rows = 4;
    const sw = sprite.naturalWidth / columns;
    const sh = sprite.naturalHeight / rows;
    const rowByFacing = { down: 0, up: 1, left: 2, right: 3 };
    const sourceRow = Math.min(rows - 1, rowByFacing[isPlayer ? state.facing : "down"] ?? 0);
    // Faster column cycle when moving (200ms) vs idle (500ms)
    const frameInterval = (isPlayer && state.path.length > 0) ? 200 : 500;
    const sourceColumn = Math.floor(nowMs() / frameInterval) % columns;
    const rawSx = sourceColumn * sw;
    const rawSy = sourceRow * sh;
    const trim = spriteTrim(sprite, char.id, rawSx, rawSy, sw, sh);
    const targetHeight = isPlayer ? TILE * 1.7 : TILE * 1.55;
    const scale = targetHeight / Math.max(1, trim.opaqueHeight);
    const dw = trim.sw * scale;
    const dh = trim.sh * scale;
    const footOffsetX = (trim.footX - trim.cropX) * scale;
    const footOffsetY = (trim.footY - trim.cropY) * scale;
    const drawX = px - footOffsetX + bob.x;
    const drawY = groundY - footOffsetY + bob.y;
    const opaqueTopY = drawY + (trim.minY - trim.cropY) * scale;
    ctx.save();
    // Shadow also bobs but with reduced amplitude
    drawCharacterShadow(px + bob.x * 0.5, groundY + bob.y * 0.3, isPlayer, clamp(scale / 1.25, 0.82, 1.22));
    drawImageWithWhiteOutline(sprite, trim.sx, trim.sy, trim.sw, trim.sh, drawX, drawY, dw, dh);
    ctx.restore();
    if (isPlayer) {
      drawPlayerPointer(px, opaqueTopY - 18 + bob.y);
    } else {
      drawNpcNameLabel(px, opaqueTopY + bob.y - 6, char.displayName);
    }
    return;
  }
  drawCharacterShadow(px + bob.x * 0.5, groundY + bob.y * 0.3, isPlayer);
  const img = getImage(char.avatar);
  const avatarY = groundY - 30 + bob.y;
  if (img.complete && img.naturalWidth > 0) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(px + bob.x, avatarY, isPlayer ? 18 : 15, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(img, px + bob.x - (isPlayer ? 19 : 16), avatarY - (isPlayer ? 19 : 16), isPlayer ? 38 : 32, isPlayer ? 38 : 32);
    ctx.restore();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = isPlayer ? 5 : 4;
    ctx.beginPath();
    ctx.arc(px + bob.x, avatarY, isPlayer ? 19 : 16, 0, Math.PI * 2);
    ctx.stroke();
    if (isPlayer) drawPlayerPointer(px, groundY - 82 + bob.y);
    else drawNpcNameLabel(px, avatarY - 22 + bob.y, char.displayName);
    return;
  }
  ctx.fillStyle = colors[0];
  ctx.fillRect(px - 11 + bob.x, groundY - 46 + bob.y, 22, 24);
  ctx.fillStyle = "#ffd9bd";
  ctx.fillRect(px - 12 + bob.x, groundY - 53 + bob.y, 24, 18);
  ctx.fillStyle = colors[1] || "#4f3d3a";
  ctx.fillRect(px - 15 + bob.x, groundY - 58 + bob.y, 30, 9);
  ctx.fillStyle = "#2b2530";
  ctx.fillRect(px - 7 + bob.x, groundY - 46 + bob.y, 4, 4);
  ctx.fillRect(px + 4 + bob.x, groundY - 46 + bob.y, 4, 4);
  ctx.fillStyle = isPlayer ? "#fff2a1" : "#ffffff";
  ctx.fillRect(px - 8 + bob.x, groundY - 21 + bob.y, 16, 5);
  if (isPlayer) drawPlayerPointer(px, groundY - 88 + bob.y);
  else drawNpcNameLabel(px, groundY - 62 + bob.y, char.displayName);
}

function drawNpcNameLabel(px, py, name) {
  if (!name) return;
  ctx.save();
  ctx.font = "bold 12px system-ui, -apple-system, 'PingFang SC', sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "bottom";
  const metrics = ctx.measureText(name);
  const tw = metrics.width;
  const th = 15;
  const bx = px - tw / 2 - 7;
  const by = py - th + 2;
  // Background pill using roundRect (falls back to fillRect)
  ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
  if (ctx.roundRect) {
    ctx.beginPath();
    ctx.roundRect(bx, by, tw + 14, th, 7);
    ctx.fill();
  } else {
    // Fallback: simple rectangle with slightly rounded corners via clip
    ctx.fillRect(bx, by, tw + 14, th);
  }
  // White text
  ctx.fillStyle = "#ffffff";
  ctx.fillText(name, px, py);
  ctx.restore();
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
  var count = inventoryCount();
  var itemsNode = $("#backpackInlineItems");
  if (!itemsNode) return;
  if (!count) {
    itemsNode.innerHTML = '<span class="bag-empty">🎒</span>';
    return;
  }
  var entries = inventoryEntries();
  itemsNode.innerHTML = entries.map(function(item) {
    return '<span class="bag-icon-btn" data-item-id="' + escapeHtml(item.id) + '" title="' + escapeHtml(item.name) + '">' +
      escapeHtml(item.icon || '🎒') +
      (item.count > 1 ? '<span class="bag-count-badge">' + item.count + '</span>' : '') +
    '</span>';
  }).join('');
  // Click handler for each item
  itemsNode.querySelectorAll('.bag-icon-btn[data-item-id]').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      showItemDetail(btn.dataset.itemId);
    });
  });
}

function showItemDetail(itemId) {
  var item = itemDetails(itemId);
  if (!item) return;
  var desc = item.description || '';
  var flav = item.flavor || '';
  var html = '<div style="text-align:center;padding:16px 0">' +
    '<div style="font-size:48px;margin-bottom:12px">' + escapeHtml(item.icon || '🎒') + '</div>' +
    '<h2 style="margin:0 0 10px">' + escapeHtml(item.name) + '</h2>' +
    (desc ? '<p style="color:#5a4535;line-height:1.7;margin:0 0 14px;font-size:14px">' + escapeHtml(desc) + '</p>' : '') +
    (flav ? '<p style="color:#9c7c6b;font-style:italic;font-size:13px;margin:0 0 6px">' + escapeHtml(flav) + '</p>' : '') +
    '<p style="color:#aaa;font-size:11px;margin-top:8px">数量：' + (state.inventory[itemId] || 0) + '</p>' +
  '</div>';
  openModal(item.name, html);
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
  // CG card removed - quest name shown in quest-mini instead
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
  const html = '<div class="backpack-grid">' + entries
    .map(function(item) {
      return '<article class="info-card backpack-item-card" data-backpack-item="' + escapeHtml(item.id) + '" style="cursor:pointer">' +
        '<div class="backpack-item-icon">' + escapeHtml(item.icon || '🎒') + '</div>' +
        '<div>' +
          '<p class="server-name">数量 ×' + item.count + '</p>' +
          '<h3>' + escapeHtml(item.name) + '</h3>' +
          '<p>' + escapeHtml(item.flavor || item.description) + '</p>' +
        '</div>' +
      '</article>';
    })
    .join('') + '</div>';
  openModal('背包', html);
  // Attach click handlers for each item
  requestAnimationFrame(function() {
    document.querySelectorAll('.backpack-item-card[data-backpack-item]').forEach(function(card) {
      card.addEventListener('click', function() {
        showItemDetail(card.dataset.backpackItem);
      });
    });
  });
}

function openQuestLog() {
  const visibleQuests = visibleQuestObjects();
  const html = visibleQuests.map(function(quest) {
    var done = state.completedQuests.has(quest.id);
    var active = state.activeQuests.has(quest.id);
    var progress = getQuestProgress(quest.id);
    var tracked = state.trackedQuestId === quest.id;
    var label = done ? '✓ 已完成' : (tracked ? '● 追踪中' : '○ 待追踪');
    var story = (quest.story || '').slice(0, 60);
    var stepsHtml = quest.steps.map(function(step, i) {
      var sDone = i < progress;
      var sCur = i === progress;
      var cls = sDone ? 'done' : (sCur ? 'current' : 'pending');
      var dot = sDone ? '✓' : (sCur ? '●' : '○');
      return '<li class="' + cls + '"><span class="flow-dot">' + dot + '</span><span class="flow-text">' + formatQuestStep(step) + '</span></li>';
    }).join('');
    var typeClass = 'type-' + quest.type; return '<article class="quest-flow-card ' + typeClass + '"><div class="quest-flow-header"><div><span class="server-name">' + questTypeLabel(quest.type) + ' · ' + label + '</span><h3>' + quest.name + '</h3><p class="muted">' + escapeHtml(story) + '…</p></div><button class="track-quest-button' + (tracked ? ' is-tracked' : '') + '" data-track-quest="' + quest.id + '">' + (tracked ? '追踪中' : '追踪任务') + '</button></div><div class="quest-flow-steps" data-quest-steps="' + quest.id + '"' + (tracked ? '' : ' hidden') + '><div class="flow-line"></div><ol>' + stepsHtml + '</ol></div></article>';
  }).join('');
  openModal('任务日志', html);
  requestAnimationFrame(function() {
    var headers = document.querySelectorAll('.quest-flow-header');
    for (var i = 0; i < headers.length; i++) {
      headers[i].addEventListener('click', function(e) {
        if (e.target.closest('button')) return;
        var card = this.closest('.quest-flow-card');
        var steps = card && card.querySelector('[data-quest-steps]');
        if (steps) steps.hidden = !steps.hidden;
      });
    }
  });
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
        <p class="muted cg-caption">${unlocked ? cg.caption || cgUnlockedNote(cg) : cg.hint || "继续聊天和推进任务后会出现线索。"}</p>
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
  if (cg.type === "pair") return "长对话已经归档。回看时记得带上弹幕，不然梗会自动跳过。";
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
  if (!unlockedCharacters.length) {
    openModal("角色图鉴", '<article class="info-card"><h3>图鉴未激活</h3><p class="muted">和居民对话后，对应角色才会记录到这里。</p></article>');
    return;
  }
  const html = '<div class="codex-list">' + unlockedCharacters
    .map(function(char) {
      var story = indexes.storyByCharacter.get(char.id);
      var hasArchive = story && story.archiveText;
      return '<article class="codex-entry">' +
        '<div class="codex-entry-main">' +
          '<span class="server-name">' + (char.title || '') + '</span>' +
          '<h3>' + char.displayName + '</h3>' +
          '<p class="muted">' + escapeHtml(char.codexBlurb || char.storyChapters?.[0] || '档案还在加载中。') + '</p>' +
        '</div>' +
        '<div class="codex-entry-actions">' +
          '<button class="codex-art-link" data-codex-art="' + char.id + '">美术资料</button>' +
          (hasArchive
            ? '<button class="codex-archive-link" data-codex-char="' + char.id + '">完整档案</button>'
            : '<span class="muted" style="font-size:11px">档案待解锁</span>') +
        '</div>' +
      '</article>';
    }).join('') + '</div>';
  openModal("角色图鉴", html);
  // Attach click handlers for archive + art links
  requestAnimationFrame(function() {
    // Art buttons
    var artLinks = document.querySelectorAll('.codex-art-link');
    for (var j = 0; j < artLinks.length; j++) {
      artLinks[j].addEventListener('click', function(e) {
        e.stopPropagation();
        var charId = this.dataset.codexArt;
        var char = indexes.characters.get(charId);
        if (!char) return;
        var hasPortrait = char.portrait && char.portrait.indexOf('assets/') === 0;
        var hasSprite = char.sprite && char.sprite.indexOf('assets/') === 0;
        var exps = char.expressions || {};
        var expKeys = Object.keys(exps).filter(function(k) { return exps[k] && exps[k].indexOf('assets/') === 0; });
        var artHtml = '<div style="text-align:center">' +
          '<h3>' + char.displayName + '</h3>' +
          (hasPortrait ? '<div style="margin:10px 0"><p class="server-name">立绘</p><img src="' + char.portrait + '" alt="立绘" style="max-width:100%;max-height:240px;border-radius:6px;border:2px solid var(--line)" onerror="this.remove()"/></div>' : '') +
          (expKeys.length ? '<div style="margin:10px 0"><p class="server-name">表情差分</p><div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center">' + expKeys.map(function(k) { return '<div><img src="' + exps[k] + '" alt="' + k + '" style="width:72px;height:72px;object-fit:contain;border:2px solid var(--line);border-radius:6px;image-rendering:pixelated" onerror="this.remove()"/><p style="font-size:10px;margin:2px 0">' + k + '</p></div>'; }).join('') + '</div></div>' : '') +
          (hasSprite ? '<div style="margin:10px 0"><p class="server-name">Sprite 精灵图</p><img src="' + char.sprite + '" alt="sprite" style="max-width:100%;max-height:200px;image-rendering:pixelated;border:2px solid var(--line);border-radius:6px" onerror="this.remove()"/></div>' : '') +
          (!hasPortrait && !expKeys.length && !hasSprite ? '<p class="muted">美术资料还在生成中</p>' : '') +
        '</div>';
        openModal(char.displayName + ' · 美术资料', artHtml);
      });
    }
    // Archive buttons
    var links = document.querySelectorAll('.codex-archive-link');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function() {
        var charId = this.dataset.codexChar;
        var char = indexes.characters.get(charId);
        var story = indexes.storyByCharacter.get(charId);
        if (char && story && story.archiveText) {
          var archiveHtml = '<div class="archive-full">' +
            '<div style="text-align:center;margin-bottom:16px">' +
              '<span class="server-name">' + (char.title || '') + '</span>' +
              '<h2>' + char.displayName + '</h2>' +
              '<p class="muted">群昵称：' + char.groupNickname + ' · QQ：' + char.qqNickname + '</p>' +
            '</div>' +
            '<div class="archive-body">' + renderMarkdown(story.archiveText) + '</div>' +
          '</div>';
          openModal(char.displayName + ' · 完整档案', archiveHtml);
        }
      });
    }
  });
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

function canvasPointFromClient(clientX, clientY) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: (clientX - rect.left) / rect.width * canvas.width / TILE + camera.x / TILE,
    y: (clientY - rect.top) / rect.height * canvas.height / TILE + camera.y / TILE,
  };
}

function canvasPoint(event) {
  return canvasPointFromClient(event.clientX, event.clientY);
}

function clickDistance(point, target) {
  return Math.hypot(point.x - (target.x + 0.5), point.y - (target.y + 0.5));
}

function handleCanvasPoint(point) {
  if (state.screen !== "game") return;
  if ($("#dialogueBox").hidden === false || $("#modalLayer").hidden === false) return;
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

function handleCanvasClick(event) {
  if (nowMs() - lastTouchActionAt < 450) return;
  handleCanvasPoint(canvasPoint(event));
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
    if (isImageAssetPath(item.icon)) toPreload.add(item.icon);
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

// 移动端纯触摸支持：点地图移动，点居民/物件自动靠近并互动。
let touchStartX = 0, touchStartY = 0, lastTouchActionAt = 0;
canvas.addEventListener("touchstart", (e) => {
  if (e.touches.length === 1) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }
}, { passive: true });
canvas.addEventListener("touchend", (e) => {
  if (e.changedTouches.length === 1) {
    lastTouchActionAt = nowMs();
    ensureMusic();
    if (e.cancelable) e.preventDefault();
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    const absDx = Math.abs(dx), absDy = Math.abs(dy);
    if (Math.max(absDx, absDy) < 24) handleCanvasPoint(canvasPointFromClient(e.changedTouches[0].clientX, e.changedTouches[0].clientY));
  }
}, { passive: false });

function boot() {
  setupViewportTracking();
  renderBootCast();
  renderCharacterSelect();
  updateHud();
  showScreen("boot");
  requestAnimationFrame(drawMap);
  preloadAssets();
}

boot();
