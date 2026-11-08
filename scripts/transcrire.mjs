// npm run transcrire
// Transcrit ton rush mot par mot, sur ton ordinateur (gratuit et privé).
// La première fois, télécharge Whisper et un modèle de reconnaissance vocale (~500 Mo).
//
// Options : npm run transcrire -- medium   (modèle plus précis, plus lent)
//           npm run transcrire -- small en  (autre langue : en, es, it...)

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { downloadWhisperModel, installWhisperCpp, toCaptions, transcribe } from "@remotion/install-whisper-cpp";
import { DATA, RACINE, dureeVideo, lancer, trouverRush } from "./outils.mjs";

const MODELE = process.argv[2] ?? "small";
const LANGUE = process.argv[3] ?? "fr";
const VERSION_WHISPER = "1.5.5";
const DOSSIER = path.join(RACINE, ".whisper");

const rush = trouverRush();
mkdirSync(DOSSIER, { recursive: true });

console.log("1/4 · Installation de Whisper (seulement la première fois)…");
await installWhisperCpp({ to: DOSSIER, version: VERSION_WHISPER, printOutput: false });

console.log(`2/4 · Modèle de reconnaissance vocale « ${MODELE} » (seulement la première fois)…`);
await downloadWhisperModel({ model: MODELE, folder: DOSSIER, printOutput: false });

console.log("3/4 · Extraction du son…");
const audio = path.join(DOSSIER, "audio.wav");
lancer("ffmpeg", ["-y", "-loglevel", "error", "-i", rush, "-ar", "16000", "-ac", "1", audio]);

console.log("4/4 · Transcription (compte environ 1 minute par minute de vidéo)…");
const resultat = await transcribe({
  inputPath: audio,
  whisperPath: DOSSIER,
  model: MODELE,
  modelFolder: DOSSIER,
  tokenLevelTimestamps: true,
  language: LANGUE,
  splitOnWord: true,
  printOutput: false,
});
const { captions } = toCaptions({ whisperCppOutput: resultat });
writeFileSync(path.join(DATA, "captions.json"), JSON.stringify(captions, null, 1));

// Si aucune coupe n'existe encore, on garde toute la vidéo.
const fichierSegments = path.join(DATA, "segments.json");
const segments = existsSync(fichierSegments) ? JSON.parse(readFileSync(fichierSegments, "utf8")) : [];
if (!segments.length) {
  writeFileSync(fichierSegments, JSON.stringify([{ debut: 0, fin: +dureeVideo(rush).toFixed(2) }], null, 1));
}

console.log(`\nC'est fait : ${captions.length} mots transcrits dans src/data/captions.json.`);
console.log("Étape suivante : npm run silences");
