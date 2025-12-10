"use server";

import { createClient } from "@/utils/supabase/supabaseServer";
import {
  careerApplicationSchema,
  parseFormData,
  isHoneypotFilled,
  successState,
  errorState,
  type FormActionState,
} from "@/lib/validations";

// =============================================================================
// Types
// =============================================================================

// Re-export for backward compatibility
export type CareerApplicationState = FormActionState;

// =============================================================================
// Server Action
// =============================================================================

/**
 * Submits a career application with spam protection and Zod validation.
 * 
 * Features:
 * - Honeypot field detection for bots
 * - Zod schema validation with field-level errors
 * - Support for optional career_id (specific job application)
 * 
 * @param prevState - Previous form state (for useActionState)
 * @param formData - Form data from submission
 * @returns Updated form state with success/error message
 */
export async function submitCareerApplication(
  prevState: CareerApplicationState,
  formData: FormData
): Promise<CareerApplicationState> {
  // 1. Honeypot Check - Silently accept to fool bots
  if (isHoneypotFilled(formData)) {
    return successState("Application submitted successfully!");
  }

  // 2. Validate Form Data with Zod
  const parsed = parseFormData(careerApplicationSchema, formData);

  if (!parsed.success) {
    return errorState(parsed.firstError, parsed.errors);
  }

  const { full_name, email, phone_number, cv_url, message, career_id } = parsed.data;

  // 3. Submit to Database
  const supabase = await createClient();

  try {
    const { error: insertError } = await supabase
      .from("career_applications")
      .insert({
        full_name,
        email,
        phone_number,
        cv_url,
        message: message ?? null,
        career_id: career_id ?? null,
      });

    if (insertError) {
      console.error("Career application insert error:", insertError);
      return errorState("Failed to submit application. Please try again.");
    }

    return successState("Application submitted successfully! We will review your application and get back to you.");

  } catch (error) {
    console.error("Career application unexpected error:", error);
    return errorState("An unexpected error occurred. Please try again.");
  }
}
