import React, { useState } from "react";
import {
  X,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  DollarSign,
  Clock,
  FileText,
  Award,
  ExternalLink,
  Download,
  CheckCircle,
} from "lucide-react";

export default function ProfileModal({ applicant, onClose }) {
  console.log("applicant data is", applicant);
  const [activeTab, setActiveTab] = useState("overview");

  if (!applicant) return null;

  const data = applicant; // ✅ FULL API OBJECT

  console.log("applivcanty is", data);

  const user = data.employee?.user || {};
  const employee = data.employee || {};
  const job = data.job || {};
  const answers = data.questionnaireAnswers ?? {
    skills: [],
    expectedCTC: "",
    noticePeriod: "",
    willingToRelocate: false,
  };

  console.log("answer is ", answers);

  const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim();

  const handleSendEmail = () => {
    if (!user.email) return;

    const subject = encodeURIComponent(
      `Regarding your application for ${job.title || "the position"}`,
    );

    const body = encodeURIComponent(
      `Hi ${user.firstName || ""},\n\nWe reviewed your application and would like to connect with you.\n\nBest regards,`,
    );

    window.location.href = `mailto:${user.email}?subject=${subject}&body=${body}`;
  };
  const downloadFile = (url, filename = "resume") => {
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const InfoCard = ({ icon, label, value, bgColor }) => (
    <div className={`${bgColor} rounded-xl p-4 border border-gray-200`}>
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <p className="text-sm font-medium text-gray-600">{label}</p>
      </div>
      <p className="font-bold text-gray-800 text-lg ml-8">{value}</p>
    </div>
  );

  const DetailRow = ({ label, value }) => (
    <div>
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className="font-semibold text-gray-800">{value}</p>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm text-start">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-hidden flex flex-col">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition text-white"
          >
            <X size={24} />
          </button>

          <div className="flex items-start gap-6">
            {/* Avatar */}
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white text-4xl font-bold shadow-xl border-4 border-white">
              {data.employee.user.firstName[0]}
              {data.employee.user.lastName[0]}
            </div>

            <div className="flex-1 text-white">
              <h2 className="text-3xl font-bold mb-2">{fullName}</h2>
              <p className="text-indigo-100 text-lg mb-3">
                {data.employee.functionArea} • {data.employee.industry}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium flex items-center gap-1">
                  <CheckCircle size={14} />
                  {data.status}
                </span>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                  {data.job.mode}
                </span>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                  {data.job.employmentType}
                </span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleSendEmail}
                  className="px-5 py-2 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition flex items-center gap-2"
                >
                  <Mail size={16} />
                  Send Email
                </button>

                <button
                  onClick={() => {
                    data.resumeUrls?.forEach((url, idx) => {
                      downloadFile(url, `Resume_${fullName}_${idx + 1}`);
                    });
                  }}
                  className="px-5 py-2 bg-white/10 backdrop-blur-sm text-white border border-white/30 rounded-lg font-semibold hover:bg-white/20 transition flex items-center gap-2"
                >
                  <Download size={16} />
                  Download Resume
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b bg-gray-50 px-8">
          <div className="flex gap-6">
            {["overview", "application", "documents"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-2 font-semibold capitalize transition relative ${
                  activeTab === tab
                    ? "text-indigo-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {activeTab === "overview" && (
            <div className="grid grid-cols-3 gap-6">
              {/* Left Column - Details */}
              <div className="col-span-2 space-y-6">
                {/* Contact Info Card */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-indigo-100">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Mail className="text-indigo-600" size={20} />
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                        <Mail className="text-indigo-600" size={18} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Email</p>
                        <p className="font-semibold text-gray-800">
                          {data.employee.user.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                        <Phone className="text-indigo-600" size={18} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Phone</p>
                        <p className="font-semibold text-gray-800">
                          {data.employee.user.countryCode}{" "}
                          {data.employee.user.mobileNumber}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Why I Fit This Role */}
                {data.howFitRole && data.howFitRole.trim() !== "" && (
                  <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                      <Award className="text-purple-600" size={20} />
                      Why I Fit This Role
                    </h3>

                    <div
                      className="text-gray-700 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: data.howFitRole }}
                    />
                  </div>
                )}
                {/* Skills */}
                {answers.skills &&
                  (typeof answers.skills === "string"
                    ? answers.skills.trim() !== ""
                    : answers.skills.length > 0) && (
                    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <Award className="text-green-600" size={20} />
                        Skills
                      </h3>

                      <div className="flex flex-wrap gap-2">
                        {typeof answers.skills === "string" ? (
                          <span className="px-4 py-2 bg-green-50 text-green-700 rounded-lg">
                            {answers.skills}
                          </span>
                        ) : (
                          answers.skills.map((skill, idx) => (
                            <span
                              key={idx}
                              className="px-4 py-2 bg-green-50 text-green-700 rounded-lg"
                            >
                              {skill}
                            </span>
                          ))
                        )}
                      </div>
                    </div>
                  )}
              </div>

              {/* Right Column - Quick Stats */}
              <div className="space-y-4">
                <InfoCard
                  icon={<Briefcase className="text-blue-600" size={20} />}
                  label="Applied For"
                  value={data.job.title}
                  bgColor="bg-blue-50"
                />
                <InfoCard
                  icon={<Calendar className="text-purple-600" size={20} />}
                  label="Applied On"
                  value={new Date(data.appliedAt).toLocaleDateString()}
                  bgColor="bg-purple-50"
                />
                {answers.expectedCTC && (
                  <InfoCard
                    icon={<DollarSign className="text-green-600" size={20} />}
                    label="Expected CTC"
                    value={answers.expectedCTC}
                    bgColor="bg-green-50"
                  />
                )}
                {answers.noticePeriod && (
                  <InfoCard
                    icon={<Clock className="text-orange-600" size={20} />}
                    label="Notice Period"
                    value={answers.noticePeriod}
                    bgColor="bg-orange-50"
                  />
                )}
                {answers.willingToRelocate !== undefined && (
                  <InfoCard
                    icon={<MapPin className="text-red-600" size={20} />}
                    label="Willing to Relocate"
                    value={answers.willingToRelocate ? "Yes" : "No"}
                    bgColor="bg-red-50"
                  />
                )}
              </div>
            </div>
          )}

          {activeTab === "application" && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Application Details
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <DetailRow label="Application ID" value={data.id} />
                  <DetailRow label="Status" value={data.status} />
                  <DetailRow label="Company" value={data.job.companyName} />
                  <DetailRow label="Category" value={data.job.category.name} />
                  <DetailRow
                    label="Employment Type"
                    value={data.job.employmentType}
                  />
                  <DetailRow label="Work Mode" value={data.job.mode} />
                  <DetailRow
                    label="Salary Range"
                    value={`₹${data.job.minSalary.toLocaleString()} - ₹${data.job.maxSalary.toLocaleString()} ${data.job.salaryType}`}
                  />
                  <DetailRow label="Gender" value={data.employee.gender} />
                </div>
              </div>
            </div>
          )}

          {activeTab === "documents" && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FileText className="text-indigo-600" size={24} />
                  Resume
                </h3>
                <div className="space-y-3">
                  {data.resumeUrls.slice(0, 3).map((url, idx) => (
                    <a
                      key={idx}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                          <FileText className="text-indigo-600" size={24} />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">
                            Resume_{idx + 1}.pdf
                          </p>
                          <p className="text-sm text-gray-500">Click to view</p>
                        </div>
                      </div>
                      <ExternalLink
                        className="text-gray-400 group-hover:text-indigo-600"
                        size={20}
                      />
                    </a>
                  ))}
                </div>
              </div>

              {data.workSampleUrls && data.workSampleUrls.length > 0 && (
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Award className="text-purple-600" size={24} />
                    Work Samples
                  </h3>
                  <div className="space-y-3">
                    {data.workSampleUrls.slice(0, 3).map((url, idx) => (
                      <a
                        key={idx}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Award className="text-purple-600" size={24} />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">
                              Work_Sample_{idx + 1}
                            </p>
                            <p className="text-sm text-gray-500">
                              Click to view
                            </p>
                          </div>
                        </div>
                        <ExternalLink
                          className="text-gray-400 group-hover:text-purple-600"
                          size={20}
                        />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// export default ProfileModal;
