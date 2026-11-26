import fs from "fs";
import vm from "vm";

const context = { window: {}, globalThis: {} };
context.globalThis = context;
vm.createContext(context);
vm.runInContext(fs.readFileSync("logic.js", "utf8"), context);
vm.runInContext(fs.readFileSync("questions.js", "utf8"), context);
const KIA = context.window.KIA;
const qs = context.window.KIA_QUESTIONS;
const errors = [];
const ids = new Set();
const cats = {};
const types = {};

function err(id, msg) {
  errors.push((id || "?") + ": " + msg);
}

if (!Array.isArray(qs) || qs.length < 60) err(null, "behöver minst 60 frågor, fick " + (qs && qs.length));

for (const q of qs) {
  if (ids.has(q.id)) err(q.id, "dubblett");
  ids.add(q.id);
  cats[q.cat] = (cats[q.cat] || 0) + 1;
  types[q.type] = (types[q.type] || 0) + 1;
  if (!KIA.CATS[q.cat]) err(q.id, "okänd kategori");
  if (!KIA.TYPES[q.type]) err(q.id, "okänd typ");
  if (!q.q || q.q.length < 8) err(q.id, "frågetext saknas");
  if (!q.explain || !q.explain.startsWith("Visste du att ")) err(q.id, "förklaring ska börja med Visste du att");
  const body = (q.explain || "").slice("Visste du att ".length);
  const terms = body.match(/[.!?]/g) || [];
  if (terms.length !== 1 || !/[.!?]$/.test(q.explain)) err(q.id, "förklaringen ska vara en mening");
  if (q.type === "slider") {
    for (const k of ["min", "max", "step", "start", "answer", "perfect", "zero"]) {
      if (typeof q[k] !== "number" || !Number.isFinite(q[k])) err(q.id, k + " ogiltigt");
    }
    if (!(q.min < q.max)) err(q.id, "min/max");
    if (!(q.step > 0)) err(q.id, "step");
    if (!(q.answer > q.min && q.answer < q.max)) err(q.id, "svaret ligger inte i spannet");
    if (q.start < q.min || q.start > q.max) err(q.id, "start utanför");
    if (q.start === q.answer) err(q.id, "start är facit");
    if (!(q.zero > q.perfect)) err(q.id, "zero/perfect");
    const snapped = KIA.snap(q, q.answer);
    if (Math.abs(snapped - q.answer) > q.perfect) err(q.id, "går inte att träffa facit inom perfect");
    if (KIA.sliderScore(q, snapped) !== 1000) err(q.id, "exakt gissning ger inte 1000");
    if (KIA.sliderScore(q, q.answer + q.zero) !== 0) err(q.id, "nollgränsen ger poäng");
    const mid = (q.min + q.max) / 2;
    if (Math.abs(mid - q.answer) < q.step) err(q.id, "facit ligger på mittpunkten");
  } else if (q.type === "order") {
    if (!Array.isArray(q.items) || q.items.length !== 4) err(q.id, "ska ha 4 led");
    if (new Set(q.items).size !== 4) err(q.id, "led inte unika");
    if (!q.hint) err(q.id, "hint saknas");
    if (KIA.orderScore(q.items, q.items) !== 1000) err(q.id, "rätt ordning ger inte 1000");
    if (KIA.orderScore(q.items, [q.items[1], q.items[0], q.items[2], q.items[3]]) !== 500) err(q.id, "två rätt ger inte 500");
  } else if (q.type === "odd") {
    if (!Array.isArray(q.items) || q.items.length !== 4) err(q.id, "ska ha 4 alternativ");
    const oids = q.items.map((i) => i.id);
    const labels = q.items.map((i) => i.label);
    if (new Set(oids).size !== 4 || new Set(labels).size !== 4) err(q.id, "alternativ inte unika");
    if (!q.items.some((i) => i.id === q.odd)) err(q.id, "odd pekar fel");
    if (q.items.some((i) => !i.label || i.label.length < 2)) err(q.id, "tom etikett");
  } else if (q.type === "bluff") {
    if (typeof q.answer !== "boolean") err(q.id, "answer ska vara boolean");
    if (!q.claim || q.claim.length < 12) err(q.id, "påstående saknas");
  }
}

for (const [cat, n] of Object.entries(cats)) if (n < 8) err(cat, "bara " + n + " frågor");
for (const t of ["slider", "order", "odd", "bluff"]) if ((types[t] || 0) < 12) err(t, "bara " + (types[t] || 0));

if (KIA.multFor(0) !== 1 || KIA.multFor(1) !== 1 || KIA.multFor(2) !== 1.5 || KIA.multFor(3) !== 2) {
  err("mult", "fel multiplikator");
}
const sample = KIA.dealRound(qs, { cat: "alla", type: "alla", n: 5 }, [], () => 0.42);
const got = new Set(sample.map((q) => q.type));
if (sample.length !== 5 || got.size < 4) err("deal", "en blandad femma innehåller inte alla former: " + [...got].join(","));

let roundsOk = 0;
for (let i = 0; i < 30; i++) {
  const round = KIA.dealRound(qs, { cat: "alla", type: "alla", n: 10 }, qs.slice(0, 20).map((q) => q.id), Math.random);
  const groups = round.map((q) => q.group).filter(Boolean);
  if (new Set(groups).size !== groups.length) err("deal", "grupp krockade");
  if (round.length === 10) roundsOk++;
}
if (roundsOk !== 30) err("deal", "för korta rundor");

const year = qs.find((q) => q.id === "his-vasa");
if (KIA.withUnit(year, 1628) !== "1628") err("year", KIA.withUnit(year, 1628));
const km = qs.find((q) => q.id === "sve-langd");
if (!String(KIA.withUnit(km, 1572)).includes("1")) err("km", KIA.withUnit(km, 1572));
const perfect = KIA.titleFor(10000, 10);
const legend = KIA.titleFor(14000, 10);
if (perfect.name !== "Nationalencyklopedist") err("title", perfect.name);
if (legend.name !== "Riks-know-it-all") err("title", legend.name);

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log("ok", qs.length, "frågor", JSON.stringify(types), JSON.stringify(cats));
