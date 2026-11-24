/* Page d'accueil : script de la LP de Hugo (17/11/2026), repris tel quel, chemins des fichiers adaptés au site. */

"use strict";

const T = window.Tempo, ic = T.icone;
const R = "/accueil/rendus/";
const CHEV = ic("chevron", 18, 2);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const P = (t, cls) => `<span class="pastille${cls ? " " + cls : ""}">${t}</span>`;
const LOUPE = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4 4"/></svg>';
const RETOUR = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m14.5 6-6 6 6 6"/></svg>';
const ETINCELLE = '<span class="question__etincelle" aria-hidden="true"></span>';

// La fiction de l'accueil validé : Camille, 24 semaines, terme le 10 mars.
// Photo Unsplash (photo-1680987218595), copiée à côté : une page publiée ne charge pas les images d'un autre site.
const PHOTO = "/accueil/p17/semaine.jpg";
const SC = { qui: "c", sa: 24, tri: "2e trimestre", centre: "mais", detail: "un épi de maïs · terme le 10 mars", lire: "Il entend vos voix",
  items: [
    { id: "garde", type: "choix", t: "Choisir le mode de garde", d: "avant le 30 nov.", qui: ["c", "l"] },
    { id: "sang", type: "tache", t: "Prise de sang du 6e mois", d: "avant jeudi", qui: ["c"] },
    { id: "prepa", type: "tache", t: "S'inscrire à la préparation", d: "ce mois-ci", qui: ["c"] }],
  attendre: ["le matériel", "le prénom"],
  rdv: { j: "Jeu", n: "12", t: "Consultation du 6e mois", d: "9 h 30", qui: ["c", "l"] } };

// Réponses rédigées, reprises de l'écran de question validé (exemples, non relus).
const QS = [
  { sugg: 1, q: "Je peux manger du comté ?", m: "comte fromage manger", r: { ton: "oui", v: "Oui, sans la croûte", c: "Les fromages à pâte dure, comme le comté, sont permis.", p: "La croûte peut porter la listeria : on la retire, comme pour tous les fromages.", src: "Ameli · Santé publique France" } },
  { sugg: 1, q: "Crèche ou assistante maternelle ?", m: "creche assistante maternelle choisir mode", r: { ton: "nuance", v: "Selon vos horaires", c: "Horaires fixes : la crèche. Horaires souples : l'assistante maternelle.", p: "Dans la garde, quatre questions aident à trancher.", src: "Caf" } },
  { sugg: 1, q: "Combien de bodies dans la valise ?", m: "bodies body valise combien", r: { ton: "nuance", v: "Six, en taille naissance", c: "Plus deux en 1 mois, si bébé est grand.", p: "La liste complète est dans ta valise de maternité.", src: "Maternité Port-Royal" } },
  { q: "Je peux manger des sushis ?", m: "sushis sushi poisson cru manger", r: { ton: "non", v: "Pas de poisson cru", c: "Oui aux sushis cuits, au surimi ou végétariens.", p: "Le poisson cru peut porter la listeria et des parasites : c'est rare, mais grave pendant la grossesse. Déjà mangé ? Sans fièvre, pas d'inquiétude ; dis-le à ta sage-femme.", src: "Ameli · Santé publique France" } },
  { q: "Crampes la nuit, c'est normal ?", m: "crampes nuit normal jambes", r: { ton: "oui", v: "Oui, c'est fréquent", c: "Surtout au 2e et au 3e trimestre, la nuit.", p: "Ce qui soulage : étirer le mollet, pointe du pied tirée vers soi, puis marcher un peu. Jambe rouge, chaude et gonflée ? Appelle ta sage-femme.", src: "Ameli" } },
  { q: "Je peux mettre bébé en crèche à 3 mois ?", m: "creche bebe mois age", r: { ton: "oui", v: "Oui, dès dix semaines", c: "La plupart des crèches accueillent à partir de deux mois et demi.", p: "Les places partent tôt : à Paris, la demande se fait dès le 6e mois de grossesse.", src: "Ville de Paris" } },
  { q: "Je peux prendre l'avion ?", m: "avion voyager prendre", r: { ton: "nuance", v: "Oui, sous conditions", c: "Souvent jusqu'à 36 semaines ; un certificat est parfois demandé après 28.", p: "Les règles changent selon la compagnie : vérifie la tienne et parles-en à ta sage-femme.", src: "Compagnies aériennes" } }
];
const SIGNE = { oui: "coche", non: "croix", nuance: "info" };

const statut = (h = "8:12") => `<div class="tel__statut"><b>${h}</b><span><svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="5.5" width="3" height="6.5" rx="1"/><rect x="10" y="3" width="3" height="9" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/></svg><svg width="26" height="12" viewBox="0 0 26 12"><rect x=".5" y=".5" width="22" height="11" rx="3.5" fill="none" stroke="currentColor" opacity=".45"/><rect x="2" y="2" width="${h === "2:10" ? 9 : 16}" height="8" rx="2" fill="currentColor"/><rect x="23.5" y="4" width="1.8" height="4" rx=".9" fill="currentColor" opacity=".45"/></svg></span></div>`;
const avatars = qui => `<span class="avatars">${qui.map(q => `<span class="avatar ${q}">${q.toUpperCase()}</span>`).join("")}</span>`;
const caseTache = () => `<button type="button" class="cocher" role="checkbox" aria-checked="false" aria-label="Fait">${ic("coche", 15, 2.8)}</button>`;
const ligne = it => `<div class="ligne" data-id="${it.id}"><span class="ligne__tete">${it.type === "tache" ? caseTache() : `<span class="icone-nature">${ic("panneau", 20)}</span>`}</span><span><span class="ligne__titre">${esc(it.t)}</span><span class="ligne__meta">${P(it.d)}</span></span><span class="ligne__fin">${avatars(it.qui)}${CHEV}</span></div>`;
const attendre = () => `<button type="button" class="attendre"><span><b>Ça peut attendre :</b> ${esc(SC.attendre.join(", "))}</span>${ic("chevron", 15, 2.2)}</button>`;
const rdv = () => { const r = SC.rdv; return `<p class="titre-discret">Prochain rendez-vous</p><div class="ligne"><span class="ligne__tete"><span class="date-mini"><span>${r.j}</span><b>${r.n}</b></span></span><span><span class="ligne__titre">${esc(r.t)}</span><span class="ligne__meta">${P(r.d)}</span></span><span class="ligne__fin">${avatars(r.qui)}${CHEV}</span></div>`; };
const onglets = () => `<nav class="ac-onglets" aria-label="Onglets">${[["maison", "Accueil"], ["coeur", "Grossesse"], ["cal", "Calendrier"], ["sac", "Préparatifs"]].map(([i, l], k) => `<button type="button"${k ? "" : ' aria-current="page"'}>${ic(i, 22, k ? 1.75 : 2.1)}${l}</button>`).join("")}</nav>`;
const completion = q => `<button type="button" class="completion" data-q="${esc(q)}">${ETINCELLE}<span>${esc(q)}</span>${ic("remplir", 18, 2)}</button>`;
const reponse = Q => { const r = Q.r; return `<div class="reponse ${r.ton}"><p class="reponse__verdict"><span class="reponse__signe">${ic(SIGNE[r.ton], 18, 2.6)}</span>${r.v}</p><p class="reponse__condition">${r.c}</p><p class="reponse__pourquoi">${r.p}</p><div class="reponse__source">${P("Officiel", "sante petite")}${r.src}</div></div><p class="exemple">Exemple, non relu par un professionnel.</p>`; };
const vivant = nuit => nuit
  ? `<div class="vivant"><img class="corps" src="${R}nuit-portrait-sans-yeux.jpg" alt=""><span class="oeil-pos" style="left:43.555%;top:32.227%;width:4.492%;height:4.688%"><img src="${R}oeil-g-nuit.png" alt=""></span><span class="oeil-pos" style="left:58.691%;top:35.645%;width:3.906%;height:4.883%"><img src="${R}oeil-d-nuit.png" alt=""></span><span class="lueur" style="left:32.5%;top:66.2%"></span></div>`
  : `<div class="vivant"><img class="corps" src="${R}portrait-3-sans-yeux.jpg" alt=""><span class="oeil-pos" style="left:45.117%;top:29.199%;width:4.492%;height:4.883%"><img src="${R}oeil-g.png" alt=""></span><span class="oeil-pos" style="left:59.863%;top:31.641%;width:4.297%;height:4.883%"><img src="${R}oeil-d.png" alt=""></span><span class="lueur" style="left:32.4%;top:65.2%"></span></div>`;
