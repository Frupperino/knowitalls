# KnowItAlls

Familjefrågesport för telefonen (webbapp, läggs till på hemskärmen). Poäng sparas i Firebase Firestore.

- `index.html` – hela spelet: frågebank (`RAW`), vyer och logik. Inget byggsteg.
- `firebase-config.js` – webbappens Firebase-config (inte hemlig).
- `firestore.rules` – klistras in under Firestore > Regler i Firebase-konsolen. Öppet t.o.m. 2026-12-15.
- Samlingar: `players`, `points` (quiz- och bonuspoäng), `custom` (egna frågor), `game/live` (pågående runda), `game/used` (använda fråge-id).
- Text i spelet är på svenska (medvetet undantag, familjen spelar).
- Lokal test: `preview_start` med `fjallkampen` (python http.server på port 8765).
