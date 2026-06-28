import React, { useState, useEffect } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaUserShield,
  FaIdCard,
  FaBuilding,
  FaGlobe,
  FaLink,
  FaLocationArrow,
  FaUser,
  FaCalendar,
  FaIndustry,
  FaDollarSign,
  FaUsers,
} from "react-icons/fa";
import { getUserProfile } from "../api/service2";
import { DashboardLoader } from "../components/dashboard/DashboardUI";

const EmployerProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const safe = (v) => (v ? v : "N/A");

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await getUserProfile();

        console.log("get profile data is", res);
        setProfile(res.data.filteredUser);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <DashboardLoader message="Loading profile..." />;

  if (!profile) {
    return (
      <p className="text-blue-700 text-center py-10">
        No employer profile data found
      </p>
    );
  }

  const emp = profile.employer || {};
  const address = profile.address || {};

  return (
    <>
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6 text-left">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-full flex items-center justify-center text-blue-600 text-3xl sm:text-4xl font-bold shadow-xl flex-shrink-0">
              {safe(emp.companyName).charAt(0)}
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">
                {profile.firstName} {profile.lastName}
              </h2>
              <p className="text-blue-100 text-base sm:text-lg mb-2">
                {safe(emp.companyName)}
              </p>
              <span
                className={`inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold ${
                  profile.is_active
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                {profile.is_active ? "Active Account" : "Inactive Account"}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 text-left pb-4">
          {/* LEFT COLUMN - Personal Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 pb-3 border-b-2 border-blue-500">
                <FaUser className="text-blue-600" />
                Personal Information
              </h2>
              <div className="space-y-4">
                <InfoRow
                  icon={<FaEnvelope />}
                  label="Email"
                  value={profile.email}
                />
                <InfoRow
                  icon={<FaPhone />}
                  label="Phone"
                  value={`${profile.countryCode} ${profile.mobileNumber}`}
                />
                <InfoRow
                  icon={<FaPhone />}
                  label="Alt Phone"
                  value={safe(profile.alternativeMobileNumber)}
                />
                <InfoRow
                  icon={<FaUserShield />}
                  label="Role"
                  value={profile.role}
                />
                <InfoRow
                  icon={<FaIdCard />}
                  label="Auth Provider"
                  value={profile.authProvider}
                />
              </div>
            </div>

            {/* Account Details */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 pb-3 border-b-2 border-blue-500">
                <FaCalendar className="text-blue-600" />
                Account Details
              </h2>
              <div className="space-y-4">
                <InfoRow
                  icon={<FaCalendar />}
                  label="Created At"
                  value={new Date(profile.createdAt).toLocaleDateString(
                    "en-US"
                  )}
                />
                <InfoRow
                  icon={<FaCalendar />}
                  label="Updated At"
                  value={new Date(profile.updatedAt).toLocaleDateString(
                    "en-US"
                  )}
                />
                <InfoRow
                  icon={<FaUser />}
                  label="Created By"
                  value={safe(profile.createdBy)}
                />
                <InfoRow
                  icon={<FaUser />}
                  label="Updated By"
                  value={safe(profile.updatedBy)}
                />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-2 space-y-6">
            {/* Company Information */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 pb-3 border-b-2 border-blue-500">
                <FaBuilding className="text-blue-600" />
                Company Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                <InfoRow
                  icon={<FaBuilding />}
                  label="Company Name"
                  value={safe(emp.companyName)}
                />
                <InfoRow
                  icon={<FaIndustry />}
                  label="Industry"
                  value={safe(emp.industry)}
                />
                <InfoRow
                  icon={<FaBuilding />}
                  label="Function Area"
                  value={safe(emp.functionArea)}
                />
                <InfoRow
                  icon={<FaCalendar />}
                  label="Established Year"
                  value={safe(emp.establishedYear)}
                />
                <InfoRow
                  icon={<FaUsers />}
                  label="Company Size"
                  value={safe(emp.companySize)}
                />
                <InfoRow
                  icon={<FaDollarSign />}
                  label="Annual Revenue"
                  value={safe(emp.annualRevenue)}
                />
                <InfoRow
                  icon={<FaGlobe />}
                  label="Website"
                  value={safe(emp.website)}
                  isLink
                />
                <InfoRow
                  icon={<FaLink />}
                  label="LinkedIn"
                  value={safe(emp.linkedinUrl)}
                  isLink
                />
              </div>

              {emp.aboutOrganzation && emp.aboutOrganzation !== "N/A" && (
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <p className="text-sm font-semibold text-blue-600 mb-2">
                    About Organization
                  </p>
                  <p className="text-gray-700">{emp.aboutOrganzation}</p>
                </div>
              )}
            </div>

            {/* Address Information */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 pb-3 border-b-2 border-blue-500">
                <FaMapMarkerAlt className="text-blue-600" />
                Address Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                <InfoRow
                  label="Building"
                  icon={<FaBuilding />}
                  value={safe(address.building)}
                />
                <InfoRow
                  label="Floor"
                  icon={<FaBuilding />}
                  value={safe(address.floor)}
                />
                <InfoRow
                  label="Apartment"
                  icon={<FaBuilding />}
                  value={safe(address.apartment)}
                />
                <InfoRow
                  label="Landmark"
                  icon={<FaMapMarkerAlt />}
                  value={safe(address.landmark)}
                />
                <InfoRow
                  label="City"
                  icon={<FaMapMarkerAlt />}
                  value={safe(address.city)}
                />
                <InfoRow
                  label="State"
                  icon={<FaMapMarkerAlt />}
                  value={safe(address.state)}
                />
                <InfoRow
                  label="Country"
                  icon={<FaMapMarkerAlt />}
                  value={safe(address.country)}
                />
                <InfoRow
                  label="Pincode"
                  icon={<FaMapMarkerAlt />}
                  value={safe(address.pincode)}
                />
                <InfoRow
                  label="Latitude"
                  icon={<FaLocationArrow />}
                  value={safe(address.latitude)}
                />
                <InfoRow
                  label="Longitude"
                  icon={<FaLocationArrow />}
                  value={safe(address.longitude)}
                />
              </div>

              {address.additionalInfo && (
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <p className="text-sm font-semibold text-blue-600 mb-2">
                    Additional Info
                  </p>
                  <p className="text-gray-700">{address.additionalInfo}</p>
                </div>
              )}
            </div>
          </div>
        </div>
    </>
  );
};

const InfoRow = ({ icon, label, value, isLink }) => (
  <div className="flex items-start gap-3">
    <div className="text-blue-600 mt-1 text-lg">{icon}</div>
    <div className="flex-1">
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
        {label}
      </p>
      {isLink && value !== "N/A" ? (
        <a
          href={value.startsWith("http") ? value : `https://${value}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 hover:underline break-all"
        >
          {value}
        </a>
      ) : (
        <p className="text-gray-800 font-medium break-words">{value}</p>
      )}
    </div>
  </div>
);

