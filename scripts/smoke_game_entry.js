#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const ids = [
  "app",
  "bootScreen",
  "selectScreen",
  "gameScreen",
  "characterGrid",
  "gameCanvas",
  "nearbyHint",
  "dialogueBox",
  "dialoguePortrait",
  "dialogueStandee",
  "dialogueSpeaker",
  "dialogueText",
  "dialogueChoices",
  "modalLayer",
  "modalTitle",
  "modalBody",
  "toast",
  "areaTheme",
  "areaName",
  "timeButton",
  "playerAvatar",
  "playerName",
  "playerTrait",
  "activeQuestName",
  "activeQuestSteps",
  "questCgCard",
  "questCgImage",
  "questCgName",
  "assetStatusText",
];

class FakeClassList {
  constructor(initial = []) {
    this.values = new Set(initial);
  }
  add(name) {
    this.values.add(name);
  }
  remove(name) {
    this.values.delete(name);
  }
  contains(name) {
    return this.values.has(name);
  }
  toggle(name, force) {
    if (force === undefined ? !this.values.has(name) : force) this.values.add(name);
    else this.values.delete(name);
  }
}

class FakeElement {
  constructor(id, classes = []) {
    this.id = id;
    this.dataset = {};
    this.classList = new FakeClassList(classes);
    this.hidden = false;
    this.innerHTML = "";
    this.textContent = "";
    this.style = { setProperty: () => {} };
  }
  addEventListener() {}
  getContext() {
    return {
      imageSmoothingEnabled: false,
      clearRect() {},
      fillRect() {},
      strokeRect() {},
      beginPath() {},
      moveTo() {},
      lineTo() {},
      closePath() {},
      arc() {},
      ellipse() {},
      fill() {},
      stroke() {},
      save() {},
      restore() {},
      clip() {},
      drawImage() {},
      translate() {},
      scale() {},
      fillText() {},
      strokeText() {},
      measureText(text) {
        return { width: String(text).length * 12 };
      },
    };
  }
  set outerHTML(value) {
    this.innerHTML = value;
  }
}

const elements = new Map();
for (const id of ids) {
  const screenClass = id.endsWith("Screen") ? ["screen"] : [];
  elements.set(id, new FakeElement(id, screenClass));
}
elements.get("dialogueBox").hidden = true;
elements.get("modalLayer").hidden = true;
elements.get("toast").hidden = true;
elements.get("gameCanvas").width = 896;
elements.get("gameCanvas").height = 640;

const listeners = {};
const document = {
  querySelector(selector) {
    if (selector.startsWith("#")) return elements.get(selector.slice(1)) || null;
    return null;
  },
  querySelectorAll(selector) {
    if (selector === ".screen") return [...elements.values()].filter((el) => el.classList.contains("screen"));
    return [];
  },
  addEventListener(type, handler) {
    listeners[type] ||= [];
    listeners[type].push(handler);
  },
};

function imageStub() {
  return { complete: false, naturalWidth: 0, naturalHeight: 0, src: "" };
}

const localStorageData = new Map();
const context = {
  console,
  document,
  window: {
    setTimeout: () => 0,
    clearTimeout: () => {},
  },
  localStorage: {
    getItem: (key) => localStorageData.get(key) || null,
    setItem: (key, value) => localStorageData.set(key, value),
    removeItem: (key) => localStorageData.delete(key),
  },
  location: { reload: () => {} },
  Image: imageStub,
  requestAnimationFrame: () => 0,
};
context.window.document = document;
context.window.localStorage = context.localStorage;

function runScript(relPath) {
  const code = fs.readFileSync(path.join(ROOT, relPath), "utf8");
  vm.runInNewContext(code, context, { filename: relPath });
}

function click(dataset) {
  const target = {
    closest(selector) {
      if (selector === "[data-action]" && dataset.action) return { dataset };
      if (selector === "[data-select]" && dataset.select) return { dataset };
      if (selector === "[data-move]" && dataset.move) return { dataset };
      return null;
    },
  };
  for (const handler of listeners.click || []) handler({ target });
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

runScript("src/data/game-data.js");
runScript("src/game.js");

assert(elements.get("bootScreen").classList.contains("is-active"), "boot screen did not activate");
click({ action: "start" });
assert(elements.get("selectScreen").classList.contains("is-active"), "start button did not open character select");
assert(/data-select="role_\d+"/.test(elements.get("characterGrid").innerHTML), "character select did not render role buttons");
const selectedMatch = elements.get("characterGrid").innerHTML.match(/data-select="(role_\d+)"/);
click({ select: selectedMatch[1] });
assert(elements.get("gameScreen").classList.contains("is-active"), "role select did not open game screen");
assert(elements.get("playerName").textContent.length > 0 && elements.get("playerName").textContent !== "未上线", "player HUD did not initialize");
assert(elements.get("areaName").textContent === "小镇中心", "area HUD did not initialize");
assert(elements.get("dialogueBox").hidden === false, "intro dialogue did not open");
assert(localStorageData.size > 0, "start flow did not save progress");
vm.runInNewContext("drawMap()", context, { filename: "smoke-drawMap.js" });

console.log("smoke entry passed: boot -> select -> game -> intro dialogue");
