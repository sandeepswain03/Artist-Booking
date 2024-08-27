"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [status, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setIsLoading(true);

    if (!email) {
      setError("Email is required");
      setIsLoading(false);
      return;
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("email", email);

    try {
      const response = await axios.post("/api/forget-password", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        setSuccessMessage(
          "Password reset email sent. Please check your inbox."
        );
        setEmail("");
        // Redirect to sign-in page after successful email send
        setTimeout(() => {
          router.push("/sign-in");
        }, 2000); // Wait for 2 seconds before redirecting
      } else {
        setError(response.data.message || "Something went wrong");
      }
    } catch (err) {
      console.error("Error during sending email:", err);
      setError("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white px-6 sm:px-10 py-8 rounded-sm shadow-md"
      >
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl sm:text-3xl font-semibold">
              Forgot Password?
            </h1>
            <p className="text-gray-400 text-sm sm:text-base">
              Enter your email address to reset your password
            </p>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-gray-600 text-sm font-medium"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              className="w-full rounded-sm border border-gray-300 bg-transparent py-2 px-3 outline-none text-gray-600 focus:border-[#CE1446] focus:ring-1 focus:ring-[#CE1446] transition-all duration-300"
              placeholder="Enter Email Address"
              required
            />
          </div>
        </div>
        {error && <div className="mt-4 text-red-500 text-sm">{error}</div>}
        {successMessage && (
          <div className="mt-4 text-green-500 text-sm">{successMessage}</div>
        )}
        <button
          type="submit"
          className="mt-6 w-full bg-[#CE1446] text-white py-2 px-4 rounded-sm text-sm sm:text-base font-medium tracking-wide hover:bg-[#B01238] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>
    </div>
  );
}
