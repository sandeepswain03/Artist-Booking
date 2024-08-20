"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { OrangeLine, BlueLine, Search, SideArrow } from "@/components/svgIcons";

interface Concert {
  _id: string;
  title: string;
  date: string;
  concertImages: { url: string; public_id: string }[];
}

export default function ConcertsPage() {
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [filterDate, setFilterDate] = useState("");
  const [filterName, setFilterName] = useState("");

  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        const response = await axios.get("/api/concert");
        if (response.data.success) {
          setConcerts(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching concerts:", error);
      }
    };
    fetchConcerts();
  }, []);

  const filteredConcerts = concerts.filter(
    (concert) =>
      (filterDate === "" || concert.date === filterDate) &&
      (filterName === "" ||
        concert.title.toLowerCase().includes(filterName.toLowerCase()))
  );

  return (
    <>
      {/* search Bar */}
      <div className="relative overflow-hidden bg-gradient-to-tl from-[#E2BFD9] via-purple-100 to-[#E2BFD9]">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 bg-gradient-to-tl from-[#E2BFD9] via-purple-100 to-[#E2BFD9]">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-800">
              Search Concerts
            </h1>
            <p className="mt-3 text-gray-600">
              Search your favorite Concerts and enjoy!
            </p>
            <div className="mt-7 sm:mt-12 mx-auto max-w-xl relative">
              <form>
                <div className="relative z-10 flex gap-x-3 p-3 bg-white border rounded-lg shadow-lg shadow-gray-100">
                  <div className="w-full">
                    <label
                      htmlFor="hs-search-article-1"
                      className="block text-sm text-gray-700 font-medium"
                    >
                      <span className="sr-only">Search for a Concert</span>
                    </label>
                    <input
                      type="text"
                      name="hs-search-article-1"
                      id="hs-search-article-1"
                      className="py-2.5 px-4 block w-full border-transparent rounded-lg focus:border-blue-500 focus:ring-blue-500"
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
              {/* search date */}
              <div className="m-1 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg bg-white">
                <input
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="px-4 py-2 block w-full border border-gray-300 rounded-md shadow-sm transition bg-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Concerts section */}
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredConcerts.length > 0 ? (
            filteredConcerts.map((concert) => (
              <div
                key={concert._id}
                className="hover:scale-105 transition-all duration-300 ease-in-out"
              >
                <Link
                  className="relative flex flex-col w-full min-h-60 bg-center bg-cover rounded-xl"
                  href={`/concerts/${concert._id}`}
                  style={{ backgroundImage: `url(${concert.concertImages[0]?.url || ""})` }}
                >
                  <div className="flex-auto p-4 md:p-6">
                    <h3 className="text-xl text-white/90">
                      <span className="font-bold">{concert.title}</span>
                      <br />
                      {concert.date}
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
            ))
          ) : (
            <p className="text-center text-gray-600">No concerts found.</p>
          )}
        </div>
      </div>
    </>
  );
}
