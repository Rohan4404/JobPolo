// import React, { useState } from "react";
// import { BriefcaseBusiness, Clock, MapPin } from "lucide-react";
// import { LuWallet } from "react-icons/lu";
// import { BiBookmarkPlus, BiBookmark } from "react-icons/bi";
// import { toast } from "react-toastify";

// import { useNavigate } from "react-router-dom";
// import ApplyJobModal from "./ApplyJobModal";
// import { saveQuery, unsaveQuery } from "../api/service2";

// const JobListCard = ({ job, isSaved = false }) => {
//   const navigate = useNavigate();
//   const [saved, setSaved] = useState(isSaved);
//   const [openApplyModal, setOpenApplyModal] = useState(false);

//   if (!job) return null;

//   // Format Helpers
//   const formatSalaryNumber = (num) => {
//     if (!num) return "";
//     if (num >= 10000000) return `₹${(num / 10000000).toFixed(1)} Cr`;
//     if (num >= 100000) return `₹${(num / 100000).toFixed(1)} L`;
//     if (num >= 1000) return `₹${(num / 1000).toFixed(1)}K`;
//     return `₹${num}`;
//   };

//   const formatSalaryType = (type) => {
//     const map = { YEARLY: "Year", MONTHLY: "Month", WEEKLY: "Week", DAILY: "Day", HOURLY: "Hour" };
//     return map[type] || type;
//   };

//   const formatDate = (date) =>
//     new Date(date).toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" });

//   const salary =
//     job.minSalary && job.maxSalary
//       ? `${formatSalaryNumber(job.minSalary)} - ${formatSalaryNumber(job.maxSalary)} / ${formatSalaryType(job.salaryType)}`
//       : "Not disclosed";

//   const location =
//     job?.jobPostAddresses?.length > 0
//       ? `${job.jobPostAddresses[0].city}, ${job.jobPostAddresses[0].state}, ${job.jobPostAddresses[0].country}`
//       : "Location not available";

//   // SAVE / UNSAVE JOB
//  const handleSave = async (e) => {
//   e.stopPropagation();

//   const prev = saved;        // store old state
//   setSaved(!prev);           // 🔥 optimistic toggle

//   try {
//     if (!prev) {
//       await saveQuery(job.id);
//       toast.success("Job saved");
//     } else {
//       await unsaveQuery(job.id);
//       toast.info("Job removed from saved");
//     }
//   } catch (err) {
//     setSaved(prev);          // rollback on failure
//     toast.error("Action failed. Please try again");
//     console.error("Save/Unsave error", err);
//   }
// };

//   return (
//     <>
//       <div
//         onClick={() => navigate("/job-details", { state: { job } })}
//         className="bg-white rounded-2xl overflow-hidden p-5 shadow hover:shadow-lg transition cursor-pointer flex flex-col sm:flex-row justify-between gap-6"
//       >
//         {/* LEFT SIDE */}
//         <div className="flex-1">
//           <p className="text-[10px] sm:text-xs px-2 py-1 rounded-lg w-fit bg-[#3096891A] mb-3">
//             <span className="text-gradient">
//               {job.createdAt ? formatDate(job.createdAt) : "Recently Added"}
//             </span>
//           </p>

//           <div className="flex items-center gap-4">
//             <img
//               src={job?.logoPreviewUrl || "/images/CompneyIcon.png"}
//               alt="logo"
//               className="w-12 h-12 rounded-xl object-cover"
//             />
//             <div>
//               <h2 className="text-base sm:text-lg font-semibold">{job.title}</h2>
//               <p className="text-xs sm:text-sm text-gray-600">{job.companyName}</p>
//             </div>
//           </div>

//           <div className="flex flex-wrap gap-4 text-xs sm:text-sm mt-4 text-gray-700">
//             <span className="flex items-center gap-1">
//               <BriefcaseBusiness size={14} className="text-[#1C42FF]" />
//               {job.employmentType}
//             </span>

//             <span className="flex items-center gap-1">
//               <Clock size={14} className="text-[#1C42FF]" />
//               {job.mode}
//             </span>

//             <span className="flex items-center gap-1">
//               <LuWallet size={14} className="text-[#1C42FF]" />
//               {salary}
//             </span>

//             <span className="flex items-center gap-1">
//               <MapPin size={14} className="text-[#1C42FF]" />
//               {location}
//             </span>
//           </div>
//         </div>

//         {/* RIGHT SIDE */}
//         <div className="flex flex-col items-end gap-3">
//           <button onClick={handleSave}>
//   {saved ? <BiBookmark size={20} /> : <BiBookmarkPlus size={20} />}

// </button>

//           <button
//             className="px-5 py-2 btn-gradient text-white font-medium rounded-lg shadow hover:opacity-90 transition"
//             onClick={(e) => {
//               e.stopPropagation();
//               setOpenApplyModal(true);
//             }}
//           >
//             Apply Job
//           </button>
//         </div>
//       </div>

//       {openApplyModal && (
//         <ApplyJobModal
//           job={job}
//           onClose={() => setOpenApplyModal(false)}
//         />
//       )}
//     </>
//   );
// };

// export default JobListCard;

