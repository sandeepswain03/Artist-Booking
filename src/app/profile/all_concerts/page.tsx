"use client";
import React, { useState } from "react";

export default function ConcertList() {
  const [concerts, setConcerts] = useState([
    {
      id: 1,
      coverImage: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQJgAE0k0gDSS-HtqJUOGFFR2y6oo_9JSzt58jK-gtDyiax8CVNrdyBVzppOvdW",
      description: "Live concert at Central Park.",
      price: 40,
      address: "Central Park, NYC",
    },
    {
      id: 2,
      coverImage: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQJgAE0k0gDSS-HtqJUOGFFR2y6oo_9JSzt58jK-gtDyiax8CVNrdyBVzppOvdW",
      description: "Live concert at Central Park.",
      price: 50,
      address: "Central Park, NYC",
    },
    {
      id: 3,
      coverImage: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQJgAE0k0gDSS-HtqJUOGFFR2y6oo_9JSzt58jK-gtDyiax8CVNrdyBVzppOvdW",
      description: "Live concert at Central Park.",
      price: 30,
      address: "Central Park, NYC",
    },
    
  ]);

  const handleDelete = (id: number) => {
    const updatedConcerts = concerts.filter((concert) => concert.id !== id);
    setConcerts(updatedConcerts);
  };

  return (
    <section className="w-full lg:w-3/4 p-4 sm:p-6 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {concerts.length > 0 ? (
          concerts.map((concert) => (
            <div key={concert.id} className="bg-pink-100 rounded-lg shadow-md p-4">
              <img
                src={concert.coverImage}
                alt="Concert Cover"
                className="w-full h-40 object-cover rounded-lg"
              />
              <div className="mt-4">
                <h5 className="text-lg font-semibold text-gray-800">{concert.description}</h5>
                <p className="text-sm text-gray-600 mt-2">Price: ${concert.price}</p>
                <p className="text-sm text-gray-600 mt-1">Address: {concert.address}</p>
              </div>
              <div className="mt-4 text-right">
                <button
                  onClick={() => handleDelete(concert.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md shadow-sm hover:bg-red-600 transition duration-200"
                >
                  Delete
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
