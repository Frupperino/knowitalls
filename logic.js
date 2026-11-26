/* Ren spellogik utan DOM, så den går att köra i webbläsaren och i kontrollskriptet. */
(function (root) {
  const CATS = {
    sverige: "Sverige",
    historia: "Historia",
    vetenskap: "Vetenskap & natur",
    kultur: "Kultur & nöje",
    geografi: "Geografi & teknik",
    vardag: "Vardag & kluringar",
  };

  const TYPES = {
    slider: { name: "Närmast vinner", short: "Glidare", blurb: "Dra tills siffran känns rätt. Närmare ger mer." },
    order: { name: "Rätt ordning", short: "Ordning", blurb: "Lägg fyra saker i rätt följd. Varje träff räknas." },
    odd: { name: "Udda fågeln", short: "Udda", blurb: "Tre hör ihop. En bara låtsas. Kopplingen avslöjas efteråt." },
    bluff: { name: "Sant eller bluff?", short: "Bluff", blurb: "En riktig kuriosa mot en snygg lögn. Välj sida." },
  };

  const WAGERS = {
    forsiktig: { label: "Försiktig", win: 400, lose: 0, hint: "tryggt" },
    lagom: { label: "Kaxig", win: 800, lose: 0, hint: "standard" },
    allin: { label: "All-in", win: 1200, lose: -300, hint: "fel kostar" },
  };

  const RANKS = [
    { min: 0, name: "Nyfiken men vilse", line: "Du kom, du såg, du gissade. Nästa runda är din." },
    { min: 280, name: "Köksbordsfilosof", line: "Stark känsla för ungefär. Facit ville ha exakt." },
    { min: 480, name: "Fikalärd", line: "Godkänt vid köksbordet, och farlig när ämnet är ditt." },
    { min: 680, name: "Väl påläst", line: "Du skulle bli ombedd att ta plats i laget." },
    { min: 820, name: "Salongslejon", line: "Rummet lyssnade. Facit också." },
    { min: 980, name: "Nationalencyklopedist", line: "Tjock som ett band, snabb som en blick." },
    { min: 1200, name: "Riks-know-it-all", line: "Vi böjer oss. Kronan är din, åtminstone ikväll." },
  ];

  function shuffle(arr, rng) {
    const a = arr.slice();
    const rand = rng || Math.random;
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      const tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
    }
    return a;
  }

  function decimals(step) {
    if (!step || Number.isInteger(step)) return 0;
    const s = String(step);
    const i = s.indexOf(".");
    return i < 0 ? 0 : Math.min(4, s.length - i - 1);
  }

  function fmtNum(n, step) {
    const d = decimals(step);
    const v = Number(n);
    try {
      return v.toLocaleString("sv-SE", { minimumFractionDigits: d, maximumFractionDigits: d });
    } catch (e) {
      return d ? v.toFixed(d) : String(Math.round(v));
    }
  }

  function fmtInt(n) {
    const v = Math.round(Number(n) || 0);
    try {
      return v.toLocaleString("sv-SE");
    } catch (e) {
      return String(v);
    }
  }

  function snap(q, v) {
    const step = q.step || 1;
    const n = Math.round((Number(v) - q.min) / step);
    const s = q.min + n * step;
    const clamped = Math.min(q.max, Math.max(q.min, s));
    const d = decimals(step);
    const f = Math.pow(10, d);
    return Math.round(clamped * f) / f;
  }

  function sliderScore(q, guess) {
    const d = Math.abs(Number(guess) - Number(q.answer));
    if (d <= q.perfect) return 1000;
    if (d >= q.zero) return 0;
    const t = (d - q.perfect) / (q.zero - q.perfect);
    return Math.round(1000 * (1 - t) * (1 - t));
  }

  function orderScore(correct, placed) {
    let n = 0;
    for (let i = 0; i < correct.length; i++) if (placed[i] === correct[i]) n++;
    return n * 250;
  }

  function multFor(streak) {
    if (streak >= 3) return 2;
    if (streak >= 2) return 1.5;
    return 1;
  }

  function isHit(type, base, correct) {
    if (type === "odd" || type === "bluff") return !!correct;
    return base >= 500;
  }

  function titleFor(score, n) {
    const avg = n > 0 ? score / n : 0;
    let rank = RANKS[0];
    for (let i = 0; i < RANKS.length; i++) if (avg >= RANKS[i].min) rank = RANKS[i];
    return { name: rank.name, line: rank.line, avg: avg };
  }

  function trackPct(q, value) {
    if (q.max === q.min) return 0;
    const p = ((Number(value) - q.min) / (q.max - q.min)) * 100;
    return Math.min(100, Math.max(0, p));
  }

  function dealRound(all, opts, recentIds, rng) {
    const cat = (opts && opts.cat) || "alla";
    const type = (opts && opts.type) || "alla";
    const n = Math.max(0, (opts && opts.n) || 0);
    const pool = all.filter((q) => (cat === "alla" || q.cat === cat) && (type === "alla" || q.type === type));
    const recent = new Set(recentIds || []);
    const fresh = pool.filter((q) => !recent.has(q.id));
    const stale = pool.filter((q) => recent.has(q.id));
    const seen = new Set();
    const bag = shuffle(fresh, rng).concat(shuffle(stale, rng)).filter((q) => {
      if (seen.has(q.id)) return false;
      seen.add(q.id);
      return true;
    });
    const picked = [];
    const used = new Set();
    function blocked(q) {
      return !!(q.group && picked.some((p) => p.group === q.group));
    }
    function take(q) {
      if (!q || used.has(q.id) || blocked(q)) return false;
      picked.push(q);
      used.add(q.id);
      return true;
    }
    if (type === "alla" && n >= 4) {
      const types = shuffle(["slider", "order", "odd", "bluff"], rng);
      for (let i = 0; i < types.length; i++) {
        const t = types[i];
        const c = bag.find((q) => q.type === t && !used.has(q.id) && !blocked(q));
        if (c) take(c);
      }
    }
    for (let i = 0; i < bag.length && picked.length < n; i++) take(bag[i]);
    if (picked.length < Math.min(n, bag.length)) {
      for (let i = 0; i < bag.length && picked.length < n; i++) {
        const q = bag[i];
        if (!used.has(q.id)) {
          picked.push(q);
          used.add(q.id);
        }
      }
    }
    return shuffle(picked, rng).slice(0, n);
  }

  function withUnit(q, value) {
    const n = Number(value);
    const bareYear = !q.unit && n >= 1000 && n <= 2200;
    const num = bareYear ? String(Math.round(n)) : fmtNum(n, q.step || 1);
    return q.unit ? num + " " + q.unit : num;
  }

  root.KIA = {
    CATS: CATS,
    TYPES: TYPES,
    WAGERS: WAGERS,
    RANKS: RANKS,
    shuffle: shuffle,
    fmtNum: fmtNum,
    fmtInt: fmtInt,
    snap: snap,
    sliderScore: sliderScore,
    orderScore: orderScore,
    multFor: multFor,
    isHit: isHit,
    titleFor: titleFor,
    trackPct: trackPct,
    dealRound: dealRound,
    withUnit: withUnit,
  };
})(typeof window !== "undefined" ? window : globalThis);
