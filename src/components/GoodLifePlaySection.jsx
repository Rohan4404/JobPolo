// //

// import React from "react";
// import { FaPlay } from "react-icons/fa";
// import { steps } from "../utlis/utlis";

// function GoodLifePlaySection() {
//   return (
//     <section className="w-full flex justify-center items-center py-10 pt-0">
//       <div className="relative w-full max-w-[1296px] aspect-[1296/760] rounded-[20px] overflow-hidden">
//         {/* Background Image with overlay */}
//         <div
//           className="absolute inset-0 bg-cover bg-center"
//           style={{
//             backgroundImage: "url('/images/GoodLifeImage.png')",
//           }}
//         >
//           <div className="absolute inset-0 bg-black/50" /> {/* overlay */}
//         </div>

//         {/* Play button + Title */}
//         <div
//           className="relative flex flex-col items-center gap-6 sm:gap-10 md:gap-14 px-4 md:px-0"
//           style={{ top: "25%", left: "50%", transform: "translateX(-50%)" }}
//         >
//           <button className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-full btn-gradient text-white shadow-lg">
//             <FaPlay className="w-4 h-4 sm:w-6 sm:h-6" />
//           </button>

//           <h2 className="text-white text-[24px] sm:text-[36px] md:text-[42px] lg:text-[50px] font-bold font-figtree text-center leading-snug max-w-[90%] sm:max-w-[80%] md:max-w-[70%]">
//             Good Life Begins With <br /> A Good Company
//           </h2>
//         </div>

//         {/* Bottom Black Bar */}
//         <div className="absolute bottom-0 w-full bg-black/90 flex justify-center items-center px-4 sm:px-6 py-6 sm:py-8">
//           <div
//             className="w-full max-w-[1296px] grid gap-4
//                           grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
//           >
//             {steps.map((step, index) => (
//               <div key={index} className="relative pl-12 sm:pl-14 text-left">
//                 {/* Number Button */}
//                 <div className="absolute left-0 top-0 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg font-bold text-white text-sm sm:text-lg btn-gradient">
//                   {step.number}
//                 </div>

//                 {/* Text */}
//                 <div className="flex flex-col text-left">
//                   <p className="font-figtree font-semibold text-[16px] sm:text-[20px] text-white leading-snug break-words">
//                     {step.title}
//                   </p>
//                   <a
//                     href="#"
//                     className="font-figtree font-semibold text-[14px] sm:text-[16px] mt-1 leading-snug break-words text-left text-gradient text-gradient-underline"
//                   >
//                     {step.link}
//                   </a>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default GoodLifePlaySection;

import React from "react";
import { FaPlay } from "react-icons/fa";
import { steps } from "../utlis/utlis";
import { motion } from "framer-motion";

function GoodLifePlaySection() {
  // ✅ Animation variants
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.2 } },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="w-full flex flex-col items-center px-4 sm:px-6 md:px-6 lg:px-8">
      <div className="relative w-full  !lg-h-[500px] rounded-[20px] overflow-hidden ">
        {/* Background Image with overlay */}
        <div className="relative w-full h-[220px] sm:h-[700px] sm:aspect-[1296/760] rounded-[20px] overflow-hidden">
          {/* 🎥 Background Video */}
          <video
            src="/videos/AboutCompnay.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50"></div>

          {/* Play button + Title */}
          <motion.div
            className="relative flex flex-col items-center gap-4 sm:gap-6 md:gap-10 px-4 md:px-0 top-[30%] sm:top-[25%] left-1/2 -translate-x-1/2"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.button
              className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-full btn-gradient text-white shadow-lg"
              variants={item}
            >
              <FaPlay className="w-4 h-4 sm:w-6 sm:h-6" />
            </motion.button>

            <motion.h2
              className="text-white text-[20px] sm:text-[36px] md:text-[42px] lg:text-[50px] font-bold font-figtree text-center leading-snug max-w-[95%] sm:max-w-[80%] md:max-w-[70%]"
              variants={item}
            >
              Good Life Begins With <br /> A Good Company
            </motion.h2>
          </motion.div>
        </div>

        {/* Bottom Black Bar */}
        <motion.div
          className="w-full bg-black/90 flex justify-center items-center px-4 sm:px-6 py-6 sm:py-8 mt-4 sm:mt-0 sm:absolute sm:bottom-0"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="w-full max-w-[1296px] grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="relative pl-12 sm:pl-14 text-left"
                variants={item}
              >
                {/* Number Button */}
                <div className="absolute left-0 top-0 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg font-bold text-white text-sm sm:text-lg btn-gradient">
                  {step.number}
                </div>

                {/* Text */}
                <div className="flex flex-col text-left">
                  <p className="font-figtree font-semibold text-[14px] sm:text-[20px] text-white leading-snug break-words">
                    {step.title}
                  </p>
                  <a
                    href={step.href || "#"}
                    className="font-figtree font-semibold text-[12px] sm:text-[16px] mt-1 leading-snug break-words text-left text-gradient text-gradient-underline"
                  >
                    {step.link}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default GoodLifePlaySection;
