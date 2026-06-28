import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { CheckCircle, AlertCircle } from "lucide-react";
import { getUserProfile } from "../api/service2";

ChartJS.register(ArcElement, Tooltip, Legend);

const ProfileOverview = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [completion, setCompletion] = useState(0);
  const [missing, setMissing] = useState([]);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await getUserProfile();
      const user = res?.data?.filteredUser;
      setProfile(user);
      calculateCompletion(user);
    } catch (err) {
      console.error("Profile overview error", err);
    } finally {
      setLoading(false);
    }
  };

  const calculateCompletion = (user) => {
    let score = 0;
    let missingFields = [];

    const employee = user?.employee || {};
    const address = user?.address || {};

    /* BASIC INFO – 20% */
    if (user?.firstName && user?.email && user?.mobileNumber) {
      score += 20;
    } else {
      missingFields.push("Basic Information");
    }

    /* ADDRESS – 15% */
    if (address.city && address.state && address.country && address.pincode) {
      score += 15;
    } else {
      missingFields.push("Address Details");
    }

    /* ABOUT – 15% */
    if (employee.bio && employee.gender && employee.dob) {
      score += 15;
    } else {
      missingFields.push("About / Personal Info");
    }

    /* SKILLS – 15% */
    if (employee.skills?.length > 0) {
      score += 15;
    } else {
      missingFields.push("Skills");
    }

    /* EXPERIENCE – 15% */
    if (employee.experience && employee.currentCTC && employee.expectedCTC) {
      score += 15;
    } else {
      missingFields.push("Experience & CTC");
    }

    /* DOCUMENTS – 20% */
    if (
      employee.resumePreviewUrls?.length > 0 ||
      employee.workSamplePreviewUrls?.length > 0 ||
      employee.portfolioUrl
    ) {
      score += 20;
    } else {
      missingFields.push("Resume / Portfolio");
    }

    setCompletion(score);
    setMissing(missingFields);
  };

  if (loading) {
    return (
      <div className="section-loader">
        <div className="flex flex-col items-center">
          <div className="page-loader-spinner mb-3"></div>
          <p className="page-loader-text">Loading profile overview...</p>
        </div>
      </div>
    );
  }

  const pieData = {
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        data: [completion, 100 - completion],
        backgroundColor: ["#22c55e", "#e5e7eb"],
        borderWidth: 0,
      },
    ],
  };

  return (
  <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6 min-h-screen">

    {/* 🔷 HEADER */}
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900">
        Profile Overview
      </h1>
      <p className="text-gray-500 mt-1">
        Track your profile completion & improve visibility 🚀
      </p>
    </div>

    {/* 🔷 MAIN CARD */}
    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200 p-6 h-full">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* 🔹 LEFT — CHART */}
        <div className="flex flex-col items-center justify-center">

          {/* Chart Card */}
          <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl shadow-md border border-gray-200">
            <div className="w-[220px]">
              <Pie data={pieData} />
            </div>
          </div>

          {/* % TEXT */}
          <p className="mt-5 text-2xl font-bold text-green-600">
            {completion}% Complete
          </p>

          {/* PROGRESS BAR */}
          <div className="w-full mt-4">
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="h-3 bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${completion}%` }}
              />
            </div>
          </div>

        </div>

        {/* 🔹 RIGHT — CHECKLIST */}
        <div>

          <h3 className="text-xl font-semibold text-gray-900 mb-5">
            Profile Checklist
          </h3>

          <div className="space-y-3">

            {[
              "Basic Information",
              "Address Details",
              "About / Personal Info",
              "Skills",
              "Experience & CTC",
              "Resume / Portfolio",
            ].map((item) => {
              const isMissing = missing.includes(item);

              return (
                <div
                  key={item}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                    isMissing
                      ? "bg-amber-50 border border-amber-200"
                      : "bg-green-50 border border-green-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {isMissing ? (
                      <AlertCircle className="text-amber-500" size={18} />
                    ) : (
                      <CheckCircle className="text-green-600" size={18} />
                    )}
                    <span className="text-sm font-medium text-gray-700">
                      {item}
                    </span>
                  </div>

                  {/* STATUS TAG */}
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      isMissing
                        ? "bg-amber-100 text-amber-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {isMissing ? "Pending" : "Done"}
                  </span>
                </div>
              );
            })}

          </div>

          {/* FOOTER NOTE */}
          {missing.length > 0 && (
            <div className="mt-6 p-4 rounded-xl bg-blue-50 border border-blue-200">
              <p className="text-sm text-blue-700">
                Complete missing sections to improve your job visibility and get hired faster 🚀
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  </div>
);
};

export default ProfileOverview;
