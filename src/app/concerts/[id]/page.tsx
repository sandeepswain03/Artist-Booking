"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { CiCalendarDate, CiLocationOn } from "react-icons/ci";
import { VscLocation } from "react-icons/vsc";
import { PiListDashesBold } from "react-icons/pi";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { MdOutlineEmail } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";

interface Concert {
  _id: string;
  title: string;
  date: string;
  description: string;
  location: string;
  price: string;
  genre: string;
  concertImages: { url: string; public_id: string }[];
  artistId: {
    _id: string;
    username: string;
    email: string;
  };
}

export default function ConcertDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const [concert, setConcert] = useState<Concert | null>(null);
  const [allConcerts, setAllConcerts] = useState<Concert[]>([]);
  useEffect(() => {
    const fetchConcert = async () => {
      try {
        // Fetch the specific concert details
        const response = await axios.get(
          `/api/concert/concertid?id=${params.id}`
        );
        // Fetch all concerts
        const response2 = await axios.get("/api/concert");

        if (response.data.success) {
          setConcert(response.data.data);
          // Get the current date and time
          const now = new Date();
          // Filter out the concert with the same _id
          const filteredConcerts = response2.data.data.filter(
            (item: Concert) =>
              item._id !== response.data.data._id && new Date(item.date) > now
          );
          setAllConcerts(filteredConcerts);
        }
      } catch (error) {
        console.error("Error fetching concert details:", error);
      }
    };
    fetchConcert();
  }, [params.id]);

  if (!concert) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  const formattedDate = new Date(concert.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="container mx-auto px-4 py-8 mt-10 sm:mt-4">
      <h1 className="text-4xl font-bold text-center mb-12 text-black">
        Event Details
      </h1>
      <div className="max-w-4xl mx-auto">
        <Carousel
          showArrows={true}
          showStatus={false}
          showThumbs={false}
          infiniteLoop={true}
          autoPlay={true}
          interval={3000}
          className="mb-8"
        >
          {concert.concertImages.map((image, index) => (
            <div key={index} className="relative h-64 sm:h-80 md:h-96">
              <Image
                src={image.url}
                alt={`Concert Image ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </div>
          ))}
        </Carousel>
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 mb-8">
          <p className="flex items-center text-sm gap-2 mb-2 sm:mb-0">
            <CiCalendarDate className="text-xl text-primary" />
            {formattedDate}
          </p>
          <p className="flex items-center gap-2 text-red-600 font-semibold text-lg sm:text-xl mb-2 sm:mb-0">
            {concert.title}
          </p>
          <p className="flex items-center gap-1 text-sm">
            <VscLocation className="text-2xl text-primary" />
            {concert.location}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row text-sm gap-6 border-y py-6 my-8 justify-evenly">
          <div className="flex gap-3 items-center">
            <PiListDashesBold className="text-red-500 text-xl" />
            <div>
              <p className="font-semibold">Event Type</p>
              <p>{concert.genre}</p>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <HiOutlineSpeakerphone className="text-red-500 text-xl" />
            <div>
              <p className="font-semibold">Artist</p>
              <p>{concert.artistId.username}</p>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <MdOutlineEmail className="text-red-500 text-xl" />
            <div>
              <p className="font-semibold">Contact Email</p>
              <p>{concert.artistId.email}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-3 my-8">
          <div className="bg-pink-700 text-white px-8 py-3 rounded-md text-center shadow-md">
            <span className="text-xl font-semibold">&#8377;</span>
            <span className="text-3xl font-semibold ">{concert.price}</span>
            <span className="ms-1 font-normal">/ Person</span>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
            Description
          </h2>
          <p className="text-gray-600 leading-relaxed text-sm sm:text-base text-justify">
            {concert.description}
          </p>
        </div>
      </div>

      {/* All Concerts */}

      {/* allConcerts */}

      {/* Previous Events Section */}
      {allConcerts.length > 0 && (
        <section className="py-10 bg-gray-50 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              All Events
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {allConcerts.map((concert) => {
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
    </div>
  );
}