const pose = (t, nom) => R + (t.dataset.mode === "nuit" ? "nuit-" : "") + nom + ".jpg";

// ---------- La recherche : trouver un endroit de Tempo ; une question part chez Mezzo ----------
const il = T.illustration;
const norm = x => String(x).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
const mots = x => norm(x).split(/[^a-z0-9]+/).filter(Boolean);
const dateMini = (j, d) => `<span class="date-mini"><span>${j}</span><b>${d}</b></span>`;
const carre = (inner, cls) => `<span class="carre${cls ? " " + cls : ""}">${inner}</span>`;
// Ce que l'app contient : dossiers, rendez-vous, fiches (repris de l'écran de question validé)
const ALLER = [
  { t: "Garde", l: "Préparatifs", tete: () => carre(il("creche", 30)), m: "garde creche nounou assistante maternelle mode micro parentale" },
  { t: "Demande de crèche", l: "Calendrier · avant le 1er déc.", tete: () => dateMini("Déc", "1"), m: "demande creche inscription mairie" },
  { t: "Les modes de garde", l: "Fiche · Garde", tete: () => carre(ic("doc", 20)), m: "modes garde creche assistante maternelle" },
  { t: "Valise de maternité", l: "Matériel · 2 sur 20", tete: () => carre(ic("sac", 20), "repas"), m: "valise sac maternite affaires" },
  { t: "Matériel", l: "Préparatifs", tete: () => carre(ic("sac", 20)), m: "materiel poussette siege auto lit achats" },
  { t: "Consultation du 6e mois", l: "Calendrier · jeu. 12 nov., 9 h 30", tete: () => dateMini("Jeu", "12"), m: "consultation rendez-vous rdv sage-femme mois" },
  { t: "Manger pendant la grossesse", l: "Fiche · Grossesse", tete: () => carre(ic("doc", 20)), m: "manger alimentation fromage comte sushi sushis poisson viande crue" },
  { t: "Congé de paternité", l: "Préparatifs · Démarches et congés", tete: () => carre(ic("doc", 20)), m: "conge conges paternite naissance employeur" },
  { t: "Prénom", l: "Préparatifs · 6 idées de Camille", tete: () => carre(ic("etoile", 20)), m: "prenom prenoms nom choisir" },
  { t: "Crampes, mal de dos, nausées", l: "Fiche · Grossesse, mon corps", tete: () => carre(ic("coeur", 20)), m: "crampes mal dos nausees petits maux" }
];
const ALERTES = ["saign", "perte de liquide", "liquide", "fievre", "bouge moins", "bouge plus", "vision", "idees noires", "douleur forte"];
const RECENTS = ["Garde", "Consultation du 6e mois"];
const RACCOURCIS = [["Garde", "garde"], ["Valise", "valise"], ["Rendez-vous", "consultation"], ["Congés", "congé"], ["Prénom", "prénom"], ["Manger", "manger"]];
// Les petits mots d'une question ne comptent pas : « je peux manger du comté » cherche « manger » et « comté ».
const VIDES = new Set("je j tu il elle on nous vous ils elles peux peut puis dois doit faut est c ce ca que qu quoi quel quelle quels quelles comment quand combien pourquoi ou et a au aux de du des d la le les l un une en y pour par avec sans mon ma mes ton ta tes son sa ses notre votre leur se s ne n pas plus tres bien".split(" "));
function chercher(q) {
  const n = norm(q).trim(), toks = mots(q).filter(w => !VIDES.has(w));
  const touche = txt => { const w = mots(txt); return n && (norm(txt).includes(n) || (toks.length > 0 && toks.every(t => w.some(x => x.startsWith(t))))); };
  return { alerte: n.length >= 3 && ALERTES.some(a => n.includes(a)), aller: ALLER.filter(x => touche(x.t + " " + x.m)), questions: QS.filter(x => touche(x.q + " " + x.m)) };
}
const surligne = (txt, q) => { const n = norm(txt), k = norm(q).trim(); const i = k ? n.indexOf(k) : -1; return i < 0 ? esc(txt) : esc(txt.slice(0, i)) + "<b>" + esc(txt.slice(i, i + k.length)) + "</b>" + esc(txt.slice(i + k.length)); };
const proposition = (x, q) => `<button type="button" class="proposition" data-aller="${esc(x.t)}">${x.tete()}<span><span class="proposition__titre">${surligne(x.t, q || "")}</span><span class="proposition__lieu">${x.l}</span></span>${ic("chevron", 16, 2)}</button>`;
const versMezzo = q => `<button type="button" class="proposition" data-mezzo="${esc(q)}"><span class="carre mezzo"></span><span><span class="proposition__titre">${q ? `Poser la question : <b>« ${esc(q)} »</b>` : "Poser une question"}</span><span class="proposition__lieu">Mezzo te répond, sources à l'appui</span></span>${ic("chevron", 16, 2)}</button>`;
const repondu = (x, q) => `<button type="button" class="completion" data-mezzo="${esc(x.q)}">${ETINCELLE}<span>${surligne(x.q, q)}</span>${ic("chevron", 16, 2)}</button>`;
const urgence = () => `<div class="urgence-bloc"><div class="bandeau urgence" role="alert"><span class="bandeau__icone">${ic("tel", 18)}</span><p class="bandeau__texte"><b>Un saignement pendant la grossesse :</b> appelle ta maternité maintenant, même la nuit.</p></div><button type="button" class="bouton pleine">${ic("tel", 20, 2)}Appeler la maternité Port-Royal</button><button type="button" class="bouton lien">Appeler le 15</button></div>`;
const clavier = () => `<div class="clavier" aria-hidden="true">${["azertyuiop", "qsdfghjklm"].map(rg => `<div class="rang">${[...rg].map(k => `<span class="t">${k}</span>`).join("")}</div>`).join("")}<div class="rang"><span class="t g">⇧</span>${[..."wxcvbn"].map(k => `<span class="t">${k}</span>`).join("")}<span class="t">'</span><span class="t g">⌫</span></div><div class="rang"><span class="t g">123</span><span class="t l">espace</span><span class="t v">rechercher</span></div></div>`;
const estQuestion = q => mots(q).length >= 3 || /\?\s*$/.test(q);
function corpsRecherche(brut) {
  const q = brut.trim();
  if (q.length < 2) return `<p class="titre-discret">Récents</p>${RECENTS.map(t => proposition(ALLER.find(x => x.t === t))).join("")}
    <p class="titre-discret">Aller vite à</p><div class="suggestions">${RACCOURCIS.map(([l, v]) => `<button type="button" class="pastille suggestion" data-cherche="${esc(v)}">${l}</button>`).join("")}</div>
    <p class="titre-discret">Une question ?</p>${versMezzo("")}`;
  const c = chercher(q), question = estQuestion(q);
  const mz = `<p class="titre-discret">Une question ?</p>${versMezzo(q)}`;
  let h = c.alerte ? urgence() : "";
  if (question) h += mz;
  if (c.aller.length) h += `<p class="titre-discret">Aller à</p>${c.aller.slice(0, 4).map(x => proposition(x, q)).join("")}`;
  if (c.questions.length) h += `<p class="titre-discret">Déjà répondu par Tempo</p>${c.questions.slice(0, 3).map(x => repondu(x, q)).join("")}`;
  if (!c.aller.length && !c.questions.length) h += `<p class="titre-discret">Rien dans Tempo pour « ${esc(q)} »</p>`;
  if (!question) h += mz;
  return h;
}
function rendreRecherche(rch) { const q = rch.querySelector("input").value; rch.querySelector(".recherche-ouverte__corps").innerHTML = corpsRecherche(q); rch.querySelector(".eq__effacer").style.visibility = q ? "visible" : "hidden"; }
function toastRecherche(rch, txt) { rch.querySelectorAll(".eq__toast").forEach(x => x.remove()); rch.insertAdjacentHTML("beforeend", `<div class="eq__toast"><div class="bandeau compact" style="box-shadow:var(--ombre-levee);background:var(--surface)"><span class="bandeau__icone">${ic("chevron", 16, 2.2)}</span><p class="bandeau__texte">${txt}</p></div></div>`); setTimeout(() => rch.querySelectorAll(".eq__toast").forEach(x => x.remove()), 1800); }

