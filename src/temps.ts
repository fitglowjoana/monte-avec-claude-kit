// Calculs de temps : passer du temps du rush au temps du Reel monté (après les coupes).

import type { Effet, Mot, Segment } from "./types";

export type Plage = Segment & { sortie: number }; // sortie = début du passage dans le Reel

export const plages = (segments: Segment[]): Plage[] => {
  let t = 0;
  return [...segments]
    .filter((s) => s.fin > s.debut)
    .sort((a, b) => a.debut - b.debut)
    .map((s) => {
      const p = { ...s, sortie: t };
      t += s.fin - s.debut;
      return p;
    });
};

export const dureeTotale = (segments: Segment[]) => segments.reduce((d, s) => d + Math.max(0, s.fin - s.debut), 0);

// Temps du rush -> temps du Reel. null si ce moment a été coupé.
export const versSortie = (t: number, p: Plage[]): number | null => {
  for (const s of p) if (t >= s.debut && t <= s.fin) return s.sortie + (t - s.debut);
  return null;
};

const nettoyer = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9']/g, "");

// Retrouve dans la transcription le moment où un mot est prononcé (en secondes du rush).
export const trouverMot = (mot: string, mots: Mot[], occurrence = 1): number | null => {
  const cible = nettoyer(mot);
  let n = 0;
  for (const m of mots) {
    if (nettoyer(m.text) === cible || (cible.length > 3 && nettoyer(m.text).startsWith(cible))) {
      n++;
      if (n === occurrence) return m.startMs / 1000;
    }
  }
  return null;
};

// Moment de départ d'un effet, en secondes du Reel monté.
export const departEffet = (e: Effet, mots: Mot[], p: Plage[]): number | null => {
  const t = e.a ?? (e.mot ? trouverMot(e.mot, mots, e.occurrence) : null);
  if (t === null || t === undefined) return null;
  return versSortie(t, p);
};

export const appliquerCorrections = (mots: Mot[], corrections: Record<string, string>): Mot[] => {
  const table = Object.entries(corrections).map(([faux, juste]) => [nettoyer(faux), juste] as const);
  if (!table.length) return mots;
  return mots.map((m) => {
    const trouve = table.find(([faux]) => faux === nettoyer(m.text));
    if (!trouve) return m;
    const espace = m.text.startsWith(" ") ? " " : "";
    const ponctuation = m.text.trim().match(/[.,!?;:…]+$/)?.[0] ?? "";
    return { ...m, text: espace + trouve[1] + ponctuation };
  });
};
