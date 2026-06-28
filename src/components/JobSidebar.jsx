// import React from "react";
// import { BriefcaseBusiness, Clock, MapPin, User, GraduationCap } from "lucide-react";
// import { Wallet } from "lucide-react";

// const JobSidebar = ({ job }) => {
//   return (
//     <div className="w-full lg:w-[280px] flex-shrink-0 lg:sticky lg:top-24 h-fit mt-6 lg:mt-0">
//       <div className="p-6 rounded-2xl mb-6" style={{ backgroundColor: "#1C42FF0D" }}>
//         <h4 className="font-bold mb-4 text-black text-left">Job Overview</h4>
//         <ul className="space-y-3 text-sm">
//           <li className="flex items-center gap-2">
//             <BriefcaseBusiness size={16} className="text-[#1C42FF]" />
//             <span className="font-medium">Job Title</span> {job.title}
//           </li>
//           <li className="flex items-center gap-2">
//             <Clock size={16} className="text-[#1C42FF]" />
//             <span className="font-medium">Job Type</span> {job.type}
//           </li>
//           <li className="flex items-center gap-2">
//             <BriefcaseBusiness size={16} className="text-[#1C42FF]" />
//             <span className="font-medium">Category</span> {job.category}
//           </li>
//           <li className="flex items-center gap-2">
//             <User size={16} className="text-[#1C42FF]" />
//             <span className="font-medium">Experience</span> {job.experience || "Not specified"}
//           </li>
//           <li className="flex items-center gap-2">
//             <GraduationCap size={16} className="text-[#1C42FF]" />
//             <span className="font-medium">Degree</span> {job.degree || "Not specified"}
//           </li>
//           <li className="flex items-center gap-2">
//             <Wallet size={16} className="text-[#1C42FF]" />
//             <span className="font-medium">Offered Salary</span> {job.salary}
//           </li>
//           <li className="flex items-center gap-2">
//             <MapPin size={16} className="text-[#1C42FF]" />
//             <span className="font-medium">Location</span> {job.location}
//           </li>
//         </ul>
//       </div>

//       <div className="p-6 rounded-2xl mb-6" style={{ backgroundColor: "#1C42FF0D" }}>
//         <h4 className="font-bold mb-4 text-black text-left">Location</h4>
//         <div className="h-48 bg-gray-200 rounded-lg overflow-hidden">
//           <iframe
//             src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.241263529398!2d${job.location.split(",")[1].trim()}!3d${job.location.split(",")[0].trim()}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0!2s${encodeURIComponent(job.location)}!5e0!3m2!1sen!2sus!4v1630561981954!5m2!1sen!2sus`}
//             width="100%"
//             height="100%"
//             style={{ border: 0 }}
//             allowFullScreen=""
//             loading="lazy"
//             title={`Map of ${job.location}`}
//           ></iframe>
//         </div>
//       </div>

//       <div className="p-6 rounded-2xl" style={{ backgroundColor: "#1C42FF0D" }}>
//         <h4 className="font-bold mb-4 text-black text-left">Send Us Message</h4>
//         <form className="space-y-4">
//           <input
//             type="text"
//             placeholder="Full name"
//             className="w-full border border-gray-300 p-3 rounded-lg outline-none text-sm"
//           />
//           <input
//             type="email"
//             placeholder="Email Address"
//             className="w-full border border-gray-300 p-3 rounded-lg outline-none text-sm"
//           />
//           <input
//             type="tel"
//             placeholder="Phone Number"
//             className="w-full border border-gray-300 p-3 rounded-lg outline-none text-sm"
//           />
//           <textarea
//             placeholder={`Your detailed message regarding the ${job.title} position at ${job.company}`}
//             className="w-full border border-gray-300 p-3 rounded-lg outline-none text-sm h-24 resize-none"
//           ></textarea>
//           <button type="submit" className="w-full py-3 btn-gradient rounded-lg">
//             Send Message
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default JobSidebar;


// import React from "react";
// import { motion } from "framer-motion";
// import { BriefcaseBusiness, Clock, MapPin, User, GraduationCap } from "lucide-react";
// import { Wallet } from "lucide-react";

// const JobSidebar = ({ job }) => {
//   const item = {
//     hidden: { opacity: 0, y: 30 },
//     show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
//   };