export default EmployerProfile;

// import React, { useState, useEffect } from "react";
// import {
//   MapPin,
//   Mail,
//   Phone,
//   Globe,
//   Users,
//   Briefcase,
//   Calendar,
//   Building2,
//   Edit,
//   Share2,
//   Facebook,
//   Twitter,
//   Linkedin,
//   Instagram,
//   Youtube,
//   ChevronRight,
//   CheckCircle2,
//   Clock,
//   DollarSign,
//   Star,
// } from "lucide-react";
// import { getUserProfile, getJobs } from "../api/service2";

// const EmployerProfile = () => {
//   const [activeTab, setActiveTab] = useState("about");
//   const [profile, setProfile] = useState(null);
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const profileRes = await getUserProfile();
//         setProfile(profileRes.data.filteredUser);

//         const jobsRes = await getJobs(1, 100);
//         setJobs(jobsRes.data.jobs || []);
//       } catch (err) {
//         console.error("Error loading data", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadData();
//   }, []);

//   if (loading) return <div className="text-center py-10">Loading...</div>;
//   if (!profile)
//     return <div className="text-center py-10">Profile not found.</div>;

//   const emp = profile.employer || {};
//   const address = profile.address || {};
//   const safe = (v) => (v ? v : "N/A");

//   return (
//     <div className="bg-gray-50 py-4">
//       <div className="w-full h-[80.5vh] overflow-y-auto mx-auto px-4 sm:px-6 lg:px-4">
//         {/* Profile Card */}
//         <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8 mb-6">
//           <div className="flex flex-col sm:flex-row gap-6">
//             {/* Logo */}
//             <div className="flex-shrink-0 mx-auto sm:mx-0">
//               {emp.organizationLogoPreviewUrl ? (
//                 <img
//                   src={emp.organizationLogoPreviewUrl}
//                   alt="Logo"
//                   className="w-32 h-32 rounded-lg object-cover border shadow"
//                 />
//               ) : (
//                 <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-4xl font-bold shadow-lg">
//                   {safe(emp.companyName).charAt(0)}
//                 </div>
//               )}
//             </div>

