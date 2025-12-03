"use server";

import { createClient } from "@/utils/supabase/supabaseServer";
import { cookies } from "next/headers";

export type ContactState = {
  message: string;
  type: "success" | "error" | "idle" | "require_captcha";
};

export async function submitContactForm(
  prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const name = formData.get("name");
  const email = formData.get("email");
  const description = formData.get("description");
  
  const cookieStore = await cookies();
  const attemptsCookie = cookieStore.get("contact_attempts");
  const attempts = attemptsCookie ? parseInt(attemptsCookie.value) : 0;

  // 1. Honeypot Check
  const honeypot = formData.get("company_website");
  if (honeypot && typeof honeypot === "string" && honeypot.length > 0) {
    return {
      message: "Message sent successfully!",
      type: "success",
    };
  }

  // 2. Spam Check (Rate Limiting)
  if (attempts > 0) {
    const mathAnswer = formData.get("math_answer");
    const num1 = formData.get("math_num1");
    const num2 = formData.get("math_num2");

    if (
      !mathAnswer ||
      !num1 ||
      !num2 ||
      parseInt(mathAnswer.toString()) !==
        parseInt(num1.toString()) + parseInt(num2.toString())
    ) {
      return {
        message: "Please complete the security check.",
        type: "require_captcha",
      };
    }
  }

  // Basic validation
  if (!name || typeof name !== "string" || name.trim().length === 0) {
    incrementAttempts(cookieStore, attempts);
    return { message: "Please enter your name", type: "error" };
  }

  if (!email || typeof email !== "string") {
    incrementAttempts(cookieStore, attempts);
    return { message: "Invalid email address", type: "error" };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    incrementAttempts(cookieStore, attempts);
    return { message: "Please enter a valid email address", type: "error" };
  }

  if (!description || typeof description !== "string" || description.trim().length === 0) {
    incrementAttempts(cookieStore, attempts);
    return { message: "Please enter a message", type: "error" };
  }

  const supabase = createClient();

  try {
    // Insert into contacts table
    const { error: insertError } = await supabase
      .from("contacts")
      .insert({ 
        name, 
        email, 
        description 
      });

    if (insertError) {
      console.error("Insert error:", insertError);
      incrementAttempts(cookieStore, attempts);
      return {
        message: "Failed to send message. Please try again.",
        type: "error",
      };
    }

    // Reset attempts on success
    cookieStore.set("contact_attempts", "0", {
      maxAge: 60 * 60,
      path: "/",
    });

    return {
      message: "Message sent successfully! We will get back to you soon.",
      type: "success",
    };
  } catch (error) {
    console.error("Unexpected error:", error);
    incrementAttempts(cookieStore, attempts);
    return { message: "An unexpected error occurred.", type: "error" };
  }
}


type CookieStore = Awaited<ReturnType<typeof cookies>>;

function incrementAttempts(cookieStore: CookieStore, currentAttempts: number) {
  cookieStore.set("contact_attempts", (currentAttempts + 1).toString(), {
    maxAge: 60 * 60, // 1 hour
    path: "/",
  });
}
