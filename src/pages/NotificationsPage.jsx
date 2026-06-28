import React from "react";
import EmployerHeader from "../employercomponets/EmployerHeader";
import EmployerFooter from "../employercomponets/EmployerFooter";
import {
  Bell,
  CheckCircle,
  Briefcase,
  Info,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotificationsPage = () => {
  const navigate = useNavigate();

  const notifications = [
    {
      id: 1,
      title: "Profile Completed",
      message: "Your profile is now 100% complete 🎉",
      time: "2 minutes ago",
      type: "success",
    },
    {
      id: 2,
      title: "New Job Match",
      message: "New jobs matching your profile are available 💼",
      time: "10 minutes ago",
      type: "job",
    },
    {
      id: 3,
      title: "Reminder",
      message: "Update your resume to get better matches",
      time: "1 hour ago",
      type: "info",
    },
  ];

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle className="text-green-500" />;
      case "job":
        return <Briefcase className="text-blue-500" />;
      default:
        return <Info className="text-gray-500" />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">

      {/* HEADER */}
      <EmployerHeader />

      {/* MAIN */}
      <div className="flex-1 p-6 max-w-5xl mx-auto w-full">

        {/* 🔥 TOP HEADER (PREMIUM) */}
        <div className="mb-6 flex items-center justify-between">

          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              <Bell className="text-blue-600" />
              Notifications
            </h1>
            <p className="text-gray-500 mt-1">
              Stay updated with your activity 🚀
            </p>
          </div>

          {/* CLOSE BUTTON */}
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full bg-white shadow hover:bg-gray-100 transition"
            title="Back"
          >
            <X size={20} />
          </button>
        </div>

        {/* 🔥 MAIN CARD */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-100 overflow-hidden">

          {/* TOP BAR */}
          <div className="flex justify-between items-center px-6 py-4 border-b bg-white/60 backdrop-blur sticky top-0 z-10">
            <span className="font-semibold text-gray-700">
              Recent Notifications
            </span>

            <button className="text-sm text-blue-600 hover:underline">
              Mark all as read
            </button>
          </div>

          {/* LIST */}
          <div className="divide-y">

            {notifications.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-4 p-5 hover:bg-blue-50 transition-all cursor-pointer group"
              >
                {/* ICON */}
                <div className="mt-1">{getIcon(item.type)}</div>

                {/* CONTENT */}
                <div className="flex-1">
                  <p className="text-gray-800 font-semibold group-hover:text-blue-600 transition">
                    {item.title}
                  </p>
                  <p className="text-gray-600 text-sm mt-1">
                    {item.message}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    {item.time}
                  </p>
                </div>

                {/* BADGE */}
                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                  New
                </span>
              </div>
            ))}

          </div>

          {/* EMPTY STATE */}
          {notifications.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Bell size={40} className="mx-auto mb-3 opacity-30" />
              No notifications yet
            </div>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <EmployerFooter />
    </div>
  );
};

export default NotificationsPage;