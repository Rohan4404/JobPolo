import React, { useState, useEffect } from "react";
import {
  MoreVertical,
  Users,
  Search,
  Filter,
  X,
  Bookmark,
  BookmarkCheck,
} from "lucide-react";
import {
  getJobsFilters,
  getActiveJobApplications,
  saveQuery,
  getSavedQueries,
} from "../api/service2";
import JobDetailsModal from "./JobDetailsModel";
import UpdateJobModal from "./UpadteJobsModal";
import DeleteJobModal from "./DeleteJobs";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getDashboardPath } from "../config/dashboardNav";
import { DashboardCard } from "../components/dashboard/DashboardUI";

const JobRow = ({
  job,
  isSelected,
  onMenuClick,
  applicationCounts,
  onViewApplications,
}) => (
  <div
    className={`flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 py-4 border-b hover:bg-gray-50 ${
      isSelected ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
    }`}
  >
    <div className="sm:w-1/3 text-left mb-3 sm:mb-0 flex items-center gap-3">
      {job.logoPreviewUrl ? (
        <img
          src={job.logoPreviewUrl}
          alt={job.companyName || "Logo"}
          className="w-20 h-10 rounded-md object-cover border"
        />
      ) : (
        <div className="w-10 h-10 rounded-md bg-gray-200 flex items-center justify-center text-gray-600 text-sm font-medium">
          {job.title?.charAt(0).toUpperCase() || "J"}
        </div>
      )}

      <div>
        <h4 className="font-medium text-gray-900 text-sm sm:text-base md:text-lg">
          {job.title}
        </h4>
        <p className="text-xs sm:text-sm text-gray-500">
          {job.employmentType} • {job.mode}
        </p>
      </div>
    </div>

    <div className="sm:w-1/5 text-left mb-2 sm:mb-0">
      <span
        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
          job.is_active
            ? "text-green-700 bg-green-50"
            : "text-red-700 bg-red-50"
        }`}
      >
        <span
          className={`w-2 h-2 rounded-full ${
            job.is_active ? "bg-green-500" : "bg-red-500"
          }`}
        ></span>
        {job.is_active ? "Active" : "Inactive"}
      </span>
    </div>

    <div className="sm:w-1/5 text-left mb-2 sm:mb-0">
      <span className="inline-flex items-center gap-1 text-xs sm:text-sm text-gray-600">
        <Users size={16} />
        {applicationCounts[job.id] ?? 0} Applications
      </span>
    </div>

    <div className="sm:w-1/5 flex items-center gap-2 justify-start">
      <button
        onClick={() => onViewApplications(job.id)}
        className="relative px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-blue-600 rounded whitespace-nowrap group"
      >
        View Applications
        <span className="absolute left-5 bottom-1 h-[1px] w-0 bg-blue-600 transition-all duration-300 group-hover:w-[70%]"></span>
      </button>

      <button
        onClick={(e) => onMenuClick(job, e)}
        className="p-1 hover:bg-gray-100 rounded"
      >
        <MoreVertical size={18} className="text-gray-600" />
      </button>
    </div>
  </div>
);

const MyJobs = () => {
  const navigate = useNavigate();

  const handleViewApplications = (jobId) => {
    sessionStorage.setItem("selectedJobId", jobId);
    navigate(getDashboardPath("Job Applications"));
  };
  const [jobs, setJobs] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedJob, setSelectedJob] = useState(null);
  const [showMenu, setShowMenu] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const [loading, setLoading] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedJobDetails, setSelectedJobDetails] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedJobForDelete, setSelectedJobForDelete] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [applicationCounts, setApplicationCounts] = useState({});
  const [savedJobIds, setSavedJobIds] = useState(new Set());

  const jobsPerPage = 10;
  const totalPages = Math.ceil(totalJobs / jobsPerPage);

  const [filters, setFilters] = useState({
    search: "",
    mode: "",
    city: "",
    employmentType: "",
    state: "",
    country: "",
    pincode: "",
    userId: "",
    is_active: "",
  });

  const updateFilter = (key, val) => {
    setCurrentPage(1);
    setFilters((prev) => ({ ...prev, [key]: val }));
  };

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await getJobsFilters({
        page: currentPage,
        limit: jobsPerPage,
        ...filters,
        is_active:
          filters.is_active === "" ? undefined : filters.is_active === "true",
      });

      const jobsData = res.data.jobs || [];

      setJobs(jobsData);
      setTotalJobs(res.data.total || 0);

      // 🔥 FETCH APPLICATION COUNTS HERE
      if (jobsData.length > 0) {
        fetchApplicationCounts(jobsData);
      }
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
    setLoading(false);
  };

  const fetchSavedJobs = async () => {
    try {
      const res = await getSavedQueries({
        type: "JOB",
        page: 1,
        limit: 1000,
      });

      const ids = new Set((res?.data?.saved || []).map((item) => item.value));

      setSavedJobIds(ids);
    } catch (err) {
      console.error("Failed to fetch saved jobs", err);
    }
  };

  useEffect(() => {
    fetchJobs();
    fetchSavedJobs();
  }, [currentPage, filters]);

  const fetchApplicationCounts = async (jobsList) => {
    try {
      const requests = jobsList.map((job) =>
        getActiveJobApplications({
          jobId: job.id,
          status: "APPLIED",
          page: 1,
          limit: 1, // only need pagination.total
        }).then((res) => ({
          jobId: job.id,
          count: res?.data?.pagination?.total || 0,
        })),
      );

      const results = await Promise.all(requests);

      const countMap = {};
      results.forEach(({ jobId, count }) => {
        countMap[jobId] = count;
      });

      setApplicationCounts(countMap);
    } catch (error) {
      console.error("Error fetching application counts", error);
    }
  };

  const handleMenuClick = (job, event) => {
    event.stopPropagation();
    const rect = event.currentTarget.getBoundingClientRect();
    setMenuPosition({ x: rect.left - 120, y: rect.bottom + 5 });
    setShowMenu(showMenu === job.id ? null : job.id);
    setSelectedJob(job);
  };

  const handleSaveJob = async (job) => {
    const wasSaved = savedJobIds.has(job.id);

    setSavedJobIds((prev) => {
      const next = new Set(prev);

      if (wasSaved) {
        next.delete(job.id);
      } else {
        next.add(job.id);
      }

      return next;
    });

    try {
      const res = await saveQuery(job.id, "JOB");

      toast.success(
        res?.message ||
          (wasSaved ? "Removed from saved" : "Job saved successfully"),
      );
    } catch (err) {
      fetchSavedJobs();

      toast.error(err?.response?.data?.message || "Unable to update saved job");
    }
  };

  const handleUpdateSuccess = () => fetchJobs();

  const resetFilters = () => {
    setFilters({
      search: "",
      mode: "",
      city: "",
      employmentType: "",
      state: "",
      country: "",
      pincode: "",
      userId: "",
      is_active: "",
    });
  };

  return (
    <DashboardCard padding={false} className="flex flex-col flex-1 min-h-0 h-full overflow-hidden">
          {/* HEADER + FILTER SECTION */}
          <div className="py-3 sm:py-4 px-3 sm:px-4 border-b flex-shrink-0">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg sm:text-xl font-semibold text-blue-900">
                My Jobs <span className="text-blue-600">({totalJobs})</span>
              </h2>

              <div className="flex items-center gap-2">
                <div className="relative">
                  <input
                    placeholder="Search title / skill"
                    value={filters.search}
                    onChange={(e) => updateFilter("search", e.target.value)}
                    className="border p-2 pl-9 rounded w-64"
                  />
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>

                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-2 border rounded hover:bg-gray-50"
                >
                  <Filter size={18} />
                  Filters
                </button>

                <button
                  onClick={resetFilters}
                  className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* FILTER DROPDOWN */}
            {showFilters && (
              <div className="mt-3 p-4 bg-gray-50 rounded-lg border">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900">Filter Jobs</h3>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  <select
                    value={filters.mode}
                    onChange={(e) => updateFilter("mode", e.target.value)}
                    className="border p-2 rounded bg-white"
                  >
                    <option value="">Mode</option>
                    <option>REMOTE</option>
                    <option>HYBRID</option>
                    <option>ON_SITE</option>
                  </select>

                  <input
                    placeholder="City"
                    value={filters.city}
                    onChange={(e) => updateFilter("city", e.target.value)}
                    className="border p-2 rounded bg-white"
                  />

                  <select
                    value={filters.employmentType}
                    onChange={(e) =>
                      updateFilter("employmentType", e.target.value)
                    }
                    className="border p-2 rounded bg-white"
                  >
                    <option value="">Employment Type</option>
                    <option>FULL_TIME</option>
                    <option>PART_TIME</option>
                    <option>INTERNSHIP</option>
                  </select>

                  <input
                    placeholder="Pincode"
                    value={filters.pincode}
                    onChange={(e) => updateFilter("pincode", e.target.value)}
                    className="border p-2 rounded bg-white"
                  />

                  <select
                    value={filters.is_active}
                    onChange={(e) => updateFilter("is_active", e.target.value)}
                    className="border p-2 rounded bg-white"
                  >
                    <option value="">Status</option>
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* TABLE HEADER */}
          <div className="hidden sm:flex items-center justify-between px-4 py-3 bg-gray-50 text-xs font-medium text-gray-600 border-b flex-shrink-0">
            <div className="w-1/3 text-left">JOBS</div>
            <div className="w-1/5 text-left">STATUS</div>
            <div className="w-1/5 text-left">APPLICATIONS</div>
            <div className="w-1/5 text-left">ACTIONS</div>
          </div>

          {/* LIST */}
          {!loading && jobs.length > 0 && (
            <div className="flex-1 min-h-0 overflow-y-auto text-left custom-scrollbar">
              {jobs.map((job) => (
                <JobRow
                  key={job.id}
                  job={{
                    ...job,
                    isSaved: savedJobIds.has(job.id),
                  }}
                  isSelected={selectedJob?.id === job.id}
                  onMenuClick={handleMenuClick}
                  applicationCounts={applicationCounts}
                  onViewApplications={handleViewApplications}
                />
              ))}
            </div>
          )}

          {/* EMPTY */}
          {!loading && jobs.length === 0 && (
            <div className="flex-1 flex justify-center items-center text-gray-500">
              No jobs found.
            </div>
          )}
          {loading && (
            <div className="flex-1 flex justify-center items-center text-gray-500">
              Loading jobs...
            </div>
          )}

          {/* PAGINATION */}
          {!loading && totalJobs > 0 && (
            <div className="flex justify-center items-center gap-3 p-3 border-t bg-white flex-shrink-0">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100"
              >
                Prev
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 border rounded ${
                    currentPage === i + 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100"
              >
                Next
              </button>
            </div>
          )}

      {/* 🌟 MENU DROPDOWN */}
      {showMenu && selectedJob && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowMenu(null)}
          ></div>
          <div
            className="fixed z-20 bg-white rounded-lg shadow-lg border py-2 w-40"
            style={{ left: `${menuPosition.x}px`, top: `${menuPosition.y}px` }}
          >
            <button
              className={`w-full px-4 py-2 text-left text-sm flex items-center gap-2 transition ${
                selectedJob?.isSaved
                  ? "bg-indigo-50 text-indigo-700 font-medium"
                  : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
              }`}
              onClick={() => {
                handleSaveJob(selectedJob);
                setShowMenu(null);
              }}
            >
              <Bookmark
                size={16}
                fill={selectedJob?.isSaved ? "currentColor" : "none"}
              />

              {selectedJob?.isSaved ? "Saved" : "Save Job"}
            </button>
            <button
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-blue-600"
              onClick={() => {
                setSelectedJobDetails(selectedJob);
                setShowUpdateModal(true);
                setShowMenu(null);
              }}
            >
              🔄 Update Job
            </button>

            <button
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-red-600"
              onClick={() => {
                setSelectedJobForDelete(selectedJob);
                setShowDeleteModal(true);
                setShowMenu(null);
              }}
            >
              🗑 Delete Job
            </button>

            <button
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-gray-700"
              onClick={() => {
                setSelectedJobDetails(selectedJob);
                setShowDetailsModal(true);
                setShowMenu(null);
              }}
            >
              👁 View Details
            </button>
          </div>
        </>
      )}

      {/* MODALS */}
      {showDetailsModal && selectedJobDetails && (
        <JobDetailsModal
          job={selectedJobDetails}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedJobDetails(null);
          }}
        />
      )}

      {showUpdateModal && selectedJobDetails && (
        <UpdateJobModal
          job={selectedJobDetails}
          onClose={() => {
            setShowUpdateModal(false);
            setSelectedJobDetails(null);
          }}
          onSuccess={handleUpdateSuccess}
        />
      )}

      {showDeleteModal && selectedJobForDelete && (
        <DeleteJobModal
          job={selectedJobForDelete}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedJobForDelete(null);
          }}
          onSuccess={fetchJobs}
        />
      )}
    </DashboardCard>
  );
};

export default MyJobs;
