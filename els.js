import { NUMS } from "./datas.js";

const els = {
  /** @type {HTMLDivElement} */
  mainContainer: document.getElementById("main-container"),
  /** @type {HTMLDivElement} */
  language: document.getElementById("language"),
  func: {
    /** @type {HTMLSpanElement} */
    nav: document.getElementById("func-nav"),
    /** @type {HTMLTemplateElement} */
    navItemTemplate: document.getElementById("template__func-nav__item"),
    /** @type {HTMLSpanElement} */
    screen: document.getElementById("func-screen"),
    /** @type {HTMLDivElement} */
    title: document.getElementById("func-title"),
    /** @type {HTMLSpanElement} */
    icon: document.getElementById("func-title__icon"),
    /** @type {HTMLSpanElement} */
    name: document.getElementById("func-title__name"),
    /** @type {HTMLDivElement} */
    description: document.getElementById("func-description"),
    /** @type {HTMLDivElement} */
    vars: document.getElementById("func-vars"),
    /** @type {HTMLTemplateElement} */
    varsItemTemplate: document.getElementById("template__func-var"),
    /** @type {HTMLDivElement} */
    output: document.getElementById("func-output")
  }
};

/**
 * @param {import("./datas.js").Data} data 
 */
export function createNavItem(data) {
  /** @type {HTMLDivElement} */
  const el = els.func.navItemTemplate.content.firstElementChild.cloneNode(true);
  const subEls = {
    /** @type {HTMLSpanElement} */
    icon: el.querySelector(".func-nav__item__icon"),
    /** @type {HTMLSpanElement} */
    name: el.querySelector(".func-nav__item__name")
  };

  el.style.setProperty("--color", data.color);
  subEls.icon.innerText = data.icon;
  subEls.name.innerText = data.strings[lang].name;

  els.func.nav.appendChild(el);

  return {
    el,
    els: subEls,
  }
}

/** @type {{[K in keyof typeof NUMS]: string}} */
const numsStr = {
  ZERO: "0",
  ONE: "1",
  MAX_MEMORY: "10^8",
  MAX_ITERABLE: "10^{10}",
  MAX_FACTORIZATIONABLE: "10^{50}",
  INF: "\\infty",
  MINUS_INF: "-\\infty"
};
/** @type {Map<bigint, string>} */
const numsInverse = new Map();
for (const [key, val] of Object.entries(NUMS)) {
  numsInverse.set(val, key);
}

/**
 * @param {import("./datas.js").InputVarData} data 
 */
export function createVariableItem(data) {
  /** @type {HTMLDivElement} */
  const el = els.func.varsItemTemplate.content.firstElementChild.cloneNode(true);
  const subEls = {
    /** @type {HTMLLabelElement} */
    name: el.querySelector(".func-var__name"),
    /** @type {HTMLInputElement} */
    input: el.querySelector(".func-var__input"),
    /** @type {HTMLLabelElement} */
    description: el.querySelector(".func-var__description"),
  };

  const { strings, min, max, isPrime } = data;
  const { name, description } = strings[lang];

  let conditionStr = "\\((";
  conditionStr += `${numsStr[numsInverse.get(min)]}\\ \\leq\\ ${name}\\ \\leq \\ ${numsStr[numsInverse.get(max)]}`;
  if (isPrime) {
    conditionStr += ",\\ is\\ prime";
  }
  conditionStr += ")\\)";

  subEls.name.innerText = `\\(${name}\\)`;
  subEls.name.for = `var__${name}`;
  subEls.input.id = `var__${name}`;
  subEls.description.innerText = `${description} ${conditionStr}`;
  subEls.description.for = `var__${name}`;
  els.func.vars.appendChild(el);

  MathJax.typeset();

  return {
    el,
    els: subEls
  }
}

export default els;
