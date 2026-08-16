import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/common/Container";
import type { ProcessData } from "@/types";

interface ProcessStagesProps {
  data: ProcessData;
}

export function ProcessStages({ data }: ProcessStagesProps) {
  if (!data.steps.length) return null;

  return (
    <section className="bg-white py-16 sm:py-24">
      <Container>
        <div className="grid gap-6 border-b border-slate-200 pb-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <Reveal>
            <h2 className="poster max-w-[12ch]">{data.title}</h2>
          </Reveal>
          {data.description ? (
            <Reveal delay={0.08}>
              <p className="serif-kicker max-w-md lg:justify-self-end lg:text-right">{data.description}</p>
            </Reveal>
          ) : null}
        </div>

        <div className="relative mt-12">
          <div className="absolute left-0 right-0 top-1.5 hidden h-px bg-slate-200 md:block" />
          <ol className="grid gap-12 md:grid-cols-4 md:gap-8">
            {data.steps.map((step, index) => (
              <Reveal key={step.id} delay={index * 0.1} className={index % 2 === 1 ? "md:mt-16" : ""}>
                <li>
                  <span className="mb-5 block h-2.5 w-2.5 rounded-full bg-slate-900" />
                  <p className="font-serif text-[11px] uppercase tracking-[0.22em] text-slate-500">Stage {step.number}</p>
                  <h3 className="mt-3 text-xl font-extrabold tracking-tight text-slate-900">{step.title}</h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-slate-500">{step.description}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
