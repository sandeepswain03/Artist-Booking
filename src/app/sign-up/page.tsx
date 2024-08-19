"use client";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
    avatar: null as File | null,
    bio: "",
    videoLink1: "",
    videoLink2: "",
    videoLink3: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

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

    const {
      username,
      email,
      password,
      role,
      bio,
      avatar,
      videoLink1,
      videoLink2,
      videoLink3,
    } = formData;

    if (!username || !email || !password || !avatar || !role) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    // Additional validation for artists
    if (role === "artist" && (!bio || !videoLink1)) {
      setError("Bio and at least one video link are required for artists");
      setLoading(false);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("username", username);
    formDataToSend.append("email", email);
    formDataToSend.append("password", password);
    formDataToSend.append("role", role);
    formDataToSend.append("avatar", avatar);
    if (role === "artist") {
      formDataToSend.append("bio", bio);
      formDataToSend.append("videolink1", videoLink1);
      if (videoLink2) formDataToSend.append("videolink2", videoLink2);
      if (videoLink3) formDataToSend.append("videolink3", videoLink3);
    }

    try {
      const response = await axios.post("/api/user", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      router.replace("/sign-in");

      if (response.data.success) {
        setSuccess("User registered successfully!");
        setFormData({
          username: "",
          email: "",
          password: "",
          role: "user",
          avatar: null,
          bio: "",
          videoLink1: "",
          videoLink2: "",
          videoLink3: "",
        });
      } else {
        setError(response.data.message || "Something went wrong");
      }
    } catch (err) {
      console.error("Error during sign-up:", err);
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
              <Link
                href="/sign-in"
                className="text-[#BCA7E7] underline hover:text-white"
              >
                Sign in here
              </Link>
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
              <>
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
                <div>
                  <label
                    htmlFor="videoLink1"
                    className="block text-sm font-semibold mb-2 text-[#EAD8FF]"
                  >
                    Video Link 1
                  </label>
                  <input
                    type="url"
                    id="videoLink1"
                    name="videoLink1"
                    value={formData.videoLink1}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-[#BCA7E7] focus:outline-none focus:ring-2 focus:ring-[#8F75E5]"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="videoLink2"
                    className="block text-sm font-semibold mb-2 text-[#EAD8FF]"
                  >
                    Video Link 2
                  </label>
                  <input
                    type="url"
                    id="videoLink2"
                    name="videoLink2"
                    value={formData.videoLink2}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-[#BCA7E7] focus:outline-none focus:ring-2 focus:ring-[#8F75E5]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="videoLink3"
                    className="block text-sm font-semibold mb-2 text-[#EAD8FF]"
                  >
                    Video Link 3
                  </label>
                  <input
                    type="url"
                    id="videoLink3"
                    name="videoLink3"
                    value={formData.videoLink3}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-[#BCA7E7] focus:outline-none focus:ring-2 focus:ring-[#8F75E5]"
                  />
                </div>
              </>
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
              {loading ? "Signing Up..." : "Sign Up"}
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
