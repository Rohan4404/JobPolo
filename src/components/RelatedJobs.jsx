// import React from "react";
// import { motion } from "framer-motion";
// import JobCard from "../components/JobCard";
// import { jobsData } from "../utlis/utlis"; // Corrected import path from "utlis" to "utils"

// const RelatedJobs = ({ job }) => {
//   const item = {
//     hidden: { opacity: 0, y: 30 },
//     show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
//   };

//   // Filter related jobs by category, excluding the current job, and limit to 3
//   const relatedJobs = jobsData
//     .filter((j) => j.category === job.category && j.id !== job.id)
//     .slice(0, 3);

//   // Render fallback if no related jobs are found
//   if (relatedJobs.length === 0) {
//     return (
//       <motion.div 
//         variants={item}
//         initial="hidden"
//         whileInView="show"
//         viewport={{ once: true, amount: 0.3 }}
//         className="text-left"
//       >
//         <h3 className="text-2xl font-bold mb-2">Related Jobs</h3>
//         <p className="text-gray-600 mb-6">
//           No related job opportunities found within the {job.category} sector at this time.
//         </p>
//       </motion.div>
//     );
//   }

//   return (
//     <motion.div 
//       variants={item}
//       initial="hidden"
//       whileInView="show"
//       viewport={{ once: true, amount: 0.3 }}
//       className="text-left"
//     >
//       <h3 className="text-2xl font-bold mb-2">Related Jobs</h3>
//       <p className="text-gray-600 mb-6">
//         Discover more exciting and diverse job opportunities within the {job.category} sector that may align with your skills and career aspirations.
//       </p>
//       <div className="flex flex-col gap-6">
//         {relatedJobs.map((relatedJob) => (
//           <motion.div
//             key={relatedJob.id}
//             variants={item}
//             whileHover={{ scale: 1.04, y: -0.2 }}
//             className="hover-card"
//           >
//             <JobCard job={relatedJob} />
//           </motion.div>
//         ))}
//       </div>
//     </motion.div>
//   );
// };

// export default RelatedJobs;


import React from "react";
import { motion } from "framer-motion";
import JobCard from "../components/JobCard";
import { jobsData } from "../utlis/utlis";

const RelatedJobs = ({ job }) => {
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  // Extract category safely
  const categoryName = job?.category?.name || job?.categoryName || "";

  // Filter only by category name
  const relatedJobs = jobsData
    .filter((j) => j.categoryName === categoryName && j.id !== job.id)
    .slice(0, 3);

  return (
    <motion.div
      variants={item}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="text-left"
    >
      <h3 className="text-2xl font-bold mb-2">Related Jobs</h3>

      {relatedJobs.length === 0 ? (
        <p className="text-gray-600 mb-6">
          No related job opportunities found within the {categoryName} sector at this time.
        </p>
      ) : (
        <>
          <p className="text-gray-600 mb-6">
            Discover more exciting job opportunities in the {categoryName} sector.
          </p>

          <div className="flex flex-col gap-6">
            {relatedJobs.map((relatedJob) => (
              <motion.div
                key={relatedJob.id}
                variants={item}
                whileHover={{ scale: 1.04, y: -0.2 }}
                className="hover-card"
              >
                <JobCard job={relatedJob} />
              </motion.div>
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
};

export default RelatedJobs;
