import type { DiscColor } from "./disc-demo";

/**
 * Les 16 profils généraux (source : All_Profil_SB_3.xlsx, module "profile-general").
 * Champs importés : nom, couleur DISC, DATA_RESUME (summary), DATA_LIKE_1_1/1_2 et 2_1/2_2 (likes).
 * Fichier généré : ne pas modifier à la main sans mettre à jour la source.
 */
export type DiscProfile = {
  code: string;
  name: string;
  color: DiscColor;
  summary: string[];
  likes: Array<{ title: string; detail: string }>;
};

export const DISC_PROFILES: readonly DiscProfile[] = [
  {
    "code": "MIDA1",
    "name": "Le Visionnaire",
    "color": "yellow",
    "summary": [
      "Ouvert et direct. Aime l'échange et débattre de nouvelles idées.",
      "Ingénieux pour résoudre des problèmes avec une vraie facilité pour exploiter les failles d'une situation.",
      "Aime voir des possibilités partout. S'amuse à être l'avocat du diable.",
      "Préfère lancer une démarche plutôt que de la dérouler de manière opérationnelle."
    ],
    "likes": [
      {
        "title": "DE L'INGÉNIOSITÉ",
        "detail": "Veut un interlocuteur qui comprend vite et qui s'adapte"
      },
      {
        "title": "FAIRE BOUGER LES CHOSES",
        "detail": "Aime saisir des opportunités pour apporter du changement"
      }
    ]
  },
  {
    "code": "MIDP1",
    "name": "Le Commandant",
    "color": "red",
    "summary": [
      "Sait décider et organiser. Direct, aime que les choses soient faites comme prévu.",
      "Ne supporte pas l'erreur, et encore moins lorsqu'elle est répétée.",
      "Ne se laisse pas influencé dans ses décisions. Une fois décidé, se lance entièrement.",
      "Très à l'aise pour communiquer sa vision et son besoin. Attend les bonnes questions."
    ],
    "likes": [
      {
        "title": "gagner en efficacité",
        "detail": "Veut choisir la méthode la plus rapide et pertinente"
      },
      {
        "title": "STRUCTURER LES CHOSES",
        "detail": "Veut mettre de l'ordre et de la cohérence"
      }
    ]
  },
  {
    "code": "MIEA1",
    "name": "L'Aventureux",
    "color": "yellow",
    "summary": [
      "Amical et facile d'accès. Chaleureux et spontané.",
      "Apprécie beaucoup les blagues l'humour, ou même critiquer par affection.",
      "Aime avoir une multitude d'activités ou beaucoup de choses à gérer.",
      "Aime entretenir son relationnel. Besoin de se sentir apprécié et accueilli."
    ],
    "likes": [
      {
        "title": "SE SENTIR MOTEUR",
        "detail": "Veut sentir qu'il apporte du dynamisme et du mouvement"
      },
      {
        "title": "ÊTRE ACCESSIBLE",
        "detail": "Aime élargir son réseau et son relationnel"
      }
    ]
  },
  {
    "code": "MIEP1",
    "name": "Le Donateur",
    "color": "green",
    "summary": [
      "Aime approfondir les relations. Ne veut pas se limiter à de l'échange purement formel.",
      "Besoin de sentir que sa décision est utile au collectif ou sert l'entreprise.",
      "Attache une grande importance à l'écoute et à la capacité de se mettre à la place de l'autre.",
      "S'adapte facilement aux autres. Très attentif aux signaux faibles."
    ],
    "likes": [
      {
        "title": "ÉCOUTER L'AUTRE",
        "detail": "Veut entendre parler d'expériences et de vécu"
      },
      {
        "title": "LA RÉACTIVITÉ",
        "detail": "Veut pouvoir compter sur l'autre"
      }
    ]
  },
  {
    "code": "MODA1",
    "name": "L'Entrepreneur",
    "color": "red",
    "summary": [
      "Aime l'action et obtenir des résultats si possible immédiats. Prend des risques si nécessaire.",
      "Accorde peu d'importance au \"blabla\". Les actes avant tout.",
      "Cherche l'efficacité. Si sentiment de faire fausse route, on change.",
      "Attentif aux signaux faibles chez l'autre (gestes, posture, voix…)"
    ],
    "likes": [
      {
        "title": "ASSUMER UNE DÉCISION",
        "detail": "Veut saisir toute la complexité du sujet pour décider"
      },
      {
        "title": "OPTIMISER LES CHOSES",
        "detail": "Veut améliorer l'existant en s'appuyant sur des faits"
      }
    ]
  },
  {
    "code": "MODP1",
    "name": "Le Gestionnaire",
    "color": "blue",
    "summary": [
      "Factuel, pratique, organisé et concret. Attend de l'autre la même chose.",
      "A une bonne vision sur la manière de faire les choses.",
      "Soucieux de faire preuve de responsabilité, de loyauté et de sérieux.",
      "N'hésite pas à exprimer son désaccord et à l'expliquer."
    ],
    "likes": [
      {
        "title": "l'ordre",
        "detail": "Aime les idées ordonnées : classées et hiérarchisées"
      },
      {
        "title": "le pragmatisme",
        "detail": "Aime s'appuyer sur des faits pour décider / réaliste"
      }
    ]
  },
  {
    "code": "MOEA1",
    "name": "Le Charismatique",
    "color": "yellow",
    "summary": [
      "Aime ce qui est nouveau et stimulant. Se réjouit des rencontres et des échanges.",
      "Potentiel excentrique ou capable de faire le show. Marque facilement les esprits.",
      "Aime être au courant de ce qui se passe. N'aime pas la routine.",
      "Aime la flexibilité et ceux qui s'adaptent aux situations sans coller aux règles."
    ],
    "likes": [
      {
        "title": "AVOIR DE L'AUDACE",
        "detail": "Assume ses décisions pour faire bouger les choses"
      },
      {
        "title": "AVOIR UNE VISION D'ENSEMBLE",
        "detail": "Veut connaître tous les points clés d'un sujet"
      }
    ]
  },
  {
    "code": "MOEP1",
    "name": "Le Conseiller",
    "color": "red",
    "summary": [
      "Fiable et droit, n'a qu'une parole et attend la même chose en retour.",
      "Prend ses responsabilités au sérieux. Besoin de réalisme et de pragmatisme sur la façon dont les choses doivent être faites.",
      "Bon sens de l'organisation. Attend un raisonnement concret et du détail dans l'organisation.",
      "Aime l'ordre et les environnements structurés. Besoin de sentir que la personne qui lui parle est crédible et légitime."
    ],
    "likes": [
      {
        "title": "UNE ORGANISATION BIEN PRÉPARÉE",
        "detail": "Veut sentir la maîtrise de son interlocuteur"
      },
      {
        "title": "CE QUI EST PLANIFIÉ",
        "detail": "Veut sentir que l'autre est organisé"
      }
    ]
  },
  {
    "code": "RIDA1",
    "name": "Le Penseur",
    "color": "blue",
    "summary": [
      "Cherche à avoir une vision rationnelle des faits. Fait preuve de logique et d'astuce pour résoudre les choses.",
      "Sait clarifier, mettre de l'ordre. Aime les choses pertinentes.",
      "Accent porté sur l'honnêteté intellectuelle. Repère facilement la faille d'un raisonnement.",
      "Capacité à être ferme et décidé sur les problèmes importants."
    ],
    "likes": [
      {
        "title": "DES MOYENS ADAPTÉS",
        "detail": "Veut être sûr d'avoir le bon outil ou le bon conseil en fonction de la situation"
      },
      {
        "title": "PENSER À TOUT",
        "detail": "Veut bien planifier les choses pour se tranquilliser"
      }
    ]
  },
  {
    "code": "RIDP1",
    "name": "Le Scientifique",
    "color": "blue",
    "summary": [
      "Privilégie la raison. Valorise une vision objective des choses et des personnes.",
      "Aime comprendre le pourquoi des choses. Attend une démonstration logique et précise.",
      "Étudie chaque éventualité d'une option. Se montrer prévoyant avec un plan B.",
      "Aime les projets ambitieux dont on a validé la faisabilité."
    ],
    "likes": [
      {
        "title": "la réflexion",
        "detail": "Veut peser le pour et le contre / veut des critères pour choisir"
      },
      {
        "title": "prendre du recul",
        "detail": "Veut une vision détaillée pour avoir d'avoir un avis"
      }
    ]
  },
  {
    "code": "RIEA1",
    "name": "L'Inspirateur",
    "color": "green",
    "summary": [
      "Tendance à être perfectionniste pour atteindre les objectifs.",
      "Méthodique. Aime ce qui est clair et dit avec transparence.",
      "Aime poser beaucoup de questions. Goût pour chercher la situation idéale.",
      "Pensée très intuitive. Ses exigences sont élevées pour soi et pour les autres."
    ],
    "likes": [
      {
        "title": "UN DISCOURS STRUCTURÉ",
        "detail": "Attend qu'on dise les choses sans détour"
      },
      {
        "title": "ÉCOUTER L'AUTRE",
        "detail": "Veut comprendre la manière de penser de l'autre et ses valeurs"
      }
    ]
  },
  {
    "code": "RIEP1",
    "name": "L'Idéaliste",
    "color": "green",
    "summary": [
      "Aime mettre de l'ordre et trouver le meilleur système pour coordonner les choses.",
      "Fait confiance à ses intuitions. Besoin du sentiment de faire ce qui est juste.",
      "Importance forte sur le respect des personnes. Besoin d'écoute mutuelle.",
      "Exigeant avec soi et les autres. Aime la clarté et les discours précis avec le bon mot."
    ],
    "likes": [
      {
        "title": "prendre le temps",
        "detail": "Veut avoir les idées claires pour décider"
      },
      {
        "title": "LE SENTIMENT DE JUSTICE",
        "detail": "Veut se sentir honnête et juste"
      }
    ]
  },
  {
    "code": "RODA1",
    "name": "L'Expérimentateur",
    "color": "red",
    "summary": [
      "Aime comprendre la façon dont les choses fonctionnent et pourquoi.",
      "Besoin de se sentir libre et d’éviter les situations avec des freins ou des contraintes.",
      "Comprend facilement le côté technique des choses.",
      "Aime les décisions objectives et factuelles."
    ],
    "likes": [
      {
        "title": "COMPRENDRE LE POURQUOI",
        "detail": "Veut qu'on lui explique le résultat attendu avant de rentrer dans les détails"
      },
      {
        "title": "RÉFLÉCHIR AVANT D'AGIR",
        "detail": "Veut penser à toutes les conséquences d'une décision avant de la prendre"
      }
    ]
  },
  {
    "code": "RODP1",
    "name": "Le Cartésien",
    "color": "blue",
    "summary": [
      "A l'aise dans l'analyse et la vérification. Cherche à faire bien et conformément aux attentes.",
      "Sens du devoir très développé. Capable de se concentrer sur des situations complexes.",
      "Veille à ce que tout soit bien organisé. Prend ses responsabilités.",
      "Agit méthodiquement et en comprenant les règles et les normes."
    ],
    "likes": [
      {
        "title": "vérifier les faits",
        "detail": "Veut sécuriser les choses avec le sentiment d'avoir fait le bon choix"
      },
      {
        "title": "l'organisation et la clarté",
        "detail": "Veut avoir des étapes claires pour se lancer"
      }
    ]
  },
  {
    "code": "ROEA1",
    "name": "L'Artiste",
    "color": "yellow",
    "summary": [
      "Observe et se montre à l'écoute avant de prendre la parole.",
      "Besoin d'un raisonnement logique et cadré pour structurer sa réponse.",
      "Attirance pour ce qui est bien présenté, harmonieux, esthétiquement clair (schémas…)",
      "Cherche à comprendre l'intention de son interlocuteur avant de décider."
    ],
    "likes": [
      {
        "title": "L'AUTHENTICITÉ",
        "detail": "Veut un interlocuteur qui parle sans filtre / naturel"
      },
      {
        "title": "ÊTRE SURPRIS",
        "detail": "Est attiré par ce qui est nouveau ou jamais vu"
      }
    ]
  },
  {
    "code": "ROEP1",
    "name": "Le Défenseur",
    "color": "green",
    "summary": [
      "Méticuleux et perfectionniste Ne laisse rien au hasard.",
      "Sens de l'organisation. Attache beaucoup d'importance aux détails. Aime programmer ce qui reste à faire.",
      "Respecte l'existant : les règles, les normes, les codes. Sait les comprendre pour s'y adapter.",
      "Attend du conseil et du support, pour rentrer dans le détail et structurer les choses."
    ],
    "likes": [
      {
        "title": "la droiture",
        "detail": "Veut un interlocuteur qui prend et tient ses engagements"
      },
      {
        "title": "l'équité",
        "detail": "Veut prendre en compte tous les avis avant de décider"
      }
    ]
  }
];

export function findDiscProfile(code: string | null | undefined): DiscProfile | null {
  if (!code) return null;
  const normalized = code.trim().toUpperCase();
  return DISC_PROFILES.find((profile) => profile.code === normalized) ?? null;
}