//   return (
//     <motion.div
//       variants={item}
//       initial="hidden"
//       animate="show"
//       className="w-full lg:w-[280px] flex-shrink-0 lg:sticky lg:top-24 h-fit mt-6 lg:mt-0"
//     >
//       <div className="p-6 rounded-2xl mb-6" style={{ backgroundColor: "#1C42FF0D" }}>
//         <h4 className="font-bold mb-4 text-black text-left">Job Overview</h4>
//         <ul className="space-y-3 text-sm">
//           <li className="flex items-start justify-between gap-2 flex-wrap">
//             <div className="flex items-center gap-2 flex-shrink-0">
//               <BriefcaseBusiness size={16} className="text-[#1C42FF] flex-shrink-0" />
//               <span className="font-medium">Job Title</span>
//             </div>
//             <span className="text-right flex-1 whitespace-normal break-words min-w-0">{job.title}</span>
//           </li>
//           <li className="flex items-center gap-2">
//             <Clock size={16} className="text-[#1C42FF]" />
//             <span className="font-medium">Job Type</span> {job.type}
//           </li>
//           <li className="flex items-center gap-2">
//             <BriefcaseBusiness size={16} className="text-[#1C42FF]" />
//             <span className="font-medium">Category</span> {job.category}
//           </li>
//           <li className="flex items-center gap-2">
//             <User size={16} className="text-[#1C42FF]" />
//             <span className="font-medium">Experience</span> {job.experience || "Not specified"}
//           </li>
//           <li className="flex items-center gap-2">
//             <GraduationCap size={16} className="text-[#1C42FF]" />
//             <span className="font-medium">Degree</span> {job.degree || "Not specified"}
//           </li>
//           <li className="flex items-center gap-2">
//             <Wallet size={16} className="text-[#1C42FF]" />
//             <span className="font-medium">Offered Salary</span> {job.salary}
//           </li>
//           <li className="flex items-center gap-2">
//             <MapPin size={16} className="text-[#1C42FF]" />
//             <span className="font-medium">Location</span> {job.location}
//           </li>
//         </ul>
//       </div>

//       <div className="p-6 rounded-2xl mb-6" style={{ backgroundColor: "#1C42FF0D" }}>
//         <h4 className="font-bold mb-4 text-black text-left">Location</h4>
//         <div className="h-48 bg-gray-200 rounded-lg overflow-hidden">
//           <iframe
//             src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.241263529398!2d${job.location.split(",")[1].trim()}!3d${job.location.split(",")[0].trim()}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0!2s${encodeURIComponent(job.location)}!5e0!3m2!1sen!2sus!4v1630561981954!5m2!1sen!2sus`}
//             width="100%"
//             height="100%"
//             style={{ border: 0 }}
//             allowFullScreen=""
//             loading="lazy"
//             title={`Map of ${job.location}`}
//           ></iframe>
//         </div>
//       </div>

//       <div className="p-6 rounded-2xl" style={{ backgroundColor: "#1C42FF0D" }}>
//         <h4 className="font-bold mb-4 text-black text-left">Send Us Message</h4>
//         <form className="space-y-4">
//           <input
//             type="text"
//             placeholder="Full name"
//             className="w-full border border-gray-300 p-3 rounded-lg outline-none text-sm"
//           />
//           <input
//             type="email"
//             placeholder="Email Address"
//             className="w-full border border-gray-300 p-3 rounded-lg outline-none text-sm"
//           />
//           <input
//             type="tel"
//             placeholder="Phone Number"
//             className="w-full border border-gray-300 p-3 rounded-lg outline-none text-sm"
//           />
//           <textarea
//             placeholder={`Your detailed message regarding the ${job.title} position at ${job.company}`}
//             className="w-full border border-gray-300 p-3 rounded-lg outline-none text-sm h-24 resize-none"
//           ></textarea>
//           <button type="submit" className="w-full py-3 btn-gradient rounded-lg">
//             Send Message
//           </button>
//         </form>
//       </div>
//     </motion.div>
//   );
// };

// export default JobSidebar;


// import React from "react";
// import { motion } from "framer-motion";
// import { BriefcaseBusiness, Clock, MapPin, User, GraduationCap, Wallet } from "lucide-react";

// const JobSidebar = ({ job }) => {
//   const item = {
//     hidden: { opacity: 0, y: 30 },
//     show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
//   };

//   // ⭐ SAFE NORMALIZED VALUES
//   const jobType = job?.employmentType || job?.type || "Not specified";

