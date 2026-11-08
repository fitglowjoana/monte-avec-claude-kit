// Trois chartes d'exemple, pour voir à quel point le même kit peut changer de style.
// Pour en essayer une, demande à Claude : « applique la charte douceur de brand-exemples ».

import type { Brand } from "./brand";

export const energie: Brand = {
  nom: "Énergie",
  couleurs: { texte: "#FFFFFF", accent: "#E0283F", texteSurAccent: "#FFFFFF", sombre: "#1C1315" },
  polices: { titres: "Anton", sousTitres: "Anton" },
  poids: { titres: 400, sousTitres: 400 },
  sousTitres: { taille: 84, styleMotActif: "fond" },
  animation: "dynamique",
  arrondi: 6,
};

export const douceur: Brand = {
  nom: "Douceur",
  couleurs: { texte: "#FFFDF8", accent: "#B9C8B0", texteSurAccent: "#2F3A2F", sombre: "#2F3A2F" },
  polices: { titres: "Instrument Serif", sousTitres: "DM Sans" },
  poids: { titres: 400, sousTitres: 500 },
  sousTitres: { taille: 64, styleMotActif: "couleur" },
  animation: "douce",
  arrondi: 28,
};

export const expertise: Brand = {
  nom: "Expertise",
  couleurs: { texte: "#FFFFFF", accent: "#F2C14E", texteSurAccent: "#1F2A44", sombre: "#1F2A44" },
  polices: { titres: "Hanken Grotesk", sousTitres: "Hanken Grotesk" },
  poids: { titres: 800, sousTitres: 700 },
  sousTitres: { taille: 68, styleMotActif: "fond" },
  animation: "douce",
  arrondi: 12,
};
