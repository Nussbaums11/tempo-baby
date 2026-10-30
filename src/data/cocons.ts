// Source unique de vérité pour les 6 cocons sémantiques du planning édito.
// Utilisé à la fois par la page d'accueil (grille des 6 cocons) et par
// /ressources/ (hub articles + catégories). Changer un titre, une icône ou
// une description ici le change partout d'un coup.
//
// Liste retravaillée le 08/07/2026 avec Sandra : remplace l'ancien couple
// "Émotions & éducation" + cocon signature "Mon bébé n'est pas dans la
// moyenne" par "Biberon & allaitement" et "Pics de croissance &
// régressions" (ce dernier correspond au 2e cocon prioritaire choisi plus
// tôt dans la session, aux côtés de Sommeil).
//
// `slug` doit être identique à la valeur `cocon` utilisée dans le
// frontmatter des articles MDX (src/content/articles/*.mdx) pour que le
// maillage et les pages de catégorie fonctionnent.

export interface Cocon {
  slug: string;
  icon: string;
  title: string;
  description: string;
  signature?: boolean;
  // Mère du cocon quand ce n'est pas un article MDX mais une page à part
  // (ex. le calculateur /calendrier-grossesse/). Ajouté le 30/10/2026 pour le
  // cocon 2. À garder aligné avec PILIERS_EXTERNES de scripts/check-maillage.mjs.
  pilierExterne?: { slug: string; title: string };
  // Pas de carte dans la grille de l'accueil (qui reste à 6 cocons).
  horsAccueil?: boolean;
}

export const cocons: Cocon[] = [
  {
    slug: 'sommeil',
    icon: '🌙',
    title: 'Sommeil bébé',
    description: "Rythmes, siestes, régressions : comprendre le sommeil réel de votre enfant.",
  },
  {
    slug: 'biberon-allaitement',
    icon: '🍼',
    title: 'Biberon & allaitement',
    description: "Quantités, rythme des tétées ou biberons, sevrage : bientôt en ligne.",
  },
  {
    slug: 'developpement',
    icon: '🧠',
    title: 'Motricité & développement',
    description: "Motricité libre, étapes réelles, au rythme de votre enfant : bientôt en ligne.",
  },
  {
    slug: 'croissance-regressions',
    icon: '📈',
    title: 'Pics de croissance & régressions',
    description: "Sommeil qui déraille, faim qui explose, humeur en dents de scie : bientôt en ligne.",
  },
  {
    slug: 'sante',
    icon: '🩺',
    title: 'Santé & suivi pratique',
    description: "Courbes de croissance, fièvre, vaccins : bientôt en ligne.",
  },
  {
    slug: 'diversification',
    icon: '🥕',
    title: 'Diversification alimentaire',
    description: "DME ou purées, allergies, refus de manger : un guide complet par âge, sourcé et à jour.",
  },
  {
    slug: 'futurs-parents',
    icon: '🤰',
    title: 'Grossesse & futurs parents',
    description: "Calendrier, suivi, préparatifs : tout ce qui compte avant l'arrivée de bébé.",
    pilierExterne: { slug: 'calendrier-grossesse', title: 'Calendrier de grossesse' },
    horsAccueil: true,
  },
];
