// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import JobsHeroSection from "../components/JobsHeroSection";
// import JobsFilter from "../components/JobsFilter";
// import JobsList from "../components/JobsList";
// import TopCompanies from "../components/TopCompanies";
// import { jobsData } from "../utlis/utlis";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

// const JobsPage = () => {
//   const [filters, setFilters] = useState({});
//   const [filteredJobs, setFilteredJobs] = useState(jobsData);
//   const [showMobileFilter, setShowMobileFilter] = useState(false);

//   const item = {
//     hidden: { opacity: 0, y: 30 },
//     show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
//   };

//   const applyFilters = (filters) => {
//     let result = jobsData;

//     if (filters.title) {
//       result = result.filter((job) =>
//         job.title.toLowerCase().includes(filters.title.toLowerCase())
//       );
//     }
//     if (filters.location) {
//       result = result.filter((job) => job.location === filters.location);
//     }
//     if (filters.category && filters.category.length > 0) {
//       result = result.filter((job) => filters.category.includes(job.category));
//     }
//     if (filters.type && filters.type.length > 0) {
//       result = result.filter((job) => filters.type.includes(job.type));
//     }
//     if (filters.salary) {
//       result = result.filter((job) => {
//         const nums = job.salary.match(/\d+/g);
//         if (!nums) return true;
//         const avg = (parseInt(nums[0]) + parseInt(nums[1])) / 2;
//         return avg >= filters.salary.min && avg <= filters.salary.max;
//       });
//     }

//     setFilters(filters);
//     setFilteredJobs(result);
//   };

//   return (
//     <div
//       className="w-full min-h-screen custom-scrollbar flex flex-col "
//       style={{ maxHeight: "100vh", overflowY: "auto" }}
//     >
//       {/* Header Section - same as AboutUs */}
//       <section className="w-full">
//         <Navbar />
//         <JobsHeroSection
//           title="Jobs"
//           subtitle="Find the perfect opportunity by filtering categories, location, salary and more."
//           py="py-12"
//           px="px-6"
//           className="mt-20"
//         />
//       </section>

//       {/* Main Content Section */}
//       <motion.section 
//         variants={item}
//         initial="hidden"
//         animate="show"
//         className="w-full"
//       >
//         <div className="max-w-screen-2xl mx-auto px-2 sm:px-4 lg:px-6 py-6">
//           {/* Mobile Filter Button */}
//           <button
//             onClick={() => setShowMobileFilter(true)}
//             className="lg:hidden mb-4 px-6 py-3 w-full text-white rounded-lg font-medium"
//             style={{
//               background: "linear-gradient(90deg, #1C42FF 0%, #001478 100%)",
//             }}
//           >
//             Show Filters
//           </button>

//           <div className="flex flex-col lg:flex-row lg:items-start lg:gap-6">
//             {/* Desktop Filter - Hidden on mobile */}
//             <div className="hidden lg:block w-full lg:w-[280px] flex-shrink-0 lg:sticky lg:top-24 h-fit">
//               <JobsFilter jobsData={jobsData} onFilterChange={applyFilters} />
//             </div>

//             {/* Mobile Filter Drawer */}
//             {showMobileFilter && (
//               <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
//                 <div className="absolute right-0 top-0 h-full w-11/12 max-w-sm bg-white overflow-y-auto">
//                   <div className="p-4 border-b flex justify-between items-center sticky top-0 bg-white z-10">
//                     <h3 className="text-lg font-semibold">Filters</h3>
//                     <button
//                       onClick={() => setShowMobileFilter(false)}
//                       className="text-2xl text-gray-500 hover:text-gray-700"
//                     >
//                       ×
//                     </button>
//                   </div>
//                   <JobsFilter jobsData={jobsData} onFilterChange={applyFilters} />
//                 </div>
//               </div>
//             )}

//             {/* Right side - Jobs list */}
//             <div className="w-full lg:flex-1 min-w-0">
//               <JobsList jobs={filteredJobs} />
//             </div>
//           </div>
//         </div>
//       </motion.section>

//       {/* Top Companies Section */}
//       <section className="w-full">
//         <TopCompanies jobsData={jobsData} />
//       </section>

//       {/* Footer Section */}
//       <section className="w-full">
//         <Footer />
//       </section>
//     </div>
//   );
// };

// export default JobsPage;


// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import JobsHeroSection from "../components/JobsHeroSection";
// import JobsFilter from "../components/JobsFilter";
// import JobsList from "../components/JobsList";
// import TopCompanies from "../components/TopCompanies";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import { getJobs } from "../api/service2";

