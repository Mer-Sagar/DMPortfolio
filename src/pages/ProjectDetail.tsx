import { Link, useParams } from "react-router-dom";
import { Container } from "@/components/common/Container";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import { SEO } from "@/components/common/SEO";
import { getProject } from "@/lib/content";
import { NotFoundPage } from "@/pages/NotFound";

export function ProjectDetailPage() {
  const { slug = "" } = useParams();
  const project = getProject(slug);

  if (!project) return <NotFoundPage />;

  return (
    <>
      <SEO
        meta={{
          title: project.title,
          description: project.description,
          ogImage: project.image,
        }}
      />
      <Container className="py-12 sm:py-16">
        <p className="eyebrow">
          {project.category}
          {project.year ? ` · ${project.year}` : ""}
        </p>
        <h1 className="display-md mt-4 max-w-4xl">{project.title}</h1>
        <dl className="mt-8 grid gap-4 sm:grid-cols-3">
          {project.client ? (
            <div>
              <dt className="eyebrow">Client</dt>
              <dd className="mt-2">{project.client}</dd>
            </div>
          ) : null}
          {project.services?.length ? (
            <div>
              <dt className="eyebrow">Services</dt>
              <dd className="mt-2">{project.services.join(", ")}</dd>
            </div>
          ) : null}
          {project.technologies?.length ? (
            <div>
              <dt className="eyebrow">Method</dt>
              <dd className="mt-2">{project.technologies.join(", ")}</dd>
            </div>
          ) : null}
        </dl>
        <p className="mt-8 max-w-3xl text-lg text-muted">{project.description}</p>
        {project.externalUrl ? (
          <a href={project.externalUrl} className="mt-6 inline-block font-semibold" target="_blank" rel="noreferrer">
            External note ↗
          </a>
        ) : null}
        {project.gallery?.length ? (
          <div className="mt-10 grid gap-4">
            {project.gallery.map((src) => (
              <div key={src} className="overflow-hidden rounded-[1.4rem] border border-line">
                <ImageWithFallback src={src} alt={project.title} className="aspect-[16/8] w-full object-cover" />
              </div>
            ))}
          </div>
        ) : project.image ? (
          <div className="mt-10 overflow-hidden rounded-[1.4rem] border border-line">
            <ImageWithFallback src={project.image} alt={project.title} className="aspect-[16/8] w-full object-cover" />
          </div>
        ) : null}
        <p className="mt-12">
          <Link to="/projects" className="font-semibold">
            All projects
          </Link>
        </p>
      </Container>
    </>
  );
}
