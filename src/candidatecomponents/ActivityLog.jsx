import React, { useEffect, useState } from "react";
import { Briefcase, User, FileText, Bell, Clock } from "lucide-react";

import {
  getAppliedJobs,
  getSavedQueries,
  getUserProfile,
} from "../api/service2";

/* ================= ICON MAPPER ================= */
const iconMap = {
  job: <Briefcase className="text-blue-600" />,
  profile: <User className="text-indigo-600" />,
  resume: <FileText className="text-green-600" />,
  alert: <Bell className="text-amber-600" />,
};

const ActivityLog = () => {
  const [activities, setActivities] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      const [appliedRes, savedRes, profileRes] = await Promise.all([
        getAppliedJobs(),
        getSavedQueries(),
        getUserProfile(),
      ]);

      /* 🔹 Applied Jobs */
      const applied =
        appliedRes?.data?.rows?.map((a) => ({
          id: a.applicationId,
          type: "job",
          title: `Applied for ${a.jobTitle}`,
          description: a.companyName,
          time: a.createdAt || a.appliedAt,
        })) || [];

      /* 🔹 Saved Jobs */
      const saved =
        savedRes?.data?.rows?.map((s) => ({
          id: s.jobId,
          type: "job",
          title: `Saved ${s.jobTitle}`,
          description: s.companyName,
          time: s.createdAt,
        })) || [];

      /* 🔹 Profile Update */
      const profileActivity = profileRes?.data?.filteredUser?.updatedAt
        ? [
            {
              id: "profile-update",
              type: "profile",
              title: "Profile Updated",
              description: "You updated your profile information",
              time: profileRes.data.filteredUser.updatedAt,
            },
          ]
        : [];

      const merged = [...applied, ...saved, ...profileActivity]
        .filter((a) => a.time)
        .sort((a, b) => new Date(b.time) - new Date(a.time));

      setActivities(merged);
    } catch (err) {
      console.error("Activity log error:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredActivities =
    filter === "all" ? activities : activities.filter((a) => a.type === filter);

  /* ================= GLOBAL LOADER ================= */
  if (loading) {
    return (
      <div className="section-loader">
        <div className="flex flex-col items-center">
          <div className="page-loader-spinner mb-3"></div>
          <p className="page-loader-text">Loading activity log...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 p-4 sm:p-6 text-left">
      {/* HEADER */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-blue-900 flex items-center gap-2">
            <Clock className="text-blue-700" />
            Activity Log
          </h1>
          <p className="text-blue-700 mt-1">
            Track everything you do on Job Polo
          </p>
        </div>

        {/* FILTER */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded-lg px-4 py-2 text-sm"
        >
          <option value="all">All Activities</option>
          <option value="job">Job Activities</option>
          <option value="profile">Profile</option>
          <option value="resume">Resume</option>
          <option value="alert">Alerts</option>
        </select>
      </div>

      {/* MAIN CARD */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100 h-[70vh] overflow-y-auto">
        {filteredActivities.length > 0 ? (
          <div className="space-y-4">
            {filteredActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex gap-4 items-start bg-gray-50 border border-blue-100 rounded-lg p-4 hover:shadow-md transition"
              >
                <div className="p-2 bg-white rounded-full shadow">
                  {iconMap[activity.type]}
                </div>

                <div className="flex-1">
                  <h4 className="font-semibold text-blue-900">
                    {activity.title}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {activity.description}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(activity.time).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="bg-gray-50 p-4 rounded-lg text-gray-700">
            No activity found
          </p>
        )}
      </div>
    </div>
  );
};

export default ActivityLog;
