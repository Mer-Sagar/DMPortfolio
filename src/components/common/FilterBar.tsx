interface FilterBarProps {
  items: string[];
  active: string;
  onChange: (value: string) => void;
  label?: string;
}

export function FilterBar({ items, active, onChange, label = "Filter" }: FilterBarProps) {
  if (!items.length) return null;

  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-[0.16em] text-muted sm:hidden" htmlFor={`${label}-select`}>
        {label}
      </label>
      <select
        id={`${label}-select`}
        className="h-12 w-full rounded-full border border-line bg-secondary px-4 text-sm sm:hidden"
        value={active}
        onChange={(event) => onChange(event.target.value)}
      >
        {items.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <div className="hidden flex-wrap gap-2 sm:flex" role="tablist" aria-label={label}>
        {items.map((item) => {
          const isActive = item === active;
          return (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(item)}
              className={`rounded-full border px-3.5 py-2 text-xs font-semibold tracking-wide transition ${
                isActive ? "border-primary bg-primary text-secondary" : "border-line bg-secondary text-ink hover:border-primary"
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
}
