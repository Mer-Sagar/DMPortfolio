import type { ProcessStep } from "@/types";

interface ProcessTimelineProps {
  steps: ProcessStep[];
}

export function ProcessTimeline({ steps }: ProcessTimelineProps) {
  if (!steps.length) return null;

  return (
    <ol className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
      {steps.map((step) => (
        <li key={step.id} className="bg-background p-6 sm:p-8">
          <p className="eyebrow">Stage {step.number}</p>
          <h3 className="mt-6 font-serif text-3xl">{step.title}</h3>
          <p className="mt-4 text-sm text-muted">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
