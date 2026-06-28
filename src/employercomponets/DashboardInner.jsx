// import React, { useState } from "react";
// import DashboardSidebar from "./DashboardSidebar";
// import DashboardContent from "./DashboardContent";
// import EmployerFooter from "./EmployerFooter";
// import PostAJob from "./PostAJob";
// import MyJobs from "./MyJobs";
// import JobApplications from "./JobApplications";
// import SavedCandidate from "./SavedCandidate";
// import EmployerProfile from "./EmployerProfile";
// import CommingSoonPage from "./CommingSoonPage";

// const DashboardInner = (role) => {
//   const [activeTab, setActiveTab] = useState("Employers Profile");

//   const renderContent = () => {
//     switch (activeTab) {
//       // case "Overview":
//       //   return <DashboardContent />;
//       case "Employers Profile":
//         return <EmployerProfile />;
//       case "Post a Job":
//         return <PostAJob />;
//       case "My Jobs":
//         return <MyJobs />;
//       case "Job Applications":
//         return <JobApplications />;
//       case "Saved Candidate":
//         return <SavedCandidate />;

//       default:
//         return <CommingSoonPage />;
//     }
//   };

//   return (
//     <div className="flex flex-col w-full min-h-[80vh] bg-white">
//       {/* Main dashboard area */}
//       <div className="flex w-full flex-1">
//         {/* Sidebar */}
//         <div className="w-64 bg-white border rounded-lg shadow-sm">
//           <DashboardSidebar active={activeTab} setActive={setActiveTab} />
//         </div>

//         {/* Dynamic right content */}
//         <div className="flex-1 pb-3 pt-0">{renderContent()}</div>
//       </div>

//       {/* Footer */}
//       <div className="flex justify-end">
//         <EmployerFooter />
//       </div>
//     </div>
//   );
// };

// export default DashboardInner;

// src/employercomponets/DashboardInner.jsx

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import EmployerFooter from "./EmployerFooter";
import EmployerProfile from "./EmployerProfile";
import PostAJob from "./PostAJob";
import MyJobs from "./MyJobs";
import JobApplications from "./JobApplications";
import SavedCandidate from "./SavedCandidate";
import CommingSoonPage from "./CommingSoonPage";
// import DashboardContent from "./DashboardContent";
import CandidateProfile from "../candidatecomponents/CandidateProfile";

import FavoriteJobs from "../candidatecomponents/FavoriteJobs";
import JobAlert from "../candidatecomponents/JobAlert";
import CandidateSettings from "../candidatecomponents/CandidateSettings";

import SuperAdminProfile from "./SuperAdminProfile";
import OnboardOrgnaisation from "../SuperAdminComponents/OnboardOrgnaisation";
import ListOfUsers from "../SuperAdminComponents/ListOfUsers";
import CategorySections from "../SuperAdminComponents/CategorySections";
import AddBlogType from "../SuperAdminComponents/AddBlogType";
import CandidateJobsPage from "../candidatecomponents/CandidateJobsPage";
import SavedJobs from "../candidatecomponents/SavedJobs";
import RecommendedJobs from "../candidatecomponents/RecommendedJobs";
import AppliedJobsPage from "../candidatecomponents/AppliedJobsPage";
import ResumeBuilder from "../candidatecomponents/ResumeBuilder";
import Documents from "../candidatecomponents/Documents";
import PortfolioBuilder from "../candidatecomponents/PortfolioBuilder";
import CareerPreference from "../candidatecomponents/CareerPreference";
import ActivityLog from "../candidatecomponents/ActivityLog";
import InterviewPreparation from "../candidatecomponents/InterviewPreparation";
import ProfileOverview from "../candidatecomponents/ProfileOverview";
import AddBlog from "../SuperAdminComponents/AddBlog";
import SuperAdminOverview from "../SuperAdminComponents/SuperAdminOverview";
import BulkJobUpload from "../SuperAdminComponents/BulkJobUpload";
import EmployerDashboardOverview from "./EmployerDashboardOverview";

