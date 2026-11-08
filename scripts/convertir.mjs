// npm run convertir -- MaVideo.mov
// Convertit une vidéo (iPhone HEVC, .mov...) en public/rush.mp4 lisible partout.

import path from "node:path";
import { existsSync } from "node:fs";
import { PUBLIC, lancer } from "./outils.mjs";

const nom = process.argv[2];
if (!nom) {
  console.error("Indique le nom de ta vidéo dans public/, par exemple : npm run convertir -- IMG_1234.MOV");
  process.exit(1);
}
const source = path.join(PUBLIC, nom);
if (!existsSync(source)) {
  console.error(`Je ne trouve pas public/${nom}.`);
  process.exit(1);
}
const cible = path.join(PUBLIC, "rush.mp4");
console.log("Conversion en cours (environ la durée de la vidéo)…");
lancer("ffmpeg", ["-y", "-loglevel", "error", "-i", source, "-c:v", "libx264", "-preset", "fast", "-crf", "18", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", cible]);
console.log("C'est fait : public/rush.mp4 est prêt. Étape suivante : npm run transcrire");
