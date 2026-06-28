// import React from "react";
// import { companyInfo } from "../utlis/utlis";

// const TopCompanies = ({ jobsData }) => {
//   // Count jobs per company
//   const companyJobs = jobsData.reduce((acc, job) => {
//     acc[job.company] = (acc[job.company] || 0) + 1;
//     return acc;
//   }, {});

//   // Always show companies from utils
//   const topCompanies = Object.entries(companyInfo).slice(0, 4);

//   return (
//     <section className="py-16" style={{ backgroundColor: "#1C42FF1A" }}>
//       <div className="max-w-7xl mx-auto px-6 text-center">
//         {/* Section Header */}
//         <h2 className="text-3xl font-bold mb-3">Top Company</h2>
//         <p className="text-gray-600 max-w-2xl mx-auto mb-12">
//           At eu lobortis pretium tincidunt amet lacus ut aenean aliquet. Blandit a massa elementum
//         </p>

//         {/* Company Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//           {topCompanies.map(([company, info], i) => {
//             const count = companyJobs[company] || 0;
//             const Icon = info.icon;

//             return (
//               <div
//                 key={i}
//                 className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition text-center"
//               >
//                 {/* Company Icon */}
//                 <div className="flex justify-center mb-4 text-4xl text-black">
//                   <Icon />
//                 </div>

//                 {/* Company Name */}
//                 <h3 className="font-semibold text-lg mb-2">{company}</h3>

//                 {/* Description */}
//                 <p className="text-sm text-gray-500 mb-4">{info.description}</p>

//                 {/* Open Jobs pill */}
//                 <span className="inline-block bg-[#1C42FF1A] text-[#1C42FF] text-sm font-medium px-4 py-1 rounded-full">
//                   {count} open jobs
//                 </span>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TopCompanies;


import React from "react";
import { motion } from "framer-motion";
import { companyInfo } from "../utlis/utlis";

const TopCompanies = ({ jobsData }) => {
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    },
  };

  const container = {
    hidden: { },
    show: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  // Count jobs per company
  const companyJobs = jobsData.reduce((acc, job) => {
    acc[job.company] = (acc[job.company] || 0) + 1;
    return acc;
  }, {});

  // Always show companies from utils
  const topCompanies = Object.entries(companyInfo).slice(0, 4);

  return (
    <section className="py-16" style={{ backgroundColor: "#1C42FF1A" }}>
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Section Header */}
        <h2 className="text-3xl font-bold mb-3">Top Companies</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Discover leading companies actively hiring top talent. Explore exciting opportunities at our featured employers and take the next step in your career.
        </p>

        {/* Company Grid */}
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {topCompanies.map(([company, info], i) => {
            const count = companyJobs[company] || 0;
            const Icon = info.icon;

            return (
              <motion.div
                key={i}
                variants={item}
                className="hover-card bg-white rounded-2xl p-8 shadow-md text-center"
              >
                {/* Company Icon */}
                <div className="flex justify-center mb-4 text-4xl text-black">
                  <Icon />
                </div>

                {/* Company Name */}
                <h3 className="font-semibold text-lg mb-2">{company}</h3>

                {/* Description */}
                <p className="text-sm text-gray-500 mb-4">{info.description}</p>

                {/* Open Jobs pill */}
                <span className="inline-block bg-[#1C42FF1A] text-[#1C42FF] text-sm font-medium px-4 py-1 rounded-full">
                  {count} open jobs
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default TopCompanies;