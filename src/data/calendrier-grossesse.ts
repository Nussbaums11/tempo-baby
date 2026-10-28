// Étapes du calendrier de grossesse (page mère du cocon « futurs parents »,
// /calendrier-grossesse/). Une seule source : le rendu statique de la page
// (lisible par Google sans JavaScript) et le calculateur côté client.
//
// Règle posée par Sandra le 28/10/2026 : une étape datée n'apparaît que si
// une source officielle la date (service-public, Ameli, santé.fr). Ce qui
// n'a pas de date officielle (maternité, garde, valise…) est marqué
// `repere` : un repère de parents, jamais présenté comme une obligation.
//
// Unités : jours depuis le 1er jour des dernières règles (DDR).
// Correspondance mois de grossesse ↔ SA : table de santé.fr
// (3e mois = 11 à 15 SA, 4e = 16-19, 5e = 20-24, 6e = 25-28,
// 7e = 29-32, 8e = 33-36, 9e = 37-41).
// Les étapes `fromTerm` se placent par rapport à la date présumée
// d'accouchement (jours avant le terme, négatif = avant).

export const TERM_DAYS = 41 * 7; // date présumée d'accouchement à 41 SA

export const sa = (weeks: number, days = 0) => weeks * 7 + days;

export interface Source {
  label: string;
  url: string;
}

export interface Step {
  id: string;
  title: string;
  text: string;
  kind: 'officiel' | 'repere';
  /** Fenêtre en jours depuis la DDR. */
  from?: number;
  to?: number;
  /** Fenêtre en jours par rapport au terme (négatif = avant). */
  fromTerm?: number;
  toTerm?: number;
  /** Afficher « à partir du … » (l'étape n'a pas de fin utile). */
  since?: boolean;
  /** Afficher « au plus tard le … » au lieu d'une fenêtre. */
  deadline?: boolean;
  /** Libellé de période affiché sans calcul (rendu statique). */
  when: string;
  source?: Source;
}

export interface Phase {
  id: string;
  title: string;
  steps: Step[];
}

const SP_EXAMENS: Source = {
  label: 'service-public.gouv.fr, examens prénataux',
  url: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F963',
};
const AMELI_GROSSESSE: Source = {
  label: 'ameli.fr, grossesse : droits et démarches',
  url: 'https://www.ameli.fr/assure/droits-demarches/famille/maternite-paternite-adoption/grossesse',
};
const AMELI_ECHO: Source = {
  label: 'ameli.fr, suivi de grossesse',
  url: 'https://www.ameli.fr/assure/sante/devenir-parent/grossesse/grossesse-en-bonne-sante/grossesse/grossesse-soins-dentaires-dentiste-consultation',
};
const SP_CONGE_MAT: Source = {
  label: 'service-public.gouv.fr, congé maternité',
  url: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F2265',
};
const AMELI_PATERNITE: Source = {
  label: 'ameli.fr, congé de paternité',
  url: 'https://www.ameli.fr/assure/droits-demarches/famille/maternite-paternite-adoption/conge-paternite-accueil-enfant',
};

