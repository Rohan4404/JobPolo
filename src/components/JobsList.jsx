
// import React, { useState, useMemo } from "react";
// import JobCard from "./JobCard";

// const JobsList = ({ jobs }) => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [sortBy, setSortBy] = useState("latest");
//   const jobsPerPage = 6;

//   // Sort jobs based on selected option
//   const sortedJobs = useMemo(() => {
//     let sorted = [...jobs];
    
//     switch (sortBy) {
//       case "latest":
//         // Assuming jobs have a date field, or keep original order
//         return sorted;
      
//       case "oldest":
//         // Reverse the array for oldest first
//         return sorted.reverse();
      
//       case "salaryHigh":
//         return sorted.sort((a, b) => {
//           const getAvgSalary = (salary) => {
//             const nums = salary.match(/\d+/g);
//             if (!nums) return 0;
//             return (parseInt(nums[0]) + parseInt(nums[1])) / 2;
//           };
//           return getAvgSalary(b.salary) - getAvgSalary(a.salary);
//         });
      
//       case "salaryLow":
//         return sorted.sort((a, b) => {
//           const getAvgSalary = (salary) => {
//             const nums = salary.match(/\d+/g);
//             if (!nums) return 0;
//             return (parseInt(nums[0]) + parseInt(nums[1])) / 2;
//           };
//           return getAvgSalary(a.salary) - getAvgSalary(b.salary);
//         });
      
//       default:
//         return sorted;
//     }
//   }, [jobs, sortBy]);

//   const totalPages = Math.ceil(sortedJobs.length / jobsPerPage);
//   const indexOfLast = currentPage * jobsPerPage;
//   const indexOfFirst = indexOfLast - jobsPerPage;
//   const currentJobs = sortedJobs.slice(indexOfFirst, indexOfLast);

//   const handlePageClick = (page) => setCurrentPage(page);

//   const handleSortChange = (e) => {
//     setSortBy(e.target.value);
//     setCurrentPage(1); // Reset to first page when sorting changes
//   };

//   // Calculate the correct "showing" range
//   const showingStart = sortedJobs.length === 0 ? 0 : indexOfFirst + 1;
//   const showingEnd = Math.min(indexOfLast, sortedJobs.length);

//   // Reset to last page if current page exceeds total pages
//   React.useEffect(() => {
//     if (currentPage > totalPages && totalPages > 0) {
//       setCurrentPage(totalPages);
//     }
//   }, [currentPage, totalPages]);

//   return (
//     <div className="mt-8">
//       {/* Results Info + Sort */}
//       <div className="flex justify-between items-center mb-6 text-sm">
//         <p className="text-gray-600">
//           Showing {showingStart}-{showingEnd} of {sortedJobs.length} results
//         </p>
//         <select
//           className="border border-gray-300 rounded px-3 py-1 text-sm outline-none cursor-pointer"
//           value={sortBy}
//           onChange={handleSortChange}
//         >
//           <option value="latest">Sort by latest</option>
//           <option value="oldest">Sort by oldest</option>
//           <option value="salaryHigh">Salary: High to Low</option>
//           <option value="salaryLow">Salary: Low to High</option>
//         </select>
//       </div>

//       {/* Jobs Grid */}
//       {currentJobs.length > 0 ? (
//         <div className="grid gap-6">
//           {currentJobs.map((job) => (
//             <div key={job.id} className="hover-card">
//               <JobCard job={job} />
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="text-center py-12">
//           <p className="text-gray-500 text-lg">No jobs found matching your criteria.</p>
//         </div>
//       )}

//       {/* Pagination */}
//       {totalPages > 0 && (
//         <div className="flex justify-center items-center gap-3 mt-8">
//           <button
//             onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
//             disabled={currentPage === 1}
//             className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             Prev
//           </button>
//           {[...Array(totalPages)].map((_, i) => (
//             <button
//               key={i}
//               onClick={() => handlePageClick(i + 1)}
//               className={`px-3 py-1 border rounded ${
//                 currentPage === i + 1 ? "btn-gradient text-white" : ""
//               }`}
//             >
//               {i + 1}
//             </button>
//           ))}
//           <button
//             onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
//             disabled={currentPage === totalPages}
//             className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default JobsList;



import React, { useState, useMemo, useEffect } from "react";
import JobCard from "./JobCard";

const JobsList = ({ jobs, loading }) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("latest");
  const jobsPerPage = 3;

  // Extract numeric salary for sorting
  const getAvgSalary = (salaryRange) => {
    if (!salaryRange) return 0;
    const nums = salaryRange.match(/\d+/g);
    if (!nums) return 0;
    return (parseInt(nums[0]) + parseInt(nums[1])) / 2;
  };

  // Sorting logic
  const sortedJobs = useMemo(() => {
    let sorted = [...jobs];

    switch (sortBy) {
      case "oldest":
        return sorted.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );

      case "salaryHigh":
        return sorted.sort(
          (a, b) => getAvgSalary(b.salaryRange) - getAvgSalary(a.salaryRange)
        );

      case "salaryLow":
        return sorted.sort(
          (a, b) => getAvgSalary(a.salaryRange) - getAvgSalary(b.salaryRange)
        );

      case "latest":
      default:
        return sorted.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
    }
  }, [jobs, sortBy]);

  const totalPages = Math.ceil(sortedJobs.length / jobsPerPage);
  const indexOfLast = currentPage * jobsPerPage;
  const indexOfFirst = indexOfLast - jobsPerPage;
  const currentJobs = sortedJobs.slice(indexOfFirst, indexOfLast);

  useEffect(() => {
    if (currentPage > totalPages && totalPages !== 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages]);

  const showingStart = sortedJobs.length === 0 ? 0 : indexOfFirst + 1;
  const showingEnd = Math.min(indexOfLast, sortedJobs.length);
  if (loading) {
  return (
    <div className="flex justify-center items-center py-10">
      <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}


  return (
    <div className="mt-8">
      {/* Header (showing results + sorting) */}
      <div className="flex justify-between items-center mb-6 text-sm">
        <p className="text-gray-600">
          Showing {showingStart}-{showingEnd} of {sortedJobs.length} results
        </p>

        <select
          className="border border-gray-300 rounded px-3 py-1 text-sm outline-none cursor-pointer"
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="latest">Sort by Latest</option>
          <option value="oldest">Sort by Oldest</option>
          <option value="salaryHigh">Salary: High to Low</option>
          <option value="salaryLow">Salary: Low to High</option>
        </select>
      </div>

      {/* Jobs Grid */}
      {currentJobs.length > 0 ? (
        <div className="grid gap-6 w-full">

         {currentJobs
  .filter((job) => job && job.title)     // 👈 STOP rendering empty jobs
  .map((job, index) => (
    <JobCard key={job.id || index} job={job} />

  ))}

        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No jobs found matching criteria.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 0 && (
        <div className="flex justify-center items-center gap-3 mt-8">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1 ? "btn-gradient text-white" : ""
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default JobsList;
