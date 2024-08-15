import React from "react";

function Page() {
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
                  src="https://artistbookingcompany.com/wp-content/uploads/2024/03/amitabh-bacchan-740x740.jpg"
                  alt="Amitabh Bachchan"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="col-span-1 lg:col-span-1 mb-6 lg:mb-0">
              <div className="relative">
                <h1 className="text-2xl md:text-4xl font-bold mb-4">
                  Amitabh Bachchan
                </h1>
                <p className="opacity-75 mb-2 text-sm md:text-base leading-relaxed text-justify">
                  Amitabh Bachchan is an Indian film actor, film producer,
                  television host, and occasional playback singer. He first
                  gained popularity in the early 1970s for films such as
                  Zanjeer, Deewaar, and Sholay, and was dubbed India’s “angry
                  young man” for his on-screen roles in Hindi films. Referred to
                  as the Shahenshah of Bollywood (in reference to his 1988 film
                  Shahenshah), Sadi ka Mahanayak, Star of the Millennium, or Big
                  B, he has since appeared in over 200 Indian films in a career
                  spanning more than five decades. Bachchan is regarded as one
                  of the greatest actors in the history of Indian cinema. He was
                  the most dominant actor in the Indian movie scene during the
                  1970s–1980s, with the French director François Truffaut
                  calling him a “one-man industry”. Beyond the Indian
                  subcontinent, he also has a large overseas following in
                  markets including Africa (South Africa and Mauritius), the
                  Middle East (especially UAE and Egypt), the United Kingdom,
                  Russia, the Caribbean (Guyana, Suriname, and Trinidad and
                  Tobago), Oceania (Fiji, Australia, and New Zealand) and parts
                  of the United States. Bachchan has won numerous accolades in
                  his career, including four National Film Awards as Best Actor,
                  Dadasaheb Phalke Award as lifetime achievement award and many
                  awards at international film festivals and award ceremonies.
                  He has won fifteen Filmfare Awards and is the most nominated
                  performer in any major acting category at Filmfare, with 41
                  nominations overall. In addition to acting, Bachchan has
                  worked as a playback singer, film producer and television
                  presenter. He has hosted several seasons of the game show Kaun
                  Banega Crorepati. The Government of India honoured him with
                  the Padma Shri in 1984, the Padma Bhushan in 2001 and the
                  Padma Vibhushan in 2015 for his contributions to the arts. The
                  Government of France honoured him with its highest civilian
                  honour, Knight of the Legion of Honour, in 2007 for his
                  exceptional career in the world of cinema and beyond. Bachchan
                  also made an appearance in a Hollywood film, Baz Luhrmann’s
                  The Great Gatsby (2013), in which he played a non-Indian
                  Jewish character, Meyer Wolfsheim.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Inquiry Form Section */}
        <div className="container mx-auto px-4 mt-12 max-w-3xl">
          <h2 className="text-3xl font-bold mb-8 text-center text-[#4A3F6A]">
            Inquire Now
          </h2>
          <form className="bg-[#5E4B88] shadow-lg rounded-xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <label
                  className="block text-sm font-semibold mb-2 text-[#EAD8FF]"
                  htmlFor="occasion"
                >
                  Select Occasion*
                </label>
                <select
                  id="occasion"
                  name="occasion"
                  className="w-full px-4 py-3 rounded-lg bg-[#BCA7E7] focus:outline-none focus:ring-2 focus:ring-[#8F75E5]"
                >
                  <option value="">Select an occasion</option>
                  <option value="wedding">Wedding</option>
                  <option value="birthday">Birthday</option>
                  <option value="corporate">Corporate</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label
                  className="block text-sm font-semibold mb-2 text-[#EAD8FF]"
                  htmlFor="date"
                >
                  Date*
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  className="w-full px-4 py-3 rounded-lg bg-[#BCA7E7] focus:outline-none focus:ring-2 focus:ring-[#8F75E5]"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-semibold mb-2 text-[#EAD8FF]"
                  htmlFor="city"
                >
                  City*
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  className="w-full px-4 py-3 rounded-lg bg-[#BCA7E7] focus:outline-none focus:ring-2 focus:ring-[#8F75E5]"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-semibold mb-2 text-[#EAD8FF]"
                  htmlFor="budget"
                >
                  Select Budget*
                </label>
                <select
                  id="budget"
                  name="budget"
                  className="w-full px-4 py-3 rounded-lg bg-[#BCA7E7] focus:outline-none focus:ring-2 focus:ring-[#8F75E5]"
                >
                  <option value="">Select a budget</option>
                  <option value="under-1000">$1000 and under</option>
                  <option value="1000-5000">$1000 - $5000</option>
                  <option value="5000-10000">$5000 - $10000</option>
                  <option value="over-10000">Over $10000</option>
                </select>
              </div>
              <div>
                <label
                  className="block text-sm font-semibold mb-2 text-[#EAD8FF]"
                  htmlFor="guest-count"
                >
                  Guest Count
                </label>
                <input
                  type="number"
                  id="guest-count"
                  name="guest-count"
                  className="w-full px-4 py-3 rounded-lg bg-[#BCA7E7] focus:outline-none focus:ring-2 focus:ring-[#8F75E5]"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-semibold mb-2 text-[#EAD8FF]"
                  htmlFor="name"
                >
                  Your Name*
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 rounded-lg bg-[#BCA7E7] focus:outline-none focus:ring-2 focus:ring-[#8F75E5]"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-semibold mb-2 text-[#EAD8FF]"
                  htmlFor="email"
                >
                  Email*
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 rounded-lg bg-[#BCA7E7] focus:outline-none focus:ring-2 focus:ring-[#8F75E5]"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-semibold mb-2 text-[#EAD8FF]"
                  htmlFor="contact-number"
                >
                  Contact Number*
                </label>
                <input
                  type="tel"
                  id="contact-number"
                  name="contact-number"
                  className="w-full px-4 py-3 rounded-lg bg-[#BCA7E7] focus:outline-none focus:ring-2 focus:ring-[#8F75E5]"
                />
              </div>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="px-8 py-3 text-white rounded-lg bg-gradient-to-r from-[#8F75E5] to-[#674188] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8F75E5]"
              >
                Submit Inquiry
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default Page;
