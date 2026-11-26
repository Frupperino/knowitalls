/* Rum i Firestore-samlingarna game och players, som reglerna redan tillåter. */
(function (root) {
  const ALPHA = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

  function makeCode() {
    let s = "";
    for (let i = 0; i < 4; i++) s += ALPHA[Math.floor(Math.random() * ALPHA.length)];
    return s;
  }

  function explainError(err) {
    const code = (err && err.code) || "";
    if (code.indexOf("permission-denied") >= 0) {
      return "Rummet gick inte att öppna. Reglerna i Firebase gäller till 15 december 2026.";
    }
    if (code.indexOf("unavailable") >= 0 || code.indexOf("network") >= 0 || (err && err.message === "offline")) {
      return "Ingen kontakt med rummet. Kolla nätet och försök igen.";
    }
    if (code.indexOf("not-found") >= 0 || (err && err.message === "missing")) {
      return "Hittar inget rum med den koden.";
    }
    return "Något gick snett med rummet. Försök igen.";
  }

  function connect() {
    if (!root.firebase || !root.FIREBASE_CONFIG) return null;
    if (!root.firebase.apps.length) root.firebase.initializeApp(root.FIREBASE_CONFIG);
    const store = root.firebase.firestore();
    const FV = root.firebase.firestore.FieldValue;
    let unsubRoom = null;
    let unsubPlayers = null;

    function stop() {
      if (unsubRoom) unsubRoom();
      if (unsubPlayers) unsubPlayers();
      unsubRoom = null;
      unsubPlayers = null;
    }

    function roomRef(code) { return store.collection("game").doc(code); }
    function playerRef(id) { return store.collection("players").doc(id); }

    function listen(code, onData, onErr) {
      stop();
      let room = null;
      let roster = [];
      function emit() { if (room) onData(room, roster); }
      unsubRoom = roomRef(code).onSnapshot(function (snap) {
        if (!snap.exists || snap.data().app !== "studio") {
          onErr(explainError({ message: "missing" }));
          return;
        }
        room = snap.data();
        emit();
      }, function (err) { onErr(explainError(err)); });
      unsubPlayers = store.collection("players").where("room", "==", code).onSnapshot(function (qs) {
        roster = qs.docs.map(function (doc) { return Object.assign({ id: doc.id }, doc.data()); });
        emit();
      }, function (err) { onErr(explainError(err)); });
    }

    async function createRoom(opts) {
      let last = null;
      for (let n = 0; n < 6; n++) {
        const code = makeCode();
        const ref = roomRef(code);
        try {
          await store.runTransaction(async function (tx) {
            const snap = await tx.get(ref);
            if (snap.exists) throw new Error("taken");
            tx.set(ref, {
              app: "studio",
              code: code,
              hostId: opts.playerId,
              phase: "lobby",
              qi: 0,
              qIds: [],
              preps: {},
              playerIds: [opts.playerId],
              length: opts.length,
              cat: opts.cat,
              type: opts.type,
              created: FV.serverTimestamp(),
            });
          });
          await playerRef(opts.playerId).set({
            app: "studio",
            room: code,
            name: opts.name,
            score: 0,
            streak: 0,
            answeredQi: -1,
            joined: FV.serverTimestamp(),
          });
          return code;
        } catch (err) {
          last = err;
          if (err && err.message === "taken") continue;
          throw err;
        }
      }
      throw last || new Error("taken");
    }

    async function joinRoom(code, opts) {
      const ref = roomRef(code);
      const snap = await ref.get();
      if (!snap.exists || snap.data().app !== "studio") {
        const error = new Error("missing");
        error.code = "not-found";
        throw error;
      }
      const existing = await playerRef(opts.playerId).get();
      const same = existing.exists && existing.data().room === code && existing.data().app === "studio";
      if (same) {
        await playerRef(opts.playerId).set({ name: opts.name }, { merge: true });
      } else {
        await playerRef(opts.playerId).set({
          app: "studio",
          room: code,
          name: opts.name,
          score: 0,
          streak: 0,
          answeredQi: -1,
          joined: FV.serverTimestamp(),
        });
      }
      await ref.update({ playerIds: FV.arrayUnion(opts.playerId) });
    }

    async function submit(playerId, answer) {
      await playerRef(playerId).set({ answer: answer, answeredQi: answer.qi }, { merge: true });
    }

    async function reveal(code, grade) {
      const ref = roomRef(code);
      await store.runTransaction(async function (tx) {
        const roomSnap = await tx.get(ref);
        if (!roomSnap.exists) return;
        const room = roomSnap.data();
        if (room.phase !== "play") return;
        const qi = room.qi || 0;
        const qid = (room.qIds || [])[qi];
        const ids = room.playerIds || [];
        const snaps = [];
        for (let i = 0; i < ids.length; i++) snaps.push(await tx.get(playerRef(ids[i])));
        tx.update(ref, { phase: "reveal" });
        snaps.forEach(function (snap) {
          if (!snap.exists || snap.data().room !== code || snap.data().app !== "studio") return;
          const data = snap.data();
          const ans = data.answer && data.answer.qi === qi ? data.answer : null;
          const graded = grade(qid, ans, data.streak || 0);
          tx.update(snap.ref, {
            score: Math.max(0, (data.score || 0) + graded.raw),
            streak: graded.newStreak,
          });
        });
      });
    }

    async function advance(code) {
      const ref = roomRef(code);
      await store.runTransaction(async function (tx) {
        const snap = await tx.get(ref);
        if (!snap.exists) return;
        const room = snap.data();
        if (room.phase !== "reveal") return;
        const qi = room.qi || 0;
        if (qi + 1 >= (room.qIds || []).length) tx.update(ref, { phase: "end" });
        else tx.update(ref, { phase: "play", qi: qi + 1 });
      });
    }

    async function begin(code, payload) {
      const batch = store.batch();
      batch.update(roomRef(code), {
        phase: "play",
        qi: 0,
        qIds: payload.qIds,
        preps: payload.preps,
        length: payload.length,
        cat: payload.cat,
        type: payload.type,
      });
      payload.ids.forEach(function (id) {
        batch.set(playerRef(id), { score: 0, streak: 0, answeredQi: -1, answer: FV.delete() }, { merge: true });
      });
      await batch.commit();
    }

    async function leave(code, playerId) {
      await playerRef(playerId).set({ room: "", answeredQi: -1 }, { merge: true });
      try { await roomRef(code).update({ playerIds: FV.arrayRemove(playerId) }); } catch (e) { /* rummet kan redan vara borta */ }
    }

    return {
      listen: listen,
      stop: stop,
      createRoom: createRoom,
      joinRoom: joinRoom,
      submit: submit,
      reveal: reveal,
      advance: advance,
      begin: begin,
      leave: leave,
      explainError: explainError,
    };
  }

  root.KIAOnline = { connect: connect, makeCode: makeCode, explainError: explainError };
})(window);
