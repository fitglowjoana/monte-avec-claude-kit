import React from "react";
import { AbsoluteFill, Audio, OffthreadVideo, Sequence, getStaticFiles, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { brand } from "../brand";
import { pile } from "../polices";
import { catalogue } from "../effets/catalogue";
import { ressort } from "../effets/commun";
import { appliquerCorrections, departEffet, dureeTotale, plages, versSortie } from "../temps";
import type { Montage, Mot, Segment } from "../types";
import { MotPlace, SousTitres } from "./SousTitres";

export type ReelProps = {
  montage: Montage;
  mots: Mot[];
  segmentsAuto: Segment[];
  demo?: boolean; // vidéo d'exemple sans rush
};

export const segmentsDuMontage = (p: ReelProps) => (p.montage.segments === "auto" ? p.segmentsAuto : p.montage.segments);
export const fichierPresent = (nom: string) => getStaticFiles().some((f) => f.name === nom);

// Écran affiché tant qu'il n'y a pas encore de rush.
const Accueil: React.FC<{ message: string }> = ({ message }) => (
  <AbsoluteFill style={{ background: brand.couleurs.sombre, color: brand.couleurs.texte, alignItems: "center", justifyContent: "center", padding: 90, textAlign: "center", fontFamily: pile(brand.polices.sousTitres), fontSize: 52, lineHeight: 1.4, fontWeight: 700 }}>
    {message}
  </AbsoluteFill>
);

const FondDemo: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: `radial-gradient(circle at 50% ${40 + Math.sin(frame / 40) * 6}%, #6B6F7A, ${brand.couleurs.sombre} 75%)`, alignItems: "center", justifyContent: "center" }}>
      <div style={{ fontFamily: pile(brand.polices.titres), fontWeight: brand.poids.titres, fontSize: 70, letterSpacing: "0.2em", color: "#FFFFFF22" }}>TA VIDÉO ICI</div>
    </AbsoluteFill>
  );
};

const BarreProgression: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  return (
    <div style={{ position: "absolute", top: 0, left: 0, height: 10, width: `${(frame / Math.max(1, durationInFrames - 1)) * 100}%`, background: brand.couleurs.accent, borderTopRightRadius: 6, borderBottomRightRadius: 6 }} />
  );
};

export const Reel: React.FC<ReelProps> = (props) => {
  const { montage, demo } = props;
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const segments = segmentsDuMontage(props);
  const videoOk = demo || fichierPresent(montage.video);
  if (!videoOk) return <Accueil message={`Dépose ta vidéo dans le dossier public sous le nom ${montage.video}, puis lance : npm run transcrire`} />;
  if (!segments.length) return <Accueil message="Ta vidéo est là. Lance : npm run transcrire" />;

  const p = plages(segments);
  const mots = appliquerCorrections(props.mots, montage.corrections);

  // Les mots dans le temps du Reel monté (les mots coupés disparaissent).
  const motsPlaces: MotPlace[] = mots.flatMap((m) => {
    const debut = versSortie(m.startMs / 1000, p);
    const fin = versSortie(Math.max(m.startMs, m.endMs - 1) / 1000, p);
    return debut === null || !m.text.trim() ? [] : [{ texte: m.text, debut, fin: fin ?? debut + 0.3 }];
  });

  // Zoom punch : on additionne tous les zooms actifs à cet instant.
  const zoom = montage.effets
    .filter((e) => e.type === "zoom")
    .reduce((z, e) => {
      const t0 = departEffet(e, mots, p);
      if (t0 === null) return z;
      const f0 = Math.round(t0 * fps);
      const f1 = f0 + Math.round((e.duree ?? 1) * fps);
      const monte = spring({ frame: frame - f0, fps, config: ressort() });
      const redescend = interpolate(frame, [f1, f1 + 8], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
      return z + 0.14 * monte * redescend;
    }, 0);

  const musiquePresente = montage.musique && fichierPresent(montage.musique.fichier);

  return (
    <AbsoluteFill style={{ background: "#000" }}>
      <AbsoluteFill style={{ transform: `scale(${1 + zoom})`, transformOrigin: "50% 38%" }}>
        {demo ? (
          <FondDemo />
        ) : (
          p.map((s, i) => {
            const de = Math.round(s.sortie * fps);
            const a = Math.round((s.sortie + s.fin - s.debut) * fps);
            return (
              <Sequence key={i} from={de} durationInFrames={Math.max(1, a - de)}>
                <OffthreadVideo src={staticFile(montage.video)} startFrom={Math.round(s.debut * fps)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </Sequence>
            );
          })
        )}
      </AbsoluteFill>

      <SousTitres mots={motsPlaces} reglages={montage.sousTitres} />

      {montage.effets.map((e, i) => {
        const entree = catalogue[e.type];
        const t0 = departEffet(e, mots, p);
        if (!entree || t0 === null) return null;
        const duree = Math.max(1, Math.round((e.duree ?? entree.dureeParDefaut) * fps));
        const Composant = entree.composant;
        return (
          <Sequence key={i} from={Math.round(t0 * fps)} durationInFrames={duree}>
            <Composant texte={e.texte ?? e.mot} duree={duree} />
          </Sequence>
        );
      })}

      {montage.barreProgression && <BarreProgression />}

      {montage.musique && musiquePresente && (
        <Audio
          loop
          src={staticFile(montage.musique.fichier)}
          volume={(f) => {
            const v = montage.musique!.volume;
            const fin = montage.musique!.monteeFin ? interpolate(f, [durationInFrames - 3 * fps, durationInFrames - 1], [v, Math.min(1, v * 4)], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : v;
            return interpolate(f, [0, 10], [0, 1], { extrapolateRight: "clamp" }) * fin;
          }}
        />
      )}
    </AbsoluteFill>
  );
};

export const dureeReel = (props: ReelProps, fps: number) => Math.max(fps, Math.round(dureeTotale(segmentsDuMontage(props)) * fps));
