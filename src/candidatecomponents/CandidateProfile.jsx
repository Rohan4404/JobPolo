// import React, { useEffect, useState } from "react";
// import { Mail, Phone, MapPin, X } from "lucide-react";
// import { getUserProfile } from "../api/service2";

// const CandidateProfile = () => {
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // popup state
//   const [popupOpen, setPopupOpen] = useState(false);
//   const [popupUrl, setPopupUrl] = useState("");

//   useEffect(() => {
//     const loadProfile = async () => {
//       try {
//         const res = await getUserProfile();
//         setProfile(res.data.filteredUser);
//       } catch (err) {
//         console.error("Error loading candidate profile", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadProfile();
//   }, []);

//   if (loading) {
//     return (
//       <div className="section-loader">
//         <div className="flex flex-col items-center">
//           <div className="page-loader-spinner mb-3"></div>
//           <p className="page-loader-text">Loading profile...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!profile) {
//     return (
//       <div className="flex justify-center items-center h-[80vh] text-blue-700">
//         No profile found
//       </div>
//     );
//   }

//   /* ================= FIELD MAPPING ================= */

//   const fullName = `${profile.firstName?.trim() || ""} ${
//     profile.lastName || ""
//   }`.trim();
//   const employee = profile.employee || {};
//   const address = profile.address || {};

//   const about = employee.bio || "No data provided";
//   const gender = employee.gender || "No data provided";
//   const dob = employee.dob || "No data provided";

//   const profession = employee.functionArea || "No data provided";
//   const skills = employee.skills || [];
//   const experience = employee.experience || "No data provided";
//   const industry = employee.industry || "No data provided";

//   const currentCTC = employee.currentCTC || "No data provided";
//   const expectedCTC = employee.expectedCTC || "No data provided";

//   const resumePreviews = employee.resumePreviewUrls || [];
//   const workSamples = employee.workSamplePreviewUrls || [];

//   const portfolioUrl = employee.portfolioUrl || null;
//   const portfolioPreviewUrl = employee.portfolioPreviewUrl || null;

//   return (
//     <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 p-4 sm:p-6 lg:p-4 text-left">
//       {/* HEADER */}
//       <div className="mb-6">
//         <h1 className="text-3xl font-bold text-blue-900">Hello, {fullName}</h1>
//         <p className="text-blue-700 mt-2">Here is your profile information</p>
//       </div>

//       {/* MAIN CARD */}
//       <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100 h-[70vh] overflow-y-auto">
//         {/* TOP SECTION */}
//         <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-6 border-b border-blue-100">
//           <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex justify-center items-center text-white text-3xl font-bold shadow">
//             {fullName.charAt(0)}
//           </div>

//           <div>
//             <h2 className="text-2xl font-bold text-blue-900">{fullName}</h2>
//             <p className="text-gray-600">{profession}</p>
//             <p className="flex items-center gap-2 text-gray-500 text-sm mt-1">
//               <MapPin size={16} />
//               {address.city || "No data provided"},{" "}
//               {address.state || "No data provided"},{" "}
//               {address.country || "No data provided"} -{" "}
//               {address.pincode || "No data provided"}
//             </p>
//           </div>
//         </div>

//         {/* ABOUT + CONTACT GRID */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
//           {/* ABOUT SECTION */}
//           <div>
//             <h3 className="text-lg font-bold text-blue-900 border-b-2 border-blue-500 pb-2 mb-3">
//               About
//             </h3>
//             <p className="bg-gray-50 p-4 rounded-lg text-gray-700">
//               {about}
//               <br />
//               <br />
//               <strong>Gender:</strong> {gender}
//               <br />
//               <strong>Date of Birth:</strong> {dob}
//             </p>
//           </div>

//           {/* CONTACT SECTION */}
//           <div>
//             <h3 className="text-lg font-bold text-blue-900 border-b-2 border-blue-500 pb-2 mb-3">
//               Contact
//             </h3>

