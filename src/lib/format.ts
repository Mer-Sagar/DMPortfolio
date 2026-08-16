import type { SocialLinks } from "@/types";

export function formatDate(value: string, locale = "en-IN") {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function interpolate(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ""));
}

export function socialEntries(social?: SocialLinks) {
  if (!social) return [] as [string, string][];
  return (Object.entries(social) as [string, string | undefined][]).filter(
    (entry): entry is [string, string] => Boolean(entry[1]),
  );
}
