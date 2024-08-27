"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "@/components/svgIcons";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordShow, setPasswordShow] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const result = await signIn("credentials", {
        redirect: false,
        identifier: email,
        password,
      });
      
      // is ValidEmail 
      if (!isValidEmail(email)) {
        setError("Please enter a valid email address");
        return;
      }

      if (result?.error) {
        setError(
          result.error === "CredentialsSignin"
            ? "Incorrect email or password"
            : result.error
        );
      } else if (result?.url) {
        router.replace("/");
      }
    } catch (error:any) {
     
      console.error(error.response?.data.message || "Error during sign-up:", error); 
      setError(error.response?.data.message || "An error occurred during sign-up");
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
            <h1 className="text-2xl sm:text-3xl font-semibold">Welcome back</h1>
            <p className="text-gray-400 text-sm sm:text-base">
              Sign in to your account
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-sm border border-gray-300 bg-transparent py-2 px-3 outline-none text-gray-600 focus:border-[#CE1446] focus:ring-1 focus:ring-[#CE1446] transition-all duration-300"
              placeholder="Enter Email Address"
              required
            />
          </div>
          <div className="relative">
            <label
              htmlFor="password"
              className="block mb-2 text-gray-600 text-sm font-medium"
            >
              Password
            </label>
            <input
              type={passwordShow ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-sm border border-gray-300 bg-transparent py-2 px-3 outline-none text-gray-600 focus:border-[#CE1446] focus:ring-1 focus:ring-[#CE1446] transition-all duration-300"
              placeholder="Enter Password"
              required
            />
            <button
              type="button"
              onClick={() => setPasswordShow(!passwordShow)}
              className="absolute top-[38px] text-gray-500 right-3 cursor-pointer select-none"
            >
              {passwordShow ? <Eye /> : <EyeOff />}
            </button>
          </div>
          <Link
            href="/forget-password"
            className="text-sm text-[#CE1446] hover:underline block text-right mt-2"
          >
            Forgot Password?
          </Link>
        </div>
        {error && <div className="mt-4 text-red-500 text-sm">{error}</div>}
        <button
          type="submit"
          className="mt-6 w-full bg-[#CE1446] text-white py-2 px-4 rounded-sm text-sm sm:text-base font-medium tracking-wide hover:bg-[#B01238] transition-colors duration-300"
        >
          Sign In
        </button>
        <div className="mt-6 text-sm text-center">
          Don't have an account?
          <Link
            href="/sign-up"
            className="font-medium text-[#CE1446] hover:underline ml-1"
          >
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}
