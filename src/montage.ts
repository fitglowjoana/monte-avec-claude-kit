// TON MONTAGE
// Ce fichier décrit le Reel en cours : quelles parties du rush on garde,
// quels effets on ajoute, et où. C'est Claude qui le modifie quand tu lui parles.
// Tous les temps sont en secondes, mesurés dans ton rush d'origine.

import type { Montage } from "./types";

export const montage: Montage = {
  video: "rush.mp4",

  // "auto" = garder tout sauf les silences repérés par `npm run silences`.
  // Sinon, une liste de passages à garder : [{ debut: 0.4, fin: 5.2 }, ...]
  segments: "auto",

  effets: [
    // { type: "titre", texte: "3 erreurs qui t'épuisent", a: 0, duree: 2.5 },
    // { type: "zoom", mot: "épuisée" },
    // { type: "surligne", mot: "énergie" },
    // { type: "flash", a: 12.4 },
  ],

  sousTitres: {
    actifs: true,
    position: "bas",
    motsMax: 3,
    majuscules: false,
  },

  // Mots mal compris par la transcription : "mauvais mot": "bon mot"
  corrections: {
    // Clod: "Claude",
  },

  barreProgression: true,

  // Pose ta musique dans public/ (ex : musique.mp3). null = pas de musique.
  musique: null,
  // musique: { fichier: "musique.mp3", volume: 0.1, monteeFin: true },

  // Image de couverture : `npm run couverture`
  couverture: { titre: "", a: 1 },
};
