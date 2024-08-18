"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear any previous errors
    const result = await signIn('credentials', {
      redirect: false,
      identifier: email,
      password: password,
    });

    if (result?.error) {
      if (result.error === 'CredentialsSignin') {
        setError('Incorrect username or password');
      } else {
        setError(result.error);
      }
    } else if (result?.url) {
      router.replace('/dashboard');
    }
  };

  return (
    <div className="container mx-auto px-4 m-12 max-w-md">
      <h2 className="text-3xl font-bold mb-8 text-center text-[#4A3F6A]">
        Sign In
      </h2>
      <div className="bg-[#5E4B88] shadow-lg rounded-xl p-8">
        <div className="text-center">
          <p className="text-sm text-[#EAD8FF] mb-6">
            Don't have an account?{" "}
            <a
              className="text-[#BCA7E7] underline hover:text-white"
              href="/sign-up"
            >
              Sign up here
            </a>
          </p>
        </div>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="grid gap-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold mb-2 text-[#EAD8FF]"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[#BCA7E7] focus:outline-none focus:ring-2 focus:ring-[#8F75E5]"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold mb-2 text-[#EAD8FF]"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[#BCA7E7] focus:outline-none focus:ring-2 focus:ring-[#8F75E5]"
                required
              />
            </div>
            <button
              type="submit"
              className="px-8 py-3 text-white rounded-lg bg-gradient-to-r from-[#8F75E5] to-[#674188] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8F75E5]"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
