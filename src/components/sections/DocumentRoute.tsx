import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/common/Container";
import { getIcon } from "@/lib/icons";
import type { PipelineData } from "@/types";

interface DocumentRouteProps {
  data: PipelineData;
}

export function DocumentRoute({ data }: DocumentRouteProps) {
  if (!data.items.length) return null;

  return (
    <section className="bg-white pb-16 sm:pb-24">
      <Container>
        <Reveal>
          <h2 className="font-serif text-[clamp(2.15rem,1.4rem+3.2vw,3.4rem)] font-semibold tracking-tight text-slate-900">
            {data.title}
          </h2>
        </Reveal>
        {data.description ? (
          <Reveal delay={0.06}>
            <p className="mt-3 max-w-2xl text-[15px] text-slate-500">{data.description}</p>
          </Reveal>
        ) : null}

        <div className="relative mt-10">
          <div className="absolute left-[10%] right-[10%] top-11 hidden border-t border-dashed border-slate-200 md:block" />
          <div className="grid gap-5 md:grid-cols-3">
            {data.items.map((item, index) => {
              const Icon = getIcon(item.icon);
              return (
                <Reveal key={item.id} delay={index * 0.1}>
                  <article className="relative rounded-xl border border-slate-200 bg-white p-7 shadow-[0_1px_0_rgba(15,23,42,0.02)]">
                    <div className="flex items-start justify-between">
                      <span className="grid h-9 w-9 place-items-center rounded-md bg-slate-900 text-white">
                        <Icon className="h-4 w-4" aria-hidden />
                      </span>
                      <span className="select-none font-serif text-5xl leading-none text-slate-200">{item.letter}</span>
                    </div>
                    <h3 className="mt-8 text-xl font-extrabold tracking-tight text-slate-900">{item.title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-slate-500">{item.description}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
