"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordShow, setPasswordShow] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear any previous errors

    const result = await signIn("credentials", {
      redirect: false,
      identifier: email,
      password: password,
    });

    if (result?.error) {
      if (result.error === "CredentialsSignin") {
        setError("Incorrect email or password");
      } else {
        setError(result.error);
      }
    } else if (result?.url) {
      router.replace("/");
    }
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="bg-white px-6 sm:px-10 py-8 rounded-lg shadow-md w-full">
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-2xl sm:text-3xl font-semibold">Welcome back</h1>
              <p className="text-gray-400 text-sm sm:text-base">Sign in to your account</p>
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
                className="w-full rounded-lg border border-gray-300 bg-transparent py-2 px-3 outline-none text-gray-600 focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200"
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
                className="w-full rounded-lg border border-gray-300 bg-transparent py-2 px-3 outline-none text-gray-600 focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200"
                placeholder="Enter Password"
                required
              />
              <button
                type="button"
                onClick={() => setPasswordShow(!passwordShow)}
                className="absolute top-[38px] text-gray-500 right-3 cursor-pointer select-none"
              >
                {passwordShow ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </button>
            </div>
          </div>
          {error && <div className="mt-4 text-red-500 text-sm">{error}</div>}
          <button
            type="submit"
            className="mt-6 w-full bg-[#CE1446] text-white py-2 px-4 rounded-md text-sm sm:text-base font-medium tracking-wide hover:bg-[#B01238] transition-colors duration-200"
          >
            Sign In
          </button>
          <div className="mt-6 text-sm text-center">
            Don't have an account?
            <Link href="/sign-up" className="font-medium text-[#CE1446] hover:underline ml-1">
              Sign up
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