//             <div className="bg-gray-50 p-4 rounded-lg space-y-3">
//               <p className="flex items-center gap-2 text-gray-700">
//                 <Mail size={18} />
//                 {profile.email || "No data provided"}
//               </p>
//               <p className="flex items-center gap-2 text-gray-700">
//                 <Phone size={18} />
//                 {profile.countryCode || ""}{" "}
//                 {profile.mobileNumber || "No data provided"}
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* SKILLS */}
//         <div className="mt-8">
//           <h3 className="text-lg font-bold text-blue-900 border-b-2 border-blue-500 pb-2 mb-3">
//             Skills
//           </h3>
//           {skills.length > 0 ? (
//             <div className="flex flex-wrap gap-2">
//               {skills.map((skill, index) => (
//                 <span
//                   key={index}
//                   className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
//                 >
//                   {skill}
//                 </span>
//               ))}
//             </div>
//           ) : (
//             <p className="bg-gray-50 p-4 rounded-lg text-gray-700">
//               No data provided
//             </p>
//           )}
//         </div>

//         {/* EXPERIENCE */}
//         <div className="mt-8">
//           <h3 className="text-lg font-bold text-blue-900 border-b-2 border-blue-500 pb-2 mb-3">
//             Experience
//           </h3>
//           <p className="bg-gray-50 p-4 rounded-lg text-gray-700">
//             {experience}
//             <br />
//             <br />
//             <strong>Current CTC:</strong> {currentCTC}
//             <br />
//             <strong>Expected CTC:</strong> {expectedCTC}
//           </p>
//         </div>

//         {/* INDUSTRY */}
//         <div className="mt-8">
//           <h3 className="text-lg font-bold text-blue-900 border-b-2 border-blue-500 pb-2 mb-3">
//             Industry
//           </h3>
//           <p className="bg-gray-50 p-4 rounded-lg text-gray-700">{industry}</p>
//         </div>

//         {/* RESUME */}
//         {/* RESUME */}
//         <div className="mt-8">
//           <h3 className="text-lg font-bold text-blue-900 border-b-2 border-blue-500 pb-2 mb-3">
//             Resume
//           </h3>

//           {resumePreviews.length > 0 ? (
//             <div className="flex flex-wrap gap-3">
//               {resumePreviews.map((url, i) => (
//                 <button
//                   key={i}
//                   onClick={() => {
//                     setPopupUrl(url);
//                     setPopupOpen(true);
//                   }}
//                   className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition"
//                 >
//                   Resume {i + 1}
//                 </button>
//               ))}
//             </div>
//           ) : (
//             <p className="bg-gray-50 p-4 rounded-lg text-gray-700">
//               No data provided
//             </p>
//           )}
//         </div>

//         {/* WORK SAMPLE */}
//         {/* WORK SAMPLES */}
//         <div className="mt-8">
//           <h3 className="text-lg font-bold text-blue-900 border-b-2 border-blue-500 pb-2 mb-3">
//             Work Samples
//           </h3>

//           {workSamples.length > 0 ? (
//             <div className="flex flex-wrap gap-3">
//               {workSamples.map((url, i) => (
//                 <button
//                   key={i}
//                   onClick={() => {
//                     setPopupUrl(url);
//                     setPopupOpen(true);
//                   }}
//                   className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg text-sm font-medium hover:bg-indigo-200 transition"
//                 >
//                   Sample {i + 1}
//                 </button>
//               ))}
//             </div>
//           ) : (
//             <p className="bg-gray-50 p-4 rounded-lg text-gray-700">
//               No data provided
//             </p>
//           )}
//         </div>
//         {/* PORTFOLIO */}
//         <div className="mt-8">
//           <h3 className="text-lg font-bold text-blue-900 border-b-2 border-blue-500 pb-2 mb-3">
//             Portfolio
//           </h3>

//           {portfolioPreviewUrl || portfolioUrl ? (
//             <button
//               onClick={() => {
//                 setPopupUrl(portfolioPreviewUrl || portfolioUrl);
//                 setPopupOpen(true);
//               }}
//               className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition"
//             >
//               View Portfolio
//             </button>
//           ) : (
//             <p className="bg-gray-50 p-4 rounded-lg text-gray-700">
//               No data provided
//             </p>
//           )}
//         </div>
//       </div>

