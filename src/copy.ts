export const LANGS = ["it", "en", "es"] as const;
export type Lang = (typeof LANGS)[number];

export const LANG_LABEL: Record<Lang, string> = {
  it: "Italiano",
  en: "English",
  es: "Español",
};

type Copy = {
  guide: string;
  listen: string;
  pause: string;
  missing: string;
  title: string;
  body: string[];
  readMore: string;
  readLess: string;
  language: string;
  home: string;
  menu: string;
  close: string;
};

export const COPY: Record<Lang, Copy> = {
  it: {
    guide: "Audioguida",
    listen: "Ascolta",
    pause: "Pausa",
    missing: "Traccia non ancora caricata",
    title: "La ricostruzione parziale, la nuova destinazione",
    readMore: "Leggi tutto",
    readLess: "Chiudi",
    language: "Lingua",
    home: "Home",
    menu: "Menù",
    close: "Chiudi",
    body: [
      "Nella metà del Trecento, la scelta di vivere da eremiti non era solo un atto isolato di devozione privata o di preghiera personale.",
      "È in questo preciso contesto culturale e sociale che, tra il 1361 e il 1363, quattro illustri esponenti dell'aristocrazia messinese, maturano la radicale decisione di svestire definitivamente gli abiti secolari e di edificare un luogo di ritiro spirituale.",
      "La loro ricerca di un luogo idoneo alla meditazione cade su un declivio collinare impervio e fitto di boschi: la contrada di Calonerò.",
      "L'etimo stesso del luogo “Calonerò”, derivato dal greco bizantino καλό-νερόν (ovvero \"buona acqua\"), indicava un territorio attraversato da venature sorgive.",
      "Quest’ultime ben note fin dall'antichità alle imbarcazioni che si trovavano a navigare lungo le rotte dello Stretto di Messina, per fare rifornimento di acqua potabile, in prossimità delle foci dei vicini torrenti Briga e Giampilieri.",
      "Il monastero, costruito accanto ad una piccola chiesa dedicata a San Luigi, presenta una pianta rettangolare con un corridoio lungo 32 metri che collega 6 grandi celle, accanto un altro corpo adibito a refettorio e una piccola capella.",
      "Negli anni, i monaci aumentarono di numero e si trovarono costretti a edificare un monastero più grande nella collina di fronte nel feudo di Santa Domenica, annesso ad un castello medievale donato dal Conte Andrea Vinciguerra.",
      "Il monastero di San Placido in Silvis o il Vecchio, continuo a servire come un valido rifugio spirituale per i frati messinesi.",
    ],
  },
  en: {
    guide: "Audio guide",
    listen: "Listen",
    pause: "Pause",
    missing: "Track not loaded yet",
    title: "The partial reconstruction, the new purpose",
    readMore: "Read more",
    readLess: "Close",
    language: "Language",
    home: "Home",
    menu: "Menu",
    close: "Close",
    body: [
      "In the mid-14th century, the choice to live as a hermit was not merely an isolated act of private devotion or personal prayer.",
      "It was within this specific cultural and social context that, between 1361 and 1363, four distinguished members of the Messina aristocracy reached the radical decision to permanently cast off their secular attire and build a place for spiritual retreat.",
      "Their search for a location suitable for meditation led them to a rugged, densely wooded hillside: the district of Calonerò.",
      "The very name \"Calonerò\"—derived from the Byzantine Greek kaló-nerón (meaning \"good water\")—indicated an area crisscrossed by natural springs.",
      "These springs had long been known to sailors navigating the Strait of Messina, who would stop near the mouths of the nearby Briga and Giampilieri streams to replenish their supplies of fresh water.",
      "The monastery, built beside a small church dedicated to Saint Louis, featured a rectangular layout with a 32-meter-long corridor connecting six large cells, alongside a separate building housing a refectory and a small chapel.",
      "Over the years, as the number of monks grew, they were compelled to build a larger monastery on the opposite hill within the Santa Domenica fiefdom, attached to a medieval castle donated by Count Andrea Vinciguerra.",
      "The monastery of San Placido in Silvis—also known as the \"Old Monastery\"—continued to serve as a valuable spiritual refuge for the monks of Messina.",
    ],
  },
  es: {
    guide: "Audioguía",
    listen: "Escuchar",
    pause: "Pausa",
    missing: "Pista aún no cargada",
    title: "La reconstrucción parcial, el nuevo uso",
    readMore: "Leer más",
    readLess: "Cerrar",
    language: "Idioma",
    home: "Inicio",
    menu: "Menú",
    close: "Cerrar",
    body: [
      "A mediados del siglo XIV, la decisión de vivir como ermitaños no era simplemente un acto aislado de devoción privada u oración personal.",
      "Fue precisamente en este contexto cultural y social que, entre 1361 y 1363, cuatro ilustres miembros de la aristocracia de Messina tomaron la radical decisión de abandonar definitivamente sus hábitos seculares y construir un lugar de retiro espiritual.",
      "Su búsqueda de un lugar adecuado para la meditación los llevó a una escarpada ladera densamente boscosa: el distrito de Calonerò.",
      "La etimología misma del lugar, «Calonerò», derivada del griego bizantino καλό-νερόν (que significa «agua buena»), indicaba un territorio surcado por manantiales.",
      "Estos manantiales eran bien conocidos desde la antigüedad por los barcos que navegaban por el estrecho de Messina, donde reabastecían sus provisiones de agua potable cerca de las desembocaduras de los arroyos Briga y Giampilieri.",
      "El monasterio, construido junto a una pequeña iglesia dedicada a San Luis, tiene planta rectangular con un corredor de 32 metros que conecta seis grandes celdas, un refectorio contiguo y una pequeña capilla.",
      "Con el paso de los años, el número de monjes aumentó y se vieron obligados a construir un monasterio más grande en la colina opuesta, en el feudo de Santa Domenica, anexo a un castillo medieval donado por el conde Andrea Vinciguerra.",
      "El monasterio de San Plácido in Silvis, o el Viejo, sigue siendo un valioso refugio espiritual para los frailes de Messina.",
    ],
  },
};

const AUDIO: Record<Lang, string> = {
  it: "/Tavola-01-ita.mp3",
  en: "/Tavola-01-eng.mp3",
  es: "/Tavola-01-es.mp3",
};

export function audioSrc(lang: Lang) {
  return AUDIO[lang];
}
