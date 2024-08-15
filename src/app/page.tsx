import Link from "next/link";
import Image from "next/image";
import { SideArrow, Star } from "@/components/svgIcons";

const stats = [
  { title: "Countries", value: "50+", description: "Reached Countries" },
  { title: "Artists", value: "500+", description: "Worked Together" },
  { title: "Clients", value: "2000+", description: "Trusted Our Services" },
  { title: "Events", value: "1000+", description: "Successful Events" },
];

const items = [
  {
    href: "/",
    imageSrc:
      "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&q=80",
    imageAlt: "Celebrities Image",
    title: "Bollywood Celebrities",
    description:
      "Produce professional, reliable streams easily leveraging Preline's innovative broadcast studio",
  },
  {
    href: "/",
    imageSrc:
      "https://images.unsplash.com/photo-1668906093328-99601a1aa584?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&q=80",
    imageAlt: "Singers Image",
    title: "Singers",
    description:
      "Optimize your in-person experience with best-in-class capabilities like badge printing and lead retrieval",
  },
  {
    href: "/",
    imageSrc:
      "https://images.unsplash.com/photo-1567016526105-22da7c13161a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&q=80",
    imageAlt: "Anchors Image",
    title: "Anchors",
    description: "How to make objectives and key results work for your company",
  },
  {
    href: "/",
    imageSrc:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&q=80",
    imageAlt: "Comedians Image",
    title: "Comedians",
    description: "Six approaches to bringing your People strategy to life",
  },
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

function page() {
  return (
    <>
      {/* Hero section */}
      <div className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="flex absolute -top-96 start-1/2 transform -translate-x-1/2"
        >
          <div className="bg-gradient-to-r from-violet-300/50 to-purple-100 blur-3xl w-[25rem] h-[44rem] rotate-[-60deg] transform -translate-x-[10rem]"></div>
          <div className="bg-gradient-to-tl from-[#E2BFD9] via-purple-100 to-[#E2BFD9] blur-3xl w-[90rem] h-[50rem] rounded-fulls origin-top-left -rotate-12 -translate-x-[15rem]"></div>
        </div>

        <div className="relative z-10">
          <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
            <div className="max-w-2xl text-center mx-auto">
              <p className="inline-block text-sm font-medium bg-clip-text bg-gradient-to-l from-pink-500 to-violet-500 text-transparent">
                Welcome to Artist Booking
              </p>
              <span>👋</span>

              <div className="mt-5 max-w-2xl">
                <h1 className="block font-bold text-gray-800 text-3xl md:text-5xl lg:text-6xl">
                  Explore Concerts 🎸
                </h1>
              </div>

              <div className="mt-5 max-w-3xl">
                <p className="text-lg text-gray-600">
                  Preline UI is an open-source set of prebuilt UI components,
                  ready-to-use examples and Figma design system based on the
                  utility-first Tailwind CSS framework.
                </p>
              </div>

              <div className="mt-8 gap-3 flex justify-center">
                <Link
                  className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-[#674188] text-white hover:bg-[#4e3366] focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                  href="/concerts"
                >
                  Explore
                  <SideArrow />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* about us */}
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-4 md:gap-8 xl:gap-20 md:items-center">
          <div>
            <h1 className="block text-3xl font-bold text-gray-800 sm:text-4xl lg:text-6xl lg:leading-tight text-center lg:text-left">
              About Artist Booking
              <span className="text-[#674188]"> Company</span>
            </h1>
            <p className="mt-3 text-lg text-gray-800 text-justify">
              The Artist Booking Company (Artist Booking Company) is a
              specialised company to make booking entertainment at your events
              as easy as Artist Booking Company.. and we have been doing so for
              over 23 years! Being a one-stop solution, we offer a diverse array
              of services tailored to all types of events and productions,
              including Weddings, Corporate Events, College Festivals, Brand
              Endorsements, Celebrity Appearances, and Social Events. Artist
              Booking Company is headquartered in Mumbai, India, but its reach
              is global owing to its vast network of artists, celebrities and
              agents throughout the world.
            </p>

            <div className="mt-7 grid gap-3 w-full sm:inline-flex">
              <Link
                className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-[#674188] text-white hover:bg-[#4e3366] focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                href="/"
              >
                Read More
                <SideArrow />
              </Link>
            </div>
          </div>

          <div className="relative ms-4">
            <Image
              className="w-full rounded-md"
              src="https://images.unsplash.com/photo-1525098434707-6ce12d833c63?q=80&w=1921&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Hero Image"
              width={700}
              height={800}
            />
            <div className="absolute inset-0 -z-[1] bg-gradient-to-tr from-[#E2BFD9] via-[#F7EFE5] to-[#E2BFD9]  size-full rounded-md mt-4 -mb-4 me-4 -ms-4 lg:mt-6 lg:-mb-6 lg:me-6 lg:-ms-6"></div>
          </div>
        </div>
      </div>

      {/* Trusted by */}
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="grid gap-6 grid-cols-2 sm:gap-12 lg:grid-cols-4 lg:gap-52">
          {stats.map((stat, index) => (
            <div key={index}>
              <h4 className="text-lg sm:text-xl font-bold text-gray-800">
                {stat.title}
              </h4>
              <p className="mt-2 sm:mt-3 text-4xl sm:text-6xl font-bold inline-block bg-clip-text bg-gradient-to-l from-pink-500 to-violet-500 text-transparent">
                {stat.value}
              </p>
              <p className="mt-1 text-gray-500">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* our services */}
      <div className="max-w-[85rem] px-4 py-6 sm:px-6 lg:px-8 lg:py-12 mx-auto">
        <h1 className="flex justify-center mb-10 font-bold text-[#674188] text-3xl md:text-4xl lg:text-5xl text-center">
          Our Event Management Services
        </h1>
        <div className="grid lg:grid-cols-2 lg:gap-y-16 gap-10">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="group block rounded-xl overflow-hidden focus:outline-none"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
                <div className="shrink-0 relative rounded-xl overflow-hidden w-full sm:w-56 h-44">
                  <Image
                    className="group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out size-full absolute top-0 start-0 object-cover rounded-xl"
                    src={item.imageSrc}
                    alt={item.imageAlt}
                    layout="fill"
                  />
                </div>

                <div className="grow">
                  <h3 className="text-xl font-semibold text-gray-800 group-hover:text-gray-600">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-gray-600">{item.description}</p>
                  <p className="mt-4 inline-flex items-center gap-x-1 text-sm text-pink-400 decoration-2 group-hover:underline group-focus:underline font-medium">
                    Explore
                    <SideArrow />
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* what we do */}
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-4 md:gap-8 xl:gap-20 md:items-center">
          <div className="relative ms-4">
            <Image
              className="w-full rounded-md"
              src="https://images.unsplash.com/photo-1525098434707-6ce12d833c63?q=80&w=1921&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Hero Image"
              width={700}
              height={800}
            />
            <div className="absolute inset-0 -z-[1] bg-gradient-to-tr from-[#E2BFD9] via-[#F7EFE5] to-[#E2BFD9] size-full rounded-md mt-4 -mb-4 me-4 -ms-4 lg:mt-6 lg:-mb-6 lg:me-6 lg:-ms-6"></div>
          </div>
          <div>
            <h1 className="block text-3xl font-bold text-gray-800 sm:text-4xl lg:text-6xl lg:leading-tight text-center lg:text-left">
              What We Do
              <span className="text-[#674188]"> ?</span>
            </h1>
            <p className="mt-3 text-lg text-gray-800 text-justify">
              At Artist Booking Company (Artist Booking Company), we take away
              the hassle of booking artists and celebrities. Are you thinking of
              booking a singer for a wedding? Artist Booking Company has got you
              covered. We will consult our database of over 300 singers and
              musicians, covering every genre imaginable, to provide you with
              the perfect wedding singer or corporate entertainer for your
              event. Are you looking to hire a celebrity or television
              personality to enhance your event? Artist Booking Company will
              take care of it. Our experience with high-profile artists enable
              us to ensure that they are well looked-after throughout the entire
              process from initial artist booking to travel & accommodation to
              stage management; a happy celebrity means a happy event!
            </p>

            <div className="mt-7 grid gap-3 w-full sm:inline-flex">
              <Link
                className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-[#674188] text-white hover:bg-[#4e3366] focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
                href="/"
              >
                Read More
                <SideArrow />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* customer review */}
      <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <h2 className="text-center text-4xl font-bold tracking-tight text-[#674188] sm:text-5xl">
          Read trusted reviews from our customers
        </h2>
        <div className="mt-8 [column-fill:_balance] sm:columns-2 sm:gap-6 lg:columns-3 lg:gap-8">
          <div>
            {testimonials.map((testimonial, index) => (
              <div key={index} className="mb-8 sm:break-inside-avoid">
                <blockquote className="rounded-lg bg-gradient-to-tl from-[#E2BFD9] via-purple-100 to-[#E2BFD9] p-6 shadow-sm sm:p-8">
                  <div className="flex items-center gap-4">
                    <img
                      alt={testimonial.name}
                      src={testimonial.imageSrc}
                      className="size-14 rounded-full object-cover"
                    />
                    <div>
                      <div className="flex justify-center gap-0.5 text-yellow-300">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} filled={i < testimonial.rating} />
                        ))}
                      </div>
                      <p className="mt-0.5 text-lg font-medium text-gray-900">
                        {testimonial.name}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-gray-700">{testimonial.text}</p>
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
