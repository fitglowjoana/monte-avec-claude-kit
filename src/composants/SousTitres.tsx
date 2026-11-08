import React from "react";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { brand } from "../brand";
import { pile } from "../polices";
import { ressort } from "../effets/commun";
import type { Montage } from "../types";

// Un mot déjà placé dans le temps du Reel monté (en secondes).
export type MotPlace = { texte: string; debut: number; fin: number };

type Page = { mots: MotPlace[]; debut: number; fin: number };

// Regroupe les mots en petites "pages" de quelques mots.
export const paginer = (mots: MotPlace[], motsMax: number): Page[] => {
  const pages: Page[] = [];
  let courante: MotPlace[] = [];
  const fermer = () => {
    if (courante.length) pages.push({ mots: courante, debut: courante[0].debut, fin: courante[courante.length - 1].fin });
    courante = [];
  };
  mots.forEach((m, i) => {
    const precedent = mots[i - 1];
    if (courante.length >= motsMax || (precedent && m.debut - precedent.fin > 0.6)) fermer();
    courante.push(m);
    if (/[.!?…]$/.test(m.texte)) fermer();
  });
  fermer();
  // Chaque page reste affichée jusqu'à la suivante (au plus 0,4 s après son dernier mot).
  return pages.map((p, i) => ({ ...p, fin: Math.min(pages[i + 1]?.debut ?? Infinity, p.fin + 0.4) }));
};

const hauteur = (position: Montage["sousTitres"]["position"]) =>
  typeof position === "number" ? position : position === "haut" ? 22 : position === "milieu" ? 50 : 70;

export const SousTitres: React.FC<{ mots: MotPlace[]; reglages: Montage["sousTitres"] }> = ({ mots, reglages }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const page = paginer(mots, reglages.motsMax).find((p) => t >= p.debut && t < p.fin);
  if (!page || !reglages.actifs) return null;
  const entree = spring({ frame: frame - Math.round(page.debut * fps), fps, config: ressort() });

  return (
    <AbsoluteFill style={{ alignItems: "center" }}>
      <div
        style={{
          position: "absolute",
          top: `${hauteur(reglages.position)}%`,
          transform: `translateY(-50%) scale(${0.92 + entree * 0.08})`,
          width: 940,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "6px 18px",
          fontFamily: pile(brand.polices.sousTitres),
          fontWeight: brand.poids.sousTitres,
          fontSize: brand.sousTitres.taille,
          lineHeight: 1.15,
          textAlign: "center",
          textTransform: reglages.majuscules ? "uppercase" : "none",
        }}
      >
        {page.mots.map((m, i) => {
          const actif = t >= m.debut && t < (page.mots[i + 1]?.debut ?? page.fin);
          const fond = actif && brand.sousTitres.styleMotActif === "fond";
          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                padding: fond ? "0 14px" : 0,
                borderRadius: brand.arrondi,
                background: fond ? brand.couleurs.accent : "transparent",
                color: fond ? brand.couleurs.texteSurAccent : actif ? brand.couleurs.accent : brand.couleurs.texte,
                textShadow: fond ? "none" : `0 0 3px ${brand.couleurs.sombre}, 0 4px 18px ${brand.couleurs.sombre}CC`,
                transform: actif ? "scale(1.06)" : "none",
              }}
            >
              {m.texte.trim()}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
