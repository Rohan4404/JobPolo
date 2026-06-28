import React, { useEffect, useState } from "react";
import {
  getAppliedJobs,
  getJobsFilters,
  withdrawJobApplication,
} from "../api/service2";
import { toast } from "react-toastify";
import { DashboardCard, DashboardLoader } from "../components/dashboard/DashboardUI";

const AppliedJobsPage = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [withdrawingId, setWithdrawingId] = useState(null);

  useEffect(() => {
    const loadApplied = async () => {
      try {
        // 1️⃣ Get applied references (application/job IDs)
        const appliedRes = await getAppliedJobs();

        console.log("APPLIED RAW RESPONSE:", appliedRes);

       const appliedRefs =
  appliedRes.data?.data ||
  appliedRes.data?.activities ||
  appliedRes.data?.appliedJobs ||
  [];

    const appliedJobIds = appliedRefs.map((a) =>
  String(a.value || a.jobId || a.job_id || a._id)
);

        console.log("APPLIED JOB IDS:", appliedJobIds);

        // 2️⃣ Get all jobs
        const allJobsRes = await getJobsFilters({
          page: 1,
          limit: 1000,
          is_active: true,
        });

        const allJobs =
          allJobsRes?.data?.jobs ||
          allJobsRes?.jobs ||
          [];

        console.log("ALL JOBS COUNT:", allJobs.length);

        // 3️⃣ Match
       const finalAppliedJobs = allJobs.filter((job) =>
  appliedJobIds.includes(String(job.id || job._id))
);

        console.log("FINAL APPLIED JOBS:", finalAppliedJobs);

        setAppliedJobs(finalAppliedJobs);
      } catch (err) {
        console.error("Applied jobs error:", err);
        toast.error("Failed to load applied jobs");
      } finally {
        setLoading(false);
      }
    };

    loadApplied();
  }, []);

  const handleWithdraw = async (jobId) => {
    const reason = prompt("Reason for withdrawal?");
    if (!reason) return;

    try {
      setWithdrawingId(jobId);

      await withdrawJobApplication(jobId, reason);

      toast.success("Application withdrawn successfully");

      // ✅ Remove from UI
      setAppliedJobs((prev) => prev.filter((job) => job.id !== jobId));
    } catch (err) {
      toast.error(err?.response?.data?.msg || "Failed to withdraw application");
    } finally {
      setWithdrawingId(null);
    }
  };

  // Loader
  if (loading) {
    return <DashboardLoader message="Loading your applied jobs…" />;
  }

  return (
    <DashboardCard className="space-y-4">
      {appliedJobs.length === 0 ? (
        <p className="text-gray-600 text-center mt-6">
          You haven’t applied to any jobs yet.
        </p>
      ) : (
        appliedJobs.map((job) => (
          <div
            key={job.id}
            className="bg-white rounded-xl shadow p-4 sm:p-5 flex flex-col sm:flex-row justify-between sm:items-center gap-4 border border-blue-100"
          >
              {/* LEFT */}
              <div>
                <h2 className="font-semibold text-lg text-gray-900">
                  {job.title}
                </h2>
                <p className="text-sm text-gray-600">
                  {job.companyName}
                </p>
              </div>

              {/* RIGHT */}
              <button
                disabled={withdrawingId === job.id}
                onClick={() => handleWithdraw(job.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition
                  ${
                    withdrawingId === job.id
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-red-500 text-white hover:bg-red-600"
                  }`}
              >
                {withdrawingId === job.id ? "Withdrawing..." : "Withdraw"}
              </button>
            </div>
          ))
        )}
    </DashboardCard>
  );
};

export default AppliedJobsPage;
