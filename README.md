# Site Tempo — Astro (v2)

Ce dossier remplace `Tempo/site-web/` (le prototype HTML statique) par la vraie stack tranchée avec Hugo le 07/07/2026 : Astro + Tailwind v4 + MDX + Cloudflare Pages.

Build vérifié le 07/07/2026 (soir) : `astro build` tourne sans erreur, 11 pages générées, maillage interne + hub ressources testés et fonctionnels.

## Structure

```
src/
  content.config.ts        # schéma des articles (cocon, pilier, faq...)
  content/articles/*.mdx   # tous les articles, à plat (pas de dossier par cocon, choix de Sandra)
  data/
    cocons.ts              # source unique des 6 cocons (titre, icône, description) : accueil + /ressources/
  components/
    Header.astro
    Footer.astro
    EmailCapture.astro     # PLACEHOLDER capture email, voir plus bas
    RelatedArticles.astro  # le composant de maillage auto par cocon
    Disclaimer.astro       # bloc disclaimer médical, importé dans les .mdx
    TableOfContents.astro  # sommaire "Dans ce guide", 100% auto (H2/H3/H4 réels), rendu par ArticleLayout
    FaqSection.astro       # affichage de la FAQ, rendu auto par ArticleLayout
    AuthorBox.astro        # encart "Rédigé par l'équipe Tempo", rendu auto par ArticleLayout
  layouts/
    BaseLayout.astro       # pages simples (accueil, ressources, application, tarifs, qui-sommes-nous)
    ArticleLayout.astro    # articles : header, FAQ schema.org, maillage auto
  pages/
    index.astro
    application.astro      # LP app (placeholder), CTA "Essayer Tempo"
    tarifs.astro            # LP tarifs (placeholder), 4,99€/mois ou 39,99€/an
    qui-sommes-nous.astro  # manifeste (ex "notre-methode", renommé le 07/07/2026)
    notre-methode.astro    # redirection 301 vers /qui-sommes-nous/, conservée pour ne pas casser un lien
    ressources/
      index.astro          # hub : 3 articles récents + catégories (cocons) existantes
      [cocon].astro        # archive par catégorie, générée seulement pour les cocons ayant du contenu
    [...slug].astro        # route unique qui génère chaque article à plat (/sommeil-bebe/, /regression-sommeil/...)
  styles/global.css        # tokens de design (palette + typo du design system de l'app, direction-design.md de Hugo)
```

## Nav du header (07/07/2026)

Application · Ressources · Tarifs · Qui sommes-nous, + CTA primaire "Essayer Tempo" (renvoie vers `/application/#essayer`). Les pages `/application/` et `/tarifs/` sont des placeholders de structure, copy à affiner avec Hugo.

## Le maillage interne (important, relire avant de publier un article)

Chaque article a dans son frontmatter :
```yaml
cocon: sommeil       # identifiant du cocon (mêmes valeurs = même cocon)
pilier: true         # true pour LA page pilier du cocon, false pour les satellites
```

`RelatedArticles.astro` interroge tous les articles au moment du build et affiche automatiquement ceux qui partagent le même `cocon`, avec le pilier en premier. Publier un nouvel article dans un cocon existant met donc à jour tous les anciens articles du cocon automatiquement, sans jamais les retoucher à la main.

**La seule chose à ne jamais oublier en écrivant un article : mettre le bon `cocon`.** Si tu mets un nouveau nom de cocon par erreur (faute de frappe), l'article se retrouve isolé, sans lien, sans que rien ne plante.

## Publier un nouvel article (façon CMS, sans coder)

Un template prêt à remplir existe dans `templates/article-template.mdx`, avec toutes les instructions en commentaires. Le workflow, à faire dans Claude Code :

1. Duplique `templates/article-template.mdx` dans `src/content/articles/`
2. Renomme le fichier avec le slug de l'article (ex: `rituel-coucher-bebe.mdx`) → ce nom devient l'URL (`/rituel-coucher-bebe/`)
3. Remplis les champs du frontmatter et le contenu, en suivant les commentaires du template
4. Supprime les lignes de commentaires (`# ...` et `{/* ... */}`)
5. Demande à Claude Code de commit et pousser (`git add`, `git commit`, `git push`) : le site se redéploie tout seul sur Cloudflare Pages

Tu n'as jamais besoin de toucher au code des composants pour publier un article, seulement au contenu du fichier `.mdx`.

## Changer le design de tous les articles d'un coup

Rien n'est jamais écrit en dur (HTML/style copié-collé) dans un article. Tout ce qui se répète d'un article à l'autre est un composant partagé dans `src/components/`, utilisé de deux façons :

- **Composants importés dans le `.mdx`** (`Disclaimer`, `TableOfContents`) : présents explicitement dans le texte de l'article. Changer leur style (couleur, bordure, espacement...) dans le fichier composant met à jour tous les articles qui l'utilisent, d'un coup.
- **Composants rendus automatiquement par `ArticleLayout.astro`** (`FaqSection`, `AuthorBox`) : tu n'as rien à écrire dans le `.mdx`, ils apparaissent après le contenu sur chaque article. Changer leur texte ou leur style dans le fichier composant les change partout, sans toucher à aucun article.

Concrètement : si demain tu veux par exemple mettre le disclaimer en bleu au lieu de terracotta, tu modifies uniquement `src/components/Disclaimer.astro`, une fois — tous les articles existants et futurs suivent automatiquement au prochain build. Même chose pour l'encart auteur ou l'affichage de la FAQ.

## État du déploiement (07/07/2026)

Tout est en place et fonctionnel :
- Domaine **tempo-baby.com** acheté via Cloudflare Registrar
- Repo GitHub : https://github.com/Nussbaums11/tempo-baby
- Déployé sur Cloudflare Pages (build auto à chaque push sur `main`), live sur `tempo-baby.pages.dev`
- Domaine personnalisé branché sur le projet Cloudflare Pages
- **Reste à faire** : créer un compte Brevo ou Mailerlite et remplacer le formulaire placeholder de `src/components/EmailCapture.astro` (`<div id="email-capture-embed">`) par leur snippet d'embed. Keystatic (interface visuelle d'édition) reste en réserve, pas nécessaire pour l'instant.

## Faire tourner le site en local

```
npm install
npm run dev       # serveur de dev
npm run build     # build de prod dans dist/
npm run preview   # prévisualiser le build
```

## Note technique (sandbox de cette session)

Le premier `npm install` + `astro build` tentés directement dans ce dossier de travail plantaient avec une "Bus error". Cause identifiée : ce système de fichiers ne permet pas à npm de supprimer ou renommer des fichiers existants, ce qui corrompait discrètement des binaires natifs pendant l'installation. Le build a été fait et vérifié dans un dossier temporaire propre, puis le code source (sans `node_modules`) a été copié ici. Aucun impact sur toi : un `npm install` normal sur ta machine ou dans GitHub Actions/Cloudflare Pages n'aura pas ce problème.
