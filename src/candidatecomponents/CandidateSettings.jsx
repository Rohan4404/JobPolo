import React, { useState } from "react";

const CandidateSettings = () => {
  const [emailAlerts, setEmailAlerts] = useState(true);

  return (
    <div className="p-6 bg-white rounded-lg shadow min-h-[70vh]">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Settings</h2>

      <div className="space-y-4">
        <div className="flex items-center justify-between border rounded-lg p-4">
          <div>
            <h4 className="font-medium">Email Job Alerts</h4>
            <p className="text-sm text-gray-500">Receive alerts in email</p>
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

        <div className="border rounded-lg p-4">
          <h4 className="font-medium mb-2">Privacy</h4>
          <p className="text-sm text-gray-500">Manage profile visibility and CV sharing options later.</p>
        </div>
      </div>
    </div>
  );
};

export default CandidateSettings;
