"use client";
import React, { useState } from "react";

export default function CreateConcertForm() {
  const [formData, setFormData] = useState({
    coverImage: null,
    description: "",
    price: "",
    address: "",
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
      coverImage: e.target.files[0],
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Handle the form submission, e.g., send formData to the server
    console.log(formData);
  };

  return (
    <section className="w-full lg:w-3/4 p-4 sm:p-6">
      <h4 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create Concert</h4>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Concert Cover Image</label>
          <input
            type="file"
            id="coverImage"
            name="coverImage"
            onChange={handleFileChange}
            className="block w-full mt-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#8F75E5] focus:border-[#8F75E5]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
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
          <label className="block text-sm font-medium text-gray-700">Price (USD)</label>
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
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="block w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#8F75E5] focus:border-[#8F75E5]"
            placeholder="Enter concert address"
            required
          />
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2 bg-[#8F75E5] text-white rounded-md shadow-sm hover:bg-[#674188] transition duration-200"
          >
            Create Concert
          </button>
        </div>
      </form>
    </section>
  );
}

