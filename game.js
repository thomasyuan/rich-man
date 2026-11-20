"use strict";

const DEFAULT_START_CASH = 3000;
const GO_SALARY = 200;
const JAIL_FEE = 50;
const MAX_HOUSES = 5;

const PLAYER_COLORS = ["#e35f5f", "#51a7e8", "#e3a83f", "#5cc28b"];

const AVATARS = [
  "🦊", "🐼", "🐯", "🦄", "🐙",
  "🦁", "🐵", "🐺", "🦉", "🐲",
  "🐨", "🐧", "🦖", "👽", "🐱",
  "🐰", "🐹", "🐷", "🦕", "🦩",
];

const GROUPS = {
  brown:     { name: "Brown",      color: "#81513a", size: 2, houseCost: 50 },
  lightblue: { name: "Light Blue", color: "#8bcfe4", size: 3, houseCost: 50 },
  pink:      { name: "Pink",       color: "#d5638c", size: 3, houseCost: 100 },
  orange:    { name: "Orange",     color: "#df8a38", size: 3, houseCost: 100 },
  red:       { name: "Red",        color: "#c84642", size: 3, houseCost: 150 },
  yellow:    { name: "Yellow",     color: "#d9bc3e", size: 3, houseCost: 150 },
  green:     { name: "Green",      color: "#328c61", size: 3, houseCost: 200 },
  darkblue:  { name: "Dark Blue",  color: "#24518c", size: 2, houseCost: 200 },
};

const BOARD = [
  { name: "Go", short: "GO", type: "go" },
  { name: "Mediterranean Avenue", short: "Mediterranean Ave.", type: "property", group: "brown", price: 60, rents: [2, 10, 30, 90, 160, 250] },
  { name: "Community Chest", short: "Community Chest", type: "chest" },
  { name: "Baltic Avenue", short: "Baltic Ave.", type: "property", group: "brown", price: 60, rents: [4, 20, 60, 180, 320, 450] },
  { name: "Income Tax", short: "Income Tax", type: "tax", amount: 200 },
  { name: "Reading Railroad", short: "Reading Railroad", type: "railroad", price: 200, icon: "🚂" },
  { name: "Oriental Avenue", short: "Oriental Ave.", type: "property", group: "lightblue", price: 100, rents: [6, 30, 90, 270, 400, 550] },
  { name: "Chance", short: "Chance", type: "chance" },
  { name: "Vermont Avenue", short: "Vermont Ave.", type: "property", group: "lightblue", price: 100, rents: [6, 30, 90, 270, 400, 550] },
  { name: "Connecticut Avenue", short: "Connecticut Ave.", type: "property", group: "lightblue", price: 120, rents: [8, 40, 100, 300, 450, 600] },
  { name: "Jail", short: "Jail", type: "jail" },
  { name: "St. Charles Place", short: "St. Charles Place", type: "property", group: "pink", price: 140, rents: [10, 50, 150, 450, 625, 750] },
  { name: "Electric Company", short: "Electric Company", type: "utility", price: 150, icon: "⚡" },
  { name: "States Avenue", short: "States Ave.", type: "property", group: "pink", price: 140, rents: [10, 50, 150, 450, 625, 750] },
  { name: "Virginia Avenue", short: "Virginia Ave.", type: "property", group: "pink", price: 160, rents: [12, 60, 180, 500, 700, 900] },
  { name: "Pennsylvania Railroad", short: "Penn. RR", type: "railroad", price: 200, icon: "🚂" },
  { name: "St. James Place", short: "St. James Place", type: "property", group: "orange", price: 180, rents: [14, 70, 200, 550, 750, 950] },
  { name: "Community Chest", short: "Community Chest", type: "chest" },
  { name: "Tennessee Avenue", short: "Tennessee Ave.", type: "property", group: "orange", price: 180, rents: [14, 70, 200, 550, 750, 950] },
  { name: "New York Avenue", short: "New York Ave.", type: "property", group: "orange", price: 200, rents: [16, 80, 220, 600, 800, 1000] },
  { name: "Free Parking", short: "Free Parking", type: "parking" },
  { name: "Kentucky Avenue", short: "Kentucky Ave.", type: "property", group: "red", price: 220, rents: [18, 90, 250, 700, 875, 1050] },
  { name: "Chance", short: "Chance", type: "chance" },
  { name: "Indiana Avenue", short: "Indiana Ave.", type: "property", group: "red", price: 220, rents: [18, 90, 250, 700, 875, 1050] },
  { name: "Illinois Avenue", short: "Illinois Ave.", type: "property", group: "red", price: 240, rents: [20, 100, 300, 750, 925, 1100] },
  { name: "B. & O. Railroad", short: "B. & O. Railroad", type: "railroad", price: 200, icon: "🚂" },
  { name: "Atlantic Avenue", short: "Atlantic Ave.", type: "property", group: "yellow", price: 260, rents: [22, 110, 330, 800, 975, 1150] },
  { name: "Ventnor Avenue", short: "Ventnor Ave.", type: "property", group: "yellow", price: 260, rents: [22, 110, 330, 800, 975, 1150] },
  { name: "Water Works", short: "Water Works", type: "utility", price: 150, icon: "💧" },
  { name: "Marvin Gardens", short: "Marvin Gardens", type: "property", group: "yellow", price: 280, rents: [24, 120, 360, 850, 1025, 1200] },
  { name: "Go To Jail", short: "Go To Jail", type: "gotojail" },
  { name: "Pacific Avenue", short: "Pacific Ave.", type: "property", group: "green", price: 300, rents: [26, 130, 390, 900, 1100, 1275] },
  { name: "North Carolina Avenue", short: "North Carolina Ave.", type: "property", group: "green", price: 300, rents: [26, 130, 390, 900, 1100, 1275] },
  { name: "Community Chest", short: "Community Chest", type: "chest" },
  { name: "Pennsylvania Avenue", short: "Penn. Ave.", type: "property", group: "green", price: 320, rents: [28, 150, 450, 1000, 1200, 1400] },
  { name: "Short Line", short: "Short Line", type: "railroad", price: 200, icon: "🚂" },
  { name: "Chance", short: "Chance", type: "chance" },
  { name: "Park Place", short: "Park Place", type: "property", group: "darkblue", price: 350, rents: [35, 175, 500, 1100, 1300, 1500] },
  { name: "Luxury Tax", short: "Luxury Tax", type: "tax", amount: 100 },
  { name: "Boardwalk", short: "Boardwalk", type: "property", group: "darkblue", price: 400, rents: [50, 200, 600, 1400, 1700, 2000] },
];

const CHANCE_CARDS = [
  {
    id: "ch-boardwalk",
    title: "The boardwalk is calling.",
    text: "Advance to Boardwalk.",
    action: "move",
    target: 39,
    effect: "ADVANCE TO BOARDWALK",
    icon: "🏖️",
  },
  {
    id: "ch-rail-a",
    title: "All aboard.",
    text: "Advance to the nearest railroad. If it is unowned, buy it. If it is owned, pay double the usual rent.",
    action: "nearest",
    nearest: "railroad",
    multiplier: 2,
    effect: "NEAREST RAILROAD · DOUBLE RENT",
    icon: "🚂",
  },
  {
    id: "ch-rail-b",
    title: "Next stop, the rails.",
    text: "Advance to the nearest railroad. If it is unowned, buy it. If it is owned, pay double the usual rent.",
    action: "nearest",
    nearest: "railroad",
    multiplier: 2,
    effect: "NEAREST RAILROAD · DOUBLE RENT",
    icon: "🚞",
  },
  {
    id: "ch-water",
    title: "The city works in mysterious ways.",
    text: "Advance to the nearest Water Works. If unowned, take the chance to buy it. If owned, throw the dice and pay the owner 10 times the amount thrown.",
    action: "nearest",
    nearest: "water",
    effect: "NEAREST WATER WORKS · 10× DICE",
    icon: "💧",
  },
  {
    id: "ch-electric",
    title: "The grid hums tonight.",
    text: "Advance to the nearest Electric Company. If unowned, take the chance to buy it. If owned, throw the dice and pay the owner 10 times the amount thrown.",
    action: "nearest",
    nearest: "electric",
    effect: "NEAREST ELECTRIC CO. · 10× DICE",
    icon: "⚡",
  },
  {
    id: "ch-illinois",
    title: "A deal is waiting downtown.",
    text: "Advance to Illinois Avenue. If you pass GO, collect $200.",
    action: "move",
    target: 24,
    effect: "ADVANCE TO ILLINOIS AVE.",
    icon: "🏙️",
  },
  {
    id: "ch-stcharles",
    title: "The board wants a word.",
    text: "Advance to St. Charles Place. If you pass GO, collect $200.",
    action: "move",
    target: 11,
    effect: "ADVANCE TO ST. CHARLES PLACE",
    icon: "🎩",
  },
  {
    id: "ch-dividend",
    title: "Your portfolio pays out.",
    text: "The bank pays you a dividend of $50.",
    action: "money",
    amount: 50,
    effect: "+$50",
    icon: "💵",
  },
  {
    id: "ch-jail-free",
    title: "A favor, called in.",
    text: "Keep this card until you need it. It gets you out of jail free.",
    action: "getOut",
    effect: "GET OUT OF JAIL FREE",
    icon: "🗝️",
  },
  {
    id: "ch-back-three",
    title: "A strategic retreat.",
    text: "Go back three spaces. Whatever waits there, you must face it.",
    action: "back",
    steps: 3,
    effect: "MOVE BACK 3 SPACES",
    icon: "↩️",
  },
  {
    id: "ch-jail",
    title: "The police have questions.",
    text: "Go directly to jail. Do not pass GO. Do not collect $200.",
    action: "jail",
    effect: "GO DIRECTLY TO JAIL",
    icon: "🚔",
  },
  {
    id: "ch-repairs",
    title: "The inspector has notes.",
    text: "Make general repairs on all your properties: pay $25 for each house and $100 for each hotel.",
    action: "repairs",
    perHouse: 25,
    perHotel: 100,
    effect: "PAY FOR REPAIRS",
    icon: "🔧",
  },
  {
    id: "ch-school",
    title: "The school tax comes due.",
    text: "Pay $50 in school taxes.",
    action: "money",
    amount: -50,
    effect: "PAY $50",
    icon: "🎓",
  },
  {
    id: "ch-reading",
    title: "The 5:15 is right on time.",
    text: "Take a trip to Reading Railroad. If you pass GO, collect $200.",
    action: "move",
    target: 5,
    effect: "ADVANCE TO READING RAILROAD",
    icon: "🚝",
  },
  {
    id: "ch-fine",
    title: "The city has a long memory.",
    text: "Speeding fine. Pay the bank $15.",
    action: "money",
    amount: -15,
    effect: "PAY $15",
    icon: "🚨",
  },
  {
    id: "ch-loan",
    title: "Your building loan matures.",
    text: "Collect $150 from the bank.",
    action: "money",
    amount: 150,
    effect: "+$150",
    icon: "📈",
  },
];

const CHEST_CARDS = [
  {
    id: "cc-go",
    title: "The city thanks you.",
    text: "Advance to GO. Collect $200.",
    action: "move",
    target: 0,
    effect: "ADVANCE TO GO · +$200",
    icon: "🏛️",
  },
  {
    id: "cc-bank-error",
    title: "Bank error in your favor.",
    text: "Collect $200 from the bank.",
    action: "money",
    amount: 200,
    effect: "+$200",
    icon: "🏦",
  },
  {
    id: "cc-doctor",
    title: "Doctor's fee.",
    text: "Pay the hospital $50.",
    action: "money",
    amount: -50,
    effect: "PAY $50",
    icon: "🩺",
  },
  {
    id: "cc-stock",
    title: "From sale of stock.",
    text: "You receive $50.",
    action: "money",
    amount: 50,
    effect: "+$50",
    icon: "📊",
  },
  {
    id: "cc-jail-free",
    title: "A quiet word with the judge.",
    text: "Keep this card until you need it. It gets you out of jail free.",
    action: "getOut",
    effect: "GET OUT OF JAIL FREE",
    icon: "🗝️",
  },
  {
    id: "cc-jail",
    title: "A misunderstanding.",
    text: "Go directly to jail. Do not pass GO. Do not collect $200.",
    action: "jail",
    effect: "GO DIRECTLY TO JAIL",
    icon: "🚔",
  },
  {
    id: "cc-holiday",
    title: "Holiday fund matures.",
    text: "Receive $100.",
    action: "money",
    amount: 100,
    effect: "+$100",
    icon: "🏖️",
  },
  {
    id: "cc-refund",
    title: "Income tax refund.",
    text: "The city owes you $20.",
    action: "money",
    amount: 20,
    effect: "+$20",
    icon: "🧾",
  },
  {
    id: "cc-birthday",
    title: "It is your birthday.",
    text: "Collect $10 from every other player.",
    action: "collectEach",
    amount: 10,
    effect: "COLLECT $10 FROM EACH",
    icon: "🎂",
  },
  {
    id: "cc-insurance",
    title: "Life insurance matures.",
    text: "Collect $100.",
    action: "money",
    amount: 100,
    effect: "+$100",
    icon: "🛡️",
  },
  {
    id: "cc-hospital",
    title: "Hospital fees.",
    text: "Pay the hospital $100.",
    action: "money",
    amount: -100,
    effect: "PAY $100",
    icon: "🏥",
  },
  {
    id: "cc-school",
    title: "School fees.",
    text: "Pay the school $50.",
    action: "money",
    amount: -50,
    effect: "PAY $50",
    icon: "🎓",
  },
  {
    id: "cc-consultancy",
    title: "A consultancy fee.",
    text: "Receive $25 for your expert advice.",
    action: "money",
    amount: 25,
    effect: "+$25",
    icon: "💼",
  },
  {
    id: "cc-repairs",
    title: "Street repairs.",
    text: "Pay $40 for each house and $115 for each hotel you own.",
    action: "repairs",
    perHouse: 40,
    perHotel: 115,
    effect: "PAY FOR REPAIRS",
    icon: "🛠️",
  },
  {
    id: "cc-back-three",
    title: "A step backward.",
    text: "Go back three spaces.",
    action: "back",
    steps: 3,
    effect: "MOVE BACK 3 SPACES",
    icon: "↩️",
  },
  {
    id: "cc-beauty",
    title: "Second prize in a beauty contest.",
    text: "Collect $10 and enjoy the applause.",
    action: "money",
    amount: 10,
    effect: "+$10",
    icon: "🏆",
  },
];

const $ = (selector) => document.querySelector(selector);

let setupCount = 2;
let startingCash = DEFAULT_START_CASH;
const setupPlayers = [
  { name: "Player 1", avatar: "🦊", color: PLAYER_COLORS[0] },
  { name: "Player 2", avatar: "🐼", color: PLAYER_COLORS[1] },
  { name: "Player 3", avatar: "🐯", color: PLAYER_COLORS[2] },
  { name: "Player 4", avatar: "🦄", color: PLAYER_COLORS[3] },
];

let game = null;
let tileEls = [];
let soundOn = true;
let audioCtx = null;
let masterGain = null;
let openOverlayCount = 0;
let activeOverlay = null;
let winShown = false;

const els = {};

const DIE_ROTATIONS = {
  1: { x: 0, y: 0 },
  2: { x: -90, y: 0 },
  3: { x: 0, y: -90 },
  4: { x: 0, y: 90 },
  5: { x: 90, y: 0 },
  6: { x: 0, y: 180 },
};

const DIE_PIPS = {
  1: [4],
  2: [0, 8],
  3: [0, 4, 8],
  4: [0, 2, 6, 8],
  5: [0, 2, 4, 6, 8],
  6: [0, 2, 3, 5, 6, 8],
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function money(value) {
  const rounded = Math.round(value);
  const sign = rounded < 0 ? "-" : "";
  return `${sign}$${Math.abs(rounded).toLocaleString("en-US")}`;
}

function signedMoney(value) {
  if (value === 0) return money(0);
  return `${value > 0 ? "+" : ""}${money(value)}`;
}

function currentPlayer() {
  return game ? game.players[game.active] : null;
}

function clampStartingCash(value) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return DEFAULT_START_CASH;
  return Math.min(100000, Math.max(100, Math.round(parsed)));
}

function normalizeStartingCash(value = startingCash, sync = true) {
  startingCash = clampStartingCash(value);
  if (sync) updateSetupCashUI();
  return startingCash;
}

function rulesStartingCash() {
  return game?.startingCash ?? startingCash;
}

function updateSetupCashUI(syncInput = true) {
  const formatted = money(startingCash);
  if (els.setupBalance) els.setupBalance.textContent = formatted;
  if (els.heroStartingCash) els.heroStartingCash.textContent = formatted;
  if (syncInput && els.startingCashInput && document.activeElement !== els.startingCashInput) {
    els.startingCashInput.value = String(startingCash);
  }
  if (els.startCashPresets) {
    els.startCashPresets.querySelectorAll("[data-start-cash]").forEach((button) => {
      button.classList.toggle("is-selected", Number(button.dataset.startCash) === startingCash);
    });
  }
  if (els.setupPlayers) {
    els.setupPlayers.querySelectorAll(".player-seat strong").forEach((label) => {
      label.textContent = formatted;
    });
  }
}

function isOverlayOpen() {
  return openOverlayCount > 0;
}

function isSidePanelOpen() {
  return Boolean(els.sidePanel && els.sidePanel.classList.contains("is-open"));
}

function turnInMotion() {
  return Boolean(game && ["rolling", "moving", "resolving", "ending"].includes(game.phase));
}

function guardTableAction() {
  if (!turnInMotion()) return false;
  showToast("⏳", "Let the turn finish", "The dice are still doing their work.", "card", 2200);
  return true;
}

function ensureAudio() {
  if (!soundOn) return;
  try {
    if (!audioCtx || audioCtx.state === "closed") {
      const AudioClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioClass) return;
      audioCtx = new AudioClass();
      masterGain = audioCtx.createGain();
      masterGain.gain.value = 0.9;
      masterGain.connect(audioCtx.destination);
      audioCtx.onstatechange = () => updateSoundButton();
    }
    if (!masterGain) {
      masterGain = audioCtx.createGain();
      masterGain.gain.value = 0.9;
      masterGain.connect(audioCtx.destination);
    }
    if (audioCtx.state !== "running") {
      audioCtx.resume().catch(() => {});
    }
  } catch {
    audioCtx = null;
    masterGain = null;
  }
}

