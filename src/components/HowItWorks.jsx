// import React from "react";
// import { HowItworksteps } from "../utlis/utlis";

// function HowItWorks() {
//   return (
//     <section className="w-full max-w-[1440px] mx-auto bg-[#FFFFFF] px-6 lg:px-12 py-[60px] lg:py-[60px] pt-0 lg:pt-[0px]">
//       {/* Heading */}
//       <div className="text-center mb-[60px]">
//         <h2 className="font-figtree font-bold text-[40px] sm:text-[45px] lg:text-[50px] leading-[100%] text-[#000000]">
//           How it works
//         </h2>
//         <p className="mt-4 text-[#000000] font-figtree text-[16px] leading-[100%] max-w-2xl mx-auto">
//           At eu lobortis pretium tincidunt amet lacus ut aenean aliquet. Blandit
//           a massa elementum id scelerisque rhoncus…
//         </p>
//       </div>

//       {/* Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1296px] mx-auto">
//         {HowItworksteps.map((step, index) => {
//           const Icon = step.icon; // component reference
//           return (
//             <div
//               key={index}
//               className="w-full sm:w-[306px] h-[280px] mx-auto flex flex-col items-center justify-center bg-white rounded-[20px] shadow-[0px_3px_8px_0px_#30968914]
//               transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
//             >
//               {/* Icon */}
//               <div className="w-[36px] h-[36px] flex items-center justify-center rounded-full border-2 border-transparent">
//                 <Icon className="w-9 h-9 text-[#1C42FF] bg-clip-text" />
//               </div>

//               {/* Title */}
//               <h3 className="mt-6 font-figtree font-bold text-[20px] leading-[100%] text-[#000000] text-center">
//                 {step.title}
//               </h3>

//               {/* Description */}
//               <p className="mt-4 text-[#00000099] font-figtree text-[16px] leading-[24px] text-center px-4">
//                 {step.text}
//               </p>
//             </div>
//           );
//         })}
//       </div>
//     </section>
//   );
// }

// export default HowItWorks;

import React from "react";
import { HowItworksteps } from "../utlis/utlis";
import { motion } from "framer-motion";

function HowItWorks() {
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
    <section className="w-full px-4 sm:px-6 md:px-6 lg:px-8  bg-[#FFFFFF]  py-[60px] pt-0">
      {/* Heading */}
      <motion.div
        className="text-center mb-[60px]"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2
          className="font-figtree font-bold text-[40px] sm:text-[45px] lg:text-[50px] leading-[100%] text-[#000000]"
          variants={item}
        >
          How it works
        </motion.h2>
        <motion.p
          className="mt-4 text-[#000000] font-figtree text-[16px] leading-[150%] max-w-2xl mx-auto"
          variants={item}
        >
          Job Polo makes it simple for job seekers to connect with top companies
          through our trusted HR network. Here’s how you can get started:
        </motion.p>
      </motion.div>

      {/* Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1296px] mx-auto"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {HowItworksteps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={index} className="hover-card">
              <motion.div
                className="w-full sm:w-[306px] h-[280px] mx-auto flex flex-col items-center justify-center 
      bg-white rounded-[20px] shadow-md"
                variants={item}
              >
                {/* Icon */}
                <div className="w-[36px] h-[36px] flex items-center justify-center rounded-full border-2 border-transparent">
                  <Icon className="w-9 h-9 text-[#1C42FF]" />
                </div>

                {/* Title */}
                <h3 className="mt-6 font-figtree font-bold text-[20px] leading-[100%] text-[#000000] text-center">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="mt-4 text-[#00000099] font-figtree text-[16px] leading-[24px] text-center px-4">
                  {step.text}
                </p>
              </motion.div>
            </div>
          );
        })}
      </motion.div>
    </section>
  );
}

export default HowItWorks;
