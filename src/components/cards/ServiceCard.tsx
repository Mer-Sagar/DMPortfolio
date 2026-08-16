import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getIcon } from "@/lib/icons";
import type { Service } from "@/types";

interface ServiceCardProps {
  service: Service;
  variant?: "directory" | "capability" | "row";
}

export function ServiceCard({ service, variant = "directory" }: ServiceCardProps) {
  const Icon = getIcon(service.icon);

  if (variant === "capability") {
    return (
      <Link
        to={`/services/${service.slug}`}
        className="group flex min-h-[220px] flex-col justify-between border-b border-r border-line p-6 transition hover:bg-secondary sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-serif text-3xl sm:text-4xl">{service.title}</h3>
          <span className="text-sm text-muted">{service.number} /</span>
        </div>
        <p className="mt-8 max-w-sm text-muted">{service.shortDescription}</p>
      </Link>
    );
  }

  if (variant === "row") {
    return (
      <Link
        to={`/services/${service.slug}`}
        className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-line py-5 transition hover:bg-secondary/70 sm:grid-cols-[4.5rem_1fr_auto] sm:gap-8"
      >
        <span className="font-serif text-2xl text-muted">{service.number}</span>
        <span>
          <span className="block font-semibold">{service.title}</span>
          <span className="mt-1 block text-sm text-muted">{service.shortDescription}</span>
        </span>
        <span className="flex items-center gap-3 text-xs uppercase tracking-[0.16em] text-muted">
          {service.category}
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </Link>
    );
  }

  return (
    <Link
      to={`/services/${service.slug}`}
      className="group flex h-full flex-col border border-line bg-surface p-6 transition hover:-translate-y-0.5 hover:border-primary"
    >
      <div className="flex items-center justify-between">
        <Icon className="h-5 w-5" aria-hidden />
        <span className="text-xs tracking-[0.18em] text-muted">{service.number}</span>
      </div>
      <h3 className="mt-8 font-serif text-3xl">{service.title}</h3>
      <p className="mt-3 flex-1 text-sm text-muted">{service.shortDescription}</p>
      <p className="mt-6 text-xs uppercase tracking-[0.16em] text-muted">{service.category}</p>
    </Link>
  );
}

interface ServiceGridProps {
  items: Service[];
  variant?: ServiceCardProps["variant"];
}

export function ServiceGrid({ items, variant = "directory" }: ServiceGridProps) {
  if (!items.length) return null;

  if (variant === "capability") {
    return (
      <div className="grid border-t border-l border-line sm:grid-cols-2 lg:grid-cols-3">
        {items.map((service) => (
          <ServiceCard key={service.id} service={service} variant="capability" />
        ))}
      </div>
    );
  }

  if (variant === "row") {
    return (
      <div>
        {items.map((service) => (
          <ServiceCard key={service.id} service={service} variant="row" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
}
