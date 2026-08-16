export interface ThemeTokens {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  muted: string;
  border: string;
}

export interface Brand {
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  logo: string;
  mark: string;
  favicon: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  whatsapp?: string;
  address: string;
  city: string;
  country: string;
  mapUrl?: string;
  mapEmbedUrl?: string;
}

export interface SocialLinks {
  instagram?: string;
  linkedin?: string;
  facebook?: string;
  twitter?: string;
  maps?: string;
}

export interface WorkingHours {
  label: string;
  value: string;
}

export interface LegalLink {
  label: string;
  href: string;
}

export interface SiteData {
  brand: Brand;
  theme: ThemeTokens;
  contact: ContactInfo;
  social: SocialLinks;
  workingHours: WorkingHours[];
  copyright: string;
  legal: LegalLink[];
  locale: string;
  baseUrl: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  enabled?: boolean;
  external?: boolean;
}

export interface NavigationCta {
  label: string;
  href: string;
}

export interface NavigationData {
  items: NavigationItem[];
  cta?: NavigationCta;
  footerCta?: NavigationCta;
}

export interface SeoMeta {
  title: string;
  description: string;
  ogImage?: string;
  canonical?: string;
}

export interface CtaLink {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "ghost";
}

export interface HeroMetric {
  label: string;
  value: string;
  description?: string;
}

export interface HeroData {
  eyebrow?: string;
  kickerLeft?: string;
  kickerRight?: string;
  heading: string;
  highlightedHeading?: string;
  description?: string;
  primaryCta?: CtaLink;
  secondaryCta?: CtaLink;
  image?: string;
  imageAlt?: string;
  video?: string;
  marquee?: string;
  background?: string;
  badge?: string;
  seal?: string;
  note?: string;
  metrics?: HeroMetric[];
  exhibitLabel?: string;
  exhibitMeta?: string;
  exhibitNote?: string;
}

export interface Statistic {
  id: string;
  value: number;
  suffix?: string;
  prefix?: string;
  display?: string;
  label: string;
  description?: string;
}

export interface StatisticsData {
  eyebrow?: string;
  title?: string;
  items: Statistic[];
}

export interface ProcessStep {
  id: string;
  number: string;
  title: string;
  description: string;
  icon?: string;
}

export interface ProcessData {
  eyebrow?: string;
  title: string;
  description?: string;
  steps: ProcessStep[];
}

export interface PhilosophyPoint {
  id: string;
  number?: string;
  title: string;
  description?: string;
}

export interface PhilosophyData {
  eyebrow?: string;
  title: string;
  quote?: string;
  points?: PhilosophyPoint[];
}

export interface ReasonItem {
  id: string;
  number: string;
  title: string;
  description: string;
  icon?: string;
  image?: string;
  actionLabel?: string;
}

export interface ReasonsData {
  title: string;
  items: ReasonItem[];
}

export interface HighlightItem {
  id: string;
  eyebrow?: string;
  title: string;
  description: string;
}

export interface HighlightsData {
  title: string;
  description?: string;
  items: HighlightItem[];
}

export interface PipelineItem {
  id: string;
  letter: string;
  title: string;
  description: string;
}

export interface PipelineData {
  title: string;
  description?: string;
  items: PipelineItem[];
  badge?: string;
}

export interface SectionConfig {
  type: string;
  enabled: boolean;
}

export interface HomeCta {
  title: string;
  description?: string;
  tags?: string[];
  primaryCta?: CtaLink;
  note?: string;
}

export interface HomeData {
  seo: SeoMeta;
  hero: HeroData;
  highlights?: HighlightsData;
  pipeline?: PipelineData;
  midCta?: HomeCta;
  philosophy?: PhilosophyData;
  capabilitiesEyebrow?: string;
  capabilitiesTitle?: string;
  teamEyebrow?: string;
  teamTitle?: string;
  teamDescription?: string;
  reasons?: ReasonsData;
  process?: ProcessData;
  articlesEyebrow?: string;
  articlesTitle?: string;
  contactEyebrow?: string;
  contactTitle?: string;
  finalCta?: HomeCta;
  sections: SectionConfig[];
}

export interface Service {
  id: string;
  number?: string;
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  fullDescription?: string;
  icon?: string;
  image?: string;
  features?: string[];
  benefits?: string[];
  process?: ProcessStep[];
  cta?: CtaLink;
}

export interface ServicesPageData {
  seo: SeoMeta;
  hero: HeroData;
  snapshot?: {
    title: string;
    countLabel: string;
    items: HighlightItem[];
  };
  workflow?: {
    title: string;
    description?: string;
    rhythm?: string;
    items: HighlightItem[];
  };
  directoryTitle?: string;
  directoryDescription?: string;
  explorerTitle?: string;
  explorerDescription?: string;
  searchPlaceholder?: string;
  categories: string[];
  items: Service[];
  cta?: HomeCta;
}

export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  photo?: string;
  initials?: string;
  shortBio?: string;
  fullBio?: string;
  experience?: string;
  credentials?: string;
  specialties?: string[];
  social?: SocialLinks;
  featured?: boolean;
}

export interface TeamData {
  seo?: SeoMeta;
  foundersTitle?: string;
  foundersDescription?: string;
  supportTitle?: string;
  supportDescription?: string;
  members: TeamMember[];
}

export interface Testimonial {
  id: string;
  name: string;
  company?: string;
  role?: string;
  quote: string;
  image?: string;
  rating?: number;
}

export interface TestimonialsData {
  title?: string;
  items: Testimonial[];
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  client?: string;
  year?: string;
  description: string;
  image?: string;
  gallery?: string[];
  services?: string[];
  technologies?: string[];
  externalUrl?: string;
}

export interface ProjectsData {
  seo: SeoMeta;
  hero: HeroData;
  categories: string[];
  items: Project[];
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  date: string;
  category: string;
  author: string;
  coverImage?: string;
  excerpt: string;
  content: string;
  tags?: string[];
  readingTime?: string;
  pdfUrl?: string;
  featured?: boolean;
}

export interface ArticlesData {
  seo: SeoMeta;
  hero: HeroData;
  categories: string[];
  items: Article[];
}

export interface AboutValue {
  id: string;
  number: string;
  title: string;
  description: string;
  actionLabel?: string;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
}

export interface AboutData {
  seo: SeoMeta;
  hero: HeroData;
  origin?: {
    eyebrow?: string;
    quote: string;
  };
  milestones?: Milestone[];
  values?: {
    eyebrow?: string;
    title: string;
    items: AboutValue[];
  };
  audiences?: {
    title: string;
    description: string;
  };
  mission?: string;
  vision?: string;
}

export interface ContactFormField {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea" | "select";
  required?: boolean;
  placeholder?: string;
  options?: string[];
}

export interface ContactData {
  seo: SeoMeta;
  hero: HeroData;
  channelsTitle?: string;
  channelsDescription?: string;
  formTitle?: string;
  formDescription?: string;
  mapTitle?: string;
  mapDescription?: string;
  phones?: { label: string; value: string; href: string }[];
  form: {
    fields: ContactFormField[];
    submitLabel: string;
    successMessage: string;
    errorMessage: string;
  };
}

export interface ContactFormPayload {
  name: string;
  email: string;
  phone: string;
  company?: string;
  subject?: string;
  message: string;
}

export type IconName =
  | "briefcase"
  | "file-text"
  | "shield"
  | "calculator"
  | "landmark"
  | "chart"
  | "building"
  | "sparkles"
  | "arrow-right"
  | "phone"
  | "mail"
  | "map-pin";
