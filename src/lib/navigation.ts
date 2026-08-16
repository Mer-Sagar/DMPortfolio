import { navigation, articles, projects, services } from "@/lib/content";
import type { NavigationItem } from "@/types";

export function visibleNavItems(): NavigationItem[] {
  return navigation.items.filter((item) => {
    if (item.enabled === false) return false;
    if (item.href === "/projects" && !projects.items.length) return false;
    if (item.href === "/articles" && !articles.items.length) return false;
    if (item.href === "/services" && !services.items.length) return false;
    return true;
  });
}
