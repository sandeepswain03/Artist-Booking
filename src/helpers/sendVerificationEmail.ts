import VerificationEmail from "../../emails/VerificationEmail";
import { resend } from "../lib/resend";

export async function sendVerificationEmail(
  email: string,
  username: string,
  resetUrl: string
): Promise<{ success: boolean; message: string }> {
  try {
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      subject: "Artist Booking Reset Email ✨",
      react: VerificationEmail({ username, otp: resetUrl }),
    });
    return { success: true, message: "Verification email sent successfully." };
  } catch (emailError) {
    console.error("Error sending verification email:", emailError);
    return { success: false, message: "Failed to send verification email." };
  }
}
