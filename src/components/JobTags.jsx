// import React from "react";
// import { motion } from "framer-motion";

// const JobTags = ({ job }) => {
//   const item = {
//     hidden: { opacity: 0, y: 30 },
//     show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
//   };

//   return (
//     <motion.div 
//       variants={item}
//       initial="hidden"
//       whileInView="show"
//       viewport={{ once: true, amount: 0.3 }}
//       className="mb-6"
//     >
//       <h3 className="text-xl font-bold mb-4 text-left">Tags:</h3>
//       <div className="flex flex-wrap gap-2 text-left">
//         <span className="px-3 py-1 rounded-full text-sm font-medium shadow-sm" style={{ backgroundColor: "#1C42FF1A", color: "#1C42FF" }}>
//           {job.type}
//         </span>
//         <span className="px-3 py-1 rounded-full text-sm font-medium shadow-sm" style={{ backgroundColor: "#1C42FF1A", color: "#1C42FF" }}>
//           {job.category}
//         </span>
//         <span className="px-3 py-1 rounded-full text-sm font-medium shadow-sm" style={{ backgroundColor: "#1C42FF1A", color: "#1C42FF" }}>
//           {job.location.split(",")[0]}
//         </span>
//         <span className="px-3 py-1 rounded-full text-sm font-medium shadow-sm" style={{ backgroundColor: "#1C42FF1A", color: "#1C42FF" }}>
//           {job.company.split(" ")[0]}
//         </span>
//         <span className="px-3 py-1 rounded-full text-sm font-medium shadow-sm" style={{ backgroundColor: "#1C42FF1A", color: "#1C42FF" }}>
//           {job.location.includes(",") ? "International Location" : "Local Area"}
//         </span>
//       </div>
//     </motion.div>
//   );
// };

// export default JobTags;

import React from "react";
import { motion } from "framer-motion";

const JobTags = ({ job }) => {
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
      className="mb-6"
    >
      <h3 className="text-xl font-bold mb-4 text-left">Tags:</h3>

      <div className="flex flex-wrap gap-2 text-left">

        <span className="tag-chip">{job.jobType}</span>

        <span className="tag-chip">{job.categoryName}</span>

        <span className="tag-chip">{job.location}</span>

        <span className="tag-chip">{job.company}</span>

        <span className="tag-chip">
          {job.location === "Not specified" ? "Local Area" : "Listed Location"}
        </span>

      </div>
    </motion.div>
  );
};

export default JobTags;
