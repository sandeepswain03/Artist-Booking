"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

// Define the Concert type
interface Concert {
  _id: string;
  title: string;
  date: string;
  description: string;
  location: string;
  price: string;
  concertImages: { url: string; public_id: string }[];
}

export default function ConcertDetailsPage({ params }: { params: { id: string } }) {
  const [concert, setConcert] = useState<Concert | null>(null);

  useEffect(() => {
    const fetchConcert = async () => {
      try {
        const response = await axios.get(`/api/concert/${params.id}`);
        if (response.data.success) {
          setConcert(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching concert details:", error);
      }
    };
    fetchConcert();
  }, [params.id]);

  if (!concert) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="relative p-6 md:p-16">
        <div className="relative z-10 lg:grid lg:grid-cols-12 lg:gap-12 lg:items-center">
          <div className="mb-10 lg:mb-0 lg:col-span-6 lg:col-start-8 lg:order-2">
            <h2 className="text-2xl text-gray-800 font-bold sm:text-3xl">
              {concert.title}
            </h2>

            <nav
              className="grid gap-4 mt-5 md:mt-10"
              aria-label="Tabs"
              role="tablist"
              aria-orientation="vertical"
            >
              <div className="text-start p-4 md:p-5 rounded-xl">
                <span className="flex gap-x-6">
                  <span className="grow">
                    <span className="block mt-1 text-gray-800 text-lg">
                      {concert.description}
                    </span>
                  </span>
                </span>
              </div>

              <div className="text-start p-4 md:p-5 rounded-xl">
                <span className="flex gap-x-6">
                  <span className="grow">
                    <span className="block text-xl font-semibold text-gray-800">
                      {concert.location}
                    </span>
                  </span>
                </span>
              </div>

              <div className="text-start p-4 md:p-5 rounded-xl">
                <span className="flex gap-x-6">
                  <span className="grow">
                    <span className="block text-xl font-semibold text-gray-800">
                      {concert.date}
                    </span>
                  </span>
                </span>
              </div>

              <div className="text-start p-4 md:p-5 rounded-xl">
                <span className="flex gap-x-6">
                  <span className="grow">
                    <span className="block text-xl font-semibold text-gray-800">
                      {concert.price}
                    </span>
                  </span>
                </span>
              </div>
            </nav>
          </div>
          <div className="lg:col-span-6 lg:w-[560px] lg:h-[560px]">
            <div className="relative">
              <div
                id={`tabs-with-card-1`}
                role="tabpanel"
                aria-labelledby={`tabs-with-card-item-1`}
              >
                <img
                  className="shadow-xl lg:absolute lg:top-16 rounded-xl"
                  src={concert.concertImages[0]?.url || ""}
                  alt={"Concert Cover"}
                  width={720}
                  height={720}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 grid grid-cols-12 size-full">
          <div className="col-span-full lg:col-span-7 lg:col-start-6 bg-[#E2BFD9] w-full h-5/6 rounded-xl sm:h-3/4 lg:h-full"></div>
        </div>
      </div>
    </div>
  );
}
