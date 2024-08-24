"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Upload, Eye, EyeOff } from "@/components/svgIcons";

export default function AccountSettings() {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    avatarUrl: "/default-avatar.png",
    videoLink1: "",
    videoLink2: "",
    videoLink3: "",
    bio: "",
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (session?.user) {
      setFormData({
        username: session.user.username || "",
        email: session.user.email || "",
        avatarUrl: session.user.avatar.url || "/default-avatar.png",
        videoLink1: session.user.videoLink1 || "",
        videoLink2: session.user.videoLink2 || "",
        videoLink3: session.user.videoLink3 || "",
        bio: session.user.bio || "",
      });
    }
  }, [session]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        avatarUrl: imageUrl,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const data = new FormData();
      data.append("userId", session?.user._id || "");
      data.append("username", formData.username);
      data.append("email", formData.email);
      data.append("bio", formData.bio);
      data.append("videolink1", formData.videoLink1);
      data.append("videolink2", formData.videoLink2);
      data.append("videolink3", formData.videoLink3);
      if (avatarFile) {
        data.append("avatar", avatarFile);
      }

      const response = await axios.put("/api/user", data);

      if (response.data.success) {
        setSuccessMessage("Profile updated successfully!");
      } else {
        setError("Failed to update profile: " + response.data.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("An error occurred while updating the profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white px-6 sm:px-10 py-8 rounded-sm shadow-md"
      >
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl sm:text-3xl font-semibold">
              Profile Settings
            </h1>
            <p className="text-gray-400 text-sm sm:text-base">
              Manage your profile information and account settings
            </p>
          </div>

          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{successMessage}</span>
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <div className="flex items-center gap-5 justify-center">
            <Image
              src={formData.avatarUrl || "/default-avatar.png"}
              alt="Profile Avatar"
              width={64}
              height={64}
              className="inline-block size-16 rounded-full ring-2 ring-white"
            />
            <div>
              <input
                type="file"
                id="avatar"
                name="avatar"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
              <label
                htmlFor="avatar"
                className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-sm border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 cursor-pointer"
              >
                <Upload />
                Upload photo
              </label>
            </div>
          </div>

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
              rows={3}
              placeholder="Tell us about yourself..."
            ></textarea>
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
              placeholder="Enter Video Link 1"
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
              placeholder="Enter Video Link 2"
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
              placeholder="Enter Video Link 3"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full bg-[#CE1446] text-white py-2 px-4 rounded-sm text-sm sm:text-base font-medium tracking-wide hover:bg-[#B01238] transition-colors duration-300 disabled:opacity-50 disabled:pointer-events-none"
        >
          {loading ? "Saving..." : "Save changes"}
        </button>
      </form>
    </div>
  );
}
