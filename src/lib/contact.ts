import type { ContactFormPayload } from "@/types";

export interface SubmitResult {
  ok: boolean;
  message?: string;
}

/**
 * Abstracted contact submission.
 * Replace the body of this function with a real API call.
 */
export async function submitContactForm(payload: ContactFormPayload): Promise<SubmitResult> {
  await new Promise((resolve) => setTimeout(resolve, 700));

  if (!payload.email || !payload.name || !payload.message) {
    return { ok: false, message: "Missing required fields." };
  }

  if (import.meta.env.DEV) {
    console.info("[contact] payload ready for API", payload);
  }

  return { ok: true };
}

export function validateEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function validatePhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}
