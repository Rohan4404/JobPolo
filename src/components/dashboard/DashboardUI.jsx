import React from "react";

export const DASHBOARD_SUBTITLES = {
  "Employer Dashboard": "Overview of your jobs & candidates",
  "Employer Profile": "Manage your company profile and details",
  "Post a Job": "Create and publish new job openings",
  "My Jobs": "View and manage all your posted jobs",
  "All Jobs": "Browse and manage all platform jobs",
  "Admin Overview": "Platform jobs overview",
  "Job Applications": "Review and manage applicant submissions",
  "Saved Candidates": "Your shortlisted and saved candidates",
  "Profile Overview": "Your profile completion and summary",
  "Candidate Profile": "Update your personal and professional info",
  Jobs: "Discover jobs that match your skills",
  "Recommended Jobs": "Jobs curated based on your profile",
  "Saved Jobs": "Jobs you have bookmarked for later",
  "Applied Jobs": "Track your submitted applications",
  "Career Preferences": "Set your job search preferences",
  "Your Documents": "Upload and manage your documents",
  "Resume Builder": "Build a professional ATS-friendly resume",
  "Portfolio Builder": "Showcase your work and projects",
  "Job Alert": "Configure alerts for new job matches",
  "Interview Preparation": "Prepare for upcoming interviews",
  "Activity Log": "Your recent activity and updates",
  "Favorite Jobs": "Jobs marked as favorites",
  Settings: "Manage your account settings",
  "System Overview": "System overview & analytics",
  "SuperAdmin Profile": "Manage your admin profile",
  Onboarding: "Onboard new organizations",
  "List of Users": "Manage all platform users",
  "Bulk Job Upload": "Upload multiple jobs at once",
  "Category Sections": "Manage job categories",
  "Add Blogs": "Create and manage blog types",
  "Blog Sections": "Manage blog content sections",
  "Subscription & Billing": "Manage plans and billing",
  "Recruiter Management": "Manage your recruiting team",
  "Candidate Search": "Search candidates across the platform",
  "Reports & Analytics": "View performance reports",
  Messages: "Your conversations and messages",
};

/** Primary scroll region — fills remaining height below page header */
export function DashboardScrollArea({ children, className = "" }) {
  return (
    <div
      className={`dashboard-scroll-area flex-1 min-h-0 overflow-y-auto overflow-x-hidden custom-scrollbar pb-6 ${className}`}
    >
      {children}
    </div>
  );
}

/** Nested scroll inside a card/panel (toolbar fixed, body scrolls) */
export function DashboardNestedScroll({ children, className = "" }) {
  return (
    <div
      className={`dashboard-nested-scroll flex-1 min-h-0 overflow-y-auto overflow-x-hidden custom-scrollbar ${className}`}
    >
      {children}
    </div>
  );
}

export function DashboardPageShell({ title, subtitle, children, action }) {
  return (
    <div className="dashboard-page h-full min-h-0 flex flex-col overflow-hidden">
      <DashboardPageHeader title={title} subtitle={subtitle} action={action} />
      <div className="dashboard-page-body flex-1 min-h-0 flex flex-col overflow-hidden">
        {children}
      </div>
    </div>
  );
}

export function DashboardPageHeader({ title, subtitle, action }) {
  return (
    <div className="dashboard-page-header flex-shrink-0 mb-3 sm:mb-4 lg:mb-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-blue-900 truncate">
            {title}
          </h1>
          {subtitle && (
            <p className="text-blue-700 mt-1 sm:mt-2 text-sm sm:text-base">
              {subtitle}
            </p>
          )}
        </div>
        {action && <div className="flex-shrink-0">{action}</div>}
      </div>
    </div>
  );
}

export function DashboardCard({
  children,
  className = "",
  scrollable = false,
  padding = true,
  fill = false,
}) {
  return (
    <div
      className={`dashboard-card bg-white rounded-xl shadow-lg border border-blue-100 ${
        padding ? "p-4 sm:p-5 lg:p-6" : ""
      } ${fill ? "flex flex-col flex-1 min-h-0 overflow-hidden h-full" : ""} ${
        scrollable
          ? "flex flex-col flex-1 min-h-0 overflow-hidden"
          : ""
      } ${className}`}
    >
      {scrollable ? (
        <DashboardNestedScroll className={padding ? "" : "p-0"}>
          {children}
        </DashboardNestedScroll>
      ) : (
        children
      )}
    </div>
  );
}

export function DashboardSectionTitle({ children, className = "" }) {
  return (
    <h3
      className={`text-base sm:text-lg lg:text-xl font-bold text-blue-900 border-b-2 border-blue-500 pb-2 sm:pb-3 mb-3 sm:mb-4 lg:mb-5 ${className}`}
    >
      {children}
    </h3>
  );
}

export function DashboardLoader({ message = "Loading..." }) {
  return (
    <div className="dashboard-loader flex-1 flex items-center justify-center min-h-[200px]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
        <p className="text-blue-700 text-sm font-medium">{message}</p>
      </div>
    </div>
  );
}

export function DashboardStatCard({
  label,
  value,
  icon: Icon,
  iconBg = "bg-blue-100",
  iconColor = "text-blue-600",
  trend,
}) {
  return (
    <div className="dashboard-card bg-white rounded-xl shadow-lg p-4 sm:p-5 lg:p-6 border border-blue-100 hover:shadow-xl transition">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-gray-600 text-xs sm:text-sm font-medium truncate">
            {label}
          </p>
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-900 mt-1 sm:mt-2">
            {value}
          </h3>
          {trend && (
            <p className="text-green-600 text-xs sm:text-sm mt-1 sm:mt-2">
              {trend}
            </p>
          )}
        </div>
        {Icon && (
          <div className={`p-2 sm:p-3 ${iconBg} rounded-lg flex-shrink-0`}>
            <Icon className={iconColor} size={22} />
          </div>
        )}
      </div>
    </div>
  );
}

/** Wrap any page content so nested scroll always works inside the dashboard shell */
export function DashboardPageContent({ children, scroll = true, className = "" }) {
  if (scroll) {
    return (
      <DashboardScrollArea className={className}>{children}</DashboardScrollArea>
    );
  }

  return (
    <div className={`flex-1 min-h-0 flex flex-col overflow-hidden ${className}`}>
      {children}
    </div>
  );
}
