export type ResponseLanguage = "ru" | "uk" | "en" | "fr" | "ar";

export const DEFAULT_RESPONSE_LANGUAGE: ResponseLanguage = "ru";

export const RESPONSE_LANGUAGE_OPTIONS: ReadonlyArray<{
  id: ResponseLanguage;
  shortLabel: string;
  label: string;
}> = [
  { id: "ru", shortLabel: "RU", label: "Русский" },
  { id: "uk", shortLabel: "UA", label: "Українська" },
  { id: "en", shortLabel: "EN", label: "English" },
  { id: "fr", shortLabel: "FR", label: "Français" },
  { id: "ar", shortLabel: "AR", label: "العربية" },
];

const DIRECT_SWITCH_COMMAND_RE = /^(?:говори|разговаривай|отвечай|ответь|розмовляй|спілкуйся|відповідай|speak|talk|reply|respond|parle|parlez|r[ée]ponds|r[ée]pondez)(?=$|\s)/u;

const POLITE_SWITCH_COMMAND_RE = /^(?:(?:можешь|можеш|чи\s+можеш|can\s+you|could\s+you)(?:\s+(?:пожалуйста|будь\s+ласка|please|теперь|відтепер|now))*\s+)(?:говорить|разговаривать|отвечать|говорити|спілкуватися|відповідати|speak|talk|reply|respond)(?=$|\s)/u;

const RESPONSE_SETTING_COMMAND_RE = /^(?:переключи|смени|поменяй|выбери|зміни|перемкни|обери|switch|change|set)\s+(?:язык\s+ответов|мову\s+відповідей|response\s+language)(?=$|\s)/u;

const COMMAND_LEADING_MODIFIER_RE = /^(?:пожалуйста|будь\s+ласка|please|теперь|отныне|відтепер|надалі|now|from\s+now\s+on)(?=$|\s)/u;

const TARGET_MODIFIER_RE = /^(?:пожалуйста|будь\s+ласка|please|теперь|отныне|відтепер|надалі|now|from\s+now\s+on|со\s+мной|зі\s+мною|with\s+me)(?=$|\s)/u;

const LANGUAGE_TARGETS: Array<{
  language: ResponseLanguage;
  pattern: RegExp;
}> = [
  {
    language: "fr",
    pattern: /^(?:(?:(?:язык(?:\s+ответов)?|мову(?:\s+відповідей)?|(?:response\s+)?language)\s+(?:на|to)\s+)?(?:французский(?:\s+язык)?|французьку(?:\s+мову)?|french)|по[-\s]?французски|in\s+french|to\s+french|en\s+fran[cç]ais|fran[cç]ais)(?:\s+(?:пожалуйста|будь\s+ласка|please|s'il\s+te\s+pla[iî]t))?$/u,
  },
  {
    language: "ar",
    pattern: /^(?:(?:(?:язык(?:\s+ответов)?|мову(?:\s+відповідей)?|(?:response\s+)?language)\s+(?:на|to)\s+)?(?:арабский(?:\s+язык)?|арабську(?:\s+мову)?|arabic)|по[-\s]?арабски|in\s+arabic|to\s+arabic|en\s+arabe|arabe)(?:\s+(?:пожалуйста|будь\s+ласка|please|s'il\s+te\s+pla[iî]t))?$/u,
  },
  {
    language: "ru",
    pattern: /^(?:(?:(?:язык(?:\s+ответов)?|мову(?:\s+відповідей)?|(?:response\s+)?language)\s+(?:на|to)\s+)?(?:русский(?:\s+язык)?|російську(?:\s+мову)?|russian)|по[-\s]?русски|на\s+русском(?:\s+языке)?|на\s+русский(?:\s+язык)?|російською|на\s+російську(?:\s+мову)?|російська(?:\s+мова)?|in\s+russian|to\s+russian)(?:\s+(?:пожалуйста|будь\s+ласка|please))?$/u,
  },
  {
    language: "uk",
    pattern: /^(?:(?:(?:язык(?:\s+ответов)?|мову(?:\s+відповідей)?|(?:response\s+)?language)\s+(?:на|to)\s+)?(?:украинский(?:\s+язык)?|українську(?:\s+мову)?|ukrainian)|по[-\s]?украински|на\s+украинском(?:\s+языке)?|на\s+украинский(?:\s+язык)?|українською|на\s+українську(?:\s+мову)?|українська(?:\s+мова)?|in\s+ukrainian|to\s+ukrainian)(?:\s+(?:пожалуйста|будь\s+ласка|please))?$/u,
  },
  {
    language: "en",
    pattern: /^(?:(?:(?:язык(?:\s+ответов)?|мову(?:\s+відповідей)?|(?:response\s+)?language)\s+(?:на|to)\s+)?(?:английский(?:\s+язык)?|англійську(?:\s+мову)?|english)|по[-\s]?английски|на\s+английском(?:\s+языке)?|на\s+английский(?:\s+язык)?|англійською|на\s+англійську(?:\s+мову)?|англійська(?:\s+мова)?|in\s+english|to\s+english)(?:\s+(?:пожалуйста|будь\s+ласка|please))?$/u,
  },
];

export function normalizeResponseLanguage(value: unknown): ResponseLanguage {
  return value === "uk" || value === "en" || value === "ru" || value === "fr" || value === "ar"
    ? value
    : DEFAULT_RESPONSE_LANGUAGE;
}

/**
 * Recognize only an explicit request to change LOOI's persistent answer
 * language. Ordinary translation questions intentionally do not match.
 */
export function detectLanguageSwitchCommand(transcript: string): ResponseLanguage | null {
  const normalized = transcript
    .trim()
    .toLowerCase()
    .replace(/[.,!?;:]+/gu, " ")
    .replace(/\s+/gu, " ")
    .trim();

  let commandText = normalized;
  while (COMMAND_LEADING_MODIFIER_RE.test(commandText)) {
    commandText = commandText.replace(COMMAND_LEADING_MODIFIER_RE, "").trim();
  }

  const command = RESPONSE_SETTING_COMMAND_RE.exec(commandText)
    ?? POLITE_SWITCH_COMMAND_RE.exec(commandText)
    ?? DIRECT_SWITCH_COMMAND_RE.exec(commandText);
  if (!command) {
    return null;
  }

  let target = commandText.slice(command[0].length).trim();
  while (TARGET_MODIFIER_RE.test(target)) {
    target = target.replace(TARGET_MODIFIER_RE, "").trim();
  }
  return LANGUAGE_TARGETS.find(({ pattern }) => pattern.test(target))?.language ?? null;
}

export function getLanguageSwitchAcknowledgement(language: ResponseLanguage): string {
  if (language === "fr") return "D'accord, je parle français.";
  if (language === "ar") return "حسنًا، سأتحدث بالعربية.";
  if (language === "uk") return "Добре, говоритиму українською.";
  if (language === "en") return "Okay, I'll speak English.";
  return "Хорошо, буду говорить по-русски.";
}

export const SUPPORTED_CONVERSATION_LANGUAGES = ["ru", "uk", "en", "fr", "ar"] as const;

export function isResponseLanguage(value: string): value is ResponseLanguage {
  return (SUPPORTED_CONVERSATION_LANGUAGES as readonly string[]).includes(value);
}

export function getResponseLanguageName(language: ResponseLanguage): string {
  if (language === "fr") return "French";
  if (language === "ar") return "Arabic";
  if (language === "uk") return "Ukrainian";
  if (language === "en") return "English";
  return "Russian";
}
