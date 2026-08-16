import { useMemo, useState, type FormEvent } from "react";
import { Button } from "@/components/common/Button";
import { submitContactForm, validateEmail, validatePhone } from "@/lib/contact";
import { contact } from "@/lib/content";
import type { ContactFormPayload } from "@/types";

const empty: ContactFormPayload = {
  name: "",
  email: "",
  phone: "",
  company: "",
  subject: "",
  message: "",
};

export function ContactForm() {
  const [values, setValues] = useState<ContactFormPayload>(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const fields = contact.form.fields;

  const validate = useMemo(
    () => (payload: ContactFormPayload) => {
      const next: Record<string, string> = {};
      for (const field of fields) {
        const raw = payload[field.name as keyof ContactFormPayload] ?? "";
        if (field.required && !String(raw).trim()) {
          next[field.name] = `${field.label} is required.`;
          continue;
        }
        if (field.type === "email" && raw && !validateEmail(String(raw))) {
          next[field.name] = "Enter a valid email.";
        }
        if (field.type === "tel" && raw && !validatePhone(String(raw))) {
          next[field.name] = "Enter a valid phone number.";
        }
      }
      return next;
    },
    [fields],
  );

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setStatus("loading");
    const result = await submitContactForm(values);
    setStatus(result.ok ? "success" : "error");
  }

  if (status === "success") {
    return (
      <div className="border border-line bg-surface p-8" role="status">
        <p className="font-serif text-3xl">Received.</p>
        <p className="mt-3 text-muted">{contact.form.successMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4" noValidate>
      {fields.map((field) => {
        const value = values[field.name as keyof ContactFormPayload] ?? "";
        const error = errors[field.name];
        const shared = {
          id: field.name,
          name: field.name,
          required: field.required,
          placeholder: field.placeholder,
          "aria-invalid": Boolean(error),
          className:
            "w-full rounded-2xl border border-line bg-secondary px-4 py-3 text-sm outline-none focus:border-primary",
        };

        return (
          <div key={field.name} className={field.type === "textarea" ? "sm:col-span-2" : ""}>
            <label htmlFor={field.name} className="mb-2 block text-xs uppercase tracking-[0.16em] text-muted">
              {field.label}
            </label>
            {field.type === "textarea" ? (
              <textarea
                {...shared}
                rows={5}
                value={value}
                onChange={(event) => setValues((current) => ({ ...current, [field.name]: event.target.value }))}
              />
            ) : field.type === "select" ? (
              <select
                {...shared}
                value={value}
                onChange={(event) => setValues((current) => ({ ...current, [field.name]: event.target.value }))}
              >
                <option value="">{field.placeholder ?? "Select"}</option>
                {field.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                {...shared}
                type={field.type}
                value={value}
                onChange={(event) => setValues((current) => ({ ...current, [field.name]: event.target.value }))}
              />
            )}
            {error ? <p className="mt-1 text-sm text-red-700">{error}</p> : null}
          </div>
        );
      })}
      {status === "error" ? <p className="text-sm text-red-700">{contact.form.errorMessage}</p> : null}
      <Button type="submit" label={status === "loading" ? "Sending…" : contact.form.submitLabel} disabled={status === "loading"} />
    </form>
  );
}
