// Identité de l'organisation Tempo au format schema.org, créée le 25/08/2026.
//
// POURQUOI : le site ne déclarait aucun JSON-LD `Organization` global. Seuls
// les articles portaient un balisage (Article, FAQPage, BreadcrumbList), et le
// publisher y était réduit à `{ '@type': 'Organization', name: 'Tempo' }`.
// Conséquence : pour Google, tempo-baby.com était un domaine récent publiant
// du contenu santé, relié à aucune organisation identifiable.
//
// LE POINT CLÉ, c'est `sameAs`. C'est la déclaration qui dit à Google « ces
// profils publics et ce site sont la même entité ». Sans elle, ouvrir des
// comptes Instagram, LinkedIn ou Crunchbase ne construit rien : rien ne relie
// les comptes au site. C'est la moitié interne, souvent oubliée, de la vague 0
// du plan backlinks (cf 1 PROJETS/Tempo - Plan backlinks.md).
//
// ⚠️ SAME_AS EST VIDE POUR L'INSTANT, ET C'EST VOULU. Une URL inventée ou
// morte est pire que pas de sameAs. On remplit ce tableau au fur et à mesure
// que les profils officiels sont réellement créés, un par un.

/**
 * Profils publics officiels de Tempo. À compléter à la création de chaque
 * compte (vague 0, moitié B) :
 *   - page entreprise LinkedIn
 *   - Crunchbase
 *   - annuaire La French Tech
 *   - Instagram, Pinterest (si et seulement si alimentés)
 */
export const TEMPO_SAME_AS: string[] = [];

export function organizationSchema(site: URL | undefined) {
  const base = site?.toString() ?? 'https://tempo-baby.com/';
  return {
    '@type': 'Organization',
    '@id': new URL('/#organization', base).toString(),
    name: 'Tempo',
    url: base,
    logo: new URL('/tempo-symbol.svg', base).toString(),
    description:
      "Tempo aide les parents à trouver le rythme de leur enfant, avec des contenus sourcés et une personnalisation fondée sur le rythme réel de chaque bébé.",
    ...(TEMPO_SAME_AS.length ? { sameAs: TEMPO_SAME_AS } : {}),
  };
}

/** Version autonome, à injecter dans le <head> de toutes les pages. */
export function organizationJsonLd(site: URL | undefined) {
  return {
    '@context': 'https://schema.org',
    ...organizationSchema(site),
  };
}
