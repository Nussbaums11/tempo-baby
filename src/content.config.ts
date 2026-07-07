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
 * - faq : alimente le schema.org FAQPage de chaque article (GEO / AI Overviews).
 */
const articles = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    cocon: z.string(),
    pilier: z.boolean().default(false),
    updated: z.coerce.date(),
    readingTime: z.string().optional(),
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
