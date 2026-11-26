# KnowItAlls

Frågesport på svenska, en statisk webbapp som kan ligga på GitHub Pages. Ingen backend, inga nycklar, inget byggsteg.

- `index.html` ritar skalet och utseendet.
- `questions.js` är frågebanken. Varje post har en förklaring som börjar med "Visste du att" och är en enda mening.
- `logic.js` är poäng, svit, kortgivning och titlar, utan DOM.
- `game.js` är vyerna: solo, sällskap utan tak på fyra, glidare, ordning, udda fågeln, sant eller bluff, bild och klipp.
- `media/` är lokala bilder och korta mp4-klipp. Inga externa länkar. Se `media/CREDITS.txt`.
- `check-questions.mjs` kollar att banken och poängen hänger ihop: `node check-questions.mjs`.
- Rekord för en blandad tiorunda sparas i `localStorage` under `kia-studio-v1`.
- `online.js` sköter rummet i Firestore. Samlingarna `game` och `players` används, som `firestore.rules` redan tillåter till 15 december 2026. Reglerna behöver inte publiceras om igen för det här.
- `firebase-config.js` är webbappens config. `firestore.rules` är oförändrade.
- Lokal test: `python3 -m http.server 8765`.
