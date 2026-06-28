// import React, { useState, useEffect } from "react";
// import { BriefcaseBusiness, Clock, MapPin } from "lucide-react";
// import { BiBookmarkPlus } from "react-icons/bi";
// import { LuWallet } from "react-icons/lu";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { getJobs } from "../api/service2";

// const JobsPage = () => {
//   const navigate = useNavigate();
//   const [jobsData, setJobsData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const jobsPerPage = 5;
//   const [loading, setLoading] = useState(true);
//   const [dots, setDots] = useState(".");

//   // ⏳ Animate dots in "Loading..." text
//   useEffect(() => {
//     if (!loading) return;
//     const interval = setInterval(() => {
//       setDots((prev) => (prev.length === 3 ? "." : prev + "."));
//     }, 400);
//     return () => clearInterval(interval);
//   }, [loading]);

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         setLoading(true);
//         const resp = await getJobs();
//         setJobsData(resp?.data?.jobs || []);
//       } catch (err) {
//         console.error("Failed to fetch jobs:", err);
//         setJobsData([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchJobs();
//   }, []);

//   const totalPages = Math.ceil(jobsData.length / jobsPerPage);
//   const currentJobs = jobsData.slice(
//     (currentPage - 1) * jobsPerPage,
//     currentPage * jobsPerPage
//   );

//   const handleJobClick = (job) => {
//     navigate("/job-details", { state: { job } });
//   };

//   const container = {
//     hidden: {},
//     show: { transition: { staggerChildren: 0.2 } },
//   };

//   const item = {
//     hidden: { opacity: 0, y: 30 },
//     show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
//   };

//   const formatDate = (date) =>
//     new Date(date).toLocaleDateString("en-IN", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });

//   return (
//     <div className="min-h-screen px-4 py-6 sm:px-6 md:px-6 lg:px-8 bg-[var(--background)] text-[var(--text)]">
//       <motion.div
//         className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4"
//         variants={container}
//         initial="hidden"
//         whileInView="show"
//         viewport={{ once: true, amount: 0.2 }}
//       >
//         <motion.div className="text-left" variants={item}>
//           <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
//             Recent Jobs Available
//           </h1>
//           <p className="text-gray-500 mt-2 text-sm md:text-base">
//             Find the latest job postings from HR and employers. Explore
//             opportunities today.
//           </p>
//         </motion.div>
//       </motion.div>

//       {/* ✅ JOB LIST + LOADER */}
//       <motion.div
//         className="grid gap-6"
//         variants={container}
//         initial="hidden"
//         animate="show"
//       >
//         {/* Animated loading text */}
//         {loading && (
//           <motion.p
//             initial={{ opacity: 0, y: -5 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-center text-sm text-gray-500 mb-1"
//           >
//             🔄 Loading latest jobs{dots}
//           </motion.p>
//         )}

//         {loading ? (
//           [...Array(5)].map((_, i) => (
//             <div
//               key={i}
//               className="animate-pulse bg-white rounded-2xl p-4 sm:p-6 shadow-[0px_3px_8px_0px_#30968914]"
//             >
//               <div className="h-4 w-24 bg-gray-200 rounded mb-4"></div>

//               <div className="flex items-center gap-4">
//                 <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
//                 <div className="flex-1 space-y-2">
//                   <div className="h-4 bg-gray-200 rounded w-40"></div>
//                   <div className="h-3 bg-gray-200 rounded w-28"></div>
//                 </div>
//               </div>

//               <div className="flex flex-wrap gap-3 mt-4">
//                 {[1, 2, 3, 4].map((x) => (
//                   <div key={x} className="h-4 w-24 bg-gray-200 rounded"></div>
//                 ))}
//               </div>
//             </div>
//           ))
//         ) : currentJobs.length === 0 ? (
//           <p className="text-center text-gray-500">No jobs to show.</p>
//         ) : (
//           currentJobs.map((job, index) => (
//             <motion.div
//               key={job.id || index}
//               variants={item}
//               className="hover-card cursor-pointer"
//               onClick={() => handleJobClick(job)}
//             >
//               <div className="bg-white text-left rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row justify-between gap-6 shadow-[0px_3px_8px_0px_#30968914]">
//                 {/* LEFT */}
//                 <div className="flex-1">
//                   <p className="text-[10px] sm:text-xs px-2 py-1 rounded-lg w-fit bg-[#3096891A]">
//                     <span className="text-gradient">
//                       {job?.createdAt
//                         ? formatDate(job.createdAt)
//                         : "Recently Added"}
//                     </span>
//                   </p>

