// TA CHARTE VIDÉO
// C'est le seul fichier qui définit ton style. Tous les effets et les sous-titres le lisent.
// Au module 4, Claude réécrit ce fichier avec toi (voir BRANDING.md).
// Des exemples complets sont dans src/brand-exemples.ts.

export type Brand = {
  nom: string;
  couleurs: {
    texte: string; // texte principal des sous-titres et titres
    accent: string; // mot en cours, surlignage, barre de progression
    texteSurAccent: string; // texte posé sur la couleur accent
    sombre: string; // ombres, fonds sombres
  };
  polices: {
    titres: string; // nom exact d'une police Google Fonts
    sousTitres: string;
  };
  poids: { titres: number; sousTitres: number };
  sousTitres: {
    taille: number; // en pixels, sur une vidéo 1080 × 1920
    styleMotActif: "couleur" | "fond"; // mot en cours coloré, ou posé sur un bloc de couleur
    italique?: boolean; // sous-titres en italique
  };
  animation: "dynamique" | "douce"; // rebonds rapides, ou mouvements lents et fluides
  arrondi: number; // arrondi des blocs, en pixels
};

export const brand: Brand = {
  nom: "Charte neutre",
  couleurs: {
    texte: "#FFFFFF",
    accent: "#FFD23F",
    texteSurAccent: "#111111",
    sombre: "#111111",
  },
  polices: {
    titres: "Montserrat",
    sousTitres: "Montserrat",
  },
  poids: { titres: 900, sousTitres: 800 },
  sousTitres: {
    taille: 72,
    styleMotActif: "couleur",
  },
  animation: "dynamique",
  arrondi: 16,
};
