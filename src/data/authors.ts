// Source unique de vérité pour les auteurs du site, créée le 25/08/2026.
//
// POURQUOI : jusqu'ici tous les articles étaient signés « l'équipe Tempo » et
// le JSON-LD déclarait `author: { '@type': 'Organization' }`. Sur un site YMYL
// (santé du nourrisson), c'est le pire cas d'E-E-A-T : Google veut savoir QUI
// écrit et pourquoi on devrait le croire. C'est le levier n°2 de l'audit SEO
// du 08/08/2026, resté non traité jusqu'à cette session.
//
// CE QUE ÇA ALIMENTE, d'un seul endroit :
//   - l'encart de signature en bas d'article (AuthorBox.astro)
//   - le JSON-LD `author: Person` de chaque article (ArticleLayout.astro)
//   - les pages auteur /auteurs/<slug>/ (pages/auteurs/[slug].astro)
//   - le `sameAs` qui relie chaque personne à ses profils publics
//
// `slug` doit être identique à la valeur `author` utilisée dans le frontmatter
// des articles MDX. Un article sans champ `author` retombe sur DEFAULT_AUTHOR.

export interface Author {
  slug: string;
  name: string;
  /** Rôle affiché sous la signature. Court, factuel. */
  role: string;
  /** 1 à 2 phrases, à la 3e personne. Sert la page auteur et l'encart. */
  bio: string;
  /** Initiales affichées dans la pastille (pas de photo pour l'instant). */
  initials: string;
  /**
   * Profils publics de la personne. Alimente le `sameAs` du JSON-LD Person,
   * qui est le mécanisme par lequel Google relie un auteur à une identité
   * réelle. Laisser vide tant qu'on n'a pas l'URL exacte : une URL inventée
   * ou morte fait plus de mal que pas de sameAs du tout.
   *
   * LinkedIn renseigné le 25/08/2026 (URLs fournies par Sandra).
   *
   * 🔴 CRITÈRE D'ENTRÉE (posé par Sandra le 25/08/2026, à tenir strictement) :
   * n'entrent ici que les profils où la personne est RÉELLEMENT IDENTIFIÉE,
   * tenus par elle, et vérifiables par un humain. Pas les annuaires, pas les
   * profils générés ou recyclés, pas les fiches de masse.
   *
   * POURQUOI : le `sameAs` n'est pas une liste de backlinks, c'est la liste
   * des points de vérification que Google va suivre pour juger si l'auteur
   * d'un contenu de santé infantile est crédible. Il se joue à la QUALITÉ,
   * pas au volume : une référence solide vaut mieux que trois moyennes, et
   * une entrée faible dilue les autres.
   *
   * Cas d'école : un profil Viadeo recyclé par le Journal du Net (DR 86 !)
   * a été proposé le 25/08 et ÉCARTÉ par Sandra. Bon arbitrage : les liens y
   * sont en `nofollow ugc`, la page est un annuaire de profils de masse, et
   * à côté d'un vrai LinkedIn elle abaisse le signal au lieu de le monter.
   * Un tel profil garde son utilité ailleurs (diversifier un profil de liens
   * pollué par le spam), mais pas ici.
   */
  sameAs?: string[];
}

export const authors: Author[] = [
  {
    slug: 'sandra-nussbaum',
    name: 'Sandra Nussbaum',
    role: 'Cofondatrice de Tempo, consultante SEO',
    bio: "Consultante SEO indépendante et cofondatrice de Tempo. Elle conçoit les contenus du site, cherche et vérifie les sources, et confronte chaque affirmation médicale à la littérature officielle avant publication. Parent, comme les lecteurs de ces pages.",
    initials: 'SN',
    sameAs: ['https://www.linkedin.com/in/sandra-nussbaum/'],
  },
  {
    slug: 'hugo-lebarrois',
    name: 'Hugo Lebarrois',
    role: 'Cofondateur de Tempo, produit',
    bio: "Cofondateur de Tempo, en charge du produit et du prototype. Il travaille sur la personnalisation des recommandations en fonction du rythme réel de chaque enfant. Parent, comme les lecteurs de ces pages.",
    initials: 'HL',
    sameAs: ['https://www.linkedin.com/in/hugo-lebarrois-b3672044/'],
  },
];

/**
 * Auteur par défaut des articles qui n'ont pas de champ `author`.
 *
 * ⚠️ À TRANCHER AVEC HUGO (1-1 du 28/08/2026) : faut-il que les articles
 * soient signés par une seule personne ou répartis entre les deux ? Mettre son
 * nom sur du contenu santé infantile engage, ce n'est pas une décision à
 * prendre unilatéralement. En attendant, le défaut pointe sur Sandra, qui
 * produit factuellement les contenus. Une ligne à changer si l'arbitrage
 * diffère, et les 22 articles existants suivent.
 */
export const DEFAULT_AUTHOR_SLUG = 'sandra-nussbaum';

export function getAuthor(slug?: string): Author {
  return (
    authors.find((a) => a.slug === slug) ??
    authors.find((a) => a.slug === DEFAULT_AUTHOR_SLUG)!
  );
}
