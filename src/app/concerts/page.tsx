"use client";
import React, { useState } from "react";
import Link from "next/link";
import { OrangeLine, BlueLine, Search } from "../../components/svgIcons";

const concertData = [
  {
    name: "Summer Music Festival",
    imageUrl:
      "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQJgAE0k0gDSS-HtqJUOGFFR2y6oo_9JSzt58jK-gtDyiax8CVNrdyBVzppOvdW",
    type: "Music Festival",
    date: "2024-08-15",
    link: "concert_inquiry",
  },
  {
    name: "Rock Legends Live",
    imageUrl:
      "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQJgAE0k0gDSS-HtqJUOGFFR2y6oo_9JSzt58jK-gtDyiax8CVNrdyBVzppOvdW",
    type: "Rock",
    date: "2024-09-10",
    link: "#",
  },
  {
    name: "Electronic Dance Night",
    imageUrl:
      "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRxYB4j9DVUnQtw0h5rXPXeHVXo1H40n_z0aNvTZMmIG-a0ZtevxuKXVxdxkYtV",
    type: "Electronic",
    date: "2024-10-20",
    link: "#",
  },
  {
    name: "Classical Harmony",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf6JNdh7NMTUZjc-lwuajcdNtoxeVHRAM3_2H04GxCPIPuoVinfsuVx_k8y4_W",
    type: "Classical",
    date: "2024-11-05",
    link: "#",
  },
  {
    name: "Jazz Under the Stars",
    imageUrl:
      "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSoH0QxDGjQkC2FB9PdGyB6N4_P8w0GyDhmktxNqHbo_2_jeJ3xe9vGTYxivBWe",
    type: "Jazz",
    date: "2024-12-15",
    link: "#",
  },
  {
    name: "Pop Extravaganza",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_1NLeWraoyI-qvf2r3I-24e1wktzEPn-7S5QY6sLUUcKc9dHETc4l_VnNFQZU",
    type: "Pop",
    date: "2024-11-25",
    link: "#",
  },
  {
    name: "Indie Rock Fest",
    imageUrl:
      "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSnG_c6zoch0NM1a4Sl3FsvrOG1DC6SvLaJP-Bgep4odRtpQYzpUUPdeFYwGE3Q",
    type: "Indie Rock",
    date: "2024-09-22",
    link: "#",
  },
  {
    name: "Country Music Gala",
    imageUrl:
      "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSqjBFzatVELzg4Q4fXNurmX0kXzvk6iR_nWTKFPxCTjY0BLYXs5wNMioUEjI5J",
    type: "Country",
    date: "2024-08-30",
    link: "#",
  },
];

export default function page() {
  const [filterType, setFilterType] = useState("All");
  const [filterDate, setFilterDate] = useState("");
  const [filterName, setFilterName] = useState("");

  const filteredConcerts = concertData.filter(
    (concert) =>
      (filterType === "All" || concert.type === filterType) &&
      (filterDate === "" || concert.date === filterDate) &&
      (filterName === "" ||
        concert.name.toLowerCase().includes(filterName.toLowerCase()))
  );
  return (
    <>
      {/* search Bar */}
      <div className="relative overflow-hidden bg-slate-100">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-24">
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
                    />
                  </div>
                  <div>
                    <Link
                      className="size-[46px] inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
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
            <div className="mt-10 sm:mt-20">
              {/* search type */}
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="m-1 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
              >
                <option value="All">All</option>
                <option value="Music Festival">Music Festival</option>
                <option value="Rock">Rock</option>
                <option value="Electronic">Electronic</option>
                <option value="Classical">Classical</option>
                <option value="Jazz">Jazz</option>
                <option value="Pop">Pop</option>
                <option value="Indie Rock">Indie Rock</option>
                <option value="Country">Country</option>
              </select>

              {/* search date */}
              <div className="m-1 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700">
                <input
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="px-4 py-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out bg-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
