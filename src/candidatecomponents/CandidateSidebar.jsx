import React from "react";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CandidateSidebar = ({ active, setActive, sidebarTabs, role }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    toast.info("You have been logged out successfully.");
    navigate("/");
  };

  return (
    <div className="flex flex-col h-full p-5 border-r">
      <div className="text-sm font-semibold text-gray-500 mb-6 border-b pb-2">
        Candidate Dashboard
      </div>

      <ul className="space-y-2 flex-1">
        {sidebarTabs.map((tab) => (
          <li
            key={tab}
            className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer text-sm font-medium transition-all ${
              active === tab
                ? "bg-blue-50 text-blue-600"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setActive(tab)}
          >
            {tab}
          </li>
        ))}
      </ul>

      <div className="pt-4 border-t px-4 pb-3">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-500 text-sm hover:text-red-600 transition"
        >
          <FiLogOut size={16} /> Log out
        </button>
      </div>
    </div>
  );
};

export default CandidateSidebar;
