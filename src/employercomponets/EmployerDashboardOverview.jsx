import React from "react";
import {
  Briefcase,
  FileText,
  TrendingUp,
  CheckCircle,
  Clock,
  Users,
  Activity,
  Target,
} from "lucide-react";

const EmployerDashboardOverview = () => {
  // Employer-specific stats
  const stats = {
    totalJobs: 12,
    activeJobs: 8,
    totalApplications: 342,
    shortlisted: 56,
    interviews: 23,
    hires: 5,
    applicationsToday: 18,
    jobsPostedToday: 2,
    conversionRate: "16.4%",
  };

  const recentActivity = [
    {
      type: "application",
      user: "Rahul Sharma",
      action: "Applied for Frontend Developer",
      time: "2 mins ago",
    },
    {
      type: "application",
      user: "Priya Singh",
      action: "Shortlisted for React Developer",
      time: "10 mins ago",
    },
    {
      type: "application",
      user: "Amit Kumar",
      action: "Interview scheduled for Backend Developer",
      time: "30 mins ago",
    },
  ];

  const myJobs = [
    {
      title: "Frontend Developer",
      applications: 120,
      status: "Active",
    },
    {
      title: "Backend Developer",
      applications: 95,
      status: "Active",
    },
    {
      title: "UI/UX Designer",
      applications: 60,
      status: "Closed",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 p-4 sm:p-6 lg:p-4 text-start">
      {/* HEADER */}
      <div className="mb-8 text-start">
        <h1 className="text-4xl font-bold text-blue-900">Employer Dashboard</h1>
        <p className="text-blue-700 mt-2">Overview of your jobs & candidates</p>
      </div>

      <div className="h-[70vh] custom-scrollbar">
        {/* STATS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Jobs */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Jobs</p>
                <h3 className="text-3xl font-bold text-blue-900 mt-2">
                  {stats.totalJobs}
                </h3>
                <p className="text-blue-600 text-sm mt-2">
                  {stats.activeJobs} active
                </p>
              </div>
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                <Briefcase className="text-blue-600" size={28} />
              </div>
            </div>
          </div>

          {/* Applications */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Applications
                </p>
                <h3 className="text-3xl font-bold text-blue-900 mt-2">
                  {stats.totalApplications}
                </h3>
                <p className="text-purple-600 text-sm mt-2">
                  +{stats.applicationsToday} today
                </p>
              </div>
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center">
                <FileText className="text-purple-600" size={28} />
              </div>
            </div>
          </div>

          {/* Shortlisted */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Shortlisted</p>
                <h3 className="text-3xl font-bold text-green-600 mt-2">
                  {stats.shortlisted}
                </h3>
                <p className="text-green-600 text-sm mt-2 flex items-center gap-1">
                  <TrendingUp size={16} />
                  +8% improvement
                </p>
              </div>
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="text-green-600" size={28} />
              </div>
            </div>
          </div>

          {/* Interviews */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Interviews</p>
                <h3 className="text-3xl font-bold text-orange-600 mt-2">
                  {stats.interviews}
                </h3>
                <p className="text-orange-600 text-sm mt-2">
                  Scheduled this week
                </p>
              </div>
              <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center">
                <Activity className="text-orange-600" size={28} />
              </div>
            </div>
          </div>

          {/* Hires */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Hires</p>
                <h3 className="text-3xl font-bold text-blue-900 mt-2">
                  {stats.hires}
                </h3>
                <p className="text-sm text-gray-500 mt-2">
                  Successful placements
                </p>
              </div>
              <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center">
                <Users className="text-teal-600" size={28} />
              </div>
            </div>
          </div>

          {/* Conversion */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Conversion Rate
                </p>
                <h3 className="text-3xl font-bold text-blue-900 mt-2">
                  {stats.conversionRate}
                </h3>
                <p className="text-green-600 text-sm mt-2">Hiring efficiency</p>
              </div>
              <div className="w-14 h-14 bg-pink-100 rounded-full flex items-center justify-center">
                <Target className="text-pink-600" size={28} />
              </div>
            </div>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* RECENT ACTIVITY */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
            <h3 className="text-xl font-bold text-blue-900 border-b-2 border-blue-500 pb-3 mb-4">
              Recent Activity
            </h3>

            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <FileText className="text-purple-600" size={20} />
                  </div>

                  <div className="flex-1">
                    <p className="text-gray-800 text-sm font-medium">
                      {activity.user}
                    </p>
                    <p className="text-gray-600 text-sm">{activity.action}</p>
                    <p className="text-gray-400 text-xs mt-1 flex items-center gap-1">
                      <Clock size={12} />
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* MY JOBS */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
            <h3 className="text-xl font-bold text-blue-900 border-b-2 border-blue-500 pb-3 mb-4">
              My Job Listings
            </h3>

            <div className="space-y-3">
              {myJobs.map((job, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        {job.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {job.applications} applications
                      </p>
                    </div>

                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      {job.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboardOverview;
