"use server";

export type NewsletterResult = {
  success: boolean;
  message: string;
};

export async function subscribeToNewsletter(email: string): Promise<NewsletterResult> {
  try {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        success: false,
        message: "Please enter a valid email address",
      };
    }

    // TODO: Integrate with newsletter service (e.g., Mailchimp, ConvertKit, etc.)
    // For now, just log the subscription
    console.log("Newsletter subscription:", email);

    return {
      success: true,
      message: "Thank you for subscribing! Check your email for confirmation.",
    };
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    return {
      success: false,
      message: "An error occurred. Please try again later.",
    };
  }
}
