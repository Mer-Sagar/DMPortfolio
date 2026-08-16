import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import { SEO } from "@/components/common/SEO";
import { ProcessTimeline } from "@/components/cards/ProcessTimeline";
import { ServiceGrid } from "@/components/cards/ServiceCard";
import { getService, relatedServices } from "@/lib/content";
import { NotFoundPage } from "@/pages/NotFound";

export function ServiceDetailPage() {
  const { slug = "" } = useParams();
  const service = getService(slug);

  if (!service) return <NotFoundPage />;

  const related = relatedServices(service.slug);

  return (
    <>
      <SEO
        meta={{
          title: service.title,
          description: service.shortDescription,
          ogImage: service.image,
        }}
      />
      <Container className="pt-[var(--header-offset)] pb-12 sm:pb-16">
        <p className="eyebrow">
          {service.category} · {service.number}
        </p>
        <h1 className="display mt-4 max-w-4xl">{service.title}</h1>
        <p className="mt-6 max-w-2xl text-lg text-muted">{service.fullDescription ?? service.shortDescription}</p>
        {service.cta ? (
          <div className="mt-8">
            <Button href={service.cta.href} label={service.cta.label} />
          </div>
        ) : null}
        {service.image ? (
          <div className="mt-10 overflow-hidden rounded-[1.5rem] border border-line">
            <ImageWithFallback src={service.image} alt={service.title} className="aspect-[16/7] w-full object-cover" />
          </div>
        ) : null}

        {service.benefits?.length ? (
          <section className="mt-16">
            <h2 className="font-serif text-4xl">Benefits</h2>
            <ul className="mt-6 grid gap-4 md:grid-cols-3">
              {service.benefits.map((benefit) => (
                <li key={benefit} className="border-t border-line pt-4 text-muted">
                  {benefit}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {service.features?.length ? (
          <section className="mt-16">
            <h2 className="font-serif text-4xl">Capabilities</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {service.features.map((feature) => (
                <li key={feature} className="border border-line px-4 py-3">
                  {feature}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {service.process?.length ? (
          <section className="mt-16">
            <h2 className="mb-8 font-serif text-4xl">Process</h2>
            <ProcessTimeline steps={service.process} />
          </section>
        ) : null}

        {related.length ? (
          <section className="mt-16">
            <div className="mb-6 flex items-end justify-between">
              <h2 className="font-serif text-4xl">Related services</h2>
              <Link to="/services" className="text-sm font-semibold">
                Directory
              </Link>
            </div>
            <ServiceGrid items={related} />
          </section>
        ) : null}
      </Container>
    </>
  );
}
