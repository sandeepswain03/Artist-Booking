"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import axios from "axios";

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

  // Pre-populate the form with session data
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

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle avatar upload
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

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("userId", session?.user._id || "");
      data.append("username", formData.username);
      data.append("email", formData.email);
      data.append("bio", formData.bio);
      data.append("videolink1", formData.videoLink1); // Ensure keys match exactly
      data.append("videolink2", formData.videoLink2); // Ensure keys match exactly
      data.append("videolink3", formData.videoLink3); // Ensure keys match exactly
      if (avatarFile) {
        data.append("avatar", avatarFile);
      }

      const response = await axios.put("/api/user", data);

      if (response.data.success) {
        alert("Profile updated successfully!");
        // Optionally, refresh session or page to reflect changes
      } else {
        alert("Failed to update profile: " + response.data.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating the profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full lg:w-3/4 p-4 sm:p-6">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row items-center">
          <Image
            src={formData.avatarUrl}
            alt="Profile"
            width={80}
            height={80}
            className="rounded-full object-cover"
          />
          <div className="mt-4 sm:mt-0 sm:ml-6 space-y-2 text-center sm:text-left">
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
              className="cursor-pointer w-full sm:w-auto px-4 py-2 bg-[#8F75E5] text-white rounded-md shadow-sm hover:bg-[#674188] transition duration-200"
            >
              Upload New Photo
            </label>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#8F75E5] focus:border-[#8F75E5]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#8F75E5] focus:border-[#8F75E5]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full px-4 py-3 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#8F75E5] focus:border-[#8F75E5] bg-white"
              placeholder="Tell us about yourself..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Video Link 1
            </label>
            <input
              type="url"
              name="videoLink1"
              value={formData.videoLink1}
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#8F75E5] focus:border-[#8F75E5]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Video Link 2
            </label>
            <input
              type="url"
              name="videoLink2"
              value={formData.videoLink2}
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#8F75E5] focus:border-[#8F75E5]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Video Link 3
            </label>
            <input
              type="url"
              name="videoLink3"
              value={formData.videoLink3}
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#8F75E5] focus:border-[#8F75E5]"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 bg-[#8F75E5] text-white rounded-md shadow-sm hover:bg-[#674188] transition duration-200 ${
              loading ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </section>
  );
}
