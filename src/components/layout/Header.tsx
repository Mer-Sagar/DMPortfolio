import { useEffect, useId, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { BrandMark } from "@/components/common/BrandMark";
import { MobileMenu } from "@/components/navigation/MobileMenu";
import { site } from "@/lib/content";
import { visibleNavItems } from "@/lib/navigation";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";

const items = visibleNavItems();

export function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useLockBodyScroll(open);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[60] px-3 pt-3 sm:px-5 sm:pt-4">
      <div className="pointer-events-auto mx-auto flex h-14 max-w-[1280px] items-center justify-between gap-2 rounded-full border border-white/70 bg-[#fffdf8]/92 px-2 shadow-[0_10px_40px_rgba(15,23,42,0.08)] backdrop-blur-md sm:h-[4.25rem] sm:gap-3 sm:px-4">
        <Link to="/" className="flex min-w-0 flex-1 items-center gap-2 rounded-full py-1 pr-2 sm:gap-3" aria-label="Go home">
          <BrandMark />
          <span className="min-w-0">
            <span className="block truncate text-[0.78rem] font-extrabold leading-tight tracking-tight text-[#0f172a] sm:text-[0.95rem]">
              {site.brand.name}
            </span>
            <span className="block truncate text-[0.55rem] uppercase tracking-[0.16em] text-muted sm:text-[0.62rem] sm:tracking-[0.22em]">
              {site.brand.tagline}
            </span>
          </span>
        </Link>
        <button
          ref={buttonRef}
          type="button"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-secondary sm:h-12 sm:w-12"
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      <MobileMenu open={open} items={items} id={panelId} />
    </header>
  );
}
