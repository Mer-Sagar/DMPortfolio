interface SectionHeaderProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeader({ eyebrow, title, description, align = "left" }: SectionHeaderProps) {
  if (!eyebrow && !title && !description) return null;

  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-4xl"}>
      {eyebrow ? <p className="eyebrow mb-4">{eyebrow}</p> : null}
      {title ? <h2 className="display-md text-ink">{title}</h2> : null}
      {description ? <p className="mt-4 max-w-2xl text-muted">{description}</p> : null}
    </div>
  );
}
