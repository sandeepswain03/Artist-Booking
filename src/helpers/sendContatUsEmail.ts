import ContactUsEmail from "../../emails/ContactUsEmail";
import { resend } from "../lib/resend";

export async function sendContactUsEmail(
  email: string,
  subject: string,
  message: string
): Promise<{ success: boolean; message: string }> {
  try {
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["sandeepswain2004@gmail.com"],
      subject: subject,
      react: ContactUsEmail({ userEmail: email, subject, message }),
    });
    return { success: true, message: "Verification email sent successfully." };
  } catch (emailError) {
    console.error("Error sending verification email:", emailError);
    return { success: false, message: "Failed to send verification email." };
  }
}
