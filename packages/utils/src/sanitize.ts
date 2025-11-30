const profanityRegex = /(\bdamn\b|\bhell\b)/gi;

export function stripProhibitedLanguage(input: string) {
  return input.replace(profanityRegex, "[softened]");
}
