// Habillage de chaque cocon dans le design system de Tempo (site public).
// « Une couleur, un sens » (AGENTS.md du design system) : la pastille reprend
// la couleur de nature du sujet, le fond de carte une couleur pâle du catalogue.
export interface Rubrique {
  nom: string; // libellé court de la pastille
  nature: string; // classe de couleur : sommeil, repas, choix, rdv, sante
  icone: string; // nom pour Tempo.icone()
  fond: string; // variable CSS du fond de carte
  scene: string[]; // illustrations de la tête d'article
  nuit?: boolean; // étoiles et lune dans le visuel (sommeil seulement)
}

const parDefaut: Rubrique = { nom: 'Ressources', nature: 'choix', icone: 'livre', fond: '--lait-caramel', scene: ['livre'] };

export const rubriques: Record<string, Rubrique> = {
  sommeil: { nom: 'Sommeil', nature: 'sommeil', icone: 'lune', fond: '--lilas-pale', scene: ['cododo', 'mobile'], nuit: true },
  'futurs-parents': { nom: 'Futurs parents', nature: 'choix', icone: 'sac', fond: '--lait-caramel', scene: ['poussette', 'cosy'] },
  diversification: { nom: 'Alimentation', nature: 'repas', icone: 'coeur', fond: '--repas-bg', scene: ['biberon'] },
};

export const rubrique = (cocon: string): Rubrique => rubriques[cocon] ?? parDefaut;

// Le dessin d'une carte, selon le sujet de l'article (24/11/2026, demande de
// Sandra : les cartes tournaient sur 2-3 dessins par rubrique). Règles lues dans
// l'ordre sur le slug ; la première qui correspond gagne. Dessins : catalogue de
// Hugo (Tempo.illustration, 27 au 24/11).
// Séries par âge (sommeil et siestes, une trentaine d'articles publiés ensemble) :
// un petit groupe de dessins par tranche d'âge, tourné selon le mois, pour que
// deux cartes voisines ne portent pas le même dessin.
const parAge = (slug: string, jeune: string[], moyen: string[], grand: string[]): string | null => {
  const m = slug.match(/-(\d+)-(mois|an)$/);
  if (!m) return null;
  const mois = m[2] === 'an' ? 12 * Number(m[1]) : Number(m[1]);
  const groupe = mois <= 3 ? jeune : mois <= 8 ? moyen : grand;
  return groupe[mois % groupe.length];
};

const regles: [RegExp, string][] = [
  [/micro-creche/, 'micro'],
  [/assistante-maternelle/, 'assmat'],
  [/halte-garderie|mode-de-garde/, 'creche'],
  [/liste-de-naissance/, 'cadeau'],
  [/valise-maternite/, 'bodies'],
  [/projet-de-naissance/, 'livre'],
  [/preparer-l-arrivee|calendrier-grossesse/, 'poussette'],
  [/diversification/, 'mais'],
  [/biberon|tete-toutes|frein-de-langue/, 'biberon'],
  [/temperature|apnee|sirop|homeopathie/, 'thermo'],
  [/fleur-de-bach|kinesiologue|reflexologie|specialiste/, 'livre'],
  [/dans-les-bras/, 'echarpe'],
  [/sieste-nordique/, 'poussette'],
  [/coussin|position|dort-sur|grenouille|bouche-ouverte/, 'matelas'],
  [/pleure|rigole|sursaut|reflexe|agite|sommeil-leger|trouble/, 'bebe'],
  [/cycle|phase|paradoxal|train-du-sommeil|lumiere|bruit-blanc|terreur|peur/, 'mobile'],
  [/tableau-sieste|faut-il-reveiller|ne-dort-pas-la-journee/, 'transat'],
  [/coucher|ne-dort-pas|aide-sommeil/, 'cododo'],
  [/regression|dette|temps-de-sommeil/, 'gigoteuse'],
];

export const illustrationPour = (slug: string, cocon: string): string => {
  if (slug.startsWith('sieste-bebe')) return parAge(slug, ['echarpe', 'nacelle'], ['transat', 'bebe'], ['matelas', 'mobile', 'cododo']) ?? 'transat';
  if (slug.startsWith('sommeil-bebe')) return parAge(slug, ['nacelle', 'bebe', 'echarpe'], ['gigoteuse', 'mobile'], ['cododo', 'gigoteuse', 'matelas']) ?? 'cododo';
  for (const [re, nom] of regles) if (re.test(slug)) return nom;
  return rubrique(cocon).scene[0];
};
