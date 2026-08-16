import { Link } from "react-router-dom";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link to={`/projects/${project.slug}`} className="group block border border-line bg-surface">
      <div className="aspect-[16/10] overflow-hidden">
        <ImageWithFallback
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
        />
      </div>
      <div className="p-5">
        <p className="text-xs uppercase tracking-[0.16em] text-muted">
          {project.category}
          {project.year ? ` · ${project.year}` : ""}
        </p>
        <h3 className="mt-2 font-serif text-2xl leading-tight">{project.title}</h3>
        <p className="mt-2 text-sm text-muted">{project.description}</p>
      </div>
    </Link>
  );
}

interface ProjectGridProps {
  items: Project[];
}

export function ProjectGrid({ items }: ProjectGridProps) {
  if (!items.length) return null;
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {items.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
