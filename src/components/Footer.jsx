// import React from "react";

// const Footer = () => {
//   return (
//     <footer className="bg-black text-white w-full">
//       {/* Main Footer Content */}
//       <div
//         className="max-w-[1521px] mx-auto px-6 sm:px-10 lg:px-[100px] pt-12 sm:pt-16 lg:pt-[100px] pb-6 sm:pb-10 lg:pb-[40px]
//                       grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-[80px] text-left"
//       >
//         {/* Left Section */}
//         <div>
//           <div className="flex items-center gap-2 mb-4">
//             <img
//               src="/images/JobLogoWhite.png"
//               alt="Job Logo"
//               className="w-7 h-7 object-contain"
//             />
//             <h2 className="">JOB Polo</h2>
//           </div>

//           <p className="max-w-[300px] font-semibold leading-[28px] sm:leading-[30px] lg:leading-[32px] tracking-[0] text-[#FFFFFFCC] text-sm sm:text-base">
//             Helping job seekers and employers connect seamlessly. Explore
//             opportunities, grow your career, and find the perfect fit today.
//           </p>
//         </div>

//         {/* Company Links */}
//         <div>
//           <h3 className="font-semibold mb-4 text-lg sm:text-xl">Company</h3>
//           <ul className="space-y-2 sm:space-y-3 text-[#FFFFFFCC] text-sm sm:text-base">
//             <li>About Us</li>
//             <li>Our Team</li>
//             <li>Partners</li>
//             <li>For Job Seekers</li>
//             <li>For Employers</li>
//           </ul>
//         </div>

//         {/* Job Categories */}
//         <div>
//           <h3 className="font-semibold mb-4 text-lg sm:text-xl">
//             Job Categories
//           </h3>
//           <ul className="space-y-2 sm:space-y-3 text-[#FFFFFFCC] text-sm sm:text-base">
//             <li>Telecommunications</li>
//             <li>Hospitality & Tourism</li>
//             <li>Construction</li>
//             <li>Education</li>
//             <li>Finance & Banking</li>
//           </ul>
//         </div>

//         {/* Newsletter */}
//         <div>
//           <h3 className="font-semibold mb-4 text-lg sm:text-xl">Newsletter</h3>
//           <p className="text-[#FFFFFFCC] mb-4 max-w-[300px] text-sm sm:text-base">
//             Stay updated with the latest job opportunities and career tips.
//           </p>
//           <input
//             type="email"
//             placeholder="Email Address"
//             className="w-full px-4 py-3 mb-4 rounded-md border border-gray-500 bg-black text-white placeholder-gray-400 text-sm sm:text-base"
//           />
//           <button className="w-full px-6 py-3 rounded-[12px] btn-gradient text-white font-medium text-sm sm:text-base">
//             Subscribe Now
//           </button>
//         </div>
//       </div>

//       {/* Bottom Bar */}
//       <div className="max-w-[1521px] mx-auto px-6 sm:px-10 lg:px-[100px] py-6 flex flex-col md:flex-row justify-between items-start md:items-center text-left">
//         <p className="text-[#FFFFFF80] text-xs sm:text-sm mb-4 md:mb-0">
//           © 2025 JOB Polo. Designed by FlowNexus Technology
//         </p>

//         <div className="flex gap-4 sm:gap-6 text-[#FFFFFF] text-xs sm:text-sm">
//           <a href="#">Privacy Policy</a>
//           <a href="#">Terms & Conditions</a>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React from "react";
import { motion } from "framer-motion"; 
import { useState } from "react";
import ModalWrapper from "./ModalWrapper";
import TermsConditions from "../pages/Terms&Condition";
import PrivacyPolicy from "../pages/PrivacyPolicyPage";

