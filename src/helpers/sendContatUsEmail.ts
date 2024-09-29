import { Resend } from "resend";
import ContactUsEmail from "../../emails/ContactUsEmail";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);
export async function sendContactUsEmail(
  email: string,
  subject: string,
  message: string,
  phone: string
): Promise<{ success: boolean; message: string }> {
  try {
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["sandeepswain2004@gmail.com"],
      subject: subject,
      react: ContactUsEmail({ userEmail: email, subject, message, phone }),
    });
    return { success: true, message: "Contact form submission sent successfully." };
  } catch (emailError) {
    console.error("Error sending contact form submission:", emailError);
    return { success: false, message: "Failed to send contact form submission." };
  }
}
