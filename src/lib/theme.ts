import type { SiteData, ThemeTokens } from "@/types";
import site from "@/data/site.json";

export function applyTheme(theme: ThemeTokens = (site as SiteData).theme) {
  const root = document.documentElement;
  root.style.setProperty("--site-primary", theme.primary);
  root.style.setProperty("--site-secondary", theme.secondary);
  root.style.setProperty("--site-accent", theme.accent);
  root.style.setProperty("--site-background", theme.background);
  root.style.setProperty("--site-surface", theme.surface);
  root.style.setProperty("--site-text", theme.text);
  root.style.setProperty("--site-muted", theme.muted);
  root.style.setProperty("--site-border", theme.border);
}
