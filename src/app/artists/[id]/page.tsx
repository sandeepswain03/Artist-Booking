"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

interface Artist {
  _id: string;
  username: string;
  bio: string;
  videoLink1: string;
  videoLink2?: string;
  videoLink3?: string;
  avatar: { url: string; public_id: string };
}

export default function ArtistDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const [artist, setArtist] = useState<Artist | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    occasion: "",
    date: "",
    city: "",
    budget: "",
    guestCount: "",
    name: "",
    email: "",
    contactNumber: "",
    message: "",
    userId: params.id,
  });

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await axios.get(`/api/artist/${params.id}`);
        if (response.data.success) {
          setArtist(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching artist details:", error);
      }
    };
    fetchArtist();
  }, [params.id]);

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post("/api/enquiry", formData);
      if (response.data.success) {
        setSuccess("Inquiry submitted successfully!");
        // Optionally reset the form after successful submission
        setFormData({
          occasion: "",
          date: "",
          city: "",
          budget: "",
          guestCount: "",
          name: "",
          email: "",
          contactNumber: "",
          message: "",
          userId: params.id,
        });
      } else {
        setError(response.data.message || "Failed to submit the inquiry.");
      }
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          "An error occurred while submitting the inquiry."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!artist) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section className="ezy__about8 light pb-14 md:pb-24 text-zinc-900">
        <div className="relative bg-opacity-60 py-6">
          <div className="container mx-auto px-4"></div>
        </div>
        <div className="container mx-auto px-4 mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="col-span-1 lg:col-span-1 flex justify-center items-center">
              <div className="border-[15px] border-transparent outline outline-[3px] outline-indigo-600 rounded-full w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] overflow-hidden">
                <img
                  src={artist.avatar.url}
                  alt={artist.username}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="col-span-1 lg:col-span-1 mb-6 lg:mb-0">
              <div className="relative">
                <h1 className="text-2xl md:text-4xl font-bold mb-4">
                  {artist.username}
                </h1>
                <p className="opacity-75 mb-2 text-sm md:text-base leading-relaxed text-justify">
                  {artist.bio}
                </p>
                <div className="container mx-auto px-4 mt-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {artist.videoLink1 && (
                      <Link
                        href={artist.videoLink1}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:underline"
                      >
                        Watch {artist.username} Video 1
                      </Link>
                    )}
                    {artist.videoLink2 && (
                      <Link
                        href={artist.videoLink2}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:underline"
                      >
                        Watch {artist.username} Video 2
                      </Link>
                    )}
                    {artist.videoLink3 && (
                      <Link
                        href={artist.videoLink3}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:underline"
                      >
                        Watch {artist.username} Video 3
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Inquiry Form Section */}
        <div className="container mx-auto px-4 mt-12 max-w-3xl">
          <h2 className="text-3xl font-bold mb-8 text-center text-[#4A3F6A]">
            Inquire Now
          </h2>
          <form
            className="bg-[#5E4B88] shadow-lg rounded-xl p-8"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Occasion Field */}
              <div>
                <label
                  className="block text-sm font-semibold mb-2 text-[#EAD8FF]"
                  htmlFor="occasion"
                >
                  Select Occasion*
                </label>
                <select
                  id="occasion"
                  name="occasion"
                  value={formData.occasion}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-[#BCA7E7] focus:outline-none focus:ring-2 focus:ring-[#8F75E5]"
                  required
                >
                  <option value="">Select an occasion</option>
                  <option value="wedding">Wedding</option>
                  <option value="birthday">Birthday</option>
                  <option value="corporate">Corporate</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Date Field */}
              <div>
                <label
                  className="block text-sm font-semibold mb-2 text-[#EAD8FF]"
                  htmlFor="date"
                >
                  Date*
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-[#BCA7E7] focus:outline-none focus:ring-2 focus:ring-[#8F75E5]"
                  required
                />
              </div>

              {/* City Field */}
              <div>
                <label
                  className="block text-sm font-semibold mb-2 text-[#EAD8FF]"
                  htmlFor="city"
                >
                  City*
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-[#BCA7E7] focus:outline-none focus:ring-2 focus:ring-[#8F75E5]"
                  required
                />
              </div>

              {/* Budget Field */}
              <div>
                <label
                  className="block text-sm font-semibold mb-2 text-[#EAD8FF]"
                  htmlFor="budget"
                >
                  Budget*
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-[#BCA7E7] focus:outline-none focus:ring-2 focus:ring-[#8F75E5]"
                  required
                >
                  <option value="">Select a budget</option>
                  <option value="under-1000">$1000 and under</option>
                  <option value="1000-5000">$1000 - $5000</option>
                  <option value="5000-10000">$5000 - $10000</option>
                  <option value="over-10000">Over $10000</option>
                </select>
              </div>

              {/* Guest Count Field */}
              <div>
                <label
                  className="block text-sm font-semibold mb-2 text-[#EAD8FF]"
                  htmlFor="guestCount"
                >
                  Guest Count
                </label>
                <input
                  type="number"
                  id="guestCount"
                  name="guestCount"
                  value={formData.guestCount}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-[#BCA7E7] focus:outline-none focus:ring-2 focus:ring-[#8F75E5]"
                />
              </div>

              {/* Name Field */}
              <div>
                <label
                  className="block text-sm font-semibold mb-2 text-[#EAD8FF]"
                  htmlFor="name"
                >
                  Your Name*
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-[#BCA7E7] focus:outline-none focus:ring-2 focus:ring-[#8F75E5]"
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <label
                  className="block text-sm font-semibold mb-2 text-[#EAD8FF]"
                  htmlFor="email"
                >
                  Email*
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

              {/* Contact Number Field */}
              <div>
                <label
                  className="block text-sm font-semibold mb-2 text-[#EAD8FF]"
                  htmlFor="contactNumber"
                >
                  Contact Number*
                </label>
                <input
                  type="tel"
                  id="contactNumber"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-[#BCA7E7] focus:outline-none focus:ring-2 focus:ring-[#8F75E5]"
                  required
                />
              </div>

              {/* Message Field */}
              <div className="col-span-1 md:col-span-2">
                <label
                  className="block text-sm font-semibold mb-2 text-[#EAD8FF]"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-[#BCA7E7] focus:outline-none focus:ring-2 focus:ring-[#8F75E5]"
                  rows={5}
                />
              </div>

              <input
                type="hidden"
                id="artistId"
                name="artistId"
                value={formData.userId}
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="px-8 py-3 text-white rounded-lg bg-gradient-to-r from-[#8F75E5] to-[#674188] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8F75E5]"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Inquiry"}
              </button>
            </div>
          </form>

          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          {success && (
            <p className="text-green-500 text-center mt-4">{success}</p>
          )}
        </div>
      </section>
    </>
  );
}
