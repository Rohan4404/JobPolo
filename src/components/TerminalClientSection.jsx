// import React from "react";
// import { RiDoubleQuotesL } from "react-icons/ri";
// import { FaStar } from "react-icons/fa";
// import { testimonials } from "../utlis/utlis";

// export default function Testimonials() {
//   return (
//     <section
//       className="relative py-16 px-4 md:px-12 bg-cover bg-center bg-no-repeat"
//       style={{
//         backgroundImage: "url('/images/TestomonialBackgroundimge.jpg')",
//       }}
//     >
//       {/* Overlay */}
//       <div className="absolute inset-0 bg-gray-600 opacity-60"></div>

//       {/* Content */}
//       <div className="relative ">
//         <div className="text-center max-w-3xl mx-auto">
//           <h2 className="text-2xl md:text-3xl font-bold text-white">
//             What Our Clients Say
//           </h2>
//           <p className="mt-2 text-white text-sm md:text-base">
//             Hear from some of our satisfied clients who have experienced
//             exceptional service and results.
//           </p>
//         </div>

//         <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
//           {testimonials.map((t, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between min-h-[320px]
//                          transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-105"
//             >
//               <div className="text-left">
//                 {/* Stars */}
//                 <div className="flex mb-3 text-yellow-400">
//                   {Array(5)
//                     .fill("")
//                     .map((_, i) => (
//                       <FaStar key={i} size={20} className="mr-1" />
//                     ))}
//                 </div>

//                 {/* Title */}
//                 <h3 className="text-lg font-semibold text-gray-800 mb-2">
//                   {t.title}
//                 </h3>

//                 {/* Text */}
//                 <p className="text-gray-600 text-sm leading-relaxed">
//                   {t.text}
//                 </p>
//               </div>

//               {/* Footer with Image */}
//               <div className="mt-6 flex items-center justify-between">
//                 <div className="flex items-center space-x-3">
//                   <img
//                     src={t.image}
//                     alt={t.name}
//                     className="w-10 h-10 rounded-full object-cover"
//                   />
//                   <div>
//                     <p className="text-gray-800 font-medium text-sm">
//                       {t.name}
//                     </p>
//                     <p className="text-gray-500 text-xs">{t.role}</p>
//                   </div>
//                 </div>

//                 <span className="text-[#1C42FF] text-3xl">
//                   <RiDoubleQuotesL />
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
import React from "react";
import { RiDoubleQuotesL } from "react-icons/ri";
import { FaStar } from "react-icons/fa";
import { testimonials } from "../utlis/utlis";
import { motion } from "framer-motion";

// ✅ Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function Testimonials() {
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="relative py-16 md:px-12 mx-4 sm:mx-6 md:mx-6 lg:mx-8 rounded-2xl overflow-hidden">
      {/* 🎥 Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/ClientReview.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gray-700/60"></div>

      {/* Content */}
      <div className="relative z-10">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            What Our Clients Say
          </motion.h2>

          <motion.p
            className="mt-2 text-white text-sm md:text-base"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Hear from some of our satisfied clients who have experienced
            exceptional service and results.
          </motion.p>
        </div>

        {/* 🔥 Slider */}
        <div className="mt-10 max-w-7xl mx-auto text-left">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={24}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            loop
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {testimonials.map((t, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between min-h-[320px]"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  {/* Stars */}
                  <div className="flex mb-3 text-yellow-400">
                    {Array(5)
                      .fill("")
                      .map((_, i) => (
                        <FaStar key={i} size={20} className="mr-1" />
                      ))}
                  </div>

                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {t.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {t.text}
                  </p>

                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={t.image}
                        alt={t.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-gray-800 font-medium text-sm">
                          {t.name}
                        </p>
                        <p className="text-gray-500 text-xs">{t.role}</p>
                      </div>
                    </div>

                    <span className="text-[#1C42FF] text-3xl">
                      <RiDoubleQuotesL />
                    </span>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
