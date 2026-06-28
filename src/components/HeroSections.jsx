// import React from "react";
// import { motion } from "framer-motion";
// import Logos from "./Logos";
// import { HiOutlineUserGroup } from "react-icons/hi";
// import { PiBuildingOfficeLight } from "react-icons/pi";
// import { BriefcaseBusiness } from "lucide-react";
// import { RiArrowDropDownLine } from "react-icons/ri";

// const HeroSection = () => {
//   // Animation variants
//   const container = {
//     hidden: {},
//     show: {
//       transition: {
//         staggerChildren: 0.2,
//       },
//     },
//   };

//   const item = {
//     hidden: { opacity: 0, y: 30 },
//     show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
//   };

//   return (
//     <div className="relative min-h-[96vh] w-full flex flex-col justify-between text-[var(--text)]">
//       {/* Hero Content */}
//       <motion.div
//         className="flex-1 flex flex-col items-center justify-center text-center px-6 relative  mt-16"
//         variants={container}
//         initial="hidden"
//         animate="show"
//       >
//         {/* Heading */}
//         <motion.h1
//           className="text-4xl md:text-6xl text-[#000000] font-bold mb-5"
//           variants={item}
//         >
//           Find Your Dream Job Today!
//         </motion.h1>

//         {/* Subtext */}
//         <motion.p
//           className="text-lg md:text-xl mb-12 text-[#000000CC]"
//           variants={item}
//         >
//           Connecting Talent with Opportunity: Your Gateway to Career Success
//         </motion.p>

//         {/* Search Bar */}
//         <motion.div
//           className="bg-white rounded-lg shadow-md flex flex-col md:flex-row items-center w-full max-w-2xl overflow-hidden"
//           variants={item}
//         >
//           <input
//             type="text"
//             placeholder="Job Title or Company"
//             className="flex-1 p-4 border-b w-full md:border-b-0 md:border-r text-black outline-none"
//           />
//           <div className="relative flex-1 border-b md:border-b-0 md:border-r">
//             <select className="appearance-none w-full p-4 pr-8 text-black outline-none">
//               <option>Select Location</option>
//             </select>
//             <RiArrowDropDownLine
//               size={28}
//               className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none"
//             />
//           </div>
//           <div className="relative flex-1 border-b md:border-b-0 md:border-r">
//             <select className="appearance-none w-full p-4 pr-8 text-black outline-none">
//               <option>Select Category</option>
//             </select>
//             <RiArrowDropDownLine
//               size={28}
//               className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none"
//             />
//           </div>
//           <button className="btn-gradient px-6 py-4 text-white font-semibold hover:bg-[#021fb1] w-full md:w-auto">
//             Search Job
//           </button>
//         </motion.div>

//         {/* Stats */}
//         <motion.div
//           className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
//           variants={item}
//         >
//           <div className="flex items-center space-x-4">
//             <div className="btn-gradient text-white p-4 rounded-full flex items-center justify-center">
//               <BriefcaseBusiness size={28} />
//             </div>
//             <div>
//               <h2 className="text-2xl font-bold">25,850</h2>
//               <p className="text-[#000000CC]">Jobs</p>
//             </div>
//           </div>
//           <div className="flex items-center space-x-4">
//             <div className="btn-gradient text-white p-4 rounded-full flex items-center justify-center">
//               <HiOutlineUserGroup size={28} />
//             </div>
//             <div>
//               <h2 className="text-2xl font-bold">10,250</h2>
//               <p className="text-[#000000CC]">Candidates</p>
//             </div>
//           </div>
//           <div className="flex items-center space-x-4">
//             <div className="btn-gradient text-white p-4 rounded-full flex items-center justify-center">
//               <PiBuildingOfficeLight size={28} />
//             </div>
//             <div>
//               <h2 className="text-2xl font-bold">18,400</h2>
//               <p className="text-[#000000CC]">Companies</p>
//             </div>
//           </div>
//         </motion.div>
//       </motion.div>

//       {/* Logos Section */}
//       <motion.div
//         className="relative "
//         variants={item}
//         initial="hidden"
//         animate="show"
//       >
//         <Logos />
//       </motion.div>
//     </div>
//   );
// };

// export default HeroSection;


import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Logos from "./Logos";
import { HiOutlineUserGroup } from "react-icons/hi";
import { PiBuildingOfficeLight } from "react-icons/pi";
import { BriefcaseBusiness } from "lucide-react";
import { RiArrowDropDownLine } from "react-icons/ri";

