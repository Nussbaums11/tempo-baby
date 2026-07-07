# Site Tempo — Astro (v2)

Ce dossier remplace `Tempo/site-web/` (le prototype HTML statique) par la vraie stack tranchée avec Hugo le 07/07/2026 : Astro + Tailwind v4 + MDX + Cloudflare Pages.

Build vérifié le 07/07/2026 : `astro build` tourne sans erreur, 5 pages générées, maillage interne testé et fonctionnel.

## Structure

```
src/
  content.config.ts        # schéma des articles (cocon, pilier, faq...)
  content/articles/*.mdx   # tous les articles, à plat (pas de dossier par cocon, choix de Sandra)
  components/
    Header.astro
    Footer.astro
    EmailCapture.astro     # PLACEHOLDER capture email, voir plus bas
    RelatedArticles.astro  # le composant de maillage auto par cocon
  layouts/
    BaseLayout.astro       # pages simples (accueil, méthode)
    ArticleLayout.astro    # articles : header, FAQ schema.org, maillage auto
  pages/
    index.astro
    notre-methode.astro
    [...slug].astro        # route unique qui génère chaque article à plat (/sommeil-bebe/, /regression-sommeil/...)
  styles/global.css        # tokens de design (palette + typo du design system de l'app, direction-design.md de Hugo)
```

## Le maillage interne (important, relire avant de publier un article)

Chaque article a dans son frontmatter :
```yaml
cocon: sommeil       # identifiant du cocon (mêmes valeurs = même cocon)
pilier: true         # true pour LA page pilier du cocon, false pour les satellites
```

`RelatedArticles.astro` interroge tous les articles au moment du build et affiche automatiquement ceux qui partagent le même `cocon`, avec le pilier en premier. Publier un nouvel article dans un cocon existant met donc à jour tous les anciens articles du cocon automatiquement, sans jamais les retoucher à la main.

**La seule chose à ne jamais oublier en écrivant un article : mettre le bon `cocon`.** Si tu mets un nouveau nom de cocon par erreur (faute de frappe), l'article se retrouve isolé, sans lien, sans que rien ne plante.

## Ce qui reste à faire (voir aussi la note projet `1 PROJETS/Tempo - App bébé.md`)

1. ~~Trancher le nom définitif~~ ✅ **tempo-baby.com**, tranché le 07/07/2026 (déjà mis à jour dans `astro.config.mjs` et `public/robots.txt`)
2. Acheter le domaine tempo-baby.com (Cloudflare Registrar ou Porkbun)
3. Créer un repo GitHub et y pousser ce dossier (sans `node_modules`, déjà ignoré par `.gitignore`)
4. Brancher le repo à Cloudflare Pages : build command `npm run build`, output directory `dist`
5. Pointer le domaine sur Cloudflare
6. **Capture email** : `src/components/EmailCapture.astro` contient un formulaire qui ne fait rien pour l'instant. Une fois un compte Brevo ou Mailerlite créé, remplacer le contenu de `<div id="email-capture-embed">` par leur snippet d'embed
7. Keystatic (interface visuelle d'édition) seulement si besoin plus tard, pas au lancement

## Faire tourner le site en local

```
npm install
npm run dev       # serveur de dev
npm run build     # build de prod dans dist/
npm run preview   # prévisualiser le build
```

## Note technique (sandbox de cette session)

Le premier `npm install` + `astro build` tentés directement dans ce dossier de travail plantaient avec une "Bus error". Cause identifiée : ce système de fichiers ne permet pas à npm de supprimer ou renommer des fichiers existants, ce qui corrompait discrètement des binaires natifs pendant l'installation. Le build a été fait et vérifié dans un dossier temporaire propre, puis le code source (sans `node_modules`) a été copié ici. Aucun impact sur toi : un `npm install` normal sur ta machine ou dans GitHub Actions/Cloudflare Pages n'aura pas ce problème.