//       {/* POPUP */}
//       {/* POPUP */}
//       {popupOpen && (
//         <div className="fixed inset-0 bg-black/70 z-[9999] flex items-center justify-center">
//           <div className="bg-white w-[90vw] h-[90vh] rounded-xl shadow-lg flex flex-col">
//             <div className="flex justify-between items-center p-4 border-b">
//               <h2 className="font-bold text-blue-900">Preview</h2>

//               <div className="flex gap-3">
//                 <a
//                   href={popupUrl}
//                   download
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
//                 >
//                   Download
//                 </a>

//                 <button onClick={() => setPopupOpen(false)}>
//                   <X />
//                 </button>
//               </div>
//             </div>

//             <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
//               {popupUrl?.toLowerCase().includes(".pdf") ? (
//                 <iframe
//                   src={popupUrl}
//                   className="w-full h-full rounded"
//                   title="preview"
//                 />
//               ) : (
//                 <img src={popupUrl} alt="preview" className="w-full rounded" />
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CandidateProfile;



import React, { useEffect, useState } from "react";
import { Mail, Phone, MapPin, X } from "lucide-react";
import { getUserProfile } from "../api/service2";

const CandidateProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // popup state
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupUrl, setPopupUrl] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await getUserProfile();
        setProfile(res.data.filteredUser);
      } catch (err) {
        console.error("Error loading candidate profile", err);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className="section-loader">
        <div className="flex flex-col items-center">
          <div className="page-loader-spinner mb-3"></div>
          <p className="page-loader-text">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-[80vh] text-blue-700">
        No profile found
      </div>
    );
  }

  /* ================= FIELD MAPPING ================= */

  const fullName = `${profile.firstName?.trim() || ""} ${
    profile.lastName || ""
  }`.trim();
  const employee = profile.employee || {};
  const address = profile.address || {};

  const about = employee.bio || "No data provided";
  const gender = employee.gender || "No data provided";
  const dob = employee.dob || "No data provided";

  const profession = employee.functionArea || "No data provided";
  const skills = employee.skills || [];
  const experience = employee.experience || "No data provided";
  const industry = employee.industry || "No data provided";

  const currentCTC = employee.currentCTC || "No data provided";
  const expectedCTC = employee.expectedCTC || "No data provided";

  const resumePreviews = employee.resumePreviewUrls || [];
  const workSamples = employee.workSamplePreviewUrls || [];

  const portfolioUrl = employee.portfolioUrl || null;
  const portfolioPreviewUrl = employee.portfolioPreviewUrl || null;
  const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    <div className="text-blue-600 mt-1 text-lg">{icon}</div>
    <div>
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
        {label}
      </p>
      <p className="text-gray-800 font-medium break-words">
        {value || "N/A"}
      </p>
    </div>
  </div>
);

  return (
  <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 min-h-screen">
    <div className="mx-auto">

      {/* 🔷 HEADER (Same style as Employer) */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg p-8 mb-6 text-left">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-blue-600 text-4xl font-bold shadow-xl">
            {fullName.charAt(0)}
          </div>

          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {fullName}
            </h1>
            <p className="text-blue-100 text-lg">{profession}</p>

            <p className="flex items-center gap-2 text-blue-100 text-sm mt-2">
              <MapPin size={16} />
              {address.city || "N/A"}, {address.state || "N/A"},{" "}
              {address.country || "N/A"} - {address.pincode || "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* 🔷 MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[60vh] overflow-y-auto custom-scrollbar text-left">

        {/* LEFT SIDE */}
       {/* LEFT COLUMN */}
<div className="lg:col-span-1 space-y-6">

  {/* PERSONAL INFO */}
  <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 pb-3 border-b-2 border-blue-500">
      Personal Information
    </h2>

    <div className="space-y-4">
      <InfoRow icon={<Mail />} label="Email" value={profile.email} />
      <InfoRow icon={<Phone />} label="Phone" value={`${profile.countryCode} ${profile.mobileNumber}`} />
      <InfoRow icon={<MapPin />} label="City" value={address.city} />
      <InfoRow icon={<MapPin />} label="State" value={address.state} />
      <InfoRow icon={<MapPin />} label="Country" value={address.country} />
    </div>
  </div>

  {/* ACCOUNT INFO */}
  <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
    <h2 className="text-xl font-bold text-gray-800 mb-4 pb-3 border-b-2 border-blue-500">
      Profile Details
    </h2>

    <div className="space-y-3">
      <p><strong>Gender:</strong> {gender}</p>
      <p><strong>DOB:</strong> {dob}</p>
      <p><strong>Industry:</strong> {industry}</p>
    </div>
  </div>
</div>

{/* RIGHT COLUMN */}
<div className="lg:col-span-2 space-y-6">

  {/* ABOUT */}
  <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
    <h2 className="text-xl font-bold text-gray-800 mb-4 pb-3 border-b-2 border-blue-500">
      About
    </h2>

    <p className="text-gray-700">{about}</p>
  </div>

  {/* SKILLS */}
  <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
    <h2 className="text-xl font-bold text-gray-800 mb-4 pb-3 border-b-2 border-blue-500">
      Skills
    </h2>

    {skills.length > 0 ? (
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, i) => (
          <span
            key={i}
            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
          >
            {skill}
          </span>
        ))}
      </div>
    ) : (
      <p>No data provided</p>
    )}
  </div>

  {/* EXPERIENCE */}
  <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
    <h2 className="text-xl font-bold text-gray-800 mb-4 pb-3 border-b-2 border-blue-500">
      Experience
    </h2>

    <p>
      {experience}
      <br /><br />
      <strong>Current CTC:</strong> {currentCTC}
      <br />
      <strong>Expected CTC:</strong> {expectedCTC}
    </p>
  </div>

  {/* RESUME */}
  <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
    <h2 className="text-xl font-bold text-gray-800 mb-4 pb-3 border-b-2 border-blue-500">
      Resume
    </h2>

    {resumePreviews.length > 0 ? (
      <div className="flex flex-wrap gap-3">
        {resumePreviews.map((url, i) => (
          <button
            key={i}
            onClick={() => {
              setPopupUrl(url);
              setPopupOpen(true);
            }}
            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
          >
            Resume {i + 1}
          </button>
        ))}
      </div>
    ) : (
      <p>No data provided</p>
    )}
  </div>

  {/* WORK SAMPLES */}
