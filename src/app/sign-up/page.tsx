"use client";
import Link from "next/link";
import { useState } from "react";

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
    avatar: null as File | null,
    bio: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, avatar: e.target.files?.[0] || null });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const { username, email, password, role, bio, avatar } = formData;

    if (!username || !email || !password || !avatar || !role) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("username", username);
    formDataToSend.append("email", email);
    formDataToSend.append("password", password);
    formDataToSend.append("role", role);
    formDataToSend.append("avatar", avatar);

    try {
      const response = await fetch("/api/sign-up", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("User registered successfully!");
        setFormData({
          username: "",
          email: "",
          password: "",
          role: "user",
          avatar: null,
          bio: "",
        });
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred during sign-up");
    }

    setLoading(false);
  };

  return (
    <>
      <div className="container mx-auto px-4 m-12 max-w-md">
        <h2 className="text-3xl font-bold mb-8 text-center text-[#4A3F6A]">
          Sign Up
        </h2>
        <div className="bg-[#5E4B88] shadow-lg rounded-xl p-8">
          <div className="text-center mb-6">
            <p className="text-sm text-[#EAD8FF]">
              Already have an account?{" "}
              <a
                className="text-[#BCA7E7] underline hover:text-white"
                href="/sign-in"
              >
                Sign in here
              </a>
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-semibold mb-2 text-[#EAD8FF]"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-[#BCA7E7] focus:outline-none focus:ring-2 focus:ring-[#8F75E5]"
                required
              />
            </div>
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
                value={formData.email}
                onChange={handleChange}
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
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-[#BCA7E7] focus:outline-none focus:ring-2 focus:ring-[#8F75E5]"
                required
              />
            </div>
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-semibold mb-2 text-[#EAD8FF]"
              >
                Role
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-[#BCA7E7] focus:outline-none focus:ring-2 focus:ring-[#8F75E5]"
                required
              >
                <option value="user">User</option>
                <option value="artist">Artist</option>
              </select>
            </div>
            {formData.role === "artist" && (
              <div>
                <label
                  htmlFor="bio"
                  className="block text-sm font-semibold mb-2 text-[#EAD8FF]"
                >
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-[#BCA7E7] focus:outline-none focus:ring-2 focus:ring-[#8F75E5]"
                  required
                />
              </div>
            )}
            <div>
              <label
                htmlFor="avatar"
                className="block text-sm font-semibold mb-2 text-[#EAD8FF]"
              >
                Avatar
              </label>
              <input
                type="file"
                id="avatar"
                name="avatar"
                onChange={handleFileChange}
                className="w-full px-4 py-3 rounded-lg bg-[#BCA7E7] focus:outline-none focus:ring-2 focus:ring-[#8F75E5]"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-8 py-3 text-white rounded-lg bg-gradient-to-r from-[#8F75E5] to-[#674188] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8F75E5]"
              disabled={loading}
            >
              Sign Up
            </button>
            {error && <p className="text-red-600 mt-4 text-sm">{error}</p>}
            {success && (
              <p className="text-green-600 mt-4 text-sm">{success}</p>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
