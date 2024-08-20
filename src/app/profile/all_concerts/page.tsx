"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

interface Concert {
  _id: string;
  title: string;
  location: string;
  price: number;
  concertImages: { url: string; public_id: string }[];
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
    <section className="w-full lg:w-3/4 p-4 sm:p-6 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {concerts.length > 0 ? (
          concerts.map((concert) => (
            <div
              key={concert._id}
              className="bg-pink-100 rounded-lg shadow-md p-4"
            >
              <img
                src={concert.concertImages[0]?.url || ""}
                alt="Concert Cover"
                className="w-full h-40 object-cover rounded-lg"
              />
              <div className="mt-4">
                <h5 className="text-lg font-semibold text-gray-800">
                  {concert.title}
                </h5>
                <p className="text-sm text-gray-600 mt-2">
                  Price: ${concert.price}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Address: {concert.location}
                </p>
              </div>
              <div className="mt-4 text-right">
                <button
                  onClick={() => handleDelete(concert._id)}
                  disabled={loading && deletingId === concert._id}
                  className={`px-4 py-2 bg-red-500 text-white rounded-md shadow-sm hover:bg-red-600 transition duration-200 ${
                    loading && deletingId === concert._id
                      ? "cursor-not-allowed opacity-50"
                      : ""
                  }`}
                >
                  {loading && deletingId === concert._id
                    ? "Deleting..."
                    : "Delete"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No concerts created yet.</p>
        )}
      </div>
    </section>
  );
}