// const JobsPage = () => {
//   const [allJobs, setAllJobs] = useState([]);
//   const [filteredJobs, setFilteredJobs] = useState([]);
//   const [showMobileFilter, setShowMobileFilter] = useState(false);
//   const [loading, setLoading] = useState(true);


//   const item = {
//     hidden: { opacity: 0, y: 30 },
//     show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
//   };

//  useEffect(() => {
//   const fetchJobs = async () => {
//     setLoading(true);  // start loading

//     const resp = await getJobs(1, 100);
//     const jobs = resp?.data?.jobs || [];

//     setAllJobs(jobs);
//     setFilteredJobs(jobs);

//     setLoading(false); // stop loading
//   };
//   fetchJobs();
// }, []);



//   const applyFilters = (filters) => {
//     let result = [...allJobs];

//     if (filters.title) {
//       result = result.filter((job) =>
//         job.title.toLowerCase().includes(filters.title.toLowerCase())
//       );
//     }

//     if (filters.location) {
//       result = result.filter(
//         (job) =>
//           job.jobPostAddresses?.[0]?.city?.toLowerCase() ===
//           filters.location.toLowerCase()
//       );
//     }

//     if (filters.category?.length > 0) {
//       result = result.filter((job) =>
//         filters.category.includes(job.industry)
//       );
//     }

//     if (filters.type?.length > 0) {
//       result = result.filter((job) =>
//         filters.type.includes(job.employmentType)
//       );
//     }

//     if (filters.salary) {
//       result = result.filter((job) => {
//         const nums = job.salaryRange?.match(/\d+/g);
//         if (!nums) return true;
//         const avg = (parseInt(nums[0]) + parseInt(nums[1])) / 2;
//         return avg >= filters.salary.min && avg <= filters.salary.max;
//       });
//     }

//     setFilteredJobs(result);
//   };

//   return (
//      <div
//   className="w-full h-screen flex flex-col custom-scrollbar "
//   style={{ overflowY: "auto", overflowX: "hidden" }}
// >

//       <Navbar />

//       <JobsHeroSection
//         title="Jobs"
//         subtitle="Find the perfect opportunity by filtering categories, location, salary and more."
//         py="py-12"
//         px="px-6"
//         className="mt-20"
//       />

//       <motion.section variants={item} initial="hidden" animate="show" className="w-full">
//         <div className="max-w-screen-2xl mx-auto px-2 sm:px-4 lg:px-6 py-6">

//           <button
//             onClick={() => setShowMobileFilter(true)}
//             className="lg:hidden mb-4 px-6 py-3 w-full text-white rounded-lg font-medium"
//             style={{ background: "linear-gradient(90deg, #1C42FF 0%, #001478 100%)" }}
//           >
//             Show Filters
//           </button>

//           <div className="flex flex-col lg:flex-row lg:items-start lg:gap-6">

//             {/* Desktop Filter */}
//             <div className="hidden lg:block w-full lg:w-[280px] h-fit">
//               <JobsFilter jobsData={allJobs} onFilterChange={applyFilters} loading={loading} />
//             </div>

//             {/* Mobile Filter */}
//             {showMobileFilter && (
//               <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
//                 <div className="absolute right-0 top-0 h-full w-11/12 max-w-sm bg-white overflow-y-auto">
//                   <div className="p-4 border-b flex justify-between items-center sticky top-0 bg-white z-10">
//                     <h3 className="text-lg font-semibold">Filters</h3>
//                     <button onClick={() => setShowMobileFilter(false)} className="text-2xl">
//                       ×
//                     </button>
//                   </div>

//                    <JobsFilter jobsData={allJobs} onFilterChange={applyFilters} loading={loading} />
//                 </div>
//               </div>
//             )}

//             {/* Jobs List */}
//             <div className="w-full lg:flex-1 min-w-0">
//               <JobsList jobs={filteredJobs} loading={loading} />
//             </div>
//           </div>
//         </div>
//       </motion.section>

//       <TopCompanies jobsData={allJobs} />
//       <Footer />
//     </div>
//   );
// };

// export default JobsPage;


import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import JobsHeroSection from "../components/JobsHeroSection";
import JobsFilter from "../components/JobsFilter";
import JobsList from "../components/JobsList";
import TopCompanies from "../components/TopCompanies";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getJobs } from "../api/service2";

