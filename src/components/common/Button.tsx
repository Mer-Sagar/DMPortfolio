import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { CtaLink } from "@/types";

interface ButtonProps {
  href?: string;
  label: string;
  variant?: CtaLink["variant"];
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  showArrow?: boolean;
}

const variants: Record<string, string> = {
  primary:
    "bg-primary text-secondary hover:bg-[#24355a] border border-transparent",
  secondary:
    "bg-secondary text-ink border border-line hover:border-primary",
  ghost: "bg-transparent text-ink border border-transparent hover:border-line",
};

export function Button({
  href,
  label,
  variant = "primary",
  type = "button",
  onClick,
  disabled,
  className = "",
  showArrow = true,
}: ButtonProps) {
  const classes = `inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold tracking-wide transition-all duration-300 ${variants[variant ?? "primary"]} ${disabled ? "opacity-60 pointer-events-none" : ""} ${className}`;

  const content = (
    <>
      <span>{label}</span>
      {showArrow ? <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /> : null}
    </>
  );

  if (href?.startsWith("#") || href?.startsWith("http") || href?.startsWith("mailto") || href?.startsWith("tel")) {
    return (
      <a href={href} className={`group ${classes}`}>
        {content}
      </a>
    );
  }

  if (href) {
    return (
      <Link to={href} className={`group ${classes}`}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`group ${classes}`}>
      {content}
    </button>
  );
}
