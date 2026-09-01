import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/*
 * Une seule collection à plat pour tous les articles (choix de Sandra : pas de
 * dossier par cocon, fichiers et URLs à plat). Le maillage interne en silos SEO
 * est géré par les champs `cocon` + `pilier`, pas par la structure de fichiers.
 *
 * Champs clés :
 * - cocon : identifiant du cocon sémantique (ex: "sommeil", "diversification").
 *   Doit être identique sur tous les articles d'un même cocon pour que le
 *   composant RelatedArticles les regroupe correctement.
 * - pilier : true pour la page pilier du cocon (une seule par cocon), false
 *   pour les satellites.
 * - parent : slug de l'article parent dans l'arbre du cocon. Absent sur le
 *   pilier (il n'a pas de parent), = le pilier pour une sœur (tête de branche),
 *   = la sœur de rattachement pour une fille. C'est ce champ qui fait entrer la
 *   hiérarchie mère/sœur/fille DANS le repo (ajouté 01/09/2026) : avant lui elle
 *   ne vivait que dans un Google Sheet, donc invérifiable au build, et 55 liens
 *   hors couloir ont vécu deux mois sans être vus. Il alimente le composant
 *   RelatedArticles (qui ne propose plus que le couloir de la page) et le
 *   contrôle `npm run check:maillage`.
 * - author : slug de l'auteur (voir src/data/authors.ts). Optionnel : si absent,
 *   on retombe sur DEFAULT_AUTHOR_SLUG. Alimente la signature affichée et le
 *   JSON-LD `author: Person`, décisif pour l'E-E-A-T en YMYL (ajouté 25/08/2026).
 * - faq : alimente le schema.org FAQPage de chaque article (GEO / AI Overviews).
 * - published : date de première publication (optionnelle, absente sur les 3
 *   articles v1). Utilisée pour le schema Article/BlogPosting (datePublished).
 *   Si absente, on retombe sur `updated` pour ne rien casser.
 */
const articles = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    cocon: z.string(),
    pilier: z.boolean().default(false),
    parent: z.string().optional(),
    updated: z.coerce.date(),
    published: z.coerce.date().optional(),
    readingTime: z.string().optional(),
    author: z.string().optional(),
    faq: z
      .array(
        z.object({
          question: z.string(),
          answer: z.string(),
        })
      )
      .default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { articles };
