// import React from "react";
// import { motion } from "framer-motion";
// import { BiBookmarkPlus } from "react-icons/bi"; // Import bookmark icon
// import { BriefcaseBusiness, Clock, MapPin } from "lucide-react";
// import { Wallet } from "lucide-react";

// const JobHeader = ({ job }) => {
//   const item = {
//     hidden: { opacity: 0, y: 30 },
//     show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
//   };

//   const handleApplyClick = () => {
//     // Add your apply logic here (e.g., navigation or form submission)
//     alert("Apply button clicked! Implement your apply logic here.");
//   };

//   const handleAddToClick = () => {
//     // Add your add to logic here (e.g., save to favorites)
//     alert("Add to button clicked! Implement your add to logic here.");
//   };

//   return (
//     <motion.div 
//       variants={item}
//       initial="hidden"
//       whileInView="show"
//       viewport={{ once: true, amount: 0.3 }}
//       className="relative p-4 sm:p-6 flex flex-col sm:flex-row justify-between gap-6 mb-6"
//     >
//       {/* Add to Icon (Top-Right Corner) */}
//       <div className="absolute top-4 right-4">
//         <button
//           className="text-gray-400 hover:text-[#1C42FF] focus:outline-none"
//           onClick={handleAddToClick}
//         >
//           <BiBookmarkPlus size={20} />
//         </button>
//       </div>

//       {/* Left Section: Job Details */}
//       <div className="flex-1 text-left ml-0">
//         <div className="flex items-center gap-4 mb-4 ml-0">
//           <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-xl overflow-hidden ml-0">
//             <img
//               src={job.logo || "/images/CompneyIcon.png"}
//               alt={job.company}
//               className="object-cover"
//             />
//           </div>
//           <div className="ml-0">
//             <h1 className="text-lg sm:text-2xl font-bold ml-0">{job.title}</h1>
//             <p className="text-sm text-gray-600 ml-0">{job.company}</p>
//           </div>
//         </div>
//         <div className="flex flex-wrap gap-4 text-sm text-gray-700 ml-0">
//           <span className="flex items-center gap-1 ml-0">
//             <BriefcaseBusiness size={16} className="text-[#1C42FF]" />
//             {job.category}
//           </span>
//           <span className="flex items-center gap-1">
//             <Clock size={16} className="text-[#1C42FF]" />
//             {job.type}
//           </span>
//           <span className="flex items-center gap-1">
//             <Wallet size={16} className="text-[#1C42FF]" />
//             {job.salary}
//           </span>
//           <span className="flex items-center gap-1">
//             <MapPin size={16} className="text-[#1C42FF]" />
//             {job.location}
//           </span>
//         </div>
//       </div>

//       {/* Right Section: Apply Button */}
//       <div className="flex flex-col sm:flex-row items-center sm:items-end justify-end gap-3">
//         <button
//           className="px-4 py-2 btn-gradient text-white rounded-lg text-sm hover:bg-[#1533cc] transition"
//           onClick={handleApplyClick}
//         >
//           Apply Job
//         </button>
//       </div>
//     </motion.div>
//   );
// };

// export default JobHeader;


import React from "react";
import { motion } from "framer-motion";
import { BiBookmarkPlus } from "react-icons/bi";
import { BriefcaseBusiness, Clock, MapPin } from "lucide-react";
import { Wallet } from "lucide-react";

const JobHeader = ({ job }) => {
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <motion.div
      variants={item}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="relative p-4 sm:p-6 flex flex-col sm:flex-row justify-between gap-6 mb-6"
    >
      {/* Save Icon */}
      <div className="absolute top-4 right-4">
        <button className="text-gray-400 hover:text-[#1C42FF]">
          <BiBookmarkPlus size={20} />
        </button>
      </div>

      {/* LEFT SECTION */}
      <div className="flex-1 text-left">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl overflow-hidden flex items-center justify-center">
            <img
              src={job.logo}
              alt={job.company}
              className="object-cover w-full h-full"
            />
          </div>

          <div>
            <h1 className="text-lg sm:text-2xl font-bold">{job.title}</h1>
            <p className="text-sm text-gray-600">{job.company}</p>
          </div>
        </div>

        {/* DETAILS BAR */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-700">
          <span className="flex items-center gap-1">
            <BriefcaseBusiness size={16} className="text-[#1C42FF]" />
            {job.categoryName}
          </span>

          <span className="flex items-center gap-1">
            <Clock size={16} className="text-[#1C42FF]" />
            {job.jobType}
          </span>

          <span className="flex items-center gap-1">
            <Wallet size={16} className="text-[#1C42FF]" />
            {job.salary}
          </span>

          <span className="flex items-center gap-1">
            <MapPin size={16} className="text-[#1C42FF]" />
            {job.location}
          </span>
        </div>
      </div>

      {/* APPLY BUTTON */}
      <div className="flex items-end">
        <button className="px-4 py-2 btn-gradient text-white rounded-lg text-sm">
          Apply Job
        </button>
      </div>
    </motion.div>
  );
};

export default JobHeader;
