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
    avatars: [] as { url: string; file?: File }[],
    videoLink1: "",
    videoLink2: "",
    videoLink3: "",
    bio: "",
    socialLink1: "",
    socialLink2: "",
    socialLink3: "",
    socialLink4: "",
    socialLink5: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (session?.user) {
      setFormData({
        username: session.user.username || "",
        email: session.user.email || "",
        avatars: (session.user.avatar || []).map((avatar) => ({
          url: typeof avatar === 'string' ? avatar : avatar.url,
        })),
        videoLink1: session.user.videoLink1 || "",
        videoLink2: session.user.videoLink2 || "",
        videoLink3: session.user.videoLink3 || "",
        bio: session.user.bio || "",
        socialLink1: session.user.socialLink1 || "",
        socialLink2: session.user.socialLink2 || "",
        socialLink3: session.user.socialLink3 || "",
        socialLink4: session.user.socialLink4 || "",
        socialLink5: session.user.socialLink5 || "",
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

  const handleAvatarChange =
    (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setFormData((prev) => {
          const newAvatars = [...prev.avatars];
          newAvatars[index] = { url: imageUrl, file };
          return { ...prev, avatars: newAvatars };
        });
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
      data.append("socialLink1", formData.socialLink1);
      data.append("socialLink2", formData.socialLink2);
      data.append("socialLink3", formData.socialLink3);
      data.append("socialLink4", formData.socialLink4);
      data.append("socialLink5", formData.socialLink5);
      formData.avatars.forEach((avatar, index) => {
        if (avatar.file) {
          data.append(`avatar${index}`, avatar.file, avatar.file.name);
        }
      });

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
            <div
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{successMessage}</span>
            </div>
          )}

          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-5 justify-center">
            {[0, 1, 2].map((index) => (
              <div key={index} className="flex flex-col items-center">
                {formData.avatars[index] ? (
                  <Image
                    src={formData.avatars[index].url}
                    alt={`Profile Avatar ${index + 1}`}
                    width={64}
                    height={64}
                    className="inline-block size-16 rounded-full ring-2 ring-white mb-2"
                  />
                ) : (
                  <div className="inline-block size-16 rounded-full ring-2 ring-white mb-2 bg-gray-200"></div>
                )}
                <input
                  type="file"
                  id={`avatar${index}`}
                  name={`avatar${index}`}
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange(index)}
                />
                <label
                  htmlFor={`avatar${index}`}
                  className="py-1 px-2 inline-flex items-center gap-x-2 text-xs font-medium rounded-sm border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 cursor-pointer"
                >
                  <Upload />
                  Upload photo {index + 1}
                </label>
              </div>
            ))}
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

          <div>
            <label
              htmlFor="socialLink1"
              className="block mb-2 text-gray-600 text-sm font-medium"
            >
              Social Link 1
            </label>
            <input
              type="url"
              id="socialLink1"
              name="socialLink1"
              value={formData.socialLink1}
              onChange={handleChange}
              className="w-full rounded-sm border border-gray-300 bg-transparent py-2 px-3 outline-none text-gray-600 focus:border-[#CE1446] focus:ring-1 focus:ring-[#CE1446] transition-all duration-300"
              placeholder="Enter Social Link 1"
            />
          </div>

          <div>
            <label
              htmlFor="socialLink2"
              className="block mb-2 text-gray-600 text-sm font-medium"
            >
              Social Link 2
            </label>
            <input
              type="url"
              id="socialLink2"
              name="socialLink2"
              value={formData.socialLink2}
              onChange={handleChange}
              className="w-full rounded-sm border border-gray-300 bg-transparent py-2 px-3 outline-none text-gray-600 focus:border-[#CE1446] focus:ring-1 focus:ring-[#CE1446] transition-all duration-300"
              placeholder="Enter Social Link 2"
            />
          </div>

          <div>
            <label
              htmlFor="socialLink3"
              className="block mb-2 text-gray-600 text-sm font-medium"
            >
              Social Link 3
            </label>
            <input
              type="url"
              id="socialLink3"
              name="socialLink3"
              value={formData.socialLink3}
              onChange={handleChange}
              className="w-full rounded-sm border border-gray-300 bg-transparent py-2 px-3 outline-none text-gray-600 focus:border-[#CE1446] focus:ring-1 focus:ring-[#CE1446] transition-all duration-300"
              placeholder="Enter Social Link 3"
            />
          </div>

          <div>
            <label
              htmlFor="socialLink4"
              className="block mb-2 text-gray-600 text-sm font-medium"
            >
              Social Link 4
            </label>
            <input
              type="url"
              id="socialLink4"
              name="socialLink4"
              value={formData.socialLink4}
              onChange={handleChange}
              className="w-full rounded-sm border border-gray-300 bg-transparent py-2 px-3 outline-none text-gray-600 focus:border-[#CE1446] focus:ring-1 focus:ring-[#CE1446] transition-all duration-300"
              placeholder="Enter Social Link 4"
            />
          </div>

          <div>
            <label
              htmlFor="socialLink5"
              className="block mb-2 text-gray-600 text-sm font-medium"
            >
              Social Link 5
            </label>
            <input
              type="url"
              id="socialLink5"
              name="socialLink5"
              value={formData.socialLink5}
              onChange={handleChange}
              className="w-full rounded-sm border border-gray-300 bg-transparent py-2 px-3 outline-none text-gray-600 focus:border-[#CE1446] focus:ring-1 focus:ring-[#CE1446] transition-all duration-300"
              placeholder="Enter Social Link 5"
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
