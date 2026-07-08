import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Nom de domaine tranché le 07/07/2026 : tempo-baby.com (acheté par Sandra).
// site = apex sans www (08/07/2026) : seul tempo-baby.com est configuré en
// custom domain sur Cloudflare Pages, www.tempo-baby.com n'a aucun enregistrement
// DNS. Avant ce fix, canonical/sitemap pointaient vers www (domaine mort) alors
// que le site tourne réellement sur l'apex — corrigé pour éviter des erreurs
// d'exploration massives à la connexion de Search Console.
export default defineConfig({
  site: 'https://tempo-baby.com',
  integrations: [
    mdx(),
    sitemap({
      // /notre-methode/ ne fait qu'une redirection 301 vers /qui-sommes-nous/
      // (ancienne URL conservée pour ne pas casser un lien externe existant).
      // Astro la build quand même comme route, donc le sitemap l'incluait par
      // défaut — remonté par l'audit Ahrefs du 08/07/2026. Une redirection ne
      // doit jamais apparaître dans le sitemap (seules les URLs canoniques à
      // indexer doivent y figurer).
      filter: (page) => !page.includes('/notre-methode'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
