(function () {
  const KIA = window.KIA;
  const BANK = window.KIA_QUESTIONS;
  const app = document.getElementById("app");
  const live = document.getElementById("live");
  const KEY = "kia-studio-v1";
  const MAX_PLAYERS = 30;

  function playerColor(i) {
    const hues = [6, 168, 208, 28, 272, 138, 338, 188, 48, 232, 312, 92];
    const h = hues[i % hues.length];
    const light = 30 + (Math.floor(i / hues.length) % 2) * 8;
    return "hsl(" + h + " 58% " + light + "%)";
  }

  if (!KIA || !BANK) {
    app.innerHTML = '<main class="app"><article class="card"><h2>Frågorna kom inte fram.</h2><p>Ladda om sidan.</p></article></main>';
    return;
  }

  const stats = load();
  const S = {
    screen: "home",
    mode: "solo",
    cat: "alla",
    type: "alla",
    length: 10,
    per: 2,
    nPlayers: Array.isArray(stats.names) && stats.names.length >= 2 ? Math.min(30, stats.names.length) : 2,
    names: Array.isArray(stats.names) && stats.names.length >= 2 ? stats.names.slice(0, 30) : ["", ""],
    players: [],
    deck: [],
    di: 0,
    wager: "lagom",
    guess: null,
    placed: [null, null, null, null],
    selected: null,
    locked: false,
    last: null,
    log: [],
    newRecord: false,
    celebrated: false,
    wanted: 10,
  };

  let audioCtx = null;
  let ptr = null;
  let suppressClick = false;
  let holdTimer = null;

  function load() {
    try {
      const raw = JSON.parse(localStorage.getItem(KEY) || "{}");
      return {
        sound: !!raw.sound,
        best10: raw.best10 || null,
        last: raw.last || null,
        recentIds: Array.isArray(raw.recentIds) ? raw.recentIds : [],
        names: Array.isArray(raw.names) ? raw.names : [],
      };
    } catch (e) {
      return { sound: false, best10: null, last: null, recentIds: [], names: [] };
    }
  }

  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify({
        sound: stats.sound,
        best10: stats.best10,
        last: stats.last,
        recentIds: stats.recentIds.slice(0, 48),
        names: stats.names,
      }));
    } catch (e) { /* privat läge */ }
  }

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));
  }

  function clip(s, n) {
    s = String(s || "");
    return s.length <= n ? s : s.slice(0, n - 1).trim() + "…";
  }

  function fmtMult(m) {
    return String(m).replace(".", ",");
  }

  function cur() {
    return S.deck[S.di];
  }

  function poolCount() {
    return BANK.filter((q) => (S.cat === "alla" || q.cat === S.cat) && (S.type === "alla" || q.type === S.type)).length;
  }

  function wantCount() {
    if (S.mode === "solo") return S.length;
    return Math.max(2, S.names.length) * S.per;
  }

  function ctx() {
    if (!stats.sound) return null;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    try {
      if (!audioCtx) audioCtx = new AC();
      if (audioCtx.state === "suspended") audioCtx.resume();
      return audioCtx;
    } catch (e) {
      return null;
    }
  }

  function beep(freq, dur, type, gain) {
    const c = ctx();
    if (!c) return;
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = type || "sine";
    o.frequency.value = freq;
    const t = c.currentTime;
    g.gain.setValueAtTime(gain || 0.028, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g);
    g.connect(c.destination);
    o.start(t);
    o.stop(t + dur + 0.02);
  }

  function chord(freqs) {
    freqs.forEach((f, i) => setTimeout(() => beep(f, 0.13, "sine", 0.03), i * 80));
  }

  function iconSound(on) {
    return on
      ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M3 10h4l5-4v12l-5-4H3z"/><path fill="none" stroke="currentColor" stroke-width="2" d="M16 9a4 4 0 010 6M18.5 7a7 7 0 010 10"/></svg>'
      : '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M3 10h4l5-4v12l-5-4H3z"/><path fill="none" stroke="currentColor" stroke-width="2" d="M16 10l5 5M21 10l-5 5"/></svg>';
  }

  function header(opts) {
    const inRound = S.screen === "play" || S.screen === "feedback" || S.screen === "handoff";
    const brand = inRound
      ? '<div class="brand"><span class="mark" aria-hidden="true"></span><span>KnowItAlls</span></div>'
      : '<button type="button" class="brand" data-act="home"><span class="mark" aria-hidden="true"></span><span>KnowItAlls</span></button>';
    const score = opts && opts.score != null
      ? '<div class="scorepill"><b>' + KIA.fmtInt(opts.score) + '</b><span>poäng</span></div>'
      : "";
    const who = opts && opts.who ? '<div class="who">' + esc(opts.who) + "</div>" : "";
    const abort = inRound ? '<button type="button" class="textbtn" data-act="abort">Avbryt</button>' : "";
    return '<header class="top">' + brand + who + '<div class="top-gap"></div>' + score + abort +
      '<button type="button" class="iconbtn' + (stats.sound ? " on" : "") + '" data-act="sound" aria-pressed="' + stats.sound + '" aria-label="' + (stats.sound ? "Stäng av ljud" : "Sätt på ljud") + '">' + iconSound(stats.sound) + "</button></header>";
  }

  function shell(inner, opts) {
    return '<div class="app">' + header(opts || {}) + "<main>" + inner + "</main></div>";
  }

  function segs() {
    return '<div class="segs" aria-hidden="true">' + S.deck.map((_, i) => {
      const cls = i < S.di ? "done" : i === S.di ? "now" : "";
      return '<i class="' + cls + '"></i>';
    }).join("") + "</div>";
  }

  function render(opts) {
    const scroll = opts && opts.scroll;
    let html = "";
    if (S.screen === "home") html = viewHome();
    else if (S.screen === "setup") html = viewSetup();
    else if (S.screen === "help") html = viewHelp();
    else if (S.screen === "handoff") html = viewHandoff();
    else if (S.screen === "play") html = viewPlay();
    else if (S.screen === "feedback") html = viewFeedback();
    else if (S.screen === "end") html = viewEnd();
    app.innerHTML = html;
    if (scroll) window.scrollTo(0, 0);
    const race = document.querySelector(".race-wrap");
    const up = race && race.querySelector(".up");
    if (race && up) race.scrollTop = Math.max(0, up.offsetTop - race.offsetTop - 8);
    const strip = document.querySelector(".strip");
    const chipNow = strip && strip.querySelector(".up");
    if (strip && chipNow) strip.scrollLeft = Math.max(0, chipNow.offsetLeft - 16);
    if (S.screen === "end") celebrate();
    const say = S.last && S.screen === "feedback" ? S.last.title + ". " + S.last.detail : "";
    if (say && live.textContent !== say) live.textContent = say;
  }

  function viewHome() {
    const tiles = Object.keys(KIA.TYPES).map((k) => {
      const t = KIA.TYPES[k];
      const color = { slider: "var(--slider)", order: "var(--order)", odd: "var(--odd)", bluff: "var(--bluff)", media: "var(--media)" }[k];
      return '<button type="button" class="mech" data-act="mech" data-v="' + k + '"><i style="--c:' + color + '"></i><b>' + esc(t.name) + "</b><span>" + esc(t.blurb) + "</span></button>";
    }).join("");
    let record = "";
    if (stats.best10) {
      record = '<p class="fine">Rekord, blandad tiorunda: <b>' + KIA.fmtInt(stats.best10.score) + "</b> · " + esc(stats.best10.title) + "</p>";
    } else {
      record = '<p class="fine">Inget rekord än. En blandad tiorunda skriver in dig.</p>';
    }
    return shell(
      '<div class="home"><section class="hero"><p class="kicker">Frågesport på svenska</p><h1>Vem kan mest ikväll?</h1><p class="lede">Glid fram till rätt år, lägg saker i ordning, avslöja bluffen eller gissa vad bilden och klippet är.</p>' + record + '<p class="fine"><button type="button" class="linkish" data-act="help">Så funkar det</button></p></section><section><div class="modes"><button type="button" class="mode solo" data-act="solo"><small>En spelare</small><strong>Solo</strong><span>En runda, ett rekord, ingen att skylla på.</span></button><button type="button" class="mode" data-act="party"><small>Samma telefon</small><strong>Sällskap</strong><span>Skicka luren. Så många ni är.</span></button></div><div class="mechs" style="margin-top:12px">' + tiles + '</div><p class="fine">Poäng och rekord stannar i den här telefonen. ' + BANK.length + " frågor i leken.</p></section></div>"
    );
  }

  function chip(act, value, label, on) {
    return '<button type="button" class="chip" data-act="' + act + '" data-v="' + esc(value) + '" aria-pressed="' + (on ? "true" : "false") + '">' + esc(label) + "</button>";
  }

  function viewSetup() {
    const cats = chip("cat", "alla", "Alla", S.cat === "alla") + Object.keys(KIA.CATS).map((k) => chip("cat", k, KIA.CATS[k], S.cat === k)).join("");
    const types = chip("type", "alla", "Blandat", S.type === "alla") + Object.keys(KIA.TYPES).map((k) => chip("type", k, KIA.TYPES[k].name, S.type === k)).join("");
    const pool = poolCount();
    const want = wantCount();
    const playN = Math.min(pool, want);
    let note = playN === 0
      ? "Inga frågor i den kombon."
      : playN < want
        ? "Bara " + playN + " frågor matchar, så rundan blir kortare."
        : "Rundan blir " + playN + " frågor.";
    let extra = "";
    if (S.mode === "solo") {
      extra = '<div class="block"><span class="lbl">Antal frågor</span><div class="seg" role="group">' +
        [5, 10, 15].map((n) => '<button type="button" data-act="len" data-v="' + n + '" aria-pressed="' + (S.length === n) + '">' + n + "</button>").join("") +
        "</div></div>";
    } else {
      const n = S.names.length;
      const perWord = S.per === 1 ? "fråga" : "frågor";
      const rows = S.names.map((name, i) => {
        const rm = n <= 2 ? " disabled" : "";
        return '<div class="namerow"><i class="pdot" style="background:' + playerColor(i) + '"></i><input data-namei="' + i + '" maxlength="18" placeholder="Spelare ' + (i + 1) + '" value="' + esc(name || "") + '" autocomplete="off" aria-label="Namn på spelare ' + (i + 1) + '"><button type="button" class="rm" data-act="rmplayer" data-v="' + i + '" aria-label="Ta bort spelare ' + (i + 1) + '"' + rm + ">×</button></div>";
      }).join("");
      const addLabel = n >= MAX_PLAYERS ? "30 spelare räcker nu" : "+ Lägg till spelare";
      extra = '<div class="block"><span class="lbl">Spelare</span><div class="roster">' + rows + '</div><button type="button" class="ghost addplayer" data-act="addplayer"' + (n >= MAX_PLAYERS ? " disabled" : "") + ">" + addLabel + "</button></div>" +
        '<div class="block"><span class="lbl">Frågor var</span><div class="seg">' +
        [1, 2, 3].map((k) => '<button type="button" data-act="per" data-v="' + k + '" aria-pressed="' + (S.per === k) + '">' + k + "</button>").join("") +
        "</div><p class=\"fine\">Alla får lika många frågor, i tur och ordning. " + n + " spelare × " + S.per + " " + (S.per === 1 ? "fråga" : "frågor") + ".</p></div>";
      note = (playN === 0
        ? "Inga frågor i den kombon."
        : playN < want
          ? "Bara " + playN + " frågor matchar, så alla kanske inte hinner lika många."
          : n + " spelare får " + S.per + " " + perWord + " var. Rundan blir " + playN + " frågor.");
    }
    return shell(
      '<article class="card narrow"><p class="kicker">' + (S.mode === "solo" ? "Solo" : "Sällskap") + '</p><h2>Bygg rundan</h2><p class="sub">' + note + "</p>" +
      extra +
      '<div class="block"><span class="lbl">Kategori</span><div class="chips">' + cats + "</div></div>" +
      '<div class="block"><span class="lbl">Frågeform</span><div class="chips">' + types + "</div></div>" +
      '<button type="button" class="primary" data-act="start"' + (playN ? "" : " disabled") + ">Starta rundan</button>" +
      '<button type="button" class="ghost" data-act="home">Tillbaka</button></article>'
    );
  }

  function viewHelp() {
    const blocks = [
      ["Närmast vinner", "Dra reglaget till ett år, ett mått eller ett antal. Mitt i prick ger 1 000 poäng. Ju längre ifrån, desto färre, och riktigt långt bort ger noll."],
      ["Rätt ordning", "Tryck i den ordning sakerna ska ligga, eller dra dem till en plats. Varje sak på rätt plats ger 250 poäng. Alla fyra ger 1 000. Ångra tömmer den sista fyllda platsen."],
      ["Udda fågeln", "Tre hör ihop på ett sätt som inte sägs högt. Välj den som bryter mönstret. Kopplingen visas när du har låst svaret."],
      ["Sant eller bluff?", "Ett påstående som antingen är sant eller för snyggt för att vara sant. Efteråt kommer en mening om varför."],
      ["Satsa", "På udda fågeln, sant eller bluff och bildfrågor väljer du insats innan du låser. Försiktig ger 400, Kaxig ger 800. All-in ger 1 200, men kostar 300 om du har fel. Poängen kan inte gå under noll."],
      ["Svit", "Håller du i gång sviten ger den tredje träffen ×1,5 och varje träff därefter ×2. En träff är ett rätt svar, eller minst 500 poäng på en glidare eller en ordning. En miss nollar sviten. I sällskap har var och en sin egen."],
      ["Bild och klipp", "En stillbild eller ett kort, tyst klipp. Det spelas upp direkt i sidan, och Spela igen startar om. Satsa och välj vad du tror att du ser."],
      ["Solo och sällskap", "Solo är fem, tio eller femton frågor. Rekordet sparas för en blandad tiorunda, i den här telefonen. I sällskap lägger ni till så många spelare ni är och väljer en, två eller tre frågor var. Frågan döljs tills den som ska svara är redo."],
    ];
    return shell(
      '<article class="card narrow help"><p class="kicker">Regler</p><h2>Så funkar det</h2>' +
      blocks.map((b) => "<h3>" + b[0] + "</h3><p>" + b[1] + "</p>").join("") +
      '<button type="button" class="primary" data-act="home">Tillbaka</button></article>'
    );
  }

  function viewHandoff() {
    const entry = cur();
    const p = S.players[entry.pi];
    const race = '<div class="race-wrap"><ul class="race">' + S.players.map((pl, i) =>
      '<li class="' + (i === entry.pi ? "up" : "") + '"><b><i class="pdot" style="background:' + pl.color + '"></i>' + esc(pl.name) + '</b><em>' + KIA.fmtInt(pl.score) + "</em></li>"
    ).join("") + "</ul></div>";
    return shell(
      '<article class="card narrow hand"><p class="kicker">Fråga ' + (S.di + 1) + " av " + S.deck.length + '</p><p class="sub">Ge telefonen till</p><div class="who2" style="color:' + p.color + '">' + esc(p.name) + "</div><p>Ingen tjuvtitt. Tryck först när det är din tur.</p>" + race +
      '<button type="button" class="primary" data-act="ready">Jag är redo</button></article>',
      { score: p.score, who: p.name }
    );
  }

  function viewPlay() {
    const entry = cur();
    const q = entry.q;
    const p = S.players[entry.pi];
    const mult = KIA.multFor(p.streak);
    const svit = p.streak > 0
      ? '<div class="svit' + (mult > 1 ? " hot" : "") + '">Svit ' + p.streak + (mult > 1 ? " · ×" + fmtMult(mult) : "") + "</div>"
      : "";
    let body = "";
    if (q.type === "slider") body = sliderBody(q);
    else if (q.type === "order") body = orderBody(entry);
    else if (q.type === "odd") body = oddBody(entry);
    else if (q.type === "media") body = mediaBody(entry);
    else body = bluffBody(q);
    const headline = q.type === "bluff" ? q.claim : q.q;
    const ready = canLock();
    return shell(
      '<article class="card play">' + segs() + scoreStrip() +
      '<div class="meta"><span class="pill" data-type="' + q.type + '">' + esc(KIA.TYPES[q.type].name) + '</span><span class="pill quiet">' + esc(KIA.CATS[q.cat]) + '</span><span class="count">' + (S.di + 1) + " / " + S.deck.length + "</span></div>" +
      svit +
      '<h2 class="q">' + esc(headline) + "</h2>" +
      '<p class="hint">' + esc(playHint(q)) + "</p>" +
      body +
      '<div class="lockbar"><button type="button" class="primary" data-act="lock"' + (ready ? "" : " disabled") + ">Lås in</button>" +
      '<p class="keys">' + esc(keysHint(q)) + "</p></div></article>",
      { score: p.score, who: S.mode === "party" ? p.name : "" }
    );
  }

