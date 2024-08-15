"use client";
import { useState } from "react";
import Image from "next/image";

export default function AccountSettings() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    bio: "",
    avatar: null,
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: any) => {
    setFormData({
      ...formData,
      avatar: e.target.files[0],
    });
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
    // Submit the form data, including file upload logic
  };

  const handleReset = () => {
    setFormData({
      ...formData,
      avatar: null,
    });
  };

  return (
    <section className="w-full lg:w-3/4 p-4 sm:p-6 ">

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col sm:flex-row items-center">
          <Image
            src={
              formData.avatar
                ? URL.createObjectURL(formData.avatar)
                : "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
            }
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
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="avatar"
              className="cursor-pointer w-full sm:w-auto px-4 py-2 bg-[#8F75E5] text-white rounded-md shadow-sm hover:bg-[#674188] transition duration-200"
            >
              Upload New Photo
            </label>
            <button
              type="button"
              onClick={handleReset}
              className="w-full sm:w-auto mt-4 mx-2 sm:mt-0 px-2 py-2 border border-[#8F75E5] rounded-md text-black "
            >
              Reset
            </button>
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
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="submit"
            className="px-6 py-2 bg-[#8F75E5] text-white rounded-md shadow-sm hover:bg-[#674188] transition duration-200"
          >
            Save Changes
          </button>
          <button
            type="button"
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md shadow-sm hover:bg-gray-300 transition duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}
