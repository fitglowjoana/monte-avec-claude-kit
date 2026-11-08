import { brand } from "../brand";

// Le "ressort" des animations, selon ta charte : rebond vif ou mouvement doux.
export const ressort = () =>
  brand.animation === "dynamique" ? { damping: 12, stiffness: 180, mass: 0.6 } : { damping: 200, stiffness: 80, mass: 1 };

// Propriétés reçues par chaque effet du catalogue.
export type ProprietesEffet = {
  texte?: string;
  duree: number; // en images
};
