import React, { useEffect, useState } from "react";
import { getSavedQueries, getJobsFilters } from "../api/service2";

import JobListCard from "./JobListCard";
import { DashboardCard, DashboardLoader } from "../components/dashboard/DashboardUI";

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
    return <DashboardLoader message="Loading saved jobs…" />;
  }

  return (
    <DashboardCard className="space-y-4">
      {savedJobs.length === 0 ? (
        <p className="text-gray-600 text-center mt-6">
          You haven’t saved any jobs yet.
        </p>
      ) : (
        savedJobs.map((job) => (
          <JobListCard key={job.id} job={job} isSaved={true} />
        ))
      )}
    </DashboardCard>
  );
};

export default SavedJobs;
