import React, { useEffect } from "react";
import {
  X,
  MapPin,
  Briefcase,
  Clock,
  DollarSign,
  Users,
  Calendar,
  Building2,
  Mail,
  Globe,
  Award,
  CheckCircle2,
  TrendingUp,
  Shield,
  Zap,
  Target,
  Sun,
  Moon,
  Sunset,
  CloudMoon,
} from "lucide-react";

const JobDetailsModal = ({ job, onClose }) => {
  if (!job) return null;

  const [categoryName, setCategoryName] = React.useState("");
  const [categoryImage, setCategoryImage] = React.useState("");

  React.useEffect(() => {
    // Set category data from the job object
    if (job?.category) {
      setCategoryName(job.category.name);
      setCategoryImage(
        job.category.categoryPreviewUrls || job.category.categoryUrls,
      );
    }
  }, [job]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // console.log("jobs data is", job);

  const getShiftIcon = (shift) => {
    switch (shift) {
      case "MORNING":
        return <Sun className="w-4 h-4" />;
      case "AFTERNOON":
        return <Sunset className="w-4 h-4" />;
      case "EVENING":
        return <Moon className="w-4 h-4" />;
      case "NIGHT":
        return <CloudMoon className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const formatSalary = () => {
    if (job.salaryType === "YEARLY") {
      return `₹${job.minSalary} - ₹${job.maxSalary} LPA`;
    } else {
      return `₹${job.minSalary} - ₹${job.maxSalary} per month`;
    }
  };

  const formatExperience = () => {
    if (job.minExperience === 0 && job.maxExperience === 0) {
      return "Fresher";
    } else if (job.minExperience === job.maxExperience) {
      return `${job.minExperience} year${job.minExperience > 1 ? "s" : ""}`;
    } else {
      return `${job.minExperience} - ${job.maxExperience} years`;
    }
  };

  const hasValue = (val) => {
    if (Array.isArray(val)) return val.length > 0;
    if (typeof val === "string") return val.trim() !== "";
    return val !== null && val !== undefined;
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity text-left"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-7xl max-h-[97vh] overflow-hidden">
            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              <div className="flex items-start gap-6">
                {job.logoPreviewUrl || job.logoUrl ? (
                  <img
                    src={job.logoPreviewUrl || job.logoUrl}
                    alt={job.companyName}
                    className="w-24 h-24 rounded-xl object-cover border-4 border-white shadow-lg bg-white text-left"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-xl bg-white flex items-start justify-start text-blue-600 text-3xl font-bold shadow-lg">
                    {job.title?.charAt(0).toUpperCase()}
                  </div>
                )}

                <div className="flex-1 text-left">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {job.title}
                  </h2>
                  <div className="flex flex-wrap gap-3 items-center">
                    <span className="flex items-center gap-2 text-white/90 text-lg">
                      <Building2 className="w-5 h-5" />
                      {job.companyName}
                    </span>
                    <span
                      className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium ${
                        job.is_active
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                      {job.is_active ? "Active Hiring" : "Closed"}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-white/80 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>Posted on {formatDate(job.createdAt)}</span>
                    <span className="mx-2">•</span>
                    <span>by {job.createdBy}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(95vh-200px)] px-8 py-6 text-left">
              {/* Key Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-auto-fit gap-4 mb-8">
                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Briefcase className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Type</p>
                    <p className="font-semibold text-gray-900">
                      {job.employmentType?.replace(/_/g, "-")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl border border-green-100">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <MapPin className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Mode</p>
                    <p className="font-semibold text-gray-900">
                      {job.mode?.replace(/_/g, "-")}
                    </p>
                  </div>
                </div>
                {hasValue(job.minExperience) && hasValue(job.maxExperience) && (
                  <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl border border-purple-100">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Clock className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">
                        Experience
                      </p>
                      <p className="font-semibold text-gray-900">
                        {formatExperience()}
                      </p>
                    </div>
                  </div>
                )}

                {hasValue(job.minSalary) && hasValue(job.maxSalary) && (
                  <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-xl border border-amber-100">
                    <div className="p-2 bg-amber-100 rounded-lg">
                      <DollarSign className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">
                        Salary
                      </p>
                      <p className="font-semibold text-gray-900 text-sm">
                        {formatSalary()}
                      </p>
                    </div>
                  </div>
                )}

                {hasValue(job.openings) && (
                  <div className="flex items-center gap-3 p-4 bg-pink-50 rounded-xl border border-pink-100">
                    <div className="p-2 bg-pink-100 rounded-lg">
                      <Users className="w-5 h-5 text-pink-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">
                        Openings
                      </p>
                      <p className="font-semibold text-gray-900">
                        {job.openings} Position{job.openings > 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                )}
                {job.deadline && (
                  <div className="flex items-center gap-3 p-4 bg-red-50 rounded-xl border border-red-100">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <Calendar className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">
                        Deadline
                      </p>
                      <p className="font-semibold text-gray-900 text-xs">
                        {formatDate(job.deadline)}
                      </p>
                    </div>
                  </div>
                )}

                {categoryName && (
                  <div className="flex items-center gap-3 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <Award className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">
                        Category
                      </p>
                      <p className="font-semibold text-gray-900 text-sm">
                        {categoryName}
                      </p>
                    </div>
                  </div>
                )}

                {job.education && (
                  <div className="flex items-center gap-3 p-4 bg-teal-50 rounded-xl border border-teal-100">
                    <div className="p-2 bg-teal-100 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">
                        Education
                      </p>
                      <p className="font-semibold text-gray-900 text-sm">
                        {job.education}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Shift Types */}
              {job.shiftType && job.shiftType.length > 0 && (
                <div className="mb-6 bg-gradient-to-r from-slate-50 to-gray-50 p-5 rounded-xl border border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    Available Shifts
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {job.shiftType.map((shift, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-blue-200 text-blue-700 rounded-lg text-sm font-medium shadow-sm"
                      >
                        {getShiftIcon(shift)}
                        {shift}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              {job.description && (
                <div className="mb-6 text-left">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <div className="w-1 h-6 bg-blue-600 rounded"></div>
                    Job Description
                  </h3>
                  <div className="text-gray-700 leading-relaxed bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-100">
                    {job.description}
                  </div>
                </div>
              )}

              {/* Requirements */}
              {job.requirements && (
                <div className="mb-6 text-left">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <div className="w-1 h-6 bg-green-600 rounded"></div>
                    Requirements
                  </h3>
                  <div className="text-gray-700 leading-relaxed bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-xl border border-green-100">
                    {job.requirements}
                  </div>
                </div>
              )}

              {/* Responsibilities */}
              {job.responsibilities && (
                <div className="mb-6 text-left">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <div className="w-1 h-6 bg-purple-600 rounded"></div>
                    Responsibilities
                  </h3>
                  <div className="text-gray-700 leading-relaxed bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-xl border border-purple-100">
                    {job.responsibilities}
                  </div>
                </div>
              )}

              {/* Skills Required */}
              {job.skillsRequired && job.skillsRequired.length > 0 && (
                <div className="mb-6 text-left">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-amber-600" />
                    Skills Required
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {job.skillsRequired.map((skill, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full text-sm font-medium shadow-md hover:shadow-lg transition"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Category Section with Image */}
              {(categoryName || categoryImage) && (
                <div className="mb-6 bg-gradient-to-r from-indigo-50 to-purple-50 p-5 rounded-xl border border-indigo-200 text-left">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-indigo-600" />
                    Job Category
                  </h3>
                  <div className="flex items-center gap-4">
                    {categoryImage && (
                      <img
                        src={categoryImage}
                        alt={categoryName}
                        className="w-20 h-20 rounded-lg object-cover border-2 border-indigo-300 shadow-md"
                      />
                    )}
                    <div>
                      <p className="text-xl font-bold text-gray-900">
                        {categoryName}
                      </p>
                      {job.category?.description && (
                        <p className="text-sm text-gray-600 mt-1">
                          {job.category.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Location */}
              {job.jobPostAddresses && job.jobPostAddresses.length > 0 && (
                <div className="mb-6 text-left">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-red-600" />
                    Job Location{job.jobPostAddresses.length > 1 ? "s" : ""}
                  </h3>
                  <div className="space-y-3">
                    {job.jobPostAddresses.map((address, index) => (
                      <div
                        key={address.id}
                        className="bg-gradient-to-r from-red-50 to-orange-50 p-5 rounded-xl border-l-4 border-red-500 shadow-sm"
                      >
                        <p className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-red-600" />
                          Location {index + 1}
                        </p>
                        <div className="text-gray-700 space-y-1 ml-6">
                          {(address.building ||
                            address.floor ||
                            address.apartment) && (
                            <p>
                              {address.building && `${address.building}`}
                              {address.floor && `, Floor ${address.floor}`}
                              {address.apartment && `, ${address.apartment}`}
                            </p>
                          )}
                          {address.landmark && <p>Near {address.landmark}</p>}
                          <p className="font-medium">
                            {address.city}, {address.state} - {address.pincode}
                          </p>
                          <p>{address.country}</p>
                          {address.additionalInfo && (
                            <p className="text-gray-600 text-sm italic mt-2 bg-white/60 p-2 rounded">
                              ℹ️ {address.additionalInfo}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Super Admin Info */}
              {job.superAdmin && (
                <div className="mb-6 bg-gradient-to-br from-yellow-50 to-amber-50 p-5 rounded-xl border border-yellow-200 text-left">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-amber-600" />
                    Posted By
                  </h3>
                  <div className="space-y-2 text-gray-700">
                    <p>
                      <span className="font-semibold">Name:</span>{" "}
                      {job.superAdmin.user?.firstName}{" "}
                      {job.superAdmin.user?.lastName}
                    </p>
                    <p>
                      <span className="font-semibold">Email:</span>{" "}
                      {job.superAdmin.user?.email}
                    </p>
                    <p>
                      <span className="font-semibold">Role:</span>{" "}
                      <span className="px-3 py-1 bg-amber-200 text-amber-800 rounded-full text-sm font-medium">
                        {job.superAdmin.user?.role}
                      </span>
                    </p>
                    {job.superAdmin.linkedinUrl && (
                      <p className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-blue-600" />
                        <a
                          href={job.superAdmin.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          LinkedIn Profile
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Company Details from Employer */}
              {job.employer && (
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-indigo-600" />
                    Company Details
                  </h3>
                  <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-5 rounded-xl space-y-2 border border-indigo-200">
                    <p className="text-gray-700">
                      <span className="font-semibold">Company:</span>{" "}
                      {job.employer.companyName}
                    </p>
                    {job.employer.industry && (
                      <p className="text-gray-700">
                        <span className="font-semibold">Industry:</span>{" "}
                        {job.employer.industry}
                      </p>
                    )}
                    {job.employer.functionArea && (
                      <p className="text-gray-700">
                        <span className="font-semibold">Function Area:</span>{" "}
                        {job.employer.functionArea}
                      </p>
                    )}
                    {job.employer.companySize && (
                      <p className="text-gray-700">
                        <span className="font-semibold">Company Size:</span>{" "}
                        {job.employer.companySize}
                      </p>
                    )}
                    {job.employer.establishedYear && (
                      <p className="text-gray-700">
                        <span className="font-semibold">Established:</span>{" "}
                        {job.employer.establishedYear}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {job.questionnaire && (
                <div className="mb-6 bg-gradient-to-br from-blue-50 to-cyan-50 p-5 rounded-xl border border-blue-200 text-left">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-blue-600" />
                    Candidate Questionnaire
                  </h3>

                  <div className="space-y-3 text-gray-700">
                    {/* Date of Birth */}
                    {job.questionnaire.dob && (
                      <div>
                        <p className="font-semibold text-gray-900">
                          Date of Birth
                        </p>
                        {/* <p className="text-sm">
                          {new Date(job.questionnaire.dob).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </p> */}
                      </div>
                    )}

                    {/* Notice Period */}
                    {job.questionnaire.noticePeriod && (
                      <div>
                        <p className="font-semibold text-gray-900">
                          Notice Period
                        </p>
                        {/* <p className="text-sm">
                          {job.questionnaire.noticePeriod}
                        </p> */}
                      </div>
                    )}

                    {/* Expected CTC */}
                    {job.questionnaire.expectedCTC &&
                      job.questionnaire.expectedCTC !== "" && (
                        <div>
                          <p className="font-semibold text-gray-900">
                            Expected CTC
                          </p>
                          {/* <p className="text-sm">
                            ₹ {job.questionnaire.expectedCTC}
                          </p> */}
                        </div>
                      )}

                    {/* Skills */}
                    {job.questionnaire.skills &&
                      job.questionnaire.skills.length > 0 && (
                        <div>
                          <p className="font-semibold text-gray-900 mb-2">
                            Skills
                          </p>
                          {/* <div className="flex flex-wrap gap-2">
                            {job.questionnaire.skills.map((skill, index) => (
                              <span
                                key={index}
                                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 
                           text-white rounded-full text-sm font-medium shadow-md"
                              >
                                {skill}
                              </span>
                            ))}
                          </div> */}
                        </div>
                      )}
                  </div>
                </div>
              )}

              {/* Contact Information */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-5 rounded-xl border-2 border-blue-300 shadow-md">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-blue-600" />
                  Contact Information
                </h3>

                <div className="space-y-2">
                  {job.companyEmail && (
                    <p className="flex items-center gap-2 text-gray-700">
                      <Mail className="w-4 h-4 text-blue-600" />
                      <a
                        href={`mailto:${job.companyEmail}`}
                        className="hover:text-blue-600 underline font-medium"
                      >
                        {job.companyEmail}
                      </a>
                    </p>
                  )}
                  {job.employer?.website && (
                    <p className="flex items-center gap-2 text-gray-700">
                      <Globe className="w-4 h-4 text-blue-600" />
                      <a
                        href={job.employer.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-600 underline font-medium"
                      >
                        {job.employer.website}
                      </a>
                    </p>
                  )}
                  {job.employer?.linkedinUrl && (
                    <p className="flex items-center gap-2 text-gray-700">
                      <Globe className="w-4 h-4 text-blue-600" />
                      <a
                        href={job.employer.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-600 underline font-medium"
                      >
                        Company LinkedIn
                      </a>
                    </p>
                  )}
                </div>
              </div>

              {/* Questionnaire Section */}

              {/* Footer Info */}
              <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                <p className="text-sm text-gray-500">
                  Last updated on {formatDate(job.updatedAt)}
                  {job.updatedBy && ` by ${job.updatedBy}`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobDetailsModal;
