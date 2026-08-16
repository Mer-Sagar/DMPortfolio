import { useEffect } from "react";
import { site } from "@/lib/content";
import type { SeoMeta } from "@/types";

function upsertMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;
  if (!element) {
    const tag = selector.startsWith("link") ? "link" : "meta";
    element = document.createElement(tag);
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, value]) => element?.setAttribute(key, value));
}

export function SEO({ meta, jsonLd }: { meta: SeoMeta; jsonLd?: Record<string, unknown> }) {
  useEffect(() => {
    const title = meta.title.includes(site.brand.name) ? meta.title : `${meta.title} | ${site.brand.name}`;
    const canonical = meta.canonical ?? `${site.baseUrl}${window.location.pathname}`;
    const image = meta.ogImage ?? site.brand.logo;

    document.title = title;
    document.documentElement.lang = site.locale.split("-")[0] ?? "en";

    upsertMeta('meta[name="description"]', { name: "description", content: meta.description });
    upsertMeta('link[rel="canonical"]', { rel: "canonical", href: canonical });
    upsertMeta('link[rel="icon"]', { rel: "icon", href: site.brand.favicon });
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: title });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: meta.description });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: image });
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: title });
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: meta.description });
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: image });

    const existing = document.getElementById("structured-data");
    if (jsonLd) {
      const script = existing ?? document.createElement("script");
      script.id = "structured-data";
      script.setAttribute("type", "application/ld+json");
      script.textContent = JSON.stringify(jsonLd);
      if (!existing) document.head.appendChild(script);
    } else if (existing) {
      existing.remove();
    }
  }, [meta, jsonLd]);

  return null;
}