//             {/* Info */}
//             <div className="flex-1 text-left">
//               <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
//                 <div>
//                   <h1 className="text-3xl font-bold text-gray-900">
//                     {safe(emp.companyName)}
//                   </h1>
//                   <p className="text-gray-600 mb-1">
//                     {safe(emp.aboutOrganzation)}
//                   </p>

//                   <div className="flex items-center gap-2 text-sm text-gray-500">
//                     <MapPin className="w-4 h-4" />
//                     {safe(address.city)}, {safe(address.state)},{" "}
//                     {safe(address.country)}
//                   </div>
//                 </div>
//               </div>

//               {/* Stats */}
//               <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
//                 <div className="text-center p-3 bg-blue-50 rounded-lg">
//                   <div className="text-2xl font-bold text-blue-600">
//                     {jobs.length}
//                   </div>
//                   <div className="text-xs text-gray-600">Posted Jobs</div>
//                 </div>

//                 <div className="text-center p-3 bg-green-50 rounded-lg">
//                   <div className="text-2xl font-bold text-green-600">
//                     {safe(emp.companySize)}
//                   </div>
//                   <div className="text-xs text-gray-600">Company Size</div>
//                 </div>

//                 <div className="text-center p-3 bg-purple-50 rounded-lg">
//                   <div className="text-2xl font-bold text-purple-600">
//                     {safe(emp.establishedYear)}
//                   </div>
//                   <div className="text-xs text-gray-600">Founded</div>
//                 </div>

//                 <div className="text-center p-3 bg-orange-50 rounded-lg">
//                   <div className="text-2xl font-bold text-orange-600">
//                     {safe(emp.annualRevenue)}
//                   </div>
//                   <div className="text-xs text-gray-600">Revenue</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Main */}
//           <div className="lg:col-span-2 space-y-6">
//             <div className="bg-white rounded-lg shadow">
//               <div className="border-b overflow-x-auto">
//                 <div className="flex min-w-max">
//                   {["about", "jobs"].map((tab) => (
//                     <button
//                       key={tab}
//                       onClick={() => setActiveTab(tab)}
//                       className={`px-6 py-4 text-sm font-medium capitalize ${
//                         activeTab === tab
//                           ? "text-blue-600 border-b-2 border-blue-600"
//                           : "text-gray-600 hover:text-gray-900"
//                       }`}
//                     >
//                       {tab}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* SCROLL ADDED HERE */}
//               <div className="p-6 max-h-[55vh] overflow-y-auto custom-scrollbar">
//                 {/* ABOUT */}
//                 {activeTab === "about" && (
//                   <>
//                     <h3 className="text-lg font-bold text-gray-900 mb-3">
//                       About Company
//                     </h3>
//                     <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded text-left">
//                       {safe(emp.aboutOrganzation)}
//                     </p>
//                   </>
//                 )}

//                 {/* JOBS */}
//                 {activeTab === "jobs" && (
//                   <>
//                     <div className="flex items-center justify-between mb-4">
//                       <h3 className="text-lg font-bold text-gray-900">
//                         Posted Jobs ({jobs.length})
//                       </h3>
//                     </div>

