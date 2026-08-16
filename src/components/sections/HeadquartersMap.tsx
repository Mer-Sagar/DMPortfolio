import { MapPin } from "lucide-react";
import { GoldWave } from "@/components/common/GoldWave";
import { Container } from "@/components/common/Container";
import { site } from "@/lib/content";

interface HeadquartersMapProps {
  eyebrow?: string;
  watermark?: string;
}

export function HeadquartersMap({ eyebrow, watermark }: HeadquartersMapProps) {
  const hours = site.workingHours[0];

  return (
    <section className="relative overflow-hidden bg-[#faf8f3] py-16 sm:py-24">
      <GoldWave className="absolute inset-x-0 top-0" />
      {watermark ? (
        <p
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 select-none text-[clamp(4.5rem,16vw,12rem)] font-black uppercase tracking-[-0.06em] text-slate-200/80"
          aria-hidden
        >
          {watermark}
        </p>
      ) : null}
      <Container className="relative z-10 pt-6">
        <div className="grid items-stretch gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="relative">
            <span className="absolute inset-0 translate-x-2.5 translate-y-2.5 bg-[#e2c36b]" aria-hidden />
            <div className="relative h-full bg-white p-8 sm:p-10">
              {eyebrow ? (
                <h2 className="flex items-center gap-2 font-serif text-[2rem] font-semibold tracking-tight text-slate-900 sm:text-[2.35rem]">
                  <MapPin className="h-6 w-6 text-slate-800" strokeWidth={1.6} aria-hidden />
                  {eyebrow}
                </h2>
              ) : null}
              <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">Address</p>
              {site.contact.mapUrl ? (
                <a
                  href={site.contact.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 block max-w-sm font-serif text-[1.15rem] leading-relaxed text-slate-800 hover:underline"
                >
                  {site.contact.address}
                </a>
              ) : (
                <p className="mt-3 max-w-sm font-serif text-[1.15rem] leading-relaxed text-slate-800">{site.contact.address}</p>
              )}
              {hours ? (
                <>
                  <div className="mt-8 h-px bg-slate-200" />
                  <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">{hours.label}</p>
                  <p className="mt-3 font-serif text-[1.05rem] text-slate-800">{hours.value}</p>
                </>
              ) : null}
            </div>
          </article>

          {site.contact.mapEmbedUrl ? (
            <div className="min-h-[280px] overflow-hidden bg-slate-100 shadow-[0_20px_50px_rgba(15,23,42,0.08)] sm:min-h-[360px]">
              <iframe
                title={`${site.brand.name} location`}
                src={site.contact.mapEmbedUrl}
                className="h-full min-h-[280px] w-full border-0 sm:min-h-[360px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