function tone(freq, duration, type = "sine", volume = 0.05, endFreq = null, delay = 0) {
  if (!soundOn || !audioCtx || !masterGain) return;
  try {
    const start = audioCtx.currentTime + delay;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, start);
    if (endFreq) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(30, endFreq), start + duration);
    }
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(volume, start + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    osc.connect(gain);
    gain.connect(masterGain);
    osc.start(start);
    osc.stop(start + duration + 0.03);
  } catch {
    audioCtx = null;
    masterGain = null;
  }
}

function playSound(name) {
  if (!soundOn) return;
  ensureAudio();
  if (!audioCtx) return;

  switch (name) {
    case "click":
      tone(620, 0.05, "sine", 0.035, 760);
      break;
    case "tick":
      tone(rand(880, 1260), 0.026, "square", 0.018);
      break;
    case "step":
      tone(rand(180, 250), 0.055, "triangle", 0.035, 150);
      break;
    case "diceLand":
      tone(170, 0.12, "triangle", 0.09, 90);
      tone(840, 0.04, "square", 0.025, null, 0.01);
      break;
    case "cash":
      tone(780, 0.08, "sine", 0.045, 1040);
      tone(1180, 0.1, "sine", 0.03, 1420, 0.07);
      break;
    case "buy":
      tone(523, 0.12, "triangle", 0.055);
      tone(659, 0.12, "triangle", 0.055, null, 0.09);
      tone(784, 0.22, "triangle", 0.06, null, 0.18);
      tone(1046, 0.28, "sine", 0.035, null, 0.29);
      break;
    case "rent":
      tone(430, 0.14, "triangle", 0.05, 310);
      tone(240, 0.22, "sine", 0.04, 180, 0.12);
      break;
    case "card":
      tone(320, 0.16, "sine", 0.04, 470);
      tone(660, 0.2, "triangle", 0.04, 880, 0.12);
      tone(990, 0.26, "sine", 0.025, 1180, 0.24);
      break;
    case "jail":
      tone(130, 0.24, "sawtooth", 0.04, 92);
      tone(112, 0.35, "square", 0.025, 70, 0.18);
      break;
    case "turn":
      tone(392, 0.08, "sine", 0.025);
      tone(523, 0.1, "sine", 0.025, null, 0.07);
      break;
    case "bankrupt":
      tone(220, 0.3, "sawtooth", 0.045, 90);
      tone(110, 0.5, "triangle", 0.04, 55, 0.16);
      break;
    case "win":
      [523, 659, 784, 1046, 1318].forEach((freq, index) => {
        tone(freq, index === 4 ? 0.55 : 0.22, "triangle", 0.055, null, index * 0.13);
      });
      [261, 329, 392].forEach((freq, index) => {
        tone(freq, 0.85, "sine", 0.025, null, 0.55 + index * 0.04);
      });
      break;
    default:
      break;
  }
}

function updateSoundButton() {
  if (!els.soundBtn) return;
  const waiting = soundOn && audioCtx && audioCtx.state !== "running";
  els.soundBtn.setAttribute("aria-pressed", String(soundOn));
  els.soundBtn.classList.toggle("is-waiting", Boolean(waiting));
  els.soundBtn.querySelector(".sound-icon").textContent = soundOn ? "♪" : "∅";
  els.soundBtn.querySelector(".sound-label").textContent = !soundOn
    ? "MUTED"
    : waiting
      ? "TAP FOR SOUND"
      : "SOUND ON";
}

function mountOverlay(innerHtml, options = {}) {
  const {
    cardClass = "dialog-card",
    dismissible = false,
    onClose = null,
    overlayClass = "",
  } = options;

  const overlay = document.createElement("div");
  overlay.className = `overlay ${overlayClass}`.trim();
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.innerHTML = `<div class="modal-card ${cardClass}">${innerHtml}</div>`;
  els.overlayRoot.appendChild(overlay);
  openOverlayCount += 1;
  activeOverlay = overlay;

  let closed = false;
  const previousFocus = document.activeElement;

  const finish = (value = null) => {
    if (closed) return;
    closed = true;
    overlay.classList.remove("is-open");
    openOverlayCount = Math.max(0, openOverlayCount - 1);
    if (activeOverlay === overlay) {
      activeOverlay = els.overlayRoot.lastElementChild === overlay
        ? overlay
        : els.overlayRoot.lastElementChild;
    }
    document.removeEventListener("keydown", onKeyDown);
    setTimeout(() => overlay.remove(), 280);
    if (previousFocus && typeof previousFocus.focus === "function") {
      setTimeout(() => {
        try {
          previousFocus.focus({ preventScroll: true });
        } catch {
        }
      }, 30);
    }
    if (onClose) onClose(value);
  };

  const onKeyDown = (event) => {
    if (event.key === "Escape" && dismissible) finish(null);
  };

  if (dismissible) {
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) finish(null);
    });
    document.addEventListener("keydown", onKeyDown);
  }

  requestAnimationFrame(() => {
    requestAnimationFrame(() => overlay.classList.add("is-open"));
  });

  setTimeout(() => {
    const focusTarget = overlay.querySelector("[data-autofocus]") ||
      overlay.querySelector("button:not([disabled])");
    if (focusTarget) {
      try {
        focusTarget.focus({ preventScroll: true });
      } catch {
      }
    }
  }, 100);

  return { overlay, close: finish };
}

function confirmDialog({ icon, kicker, title, text, confirmLabel = "Continue", confirmClass = "btn-gold", cancelLabel = "Cancel" }) {
  return new Promise((resolve) => {
    let result = false;
    const { overlay, close } = mountOverlay(`
      <div class="notice-card">
        <div class="notice-emblem">${icon}</div>
        <div class="dialog-kicker">${esc(kicker)}</div>
        <h2 class="notice-title">${esc(title)}</h2>
        <p class="notice-text">${text}</p>
        <div class="dialog-actions">
          ${cancelLabel ? `<button class="btn btn-dark" type="button" data-cancel>${esc(cancelLabel)}</button>` : ""}
          <button class="btn ${confirmClass}" type="button" data-confirm data-autofocus>${esc(confirmLabel)}</button>
        </div>
      </div>
    `, {
      cardClass: "dialog-card notice-dialog",
      dismissible: true,
      onClose: () => resolve(result),
    });

    overlay.querySelector("[data-confirm]")?.addEventListener("click", () => {
      result = true;
      playSound("click");
      close();
    });
    overlay.querySelector("[data-cancel]")?.addEventListener("click", () => close());
  });
}

async function showRules() {
  const { overlay, close } = mountOverlay(`
    <div class="dialog-head">
      <div>
        <div class="dialog-kicker">THE HOUSE RULES</div>
        <h2>How to win</h2>
        <p class="dialog-sub">Pass the device after each turn. Everything you need is on the board.</p>
      </div>
      <button class="close-x" type="button" data-close aria-label="Close">×</button>
    </div>
    <div class="rule-grid">
      <div class="rule-item">
        <div class="rule-icon">◎</div>
        <div><strong>THE GOAL</strong><p>Bankrupt every rival. The last tycoon standing takes the city.</p></div>
      </div>
      <div class="rule-item">
        <div class="rule-icon">⚄</div>
        <div><strong>OPENING ORDER</strong><p>Everyone rolls the dice-off. The highest total moves first — ties reroll — then play turns clockwise.</p></div>
      </div>
      <div class="rule-item">
        <div class="rule-icon">$</div>
        <div><strong>STARTING CASH</strong><p>Everyone begins with ${money(rulesStartingCash())}. Collect $200 whenever you pass GO.</p></div>
      </div>
      <div class="rule-item">
        <div class="rule-icon">⌂</div>
        <div><strong>PROPERTY &amp; RENT</strong><p>Buy unowned spaces. Landing on a rival's space pays them rent.</p></div>
      </div>
      <div class="rule-item">
        <div class="rule-icon">✦</div>
        <div><strong>CHANCE &amp; CHEST</strong><p>Official 16-card decks. Water Works and Electric Company bills pay 10× a fresh dice roll.</p></div>
      </div>
      <div class="rule-item">
        <div class="rule-icon">⚄</div>
        <div><strong>DOUBLES</strong><p>Roll doubles and move again. Three doubles in a row sends you to jail.</p></div>
      </div>
      <div class="rule-item">
        <div class="rule-icon">▥</div>
        <div><strong>BUILDING</strong><p>Own a full color set to build houses and hotels. Manage them from your turn panel.</p></div>
      </div>
      <div class="rule-item">
        <div class="rule-icon">⇄</div>
        <div><strong>TRADING &amp; AUCTIONS</strong><p>Trade cash, deeds, and keys before rolling. The receiver pays 10% bank interest on mortgaged deeds. Decline a purchase and it goes to auction.</p></div>
      </div>
      <div class="rule-item">
        <div class="rule-icon">🏦</div>
        <div><strong>MORTGAGES</strong><p>Mortgage unimproved property for half its value. Pay the mortgage plus 10% to lift it.</p></div>
      </div>
      <div class="rule-item">
        <div class="rule-icon">⛓</div>
        <div><strong>JAIL</strong><p>Roll doubles, pay $50, or use a jail card. After three failed rolls, the fee is automatic.</p></div>
      </div>
      <div class="rule-item">
        <div class="rule-icon">⌁</div>
        <div><strong>BANKRUPTCY</strong><p>Owe a player too much? All cash, deeds, buildings, and keys pass to them. Owe the bank? Buildings sell at half price and every deed is auctioned.</p></div>
      </div>
    </div>
    <div class="dialog-actions">
      <button class="btn btn-gold" type="button" data-close data-autofocus>LET'S PLAY</button>
    </div>
  `, {
    cardClass: "dialog-card rules-dialog",
    dismissible: true,
  });

  overlay.querySelectorAll("[data-close]").forEach((button) => {
    button.addEventListener("click", () => {
      playSound("click");
      close();
    });
  });
}

function showAvatarPicker(index) {
  const player = setupPlayers[index];
  const otherAvatars = new Set(
    setupPlayers.slice(0, setupCount).filter((_, i) => i !== index).map((item) => item.avatar)
  );

  const { overlay, close } = mountOverlay(`
    <div class="dialog-head">
      <div>
        <div class="dialog-kicker">PLAYER ${index + 1}</div>
        <h2>Choose a token</h2>
        <p class="dialog-sub">Every tycoon needs a face. Pick one that suits your ambition.</p>
      </div>
      <button class="close-x" type="button" data-close aria-label="Close">×</button>
    </div>
    <div class="avatar-grid">
      ${AVATARS.map((avatar) => `
        <button
          class="avatar-option ${avatar === player.avatar ? "is-selected" : ""}"
          type="button"
          data-avatar="${avatar}"
          ${otherAvatars.has(avatar) ? "disabled" : ""}
          aria-label="Choose ${avatar}"
        >${avatar}</button>
      `).join("")}
    </div>
    <div class="dialog-actions">
      <button class="btn btn-dark" type="button" data-close>CANCEL</button>
    </div>
  `, {
    cardClass: "dialog-card avatar-card",
    dismissible: true,
  });

  overlay.querySelectorAll("[data-close]").forEach((button) => {
    button.addEventListener("click", () => close());
  });

  overlay.querySelectorAll("[data-avatar]").forEach((button) => {
    button.addEventListener("click", () => {
      player.avatar = button.dataset.avatar;
      playSound("click");
      close();
      renderSetupPlayers();
    });
  });
}

function showNotice({ icon, kicker, title, text, amount = null, button = "CONTINUE", tone = "" }) {
  return new Promise((resolve) => {
    const { overlay, close } = mountOverlay(`
      <div class="notice-card ${tone}">
        <div class="notice-emblem">${icon}</div>
        <div class="dialog-kicker">${esc(kicker)}</div>
        <h2 class="notice-title">${esc(title)}</h2>
        <p class="notice-text">${text}</p>
        ${amount !== null ? `<div class="notice-amount">${money(amount)}</div>` : ""}
        <div class="dialog-actions notice-actions">
          <button class="btn ${tone === "danger" ? "btn-danger" : "btn-gold"}" type="button" data-continue data-autofocus>${esc(button)}</button>
        </div>
      </div>
    `, {
      cardClass: "dialog-card notice-dialog",
      dismissible: false,
      onClose: resolve,
    });

    overlay.querySelector("[data-continue]").addEventListener("click", () => {
      playSound("click");
      close();
    });
  });
}

function renderSetupPlayers() {
  els.countPicker.querySelectorAll("button").forEach((button) => {
    button.classList.toggle("is-selected", Number(button.dataset.count) === setupCount);
  });

  els.setupPlayers.innerHTML = setupPlayers.slice(0, setupCount).map((player, index) => `
    <div class="setup-player" style="--pcolor:${player.color}; animation-delay:${index * 55}ms">
      <button class="avatar-button" type="button" data-avatar-index="${index}" aria-label="Change avatar for Player ${index + 1}" title="Change avatar">${player.avatar}</button>
      <div class="player-fields">
        <label for="player-name-${index}">PLAYER ${index + 1}</label>
        <input id="player-name-${index}" data-name-index="${index}" maxlength="16" autocomplete="off" spellcheck="false" value="${esc(player.name)}" />
      </div>
      <div class="player-seat">
        <strong>${money(startingCash)}</strong>
        <span>START</span>
      </div>
    </div>
  `).join("");

  els.setupPlayers.querySelectorAll("[data-avatar-index]").forEach((button) => {
    button.addEventListener("click", () => {
      ensureAudio();
      playSound("click");
      showAvatarPicker(Number(button.dataset.avatarIndex));
    });
  });

  updateSetupCashUI();

  els.setupPlayers.querySelectorAll("[data-name-index]").forEach((input) => {
    input.addEventListener("input", () => {
      const index = Number(input.dataset.nameIndex);
      setupPlayers[index].name = input.value;
    });
    input.addEventListener("blur", () => {
      const index = Number(input.dataset.nameIndex);
      if (!input.value.trim()) {
        setupPlayers[index].name = `Player ${index + 1}`;
        input.value = setupPlayers[index].name;
      }
    });
  });
}

function ensureUniqueSetupAvatars() {
  const used = new Set();
  setupPlayers.slice(0, setupCount).forEach((player) => {
    if (used.has(player.avatar)) {
      const replacement = AVATARS.find((avatar) => !used.has(avatar));
      if (replacement) player.avatar = replacement;
    }
    used.add(player.avatar);
  });
}

function setSetupCount(count) {
  setupCount = count;
  ensureUniqueSetupAvatars();
  ensureAudio();
  playSound("click");
  renderSetupPlayers();
}

function startGameFromSetup() {
  ensureAudio();
  playSound("buy");
  normalizeStartingCash();
  ensureUniqueSetupAvatars();
  const definitions = setupPlayers.slice(0, setupCount).map((player, index) => ({
    name: player.name.trim() || `Player ${index + 1}`,
    avatar: player.avatar,
    color: player.color,
  }));

  setSidePanelOpen(false);
  els.setupScreen.classList.add("is-leaving");
  els.gameScreen.classList.remove("is-hidden");

  launchGame(definitions, startingCash);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => els.gameScreen.classList.add("is-live"));
  });

  setTimeout(() => {
    els.setupScreen.classList.add("is-hidden");
    els.setupScreen.classList.remove("is-leaving");
  }, 680);

}

function showSetup() {
  setSidePanelOpen(false);
  game = null;
  winShown = false;
  els.gameScreen.classList.remove("is-live");
  els.gameScreen.classList.add("is-hidden");
  els.setupScreen.classList.remove("is-hidden", "is-leaving");
  els.overlayRoot.innerHTML = "";
  openOverlayCount = 0;
  activeOverlay = null;
  els.toastStack.innerHTML = "";
  updateSetupCashUI();
  window.scrollTo({ top: 0, behavior: "smooth" });
  renderSetupPlayers();
}

function createGame(definitions, balance) {
  const players = definitions.map((definition, index) => ({
    id: index,
    name: definition.name,
    avatar: definition.avatar,
    color: definition.color || PLAYER_COLORS[index],
    cash: balance,
    position: 0,
    inJail: false,
    jailTurns: 0,
    getOut: 0,
    props: [],
    bankrupt: false,
  }));

  return {
    players,
    board: BOARD.map((tile) => ({
      ...tile,
      rents: tile.rents ? [...tile.rents] : undefined,
      owner: null,
      houses: 0,
      mortgaged: false,
    })),
    active: 0,
    phase: "order",
    diceOff: { totals: {}, candidates: players.map((player) => player.id) },
    startingCash: balance,
    turnDoubles: 0,
    round: 1,
    lastDice: [1, 1],
    chanceDeck: shuffle(CHANCE_CARDS),
    chestDeck: shuffle(CHEST_CARDS),
    log: [],
    note: "",
    gameOver: false,
    winner: null,
    winShown: false,
  };
}

function launchGame(definitions, balance = startingCash) {
  startingCash = normalizeStartingCash(balance, false);
  game = createGame(definitions, startingCash);
  winShown = false;
  setSidePanelOpen(false);
  buildBoard();
  buildTokens();
  setDiceInstant(1, 1);
  renderAll();
  startDiceOff();
}

function startDiceOff() {
  const first = game.players[0];
  game.active = first.id;
  game.note = `${first.name}, roll for the dice-off.`;
  updateUI();
  logEvent("⚄", `The dice-off decides who moves first. <strong>${esc(first.name)}</strong> rolls first.`, {
    sub: `Each tycoon starts with ${money(game.startingCash)}.`,
  });
  showToast("⚄", "Roll for the lead", "Highest total moves first. Ties reroll.", "card", 3000);
  playSound("turn");
}