//                     {jobs.length === 0 && (
//                       <div className="text-center py-12">
//                         <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-3" />
//                         <p className="text-gray-600">No jobs posted yet.</p>
//                       </div>
//                     )}

//                     <div className="space-y-4">
//                       {jobs.map((job) => (
//                         <div
//                           key={job.id}
//                           className="border border-gray-200 rounded-xl p-5 hover:border-blue-400 hover:shadow-lg transition-all duration-200 bg-white text-left group"
//                         >
//                           <div className="flex justify-between items-start mb-3">
//                             <div className="flex-1">
//                               <h4 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
//                                 {job.title}
//                               </h4>
//                               <p className="text-sm text-gray-600 mt-1">
//                                 {safe(emp.companyName)}
//                               </p>
//                             </div>
//                             <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
//                               Active
//                             </span>
//                           </div>

//                           <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
//                             <div className="flex items-center gap-1.5">
//                               <Briefcase className="w-4 h-4 text-blue-500" />
//                               <span>{safe(job.employmentType)}</span>
//                             </div>

//                             <div className="flex items-center gap-1.5">
//                               <MapPin className="w-4 h-4 text-red-500" />
//                               <span>
//                                 {job.jobPostAddresses?.[0]?.city || "N/A"}
//                               </span>
//                             </div>

//                             <div className="flex items-center gap-1.5">
//                               <DollarSign className="w-4 h-4 text-green-500" />
//                               <span>{safe(job.salaryRange)}</span>
//                             </div>
//                           </div>

//                           {/* <div className="flex items-center justify-between pt-3 border-t border-gray-100">
//                             <div className="flex items-center gap-1.5 text-sm text-gray-500">
//                               <Clock className="w-4 h-4" />
//                               <span>
//                                 Posted{" "}
//                                 {new Date(job.createdAt).toLocaleDateString()}
//                               </span>
//                             </div>
//                             <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
//                               View Details
//                               <ChevronRight className="w-4 h-4" />
//                             </button>
//                           </div> */}
//                         </div>
//                       ))}
//                     </div>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Sidebar */}
//           <div className="space-y-6 text-left">
//             <div className="bg-white rounded-lg shadow p-6">
//               <h3 className="text-lg font-bold text-gray-900 mb-4">
//                 Company Details
//               </h3>

//               <div className="space-y-4 text-sm">
//                 <p>
//                   <strong>Industry:</strong> {safe(emp.industry)}
//                 </p>
//                 <p>
//                   <strong>Function Area:</strong> {safe(emp.functionArea)}
//                 </p>
//                 <p>
//                   <strong>Founded:</strong> {safe(emp.establishedYear)}
//                 </p>
//               </div>
//             </div>

//             <div className="bg-white rounded-lg shadow p-6">
//               <h3 className="text-lg font-bold text-gray-900 mb-4">Contact</h3>

//               <p>
//                 <strong>Website:</strong> {safe(emp.website)}
//               </p>
//               <p>
//                 <strong>Email:</strong> {safe(profile.email)}
//               </p>
//               <p>
//                 <strong>Phone:</strong> {safe(profile.mobileNumber)}
//               </p>
//             </div>

//             {/* SOCIAL MEDIA */}
//             <div className="bg-white rounded-lg shadow p-4 sm:p-6 text-left">
//               <h3 className="text-lg font-bold text-gray-900 mb-4">
//                 Follow Us
//               </h3>
//               <div className="flex gap-2 flex-wrap">
//                 <button className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700">
//                   <Facebook size={18} />
//                 </button>
//                 <button className="p-2 bg-blue-400 text-white rounded hover:bg-blue-500">
//                   <Twitter size={18} />
//                 </button>
//                 <button className="p-2 bg-blue-700 text-white rounded hover:bg-blue-800">
//                   <Linkedin size={18} />
//                 </button>
//                 <button className="p-2 bg-pink-600 text-white rounded hover:bg-pink-700">
//                   <Instagram size={18} />
//                 </button>
//                 <button className="p-2 bg-red-600 text-white rounded hover:bg-red-700">
//                   <Youtube size={18} />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmployerProfile;

