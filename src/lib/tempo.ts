// Icônes et illustrations du design system de Tempo, rendues au build.
// Source : src/styles/tempo/composants.js (copie du dépôt tempo-design-system,
// à ne pas retoucher). On l'exécute dans un bac à sable Node avec un faux
// `window` pour récupérer Tempo.icone() et Tempo.illustration() côté serveur.
import vm from 'node:vm';
import src from '../styles/tempo/composants.js?raw';
const bac: any = { window: {}, document: { addEventListener() {} }, matchMedia: () => ({ matches: false }) };
vm.runInNewContext(src, bac);
const T = bac.window.Tempo;

export const icone = (nom: string, taille = 18, trait = 2): string => T.icone(nom, taille, trait);
export const illustration = (nom: string, taille = 96): string => T.illustration(nom, taille);
