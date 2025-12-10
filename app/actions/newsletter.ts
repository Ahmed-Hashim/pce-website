"use server";

import { createClient } from "@/utils/supabase/supabaseServer";
import { cookies } from "next/headers";
import {
  newsletterFormSchema,
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

// Re-export for backward compatibility
export type NewsletterState = FormActionState;

// =============================================================================
// Helpers
// =============================================================================

/**
 * Increments the spam attempt counter
 */
function incrementAttempts(cookieStore: CookieStore, currentAttempts: number): void {
  cookieStore.set("newsletter_attempts", (currentAttempts + 1).toString(), {
    maxAge: 60 * 60, // 1 hour
    path: "/",
  });
}

/**
 * Resets the spam attempt counter
 */
function resetAttempts(cookieStore: CookieStore): void {
  cookieStore.set("newsletter_attempts", "0", {
    maxAge: 60 * 60,
    path: "/",
  });
}

// =============================================================================
// Server Action
// =============================================================================

/**
 * Subscribes an email to the newsletter with spam protection and validation.
 * 
 * Features:
 * - Honeypot field detection for bots
 * - Math captcha after first failed attempt
 * - Zod schema validation
 * - Duplicate email detection
 * - Rate limiting via cookies
 * 
 * @param prevState - Previous form state (for useActionState)
 * @param formData - Form data from submission
 * @returns Updated form state with success/error message
 */
export async function subscribeToNewsletter(
  prevState: NewsletterState,
  formData: FormData
): Promise<NewsletterState> {
  const cookieStore = await cookies();
  const attemptsCookie = cookieStore.get("newsletter_attempts");
  const attempts = attemptsCookie ? parseInt(attemptsCookie.value) : 0;

  // 1. Honeypot Check - Silently accept to fool bots
  if (isHoneypotFilled(formData)) {
    return successState("Successfully subscribed to our newsletter!");
  }

  // 2. Captcha Check - Required after first failed attempt
  if (attempts > 0 && !validateMathCaptcha(formData)) {
    return captchaRequiredState();
  }

  // 3. Validate Form Data with Zod
  const parsed = parseFormData(newsletterFormSchema, formData);

  if (!parsed.success) {
    incrementAttempts(cookieStore, attempts);
    return errorState(parsed.firstError, parsed.errors);
  }

  const { email } = parsed.data;

  // 4. Check for existing subscription & Submit to Database
  const supabase = await createClient();

  try {
    // Check if email already exists
    const { data: existing, error: checkError } = await supabase
      .from("newsletter")
      .select("id")
      .eq("email", email)
      .single();

    if (existing) {
      incrementAttempts(cookieStore, attempts);
      return errorState("This email is already subscribed.");
    }

    // PGRST116 = no rows found (expected for new emails)
    if (checkError && checkError.code !== "PGRST116") {
      console.error("Newsletter check error:", checkError);
      incrementAttempts(cookieStore, attempts);
      return errorState("An error occurred. Please try again.");
    }

    // Insert new subscription
    const { error: insertError } = await supabase
      .from("newsletter")
      .insert({ email });

    if (insertError) {
      console.error("Newsletter insert error:", insertError);
      incrementAttempts(cookieStore, attempts);
      return errorState("Failed to subscribe. Please try again.");
    }

    // Success - reset attempts
    resetAttempts(cookieStore);
    return successState("Successfully subscribed to our newsletter!");

  } catch (error) {
    console.error("Newsletter unexpected error:", error);
    incrementAttempts(cookieStore, attempts);
    return errorState("An unexpected error occurred. Please try again.");
  }
}
