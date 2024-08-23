"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Upload } from "@/components/svgIcons";

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
        alert("Profile updated successfully!");
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
    <div className="max-w-4xl px-4 py-10 sm:px-6 lg:px-8 mx-auto">
      <div className="bg-white rounded-sm shadow p-4 sm:p-7">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800">Profile Settings</h2>
          <p className="text-sm text-gray-600">
            Manage your profile information and account settings.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid sm:grid-cols-12 gap-2 sm:gap-6">
            <div className="sm:col-span-3">
              <label className="inline-block text-sm text-gray-800 mt-2.5">
                Profile photo
              </label>
            </div>
            <div className="sm:col-span-9">
              <div className="flex items-center gap-5">
                <Image
                  src={
                    formData.avatarUrl ||
                    "https://preline.co/assets/img/160x160/img1.jpg"
                  }
                  alt="Profile Avatar"
                  width={64}
                  height={64}
                  className="inline-block size-16 rounded-full ring-2 ring-white"
                />
                <div className="flex gap-x-2">
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
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="username"
                className="inline-block text-sm text-gray-800 mt-2.5"
              >
                Username
              </label>
            </div>
            <div className="sm:col-span-9">
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-md rounded-sm text-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="email"
                className="inline-block text-sm text-gray-800 mt-2.5"
              >
                Email
              </label>
            </div>
            <div className="sm:col-span-9">
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-md rounded-sm text-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="bio"
                className="inline-block text-sm text-gray-800 mt-2.5"
              >
                Bio
              </label>
            </div>
            <div className="sm:col-span-9">
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="py-2 px-3 block w-full border-gray-200 shadow-md rounded-sm text-sm focus:border-blue-500 focus:ring-blue-500"
                rows={3}
                placeholder="Tell us about yourself..."
              ></textarea>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="videoLink1"
                className="inline-block text-sm text-gray-800 mt-2.5"
              >
                Video Link 1
              </label>
            </div>
            <div className="sm:col-span-9">
              <input
                id="videoLink1"
                name="videoLink1"
                type="url"
                value={formData.videoLink1}
                onChange={handleChange}
                className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-md rounded-sm text-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="videoLink2"
                className="inline-block text-sm text-gray-800 mt-2.5"
              >
                Video Link 2
              </label>
            </div>
            <div className="sm:col-span-9">
              <input
                id="videoLink2"
                name="videoLink2"
                type="url"
                value={formData.videoLink2}
                onChange={handleChange}
                className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-md rounded-sm text-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="videoLink3"
                className="inline-block text-sm text-gray-800 mt-2.5"
              >
                Video Link 3
              </label>
            </div>
            <div className="sm:col-span-9">
              <input
                id="videoLink3"
                name="videoLink3"
                type="url"
                value={formData.videoLink3}
                onChange={handleChange}
                className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-md rounded-sm text-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mt-5 flex justify-end gap-x-2">
            <button
              type="button"
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-sm border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-sm border border-transparent bg-[#D0204F] text-white hover:bg-[#B01C44] disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 focus:ring-[#D0204F] focus:ring-offset-2 transition-all"
            >
              {loading ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
