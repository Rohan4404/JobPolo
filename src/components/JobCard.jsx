// import React from "react";
// import { BriefcaseBusiness, Clock, MapPin } from "lucide-react";
// import { Wallet } from "lucide-react"; // Changed LuWallet to Wallet
// import { BiBookmarkPlus } from "react-icons/bi";
// import { useNavigate } from "react-router-dom";

// const JobCard = ({ job }) => {
//   const navigate = useNavigate();

//   const handleJobDetailsClick = () => {
//     navigate("/job-detail", { state: { job } });
//   };

//   return (
//     <div className="bg-white rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row justify-between gap-6 shadow hover:shadow-md transition">
//       {/* LEFT */}
//       <div className="flex-1">
//         <p className="text-xs px-2 py-1 rounded-lg w-fit text-gradient bg-gray-100">
//           {job.time}
//         </p>
//         <div className="flex items-center gap-4 mt-3">
//           <div className="w-12 h-12 flex items-center justify-center rounded-xl overflow-hidden">
//             <img
//               src={job.logo || "/images/CompneyIcon.png"}
//               alt={job.company}
//             />
//           </div>
//           <div>
//             <h2 className="text-lg font-semibold">{job.title}</h2>
//             <p className="text-sm text-gray-600">{job.company}</p>
//           </div>
//         </div>
//         <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-700">
//           <span className="flex items-center gap-1">
//             <BriefcaseBusiness size={16} className="text-[#1C42FF]" />
//             {job.category}
//           </span>
//           <span className="flex items-center gap-1">
//             <Clock size={16} className="text-[#1C42FF]" />
//             {job.type}
//           </span>
//           <span className="flex items-center gap-1">
//             <Wallet size={16} className="text-[#1C42FF]" />{" "}
//             {/* Updated to Wallet */}
//             {job.salary}
//           </span>
//           <span className="flex items-center gap-1">
//             <MapPin size={16} className="text-[#1C42FF]" />
//             {job.location}
//           </span>
//         </div>
//       </div>

//       {/* RIGHT */}
//       <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between gap-3">
//         <button className="text-gray-400 hover:text-[#1C42FF]">
//           <BiBookmarkPlus size={20} />
//         </button>
//         <button
//           className="px-5 py-2 btn-gradient text-white rounded-lg text-sm"
//           onClick={handleJobDetailsClick}
//         >
//           Job Details
//         </button>
//       </div>
//     </div>
//   );
// };

// export default JobCard;

// import React from "react";
// import { BriefcaseBusiness, Clock, MapPin } from "lucide-react";
// import { LuWallet } from "react-icons/lu";
// import { BiBookmarkPlus } from "react-icons/bi";
// import { useNavigate } from "react-router-dom";

// const JobCard = ({ job }) => {
//   if (!job || !job.title) return null;

//   const navigate = useNavigate();

//   const handleJobClick = () => {
//     navigate("/job-details", { state: { job } });
//   };
// const formatSalaryNumber = (num) => {
//   if (!num) return "";

//   if (num >= 10000000) return `₹${(num / 10000000).toFixed(1)} Cr`; // Crores
//   if (num >= 100000) return `₹${(num / 100000).toFixed(1)} L`; // Lakhs
//   if (num >= 1000) return `₹${(num / 1000).toFixed(1)}K`; // Thousands

//   return `₹${num}`;
// };

//   const formatDate = (date) =>
//     new Date(date).toLocaleDateString("en-IN", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });

//   const location =
//     job?.jobPostAddresses?.length > 0
//       ? `${job.jobPostAddresses[0].city}, ${job.jobPostAddresses[0].state}, ${job.jobPostAddresses[0].country}`
//       : "Location not available";

//      const salary =
//   job?.minSalary && job?.maxSalary
//     ? `${formatSalaryNumber(job.minSalary)} - ${formatSalaryNumber(job.maxSalary)} (${job.salaryType})`
//     : "Not disclosed";



//   return (
//     <div
//   onClick={handleJobClick}
//   className="
//     hover-card bg-white rounded-2xl overflow-hidden
//     p-5 sm:p-6 w-full max-w-full
//     flex flex-col sm:flex-row justify-between gap-6 cursor-pointer
//   "
// >



//       {/* LEFT */}
//       <div className="flex-1">
//         <p className="text-[10px] sm:text-xs px-2 py-1 rounded-lg w-fit bg-[#3096891A]">
//           <span className="text-gradient">
//             {job?.createdAt ? formatDate(job.createdAt) : "Recently Added"}
//           </span>
//         </p>

//         <div className="flex items-center gap-4 mt-3">
//           <img
//             src={job?.logoPreviewUrl || "/images/CompneyIcon.png"}
//             alt="logo"
//             className="w-12 h-12 rounded-xl object-cover"
//           />

//           <div>
//             <h2 className="text-base sm:text-lg font-semibold">{job?.title}</h2>
//             <p className="text-xs sm:text-sm">{job?.companyName}</p>
//           </div>
//         </div>

