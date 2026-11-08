# Monte avec Claude · le kit

Tu tournes, Claude monte. Ce kit est ton studio de montage : coupes automatiques, sous-titres mot par mot, effets motion, musique et export, à ton image.

## Ce qu'il te faut

- Un ordinateur Mac ou Windows
- Un abonnement **Claude Pro** ou **Max** (il inclut Claude Code)
- **Node.js** version LTS, gratuit : [nodejs.org](https://nodejs.org)
- **Git**, gratuit : déjà présent sur Mac (le Mac te propose de l'installer la première fois) ; sur Windows, [git-scm.com](https://git-scm.com)

## Installation (une seule fois)

Ouvre le Terminal (Mac) ou PowerShell (Windows), puis tape ces commandes une par une.

**Sur Windows uniquement, avant tout** : installe Git depuis [git-scm.com](https://git-scm.com) (options par défaut), puis autorise les commandes npm dans PowerShell (réponds O ou Y) :
```
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

**1. Installer Claude Code**

Mac :
```
curl -fsSL https://claude.ai/install.sh | bash
```
Windows (PowerShell) :
```
irm https://claude.ai/install.ps1 | iex
```
Ferme puis rouvre le Terminal ou PowerShell.

**2. Récupérer le kit**
```
git clone https://github.com/fitglowjoana/monte-avec-claude-kit.git mon-studio
cd mon-studio
```

**3. Installer ce dont le kit a besoin**
```
npm install
```

**4. Ouvrir le studio**
```
npm run studio
```

Le studio s'ouvre dans ton navigateur. Clique sur **Exemple** : c'est une vidéo de démonstration avec tous les effets.

Ensuite, ouvre un **deuxième onglet** de Terminal, place-toi dans le dossier (`cd mon-studio`), et lance :
```
claude
```
Connecte-toi avec ton compte Claude et dis-lui bonjour. Il lit tout seul le fichier `CLAUDE.md` : il sait déjà comment ton projet fonctionne.

## Monter un Reel

1. Glisse ta vidéo dans le dossier `public` et renomme-la `rush.mp4` (vidéo iPhone : `npm run convertir -- IMG_1234.MOV`)
2. `npm run transcrire` : ce que tu dis, mot par mot (gratuit et privé, tout reste sur ton ordinateur)
3. `npm run silences` : repère les blancs
4. Parle à Claude : « Monte rush.mp4 en Reel, coupe les silences, garde la dernière prise. » Regarde le résultat dans le studio, composition **Reel**.
5. `npm run rendu` : ton Reel sort dans le dossier `out`

Tous les prompts de la formation sont dans [PROMPTS.md](PROMPTS.md). Ta charte se crée avec [BRANDING.md](BRANDING.md).

## Les fichiers importants

| Fichier | Ce qu'il contient |
|---|---|
| `src/montage.ts` | Ton montage en cours (Claude le modifie pour toi) |
| `src/brand.ts` | Ta charte : couleurs, polices, style d'animation |
| `src/effets/` | Les effets, dont ta future signature |
| `PROMPTS.md` | Ta bibliothèque de prompts |

## Si ça plante

Ne ferme rien. Copie le message d'erreur, colle-le à Claude et écris « répare ».

## Licence

Ce kit est réservé aux élèves de la formation Monte avec Claude. Il utilise [Remotion](https://www.remotion.dev/license), gratuit pour les particuliers et les structures de 3 personnes au plus ; au-delà, une licence entreprise Remotion est nécessaire.

Claude est une marque d'Anthropic. Ce kit est indépendant et n'est pas affilié à Anthropic.
