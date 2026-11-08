import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { brand } from "../brand";
import { pile } from "../polices";
import { ProprietesEffet, ressort } from "./commun";

// Un mot-clé apparaît à l'écran, avec un surligneur qui passe derrière.
export const MotSurligne: React.FC<ProprietesEffet> = ({ texte = "", duree }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entree = spring({ frame, fps, config: ressort() });
  const trait = interpolate(frame, [3, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sortie = interpolate(frame, [duree - 6, duree], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", paddingBottom: 260, opacity: sortie }}>
      <div style={{ position: "relative", padding: "10px 34px", transform: `scale(${0.7 + entree * 0.3}) rotate(-2deg)` }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: brand.couleurs.accent,
            borderRadius: brand.arrondi,
            transformOrigin: "left center",
            transform: `scaleX(${trait})`,
            boxShadow: `0 14px 40px ${brand.couleurs.sombre}66`,
          }}
        />
        <span
          style={{
            position: "relative",
            fontFamily: pile(brand.polices.titres),
            fontWeight: brand.poids.titres,
            fontSize: 120,
            textTransform: "uppercase",
            color: brand.couleurs.texteSurAccent,
          }}
        >
          {texte}
        </span>
      </div>
    </AbsoluteFill>
  );
};