const HeroSection = ({ filters, setFilters, onSearch }) => {

const navigate = useNavigate();

const handleProtectedNavigation = (path) => {
  const token = sessionStorage.getItem("token");

  if (token) {
    navigate(path);
  } else {
    navigate("/login", { state: { redirectTo: path } });
  }
};
  // Animation variants
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div className="relative min-h-[96vh] w-full flex flex-col justify-between text-[var(--text)]">
      {/* Hero Content */}
      <motion.div
        className="flex-1 flex flex-col items-center justify-center text-center px-6 relative  mt-16"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Heading */}
        <motion.h1
          className="text-4xl md:text-6xl text-[#000000] font-bold mb-5"
          variants={item}
        >
          Find Your Dream Job Today!
        </motion.h1>

        {/* Subtext */}
        <motion.p
          className="text-lg md:text-xl mb-12 text-[#000000CC]"
          variants={item}
        >
          Connecting Talent with Opportunity: Your Gateway to Career Success
        </motion.p>

        {/* Search Bar */}
        <motion.div
          className="bg-white rounded-lg shadow-md flex flex-col md:flex-row items-center w-full max-w-2xl overflow-hidden"
          variants={item}
        >
 <input
  type="text"
  placeholder="Job Title or Company"
  className="flex-1 p-4 border-b w-full md:border-b-0 md:border-r text-black outline-none"
  value={filters.keyword}
  onChange={(e) =>
    setFilters((prev) => ({ ...prev, keyword: e.target.value }))
  }
/>

          <div className="relative flex-1 border-b md:border-b-0 md:border-r">
            <select
  className="appearance-none w-full p-4 pr-8 text-black outline-none"
  value={filters.location}
  onChange={(e) =>
    setFilters((prev) => ({ ...prev, location: e.target.value }))
  }
>
  <option value="">Select Location</option>
  <option value="Bangalore">Bangalore</option>
  <option value="Mumbai">Mumbai</option>
  <option value="Remote">Remote</option>
</select>


            <RiArrowDropDownLine
              size={28}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none"
            />
          </div>
          <div className="relative flex-1 border-b md:border-b-0 md:border-r">
          <select
  className="appearance-none w-full p-4 pr-8 text-black outline-none"
  value={filters.category}
  onChange={(e) =>
    setFilters((prev) => ({ ...prev, category: e.target.value }))
  }
>
  <option value="">Select Category</option>
  <option value="Full-time">Full-time</option>
  <option value="Part-time">Part-time</option>
  <option value="Internship">Internship</option>
</select>

            <RiArrowDropDownLine
              size={28}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none"
            />
          </div>
          <button
  className="btn-gradient px-6 py-4 text-white font-semibold hover:bg-[#021fb1]"
  onClick={onSearch}
>
  Search Job
</button>


        </motion.div>
        {/* 🔥 Resume + Interview Section */}
<motion.div
  className="flex flex-col md:flex-row gap-6 mt-10 w-full max-w-2xl"
  variants={item}
>
  {/* Resume Builder */}
  <div
    onClick={() => handleProtectedNavigation("/dashboard?tab=Resume Builder")}
    className="flex-1 bg-white shadow-md rounded-xl p-5 cursor-pointer hover:shadow-xl transition group"
  >
    <h3 className="text-lg font-semibold text-black mb-1">
      Build Your Resume 🚀
    </h3>
    <p className="text-sm text-gray-500">
      Create ATS-friendly resumes in minutes
    </p>
  </div>

  {/* Interview Prep */}
  <div
    onClick={() =>
      handleProtectedNavigation("/dashboard?tab=Interview Preparation")
    }
    className="flex-1 bg-white shadow-md rounded-xl p-5 cursor-pointer hover:shadow-xl transition group"
  >
    <h3 className="text-lg font-semibold text-black mb-1">
      Interview Preparation 🎯
    </h3>
    <p className="text-sm text-gray-500">
      Practice & crack your next interview
    </p>
  </div>
</motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
          variants={item}
        >
          <div className="flex items-center space-x-4">
            <div className="btn-gradient text-white p-4 rounded-full flex items-center justify-center">
              <BriefcaseBusiness size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-bold">25,850</h2>
              <p className="text-[#000000CC]">Jobs</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="btn-gradient text-white p-4 rounded-full flex items-center justify-center">
              <HiOutlineUserGroup size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-bold">10,250</h2>
              <p className="text-[#000000CC]">Candidates</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="btn-gradient text-white p-4 rounded-full flex items-center justify-center">
              <PiBuildingOfficeLight size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-bold">18,400</h2>
              <p className="text-[#000000CC]">Companies</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Logos Section */}
      <motion.div
        className="relative "
        variants={item}
        initial="hidden"
        animate="show"
      >
        <Logos />
      </motion.div>
    </div>
  );
};

export default HeroSection;
