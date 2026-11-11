// Place ffmpeg et ffprobe là où HyperFrames les cherche (.hyperframes/bin),
// pour que l'élève n'ait rien à installer à part Node.js.
// Lancé automatiquement après `npm install`.
import { createRequire } from "node:module";
import { copyFileSync, chmodSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const racine = join(dirname(fileURLToPath(import.meta.url)), "..");
const dossier = join(racine, ".hyperframes", "bin");
const ext = process.platform === "win32" ? ".exe" : "";

function placer(nom, source) {
  if (!source || !existsSync(source)) {
    console.warn(`⚠️  ${nom} introuvable : le rendu vidéo ne marchera pas. Dis à Claude « installe ffmpeg ».`);
    return;
  }
  const cible = join(dossier, nom + ext);
  copyFileSync(source, cible);
  if (process.platform !== "win32") chmodSync(cible, 0o755);
}

try {
  mkdirSync(dossier, { recursive: true });
  placer("ffmpeg", require("ffmpeg-static"));
  placer("ffprobe", require("ffprobe-static").path);
  console.log("✅ ffmpeg prêt pour HyperFrames.");
} catch (e) {
  console.warn("⚠️  Préparation de ffmpeg impossible :", e.message);
}
