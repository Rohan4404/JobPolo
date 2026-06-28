
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import JobsHeroSection from "../components/JobsHeroSection";
// import ContactInfo from "../components/ContactInfo";
// import ContactForm from "../components/ContactForm";
// import { SiTinder, SiAsana } from "react-icons/si";

// const ContactPage = () => {
//   return (
//     <div
//       className="w-full min-h-screen custom-scrollbar flex flex-col "
//       style={{ maxHeight: "100vh", overflowY: "auto" }}
//     >
//       {/* Header Section - same as AboutUs */}
//       <section className="w-full">
//         <Navbar />
//         <JobsHeroSection
//           title="Contact Us" subtitle=""
//           py="py-12"
//           px="px-6"
//           className="mt-20"
//         />
//       </section>
//       {/* Main Container */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 lg:py-12">
//         <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12">
//           <ContactInfo />
//           <ContactForm />
//         </div>

//         {/* Map */}
//         <div className="my-8 sm:my-10 lg:my-12">
//           <iframe
//             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.484915768!2d-73.856!3d40.714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a1d!2s19%20North%20Rd%2C%20Piscataway%2C%20NY%2008854!5e0!3m2!1sen!2sus!4v1726986240000!5m2!1sen!2sus"
//             width="100%"
//             height="300"
//             className="border-0 rounded-lg sm:h-[350px] lg:h-[400px]"
//             allowFullScreen=""
//             loading="lazy"
//             referrerPolicy="no-referrer-when-downgrade"
//             title="Office Location"
//           ></iframe>
//         </div>

//         {/* Partners */}
//         <div className="flex justify-center items-center gap-6 sm:gap-8 lg:gap-12 py-8 sm:py-10 lg:py-12 flex-wrap">
//           <span className="text-gray-400 text-xl sm:text-2xl font-normal">zoom</span>
//           <div className="flex items-center text-gray-400 text-xl sm:text-2xl">
//             <SiTinder className="mr-1" />
//             tinder
//           </div>
//           <span className="text-gray-400 text-xl sm:text-2xl italic">dribbble</span>
//           <div className="flex items-center text-gray-400 text-xl sm:text-2xl">
//             <SiAsana className="mr-1" />
//             asana
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default ContactPage;

import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import JobsHeroSection from "../components/JobsHeroSection";
import ContactInfo from "../components/ContactInfo";
import ContactForm from "../components/ContactForm";
import { SiTinder, SiAsana } from "react-icons/si";

const ContactPage = () => {
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div
      className="w-full min-h-screen custom-scrollbar flex flex-col "
      style={{ maxHeight: "100vh", overflowY: "auto" }}
    >
      {/* Header Section - same as AboutUs */}
      <section className="w-full">
        <Navbar />
        <JobsHeroSection
          title="Contact Us" subtitle=""
          py="py-12"
          px="px-6"
          className="mt-20"
        />
      </section>
      {/* Main Container */}
      <motion.div 
        variants={item}
        initial="hidden"
        animate="show"
        className="max-w-screen-2xl mx-auto px-2 sm:px-4 lg:px-6 py-6"
      >
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12">
          <ContactInfo />
          <ContactForm />
        </div>

        {/* Map */}
        <motion.div
          variants={item}
          initial="hidden"
          animate="show"
          className="my-8 sm:my-10 lg:my-12"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.208!2d77.428063!3d28.605466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0!2s8th%20Floor%2C%20Unit%20No%20-887%2C%20Gaur%20City%20Mall%2C%20Greater%20Noida%20W%20Rd%2C%20Gaur%20City%201%2C%20Sector%204%2C%20Noida%2C%20Ghaziabad%2C%20Uttar%20Pradesh%20201301!5e0!3m2!1sen!2sus!4v1726986240000!5m2!1sen!2sus"
            width="100%"
            height="300"
            className="border-0 rounded-lg sm:h-[350px] lg:h-[400px]"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Office Location"
          ></iframe>
        </motion.div>

        {/* Partners */}
        <motion.div 
          variants={item}
          initial="hidden"
          animate="show"
          className="flex justify-center items-center gap-6 sm:gap-8 lg:gap-12 py-8 sm:py-10 lg:py-12 flex-wrap"
        >
          <span className="text-gray-400 text-xl sm:text-2xl font-normal">zoom</span>
          <div className="flex items-center text-gray-400 text-xl sm:text-2xl">
            <SiTinder className="mr-1" />
            tinder
          </div>
          <span className="text-gray-400 text-xl sm:text-2xl italic">dribbble</span>
          <div className="flex items-center text-gray-400 text-xl sm:text-2xl">
            <SiAsana className="mr-1" />
            asana
          </div>
        </motion.div>
      </motion.div>

      <Footer />
    </div>
  );
};

export default ContactPage;