"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

interface Concert {
  _id: string;
  title: string;
  location: string;
  price: number;
  concertImages: { url: string; public_id: string }[];
  date: string;
  time: string;
  city: string;
  description: string;
}

export default function ConcertList() {
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        const response = await axios.get("/api/user");
        setConcerts(response.data.concerts);
      } catch (error) {
        console.error("Error fetching concerts:", error);
      }
    };

    fetchConcerts();
  }, []);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    setLoading(true);
    try {
      await axios.delete(`/api/concert?id=${id}`);
      setConcerts((prevConcerts) =>
        prevConcerts.filter((concert) => concert._id !== id)
      );
    } catch (error) {
      console.error("Error deleting concert:", error);
    } finally {
      setLoading(false);
      setDeletingId(null);
    }
  };

  return (
    <section className="w-full p-4 sm:p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-sm shadow p-4 sm:p-7">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800">All Events</h2>
          <p className="text-sm text-gray-600">
            View and manage all Events.
          </p>
        </div>

        <div className="space-y-4">
          {concerts.length > 0 ? (
            concerts.map((concert) => (
              <div
                key={concert._id}
                className="bg-gray-50 rounded-sm p-4 hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  {concert.concertImages &&
                    concert.concertImages.length > 0 && (
                      <div className="w-full sm:w-1/3">
                        <Image
                          src={concert.concertImages[0].url}
                          alt={concert.title}
                          width={300}
                          height={200}
                          className="object-cover rounded-sm w-full h-48"
                        />
                      </div>
                    )}
                  <div className="w-full sm:w-2/3">
                    <h5 className="text-lg font-semibold text-gray-800 mb-3">
                      {concert.title}
                    </h5>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Date:</span>{" "}
                        {new Date(concert.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Time:</span>{" "}
                        {concert.time}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Location:</span>{" "}
                        {concert.location}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">City:</span>{" "}
                        {concert.city}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Price:</span> ₹
                        {concert.price}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 mt-3">
                      <span className="font-semibold">Description:</span>{" "}
                      {concert.description}
                    </p>
                    <div className="mt-4 text-right">
                      <button
                        onClick={() => handleDelete(concert._id)}
                        disabled={loading && deletingId === concert._id}
                        className="w-full sm:w-auto bg-[#CE1446] text-white py-2 px-4 rounded-sm text-sm sm:text-base font-medium tracking-wide hover:bg-[#B01238] transition-colors duration-300 disabled:opacity-50 disabled:pointer-events-none"
                      >
                        {loading && deletingId === concert._id
                          ? "Deleting..."
                          : "Delete"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">No concerts found.</p>
          )}
        </div>
      </div>
    </section>
  );
}
