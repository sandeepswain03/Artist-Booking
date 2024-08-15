import React from "react";

const events = [
  {
    name: "Summer Music Festival",
    imageUrl:
      "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQJgAE0k0gDSS-HtqJUOGFFR2y6oo_9JSzt58jK-gtDyiax8CVNrdyBVzppOvdW",
    date: "2024-08-15",
    link: "/concert_enquiry",
    description:
      "Join us for an unforgettable evening of music with John Smith.",
    address: "The Fillmore Auditorium, 1999 Mori Blvd, Delhi",
    Pricing: "₹2,500",
  },
];

const EventList = () => {
  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      {events.map((event, index) => (
        <div key={index} className="relative p-6 md:p-16">
          <div className="relative z-10 lg:grid lg:grid-cols-12 lg:gap-12 lg:items-center">
            <div className="mb-10 lg:mb-0 lg:col-span-6 lg:col-start-8 lg:order-2">
              <h2 className="text-2xl text-gray-800 font-bold sm:text-3xl">
                {event.name}
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
                        {event.description}
                      </span>
                    </span>
                  </span>
                </div>

                <div className="text-start p-4 md:p-5 rounded-xl">
                  <span className="flex gap-x-6">
                    <span className="grow">
                      <span className="block text-xl font-semibold text-gray-800">
                        {event.address}
                      </span>
                    </span>
                  </span>
                </div>

                <div className="text-start p-4 md:p-5 rounded-xl">
                  <span className="flex gap-x-6">
                    <span className="grow">
                      <span className="block text-xl font-semibold text-gray-800">
                        {event.date}
                      </span>
                    </span>
                  </span>
                </div>

                <div className="text-start p-4 md:p-5 rounded-xl">
                  <span className="flex gap-x-6">
                    <span className="grow">
                      <span className="block text-xl font-semibold text-gray-800">
                        {event.Pricing}
                      </span>
                    </span>
                  </span>
                </div>
              </nav>
            </div>
            <div className="lg:col-span-6 lg:w-[560px] lg:h-[560px]">
              <div className="relative">
                <div
                  id={`tabs-with-card-${index}`}
                  role="tabpanel"
                  aria-labelledby={`tabs-with-card-item-${index}`}
                >
                  <img
                    className="shadow-xl lg:absolute lg:top-16 rounded-xl"
                    src={event.imageUrl}
                    alt={`${event.name} Image`}
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
      ))}
    </div>
  );
};

export default EventList;
