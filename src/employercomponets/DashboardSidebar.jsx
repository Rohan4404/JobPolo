// export default DashboardSidebar;

// src/employercomponets/DashboardSidebar.jsx

// import React from "react";
// import { FiLogOut } from "react-icons/fi";
// import { menuItems } from "../employerutils/EmployerUtils";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const DashboardSidebar = ({ active, setActive, sidebarTabs, role }) => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     sessionStorage.clear();
//     toast.info("You have been logged out successfully.");
//     navigate("/");
//   };
//   const roleDisplay = {
//     EMPLOYER: "Employer",
//     EMPLOYEE: "Candidate",
//     ADMIN: "Admin",
//     SUPER_ADMIN: "Super Admin",
//   };

//   return (
//     <div className="flex flex-col p-5 border-r h-full">
//       <div className="text-sm font-semibold text-gray-500 mb-6 border-b pb-2">
//         {role
//           ? role
//               .replace(/_/g, " ")
//               .toLowerCase()
//               .replace(/\b\w/g, (c) => c.toUpperCase())
//           : "User"}{" "}
//         Dashboard
//       </div>

//       {/* Scrollable area */}
//       <ul className="space-y-2 flex-1 min-h-0 overflow-y-auto custom-scrollbar pr-2">
//         {sidebarTabs.map((tab) => (
//           <li
//             key={tab}
//             className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer text-sm font-medium transition-all ${
//               active === tab
//                 ? "bg-blue-50 text-blue-600"
//                 : "text-gray-600 hover:bg-gray-100"
//             }`}
//             onClick={() => setActive(tab)}
//           >
//             {tab}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default DashboardSidebar;

// import React, { useEffect } from "react";
// import {
//   ChevronDown,
//   ChevronRight,
//   Briefcase,
//   FileText,
//   Brain,
//   User,
//   Target,
//   Folder,
//   ShieldUser,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const DashboardSidebar = ({ active, setActive, sidebarTabs, role }) => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     sessionStorage.clear();
//     toast.info("You have been logged out successfully.");
//     navigate("/");
//   };

//   // ================= EMPLOYEE SIDEBAR =================
//   if (role === "EMPLOYEE") {
//     const [openSections, setOpenSections] = React.useState({
//       Jobs: false,
//       Tools: false,
//       "AI Tools": false,
//     });

//     const jobTabs = [
//       "Jobs",
//       "Recommended Jobs",
//       "Saved Jobs",
//       "Applied Jobs",
//     ];

//     const toolTabs = [
//       "Resume Builder",
//       "Portfolio Builder",
//       "Job Alert",
//       "Interview Preparation",
//       "Activity Log",
//     ];

//     const aiTabs = [
//       "Apply Jobs with AI",
//       "AI Resume Reviewer",
//       "AI Cover Letter Writer",
//     ];

//     // 🔥 Auto open section
//     useEffect(() => {
//       if (jobTabs.includes(active)) {
//         setOpenSections((prev) => ({ ...prev, Jobs: true }));
//       }
//       if (toolTabs.includes(active)) {
//         setOpenSections((prev) => ({ ...prev, Tools: true }));
//       }
//       if (aiTabs.includes(active)) {
//         setOpenSections((prev) => ({ ...prev, "AI Tools": true }));
//       }
//     }, [active]);

//     const iconMap = {
//       "Candidate Profile": <ShieldUser size={16} />,
//       "Career Preferences": <Target size={16} />,
//       "Your Documents": <Folder size={16} />,
//     };

//     const renderItem = (tab) => (
//       <li
//         key={tab}
//         onClick={() => setActive(tab)}
//         className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer text-sm transition ${
//           active === tab
//             ? "bg-blue-600 text-white shadow-sm"
//             : "text-gray-600 hover:bg-gray-100"
//         }`}
//       >
//         <span className="text-[13px]">{tab}</span>
//       </li>
//     );

//     const renderSection = (title, tabs, icon, keyName) => {
//       const isOpen = openSections[keyName];
//       const isActiveInside = tabs.includes(active);

//       return (
//         <div className="mt-3">
//           <div
//             onClick={() =>
//               setOpenSections((prev) => ({
//                 ...prev,
//                 [keyName]: !prev[keyName],
//               }))
//             }
//             className={`flex items-center px-3 py-2 rounded-lg cursor-pointer transition ${
//               isActiveInside
//                 ? "bg-blue-50 text-blue-600"
//                 : "text-gray-700 hover:bg-gray-100"
//             }`}
//           >
//             <span className="mr-2">{icon}</span>
//             <span className="text-sm font-medium">{title}</span>

//             <span className="ml-auto">
//               {isOpen ? (
//                 <ChevronDown size={16} />
//               ) : (
//                 <ChevronRight size={16} />
//               )}
//             </span>
//           </div>

