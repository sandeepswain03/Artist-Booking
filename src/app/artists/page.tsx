"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  OrangeLine,
  BlueLine,
  Search,
  SideArrow,
} from "../../components/svgIcons";

const artistsData = [
  {
    name: "Amitabh Bachchan",
    imageUrl:
      "https://artistbookingcompany.com/wp-content/uploads/2024/03/amitabh-bacchan-740x740.jpg",
    category: "Singer",
    link: "artist_inquiry",
  },
  {
    name: "Shahrukh Khan",
    imageUrl:
      "https://artistbookingcompany.com/wp-content/uploads/2024/03/shahrukh-khan-740x740.png",
    category: "Singer",
    link: "artist_inquiry",
  },
  {
    name: "Salman Khan",
    imageUrl:
      "https://artistbookingcompany.com/wp-content/uploads/2024/03/salman-khan-740x740.png",
    category: "Bollywood Celebrity",
    link: "artist_inquiry",
  },
  {
    name: "Aishwarya Rai Bachchan",
    imageUrl:
      "https://artistbookingcompany.com/wp-content/uploads/2024/03/aishwarya-rai-740x740.png",
    category: "Bollywood Celebrity",
    link: "artist_inquiry",
  },
  {
    name: "Aamir Khan",
    imageUrl:
      "https://artistbookingcompany.com/wp-content/uploads/2024/03/amir-khan-740x740.png",
    category: "Bollywood Celebrity",
    link: "artist_inquiry",
  },
  {
    name: "Akshay Kumar",
    imageUrl:
      "https://artistbookingcompany.com/wp-content/uploads/2024/03/akshay-kumar-740x740.jpg",
    category: "Bollywood Celebrity",
    link: "artist_inquiry",
  },
  {
    name: "Hrithik Roshan",
    imageUrl:
      "https://artistbookingcompany.com/wp-content/uploads/2024/03/hrithik-roshan-740x740.jpg",
    category: "Bollywood Celebrity",
    link: "artist_inquiry",
  },
  {
    name: "Shahid Kapoor",
    imageUrl:
      "https://artistbookingcompany.com/wp-content/uploads/2024/03/shahid-kapoor-740x740.jpg",
    category: "Anchor",
    link: "artist_inquiry",
  },
];

function page() {
  const [filterType, setFilterType] = useState("All");
  const [filterName, setFilterName] = useState("");

  const filteredArtists = artistsData.filter(
    (concert) =>
      (filterType === "All" || concert.category === filterType) &&
      (filterName === "" ||
        concert.name.toLowerCase().includes(filterName.toLowerCase()))
  );
  return (
    <>
      {/* search Bar */}
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
                      placeholder="Search for a Concert"
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
            <div className="mt-8">
              {/* search category */}
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="m-1 py-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg bg-[#BCA7E7] text-gray-800 shadow-sm focus:ring-2 focus:ring-[#8F75E5]"
              >
                <option value="All">All</option>
                <option value="Bollywood Celebrity">Bollywood Celebrity</option>
                <option value="Singer">Singer</option>
                <option value="Anchor">Anchor</option>
                <option value="Standup Comedy">Standup Comedy</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      {/* artists section */}
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredArtists.map((artist, index) => (
            <div
              key={index}
              className="hover:scale-105 transition-all duration-300 ease-in-out"
            >
              <Link
                className="relative flex flex-col w-full min-h-60 bg-center bg-cover rounded-xl"
                href={artist.link}
                style={{ backgroundImage: `url(${artist.imageUrl})` }}
              >
                <div className="flex-auto p-4 md:p-6">
                  <h3 className="text-xl text-white/90">
                    <span className="font-bold">{artist.name}</span>
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

export default page;
