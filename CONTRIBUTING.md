# Contribution et maintenance

## Principes

Le site est statique, sans système de compilation obligatoire. Tous les fichiers publiés se trouvent à la racine, à l’exception de la documentation placée dans `docs/`.

## Modifier le site

1. Partir de la dernière archive vérifiée.
2. Conserver les chemins relatifs.
3. Réutiliser les classes et composants existants.
4. Tester les pages sur une largeur mobile et desktop.
5. Mettre à jour les pages liées : une modification d’horaire, de tarif, d’enseignant ou d’inscription peut nécessiter une adaptation de la FAQ et de plusieurs pages.

## Ajouter une page

- reprendre l’en-tête, la navigation, le fil d’Ariane et le pied de page d’une page proche ;
- ajouter la page au menu pertinent ;
- ajouter les liens contextuels nécessaires ;
- inclure l’indicateur de version du site ;
- vérifier le titre, la description et l’accessibilité des images.

## Livraison

- mettre à jour la documentation ;
- actualiser `build-info.json` ;
- exécuter `python3 version-assets.py` ;
- contrôler les liens et ressources ;
- générer puis réextraire le ZIP ;
- compléter `generation-report.md` ;
- livrer uniquement après succès des contrôles.
