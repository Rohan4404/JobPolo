// import { FiPhone, FiMail, FiClock, FiMapPin } from "react-icons/fi";

// const ContactInfo = () => {
//   return (
//     <div className="w-full lg:w-1/2 px-4 sm:px-6 lg:px-8">
//       <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-left leading-tight">
//         You Will Grow, You Will <br className="hidden sm:inline" />
//         Succeed. We Promise That
//       </h1>
//       <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base text-left">
//         Pellentesque arcu facilisis nunc mi proin. Dignissim mattis in
//         lectus tincidunt tincidunt ultrices. Diam convallis morbi pellentesque
//         adipiscing
//       </p>

//       {/* Contact Details */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 text-left">
//         <div className="flex flex-col items-start">
//           <FiPhone className="text-[#1C42FF] w-5 h-5 sm:w-6 sm:h-6 mb-2" />
//           <h3 className="text-xs sm:text-sm font-medium text-gray-700">Call for inquiry</h3>
//           <p className="text-gray-900 text-sm sm:text-base font-semibold">+257 388-6895</p>
//         </div>
//         <div className="flex flex-col items-start">
//           <FiMail className="text-[#1C42FF] w-5 h-5 sm:w-6 sm:h-6 mb-2" />
//           <h3 className="text-xs sm:text-sm font-medium text-gray-700">Send us email</h3>
//           <p className="text-gray-900 text-sm sm:text-base font-semibold">
//             kramulous@sbcglobal.net
//           </p>
//         </div>
//         <div className="flex flex-col items-start">
//           <FiClock className="text-[#1C42FF] w-5 h-5 sm:w-6 sm:h-6 mb-2" />
//           <h3 className="text-xs sm:text-sm font-medium text-gray-700">Opening hours</h3>
//           <p className="text-gray-900 text-sm sm:text-base font-semibold">Mon - Fri: 10AM - 10PM</p>
//         </div>
//         <div className="flex flex-col items-start">
//           <FiMapPin className="text-[#1C42FF] w-5 h-5 sm:w-6 sm:h-6 mb-2" />
//           <h3 className="text-xs sm:text-sm font-medium text-gray-700">Office</h3>
//           <p className="text-gray-900 text-sm sm:text-base font-semibold">
//             19 North Road Piscataway, NY 08854
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactInfo;

import React from "react";
import { motion } from "framer-motion";
import { FiPhone, FiMail, FiClock, FiMapPin } from "react-icons/fi";

const ContactInfo = () => {
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const iconVariants = {
    hidden: { rotate: 0 },
    show: {
      rotate: 360,
      transition: { duration: 1, ease: "easeInOut", repeat: Infinity, repeatDelay: 5 }
    },
    hover: { rotate: 360, transition: { duration: 0.5, ease: "easeInOut" } }
  };

  return (
    <motion.div 
      variants={item}
      initial="hidden"
      animate="show"
      className="w-full lg:w-1/2 px-4 sm:px-6 lg:px-8"
    >
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-left leading-tight">
        You Will Grow, You Will <br className="hidden sm:inline" />
        Succeed. We Promise That
      </h1>
      <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base text-left">
        We're committed to your professional journey. Whether you're exploring career opportunities or seeking guidance, our team is here to support your success with personalized advice and resources tailored to your goals.
      </p>

      {/* Contact Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 text-left">
        <div className="flex flex-col items-start">
          <motion.div 
            variants={iconVariants}
            initial="hidden"
            animate="show"
            whileHover="hover"
            className="w-5 h-5 sm:w-6 sm:h-6 mb-2"
          >
            <FiPhone className="text-[#1C42FF] w-full h-full" />
          </motion.div>
          <h3 className="text-xs sm:text-sm font-medium text-gray-700">Call for inquiry</h3>
          <p className="text-gray-900 text-sm sm:text-base font-semibold">+91 7503451933</p>
          <p className="text-gray-900 text-sm sm:text-base font-semibold">Mr. Deepak Kumar Gupta</p>
        </div>
        <div className="flex flex-col items-start">
          <motion.div 
            variants={iconVariants}
            initial="hidden"
            animate="show"
            whileHover="hover"
            className="w-5 h-5 sm:w-6 sm:h-6 mb-2"
          >
            <FiMail className="text-[#1C42FF] w-full h-full" />
          </motion.div>
          <h3 className="text-xs sm:text-sm font-medium text-gray-700">Send us email</h3>
          <p className="text-gray-900 text-sm sm:text-base font-semibold">
            deepak.gupta@jobpolo.com<br/>
            verify@jobpolo.com
          </p>
        </div>
        <div className="flex flex-col items-start">
          <motion.div 
            variants={iconVariants}
            initial="hidden"
            animate="show"
            whileHover="hover"
            className="w-5 h-5 sm:w-6 sm:h-6 mb-2"
          >
            <FiClock className="text-[#1C42FF] w-full h-full" />
          </motion.div>
          <h3 className="text-xs sm:text-sm font-medium text-gray-700">Opening hours</h3>
          <p className="text-gray-900 text-sm sm:text-base font-semibold">09:00-18:00 Hrs (Monday – Friday except all Holidays)</p>
        </div>
        <div className="flex flex-col items-start">
          <motion.div 
            variants={iconVariants}
            initial="hidden"
            animate="show"
            whileHover="hover"
            className="w-5 h-5 sm:w-6 sm:h-6 mb-2"
          >
            <FiMapPin className="text-[#1C42FF] w-full h-full" />
          </motion.div>
          <h3 className="text-xs sm:text-sm font-medium text-gray-700">Office</h3>
          <p className="text-gray-900 text-sm sm:text-base font-semibold">
            8th Floor, Unit No -887, Gaur City Mall,<br/>
            Greater Noida W Rd, Gaur City 1, Sector 4,<br/>
            Noida, Ghaziabad, Uttar Pradesh 201301
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactInfo;