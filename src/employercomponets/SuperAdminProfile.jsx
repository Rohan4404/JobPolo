// import React, { useEffect, useState } from "react";
// import {
//   FaEnvelope,
//   FaPhone,
//   FaMapMarkerAlt,
//   FaIdCard,
//   FaUserShield,
// } from "react-icons/fa";
// import { getUserProfilewith } from "../api/service2";

// const DashboardContent = () => {
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchUserProfile = async () => {
//     try {
//       const storedUser = JSON.parse(sessionStorage.getItem("user"));
//       const role = sessionStorage.getItem("role");
//       const userId = storedUser?.id;

//       console.log("stored user id is ", userId);

//       if (!userId) {
//         console.error("User ID not found in sessionStorage");
//         return;
//       }

//       console.log("Sending to API =>", { role, userId });

//       const res = await getUserProfilewith(1, 20, "SUPER_ADMIN", userId);
//       console.log("Profile response:", res);

//       if (res?.data?.users && res.data.users.length > 0) {
//         setProfile(res.data.users[0]);
//       }
//     } catch (err) {
//       console.error("Error fetching profile:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUserProfile();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex flex-col justify-center items-center h-[80vh] bg-gradient-to-br from-blue-50 to-indigo-50">
//         {/* Spinner */}
//         <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>

//         {/* Text */}
//         <p className="text-xl text-blue-600 font-semibold">
//           Loading profile...
//         </p>
//       </div>
//     );
//   }

//   if (!profile) {
//     return (
//       <div className="flex justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-50">
//         <div className="text-xl text-blue-600">No profile data found</div>
//       </div>
//     );
//   }

//   const { address } = profile;

//   return (
//     <div className=" bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 p-4 sm:p-6 lg:p-4">
//       {/* Header */}
//       <div className="mb-6">
//         <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-900 text-left">
//           Hello, {profile.firstName} {profile.lastName}
//         </h1>
//         <p className="text-blue-700 mt-2 text-left text-sm sm:text-base">
//           Here is your profile information
//         </p>
//       </div>

//       {/* Profile Card */}

//       <div className="h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
//         <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6 border border-blue-100">
//           <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 pb-6 border-b border-blue-100">
//             <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl sm:text-3xl font-bold shadow-md mb-4 sm:mb-0">
//               {profile.firstName.charAt(0)}
//               {profile.lastName.charAt(0)}
//             </div>
//             <div className="sm:ml-5 text-left">
//               <h2 className="text-xl sm:text-2xl font-bold text-blue-900">
//                 {profile.firstName} {profile.lastName}
//               </h2>
//               <span
//                 className={`inline-block px-3 py-1 rounded-full text-xs sm:text-sm font-semibold mt-2 ${
//                   profile.is_active
//                     ? "bg-green-100 text-green-700"
//                     : "bg-red-100 text-red-700"
//                 }`}
//               >
//                 {profile.is_active ? "Active" : "Inactive"}
//               </span>
//             </div>
//           </div>

//           {/* Personal Information */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
//             <div className="space-y-5">
//               <h3 className="text-lg font-bold text-blue-900 mb-4 text-left border-b-2 border-blue-500 pb-2">
//                 Personal Information
//               </h3>

//               <div className="flex items-start text-left">
//                 <FaEnvelope
//                   className="text-blue-600 mt-1 mr-3 flex-shrink-0"
//                   size={18}
//                 />
//                 <div className="w-full">
//                   <p className="text-xs sm:text-sm text-blue-600 font-semibold">
//                     Email
//                   </p>
//                   <p className="text-sm sm:text-base text-gray-800 break-all">
//                     {profile.email}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-start text-left">
//                 <FaPhone
//                   className="text-blue-600 mt-1 mr-3 flex-shrink-0"
//                   size={18}
//                 />
//                 <div className="w-full">
//                   <p className="text-xs sm:text-sm text-blue-600 font-semibold">
//                     Mobile Number
//                   </p>
//                   <p className="text-sm sm:text-base text-gray-800">
//                     {profile.countryCode} {profile.mobileNumber}
//                   </p>
//                 </div>
//               </div>

//               {profile.alternativeMobileNumber && (
//                 <div className="flex items-start text-left">
//                   <FaPhone
//                     className="text-blue-600 mt-1 mr-3 flex-shrink-0"
//                     size={18}
//                   />
//                   <div className="w-full">
//                     <p className="text-xs sm:text-sm text-blue-600 font-semibold">
//                       Alternative Number
//                     </p>
//                     <p className="text-sm sm:text-base text-gray-800">
//                       {profile.countryCode} {profile.alternativeMobileNumber}
//                     </p>
//                   </div>
//                 </div>
//               )}

//               <div className="flex items-start text-left">
//                 <FaUserShield
//                   className="text-blue-600 mt-1 mr-3 flex-shrink-0"
//                   size={18}
//                 />
//                 <div className="w-full">
//                   <p className="text-xs sm:text-sm text-blue-600 font-semibold">
//                     Role
//                   </p>
//                   <p className="text-sm sm:text-base text-gray-800 font-semibold">
//                     {profile.role.replace("_", " ")}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-start text-left">
//                 <FaIdCard
//                   className="text-blue-600 mt-1 mr-3 flex-shrink-0"
//                   size={18}
//                 />
//                 <div className="w-full">
//                   <p className="text-xs sm:text-sm text-blue-600 font-semibold">
//                     Auth Provider
//                   </p>
//                   <p className="text-sm sm:text-base text-gray-800">
//                     {profile.authProvider}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Address Information */}
//             <div className="space-y-5">
//               <h3 className="text-lg font-bold text-blue-900 mb-4 text-left border-b-2 border-blue-500 pb-2">
//                 Address Information
//               </h3>

//               <div className="flex items-start text-left">
//                 <FaMapMarkerAlt
//                   className="text-blue-600 mt-1 mr-3 flex-shrink-0"
//                   size={18}
//                 />
//                 <div className="w-full">
//                   <p className="text-xs sm:text-sm text-blue-600 font-semibold">
//                     Location
//                   </p>
//                   <p className="text-sm sm:text-base text-gray-800">
//                     {address.city}, {address.state}
//                   </p>
//                   <p className="text-sm sm:text-base text-gray-800">
//                     {address.country}
//                   </p>
//                   <p className="text-xs sm:text-sm text-gray-600 mt-1">
//                     Pincode: {address.pincode}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Account Details */}
//         <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-blue-100">
//           <h3 className="text-lg font-bold text-blue-900 mb-4 text-left border-b-2 border-blue-500 pb-2">
//             Account Details
//           </h3>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//             <div className="text-left">
//               <p className="text-xs sm:text-sm text-blue-600 font-semibold">
//                 Created At
//               </p>
//               <p className="text-sm sm:text-base text-gray-800 font-medium">
//                 {new Date(profile.createdAt).toLocaleDateString()}
//               </p>
//               <p className="text-xs text-gray-600 mt-1">
//                 {new Date(profile.createdAt).toLocaleTimeString()}
//               </p>
//             </div>

//             <div className="text-left">
//               <p className="text-xs sm:text-sm text-blue-600 font-semibold">
//                 Last Updated
//               </p>
//               <p className="text-sm sm:text-base text-gray-800 font-medium">
//                 {new Date(profile.updatedAt).toLocaleDateString()}
//               </p>
//               <p className="text-xs text-gray-600 mt-1">
//                 {new Date(profile.updatedAt).toLocaleTimeString()}
//               </p>
//             </div>

//             <div className="text-left">
//               <p className="text-xs sm:text-sm text-blue-600 font-semibold">
//                 Created By
//               </p>
//               <p className="text-sm sm:text-base text-gray-800 font-medium">
//                 {profile.createdBy}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardContent;

import React, { useEffect, useState } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaIdCard,
  FaUserShield,
} from "react-icons/fa";
import { getUserProfilewith } from "../api/service2";
import { DashboardLoader } from "../components/dashboard/DashboardUI";

