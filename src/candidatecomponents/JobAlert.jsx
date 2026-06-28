import React, { useEffect, useState } from "react";
import { Bell, Trash2, Mail, Smartphone } from "lucide-react";
import { getJobs } from "../api/service2";
import { DashboardCard } from "../components/dashboard/DashboardUI";

const JobAlert = () => {
  const [alerts, setAlerts] = useState([]);
  const [enabled, setEnabled] = useState(true);

  const [filters, setFilters] = useState({
    role: "",
    location: "",
  });

  const [preferences, setPreferences] = useState({
    email: true,
    push: false,
  });

  const today = new Date().toISOString().split("T")[0];

  /* ================= FETCH JOB ALERTS ================= */
  useEffect(() => {
    if (!enabled) return;

    const loadAlerts = async () => {
      try {
        const res = await getJobs(1, 50);
        const jobs = res?.data || [];

        // Only NEW jobs posted TODAY
        const todayJobs = jobs.filter(
          (job) =>
            job.createdAt?.split("T")[0] === today &&
            (!filters.role ||
              job.title?.toLowerCase().includes(filters.role.toLowerCase())) &&
            (!filters.location ||
              job.location
                ?.toLowerCase()
                .includes(filters.location.toLowerCase()))
        );

        setAlerts(todayJobs);
      } catch (err) {
        console.error("Job alert fetch error:", err);
      }
    };

    loadAlerts();
  }, [enabled, filters]);

  /* ================= DELETE ALERT ================= */
  const deleteAlert = (id) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <>
      <div className="mb-4 flex justify-end flex-shrink-0">
        <button
          onClick={() => setEnabled(!enabled)}
          className={`px-4 py-2 rounded-lg text-sm font-semibold ${
            enabled
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-600"
          }`}
        >
          {enabled ? "Alerts ON" : "Alerts OFF"}
        </button>
      </div>

      <DashboardCard>

        {/* FILTERS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <input
            placeholder="Filter by Role"
            className="border rounded-lg p-3"
            value={filters.role}
            onChange={(e) =>
              setFilters({ ...filters, role: e.target.value })
            }
          />
          <input
            placeholder="Filter by Location"
            className="border rounded-lg p-3"
            value={filters.location}
            onChange={(e) =>
              setFilters({ ...filters, location: e.target.value })
            }
          />
        </div>

        {/* ALERT LIST */}
        {alerts.length > 0 ? (
          <div className="space-y-4">
            {alerts.map((job) => (
              <div
                key={job.id}
                className="bg-gray-50 border border-blue-100 rounded-lg p-4 flex justify-between items-start hover:shadow-md transition"
              >
                <div>
                  <h4 className="font-semibold text-blue-900">
                    {job.title}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {job.companyName} • {job.location}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Posted Today
                  </p>
                </div>

                <button
                  onClick={() => deleteAlert(job.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="bg-gray-50 p-4 rounded-lg text-gray-700">
            No new job alerts today
          </p>
        )}

        {/* NOTIFICATION PREFERENCES */}
        <div className="mt-8 border-t pt-6">
          <h3 className="font-bold text-blue-900 mb-3">
            Notification Preferences
          </h3>

          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={preferences.email}
                onChange={() =>
                  setPreferences({
                    ...preferences,
                    email: !preferences.email,
                  })
                }
              />
              <Mail size={16} /> Email Alerts
            </label>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={preferences.push}
                onChange={() =>
                  setPreferences({
                    ...preferences,
                    push: !preferences.push,
                  })
                }
              />
              <Smartphone size={16} /> Push Alerts
            </label>
          </div>
        </div>
      </DashboardCard>
    </>
  );
};

export default JobAlert;