//   const category =
//     typeof job?.industry === "string"
//       ? job.industry
//       : job?.industry?.name || "Not specified";

//   const salary = job?.salaryRange || "Not disclosed";

//   const locationObj = job?.jobPostAddresses?.[0] || {};
//   const city = locationObj.city || "";
//   const state = locationObj.state || "";
//   const country = locationObj.country || "";

//   const locationStr =
//     city && state && country
//       ? `${city}, ${state}, ${country}`
//       : job?.location || "Location not specified";

//   // Map coords fallback (avoid crashes)
//   const lat = 28.6139; // Default New Delhi
//   const lng = 77.2090;

//   return (
//     <motion.div
//       variants={item}
//       initial="hidden"
//       animate="show"
//       className="w-full lg:w-[280px] flex-shrink-0 lg:sticky lg:top-24 h-fit mt-6 lg:mt-0"
//     >
//       {/* ---- JOB OVERVIEW ---- */}
//       <div className="p-6 rounded-2xl mb-6" style={{ backgroundColor: "#1C42FF0D" }}>
//         <h4 className="font-bold mb-4 text-black text-left">Job Overview</h4>

//         <ul className="space-y-3 text-sm">

//           <li className="flex items-start justify-between gap-2 flex-wrap">
//             <div className="flex items-center gap-2">
//               <BriefcaseBusiness size={16} className="text-[#1C42FF]" />
//               <span className="font-medium">Job Title</span>
//             </div>
//             <span className="text-right flex-1 break-words">{job?.title}</span>
//           </li>

//           <li className="flex items-center gap-2">
//             <Clock size={16} className="text-[#1C42FF]" />
//             <span className="font-medium">Job Type:</span> {jobType}
//           </li>

//           <li className="flex items-center gap-2">
//             <BriefcaseBusiness size={16} className="text-[#1C42FF]" />
//             <span className="font-medium">Category:</span> {category}
//           </li>

//           <li className="flex items-center gap-2">
//             <User size={16} className="text-[#1C42FF]" />
//             <span className="font-medium">Experience:</span>{" "}
//             {job?.experience || "Not specified"}
//           </li>

//           <li className="flex items-center gap-2">
//             <GraduationCap size={16} className="text-[#1C42FF]" />
//             <span className="font-medium">Degree:</span>{" "}
//             {job?.degree || "Not specified"}
//           </li>

//           <li className="flex items-center gap-2">
//             <Wallet size={16} className="text-[#1C42FF]" />
//             <span className="font-medium">Salary:</span> {salary}
//           </li>

//           <li className="flex items-start gap-2">
//             <MapPin size={16} className="text-[#1C42FF]" />
//             <span className="font-medium">Location:</span>{" "}
//             <span>{locationStr}</span>
//           </li>
//         </ul>
//       </div>

//       {/* ---- LOCATION MAP ---- */}
//       <div className="p-6 rounded-2xl mb-6" style={{ backgroundColor: "#1C42FF0D" }}>
//         <h4 className="font-bold mb-4 text-black text-left">Location</h4>

//         <div className="h-48 bg-gray-200 rounded-lg overflow-hidden">
//           <iframe
//             src={`https://maps.google.com/maps?q=${encodeURIComponent(
//               locationStr
//             )}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
//             width="100%"
//             height="100%"
//             style={{ border: 0 }}
//             allowFullScreen
//             loading="lazy"
//             title="Job Location Map"
//           ></iframe>
//         </div>
//       </div>

//       {/* ---- MESSAGE FORM ---- */}
//       <div className="p-6 rounded-2xl" style={{ backgroundColor: "#1C42FF0D" }}>
//         <h4 className="font-bold mb-4 text-black text-left">Send Us Message</h4>

//         <form className="space-y-4">
//           <input type="text" placeholder="Full name" className="w-full border p-3 rounded-lg text-sm" />
//           <input type="email" placeholder="Email Address" className="w-full border p-3 rounded-lg text-sm" />
//           <input type="tel" placeholder="Phone Number" className="w-full border p-3 rounded-lg text-sm" />

//           <textarea
//             placeholder={`Message regarding ${job?.title}`}
//             className="w-full border p-3 rounded-lg text-sm h-24 resize-none"
//           ></textarea>

