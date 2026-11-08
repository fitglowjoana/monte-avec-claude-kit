import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { ProprietesEffet } from "./commun";

// Un flash blanc très court entre deux idées.
export const TransitionFlash: React.FC<ProprietesEffet> = ({ duree }) => {
  const frame = useCurrentFrame();
  const milieu = duree / 2;
  const opacite = interpolate(frame, [0, milieu, duree], [0, 0.9, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return <AbsoluteFill style={{ background: "#FFFFFF", opacity: opacite }} />;
};