const SALUT = { matin: "Bonjour,", soir: "Bonsoir,", nuit: "Bonsoir," };
const bebe = v => `<button type="button" class="semaine bebe" aria-label="La semaine ${SC.sa}, à lire en quelques images"><img class="semaine__bebe" src="${v.ciel === "nuit" ? "/accueil/p17/bebe-nuit.jpg" : "/accueil/p17/bebe-jour.jpg"}" alt=""><span class="semaine__haut"><span class="semaine__salut">${SALUT[v.ciel]}<b>Camille</b></span></span><span class="semaine__texte"><span class="semaine__nombre">${SC.sa}<small>semaines</small></span><span class="semaine__lire">${SC.lire}${CHEV}</span></span></button>`;
const semaine = () => `<button type="button" class="semaine"><span class="semaine__photo" style="background-image:url(${PHOTO})"></span><span class="semaine__haut"><span class="pastille verre">${SC.tri}</span></span><span class="semaine__texte"><span class="semaine__nombre">${SC.sa}<small>semaines</small></span><span class="semaine__detail">${SC.detail}</span><span class="semaine__lire">${SC.lire}${CHEV}</span></span>${T.anneauTerme(SC.sa, { centre: T.illustration(SC.centre, 44) })}</button>`;
const ecranAccueil = (v) => `<div class="ecran accueil">
  <div class="ac-degrade ${v.ciel}"></div>
  ${statut(v.h)}
  <div class="ac-tete"><button type="button" class="recherche">${LOUPE}Rechercher dans Tempo</button><button type="button" class="ac-profil" aria-label="Profil"><span class="avatar c">C</span></button></div>
  <div class="tel__corps">${v.carte === "bebe" ? bebe(v) : semaine()}<p class="titre-discret">À faire maintenant</p><div class="lignes">${SC.items.map(ligne).join("")}</div>${attendre()}${rdv()}</div>
</div>
<div class="ac-bas">${onglets()}<button type="button" class="mezzo-porte" aria-label="Poser une question à Mezzo"></button></div>`;

const filVide = nuit => `<div class="ch-mezzo" role="img" aria-label="Mezzo, qui suit le doigt">${vivant(nuit)}</div>
  <p class="ch-intro"><b>Pose ta question.</b>Mezzo te répond, avec des sources françaises.</p>
  <p class="titre-discret">Souvent demandé à 24 semaines</p>${QS.filter(x => x.sugg).map(x => completion(x.q)).join("")}`;
const ecranChat = (v) => `<div class="ecran chat" aria-hidden="true">
  ${statut(v.h)}
  <div class="ch-tete"><button type="button" class="ch-retour" aria-label="Retour à l'accueil">${RETOUR}</button><button type="button" class="ch-avatar" data-page="mezzo" aria-label="Qui est Mezzo ?"></button><span></span></div>
  <div class="ch-fil">${filVide(v.mode === "nuit")}</div>
  <div class="ch-bas"><div class="question">${ETINCELLE}<span class="question__texte">Pose ta question</span><span class="question__bouton">${ic("micro", 20)}</span></div><p class="ch-doute">Un souci de santé ? <b>J'ai un doute</b></p></div>
</div>`;

