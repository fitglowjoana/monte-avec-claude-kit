// Vérifie que tout est prêt : Node.js, HyperFrames, ffmpeg, navigateur de rendu.
// Lancer : npm run verifier-installation
import { spawnSync } from "node:child_process";

const major = Number(process.versions.node.split(".")[0]);
console.log(major >= 22
  ? `✅ Node.js ${process.versions.node}`
  : `❌ Node.js ${process.versions.node} : installe la version LTS sur nodejs.org (22 ou plus).`);

const r = spawnSync("npx", ["hyperframes", "doctor"], { stdio: "inherit", shell: process.platform === "win32" });
process.exit(r.status ?? 0);
