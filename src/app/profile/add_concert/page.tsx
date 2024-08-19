"use client";
import React, { useState } from "react";
import axios from "axios";

export default function CreateConcertForm() {
  const [formData, setFormData] = useState({
    concertImages: [] as File[],
    title: "",
    date: "",
    time: "",
    location: "",
    city: "",
    description: "",
    price: "",
    capacity: "",
    genre: "",
  });

  const [isLoading, setIsLoading] = useState(false); // State to manage loading

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setFormData({
        ...formData,
        concertImages: Array.from(files),
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true

    const form = new FormData();
    for (const [key, value] of Object.entries(formData)) {
      if (Array.isArray(value)) {
        value.forEach((file) => form.append(key, file));
      } else {
        form.append(key, value);
      }
    }

    try {
      const response = await axios.post("/api/concert", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);

      // Reset form data after successful submission
      setFormData({
        concertImages: [],
        title: "",
        date: "",
        time: "",
        location: "",
        city: "",
        description: "",
        price: "",
        capacity: "",
        genre: "",
      });
    } catch (error) {
      console.error("Error creating concert:", error);
    } finally {
      setIsLoading(false); // Reset loading state after request completion
    }
  };

  return (
    <section className="w-full lg:w-3/4 p-4 sm:p-6">
      <h4 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Create Concert
      </h4>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Concert Images
          </label>
          <input
            type="file"
            id="concertImages"
            name="concertImages"
            onChange={handleFileChange}
            multiple
            className="block w-full mt-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#8F75E5] focus:border-[#8F75E5]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="block w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#8F75E5] focus:border-[#8F75E5]"
            placeholder="Enter concert title"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="block w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#8F75E5] focus:border-[#8F75E5]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Time
          </label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="block w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#8F75E5] focus:border-[#8F75E5]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="block w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#8F75E5] focus:border-[#8F75E5]"
            placeholder="Enter concert location"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="block w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#8F75E5] focus:border-[#8F75E5]"
            placeholder="Enter city"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#8F75E5] focus:border-[#8F75E5] bg-white"
            placeholder="Enter concert description..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price (USD)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="block w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#8F75E5] focus:border-[#8F75E5]"
            placeholder="Enter ticket price"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Capacity
          </label>
          <input
            type="number"
            id="capacity"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            className="block w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#8F75E5] focus:border-[#8F75E5]"
            placeholder="Enter concert capacity"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Genre
          </label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            className="block w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#8F75E5] focus:border-[#8F75E5]"
            placeholder="Enter genre"
            required
          />
        </div>

        <div className="text-right">
          <button
            type="submit"
            className={`w-full sm:w-auto px-6 py-2 bg-[#8F75E5] text-white rounded-md shadow-sm transition duration-200 ${
              isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#674188]"
            }`}
            disabled={isLoading} // Disable button while loading
          >
            {isLoading ? "Creating..." : "Create Concert"}
          </button>
        </div>
      </form>
    </section>
  );
}