// ---------- Mezzo suit le doigt ----------
const VIVANTS = [];
const reduit = matchMedia("(prefers-reduced-motion: reduce)").matches;
const borne = v => Math.max(-1, Math.min(1, v));
let boucle = 0, retour = 0;
function inscrire(racine) { racine.querySelectorAll(".vivant").forEach(el => { if (!VIVANTS.some(s => s.el === el)) VIVANTS.push({ el, yeux: [...el.querySelectorAll(".oeil-pos")], tx: 0, ty: 0, cx: 0, cy: 0 }); }); }
function vise(x, y, dans) {
  VIVANTS.forEach(s => {
    if (!s.el.isConnected || (dans && !dans.contains(s.el))) return;
    const r = s.el.getBoundingClientRect(); if (!r.width) return;
    s.tx = borne((x - (r.left + r.width * .55)) / (r.width * .8));
    s.ty = borne((y - (r.top + r.height * .33)) / (r.height * .8));
  });
  clearTimeout(retour); retour = setTimeout(() => { VIVANTS.forEach(s => { s.tx = 0; s.ty = 0; }); lance(); }, 2200);
  lance();
}
function lance() { if (!boucle) boucle = requestAnimationFrame(pas); }
function pas() {
  let bouge = false;
  VIVANTS.forEach(s => {
    if (!s.el.isConnected) return;
    s.cx += (s.tx - s.cx) * .12; s.cy += (s.ty - s.cy) * .12;
    const w = s.el.clientWidth;
    if (!reduit) s.el.style.transform = `perspective(900px) rotateY(${s.cx * 11}deg) rotateX(${-s.cy * 7}deg) translate3d(${s.cx * w * .02}px, ${s.cy * w * .012}px, 0)`;
    s.yeux.forEach(o => o.style.transform = `translate(${s.cx * w * .0075}px, ${s.cy * w * .006}px)`);
    if (Math.abs(s.tx - s.cx) + Math.abs(s.ty - s.cy) > .002) bouge = true;
  });
  boucle = bouge ? requestAnimationFrame(pas) : 0;
}
addEventListener("pointermove", e => { if (e.pointerType === "mouse") vise(e.clientX, e.clientY); }, { passive: true });

