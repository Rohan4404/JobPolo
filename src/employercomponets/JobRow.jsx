import React from "react";
import { Users, MoreVertical } from "react-feather";

const JobRow = ({ job, isSelected, onMenuClick, onViewDetails }) => (
  <div
    className={`flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 py-4 border-b hover:bg-gray-50 ${
      isSelected ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
    }`}
  >
    {/* Job Info */}
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

    {/* Status */}
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

    {/* Applications */}
    <div className="sm:w-1/5 text-left mb-2 sm:mb-0">
      <span className="inline-flex items-center gap-1 text-xs sm:text-sm text-gray-600">
        <Users size={16} />
        {job.applications || 0} Applications
      </span>
    </div>

    {/* Actions */}
    <div className="sm:w-1/5 flex items-center gap-2 justify-start">
      <button
        onClick={() => onViewDetails(job)}
        className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-blue-600 hover:bg-blue-50 rounded whitespace-nowrap"
      >
        View Applications
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

export default JobRow;
