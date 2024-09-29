import VerificationEmail2 from "../../emails/VerificationEmail2";
import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function sendVerificationEmail2(
    email: string,
    username: string,
    verifyCode: string
): Promise<{ success: boolean; message: string }> {
    try {
        await resend.emails.send({
            from: "Acme <onboarding@resend.dev>",
            to: [email],
            subject: "Event Duniya Verification Code ✨",
            react: VerificationEmail2({ username, otp: verifyCode }),
        });
        return { success: true, message: "Verification email sent successfully." };
    } catch (emailError) {
        console.error("Error sending verification email:", emailError);
        return { success: false, message: "Failed to send verification email." };
    }
}
