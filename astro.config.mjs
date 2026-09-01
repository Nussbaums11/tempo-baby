import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import rehypeExternalLinks from 'rehype-external-links';

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
  markdown: {
    // Tous les liens externes des articles partent en nofollow, s'ouvrent dans
    // un nouvel onglet et sont protégés par noopener (décision de Sandra du
    // 01/09/2026). Les sources institutionnelles sont désormais liées
    // systématiquement dans la section « Sources », or tempo-baby.com est un
    // DR 0 : envoyer du dofollow à des ameli.fr ou has-sante.fr en DR 70-90 sur
    // ~130 liens n'a aucune contrepartie. Le lecteur garde l'accès à la source,
    // le jus reste sur le site. Posé ici et pas à la main dans les MDX : une
    // règle de balisage globale ne s'oublie jamais, une consigne de rédaction si.
    rehypePlugins: [
      [rehypeExternalLinks, { target: '_blank', rel: ['nofollow', 'noopener', 'noreferrer'] }],
    ],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