const JobsPage = () => {
  const [allJobs, setAllJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [loading, setLoading] = useState(true);

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  useEffect(() => {
  const fetchJobs = async () => {
    setLoading(true);  // start loading

    const resp = await getJobs(1, 100);
    const jobs = resp?.data?.jobs || [];

    setAllJobs(jobs);
    setFilteredJobs(jobs);

    setLoading(false); // stop loading
  };
  fetchJobs();
}, []);

  const applyFilters = (filters) => {
    let result = [...allJobs];

    // Title / company search
    if (filters.title?.trim()) {
      const q = filters.title.toLowerCase();
      result = result.filter(
        (job) =>
          job.title?.toLowerCase().includes(q) ||
          job.companyName?.toLowerCase().includes(q)
      );
    }

    // Location (city)
    if (filters.location) {
      const loc = filters.location.toLowerCase();
      result = result.filter(
        (job) =>
          job.jobPostAddresses?.[0]?.city?.toLowerCase() === loc
      );
    }

    // Category (job.category.name)
    if (filters.category?.length > 0) {
      result = result.filter((job) => {
        const catName = job.category?.name;
        return catName && filters.category.includes(catName);
      });
    }

    // Job Type (employmentType)
    if (filters.type?.length > 0) {
      result = result.filter((job) =>
        filters.type.includes(job.employmentType)
      );
    }

    // Work Mode (REMOTE / ONSITE / HYBRID)
    if (filters.mode?.length > 0) {
      result = result.filter((job) =>
        filters.mode.includes(job.mode)
      );
    }

    // Date Posted
    if (filters.date && filters.date !== "All") {
      const now = new Date();
      let hoursBack = 0;

      if (filters.date === "Last Hour") hoursBack = 1;
      if (filters.date === "Last 24 Hours") hoursBack = 24;
      if (filters.date === "Last 7 Days") hoursBack = 7 * 24;
      if (filters.date === "Last 30 Days") hoursBack = 30 * 24;

      if (hoursBack > 0) {
        const cutoff = new Date(now.getTime() - hoursBack * 60 * 60 * 1000);
        result = result.filter((job) => {
          if (!job.createdAt) return true;
          return new Date(job.createdAt) >= cutoff;
        });
      }
    }

    // Salary filter using minSalary / maxSalary
    if (filters.salary) {
      const { min, max } = filters.salary;
      result = result.filter((job) => {
        const jobMin =
          typeof job.minSalary === "number" ? job.minSalary : null;
        const jobMax =
          typeof job.maxSalary === "number" ? job.maxSalary : null;

        // if no salary info, don't exclude it
        if (jobMin === null && jobMax === null) return true;

        const low = jobMin ?? jobMax ?? 0;
        const high = jobMax ?? jobMin ?? low;

        // overlap between [low, high] and [min, max]
        return high >= min && low <= max;
      });
    }

    setFilteredJobs(result);
  };

  return (
    <div
      className="w-full h-screen flex flex-col custom-scrollbar"
      style={{ overflowY: "auto", overflowX: "hidden" }}
    >
      <Navbar />

      <JobsHeroSection
        title="Jobs"
        subtitle="Find the perfect opportunity by filtering categories, location, salary and more."
        py="py-12"
        px="px-6"
        className="mt-20"
      />

      <motion.section
        variants={item}
        initial="hidden"
        animate="show"
        className="w-full"
      >
        <div className="max-w-screen-2xl mx-auto px-2 sm:px-4 lg:px-6 py-6">
          {/* Mobile filter button */}
          <button
            onClick={() => setShowMobileFilter(true)}
            className="lg:hidden mb-4 px-6 py-3 w-full text-white rounded-lg font-medium"
            style={{
              background:
                "linear-gradient(90deg, #1C42FF 0%, #001478 100%)",
            }}
          >
            Show Filters
          </button>

          <div className="flex flex-col lg:flex-row lg:items-start lg:gap-6">
            {/* Desktop Filter */}
            <div className="hidden lg:block w-full lg:w-[280px] h-fit">
             <JobsFilter jobsData={allJobs} onFilterChange={applyFilters} loading={loading} />
            </div>

            {/* Mobile Filter Drawer */}
            {showMobileFilter && (
              <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
                <div className="absolute right-0 top-0 h-full w-11/12 max-w-sm bg-white overflow-y-auto">
                  <div className="p-4 border-b flex justify-between items-center sticky top-0 bg-white z-10">
                    <h3 className="text-lg font-semibold">Filters</h3>
                    <button
                      onClick={() => setShowMobileFilter(false)}
                      className="text-2xl"
                    >
                      ×
                    </button>
                  </div>

                 <JobsFilter jobsData={allJobs} onFilterChange={applyFilters} loading={loading} />
                </div>
              </div>
            )}

            {/* Jobs List */}
            <div className="w-full lg:flex-1 min-w-0">
              <JobsList jobs={filteredJobs} loading={loading} />
            </div>
          </div>
        </div>
      </motion.section>

      <TopCompanies jobsData={allJobs} />
      <Footer />
    </div>
  );
};

export default JobsPage;
