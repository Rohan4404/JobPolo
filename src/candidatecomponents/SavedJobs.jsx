import React, { useEffect, useState } from "react";
import { getSavedQueries, getJobsFilters } from "../api/service2";

import JobListCard from "./JobListCard";

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSaved = async () => {
      try {
        // 1️⃣ Get saved references (IDs)
        const savedRes = await getSavedQueries();
        const savedRefs = savedRes.data?.saved || [];

        const savedJobIds = savedRefs.map((s) => s.value);

        console.log("SAVED JOB IDS:", savedJobIds);

        // 2️⃣ Get ALL jobs
        const allJobsRes = await getJobsFilters({
          page: 1,
          limit: 1000, // big number to get all
          is_active: true,
        });

        const allJobs = allJobsRes?.data?.jobs || allJobsRes?.jobs || [];

        console.log("ALL JOBS COUNT:", allJobs.length);

        // 3️⃣ Match
        const finalSavedJobs = allJobs.filter((job) =>
          savedJobIds.includes(job.id),
        );

        console.log("FINAL SAVED JOBS:", finalSavedJobs);

        setSavedJobs(finalSavedJobs);
      } catch (err) {
        console.error("Saved jobs error:", err);
        setSavedJobs([]);
      } finally {
        setLoading(false);
      }
    };

    loadSaved();
  }, []);

  // 🔄 Loader (same system as Jobs & Recommended)
  if (loading) {
    return (
      <div className="section-loader">
        <div className="flex flex-col items-center">
          <div className="page-loader-spinner mb-3"></div>
          <p className="page-loader-text">Loading saved jobs…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 p-4 sm:p-6 text-left">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-blue-900">Saved Jobs</h1>
        <p className="text-blue-700 mt-1 text-sm sm:text-base">
          Jobs you bookmarked for later
        </p>
      </div>

      {/* MAIN CARD */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100 h-[70vh] overflow-y-auto space-y-4">
        {savedJobs.length === 0 ? (
          <p className="text-gray-600 text-center mt-6">
            You haven’t saved any jobs yet.
          </p>
        ) : (
          savedJobs.map((job) => (
            <JobListCard key={job.id} job={job} isSaved={true} />
          ))
        )}
      </div>
    </div>
  );
};

export default SavedJobs;