//                   <div className="flex items-center gap-3 sm:gap-4 mt-3">
//                     <div className="flex items-center justify-center rounded-xl overflow-hidden flex-shrink-0">
//                       <img
//                         src={job?.logoPreviewUrl || "/images/CompneyIcon.png"}
//                         alt={`${job?.companyName} logo`}
//                         className="w-15 h-8 sm:w-15 sm:h-12 object-contain"
//                       />
//                     </div>
//                     <div>
//                       <h2 className="text-base sm:text-lg font-semibold">
//                         {job?.title}
//                       </h2>
//                       <p className="text-xs sm:text-sm text-[#000000]">
//                         {job?.companyName}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Info row */}
//                   <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm mt-3 text-gray-700">
//                     <span className="flex items-center gap-1">
//                       <BriefcaseBusiness size={14} className="text-[#1C42FF]" />
//                       {job?.employmentType || "N/A"}
//                     </span>

//                     <span className="flex items-center gap-1">
//                       <Clock size={14} className="text-[#1C42FF]" />
//                       {job?.mode || "N/A"}
//                     </span>

//                     <span className="flex items-center gap-1">
//                       <LuWallet size={14} className="text-[#1C42FF]" />
//                       {job?.salaryRange || "Not disclosed"}
//                     </span>

//                     <span className="flex items-center gap-1">
//                       <MapPin size={14} className="text-[#1C42FF]" />
//                       {job?.jobPostAddresses?.length > 0
//                         ? `${job.jobPostAddresses[0].city}, ${job.jobPostAddresses[0].state}, ${job.jobPostAddresses[0].country}`
//                         : "Location not available"}
//                     </span>
//                   </div>
//                 </div>

//                 {/* RIGHT */}
//                 <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between gap-3 sm:gap-4">
//                   <button className="text-gray-400 hover:text-[#309689]">
//                     <BiBookmarkPlus size={20} />
//                   </button>
//                   <button className="px-4 sm:px-5 py-2 btn-gradient text-white text-xs sm:text-sm font-medium rounded-lg shadow hover:opacity-90 transition">
//                     Apply Job
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           ))
//         )}
//       </motion.div>

//       {/* ✅ Pagination (hidden while loading) */}
//       {!loading && jobsData.length > 0 && (
//         <div className="flex flex-col items-center mt-6 text-sm sm:text-base text-gray-600 gap-2">
//           <p>
//             Showing {(currentPage - 1) * jobsPerPage + 1}-
//             {Math.min(currentPage * jobsPerPage, jobsData.length)} of{" "}
//             {jobsData.length} results
//           </p>
//           <div className="flex items-center gap-2">
//             <button
//               onClick={() => setCurrentPage(currentPage - 1)}
//               disabled={currentPage === 1}
//               className="px-3 py-1 border rounded disabled:opacity-50"
//             >
//               Prev
//             </button>

//             {[...Array(totalPages)].map((_, i) => (
//               <button
//                 key={i}
//                 onClick={() => setCurrentPage(i + 1)}
//                 className={`px-3 py-1 border rounded ${
//                   currentPage === i + 1 ? "bg-[#1C42FF] text-white" : ""
//                 }`}
//               >
//                 {i + 1}
//               </button>
//             ))}

//             <button
//               onClick={() => setCurrentPage(currentPage + 1)}
//               disabled={currentPage === totalPages}
//               className="px-3 py-1 border rounded disabled:opacity-50"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default JobsPage;



import React, { useState, useEffect } from "react";
import { BriefcaseBusiness, Clock, MapPin } from "lucide-react";
import { BiBookmarkPlus } from "react-icons/bi";
import { LuWallet } from "react-icons/lu";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { getJobs } from "../api/service2";

const JobsPage = ({ filters, searchLoading }) => {

  const navigate = useNavigate();
  const [jobsData, setJobsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;
  const [loading, setLoading] = useState(true);
  const [dots, setDots] = useState(".");

  // ⏳ Animated loading dots
  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setDots((prev) => (prev.length === 3 ? "." : prev + "."));
    }, 400);
    return () => clearInterval(interval);
  }, [loading]);

  // ✅ Fetch jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const resp = await getJobs();
        setJobsData(resp?.data?.jobs || []);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
        setJobsData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // ✅ FILTER LOGIC
 const applyFilters = (jobs, filters) => {
  const { keyword, location, category } = filters;

  return jobs.filter((job) => {
    const title = job?.title?.toLowerCase() || "";
    const company = job?.companyName?.toLowerCase() || "";
    const empType = job?.employmentType?.toLowerCase() || "";
    const jobLoc = job?.jobPostAddresses?.[0]?.city?.toLowerCase() || "";

    const kw = keyword?.toLowerCase() || "";

    const matchKeyword =
      !keyword || title.includes(kw) || company.includes(kw);

    const matchLocation =
      !location || jobLoc.includes(location.toLowerCase());

    const matchCategory =
      !category || empType.includes(category.toLowerCase());

    return matchKeyword && matchLocation && matchCategory;
  });
};