async function handleOrderRoll() {
  const player = currentPlayer();
  const off = game.diceOff;
  game.phase = "rolling";
  game.note = "";
  updateUI();

  const d1 = rand(1, 6);
  const d2 = rand(1, 6);
  await animateDice(d1, d2);
  game.lastDice = [d1, d2];
  const total = d1 + d2;
  off.totals[player.id] = total;

  logEvent("🎲", `<strong>${esc(player.name)}</strong> rolled ${d1} + ${d2} = <strong>${total}</strong> in the dice-off.`, {
    sub: "Highest total moves first.",
  });
  showToast("🎲", `${player.name} rolled ${total}`, "Rolling for the first move.", "card", 1800);
  await wait(380);
  if (game.gameOver) return;

  const remaining = off.candidates.filter((id) => off.totals[id] === undefined);
  if (remaining.length) {
    const next = game.players[remaining[0]];
    game.active = next.id;
    game.note = `${next.name}, roll for the dice-off.`;
    game.phase = "order";
    updateUI();
    playSound("turn");
    return;
  }

  const best = Math.max(...off.candidates.map((id) => off.totals[id]));
  const tied = off.candidates.filter((id) => off.totals[id] === best);

  if (tied.length > 1) {
    const names = tied.map((id) => game.players[id].name);
    showToast("⚄", `Tie at ${best}`, `${names.join(", ")} roll again.`, "card", 2600);
    logEvent("⚄", `<strong>${names.map((name) => esc(name)).join(", ")}</strong> are tied at ${best}. The dice-off rerolls.`);
    off.candidates = tied;
    const next = game.players[tied[0]];
    game.active = next.id;
    game.note = `${next.name}, roll for the dice-off.`;
    game.phase = "order";
    updateUI();
    playSound("turn");
    return;
  }

  const winner = game.players[tied[0]];
  game.active = winner.id;
  game.phase = "roll";
  game.note = "";
  logEvent("🏁", `<strong>${esc(winner.name)}</strong> won the dice-off and opens the game.`);
  showToast("🏁", `${winner.name} moves first`, "Won the dice-off. Roll to open the game.", "gain", 3200);
  playSound("turn");
  updateUI();
}

function getCoords(index) {
  if (index === 0) return { col: 11, row: 11 };
  if (index < 10) return { col: 11 - index, row: 11 };
  if (index === 10) return { col: 1, row: 11 };
  if (index < 20) return { col: 1, row: 21 - index };
  if (index === 20) return { col: 1, row: 1 };
  if (index < 30) return { col: index - 19, row: 1 };
  if (index === 30) return { col: 11, row: 1 };
  return { col: 11, row: index - 29 };
}

function tileSide(index) {
  if (index === 0 || index === 10 || index === 20 || index === 30) return "corner";
  if (index < 10) return "side-bottom";
  if (index < 20) return "side-left";
  if (index < 30) return "side-top";
  return "side-right";
}

function tileInner(tile) {
  switch (tile.type) {
    case "property": {
      const longestWord = Math.max(...tile.short.split(/\s+/).map((word) => word.length));
      const nameClass = longestWord > 10 ? " is-tighter" : longestWord > 8 ? " is-tight" : "";
      return `
        <div class="tile-band" style="--group-color:${GROUPS[tile.group].color}"></div>
        <div class="tile-content">
          <div class="tile-name${nameClass}">${esc(tile.short)}</div>
          <div class="tile-price">$${tile.price}</div>
          <div class="tile-houses"></div>
        </div>
        <span class="tile-owner-dot"></span>
      `;
    }

    case "railroad": {
      const nameClass = tile.short.length > 12 ? " is-tight" : "";
      return `
        <div class="tile-content">
          <div class="tile-icon">${tile.icon}</div>
          <div class="tile-name${nameClass}">${esc(tile.short)}</div>
          <div class="tile-price">$${tile.price}</div>
        </div>
        <span class="tile-owner-dot"></span>
      `;
    }

    case "utility":
      return `
        <div class="tile-content">
          <div class="tile-icon">${tile.icon}</div>
          <div class="tile-name">${esc(tile.short)}</div>
          <div class="tile-price">$${tile.price}</div>
        </div>
        <span class="tile-owner-dot"></span>
      `;

    case "chance":
      return `
        <div class="tile-content">
          <div class="chance-mark">?</div>
          <div class="tile-kicker">CHANCE</div>
        </div>
      `;

    case "chest":
      return `
        <div class="tile-content">
          <div class="chest-mark">✦</div>
          <div class="tile-kicker">COMMUNITY<br>CHEST</div>
        </div>
      `;

    case "tax":
      return `
        <div class="tile-content">
          <div class="tax-mark">$</div>
          <div class="tile-name">${esc(tile.short)}</div>
          <div class="tile-price">PAY $${tile.amount}</div>
        </div>
      `;

    case "go":
      return `
        <div class="tile-content">
          <div class="go-arrow">↖</div>
          <div class="corner-title">GO</div>
          <div class="corner-sub">COLLECT $200</div>
        </div>
      `;

    case "jail":
      return `
        <div class="tile-content">
          <div class="jail-bars"><i></i><i></i><i></i><i></i></div>
          <div class="corner-title">JAIL</div>
          <div class="corner-sub">JUST VISITING</div>
        </div>
      `;

    case "parking":
      return `
        <div class="tile-content">
          <div class="corner-icon">P</div>
          <div class="corner-title">FREE</div>
          <div class="corner-sub">PARKING</div>
        </div>
      `;

    case "gotojail":
      return `
        <div class="tile-content">
          <div class="corner-icon">🚔</div>
          <div class="corner-title">GO TO</div>
          <div class="corner-sub">JAIL</div>
        </div>
      `;

    default:
      return `<div class="tile-content"><div class="tile-name">${esc(tile.name)}</div></div>`;
  }
}

function buildBoard() {
  tileEls.forEach((element) => element.remove());
  tileEls = [];

  game.board.forEach((tile, index) => {
    const coords = getCoords(index);
    const element = document.createElement("div");
    element.className = `tile ${tileSide(index)} tile-${tile.type}`;
    element.dataset.index = String(index);
    element.style.gridColumn = String(coords.col);
    element.style.gridRow = String(coords.row);
    element.innerHTML = tileInner(tile);

    if (tile.type === "go") element.classList.add("corner-go");
    if (tile.type === "jail") element.classList.add("corner-jail");
    if (tile.type === "parking") element.classList.add("corner-parking");
    if (tile.type === "gotojail") element.classList.add("corner-gotojail");

    els.board.insertBefore(element, els.boardCenter);
    tileEls[index] = element;
  });
}

function buildTokens() {
  els.tokensLayer.innerHTML = "";
  game.players.forEach((player) => {
    const token = document.createElement("div");
    token.className = "token";
    token.dataset.playerId = String(player.id);
    token.style.setProperty("--player-color", player.color);
    token.textContent = player.avatar;
    token.title = player.name;
    token.setAttribute("aria-label", player.name);
    els.tokensLayer.appendChild(token);
  });
  updateTokenPositions();
}

function updateTokenPositions() {
  if (!game) return;
  game.players.forEach((player) => {
    const token = els.tokensLayer.querySelector(`[data-player-id="${player.id}"]`);
    if (!token) return;
    const { col, row } = getCoords(player.position);
    let left = ((col - 0.5) / 11) * 100;
    let top = ((row - 0.5) / 11) * 100;
    const shift = 2.7;
    const isActive = !game.gameOver && player.id === game.active && !player.bankrupt;

    if (!isActive) {
      if (player.position >= 1 && player.position <= 9) top -= shift;
      else if (player.position >= 11 && player.position <= 19) left += shift;
      else if (player.position >= 21 && player.position <= 29) top += shift;
      else if (player.position >= 31 && player.position <= 39) left -= shift;
    }

    token.style.left = `${left}%`;
    token.style.top = `${top}%`;
    token.classList.toggle("is-active", isActive);
    token.classList.toggle("is-bankrupt", player.bankrupt);
  });
}

function renderBoard() {
  if (!game) return;
  const activePlayer = currentPlayer();

  game.board.forEach((tile, index) => {
    const element = tileEls[index];
    if (!element) return;

    const owner = tile.owner !== null ? game.players[tile.owner] : null;
    element.classList.toggle("is-owned", Boolean(owner));
    element.classList.toggle("is-mortgaged", Boolean(tile.mortgaged));
    element.classList.toggle("is-active", !game.gameOver && activePlayer && activePlayer.position === index);
    element.style.setProperty("--owner-color", owner ? owner.color : "transparent");

    const ownerDot = element.querySelector(".tile-owner-dot");
    if (ownerDot) {
      ownerDot.textContent = owner ? owner.avatar : "";
      ownerDot.style.setProperty("--owner-color", owner ? owner.color : "transparent");
      ownerDot.title = owner ? `Owned by ${owner.name}` : "";
    }

    const houseBox = element.querySelector(".tile-houses");
    if (houseBox) {
      if (tile.houses === 5) {
        houseBox.innerHTML = `<span class="house-pip hotel"></span>`;
      } else {
        houseBox.innerHTML = Array.from({ length: tile.houses }, () => `<span class="house-pip"></span>`).join("");
      }
    }
  });
}

function renderPlayers() {
  if (!game) return;
  els.playersList.innerHTML = game.players.map((player) => {
    const active = !game.gameOver && player.id === game.active;
    const status = player.bankrupt
      ? "BANKRUPT"
      : active
        ? "ON THE CLOCK"
        : player.inJail
          ? "IN JAIL"
          : `${player.props.length} DEED${player.props.length === 1 ? "" : "S"}`;

    return `
      <div class="player-card ${active ? "is-active" : ""} ${player.bankrupt ? "is-bankrupt" : ""}" style="--pcolor:${player.color}" data-player-card="${player.id}">
        <div class="player-avatar">${player.avatar}</div>
        <div class="player-info">
          <div class="player-name">${esc(player.name)}</div>
          <div class="player-sub">
            <span>${player.props.length} prop${player.props.length === 1 ? "" : "s"}</span>
            <i></i>
            <span>${player.getOut} key${player.getOut === 1 ? "" : "s"}</span>
          </div>
        </div>
        <div class="player-money">
          <div class="player-cash" data-player-cash="${player.id}">${money(player.cash)}</div>
          <div class="player-status">${status}</div>
        </div>
        ${player.inJail && !player.bankrupt ? `<span class="player-jail" title="In jail">⛓</span>` : ""}
      </div>
    `;
  }).join("");
  renderMiniScoreboard();
  renderInfoRails();
}

function renderMiniScoreboard() {
  if (!game || !els.miniScoreboard) return;
  els.miniScoreboard.innerHTML = game.players.map((player) => {
    const active = !game.gameOver && player.id === game.active;
    return `
      <div class="mini-player ${active ? "is-active" : ""} ${player.bankrupt ? "is-bankrupt" : ""}" style="--pcolor:${player.color}" title="${esc(player.name)} · ${money(player.cash)}">
        <span class="mini-avatar">${player.avatar}</span>
        <span class="mini-name">${esc(player.name)}</span>
        <span class="mini-cash">${money(player.cash)}</span>
      </div>
    `;
  }).join("");
}

function setSidePanelOpen(open) {
  if (!els.sidePanel) return;
  const wasOpen = isSidePanelOpen();
  const shouldOpen = Boolean(open && game);
  els.sidePanel.classList.toggle("is-open", shouldOpen);
  els.drawerBackdrop.classList.toggle("is-open", shouldOpen);
  els.tableBtn.setAttribute("aria-expanded", String(shouldOpen));
  if (shouldOpen) {
    renderPlayers();
    renderFeed();
    setTimeout(() => els.sidePanelClose.focus({ preventScroll: true }), 120);
  } else if (wasOpen) {
    els.tableBtn.focus({ preventScroll: true });
  }
}

function openSidePanel() {
  setSidePanelOpen(true);
}

function closeSidePanel() {
  setSidePanelOpen(false);
}

function toggleSidePanel() {
  if (!game) return;
  setSidePanelOpen(!els.sidePanel.classList.contains("is-open"));
}

function groupOwnedProperties(player) {
  const groups = new Map();
  [...player.props].sort((a, b) => a - b).forEach((index) => {
    const tile = game.board[index];
    const key = tile.type === "property" ? tile.group : tile.type;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(index);
  });
  return groups;
}

function renderPortfolioRail() {
  if (!game || !els.portfolioList) return;
  const ownedCount = game.board.filter((tile) => tile.owner !== null).length;
  const scrollTop = els.portfolioList.scrollTop;
  els.portfolioMeta.textContent = `${ownedCount} DEED${ownedCount === 1 ? "" : "S"}`;

  els.portfolioList.innerHTML = game.players.map((player) => {
    const active = !game.gameOver && player.id === game.active;
    const groups = groupOwnedProperties(player);
    let content = "";

    if (!player.props.length) {
      content = `<div class="portfolio-empty">No deeds yet</div>`;
    } else {
      content = [...groups.entries()].map(([key, indices]) => {
        const first = game.board[indices[0]];
        const groupColor = first.type === "property"
          ? GROUPS[first.group].color
          : first.type === "railroad"
            ? "#59625a"
            : "#6f8063";
        const groupName = first.type === "property"
          ? GROUPS[first.group].name
          : first.type === "railroad"
            ? "Railroads"
            : "Utilities";

        const cards = indices.map((index) => {
          const tile = game.board[index];
          const houseCount = tile.type === "property" ? tile.houses : 0;
          const houseMarkup = houseCount === 5
            ? `<span class="land-house hotel"></span>`
            : Array.from({ length: houseCount }, () => `<span class="land-house"></span>`).join("");
          const meta = tile.type === "property"
            ? houseCount === 5
              ? "HOTEL"
              : houseCount > 0
                ? `${houseCount} HOUSE${houseCount === 1 ? "" : "S"}`
                : money(tile.price)
            : tile.type === "railroad"
              ? "RAILROAD"
              : "UTILITY";

          return `
            <div class="land-card" style="--land-color:${groupColor}">
              <span class="land-card-band"></span>
              <span class="land-card-name">${esc(tile.short)}</span>
              <span class="land-card-meta"><span>${meta}</span><span class="land-house-row">${houseMarkup}</span></span>
            </div>
          `;
        }).join("");

        return `
          <div class="portfolio-group">
            <div class="portfolio-group-head">
              <i style="--group-color:${groupColor}"></i>
              <span>${groupName}</span>
              <small>${indices.length}</small>
            </div>
            <div class="portfolio-cards">${cards}</div>
          </div>
        `;
      }).join("");
    }

    return `
      <section class="portfolio-player ${active ? "is-active" : ""} ${player.bankrupt ? "is-bankrupt" : ""}" style="--pcolor:${player.color}">
        <header class="portfolio-head">
          <span class="portfolio-avatar">${player.avatar}</span>
          <div class="portfolio-name">
            <strong>${esc(player.name)}</strong>
            <span>${money(player.cash)} · ${player.props.length} deed${player.props.length === 1 ? "" : "s"}</span>
          </div>
          ${active ? `<i class="portfolio-live">LIVE</i>` : ""}
        </header>
        ${content}
      </section>
    `;
  }).join("");
  els.portfolioList.scrollTop = scrollTop;
}

function renderStatsRail() {
  if (!game || !els.statsPanel) return;

  const purchasable = game.board.filter((tile) => ["property", "railroad", "utility"].includes(tile.type));
  const owned = purchasable.filter((tile) => tile.owner !== null);
  let houses = 0;
  let hotels = 0;
  game.board.forEach((tile) => {
    if (tile.type !== "property") return;
    if (tile.houses === 5) hotels += 1;
    else houses += tile.houses;
  });

  const cashInPlay = game.players.reduce((total, player) => total + Math.max(0, player.cash), 0);
  const jailed = game.players.filter((player) => player.inJail && !player.bankrupt).length;
  const bankrupt = game.players.filter((player) => player.bankrupt).length;

  const scrollTop = els.statsPanel.scrollTop;
  els.statsRound.textContent = game.gameOver ? "FINAL" : `ROUND ${game.round}`;
  els.statsPanel.innerHTML = `
    <div class="stats-feature">
      <span>CASH IN CIRCULATION</span>
      <strong>${money(cashInPlay)}</strong>
      <small>Across ${game.players.filter((player) => !player.bankrupt).length} active tycoon${game.players.filter((player) => !player.bankrupt).length === 1 ? "" : "s"}</small>
    </div>
    <div class="stats-grid">
      <div class="stat-tile"><span>HOUSES</span><strong>${houses}</strong></div>
      <div class="stat-tile"><span>HOTELS</span><strong>${hotels}</strong></div>
      <div class="stat-tile"><span>DEEDS OWNED</span><strong>${owned.length}</strong></div>
      <div class="stat-tile"><span>UNOWNED</span><strong>${purchasable.length - owned.length}</strong></div>
      <div class="stat-tile"><span>IN JAIL</span><strong>${jailed}</strong></div>
      <div class="stat-tile"><span>BANKRUPT</span><strong>${bankrupt}</strong></div>
    </div>
    <div class="stats-subhead">BY TYCOON</div>
    ${game.players.map((player) => {
      const active = !game.gameOver && player.id === game.active;
      const buildings = countBuildings(player);
      const status = player.bankrupt
        ? "Bankrupt"
        : player.inJail
          ? "In jail"
          : `${player.props.length} deed${player.props.length === 1 ? "" : "s"}`;
      return `
        <div class="tycoon-row ${active ? "is-active" : ""} ${player.bankrupt ? "is-bankrupt" : ""}" style="--pcolor:${player.color}">
          <div class="tycoon-main">
            <span class="tycoon-avatar">${player.avatar}</span>
            <div class="tycoon-copy">
              <strong>${esc(player.name)}</strong>
              <small>${status}</small>
            </div>
            <span class="tycoon-cash">${money(player.cash)}</span>
          </div>
          <div class="tycoon-buildings">
            <span class="building-chip"><i></i><b>${buildings.houses}</b> house${buildings.houses === 1 ? "" : "s"}</span>
            <span class="building-chip hotel-chip"><i></i><b>${buildings.hotels}</b> hotel${buildings.hotels === 1 ? "" : "s"}</span>
          </div>
        </div>
      `;
    }).join("")}
  `;
  els.statsPanel.scrollTop = scrollTop;
}

