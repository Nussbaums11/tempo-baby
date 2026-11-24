// Bloque la mise en ligne tant que les pages légales contiennent des champs à compléter.
// Lancé à chaque build : ne bloque que la production (Cloudflare fournit CF_PAGES_BRANCH),
// l'aperçu et le local se construisent quand même. Manuel : `npm run check:mentions`.
import { readFileSync } from 'node:fs';
const pages = ['src/pages/mentions-legales.astro', 'src/pages/confidentialite.astro'];
const restes = pages.flatMap((p) => (readFileSync(p, 'utf8').match(/\[À COMPLÉTER[^\]]*\]/g) ?? []).map((m) => `${p} : ${m}`));
const production = process.env.CF_PAGES_BRANCH === 'main';
if (restes.length && !production && process.argv.includes('--build')) { console.warn(`⚠️ ${restes.length} champ(s) à compléter dans les pages légales (bloquant en production)`); process.exit(0); }
if (restes.length) { console.error(`❌ ${restes.length} champ(s) à compléter dans les pages légales :\n` + restes.join('\n')); process.exit(1); }
console.log('✅ pages légales complètes');
