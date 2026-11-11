# Monte avec Claude · le kit

Tu tournes avec ton téléphone, Claude monte sur ton ordinateur : coupes, sous-titres mot par mot, titres animés, effets, sons et export, à ton image.

## Ce qu'il te faut

- Un ordinateur **Mac ou Windows**
- Un abonnement **Claude Pro** ou **Max** (il inclut Claude Code)
- **Node.js**, gratuit (étape 1)

Tu n'as rien à coder : tu parles à Claude, il fait le reste.

## Installation (une seule fois, 15 minutes)

**1. Installer Node.js**
Va sur [nodejs.org](https://nodejs.org), télécharge la version **LTS** et installe-la (bouton « Suivant » jusqu'au bout).

**2. Installer l'application Claude**
Télécharge l'application Claude pour ordinateur sur [claude.ai/download](https://claude.ai/download), installe-la et connecte-toi avec ton compte.

**3. Récupérer le kit**
En haut de cette page GitHub, clique sur le bouton vert **Code**, puis **Download ZIP**.
Décompresse le fichier et range le dossier dans **Documents**. Renomme-le `mon-studio`.

**4. Ouvrir ton studio dans Claude**
Dans l'application Claude, ouvre l'onglet **Code**, choisis le dossier `mon-studio`, puis écris :
```
Bonjour ! Installe le kit.
```
Claude installe tout (1 à 3 minutes) et te dit quand c'est prêt. Il lit tout seul le fichier `CLAUDE.md` : il sait déjà comment ton studio fonctionne.

## Monter un Reel

1. Glisse ta vidéo dans le dossier `rushes` (une vidéo iPhone .MOV marche aussi).
2. Dis à Claude : « Monte la vidéo [nom du fichier] en Reel : coupe les blancs, sous-titres, un titre d'accroche. »
3. Claude ouvre l'**aperçu** dans ton navigateur. Regarde, et demande tes retouches avec tes mots.
4. Dis « Exporte-la » : ton MP4 arrive dans `videos/[nom]/renders`, prêt pour Instagram, TikTok ou YouTube Shorts.

Toutes les demandes de la formation sont dans [PROMPTS.md](PROMPTS.md). Ta charte vidéo se crée avec [BRANDING.md](BRANDING.md).

## Les effets

Tu as accès à la bibliothèque **HyperFrames** : environ 450 effets prêts à l'emploi (carrousels en orbite, transitions, titres animés, sous-titres, zooms, conversations animées…). Demande par exemple :
```
Montre-moi 3 effets de la bibliothèque qui iraient bien avec ma vidéo.
```
Claude les adapte toujours à **ta** charte : couleurs, polices, rythme.

## Les dossiers importants

| Dossier | Ce qu'il contient |
|---|---|
| `rushes/` | Tes vidéos tournées |
| `videos/` | Tes montages, un dossier par vidéo, avec l'export final dans `renders/` |
| `charte/ma-charte.md` | Ta charte (Claude la remplit avec toi au module 4) |
| `PROMPTS.md` | Ta bibliothèque de demandes |

Tes vidéos restent sur ton ordinateur : rien n'est publié en ligne.

## Si ça plante

Ne ferme rien. Copie le message d'erreur, colle-le à Claude et écris « répare ».

## Licence

Kit de la formation Monte avec Claude, par House of Joana. Moteur de montage : [HyperFrames](https://github.com/heygen-com/hyperframes), licence Apache 2.0 (voir `.claude/skills/HYPERFRAMES-LICENSE`). Vidéo : ffmpeg, via `ffmpeg-static`.

Claude est une marque d'Anthropic. Ce kit est indépendant et n'est pas affilié à Anthropic.
