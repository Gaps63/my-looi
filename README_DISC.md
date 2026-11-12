# LOOI — démo DISC (salon)

Fork de My LOOI pour la démonstration du logiciel de profils couleurs (Rouge, Bleu, Jaune, Vert) sur un stand.

## Ce qui change par rapport à My LOOI
- **Réglages → Démo DISC (salon)** : couleur principale/secondaire du robot, profil du visiteur (couleurs + notes), langue de la démo, gestes physiques, et un champ libre « Instructions supplémentaires » (prompt).
- Le référentiel des couleurs est intégré au prompt (`src/disc/disc-knowledge.ts`).
- L'IA déclenche elle-même les émotions du visage (content, agacé, en colère, surpris, victoire) via l'outil `express_emotion` (`src/disc/disc-reaction.ts`).
- En mode démo, aucune mémoire personnelle n'est chargée ni enregistrée par l'IA.

## Compilation
Chaque push sur `main` lance le workflow « Build DISC demo APK » (onglet Actions). L'APK est publié dans **Releases** (`looi-disc-demo.apk`).