// import React, { useState } from "react";
// import {
//   MapPin,
//   Mail,
//   Phone,
//   Globe,
//   Users,
//   Briefcase,
//   Calendar,
//   Building2,
//   Edit,
//   Share2,
//   Facebook,
//   Twitter,
//   Linkedin,
//   Instagram,
//   Youtube,
//   ChevronRight,
//   CheckCircle2,
//   Clock,
//   DollarSign,
//   Star,
// } from "lucide-react";

// import { getUserProfile, getJobs } from "../api/service2";

// const EmployerProfile = () => {
//   const [activeTab, setActiveTab] = useState("about");

//   const companyInfo = {
//     name: "TechVision Solutions Inc.",
//     logo: "TV",
//     tagline: "Innovating the Future of Technology",
//     industry: "Information Technology",
//     companySize: "500-1000 employees",
//     founded: "2015",
//     location: "San Francisco, CA",
//     website: "www.techvisionsolutions.com",
//     email: "careers@techvisionsolutions.com",
//     phone: "+1-415-555-0199",
//     rating: 4.5,
//     reviews: 127,
//     description: `TechVision Solutions is a leading technology company specializing in cloud computing, artificial intelligence, and enterprise software solutions. We're committed to creating innovative products that transform how businesses operate in the digital age.

// Our mission is to empower organizations with cutting-edge technology solutions that drive growth, efficiency, and innovation. We believe in fostering a culture of creativity, collaboration, and continuous learning.

// With offices across North America and Europe, we serve clients ranging from startups to Fortune 500 companies, delivering customized solutions that meet their unique needs.`,
//     benefits: [
//       "Competitive salary and equity packages",
//       "Comprehensive health, dental, and vision insurance",
//       "401(k) matching up to 6%",
//       "Unlimited PTO and flexible work arrangements",
//       "Professional development budget",
//       "Parental leave and family support",
//       "Free meals and snacks",
//       "Gym membership and wellness programs",
//       "Regular team building events",
//       "Latest technology and equipment",
//     ],
//     culture: [
//       "Innovation-driven environment",
//       "Diverse and inclusive workplace",
//       "Work-life balance priority",
//       "Collaborative team structure",
//       "Open communication culture",
//       "Career growth opportunities",
//     ],
//     stats: {
//       openPositions: 24,
//       totalEmployees: 750,
//       officeLocations: 8,
//       clientsServed: 1200,
//     },
//   };

//   const openJobs = [
//     {
//       id: 1,
//       title: "Senior Full Stack Developer",
//       department: "Engineering",
//       type: "Full-time",
//       location: "San Francisco, CA",
//       salary: "$120k - $160k",
//       posted: "2 days ago",
//     },
//     {
//       id: 2,
//       title: "Product Manager",
//       department: "Product",
//       type: "Full-time",
//       location: "Remote",
//       salary: "$130k - $170k",
//       posted: "5 days ago",
//     },
//     {
//       id: 3,
//       title: "UX/UI Designer",
//       department: "Design",
//       type: "Full-time",
//       location: "New York, NY",
//       salary: "$90k - $120k",
//       posted: "1 week ago",
//     },
//     {
//       id: 4,
//       title: "DevOps Engineer",
//       department: "Engineering",
//       type: "Full-time",
//       location: "Austin, TX",
//       salary: "$110k - $145k",
//       posted: "1 week ago",
//     },
//     {
//       id: 5,
//       title: "Marketing Manager",
//       department: "Marketing",
//       type: "Full-time",
//       location: "San Francisco, CA",
//       salary: "$95k - $125k",
//       posted: "2 weeks ago",
//     },
//     {
//       id: 6,
//       title: "Data Scientist",
//       department: "Data",
//       type: "Full-time",
//       location: "Remote",
//       salary: "$125k - $165k",
//       posted: "3 days ago",
//     },
//   ];