import React, { useState, useEffect } from "react";
import { BriefcaseBusiness, Clock, MapPin } from "lucide-react";
import { LuWallet } from "react-icons/lu";
import { BiBookmarkPlus } from "react-icons/bi";
import { BsBookmarkFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import ApplyJobModal from "./ApplyJobModal";
import { saveQuery } from "../api/service2";
import { toast } from "react-toastify";

const JobListCard = ({ job, isSaved = false, isApplied = false }) => {
  const navigate = useNavigate();

  const [saved, setSaved] = useState(isSaved);
  const [saving, setSaving] = useState(false);
  const [openApplyModal, setOpenApplyModal] = useState(false);
  const [applied, setApplied] = useState(isApplied);

  useEffect(() => {
    setApplied(isApplied);
  }, [isApplied]);

  // 🔁 Sync prop → state (important for SavedJobs page)
  useEffect(() => {
    setSaved(isSaved);
  }, [isSaved]);

  if (!job) return null;

  /* ---------------- FORMAT HELPERS ---------------- */

  const formatSalaryNumber = (num) => {
    if (!num) return "";
    if (num >= 10000000) return `₹${(num / 10000000).toFixed(1)} Cr`;
    if (num >= 100000) return `₹${(num / 100000).toFixed(1)} L`;
    if (num >= 1000) return `₹${(num / 1000).toFixed(1)}K`;
    return `₹${num}`;
  };

  const formatSalaryType = (type) => {
    const map = {
      YEARLY: "Year",
      MONTHLY: "Month",
      WEEKLY: "Week",
      DAILY: "Day",
      HOURLY: "Hour",
    };
    return map[type] || type;
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const salary =
    job.minSalary && job.maxSalary
      ? `${formatSalaryNumber(job.minSalary)} - ${formatSalaryNumber(
          job.maxSalary,
        )} / ${formatSalaryType(job.salaryType)}`
      : "Not disclosed";

  const location =
    job?.jobPostAddresses?.length > 0
      ? `${job.jobPostAddresses[0].city}, ${job.jobPostAddresses[0].state}, ${job.jobPostAddresses[0].country}`
      : "Location not available";

  /* ---------------- SAVE / UNSAVE ---------------- */

  const handleSave = async (e) => {
    e.stopPropagation();
    if (saving) return;

    const prev = saved;
    setSaving(true);

    // Optimistic UI
    setSaved(!prev);

    try {
      // ✅ Pass saveViewType
      await saveQuery(job.id, "JOB");

      if (!prev) {
        toast.success("Job saved");
      } else {
        toast.info("Job removed from saved");
      }
    } catch (err) {
      // Rollback UI
      setSaved(prev);

      const msg =
        err?.response?.data?.msg ||
        "Unable to update saved job. Please complete your profile.";

      toast.error(msg);
      console.error("Save job error:", err);
    } finally {
      setSaving(false);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <>
      <div
        onClick={() => navigate("/job-details", { state: { job } })}
        className="bg-white rounded-2xl overflow-hidden p-5 shadow hover:shadow-lg transition cursor-pointer flex flex-col sm:flex-row justify-between gap-6"
      >
        {/* LEFT */}
        <div className="flex-1">
          <p className="text-[10px] sm:text-xs px-2 py-1 rounded-lg w-fit bg-[#3096891A] mb-3">
            <span className="text-gradient">
              {job.createdAt ? formatDate(job.createdAt) : "Recently Added"}
            </span>
          </p>

          <div className="flex items-center gap-4">
            <img
              src={job?.logoPreviewUrl || "/images/CompneyIcon.png"}
              alt="logo"
              className="w-12 h-12 rounded-xl object-cover"
            />
            <div>
              <h2 className="text-base sm:text-lg font-semibold">
                {job.title}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600">
                {job.companyName}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-xs sm:text-sm mt-4 text-gray-700">
            <span className="flex items-center gap-1">
              <BriefcaseBusiness size={14} className="text-[#1C42FF]" />
              {job.employmentType}
            </span>

            <span className="flex items-center gap-1">
              <Clock size={14} className="text-[#1C42FF]" />
              {job.mode}
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
            onClick={handleSave}
            disabled={saving}
            className={`${saving ? "opacity-60 cursor-not-allowed" : ""}`}
            title={saved ? "Unsave job" : "Save job"}
          >
            {saved ? (
              <BsBookmarkFill size={20} className="text-gray-500" />
            ) : (
              <BiBookmarkPlus
                size={20}
                className="text-blue-600 hover:text-blue-800"
              />
            )}
          </button>

          <button
            disabled={applied}
            className={`px-5 py-2 rounded-lg font-medium shadow transition
    ${
      applied
        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
        : "btn-gradient text-white hover:opacity-90"
    }
  `}
            onClick={(e) => {
              e.stopPropagation();
              if (!applied) setOpenApplyModal(true);
            }}
          >
            {applied ? "Applied ✓" : "Apply Job"}
          </button>
        </div>
      </div>

      {openApplyModal && (
        <ApplyJobModal job={job} onClose={() => setOpenApplyModal(false)} />
      )}
    </>
  );
};

export default JobListCard;
