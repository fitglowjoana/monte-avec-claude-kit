# Ta charte vidéo avec Claude

Ce kit fonctionne avec n'importe quel style. Ta charte se trouve dans un seul fichier, `src/brand.ts` : quand il change, tous tes effets et tes sous-titres changent avec lui.

Avant de commencer, réponds par écrit à une seule question :
**Qu'est-ce que ta cliente idéale doit ressentir dans les trois premières secondes de ta vidéo ?**

---

## Étape 1 · L'interview

Copie ce prompt dans Claude :

```
Je veux créer ma charte vidéo. Interviewe-moi, une seule question à la fois, et attends ma réponse avant de passer à la suivante. Pose-moi environ dix questions sur :
- mon activité et ma cliente idéale ;
- ce qu'elle doit ressentir dans les 3 premières secondes (ma réponse : [ta phrase]) ;
- trois marques ou comptes que j'admire visuellement, et pourquoi ;
- ce que je déteste visuellement ;
- les couleurs que je porte ou que j'ai déjà (logo, site) ;
- le rythme de mes vidéos : énergique ou posé.

Ensuite, propose-moi trois directions différentes. Pour chacune : un nom, une palette (texte, accent, texte sur accent, sombre), deux polices Google Fonts gratuites (titres et sous-titres), un style d'animation (dynamique ou douce) et le style du mot actif dans les sous-titres. Explique en une phrase ce que chaque direction fait ressentir.
```

## Étape 2 · Choisir et appliquer

Tu peux choisir, mélanger ou ajuster : « la deuxième, mais en plus chaud », « la police de la première avec les couleurs de la troisième ».

```
Je choisis [ta direction]. Applique-la dans src/brand.ts et dis-moi où regarder dans le studio.
```

Regarde la composition **Exemple** dans le studio : couleurs, polices, sous-titres et effets ont changé d'un coup.

## Étape 3 · Ta signature motion

```
À partir de ma charte, propose-moi trois idées de signature motion : un élément qui revient dans chacune de mes vidéos (une façon d'apparaître pour mes titres, un soulignement dessiné, un cadre, une transition…). Quand j'ai choisi, crée-la comme un nouvel effet du catalogue, avec un nom court, et ajoute-la à la vidéo d'exemple pour que je la voie.
```

Ensuite, utilise-la dans n'importe quel Reel en la nommant : « ajoute ma signature au début ».

---

Envie de voir d'autres styles avant de te lancer ? Demande à Claude :

```
Applique la charte « douceur » de brand-exemples.ts, que je voie le résultat. Ensuite remets ma charte.
```
