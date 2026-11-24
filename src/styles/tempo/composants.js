/* Tempo : les fonctions des composants du socle. Sans dépendance. Lots 1 et 2 validés par Hugo le 12/11/2026.
   Tempo.icone(nom, taille, trait) · Tempo.illustration(nom, taille) · Tempo.anneauTerme(sa, options)
   Tempo.exemples(barre, liste) : les exemples s'écrivent dans la barre de question.
   D'eux-mêmes : les cases .cocher se cochent (la ligne prend « faite ») ; une .option se choisit (une seule par .options,
   plusieurs si .options.plusieurs) ; un onglet de .onglets ou de .bascule s'active ; un .bandeau__fermer replie son bandeau. */
(function () {
  "use strict";
  // Pictogrammes au trait : 24 × 24, trait 1,85, bouts ronds.
  const IC = {
    cal: '<rect x="4.5" y="5.5" width="15" height="14" rx="3.5"/><path d="M4.5 10h15M9 3.5v3.5M15 3.5v3.5"/>',
    sac: '<path d="M5.5 8.5h13l-1 11.5h-11z"/><path d="M9 8.5V7a3 3 0 0 1 6 0v1.5"/>',
    panneau: '<path d="M12 20.5v-8.5M12 6.5V3.5"/><path d="M6.5 6.5h10l2.5 2.75-2.5 2.75h-10z"/>',
    coche: '<path d="m7 12.4 3.2 3.2L17 8.8"/>',
    chevron: '<path d="m9.5 6 6 6-6 6"/>',
    haut: '<path d="M12 18.5v-13M6.5 11 12 5.5l5.5 5.5"/>',
    micro: '<rect x="9" y="3.5" width="6" height="11" rx="3"/><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v2.5"/>',
    stop: '<rect x="7.5" y="7.5" width="9" height="9" rx="2" fill="currentColor" stroke="none"/>',
    plus: '<path d="M12 6v12M6 12h12"/>',
    croix: '<path d="M7 7l10 10M17 7 7 17"/>',
    tel: '<path d="M6.6 4.5h2.6l1.4 3.6-1.8 1.2a9.5 9.5 0 0 0 5.9 5.9l1.2-1.8 3.6 1.4v2.6a1.8 1.8 0 0 1-1.9 1.8A14.5 14.5 0 0 1 4.8 6.4a1.8 1.8 0 0 1 1.8-1.9z"/>',
    cloche: '<path d="M6.5 16.5V11a5.5 5.5 0 0 1 11 0v5.5l1.5 2h-14z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>',
    doc: '<path d="M7 3.5h7l4 4v13H7z"/><path d="M14 3.5v4h4M9.5 12.5h6M9.5 16h6"/>',
    horsligne: '<path d="M4 9a12 12 0 0 1 4-2.3M11.5 6a12 12 0 0 1 8.5 3M7 12.5a7.5 7.5 0 0 1 3-1.6M14.5 11.2a7.5 7.5 0 0 1 2.5 1.3M10.2 16a2.6 2.6 0 0 1 3.6 0M4 4l16 16"/>',
    etoile: '<path d="m12 4.5 2.2 4.6 5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5L4.8 9.8l5-.7z"/>',
    info: '<circle cx="12" cy="12" r="8"/><path d="M12 11v5M12 8h.01"/>',
    remplir: '<path d="M17 17 7 7M7 15V7h8"/>',
    horloge: '<circle cx="12" cy="12" r="7.5"/><path d="M12 8v4.2l2.6 1.6"/>',
    lune: '<path d="M19 14.5A7.5 7.5 0 0 1 9.5 5a7.5 7.5 0 1 0 9.5 9.5z"/>',
    soleil: '<circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4"/>',
    coeur: '<path d="M12 19.5s-7-4.3-7-9.6A3.9 3.9 0 0 1 12 7.6a3.9 3.9 0 0 1 7 2.3c0 5.3-7 9.6-7 9.6z"/>',
    gens: '<circle cx="9" cy="8.5" r="3"/><path d="M3.8 19a5.2 5.2 0 0 1 10.4 0"/><circle cx="16.8" cy="9.5" r="2.4"/><path d="M16 14.3a4.3 4.3 0 0 1 4.6 4.7"/>',
    maison: '<path d="M4.5 11 12 4.8l7.5 6.2V19a1.5 1.5 0 0 1-1.5 1.5h-3.5v-5.5h-5v5.5H6A1.5 1.5 0 0 1 4.5 19z"/>',
    bouclier: '<path d="M12 3.5 5.5 6v5.5c0 4 2.8 7.4 6.5 8.5 3.7-1.1 6.5-4.5 6.5-8.5V6z"/>',
    goutte: '<path d="M12 3.8s-5.5 6-5.5 10a5.5 5.5 0 0 0 11 0c0-4-5.5-10-5.5-10z"/>',
    plustard: '<circle cx="12" cy="12" r="7.5"/><path d="M12 8v4.2l2.6 1.6"/><path d="M19.5 4.5v3h-3"/>',
    cadeau: '<rect x="4.5" y="9" width="15" height="11.5" rx="2"/><path d="M3.5 9h17v3.5h-17zM12 9v11.5"/><path d="M12 9c-1.5-3.5-5.5-4-5.5-1.5S10 9 12 9zM12 9c1.5-3.5 5.5-4 5.5-1.5S14 9 12 9z"/>',
    biberon: '<path d="M10 3.5h4M10.5 3.5v3l-2 2.5v10a1.5 1.5 0 0 0 1.5 1.5h4a1.5 1.5 0 0 0 1.5-1.5V9l-2-2.5v-3"/><path d="M8.5 13h7"/>'
  };
  const icone = (n, s = 20, w = 1.85) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IC[n] || ""}</svg>`;

  // Illustrations de la semaine, en couleurs fixes, dessinées sur 64 × 64.
  const IL = {
    mais: '<path d="M34 8c8 6 10 22 6 36-2 8-6 12-8 12s-6-4-8-12c-4-14-2-30 10-36z" fill="#f2c45a"/><g fill="#e0a636"><circle cx="30" cy="20" r="2.4"/><circle cx="36" cy="20" r="2.4"/><circle cx="28" cy="27" r="2.4"/><circle cx="34" cy="27" r="2.4"/><circle cx="40" cy="27" r="2.4"/><circle cx="29" cy="34" r="2.4"/><circle cx="35" cy="34" r="2.4"/><circle cx="31" cy="41" r="2.4"/><circle cx="37" cy="41" r="2.4"/></g><path d="M32 58c-10-6-16-18-14-30 6 8 10 18 14 30zM34 58c10-6 14-16 12-26-6 8-9 16-12 26z" fill="#8fb36a"/>',
    pasteque: '<circle cx="32" cy="34" r="22" fill="#5f9a4f"/><path d="M32 12c-6 7-8 14-8 22s2 15 8 22M32 12c6 7 8 14 8 22s-2 15-8 22M18 17c-3 6-4 11-4 17s1 11 4 17M46 17c3 6 4 11 4 17s-1 11-4 17" stroke="#3f7a3a" stroke-width="3" fill="none"/><path d="M30 12c1-3 3-5 6-6" stroke="#6d5a3a" stroke-width="2.5" fill="none" stroke-linecap="round"/>',
    // Les modes de garde, en deux tons qui suivent le jour et la nuit (--ill-a, --ill-b, --ill-c, --ill-d).
    creche: '<rect x="12" y="26" width="40" height="28" rx="5" fill="var(--ill-a)"/><path d="M8 28 32 12l24 16" fill="none" stroke="var(--ill-b)" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/><rect x="26" y="38" width="12" height="16" rx="6" fill="var(--ill-b)"/><circle cx="20" cy="36" r="3" fill="var(--ill-d)"/><circle cx="44" cy="36" r="3" fill="var(--ill-d)"/>',
    parentale: '<path d="M10 52V30l22-16 22 16v22z" fill="var(--ill-a)"/><circle cx="25" cy="36" r="5" fill="var(--ill-b)"/><circle cx="39" cy="36" r="5" fill="var(--ill-b)"/><path d="M17 52a8 8 0 0 1 16 0M31 52a8 8 0 0 1 16 0" fill="var(--ill-c)"/>',
    micro: '<path d="M16 54V34l16-12 16 12v20z" fill="var(--ill-a)"/><rect x="27" y="40" width="10" height="14" rx="5" fill="var(--ill-b)"/><path d="m46 8 2.6 5.4 5.9.8-4.3 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8-4.3-4.1 5.9-.8z" fill="var(--ill-b)"/>',
    assmat: '<path d="M10 54V30l22-16 22 16v24z" fill="var(--ill-a)"/><path d="M32 49s-10-6-10-13a5.5 5.5 0 0 1 10-3 5.5 5.5 0 0 1 10 3c0 7-10 13-10 13z" fill="var(--ill-b)"/>',
    domicile: '<rect x="10" y="34" width="44" height="18" rx="7" fill="var(--ill-a)"/><rect x="14" y="24" width="36" height="16" rx="7" fill="var(--ill-a)" opacity=".7"/><circle cx="32" cy="18" r="6" fill="var(--ill-b)"/><rect x="24" y="38" width="16" height="8" rx="4" fill="var(--ill-b)"/>',
    // Les objets du Matériel et de la liste de naissance, en deux tons, validés par Hugo le 13/11/2026.
    poussette: '<path d="M10 30h34a17 17 0 0 1-17 17 17 17 0 0 1-17-17z" fill="var(--ill-a)"/><path d="M10 30A17 17 0 0 1 27 13v17z" fill="var(--ill-b)"/><path d="M44 30l9-15h4" fill="none" stroke="var(--ill-c)" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M19 45l-3 7M37 45l3 7" stroke="var(--ill-c)" stroke-width="3" stroke-linecap="round"/><circle cx="16" cy="54" r="5" fill="var(--ill-c)"/><circle cx="41" cy="54" r="5" fill="var(--ill-c)"/><circle cx="16" cy="54" r="1.8" fill="var(--ill-d)"/><circle cx="41" cy="54" r="1.8" fill="var(--ill-d)"/>',
    cosy: '<path d="M9 36a23 23 0 0 1 46 0" fill="none" stroke="var(--ill-c)" stroke-width="3.6" stroke-linecap="round"/><path d="M14 30c0-8 5-12 12-12h6c10 0 17 8 18 18l1 7c1 6-3 10-9 10H21c-5 0-8-4-8-9z" fill="var(--ill-a)"/><path d="M22 32c0-4 3-7 7-7h3c6 0 10 5 10 11v4H22z" fill="var(--ill-b)"/><rect x="12" y="51" width="40" height="5" rx="2.5" fill="var(--ill-c)"/>',
    livre: '<path d="M8 17c8-3 16-2 24 3v30c-8-5-16-6-24-3z" fill="var(--ill-d)" stroke="var(--ill-c)" stroke-width="2" stroke-linejoin="round"/><path d="M56 17c-8-3-16-2-24 3v30c8-5 16-6 24-3z" fill="var(--ill-d)" stroke="var(--ill-c)" stroke-width="2" stroke-linejoin="round"/><circle cx="20" cy="31" r="6" fill="var(--ill-c)"/><circle cx="20" cy="31" r="2.6" fill="var(--ill-d)"/><path d="M38 26l12-2M38 32l12-2M38 38l12-2" stroke="var(--ill-c)" stroke-width="3" stroke-linecap="round"/>',
    cododo: '<rect x="9" y="22" width="46" height="22" rx="5" fill="var(--ill-a)"/><rect x="13" y="26" width="38" height="8" rx="3" fill="var(--ill-d)"/><path d="M18 34v8M25 34v8M32 34v8M39 34v8M46 34v8" stroke="var(--ill-b)" stroke-width="2.6" stroke-linecap="round"/><path d="M14 44v10M50 44v10M10 54h8M46 54h8" stroke="var(--ill-c)" stroke-width="3" stroke-linecap="round"/>',
    gigoteuse: '<path d="M23 9h18l5 11v29a7 7 0 0 1-7 7H25a7 7 0 0 1-7-7V20z" fill="var(--ill-b)"/><path d="M23 9c2 5 16 5 18 0" fill="var(--ill-d)"/><path d="M32 18v32" stroke="var(--ill-d)" stroke-width="2" stroke-linecap="round" stroke-dasharray="3 3"/><circle cx="26" cy="38" r="2.5" fill="var(--ill-a)"/><circle cx="38" cy="30" r="2.5" fill="var(--ill-a)"/><circle cx="37" cy="45" r="2.5" fill="var(--ill-a)"/>',
    echarpe: '<path d="M14 14c8 22 28 22 36 0" fill="none" stroke="var(--ill-b)" stroke-width="9" stroke-linecap="round"/><path d="M18 50c7-14 21-14 28 0" fill="none" stroke="var(--ill-a)" stroke-width="9" stroke-linecap="round"/><circle cx="32" cy="33" r="7" fill="var(--ill-c)"/>',
    transat: '<path d="M8 52c15 6 33 6 48 0" fill="none" stroke="var(--ill-c)" stroke-width="3.6" stroke-linecap="round"/><path d="M14 46 28 24c3-4 9-5 13-1l13 23z" fill="var(--ill-a)"/><path d="M14 22a18 18 0 0 1 36 0" fill="none" stroke="var(--ill-b)" stroke-width="3" stroke-linecap="round"/><path d="M24 15v6M40 15v6" stroke="var(--ill-b)" stroke-width="2" stroke-linecap="round"/><circle cx="24" cy="24" r="3" fill="var(--ill-c)"/><circle cx="40" cy="24" r="3" fill="var(--ill-c)"/>',
    baignoire: '<path d="M7 30h50v4a16 16 0 0 1-16 16H23A16 16 0 0 1 7 34z" fill="var(--ill-a)"/><rect x="5" y="26" width="54" height="6" rx="3" fill="var(--ill-b)"/><circle cx="22" cy="20" r="4" fill="var(--ill-d)" stroke="var(--ill-b)" stroke-width="1.6"/><circle cx="31" cy="15" r="2.6" fill="var(--ill-d)" stroke="var(--ill-b)" stroke-width="1.4"/><circle cx="38" cy="21" r="3.2" fill="var(--ill-d)" stroke="var(--ill-b)" stroke-width="1.5"/><path d="M18 50l-3 6M46 50l3 6" stroke="var(--ill-c)" stroke-width="3" stroke-linecap="round"/>',
    cadeau: '<rect x="12" y="26" width="40" height="30" rx="5" fill="var(--ill-a)"/><rect x="9" y="20" width="46" height="10" rx="4" fill="var(--ill-b)"/><rect x="29" y="20" width="6" height="36" fill="var(--ill-c)"/><path d="M32 20c-3-8-14-10-14-4s10 4 14 4zM32 20c3-8 14-10 14-4s-10 4-14 4z" fill="var(--ill-c)"/>',
    mobile: '<path d="M14 18h36" stroke="var(--ill-c)" stroke-width="2.6" stroke-linecap="round"/><path d="M32 6v12M18 18v12M32 18v18M46 18v10" stroke="var(--ill-c)" stroke-width="1.6"/><path d="m18 30 2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.2-4.1 5.8-.8z" fill="var(--ill-a)"/><path d="M38 42a8 8 0 1 0 8-12 6.5 6.5 0 0 1-8 12z" fill="var(--ill-b)" transform="translate(-8 4)"/><path d="M40 36a5 5 0 0 1 10 0 4 4 0 0 1 0 8H40a4 4 0 0 1 0-8z" fill="var(--ill-d)" stroke="var(--ill-b)" stroke-width="1.6" transform="translate(2 -6)"/>',
    chassis: '<path d="M14 38h34l8-22h4" fill="none" stroke="var(--ill-c)" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M22 38l-5 12M42 38l4 12" stroke="var(--ill-c)" stroke-width="3" stroke-linecap="round"/><circle cx="16" cy="53" r="5" fill="var(--ill-c)"/><circle cx="47" cy="53" r="5" fill="var(--ill-c)"/><circle cx="16" cy="53" r="1.8" fill="var(--ill-d)"/><circle cx="47" cy="53" r="1.8" fill="var(--ill-d)"/>',
    nacelle: '<path d="M8 30h46a20 18 0 0 1-20 18h-6A20 18 0 0 1 8 30z" fill="var(--ill-a)"/><path d="M8 30a20 20 0 0 1 22-18v18z" fill="var(--ill-b)"/><path d="M34 22h18" stroke="var(--ill-c)" stroke-width="3" stroke-linecap="round"/>',
    matelas: '<path d="M8 30l10-10h38l-10 10z" fill="var(--ill-d)" stroke="var(--ill-b)" stroke-width="2" stroke-linejoin="round"/><path d="M8 30h38v12H8z" fill="var(--ill-a)"/><path d="M46 30l10-10v12l-10 10z" fill="var(--ill-b)"/><path d="M14 36h4M24 36h4M34 36h4" stroke="var(--ill-d)" stroke-width="2.4" stroke-linecap="round"/>',
    nidange: '<path d="M20 22a12 12 0 0 1 24 0v28a8 8 0 0 1-8 8h-8a8 8 0 0 1-8-8z" fill="var(--ill-a)"/><path d="M20 22a12 12 0 0 1 24 0c0 4-5 7-12 7s-12-3-12-7z" fill="var(--ill-b)"/><circle cx="32" cy="21" r="5.5" fill="var(--ill-d)"/><path d="M32 32v22" stroke="var(--ill-c)" stroke-width="2" stroke-linecap="round" stroke-dasharray="3 3"/>',
    langer: '<rect x="8" y="26" width="48" height="16" rx="8" fill="var(--ill-a)"/><path d="M14 26v-2a6 6 0 0 1 6-6h24a6 6 0 0 1 6 6v2" fill="none" stroke="var(--ill-b)" stroke-width="4"/><path d="M12 42v10M52 42v10" stroke="var(--ill-c)" stroke-width="3" stroke-linecap="round"/>',
    thermo: '<rect x="26" y="8" width="12" height="36" rx="6" fill="var(--ill-d)" stroke="var(--ill-c)" stroke-width="2.4"/><circle cx="32" cy="48" r="9" fill="var(--ill-b)"/><rect x="30" y="20" width="4" height="26" rx="2" fill="var(--ill-b)"/><path d="M40 16h4M40 24h4M40 32h4" stroke="var(--ill-c)" stroke-width="2" stroke-linecap="round"/>',
    bodies: '<path d="M22 12h20l10 8-5 8-5-3v22l-6 6h-8l-6-6V25l-5 3-5-8z" fill="var(--ill-a)"/><path d="M26 12c1 4 11 4 12 0" fill="var(--ill-d)"/><circle cx="29" cy="49" r="1.5" fill="var(--ill-c)"/><circle cx="35" cy="49" r="1.5" fill="var(--ill-c)"/>',
    biberon: '<rect x="22" y="22" width="20" height="34" rx="6" fill="var(--ill-d)" stroke="var(--ill-c)" stroke-width="2.4"/><path d="M24 22l3-6h10l3 6z" fill="var(--ill-b)"/><path d="M29 16c0-6 6-6 6 0" fill="var(--ill-a)"/><path d="M24 40h16v10a6 6 0 0 1-6 6h-4a6 6 0 0 1-6-6z" fill="var(--ill-a)"/><path d="M36 30h4M36 36h4" stroke="var(--ill-c)" stroke-width="2" stroke-linecap="round"/>',
    tirelait: '<path d="M18 14a10 10 0 0 1 20 0z" fill="var(--ill-b)"/><rect x="24" y="14" width="8" height="10" fill="var(--ill-c)"/><rect x="20" y="24" width="16" height="30" rx="5" fill="var(--ill-d)" stroke="var(--ill-c)" stroke-width="2.2"/><rect x="40" y="30" width="14" height="20" rx="4" fill="var(--ill-a)"/><path d="M36 38h4" stroke="var(--ill-c)" stroke-width="2.4"/>',
    bebe: '<circle cx="32" cy="34" r="20" fill="#f3cfae"/><path d="M22 18c4-6 16-7 20 0" fill="none" stroke="#c98a5a" stroke-width="3" stroke-linecap="round"/><path d="M24 34c1.5 2 4.5 2 6 0M34 34c1.5 2 4.5 2 6 0" fill="none" stroke="#5a3a28" stroke-width="2.2" stroke-linecap="round"/><circle cx="23" cy="40" r="3" fill="#ec9f95" opacity=".7"/><circle cx="41" cy="40" r="3" fill="#ec9f95" opacity=".7"/><path d="M29 44c2 1.5 4 1.5 6 0" fill="none" stroke="#5a3a28" stroke-width="2" stroke-linecap="round"/>'
  };
  const illustration = (n, s = 48) => `<svg width="${s}" height="${s}" viewBox="0 0 64 64" aria-hidden="true">${IL[n] || ""}</svg>`;

  // L'anneau du terme : un arc par trimestre (14, 28, 41 semaines d'aménorrhée), rempli jusqu'à la semaine en cours.
  function arc(c, r, a, b) {
    const P = f => { const t = f * 2 * Math.PI; return [c + r * Math.sin(t), c - r * Math.cos(t)]; };
    const [x1, y1] = P(a), [x2, y2] = P(b);
    return `M${x1.toFixed(2)} ${y1.toFixed(2)}A${r} ${r} 0 ${b - a > 0.5 ? 1 : 0} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`;
  }
  function anneauTerme(sa, o) {
    o = o || {};
    const t = o.taille || 92, w = o.trait || 6, c = t / 2, r = c - w / 2 - 1, f = Math.min(1, Math.max(0, sa / 41)), g = 0.016;
    const SEG = [[0, 14 / 41], [14 / 41, 28 / 41], [28 / 41, 1]];
    let svg = "";
    SEG.forEach(([a, b], i) => {
      svg += `<path class="piste" d="${arc(c, r, a + g, b - g)}"/>`;
      if (f > a + g) svg += `<path class="plein s${i + 1}" pathLength="1" d="${arc(c, r, a + g, Math.min(f, b - g))}"/>`;
    });
    if (f < 1) { const tt = f * 2 * Math.PI; svg += `<circle class="repere" cx="${(c + r * Math.sin(tt)).toFixed(2)}" cy="${(c - r * Math.cos(tt)).toFixed(2)}" r="${w * 0.72}"/>`; }
    return `<span class="anneau-terme" style="width:${t}px;height:${t}px" role="img" aria-label="${o.label || sa + " semaines sur 41"}"><svg viewBox="0 0 ${t} ${t}" fill="none" stroke-width="${w}" stroke-linecap="round">${svg}</svg>${o.centre ? `<span class="anneau-terme__centre">${o.centre}</span>` : ""}</span>`;
  }

  // Les exemples s'écrivent, s'effacent, puis le suivant.
  function exemples(barre, liste) {
    const tx = barre.querySelector(".question__texte"); if (!tx || !liste.length) return;
    if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) { tx.textContent = liste[0]; return; }
    let i = 0, j = 0, sens = 1;
    const cur = '<span class="question__curseur" aria-hidden="true"></span>';
    (function pas() {
      const m = liste[i];
      j += sens; tx.innerHTML = m.slice(0, j) + cur;
      let d = sens > 0 ? 55 + Math.random() * 45 : 22;
      if (sens > 0 && j >= m.length) { sens = -1; d = 1900; }
      else if (sens < 0 && j <= 0) { sens = 1; i = (i + 1) % liste.length; d = 380; }
      setTimeout(pas, d);
    })();
  }

  // Les cases à cocher des lignes.
  document.addEventListener("click", e => {
    const b = e.target.closest(".cocher"); if (!b) return;
    e.stopPropagation();
    const l = b.closest(".ligne"); if (!l) return;
    const on = !l.classList.contains("faite");
    l.classList.toggle("faite", on); b.setAttribute("aria-checked", on);
    if (on) b.classList.remove("en-cours");
    if (navigator.vibrate) try { navigator.vibrate(8); } catch (x) {}
  });

  // Liste de choix, onglets, bascule, bandeau.
  document.addEventListener("click", e => {
    const o = e.target.closest(".option");
    if (o && o.getAttribute("aria-disabled") !== "true") {
      const g = o.closest(".options");
      if (g && g.classList.contains("plusieurs")) o.setAttribute("aria-checked", o.getAttribute("aria-checked") !== "true");
      else { (g ? g.querySelectorAll(".option") : [o]).forEach(x => x.setAttribute("aria-checked", x === o)); }
      o.dispatchEvent(new CustomEvent("tempo:choix", { bubbles: true }));
      return;
    }
    const t = e.target.closest(".onglets button");
    if (t) { t.parentElement.querySelectorAll("button").forEach(x => x.setAttribute("aria-selected", x === t)); return; }
    const b = e.target.closest(".bascule button");
    if (b) { const bs = [...b.parentElement.querySelectorAll("button")]; bs.forEach(x => x.setAttribute("aria-pressed", x === b)); b.parentElement.style.setProperty("--i", bs.indexOf(b)); return; }
    const f = e.target.closest(".bandeau__fermer");
    if (f) { const d = f.closest(".bandeau"); if (d) d.classList.add("ferme"); }
  });

  // Choisir une date (section 21) : la roue, à la manière d'Amma (Hugo, 16/11 ; remplace le calendrier du 13/11).
  // Remplace un champ de date (ou de mois) par trois colonnes, jour, mois, année ; la ligne du milieu est choisie.
  // options : min, max (AAAA-MM-JJ), aujourdhui (Date), ecart (fonction Date -> ce que la date veut dire, sous la roue).
  // La roue a toujours une valeur : sans date, elle part d'aujourd'hui (ramené dans les bornes).
  const choixDate = (input, o) => {
    if (!input || input.dataset.choix) return; o = o || {};
    const H = 40, mois = input.type === "month";
    const MOIS = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
    const JOURS = ["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"];
    const iso = d => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
    const lit = v => { const m = /^(\d{4})-(\d{2})(?:-(\d{2}))?$/.exec(v || ""); return m ? new Date(+m[1], +m[2] - 1, m[3] ? +m[3] : 1) : null; };
    const auj = o.aujourdhui ? new Date(o.aujourdhui.getFullYear(), o.aujourdhui.getMonth(), o.aujourdhui.getDate()) : (() => { const d = new Date(); return new Date(d.getFullYear(), d.getMonth(), d.getDate()); })();
    const ajout = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
    const min = lit(o.min || input.min) || ajout(auj, -365), max = lit(o.max || input.max) || ajout(auj, mois ? 1095 : 365);
    const ecartDefaut = d => { const n = Math.round((d - auj) / 864e5), a = Math.abs(n), t = a < 14 ? a + " jour" + (a > 1 ? "s" : "") : Math.round(a / 7) + " semaines";
      return n === 0 ? "aujourd'hui" : n === 1 ? "demain" : n === -1 ? "hier" : n > 0 ? "dans " + t : "il y a " + t; };
    const cap = t => t ? t.charAt(0).toUpperCase() + t.slice(1) : t;
    const ans = []; for (let y = min.getFullYear(); y <= max.getFullYear(); y++) ans.push(y);
    const borne = d => d < min ? min : d > max ? max : d, val = d => mois ? iso(d).slice(0, 7) : iso(d);
    const d0 = borne(lit(input.value) || auj);
    input.dataset.choix = "1"; input.type = "hidden"; input.value = val(d0);
    const col = (k, items, lab) => `<div class="roue__col" data-k="${k}" aria-label="${lab}" role="listbox" tabindex="0">${items.map((t, i) => `<div class="roue__it" data-i="${i}" role="option">${t}</div>`).join("")}</div>`;
    const b = document.createElement("div"); b.className = "roue-date";
    b.innerHTML = `<div class="roue${mois ? " roue--mois" : ""}"><div class="roue__bande" aria-hidden="true"></div>` + (mois ? "" : col("j", Array.from({ length: 31 }, (_, i) => i + 1), "Jour")) +
      col("m", MOIS, "Mois") + col("a", ans, "Année") + `</div><p class="roue__sens" aria-live="polite"></p>`;
    input.insertAdjacentElement("afterend", b);
    const cols = [...b.querySelectorAll(".roue__col")], cJ = mois ? null : cols[0], cM = cols[mois ? 0 : 1], cA = cols[mois ? 1 : 2];
    const ix = c => Math.max(0, Math.min(c.children.length - 1, Math.round(c.scrollTop / H)));
    const poser = (c, i, doux) => { if (doux) c.scrollTo({ top: i * H, behavior: "smooth" }); else c.scrollTop = i * H; };
    const placer = d => { if (cJ) poser(cJ, d.getDate() - 1); poser(cM, d.getMonth()); poser(cA, ans.indexOf(d.getFullYear())); };
    const maj = fin => {
      const y = ans[ix(cA)], m = ix(cM), jMax = new Date(y, m + 1, 0).getDate();
      let d = new Date(y, m, cJ ? Math.min(ix(cJ) + 1, jMax) : 1);
      if (fin) { d = borne(d); if (cJ && ix(cJ) !== d.getDate() - 1) poser(cJ, d.getDate() - 1, true); if (ix(cM) !== d.getMonth()) poser(cM, d.getMonth(), true); if (ans[ix(cA)] !== d.getFullYear()) poser(cA, ans.indexOf(d.getFullYear()), true); }
      const pos = (cJ ? [d.getDate() - 1] : []).concat([d.getMonth(), ans.indexOf(d.getFullYear())]);
      cols.forEach((c, k) => [...c.children].forEach((it, i) => { it.classList.toggle("on", i === pos[k]); it.classList.toggle("off", c === cJ && i >= jMax); }));
      const e = (o.ecart || (mois ? null : ecartDefaut));
      b.querySelector(".roue__sens").textContent = d < min || d > max ? "En dehors des dates possibles"
        : mois ? (e ? e(d) || "" : "") : cap([JOURS[d.getDay()], ((e(d) || "") + "").replace(/^./, x => x.toLowerCase())].filter(Boolean).join(" · "));
      if (fin && input.value !== val(d)) { input.value = val(d); input.dispatchEvent(new Event("input", { bubbles: true })); input.dispatchEvent(new Event("change", { bubbles: true })); }
    };
    cols.forEach(c => {
      let t; c.addEventListener("scroll", () => { clearTimeout(t); maj(false); t = setTimeout(() => maj(true), 150); }, { passive: true });
      c.addEventListener("click", e => { const it = e.target.closest(".roue__it"); if (it) poser(c, +it.dataset.i, true); });
      c.addEventListener("keydown", e => { if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return; e.preventDefault(); c.scrollTo({ top: c.scrollTop + (e.key === "ArrowDown" ? H : -H), behavior: "smooth" }); });
    });
    placer(d0); maj(false); requestAnimationFrame(() => { placer(d0); maj(false); });
    return b;
  };

  window.Tempo = { icone, illustration, anneauTerme, exemples, choixDate };
})();