// ---------- Un téléphone : l'accueil, et le chat par-dessus ----------
// Questions fréquentes sur Mezzo : engagements retenus par Hugo le 17/11, aucun en place aujourd'hui.
const FAQ = {
  "faq-semaine": { i: "cal", q: "Pourquoi Mezzo connaît-il ma semaine ?", r: [
    "Pour te répondre à toi, pas à une femme enceinte en général. Mezzo sait à quelle semaine tu en es, ce que vous avez déjà fait et ce qui vous attend : « Puis-je prendre l'avion ? » n'appelle pas la même réponse à 12 et à 34 semaines.",
    "Il ne voit que ce que tu as noté dans Tempo. Il n'a pas accès à ton dossier médical, ni à tes résultats.",
    "Tu peux le lui retirer dans ton profil : il te répondra alors sans tenir compte de ta semaine."] },
  "faq-confidentiel": { i: "info", q: "Ma conversation avec Mezzo est-elle confidentielle ?", r: [
    "Oui. Ta conversation n'est visible que par toi. L'autre parent ne la voit pas, sauf si tu la partages.",
    "Personne chez Tempo ne la lit. Seule exception : si tu signales une réponse, ce message et ta question sont relus par l'équipe, pour corriger Mezzo.",
    "Tu peux effacer une conversation, ou tout ton historique, à tout moment depuis ton profil."] },
  "faq-ia": { i: "doc", q: "Mes données servent-elles à entraîner l'IA ?", r: [
    "Non, jamais. Tes conversations et tes données ne servent à entraîner ni Mezzo, ni aucune autre intelligence artificielle.",
    "Mezzo progresse autrement : en s'appuyant sur des sources françaises et sur les fiches de Tempo, relues par des sages-femmes. C'est en améliorant ces fiches qu'on l'améliore, pas avec tes questions.",
    "Les services d'IA qui font fonctionner Mezzo s'engagent par contrat à ne pas garder ce que tu écris, et à ne pas s'en servir."] },
  "faq-diagnostic": { i: "coeur", q: "Mezzo peut-il poser un diagnostic ?", r: [
    "Non. Mezzo t'informe et t'oriente ; il ne pose pas de diagnostic et ne prescrit rien, ni médicament, ni examen.",
    "Pour un symptôme, il te pose quelques questions pour savoir qui appeler, et quand : ta sage-femme, ta maternité, ou le 15 en cas d'urgence.",
    "Seul un professionnel de santé qui t'examine peut poser un diagnostic."] },
  "faq-donnees": { i: "cal", q: "Où sont gardées mes données ?", r: [
    "En France, chez un hébergeur certifié pour les données de santé, comme la loi l'exige.",
    "Tempo ne garde que ce qui sert à t'accompagner : ta date de terme, ce que vous avez fait, tes questions. Rien n'est vendu, rien n'est partagé à des fins publicitaires.",
    "Tu peux télécharger ou supprimer toutes tes données à tout moment depuis ton profil, ou en écrivant à l'équipe de Tempo : ce sont tes droits, au titre du règlement européen sur les données (RGPD)."] }
};
const pageFaq = nom => { const f = FAQ[nom]; return `${pmTete()}<div class="pm-corps"><span class="carre pm-faq-icone">${ic(f.i, 24)}</span><p class="pm-titre">${f.q}</p>${f.r.map(x => `<p class="pm-reponse">${x}</p>`).join("")}<div class="pm-doute"><p>Une autre question sur Mezzo ?</p><button type="button" class="bouton" data-page-retour>Retour aux questions</button></div><p class="exemple">Engagement retenu par Hugo le 17/11 ; pas encore en place.</p></div>`; };
const ERREURS = `<button type="button" class="ch-erreurs" data-page="surete">Mezzo peut se tromper${ic("info", 15, 2)}</button>`;
const pmTete = () => `<div class="pm-tete"><button type="button" class="ch-retour" data-page-retour aria-label="Retour">${RETOUR}</button></div>`;
const faq = nom => `<button type="button" class="proposition" data-page="${nom}">${carre(ic(FAQ[nom].i, 20))}<span><span class="proposition__titre">${FAQ[nom].q}</span></span>${ic("chevron", 16, 2)}</button>`;
const pageSurete = () => `${pmTete()}<div class="pm-corps">
  <p class="pm-titre">Mezzo est-il sûr pour ta santé ?</p>
  <ul class="pm-puces"><li>Mezzo répond à partir de sources françaises : Ameli, Santé publique France, la Haute Autorité de santé, les maternités.</li><li>Les fiches sur lesquelles il s'appuie sont relues par des sages-femmes.</li></ul>
  <p class="pm-sous">Mezzo peut se tromper</p>
  <p>Mezzo est une intelligence artificielle (IA) : il peut faire des erreurs ou donner une information incomplète. Pour ta sécurité :</p>
  <ul class="pm-puces"><li><mark>Il oriente, il ne diagnostique pas.</mark> Il ne remplace ni ta sage-femme ni ton médecin.</li><li><mark>Au moindre signe d'alerte</mark>, il te dit d'abord qui appeler : ta maternité, le 15, ou le 3114 si le moral flanche.</li><li><mark>Chaque réponse montre sa source</mark> : tu peux la vérifier.</li></ul>
  <p class="pm-sous">Un doute ?</p>
  <ul class="pm-puces"><li>Une réponse te semble bizarre ? Pose la question à ta sage-femme.</li><li>Signale une réponse en appuyant longtemps dessus : l'équipe de Tempo la relit.</li></ul>
  <p class="titre-discret">Mezzo</p>
  <button type="button" class="proposition" data-page="mezzo"><span class="carre mezzo"></span><span><span class="proposition__titre">En savoir plus sur Mezzo</span></span>${ic("chevron", 16, 2)}</button>
  <p class="titre-discret">Questions fréquentes</p>
  ${Object.keys(FAQ).map(faq).join("")}
  <div class="pm-doute"><p>Un souci de santé, maintenant ?</p><button type="button" class="bouton">J'ai un doute</button></div>
  <p class="exemple">Engagements retenus par Hugo le 17/11 ; aucun n'est en place aujourd'hui.</p>
</div>`;
const pageMezzo = t => `${pmTete()}<div class="pm-corps">
  <div class="pm-hero"><div class="ac-degrade ${t.dataset.ciel}"></div><h2>Une question sur ta grossesse ?</h2><span class="pm-tag">Demande à Mezzo</span><div class="ch-mezzo">${vivant(t.dataset.mode === "nuit")}</div></div>
  <p class="pm-accroche">Mezzo est là jour et nuit, pour des réponses claires et sourcées.</p>
  <div class="pm-atouts">
    <div class="pm-atout">${carre(ic("doc", 26))}<b>Nourri aux sources françaises</b><span>Ameli, Santé publique France, la Haute Autorité de santé, et des fiches relues par des sages-femmes.</span></div>
    <div class="pm-atout">${carre(ic("cal", 26))}<b>Il connaît ta semaine</b><span>Il sait où tu en es et ce que vous avez déjà fait : il répond pour toi.</span></div>
    <div class="pm-atout">${carre(ic("tel", 26))}<b>Il oriente au bon moment</b><span>Ta maternité, ta sage-femme, le 15 : il te dit qui appeler quand il le faut.</span></div>
  </div>
  <div class="pm-actions"><button type="button" class="bouton pleine" data-page-retour>Poser une question</button><button type="button" class="bouton lien" data-page="surete">Mezzo est-il sûr pour ta santé ?</button></div>
  <p class="exemple" style="text-align:center">Engagements retenus par Hugo le 17/11 ; pas encore en place.</p>
</div>`;
function ouvrirPage(t, nom, fixe) {
  const chat = t.querySelector(".chat");
  const div = document.createElement("div");
  div.className = "page-m" + (fixe ? " fixe" : ""); div.dataset.nom = nom;
  div.innerHTML = statut(t.dataset.h) + (nom === "mezzo" ? pageMezzo(t) : FAQ[nom] ? pageFaq(nom) : pageSurete());
  chat.appendChild(div); inscrire(div);
}
function poser(t, q, vite) {
  // La réponse rédigée exacte, sinon la plus proche (mêmes mots utiles) : « je peux manger du comté » trouve « Je peux manger du comté ? »
  const Q = QS.find(x => x.q === q) || chercher(q).questions[0];
  const fil = t.querySelector(".ch-fil");
  if (!Q) {
    fil.innerHTML = `<div class="bulle-moi">${esc(q)}</div><div class="ch-reponse"><div class="ch-qui"><div class="ch-mini"><img src="${pose(t, "cherche")}" alt=""></div><span>Mezzo · pas encore de réponse sûre</span></div><div class="bandeau compact" style="margin-top:6px"><span class="bandeau__icone">${ic("info", 18)}</span><p class="bandeau__texte">Mezzo n'a pas encore de réponse sûre à « ${esc(q)} ». Il la garde pour y répondre.</p></div><p class="titre-discret">Questions proches</p>${QS.filter(x => x.sugg).slice(0, 2).map(x => completion(x.q)).join("")}</div>`;
    t.querySelector(".ch-bas .question__texte").textContent = "Pose une autre question";
    return;
  }
  fil.innerHTML = `<div class="bulle-moi">${esc(q)}</div><div class="ch-reponse"><div class="ch-qui"><div class="ch-mini"><img src="${pose(t, vite ? "trouve" : "cherche")}" alt=""></div><span class="${vite ? "" : "ch-cherche"}">${vite ? "Mezzo · réponse sourcée" : "Mezzo cherche dans ses sources…"}</span></div><div class="ch-corps">${vite ? reponse(Q) + ERREURS : ""}</div></div>`;
  t.querySelector(".ch-bas .question__texte").textContent = "Pose une autre question";
  if (vite) return;
  setTimeout(() => {
    if (!fil.isConnected) return;
    const mini = fil.querySelector(".ch-mini"), etiquette = fil.querySelector(".ch-qui span");
    mini.querySelector("img").src = pose(t, "trouve"); mini.classList.add("pop");
    etiquette.className = ""; etiquette.textContent = "Mezzo · réponse sourcée";
    fil.querySelector(".ch-corps").innerHTML = reponse(Q) + ERREURS + `<p class="titre-discret">Autres questions</p>${QS.filter(x => x.sugg && x !== Q).slice(0, 2).map(x => completion(x.q)).join("")}`;
  }, 1400);
}
const MATIN = { h: "8:12", ciel: "matin", mode: "jour" };
function ouvrirRecherche(t, depart, fixe) {
  const old = t.querySelector(".recherche-ouverte"); if (old) old.remove();
  t.insertAdjacentHTML("beforeend", `<div class="recherche-ouverte${fixe ? " fixe" : ""}">${statut(t.dataset.h)}<div class="recherche-ouverte__tete"><label class="recherche-ouverte__champ">${LOUPE}<input type="search" placeholder="Rechercher dans Tempo" autocomplete="off" enterkeyhint="search" aria-label="Rechercher dans Tempo"><button type="button" class="eq__effacer" data-a="effacer" aria-label="Effacer">${ic("croix", 13, 2.6)}</button></label><button type="button" class="eq__annuler" data-a="annuler">Annuler</button></div><div class="recherche-ouverte__corps"></div>${clavier()}</div>`);
  const rch = t.querySelector(".recherche-ouverte"), champ = rch.querySelector("input");
  champ.value = depart || "";
  champ.addEventListener("input", () => rendreRecherche(rch));
  champ.addEventListener("keydown", e => {
    if (e.key !== "Enter") return;
    e.preventDefault(); const q = champ.value.trim(); if (!q) return;
    const c = chercher(q);
    if (!estQuestion(q) && c.aller.length) toastRecherche(rch, `Tempo ouvre « ${esc(c.aller[0].t)} ».`);
    else versChat(t, q);
  });
  rendreRecherche(rch);
  if (!fixe) champ.focus({ preventScroll: true });
}
function versChat(t, q) {
  const rch = t.querySelector(".recherche-ouverte"); if (rch) rch.remove();
  t.dataset.vue = "chat"; t.querySelector(".chat").setAttribute("aria-hidden", "false");
  if (q) setTimeout(() => poser(t, q), 380);
}
function telephone(vue, question, v = MATIN, page) {
  const t = document.createElement("div");
  t.className = "tel"; t.dataset.vue = vue === "accueil" ? "accueil" : "chat"; t.dataset.mode = v.mode; t.dataset.h = v.h; t.dataset.ciel = v.ciel;
  t.innerHTML = ecranAccueil(v) + ecranChat(v);
  const chat = t.querySelector(".chat");
  const ouvrir = () => { t.dataset.vue = "chat"; chat.setAttribute("aria-hidden", "false"); };
  const fermer = () => { t.dataset.vue = "accueil"; chat.setAttribute("aria-hidden", "true"); setTimeout(() => { t.querySelector(".ch-fil").innerHTML = filVide(t.dataset.mode === "nuit"); t.querySelector(".ch-bas .question__texte").textContent = "Pose ta question"; inscrire(t); }, 430); };
  t.querySelector(".mezzo-porte").addEventListener("click", ouvrir);
  t.querySelector(".ch-retour").addEventListener("click", fermer);
  t.addEventListener("click", e => {
    if (e.target.closest(".recherche")) { ouvrirRecherche(t, ""); return; }
    const rch = t.querySelector(".recherche-ouverte");
    if (rch && rch.contains(e.target)) {
      const a = e.target.closest("[data-a]"), m = e.target.closest("[data-mezzo]"), ch = e.target.closest("[data-cherche]"), al = e.target.closest("[data-aller]");
      const champ = rch.querySelector("input");
      if (a && a.dataset.a === "annuler") { rch.remove(); return; }
      if (a && a.dataset.a === "effacer") { e.preventDefault(); champ.value = ""; rendreRecherche(rch); champ.focus({ preventScroll: true }); return; }
      if (ch) { champ.value = ch.dataset.cherche; rendreRecherche(rch); return; }
      if (m) { versChat(t, m.dataset.mezzo); return; }
      if (al) toastRecherche(rch, `Tempo ouvre « ${esc(al.dataset.aller)} ».`);
      return;
    }
    const pg = e.target.closest("[data-page]"), rt = e.target.closest("[data-page-retour]");
    if (rt) { const pm = rt.closest(".page-m"); if (pm) pm.remove(); return; }
    if (pg) { ouvrirPage(t, pg.dataset.page); return; }
    const c = e.target.closest(".completion"); if (c && c.dataset.q) poser(t, c.dataset.q);
  });
  t.addEventListener("pointerdown", e => { if (e.pointerType !== "mouse") vise(e.clientX, e.clientY, t); });
  t.addEventListener("pointermove", e => { if (e.pointerType !== "mouse") vise(e.clientX, e.clientY, t); });
  if (vue !== "accueil") chat.setAttribute("aria-hidden", "false");
  if (question) poser(t, question, true);
  if (page) ouvrirPage(t, page, true);
  inscrire(t);
  return t;
}


