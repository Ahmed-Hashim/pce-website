"use server";

import { createClient } from "@/utils/supabase/supabaseServer";
import { cookies } from "next/headers";
import {
  contactFormSchema,
  parseFormData,
  isHoneypotFilled,
  validateMathCaptcha,
  successState,
  errorState,
  captchaRequiredState,
  type FormActionState,
} from "@/lib/validations";

// =============================================================================
// Types
// =============================================================================

type CookieStore = Awaited<ReturnType<typeof cookies>>;

// Re-export FormActionState as ContactState for backward compatibility
export type ContactState = FormActionState;

// =============================================================================
// Helpers
// =============================================================================

/**
 * Increments the spam attempt counter
 */
function incrementAttempts(cookieStore: CookieStore, currentAttempts: number): void {
  cookieStore.set("contact_attempts", (currentAttempts + 1).toString(), {
    maxAge: 60 * 60, // 1 hour
    path: "/",
  });
}

/**
 * Resets the spam attempt counter
 */
function resetAttempts(cookieStore: CookieStore): void {
  cookieStore.set("contact_attempts", "0", {
    maxAge: 60 * 60,
    path: "/",
  });
}

// =============================================================================
// Server Action
// =============================================================================

/**
 * Submits a contact form with spam protection and Zod validation.
 * 
 * Features:
 * - Honeypot field detection for bots
 * - Math captcha after first failed attempt
 * - Zod schema validation with field-level errors
 * - Rate limiting via cookies
 * 
 * @param prevState - Previous form state (for useActionState)
 * @param formData - Form data from submission
 * @returns Updated form state with success/error message
 */
export async function submitContactForm(
  prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const cookieStore = await cookies();
  const attemptsCookie = cookieStore.get("contact_attempts");
  const attempts = attemptsCookie ? parseInt(attemptsCookie.value) : 0;

  // 1. Honeypot Check - Silently accept to fool bots
  if (isHoneypotFilled(formData)) {
    return successState("Message sent successfully!");
  }

  // 2. Captcha Check - Required after first failed attempt
  if (attempts > 0 && !validateMathCaptcha(formData)) {
    return captchaRequiredState();
  }

  // 3. Validate Form Data with Zod
  const parsed = parseFormData(contactFormSchema, formData);

  if (!parsed.success) {
    incrementAttempts(cookieStore, attempts);
    return errorState(parsed.firstError, parsed.errors);
  }

  const { name, email, description } = parsed.data;

  // 4. Submit to Database
  const supabase = await createClient();

  try {
    const { error: insertError } = await supabase
      .from("contacts")
      .insert({ name, email, description });

    if (insertError) {
      console.error("Contact form insert error:", insertError);
      incrementAttempts(cookieStore, attempts);
      return errorState("Failed to send message. Please try again.");
    }

    // Success - reset attempts
    resetAttempts(cookieStore);
    return successState("Message sent successfully! We will get back to you soon.");

  } catch (error) {
    console.error("Contact form unexpected error:", error);
    incrementAttempts(cookieStore, attempts);
    return errorState("An unexpected error occurred. Please try again.");
  }
}
