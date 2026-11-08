// Charge les polices Google Fonts nommées dans brand.ts. Rien à modifier ici.

import { continueRender, delayRender } from "remotion";
import { brand } from "./brand";

const charges = new Set<string>();

const cssPour = async (famille: string) => {
  const nom = famille.trim().replace(/ /g, "+");
  // On essaie d'abord plusieurs graisses, puis la police seule si elle n'en a qu'une.
  for (const suffixe of [":ital,wght@0,400;0,500;0,700;0,800;0,900;1,400", ":wght@400;500;700;800;900", ":wght@400;700", ""]) {
    const r = await fetch(`https://fonts.googleapis.com/css2?family=${nom}${suffixe}&display=block`);
    if (r.ok) return r.text();
  }
  throw new Error(`Police introuvable sur Google Fonts : ${famille}`);
};

export const chargerPolices = () => {
  if (typeof document === "undefined") return;
  const familles = [brand.polices.titres, brand.polices.sousTitres].filter((f) => !charges.has(f));
  if (!familles.length) return;
  familles.forEach((f) => charges.add(f));
  const attente = delayRender("Chargement des polices", { timeoutInMilliseconds: 30000 });
  Promise.all(
    familles.map(async (f) => {
      try {
        const style = document.createElement("style");
        style.textContent = await cssPour(f);
        document.head.appendChild(style);
        await Promise.all([400, 500, 700, 800, 900].flatMap((w) => [document.fonts.load(`${w} 40px "${f}"`), document.fonts.load(`italic ${w} 40px "${f}"`)]));
      } catch (e) {
        console.warn(String(e));
      }
    }),
  ).finally(() => continueRender(attente));
};

export const pile = (famille: string) => `"${famille}", system-ui, sans-serif`;
