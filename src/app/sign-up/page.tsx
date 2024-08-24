"use client";
import { useState, useRef } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff } from "@/components/svgIcons";

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

      if (response.data.success) {
        router.replace("/sign-in");
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
        className={`w-full ${
          formData.role === "user" ? "md:max-w-md" : "max-w-4xl"
        }`}
      >
        <div className="bg-white px-6 sm:px-10 py-8 rounded-sm shadow-md w-full">
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
              className={`grid ${
                formData.role === "user" ? "md:grid-cols-1" : "md:grid-cols-2"
              } gap-6`}
            >
              <div className="space-y-6">
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
                    className="w-full rounded-sm border border-gray-300 bg-transparent py-2 px-3 outline-none text-gray-600 focus:border-[#CE1446] focus:ring-1 focus:ring-[#CE1446] transition-all duration-300"
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
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
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
                <div>
                  <label
                    htmlFor="role"
                    className="block mb-2 text-gray-600 text-sm font-medium"
                  >
                    Role
                  </label>
                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() =>
                        handleChange({
                          target: { name: "role", value: "user" },
                        } as React.ChangeEvent<HTMLInputElement>)
                      }
                      className={`flex-1 py-2 px-4 rounded-sm text-sm font-medium transition-colors duration-200 ${
                        formData.role === "user"
                          ? "bg-[#CE1446] text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      User
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleChange({
                          target: { name: "role", value: "artist" },
                        } as React.ChangeEvent<HTMLInputElement>)
                      }
                      className={`flex-1 py-2 px-4 rounded-sm text-sm font-medium transition-colors duration-200 ${
                        formData.role === "artist"
                          ? "bg-[#CE1446] text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      Artist
                    </button>
                  </div>
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
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-sm hover:bg-gray-300 transition-colors duration-300"
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
                      className="w-full rounded-sm border border-gray-300 bg-transparent py-2 px-3 outline-none text-gray-600 focus:border-[#CE1446] focus:ring-1 focus:ring-[#CE1446] transition-all duration-300"
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
                      className="w-full rounded-sm border border-gray-300 bg-transparent py-2 px-3 outline-none text-gray-600 focus:border-[#CE1446] focus:ring-1 focus:ring-[#CE1446] transition-all duration-300"
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
                      className="w-full rounded-sm border border-gray-300 bg-transparent py-2 px-3 outline-none text-gray-600 focus:border-[#CE1446] focus:ring-1 focus:ring-[#CE1446] transition-all duration-300"
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
                      className="w-full rounded-sm border border-gray-300 bg-transparent py-2 px-3 outline-none text-gray-600 focus:border-[#CE1446] focus:ring-1 focus:ring-[#CE1446] transition-all duration-300"
                      placeholder="Enter video link (optional)"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          {error && <div className="mt-4 text-red-500 text-sm">{error}</div>}
          <button
            type="submit"
            className="mt-6 w-full bg-[#CE1446] text-white py-2 px-4 rounded-sm text-sm sm:text-base font-medium tracking-wide hover:bg-[#B01238] transition-colors duration-200"
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
