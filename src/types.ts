// Les formes de données du kit. Tu n'as pas besoin de toucher à ce fichier.

export type Segment = { debut: number; fin: number }; // en secondes, dans le rush

// Un mot transcrit (format @remotion/captions).
export type Mot = {
  text: string;
  startMs: number;
  endMs: number;
  timestampMs: number | null;
  confidence: number | null;
};

// Un effet placé dans le montage.
// Place-le soit à un moment précis du rush (`a`, en secondes),
// soit sur un mot que tu prononces (`mot`) : le kit retrouve le moment tout seul.
export type Effet = {
  type: string; // "titre", "zoom", "surligne", "flash", ou un effet de ton catalogue
  a?: number;
  mot?: string;
  occurrence?: number; // si le mot revient plusieurs fois : 1 = la première fois
  texte?: string;
  duree?: number; // en secondes
};

export type Montage = {
  video: string; // fichier dans public/
  segments: "auto" | Segment[]; // "auto" = les coupes de npm run silences
  effets: Effet[];
  sousTitres: {
    actifs: boolean;
    position: "haut" | "milieu" | "bas" | number; // nombre = % depuis le haut
    motsMax: number;
    majuscules: boolean;
  };
  corrections: Record<string, string>; // mot mal transcrit -> bon mot
  barreProgression: boolean;
  musique: null | {
    fichier: string;
    volume: number; // 0.1 = 10 %
    monteeFin: boolean;
  };
  couverture: { titre: string; a: number };
};
