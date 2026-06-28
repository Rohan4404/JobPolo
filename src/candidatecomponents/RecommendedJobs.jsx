import React, { useEffect, useState } from "react";
import { getJobs, getUserProfile } from "../api/service2";
import JobListCard from "./JobListCard";
import { DashboardCard, DashboardLoader } from "../components/dashboard/DashboardUI";

const RecommendedJobs = () => {
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        // 🔁 CACHE CHECK
        // const cached = sessionStorage.getItem("recommended_jobs");
        // if (cached) {
        //   setRecommended(JSON.parse(cached));
        //   setLoading(false);
        //   return;
        // }

        // 1️⃣ Candidate profile
        const profileRes = await getUserProfile();
        const profile = profileRes?.data || {};

        const skills = profile.skills || [];
        const candidateCategoryId = profile.categoryId;

        const experience = profile.experience;
        const location = profile.city;

        // 2️⃣ Jobs
        const jobRes = await getJobs(1, 100);
        const jobs = jobRes.data?.jobs || [];

        // 3️⃣ MATCH LOGIC (ANY ONE MATCH)
        const matchedJobs = jobs.filter((job) => {
          const skillMatch =
            job.skillsRequired?.some((s) => skills.includes(s)) || false;

          const industryMatch = job.categoryId === candidateCategoryId;


          const locationMatch =
            job.jobPostAddresses?.[0]?.city === location ||
            job.mode === "REMOTE";

          const experienceMatch =
            experience >= job.minExperience &&
            experience <= job.maxExperience;

          return (
            skillMatch ||
            industryMatch ||
            locationMatch ||
            experienceMatch
          );
        });

        // 4️⃣ Attach WHY metadata (for badge & tooltip)
        const enriched = matchedJobs.map((job) => {
          const reasons = [];
          if (job.skillsRequired?.some((s) => skills.includes(s)))
            reasons.push("Skill match");
          if (job.categoryId === candidateCategoryId)
  reasons.push("Industry match");

          if (
            job.jobPostAddresses?.[0]?.city === location ||
            job.mode === "REMOTE"
          )
            reasons.push("Location match");
          if (
            experience >= job.minExperience &&
            experience <= job.maxExperience
          )
            reasons.push("Experience match");

          return { ...job, reasons };
        });

        // sessionStorage.setItem(
        //   "recommended_jobs",
        //   JSON.stringify(enriched)
        // );

        setRecommended(enriched);
      } catch (err) {
        console.error("Recommended jobs error:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  // 🔄 LOADER (same CSS system)
  if (loading) {
    return <DashboardLoader message="Finding best jobs for you…" />;
  }

  return (
    <DashboardCard className="space-y-4">
      {recommended.length === 0 ? (
        <p className="text-gray-600 text-center mt-6">
          No recommended jobs found yet.
        </p>
      ) : (
          recommended.map((job) => (
            <div key={job.id} className="relative">

              {/* 🔥 MATCH BADGE */}
              <div className="absolute -top-2 -right-2 z-10 group">
  <div className="bg-green-600 text-white text-xs px-3 py-1 rounded-full shadow cursor-pointer">
    {job.reasons.length * 25}% Match
  </div>

  {/* Tooltip */}
  <div className="absolute right-0 mt-2 w-44 bg-black text-white text-xs rounded-md p-2 opacity-0 group-hover:opacity-100 transition pointer-events-none">
    <p className="font-semibold mb-1">Why recommended?</p>
    <ul className="list-disc list-inside space-y-1">
      {job.reasons.map((r, i) => (
        <li key={i}>{r}</li>
      ))}
    </ul>
  </div>
</div>


              <JobListCard job={job} />
            </div>
          ))
        )}
    </DashboardCard>
  );
};

export default RecommendedJobs;