//   const gallery = [
//     { id: 1, type: "office", title: "Modern Office Space" },
//     { id: 2, type: "team", title: "Team Collaboration" },
//     { id: 3, type: "event", title: "Company Event" },
//     { id: 4, type: "workspace", title: "Creative Workspace" },
//     { id: 5, type: "meeting", title: "Meeting Room" },
//     { id: 6, type: "outdoor", title: "Outdoor Area" },
//   ];

//   return (
//     <div className="bg-gray-50 py-4">
//       {/* Removed fixed height (h-[75vh]) to allow natural content flow */}
//       {/* Removed header banner and negative margins to prevent overlap */}

//       {/* Main Content */}
//       <div className="w-full h-[80.5vh] overflow-y-auto mx-auto px-4 sm:px-6 lg:px-4">
//         {/* Profile Card */}
//         <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8 mb-6">
//           <div className="flex flex-col sm:flex-row gap-6">
//             {/* Logo */}
//             <div className="flex-shrink-0 mx-auto sm:mx-0">
//               <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-3xl sm:text-4xl font-bold shadow-lg">
//                 {companyInfo.logo}
//               </div>
//             </div>

//             {/* Company Info */}
//             <div className="flex-1 text-center sm:text-left">
//               <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
//                 <div>
//                   <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
//                     {companyInfo.name}
//                   </h1>
//                   <p className="text-gray-600 mb-2">{companyInfo.tagline}</p>
//                   <div className="flex items-center justify-center sm:justify-start gap-2 text-sm text-gray-500">
//                     <div className="flex items-center gap-1">
//                       <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//                       <span className="font-semibold">
//                         {companyInfo.rating}
//                       </span>
//                     </div>
//                     <span>•</span>
//                     <span>{companyInfo.reviews} reviews</span>
//                     <span>•</span>
//                     <span className="flex items-center gap-1">
//                       <MapPin className="w-4 h-4" />
//                       {companyInfo.location}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="flex gap-2 justify-center sm:justify-start">
//                   <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2">
//                     <Share2 size={16} />
//                     <span className="hidden sm:inline">Share</span>
//                   </button>
//                   <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2">
//                     <Edit size={16} />
//                     <span className="hidden sm:inline">Edit Profile</span>
//                   </button>
//                 </div>
//               </div>

//               {/* Quick Stats */}
//               <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
//                 <div className="text-center p-3 bg-blue-50 rounded-lg">
//                   <div className="text-2xl font-bold text-blue-600">
//                     {companyInfo.stats.openPositions}
//                   </div>
//                   <div className="text-xs text-gray-600">Open Positions</div>
//                 </div>
//                 <div className="text-center p-3 bg-green-50 rounded-lg">
//                   <div className="text-2xl font-bold text-green-600">
//                     {companyInfo.stats.totalEmployees}
//                   </div>
//                   <div className="text-xs text-gray-600">Employees</div>
//                 </div>
//                 <div className="text-center p-3 bg-purple-50 rounded-lg">
//                   <div className="text-2xl font-bold text-purple-600">
//                     {companyInfo.stats.officeLocations}
//                   </div>
//                   <div className="text-xs text-gray-600">Locations</div>
//                 </div>
//                 <div className="text-center p-3 bg-orange-50 rounded-lg">
//                   <div className="text-2xl font-bold text-orange-600">
//                     {companyInfo.stats.clientsServed}+
//                   </div>
//                   <div className="text-xs text-gray-600">Clients</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Tabs and Content */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Main Content */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Tabs */}
//             <div className="bg-white rounded-lg shadow">
//               <div className="border-b overflow-x-auto">
//                 <div className="flex min-w-max">
//                   {["about", "jobs", "culture", "gallery"].map((tab) => (
//                     <button
//                       key={tab}
//                       onClick={() => setActiveTab(tab)}
//                       className={`px-6 py-4 text-sm font-medium capitalize whitespace-nowrap ${
//                         activeTab === tab
//                           ? "text-blue-600 border-b-2 border-blue-600"
//                           : "text-gray-600 hover:text-gray-900"
//                       }`}
//                     >
//                       {tab}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <div className="p-4 sm:p-6">
//                 {/* About Tab */}
//                 {activeTab === "about" && (
//                   <div className="space-y-6 text-left">
//                     <div>
//                       <h3 className="text-lg font-bold text-gray-900 mb-3">
//                         About Us
//                       </h3>
//                       <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm sm:text-base">
//                         {companyInfo.description}
//                       </p>
//                     </div>