function renderInfoRails() {
  renderPortfolioRail();
  renderStatsRail();
}

function renderCenter() {
  if (!game) return;
  const player = currentPlayer();
  const inJail = player.inJail && !player.bankrupt;
  const phase = game.phase;

  els.turnAvatar.textContent = player.avatar;
  els.turnAvatar.style.setProperty("--active-color", player.color);
  els.turnAvatar.style.background = `radial-gradient(circle at 34% 25%, rgba(255,255,255,.24), transparent 35%), ${player.color}`;
  els.turnName.textContent = player.name;
  els.turnCash.textContent = money(player.cash);
  els.turnPropCount.textContent = String(player.props.length);
  els.turnEyebrow.textContent = game.gameOver
    ? "GAME OVER"
    : inJail
      ? `IN JAIL · ATTEMPT ${Math.min(player.jailTurns + 1, 3)} OF 3`
      : `${player.name.toUpperCase()}'S TURN`;
  els.roundChip.textContent = game.gameOver ? "FINAL" : `ROUND ${game.round}`;

  const disabled = (phase !== "roll" && phase !== "order") || game.gameOver;
  els.rollBtn.disabled = disabled;
  els.tradeBtn.disabled = game.gameOver || phase !== "roll" || game.players.filter((item) => !item.bankrupt && item.id !== player.id).length === 0;
  els.drawerTradeBtn.disabled = els.tradeBtn.disabled;

  if (game.gameOver) {
    els.rollBtnLabel.textContent = "GAME OVER";
  } else if (phase === "rolling") {
    els.rollBtnLabel.textContent = "ROLLING...";
  } else if (phase === "moving") {
    els.rollBtnLabel.textContent = "ON THE MOVE";
  } else if (phase === "resolving") {
    els.rollBtnLabel.textContent = "MAKING DEALS";
  } else if (phase === "ending") {
    els.rollBtnLabel.textContent = "PASSING THE DICE";
  } else if (phase === "order") {
    els.rollBtnLabel.textContent = "ROLLING FOR THE LEAD";
  } else if (inJail) {
    els.rollBtnLabel.textContent = "ROLL FOR DOUBLES";
  } else {
    els.rollBtnLabel.textContent = "ROLL THE DICE";
  }

  const showJailActions = inJail && phase === "roll" && !game.gameOver;
  els.jailActions.classList.toggle("is-visible", showJailActions);
  els.payJailBtn.disabled = !showJailActions || player.cash < JAIL_FEE;
  els.useJailCardBtn.disabled = !showJailActions || player.getOut <= 0;
  els.useJailCardBtn.textContent = player.getOut > 0 ? `Use jail card (${player.getOut})` : "Use jail card";

  if (game.gameOver) {
    els.turnHint.textContent = game.winner ? `${game.winner.name} owns the city.` : "The game is over.";
  } else if (game.note) {
    els.turnHint.textContent = game.note;
  } else if (showJailActions) {
    els.turnHint.textContent = "Roll doubles, pay $50, or use a key card to get out.";
  } else if (phase === "roll") {
    els.turnHint.textContent = "Doubles earn another turn. Passing GO pays $200.";
  } else if (phase === "rolling") {
    els.turnHint.textContent = "Fortune is tumbling…";
  } else if (phase === "moving") {
    els.turnHint.textContent = "Watch your token. Every stop matters.";
  } else if (phase === "resolving") {
    els.turnHint.textContent = "Reading the fine print…";
  } else if (phase === "order") {
    els.turnHint.textContent = "Rolling for the lead — highest total moves first.";
  } else {
    els.turnHint.textContent = "Next tycoon, step up.";
  }

  els.turnConsole.classList.toggle("is-thinking", Boolean(game.note));
  els.assetsBtn.disabled = game.gameOver || phase !== "roll";
}

function renderAll() {
  renderBoard();
  renderPlayers();
  updateTokenPositions();
  renderCenter();
}

function updateUI() {
  if (!game) return;
  renderBoard();
  renderPlayers();
  updateTokenPositions();
  renderCenter();
}

function renderFeed() {
  if (!game) return;
  if (!game.log.length) {
    els.eventFeed.innerHTML = `<div class="feed-empty">The story begins...</div>`;
    return;
  }
  els.eventFeed.innerHTML = game.log.slice(-40).map((item) => `
    <div class="event-item">
      <span class="event-icon">${item.icon}</span>
      <div class="event-copy">${item.text}${item.sub ? `<small>${esc(item.sub)}</small>` : ""}</div>
    </div>
  `).join("");
  els.eventFeed.scrollTop = els.eventFeed.scrollHeight;
}

function logEvent(icon, text, options = {}) {
  if (!game) return;
  game.log.push({ icon, text, sub: options.sub || "" });
  if (game.log.length > 60) game.log.shift();
  renderFeed();
}

function showToast(icon, title, subtitle, tone = "", duration = 2800) {
  const toast = document.createElement("div");
  toast.className = `toast ${tone ? `tone-${tone}` : ""}`;
  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <span class="toast-copy"><strong>${esc(title)}</strong><span>${esc(subtitle)}</span></span>
  `;
  els.toastStack.appendChild(toast);
  setTimeout(() => {
    toast.classList.add("is-out");
    setTimeout(() => toast.remove(), 280);
  }, duration);
}

function showFloat(player, text, tone = "gain") {
  const token = els.tokensLayer?.querySelector(`[data-player-id="${player.id}"]`);
  if (!token) return;
  const rect = token.getBoundingClientRect();
  const float = document.createElement("div");
  float.className = `float-text ${tone}`;
  float.textContent = text;
  float.style.left = `${rect.left + rect.width / 2}px`;
  float.style.top = `${rect.top - 2}px`;
  document.body.appendChild(float);
  setTimeout(() => float.remove(), 1550);
}

function flashCash(playerId, direction) {
  const cash = els.playersList.querySelector(`[data-player-cash="${playerId}"]`);
  if (!cash) return;
  cash.classList.add(direction === "up" ? "is-up" : "is-down");
  setTimeout(() => cash.classList.remove("is-up", "is-down"), 500);
}

function changeCash(player, delta, options = {}) {
  const { sound = true, float = true } = options;
  player.cash += delta;
  if (float) {
    showFloat(player, `${delta > 0 ? "+" : "-"}${money(Math.abs(delta))}`, delta > 0 ? "gain" : "loss");
  }
  if (sound) playSound(delta > 0 ? "cash" : "rent");
  renderPlayers();
  renderCenter();
  flashCash(player.id, delta > 0 ? "up" : "down");
}

async function handleRoll() {
  if (!game || game.gameOver || isOverlayOpen()) return;
  if (game.phase === "order") {
    await handleOrderRoll();
    return;
  }
  if (game.phase !== "roll") return;
  const player = currentPlayer();
  if (player.bankrupt) return;
  if (player.inJail) {
    await handleJailRoll(player);
    return;
  }

  game.phase = "rolling";
  game.note = "";
  updateUI();

  const d1 = rand(1, 6);
  const d2 = rand(1, 6);
  await animateDice(d1, d2);
  game.lastDice = [d1, d2];
  const isDouble = d1 === d2;
  const total = d1 + d2;

  logEvent("🎲", `<strong>${esc(player.name)}</strong> rolled ${d1} + ${d2} = <strong>${total}</strong>.`, {
    sub: isDouble ? "Doubles — another roll is coming." : "",
  });

  if (isDouble) {
    game.turnDoubles += 1;
    if (game.turnDoubles === 3) {
      game.phase = "resolving";
      game.note = "Three doubles. The police are not amused.";
      updateUI();
      await wait(420);
      await sendToJail(player, "Three doubles in a row.", true);
      if (!game.gameOver) await endTurn();
      return;
    }
  }

  game.phase = "moving";
  updateUI();
  await movePlayerBy(player, total);

  if (game.gameOver) return;

  game.phase = "resolving";
  updateUI();
  await resolveLanding(player, total);

  if (game.gameOver) return;
  if (player.bankrupt) {
    await endTurn();
    return;
  }

  if (isDouble && !player.inJail) {
    game.phase = "roll";
    game.note = "Doubles. Roll again.";
    game.turnDoubles = Math.max(1, game.turnDoubles);
    updateUI();
    playSound("turn");
    return;
  }

  await endTurn();
}

async function handleJailRoll(player) {
  game.phase = "rolling";
  game.note = "";
  updateUI();

  const d1 = rand(1, 6);
  const d2 = rand(1, 6);
  await animateDice(d1, d2);
  game.lastDice = [d1, d2];
  const isDouble = d1 === d2;
  const total = d1 + d2;

  logEvent("🎲", `<strong>${esc(player.name)}</strong> rolled ${d1} + ${d2} in jail.`);

  if (isDouble) {
    player.inJail = false;
    player.jailTurns = 0;
    updateUI();
    playSound("cash");
    showToast("🗝️", "Free at last", `${player.name} rolled doubles and walks out of jail.`, "gain");
    logEvent("🗝️", `<strong>${esc(player.name)}</strong> rolled doubles and left jail.`);
    game.phase = "moving";
    game.note = "Doubles! You are free — move your token.";
    updateUI();
    await movePlayerBy(player, total);
    game.phase = "resolving";
    updateUI();
    await resolveLanding(player, total);
    if (!game.gameOver) await endTurn();
    return;
  }

  player.jailTurns += 1;
  if (player.jailTurns >= 3) {
    game.note = "Third failed attempt. The $50 fee is automatic.";
    updateUI();
    await wait(500);
    const paid = await payBank(player, JAIL_FEE, "mandatory jail release fee");
    if (!paid || game.gameOver) {
      if (!game.gameOver) await endTurn();
      return;
    }
    player.inJail = false;
    player.jailTurns = 0;
    showToast("⛓", "Door opens — at a price", "$50 paid. Roll again to move.", "loss");
    logEvent("⛓", `<strong>${esc(player.name)}</strong> paid $50 and left jail after three attempts.`);
    game.phase = "moving";
    game.note = "Released. Move the dice total.";
    updateUI();
    await movePlayerBy(player, total);
    game.phase = "resolving";
    updateUI();
    await resolveLanding(player, total);
    if (!game.gameOver) await endTurn();
    return;
  }

  game.phase = "ending";
  game.note = `No doubles. Jail attempt ${player.jailTurns} of 3 is spent.`;
  updateUI();
  showToast("⛓", "No doubles", `Attempt ${player.jailTurns} of 3. The cell stays locked.`, "loss");
  logEvent("⛓", `<strong>${esc(player.name)}</strong> failed a jail roll (${player.jailTurns}/3).`);
  await wait(900);
  if (!game.gameOver) advanceTurn();
}

async function payJailFee() {
  if (!game || game.gameOver || game.phase !== "roll" || isOverlayOpen()) return;
  const player = currentPlayer();
  if (!player.inJail || player.cash < JAIL_FEE) return;
  const paid = await payBank(player, JAIL_FEE, "jail release fee");
  if (!paid || game.gameOver) return;
  player.inJail = false;
  player.jailTurns = 0;
  game.phase = "roll";
  game.note = "Released. Roll the dice.";
  updateUI();
  showToast("💵", "Bail posted", "$50 paid. You may roll normally now.", "loss");
  logEvent("💵", `<strong>${esc(player.name)}</strong> paid $50 bail.`);
}

function useJailCard() {
  if (!game || game.gameOver || game.phase !== "roll" || isOverlayOpen()) return;
  const player = currentPlayer();
  if (!player.inJail || player.getOut <= 0) return;
  player.getOut -= 1;
  player.inJail = false;
  player.jailTurns = 0;
  game.phase = "roll";
  game.note = "The key worked. Roll the dice.";
  updateUI();
  playSound("cash");
  showToast("🗝️", "Walk free", `${player.name} used a Get Out of Jail Free card.`, "gain");
  logEvent("🗝️", `<strong>${esc(player.name)}</strong> used a Get Out of Jail Free card.`);
}

async function endTurn() {
  if (!game || game.gameOver) return;
  game.phase = "ending";
  game.note = "Turn complete.";
  updateUI();
  await wait(620);
  if (!game || game.gameOver) return;
  advanceTurn();
}

function advanceTurn() {
  if (!game || game.gameOver) return;
  let next = game.active;
  do {
    next = (next + 1) % game.players.length;
  } while (game.players[next].bankrupt && next !== game.active);

  if (next <= game.active) game.round += 1;
  game.active = next;
  game.turnDoubles = 0;
  game.phase = "roll";
  game.note = "";

  const player = currentPlayer();
  if (player.inJail) {
    game.note = `Jail attempt ${Math.min(player.jailTurns + 1, 3)} of 3.`;
  }

  updateUI();
  playSound("turn");
  logEvent("◆", `<strong>${esc(player.name)}</strong>'s turn.`, {
    sub: player.inJail ? "Currently in jail." : `Balance ${money(player.cash)}.`,
  });
}

async function movePlayerBy(player, steps, options = {}) {
  const { collectGo = true, animate = true } = options;
  if (!steps) return;
  const direction = steps > 0 ? 1 : -1;
  const token = els.tokensLayer.querySelector(`[data-player-id="${player.id}"]`);
  if (token) token.classList.add("is-moving");

  for (let i = 0; i < Math.abs(steps); i += 1) {
    const previous = player.position;
    player.position = (player.position + direction + 40) % 40;

    if (collectGo && direction > 0 && player.position === 0 && previous !== 0) {
      changeCash(player, GO_SALARY, { sound: true });
      showToast("💵", "Passed GO", `${player.name} collected $200.`, "gain", 2400);
      logEvent("💵", `<strong>${esc(player.name)}</strong> passed GO and collected $200.`);
    }

    updateTokenPositions();
    renderBoard();
    renderCenter();
    playSound("step");
    if (animate) await wait(185);
  }

  if (token) token.classList.remove("is-moving");
  if (!animate) updateUI();
}

async function movePlayerTo(player, target, options = {}) {
  if (player.position === target) return;
  const steps = (target - player.position + 40) % 40;
  await movePlayerBy(player, steps, options);
}

async function sendToJail(player, reason, showModal = true) {
  player.position = 10;
  player.inJail = true;
  player.jailTurns = 0;
  updateUI();
  playSound("jail");
  logEvent("🚔", `<strong>${esc(player.name)}</strong> was sent to jail.`, { sub: reason });
  showToast("🚔", "Go directly to jail", reason, "loss", 3400);
  if (showModal) {
    await showNotice({
      icon: "⛓",
      kicker: "THE CITY'S FINEST",
      title: "Go directly to jail.",
      text: `${esc(player.name)}, do not pass GO and do not collect $200. You may try for doubles, post bail, or use a key on your next turn.`,
      button: "SERVE TIME",
      tone: "danger",
    });
  }
}

async function resolveLanding(player, diceTotal, options = {}) {
  if (!game || game.gameOver) return;
  const tile = game.board[player.position];
  const { rentMultiplier = 1, utilityTenfold = false } = options;
  game.note = `Landed on ${tile.name}.`;
  updateUI();
  await wait(380);
  if (!game || game.gameOver) return;

  switch (tile.type) {
    case "property":
    case "railroad":
    case "utility":
      await resolveProperty(player, tile, diceTotal, rentMultiplier, utilityTenfold);
      break;

    case "chance":
      await drawFateCard("chance", player);
      break;

    case "chest":
      await drawFateCard("chest", player);
      break;

    case "tax":
      await handleTax(player, tile);
      break;

    case "gotojail":
      game.phase = "resolving";
      updateUI();
      await sendToJail(player, "You landed on Go To Jail.", true);
      break;

    case "go":
      showToast("🏁", "Back at GO", "The city keeps turning. Roll again next turn.", "gain");
      logEvent("🏁", `<strong>${esc(player.name)}</strong> landed on GO.`);
      await wait(650);
      break;

    case "jail":
      showToast("👋", "Just visiting", "No chains today. Keep moving.", "", 2200);
      logEvent("👋", `<strong>${esc(player.name)}</strong> is just visiting the jail.`);
      await wait(500);
      break;

    case "parking":
      showToast("🅿️", "Free parking", "A rare moment of peace in the city.", "", 2200);
      logEvent("🅿️", `<strong>${esc(player.name)}</strong> took a breather at Free Parking.`);
      await wait(500);
      break;

    default:
      break;
  }

  if (game && !game.gameOver) {
    game.note = "";
    renderCenter();
  }
}

async function resolveProperty(player, tile, diceTotal, rentMultiplier, utilityTenfold) {
  const owner = tile.owner !== null ? game.players[tile.owner] : null;

  if (!owner) {
    await offerPurchase(player, tile);
    return;
  }

  if (owner.id === player.id) {
    showToast("🏠", "Home sweet home", `${tile.name} is already yours.`, "gain", 2200);
    logEvent("🏠", `<strong>${esc(player.name)}</strong> landed on their own ${tile.name}.`);
    await wait(450);
    return;
  }

  if (tile.mortgaged) {
    showToast("🏦", "Mortgaged property", `${tile.name} is mortgaged — no rent is due.`, "card", 2600);
    logEvent("🏦", `<strong>${esc(tile.name)}</strong> is mortgaged. No rent was collected.`);
    await wait(650);
    return;
  }

  const rent = calculateRent(tile, owner, diceTotal, { rentMultiplier, utilityTenfold });
  const paid = await showDeedModal(tile, {
    mode: "rent",
    player,
    owner,
    rent,
    multiplier: rentMultiplier,
    utilityTenfold,
  });

  if (paid === false || game.gameOver) return;

  game.phase = "resolving";
  game.note = `Rent is due to ${owner.name}.`;
  updateUI();
  playSound("rent");
  const success = await payMoney(player, owner, rent, `rent at ${tile.name}`);

  if (success) {
    logEvent("🏠", `<strong>${esc(player.name)}</strong> paid <strong>${money(rent)}</strong> rent to <strong>${esc(owner.name)}</strong>.`, {
      sub: tile.name,
    });
    showToast("💸", "Rent paid", `${money(rent)} went to ${owner.name}.`, "loss", 2600);
    await wait(500);
  }
}

