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
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