//                     <div>
//                       <h3 className="text-lg font-bold text-gray-900 mb-3">
//                         Benefits & Perks
//                       </h3>
//                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                         {companyInfo.benefits.map((benefit, index) => (
//                           <div key={index} className="flex items-start gap-2">
//                             <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
//                             <span className="text-gray-700 text-sm break-words">
//                               {benefit}
//                             </span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {/* Jobs Tab */}
//                 {activeTab === "jobs" && (
//                   <div className="space-y-4 text-left">
//                     <h3 className="text-lg font-bold text-gray-900 mb-4">
//                       Open Positions ({openJobs.length})
//                     </h3>
//                     {openJobs.map((job) => (
//                       <div
//                         key={job.id}
//                         className="border rounded-lg p-4 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer"
//                       >
//                         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
//                           <div className="flex-1">
//                             <h4 className="font-semibold text-gray-900 mb-1">
//                               {job.title}
//                             </h4>
//                             <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-600">
//                               <span className="flex items-center gap-1">
//                                 <Building2 className="w-4 h-4" />
//                                 {job.department}
//                               </span>
//                               <span>•</span>
//                               <span className="flex items-center gap-1">
//                                 <Briefcase className="w-4 h-4" />
//                                 {job.type}
//                               </span>
//                               <span>•</span>
//                               <span className="flex items-center gap-1">
//                                 <MapPin className="w-4 h-4" />
//                                 {job.location}
//                               </span>
//                             </div>
//                             <div className="flex flex-wrap items-center gap-2 mt-2 text-xs sm:text-sm">
//                               <span className="flex items-center gap-1 text-green-600 font-medium">
//                                 <DollarSign className="w-4 h-4" />
//                                 {job.salary}
//                               </span>
//                               <span className="text-gray-500">•</span>
//                               <span className="flex items-center gap-1 text-gray-500">
//                                 <Clock className="w-4 h-4" />
//                                 {job.posted}
//                               </span>
//                             </div>
//                           </div>
//                           <button className="px-4 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 flex items-center gap-2 self-start sm:self-center">
//                             Apply Now
//                             <ChevronRight size={16} />
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 {/* Culture Tab */}
//                 {activeTab === "culture" && (
//                   <div className="space-y-6 text-left">
//                     <div>
//                       <h3 className="text-lg font-bold text-gray-900 mb-3">
//                         Our Culture
//                       </h3>
//                       <p className="text-gray-700 mb-4 text-sm sm:text-base">
//                         At TechVision Solutions, we believe that our people are
//                         our greatest asset. We've built a culture that
//                         encourages innovation, supports growth, and celebrates
//                         diversity.
//                       </p>
//                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                         {companyInfo.culture.map((item, index) => (
//                           <div
//                             key={index}
//                             className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg"
//                           >
//                             <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
//                             <span className="text-gray-700 text-sm font-medium break-words">
//                               {item}
//                             </span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>

//                     <div>
//                       <h3 className="text-lg font-bold text-gray-900 mb-3">
//                         Why Join Us?
//                       </h3>
//                       <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
//                         We offer a dynamic work environment where your ideas
//                         matter and your contributions make a real impact. Join a
//                         team of passionate professionals who are dedicated to
//                         pushing the boundaries of technology and creating
//                         solutions that change the world.
//                       </p>
//                     </div>
//                   </div>
//                 )}

