# Site ATEMI Mont d’Or — version 7.26

Site statique officiel de l’association ATEMI Mont d’Or, conçu pour être publié directement avec GitHub Pages.

## Version livrée

- Version : **7.26**
- Build : **20260806-174500**
- Date : **6 août 2026 à 17 h 45**
- Base : version 7.24 vérifiée

## Déploiement GitHub Pages

Tous les fichiers du ZIP doivent être extraits puis téléversés **à la racine de la branche `main`** du dépôt `atemimontdor`.

Configuration attendue :

- Source : `Deploy from a branch`
- Branche : `main`
- Dossier : `/(root)`

Après publication, contrôler :

1. `https://nywm8rmpf4-sketch.github.io/atemimontdor/build-info.json`
2. La mention fixe « ATEMI v7.26 » en bas à droite.
3. La mention « Version publique ATEMI v7.26 » dans le pied de page.
4. Le filigrane des pratiquants sur la page d’accueil.

## Fonctionnalités principales

- Navigation responsive avec menus « Cours » et « Ateliers & stages » séparés.
- Présentation des disciplines, enseignants, dojo, lignée et association.
- Horaires, cotisations, pré-inscription et cours d’essai.
- Calendrier et grands rendez-vous 2026–2027.
- Galerie avec agrandissement des médias.
- Ressources : vidéos, lettres des professeurs, lexique et presse.
- Fil d’Ariane et page 404.
- Chemins relatifs compatibles avec GitHub Pages et tout hébergement statique.
- Versionnement anti-cache des fichiers CSS, JavaScript et médias référencés.

## Fichiers de référence

- `index.html` : page d’accueil.
- `styles.css`, `responsive.css`, `animations.css` : présentation.
- `menu.js`, `script.js`, `gallery.js`, `calendar.js`, `library.js`, `preinscription.js` : comportements.
- `build-info.json` : version et identifiant du build publié.
- `asset-manifest.json` : inventaire et empreintes des ressources.
- `generation-report.md` : contrôles exécutés avant livraison.
- `CHANGELOG.md`, `ROADMAP.md`, `CONTRIBUTING.md` : suivi et maintenance.

## Maintenance obligatoire à chaque version

Mettre à jour ensemble :

- `README.md` ;
- `CHANGELOG.md` ;
- `ROADMAP.md` si nécessaire ;
- `build-info.json` ;
- le badge de version des pages ;
- les identifiants anti-cache ;
- `generation-report.md`.

La FAQ doit rester cohérente avec les horaires, disciplines, inscriptions, enseignants, accès, grades et ressources.
