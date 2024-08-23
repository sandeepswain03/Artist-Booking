"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import Image from "next/image";

interface Artist {
  _id: string;
  username: string;
  avatar: { url: string; public_id: string };
  bio: string;
}

export default function ArtistsPage() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [filteredArtists, setFilteredArtists] = useState<Artist[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await axios.get("/api/artist");
        if (response.data.success) {
          setArtists(response.data.data);
          setFilteredArtists(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching artists:", error);
      }
    };
    fetchArtists();
  }, []);

  useEffect(() => {
    const filtered = artists.filter((artist) =>
      artist.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredArtists(filtered);
  }, [artists, searchTerm]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // The filtering is now handled in the useEffect
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl md:text-5xl font-bold text-center text-secondary mt-10 uppercase">
        All Artists
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 my-10 md:my-20 gap-6">
        <div className="md:col-span-1">
          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="flex bg-gray-50 p-5 shadow-md rounded-md"
          >
            <input
              type="text"
              name="search"
              placeholder="Search by name"
              className="w-full px-4 py-3 border rounded-3xl outline-none border-none bg-gray-200 text-black"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="bg-[#CE1446] text-white py-3 px-8 rounded-3xl rounded-tl-none -ml-8 text-2xl font-bold"
            >
              <FaSearch />
            </button>
          </form>
        </div>

        {/* Artist cards */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filteredArtists.map((artist) => (
            <div
              key={artist._id}
              className="rounded-md shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:shadow-lg bg-white hover:bg-gray-100"
            >
              <div className="rounded-t-md shadow-lg h-60 relative overflow-hidden">
                <Image
                  src={artist.avatar?.url || "/default-avatar.jpg"}
                  alt={artist.username}
                  width={400}
                  height={200}
                  className="rounded-t-md h-full w-full object-cover transform transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="px-4 py-6">
                <h2 className="text-2xl font-semibold text-secondary">
                  {artist.username}
                </h2>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                  {artist.bio}
                </p>
                <div className="flex justify-between items-center mt-4">
                  <Link
                    href={`/artists/${artist._id}`}
                    className="text-primary font-semibold underline"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