const DashboardInner = ({ role }) => {
  const [activeTab, setActiveTab] = useState("");
  const location = useLocation();
  console.log("sidebaR", role);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabFromURL = params.get("tab");

    if (tabFromURL) {
      setActiveTab(tabFromURL);
    }
  }, [location.search]);

  // ✅ Sidebar configuration per role
  const sidebarTabsByRole = {
    EMPLOYER: [
      "Employer Dashboard",
      "Employer Profile",
      "Post a Job",
      "My Jobs",
      "Job Applications",
      "Saved Candidates",
      "Subscription & Billing",
      "Recruiter Management",
      "Candidate Search",
      "Reports & Analytics",
      "Messages",
    ],
    // EMPLOYEE: [
    //   "Candidate Profile",
    //   "Jobs",
    //   "Recommended Jobs",
    //   "Saved Jobs",
    //   "Applied Jobs",
    //   "Job Alert",
    // ],
    EMPLOYEE: [
      "Profile Overview",
      "Candidate Profile",
      "Jobs",
      "Recommended Jobs",
      "Saved Jobs",
      "Applied Jobs",
      "Career Preferences",
      "Your Documents",
      "Resume Builder",
      "Portfolio Builder",
      "Job Alert",
      "Interview Preparation",
      "Activity Log",
      "Apply Jobs with AI",
      "AI Resume Reviewer",
      "AI Cover Letter Writer",
    ],

    ADMIN: [
      "Admin Overview",
      "Manage Employers",
      "Manage Employees",
      "Reports",
    ],
    SUPER_ADMIN: [
      "System Overview",
      "SuperAdmin Profile",
      "Onboarding",
      "List of Users",
      "Post a Job",
      "Bulk Job Upload",
      "All Jobs",
      "Category Sections",
      "Add Blogs",
      "Blog Sections",
      "Job Applications",
      "Saved Candidates",
      // New Suggested Pages
      "Payment Plans",
      "Transactions History",
      "Employer Billing Overview",
      "Invoice Management",
      "Send Notifications",
    ],
  };

  // ✅ Choose sidebar items based on role
  const sidebarTabs = sidebarTabsByRole[role] || ["Overview"];
  const initialTab = sidebarTabs[0];
  if (!activeTab) setActiveTab(initialTab);

  // ✅ Dynamic content based on tab name
  const renderContent = () => {
    switch (activeTab) {
      case "Employer Profile":
        return <EmployerProfile role={role} />;
      case "Post a Job":
        return <PostAJob />;
      case "My Jobs":
      case "Admin Overview":
      case "All Jobs":
        return <MyJobs setActiveTab={setActiveTab} />;
      case "Job Applications":
        return <JobApplications />;
      case "Saved Candidates":
        return <SavedCandidate />;

      // return <DashboardContent />;
      case "Profile Overview":
        return <ProfileOverview />;
      case "Candidate Profile":
        return <CandidateProfile />;
      case "Jobs":
        return <CandidateJobsPage />;
      case "Saved Jobs":
        return <SavedJobs />;
      case "Recommended Jobs":
        return <RecommendedJobs />;
      case "Applied Jobs":
        return <AppliedJobsPage />;
      case "Resume Builder":
        return <ResumeBuilder />;
      case "Your Documents":
        return <Documents />;
      case "Portfolio Builder":
        return <PortfolioBuilder />;
      case "Career Preferences":
        return <CareerPreference />;
      case "Activity Log":
        return <ActivityLog />;
      case "Interview Preparation":
        return <InterviewPreparation />;
      case "Add Blogs":
        return <AddBlogType />;
      case "Blog Sections":
        return <AddBlog />;
      case "System Overview":
        return <SuperAdminOverview />;

      // case "Applied Jobs":
      //   return <CandidateAppliedJobs />;
      case "Bulk Job Upload":
        return <BulkJobUpload />;
      case "Favorite Jobs":
        return <FavoriteJobs />;

      case "Job Alert":
        return <JobAlert />;

      case "Settings":
        return <CandidateSettings />;

      case "SuperAdmin Profile":
        return <SuperAdminProfile />;

      case "Onboarding":
        return <OnboardOrgnaisation />;
      case "List of Users":
        return <ListOfUsers />;
      case "Category Sections":
        return <CategorySections />;
      case "Employer Dashboard":
        return <EmployerDashboardOverview />;
      default:
        return <CommingSoonPage />;
    }
  };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      {/* MAIN AREA */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-white border rounded-lg shadow-sm">
          <DashboardSidebar
            active={activeTab}
            setActive={setActiveTab}
            sidebarTabs={sidebarTabs}
            role={role}
          />
        </div>

        {/* CONTENT — ONLY SCROLLER */}
        <div className="flex-1 h-full">
          <div className="custom-scrollbar">{renderContent()}</div>
        </div>
      </div>

      {/* FOOTER — NEVER SCROLLS */}
      <div className="flex-shrink-0">
        <EmployerFooter />
      </div>
    </div>
  );
};

export default DashboardInner;
