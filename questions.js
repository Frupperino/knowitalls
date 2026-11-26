/* Frågebank för KnowItAlls. Varje förklaring är en mening.
   Siffror är kollade mot bland annat SCB, SMHI, riksdagen, STF,
   Øresundsbron, Tarfala/Stockholms universitet och Eurovision, läget hösten 2026. */
window.KIA_QUESTIONS = [
  {
    id: "sve-landskap", cat: "sverige", type: "slider",
    q: "Hur många landskap har Sverige?",
    unit: "landskap", min: 8, max: 48, step: 1, start: 21, answer: 25, perfect: 0, zero: 14,
    explain: "Visste du att Sverige har 25 landskap, men att det är de 21 länen och 290 kommunerna som faktiskt styr?"
  },
  {
    id: "sve-riksdag", cat: "sverige", type: "slider",
    q: "Hur många ledamöter sitter i riksdagen?",
    unit: "ledamöter", min: 100, max: 600, step: 1, start: 300, answer: 349, perfect: 0, zero: 120,
    explain: "Visste du att riksdagen har 349 ledamöter, ett udda tal så att en omröstning inte ska kunna sluta oavgjort?"
  },
  {
    id: "sve-langd", cat: "sverige", type: "slider",
    q: "Hur långt är Sverige fågelvägen från Treriksröset till Smygehuk?",
    unit: "km", min: 400, max: 2800, step: 2, start: 2000, answer: 1572, perfect: 20, zero: 800,
    explain: "Visste du att fågelvägen från Treriksröset i norr till Smygehuk i söder är cirka 1 572 kilometer?"
  },
  {
    id: "sve-oar", cat: "sverige", type: "slider",
    q: "Hur många öar, holmar och skär räknade SCB ihop i Sverige 2013?",
    unit: "öar", min: 1000, max: 400000, step: 10, start: 20000, answer: 267570, perfect: 8000, zero: 220000,
    explain: "Visste du att SCB 2013 räknade 267 570 öar ned till nio kvadratmeter, och att en del av dem är pirar, dammholmar och vallgravsslott?"
  },
  {
    id: "sve-kommuner", cat: "sverige", type: "slider",
    q: "Hur många kommuner har Sverige?",
    unit: "kommuner", min: 40, max: 560, step: 1, start: 200, answer: 290, perfect: 0, zero: 90,
    explain: "Visste du att Sverige har 290 kommuner, från Stockholm med nästan en miljon invånare till små kommuner med några tusen?"
  },
  {
    id: "sve-sjoar", cat: "sverige", type: "order",
    q: "Lägg sjöarna i ordning, störst yta först.",
    hint: "Störst yta först",
    items: ["Vänern", "Vättern", "Mälaren", "Hjälmaren"],
    explain: "Visste du att SMHI anger ungefär 5 450 km² för Vänern, 1 886 för Vättern, 1 073 för Mälaren och 464 för Hjälmaren?"
  },
  {
    id: "sve-norr", cat: "sverige", type: "order",
    q: "Lägg orterna från norr till söder.",
    hint: "Nordligast först",
    items: ["Kiruna", "Sundsvall", "Stockholm", "Malmö"],
    explain: "Visste du att Kiruna ligger längst norrut av de här, därefter Sundsvall, sedan Stockholm och längst söderut Malmö?"
  },
  {
    id: "sve-broar", cat: "sverige", type: "order",
    q: "Lägg broarna efter invigningsår, äldst först.",
    hint: "Äldst invigning först",
    items: ["Ölandsbron", "Tjörnbron", "Öresundsbron", "Sundsvallsbron"],
    explain: "Visste du att Ölandsbron invigdes 1972, nuvarande Tjörnbron 1981, Öresundsbron 2000 och Sundsvallsbron 2014?"
  },
  {
    id: "sve-uni", cat: "sverige", type: "odd",
    q: "Vilken hör inte hit?",
    items: [
      { id: "uppsala", label: "Uppsala" },
      { id: "lund", label: "Lund" },
      { id: "umea", label: "Umeå" },
      { id: "mora", label: "Mora" }
    ],
    odd: "mora",
    explain: "Visste du att Uppsala, Lund och Umeå har universitet, medan Mora inte har någon högskola?"
  },
  {
    id: "sve-stadsdel", cat: "sverige", type: "odd",
    q: "Vilken hör inte hit?",
    items: [
      { id: "sodermalm", label: "Södermalm" },
      { id: "ostermalm", label: "Östermalm" },
      { id: "kungsholmen", label: "Kungsholmen" },
      { id: "majorna", label: "Majorna" }
    ],
    odd: "majorna",
    explain: "Visste du att Majorna är en stadsdel i Göteborg, medan Södermalm, Östermalm och Kungsholmen ligger i Stockholm?"
  },
  {
    id: "sve-lan", cat: "sverige", type: "odd",
    q: "Vilken hör inte hit?",
    items: [
      { id: "dalarna", label: "Dalarna" },
      { id: "jamtland", label: "Jämtland" },
      { id: "lappland", label: "Lappland" },
      { id: "vg", label: "Västra Götaland" }
    ],
    odd: "vg",
    explain: "Visste du att Dalarna, Jämtland och Lappland är landskap, medan Västra Götaland är ett län som samlar flera landskap?"
  },
  {
    id: "sve-feb30", cat: "sverige", type: "bluff",
    q: "Sant eller bluff?",
    claim: "I den svenska almanackan har det funnits en 30 februari.",
    answer: true,
    explain: "Visste du att Sverige 1712 lade in en 30 februari för att ställa tillbaka den misslyckade svenska kalendern till den julianska?"
  },
  {
    id: "sve-barnaga", cat: "sverige", type: "bluff",
    q: "Sant eller bluff?",
    claim: "Sverige var 1979 först i världen med att förbjuda barnaga.",
    answer: true,
    explain: "Visste du att Sverige den 1 juli 1979 blev första landet som uttryckligen förbjöd all kroppslig bestraffning av barn, även hemma?"
  },
  {
    id: "sve-sydtopp", cat: "sverige", type: "bluff", group: "keb",
    q: "Sant eller bluff?",
    claim: "Kebnekaises sydtopp är Sveriges högsta punkt.",
    answer: false,
    explain: "Visste du att den fasta nordtoppen på 2 096,8 meter har varit högst sedan 2019, och att sydtoppens glaciär mättes till 2 088,4 meter i september 2025?"
  },
  {
    id: "sve-kiruna", cat: "sverige", type: "bluff",
    q: "Sant eller bluff?",
    claim: "Kiruna håller på att flytta sin stadskärna på grund av gruvan.",
    answer: true,
    explain: "Visste du att LKAB bryter malm under staden, så Kiruna flyttar centrum ungefär tre kilometer österut?"
  },

  {
    id: "his-vasa", cat: "historia", type: "slider",
    q: "Vilket år sjönk regalskeppet Vasa?",
    unit: "", min: 1400, max: 1900, step: 1, start: 1700, answer: 1628, perfect: 0, zero: 80,
    explain: "Visste du att Vasa kantrade och sjönk på jungfrufärden den 10 augusti 1628, efter bara någon kilometer?"
  },
  {
    id: "his-berlin", cat: "historia", type: "slider",
    q: "Vilket år föll Berlinmuren?",
    unit: "", min: 1945, max: 2015, step: 1, start: 1961, answer: 1989, perfect: 0, zero: 36,
    explain: "Visste du att Berlinmuren öppnades kvällen den 9 november 1989, efter att en presskonferens råkat säga att utresorna gällde genast?"
  },
  {
    id: "his-mane", cat: "historia", type: "slider",
    q: "Vilket år klev en människa ut på månen för första gången?",
    unit: "", min: 1940, max: 2005, step: 1, start: 1957, answer: 1969, perfect: 0, zero: 30,
    explain: "Visste du att Neil Armstrong klev ut på månen den 20 juli 1969, under färden med Apollo 11?"
  },
  {
    id: "his-gustav", cat: "historia", type: "slider",
    q: "Vilket år valdes Gustav Vasa till kung?",
    unit: "", min: 1300, max: 1800, step: 1, start: 1397, answer: 1523, perfect: 0, zero: 120,
    explain: "Visste du att Gustav Vasa valdes till kung i Strängnäs den 6 juni 1523, datumet som senare blev Sveriges nationaldag?"
  },
  {
    id: "his-dagenh", cat: "historia", type: "slider",
    q: "Vilket år införde Sverige högertrafik, dagen som kallades Dagen H?",
    unit: "", min: 1900, max: 2000, step: 1, start: 1955, answer: 1967, perfect: 0, zero: 30,
    explain: "Visste du att Sverige bytte till högertrafik den 3 september 1967, och att skyltarna byttes under en enda natt?"
  },
  {
    id: "his-eu", cat: "historia", type: "slider",
    q: "Vilket år blev Sverige medlem i EU?",
    unit: "", min: 1950, max: 2030, step: 1, start: 1973, answer: 1995, perfect: 0, zero: 30,
    explain: "Visste du att Sverige gick med i EU den 1 januari 1995, efter en folkomröstning i november 1994?"
  },
  {
    id: "his-nato", cat: "historia", type: "slider",
    q: "Vilket år blev Sverige medlem i Nato?",
    unit: "", min: 1949, max: 2030, step: 1, start: 1949, answer: 2024, perfect: 0, zero: 40,
    explain: "Visste du att Sverige blev Natomedlem den 7 mars 2024, efter att ha stått utanför ända sedan alliansen bildades?"
  },
  {
    id: "his-hand", cat: "historia", type: "order",
    q: "Lägg händelserna i tidsordning, äldst först.",
    hint: "Äldst först",
    items: ["Stockholms blodbad", "Vasa sjunker", "Gustav III skjuts", "Dagen H"],
    explain: "Visste du att Stockholms blodbad var 1520, att Vasa sjönk 1628, att Gustav III sköts 1792 och att Dagen H var 1967?"
  },
  {
    id: "his-kungar", cat: "historia", type: "order",
    q: "Lägg kungarna efter när de började regera, äldst först.",
    hint: "Började regera först",
    items: ["Gustav Vasa", "Gustav II Adolf", "Karl XII", "Gustav III"],
    explain: "Visste du att Gustav Vasa började regera 1523, Gustav II Adolf 1611, Karl XII 1697 och Gustav III 1771?"
  },
  {
    id: "his-varld", cat: "historia", type: "order",
    q: "Lägg världshändelserna i tidsordning, äldst först.",
    hint: "Äldst först",
    items: ["Columbus når Amerika", "Franska revolutionen", "Första världskriget börjar", "Berlinmuren faller"],
    explain: "Visste du att Columbus nådde Amerika 1492, att franska revolutionen bröt ut 1789, att första världskriget började 1914 och att Berlinmuren föll 1989?"
  },
  {
    id: "his-hedeby", cat: "historia", type: "odd",
    q: "Vilken hör inte hit?",
    items: [
      { id: "birka", label: "Birka" },
      { id: "sigtuna", label: "Sigtuna" },
      { id: "uppsala", label: "Uppsala" },
      { id: "hedeby", label: "Hedeby" }
    ],
    odd: "hedeby",
    explain: "Visste du att Birka, Sigtuna och Uppsala ligger i Sverige, medan vikingastaden Hedeby låg vid nuvarande Schleswig i Tyskland?"
  },
  {
    id: "his-potatis", cat: "historia", type: "odd", group: "viking",
    q: "Vilken hör inte hemma i vikingatiden?",
    items: [
      { id: "skepp", label: "Långskepp" },
      { id: "runor", label: "Runsten" },
      { id: "mjod", label: "Mjöd" },
      { id: "potatis", label: "Potatis" }
    ],
    odd: "potatis",
    explain: "Visste du att potatisen kom till Europa först på 1500-talet, långt efter vikingarnas långskepp, runstenar och mjöd?"
  },
  {
    id: "his-nobel", cat: "historia", type: "odd",
    q: "Vilken hör inte hit?",
    items: [
      { id: "selma", label: "Selma Lagerlöf" },
      { id: "heidenstam", label: "Verner von Heidenstam" },
      { id: "tomas", label: "Tomas Tranströmer" },
      { id: "astrid", label: "Astrid Lindgren" }
    ],
    odd: "astrid",
    explain: "Visste du att Selma Lagerlöf, Verner von Heidenstam och Tomas Tranströmer har fått Nobelpriset i litteratur, men inte Astrid Lindgren?"
  },
  {
    id: "his-horn", cat: "historia", type: "bluff", group: "viking",
    q: "Sant eller bluff?",
    claim: "Vikingarna gick omkring i hjälmar med horn på.",
    answer: false,
    explain: "Visste du att hornhjälmen är en 1800-talsmyt från opera och nationalromantik, och att vikingahjälmar som har hittats är släta?"
  },
  {
    id: "his-kleo", cat: "historia", type: "bluff",
    q: "Sant eller bluff?",
    claim: "Kleopatra levde närmare vår tid än den tid då Cheopspyramiden byggdes.",
    answer: true,
    explain: "Visste du att Cheopspyramiden stod klar omkring år 2560 före vår tideräkning, medan Kleopatra dog år 30 före vår tideräkning, alltså närmare oss än pyramidbygget?"
  },
  {
    id: "his-napoleon", cat: "historia", type: "bluff",
    q: "Sant eller bluff?",
    claim: "Napoleon var ovanligt kort, bara omkring 150 centimeter.",
    answer: false,
    explain: "Visste du att Napoleon var omkring 168 till 170 centimeter, ungefär medellängd på sin tid, och att dvärgmyten kommer från karikatyrer och en förväxling av tum?"
  },

  {
    id: "vet-ben", cat: "vetenskap", type: "slider",
    q: "Hur många ben har en vuxen människa normalt?",
    unit: "ben", min: 80, max: 360, step: 1, start: 180, answer: 206, perfect: 0, zero: 80,
    explain: "Visste du att en vuxen människa normalt har 206 ben, medan ett nyfött barn har fler som senare växer ihop?"
  },
  {
    id: "vet-krom", cat: "vetenskap", type: "slider",
    q: "Hur många kromosomer har en människa i vanliga fall?",
    unit: "kromosomer", min: 10, max: 92, step: 1, start: 23, answer: 46, perfect: 0, zero: 24,
    explain: "Visste du att människan har 46 kromosomer i 23 par, och att ägg och spermier bara bär med sig hälften?"
  },
  {
    id: "vet-mane", cat: "vetenskap", type: "slider",
    q: "Hur långt är det i snitt från jorden till månen?",
    unit: "km", min: 20000, max: 800000, step: 100, start: 100000, answer: 384400, perfect: 5000, zero: 280000,
    explain: "Visste du att medelavståndet från jorden till månen är cirka 384 400 kilometer, ungefär trettio jordklot lagda på rad?"
  },
  {
    id: "vet-tjikko", cat: "vetenskap", type: "slider",
    q: "Hur många år har rotsystemet hos granen Old Tjikko i Fulufjället daterats till?",
    unit: "år", min: 100, max: 15000, step: 10, start: 800, answer: 9550, perfect: 200, zero: 6000,
    explain: "Visste du att Old Tjikkos rotsystem i Fulufjället har daterats till omkring 9 550 år, även om stammen som syns är mycket yngre?"
  },
  {
    id: "vet-ljus", cat: "vetenskap", type: "slider",
    q: "Hur snabbt rör sig ljuset i vakuum?",
    unit: "km/s", min: 10000, max: 500000, step: 100, start: 150000, answer: 299792, perfect: 1500, zero: 200000,
    explain: "Visste du att ljuset i vakuum färdas 299 792 kilometer i sekunden, nog för att runda jorden mer än sju gånger på en sekund?"
  },
  {
    id: "vet-sol", cat: "vetenskap", type: "order", group: "planeter",
    q: "Lägg planeterna i ordning från solen och utåt.",
    hint: "Närmast solen först",
    items: ["Merkurius", "Venus", "Jorden", "Mars"],
    explain: "Visste du att ordningen närmast solen är Merkurius, Venus, Jorden och sedan Mars?"
  },
  {
    id: "vet-storlek", cat: "vetenskap", type: "order", group: "planeter",
    q: "Lägg planeterna från minst till störst.",
    hint: "Minst diameter först",
    items: ["Merkurius", "Mars", "Venus", "Jorden"],
    explain: "Visste du att Merkurius är minst av de fyra, Mars nästa, och att Venus är aningen mindre än jorden?"
  },
  {
    id: "vet-berg", cat: "vetenskap", type: "order", group: "keb",
    q: "Lägg bergen från lägst till högst topp.",
    hint: "Lägst först",
    items: ["Helagsfjället", "Kebnekaise", "Mont Blanc", "Mount Everest"],
    explain: "Visste du att Helags är 1 796 meter, Kebnekaises nordtopp 2 097 meter, Mont Blanc cirka 4 808 meter och Mount Everest 8 849 meter?"
  },
  {
    id: "vet-pluto", cat: "vetenskap", type: "odd", group: "planeter",
    q: "Vilken hör inte hit?",
    items: [
      { id: "merkurius", label: "Merkurius" },
      { id: "venus", label: "Venus" },
      { id: "mars", label: "Mars" },
      { id: "pluto", label: "Pluto" }
    ],
    odd: "pluto",
    explain: "Visste du att Pluto räknas som dvärgplanet sedan 2006, medan Merkurius, Venus och Mars fortfarande är planeter?"
  },
  {
    id: "vet-orm", cat: "vetenskap", type: "odd",
    q: "Vilken hör inte hit?",
    items: [
      { id: "huggorm", label: "Huggorm" },
      { id: "snok", label: "Snok" },
      { id: "hassel", label: "Hasselsnok" },
      { id: "koppar", label: "Kopparödla" }
    ],
    odd: "koppar",
    explain: "Visste du att huggorm, snok och hasselsnok är ormar, medan kopparödlan är en benlös ödla som bara ser ut som en orm?"
  },
  {
    id: "vet-alg", cat: "vetenskap", type: "odd",
    q: "Vilken hör inte hit?",
    items: [
      { id: "bjorn", label: "Björn" },
      { id: "igelkott", label: "Igelkott" },
      { id: "fladdermus", label: "Fladdermus" },
      { id: "alg", label: "Älg" }
    ],
    odd: "alg",
    explain: "Visste du att björn, igelkott och fladdermus tillbringar vintern i ide eller dvala, medan älgen är vaken ute i snön?"
  },
  {
    id: "vet-fisk", cat: "vetenskap", type: "bluff",
    q: "Sant eller bluff?",
    claim: "En guldfisk minns bara i tre sekunder.",
    answer: false,
    explain: "Visste du att guldfiskar kan minnas i månader och till exempel lära sig vägen genom en enkel labyrint?"
  },
  {
    id: "vet-venus", cat: "vetenskap", type: "bluff",
    q: "Sant eller bluff?",
    claim: "Ett varv som Venus snurrar runt sin egen axel tar längre tid än ett varv runt solen.",
    answer: true,
    explain: "Visste du att Venus behöver cirka 243 jorddygn för ett axelvarv, men bara cirka 225 jorddygn för att gå runt solen?"
  },
  {
    id: "vet-banan", cat: "vetenskap", type: "bluff",
    q: "Sant eller bluff?",
    claim: "Bananer är bär, men jordgubbar är inte bär.",
    answer: true,
    explain: "Visste du att bananen är ett bär botaniskt sett, medan jordgubbens prickar är själva frukterna på en uppsvälld blombotten?"
  },

  {
    id: "kul-abba", cat: "kultur", type: "slider", group: "esc",
    q: "Vilket år vann ABBA Eurovision med Waterloo?",
    unit: "", min: 1950, max: 2010, step: 1, start: 1982, answer: 1974, perfect: 0, zero: 24,
    explain: "Visste du att ABBA vann Eurovision i Brighton 1974 med Waterloo, Sveriges första seger i tävlingen?"
  },
  {
    id: "kul-hp", cat: "kultur", type: "slider",
    q: "Vilket år gavs den första Harry Potter-boken ut?",
    unit: "", min: 1970, max: 2012, step: 1, start: 2005, answer: 1997, perfect: 0, zero: 20,
    explain: "Visste du att Harry Potter och de vises sten gavs ut i Storbritannien 1997, efter att ha refuserats av flera förlag?"
  },
  {
    id: "kul-ikea", cat: "kultur", type: "slider", group: "ikea",
    q: "Vilket år registrerade Ingvar Kamprad IKEA?",
    unit: "", min: 1900, max: 2000, step: 1, start: 1958, answer: 1943, perfect: 0, zero: 30,
    explain: "Visste du att Ingvar Kamprad registrerade IKEA 1943, när han var 17 år, flera år innan möblerna tog över sortimentet?"
  },
  {
    id: "kul-esc", cat: "kultur", type: "slider", group: "esc",
    q: "Hur många gånger har Sverige vunnit Eurovision, till och med tävlingen 2026?",
    unit: "segrar", min: 0, max: 18, step: 1, start: 3, answer: 7, perfect: 0, zero: 6,
    explain: "Visste du att de sju segrarna är ABBA 1974, Herreys 1984, Carola 1991, Charlotte Nilsson 1999, Loreen 2012, Måns Zelmerlöw 2015 och Loreen igen 2023?"
  },
  {
    id: "kul-escordning", cat: "kultur", type: "order", group: "esc",
    q: "Lägg de svenska Eurovisionvinsterna i tidsordning, äldst först.",
    hint: "Äldsta vinsten först",
    items: ["Waterloo (ABBA)", "Diggi-Loo Diggi-Ley (Herreys)", "Fångad av en stormvind (Carola)", "Euphoria (Loreen)"],
    explain: "Visste du att Sverige vann med Waterloo 1974, Diggi-Loo Diggi-Ley 1984, Fångad av en stormvind 1991 och Euphoria 2012?"
  },
  {
    id: "kul-forf", cat: "kultur", type: "order",
    q: "Lägg författarna efter födelseår, äldst först.",
    hint: "Äldst född först",
    items: ["August Strindberg", "Selma Lagerlöf", "Astrid Lindgren", "Stieg Larsson"],
    explain: "Visste du att Strindberg föddes 1849, Selma Lagerlöf 1858, Astrid Lindgren 1907 och Stieg Larsson 1954?"
  },
  {
    id: "kul-film", cat: "kultur", type: "order",
    q: "Lägg filmerna efter svensk premiär, äldst först.",
    hint: "Äldst premiär först",
    items: ["Fanny och Alexander", "Så som i himmelen", "Låt den rätte komma in", "Triangle of Sadness"],
    explain: "Visste du att Fanny och Alexander hade premiär 1982, Så som i himmelen 2004, Låt den rätte komma in 2008 och Triangle of Sadness 2022?"
  },
  {
    id: "kul-zara", cat: "kultur", type: "odd",
    q: "Vilken hör inte hit?",
    items: [
      { id: "loreen", label: "Loreen" },
      { id: "carola", label: "Carola" },
      { id: "mans", label: "Måns Zelmerlöw" },
      { id: "zara", label: "Zara Larsson" }
    ],
    odd: "zara",
    explain: "Visste du att Loreen, Carola och Måns Zelmerlöw har vunnit Eurovision för Sverige, men inte Zara Larsson?"
  },
  {
    id: "kul-bamse", cat: "kultur", type: "odd",
    q: "Vilken hör inte hit?",
    items: [
      { id: "pippi", label: "Pippi Långstrump" },
      { id: "emil", label: "Emil i Lönneberga" },
      { id: "madicken", label: "Madicken" },
      { id: "bamse", label: "Bamse" }
    ],
    odd: "bamse",
    explain: "Visste du att Pippi, Emil och Madicken är påhittade av Astrid Lindgren, medan Bamse skapades av Rune Andréasson?"
  },
  {
    id: "kul-europe", cat: "kultur", type: "odd", group: "esc",
    q: "Vilken hör inte hit?",
    items: [
      { id: "waterloo", label: "Waterloo" },
      { id: "dancing", label: "Dancing Queen" },
      { id: "mamma", label: "Mamma Mia" },
      { id: "final", label: "The Final Countdown" }
    ],
    odd: "final",
    explain: "Visste du att Waterloo, Dancing Queen och Mamma Mia är ABBA-låtar, medan The Final Countdown är Europe?"
  },
  {
    id: "kul-ikeanamn", cat: "kultur", type: "bluff", group: "ikea",
    q: "Sant eller bluff?",
    claim: "IKEA är en förkortning för Ingvar Kamprad, Elmtaryd och Agunnaryd.",
    answer: true,
    explain: "Visste du att Ingvar Kamprad tog IKEA från sitt namn, gården Elmtaryd och byn Agunnaryd i Småland?"
  },
  {
    id: "kul-bt", cat: "kultur", type: "bluff",
    q: "Sant eller bluff?",
    claim: "Bluetooth är uppkallat efter en vikingakung.",
    answer: true,
    explain: "Visste du att namnet kommer från Harald Blåtand, kungen som enade Danmark och Norge, för att tekniken skulle ena datorer och telefoner?"
  },
  {
    id: "kul-tomten", cat: "kultur", type: "bluff",
    q: "Sant eller bluff?",
    claim: "Dikten Tomten är skriven av Astrid Lindgren.",
    answer: false,
    explain: "Visste du att Tomten skrevs av Viktor Rydberg och publicerades 1881, långt före Astrid Lindgrens böcker?"
  },

  {
    id: "geo-eiffel", cat: "geografi", type: "slider",
    q: "Hur högt är Eiffeltornet i dag, antennen inräknad?",
    unit: "m", min: 40, max: 700, step: 1, start: 180, answer: 330, perfect: 2, zero: 200,
    explain: "Visste du att Eiffeltornet var 300 meter vid invigningen 1889 och i dag är 330 meter högt med antenn?"
  },
  {
    id: "geo-bro", cat: "geografi", type: "slider",
    q: "Hur lång är själva Öresundsbron, utan tunnel och Pepparholm?",
    unit: "m", min: 1000, max: 20000, step: 5, start: 16000, answer: 7845, perfect: 50, zero: 9000,
    explain: "Visste du att själva bron är 7 845 meter, medan hela förbindelsen med ön Pepparholm och tunneln är 15,9 kilometer?"
  },
  {
    id: "geo-iphone", cat: "geografi", type: "slider",
    q: "Vilket år visades den första iPhonen upp?",
    unit: "", min: 1990, max: 2020, step: 1, start: 2012, answer: 2007, perfect: 0, zero: 12,
    explain: "Visste du att Steve Jobs visade upp den första iPhonen i januari 2007, och att den började säljas i USA i juni samma år?"
  },
  {
    id: "geo-karla", cat: "geografi", type: "slider",
    q: "Hur högt är Karlatornet i Göteborg?",
    unit: "m", min: 40, max: 420, step: 1, start: 120, answer: 246, perfect: 3, zero: 140,
    explain: "Visste du att Karlatornet är 246 meter och blev Sveriges högsta byggnad när det stod klart 2024, högre än Turning Torso?"
  },
  {
    id: "geo-spotify", cat: "geografi", type: "slider",
    q: "Vilket år grundades Spotify?",
    unit: "", min: 1990, max: 2024, step: 1, start: 2012, answer: 2006, perfect: 0, zero: 14,
    explain: "Visste du att Spotify grundades i Stockholm 2006 av Daniel Ek och Martin Lorentzon?"
  },
  {
    id: "geo-vast", cat: "geografi", type: "order",
    q: "Lägg städerna från väster till öster.",
    hint: "Västligast först",
    items: ["Göteborg", "Malmö", "Stockholm", "Helsingfors"],
    explain: "Visste du att Göteborg ligger västligast, att Malmö faktiskt ligger öster om Göteborg, och att Helsingfors ligger längst österut?"
  },
  {
    id: "geo-hav", cat: "geografi", type: "order",
    q: "Lägg haven från minst till störst yta.",
    hint: "Minst yta först",
    items: ["Norra ishavet", "Indiska oceanen", "Atlanten", "Stilla havet"],
    explain: "Visste du att Norra ishavet är minst, sedan kommer Indiska oceanen, Atlanten och till sist det väldiga Stilla havet?"
  },
  {
    id: "geo-teknik", cat: "geografi", type: "order",
    q: "Lägg teknikmilstolparna i tidsordning, äldst först.",
    hint: "Äldst först",
    items: ["Första sms:et", "Google", "Wikipedia", "iPhone"],
    explain: "Visste du att det första sms:et skickades 1992, att Google grundades 1998, att Wikipedia öppnade 2001 och att iPhonen kom 2007?"
  },
  {
    id: "geo-lego", cat: "geografi", type: "odd", group: "lego",
    q: "Vilken hör inte hit?",
    items: [
      { id: "volvo", label: "Volvo" },
      { id: "ikea", label: "IKEA" },
      { id: "hm", label: "H&M" },
      { id: "lego", label: "LEGO" }
    ],
    odd: "lego",
    explain: "Visste du att Volvo, IKEA och H&M är svenska, medan LEGO grundades i Billund i Danmark?"
  },
  {
    id: "geo-oken", cat: "geografi", type: "odd",
    q: "Vilken hör inte hit?",
    items: [
      { id: "sahara", label: "Sahara" },
      { id: "gobi", label: "Gobi" },
      { id: "kalahari", label: "Kalahari" },
      { id: "sibirien", label: "Sibirien" }
    ],
    odd: "sibirien",
    explain: "Visste du att Sahara, Gobi och Kalahari är öknar, medan Sibirien mest är taiga och tundra?"
  },
  {
    id: "geo-html", cat: "geografi", type: "odd",
    q: "Vilken hör inte hit?",
    items: [
      { id: "python", label: "Python" },
      { id: "js", label: "JavaScript" },
      { id: "java", label: "Java" },
      { id: "html", label: "HTML" }
    ],
    odd: "html",
    explain: "Visste du att Python, JavaScript och Java är programmeringsspråk, medan HTML är ett märkspråk som beskriver hur en sida är uppbyggd?"
  },
  {
    id: "geo-sms", cat: "geografi", type: "bluff",
    q: "Sant eller bluff?",
    claim: "Världens första sms löd Merry Christmas.",
    answer: true,
    explain: "Visste du att Neil Papworth skickade det första sms:et den 3 december 1992, från en dator till en telefon, med texten Merry Christmas?"
  },
  {
    id: "geo-mur", cat: "geografi", type: "bluff",
    q: "Sant eller bluff?",
    claim: "Kinesiska muren syns från månen med blotta ögat.",
    answer: false,
    explain: "Visste du att muren är för smal för att synas från månen utan hjälpmedel, även om den är tusentals kilometer lång?"
  },
  {
    id: "geo-lego1958", cat: "geografi", type: "bluff", group: "lego",
    q: "Sant eller bluff?",
    claim: "LEGO-klossar från 1958 passar ihop med klossar som tillverkas i dag.",
    answer: true,
    explain: "Visste du att kopplingen med rör under klossen patenterades 1958 och är oförändrad, så gamla och nya klossar fortfarande klickar i varandra?"
  },

  {
    id: "var-schack", cat: "vardag", type: "slider",
    q: "Hur många rutor har ett vanligt schackbräde?",
    unit: "rutor", min: 16, max: 144, step: 1, start: 32, answer: 64, perfect: 0, zero: 40,
    explain: "Visste du att ett schackbräde har 64 rutor, åtta gånger åtta, varannan ljus och varannan mörk?"
  },
  {
    id: "var-kort", cat: "vardag", type: "slider",
    q: "Hur många kort har en vanlig fransk kortlek, utan jokrar?",
    unit: "kort", min: 20, max: 100, step: 1, start: 36, answer: 52, perfect: 0, zero: 28,
    explain: "Visste du att en fransk kortlek har 52 kort i fyra färger, medan den svenska stubben som används i vira har 36?"
  },
  {
    id: "var-alfa", cat: "vardag", type: "slider",
    q: "Hur många bokstäver har det svenska alfabetet?",
    unit: "bokstäver", min: 16, max: 48, step: 1, start: 26, answer: 29, perfect: 0, zero: 12,
    explain: "Visste du att det svenska alfabetet har 29 bokstäver, eftersom å, ä och ö kommer efter z?"
  },
  {
    id: "var-maraton", cat: "vardag", type: "slider",
    q: "Hur långt är ett maratonlopp?",
    unit: "m", min: 20000, max: 60000, step: 5, start: 40000, answer: 42195, perfect: 15, zero: 12000,
    explain: "Visste du att maraton är 42 195 meter, ett mått som fastnade efter OS i London 1908 och blev internationell standard 1921?"
  },
  {
    id: "var-system", cat: "vardag", type: "slider",
    q: "Vilket år bildades det rikstäckande Systembolaget?",
    unit: "", min: 1850, max: 2010, step: 1, start: 1919, answer: 1955, perfect: 0, zero: 40,
    explain: "Visste du att det rikstäckande Systembolaget bildades 1955, även om lokala systembolag och motbok fanns långt tidigare?"
  },
  {
    id: "var-ar", cat: "vardag", type: "order",
    q: "Lägg dagarna i den ordning de infaller under året.",
    hint: "Tidigast på året först",
    items: ["Nyårsdagen", "Våffeldagen", "Midsommarafton", "Luciadagen"],
    explain: "Visste du att våffeldagen alltid är 25 mars, att midsommarafton infaller i juni och att lucia är den 13 december?"
  },
  {
    id: "var-matt", cat: "vardag", type: "order",
    q: "Lägg måtten från minst till störst volym.",
    hint: "Minst volym först",
    items: ["Tesked", "Matsked", "Deciliter", "Liter"],
    explain: "Visste du att en tesked är 5 milliliter, en matsked 15, en deciliter 100 och en liter 1 000?"
  },
  {
    id: "var-hem", cat: "vardag", type: "order",
    q: "Lägg prylarna efter när de blev vanliga i svenska hem, äldst först.",
    hint: "Blev vanligt först",
    items: ["Kylskåp", "Mikrovågsugn", "Internet hemma", "Smartphone"],
    explain: "Visste du att kylskåpet blev vanligt på 1950-talet, mikron på 1980-talet, heminternet på 1990-talet och smartphonen efter 2007?"
  },
  {
    id: "var-tarta", cat: "vardag", type: "odd",
    q: "Vilken hör inte hit?",
    items: [
      { id: "kanel", label: "Kanelbulle" },
      { id: "lusse", label: "Lussekatt" },
      { id: "semla", label: "Semla" },
      { id: "prinsess", label: "Prinsesstårta" }
    ],
    odd: "prinsess",
    explain: "Visste du att kanelbulle, lussekatt och semla är bullar, medan prinsesstårtan är en gräddtårta med marsipanlock?"
  },
  {
    id: "var-jul", cat: "vardag", type: "odd",
    q: "Vilken hör inte till julbordet?",
    items: [
      { id: "skinka", label: "Julskinka" },
      { id: "janssons", label: "Janssons frestelse" },
      { id: "prins", label: "Prinskorv" },
      { id: "pask", label: "Påskmust" }
    ],
    odd: "pask",
    explain: "Visste du att julskinka, Janssons frestelse och prinskorv hör till julbordet, medan påskmust är samma typ av must fast till påsk?"
  },
  {
    id: "var-hygge", cat: "vardag", type: "odd",
    q: "Vilken hör inte hit?",
    items: [
      { id: "fika", label: "Fika" },
      { id: "lagom", label: "Lagom" },
      { id: "ombudsman", label: "Ombudsman" },
      { id: "hygge", label: "Hygge" }
    ],
    odd: "hygge",
    explain: "Visste du att fika, lagom och ombudsman är svenska ord som rest ut i världen, medan hygge är danska?"
  },
  {
    id: "var-tunga", cat: "vardag", type: "bluff",
    q: "Sant eller bluff?",
    claim: "Man känner sött bara längst fram på tungan.",
    answer: false,
    explain: "Visste du att tungkartan är en myt, och att hela tungan kan känna sött, salt, surt, beskt och umami?"
  },
  {
    id: "var-glas", cat: "vardag", type: "bluff",
    q: "Sant eller bluff?",
    claim: "Gamla fönsterrutor är tjockare nertill för att glaset långsamt har runnit nedåt.",
    answer: false,
    explain: "Visste du att glas är fast i rumstemperatur, och att gamla rutor är ojämna för att de blåstes och skars för hand?"
  },
  {
    id: "var-honung", cat: "vardag", type: "bluff",
    q: "Sant eller bluff?",
    claim: "Honung kan hålla sig ätbar i tusentals år.",
    answer: true,
    explain: "Visste du att honung har så lite vatten och så mycket socker att bakterier inte trivs, och att man har hittat ätbar honung i flera tusen år gamla gravar?"
  },

  {
    id: "med-moon", cat: "film", type: "media", group: "moon",
    q: "Vilken film är det här?",
    media: { kind: "image", src: "media/moon.webp", alt: "En handkolorerad stumfilmsbild där en raket har träffat månens öga.", credit: "Georges Méliès, 1902. Public domain." },
    choices: [
      { id: "moon", label: "Resan till månen" },
      { id: "metro", label: "Metropolis" },
      { id: "kong", label: "King Kong" },
      { id: "nos", label: "Nosferatu" }
    ],
    answer: "moon",
    explain: "Visste du att Georges Méliès lät en raket träffa månen i ögat 1902, i Resan till månen, en av de första filmerna som hittade på en hel värld?"
  },
  {
    id: "med-moon-year", cat: "film", type: "media", group: "moon",
    q: "Vilket år hade den här filmen premiär?",
    media: { kind: "image", src: "media/moon.webp", alt: "Månen med ett ansikte får en raket i ögat.", credit: "Georges Méliès, 1902. Public domain." },
    choices: [
      { id: "y1896", label: "1896" },
      { id: "y1902", label: "1902" },
      { id: "y1920", label: "1920" },
      { id: "y1927", label: "1927" }
    ],
    answer: "y1902",
    explain: "Visste du att Resan till månen hade premiär 1902 och spelades in i en glashall, med kulisser i stället för rymdfart?"
  },
  {
    id: "med-caligari", cat: "film", type: "media",
    q: "Vem är mannen med de uppspärrade ögonen?",
    media: { kind: "image", src: "media/caligari.webp", alt: "Svartvitt porträtt av en man med mörkt hår, stirrande ögon och händerna mot bröstet.", credit: "Franz Xaver Setzer, omkring 1920. Public domain." },
    choices: [
      { id: "cesare", label: "Cesare i Dr Caligaris kabinett" },
      { id: "orlok", label: "Greve Orlok i Nosferatu" },
      { id: "phantom", label: "Fantomen på operan" },
      { id: "frank", label: "Dr Frankenstein" }
    ],
    answer: "cesare",
    explain: "Visste du att mannen är Cesare, sömngångaren i Dr Caligaris kabinett från 1920, spelad av Conrad Veidt med ett smink som fortfarande känns igen?"
  },
  {
    id: "med-train", cat: "film", type: "media",
    q: "Vilken film slutar med att den här mannen siktar rakt in i kameran?",
    media: { kind: "image", src: "media/train.webp", alt: "En mustaschprydd man i cowboyhatt pekar en revolver mot betraktaren.", credit: "The Great Train Robbery, 1903. Public domain." },
    choices: [
      { id: "train", label: "Den stora tågplundringen" },
      { id: "noon", label: "Sheriffen" },
      { id: "samurai", label: "De sju samurajerna" },
      { id: "moon", label: "Resan till månen" }
    ],
    answer: "train",
    explain: "Visste du att mannen som siktar rakt in i kameran är banditen i Den stora tågplundringen från 1903, ett av filmhistoriens första riktiga slutklipp?"
  },
  {
    id: "med-orlok", cat: "film", type: "media", group: "nosferatu",
    q: "Vem står i dörröppningen?",
    media: { kind: "image", src: "media/nosferatu.webp", alt: "En lång, blek figur med spetsiga öron står stilla i en spetsig dörr.", credit: "Nosferatu, 1922. Public domain." },
    choices: [
      { id: "orlok", label: "Greve Orlok" },
      { id: "cesare", label: "Cesare" },
      { id: "dracula", label: "Dracula från 1931" },
      { id: "frank", label: "Dr Frankenstein" }
    ],
    answer: "orlok",
    explain: "Visste du att figuren i dörren är greve Orlok i Nosferatu från 1922, Murnaus vampyrfilm som gjordes utan lov av Dracula-rättigheterna?"
  },
  {
    id: "med-lumiere", cat: "film", type: "media",
    q: "Vilken berömd kortfilm är de här rutorna tagna från?",
    media: { kind: "image", src: "media/lumiere.webp", alt: "Ett rutnät av svartvita bildrutor där ett ånglok kommer närmare.", credit: "Bröderna Lumière, 1896. Public domain." },
    choices: [
      { id: "ciotat", label: "Tåget anländer till La Ciotat" },
      { id: "robbery", label: "Den stora tågplundringen" },
      { id: "moon", label: "Resan till månen" },
      { id: "trip", label: "En resa jorden runt" }
    ],
    answer: "ciotat",
    explain: "Visste du att rutorna kommer från Bröderna Lumières film där ett tåg ångar in i La Ciotat 1896, och att publiken ska ha ryckt till på riktigt?"
  },
  {
    id: "med-kiss", cat: "film", type: "media",
    q: "Vad är det som händer i klippet?",
    media: { kind: "video", src: "media/kiss.mp4", poster: "media/kiss.webp", alt: "Ett par i 1890-talskläder lutar sig mot varandra och kysses.", credit: "The Kiss, 1896. Public domain." },
    choices: [
      { id: "kiss", label: "Filmhistoriens första kyss" },
      { id: "song", label: "En sångrepetition" },
      { id: "dentist", label: "Ett tandläkarbesök" },
      { id: "box", label: "En boxningsmatch" }
    ],
    answer: "kiss",
    explain: "Visste du att May Irwin och John C Rice kysstes på film redan 1896, i en liten scen som kallades The Kiss och som chockade en del tittare?"
  },
  {
    id: "med-trappa", cat: "film", type: "media", group: "nosferatu",
    q: "Vem är skuggan som tar sig uppför trappan?",
    media: { kind: "video", src: "media/orlok-trappa.mp4", poster: "media/orlok-trappa.webp", alt: "En kloförsedd skugga rör sig längs ett trappräcke.", credit: "Nosferatu, 1922. Public domain." },
    choices: [
      { id: "orlok", label: "Greve Orlok" },
      { id: "caligari", label: "Dr Caligari" },
      { id: "cesare", label: "Cesare" },
      { id: "phantom", label: "Fantomen på operan" }
    ],
    answer: "orlok",
    explain: "Visste du att skuggan som tar sig uppför trappan är greve Orlok i Nosferatu från 1922, Murnaus sätt att låta monstret synas utan att visa hela kroppen?"
  },
  {
    id: "med-forvantan", cat: "film", type: "media",
    q: "Vad kallas det här upplägget?",
    media: { kind: "image", src: "media/forvantan.svg", alt: "Två rutor: en prydlig pannkakshög märkt förväntan och en rykande kolbit märkt verklighet.", credit: "Egen teckning för KnowItAlls." },
    choices: [
      { id: "forv", label: "Förväntan mot verklighet" },
      { id: "tid", label: "En tidslinje" },
      { id: "slakt", label: "Ett släktträd" },
      { id: "bruk", label: "En bruksanvisning" }
    ],
    answer: "forv",
    explain: "Visste du att förväntan mot verklighet blev ett eget meme-format just för att klyftan mellan den snygga planen och utfallet är så lätt att känna igen?"
  },
  {
    id: "med-bauer", cat: "kultur", type: "media",
    q: "Vem har målat prinsessan och de här trollen?",
    media: { kind: "image", src: "media/bauer.webp", alt: "En ljus prinsessa går mellan två stora troll i en mörk granskog.", credit: "John Bauer. Public domain." },
    choices: [
      { id: "bauer", label: "John Bauer" },
      { id: "nystrom", label: "Jenny Nyström" },
      { id: "larsson", label: "Carl Larsson" },
      { id: "beskow", label: "Elsa Beskow" }
    ],
    answer: "bauer",
    explain: "Visste du att John Bauer målade prinsessan och trollen till Bland tomtar och troll, och att de bilderna fortfarande är mallen för hur ett svenskt skogstroll ser ut?"
  },
  {
    id: "med-tomte", cat: "kultur", type: "media",
    q: "Vem ritade den här tomten med luvan?",
    media: { kind: "image", src: "media/tomte.webp", alt: "Tre tomtar med röda luvor lastar paket på en kälke utanför en lada.", credit: "Jenny Nyström. Public domain." },
    choices: [
      { id: "nystrom", label: "Jenny Nyström" },
      { id: "bauer", label: "John Bauer" },
      { id: "beskow", label: "Elsa Beskow" },
      { id: "larsson", label: "Carl Larsson" }
    ],
    answer: "nystrom",
    explain: "Visste du att Jenny Nyström ritade tomtar med luva och vitt skägg så ofta att hon i praktiken formade hur den svenska jultomten ser ut?"
  }
];
