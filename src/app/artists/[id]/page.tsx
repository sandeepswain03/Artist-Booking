"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaTiktok,
  FaCalendarAlt,
  FaPlay,
} from "react-icons/fa";
import Image from "next/image";
import Rating from "react-rating";
import { CiLocationOn } from "react-icons/ci";

interface Concert {
  _id: string;
  title: string;
  date: string;
  concertImages: { url: string; public_id: string }[];
  location: string;
}

interface Artist {
  _id: string;
  username: string;
  bio: string;
  videoLink1: string;
  videoLink2?: string;
  videoLink3?: string;
  avatar: { url: string; public_id: string }[];
  socialLink1?: string;
  socialLink2?: string;
  socialLink3?: string;
  socialLink4?: string;
  socialLink5?: string;
  rating: {
    average: number;
    count: number;
    ratings: { userId: string; rating: number }[];
  };
  concerts: Concert[];
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
    artistId: params.id,
  });
  const { data: session } = useSession();
  const user = session?.user;
  const [isLoading, setIsLoading] = useState(true);
  const [userRating, setUserRating] = useState(0);
  const [pastConcerts, setPastConcerts] = useState<Concert[]>([]);

  useEffect(() => {
    const fetchArtist = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/api/artist/${params.id}`);
        if (response.data.success) {
          setArtist(response.data.data);
          const now = new Date();
          const pastConcerts = response.data.data.concerts
            .filter((concert: Concert) => new Date(concert.date) < now)
            .sort(
              (a: Concert, b: Concert) =>
                new Date(b.date).getTime() - new Date(a.date).getTime()
            )
            .slice(0, 3);
          setPastConcerts(pastConcerts);

          // Set user's rating if they've already rated
          if (user && response.data.data.rating.ratings) {
            const userRating = response.data.data.rating.ratings.find(
              (r: { userId: string; rating: number }) => r.userId === user._id
            );
            if (userRating) {
              setUserRating(userRating.rating);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching artist details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchArtist();
  }, [params.id, user]);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post("/api/enquiry", formData);
      if (response.data.success) {
        setSuccess("Inquiry submitted successfully!");
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
          artistId: params.id,
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

  const handleRating = async (value: number) => {
    if (!user) {
      setError("You must be logged in to rate an artist.");
      return;
    }

    try {
      const response = await axios.patch(`/api/artist`, {
        artistId: params.id,
        rating: value,
      });
      if (response.data.success) {
        setArtist((prevArtist) => ({
          ...prevArtist!,
          rating: response.data.data,
        }));
        setUserRating(value);
        setSuccess("Thank you for your rating!");
        setTimeout(() => {
          setSuccess(null);
        }, 3000);
      }
    } catch (error) {
      console.error("Error updating rating:", error);
      setError("Failed to submit rating. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#CE1446]"></div>
      </div>
    );
  }

  if (!artist) {
    return <div>Artist not found</div>;
  }

  return (
    <>
      <section className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Artist Images */}
              <div className="md:w-1/2 lg:w-2/5 relative overflow-hidden">
                <Carousel
                  showThumbs={false}
                  infiniteLoop={true}
                  autoPlay={true}
                  showArrows={true}
                  showStatus={false}
                  interval={5000}
                  className="h-full"
                >
                  {artist.avatar.map((image, index) => (
                    <div key={index} className="h-64 md:h-96 lg:h-full">
                      <img
                        src={image.url}
                        alt={`${artist.username} - Image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </Carousel>
              </div>
              {/* Artist Details */}
              <div className="md:w-1/2 lg:w-3/5 p-6 md:p-8 lg:p-10">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  {artist.username}
                </h1>
                {/* Artist Rating */}
                <div className="mb-4 flex items-center">
                  <Rating
                    initialRating={artist.rating.average}
                    emptySymbol={
                      <span className="text-gray-300 text-xl">★</span>
                    }
                    fullSymbol={
                      <span className="text-yellow-400 text-xl">★</span>
                    }
                    readonly={true}
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    ({artist.rating.count}{" "}
                    {artist.rating.count === 1 ? "rating" : "ratings"})
                  </span>
                </div>
                {/* User Rating */}
                {user &&
                  !artist.rating.ratings.some((r) => r.userId === user._id) && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">
                        Rate this artist:
                      </p>
                      <Rating
                        initialRating={userRating}
                        emptySymbol={
                          <span className="text-gray-300 text-xl cursor-pointer">
                            ★
                          </span>
                        }
                        fullSymbol={
                          <span className="text-yellow-400 text-xl cursor-pointer">
                            ★
                          </span>
                        }
                        onClick={handleRating}
                      />
                    </div>
                  )}
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                {success && (
                  <p className="text-green-500 text-sm mb-2">{success}</p>
                )}
                <p className="text-gray-600 mb-6 leading-relaxed hover:text-gray-800 transition-colors duration-300 text-justify">
                  {artist.bio}
                </p>
                <div className="flex flex-wrap gap-4 mb-6">
                  {artist.socialLink4 && (
                    <Link
                      href={artist.socialLink4}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transform hover:scale-110 transition-transform duration-300"
                    >
                      <FaFacebook className="text-2xl text-[#CE1446] hover:text-[#A01234]" />
                    </Link>
                  )}
                  {artist.socialLink1 && (
                    <Link
                      href={artist.socialLink1}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transform hover:scale-110 transition-transform duration-300"
                    >
                      <FaInstagram className="text-2xl text-[#CE1446] hover:text-[#A01234]" />
                    </Link>
                  )}
                  {artist.socialLink2 && (
                    <Link
                      href={artist.socialLink2}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transform hover:scale-110 transition-transform duration-300"
                    >
                      <FaTwitter className="text-2xl text-[#CE1446] hover:text-[#A01234]" />
                    </Link>
                  )}
                  {artist.socialLink3 && (
                    <Link
                      href={artist.socialLink3}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transform hover:scale-110 transition-transform duration-300"
                    >
                      <FaYoutube className="text-2xl text-[#CE1446] hover:text-[#A01234]" />
                    </Link>
                  )}
                  {artist.socialLink5 && (
                    <Link
                      href={artist.socialLink5}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transform hover:scale-110 transition-transform duration-300"
                    >
                      <FaTiktok className="text-2xl text-[#CE1446] hover:text-[#A01234]" />
                    </Link>
                  )}
                </div>
                <p className="text-black font-bold mb-4 leading-relaxed">
                  Previous Performances of {artist.username}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[artist.videoLink1, artist.videoLink2, artist.videoLink3]
                    .filter(Boolean)
                    .map((link, index) => (
                      <Link
                        key={index}
                        href={link || ""}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#CE1446] text-white py-3 px-6 rounded-md hover:bg-[#A01234] transition duration-300 text-center shadow-md hover:shadow-lg transform hover:-translate-y-1 flex items-center justify-center"
                      >
                        <FaPlay className="mr-2" /> Watch Performance{" "}
                        {index + 1}
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Previous Events Section */}
      {pastConcerts.length > 0 && (
        <section className="py-10 bg-gray-50 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Previous Events of {artist.username}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastConcerts.map((concert) => {
                const dateFormat = new Date(concert.date);
                const options = {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                };
                const formattedDate = dateFormat.toLocaleDateString(
                  "en-US",
                  options as Intl.DateTimeFormatOptions
                );

                return (
                  <div
                    key={concert._id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden flex"
                  >
                    <div className="flex flex-col justify-center items-center p-4 w-1/5">
                      <div className="flex flex-col space-y-2 transform -rotate-90 origin-center">
                        <p className="text-sm text-gray-600 font-medium flex items-center whitespace-nowrap">
                          <FaCalendarAlt className="text-[#CE1446] mr-2 transform rotate-90" />
                          {formattedDate}
                        </p>
                        <p className="text-sm text-gray-600 font-medium flex items-center whitespace-nowrap">
                          <CiLocationOn className="text-[#CE1446] text-lg mr-1 transform rotate-90" />
                          {concert.location}
                        </p>
                      </div>
                    </div>
                    <div className="w-4/5 relative">
                      <Image
                        src={
                          concert.concertImages[0]?.url || "/default-image.jpg"
                        }
                        alt={concert.title}
                        layout="responsive"
                        width={100}
                        height={75}
                        objectFit="cover"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
      {/* Inquiry Form */}
      {user?._id != params.id && (
        <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
            <div className="bg-white px-6 py-8 rounded-lg shadow-md">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                  Inquire Now
                </h1>
                <p className="text-gray-600 mt-2">
                  Send an inquiry to {artist.username}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="occasion"
                    className="block mb-2 text-gray-700 text-sm font-medium"
                  >
                    Occasion
                  </label>
                  <div className="relative">
                    <select
                      id="occasion"
                      name="occasion"
                      value={formData.occasion}
                      onChange={handleChange}
                      className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-[#CE1446] focus:outline-none focus:ring-1 focus:ring-[#CE1446]"
                      required
                    >
                      <option value="" disabled>
                        Select an occasion
                      </option>
                      <option value="wedding">Wedding</option>
                      <option value="birthday">Birthday</option>
                      <option value="corporate">Corporate Event</option>
                      <option value="concert">Concert</option>
                      <option value="festival">Festival</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="date"
                    className="block mb-2 text-gray-700 text-sm font-medium"
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-[#CE1446] focus:outline-none focus:ring-1 focus:ring-[#CE1446]"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="city"
                    className="block mb-2 text-gray-700 text-sm font-medium"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-[#CE1446] focus:outline-none focus:ring-1 focus:ring-[#CE1446]"
                    placeholder="Enter city"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="budget"
                    className="block mb-2 text-gray-700 text-sm font-medium"
                  >
                    Budget
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      ₹
                    </span>
                    <input
                      type="number"
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full rounded-md border border-gray-300 bg-white py-2 pl-8 pr-3 shadow-sm focus:border-[#CE1446] focus:outline-none focus:ring-1 focus:ring-[#CE1446]"
                      placeholder="Enter your budget"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="guestCount"
                    className="block mb-2 text-gray-700 text-sm font-medium"
                  >
                    Guest Count
                  </label>
                  <input
                    type="number"
                    id="guestCount"
                    name="guestCount"
                    value={formData.guestCount}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-[#CE1446] focus:outline-none focus:ring-1 focus:ring-[#CE1446]"
                    placeholder="Enter guest count"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-gray-700 text-sm font-medium"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-[#CE1446] focus:outline-none focus:ring-1 focus:ring-[#CE1446]"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-gray-700 text-sm font-medium"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-[#CE1446] focus:outline-none focus:ring-1 focus:ring-[#CE1446]"
                    placeholder="Enter Email Address"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="contactNumber"
                    className="block mb-2 text-gray-700 text-sm font-medium"
                  >
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    id="contactNumber"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-[#CE1446] focus:outline-none focus:ring-1 focus:ring-[#CE1446]"
                    placeholder="Enter contact number"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label
                    htmlFor="message"
                    className="block mb-2 text-gray-700 text-sm font-medium"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-[#CE1446] focus:outline-none focus:ring-1 focus:ring-[#CE1446]"
                    placeholder="Enter your message"
                    rows={4}
                    required
                  />
                </div>
              </div>
              {error && (
                <div className="mt-4 text-red-500 text-sm">{error}</div>
              )}
              {success && (
                <div className="mt-4 text-green-500 text-sm">{success}</div>
              )}
              <button
                type="submit"
                className="mt-6 w-full bg-[#CE1446] text-white py-2 px-4 rounded-md text-sm sm:text-base font-medium tracking-wide hover:bg-[#A01234] transition-colors duration-200"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Inquiry"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