export const phases: Phase[] = [
  {
    id: 'debut',
    title: 'Le début : jusqu’à la fin du 3e mois (15 SA)',
    steps: [
      {
        id: 'consultation-1',
        deadline: true,
        title: 'Première consultation et déclaration de grossesse',
        text: 'Examen complet, prises de sang de dépistage (toxoplasmose, rubéole, groupe sanguin…) et déclaration de grossesse, à envoyer à l’Assurance maladie et à la CAF.',
        kind: 'officiel',
        from: 0,
        to: sa(15, 6),
        when: 'Avant la fin du 3e mois',
        source: AMELI_GROSSESSE,
      },
      {
        id: 'epp',
        deadline: true,
        title: 'Entretien prénatal précoce',
        text: 'Un temps d’échange avec une sage-femme ou un médecin, après la déclaration de grossesse, pour parler de vos besoins et de vos questions.',
        kind: 'officiel',
        from: 0,
        to: sa(15, 6),
        when: 'Avant la fin du 3e mois',
        source: SP_EXAMENS,
      },
      {
        id: 'echo-t1',
        title: 'Échographie du 1er trimestre',
        text: 'Dite « de datation » : elle date précisément le début de la grossesse, et c’est elle qui fixe votre terme.',
        kind: 'officiel',
        from: sa(11),
        to: sa(13, 6),
        when: 'Entre 11 SA et 13 SA + 6 jours',
        source: AMELI_ECHO,
      },
      {
        id: 'maternite',
        title: 'Choisir et réserver sa maternité',
        text: 'Dans les grandes villes, les places partent vite : beaucoup de parents s’inscrivent dès la grossesse confirmée.',
        kind: 'repere',
        from: sa(5),
        to: sa(15, 6),
        when: 'Dès la grossesse confirmée',
      },
    ],
  },
  {
    id: 'milieu',
    title: 'Du 4e au 6e mois (16 à 28 SA)',
    steps: [
      {
        id: 'consultations-4-6',
        title: 'Consultations prénatales du 4e, 5e et 6e mois',
        text: 'Une consultation par mois, avec une prise de sang au 5e et au 6e mois.',
        kind: 'officiel',
        from: sa(16),
        to: sa(28, 6),
        when: 'Une par mois',
        source: SP_EXAMENS,
      },
      {
        id: 'dentaire',
        since: true,
        title: 'Examen bucco-dentaire',
        text: 'Un examen de prévention chez le dentiste, pris en charge.',
        kind: 'officiel',
        from: sa(16),
        to: sa(28, 6),
        when: 'À partir du 4e mois',
        source: SP_EXAMENS,
      },
      {
        id: 'garde',
        title: 'Réfléchir au mode de garde',
        text: 'Crèche, assistante maternelle, nounou : les délais varient beaucoup d’une ville à l’autre. Renseignez-vous tôt auprès de votre mairie ou du relais petite enfance.',
        kind: 'repere',
        from: sa(16),
        to: sa(28, 6),
        when: 'Au 2e trimestre',
      },
      {
        id: 'echo-t2',
        title: 'Échographie du 2e trimestre',
        text: 'Elle analyse la morphologie du bébé et vérifie sa croissance.',
        kind: 'officiel',
        from: sa(20),
        to: sa(24, 6),
        when: '5e mois (20 à 24 SA)',
        source: SP_EXAMENS,
      },
      {
        id: 'materiel',
        title: 'Faire le point sur le matériel et la liste de naissance',
        text: 'Ce qui est vraiment indispensable au début, ce qui peut attendre, ce que les proches peuvent offrir.',
        kind: 'repere',
        from: sa(20),
        to: sa(28, 6),
        when: '5e et 6e mois',
      },
      {
        id: 'cent-pour-cent',
        since: true,
        title: 'Prise en charge à 100 %',
        text: 'Tous vos frais médicaux remboursables sont pris en charge à 100 %, jusqu’au 12e jour après l’accouchement.',
        kind: 'officiel',
        from: sa(25),
        to: sa(28, 6),
        when: 'À partir du 6e mois',
        source: AMELI_GROSSESSE,
      },
    ],
  },
  {
    id: 'fin',
    title: 'Du 7e au 9e mois (29 à 41 SA)',
    steps: [
      {
        id: 'consultations-7-9',
        title: 'Consultations prénatales du 7e, 8e et 9e mois',
        text: 'Une consultation par mois jusqu’à l’accouchement.',
        kind: 'officiel',
        from: sa(29),
        to: TERM_DAYS,
        when: 'Une par mois',
        source: SP_EXAMENS,
      },
      {
        id: 'preparation',
        since: true,
        title: 'Séances de préparation à la naissance',
        text: 'Des séances avec une sage-femme pour préparer l’accouchement et l’arrivée de bébé, prises en charge à 100 %.',
        kind: 'officiel',
        from: sa(29),
        to: TERM_DAYS,
        when: 'À partir du 7e mois',
        source: SP_EXAMENS,
      },
      {
        id: 'echo-t3',
        title: 'Échographie du 3e trimestre',
        text: 'Elle vérifie la position du bébé et l’emplacement du placenta.',
        kind: 'officiel',
        from: sa(29),
        to: sa(32, 6),
        when: '7e mois (29 à 32 SA)',
        source: SP_EXAMENS,
      },
      {
        id: 'projet-naissance',
        title: 'Écrire son projet de naissance',
        text: 'Vos souhaits pour l’accouchement, à apporter aux consultations : ni un contrat, ni une obligation.',
        kind: 'repere',
        from: sa(29),
        to: sa(32, 6),
        when: 'Avant la consultation d’anesthésie',
      },
      {
        id: 'anesthesie',
        title: 'Consultation pré-anesthésique',
        text: 'Obligatoire, même si vous ne prévoyez pas de péridurale.',
        kind: 'officiel',
        from: sa(33),
        to: sa(36, 6),
        when: '8e mois (33 à 36 SA)',
        source: SP_EXAMENS,
      },
      {
        id: 'valise',
        title: 'Préparer la valise de maternité',
        text: 'Les papiers, le sac pour la salle de naissance, et de quoi tenir le séjour. La liste de votre maternité fait foi.',
        kind: 'repere',
        from: sa(33),
        to: sa(35, 6),
        when: '8e mois',
      },
      {
        id: 'conge-maternite',
        title: 'Congé maternité',
        text: '6 semaines avant le terme et 10 après pour un 1er ou un 2e enfant ; 8 et 18 à partir du 3e ; 12 et 22 pour des jumeaux. Jusqu’à 3 semaines peuvent être reportées après la naissance, sur avis médical.',
        kind: 'officiel',
        fromTerm: -42,
        toTerm: -42,
        when: 'À partir de 6 semaines avant le terme',
        source: SP_CONGE_MAT,
      },
      {
        id: 'conge-paternite-prevenir',
        deadline: true,
        title: 'Prévenir l’employeur du congé de paternité',
        text: 'Le second parent prévient son employeur au moins un mois avant le début du congé.',
        kind: 'officiel',
        fromTerm: -42,
        toTerm: -30,
        when: 'Au moins un mois avant',
        source: AMELI_PATERNITE,
      },
      {
        id: 'terme',
        title: 'Date présumée d’accouchement',
        text: 'Un repère, pas un rendez-vous : bébé arrive rarement pile à cette date.',
        kind: 'officiel',
        from: TERM_DAYS,
        to: TERM_DAYS,
        when: '41 SA',
      },
    ],
  },
  {
    id: 'apres',
    title: 'Après la naissance',
    steps: [
      {
        id: 'conge-paternite',
        title: 'Congé de paternité',
        text: '25 jours (32 pour des jumeaux), dont 4 obligatoires juste après les 3 jours de congé de naissance. Les 21 jours restants se prennent dans les 6 mois.',
        kind: 'officiel',
        fromTerm: 0,
        toTerm: 182,
        when: 'Dans les 6 mois',
        source: AMELI_PATERNITE,
      },
      {
        id: 'postnatal',
        title: 'Entretien postnatal précoce',
        text: 'Un temps pour parler de vous, de votre récupération et de votre moral, avec une sage-femme ou un médecin.',
        kind: 'officiel',
        fromTerm: 28,
        toTerm: 56,
        when: 'Entre la 4e et la 8e semaine',
        source: SP_EXAMENS,
      },
    ],
  },
];
