import type { Testimonial } from "@/types";

interface TestimonialCardProps {
  item: Testimonial;
}

export function TestimonialCard({ item }: TestimonialCardProps) {
  return (
    <blockquote className="h-full border border-line bg-surface p-6">
      <p className="font-serif text-2xl leading-snug">“{item.quote}”</p>
      <footer className="mt-6 text-sm">
        <cite className="not-italic font-semibold">{item.name}</cite>
        <span className="mt-1 block text-muted">
          {[item.role, item.company].filter(Boolean).join(" · ")}
        </span>
      </footer>
    </blockquote>
  );
}
