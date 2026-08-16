import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { HomePage } from "@/pages/Home";
import { articles, hasItems, projects, services } from "@/lib/content";

const ServicesPage = lazy(() => import("@/pages/Services").then((module) => ({ default: module.ServicesPage })));
const ServiceDetailPage = lazy(() => import("@/pages/ServiceDetail").then((module) => ({ default: module.ServiceDetailPage })));
const AboutPage = lazy(() => import("@/pages/About").then((module) => ({ default: module.AboutPage })));
const NewsPage = lazy(() => import("@/pages/News").then((module) => ({ default: module.NewsPage })));
const ArticleDetailPage = lazy(() => import("@/pages/ArticleDetail").then((module) => ({ default: module.ArticleDetailPage })));
const ProjectsPage = lazy(() => import("@/pages/Projects").then((module) => ({ default: module.ProjectsPage })));
const ProjectDetailPage = lazy(() => import("@/pages/ProjectDetail").then((module) => ({ default: module.ProjectDetailPage })));
const ContactPage = lazy(() => import("@/pages/Contact").then((module) => ({ default: module.ContactPage })));
const NotFoundPage = lazy(() => import("@/pages/NotFound").then((module) => ({ default: module.NotFoundPage })));

function Fallback() {
  return <div className="px-6 py-24 text-muted">Loading…</div>;
}

export default function App() {
  return (
    <Suspense fallback={<Fallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          {hasItems(services.items) ? <Route path="services" element={<ServicesPage />} /> : null}
          {hasItems(services.items) ? <Route path="services/:slug" element={<ServiceDetailPage />} /> : null}
          <Route path="about" element={<AboutPage />} />
          {hasItems(projects.items) ? <Route path="projects" element={<ProjectsPage />} /> : null}
          {hasItems(projects.items) ? <Route path="projects/:slug" element={<ProjectDetailPage />} /> : null}
          {hasItems(articles.items) ? <Route path="articles" element={<NewsPage />} /> : null}
          {hasItems(articles.items) ? <Route path="articles/:slug" element={<ArticleDetailPage />} /> : null}
          <Route path="news" element={<Navigate to="/articles" replace />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