//         <div className="flex flex-wrap gap-4 text-xs sm:text-sm mt-3 text-gray-700">
//           <span className="flex items-center gap-1">
//             <BriefcaseBusiness size={14} className="text-[#1C42FF]" />
//             {job?.employmentType}
//           </span>

//           <span className="flex items-center gap-1">
//             <Clock size={14} className="text-[#1C42FF]" />
//             {job?.mode}
//           </span>

//           <span className="flex items-center gap-1">
//             <LuWallet size={14} className="text-[#1C42FF]" />
//             {salary}

//           </span>

//           <span className="flex items-center gap-1">
//             <MapPin size={14} className="text-[#1C42FF]" />
//             {location}
//           </span>
//         </div>
//       </div>

//       {/* RIGHT */}
//       <div className="flex flex-col items-end gap-3">
//         <button
//           className="text-gray-400 hover:text-[#309689]"
//           onClick={(e) => e.stopPropagation()}
//         >
//           <BiBookmarkPlus size={20} />
//         </button>

//         <button
//   className="px-5 py-2 btn-gradient text-white font-medium rounded-lg shadow hover:opacity-90 transition"
//   onClick={(e) => e.stopPropagation()}   // <-- add this
// >
//   Apply Job
// </button>

//       </div>
//     </div>
//   );
// };

// export default JobCard;



import React from "react";
import { BriefcaseBusiness, Clock, MapPin } from "lucide-react";
import { LuWallet } from "react-icons/lu";
import { BiBookmarkPlus } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const JobCard = ({ job }) => {
  if (!job || !job.title) return null;

  const navigate = useNavigate();

  const handleJobClick = () => {
    navigate("/job-details", { state: { job } });
  };

  const formatSalaryNumber = (num) => {
    if (!num) return "";
    if (num >= 10000000) return `₹${(num / 10000000).toFixed(1)} Cr`;
    if (num >= 100000) return `₹${(num / 100000).toFixed(1)} L`;
    if (num >= 1000) return `₹${(num / 1000).toFixed(1)}K`;
    return `₹${num}`;
  };
  const formatSalaryType = (type) => {
  if (!type) return "";
  const map = {
    YEARLY: "Year",
    MONTHLY: "Month",
    WEEKLY: "Week",
    DAILY: "Day",
    HOURLY: "Hour",
  };
  return map[type] || type;
};


const salary =
  job?.minSalary && job?.maxSalary
    ? `${formatSalaryNumber(job.minSalary)} - ${formatSalaryNumber(job.maxSalary)} / ${formatSalaryType(job.salaryType)}`
    : "Not disclosed";


  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const location =
    job?.jobPostAddresses?.length > 0
      ? `${job.jobPostAddresses[0].city}, ${job.jobPostAddresses[0].state}, ${job.jobPostAddresses[0].country}`
      : "Location not available";

  return (
    <div
      onClick={handleJobClick}
      className="hover-card bg-white rounded-2xl overflow-hidden p-5 sm:p-6 w-full max-w-full flex flex-col sm:flex-row justify-between gap-6 cursor-pointer"
    >
      {/* LEFT */}
      <div className="flex-1">
        <p className="text-[10px] sm:text-xs px-2 py-1 rounded-lg w-fit bg-[#3096891A]">
          <span className="text-gradient">
            {job?.createdAt ? formatDate(job.createdAt) : "Recently Added"}
          </span>
        </p>

        <div className="flex items-center gap-4 mt-3">
          <img
            src={job?.logoPreviewUrl || "/images/CompneyIcon.png"}
            alt="logo"
            className="w-12 h-12 rounded-xl object-cover"
          />

          <div>
            <h2 className="text-base sm:text-lg font-semibold">{job?.title}</h2>
            <p className="text-xs sm:text-sm">{job?.companyName}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 text-xs sm:text-sm mt-3 text-gray-700">
          <span className="flex items-center gap-1">
            <BriefcaseBusiness size={14} className="text-[#1C42FF]" />
            {job?.employmentType}
          </span>

          <span className="flex items-center gap-1">
            <Clock size={14} className="text-[#1C42FF]" />
            {job?.mode}
          </span>

          <span className="flex items-center gap-1">
            <LuWallet size={14} className="text-[#1C42FF]" />
            {salary}
          </span>

          <span className="flex items-center gap-1">
            <MapPin size={14} className="text-[#1C42FF]" />
            {location}
          </span>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex flex-col items-end gap-3">
        <button
          className="text-gray-400 hover:text-[#309689]"
          onClick={(e) => e.stopPropagation()}
        >
          <BiBookmarkPlus size={20} />
        </button>

        <button
          className="px-5 py-2 btn-gradient text-white font-medium rounded-lg shadow hover:opacity-90 transition"
          onClick={(e) => e.stopPropagation()}  // FIX
        >
          Apply Job
        </button>
      </div>
    </div>
  );
};

export default JobCard;
