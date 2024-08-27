"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "@/components/svgIcons";
import axios from "axios";

interface User {
  email: string;
}

export default function ResetPassword({
  params,
}: {
  params: { token: string };
}) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [verified, setVerified] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);
  const router = useRouter();
  const { status } = useSession();
  const { token } = params;

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.post("/api/verify-token", { token });
        if (response.data.success) {
          setVerified(true);
          setUser(response.data.user);
        } else {
          setError(response.data.message || "Invalid or expired token");
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        setError("An error occurred while verifying the token");
      } finally {
        setIsVerifying(false);
      }
    };
    verifyToken();
  }, [token]);

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [status, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "password") setPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    setIsLoading(true);

    if (!password || !confirmPassword) {
      setError("Both fields are required");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post("/api/reset-password", {
        password,
        email: user?.email,
      });

      if (response.data.success) {
        setSuccessMessage(
          "Password reset successfully. Redirecting to sign in page..."
        );
        setPassword("");
        setConfirmPassword("");
        setTimeout(() => {
          router.push("/sign-in");
        }, 3000);
      } else {
        setError(response.data.message || "Failed to reset password");
      }
    } catch (err) {
      console.error("Error during password reset:", err);
      setError("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isVerifying) {
    return (
      <div className="flex justify-center items-center w-full min-h-screen p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#CE1446] mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying token...</p>
        </div>
      </div>
    );
  }

  if (!verified) {
    return (
      <div className="flex justify-center items-center w-full min-h-screen p-4">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-semibold mb-4">
            Invalid or Expired Token
          </h1>
          <p className="text-gray-600">
            The password reset link is invalid or has expired. Please request a
            new one.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center w-full min-h-screen p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white px-6 sm:px-10 py-8 rounded-sm shadow-md"
      >
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl sm:text-3xl font-semibold">
              Reset Password
            </h1>
            <p className="text-gray-400 text-sm sm:text-base">
              Enter your new password
            </p>
          </div>
          <div className="relative">
            <label
              htmlFor="password"
              className="block mb-2 text-gray-600 text-sm font-medium"
            >
              New Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              className="w-full rounded-sm border border-gray-300 bg-transparent py-2 px-3 outline-none text-gray-600 focus:border-[#CE1446] focus:ring-1 focus:ring-[#CE1446] transition-all duration-300"
              placeholder="Enter new password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-[38px] right-3 text-gray-500 cursor-pointer"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
          <div className="relative">
            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-gray-600 text-sm font-medium"
            >
              Confirm New Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              className="w-full rounded-sm border border-gray-300 bg-transparent py-2 px-3 outline-none text-gray-600 focus:border-[#CE1446] focus:ring-1 focus:ring-[#CE1446] transition-all duration-300"
              placeholder="Confirm new password"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute top-[38px] right-3 text-gray-500 cursor-pointer"
            >
              {showConfirmPassword ? <EyeOff /> : <Eye />}
            </button>
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
          {isLoading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}
