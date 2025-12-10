/**
 * Shared types and Zod validation schemas for server actions.
 * Provides consistent validation patterns and ActionResult type for error handling.
 */

import { z } from "zod";

// =============================================================================
// ActionResult Type (Discriminated Union for Error Handling)
// =============================================================================

/**
 * Generic result wrapper for consistent error handling across all server actions.
 * Uses discriminated union pattern for type-safe error checking.
 */
export type ActionResult<T> =
    | { data: T; error: null }
    | { data: null; error: string };

// =============================================================================
// Form Action State Type
// =============================================================================

/**
 * Standard state type for form actions.
 * Used with useActionState for progressive enhancement.
 */
export type FormActionState = {
    message: string;
    type: "success" | "error" | "idle" | "require_captcha";
    fieldErrors?: Record<string, string[]>;
};

/**
 * Creates an initial idle state for forms
 */
export const initialFormState: FormActionState = {
    message: "",
    type: "idle",
};

/**
 * Helper to create a success state
 */
export function successState(message: string): FormActionState {
    return { message, type: "success" };
}

/**
 * Helper to create an error state
 */
export function errorState(message: string, fieldErrors?: Record<string, string[]>): FormActionState {
    return { message, type: "error", fieldErrors };
}

/**
 * Helper to create a require_captcha state
 */
export function captchaRequiredState(): FormActionState {
    return { message: "Please complete the security check.", type: "require_captcha" };
}

// =============================================================================
// Common Validation Schemas
// =============================================================================

/**
 * Email validation schema with proper error messages
 */
export const emailSchema = z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(255, "Email is too long");

/**
 * Name validation schema
 */
export const nameSchema = z
    .string()
    .min(1, "Name is required")
    .max(100, "Name is too long")
    .transform((val) => val.trim());

/**
 * Phone validation schema (flexible international format)
 */
export const phoneSchema = z
    .string()
    .min(1, "Phone number is required")
    .max(30, "Phone number is too long")
    .regex(/^[\d\s\-+()]+$/, "Please enter a valid phone number");

/**
 * URL validation schema
 */
export const urlSchema = z
    .string()
    .min(1, "URL is required")
    .url("Please enter a valid URL");

/**
 * Message/description validation schema
 */
export const messageSchema = z
    .string()
    .min(1, "Message is required")
    .max(5000, "Message is too long")
    .transform((val) => val.trim());

/**
 * Optional message schema
 */
export const optionalMessageSchema = z
    .string()
    .max(5000, "Message is too long")
    .transform((val) => val?.trim() || null)
    .nullable()
    .optional();

// =============================================================================
// Form-specific Schemas
// =============================================================================

/**
 * Contact form validation schema
 */
export const contactFormSchema = z.object({
    name: nameSchema,
    email: emailSchema,
    description: messageSchema,
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

/**
 * Newsletter form validation schema
 */
export const newsletterFormSchema = z.object({
    email: emailSchema,
});

export type NewsletterFormData = z.infer<typeof newsletterFormSchema>;

/**
 * Career application form validation schema
 */
export const careerApplicationSchema = z.object({
    full_name: nameSchema,
    email: emailSchema,
    phone_number: phoneSchema,
    cv_url: urlSchema,
    message: optionalMessageSchema,
    career_id: z.coerce.number().int().positive().nullable().optional(),
});

export type CareerApplicationData = z.infer<typeof careerApplicationSchema>;

// =============================================================================
// Validation Helpers
// =============================================================================

/**
 * Safely parses FormData using a Zod schema.
 * Returns either the validated data or formatted field errors.
 */
export function parseFormData<T extends z.ZodTypeAny>(
    schema: T,
    formData: FormData
): { success: true; data: z.infer<T> } | { success: false; errors: Record<string, string[]>; firstError: string } {
    // Convert FormData to object
    const rawData: Record<string, unknown> = {};
    formData.forEach((value, key) => {
        // Skip honeypot and captcha fields
        if (key === "company_website" || key.startsWith("math_")) {
            return;
        }
        rawData[key] = value === "" ? undefined : value;
    });

    const result = schema.safeParse(rawData);

    if (result.success) {
        return { success: true, data: result.data };
    }

    // Format errors
    const fieldErrors: Record<string, string[]> = {};
    let firstError = "Validation failed";

    result.error.issues.forEach((issue) => {
        const path = issue.path.join(".");
        if (!fieldErrors[path]) {
            fieldErrors[path] = [];
        }
        fieldErrors[path].push(issue.message);

        // Track first error for the main message
        if (firstError === "Validation failed") {
            firstError = issue.message;
        }
    });

    return { success: false, errors: fieldErrors, firstError };
}

/**
 * Checks if honeypot field is filled (indicates bot)
 */
export function isHoneypotFilled(formData: FormData): boolean {
    const honeypot = formData.get("company_website");
    return !!(honeypot && typeof honeypot === "string" && honeypot.length > 0);
}

/**
 * Validates math captcha answer
 */
export function validateMathCaptcha(formData: FormData): boolean {
    const mathAnswer = formData.get("math_answer");
    const num1 = formData.get("math_num1");
    const num2 = formData.get("math_num2");

    if (!mathAnswer || !num1 || !num2) {
        return false;
    }

    return (
        parseInt(mathAnswer.toString()) ===
        parseInt(num1.toString()) + parseInt(num2.toString())
    );
}
