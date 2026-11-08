import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { brand } from "../brand";
import { pile } from "../polices";
import { ProprietesEffet, ressort } from "./commun";

// Le titre d'accroche : il arrive en grand dans les premières secondes, mot par mot.
export const TitreAccroche: React.FC<ProprietesEffet> = ({ texte = "", duree }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const mots = texte.split(/\s+/).filter(Boolean);
  const sortie = interpolate(frame, [duree - 8, duree], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const decalage = brand.animation === "dynamique" ? 3 : 6;

  return (
    <AbsoluteFill style={{ alignItems: "center", paddingTop: 300, opacity: sortie }}>
      <div
        style={{
          maxWidth: 900,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "0 22px",
          fontFamily: pile(brand.polices.titres),
          fontWeight: brand.poids.titres,
          fontSize: 104,
          lineHeight: 1.05,
          textTransform: "uppercase",
          textAlign: "center",
          color: brand.couleurs.texte,
          textShadow: `0 6px 28px ${brand.couleurs.sombre}AA`,
        }}
      >
        {mots.map((m, i) => {
          const p = spring({ frame: frame - i * decalage, fps, config: ressort() });
          return (
            <span key={i} style={{ display: "inline-block", opacity: Math.min(1, p * 1.5), transform: `translateY(${(1 - p) * 60}px) scale(${0.85 + p * 0.15})` }}>
              {m}
            </span>
          );
        })}
      </div>
      <div
        style={{
          marginTop: 26,
          height: 12,
          width: 220,
          borderRadius: brand.arrondi,
          background: brand.couleurs.accent,
          transform: `scaleX(${spring({ frame: frame - mots.length * decalage, fps, config: ressort() })})`,
        }}
      />
    </AbsoluteFill>
  );
};
