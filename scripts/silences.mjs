// npm run silences
// Repère tous les blancs de ton rush et prépare les coupes dans src/data/segments.json.
// Options : npm run silences -- 0.5 -35   (durée minimale d'un silence en s, seuil en dB)

import { writeFileSync } from "node:fs";
import path from "node:path";
import { DATA, dureeVideo, lancer, trouverRush } from "./outils.mjs";

const DUREE_MIN = parseFloat(process.argv[2] ?? "0.45"); // un blanc plus court est gardé
const SEUIL = process.argv[3] ?? "-35"; // en dB : plus bas = seuls les vrais silences
const MARGE = 0.12; // on laisse respirer un peu avant et après chaque phrase

const rush = trouverRush();
const duree = dureeVideo(rush);

const { erreurs } = lancer("ffmpeg", ["-hide_banner", "-i", rush, "-af", `silencedetect=noise=${SEUIL}dB:d=${DUREE_MIN}`, "-vn", "-c:a", "pcm_s16le", "-f", "null", "-"]);

const silences = [];
let debut = null;
for (const ligne of erreurs.split(/\r?\n/)) {
  const a = ligne.match(/silence_start: (-?[\d.]+)/);
  const b = ligne.match(/silence_end: ([\d.]+)/);
  if (a) debut = Math.max(0, parseFloat(a[1]));
  if (b && debut !== null) {
    silences.push([debut, parseFloat(b[1])]);
    debut = null;
  }
}
if (debut !== null) silences.push([debut, duree]);

// Les passages à garder = tout ce qui n'est pas un silence (avec une petite marge).
const segments = [];
let curseur = 0;
for (const [s, e] of silences) {
  const fin = Math.min(s + MARGE, duree);
  if (fin - curseur > 0.25) segments.push({ debut: +curseur.toFixed(2), fin: +fin.toFixed(2) });
  curseur = Math.max(curseur, e - MARGE);
}
if (duree - curseur > 0.25) segments.push({ debut: +curseur.toFixed(2), fin: +duree.toFixed(2) });

writeFileSync(path.join(DATA, "segments.json"), JSON.stringify(segments, null, 1));
const garde = segments.reduce((d, s) => d + s.fin - s.debut, 0);
console.log(`${silences.length} silences repérés. Ton rush passe de ${duree.toFixed(1)} s à ${garde.toFixed(1)} s.`);
console.log("Les coupes sont dans src/data/segments.json. Ouvre le studio pour voir le résultat.");
