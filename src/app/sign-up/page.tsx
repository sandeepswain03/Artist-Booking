"use client";
import { useState, useRef } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
  const [passwordShow, setPasswordShow] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, avatar: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, avatar: null });
      setAvatarPreview(null);
    }
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
        setAvatarPreview(null);
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
    <div
      className={`flex justify-center items-center w-full min-h-screen p-4 ${
        formData.role === "user" ? "md:items-center" : ""
      }`}
    >
      <form
        onSubmit={handleSubmit}
        className={`w-full max-w-4xl ${
          formData.role === "user" ? "md:max-w-md" : ""
        }`}
      >
        <div className="bg-white px-6 sm:px-10 py-8 rounded-lg shadow-md w-full">
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-2xl sm:text-3xl font-semibold">
                Create an account
              </h1>
              <p className="text-gray-400 text-sm sm:text-base">
                Sign up to get started
              </p>
            </div>
            <div
              className={`grid md:grid-cols-2 gap-6 ${
                formData.role === "user" ? "md:grid-cols-1" : ""
              }`}
            >
              <div
                className={`space-y-6 ${
                  formData.role === "user" ? "md:col-span-1" : ""
                }`}
              >
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-gray-600 text-sm font-medium"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 bg-transparent py-2 px-3 outline-none text-gray-600 focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200"
                    placeholder="Enter Username"
                    required
                  />
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
                    value={formData.email}
                    onChange={handleChange}
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
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
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
                <div>
                  <label
                    htmlFor="role"
                    className="block mb-2 text-gray-600 text-sm font-medium"
                  >
                    Role
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 bg-transparent py-2 px-3 outline-none text-gray-600 focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200"
                    required
                  >
                    <option value="user">User</option>
                    <option value="artist">Artist</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="avatar"
                    className="block mb-2 text-gray-600 text-sm font-medium"
                  >
                    Avatar
                  </label>
                  <div className="flex items-center space-x-4">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-200"
                    >
                      Choose File
                    </button>
                    <input
                      type="file"
                      id="avatar"
                      name="avatar"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                      accept="image/*"
                      required
                    />
                    {avatarPreview && (
                      <div className="relative w-16 h-16">
                        <Image
                          src={avatarPreview}
                          alt="Avatar preview"
                          layout="fill"
                          objectFit="cover"
                          className="rounded-full"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {formData.role === "artist" && (
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="bio"
                      className="block mb-2 text-gray-600 text-sm font-medium"
                    >
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 bg-transparent py-2 px-3 outline-none text-gray-600 focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200"
                      placeholder="Enter your bio"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="videoLink1"
                      className="block mb-2 text-gray-600 text-sm font-medium"
                    >
                      Video Link 1
                    </label>
                    <input
                      type="url"
                      id="videoLink1"
                      name="videoLink1"
                      value={formData.videoLink1}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 bg-transparent py-2 px-3 outline-none text-gray-600 focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200"
                      placeholder="Enter video link"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="videoLink2"
                      className="block mb-2 text-gray-600 text-sm font-medium"
                    >
                      Video Link 2
                    </label>
                    <input
                      type="url"
                      id="videoLink2"
                      name="videoLink2"
                      value={formData.videoLink2}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 bg-transparent py-2 px-3 outline-none text-gray-600 focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200"
                      placeholder="Enter video link (optional)"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="videoLink3"
                      className="block mb-2 text-gray-600 text-sm font-medium"
                    >
                      Video Link 3
                    </label>
                    <input
                      type="url"
                      id="videoLink3"
                      name="videoLink3"
                      value={formData.videoLink3}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-300 bg-transparent py-2 px-3 outline-none text-gray-600 focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-200"
                      placeholder="Enter video link (optional)"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          {error && <div className="mt-4 text-red-500 text-sm">{error}</div>}
          {success && (
            <div className="mt-4 text-green-500 text-sm">{success}</div>
          )}
          <button
            type="submit"
            className="mt-6 w-full bg-[#CE1446] text-white py-2 px-4 rounded-md text-sm sm:text-base font-medium tracking-wide hover:bg-[#B01238] transition-colors duration-200"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
          <div className="mt-6 text-sm text-center">
            Already have an account?
            <Link
              href="/sign-in"
              className="font-medium text-[#CE1446] hover:underline ml-1"
            >
              Sign in
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
