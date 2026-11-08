import React from "react";
import { AbsoluteFill, OffthreadVideo, staticFile, useVideoConfig } from "remotion";
import { brand } from "../brand";
import { pile } from "../polices";
import type { Montage } from "../types";
import { fichierPresent } from "./Reel";

// Image de couverture : une image de ta vidéo + ton titre d'accroche.
export const Couverture: React.FC<{ montage: Montage }> = ({ montage }) => {
  const { fps } = useVideoConfig();
  const titre = montage.couverture.titre || montage.effets.find((e) => e.type === "titre")?.texte || "";
  return (
    <AbsoluteFill style={{ background: brand.couleurs.sombre }}>
      {fichierPresent(montage.video) && (
        <OffthreadVideo src={staticFile(montage.video)} startFrom={Math.round(montage.couverture.a * fps)} style={{ width: "100%", height: "100%", objectFit: "cover" }} muted />
      )}
      <AbsoluteFill style={{ background: `linear-gradient(180deg, ${brand.couleurs.sombre}CC 0%, transparent 45%)` }} />
      <AbsoluteFill style={{ alignItems: "center", paddingTop: 260 }}>
        <div style={{ maxWidth: 900, textAlign: "center", fontFamily: pile(brand.polices.titres), fontWeight: brand.poids.titres, fontSize: 110, lineHeight: 1.05, textTransform: "uppercase", color: brand.couleurs.texte }}>{titre}</div>
        <div style={{ marginTop: 30, height: 14, width: 240, borderRadius: brand.arrondi, background: brand.couleurs.accent }} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
