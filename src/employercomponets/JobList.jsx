import React, { useState } from "react";
import JobRow from "./JobRow";

import JobDetailsModal from "./JobDetailsModel";
import UpdateJobModal from "./UpadteJobsModal";
import DeleteJobModal from "./DeleteJobs";

const JobList = ({ jobs, loading }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedJobDetails, setSelectedJobDetails] = useState(null);
  const [selectedJobForDelete, setSelectedJobForDelete] = useState(null);

  // Dropdown
  const [showMenu, setShowMenu] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  console.log("seleted job details is", selectedJobDetails);
  // Modals
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Pagination
  const totalPages = Math.ceil(jobs.length / jobsPerPage);
  const indexOfLast = currentPage * jobsPerPage;
  const currentJobs = jobs.slice(indexOfLast - jobsPerPage, indexOfLast);

  // Dropdown click
  const handleMenuClick = (job, event) => {
    event.stopPropagation();
    const rect = event.currentTarget.getBoundingClientRect();

    setMenuPosition({
      x: rect.left - 120,
      y: rect.bottom + 5,
    });

    setSelectedJob(job);
    setShowMenu(showMenu === job.id ? null : job.id);
  };

  // Open modals
  const handleViewDetails = () => {
    setSelectedJobDetails(selectedJob);
    setShowDetailsModal(true);
    setShowMenu(null);
  };

  const handleUpdateJob = () => {
    setSelectedJobDetails(selectedJob);
    setShowUpdateModal(true);
    setShowMenu(null);
  };

  const handleDeleteJob = () => {
    setSelectedJobForDelete(selectedJob);
    setShowDeleteModal(true);
    setShowMenu(null);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-4">
        <p>Loading jobs...</p>
      </div>
    );
  }

  return (
    <div className="bg-white !pb-0 !pt-0 rounded-xl h-[65vh] flex flex-col">
      {/* Header */}
      <div className="px-4 pt-0 text-left py-4">
        <h3 className="font-bold text-xl text-gray-700">
          Recently Posted Jobs
        </h3>
      </div>

      {/* Table Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 text-sm font-medium text-gray-600 border-b">
        <div className="w-1/3 text-left">Jobs</div>
        <div className="w-1/5 text-left">Status</div>
        <div className="w-1/5 text-left">Applications</div>
        <div className="w-1/5 text-left">Actions</div>
      </div>

      {/* Rows */}
      <div className="flex-1 overflow-y-auto">
        {currentJobs.map((job) => (
          <JobRow
            key={job.id}
            job={job}
            isSelected={selectedJob?.id === job.id}
            onMenuClick={handleMenuClick}
            onViewDetails={() => {
              setSelectedJobDetails(job);
              setShowDetailsModal(true);
            }}
          />
        ))}
      </div>

      {/* Dropdown Menu */}
      {showMenu && (
        <>
          {/* Close on outside click */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowMenu(null)}
          ></div>

          <div
            className="fixed z-20 bg-white rounded-lg shadow-lg border py-2 w-40"
            style={{
              left: menuPosition.x,
              top: menuPosition.y,
            }}
          >
            <button
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-blue-600"
              onClick={handleUpdateJob}
            >
              🔄 Update Job
            </button>

            <button
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-red-600"
              onClick={handleDeleteJob}
            >
              🗑 Delete Job
            </button>

            <button
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-gray-700"
              onClick={handleViewDetails}
            >
              👁 View Details
            </button>
          </div>
        </>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center gap-3 p-3">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
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
              currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* ✔ Job Details Modal */}
      {showDetailsModal && selectedJobDetails && (
        <JobDetailsModal
          job={selectedJobDetails}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedJobDetails(null);
          }}
        />
      )}

      {/* ✔ Update Job Modal */}
      {showUpdateModal && selectedJobDetails && (
        <UpdateJobModal
          job={selectedJobDetails}
          onClose={() => {
            setShowUpdateModal(false);
            setSelectedJobDetails(null);
          }}
          onSuccess={() => {}}
        />
      )}

      {/* ✔ Delete Job Modal */}
      {showDeleteModal && selectedJobForDelete && (
        <DeleteJobModal
          job={selectedJobForDelete}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedJobForDelete(null);
          }}
          onSuccess={() => {}}
        />
      )}
    </div>
  );
};

export default JobList;
