"use server";

import { createClient } from "@/utils/supabase/supabaseServer";
import { cookies } from "next/headers";

export type NewsletterState = {
  message: string;
  type: "success" | "error" | "idle" | "require_captcha";
};

export async function subscribeToNewsletter(
  prevState: NewsletterState,
  formData: FormData
): Promise<NewsletterState> {
  const email = formData.get("email");
  const cookieStore = await cookies();
  const attemptsCookie = cookieStore.get("newsletter_attempts");
  const attempts = attemptsCookie ? parseInt(attemptsCookie.value) : 0;

  // 1. Honeypot Check
  const honeypot = formData.get("company_website");
  if (honeypot && typeof honeypot === "string" && honeypot.length > 0) {
    return {
      message: "Successfully subscribed to our newsletter!",
      type: "success",
    };
  }

  // 2. Spam Check (Rate Limiting)
  // If user has tried more than once (attempts > 0), require captcha
  const mathAnswer = formData.get("math_answer");
  const num1 = formData.get("math_num1");
  const num2 = formData.get("math_num2");

  if (attempts > 0) {
    // If attempts > 0, we MUST have a valid captcha
    if (
      !mathAnswer ||
      !num1 ||
      !num2 ||
      parseInt(mathAnswer.toString()) !==
        parseInt(num1.toString()) + parseInt(num2.toString())
    ) {
      // If captcha is missing or wrong, ask for it
      return {
        message: "Please complete the security check.",
        type: "require_captcha",
      };
    }
  }

  // Basic validation
  if (!email || typeof email !== "string") {
    cookieStore.set("newsletter_attempts", (attempts + 1).toString(), {
      maxAge: 60 * 60,
      path: "/",
    });
    return { message: "Invalid email address", type: "error" };
  }

  // Regex validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    cookieStore.set("newsletter_attempts", (attempts + 1).toString(), {
      maxAge: 60 * 60,
      path: "/",
    });
    return { message: "Please enter a valid email address", type: "error" };
  }

  const supabase = createClient();

  try {
    // Check if email exists
    const { data: existing, error: checkError } = await supabase
      .from("newsletter")
      .select("id")
      .eq("email", email)
      .single();

    if (existing) {
      // Increment attempts on failure too, to discourage brute force
      cookieStore.set("newsletter_attempts", (attempts + 1).toString(), {
        maxAge: 60 * 60, // 1 hour
        path: "/",
      });
      return { message: "This email is already subscribed.", type: "error" };
    }

    if (checkError && checkError.code !== "PGRST116") {
      console.error("Check error:", checkError);
      cookieStore.set("newsletter_attempts", (attempts + 1).toString(), {
        maxAge: 60 * 60,
        path: "/",
      });
      return { message: "An error occurred. Please try again.", type: "error" };
    }

    // Insert
    const { error: insertError } = await supabase
      .from("newsletter")
      .insert({ email });

    if (insertError) {
      console.error("Insert error:", insertError);
      cookieStore.set("newsletter_attempts", (attempts + 1).toString(), {
        maxAge: 60 * 60,
        path: "/",
      });
      return {
        message: "Failed to subscribe. Please try again.",
        type: "error",
      };
    }

    // Reset attempts on success?
    // Or keep them to prevent spamming from same user?
    // Let's reset for a good user experience, but maybe keep if we want strict anti-spam.
    // Resetting is better for UX.
    cookieStore.set("newsletter_attempts", "0", {
      maxAge: 60 * 60,
      path: "/",
    });

    return {
      message: "Successfully subscribed to our newsletter!",
      type: "success",
    };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { message: "An unexpected error occurred.", type: "error" };
  } finally {
    // If we didn't reset above (e.g. error cases), ensure we increment
    // Logic: If we are returning success, we reset.
    // If we are returning error, we increment.
    // But we can't easily do it in `finally` because we returned already.
    // So I handled it inline above.
    
    // Actually, for the first attempt case (where we didn't require captcha),
    // if it fails (e.g. invalid email), we should increment so next time they see captcha.
    // If it succeeds, we reset.
    
    // Note: If I didn't return above, I need to make sure I increment attempts if it wasn't a success.
    // But I already handled the existing email case.
    // Let's ensure we increment if we pass the initial checks but fail later?
    // Actually, simply:
    // If we are here and not returning success, we should probably increment.
    // But since I return early, I need to make sure I call set cookie before returning error.
    // I added it for the "existing" case.
    
    // What if it was the first attempt (attempts=0), and we processed it?
    // If it succeeds -> reset to 0 (or keep 0).
    // If it fails (e.g. insert error) -> increment.
    
    // I should add `cookieStore.set` before other error returns.
  }
}
