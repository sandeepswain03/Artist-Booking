"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SideArrow, Star } from "@/components/svgIcons";

const MagicBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isNext, setIsNext] = useState(false);
  const [isPrev, setIsPrev] = useState(false);

  const images = [
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80",
  ];

  const testimonials = [
    {
      imageSrc:
        "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80",
      name: "Paul Starr",
      text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad mollitia rerum quo unde neque atque molestias quas pariatur! Sint, maxime?",
      rating: 5,
    },
    {
      imageSrc:
        "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80",
      name: "Paul Starr",
      text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad mollitia rerum quo unde neque atque molestias quas pariatur! Sint, maxime?",
      rating: 3,
    },
    {
      imageSrc:
        "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80",
      name: "Paul Starr",
      text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad mollitia rerum quo unde neque atque molestias quas pariatur! Sint, maxime?",
      rating: 4,
    },
    {
      imageSrc:
        "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80",
      name: "Paul Starr",
      text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad mollitia rerum quo unde neque atque molestias quas pariatur! Sint, maxime?",
      rating: 5,
    },
    {
      imageSrc:
        "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80",
      name: "Paul Starr",
      text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad mollitia rerum quo unde neque atque molestias quas pariatur! Sint, maxime?",
      rating: 5,
    },
    {
      imageSrc:
        "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80",
      name: "Paul Starr",
      text: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad mollitia rerum quo unde neque atque molestias quas pariatur! Sint, maxime?",
      rating: 4,
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 3 ? 0 : prevSlide + 1));
    setIsNext(true);
    setIsPrev(false);
    setTimeout(() => {
      setIsNext(false);
    }, 500);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide();
    }, 3500);

    return () => clearTimeout(timer);
  }, [currentSlide]);

  return (
    <>
      {/* hero section */}
      <div
        className={`relative ${isNext ? "next" : ""} ${isPrev ? "prev" : ""}`}
      >
        <div className="relative h-[600px] overflow-hidden">
          {images.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ${
                currentSlide === index ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={img}
                alt={`Slide ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className="brightness-[0.60]"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-xl ml-1 font-semibold tracking-wider text-slate-300">
                    Events Booking
                  </p>
                  <h1 className="my-5 text-3xl lg:text-6xl font-bold text-slate-200">
                    Explore Our
                  </h1>
                  <h1 className="my-5 drop-shadow-2xl text-lime-500 text-5xl lg:text-7xl font-bold">
                    Events Now!
                  </h1>
                  <p className="w-2/3 mx-auto hidden lg:block text-slate-200">
                    From elegant soirées to lively gatherings, we curate diverse
                    events for every occasion, guaranteeing a memorable
                    experience for all guests.
                  </p>
                  <Link href="/concerts">
                    <button
                      type="button"
                      className="mt-14 text-white bg-gradient-to-r from-rose-700 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-sm text-lg px-7 py-2 text-center mb-2"
                    >
                      See More
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((img, index) => (
            <div
              key={index}
              className={`w-16 h-16 relative cursor-pointer ${
                currentSlide === index ? "border-2 border-red-500" : ""
              }`}
              onClick={() => setCurrentSlide(index)}
            >
              <Image
                src={img}
                alt={`Thumbnail ${index + 1}`}
                layout="fill"
                objectFit="cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* About Us */}
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 xl:gap-20 items-center">
          <div className="relative">
            <Image
              className="w-full rounded-lg shadow-lg"
              src="https://images.unsplash.com/photo-1525098434707-6ce12d833c63?q=80&w=1921&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="About Us Image"
              width={700}
              height={800}
            />
            <div className="absolute inset-0 -z-[1] bg-gradient-to-tr from-rose-100 via-pink-100 to-rose-100 rounded-lg transform -rotate-3 scale-105"></div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-800 sm:text-4xl lg:text-5xl mb-4">
              About <span className="text-rose-600">Event Booking</span> Company
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              The Artist Booking Company is your premier destination for
              seamless event entertainment, with over 23 years of expertise. We
              specialize in curating unforgettable experiences for a wide range
              of events, including weddings, corporate gatherings, college
              festivals, brand endorsements, celebrity appearances, and social
              soirées.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Headquartered in Mumbai, India, our global network of artists,
              celebrities, and agents allows us to bring world-class talent to
              your doorstep, no matter where you are.
            </p>

            <Link
              href="/artists"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-rose-600 rounded-md shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-colors duration-200"
            >
              Meet Our Artists
              <SideArrow />
            </Link>
          </div>
        </div>
      </div>

      {/* Our Services */}
      <div className="max-w-[85rem] px-4 py-6 sm:px-6 lg:px-8 lg:py-12 mx-auto">
        <h1 className="flex justify-center mb-10 font-bold text-rose-600 text-3xl md:text-4xl lg:text-5xl text-center">
          Our Event Management Services
        </h1>
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Artists Service */}
          <Link
            href="/artists"
            className="group block rounded-xl overflow-hidden focus:outline-none"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
              <div className="shrink-0 relative rounded-xl overflow-hidden w-full sm:w-56 h-44">
                <Image
                  className="group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out size-full absolute top-0 start-0 object-cover rounded-xl"
                  src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                  alt="Artists Service"
                  layout="fill"
                />
              </div>
              <div className="grow">
                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-gray-600">
                  Artist Booking
                </h3>
                <p className="mt-3 text-gray-600">
                  Find and book talented artists for your events.
                </p>
                <p className="mt-4 inline-flex items-center gap-x-1 text-sm text-rose-400 decoration-2 group-hover:underline group-focus:underline font-medium">
                  Explore Artists
                  <SideArrow />
                </p>
              </div>
            </div>
          </Link>

          {/* Events Service */}
          <Link
            href="/concerts"
            className="group block rounded-xl overflow-hidden focus:outline-none"
          >
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
              <div className="shrink-0 relative rounded-xl overflow-hidden w-full sm:w-56 h-44">
                <Image
                  className="group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out size-full absolute top-0 start-0 object-cover rounded-xl"
                  src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80"
                  alt="Events Service"
                  layout="fill"
                />
              </div>
              <div className="grow">
                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-gray-600">
                  Event Planning
                </h3>
                <p className="mt-3 text-gray-600">
                  Comprehensive event planning and management services.
                </p>
                <p className="mt-4 inline-flex items-center gap-x-1 text-sm text-rose-400 decoration-2 group-hover:underline group-focus:underline font-medium">
                  Explore Events
                  <SideArrow />
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* What We Do */}
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 xl:gap-20 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 sm:text-4xl lg:text-5xl mb-4">
              About <span className="text-rose-600">Event Booking</span> Company
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              The Artist Booking Company is your premier destination for
              seamless event entertainment, with over 23 years of expertise. We
              specialize in curating unforgettable experiences for a wide range
              of events, including weddings, corporate gatherings, college
              festivals, brand endorsements, celebrity appearances, and social
              soirées.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Headquartered in Mumbai, India, our global network of artists,
              celebrities, and agents allows us to bring world-class talent to
              your doorstep, no matter where you are.
            </p>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-rose-600 rounded-md shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-colors duration-200"
            >
              Contact Us
              <SideArrow />
            </Link>
          </div>

          <div className="relative">
            <Image
              className="w-full rounded-lg shadow-lg"
              src="https://images.unsplash.com/photo-1525098434707-6ce12d833c63?q=80&w=1921&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="About Us Image"
              width={700}
              height={800}
            />
            <div className="absolute inset-0 -z-[1] bg-gradient-to-tr from-rose-100 via-pink-100 to-rose-100 rounded-lg transform -rotate-3 scale-105"></div>
          </div>
        </div>
      </div>

      {/* customer review */}
      <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <h2 className="text-center text-4xl font-bold tracking-tight text-rose-600 sm:text-5xl">
          What Our Customers Say
        </h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex flex-col h-full">
              <blockquote className="flex-1 flex flex-col justify-between rounded-lg bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg border border-rose-100">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      alt={testimonial.name}
                      src={testimonial.imageSrc}
                      className="w-16 h-16 rounded-full object-cover border-2 border-rose-300"
                    />
                    <div>
                      <p className="text-lg font-semibold text-gray-900">
                        {testimonial.name}
                      </p>
                      <div className="flex gap-0.5 text-rose-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} filled={i < testimonial.rating} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">&ldquo;{testimonial.text}&rdquo;</p>
                </div>
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MagicBanner;
