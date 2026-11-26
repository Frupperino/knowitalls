# KnowItAlls

Frågesport på svenska, en statisk webbapp som kan ligga på GitHub Pages. Ingen backend, inga nycklar, inget byggsteg.

- `index.html` ritar skalet och utseendet.
- `questions.js` är frågebanken. Varje post har en förklaring som börjar med "Visste du att" och är en enda mening.
- `logic.js` är poäng, svit, kortgivning och titlar, utan DOM.
- `game.js` är vyerna: solo, sällskap utan tak på fyra, glidare, ordning, udda fågeln, sant eller bluff, bild och klipp.
- `media/` är lokala bilder och korta mp4-klipp. Inga externa länkar. Se `media/CREDITS.txt`.
- `check-questions.mjs` kollar att banken och poängen hänger ihop: `node check-questions.mjs`.
- Rekord för en blandad tiorunda sparas i `localStorage` under `kia-studio-v1`.
- `firebase-config.js` och `firestore.rules` hör till den äldre familjeveckan och används inte av spelet.
- Lokal test: `python3 -m http.server 8765`.