async function offerPurchase(player, tile) {
  const affordable = player.cash >= tile.price;
  const buy = await showDeedModal(tile, {
    mode: "buy",
    player,
    affordable,
  });

  if (!buy) {
    logEvent("↷", `<strong>${esc(player.name)}</strong> passed on ${tile.name}.`, {
      sub: "The deed goes to auction.",
    });
    await runAuction(tile, player);
    return;
  }

  if (player.cash < tile.price) return;

  player.cash -= tile.price;
  tile.owner = player.id;
  player.props.push(game.board.indexOf(tile));
  updateUI();
  playSound("buy");
  showFloat(player, `-${money(tile.price)}`, "loss");
  showToast("🏛️", "Property acquired", `${player.name} now owns ${tile.name}.`, "gain", 3000);
  logEvent("🏛️", `<strong>${esc(player.name)}</strong> bought <strong>${tile.name}</strong> for <strong>${money(tile.price)}</strong>.`);
  burstConfetti(window.innerWidth / 2, window.innerHeight * 0.35, 42, [player.color, "#f3d88d", "#fff4d8"]);
  await wait(650);
}

async function handleTax(player, tile) {
  game.phase = "resolving";
  updateUI();

  await showNotice({
    icon: "🧾",
    kicker: "MUNICIPAL NOTICE",
    title: tile.name,
    text: `The city has reviewed your books and found them... profitable. Settle the bill before you continue.`,
    amount: tile.amount,
    button: `PAY ${money(tile.amount)}`,
  });

  const paid = await payBank(player, tile.amount, tile.name);
  if (paid && !game.gameOver) {
    logEvent("💸", `<strong>${esc(player.name)}</strong> paid <strong>${money(tile.amount)}</strong> in ${tile.name.toLowerCase()}.`);
    showToast("💸", tile.name, `${money(tile.amount)} paid to the city.`, "loss", 2400);
    await wait(400);
  }
}

async function drawFateCard(type, player) {
  const deck = type === "chance" ? game.chanceDeck : game.chestDeck;
  if (!deck.length) {
    deck.push(...shuffle(type === "chance" ? CHANCE_CARDS : CHEST_CARDS));
  }
  const card = deck.shift();
  const stack = type === "chance" ? els.chanceDeck : els.chestDeck;

  stack.classList.add("is-drawing");
  setTimeout(() => stack.classList.remove("is-drawing"), 700);
  playSound("card");
  await wait(380);

  const effect = cardEffectLabel(card, player);
  await showFateCard(type, card, effect);
  if (!game || game.gameOver) return;

  logEvent(type === "chance" ? "❓" : "✦", `<strong>${esc(player.name)}</strong> drew ${type === "chance" ? "Chance" : "Community Chest"}: <strong>${esc(card.title)}</strong>`, {
    sub: card.effect,
  });

  await applyCard(card, player, type);
}

function cardEffectLabel(card, player) {
  if (card.action === "repairs") {
    const { houses, hotels } = countBuildings(player);
    return `PAY ${money(houses * card.perHouse + hotels * card.perHotel)}`;
  }
  return card.effect;
}

function showFateCard(type, card, effectLabel) {
  return new Promise((resolve) => {
    const chance = type === "chance";
    const { overlay, close } = mountOverlay(`
      <div class="fate-top">
        <div class="fate-brand">
          <span>${chance ? "OPPORTUNITY" : "THE COMMUNITY"}</span>
          <strong>${chance ? "Chance" : "Community Chest"}</strong>
        </div>
        <div class="fate-icon">${card.icon}</div>
      </div>
      <div class="fate-body">
        <div class="fate-kicker">${chance ? "FORTUNE FAVORS THE BOLD" : "A LETTER FROM THE CITY"}</div>
        <h2 class="fate-title">${esc(card.title)}</h2>
        <div class="fate-rule"></div>
        <p class="fate-text">${esc(card.text)}</p>
        <div class="fate-effect">${esc(effectLabel)}</div>
      </div>
      <div class="fate-actions">
        <button class="btn" type="button" data-continue data-autofocus>ACCEPT MY FATE</button>
        <div class="fate-footnote">${chance ? "CHANCE · DECK" : "COMMUNITY CHEST · DECK"}</div>
      </div>
    `, {
      cardClass: `fate-card ${chance ? "chance" : "chest"}`,
      overlayClass: "fate-overlay",
      dismissible: false,
      onClose: resolve,
    });

    overlay.querySelector("[data-continue]").addEventListener("click", () => {
      playSound("click");
      close();
    });
  });
}

async function applyCard(card, player, type) {
  if (!game || game.gameOver) return;
  game.phase = "resolving";
  updateUI();

  switch (card.action) {
    case "money": {
      if (card.amount >= 0) {
        changeCash(player, card.amount);
        showToast("💵", "Money in", `${player.name} collected ${money(card.amount)}.`, "gain", 2400);
        logEvent("💵", `<strong>${esc(player.name)}</strong> collected <strong>${money(card.amount)}</strong>.`);
      } else {
        const paid = await payBank(player, Math.abs(card.amount), card.title);
        if (paid && !game.gameOver) {
          showToast("💸", "Money out", `${player.name} paid ${money(Math.abs(card.amount))}.`, "loss", 2400);
          logEvent("💸", `<strong>${esc(player.name)}</strong> paid <strong>${money(Math.abs(card.amount))}</strong>.`);
        }
      }
      await wait(450);
      break;
    }

    case "move": {
      await movePlayerTo(player, card.target);
      if (!game || game.gameOver) return;
      await resolveLanding(player, game.lastDice[0] + game.lastDice[1]);
      break;
    }

    case "back": {
      await movePlayerBy(player, -card.steps);
      if (!game || game.gameOver) return;
      await resolveLanding(player, game.lastDice[0] + game.lastDice[1]);
      break;
    }

    case "nearest": {
      const targets = card.nearest === "railroad" ? [5, 15, 25, 35] : card.nearest === "water" ? [28] : [12];
      let target = targets.find((index) => index > player.position);
      if (target === undefined) target = targets[0];
      await movePlayerTo(player, target);
      if (!game || game.gameOver) return;

      if (card.nearest === "water" || card.nearest === "electric") {
        const tile = game.board[target];
        if (tile.owner === null || tile.owner === player.id || tile.mortgaged) {
          await resolveLanding(player, game.lastDice[0] + game.lastDice[1]);
          break;
        }
        const d1 = rand(1, 6);
        const d2 = rand(1, 6);
        await animateDice(d1, d2);
        game.lastDice = [d1, d2];
        const rollTotal = d1 + d2;
        logEvent("🎲", `<strong>${esc(player.name)}</strong> rolled ${d1} + ${d2} = <strong>${rollTotal}</strong> for the utility bill.`, {
          sub: `${game.board[target].name} owner collects ${money(rollTotal * 10)}.`,
        });
        await resolveLanding(player, rollTotal, { utilityTenfold: true });
        break;
      }

      await resolveLanding(player, game.lastDice[0] + game.lastDice[1], {
        rentMultiplier: card.multiplier || 1,
      });
      break;
    }

    case "jail": {
      await sendToJail(player, "A fate card sent you directly to jail.", true);
      break;
    }

    case "getOut": {
      player.getOut += 1;
      updateUI();
      playSound("cash");
      showToast("🗝️", "Key acquired", `${player.name} can leave jail free once.`, "gain");
      logEvent("🗝️", `<strong>${esc(player.name)}</strong> drew a Get Out of Jail Free card.`);
      await wait(600);
      break;
    }

    case "repairs": {
      const { houses, hotels } = countBuildings(player);
      const amount = houses * card.perHouse + hotels * card.perHotel;
      if (amount === 0) {
        showToast("🔧", "No repairs due", "No houses or hotels were found.", "", 2400);
        logEvent("🔧", `<strong>${esc(player.name)}</strong> owed nothing for repairs.`);
        await wait(400);
      } else {
        const paid = await payBank(player, amount, "property repairs");
        if (paid && !game.gameOver) {
          showToast("🔧", "Repairs paid", `${houses} house${houses === 1 ? "" : "s"}, ${hotels} hotel${hotels === 1 ? "" : "s"}: ${money(amount)}.`, "loss", 3200);
          logEvent("🔧", `<strong>${esc(player.name)}</strong> paid <strong>${money(amount)}</strong> for repairs.`, {
            sub: `${houses} houses and ${hotels} hotels`,
          });
        }
        await wait(450);
      }
      break;
    }

    case "collectEach": {
      const others = game.players.filter((item) => item.id !== player.id && !item.bankrupt);
      for (const other of others) {
        showToast("🎂", "Birthday money", `${other.name} pays ${money(card.amount)} to ${player.name}.`, "gain", 2200);
        const success = await payMoney(other, player, card.amount, "birthday gift");
        logEvent("🎂", `<strong>${esc(other.name)}</strong> paid <strong>${money(card.amount)}</strong> to <strong>${esc(player.name)}</strong>.`);
        if (!success || game.gameOver) break;
        await wait(300);
      }
      break;
    }

    case "payEach": {
      const others = game.players.filter((item) => item.id !== player.id && !item.bankrupt);
      for (const other of others) {
        const success = await payMoney(player, other, card.amount, "chairman's fee");
        logEvent("🏛️", `<strong>${esc(player.name)}</strong> paid <strong>${money(card.amount)}</strong> to <strong>${esc(other.name)}</strong>.`);
        if (!success || game.gameOver) break;
        await wait(300);
      }
      break;
    }

    default:
      break;
  }

  if (game && !game.gameOver) {
    renderAll();
  }
}

function ownsGroup(player, group) {
  return game.board
    .filter((tile) => tile.type === "property" && tile.group === group)
    .every((tile) => tile.owner === player.id);
}

function railroadCount(player) {
  return player.props.filter((index) => game.board[index].type === "railroad").length;
}

function utilityCount(player) {
  return player.props.filter((index) => game.board[index].type === "utility").length;
}

function calculateRent(tile, owner, diceTotal, options = {}) {
  const { rentMultiplier = 1, utilityTenfold = false } = options;
  let rent = 0;

  if (tile.type === "property") {
    rent = tile.rents[tile.houses];
    if (tile.houses === 0 && ownsGroup(owner, tile.group)) rent *= 2;
  } else if (tile.type === "railroad") {
    const count = railroadCount(owner);
    rent = 25 * 2 ** Math.max(0, count - 1);
  } else if (tile.type === "utility") {
    const count = utilityCount(owner);
    rent = utilityTenfold ? diceTotal * 10 : diceTotal * (count === 2 ? 10 : 4);
  }

  return Math.round(rent * rentMultiplier);
}

function mortgageValue(tile) {
  return Math.ceil((tile.price || 0) / 2);
}

function unmortgageCost(tile) {
  return Math.ceil(mortgageValue(tile) * 1.1);
}

function groupHasBuildings(tile) {
  return tile.type === "property" && game.board.some((item) =>
    item.type === "property" && item.group === tile.group && item.houses > 0
  );
}

function canMortgage(player, tile) {
  return Boolean(tile && tile.owner === player.id && !tile.mortgaged && !groupHasBuildings(tile));
}

function canUnmortgage(player, tile) {
  return Boolean(tile && tile.owner === player.id && tile.mortgaged && player.cash >= unmortgageCost(tile));
}

function countBuildings(player) {
  let houses = 0;
  let hotels = 0;
  player.props.forEach((index) => {
    const tile = game.board[index];
    if (tile.type !== "property") return;
    if (tile.houses === 5) hotels += 1;
    else houses += tile.houses;
  });
  return { houses, hotels };
}

function rentRows(tile, owner, activeRent) {
  if (tile.type === "property") {
    const group = GROUPS[tile.group];
    const rows = [
      { label: "BASE RENT", value: tile.rents[0], highlight: tile.houses === 0 },
      ...tile.rents.slice(1, 5).map((value, index) => ({
        label: `${index + 1} HOUSE${index > 0 ? "S" : ""}`,
        value,
        highlight: tile.houses === index + 1,
      })),
      { label: "HOTEL", value: tile.rents[5], highlight: tile.houses === 5 },
    ];

    if (tile.houses === 0 && ownsGroup(owner, tile.group)) {
      rows[0].value = tile.rents[0] * 2;
      rows[0].label = "BASE RENT · FULL SET";
    }

    return `
      <div class="rent-table">
        ${rows.map((row) => `
          <div class="rent-row ${row.highlight ? "is-highlight" : ""}">
            <span>${row.label}</span><b>${money(row.value)}</b>
          </div>
        `).join("")}
        <div class="rent-row">
          <span>HOUSE COST</span><b>${money(group.houseCost)}</b>
        </div>
      </div>
      <div class="rent-note">Own the full ${group.name.toLowerCase()} set to double the base rent.</div>
    `;
  }

  if (tile.type === "railroad") {
    const count = railroadCount(owner);
    const rows = [1, 2, 3, 4].map((owned) => ({
      label: `${owned} RAILROAD${owned > 1 ? "S" : ""} OWNED`,
      value: 25 * 2 ** (owned - 1),
      highlight: count === owned,
    }));
    return `
      <div class="rent-table">
        ${rows.map((row) => `
          <div class="rent-row ${row.highlight ? "is-highlight" : ""}">
            <span>${row.label}</span><b>${money(row.value)}</b>
          </div>
        `).join("")}
      </div>
      <div class="rent-note">The more railroads you control, the higher the fare.</div>
    `;
  }

  const count = utilityCount(owner);
  return `
    <div class="rent-table">
      <div class="rent-row ${count === 1 ? "is-highlight" : ""}">
        <span>ONE UTILITY · DICE × 4</span><b>4× roll</b>
      </div>
      <div class="rent-row ${count === 2 ? "is-highlight" : ""}">
        <span>BOTH UTILITIES · DICE × 10</span><b>10× roll</b>
      </div>
      <div class="rent-row">
        <span>THIS LANDING</span><b>${money(activeRent)}</b>
      </div>
    </div>
    <div class="rent-note">Utility rent is based on the dice roll that brought you here.</div>
  `;
}

function showDeedModal(tile, options) {
  const { mode, player, owner = null, rent = 0, affordable = true, multiplier = 1, utilityTenfold = false } = options;
  return new Promise((resolve) => {
    const groupColor = tile.type === "property"
      ? GROUPS[tile.group].color
      : tile.type === "railroad"
        ? "#303936"
        : "#66755d";

    const groupName = tile.type === "property"
      ? `${GROUPS[tile.group].name.toUpperCase()} SET`
      : tile.type === "railroad"
        ? "RAILROAD"
        : "UTILITY";

    let intro = "";
    if (mode === "buy") {
      intro = `<p class="deed-intro">Unowned and open for business. Add it to your portfolio, or let it slip away.</p>`;
    } else if (mode === "rent") {
      intro = `<p class="deed-intro">${esc(owner.name)} holds the deed. Landing here costs you <strong>${money(rent)}</strong>${multiplier > 1 ? " (double rent)" : utilityTenfold ? " (ten times the dice)" : ""}.</p>`;
    } else {
      intro = `<p class="deed-intro">A fine piece of the skyline. The details are below.</p>`;
    }

    let actionHtml = "";
    let balanceHtml = "";
    if (mode === "buy") {
      actionHtml = `
        <button class="btn btn-primary" type="button" data-buy data-autofocus ${player.cash < tile.price ? "disabled" : ""}>
          BUY FOR ${money(tile.price)}
        </button>
        <button class="btn btn-ghost" type="button" data-pass>PASS · AUCTION</button>
      `;
      balanceHtml = `<div class="balance-preview">AFTER PURCHASE <b>${money(player.cash - tile.price)}</b> · CASH ON HAND <b>${money(player.cash)}</b></div>`;
    } else if (mode === "rent") {
      actionHtml = `
        <button class="btn btn-primary" type="button" data-pay data-autofocus>PAY ${money(rent)}</button>
      `;
      balanceHtml = `<div class="balance-preview">AFTER PAYMENT <b>${money(player.cash - rent)}</b> · CASH ON HAND <b>${money(player.cash)}</b></div>`;
    } else {
      actionHtml = `<button class="btn btn-primary" type="button" data-close-deed data-autofocus>BACK TO THE GAME</button>`;
    }

    const ownerLine = owner
      ? `<div class="deed-ownerline">
          <div class="deed-ownerline-left">
            <span class="deed-owner-avatar">${owner.avatar}</span>
            <span>DEED HOLDER · ${esc(owner.name)}</span>
          </div>
          <span class="deed-price-tag">${mode === "rent" ? money(rent) : money(tile.price)}</span>
        </div>`
      : `<div class="deed-ownerline">
          <div class="deed-ownerline-left"><span>STATUS</span></div>
          <span class="deed-price-tag">UNOWNED</span>
        </div>`;

    const title = tile.name;
    const lightBand = tile.type === "property" && (tile.group === "lightblue" || tile.group === "yellow");
    const rentTable = owner
      ? rentRows(tile, owner, rent)
      : rentRowsPreview(tile);

    const { overlay, close } = mountOverlay(`
      <div class="deed-band ${lightBand ? "is-light" : ""}" style="--deed-color:${groupColor}">
        <small>${groupName}</small>
        <strong>${esc(title)}</strong>
      </div>
      <div class="deed-body">
        ${ownerLine}
        ${intro}
        ${rentTable}
        <div class="deed-actions">${actionHtml}</div>
        ${balanceHtml}
      </div>
    `, {
      cardClass: "deed-modal",
      dismissible: false,
    });

    if (mode === "buy") {
      overlay.querySelector("[data-buy]")?.addEventListener("click", () => {
        playSound("click");
        close();
        setTimeout(() => resolve(true), 80);
      });
      overlay.querySelector("[data-pass]")?.addEventListener("click", () => {
        playSound("click");
        close();
        setTimeout(() => resolve(false), 80);
      });
    } else if (mode === "rent") {
      overlay.querySelector("[data-pay]")?.addEventListener("click", () => {
        playSound("click");
        close();
        setTimeout(() => resolve(true), 80);
      });
    } else {
      overlay.querySelector("[data-close-deed]")?.addEventListener("click", () => {
        close();
        resolve(false);
      });
    }
  });
}