document.body.classList.add("site");
// ======== La page d'accueil du site ========
const FILM = { horizontal: "/accueil/film/site-film-horizontal.mp4", vertical: "/accueil/film/site-film-vertical.mp4" };
const CHAP = [
  { cle: "accueil", titre: "Ce qui compte, cette semaine", texte: "Chaque jour, la semaine de votre bébé et trois choses à faire, au plus. Le reste peut attendre.",
    points: ["La semaine du bébé, à lire en quelques images", "Trois choses au plus, chacune avec son délai", "« Ça peut attendre » range tout le reste"],
    ecran: { vue: "accueil" }, essai: "Cochez une chose faite ; touchez la recherche, ou la pastille de Mezzo." },
  { cle: "question", titre: "Une question ? Mezzo répond", texte: "À toute heure, une réponse claire, sources françaises à l'appui.",
    points: ["Chercher un dossier, une fiche, un rendez-vous", "Poser sa question à Mezzo, en une phrase", "Au moindre signe d'alerte, savoir qui appeler"],
    ecran: { vue: "chat", q: "Je peux manger du comté ?" }, essai: "Posez une autre question ; Mezzo suit votre doigt." },
  { cle: "preparatifs", titre: "Tout préparer, un dossier à la fois", texte: "Garde, maternité, congés, valise, prénom : huit dossiers à clore, ce qui presse d'abord.",
    points: ["Ce qui presse, en tête", "Chaque dossier se clôt, et libère l'esprit", "« Ne me concerne pas » retire ce qui ne vous regarde pas"],
    ecran: { image: "/accueil/ecrans/preparatifs.jpg" } },
  { cle: "calendrier", titre: "Ne rien rater", texte: "Rendez-vous, examens, démarches : tout ce qui a une date, au bon moment.",
    points: ["Le prochain rendez-vous, et les questions à y poser", "Ce qui est à faire avant, daté", "La vue du mois, d'un geste"],
    ecran: { image: "/accueil/ecrans/calendrier.jpg" } },
  { cle: "grossesse", titre: "Comprendre, semaine après semaine", texte: "Le bébé, votre corps, l'accouchement, l'après : de quoi comprendre, sans tout lire d'un coup.",
    points: ["Pour votre semaine, trois lectures courtes", "Quatre portes : le bébé, mon corps, l'accouchement, l'après", "Des fiches sourcées"],
    ecran: { image: "/accueil/ecrans/grossesse.jpg" } },
  { cle: "nuit", titre: "La nuit, rien n'alarme", texte: "À 3 heures du matin, Tempo passe en veilleuse : une lumière douce, et toujours qui appeler.",
    points: ["Des couleurs de nuit, qui n'éblouissent pas", "Mezzo répond, la lampe allumée", "« J'ai un doute » : qui appeler, maintenant"],
    ecran: { vue: "accueil", nuit: true }, essai: "Touchez la pastille : le chat de nuit s'ouvre." },
  { cle: "deux", titre: "À deux", texte: "Chacun son accueil et ses tâches, et la même connaissance de la grossesse.",
    points: ["Un accueil pour chaque parent", "Qui s'occupe de quoi, d'un coup d'œil", "Ce que l'autre parent peut faire, cette semaine"],
    ecran: { deux: true }, essai: "Camille, puis Léo : la même semaine, chacun ses tâches." }
];
const LEO = { qui: "l", lire: "Ce qu'elle vit", attendre: ["tes prénoms", "monter le lit"],
  items: [{ id: "rpe", type: "tache", t: "Appeler le relais du 19e", d: "cette semaine", qui: ["l"] }, { id: "absence", type: "tache", t: "Poser ta matinée de jeudi", d: "avant jeudi", qui: ["l"] }, { id: "pat", type: "tache", t: "Prévenir ton employeur", d: "ce mois-ci", qui: ["l"] }] };
const HEURES = { matin: { h: "8:12", ciel: "matin", mode: "jour", carte: "bebe" }, soir: { h: "19:30", ciel: "soir", mode: "jour", carte: "bebe" }, nuit: { h: "2:10", ciel: "nuit", mode: "nuit", carte: "bebe" } };
const FLECHE = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6"/></svg>';
const COCHE = T.icone("coche", 14, 2.8);
const mq = matchMedia("(max-width: 900px)");
let ciel = (h => h >= 22 || h < 6 ? "nuit" : h >= 18 ? "soir" : "matin")(new Date().getHours());
let actif = "accueil", ECRANS = {};

