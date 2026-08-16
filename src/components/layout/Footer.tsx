import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { GoldWave } from "@/components/common/GoldWave";
import { Container } from "@/components/common/Container";
import { contact, navigation, services, site } from "@/lib/content";
import { interpolate } from "@/lib/format";
import { visibleNavItems } from "@/lib/navigation";

export function Footer() {
  const year = new Date().getFullYear();
  const navItems = visibleNavItems();
  const serviceLinks = services.items.slice(0, 6);
  const instagram = site.social.instagram;
  const mapsHref = site.social.maps || site.contact.mapUrl;

  return (
    <footer className="bg-[#fbfaf6] pt-6">
      <GoldWave />
      <Container className="py-16 text-center">
        <nav aria-label="Footer" className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.href}
              className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-900 hover:text-[#0f766e]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {serviceLinks.length ? (
          <ul className="mx-auto mt-10 grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {serviceLinks.map((service, index) => (
              <li key={service.id}>
                <Link
                  to={`/services/${service.slug}`}
                  className="relative block rounded-2xl bg-white px-5 py-5 font-serif text-[1.15rem] italic text-slate-900 shadow-sm ring-1 ring-slate-200/80 transition hover:ring-slate-400"
                >
                  {service.title}
                  <span className="absolute bottom-3 right-4 text-[10px] font-sans not-italic font-semibold tracking-wide text-slate-300">
                    #{String(index + 1).padStart(2, "0")}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mx-auto mt-14 grid max-w-3xl gap-10 sm:grid-cols-3">
          <div>
            <Mail className="mx-auto h-5 w-5 text-[#c4a35a]" strokeWidth={1.5} aria-hidden />
            <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">Email</p>
            <a href={`mailto:${site.contact.email}`} className="mt-2 block font-serif text-lg text-slate-900">
              {site.contact.email}
            </a>
          </div>
          {(contact.phones ?? []).slice(0, 2).map((phone) => (
            <div key={phone.href}>
              <Phone className="mx-auto h-5 w-5 text-[#c4a35a]" strokeWidth={1.5} aria-hidden />
              <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">{phone.label}</p>
              <a href={phone.href} className="mt-2 block font-serif text-lg text-slate-900">
                {phone.value}
              </a>
            </div>
          ))}
        </div>

        {navigation.footerCta ? (
          <Link
            to={navigation.footerCta.href}
            className="mt-12 inline-flex items-center gap-2 rounded-full bg-slate-950 px-8 py-3.5 text-[12px] font-bold uppercase tracking-[0.16em] text-white"
          >
            {navigation.footerCta.label}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        ) : null}

        {instagram ? (
          <p className="mt-10">
            <a
              href={instagram}
              target="_blank"
              rel="noreferrer"
              className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500"
            >
              Instagram ↗
            </a>
          </p>
        ) : null}

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-slate-200/80 pt-6 text-[11px] uppercase tracking-[0.14em] text-slate-400 sm:flex-row">
          <p className="normal-case tracking-normal">{interpolate(site.copyright, { year })}</p>
          <ul className="flex items-center gap-4">
            {mapsHref ? (
              <li>
                <a href={mapsHref} target="_blank" rel="noreferrer">
                  Maps
                </a>
              </li>
            ) : null}
            {site.legal
              .filter((item) => item.label.toLowerCase() !== "maps")
              .map((item) => (
                <li key={item.label}>
                  {item.href.startsWith("http") ? (
                    <a href={item.href} target="_blank" rel="noreferrer">
                      {item.label}
                    </a>
                  ) : (
                    <Link to={item.href}>{item.label}</Link>
                  )}
                </li>
              ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
