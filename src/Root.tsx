import React from "react";
import { Composition, Still } from "remotion";
import { chargerPolices } from "./polices";
import { montage } from "./montage";
import { Reel, ReelProps, dureeReel } from "./composants/Reel";
import { Couverture } from "./composants/Couverture";
import captions from "./data/captions.json";
import segments from "./data/segments.json";
import exemple from "./data/exemple.json";
import type { Montage, Mot, Segment } from "./types";

chargerPolices();

const FPS = 30;

// La vidéo d'exemple : elle montre tous les effets, sans rush.
const montageExemple: Montage = {
  ...montage,
  video: "",
  segments: [{ debut: 0, fin: 11 }],
  effets: [
    { type: "titre", texte: "3 erreurs qui t'épuisent", a: 0, duree: 2.6 },
    { type: "zoom", mot: "épuisée" },
    { type: "flash", a: 5.9 },
    { type: "surligne", mot: "énergie" },
  ],
  sousTitres: { actifs: true, position: "bas", motsMax: 3, majuscules: false },
  barreProgression: true,
  musique: null,
};

export const Racine: React.FC = () => (
  <>
    <Composition
      id="Reel"
      component={Reel}
      width={1080}
      height={1920}
      fps={FPS}
      durationInFrames={FPS * 10}
      defaultProps={{ montage, mots: captions as Mot[], segmentsAuto: segments as Segment[] } satisfies ReelProps}
      calculateMetadata={({ props }) => ({ durationInFrames: dureeReel(props, FPS) })}
    />
    <Composition
      id="Exemple"
      component={Reel}
      width={1080}
      height={1920}
      fps={FPS}
      durationInFrames={FPS * 11}
      defaultProps={{ montage: montageExemple, mots: exemple as Mot[], segmentsAuto: [], demo: true } satisfies ReelProps}
    />
    <Still id="Couverture" component={Couverture} width={1080} height={1920} defaultProps={{ montage }} />
  </>
);
