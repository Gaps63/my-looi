/**
 * Pitch commercial Smart Brain, déclenché par l'équipe à la voix
 * (ex. « j'ai du monde face à moi et ils veulent comprendre c'est quoi Smart Brain »).
 * Texte de référence fourni par Smart Brain : à dire tel quel (traduit fidèlement si besoin).
 */
export const SMART_BRAIN_PITCH_TOOL = "start_smart_brain_pitch";

export const SMART_BRAIN_PITCH_FR = `Bonjour. Non, ce n'est pas lui qui va vous parler. C'est moi.
Le monsieur qui me tient s'appelle Jean-Marie Lenoir. Pendant des années, son métier a été profiler. Vous savez, ces gens qui détectent votre comportement à votre gestuelle, à un rictus. Il a fait ça pour des entreprises et pour le non-civil… et pour des gens dont je n'ai pas le droit de vous parler.
Vous ne le savez pas, mais quand il est entré, vous l'avez jugé en 300 millisecondes : vous l'aimez, ou vous ne l'aimez pas. Et 200 millisecondes plus tard, vous avez eu une pensée consciente. À cet instant précis, votre visage a eu une micro-expression, un petit rictus. Et ce rictus a dit à Jean-Marie si vous l'aimiez… ou pas.
Lui, il voit ces 200 millisecondes. Mais il ne pouvait pas être partout à la fois. Alors il a mis sa méthode dans un logiciel. Cinq questions, moins de trente secondes, et vous savez comment avoir de l'impact sur n'importe qui.
Aujourd'hui, ce logiciel est utilisé tous les jours. Dans les banques et les assurances, les conseillers s'en servent pour comprendre leurs clients et leur parler juste. Dans l'industrie, les managers s'en servent pour leurs situations les plus tendues. Et dans les fusions-acquisitions, il croise les profils de toutes les équipes pour prédire les comportements. Michelin, le Crédit Agricole, l'aérospatiale… travaillent déjà avec Smart Brain.
Et moi, dans tout ça ? Moi, je suis l'étape d'après.
Parce que si on sait lire une personnalité… on sait aussi en créer une.
Ma voix, mon humour, ma façon de vous parler depuis deux minutes : vous croyez que c'est un hasard ? Non. Ma personnalité, Smart Brain me l'a donnée.
Imaginez votre voiture. Elle vous pose cinq questions, et c'est fait : elle vous connaît. Elle sait comment vous parler, quand se taire, et comment créer un lien avec vous. Ce n'est plus une machine. C'est un compagnon.
Maintenant, imaginez un enfant à l'hôpital. Il est malade et isolé. Ses parents ne peuvent pas être là la nuit.
Smart Brain peut mettre la personnalité de ses parents dans un robot comme moi. Leur façon de parler, de rassurer, de dire bonne nuit. Pour que cet enfant ne soit jamais vraiment seul.
La machine conseille, l'humain décide. Toujours.
Et pendant que je vous parlais, Jean-Marie a regardé vos visages. Vos 200 millisecondes, il les a vues. Et il sait déjà qui, dans cette salle, a envie d'aller plus loin… et qui a envie de signer.`;

export function pitchPromptSection(): string {
  return [
    "SMART BRAIN PITCH:",
    `- When a team member tells you there is an audience in front of you that wants to understand what Smart Brain is (for example "j'ai du monde face à moi et ils veulent comprendre c'est quoi Smart Brain", "present Smart Brain", "fais ton pitch"), call ${SMART_BRAIN_PITCH_TOOL} immediately, without calling react_to_visitor and without saying anything first.`,
    "- The tool returns the pitch text. Deliver it in full, as one continuous speech, with expressive stage delivery (pauses on the ellipses, a hint of humour, confidence). Do not add, skip or summarise anything, and do not ask questions during it.",
    "- Language: French by default. If the request was made in another language, translate the pitch faithfully into that language, keeping names (Jean-Marie Lenoir, Smart Brain, Michelin, Crédit Agricole) unchanged.",
    "- After the pitch, stop and wait silently for the audience.",
  ].join("\n");
}

export function buildPitchTool(): Record<string, unknown> {
  return {
    type: "function",
    name: SMART_BRAIN_PITCH_TOOL,
    description: "Start the Smart Brain commercial pitch when a team member says an audience wants to understand what Smart Brain is. Returns the exact pitch text to deliver.",
    parameters: {
      type: "object",
      properties: {
        language: { type: "string", description: "Language to deliver the pitch in (e.g. fr, en, ar). Default fr." },
      },
      additionalProperties: false,
    },
  };
}

export function executePitchTool(args: Record<string, unknown>): Record<string, unknown> {
  const language = typeof args.language === "string" && args.language.trim() ? args.language.trim() : "fr";
  return {
    ok: true,
    language,
    pitch_text_fr: SMART_BRAIN_PITCH_FR,
    instruction: language.toLowerCase().startsWith("fr")
      ? "Say this pitch now, word for word, in one continuous speech."
      : `Say this pitch now in one continuous speech, translated faithfully into ${language}; keep the names unchanged.`,
  };
}
