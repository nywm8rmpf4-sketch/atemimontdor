# ATEMI Mont d’Or — site statique moderne

## Fichiers à publier chez Free
Téléversez à la racine de votre espace FTP le contenu de ce dossier :

- `index.html`
- `styles.css`
- `script.js`
- `robots.txt`
- `sitemap.xml`
- `404.html`

Le fichier `index.html` doit être directement à la racine, et non enfermé dans un sous-dossier.

## Modifier le site
- Textes, coordonnées et sections : `index.html`
- Couleurs, polices et mise en page : `styles.css`
- Menu, fenêtres des disciplines et formulaire : `script.js`

## Formulaire de contact
Le site étant statique, le formulaire n’enregistre aucune donnée. Il ouvre l’application de courrier du visiteur avec un courriel prérempli vers `atemimontdor@gmail.com`.

## Éléments à vérifier avant publication
- horaires et niveaux des cours 2026–2027 ;
- tarifs et modalités d’inscription ;
- dates et thèmes des ateliers ;
- composition et biographies de l’équipe pédagogique ;
- téléphone, adresse et courriel ;
- mentions légales et politique de confidentialité ;
- URL définitive dans la balise `canonical`, `robots.txt` et `sitemap.xml`.

## Ajouter des photos
1. Créez un dossier `images`.
2. Déposez-y des fichiers optimisés, par exemple `dojo.webp`, `cours-taichi.webp`.
3. Remplacez une composition graphique dans `index.html` par :

```html
<img src="images/dojo.webp" alt="Le dojo ATEMI Mont d’Or">
```

Pour de bonnes performances, utilisez de préférence le format WebP et une largeur maximale d’environ 1600 pixels.