<div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
  <h2 className="text-xl font-bold text-gray-800 mb-4 pb-3 border-b-2 border-blue-500">
    Work Samples
  </h2>

  {workSamples.length > 0 ? (
    <div className="flex flex-wrap gap-3">
      {workSamples.map((url, i) => (
        <button
          key={i}
          onClick={() => {
            setPopupUrl(url);
            setPopupOpen(true);
          }}
          className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition"
        >
          Sample {i + 1}
        </button>
      ))}
    </div>
  ) : (
    <p>No data provided</p>
  )}
</div>

{/* PORTFOLIO */}
<div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
  <h2 className="text-xl font-bold text-gray-800 mb-4 pb-3 border-b-2 border-blue-500">
    Portfolio
  </h2>

  {portfolioPreviewUrl || portfolioUrl ? (
    <button
      onClick={() => {
        setPopupUrl(portfolioPreviewUrl || portfolioUrl);
        setPopupOpen(true);
      }}
      className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition"
    >
      View Portfolio
    </button>
  ) : (
    <p>No data provided</p>
  )}
</div>

</div>
      </div>
    </div>

    {/* 🔥 POPUP (UNCHANGED) */}
    {popupOpen && (
      <div className="fixed inset-0 bg-black/70 z-[9999] flex items-center justify-center">
        <div className="bg-white w-[90vw] h-[90vh] rounded-xl shadow-lg flex flex-col">

          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="font-bold text-blue-900">Preview</h2>

            <div className="flex gap-3">
              <a
                href={popupUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
              >
                Download
              </a>

              <button onClick={() => setPopupOpen(false)}>
                <X />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
            {popupUrl?.toLowerCase().includes(".pdf") ? (
              <iframe src={popupUrl} className="w-full h-full rounded" />
            ) : (
              <img src={popupUrl} className="w-full rounded" />
            )}
          </div>
        </div>
      </div>
    )}
  </div>
);
};

export default CandidateProfile;
