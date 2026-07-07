// Source unique de vérité pour les 6 cocons sémantiques du planning édito.
// Utilisé à la fois par la page d'accueil (grille des 5 pans) et par
// /ressources/ (hub articles + catégories). Changer un titre, une icône ou
// une description ici le change partout d'un coup.
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
}

export const cocons: Cocon[] = [
  {
    slug: 'sommeil',
    icon: '🌙',
    title: 'Sommeil bébé',
    description: "Rythmes, siestes, régressions : comprendre le sommeil réel de votre enfant, pas la moyenne des livres.",
  },
  {
    slug: 'diversification',
    icon: '🥕',
    title: 'Diversification alimentaire',
    description: "DME ou purées, allergies, refus de manger : un guide complet par âge, sourcé et à jour.",
  },
  {
    slug: 'developpement',
    icon: '🧠',
    title: 'Développement & motricité',
    description: "Motricité libre, étapes réelles (pas de moyenne) : bientôt en ligne.",
  },
  {
    slug: 'emotions',
    icon: '💬',
    title: 'Émotions & éducation',
    description: "Langage des signes, gestion des pleurs, communication bienveillante : bientôt en ligne.",
  },
  {
    slug: 'sante',
    icon: '🩺',
    title: 'Santé & suivi pratique',
    description: "Courbes de croissance, fièvre, vaccins : bientôt en ligne.",
  },
  {
    slug: 'hors-courbes',
    icon: '✨',
    title: "Mon bébé n'est pas dans la moyenne",
    description: "Le cocon signature Tempo : pour les bébés en avance, en retard, prématurés : bientôt en ligne.",
    signature: true,
  },
];