const DashboardContent = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async () => {
    try {
      const storedUser = JSON.parse(sessionStorage.getItem("user"));
      const role = sessionStorage.getItem("role");
      const userId = storedUser?.id;

      console.log("stored user id is ", userId);

      if (!userId) {
        console.error("User ID not found in sessionStorage");
        return;
      }

      console.log("Sending to API =>", { role, userId });

      const res = await getUserProfilewith(1, 20, "SUPER_ADMIN", userId);
      console.log("Profile response:", res);

      if (res?.data?.users && res.data.users.length > 0) {
        setProfile(res.data.users[0]);
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  if (loading) return <DashboardLoader message="Loading profile..." />;

  if (!profile) {
    return (
      <p className="text-blue-700 text-center py-10">No profile data found</p>
    );
  }

  const { address } = profile;

  const InfoRow = ({ icon, label, value }) => (
    <div className="flex items-start gap-3 text-left">
      {icon && <div className="text-blue-600 mt-1">{icon}</div>}
      <div>
        <p className="text-xs font-semibold text-blue-600">{label}</p>
        <p className="text-gray-800">{value || "N/A"}</p>
      </div>
    </div>
  );

  return (
    <>
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6 text-left">
        <div className="flex items-center gap-6">
          {/* AVATAR */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-full flex items-center justify-center text-blue-600 text-3xl sm:text-4xl font-bold shadow-xl">
            {profile.firstName?.charAt(0)}
            {profile.lastName?.charAt(0)}
          </div>

          {/* TEXT */}
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">
              {profile.firstName} {profile.lastName}
            </h2>

            <p className="text-blue-100 text-sm sm:text-lg mb-2">
              {profile.role?.replace("_", " ")}
            </p>

            {/* STATUS */}
            <span
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                profile.is_active
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              {profile.is_active ? "Active Account" : "Inactive Account"}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-4 sm:space-y-6 pb-4">
        {/* ROW 1 → PERSONAL + ADDRESS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* PERSONAL INFO */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-blue-100">
            <h3 className="text-lg font-bold text-blue-900 mb-4 border-b-2 border-blue-500 pb-2">
              Personal Information
            </h3>

            <div className="space-y-4">
              <InfoRow
                icon={<FaEnvelope />}
                label="Email"
                value={profile.email}
              />
              <InfoRow
                icon={<FaPhone />}
                label="Mobile"
                value={`${profile.countryCode} ${profile.mobileNumber}`}
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

          {/* ADDRESS INFO */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-blue-100">
            <h3 className="text-lg font-bold text-blue-900 mb-4 border-b-2 border-blue-500 pb-2">
              Address Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoRow label="City" value={address.city} />
              <InfoRow label="State" value={address.state} />
              <InfoRow label="Country" value={address.country} />
              <InfoRow label="Pincode" value={address.pincode} />
            </div>
          </div>
        </div>

        {/* ROW 2 → ACCOUNT FULL WIDTH */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-blue-100">
          <h3 className="text-lg font-bold text-blue-900 mb-4 border-b-2 border-blue-500 pb-2">
            Account Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <InfoRow
              label="Created At"
              value={new Date(profile.createdAt).toLocaleString()}
            />
            <InfoRow
              label="Updated At"
              value={new Date(profile.updatedAt).toLocaleString()}
            />
            <InfoRow label="Created By" value={profile.createdBy} />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardContent;
