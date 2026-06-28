// import React from "react";
// import { FaCrown } from "react-icons/fa";
// import { LiaAwardSolid } from "react-icons/lia";
// import { TbAward } from "react-icons/tb";
// import { FileUser } from "lucide-react";

// const AboutUsInforBlock2 = () => {
//   return (
//     <div className="w-full max-w-[1440px] mx-auto px-0 sm:px-[72px] pt-5 py-[40px] flex flex-col lg:flex-row gap-[32px] lg:gap-[64px]">
//       {/* Left Image Section */}
//       <div className="flex flex-col sm:flex-row gap-6 w-full lg:w-[636px] items-center sm:items-start">
//         {/* First Vertical Image */}
//         <div className="flex-shrink-0 w-full sm:w-auto">
//           <img
//             src="/images/GoodLifeLeftImg.png"
//             alt="First Vertical"
//             className="w-full max-w-[306px] h-auto sm:h-[560px] rounded-[20px] object-cover mx-auto"
//           />
//         </div>

//         {/* Second Column with Two Images */}
//         <div className="flex flex-col gap-6 w-full sm:w-auto">
//           <img
//             src="/images/GoodLifeImage.png"
//             alt="Top Right"
//             className="w-full max-w-[306px] h-auto sm:h-[338px] rounded-[20px] object-cover mx-auto"
//           />
//           <img
//             src="/images/HeaderImage.png"
//             alt="Bottom Right"
//             className="w-full max-w-[306px] h-auto sm:h-[200px] rounded-[20px] object-cover mx-auto"
//           />
//         </div>
//       </div>

//       {/* Right Content Section */}
//       <div className="flex flex-col gap-6 sm:gap-10 w-full lg:w-[600px] justify-center px-4 sm:px-0">
//         {/* Heading */}
//         <h2 className="font-[Figtree] font-bold text-[28px] sm:text-[32px] md:text-[40px] lg:text-[50px] leading-[120%] lg:leading-[100%] text-black text-left">
//           We’re Only Working <br className="hidden sm:block" /> With The Best
//         </h2>

//         {/* Subtext */}
//         <p className="font-[Figtree] font-normal text-[14px] md:text-[16px] leading-[24px] text-[#000000CC] text-left px-2 sm:px-0">
//           We provide a platform for job seekers to connect with multiple HRs
//           from leading companies, making your job search easier and more
//           efficient.
//         </p>

//         {/* Icons & Text */}
//         <div className="grid grid-cols-2 gap-6 sm:gap-10 justify-center">
//           {/* Quality Job */}
//           <div className="flex items-center gap-3 sm:gap-4">
//             <FaCrown size={28} className="text-[#1C42FF]" />
//             <span className="font-[Figtree] font-semibold text-[14px] sm:text-[16px] md:text-[20px] text-black text-left">
//               Quality Job
//             </span>
//           </div>

//           {/* Top Companies */}
//           <div className="flex items-center gap-3 sm:gap-4">
//             <LiaAwardSolid size={28} className="text-[#1C42FF]" />
//             <span className="font-[Figtree] font-semibold text-[14px] sm:text-[16px] md:text-[20px] text-black text-left">
//               Top Companies
//             </span>
//           </div>

//           {/* Resume Builder */}
//           <div className="flex items-center gap-3 sm:gap-4">
//             <FileUser size={28} className="text-[#1C42FF]" />
//             <span className="font-[Figtree] font-semibold text-[14px] sm:text-[16px] md:text-[20px] text-black text-left">
//               Resume Builder
//             </span>
//           </div>

//           {/* Top Talents */}
//           <div className="flex items-center gap-3 sm:gap-4">
//             <TbAward size={28} className="text-[#1C42FF]" />
//             <span className="font-[Figtree] font-semibold text-[14px] sm:text-[16px] md:text-[20px] text-black text-left">
//               Top Talents
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AboutUsInforBlock2;

import React from "react";
import { FaCrown } from "react-icons/fa";
import { LiaAwardSolid } from "react-icons/lia";
import { TbAward } from "react-icons/tb";
import { FileUser } from "lucide-react";
import { motion } from "framer-motion";

