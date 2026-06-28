// import React, { useEffect, useState } from "react";
// import { getJobs, getSavedQueries, getAppliedJobs } from "../api/service2";
// import JobListCard from "./JobListCard";

// const CandidateJobsPage = () => {
//   const [jobs, setJobs] = useState([]);
//   const [savedJobs, setSavedJobs] = useState([]);
//     const [appliedJobs, setAppliedJobs] = useState([]);

//   const [loading, setLoading] = useState(true);
// useEffect(() => {
//   const refreshApplied = async (e) => {
//     if (e?.detail) {
//       setAppliedJobs((prev) => [...new Set([...prev, e.detail])]);
//     } else {
//       const appliedRes = await getAppliedJobs();
//       setAppliedJobs(
//         appliedRes.applied?.map((a) => a.jobId) || []
//       );
//     }
//   };

//   window.addEventListener("job-applied", refreshApplied);
//   return () => window.removeEventListener("job-applied", refreshApplied);
// }, []);

//   useEffect(() => {
//     const load = async () => {
//       try {
//         const jobRes = await getJobs(1, 50);
//         setJobs(jobRes.data?.jobs || []);

//         // SAVED
//         try {
//           const savedRes = await getSavedQueries();
//           setSavedJobs(
//             savedRes.data?.saved?.map((j) => j.jobId) || []
//           );
//         } catch {
//           setSavedJobs([]);
//         }

//         // APPLIED
//         try {
//           const appliedRes = await getAppliedJobs();
//           setAppliedJobs(
//             appliedRes.data?.viewed?.map((j) => j.jobId) || []
//           );
//         } catch {
//           setAppliedJobs([]);
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     load();
//   }, []);

//   if (loading) {
//   return (
//     <div className="section-loader">
//       <div className="flex flex-col items-center">
//         <div className="page-loader-spinner mb-3"></div>
//         <p className="page-loader-text">Loading jobs...</p>
//       </div>
//     </div>
//   );
// }

//   return (
//     <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 p-4 sm:p-6 text-left">

//       {/* HEADER — same as profile */}
//       <div className="mb-6">
//         <h1 className="text-3xl font-bold text-blue-900">
//           Find Your Dream Job
//         </h1>
//         <p className="text-blue-700 mt-1 text-sm sm:text-base">
//           Browse the latest opportunities perfect for you
//         </p>
//       </div>

//       {/* MAIN CARD — same as profile */}
//       <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100 h-[70vh] overflow-y-auto space-y-4">
//         {jobs.length === 0 ? (
//           <p className="text-gray-600 text-center mt-6">
//             No jobs available right now.
//           </p>
//         ) : (
//           jobs.map((job) => (
//             <JobListCard
//               key={job.id}
//               job={job}
//               isSaved={savedJobs.includes(job.id)}
//               isApplied={appliedJobs.includes(job.id)}
//             />
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default CandidateJobsPage;

import React, { useEffect, useState } from "react";
import { getJobs, getSavedQueries, getAppliedJobs } from "../api/service2";
import JobListCard from "./JobListCard";
import { DashboardCard, DashboardLoader } from "../components/dashboard/DashboardUI";

const CandidateJobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔔 Listen when job applied
  useEffect(() => {
    const onApplied = (e) => {
      if (e?.detail) {
        setAppliedJobs((prev) =>
          prev.includes(e.detail) ? prev : [...prev, e.detail],
        );
      }
    };

    window.addEventListener("job-applied", onApplied);
    return () => window.removeEventListener("job-applied", onApplied);
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const jobRes = await getJobs(1, 50);
        setJobs(jobRes.data?.jobs || []);

        const savedRes = await getSavedQueries();
        setSavedJobs(
          savedRes.data?.saved?.map((j) => j.value || j.jobId) || [],
        );

        const appliedRes = await getAppliedJobs();
        setAppliedJobs(
          appliedRes.data?.saved?.map((j) => j.job?.id).filter(Boolean) || [],
        );
        console.log("APPLIED RESPONSE", appliedRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return <DashboardLoader message="Loading jobs..." />;
  }

  return (
    <DashboardCard className="space-y-4">
      {jobs.map((job) => (
        <JobListCard
          key={job.id}
          job={job}
          isSaved={savedJobs.includes(job.id)}
          isApplied={appliedJobs.includes(job.id)}
        />
      ))}
    </DashboardCard>
  );
};

export default CandidateJobsPage;
