# KnowItAlls

Familjefrågesport för telefonen (webbapp, läggs till på hemskärmen). Poäng sparas i Firebase Firestore.

- `index.html` – hela spelet: frågebank (`RAW`), vyer och logik. Inget byggsteg.
- Svårighet: siffra efter kategoribokstaven i `RAW` (`F1` lätt/barn, `F2` medel, `F3` svår). Utan siffra: `B` = 1, övriga = 2. Barnkultur (`B`) kan vara svår, svårighet och ämne är oberoende.
- Spelare med `kid: true` får en egen variant av varje fråga (`qs[i].kid`), plockad bland lätta frågor. Vuxna får ca 60 % svåra. Använd alltid `qFor(L,i,spelare)` för att läsa en fråga.
- Frågetyper i `RAW`: `kat|fråga|rätt|fel|fel|fel` (text), `kat:q|fråga|citat|rätt|…` (citat), `kat:p|fråga|#hex,#hex|rätt|…` (färgpalett). Fotofrågor finns bara som egna frågor (`custom.img`, jpeg-dataURL ≤ ~130 kB) och refereras med `ref` i rundan.
- "Vilka är med?": `players.ready` (tidsstämpel) gäller bara samma kväll. Rundan väntar bara på de som är med (`activeIds`); är ingen markerad räknas alla. Regler-knappen i headern öppnar `#rules`.
- Spelbrädet "Leden mot toppen": 36 rutor, 1 ruta per 100 poäng ikväll, döljs under pågående fråga.
- `firebase-config.js` – webbappens Firebase-config (inte hemlig).
- `firestore.rules` – klistras in under Firestore > Regler i Firebase-konsolen. Öppet t.o.m. 2026-12-15.
- Samlingar: `players`, `points` (svar i pågående runda + bonuspoäng), `custom` (egna frågor), `game/live` (pågående runda), `game/used` (använda fråge-id), `game/r…` (en sammanslagen runda per dokument, skrivs i samma batch som svaren raderas).
- Admin: `game/admin` håller SHA-256 av PIN-koden. Telefonen som låst upp sparar hashen i localStorage (`kia-admin`). Adminpanelen ligger längst ner under Topplista. Glömd PIN: radera `game/admin` i Firebase-konsolen.
- Håll antalet dokument lågt: gratiskvoten är 50 000 läsningar/dygn och varje öppning läser alla samlingar.
- Text i spelet är på svenska (medvetet undantag, familjen spelar).
- Lokal test: `preview_start` med `fjallkampen` (python http.server på port 8765).