//           <div
//             className={`overflow-hidden transition-all duration-300 ${
//               isOpen ? "max-h-96 opacity-100 mt-1" : "max-h-0 opacity-0"
//             }`}
//           >
//             <div className="ml-6 space-y-1">
//               {tabs.map((tab) => renderItem(tab))}
//             </div>
//           </div>
//         </div>
//       );
//     };

//     return (
//       <div className="flex flex-col p-4 border-r h-full bg-white">
//         {/* HEADER */}
//         <div className="text-sm font-semibold text-gray-500 mb-6 border-b pb-3">
//           Candidate Dashboard
//         </div>

//         <ul className="flex-1 overflow-y-auto custom-scrollbar pr-1 space-y-1">
//           {/* TOP ITEMS */}
//           {sidebarTabs
//             .filter(
//               (tab) =>
//                 ![
//                   ...jobTabs,
//                   ...toolTabs,
//                   ...aiTabs,
//                 ].includes(tab)
//             )
//             .map((tab) => (
//               <li
//                 key={tab}
//                 onClick={() => setActive(tab)}
//                 className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer text-sm ${
//                   active === tab
//                     ? "bg-blue-600 text-white"
//                     : "text-gray-600 hover:bg-gray-100"
//                 }`}
//               >
//                 {iconMap[tab] || <User size={16} />}
//                 {tab}
//               </li>
//             ))}

//           {/* SECTIONS */}
//           {renderSection("My Jobs", jobTabs, <Briefcase size={16} />, "Jobs")}
//           {renderSection("Tools", toolTabs, <FileText size={16} />, "Tools")}
//           {renderSection("AI Tools", aiTabs, <Brain size={16} />, "AI Tools")}
//         </ul>
//       </div>
//     );
//   }

//   // ================= OTHER ROLES (OLD UI) =================
//   return (
//     <div className="flex flex-col p-5 border-r h-full">
//       <div className="text-sm font-semibold text-gray-500 mb-6 border-b pb-2">
//         {role
//           ? role
//               .replace(/_/g, " ")
//               .toLowerCase()
//               .replace(/\b\w/g, (c) => c.toUpperCase())
//           : "User"}{" "}
//         Dashboard
//       </div>

//       <ul className="space-y-2 flex-1 overflow-y-auto custom-scrollbar pr-2">
//         {sidebarTabs.map((tab) => (
//           <li
//             key={tab}
//             onClick={() => setActive(tab)}
//             className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer text-sm font-medium ${
//               active === tab
//                 ? "bg-blue-50 text-blue-600"
//                 : "text-gray-600 hover:bg-gray-100"
//             }`}
//           >
//             {tab}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default DashboardSidebar;