//                 {/* Gallery Tab */}
//                 {activeTab === "gallery" && (
//                   <div className="space-y-4 text-left">
//                     <h3 className="text-lg font-bold text-gray-900 mb-4">
//                       Office & Team
//                     </h3>
//                     <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
//                       {gallery.map((item) => (
//                         <div
//                           key={item.id}
//                           className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
//                         >
//                           <div className="w-full h-full flex items-center justify-center p-2">
//                             <span className="text-gray-500 text-xs sm:text-sm text-center break-words">
//                               {item.title}
//                             </span>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Sidebar */}
//           <div className="space-y-6">
//             {/* Company Details */}
//             <div className="bg-white rounded-lg shadow p-4 sm:p-6">
//               <h3 className="text-lg font-bold text-gray-900 mb-4 text-left">
//                 Company Details
//               </h3>
//               <div className="space-y-4">
//                 <div className="flex items-start gap-3">
//                   <Building2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
//                   <div>
//                     <div className="text-xs text-gray-500 uppercase mb-1 text-left">
//                       Industry
//                     </div>
//                     <div className="text-sm text-gray-900 font-medium text-left">
//                       {companyInfo.industry}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex items-start gap-3">
//                   <Users className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
//                   <div>
//                     <div className="text-xs text-gray-500 uppercase mb-1 text-left">
//                       Company Size
//                     </div>
//                     <div className="text-sm text-gray-900 font-medium text-left">
//                       {companyInfo.companySize}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex items-start gap-3">
//                   <Calendar className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
//                   <div>
//                     <div className="text-xs text-gray-500 uppercase mb-1 text-left">
//                       Founded
//                     </div>
//                     <div className="text-sm text-gray-900 font-medium text-left">
//                       {companyInfo.founded}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Contact Information */}
//             <div className="bg-white rounded-lg shadow p-4 sm:p-6">
//               <h3 className="text-lg font-bold text-gray-900 mb-4 text-left">
//                 Contact Information
//               </h3>
//               <div className="space-y-4">
//                 <div className="flex items-start gap-3 text-left">
//                   <Globe className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
//                   <div className="flex-1 min-w-0">
//                     <div className="text-xs text-gray-500 uppercase mb-1 text-left">
//                       Website
//                     </div>
//                     <a
//                       href="#"
//                       className="text-sm text-blue-600 hover:underline truncate text-left"
//                       title={companyInfo.website} // Show full URL on hover
//                     >
//                       {companyInfo.website}
//                     </a>
//                   </div>
//                 </div>

//                 <div className="flex items-start gap-3 text-left">
//                   <Mail className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
//                   <div className="flex-1 min-w-0">
//                     <div className="text-xs text-gray-500 uppercase mb-1">
//                       Email
//                     </div>
//                     <a
//                       href="#"
//                       className="text-sm text-blue-600 hover:underline truncate"
//                       title={companyInfo.email} // Show full email on hover
//                     >
//                       {companyInfo.email}
//                     </a>
//                   </div>
//                 </div>

//                 <div className="flex items-start gap-3 text-left">
//                   <Phone className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
//                   <div>
//                     <div className="text-xs text-gray-500 uppercase mb-1">
//                       Phone
//                     </div>
//                     <div className="text-sm text-gray-900 font-medium">
//                       {companyInfo.phone}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex items-start gap-3 text-left">
//                   <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
//                   <div>
//                     <div className="text-xs text-gray-500 uppercase mb-1">
//                       Location
//                     </div>
//                     <div className="text-sm text-gray-900 font-medium">
//                       {companyInfo.location}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Social Media */}
//             <div className="bg-white rounded-lg shadow p-4 sm:p-6 text-left">
//               <h3 className="text-lg font-bold text-gray-900 mb-4">
//                 Follow Us
//               </h3>
//               <div className="flex gap-2 flex-wrap">
//                 <button className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700">
//                   <Facebook size={18} />
//                 </button>
//                 <button className="p-2 bg-blue-400 text-white rounded hover:bg-blue-500">
//                   <Twitter size={18} />
//                 </button>
//                 <button className="p-2 bg-blue-700 text-white rounded hover:bg-blue-800">
//                   <Linkedin size={18} />
//                 </button>
//                 <button className="p-2 bg-pink-600 text-white rounded hover:bg-pink-700">
//                   <Instagram size={18} />
//                 </button>
//                 <button className="p-2 bg-red-600 text-white rounded hover:bg-red-700">
//                   <Youtube size={18} />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmployerProfile;
