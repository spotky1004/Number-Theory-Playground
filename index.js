const STORAGE_KEY = "nt-lang";
if (window.localStorage.getItem(STORAGE_KEY) === null) {
  window.localStorage.setItem(STORAGE_KEY, "en");
}
window.lang = window.localStorage.getItem(STORAGE_KEY);



import isPrime from "./funcs/isPrime.js";
import els, { createNavItem, createVariableItem } from "./els.js";
import datas from "./datas.js";

let curData = datas[0];

function htmlify(str) {
  let out = "";
  for (const line of str.split("\n")) {
    if (line === "") {
      out += "<br>";
    } else {
      out += `<div>${line}</div>`;
    }
  }

  return out;
}

/**
 * @param {import("./datas.js").Data} data 
 */
function open(data) {
  curData = data;

  els.func.title.style.setProperty("--color", data.color);
  els.func.icon.innerText = data.icon;
  els.func.name.innerText = data.strings[lang].name;
  els.func.vars.innerHTML = "";
  for (const varData of data.inputVars) {
    createVariableItem(varData);
  }
  els.func.description.innerHTML = htmlify(data.strings[lang].description);

  for (const el of els.func.output.children) {
    el.style.opacity = "0.3";
  }

  MathJax.typeset();
}

function run() {
  const { inputVars, calcFunc } = curData;
  let i = 0;

  /** @type {bigint[]} */
  const varValues = [];
  i = 0;
  for (const form of els.func.vars.querySelectorAll("input")) {
    const name = inputVars[i++].strings[lang].name;

    if (isNaN(parseInt(form.value))) {
      alert(`Variable ${name}: Wrong input!`);
      return false;
    }
    varValues.push(BigInt(form.value));
  }

  i = 0;
  for (const varData of inputVars) {
    const varValue = varValues[i++];

    const { strings, min, max, isPrime: needToPrime } = varData;
    const bMin = typeof min === "bigint" ? min : BigInt(min);
    const bMax = typeof max === "bigint" ? max : BigInt(max);

    const name = strings[lang].name;

    if (needToPrime && !isPrime(varValue)) {
      alert(`Variable ${name}: Must be a prime!`);
      return false;
    }
    if (!(bMin <= varValue && varValue <= bMax)) {
      alert(`Variable ${name}: Wrong range!`);
      return false;
    }
  }

  const result = calcFunc(...varValues);
  els.func.output.innerHTML = htmlify(result.out);
  MathJax.typeset();

  return true;
}

for (const data of datas) {
  const item = createNavItem(data);
  item.el.addEventListener("click", () => {
    open(data);
  });
}



open(datas[0]);

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    run();
  }
});

els.language.innerText = `Language: ${lang} (click to change)`;
els.language.addEventListener("click", () => {
  if (lang === "ko") localStorage.setItem(STORAGE_KEY, "en");
  if (lang === "en") localStorage.setItem(STORAGE_KEY, "ko");
  window.location.reload();
});