import React, { useEffect } from "react";
import {
  ChevronDown,
  ChevronRight,
  Briefcase,
  FileText,
  Brain,
  User,
  Target,
  Folder,
  ShieldUser,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DashboardSidebar = ({ active, setActive, sidebarTabs, role }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    toast.info("You have been logged out successfully.");
    navigate("/");
  };

  // ================= COMMON STATE =================
  const [openSections, setOpenSections] = React.useState({});

  // ================= EMPLOYER SECTIONS =================
  const employerSections = {
    Dashboard: ["Employer Dashboard", "Employer Profile"],

    Jobs: ["Post a Job", "My Jobs", "Job Applications", "Saved Candidates"],

    Management: ["Recruiter Management", "Candidate Search", "Messages"],

    Billing: ["Subscription & Billing", "Reports & Analytics"],
  };

  // ================= SUPER ADMIN SECTIONS =================
  const superAdminSections = {
    Overview: ["System Overview", "SuperAdmin Profile"],

    Jobs: [
      "Post a Job",
      "Bulk Job Upload",
      "All Jobs",
      "Job Applications",
      "Saved Candidates",
    ],

    Users: ["Onboarding", "List of Users"],

    Content: ["Category Sections", "Add Blogs", "Blog Sections"],

    Payments: [
      "Payment Plans",
      "Transactions History",
      "Employer Billing Overview",
      "Invoice Management",
    ],

    System: ["Send Notifications"],
  };

  // ================= COMMON SECTION RENDER =================
  const renderSection = (title, tabs) => {
    const isOpen = openSections[title];
    const isActiveInside = tabs.includes(active);

    return (
      <div key={title} className="mt-3">
        {/* PARENT */}
        <div
          onClick={() =>
            setOpenSections((prev) => ({
              ...prev,
              [title]: !prev[title],
            }))
          }
          className={`flex items-center px-3 py-2 rounded-lg cursor-pointer ${
            isActiveInside
              ? "bg-blue-50 text-blue-600"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <span className="text-sm font-medium text-left w-full">{title}</span>

          <span className="ml-auto">
            {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </span>
        </div>

        {/* CHILDREN */}
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-96 opacity-100 mt-1" : "max-h-0 opacity-0"
          }`}
        >
          <div className="space-y-1 pl-3">
            {tabs.map((tab) => (
              <div
                key={tab}
                onClick={() => setActive(tab)}
                className={`px-3 py-2 rounded-lg cursor-pointer text-sm text-left ${
                  active === tab
                    ? "underline underline-offset-4 decoration-2 text-blue-600 font-semibold"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {tab}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ================= AUTO OPEN ACTIVE SECTION =================
  useEffect(() => {
    let sections = {};

    if (role === "EMPLOYER") sections = employerSections;
    if (role === "SUPER_ADMIN") sections = superAdminSections;

    Object.entries(sections).forEach(([key, tabs]) => {
      if (tabs.includes(active)) {
        setOpenSections((prev) => ({ ...prev, [key]: true }));
      }
    });
  }, [active, role]);

  // ================= EMPLOYEE SIDEBAR =================
  if (role === "EMPLOYEE") {
    const [employeeSectionsState, setEmployeeSectionsState] = React.useState({
      Jobs: false,
      Tools: false,
      "AI Tools": false,
    });

    const jobTabs = ["Jobs", "Recommended Jobs", "Saved Jobs", "Applied Jobs"];

    const toolTabs = [
      "Resume Builder",
      "Portfolio Builder",
      "Job Alert",
      "Interview Preparation",
      "Activity Log",
    ];

    const aiTabs = [
      "Apply Jobs with AI",
      "AI Resume Reviewer",
      "AI Cover Letter Writer",
    ];

    useEffect(() => {
      if (jobTabs.includes(active)) {
        setEmployeeSectionsState((prev) => ({ ...prev, Jobs: true }));
      }
      if (toolTabs.includes(active)) {
        setEmployeeSectionsState((prev) => ({ ...prev, Tools: true }));
      }
      if (aiTabs.includes(active)) {
        setEmployeeSectionsState((prev) => ({
          ...prev,
          "AI Tools": true,
        }));
      }
    }, [active]);

    const iconMap = {
      "Candidate Profile": <ShieldUser size={16} />,
      "Career Preferences": <Target size={16} />,
      "Your Documents": <Folder size={16} />,
    };

    const renderItem = (tab) => (
      <li
        key={tab}
        onClick={() => setActive(tab)}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer text-sm ${
          active === tab
            ? "bg-blue-600 text-white"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        {iconMap[tab] || <User size={16} />}
        {tab}
      </li>
    );

    const renderEmpSection = (title, tabs, icon, keyName) => {
      const isOpen = employeeSectionsState[keyName];

      return (
        <div className="mt-3">
          <div
            onClick={() =>
              setEmployeeSectionsState((prev) => ({
                ...prev,
                [keyName]: !prev[keyName],
              }))
            }
            className="flex items-center px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100"
          >
            {icon}
            <span className="ml-2 text-sm font-medium">{title}</span>
            <span className="ml-auto">
              {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </span>
          </div>

          {isOpen && (
            <div className="ml-6 space-y-1">
              {tabs.map((tab) => renderItem(tab))}
            </div>
          )}
        </div>
      );
    };

    return (
      <div className="flex flex-col p-4 border-r h-full bg-white">
        <div className="text-sm font-semibold text-gray-500 mb-6 border-b pb-3">
          Candidate Dashboard
        </div>

        <ul className="flex-1 overflow-y-auto custom-scrollbar space-y-1">
          {sidebarTabs
            .filter(
              (tab) => ![...jobTabs, ...toolTabs, ...aiTabs].includes(tab),
            )
            .map((tab) => renderItem(tab))}

          {renderEmpSection(
            "My Jobs",
            jobTabs,
            <Briefcase size={16} />,
            "Jobs",
          )}
          {renderEmpSection("Tools", toolTabs, <FileText size={16} />, "Tools")}
          {renderEmpSection(
            "AI Tools",
            aiTabs,
            <Brain size={16} />,
            "AI Tools",
          )}
        </ul>
      </div>
    );
  }

  // ================= EMPLOYER =================
  if (role === "EMPLOYER") {
    return (
      <div className="flex flex-col p-4 border-r h-full bg-white">
        <div className="text-sm font-semibold text-gray-500 mb-6 border-b pb-3">
          Employer Dashboard
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {Object.entries(employerSections).map(([title, tabs]) => (
            <React.Fragment key={title}>
              {renderSection(title, tabs)}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }

  // ================= SUPER ADMIN =================
  if (role === "SUPER_ADMIN") {
    return (
      <div className="flex flex-col p-4 border-r h-full bg-white">
        <div className="text-sm font-semibold text-gray-500 mb-6 border-b pb-3">
          Super Admin Dashboard
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {Object.entries(superAdminSections).map(([title, tabs]) => (
            <React.Fragment key={title}>
              {renderSection(title, tabs)}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }

  // ================= FALLBACK =================
  return null;
};

export default DashboardSidebar;
