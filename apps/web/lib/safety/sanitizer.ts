const patterns: { name: string; regex: RegExp }[] = [
  { name: "full_name", regex: /\b([A-Z][a-z]+\s(?:[A-Z][a-z]+\s)?[A-Z][a-z]+)\b/g },
  { name: "phone", regex: /\b(?:\+?\d[\d\s-]{6,}\d)\b/g },
  { name: "email", regex: /[\w.-]+@[\w.-]+\.[A-Za-z]{2,}/g },
  { name: "address", regex: /(\d+\s+[A-Za-z0-9.,\s]+(?:Street|St|Road|Rd|Avenue|Ave|Lane|Ln|Block))/gi },
  { name: "id_number", regex: /\b[A-Z]{2}\d{2,}\b/g }
];

export function sanitizeMessage(input: string): { clean: string; redactions: string[] } {
  let clean = input ?? "";
  const redactions: string[] = [];

  patterns.forEach(({ name, regex }) => {
    clean = clean.replace(regex, match => {
      redactions.push(`${name}:${match}`);
      return "[redacted]";
    });
  });

  return {
    clean: clean.trim(),
    redactions
  };
}