const filteredJobs = applyFilters(jobsData, filters);


  // ⚡ Reset to page 1 whenever search filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Pagination logic using filtered results
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage) || 1;

  const currentJobs = filteredJobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );

  const handleJobClick = (job) => {
    navigate("/job-details", { state: { job } });
  };

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.2 } },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 md:px-6 lg:px-8 bg-[var(--background)] text-[var(--text)]">
      <motion.div
        className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div className="text-left" variants={item}>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
            Recent Jobs Available
          </h1>
          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Find the latest job postings from HR and employers. Explore
            opportunities today.
          </p>
        </motion.div>
      </motion.div>

      {/* LOADER + JOB LIST */}
      <motion.div
        className="grid gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {loading && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-sm text-gray-500 mb-1"
          >
            🔄 Loading latest jobs{dots}
          </motion.p>
        )}

      {loading || searchLoading ? (

          [...Array(5)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-white rounded-2xl p-4 sm:p-6 shadow-[0px_3px_8px_0px_#30968914]"
            >
              <div className="h-4 w-24 bg-gray-200 rounded mb-4"></div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-40"></div>
                  <div className="h-3 bg-gray-200 rounded w-28"></div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-4">
                {[1, 2, 3, 4].map((x) => (
                  <div key={x} className="h-4 w-24 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          ))
        ) : currentJobs.length === 0 ? (
          <p className="text-center text-gray-500">
            No jobs found matching your search.
          </p>
        ) : (
          currentJobs.map((job, index) => (
            <motion.div
              key={job.id || index}
              variants={item}
              className="hover-card cursor-pointer"
              onClick={() => handleJobClick(job)}
            >
              <div className="bg-white text-left rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row justify-between gap-6 shadow-[0px_3px_8px_0px_#30968914]">
                {/* LEFT */}
                <div className="flex-1">
                  <p className="text-[10px] sm:text-xs px-2 py-1 rounded-lg w-fit bg-[#3096891A]">
                    <span className="text-gradient">
                      {job?.createdAt
                        ? formatDate(job.createdAt)
                        : "Recently Added"}
                    </span>
                  </p>

                  <div className="flex items-center gap-3 sm:gap-4 mt-3">
                    <div className="flex items-center justify-center rounded-xl overflow-hidden flex-shrink-0">
                      <img
                        src={job?.logoPreviewUrl || "/images/CompneyIcon.png"}
                        alt={`${job?.companyName} logo`}
                        className="w-15 h-8 sm:w-15 sm:h-12 object-contain"
                      />
                    </div>
                    <div>
                      <h2 className="text-base sm:text-lg font-semibold">
                        {job?.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-[#000000]">
                        {job?.companyName}
                      </p>
                    </div>
                  </div>

                  {/* INFO ROW */}
                  <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm mt-3 text-gray-700">
                    <span className="flex items-center gap-1">
                      <BriefcaseBusiness size={14} className="text-[#1C42FF]" />
                      {job?.employmentType || "N/A"}
                    </span>

                    <span className="flex items-center gap-1">
                      <Clock size={14} className="text-[#1C42FF]" />
                      {job?.mode || "N/A"}
                    </span>

                    <span className="flex items-center gap-1">
                      <LuWallet size={14} className="text-[#1C42FF]" />
                      {job?.salaryRange || "Not disclosed"}
                    </span>

                    <span className="flex items-center gap-1">
                      <MapPin size={14} className="text-[#1C42FF]" />
                      {job?.jobPostAddresses?.length > 0
                        ? `${job.jobPostAddresses[0].city}, ${job.jobPostAddresses[0].state}, ${job.jobPostAddresses[0].country}`
                        : "Location not available"}
                    </span>
                  </div>
                </div>

                {/* RIGHT */}
                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between gap-3 sm:gap-4">
                  <button className="text-gray-400 hover:text-[#309689]">
                    <BiBookmarkPlus size={20} />
                  </button>
                  <button className="px-4 sm:px-5 py-2 btn-gradient text-white text-xs sm:text-sm font-medium rounded-lg shadow hover:opacity-90 transition">
                    Apply Job
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>

      {/* PAGINATION */}
      {!loading && filteredJobs.length > 0 && (
        <div className="flex flex-col items-center mt-6 text-sm sm:text-base text-gray-600 gap-2">
          <p>
            Showing {(currentPage - 1) * jobsPerPage + 1}-
            {Math.min(currentPage * jobsPerPage, filteredJobs.length)} of{" "}
            {filteredJobs.length} results
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 border rounded ${
                  currentPage === i + 1 ? "bg-[#1C42FF] text-white" : ""
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobsPage;
