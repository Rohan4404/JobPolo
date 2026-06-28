import React from "react";
import { Navigate, useParams } from "react-router-dom";
import {
  getDefaultSlugForRole,
  getTabFromSlug,
  isTabAllowedForRole,
} from "../config/dashboardNav";
import { DashboardComingSoon } from "../layouts/DashboardLayout";
import {
  DashboardPageShell,
  DashboardPageContent,
  DASHBOARD_SUBTITLES,
} from "../components/dashboard/DashboardUI";
import EmployerProfile from "../employercomponets/EmployerProfile";
import PostAJob from "../employercomponets/PostAJob";
import MyJobs from "../employercomponets/MyJobs";
import JobApplications from "../employercomponets/JobApplications";
import SavedCandidate from "../employercomponets/SavedCandidate";
import EmployerDashboardOverview from "../employercomponets/EmployerDashboardOverview";
import CandidateProfile from "../candidatecomponents/CandidateProfile";
import FavoriteJobs from "../candidatecomponents/FavoriteJobs";
import JobAlert from "../candidatecomponents/JobAlert";
import CandidateSettings from "../candidatecomponents/CandidateSettings";
import SuperAdminProfile from "../employercomponets/SuperAdminProfile";
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

const TAB_COMPONENTS = {
  "Employer Dashboard": EmployerDashboardOverview,
  "Employer Profile": EmployerProfile,
  "Post a Job": PostAJob,
  "My Jobs": MyJobs,
  "All Jobs": MyJobs,
  "Admin Overview": MyJobs,
  "Job Applications": JobApplications,
  "Saved Candidates": SavedCandidate,
  "Profile Overview": ProfileOverview,
  "Candidate Profile": CandidateProfile,
  Jobs: CandidateJobsPage,
  "Recommended Jobs": RecommendedJobs,
  "Saved Jobs": SavedJobs,
  "Applied Jobs": AppliedJobsPage,
  "Career Preferences": CareerPreference,
  "Your Documents": Documents,
  "Resume Builder": ResumeBuilder,
  "Portfolio Builder": PortfolioBuilder,
  "Job Alert": JobAlert,
  "Interview Preparation": InterviewPreparation,
  "Activity Log": ActivityLog,
  "Favorite Jobs": FavoriteJobs,
  Settings: CandidateSettings,
  "System Overview": SuperAdminOverview,
  "SuperAdmin Profile": SuperAdminProfile,
  Onboarding: OnboardOrgnaisation,
  "List of Users": ListOfUsers,
  "Bulk Job Upload": BulkJobUpload,
  "Category Sections": CategorySections,
  "Add Blogs": AddBlogType,
  "Blog Sections": AddBlog,
};

const COMING_SOON_TABS = new Set([
  "Subscription & Billing",
  "Recruiter Management",
  "Candidate Search",
  "Reports & Analytics",
  "Messages",
  "Apply Jobs with AI",
  "AI Resume Reviewer",
  "AI Cover Letter Writer",
  "Manage Employers",
  "Manage Employees",
  "Reports",
  "Payment Plans",
  "Transactions History",
  "Employer Billing Overview",
  "Invoice Management",
  "Send Notifications",
]);

/** Pages with fixed toolbar + nested scroll body only */
const SELF_SCROLL_TABS = new Set([
  "My Jobs",
  "All Jobs",
  "Admin Overview",
  "Job Applications",
  "Onboarding",
  "List of Users",
]);

export default function DashboardContent() {
  const { slug } = useParams();
  const role = sessionStorage.getItem("role");
  const tab = getTabFromSlug(slug);

  if (!slug || !tab || !isTabAllowedForRole(tab, role)) {
    return (
      <Navigate to={`/dashboard/${getDefaultSlugForRole(role)}`} replace />
    );
  }

  if (COMING_SOON_TABS.has(tab)) {
    return (
      <div className="dashboard-slot h-full min-h-0 overflow-hidden flex flex-col text-left">
        <DashboardPageShell title={tab} subtitle={DASHBOARD_SUBTITLES[tab] || ""}>
          <DashboardPageContent scroll={false}>
            <DashboardComingSoon />
          </DashboardPageContent>
        </DashboardPageShell>
      </div>
    );
  }

  let content;

  if (tab === "Employer Profile") {
    content = <EmployerProfile role={role} />;
  } else {
    const Component = TAB_COMPONENTS[tab];
    content = Component ? <Component /> : <DashboardComingSoon />;
  }

  const useShellScroll = !SELF_SCROLL_TABS.has(tab);

  return (
    <div className="dashboard-slot h-full min-h-0 overflow-hidden flex flex-col text-left">
      <DashboardPageShell
        title={tab}
        subtitle={DASHBOARD_SUBTITLES[tab] || ""}
      >
        <DashboardPageContent scroll={useShellScroll}>
          {content}
        </DashboardPageContent>
      </DashboardPageShell>
    </div>
  );
}
