import React, { useState } from "react";
import { DashboardCard } from "../components/dashboard/DashboardUI";

const CandidateSettings = () => {
  const [emailAlerts, setEmailAlerts] = useState(true);

  return (
    <DashboardCard className="space-y-4">
      <div className="flex items-center justify-between border border-blue-100 rounded-xl p-4">
        <div>
          <h4 className="font-medium text-blue-900">Email Job Alerts</h4>
          <p className="text-sm text-blue-600">Receive alerts in email</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only"
            checked={emailAlerts}
            onChange={() => setEmailAlerts((s) => !s)}
          />
          <div
            className={`w-12 h-6 rounded-full transition-colors ${
              emailAlerts ? "bg-blue-600" : "bg-gray-300"
            }`}
          />
        </label>
      </div>

      <div className="border border-blue-100 rounded-xl p-4">
        <h4 className="font-medium text-blue-900 mb-2">Privacy</h4>
        <p className="text-sm text-blue-600">
          Manage profile visibility and CV sharing options later.
        </p>
      </div>
    </DashboardCard>
  );
};

export default CandidateSettings;
