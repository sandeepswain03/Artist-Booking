"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { CiCalendarDate } from "react-icons/ci";
import { VscLocation } from "react-icons/vsc";
import { PiListDashesBold } from "react-icons/pi";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { MdOutlineEmail } from "react-icons/md";

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

  useEffect(() => {
    const fetchConcert = async () => {
      try {
        const response = await axios.get(`/api/concert/concertid?id=${params.id}`);
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
    </div>
  );
}
