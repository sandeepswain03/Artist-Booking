"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import {
  OrangeLine,
  BlueLine,
  Search,
  SideArrow,
} from "../../components/svgIcons";

interface Artist {
  _id: string;
  username: string;
  avatar: { url: string; public_id: string };
}

export default function ArtistsPage() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [filterName, setFilterName] = useState("");

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await axios.get("/api/artist");
        if (response.data.success) {
          setArtists(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching artists:", error);
      }
    };
    fetchArtists();
  }, []);

  const filteredArtists = artists.filter((artist) =>
    filterName === ""
      ? true
      : artist.username.toLowerCase().includes(filterName.toLowerCase())
  );

  return (
    <>
      {/* Search Bar */}
      <div className="relative overflow-hidden bg-gradient-to-tl from-[#E2BFD9] via-purple-100 to-[#E2BFD9]">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 bg-gradient-to-tl from-[#E2BFD9] via-purple-100 to-[#E2BFD9]">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-800">
              Search Artists
            </h1>
            <p className="mt-3 text-gray-600">
              Book The artist of your choice!
            </p>
            <div className="mt-7 sm:mt-12 mx-auto max-w-xl relative">
              <form>
                <div className="relative z-10 flex gap-x-3 p-3 bg-white rounded-lg shadow-lg shadow-gray-100">
                  <div className="w-full">
                    <input
                      type="text"
                      name="hs-search-article-1"
                      id="hs-search-article-1"
                      className="py-2.5 px-4 block w-full rounded-lg"
                      placeholder="Search for an Artist"
                      value={filterName}
                      onChange={(e) => setFilterName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Link
                      className="size-[46px] inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg bg-[#674188] text-white hover:bg-[#674188] disabled:opacity-50 disabled:pointer-events-none"
                      href="#"
                    >
                      <Search />
                    </Link>
                  </div>
                </div>
              </form>
              <div className="hidden md:block absolute top-0 end-0 -translate-y-12 translate-x-20">
                <OrangeLine />
              </div>
              <div className="hidden md:block absolute bottom-0 start-0 translate-y-10 -translate-x-32">
                <BlueLine />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Artists section */}
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredArtists.map((artist) => (
            <div
              key={artist._id}
              className="hover:scale-105 transition-all duration-300 ease-in-out"
            >
              <Link
                className="relative flex flex-col w-full min-h-60 bg-center bg-cover rounded-xl"
                href={`/artists/${artist._id}`}
                style={{ backgroundImage: `url(${artist.avatar?.url})` }}
              >
                <div className="flex-auto p-4 md:p-6">
                  <h3 className="text-xl text-white/90">
                    <span className="font-bold">{artist.username}</span>
                  </h3>
                </div>
                <div className="pt-0 p-4 md:p-6">
                  <div className="inline-flex items-center gap-2 text-sm font-medium text-white/90">
                    Explore
                    <SideArrow />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
