"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Artist {
  _id: string;
  username: string;
  bio: string;
  videoLink1: string;
  videoLink2?: string;
  videoLink3?: string;
  avatar: { url: string; public_id: string };
}

export default function ArtistDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const [artist, setArtist] = useState<Artist | null>(null);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await axios.get(`/api/artist/${params.id}`);
        if (response.data.success) {
          setArtist(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching artist details:", error);
      }
    };
    fetchArtist();
  }, [params.id]);

  if (!artist) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section className="ezy__about8 light pb-14 md:pb-24 text-zinc-900">
        <div className="relative bg-opacity-60 py-6">
          <div className="container mx-auto px-4"></div>
        </div>
        <div className="container mx-auto px-4 mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="col-span-1 lg:col-span-1 flex justify-center items-center">
              <div className="border-[15px] border-transparent outline outline-[3px] outline-indigo-600 rounded-full w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] overflow-hidden">
                <img
                  src={artist.avatar.url}
                  alt={artist.username}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="col-span-1 lg:col-span-1 mb-6 lg:mb-0">
              <div className="relative">
                <h1 className="text-2xl md:text-4xl font-bold mb-4">
                  {artist.username}
                </h1>
                <p className="opacity-75 mb-2 text-sm md:text-base leading-relaxed text-justify">
                  {artist.bio}
                </p>
              </div>
              {/* Optional: Video Links */}
              <div className="container mx-auto px-4 mt-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {artist.videoLink1 && (
                    <iframe
                      className="w-full h-64"
                      src={artist.videoLink1}
                      title={`${artist.username} Video 1`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  )}
                  {artist.videoLink2 && (
                    <iframe
                      className="w-full h-64"
                      src={artist.videoLink2}
                      title={`${artist.username} Video 2`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  )}
                  {artist.videoLink3 && (
                    <iframe
                      className="w-full h-64"
                      src={artist.videoLink3}
                      title={`${artist.username} Video 3`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
