# Site ATEMI Mont d’Or

Version **7.25** — build **20260806-172038** du **06/08/2026 17:20**.

Site statique officiel de l’association ATEMI Mont d’Or, consacré aux arts martiaux internes chinois, au Qi Gong et aux activités du dojo.

## Fonctionnalités principales

- navigation responsive pour ordinateur, tablette et mobile ;
- rubriques Découvrir, Cours, Ateliers & stages, Dojo, Ressources, Association et Contact ;
- pages détaillées sur les disciplines, les fondements et le programme pédagogique ;
- horaires, cotisations et pré-inscription en ligne ;
- calendrier interactif des rendez-vous 2026–2027 ;
- galerie avec photos, vidéo locale et contenus YouTube ;
- bibliothèque des lettres des professeurs, lexique, articles de presse et témoignages ;
- informations d’accès au dojo, transports en commun et itinéraires ;
- fil d’Ariane et navigation mobile adaptée à Safari iOS et Chrome Android ;
- versionnement anti-cache par empreinte SHA-256 des ressources statiques.

## Déploiement

Tous les fichiers publiables sont placés **à la racine** du site. Les liens internes sont relatifs : le site peut être déployé à la racine d’un domaine ou dans un sous-chemin GitHub Pages.

### GitHub Pages

1. Copier l’ensemble des fichiers de l’archive dans la branche publiée.
2. Ne pas déplacer les médias ni les fichiers CSS/JS dans des sous-dossiers sans mettre à jour les références.
3. Publier la branche depuis les paramètres GitHub Pages.
4. Vérifier `index.html`, la navigation mobile, la vidéo locale et le formulaire de pré-inscription.

## Fichiers techniques

- `styles.css`, `responsive.css`, `animations.css` : présentation générale ;
- `menu.js` : navigation desktop/mobile ;
- `script.js` : interactions communes ;
- `gallery.js` : galerie et affichage agrandi ;
- `calendar.js` : calendrier interactif ;
- `library.js` : filtres et recherche des lettres ;
- `preinscription.js` : comportement du formulaire de pré-inscription ;
- `version-assets.py` : génération des identifiants anti-cache ;
- `asset-manifest.json` : empreintes des ressources ;
- `build-info.json` : identification du build livré.

## Documentation du projet

- `CHANGELOG.md` : historique des versions ;
- `ROADMAP.md` : améliorations prévues et état d’avancement ;
- `CONTRIBUTING.md` : règles de modification et de livraison ;
- `docs/architecture.md` : architecture fonctionnelle et technique ;
- `docs/design-system.md` : conventions visuelles ;
- `docs/contenu.md` : règles de gestion éditoriale ;
- `docs/maintenance.md` : procédure de maintenance et de validation ;
- `generation-report.md` : rapport de contrôle de la présente livraison.

## Procédure obligatoire avant chaque livraison

1. intégrer toutes les demandes validées ;
2. maintenir la FAQ cohérente avec les pages du site ;
3. mettre à jour `README.md`, `CHANGELOG.md`, `ROADMAP.md` et la documentation concernée ;
4. mettre à jour la version et `build-info.json` ;
5. exécuter `python3 version-assets.py` ;
6. vérifier les liens internes et les ressources référencées ;
7. créer l’archive ZIP ;
8. réextraire l’archive dans un dossier distinct ;
9. vérifier les fichiers, la version, le build, les pages modifiées et chacune des évolutions demandées ;
10. ne livrer la version qu’après validation de tous les contrôles.

## Version actuelle

La version 7.25 est une version de consolidation documentaire et technique fondée sur la version 7.24 vérifiée. Elle ne supprime aucune page fonctionnelle existante.