//           <button type="submit" className="w-full py-3 btn-gradient rounded-lg">
//             Send Message
//           </button>
//         </form>
//       </div>
//     </motion.div>
//   );
// };

// export default JobSidebar;


import React from "react";
import { motion } from "framer-motion";
import { BriefcaseBusiness, Clock, MapPin, User, GraduationCap, Wallet } from "lucide-react";

const JobSidebar = ({ job }) => {

  // ---- ANIMATION ----
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  // ---- FIXED, SAFE VALUES BASED ON API FIELDS ----
  const jobType = job?.employmentType || "Not specified";

  const category =
    typeof job?.industry === "string"
      ? job.industry
      : job?.industry?.name || "Not specified";

  const salary = job?.salaryRange || "Not disclosed";

  const addr = job?.jobPostAddresses?.[0] || {}; 
  const locationStr = addr.city
    ? `${addr.city}, ${addr.state || ""}, ${addr.country || ""}`
    : "Location not specified";

  return (
    <motion.div
      variants={item}
      initial="hidden"
      animate="show"
      className="w-full lg:w-[280px] flex-shrink-0 lg:sticky lg:top-24 h-fit mt-6 lg:mt-0"
    >
      {/* ---- JOB OVERVIEW ---- */}
      <div className="p-6 rounded-2xl mb-6" style={{ backgroundColor: "#1C42FF0D" }}>
        <h4 className="font-bold mb-4 text-black text-left">Job Overview</h4>

        <ul className="space-y-3 text-sm">

          <li className="flex items-start justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <BriefcaseBusiness size={16} className="text-[#1C42FF]" />
              <span className="font-medium">Job Title</span>
            </div>
            <span className="text-right flex-1 break-words">{job?.title}</span>
          </li>

          <li className="flex items-center gap-2">
            <Clock size={16} className="text-[#1C42FF]" />
            <span className="font-medium">Job Type:</span> {jobType}
          </li>

          <li className="flex items-center gap-2">
            <BriefcaseBusiness size={16} className="text-[#1C42FF]" />
            <span className="font-medium">Category:</span> {category}
          </li>

          <li className="flex items-center gap-2">
            <User size={16} className="text-[#1C42FF]" />
            <span className="font-medium">Experience:</span>{" "}
            {job?.minExperience && job?.maxExperience
              ? `${job.minExperience} - ${job.maxExperience} yrs`
              : "Not specified"}
          </li>

          <li className="flex items-center gap-2">
            <GraduationCap size={16} className="text-[#1C42FF]" />
            <span className="font-medium">Degree:</span>{" "}
            {job?.education || "Not specified"}
          </li>

          <li className="flex items-center gap-2">
            <Wallet size={16} className="text-[#1C42FF]" />
            <span className="font-medium">Salary:</span> {salary}
          </li>

          <li className="flex items-start gap-2">
            <MapPin size={16} className="text-[#1C42FF]" />
            <span className="font-medium">Location:</span>{" "}
            <span>{locationStr}</span>
          </li>

        </ul>
      </div>

      {/* ---- LOCATION MAP ---- */}
      <div className="p-6 rounded-2xl mb-6" style={{ backgroundColor: "#1C42FF0D" }}>
        <h4 className="font-bold mb-4 text-black text-left">Location</h4>

        <div className="h-48 bg-gray-200 rounded-lg overflow-hidden">
          <iframe
            src={`https://maps.google.com/maps?q=${encodeURIComponent(
              locationStr
            )}&z=13&output=embed`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title="Job Location Map"
          ></iframe>
        </div>
      </div>

      {/* ---- MESSAGE FORM ---- */}
      <div className="p-6 rounded-2xl" style={{ backgroundColor: "#1C42FF0D" }}>
        <h4 className="font-bold mb-4 text-black text-left">Send Us Message</h4>

        <form className="space-y-4">
          <input type="text" placeholder="Full name" className="w-full border p-3 rounded-lg text-sm" />
          <input type="email" placeholder="Email Address" className="w-full border p-3 rounded-lg text-sm" />
          <input type="tel" placeholder="Phone Number" className="w-full border p-3 rounded-lg text-sm" />

          <textarea
            placeholder={`Message regarding ${job?.title}`}
            className="w-full border p-3 rounded-lg text-sm h-24 resize-none"
          ></textarea>

          <button type="submit" className="w-full py-3 btn-gradient rounded-lg">
            Send Message
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default JobSidebar;
