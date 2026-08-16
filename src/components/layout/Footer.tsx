import { Link } from "react-router-dom";
import { BrandMark } from "@/components/common/BrandMark";
import { Button } from "@/components/common/Button";
import { Container } from "@/components/common/Container";
import { navigation, services, site } from "@/lib/content";
import { interpolate, socialEntries } from "@/lib/format";
import { visibleNavItems } from "@/lib/navigation";

export function Footer() {
  const year = new Date().getFullYear();
  const socials = socialEntries(site.social);
  const navItems = visibleNavItems();
  const serviceLinks = services.items.slice(0, 6);

  return (
    <footer className="border-t border-line bg-surface pt-16">
      <Container>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3">
              <BrandMark />
              <div>
                <p className="font-extrabold leading-tight">{site.brand.name}</p>
                <p className="text-xs uppercase tracking-[0.16em] text-muted">{site.brand.tagline}</p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted">{site.brand.description}</p>
            {navigation.footerCta ? (
              <div className="mt-6">
                <Button href={navigation.footerCta.href} label={navigation.footerCta.label} />
              </div>
            ) : null}
          </div>
          <div>
            <p className="eyebrow">Index</p>
            <ul className="mt-4 space-y-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link to={item.href} className="hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {serviceLinks.length ? (
            <div>
              <p className="eyebrow">Services</p>
              <ul className="mt-4 space-y-2">
                {serviceLinks.map((service) => (
                  <li key={service.id}>
                    <Link to={`/services/${service.slug}`} className="hover:underline">
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <div>
            <p className="eyebrow">Contact</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
              </li>
              <li>
                <a href={`tel:${site.contact.phone}`}>{site.contact.phone}</a>
              </li>
              {site.contact.whatsapp ? (
                <li>
                  <a href={`https://wa.me/${site.contact.whatsapp.replace(/\D/g, "")}`}>WhatsApp</a>
                </li>
              ) : null}
              <li className="text-muted">{site.contact.address}</li>
            </ul>
            {socials.length ? (
              <ul className="mt-4 flex flex-wrap gap-3 text-sm">
                {socials.map(([name, href]) => (
                  <li key={name}>
                    <a href={href} target="_blank" rel="noreferrer" className="capitalize hover:underline">
                      {name} ↗
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-line py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>{interpolate(site.copyright, { year })}</p>
          <ul className="flex gap-4">
            {site.legal.map((item) => (
              <li key={item.label}>
                <Link to={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
