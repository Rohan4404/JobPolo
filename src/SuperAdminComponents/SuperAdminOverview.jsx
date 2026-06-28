import React, { useState } from "react";
import {
  Users,
  Briefcase,
  FileText,
  TrendingUp,
  CheckCircle,
  XCircle,
  Clock,
  Building2,
  UserCheck,
  Activity,
  DollarSign,
  Target,
} from "lucide-react";

const SuperAdminOverview = () => {
  // Static data - will be replaced with API calls later
  const stats = {
    totalUsers: 15847,
    activeJobs: 342,
    totalApplications: 8934,
    companiesRegistered: 156,
    candidates: 12450,
    recruiters: 3397,
    jobsPostedToday: 23,
    applicationsToday: 156,
    revenue: "₹45,67,890",
    conversionRate: "18.5%",
  };

  const recentActivity = [
    {
      type: "job",
      company: "TechCorp Solutions",
      action: "Posted new job: Senior React Developer",
      time: "2 mins ago",
    },
    {
      type: "application",
      user: "Rahul Sharma",
      action: "Applied for Frontend Developer at Infosys",
      time: "5 mins ago",
    },
    {
      type: "user",
      user: "Priya Singh",
      action: "Registered as a new candidate",
      time: "12 mins ago",
    },
    {
      type: "company",
      company: "Wipro Technologies",
      action: "Updated company profile",
      time: "25 mins ago",
    },
    {
      type: "application",
      user: "Amit Kumar",
      action: "Applied for Backend Developer at TCS",
      time: "1 hour ago",
    },
  ];

  const topJobs = [
    {
      title: "Senior Full Stack Developer",
      company: "Infosys",
      applications: 234,
      status: "Active",
    },
    {
      title: "React Native Developer",
      company: "TCS",
      applications: 189,
      status: "Active",
    },
    {
      title: "Python Developer",
      company: "Wipro",
      applications: 167,
      status: "Active",
    },
    {
      title: "DevOps Engineer",
      company: "HCL Technologies",
      applications: 145,
      status: "Active",
    },
    {
      title: "UI/UX Designer",
      company: "Tech Mahindra",
      applications: 128,
      status: "Active",
    },
  ];

  const topCompanies = [
    { name: "Infosys", jobs: 45, applications: 1234 },
    { name: "TCS", jobs: 38, applications: 1089 },
    { name: "Wipro", jobs: 32, applications: 876 },
    { name: "HCL Technologies", jobs: 28, applications: 743 },
    { name: "Tech Mahindra", jobs: 25, applications: 654 },
  ];

  return (
    <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 mb-6 sm:mb-8">
          {/* Total Users */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Users</p>
                <h3 className="text-3xl font-bold text-blue-900 mt-2">
                  {stats.totalUsers.toLocaleString()}
                </h3>
                <p className="text-green-600 text-sm mt-2 flex items-center gap-1">
                  <TrendingUp size={16} />
                  +12.5% from last month
                </p>
              </div>
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="text-blue-600" size={28} />
              </div>
            </div>
          </div>

          {/* Active Jobs */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Active Jobs</p>
                <h3 className="text-3xl font-bold text-blue-900 mt-2">
                  {stats.activeJobs}
                </h3>
                <p className="text-blue-600 text-sm mt-2">
                  +{stats.jobsPostedToday} posted today
                </p>
              </div>
              <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center">
                <Briefcase className="text-indigo-600" size={28} />
              </div>
            </div>
          </div>

          {/* Total Applications */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Total Applications
                </p>
                <h3 className="text-3xl font-bold text-blue-900 mt-2">
                  {stats.totalApplications.toLocaleString()}
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

          {/* Companies Registered */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Companies</p>
                <h3 className="text-3xl font-bold text-blue-900 mt-2">
                  {stats.companiesRegistered}
                </h3>
                <p className="text-green-600 text-sm mt-2 flex items-center gap-1">
                  <TrendingUp size={16} />
                  +8.3% growth
                </p>
              </div>
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                <Building2 className="text-green-600" size={28} />
              </div>
            </div>
          </div>

          {/* Candidates */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Candidates</p>
                <h3 className="text-3xl font-bold text-blue-900 mt-2">
                  {stats.candidates.toLocaleString()}
                </h3>
                <p className="text-sm text-gray-500 mt-2">
                  78.6% of total users
                </p>
              </div>
              <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center">
                <UserCheck className="text-teal-600" size={28} />
              </div>
            </div>
          </div>

          {/* Recruiters */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Recruiters</p>
                <h3 className="text-3xl font-bold text-blue-900 mt-2">
                  {stats.recruiters.toLocaleString()}
                </h3>
                <p className="text-sm text-gray-500 mt-2">
                  21.4% of total users
                </p>
              </div>
              <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center">
                <Activity className="text-orange-600" size={28} />
              </div>
            </div>
          </div>

          {/* Revenue */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Total Revenue
                </p>
                <h3 className="text-3xl font-bold text-blue-900 mt-2">
                  {stats.revenue}
                </h3>
                <p className="text-green-600 text-sm mt-2 flex items-center gap-1">
                  <TrendingUp size={16} />
                  +15.2% this month
                </p>
              </div>
              <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center">
                <DollarSign className="text-yellow-600" size={28} />
              </div>
            </div>
          </div>

          {/* Conversion Rate */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Conversion Rate
                </p>
                <h3 className="text-3xl font-bold text-blue-900 mt-2">
                  {stats.conversionRate}
                </h3>
                <p className="text-green-600 text-sm mt-2">
                  Above industry avg
                </p>
              </div>
              <div className="w-14 h-14 bg-pink-100 rounded-full flex items-center justify-center">
                <Target className="text-pink-600" size={28} />
              </div>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 ">
          {/* RECENT ACTIVITY */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100 custom-scrollbar">
            <h3 className="text-xl font-bold text-blue-900 border-b-2 border-blue-500 pb-3 mb-4">
              Recent Activity
            </h3>
            <div className="space-y-4 max-h-96 custom-scrollbar">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      activity.type === "job"
                        ? "bg-blue-100"
                        : activity.type === "application"
                        ? "bg-purple-100"
                        : activity.type === "user"
                        ? "bg-green-100"
                        : "bg-orange-100"
                    }`}
                  >
                    {activity.type === "job" && (
                      <Briefcase className="text-blue-600" size={20} />
                    )}
                    {activity.type === "application" && (
                      <FileText className="text-purple-600" size={20} />
                    )}
                    {activity.type === "user" && (
                      <Users className="text-green-600" size={20} />
                    )}
                    {activity.type === "company" && (
                      <Building2 className="text-orange-600" size={20} />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 text-sm font-medium">
                      {activity.company || activity.user}
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

          {/* TOP JOBS */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
            <h3 className="text-xl font-bold text-blue-900 border-b-2 border-blue-500 pb-3 mb-4">
              Top Jobs by Applications
            </h3>
            <div className="space-y-3">
              {topJobs.map((job, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        {job.title}
                      </h4>
                      <p className="text-sm text-gray-600">{job.company}</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      {job.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FileText size={16} />
                    <span>{job.applications} applications</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TOP COMPANIES */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
          <h3 className="text-xl font-bold text-blue-900 border-b-2 border-blue-500 pb-3 mb-4">
            Top Companies
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-gray-700 font-semibold">
                    Rank
                  </th>
                  <th className="text-left py-3 px-4 text-gray-700 font-semibold">
                    Company Name
                  </th>
                  <th className="text-left py-3 px-4 text-gray-700 font-semibold">
                    Active Jobs
                  </th>
                  <th className="text-left py-3 px-4 text-gray-700 font-semibold">
                    Total Applications
                  </th>
                  <th className="text-left py-3 px-4 text-gray-700 font-semibold">
                    Avg per Job
                  </th>
                </tr>
              </thead>
              <tbody>
                {topCompanies.map((company, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-4">
                      <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm">
                        {index + 1}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-medium text-gray-800">
                      {company.name}
                    </td>
                    <td className="py-3 px-4 text-gray-600">{company.jobs}</td>
                    <td className="py-3 px-4 text-gray-600">
                      {company.applications.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {Math.round(company.applications / company.jobs)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    </>
  );
};

export default SuperAdminOverview;