const AboutUsInforBlock2 = () => {
  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  return (
    <div className="w-full  pt-5 py-[40px] flex flex-col lg:flex-row gap-[32px] lg:gap-[64px] px-4 sm:px-6 md:px-6 lg:px-8 justify-center">
      {/* Left Image Section */}
      <motion.div
        className="flex flex-col sm:flex-row gap-6 w-full lg:w-[636px] items-center sm:items-start"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* First Vertical Image */}

        <div className="hover-card">
          <motion.img
            src="/images/GoodLifeLeftImg.png"
            alt="First Vertical"
            className="w-full max-w-[306px] h-auto sm:h-[560px] rounded-[20px] object-cover mx-auto transform transition-all duration-300 hover:scale-[1.03] hover:shadow-xl"
            variants={fadeUp}
          />
        </div>

        {/* Second Column with Two Images */}
        <motion.div
          className="flex flex-col gap-6 w-full sm:w-auto"
          variants={fadeUp}
        >
          <div className="hover-card">
            <motion.img
              src="/images/NewAndBlogImage2.png"
              alt="Top Right"
              className="w-full max-w-[306px] h-auto sm:h-[338px] rounded-[20px] object-cover mx-auto transform transition-all duration-300 hover:scale-[1.03] hover:shadow-xl"
              variants={fadeUp}
            />
          </div>

          <div className="hover-card">
            <motion.img
              src="/images/ResumeImg.png"
              alt="Bottom Right"
              className="w-full max-w-[306px] h-auto sm:h-[200px] rounded-[20px] object-cover mx-auto transform transition-all duration-300 hover:scale-[1.03] hover:shadow-xl"
              variants={fadeUp}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Right Content Section */}
      <motion.div
        className="flex flex-col gap-6 sm:gap-10 w-full lg:w-[600px] justify-center px-4 sm:px-0"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Heading */}
        <motion.h2
          className="font-[Figtree] font-bold text-[28px] sm:text-[32px] md:text-[40px] lg:text-[50px] leading-[120%] lg:leading-[100%] text-black text-left"
          variants={fadeUp}
        >
          We’re Only Working <br className="hidden sm:block" /> With The Best
        </motion.h2>

        {/* Subtext */}
        <motion.p
          className="font-[Figtree] font-normal text-[14px] md:text-[16px] leading-[24px] text-[#000000CC] text-left px-2 sm:px-0"
          variants={fadeUp}
        >
          We provide a platform for job seekers to connect with multiple HRs
          from leading companies, making your job search easier and more
          efficient.
        </motion.p>

        {/* Icons & Text */}
        <motion.div
          className="grid grid-cols-2 gap-6 sm:gap-10 justify-center"
          variants={fadeUp}
        >
          {/* Quality Job */}
          <motion.div
            className="flex items-center gap-3 sm:gap-4"
            variants={fadeUp}
          >
            <FaCrown size={28} className="text-[#1C42FF]" />
            <span className="font-[Figtree] font-semibold text-[14px] sm:text-[16px] md:text-[20px] text-black text-left">
              Quality Job
            </span>
          </motion.div>

          {/* Top Companies */}
          <motion.div
            className="flex items-center gap-3 sm:gap-4"
            variants={fadeUp}
          >
            <LiaAwardSolid size={28} className="text-[#1C42FF]" />
            <span className="font-[Figtree] font-semibold text-[14px] sm:text-[16px] md:text-[20px] text-black text-left">
              Top Companies
            </span>
          </motion.div>

          {/* Resume Builder */}
          <motion.div
            className="flex items-center gap-3 sm:gap-4"
            variants={fadeUp}
          >
            <FileUser size={28} className="text-[#1C42FF]" />
            <span className="font-[Figtree] font-semibold text-[14px] sm:text-[16px] md:text-[20px] text-black text-left">
              Resume Builder
            </span>
          </motion.div>

          {/* Top Talents */}
          <motion.div
            className="flex items-center gap-3 sm:gap-4"
            variants={fadeUp}
          >
            <TbAward size={28} className="text-[#1C42FF]" />
            <span className="font-[Figtree] font-semibold text-[14px] sm:text-[16px] md:text-[20px] text-black text-left">
              Top Talents
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutUsInforBlock2;
