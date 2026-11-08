// Petits outils partagés par les commandes du kit.
import { spawnSync } from "node:child_process";
import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const RACINE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const PUBLIC = path.join(RACINE, "public");
export const DATA = path.join(RACINE, "src", "data");

// Lance ffmpeg ou ffprobe, fournis avec Remotion (rien à installer).
export const lancer = (outil, args) => {
  const r = spawnSync("npx", ["remotion", outil, ...args], {
    cwd: RACINE,
    encoding: "utf8",
    shell: process.platform === "win32",
    maxBuffer: 1024 * 1024 * 200,
  });
  if (r.status !== 0) {
    console.error(r.stderr || r.stdout);
    throw new Error(`${outil} a échoué`);
  }
  return { sortie: r.stdout, erreurs: r.stderr };
};

export const dureeVideo = (fichier) => {
  const { sortie } = lancer("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "default=nw=1:nk=1", fichier]);
  return parseFloat(sortie.trim());
};

// Trouve le rush : public/rush.mp4 par défaut, ou le nom donné en argument.
export const trouverRush = (nom) => {
  const candidat = path.join(PUBLIC, nom ?? "rush.mp4");
  if (existsSync(candidat)) return candidat;
  const videos = readdirSync(PUBLIC).filter((f) => /\.(mp4|mov|m4v)$/i.test(f));
  console.error(`\nJe ne trouve pas public/${nom ?? "rush.mp4"}.`);
  if (videos.length) console.error(`Vidéos présentes dans public/ : ${videos.join(", ")}\nRenomme ta vidéo en rush.mp4, ou lance : npm run convertir`);
  else console.error("Glisse ta vidéo dans le dossier public et renomme-la rush.mp4.");
  process.exit(1);
};
