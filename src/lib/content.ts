import type {
  AboutData,
  ArticlesData,
  ContactData,
  HomeData,
  NavigationData,
  ProjectsData,
  ServicesPageData,
  SiteData,
  StatisticsData,
  TeamData,
  TestimonialsData,
} from "@/types";
import siteJson from "@/data/site.json";
import navigationJson from "@/data/navigation.json";
import homeJson from "@/data/home.json";
import servicesJson from "@/data/services.json";
import teamJson from "@/data/team.json";
import statisticsJson from "@/data/statistics.json";
import testimonialsJson from "@/data/testimonials.json";
import projectsJson from "@/data/projects.json";
import articlesJson from "@/data/articles.json";
import contactJson from "@/data/contact.json";
import aboutJson from "@/data/about.json";
import pagesJson from "@/data/pages.json";

export const site = siteJson as SiteData;
export const navigation = navigationJson as NavigationData;
export const home = homeJson as HomeData;
export const services = servicesJson as ServicesPageData;
export const team = teamJson as TeamData;
export const statistics = statisticsJson as StatisticsData;
export const testimonials = testimonialsJson as TestimonialsData;
export const projects = projectsJson as ProjectsData;
export const articles = articlesJson as ArticlesData;
export const contact = contactJson as ContactData;
export const about = aboutJson as AboutData;
export const pages = pagesJson as {
  notFound: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
  };
};

export function isEnabled(sections: { type: string; enabled: boolean }[] | undefined, type: string) {
  const match = sections?.find((section) => section.type === type);
  return match ? match.enabled : true;
}

export function hasItems<T>(items?: T[] | null): items is T[] {
  return Array.isArray(items) && items.length > 0;
}

export function getService(slug: string) {
  return services.items.find((item) => item.slug === slug);
}

export function getProject(slug: string) {
  return projects.items.find((item) => item.slug === slug);
}

export function getArticle(slug: string) {
  return articles.items.find((item) => item.slug === slug);
}

export function relatedServices(slug: string, limit = 3) {
  const current = getService(slug);
  if (!current) return services.items.slice(0, limit);
  return services.items.filter((item) => item.slug !== slug && item.category === current.category).concat(
    services.items.filter((item) => item.slug !== slug),
  ).filter((item, index, list) => list.findIndex((entry) => entry.id === item.id) === index).slice(0, limit);
}
