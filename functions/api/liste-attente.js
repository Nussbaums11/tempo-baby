// Liste d'attente de l'app Tempo (24/11/2026, choix de Sandra : pas de prestataire,
// gratuit). Cloudflare Pages Function : POST /api/liste-attente.
// Les adresses sont stockées dans un espace KV de Cloudflare, lié au projet Pages
// sous le nom LISTE_ATTENTE (à créer dans le tableau de bord : Workers & Pages >
// KV, puis projet tempo-baby > Paramètres > Liaisons). Clé = adresse en minuscules,
// valeur = { date, page }. Rien d'autre n'est gardé (ni IP, ni navigateur).
// Export : tableau de bord Cloudflare, ou `wrangler kv key list --binding LISTE_ATTENTE`.

const ADRESSE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const json = (corps, statut = 200) =>
  new Response(JSON.stringify(corps), {
    status: statut,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });

export async function onRequestPost({ request, env }) {
  if (!env.LISTE_ATTENTE) return json({ ok: false, erreur: 'stockage' }, 503);

  let donnees;
  try {
    const type = request.headers.get('content-type') || '';
    donnees = type.includes('application/json')
      ? await request.json()
      : Object.fromEntries(await request.formData());
  } catch {
    return json({ ok: false, erreur: 'format' }, 400);
  }

  // Champ invisible : un humain le laisse vide, un robot le remplit.
  if (donnees.site) return json({ ok: true });

  const email = String(donnees.email || donnees.EMAIL || '').trim().toLowerCase();
  if (email.length > 254 || !ADRESSE.test(email)) return json({ ok: false, erreur: 'adresse' }, 400);

  const page = String(donnees.page || '').slice(0, 200);
  const deja = await env.LISTE_ATTENTE.get(email);
  if (!deja) {
    await env.LISTE_ATTENTE.put(email, JSON.stringify({ date: new Date().toISOString(), page }));
  }
  return json({ ok: true });
}

export function onRequest() {
  return json({ ok: false, erreur: 'methode' }, 405);
}
