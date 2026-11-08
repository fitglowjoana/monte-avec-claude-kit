// LE CATALOGUE DES EFFETS
// Chaque effet a un nom (celui que tu utilises dans montage.ts) et une durée par défaut.
// Le zoom et la barre de progression sont gérés directement dans le Reel.
// Pour ajouter ta signature (module 4.3) : Claude crée un fichier dans src/effets/
// et l'ajoute ici.

import React from "react";
import { ProprietesEffet } from "./commun";
import { TitreAccroche } from "./TitreAccroche";
import { MotSurligne } from "./MotSurligne";
import { TransitionFlash } from "./TransitionFlash";

export type EntreeCatalogue = {
  composant: React.FC<ProprietesEffet>;
  dureeParDefaut: number; // en secondes
  description: string;
};

export const catalogue: Record<string, EntreeCatalogue> = {
  titre: { composant: TitreAccroche, dureeParDefaut: 2.5, description: "Titre d'accroche en grand, mot par mot" },
  surligne: { composant: MotSurligne, dureeParDefaut: 1.3, description: "Mot-clé à l'écran avec un surligneur" },
  flash: { composant: TransitionFlash, dureeParDefaut: 0.27, description: "Flash blanc entre deux idées" },
};

// Effets gérés à part, listés ici pour que Claude les connaisse.
export const effetsSpeciaux = {
  zoom: "Zoom punch sur ton visage pour appuyer un mot (durée par défaut 1 s)",
};