function leo(v) {
  const sauve = { qui: SC.qui, lire: SC.lire, attendre: SC.attendre, items: SC.items };
  Object.assign(SC, LEO); const t = telephone("accueil", null, v); Object.assign(SC, sauve);
  t.querySelector(".semaine__salut b").textContent = "Léo";
  const a = t.querySelector(".ac-profil .avatar"); a.className = "avatar l"; a.textContent = "L";
  return t;
}
function fabriquer(ch, dedans) {
  const box = document.createElement("div"), e = ch.ecran, v = HEURES[e.nuit ? "nuit" : ciel];
  box.className = "s-ecran" + (dedans ? " dedans actif" : ""); box.dataset.cle = ch.cle;
  if (e.image) box.innerHTML = `<div class="tel-image"><img src="${e.image}" alt="L'écran ${esc(ch.titre)} de Tempo"></div>`;
  else if (e.deux) { box.classList.add("deux"); box.append(telephone("accueil", null, v), leo(v)); }
  else box.append(telephone(e.vue, e.q || null, v));
  if (!dedans) {
    box.tabIndex = 0; box.setAttribute("role", "button"); box.setAttribute("aria-label", `Entrer dans l'aperçu : ${ch.titre}`);
    box.insertAdjacentHTML("beforeend", `<span class="s-indice">Entrer${FLECHE}</span>`);
  }
  inscrire(box);
  return box;
}
function textes() {
  document.getElementById("textes").innerHTML = CHAP.map((ch, k) => `<article class="s-chap" id="ch-${ch.cle}" data-cle="${ch.cle}">
    <span class="s-num">${String(k + 1).padStart(2, "0")}</span><h2>${ch.titre}</h2><p>${ch.texte}</p>
    <ul class="s-points">${ch.points.map(p => `<li><i>${COCHE}</i><span>${p}</span></li>`).join("")}</ul>
    <button type="button" class="s-entrer" data-entrer="${ch.cle}">Entrer dans l'aperçu${FLECHE}</button>
    <div class="s-tel-mobile"></div></article>`).join("");
}
function construire() {
  const ecrin = document.getElementById("ecrin"); ecrin.innerHTML = ""; ECRANS = {};
  document.querySelectorAll(".s-tel-mobile").forEach(x => x.innerHTML = "");
  CHAP.forEach(ch => { const el = fabriquer(ch); ECRANS[ch.cle] = el; (mq.matches ? document.querySelector(`#ch-${ch.cle} .s-tel-mobile`) : ecrin).append(el); });
  const ap = document.getElementById("apercu"); ap.innerHTML = ""; ap.append(fabriquer(CHAP[0]));
  activer(actif);
}
// Mezzo passe la tête derrière le téléphone (détouré) ; la nuit, plus sombre, la lanterne plus vive
const TETE = { base: "tete-sans-yeux.webp", flamme: [29.2, 68.1], yeux: [[41.198, 31.8, 7.579, 6.544, "oeil-g-tete.png"], [61.491, 41.922, 7.335, 6.544, "oeil-d-tete.png"]] };
function mezzoTete() {
  const m = document.getElementById("mezzo-tete");
  m.className = "s-mezzo" + (ciel === "nuit" ? " nuit" : "");
  m.innerHTML = `<div class="vivant"><img class="corps" src="${R}${TETE.base}" alt="">${TETE.yeux.map(([x, y, w, h, f]) => `<span class="oeil-pos" style="left:${x}%;top:${y}%;width:${w}%;height:${h}%"><img src="${R}${f}" alt=""></span>`).join("")}<span class="lueur" style="left:${TETE.flamme[0]}%;top:${TETE.flamme[1]}%"></span></div>`;
  inscrire(m);
}
function activer(cle) { actif = cle; Object.entries(ECRANS).forEach(([k, el]) => el.classList.toggle("actif", k === cle)); }
function appliquerHeure(c) {
  ciel = c; document.documentElement.dataset.mode = c === "nuit" ? "nuit" : "jour";
  document.querySelectorAll(".s-ciel").forEach(x => x.className = "ac-degrade s-ciel " + c);
  document.querySelectorAll(".s-heure button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.ciel === c)));
  construire();
  mezzoTete();
}

// Le panneau : entrer dans un aperçu, ou voir le film ; on referme par la croix, Échap ou le retour du navigateur
const panneau = document.getElementById("panneau"), contenu = panneau.querySelector(".s-panneau__contenu");
let retourFocus = null;
function montrer(html, el) {
  contenu.innerHTML = html; if (el) contenu.querySelector(".s-panneau__tel").append(el);
  panneau.hidden = false; document.body.classList.add("fige");
  history.pushState({ panneau: 1 }, ""); retourFocus = document.activeElement;
  panneau.querySelector(".s-panneau__fermer").focus({ preventScroll: true });
  const z = Math.min(1, (innerHeight - (mq.matches ? 24 : 64)) / 812);
  contenu.querySelectorAll(".tel, .tel-image").forEach(t => t.style.zoom = z * (t.closest(".deux") ? .82 : 1));
}
function entrer(cle) {
  const ch = CHAP.find(c => c.cle === cle);
  montrer(`<div class="s-panneau__boite"><div class="s-panneau__tel"></div><div class="s-panneau__texte"><span class="s-num">${String(CHAP.indexOf(ch) + 1).padStart(2, "0")}</span><h2>${ch.titre}</h2><p>${ch.texte}</p><ul class="s-points">${ch.points.map(p => `<li><i>${COCHE}</i><span>${p}</span></li>`).join("")}</ul>${ch.essai ? `<p class="s-essai">${ch.essai}</p>` : ""}</div></div>`, fabriquer(ch, true));
}
function film() {
  const vertical = mq.matches;
  montrer(`<video class="s-film${vertical ? " vertical" : ""}" src="${vertical ? FILM.vertical : FILM.horizontal}" controls autoplay playsinline></video>`);
}
function fermer(parHistorique) {
  if (panneau.hidden) return;
  const v = contenu.querySelector("video"); if (v) v.pause();
  panneau.hidden = true; contenu.innerHTML = ""; document.body.classList.remove("fige");
  if (!parHistorique) history.back();
  if (retourFocus) retourFocus.focus({ preventScroll: true });
}
panneau.querySelector(".s-panneau__fermer").addEventListener("click", () => fermer());
panneau.addEventListener("click", e => { if (e.target === panneau) fermer(); });
addEventListener("popstate", () => fermer(true));
addEventListener("keydown", e => { if (e.key === "Escape") fermer(); });
document.addEventListener("click", e => {
  if (e.target.closest("[data-film]")) { film(); return; }
  const en = e.target.closest("[data-entrer]"); if (en) { entrer(en.dataset.entrer); return; }
  const ec = e.target.closest(".s-ecran:not(.dedans)"); if (ec) entrer(ec.dataset.cle);
  const hb = e.target.closest(".s-heure button[data-ciel]"); if (hb) appliquerHeure(hb.dataset.ciel);
});
document.addEventListener("keydown", e => { const ec = e.target.closest && e.target.closest(".s-ecran:not(.dedans)"); if (ec && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); entrer(ec.dataset.cle); } });

