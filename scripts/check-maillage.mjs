#!/usr/bin/env node
/**
 * check-maillage.mjs — contrôle structurel du maillage interne des cocons.
 *
 * Rend le couloir de maillage vérifiable AU BUILD, à partir du seul repo.
 * Avant le 01/09/2026 la hiérarchie mère/sœur/fille ne vivait que dans un
 * Google Sheet : la vérifier demandait de croiser 34 MDX à la main, et
 * 55 liens hors couloir ont vécu deux mois sans être vus (dont 19 posés en
 * une seule matinée). Le champ `parent` du frontmatter a été ajouté pour que
 * ce script existe.
 *
 * Le couloir, identique à celui des skills Tempo :
 *   pilier -> ses sœurs uniquement
 *   sœur   -> le pilier + ses filles rattachées + 1 à 2 sœurs
 *   fille  -> le pilier + sa sœur parente + les autres filles de cette sœur
 *
 * Ce contrôle est STRUCTUREL uniquement (arbre + cibles des liens). Il ne
 * juge pas les ancres : la qualité des termes d'ancre est un chantier ouvert
 * (26 ancres amputées au 01/09/2026), et un contrôle rouge dès le premier
 * jour finit par être ignoré. À rebrancher ici quand ce lot sera soldé.
 *
 * Usage : npm run check:maillage    (sortie 1 si une faute est trouvée)
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ART = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'content', 'articles');
const LINK = /\[[^\]\n]+\]\((?:https:\/\/tempo-baby\.com)?\/([a-z0-9-]+)\/\)/g;
const SOEURS_MAX = 2;

const articles = new Map();
for (const file of readdirSync(ART).filter((f) => f.endsWith('.mdx'))) {
  const slug = file.slice(0, -4);
  const raw = readFileSync(join(ART, file), 'utf8');
  const end = raw.indexOf('\n---', 4);
  const fm = raw.slice(0, end);
  const get = (k) => (fm.match(new RegExp(`^${k}:\\s*(.+)$`, 'm')) || [])[1]?.trim();
  articles.set(slug, {
    slug,
    cocon: get('cocon'),
    pilier: get('pilier') === 'true',
    parent: get('parent'),
    draft: get('draft') === 'true',
    body: raw.slice(end).split('### Sources et pour aller plus loin')[0],
  });
}

const live = [...articles.values()].filter((a) => !a.draft);
const errors = [];
const warns = [];

for (const cocon of new Set(live.map((a) => a.cocon))) {
  const inC = live.filter((a) => a.cocon === cocon);
  const piliers = inC.filter((a) => a.pilier);
  if (piliers.length !== 1) {
    errors.push(`cocon « ${cocon} » : ${piliers.length} pilier(s), il en faut exactement 1`);
    continue;
  }
  const pilier = piliers[0];
  const childrenOf = (s) => inC.filter((a) => a.parent === s).map((a) => a.slug);
  const soeurs = childrenOf(pilier.slug);

  for (const a of inC) {
    if (a.pilier) {
      if (a.parent) errors.push(`${a.slug} : pilier, il ne doit pas porter de \`parent\``);
    } else if (!a.parent) {
      errors.push(`${a.slug} : champ \`parent\` manquant au frontmatter`);
      continue;
    } else if (!articles.has(a.parent)) {
      errors.push(`${a.slug} : \`parent: ${a.parent}\` ne correspond à aucun article`);
      continue;
    }

    let allowed, role;
    if (a.pilier) {
      role = 'pilier';
      allowed = new Set(soeurs);
    } else if (a.parent === pilier.slug) {
      role = 'sœur';
      allowed = new Set([pilier.slug, ...childrenOf(a.slug)]);
    } else {
      role = 'fille';
      allowed = new Set([pilier.slug, a.parent, ...childrenOf(a.parent)]);
      allowed.delete(a.slug);
    }

    const cibles = [...new Set([...a.body.matchAll(LINK)].map((m) => m[1]))].filter(
      (t) => t !== a.slug && articles.has(t)
    );
    const soeursLiees = [];
    for (const t of cibles) {
      if (allowed.has(t)) continue;
      if (role === 'sœur' && soeurs.includes(t)) { soeursLiees.push(t); continue; }
      const cible = articles.get(t);
      const nature = cible.pilier ? 'pilier' : soeurs.includes(t) ? 'sœur du pilier' : `fille de ${cible.parent}`;
      errors.push(`${a.slug} (${role}) → /${t}/ : hors couloir, c'est une ${nature}`);
    }
    if (soeursLiees.length > SOEURS_MAX) {
      warns.push(
        `${a.slug} (sœur) lie ${soeursLiees.length} sœurs (max ${SOEURS_MAX}) : ${soeursLiees.join(', ')}`
      );
    }
  }
}

for (const w of warns) console.log(`⚠️  ${w}`);
if (errors.length) {
  for (const e of errors) console.error(`❌ ${e}`);
  console.error(`\n${errors.length} faute(s) de maillage. Voir le couloir dans tempo-redaction-article.`);
  process.exit(1);
}
console.log(
  `✅ maillage conforme : ${live.length} articles publiés, 0 lien hors couloir` +
    (warns.length ? `, ${warns.length} avertissement(s)` : '')
);