function rentRowsPreview(tile) {
  if (tile.type === "property") {
    const group = GROUPS[tile.group];
    return `
      <div class="rent-table">
        <div class="rent-row"><span>BASE RENT</span><b>${money(tile.rents[0])}</b></div>
        <div class="rent-row"><span>1 HOUSE</span><b>${money(tile.rents[1])}</b></div>
        <div class="rent-row"><span>2 HOUSES</span><b>${money(tile.rents[2])}</b></div>
        <div class="rent-row"><span>3 HOUSES</span><b>${money(tile.rents[3])}</b></div>
        <div class="rent-row"><span>4 HOUSES</span><b>${money(tile.rents[4])}</b></div>
        <div class="rent-row"><span>HOTEL</span><b>${money(tile.rents[5])}</b></div>
        <div class="rent-row"><span>HOUSE COST</span><b>${money(group.houseCost)}</b></div>
      </div>
      <div class="rent-note">Own the full ${group.name.toLowerCase()} set to double the base rent.</div>
    `;
  }

  if (tile.type === "railroad") {
    return `
      <div class="rent-table">
        <div class="rent-row"><span>1 RAILROAD</span><b>$25</b></div>
        <div class="rent-row"><span>2 RAILROADS</span><b>$50</b></div>
        <div class="rent-row"><span>3 RAILROADS</span><b>$100</b></div>
        <div class="rent-row"><span>4 RAILROADS</span><b>$200</b></div>
      </div>
      <div class="rent-note">Control more rail lines to raise the fare.</div>
    `;
  }

  return `
    <div class="rent-table">
      <div class="rent-row"><span>ONE UTILITY · DICE × 4</span><b>4× roll</b></div>
      <div class="rent-row"><span>BOTH UTILITIES · DICE × 10</span><b>10× roll</b></div>
    </div>
    <div class="rent-note">Utility rent is based on the dice roll that brought you here.</div>
  `;
}

async function payBank(player, amount, reason) {
  if (!game || amount <= 0) return true;
  if (player.cash >= amount) {
    changeCash(player, -amount);
    return true;
  }

  const remaining = player.cash;
  player.cash = 0;
  if (remaining > 0) showFloat(player, `-${money(remaining)}`, "loss");
  updateUI();
  await showBankruptcyDialog(player, null, reason);
  await settleBankruptcy(player, null);
  if (checkForWinner()) scheduleWinScreen();
  return false;
}

async function payMoney(from, to, amount, reason) {
  if (!game || amount <= 0) return true;
  if (from.cash >= amount) {
    changeCash(from, -amount, { sound: false });
    changeCash(to, amount, { sound: false });
    playSound("cash");
    flashCash(to.id, "up");
    return true;
  }

  const remaining = from.cash;
  from.cash = 0;
  if (to) {
    to.cash += remaining;
    showFloat(to, `+${money(remaining)}`, "gain");
  }
  if (remaining > 0) showFloat(from, `-${money(remaining)}`, "loss");
  updateUI();
  playSound("bankrupt");
  await showBankruptcyDialog(from, to, reason);
  await settleBankruptcy(from, to);
  if (checkForWinner()) scheduleWinScreen();
  return false;
}

function mortgageInterest(tile) {
  return Math.ceil(mortgageValue(tile) * 0.1);
}

async function settleBankruptcy(player, creditor) {
  player.bankrupt = true;
  player.inJail = false;
  player.jailTurns = 0;

  const deeds = [...player.props];

  if (creditor) {
    let interest = 0;
    deeds.forEach((index) => {
      const tile = game.board[index];
      if (tile.mortgaged) interest += mortgageInterest(tile);
    });

    deeds.forEach((index) => {
      const tile = game.board[index];
      tile.owner = creditor.id;
      if (!creditor.props.includes(index)) creditor.props.push(index);
    });
    player.props = [];

    if (player.getOut > 0) {
      creditor.getOut += player.getOut;
      player.getOut = 0;
    }

    logEvent("☠", `<strong>${esc(player.name)}</strong> is bankrupt.`, {
      sub: `All cash, deeds, buildings, and keys pass to ${creditor.name}.`,
    });
    playSound("bankrupt");

    if (interest > 0) {
      const paid = Math.min(creditor.cash, interest);
      creditor.cash -= paid;
      showToast("🏦", "Mortgage interest", `${creditor.name} paid ${money(paid)} to the bank on the seized deeds.`, "loss", 3400);
      logEvent("🏦", `<strong>${esc(creditor.name)}</strong> paid <strong>${money(paid)}</strong> in 10% bank interest on mortgaged deeds.`);
      flashCash(creditor.id, "down");
    }
    updateUI();
    return;
  }

  deeds.forEach((index) => {
    const tile = game.board[index];
    tile.houses = 0;
  });
  player.props = [];
  if (player.getOut > 0) player.getOut = 0;

  logEvent("☠", `<strong>${esc(player.name)}</strong> is bankrupt.`, {
    sub: "Buildings sold to the bank at half price. Every deed goes to auction.",
  });
  playSound("bankrupt");
  updateUI();

  for (const index of deeds) {
    if (!game || game.gameOver) break;
    const tile = game.board[index];
    tile.owner = null;
    tile.houses = 0;
    renderAll();

    const active = game.players[game.active];
    const initiator = active && !active.bankrupt ? active : game.players.filter((item) => !item.bankrupt)[0];
    if (!initiator) break;

    await runAuction(tile, initiator);

    if (tile.owner === null) {
      tile.mortgaged = false;
      showToast("🏦", "Unsold deed", `${tile.name} found no bidders and returns to the bank.`, "", 2800);
      logEvent("🏦", `<strong>${esc(tile.name)}</strong> received no bids. It returns to the bank.`);
      renderAll();
    }
  }
}

function showBankruptcyDialog(player, creditor, reason) {
  return new Promise((resolve) => {
    const text = creditor
      ? `${esc(player.name)} cannot cover the ${esc(reason)}. All cash, deeds, buildings, and jail keys pass to ${esc(creditor.name)}, who pays the bank 10% interest on any mortgaged deeds.`
      : `${esc(player.name)} cannot cover the ${esc(reason)}. Buildings are sold to the bank at half price, and every deed goes up for auction.`;
    const { overlay, close } = mountOverlay(`
      <div class="notice-card danger">
        <div class="notice-emblem">☠</div>
        <div class="dialog-kicker">FINANCIAL RUIN</div>
        <h2 class="notice-title">${esc(player.name)} is bankrupt.</h2>
        <p class="notice-text">${text}</p>
        <div class="dialog-actions notice-actions">
          <button class="btn btn-danger" type="button" data-continue data-autofocus>CONTINUE</button>
        </div>
      </div>
    `, {
      cardClass: "dialog-card notice-dialog",
      dismissible: false,
      onClose: resolve,
    });

    overlay.querySelector("[data-continue]").addEventListener("click", () => {
      playSound("click");
      close();
    });
  });
}

function checkForWinner() {
  if (!game || game.gameOver) return false;
  const alive = game.players.filter((player) => !player.bankrupt);
  if (alive.length > 1) return false;

  game.gameOver = true;
  game.phase = "gameover";
  game.winner = alive[0] || null;
  game.note = game.winner ? `${game.winner.name} owns the city.` : "The city has no survivors.";
  updateUI();
  return true;
}

function scheduleWinScreen() {
  if (!game || !game.gameOver || winShown) return;
  setTimeout(() => {
    if (game && game.gameOver && !winShown) showWinScreen();
  }, 900);
}

function buildDice() {
  [els.die1, els.die2].forEach((die, dieIndex) => {
    const cube = document.createElement("div");
    cube.className = "die-cube";
    cube.style.transform = "rotateX(0deg) rotateY(0deg)";
    const faces = ["front", "back", "right", "left", "top", "bottom"];
    const values = [1, 6, 3, 4, 2, 5];

    faces.forEach((faceName, faceIndex) => {
      const face = document.createElement("div");
      face.className = `face face-${faceName}`;
      face.dataset.face = String(values[faceIndex]);
      for (let pipIndex = 0; pipIndex < 9; pipIndex += 1) {
        const pip = document.createElement("span");
        pip.className = "pip";
        if (DIE_PIPS[values[faceIndex]].includes(pipIndex)) pip.classList.add("is-on");
        face.appendChild(pip);
      }
      cube.appendChild(face);
    });

    die.innerHTML = "";
    die.appendChild(cube);
    die._cube = cube;
    die._rx = 0;
    die._ry = 0;
    die._value = 1;
    die.dataset.die = String(dieIndex + 1);
  });
}

function setDiceInstant(value1, value2) {
  [els.die1, els.die2].forEach((die, index) => {
    const value = index === 0 ? value1 : value2;
    const rotation = DIE_ROTATIONS[value];
    die._rx = rotation.x;
    die._ry = rotation.y;
    die._value = value;
    die._cube.style.transform = `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`;
  });
}

function animateDie(die, value) {
  return new Promise((resolve) => {
    const target = DIE_ROTATIONS[value];
    const from = `rotateX(${die._rx}deg) rotateY(${die._ry}deg)`;
    const mid = `rotateX(${target.x + 720}deg) rotateY(${target.y + 1080}deg)`;
    const final = `rotateX(${target.x}deg) rotateY(${target.y}deg)`;

    die._rx = target.x;
    die._ry = target.y;
    die._value = value;

    if (typeof die._cube.animate !== "function") {
      die._cube.style.transform = final;
      resolve();
      return;
    }

    const animation = die._cube.animate(
      [
        { transform: from, offset: 0 },
        { transform: mid, offset: 0.72 },
        { transform: final, offset: 1 },
      ],
      {
        duration: rand(760, 980),
        easing: "cubic-bezier(.16,.72,.22,1)",
      }
    );

    animation.finished.then(() => {
      die._cube.style.transform = final;
      resolve();
    }).catch(() => {
      die._cube.style.transform = final;
      resolve();
    });
  });
}

async function animateDice(d1, d2) {
  els.diceZone.classList.add("is-rolling");
  ensureAudio();
  const ticker = setInterval(() => playSound("tick"), 85);

  await Promise.all([
    animateDie(els.die1, d1),
    animateDie(els.die2, d2),
  ]);

  clearInterval(ticker);
  els.diceZone.classList.remove("is-rolling");
  playSound("diceLand");
  await wait(260);
}

function canBuild(player, tile) {
  if (!tile || tile.type !== "property" || tile.houses >= MAX_HOUSES) return false;
  if (!ownsGroup(player, tile.group)) return false;
  if (tile.mortgaged) return false;
  if (player.cash < GROUPS[tile.group].houseCost) return false;
  const groupTiles = game.board.filter((item) => item.type === "property" && item.group === tile.group);
  if (groupTiles.some((item) => item.mortgaged)) return false;
  const minimum = Math.min(...groupTiles.map((item) => item.houses));
  return tile.houses === minimum;
}

function canSell(player, tile) {
  if (!tile || tile.type !== "property" || tile.houses <= 0) return false;
  const groupTiles = game.board.filter((item) => item.type === "property" && item.group === tile.group);
  const maximum = Math.max(...groupTiles.map((item) => item.houses));
  return tile.houses === maximum;
}

function netWorth(player) {
  return player.cash + player.props.reduce((total, index) => {
    const tile = game.board[index];
    const buildValue = tile.type === "property"
      ? tile.houses * GROUPS[tile.group].houseCost
      : 0;
    const landValue = tile.mortgaged
      ? Math.max(0, (tile.price || 0) - mortgageValue(tile))
      : tile.price || 0;
    return total + landValue + buildValue;
  }, 0);
}

function assetsMarkup(player) {
  if (!player.props.length) {
    return `<div class="assets-empty">No deeds yet. The city is still for sale.</div>`;
  }

  const sorted = [...player.props].sort((a, b) => a - b);
  const groups = new Map();
  sorted.forEach((index) => {
    const tile = game.board[index];
    const key = tile.type === "property" ? tile.group : tile.type;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(index);
  });

  return [...groups.entries()].map(([key, indices]) => {
    const first = game.board[indices[0]];
    const groupColor = first.type === "property" ? GROUPS[first.group].color : first.type === "railroad" ? "#59625a" : "#6f8063";
    const groupName = first.type === "property"
      ? GROUPS[first.group].name
      : first.type === "railroad"
        ? "Railroads"
        : "Utilities";

    const rows = indices.map((index) => {
      const tile = game.board[index];
      const buildCost = tile.type === "property" ? GROUPS[tile.group].houseCost : 0;
      const sellValue = Math.floor(buildCost / 2);
      const houses = tile.type === "property"
        ? tile.houses === 5
          ? `<span class="asset-house hotel"></span><span>HOTEL</span>`
          : `<span>${Array.from({ length: tile.houses }, () => `<i class="asset-house"></i>`).join("")}</span><span>${tile.houses === 0 ? "NO HOUSES" : `${tile.houses} HOUSE${tile.houses === 1 ? "" : "S"}`}</span>`
        : `<span>${tile.type === "railroad" ? "TRANSIT" : "UTILITY"}</span>`;

      const mortgageButton = tile.mortgaged
        ? `<button class="mini-action" type="button" data-asset-unmortgage="${index}" ${canUnmortgage(player, tile) ? "" : "disabled"} title="Pay off the mortgage">UNMORTGAGE ${money(unmortgageCost(tile))}</button>`
        : `<button class="mini-action" type="button" data-asset-mortgage="${index}" ${canMortgage(player, tile) ? "" : "disabled"} title="${groupHasBuildings(tile) ? "Sell all buildings in this color set first" : "Mortgage this property"}">MORTGAGE ${money(mortgageValue(tile))}</button>`;

      let actions = mortgageButton;
      if (tile.type === "property" && !tile.mortgaged) {
        actions = `
          <button class="mini-action" type="button" data-asset-build="${index}" ${canBuild(player, tile) ? "" : "disabled"}>+ HOUSE</button>
          <button class="mini-action" type="button" data-asset-sell="${index}" ${canSell(player, tile) ? "" : "disabled"}>SELL ${money(sellValue)}</button>
          ${mortgageButton}
        `;
      }

      return `
        <div class="asset-row ${tile.mortgaged ? "is-mortgaged" : ""}">
          <div class="asset-name">
            <strong>${esc(tile.name)}${tile.mortgaged ? `<span class="asset-mortgaged">MORTGAGED</span>` : ""}</strong>
            <span>${tile.type === "property" ? `${GROUPS[tile.group].name} set · $${tile.price}` : tile.type === "railroad" ? "Railroad · $200" : "Utility · $150"}${tile.type === "property" ? ` · build ${money(buildCost)}` : ""}</span>
          </div>
          <div class="asset-houses">${houses}</div>
          <div class="asset-actions">${actions}</div>
        </div>
      `;
    }).join("");

    return `
      <div class="asset-group-title"><i style="--group-color:${groupColor}"></i>${groupName}</div>
      ${rows}
    `;
  }).join("");
}

function openAssetsModal() {
  if (!game || game.gameOver || game.phase !== "roll" || isOverlayOpen()) return;
  const player = currentPlayer();
  if (!player) return;

  let bodyRef = null;

  const summaryMarkup = () => `
    <div class="assets-summary">
      <div><span>CASH</span><strong>${money(player.cash)}</strong></div>
      <div><span>DEEDS</span><strong>${player.props.length}</strong></div>
      <div><span>NET WORTH</span><strong>${money(netWorth(player))}</strong></div>
    </div>
  `;

  const contentMarkup = () => `
    ${summaryMarkup()}
    <div class="assets-list">${assetsMarkup(player)}</div>
  `;

  const { overlay, close } = mountOverlay(`
    <div class="dialog-head">
      <div>
        <div class="dialog-kicker">BUILDING DESK · ${esc(player.name.toUpperCase())}</div>
        <h2>Your empire</h2>
        <p class="dialog-sub">Build evenly across a complete color set, sell houses for half price, or mortgage unimproved property for cash.</p>
      </div>
      <button class="close-x" type="button" data-close aria-label="Close">×</button>
    </div>
    <div class="assets-body" data-assets-body>${contentMarkup()}</div>
    <div class="dialog-actions">
      <button class="btn btn-gold" type="button" data-close data-autofocus>DONE</button>
    </div>
  `, {
    cardClass: "dialog-card assets-card",
    dismissible: true,
  });

  bodyRef = overlay.querySelector("[data-assets-body]");

  const refresh = () => {
    bodyRef.innerHTML = contentMarkup();
    updateUI();
  };

  bodyRef.addEventListener("click", (event) => {
    const buildButton = event.target.closest("[data-asset-build]");
    const sellButton = event.target.closest("[data-asset-sell]");
    const mortgageButton = event.target.closest("[data-asset-mortgage]");
    const unmortgageButton = event.target.closest("[data-asset-unmortgage]");

    if (mortgageButton) {
      const index = Number(mortgageButton.dataset.assetMortgage);
      const tile = game.board[index];
      if (!canMortgage(player, tile)) return;
      const value = mortgageValue(tile);
      tile.mortgaged = true;
      player.cash += value;
      playSound("cash");
      logEvent("🏦", `<strong>${esc(player.name)}</strong> mortgaged <strong>${tile.name}</strong>.`, {
        sub: `Received ${money(value)}. No rent is collected while mortgaged.`,
      });
      showToast("🏦", "Property mortgaged", `${tile.name} raised ${money(value)}.`, "loss", 2600);
      showFloat(player, `+${money(value)}`, "gain");
      renderAll();
      refresh();
      return;
    }

    if (unmortgageButton) {
      const index = Number(unmortgageButton.dataset.assetUnmortgage);
      const tile = game.board[index];
      if (!canUnmortgage(player, tile)) return;
      const value = unmortgageCost(tile);
      tile.mortgaged = false;
      player.cash -= value;
      playSound("buy");
      logEvent("🏦", `<strong>${esc(player.name)}</strong> lifted the mortgage on <strong>${tile.name}</strong>.`, {
        sub: `Paid ${money(value)} including interest.`,
      });
      showToast("🏦", "Mortgage lifted", `${tile.name} can collect rent again.`, "gain", 2600);
      showFloat(player, `-${money(value)}`, "loss");
      renderAll();
      refresh();
      return;
    }

    if (buildButton) {
      const index = Number(buildButton.dataset.assetBuild);
      const tile = game.board[index];
      if (!canBuild(player, tile)) return;
      const cost = GROUPS[tile.group].houseCost;
      player.cash -= cost;
      tile.houses += 1;
      playSound(tile.houses === 5 ? "buy" : "cash");
      logEvent("🏗️", `<strong>${esc(player.name)}</strong> built ${tile.houses === 5 ? "a hotel" : "a house"} on <strong>${tile.name}</strong>.`, {
        sub: `Paid ${money(cost)}.`,
      });
      renderAll();
      refresh();
      showFloat(player, `-${money(cost)}`, "loss");
    }

    if (sellButton) {
      const index = Number(sellButton.dataset.assetSell);
      const tile = game.board[index];
      if (!canSell(player, tile)) return;
      const value = Math.floor(GROUPS[tile.group].houseCost / 2);
      tile.houses -= 1;
      player.cash += value;
      playSound("cash");
      logEvent("🏚️", `<strong>${esc(player.name)}</strong> sold a building on <strong>${tile.name}</strong>.`, {
        sub: `Received ${money(value)}.`,
      });
      renderAll();
      refresh();
      showFloat(player, `+${money(value)}`, "gain");
    }
  });

  overlay.querySelectorAll("[data-close]").forEach((button) => {
    button.addEventListener("click", () => {
      playSound("click");
      close();
    });
  });
}

