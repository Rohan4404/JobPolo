import React from "react";
import {
  X,
  Users,
  Building2,
  MapPin,
  Calendar,
  Mail,
  Globe,
  Award,
  Briefcase,
} from "lucide-react";

const EmployerDetailsModalAllInfo = ({ employer, onClose }) => {
  if (!employer) return null;

  const fullName = `${employer.firstName} ${employer.lastName}`;
  const role = employer.role;

  const isEmployer = role === "EMPLOYER";
  const isEmployee = role === "EMPLOYEE";
  const isSuperAdmin = role === "SUPER_ADMIN";

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 overflow-y-auto text-left">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-7xl max-h-[95vh] overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8 relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-white text-blue-600 rounded-xl text-3xl font-bold flex items-center justify-center shadow-lg border-4 border-white">
                  {employer.firstName.charAt(0)}
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-white">{fullName}</h2>

                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    <span className="flex items-center gap-2 text-white/90">
                      <Mail className="w-4 h-4" />
                      {employer.email}
                    </span>

                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                        employer.is_active
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-white"></span>
                      {employer.is_active ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-180px)] px-6 py-6 space-y-8">
              {/* PERSONAL INFO */}
              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  Personal Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-xs text-gray-500">Full Name</p>
                    <p className="font-semibold text-gray-900">{fullName}</p>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg">
                    <p className="text-xs text-gray-500">Mobile Number</p>
                    <p className="font-semibold text-gray-900">
                      {employer.countryCode} {employer.mobileNumber}
                    </p>
                  </div>

                  <div className="p-4 bg-amber-50 rounded-lg">
                    <p className="text-xs text-gray-500">Role</p>
                    <p className="font-semibold text-gray-900">{role}</p>
                  </div>
                </div>
              </section>

              {/* EMPLOYER INFO */}
              {isEmployer && (
                <section>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-indigo-600" />
                    Employer / Company Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-indigo-50 rounded-lg">
                      <p className="text-xs text-gray-500">Company Name</p>
                      <p className="font-semibold text-gray-900">
                        {employer.employer?.companyName || "N/A"}
                      </p>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg">
                      <p className="text-xs text-gray-500">Industry</p>
                      <p className="font-semibold text-gray-900">
                        {employer.employer?.industry || "N/A"}
                      </p>
                    </div>

                    <div className="p-4 bg-red-50 rounded-lg">
                      <p className="text-xs text-gray-500">Function Area</p>
                      <p className="font-semibold text-gray-900">
                        {employer.employer?.functionArea || "N/A"}
                      </p>
                    </div>

                    {employer.employer?.linkedinUrl && (
                      <div className="p-4 bg-yellow-50 rounded-lg">
                        <p className="text-xs text-gray-500">LinkedIn</p>
                        <a
                          href={employer.employer.linkedinUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 font-semibold underline"
                        >
                          {employer.employer.linkedinUrl}
                        </a>
                      </div>
                    )}
                  </div>
                </section>
              )}

              {/* EMPLOYEE INFO */}
              {isEmployee && (
                <section>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-indigo-600" />
                    Employee Information
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-indigo-50 rounded-lg">
                      <p className="text-xs text-gray-500">Industry</p>
                      <p className="font-semibold text-gray-900">
                        {employer.employee?.industry || "N/A"}
                      </p>
                    </div>

                    <div className="p-4 bg-purple-50 rounded-lg">
                      <p className="text-xs text-gray-500">Function Area</p>
                      <p className="font-semibold text-gray-900">
                        {employer.employee?.functionArea || "N/A"}
                      </p>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg">
                      <p className="text-xs text-gray-500">Experience</p>
                      <p className="font-semibold text-gray-900">
                        {employer.employee?.experience
                          ? `${employer.employee.experience} Years`
                          : "N/A"}
                      </p>
                    </div>

                    <div className="p-4 bg-orange-50 rounded-lg">
                      <p className="text-xs text-gray-500">Skills</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {(employer.employee?.skills || []).map((skill, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* ADDRESS INFO */}
              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-red-600" />
                  Address Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-xs text-gray-500">City</p>
                    <p className="font-semibold text-gray-900">
                      {employer.address?.city}
                    </p>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg">
                    <p className="text-xs text-gray-500">State</p>
                    <p className="font-semibold text-gray-900">
                      {employer.address?.state}
                    </p>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-xs text-gray-500">Country</p>
                    <p className="font-semibold text-gray-900">
                      {employer.address?.country}
                    </p>
                  </div>

                  <div className="p-4 bg-amber-50 rounded-lg">
                    <p className="text-xs text-gray-500">Pincode</p>
                    <p className="font-semibold text-gray-900">
                      {employer.address?.pincode}
                    </p>
                  </div>
                </div>
              </section>

              {/* ACCOUNT INFO */}
              <section>
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-indigo-600" />
                  Account Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Created At</p>
                    <p className="font-semibold">
                      {new Date(employer.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">Updated By</p>
                    <p className="font-semibold">
                      {employer.updatedBy || "N/A"}
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployerDetailsModalAllInfo;

// import React from "react";
// import {
//   X,
//   Users,
//   Building2,
//   MapPin,
//   Calendar,
//   Mail,
//   Globe,
//   Award,
//   CheckCircle2,
// } from "lucide-react";

// const EmployerDetailsModalAllInfo = ({ employer, onClose }) => {
//   if (!employer) return null;

//   const fullName = `${employer.firstName} ${employer.lastName}`;

//   return (
//     <>
//       {/* Overlay */}
//       <div
//         className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
//         onClick={onClose}
//       />

//       {/* Modal */}
//       <div className="fixed inset-0 z-50 overflow-y-auto text-left">
//         <div className="flex min-h-full items-center justify-center p-4">
//           <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-7xl max-h-[95vh] overflow-hidden">
//             {/* Header */}
//             <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8 relative">
//               <button
//                 onClick={onClose}
//                 className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
//               >
//                 <X className="w-6 h-6 text-white" />
//               </button>

//               <div className="flex items-center gap-4">
//                 <div className="w-20 h-20 bg-white text-blue-600 rounded-xl text-3xl font-bold flex items-center justify-center shadow-lg border-4 border-white">
//                   {employer.firstName.charAt(0)}
//                 </div>

//                 <div>
//                   <h2 className="text-3xl font-bold text-white">{fullName}</h2>

//                   <div className="flex flex-wrap items-center gap-3 mt-2">
//                     <span className="flex items-center gap-2 text-white/90">
//                       <Mail className="w-4 h-4" />
//                       {employer.email}
//                     </span>

//                     <span
//                       className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
//                         employer.is_active
//                           ? "bg-green-500 text-white"
//                           : "bg-red-500 text-white"
//                       }`}
//                     >
//                       <span className="w-2 h-2 rounded-full bg-white"></span>
//                       {employer.is_active ? "Active" : "Inactive"}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Content */}
//             <div className="overflow-y-auto max-h-[calc(90vh-180px)] px-6 py-6 space-y-8">
//               {/* Personal Info */}
//               <section>
//                 <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
//                   <Users className="w-5 h-5 text-blue-600" />
//                   Personal Information
//                 </h3>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="p-4 bg-blue-50 rounded-lg">
//                     <p className="text-xs text-gray-500">Full Name</p>
//                     <p className="font-semibold text-gray-900">{fullName}</p>
//                   </div>

//                   <div className="p-4 bg-purple-50 rounded-lg">
//                     <p className="text-xs text-gray-500">Mobile Number</p>
//                     <p className="font-semibold text-gray-900">
//                       +91 {employer.mobileNumber}
//                     </p>
//                   </div>

//                   <div className="p-4 bg-amber-50 rounded-lg">
//                     <p className="text-xs text-gray-500">Role</p>
//                     <p className="font-semibold text-gray-900">
//                       {employer.role}
//                     </p>
//                   </div>
//                 </div>
//               </section>

//               {/* Company Info */}
//               <section>
//                 <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
//                   <Building2 className="w-5 h-5 text-indigo-600" />
//                   Company Information
//                 </h3>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="p-4 bg-indigo-50 rounded-lg">
//                     <p className="text-xs text-gray-500">Company Name</p>
//                     <p className="font-semibold text-gray-900">
//                       {employer.employer?.companyName || "N/A"}
//                     </p>
//                   </div>

//                   <div className="p-4 bg-green-50 rounded-lg">
//                     <p className="text-xs text-gray-500">Industry</p>
//                     <p className="font-semibold text-gray-900">
//                       {employer.employer?.industry}
//                     </p>
//                   </div>

//                   <div className="p-4 bg-red-50 rounded-lg">
//                     <p className="text-xs text-gray-500">Function Area</p>
//                     <p className="font-semibold text-gray-900">
//                       {employer.employer?.functionArea}
//                     </p>
//                   </div>

//                   {employer.employer?.companySize && (
//                     <div className="p-4 bg-pink-50 rounded-lg">
//                       <p className="text-xs text-gray-500">Company Size</p>
//                       <p className="font-semibold text-gray-900">
//                         {employer.employer.companySize}
//                       </p>
//                     </div>
//                   )}

//                   {employer.employer?.establishedYear && (
//                     <div className="p-4 bg-yellow-50 rounded-lg">
//                       <p className="text-xs text-gray-500">Established</p>
//                       <p className="font-semibold text-gray-900">
//                         {employer.employer.establishedYear}
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </section>

//               {/* Address Info */}
//               <section>
//                 <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
//                   <MapPin className="w-5 h-5 text-red-600" />
//                   Address Information
//                 </h3>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="p-4 bg-blue-50 rounded-lg">
//                     <p className="text-xs text-gray-500">City</p>
//                     <p className="font-semibold text-gray-900">
//                       {employer.address?.city || "N/A"}
//                     </p>
//                   </div>

//                   <div className="p-4 bg-purple-50 rounded-lg">
//                     <p className="text-xs text-gray-500">State</p>
//                     <p className="font-semibold text-gray-900">
//                       {employer.address?.state || "N/A"}
//                     </p>
//                   </div>

//                   <div className="p-4 bg-green-50 rounded-lg">
//                     <p className="text-xs text-gray-500">Country</p>
//                     <p className="font-semibold text-gray-900">
//                       {employer.address?.country || "N/A"}
//                     </p>
//                   </div>

//                   <div className="p-4 bg-amber-50 rounded-lg">
//                     <p className="text-xs text-gray-500">Pincode</p>
//                     <p className="font-semibold text-gray-900">
//                       {employer.address?.pincode || "N/A"}
//                     </p>
//                   </div>
//                 </div>
//               </section>

//               {/* Account Info */}
//               <section>
//                 <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
//                   <Calendar className="w-5 h-5 text-indigo-600" />
//                   Account Information
//                 </h3>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="p-4 bg-gray-50 rounded-lg">
//                     <p className="text-xs text-gray-500">Created At</p>
//                     <p className="font-semibold">
//                       {new Date(employer.createdAt).toLocaleString()}
//                     </p>
//                   </div>

//                   <div className="p-4 bg-gray-50 rounded-lg">
//                     <p className="text-xs text-gray-500">Status</p>
//                     <span
//                       className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
//                         employer.is_active
//                           ? "bg-green-500 text-white"
//                           : "bg-red-500 text-white"
//                       }`}
//                     >
//                       <span className="w-2 h-2 rounded-full bg-white"></span>
//                       {employer.is_active ? "Active" : "Inactive"}
//                     </span>
//                   </div>
//                 </div>
//               </section>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default EmployerDetailsModalAllInfo;
