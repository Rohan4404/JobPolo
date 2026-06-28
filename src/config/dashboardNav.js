export function tabToSlug(tab) {
  return tab
    .toLowerCase()
    .replace(/'/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const SIDEBAR_TABS_BY_ROLE = {
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
  ADMIN: ["Admin Overview", "Manage Employers", "Manage Employees", "Reports"],
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
    "Payment Plans",
    "Transactions History",
    "Employer Billing Overview",
    "Invoice Management",
    "Send Notifications",
  ],
};

export const EMPLOYER_SECTIONS = {
  Dashboard: ["Employer Dashboard", "Employer Profile"],
  Jobs: ["Post a Job", "My Jobs", "Job Applications", "Saved Candidates"],
  Management: ["Recruiter Management", "Candidate Search", "Messages"],
  Billing: ["Subscription & Billing", "Reports & Analytics"],
};

export const SUPER_ADMIN_SECTIONS = {
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

export const EMPLOYEE_JOB_TABS = [
  "Jobs",
  "Recommended Jobs",
  "Saved Jobs",
  "Applied Jobs",
];

export const EMPLOYEE_TOOL_TABS = [
  "Resume Builder",
  "Portfolio Builder",
  "Job Alert",
  "Interview Preparation",
  "Activity Log",
];

export const EMPLOYEE_AI_TABS = [
  "Apply Jobs with AI",
  "AI Resume Reviewer",
  "AI Cover Letter Writer",
];

export function getDefaultSlugForRole(role) {
  const tabs = SIDEBAR_TABS_BY_ROLE[role] || ["Overview"];
  return tabToSlug(tabs[0]);
}

export function getTabFromSlug(slug) {
  const allTabs = Object.values(SIDEBAR_TABS_BY_ROLE).flat();
  return allTabs.find((tab) => tabToSlug(tab) === slug) || null;
}

export function getDashboardPath(tab) {
  return `/dashboard/${tabToSlug(tab)}`;
}

export function isTabAllowedForRole(tab, role) {
  const tabs = SIDEBAR_TABS_BY_ROLE[role] || [];
  return tabs.includes(tab);
}