const Footer = () => {
const [showTerms, setShowTerms] = useState(false);
const [showPrivacy, setShowPrivacy] = useState(false);

  const year = new Date().getFullYear();
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
    <motion.footer
      className="bg-black text-white w-full px-4 sm:px-6 md:px-6 lg:px-8"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Main Footer Content */}
      <motion.div
        className="    pt-12 sm:pt-16 lg:pt-[100px] pb-6 sm:pb-10 lg:pb-[40px] 
                      grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-[80px] text-left"
        variants={item} // Animate container
      >
        {/* Left Section */}
        <motion.div variants={item}>
          <div className="flex items-center gap-2 mb-4">
            <img
              src="/images/JobLogoWhite.png"
              alt="Job Logo"
              className="w-7 h-7 object-contain"
            />
            <h2 className="">JOB Polo</h2>
          </div>
          <p className="max-w-[300px] font-semibold leading-[28px] sm:leading-[30px] lg:leading-[32px] tracking-[0] text-[#FFFFFFCC] text-sm sm:text-base">
            Helping job seekers and employers connect seamlessly. Explore
            opportunities, grow your career, and find the perfect fit today.
          </p>
        </motion.div>

        {/* Company Links */}
        <motion.div variants={item}>
          <h3 className="font-semibold mb-4 text-lg sm:text-xl">Company</h3>
          <ul className="space-y-2 sm:space-y-3 text-[#FFFFFFCC] text-sm sm:text-base">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about-us">About Us</a>
            </li>
            <li>
              <a href="/jobs">Jobs</a>
            </li>
            <li>
              <a href="/contact-us">Contact Us</a>
            </li>
          </ul>
        </motion.div>

        {/* Job Categories */}
        <motion.div variants={item}>
          <h3 className="font-semibold mb-4 text-lg sm:text-xl">
            Job Categories
          </h3>
          <ul className="space-y-2 sm:space-y-3 text-[#FFFFFFCC] text-sm sm:text-base">
            <li>Telecommunications</li>
            <li>Hospitality & Tourism</li>
            <li>Construction</li>
            <li>Education</li>
            <li>Finance & Banking</li>
          </ul>
        </motion.div>

        {/* Newsletter */}
        <motion.div variants={item}>
          <h3 className="font-semibold mb-4 text-lg sm:text-xl">Newsletter</h3>
          <p className="text-[#FFFFFFCC] mb-4 max-w-[300px] text-sm sm:text-base">
            Stay updated with the latest job opportunities and career tips.
          </p>
          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-3 mb-4 rounded-md border border-gray-500 bg-black text-white placeholder-gray-400 text-sm sm:text-base"
          />
          <button className="w-full px-6 py-3 rounded-[12px] btn-gradient text-white font-medium text-sm sm:text-base">
            Subscribe Now
          </button>
        </motion.div>
      </motion.div>

      {/* Bottom Bar */}
      <motion.div
        className="max-w-[1521px] mx-auto px-6 sm:px-10 lg:px-[100px] py-6 flex flex-col md:flex-row justify-between items-start md:items-center text-left"
        variants={item}
      >
        <p className="text-[#FFFFFF80] text-xs sm:text-sm mb-4 md:mb-0">
          © {year} JOB Polo. Designed by FlowNexus Technology
        </p>

        <div className="flex gap-4 sm:gap-6 text-[#FFFFFF] text-xs sm:text-sm">
          <span
  onClick={() => setShowPrivacy(true)}
  className="cursor-pointer hover:underline"
>
  Privacy Policy
</span>

<span
  onClick={() => setShowTerms(true)}
  className="cursor-pointer hover:underline"
>
  Terms & Conditions
</span>
        </div>
      </motion.div>
      {/* TERMS MODAL */}
{showTerms && (
  <ModalWrapper onClose={() => setShowTerms(false)}>
    <TermsConditions />
  </ModalWrapper>
)}

{/* PRIVACY MODAL */}
{showPrivacy && (
  <ModalWrapper onClose={() => setShowPrivacy(false)}>
    <PrivacyPolicy />
  </ModalWrapper>
)}
    </motion.footer>
  );
};

export default Footer;