function tradeAssetColor(tile) {
  return tile.type === "property"
    ? GROUPS[tile.group].color
    : tile.type === "railroad"
      ? "#59625a"
      : "#6f8063";
}

function tradeAssetSub(tile) {
  const bits = [];
  if (tile.type === "property") {
    bits.push(GROUPS[tile.group].name);
    if (tile.houses === 5) bits.push("Hotel");
    else if (tile.houses > 0) bits.push(`${tile.houses} house${tile.houses === 1 ? "" : "s"}`);
  } else if (tile.type === "railroad") {
    bits.push("Railroad");
  } else {
    bits.push("Utility");
  }
  if (tile.mortgaged) bits.push("Mortgaged");
  bits.push(money(tile.price));
  return bits.join(" · ");
}

function tradeAssetRow(tile, index, side) {
  const disabled = tile.type === "property" && groupHasBuildings(tile);
  const note = disabled ? "Sell all buildings in this set first" : tradeAssetSub(tile);
  return `
    <label class="trade-asset ${disabled ? "is-disabled" : ""}">
      <input type="checkbox" data-trade-prop="${index}" data-trade-side="${side}" ${disabled ? "disabled" : ""} />
      <span class="trade-asset-color" style="--asset-color:${tradeAssetColor(tile)}"></span>
      <span class="trade-asset-copy">
        <strong>${esc(tile.short)}</strong>
        <small>${note}</small>
      </span>
      <span class="trade-asset-value">${money(tile.price)}</span>
    </label>
  `;
}

function tradeSideMarkup(player, side, label) {
  const properties = [...player.props].sort((a, b) => a - b);
  const hasAssets = properties.length || player.getOut > 0;
  return `
    <section class="trade-side">
      <div class="trade-side-head" style="--side-color:${player.color}">
        <span class="trade-side-avatar">${player.avatar}</span>
        <div class="trade-side-copy">
          <strong>${esc(player.name)}</strong>
          <span>${money(player.cash)} cash · ${player.props.length} deeds</span>
        </div>
        <span class="trade-side-label">${label}</span>
      </div>
      <label class="trade-cash-row">
        <span>CASH OFFER</span>
        <span class="trade-cash-input">
          <span>$</span>
          <input type="number" min="0" max="${player.cash}" step="10" value="0" data-trade-cash="${side}" />
        </span>
      </label>
      <div class="trade-interest">
        <span>10% BANK INTEREST ON DEEDS RECEIVED</span>
        <b data-trade-interest="${side}">$0</b>
      </div>
      <div class="trade-assets-scroll">
        ${hasAssets ? [
          ...properties.map((index) => tradeAssetRow(game.board[index], index, side)),
          player.getOut > 0 ? `
            <label class="trade-asset jail-asset">
              <input type="checkbox" data-trade-jail="${side}" />
              <span class="trade-asset-color"></span>
              <span class="trade-asset-copy">
                <strong>Get Out of Jail Free</strong>
                <small>${player.getOut} available · tradable key</small>
              </span>
              <span class="trade-asset-value">KEY</span>
            </label>
          ` : "",
        ].join("") : `<div class="trade-empty">No deeds to trade</div>`}
      </div>
    </section>
  `;
}

function openTradeModal() {
  if (!game || game.gameOver || game.phase !== "roll" || isOverlayOpen()) return;
  const initiator = currentPlayer();
  const partners = game.players.filter((player) => !player.bankrupt && player.id !== initiator.id);
  if (!partners.length) {
    showToast("⇄", "No trade partners", "There is no one left to bargain with.", "", 2200);
    return;
  }

  let partner = partners[0];
  let proposing = false;

  const { overlay, close } = mountOverlay(`
    <div class="dialog-head">
      <div>
        <div class="dialog-kicker">THE NEGOTIATION TABLE</div>
        <h2>Strike a deal</h2>
        <p class="dialog-sub">Select cash, deeds, and jail cards from both sides. Improved properties must be cleared first.</p>
      </div>
      <button class="close-x" type="button" data-trade-cancel aria-label="Close">×</button>
    </div>
    <div class="trade-partners" data-trade-partners>
      ${partners.map((player) => `
        <button class="trade-partner ${player.id === partner.id ? "is-selected" : ""}" type="button" data-trade-partner="${player.id}" style="--pcolor:${player.color}">
          <span class="trade-partner-avatar">${player.avatar}</span>
          <span>${esc(player.name)}</span>
          <span class="trade-partner-cash">${money(player.cash)}</span>
        </button>
      `).join("")}
    </div>
    <div class="trade-body" data-trade-body></div>
    <div class="dialog-actions">
      <button class="btn btn-dark" type="button" data-trade-cancel>CANCEL</button>
      <button class="btn btn-gold" type="button" data-trade-propose>PROPOSE TRADE</button>
    </div>
  `, {
    cardClass: "dialog-card trade-card",
    dismissible: true,
  });

  const body = overlay.querySelector("[data-trade-body]");

  const renderBuilder = () => {
    body.innerHTML = `
      <div class="trade-columns">
        ${tradeSideMarkup(initiator, "give", "YOU GIVE")}
        <div class="trade-vs">⇄</div>
        ${tradeSideMarkup(partner, "take", "YOU RECEIVE")}
      </div>
    `;
    refreshInterest();
  };

  const interestFor = (side) => {
    return [...overlay.querySelectorAll(`[data-trade-prop][data-trade-side="${side}"]:checked`)].reduce((total, input) => {
      const tile = game.board[Number(input.dataset.tradeProp)];
      return tile.mortgaged ? total + mortgageInterest(tile) : total;
    }, 0);
  };

  const refreshInterest = () => {
    const giveEl = overlay.querySelector('[data-trade-interest="give"]');
    const takeEl = overlay.querySelector('[data-trade-interest="take"]');
    if (giveEl) giveEl.textContent = money(interestFor("take"));
    if (takeEl) takeEl.textContent = money(interestFor("give"));
  };

  renderBuilder();

  overlay.addEventListener("change", refreshInterest);

  overlay.addEventListener("click", async (event) => {
    const partnerButton = event.target.closest("[data-trade-partner]");
    if (partnerButton) {
      partner = game.players[Number(partnerButton.dataset.tradePartner)];
      overlay.querySelectorAll("[data-trade-partner]").forEach((button) => {
        button.classList.toggle("is-selected", Number(button.dataset.tradePartner) === partner.id);
      });
      renderBuilder();
      return;
    }

    if (event.target.closest("[data-trade-cancel]")) {
      playSound("click");
      close();
      return;
    }

    const proposeButton = event.target.closest("[data-trade-propose]");
    if (!proposeButton || proposing) return;
    proposing = true;

    const giveProps = [...overlay.querySelectorAll('[data-trade-prop][data-trade-side="give"]:checked')].map((input) => Number(input.dataset.tradeProp));
    const takeProps = [...overlay.querySelectorAll('[data-trade-prop][data-trade-side="take"]:checked')].map((input) => Number(input.dataset.tradeProp));
    const giveCash = Math.max(0, Math.floor(Number(overlay.querySelector('[data-trade-cash="give"]').value) || 0));
    const takeCash = Math.max(0, Math.floor(Number(overlay.querySelector('[data-trade-cash="take"]').value) || 0));
    const giveJail = Boolean(overlay.querySelector('[data-trade-jail="give"]:checked'));
    const takeJail = Boolean(overlay.querySelector('[data-trade-jail="take"]:checked'));

    if (giveCash > initiator.cash || takeCash > partner.cash) {
      proposing = false;
      showToast("⇄", "Cash unavailable", "One side does not have that much cash.", "loss", 2400);
      return;
    }

    if (!giveProps.length && !takeProps.length && !giveCash && !takeCash && !giveJail && !takeJail) {
      proposing = false;
      showToast("⇄", "An empty offer", "Put something on the table first.", "", 2200);
      return;
    }

    const offer = {
      fromId: initiator.id,
      toId: partner.id,
      giveProps,
      takeProps,
      giveCash,
      takeCash,
      giveJail,
      takeJail,
    };

    close();
    await wait(120);
    const accepted = await showTradeOffer(offer);
    if (accepted) {
      executeTrade(offer);
    } else {
      playSound("card");
      showToast("⇄", "Offer declined", `${partner.name} passed on the deal.`, "loss", 2400);
      logEvent("⇄", `<strong>${esc(partner.name)}</strong> declined a trade from <strong>${esc(initiator.name)}</strong>.`);
    }
  });
}

function tradeItemMarkup(properties, cash, jail, interest = 0) {
  const items = [];
  properties.forEach((index) => {
    const tile = game.board[index];
    items.push(`<div class="trade-offer-item"><i style="--asset-color:${tradeAssetColor(tile)}"></i>${esc(tile.short)}${tile.mortgaged ? " · mortgaged" : ""}<strong>${money(tile.price)}</strong></div>`);
  });
  if (cash > 0) {
    items.push(`<div class="trade-offer-item"><i style="--asset-color:var(--gold)"></i>Cash<strong>${money(cash)}</strong></div>`);
  }
  if (jail) {
    items.push(`<div class="trade-offer-item"><i style="--asset-color:var(--gold)"></i>Get Out of Jail Free<strong>KEY</strong></div>`);
  }
  if (interest > 0) {
    items.push(`<div class="trade-offer-item is-interest"><i style="--asset-color:var(--gold)"></i>10% Bank Interest Due<strong>${money(interest)}</strong></div>`);
  }
  return items.length ? items.join("") : `<div class="trade-offer-none">Nothing</div>`;
}

function showTradeOffer(offer) {
  return new Promise((resolve) => {
    const from = game.players[offer.fromId];
    const to = game.players[offer.toId];
    const toInterest = offer.giveProps.reduce((total, index) => {
      const tile = game.board[index];
      return tile.mortgaged ? total + mortgageInterest(tile) : total;
    }, 0);
    const fromInterest = offer.takeProps.reduce((total, index) => {
      const tile = game.board[index];
      return tile.mortgaged ? total + mortgageInterest(tile) : total;
    }, 0);
    let accepted = false;

    const { overlay, close } = mountOverlay(`
      <div class="dialog-head">
        <div>
          <div class="dialog-kicker">A FORMAL OFFER</div>
          <h2>${esc(to.name)}, a deal?</h2>
          <p class="dialog-sub">${esc(from.name)} has put the following terms on the table.</p>
        </div>
      </div>
      <div class="trade-offer-grid">
        <div class="trade-offer-side">
          <span>${esc(from.name).toUpperCase()} GIVES</span>
          ${tradeItemMarkup(offer.giveProps, offer.giveCash, offer.giveJail, fromInterest)}
        </div>
        <div class="trade-offer-side">
          <span>${esc(to.name).toUpperCase()} GIVES</span>
          ${tradeItemMarkup(offer.takeProps, offer.takeCash, offer.takeJail, toInterest)}
        </div>
      </div>
      <div class="dialog-actions">
        <button class="btn btn-dark" type="button" data-trade-decline>DECLINE</button>
        <button class="btn btn-gold" type="button" data-trade-accept data-autofocus>ACCEPT DEAL</button>
      </div>
    `, {
      cardClass: "dialog-card trade-offer-card",
      dismissible: true,
      onClose: () => resolve(accepted),
    });

    overlay.querySelector("[data-trade-accept]").addEventListener("click", () => {
      accepted = true;
      playSound("click");
      close();
    });
    overlay.querySelector("[data-trade-decline]").addEventListener("click", () => {
      playSound("click");
      close();
    });
  });
}

function transferProperty(index, from, to) {
  const tile = game.board[index];
  if (!tile || tile.owner !== from.id) return false;
  from.props = from.props.filter((item) => item !== index);
  if (!to.props.includes(index)) to.props.push(index);
  tile.owner = to.id;
  return true;
}

function executeTrade(offer) {
  if (!game || game.gameOver) return false;
  const from = game.players[offer.fromId];
  const to = game.players[offer.toId];
  if (from.cash < offer.giveCash || to.cash < offer.takeCash) return false;
  if (offer.giveJail && from.getOut < 1) return false;
  if (offer.takeJail && to.getOut < 1) return false;

  const toInterest = offer.giveProps.reduce((total, index) => {
    const tile = game.board[index];
    return tile.mortgaged ? total + mortgageInterest(tile) : total;
  }, 0);
  const fromInterest = offer.takeProps.reduce((total, index) => {
    const tile = game.board[index];
    return tile.mortgaged ? total + mortgageInterest(tile) : total;
  }, 0);
  const fromAfter = from.cash + offer.takeCash - offer.giveCash;
  const toAfter = to.cash + offer.giveCash - offer.takeCash;
  if (fromAfter < fromInterest || toAfter < toInterest) {
    showToast("⇄", "Deal undone", "Not enough cash to pay the 10% bank interest on mortgaged deeds.", "loss", 3600);
    logEvent("⇄", `A trade between <strong>${esc(from.name)}</strong> and <strong>${esc(to.name)}</strong> collapsed over mortgage interest.`);
    return false;
  }

  offer.giveProps.forEach((index) => transferProperty(index, from, to));
  offer.takeProps.forEach((index) => transferProperty(index, to, from));

  from.cash = fromAfter - fromInterest;
  to.cash = toAfter - toInterest;

  if (fromInterest > 0) {
    logEvent("🏦", `<strong>${esc(from.name)}</strong> paid <strong>${money(fromInterest)}</strong> bank interest on the deeds received.`);
  }
  if (toInterest > 0) {
    logEvent("🏦", `<strong>${esc(to.name)}</strong> paid <strong>${money(toInterest)}</strong> bank interest on the deeds received.`);
  }

  if (offer.giveJail) {
    from.getOut -= 1;
    to.getOut += 1;
  }
  if (offer.takeJail) {
    to.getOut -= 1;
    from.getOut += 1;
  }

  updateUI();
  playSound("buy");
  burstConfetti(window.innerWidth / 2, window.innerHeight * 0.33, 30, [from.color, to.color, "#f3d88d"]);
  showToast("🤝", "Deal closed", `${from.name} and ${to.name} shook hands.`, "gain", 3200);
  logEvent("🤝", `<strong>${esc(from.name)}</strong> and <strong>${esc(to.name)}</strong> completed a trade.`, {
    sub: `Cash, deeds, keys, and 10% bank interest changed hands.`,
  });
  return true;
}

