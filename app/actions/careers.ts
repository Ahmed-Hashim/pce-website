"use server";

import { createClient } from "@/utils/supabase/supabaseServer";
// import { cookies } from "next/headers";

export type CareerApplicationState = {
  message: string;
  type: "success" | "error" | "idle";
};

export async function submitCareerApplication(
  prevState: CareerApplicationState,
  formData: FormData
): Promise<CareerApplicationState> {
  const fullName = formData.get("full_name");
  const email = formData.get("email");
  const phone = formData.get("phone_number");
  const cvLink = formData.get("cv_url");
  const message = formData.get("message");
  const careerIdRaw = formData.get("career_id");
  const careerId = careerIdRaw ? parseInt(careerIdRaw.toString()) : null;

  // 1. Honeypot Check
  const honeypot = formData.get("company_website");
  if (honeypot && typeof honeypot === "string" && honeypot.length > 0) {
    // Return success to fool the bot, but don't insert anything
    return {
      message: "Application submitted successfully!",
      type: "success",
    };
  }

  // Basic validation
  if (!fullName || typeof fullName !== "string" || fullName.trim().length === 0) {
    return { message: "Please enter your full name", type: "error" };
  }

  if (!email || typeof email !== "string") {
    return { message: "Invalid email address", type: "error" };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { message: "Please enter a valid email address", type: "error" };
  }

  if (!phone || typeof phone !== "string") {
    return { message: "Please enter your phone number", type: "error" };
  }

  if (!cvLink || typeof cvLink !== "string" || cvLink.trim().length === 0) {
    return { message: "Please provide a link to your CV", type: "error" };
  }

  const supabase = createClient();

  try {
    const { error: insertError } = await supabase
      .from("career_applications")
      .insert({
        full_name: fullName,
        email,
        phone_number: phone,
        cv_url: cvLink,
        message: message as string | null,
        career_id: careerId,
      });

    if (insertError) {
      console.error("Insert error:", insertError);
      return {
        message: "Failed to submit application. Please try again.",
        type: "error",
      };
    }

    return {
      message: "Application submitted successfully!",
      type: "success",
    };
  } catch (err) {
    console.error("Unexpected error:", err);
    return {
      message: "An unexpected error occurred.",
      type: "error",
    };
  }
}