function playHint(q) {
  if (q.type === "slider") return "Dra tills siffran känns rätt. Närmare ger mer.";
  if (q.type === "order") return q.hint + ". Tryck i ordning, eller dra till en plats.";
  if (q.type === "odd") return "Tre hör ihop. En bara låtsas. Satsa innan du låser.";
  if (q.type === "media") return q.media && q.media.kind === "video"
    ? "Klippet är tyst och snurrar. Satsa och gissa vad du ser."
    : "Titta noga. Satsa och välj det som stämmer.";
  return "Satsa först. Välj sen sida.";
}

function keysHint(q) {
  if (q.type === "slider") return "Enter låser. Piltangenter rör glidaren.";
  if (q.type === "order") return "Enter låser när alla fyra sitter på plats.";
  if (q.type === "odd" || q.type === "media") return "Enter låser. Tangenterna 1–4 väljer.";
  return "Enter låser. S är sant, B är bluff.";
}

  function scoreStrip() {
    if (S.mode !== "party" || S.players.length < 2) return "";
    const here = cur() ? cur().pi : -1;
    return '<div class="strip" aria-label="Ställning">' + S.players.map((p, i) =>
      '<span class="' + (i === here ? "up" : "") + '"><i class="pdot" style="background:' + p.color + '"></i>' + esc(p.name) + "<b>" + KIA.fmtInt(p.score) + "</b></span>"
    ).join("") + "</div>";
  }

  function mediaFigure(q) {
    const m = q.media;
    let inner;
    if (m.kind === "video") {
      inner = '<video src="' + esc(m.src) + '" poster="' + esc(m.poster || "") + '" playsinline muted loop autoplay preload="auto"></video>' +
        '<button type="button" class="replay" data-act="replay">Spela igen</button>';
    } else {
      inner = '<img src="' + esc(m.src) + '" alt="' + esc(m.alt || "") + '">';
    }
    return '<figure class="stage-media">' + inner + "</figure>" +
      (m.credit ? '<p class="credit">' + esc(m.credit) + "</p>" : "");
  }

  function mediaBody(entry) {
    const q = entry.q;
    const items = entry.mediaOrder.map((id) => q.choices.find((choice) => choice.id === id));
    const choices = items.map((item, i) =>
      '<button type="button" class="choice" data-act="media" data-v="' + esc(item.id) + '" aria-pressed="' + (S.selected === item.id) + '">' + (i + 1) + ". " + esc(item.label) + "</button>"
    ).join("");
    return mediaFigure(q) + wagerBar() + '<div class="choices">' + choices + "</div>";
  }

  function sliderBody(q) {
    const guess = KIA.snap(q, S.guess);
    return '<div class="readout"><button type="button" class="nudge" data-act="nudge" data-d="-1" aria-label="Minska">−</button><b id="readout">' + esc(KIA.withUnit(q, guess)) + '</b><button type="button" class="nudge" data-act="nudge" data-d="1" aria-label="Öka">+</button></div>' +
      '<div class="sliderwrap"><input id="slider" type="range" min="' + q.min + '" max="' + q.max + '" step="' + q.step + '" value="' + guess + '" aria-label="Din gissning"></div>' +
      '<div class="ends"><span>' + esc(KIA.withUnit(q, q.min)) + "</span><span>" + esc(KIA.withUnit(q, q.max)) + "</span></div>";
  }

  function orderBody(entry) {
    const used = new Set(S.placed.filter(Boolean));
    const pool = entry.pool.filter((label) => !used.has(label));
    const slots = S.placed.map((label, i) => {
      const inner = label
        ? '<button type="button" data-chip="' + esc(label) + '">' + esc(label) + "</button>"
        : '<span class="empty">Tom plats</span>';
      return '<div class="slot" data-slot="' + i + '"><b>' + (i + 1) + "</b>" + inner + "</div>";
    }).join("");
    const chips = pool.map((label) => '<button type="button" data-chip="' + esc(label) + '">' + esc(label) + "</button>").join("");
    return '<div class="slots">' + slots + '</div><div class="pool" data-pool="1">' + (chips || "") + '</div><button type="button" class="ghost" data-act="undo">Ångra sista</button>';
  }

  function oddBody(entry) {
    const q = entry.q;
    const items = entry.oddOrder.map((id) => q.items.find((item) => item.id === id));
    const choices = items.map((item, i) =>
      '<button type="button" class="choice" data-act="odd" data-v="' + esc(item.id) + '" aria-pressed="' + (S.selected === item.id) + '">' + (i + 1) + ". " + esc(item.label) + "</button>"
    ).join("");
    return wagerBar() + '<div class="choices">' + choices + "</div>";
  }

  function bluffBody(q) {
    return wagerBar() + '<div class="sides">' +
      '<button type="button" class="side sant" data-act="side" data-v="sant" aria-pressed="' + (S.selected === "sant") + '">Sant</button>' +
      '<button type="button" class="side bluff" data-act="side" data-v="bluff" aria-pressed="' + (S.selected === "bluff") + '">Bluff</button></div>';
  }

  function wagerBar() {
    return '<div class="wagers" role="group" aria-label="Insats">' + Object.keys(KIA.WAGERS).map((k) => {
      const w = KIA.WAGERS[k];
      const sub = w.lose ? "fel " + KIA.fmtInt(w.lose) : KIA.fmtInt(w.win) + " p";
      return '<button type="button" data-act="wager" data-v="' + k + '" aria-pressed="' + (S.wager === k) + '"><b>' + esc(w.label) + "</b><small>" + sub + "</small></button>";
    }).join("") + "</div>";
  }

  function viewFeedback() {
    const L = S.last;
    const p = S.players[cur().pi];
    const tone = L.tone === "good" ? "goodc" : L.tone === "mid" ? "midc" : "badc";
    const sign = L.delta > 0 ? "+" : "";
    let extraNote = "";
    if (L.mult > 1 && L.base > 0) extraNote += " Svit ×" + fmtMult(L.mult) + ".";
    if (L.raw < L.delta) extraNote += " Poängen kan inte gå under noll.";
    const last = S.di + 1 >= S.deck.length;
    const nextLabel = last ? "Se resultatet" : S.mode === "party" ? "Nästa spelare" : "Nästa fråga";
    return shell(
      '<article class="card play fb ' + L.tone + '">' + segs() + scoreStrip() +
      '<p class="kicker">' + esc(L.title) + "</p>" +
      '<p class="delta ' + tone + '">' + sign + KIA.fmtInt(L.delta) + "</p>" +
      '<p>' + esc(L.detail) + esc(extraNote) + "</p>" +
      L.extra +
      '<div class="note"><b>Visste du att</b>' + esc(L.explain.replace(/^Visste du att\s*/, "")) + "</div>" +
      '<button type="button" class="primary" data-act="next">' + nextLabel + "</button></article>",
      { score: p.score, who: S.mode === "party" ? p.name : "" }
    );
  }

  function sliderCompare(q, guess) {
    const you = KIA.trackPct(q, guess);
    const truth = KIA.trackPct(q, q.answer);
    return '<div class="cmp"><div class="cmp-track"><i class="you" style="left:' + you + '%"></i><i class="truth" style="left:' + truth + '%"></i></div><div class="key"><span><i class="you"></i>Du</span><span><i class="truth"></i>Facit</span></div></div>';
  }

  function orderCompare(correct, placed) {
    return '<ol class="cmp-order">' + correct.map((c, i) => {
      const ok = placed[i] === c;
      return '<li class="' + (ok ? "ok" : "no") + '"><span>' + (i + 1) + "</span><div>" + esc(placed[i] || "—") + (ok ? "" : '<em>Facit: ' + esc(c) + "</em>") + "</div></li>";
    }).join("") + "</ol>";
  }

  function viewEnd() {
    if (S.mode === "party") return shell(partyEnd());
    const n = S.deck.length || 1;
    const score = S.players[0].score;
    const title = KIA.titleFor(score, n);
    const ribbon = S.newRecord ? '<div class="ribbon">Nytt rekord</div>' : "";
    return shell(
      '<article class="card narrow"><p class="kicker">Solo · ' + n + " frågor</p>" + ribbon +
      '<h2 class="rank">' + esc(title.name) + "</h2><p>" + esc(title.line) + "</p>" +
      '<p class="delta">' + KIA.fmtInt(score) + " poäng</p>" +
      logList() +
      '<button type="button" class="primary" data-act="again">Spela igen</button>' +
      '<div class="rowbtns"><button type="button" class="ghost" data-act="setup">Byt upplägg</button><button type="button" class="ghost" data-act="home">Hem</button></div></article>'
    );
  }

  function partyEnd() {
    const ranked = S.players.map((p, i) => ({ p: p, i: i })).sort((a, b) => b.p.score - a.p.score || a.i - b.i);
    const top = ranked[0].p.score;
    const winners = ranked.filter((r) => r.p.score === top);
    const headline = winners.length > 1 ? "Delad seger i toppen" : winners[0].p.name + " tar hem studion";
    const rows = ranked.map((r) => {
      const n = S.log.filter((l) => l.pi === r.i).length;
      const title = n ? KIA.titleFor(r.p.score, n).name : "Föll utanför rundan";
      const place = ranked.filter((o) => o.p.score > r.p.score).length + 1;
      return '<li><div class="place">' + place + '</div><div><b>' + esc(r.p.name) + "</b><small>" + esc(title) + '</small></div><b class="sc">' + KIA.fmtInt(r.p.score) + "</b></li>";
    }).join("");
    return '<article class="card narrow"><p class="kicker">Sällskap</p><h2 class="rank">' + esc(headline) + '</h2><div class="podium-wrap"><ol class="podium">' + rows + "</ol></div>" +
      logList() +
      '<button type="button" class="primary" data-act="again">En runda till</button>' +
      '<div class="rowbtns"><button type="button" class="ghost" data-act="setup">Byt upplägg</button><button type="button" class="ghost" data-act="home">Hem</button></div></article>';
  }

  function logList() {
    if (!S.log.length) return "";
    return '<ul class="log">' + S.log.map((l) => {
      const sign = l.delta > 0 ? "+" : "";
      const who = S.mode === "party" ? esc(S.players[l.pi].name) + " · " : "";
      return "<li><div><small>" + who + esc(KIA.TYPES[l.type].short) + "</small><span>" + esc(clip(l.label, 80)) + "</span></div><b class=\"" + (l.delta > 0 ? "goodc" : l.delta < 0 ? "badc" : "") + "\">" + sign + KIA.fmtInt(l.delta) + "</b></li>";
    }).join("") + "</ul>";
  }

  function canLock() {
    const q = cur() && cur().q;
    if (!q || S.screen !== "play") return false;
    if (q.type === "slider") return true;
    if (q.type === "order") return S.placed.every(Boolean);
    return !!S.selected;
  }

  function openQuestion() {
    const entry = cur();
    const q = entry.q;
    S.wager = "lagom";
    S.selected = null;
    S.placed = [null, null, null, null];
    S.locked = false;
    S.last = null;
    S.guess = q.type === "slider" ? KIA.snap(q, q.start) : null;
    if (q.type === "order" && !entry.pool) entry.pool = KIA.shuffle(q.items.slice());
    if (q.type === "odd" && !entry.oddOrder) entry.oddOrder = KIA.shuffle(q.items.map((item) => item.id));
    if (q.type === "media" && !entry.mediaOrder) entry.mediaOrder = KIA.shuffle(q.choices.map((choice) => choice.id));
    S.screen = "play";
  }

  function cleanNames() {
    const used = new Set();
    const out = [];
    for (let i = 0; i < S.names.length; i++) {
      let n = String(S.names[i] || "").trim().replace(/\s+/g, " ").slice(0, 18);
      if (!n) n = "Spelare " + (i + 1);
      const base = n;
      let k = 2;
      while (used.has(n.toLowerCase())) {
        n = (base + " " + k).slice(0, 16);
        k++;
      }
      used.add(n.toLowerCase());
      out.push(n);
    }
    return out;
  }

  function startGame() {
    const want = wantCount();
    if (!poolCount()) return;
    if (S.mode === "party") {
      const names = cleanNames();
      stats.names = S.names.slice();
      S.nPlayers = names.length;
      S.players = names.map((name, i) => ({ name: name, score: 0, streak: 0, color: playerColor(i) }));
    } else {
      S.players = [{ name: "Du", score: 0, streak: 0, color: playerColor(0) }];
    }
    const qs = KIA.dealRound(BANK, { cat: S.cat, type: S.type, n: want }, stats.recentIds);
    S.deck = qs.map((q, i) => ({ q: q, pi: i % S.players.length }));
    S.di = 0;
    S.log = [];
    S.wanted = want;
    S.newRecord = false;
    S.celebrated = false;
    if (!S.deck.length) return;
    if (S.mode === "party") S.screen = "handoff";
    else openQuestion();
    render({ scroll: true });
    beep(520, 0.05, "sine", 0.02);
  }

  function lock() {
    if (S.screen !== "play" || S.locked || !canLock()) return;
    S.locked = true;
    const entry = cur();
    const q = entry.q;
    const player = S.players[entry.pi];
    const mult = KIA.multFor(player.streak);
    let base = 0;
    let correct = false;
    let title = "";
    let tone = "bad";
    let detail = "";
    let extra = "";
    let penalty = 0;

    if (q.type === "slider") {
      const guess = KIA.snap(q, S.guess);
      S.guess = guess;
      base = KIA.sliderScore(q, guess);
      correct = base >= 500;
      title = base >= 1000 && guess === q.answer ? "Mitt i prick" : base >= 1000 ? "Så gott som mitt i" : base >= 700 ? "Tätt inpå" : base >= 400 ? "I närheten" : base > 0 ? "En bit bort" : "Långt från facit";
      tone = base >= 750 ? "good" : base >= 400 ? "mid" : "bad";
      detail = "Du lade " + KIA.withUnit(q, guess) + ". Facit är " + KIA.withUnit(q, q.answer) + ".";
      extra = sliderCompare(q, guess);
    } else if (q.type === "order") {
      const hits = S.placed.filter((label, i) => label === q.items[i]).length;
      base = hits * 250;
      correct = base >= 500;
      title = hits === 4 ? "Hela raden stämmer" : hits === 3 ? "Tre på rätt plats" : hits === 2 ? "Halvvägs" : hits === 1 ? "En satt rätt" : "Ingen på rätt plats";
      tone = hits === 4 ? "good" : hits >= 2 ? "mid" : "bad";
      detail = hits + " av 4 satt på rätt plats.";
      extra = orderCompare(q.items, S.placed);
    } else {
      const w = KIA.WAGERS[S.wager];
      if (q.type === "odd") {
        correct = S.selected === q.odd;
        const picked = q.items.find((item) => item.id === S.selected);
        const right = q.items.find((item) => item.id === q.odd);
        detail = correct
          ? "Du plockade ut " + picked.label + "."
          : "Du valde " + picked.label + ". Udda fågeln var " + right.label + ".";
      } else if (q.type === "media") {
        correct = S.selected === q.answer;
        const picked = q.choices.find((choice) => choice.id === S.selected);
        const right = q.choices.find((choice) => choice.id === q.answer);
        detail = correct
          ? "Du svarade " + picked.label + "."
          : "Du svarade " + picked.label + ". Rätt var " + right.label + ".";
        extra = mediaFigure(q);
      } else {
        correct = (S.selected === "sant") === !!q.answer;
        detail = q.answer ? "Påståendet stämmer." : "Påståendet var en bluff.";
      }
      base = correct ? w.win : 0;
      penalty = correct ? 0 : w.lose;
      title = correct ? (S.wager === "allin" ? "All-in höll" : "Rätt") : (S.wager === "allin" ? "All-in sprack" : "Inte den här gången");
      tone = correct ? "good" : "bad";
    }

    const raw = Math.round(base * mult) + penalty;
    const before = player.score;
    player.score = Math.max(0, before + raw);
    const delta = player.score - before;
    const hit = KIA.isHit(q.type, base, correct);
    if (hit) player.streak += 1;
    else player.streak = 0;

    S.last = { title: title, tone: tone, detail: detail, extra: extra, delta: delta, raw: raw, base: base, mult: mult, explain: q.explain, streak: player.streak };
    S.log.push({
      pi: entry.pi,
      type: q.type,
      label: q.type === "bluff" ? q.claim : q.q,
      delta: delta,
      tone: tone,
    });
    S.screen = "feedback";
    if (tone === "good") chord([523, 659, 784]);
    else if (tone === "mid") chord([466, 587]);
    else beep(180, 0.16, "triangle", 0.03);
    if (hit && player.streak >= 3) setTimeout(() => chord([880, 1175]), 220);
    render({ scroll: true });
  }

  function next() {
    if (S.screen !== "feedback") return;
    S.di += 1;
    if (S.di >= S.deck.length) {
      finish();
      return;
    }
    if (S.mode === "party") S.screen = "handoff";
    else openQuestion();
    render({ scroll: true });
  }

  function finish() {
    const n = S.deck.length;
    if (S.mode === "solo") {
      const score = S.players[0].score;
      const title = KIA.titleFor(score, n).name;
      stats.last = { score: score, n: n, title: title, at: Date.now() };
      const standard = S.length === 10 && S.cat === "alla" && S.type === "alla" && n === 10;
      if (standard && score > 0 && (!stats.best10 || score > stats.best10.score)) {
        stats.best10 = { score: score, n: n, title: title, at: Date.now() };
        S.newRecord = true;
      }
    }
    stats.recentIds = S.deck.map((d) => d.q.id).concat(stats.recentIds).slice(0, 48);
    save();
    S.screen = "end";
    render({ scroll: true });
  }

  function celebrate() {
    if (S.celebrated) return;
    S.celebrated = true;
    const score = S.mode === "solo" ? S.players[0].score : Math.max.apply(null, S.players.map((p) => p.score));
    const avg = S.deck.length ? score / S.deck.length : 0;
    if (avg < 820) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      chord([523, 659, 784, 1046]);
      return;
    }
    const wrap = document.createElement("div");
    wrap.className = "confetti";
    const colors = ["#d63a2c", "#0f766e", "#e6a317", "#1d4e89", "#1c140f"];
    for (let i = 0; i < 28; i++) {
      const bit = document.createElement("i");
      bit.style.setProperty("--x", String(Math.random()));
      bit.style.setProperty("--d", (0.8 + Math.random() * 0.7) + "s");
      bit.style.setProperty("--c", colors[i % colors.length]);
      wrap.appendChild(bit);
    }
    document.body.appendChild(wrap);
    setTimeout(() => wrap.remove(), 1700);
    chord([523, 659, 784, 1046]);
  }

  function nudge(dir) {
    const q = cur() && cur().q;
    if (!q || q.type !== "slider" || S.screen !== "play") return;
    S.guess = KIA.snap(q, Number(S.guess) + dir * q.step);
    const input = document.getElementById("slider");
    const out = document.getElementById("readout");
    if (input) input.value = String(S.guess);
    if (out) out.textContent = KIA.withUnit(q, S.guess);
  }

  function stopHold() {
    if (holdTimer) clearTimeout(holdTimer);
    holdTimer = null;
  }

  function startHold(dir) {
    stopHold();
    nudge(dir);
    let delay = 260;
    const tick = () => {
      nudge(dir);
      delay = Math.max(45, delay * 0.82);
      holdTimer = setTimeout(tick, delay);
    };
    holdTimer = setTimeout(tick, delay);
  }

  function tapChip(label) {
    if (S.screen !== "play" || !cur() || cur().q.type !== "order") return;
    const from = S.placed.indexOf(label);
    if (from >= 0) S.placed[from] = null;
    else {
      const to = S.placed.indexOf(null);
      if (to < 0) return;
      S.placed[to] = label;
    }
    beep(640, 0.03, "sine", 0.02);
    render();
  }

  function dropChip(label, x, y) {
    const el = document.elementFromPoint(x, y);
    const slot = el && el.closest ? el.closest("[data-slot]") : null;
    const pool = el && el.closest ? el.closest("[data-pool]") : null;
    const from = S.placed.indexOf(label);
    if (slot) {
      const to = Number(slot.dataset.slot);
      const occupant = S.placed[to];
      if (from >= 0) S.placed[from] = occupant === label ? label : occupant;
      if (occupant !== label) S.placed[to] = label;
    } else if (pool && from >= 0) {
      S.placed[from] = null;
    }
    beep(520, 0.03, "sine", 0.02);
    render();
  }

  function showGhost(label, x, y) {
    let g = document.getElementById("ghost");
    if (!g) {
      g = document.createElement("div");
      g.id = "ghost";
      document.body.appendChild(g);
    }
    g.textContent = label;
    g.hidden = false;
    g.style.transform = "translate(" + (x + 12) + "px," + (y + 12) + "px)";
  }

  function hideGhost() {
    const g = document.getElementById("ghost");
    if (g) g.remove();
    document.querySelectorAll(".over").forEach((el) => el.classList.remove("over"));
  }

  function onAct(act, el) {
    if (act === "sound") {
      stats.sound = !stats.sound;
      save();
      beep(660, 0.06, "sine", 0.03);
      render();
      return;
    }
    if (act === "home") {
      S.screen = "home";
      render({ scroll: true });
      return;
    }
    if (act === "help") {
      S.screen = "help";
      render({ scroll: true });
      return;
    }
    if (act === "solo" || act === "party" || act === "setup") {
      S.mode = act === "party" ? "party" : act === "solo" ? "solo" : S.mode;
      S.screen = "setup";
      render({ scroll: true });
      return;
    }
    if (act === "mech") {
      S.mode = "solo";
      S.type = el.dataset.v;
      S.screen = "setup";
      render({ scroll: true });
      return;
    }
    if (act === "cat") { S.cat = el.dataset.v; render(); return; }
    if (act === "type") { S.type = el.dataset.v; render(); return; }
    if (act === "len") { S.length = Number(el.dataset.v); render(); return; }
    if (act === "per") { S.per = Number(el.dataset.v); render(); return; }
    if (act === "addplayer") {
      if (S.names.length >= MAX_PLAYERS) return;
      S.names.push("");
      S.nPlayers = S.names.length;
      render();
      const box = document.querySelector(".roster");
      const inputs = document.querySelectorAll("[data-namei]");
      if (box) box.scrollTop = box.scrollHeight;
      if (inputs.length) inputs[inputs.length - 1].focus();
      return;
    }
    if (act === "rmplayer") {
      if (S.names.length <= 2) return;
      S.names.splice(Number(el.dataset.v), 1);
      S.nPlayers = S.names.length;
      render();
      return;
    }
    if (act === "replay") {
      const video = document.querySelector(".stage-media video");
      if (video) {
        video.currentTime = 0;
        const playing = video.play();
        if (playing && playing.catch) playing.catch(function () {});
      }
      return;
    }
    if (act === "media") { S.selected = el.dataset.v; beep(600, 0.03, "sine", 0.02); render(); return; }
    if (act === "start" || act === "again") {
      if (act === "again") { /* behåll upplägget */ }
      startGame();
      return;
    }
    if (act === "ready") {
      openQuestion();
      render({ scroll: true });
      return;
    }
    if (act === "lock") { lock(); return; }
    if (act === "next") { next(); return; }
    if (act === "abort") {
      S.screen = "home";
      render({ scroll: true });
      return;
    }
    if (act === "undo") {
      for (let i = S.placed.length - 1; i >= 0; i--) {
        if (S.placed[i]) { S.placed[i] = null; break; }
      }
      render();
      return;
    }
    if (act === "wager") { S.wager = el.dataset.v; render(); return; }
    if (act === "odd") { S.selected = el.dataset.v; beep(600, 0.03, "sine", 0.02); render(); return; }
    if (act === "side") { S.selected = el.dataset.v; beep(600, 0.03, "sine", 0.02); render(); return; }
  }

  document.addEventListener("click", (e) => {
    if (suppressClick) { suppressClick = false; return; }
    const chip = e.target.closest && e.target.closest("[data-chip]");
    if (chip) { tapChip(chip.dataset.chip); return; }
    const el = e.target.closest && e.target.closest("[data-act]");
    if (!el || el.dataset.act === "nudge") return;
    onAct(el.dataset.act, el);
  });

  document.addEventListener("input", (e) => {
    const t = e.target;
    if (t && t.dataset && t.dataset.namei != null) {
      S.names[Number(t.dataset.namei)] = t.value;
      return;
    }
    if (t && t.id === "slider" && S.screen === "play") {
      S.guess = KIA.snap(cur().q, t.value);
      const out = document.getElementById("readout");
      if (out) out.textContent = KIA.withUnit(cur().q, S.guess);
    }
  });

  document.addEventListener("pointerdown", (e) => {
    const nudgeBtn = e.target.closest && e.target.closest("[data-act=nudge]");
    if (nudgeBtn) {
      e.preventDefault();
      startHold(Number(nudgeBtn.dataset.d));
      return;
    }
    const chip = e.target.closest && e.target.closest("[data-chip]");
    if (!chip || S.screen !== "play") return;
    ptr = { id: chip.dataset.chip, x: e.clientX, y: e.clientY, moved: false, pid: e.pointerId, el: chip };
    try { chip.setPointerCapture(e.pointerId); } catch (err) { /* en del webbläsare */ }
  });

  document.addEventListener("pointermove", (e) => {
    if (!ptr || e.pointerId !== ptr.pid) return;
    if (!ptr.moved && Math.hypot(e.clientX - ptr.x, e.clientY - ptr.y) < 8) return;
    if (!ptr.moved && ptr.el) ptr.el.classList.add("lift");
    ptr.moved = true;
    showGhost(ptr.id, e.clientX, e.clientY);
    document.querySelectorAll(".over").forEach((el) => el.classList.remove("over"));
    const under = document.elementFromPoint(e.clientX, e.clientY);
    const zone = under && under.closest ? under.closest("[data-slot], [data-pool]") : null;
    if (zone) zone.classList.add("over");
  });

  function endPtr(e) {
    if (!ptr || (e && e.pointerId !== ptr.pid)) return;
    const was = ptr;
    ptr = null;
    hideGhost();
    if (was.moved) {
      suppressClick = true;
      dropChip(was.id, e.clientX, e.clientY);
      setTimeout(() => { suppressClick = false; }, 350);
    }
  }

  document.addEventListener("pointerup", (e) => {
    stopHold();
    endPtr(e);
  });
  document.addEventListener("pointercancel", (e) => {
    stopHold();
    if (ptr) { ptr = null; hideGhost(); }
  });

  document.addEventListener("keydown", (e) => {
    const tag = e.target && e.target.tagName;
    if (tag === "INPUT" && e.target.type !== "range") return;
    if (S.screen === "play" && e.key === "Enter") {
      e.preventDefault();
      lock();
      return;
    }
    if (S.screen === "feedback" && e.key === "Enter") {
      e.preventDefault();
      next();
      return;
    }
    if (S.screen !== "play" || !cur()) return;
    const q = cur().q;
    if ((q.type === "odd" || q.type === "media") && "1234".includes(e.key)) {
      const order = q.type === "odd" ? cur().oddOrder : cur().mediaOrder;
      const item = order && order[Number(e.key) - 1];
      if (item) { S.selected = item; render(); }
    }
    if (q.type === "bluff" && (e.key === "1" || e.key.toLowerCase() === "s")) { S.selected = "sant"; render(); }
    if (q.type === "bluff" && (e.key === "2" || e.key.toLowerCase() === "b")) { S.selected = "bluff"; render(); }
    if ((q.type === "odd" || q.type === "bluff") && "12".includes(e.key) && e.key !== "Enter") {
      const map = { "1": "forsiktig", "2": "lagom" };
      if (e.altKey && map[e.key]) S.wager = map[e.key];
    }
  });

  render();
})();
