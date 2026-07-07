import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// Nom de domaine tranché le 07/07/2026 : tempo-baby.com (à acheter par Sandra).
export default defineConfig({
  site: 'https://www.tempo-baby.com',
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