// Le chapitre au centre de l'écran donne son écran au téléphone
textes();
appliquerHeure(ciel);
// Le chapitre dont le titre et le texte sont le plus près du milieu de l'écran
let mesure = 0;
function suivre() {
  mesure = 0; if (mq.matches) return;
  const milieu = innerHeight / 2; let meilleur = null, ecart = Infinity;
  document.querySelectorAll(".s-chap").forEach(c => {
    const h = c.querySelector("h2").getBoundingClientRect(), p = c.querySelector(".s-points").getBoundingClientRect();
    const d = Math.abs((h.top + p.bottom) / 2 - milieu); if (d < ecart) { ecart = d; meilleur = c.dataset.cle; }
  });
  if (meilleur && meilleur !== actif) activer(meilleur);
}
addEventListener("scroll", () => { if (!mesure) mesure = requestAnimationFrame(suivre); }, { passive: true });
suivre();
mq.addEventListener("change", construire);
const ajusterZoom = () => document.documentElement.style.setProperty("--zt", Math.max(.5, Math.min(.8, (innerHeight - 110) / 812)).toFixed(3));
ajusterZoom(); addEventListener("resize", ajusterZoom, { passive: true });

// L'ouverture : une fois par visite, interrompue au moindre geste, absente si l'on a réduit les animations
const RESTE = { "la crèche": -1, "la préparation": 0, "les rendez-vous": 1 };
const MOTS = [["la crèche", 18, 22, "--surface"], ["la poussette", 36, 16, "--choix-bg"], ["la valise", 70, 18, "--tache-bg"], ["la maternité", 12, 34, "--repas-bg"],
  ["la chambre", 86, 30, "--surface"], ["la liste de naissance", 60, 30, "--sante-bg", 1], ["le prénom", 14, 64, "--sante-bg"], ["l'employeur", 22, 76, "--choix-bg", 1],
  ["la sage-femme", 42, 72, "--surface"], ["les échographies", 34, 84, "--repas-bg", 1], ["les congés", 80, 66, "--tache-bg"], ["le siège auto", 88, 78, "--rdv-bg", 1],
  ["la mutuelle", 54, 18, "--rdv-bg", 1], ["la préparation", 24, 46, "--choix-bg", 1], ["les rendez-vous", 82, 44, "--repas-bg", 1], ["la CAF", 60, 84, "--sante-bg"],
  ["le projet de naissance", 66, 74, "--surface", 1], ["le lit", 90, 90, "--surface", 1]];
const ouv = { minuteurs: [], actif: false };
// Sur la planche, l'ouverture se rejoue à chaque chargement ; sur le vrai site, une fois par visite (passer à true).
const UNE_FOIS_PAR_VISITE = false;
const reduitOuv = matchMedia("(prefers-reduced-motion: reduce)").matches;
function montrerTete() { const t = document.querySelector(".s-tete"); t.classList.add("immediat"); t.classList.remove("intro"); requestAnimationFrame(() => requestAnimationFrame(() => t.classList.remove("immediat"))); }
function finOuverture(garder) {
  ouv.minuteurs.forEach(clearTimeout); ouv.minuteurs = []; ouv.actif = false;
  document.getElementById("intro").hidden = true;
  const v = document.querySelector("#intro video.pv"); if (v) v.pause();
  if (garder !== true) document.querySelector(".s-tete").classList.remove("intro");
  ["pointerdown", "keydown", "wheel", "touchstart"].forEach(t => removeEventListener(t, finOuverture, true));
}
function ouverture(forcer) {
  let vue = false; try { vue = sessionStorage.getItem("tempo-ouverture") === "1"; sessionStorage.setItem("tempo-ouverture", "1"); } catch (e) {}
  if (reduitOuv || (vue && !forcer && UNE_FOIS_PAR_VISITE)) { montrerTete(); return; }
  finOuverture(true);
  const intro = document.getElementById("intro"), tete = document.querySelector(".s-tete");
  intro.querySelectorAll(".s-mot").forEach(m => m.remove());
  MOTS.forEach(([t, x, y, f, loin], k) => intro.insertAdjacentHTML("beforeend", `<span class="s-mot${loin ? " loin" : ""}${t in RESTE ? " reste" : ""}" style="--rx:${RESTE[t] || 0};--x:${x}%;--y:${y}%;--fond:var(${f});--r:${((k * 37) % 11) - 5}deg;--d:${(k * .07).toFixed(2)}s;--d2:${(((k * 5) % 9) * .03).toFixed(2)}s">${t}</span>`));
  intro.className = "s-intro"; intro.hidden = false; tete.classList.add("intro"); ouv.actif = true;
  const plus = (ms, fn) => ouv.minuteurs.push(setTimeout(fn, ms));
  requestAnimationFrame(() => requestAnimationFrame(() => intro.classList.add("t1")));
  // La lampe de Mezzo quand il la lève (pose 2) : c'est là que filent les étiquettes
  const viser = () => { const im = intro.querySelector(".s-intro__mezzo .p2"), ri = intro.getBoundingClientRect(); const rm = im.getBoundingClientRect();
    const x = Math.round(rm.left + rm.width * .122 - ri.left), y = Math.round(rm.top + rm.height * .27 - ri.top);
    intro.style.setProperty("--lx", x + "px"); intro.style.setProperty("--ly", y + "px");
    const l = intro.querySelector(".s-intro__lueur"); l.style.left = x + "px"; l.style.top = y + "px"; };
  // Avec la vidéo (Chrome, Firefox) : Mezzo lève la lampe vers 1,7 s, salue vers 4,4 s ; sinon les trois poses
  const vid = intro.querySelector("video.pv"), VITESSE = 1.2;
  const safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  const viserVideo = () => { const ri = intro.getBoundingClientRect(), rv = vid.getBoundingClientRect();
    intro.style.setProperty("--lx", Math.round(rv.left + rv.width * .26 - ri.left) + "px"); intro.style.setProperty("--ly", Math.round(rv.top + rv.height * .35 - ri.top) + "px"); };
  const fin = ms => { plus(ms, () => intro.classList.add("t4", "m4")); plus(ms + 150, () => tete.classList.remove("intro")); plus(ms + 1150, finOuverture); };
  plus(650, () => intro.classList.add("t2"));
  plus(1900, () => {
    if (vid && !safari && vid.readyState >= 2 && !vid.error) {
      intro.classList.add("video", "m1"); vid.currentTime = 0; vid.playbackRate = VITESSE; vid.play().catch(() => {});
      plus(1700 / VITESSE, () => { viserVideo(); intro.classList.add("t3"); });
      fin(4400 / VITESSE);
    } else {
      intro.classList.add("m1");
      plus(650, () => { viser(); intro.classList.add("m2"); });
      plus(800, () => intro.classList.add("t3"));
      plus(1800, () => intro.classList.add("m3"));
      fin(2500);
    }
  });
  setTimeout(() => ["pointerdown", "keydown", "wheel", "touchstart"].forEach(t => addEventListener(t, finOuverture, { capture: true, once: true })), 120);
}
document.addEventListener("click", e => { if (e.target.closest("[data-ouverture]")) { scrollTo(0, 0); setTimeout(() => ouverture(true), 150); } });
ouverture();
addEventListener("scroll", () => document.getElementById("barre").classList.toggle("colle", scrollY > 40), { passive: true });