function runAuction(tile, initiator) {
  const interest = tile.mortgaged ? mortgageInterest(tile) : 0;
  return new Promise((resolve) => {
    if (!game || game.gameOver) {
      resolve(null);
      return;
    }

    const players = game.players.filter((player) => !player.bankrupt);
    if (!players.length) {
      resolve(null);
      return;
    }

    let currentIndex = Math.max(0, players.findIndex((player) => player.id === initiator.id));
    const passed = new Set();
    let highestBid = 0;
    let highestBidder = null;
    let finished = false;

    logEvent("⚖️", `<strong>${esc(tile.name)}</strong> goes to auction.`, {
      sub: tile.mortgaged
        ? `Mortgaged deed — the buyer also pays ${money(interest)} bank interest.`
        : `Opened after ${initiator.name} declined the purchase.`,
    });

    const { overlay, close } = mountOverlay(`<div data-auction-body></div>`, {
      cardClass: "dialog-card auction-card",
      dismissible: false,
    });

    const body = overlay.querySelector("[data-auction-body]");

    const nextActiveIndex = (fromIndex) => {
      for (let step = 1; step <= players.length; step += 1) {
        const index = (fromIndex + step) % players.length;
        if (!passed.has(players[index].id)) return index;
      }
      return -1;
    };

    const finishAuction = () => {
      if (finished) return;
      finished = true;
      close();
      setTimeout(() => resolve({ winner: highestBidder, amount: highestBid }), 100);
    };

    const checkAuctionEnd = () => {
      const active = players.filter((player) => !passed.has(player.id));
      if (!active.length) {
        finishAuction();
        return true;
      }
      if (active.length === 1 && highestBidder && active[0].id === highestBidder.id) {
        finishAuction();
        return true;
      }
      return false;
    };

    const renderAuction = () => {
      const current = players[currentIndex];
      const minimum = highestBid > 0 ? highestBid + 10 : 10;
      const canBid = current.cash >= minimum + interest;
      const color = tile.type === "property" ? GROUPS[tile.group].color : tile.type === "railroad" ? "#59625a" : "#6f8063";
      const kind = tile.type === "property" ? GROUPS[tile.group].name.toUpperCase() : tile.type === "railroad" ? "RAILROAD" : "UTILITY";
      const lightHeader = tile.type === "property" && (tile.group === "lightblue" || tile.group === "yellow");

      body.innerHTML = `
        <div class="auction-head ${lightHeader ? "is-light" : ""}" style="--auction-color:${color}">
          <small>AUCTION · ${kind}</small>
          <h2>${esc(tile.name)}</h2>
          <span>${tile.mortgaged ? `Mortgaged · buyer pays ${money(interest)} bank interest` : `List price ${money(tile.price)}`}</span>
        </div>
        <div class="auction-highest">
          <div>
            <span>HIGHEST BID</span>
            <strong>${highestBid ? money(highestBid) : "—"}</strong>
          </div>
          <small>${highestBidder ? `Leading: ${esc(highestBidder.name)}` : "Waiting for the first bid"}</small>
        </div>
        <div class="auction-players">
          ${players.map((player) => {
            const isPassed = passed.has(player.id);
            const isCurrent = player.id === current.id && !isPassed;
            const isLeader = highestBidder && player.id === highestBidder.id;
            return `
              <div class="auction-player ${isCurrent ? "is-current" : ""} ${isPassed && !isLeader ? "is-passed" : ""}" style="--pcolor:${player.color}">
                <span class="auction-player-avatar">${player.avatar}</span>
                <span class="auction-player-copy">
                  <strong>${esc(player.name)}</strong>
                  <small>${money(player.cash)} available</small>
                </span>
                <span class="auction-player-status">${isLeader ? "LEADING" : isPassed ? "PASSED" : isCurrent ? "TO BID" : "IN"}</span>
              </div>
            `;
          }).join("")}
        </div>
        <div class="auction-controls">
          <div class="auction-turnline">
            <strong>${esc(current.name)}</strong>
            <small>${canBid ? `Minimum bid ${money(minimum)}${interest ? ` + ${money(interest)} interest` : ""}` : "Not enough cash to cover the bid"}</small>
          </div>
          <div class="auction-bid-row">
            <label class="auction-bid-input">
              <span>$</span>
              <input id="auctionBidInput" type="number" min="${minimum}" max="${current.cash - interest}" step="10" value="${Math.min(current.cash - interest, minimum)}" ${canBid ? "" : "disabled"} />
            </label>
            <button class="auction-bid-btn" type="button" data-auction-bid ${canBid ? "" : "disabled"}>BID</button>
            <button class="auction-pass-btn" type="button" data-auction-pass>PASS</button>
          </div>
          <div class="auction-quick">
            ${[10, 50, 100].map((increment) => `<button type="button" data-auction-inc="${increment}" ${canBid ? "" : "disabled"}>+$${increment}</button>`).join("")}
          </div>
          <p class="auction-note">${tile.mortgaged ? `Whole-dollar bids. The winning bidder pays the bid plus ${money(interest)} in mortgage interest.` : "Only whole-dollar bids. A player with the highest bid cannot withdraw it."}</p>
        </div>
      `;
    };

    overlay.addEventListener("click", (event) => {
      if (finished) return;

      const incrementButton = event.target.closest("[data-auction-inc]");
      if (incrementButton) {
        const input = overlay.querySelector("#auctionBidInput");
        if (!input) return;
        const current = players[currentIndex];
        const increment = Number(incrementButton.dataset.auctionInc);
        input.value = Math.min(current.cash, Math.max(Number(input.min), Math.floor(Number(input.value) || 0) + increment));
        return;
      }

      if (event.target.closest("[data-auction-pass]")) {
        const current = players[currentIndex];
        passed.add(current.id);
        playSound("click");
        if (checkAuctionEnd()) return;
        currentIndex = nextActiveIndex(currentIndex);
        renderAuction();
        return;
      }

      if (event.target.closest("[data-auction-bid]")) {
        const current = players[currentIndex];
        const input = overlay.querySelector("#auctionBidInput");
        const minimum = highestBid > 0 ? highestBid + 10 : 10;
        const amount = Math.floor(Number(input?.value) || 0);
        if (amount < minimum || amount + interest > current.cash) {
          showToast("⚖️", "Bid not accepted", `Bid at least ${money(minimum)}${interest ? ` and cover the ${money(interest)} mortgage interest` : " within your cash."}`, "loss", 2400);
          return;
        }
        highestBid = amount;
        highestBidder = current;
        playSound("cash");
        if (checkAuctionEnd()) return;
        currentIndex = nextActiveIndex(currentIndex);
        renderAuction();
      }
    });

    renderAuction();
  }).then((result) => {
    if (!game || game.gameOver) return result;
    if (!result || !result.winner) {
      showToast("⚖️", "Auction closed", `${tile.name} found no bidders.`, "", 2600);
      logEvent("⚖️", `<strong>${esc(tile.name)}</strong> received no bids.`);
      return null;
    }
    const { winner, amount } = result;
    const totalDue = amount + interest;
    winner.cash -= totalDue;
    tile.owner = winner.id;
    if (!winner.props.includes(game.board.indexOf(tile))) winner.props.push(game.board.indexOf(tile));
    updateUI();
    playSound("buy");
    burstConfetti(window.innerWidth / 2, window.innerHeight * 0.33, 38, [winner.color, "#f3d88d", "#fff4d8"]);
    showToast("⚖️", "Auction won", `${winner.name} claimed ${tile.name} for ${money(amount)}${interest ? ` + ${money(interest)} interest` : ""}.`, "gain", 3300);
    logEvent("⚖️", `<strong>${esc(winner.name)}</strong> won the auction for <strong>${esc(tile.name)}</strong>.`, {
      sub: interest
        ? `Winning bid ${money(amount)} plus ${money(interest)} mortgage interest.`
        : `Winning bid ${money(amount)}.`,
    });
    return result;
  });
}

function showWinScreen() {
  if (!game || !game.gameOver || winShown) return;
  winShown = true;
  const winner = game.winner;
  setSidePanelOpen(false);
  els.toastStack.innerHTML = "";
  const ranking = [...game.players].sort((a, b) => {
    if (a.bankrupt && !b.bankrupt) return 1;
    if (!a.bankrupt && b.bankrupt) return -1;
    return netWorth(b) - netWorth(a);
  });

  const winnerAvatar = winner ? winner.avatar : "🏙️";
  const winnerColor = winner ? winner.color : "#2c5a43";
  const winnerName = winner ? winner.name : "No one";
  const winnerCash = winner ? winner.cash : 0;
  const winnerDeeds = winner ? winner.props.length : 0;
  const winnerWorth = winner ? netWorth(winner) : 0;

  const { overlay, close } = mountOverlay(`
    <div class="win-crown">♛</div>
    <div class="win-avatar" style="--win-color:${winnerColor}">${winnerAvatar}</div>
    <div class="win-kicker">THE LAST TYCOON STANDING</div>
    <h2 class="win-name">${esc(winnerName)}</h2>
    <p class="win-sub">The skyline belongs to you. Every rival has been bought out, squeezed out, or sent packing.</p>
    <div class="win-stats">
      <div><span>CASH</span><strong>${money(winnerCash)}</strong></div>
      <div><span>DEEDS</span><strong>${winnerDeeds}</strong></div>
      <div><span>NET WORTH</span><strong>${money(winnerWorth)}</strong></div>
    </div>
    <div class="win-rank">
      ${ranking.map((player, index) => `
        <div class="win-rank-row">
          <b>#${index + 1}</b>
          <i>${player.avatar}</i>
          <span>${esc(player.name)}${player.bankrupt ? " · bankrupt" : ""}</span>
          <strong>${money(netWorth(player))}</strong>
        </div>
      `).join("")}
    </div>
    <div class="win-actions">
      <button class="btn btn-gold" type="button" data-rematch data-autofocus>REMATCH</button>
      <button class="btn btn-dark" type="button" data-new-lineup>NEW LINEUP</button>
    </div>
  `, {
    cardClass: "win-card",
    overlayClass: "win-overlay",
    dismissible: false,
  });

  playSound("win");
  celebrate();

  const rematch = () => {
    const startingBalance = game.startingCash;
    const definitions = game.players.map((player) => ({
      name: player.name,
      avatar: player.avatar,
      color: player.color,
    }));
    close();
    setTimeout(() => {
      launchGame(definitions, startingBalance);
      showToast("♛", "A new game begins", "The table has been reset. Same rivals, new fortunes.", "card", 3200);
    }, 120);
  };

  overlay.querySelector("[data-rematch]").addEventListener("click", () => {
    playSound("click");
    rematch();
  });

  overlay.querySelector("[data-new-lineup]").addEventListener("click", () => {
    playSound("click");
    close();
    setSidePanelOpen(false);
    setTimeout(() => {
      els.setupScreen.classList.remove("is-hidden", "is-leaving");
      els.gameScreen.classList.remove("is-live");
      els.gameScreen.classList.add("is-hidden");
      renderSetupPlayers();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 140);
  });
}

const fxState = {
  particles: [],
  running: false,
  ctx: null,
  width: 0,
  height: 0,
};

function resizeFx() {
  const canvas = els.fxCanvas;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  fxState.width = window.innerWidth;
  fxState.height = window.innerHeight;
  canvas.width = Math.floor(fxState.width * dpr);
  canvas.height = Math.floor(fxState.height * dpr);
  canvas.style.width = `${fxState.width}px`;
  canvas.style.height = `${fxState.height}px`;
  fxState.ctx = canvas.getContext("2d");
  fxState.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function burstConfetti(x, y, count = 55, colors = ["#f3d88d", "#d5af5f", "#e35f5f", "#5cc28b", "#51a7e8", "#f6eddc"]) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  for (let i = 0; i < count; i += 1) {
    const angle = rand(-170, -10) * (Math.PI / 180);
    const speed = rand(4, 13);
    fxState.particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed + rand(-2, 2),
      vy: Math.sin(angle) * speed - rand(0, 3),
      gravity: rand(0.13, 0.23),
      drag: 0.985,
      width: rand(3, 8),
      height: rand(5, 12),
      rotation: rand(0, Math.PI * 2),
      rotationSpeed: rand(-0.18, 0.18),
      color: colors[rand(0, colors.length - 1)],
      life: rand(75, 145),
      shape: Math.random() > 0.72 ? "circle" : "rect",
    });
  }
  if (!fxState.running) {
    fxState.running = true;
    requestAnimationFrame(tickFx);
  }
}

function tickFx() {
  const ctx = fxState.ctx;
  if (!ctx) {
    fxState.running = false;
    return;
  }

  ctx.clearRect(0, 0, fxState.width, fxState.height);
  fxState.particles = fxState.particles.filter((particle) => particle.life > 0);

  fxState.particles.forEach((particle) => {
    particle.vx *= particle.drag;
    particle.vy = particle.vy * particle.drag + particle.gravity;
    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.rotation += particle.rotationSpeed;
    particle.life -= 1;

    ctx.save();
    ctx.globalAlpha = Math.min(1, particle.life / 30);
    ctx.translate(particle.x, particle.y);
    ctx.rotate(particle.rotation);
    ctx.fillStyle = particle.color;
    if (particle.shape === "circle") {
      ctx.beginPath();
      ctx.arc(0, 0, particle.width / 2, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillRect(-particle.width / 2, -particle.height / 2, particle.width, particle.height);
    }
    ctx.restore();
  });

  if (fxState.particles.length) {
    requestAnimationFrame(tickFx);
  } else {
    ctx.clearRect(0, 0, fxState.width, fxState.height);
    fxState.running = false;
  }
}

function celebrate() {
  const bursts = [
    [0.2, 0.55],
    [0.8, 0.55],
    [0.5, 0.25],
    [0.3, 0.35],
    [0.7, 0.35],
  ];
  bursts.forEach(([x, y], index) => {
    setTimeout(() => {
      burstConfetti(fxState.width * x, fxState.height * y, 70, ["#f3d88d", "#d5af5f", "#fff4d1", "#e35f5f", "#5cc28b"]);
    }, index * 260);
  });
}

function cacheElements() {
  const ids = [
    "setupScreen", "setupPlayers", "countPicker", "startBtn", "setupRulesBtn",
    "setupBalance", "heroStartingCash", "startingCashInput", "startCashPresets",
    "gameScreen", "board", "boardCenter", "tokensLayer", "playersList",
    "eventFeed", "roundChip", "assetsBtn", "drawerTradeBtn", "soundBtn", "rulesBtn", "newGameBtn",
    "sideRulesBtn", "miniScoreboard", "tableBtn", "sidePanel", "sidePanelClose",
    "drawerBackdrop", "portfolioMeta", "portfolioList", "statsRound", "statsPanel",
    "turnAvatar", "turnName", "turnCash", "turnPropCount", "turnAssetsBtn",
    "tradeBtn", "turnEyebrow", "turnConsole", "rollBtn", "rollBtnLabel", "jailActions",
    "payJailBtn", "useJailCardBtn", "turnHint", "diceZone", "die1", "die2",
    "chanceDeck", "chestDeck", "overlayRoot", "toastStack", "fxCanvas",
  ];
  ids.forEach((id) => {
    els[id] = document.getElementById(id);
  });
  els.turnConsole = els.turnConsole || document.querySelector(".turn-console");
  els.boardCenter = els.boardCenter || document.querySelector(".board-center");
}

function bindEvents() {
  els.countPicker.addEventListener("click", (event) => {
    const button = event.target.closest("[data-count]");
    if (!button) return;
    setSetupCount(Number(button.dataset.count));
  });

  els.startCashPresets.addEventListener("click", (event) => {
    const button = event.target.closest("[data-start-cash]");
    if (!button) return;
    ensureAudio();
    playSound("click");
    normalizeStartingCash(Number(button.dataset.startCash));
  });

  els.startingCashInput.addEventListener("input", () => {
    const parsed = Number(els.startingCashInput.value);
    if (Number.isFinite(parsed) && parsed > 0) {
      startingCash = clampStartingCash(parsed);
      updateSetupCashUI(false);
    }
  });

  els.startingCashInput.addEventListener("blur", () => {
    const value = els.startingCashInput.value === "" ? startingCash : els.startingCashInput.value;
    normalizeStartingCash(value);
    els.startingCashInput.value = String(startingCash);
  });

  els.startingCashInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      els.startingCashInput.blur();
    }
  });

  els.startBtn.addEventListener("click", startGameFromSetup);
  els.setupRulesBtn.addEventListener("click", () => {
    ensureAudio();
    playSound("click");
    showRules();
  });
  els.rulesBtn.addEventListener("click", () => {
    ensureAudio();
    playSound("click");
    if (guardTableAction()) return;
    showRules();
  });
  els.sideRulesBtn.addEventListener("click", () => {
    ensureAudio();
    playSound("click");
    closeSidePanel();
    if (guardTableAction()) return;
    showRules();
  });

  els.soundBtn.addEventListener("click", () => {
    ensureAudio();
    if (soundOn && audioCtx && audioCtx.state !== "running") {
      audioCtx.resume().catch(() => {});
      playSound("click");
      updateSoundButton();
      return;
    }
    soundOn = !soundOn;
    updateSoundButton();
    if (soundOn) {
      ensureAudio();
      playSound("click");
      showToast("♪", "Sound on", "Audio is live for the table.", "gain", 1800);
    }
  });

  els.newGameBtn.addEventListener("click", async () => {
    ensureAudio();
    playSound("click");
    if (!game) return;
    if (guardTableAction()) return;
    const confirmed = await confirmDialog({
      icon: "↺",
      kicker: "LEAVE THE TABLE",
      title: "Start over?",
      text: "This will end the current game and return everyone to the lobby. Your empire will not survive.",
      confirmLabel: "NEW GAME",
      confirmClass: "btn-danger",
    });
    if (confirmed) showSetup();
  });

  els.rollBtn.addEventListener("click", () => {
    ensureAudio();
    playSound("click");
    handleRoll();
  });

  els.payJailBtn.addEventListener("click", () => {
    ensureAudio();
    playSound("click");
    payJailFee();
  });

  els.useJailCardBtn.addEventListener("click", () => {
    ensureAudio();
    playSound("click");
    useJailCard();
  });

  els.assetsBtn.addEventListener("click", () => {
    ensureAudio();
    playSound("click");
    closeSidePanel();
    openAssetsModal();
  });

  els.drawerTradeBtn.addEventListener("click", () => {
    ensureAudio();
    playSound("click");
    closeSidePanel();
    openTradeModal();
  });

  els.turnAssetsBtn.addEventListener("click", () => {
    ensureAudio();
    playSound("click");
    openAssetsModal();
  });

  els.tradeBtn.addEventListener("click", () => {
    ensureAudio();
    playSound("click");
    openTradeModal();
  });

  els.tableBtn.addEventListener("click", () => {
    ensureAudio();
    playSound("click");
    toggleSidePanel();
  });

  els.sidePanelClose.addEventListener("click", () => {
    playSound("click");
    closeSidePanel();
  });

  els.drawerBackdrop.addEventListener("click", closeSidePanel);

  document.addEventListener("keydown", (event) => {
    if (event.code !== "Space") return;
    if (!game || isOverlayOpen() || isSidePanelOpen() || game.gameOver || game.phase !== "roll") return;
    if (document.activeElement && ["INPUT", "TEXTAREA", "BUTTON", "SELECT"].includes(document.activeElement.tagName)) return;
    event.preventDefault();
    ensureAudio();
    handleRoll();
  });

  document.addEventListener("pointerdown", () => {
    if (!soundOn) return;
    ensureAudio();
    updateSoundButton();
  }, { passive: true });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isSidePanelOpen() && !isOverlayOpen()) {
      closeSidePanel();
    }
  });

  document.addEventListener("keydown", () => {
    if (soundOn) ensureAudio();
  });

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && soundOn) ensureAudio();
  });

  window.addEventListener("focus", () => {
    if (soundOn) ensureAudio();
  });

  window.addEventListener("resize", resizeFx);
}

function init() {
  cacheElements();
  buildDice();
  resizeFx();
  renderSetupPlayers();
  bindEvents();
  updateSoundButton();
  updateSetupCashUI();
  els.tableBtn.setAttribute("aria-expanded", "false");
  els.tableBtn.setAttribute("aria-controls", "sidePanel");
  if (window.matchMedia("(pointer: coarse)").matches) {
    const rollHint = document.querySelector(".roll-btn small");
    if (rollHint) rollHint.textContent = "Tap to roll";
  }
}

init();