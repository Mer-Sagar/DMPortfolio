import { Mail, MapPin, Phone } from "lucide-react";
import { SEO } from "@/components/common/SEO";
import { Container } from "@/components/common/Container";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/sections/PageHero";
import { contact, site } from "@/lib/content";
import { socialEntries } from "@/lib/format";

export function ContactPage() {
  const socials = socialEntries(site.social);

  return (
    <>
      <SEO meta={contact.seo} />
      <PageHero hero={contact.hero} />
      <Container className="grid gap-12 pb-20 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="eyebrow">{contact.channelsTitle}</p>
          <p className="mt-4 max-w-md text-muted">{contact.channelsDescription}</p>
          <ul className="mt-8 space-y-5">
            <li className="flex gap-3">
              <Mail className="mt-1 h-4 w-4" />
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-1 h-4 w-4" />
              <a href={`tel:${site.contact.phone}`}>{site.contact.phone}</a>
            </li>
            {site.contact.whatsapp ? (
              <li className="flex gap-3">
                <Phone className="mt-1 h-4 w-4" />
                <a href={`https://wa.me/${site.contact.whatsapp.replace(/\D/g, "")}`}>WhatsApp {site.contact.whatsapp}</a>
              </li>
            ) : null}
            <li className="flex gap-3">
              <MapPin className="mt-1 h-4 w-4" />
              <span>{site.contact.address}</span>
            </li>
          </ul>
          {contact.phones?.length ? (
            <div className="mt-8 space-y-4">
              {contact.phones.map((phone) => (
                <a key={phone.href} href={phone.href} className="block border-t border-line pt-4">
                  <p className="eyebrow">{phone.label}</p>
                  <p className="mt-2 font-semibold">{phone.value}</p>
                </a>
              ))}
            </div>
          ) : null}
          {site.workingHours.map((item) => (
            <p key={item.label} className="mt-6 text-sm text-muted">
              {item.label}: {item.value}
            </p>
          ))}
          {socials.length ? (
            <ul className="mt-6 flex flex-wrap gap-3 text-sm">
              {socials.map(([name, href]) => (
                <li key={name}>
                  <a href={href} target="_blank" rel="noreferrer" className="capitalize">
                    {name} ↗
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div>
          <h2 className="font-serif text-4xl">{contact.formTitle}</h2>
          <p className="mt-3 mb-8 text-muted">{contact.formDescription}</p>
          <ContactForm />
        </div>
      </Container>
      {site.contact.mapEmbedUrl ? (
        <Container className="pb-20">
          <h2 className="font-serif text-4xl">{contact.mapTitle}</h2>
          <p className="mt-3 mb-6 text-muted">{contact.mapDescription}</p>
          <iframe
            title={contact.mapTitle ?? "Map"}
            src={site.contact.mapEmbedUrl}
            className="h-[360px] w-full rounded-[1.5rem] border border-line"
            loading="lazy"
          />
        </Container>
      ) : null}
    </>
  );
}
