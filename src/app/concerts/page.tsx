"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { FaSearch, FaCalendarAlt } from "react-icons/fa";
import { TbCategory2 } from "react-icons/tb";
import { CiLocationOn } from "react-icons/ci";
import Image from "next/image";

interface Concert {
  _id: string;
  title: string;
  date: string;
  concertImages: { url: string; public_id: string }[];
  location: string;
}

export default function ConcertsPage() {
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [filteredConcerts, setFilteredConcerts] = useState<Concert[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        const response = await axios.get("/api/concert");
        if (response.data.success) {
          const currentDate = new Date();
          const upcomingConcerts = response.data.data.filter((concert: Concert) => {
            return new Date(concert.date) >= currentDate;
          });
          setConcerts(upcomingConcerts);
          setFilteredConcerts(upcomingConcerts);
        }
      } catch (error) {
        console.error("Error fetching concerts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchConcerts();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = concerts;

      if (searchTerm) {
        filtered = filtered.filter((concert) =>
          concert.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (filterDate) {
        filtered = filtered.filter((concert) => {
          const concertDate = new Date(concert.date)
            .toISOString()
            .split("T")[0];
          return concertDate === filterDate;
        });
      }

      setFilteredConcerts(filtered);
    };

    applyFilters();
  }, [concerts, searchTerm, filterDate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[#CE1446]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl md:text-5xl font-bold text-center text-secondary mt-10 uppercase">
        All Events
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 my-10 md:my-20 gap-6">
        <div className="md:col-span-1">
          {/* Search */}
          <form className="flex bg-gray-50 p-5 shadow-md rounded-md">
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

          {/* Date Filter */}
          <div className="bg-gray-50 shadow-md rounded-md mt-8">
            <div className="pt-6">
              <span className="bg-[#CE1446] inline-flex gap-2 items-center text-white text-xl font-bold p-5 rounded-r-xl">
                <TbCategory2 /> Date Filter
              </span>
            </div>
            <div className="mt-3">
              <button
                className="block w-full text-left p-5 hover:bg-secondary hover:text-[#CE1446] text-xl font-semibold border-b"
                onClick={() => setFilterDate("")}
              >
                All Dates
              </button>
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="block w-full text-left p-5 text-xl font-semibold border-b"
              />
            </div>
          </div>
        </div>

        {/* cards */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filteredConcerts.map((concert) => {
            const dateFormat = new Date(concert.date);
            const options = { day: "numeric", month: "long", year: "numeric" };
            const formattedDate = dateFormat.toLocaleDateString(
              "en-US",
              options as Intl.DateTimeFormatOptions
            );

            return (
              <div
                key={concert._id}
                className="rounded-md shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:shadow-lg bg-white hover:bg-gray-100"
              >
                <div className="rounded-t-md shadow-lg h-60 relative overflow-hidden">
                  <Image
                    src={concert.concertImages[0]?.url || "/default-image.jpg"}
                    alt={concert.title}
                    width={400}
                    height={200}
                    className="rounded-t-md h-full w-full object-cover transform transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="px-4 py-6">
                  <div className="flex justify-between">
                    <p className="text-sm text-secondary font-medium flex gap-2">
                      <FaCalendarAlt className="text-[#CE1446] text-base" />
                      {formattedDate}
                    </p>
                    <p className="text-sm text-secondary font-medium flex gap-1">
                      <CiLocationOn className="text-[#CE1446] text-lg font-bold" />{" "}
                      {concert.location}
                    </p>
                  </div>
                  <h2 className="text-2xl mt-2 font-semibold text-secondary">
                    {concert.title}
                  </h2>
                  <div className="flex justify-between items-center mt-4">
                    <Link
                      href={`/concerts/${concert._id}`}
                      className="text-[#CE1446] font-semibold underline"
                    >
                      Event Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
