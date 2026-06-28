import React, { useEffect, useState } from "react";
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
import { NavLink, useLocation } from "react-router-dom";
import {
  SIDEBAR_TABS_BY_ROLE,
  EMPLOYER_SECTIONS,
  SUPER_ADMIN_SECTIONS,
  EMPLOYEE_JOB_TABS,
  EMPLOYEE_TOOL_TABS,
  EMPLOYEE_AI_TABS,
  getDashboardPath,
  getTabFromSlug,
} from "../config/dashboardNav";

const DashboardSidebar = ({ role, onNavigate }) => {
  const location = useLocation();
  const sidebarTabs = SIDEBAR_TABS_BY_ROLE[role] || [];
  const currentSlug = location.pathname.split("/dashboard/")[1]?.split("/")[0] || "";
  const active = getTabFromSlug(currentSlug) || sidebarTabs[0];

  const [openSections, setOpenSections] = useState({});

  useEffect(() => {
    if (role === "EMPLOYER") {
      Object.entries(EMPLOYER_SECTIONS).forEach(([key, tabs]) => {
        if (tabs.includes(active)) {
          setOpenSections((prev) => ({ ...prev, [key]: true }));
        }
      });
    }
    if (role === "SUPER_ADMIN") {
      Object.entries(SUPER_ADMIN_SECTIONS).forEach(([key, tabs]) => {
        if (tabs.includes(active)) {
          setOpenSections((prev) => ({ ...prev, [key]: true }));
        }
      });
    }
    if (role === "EMPLOYEE") {
      if (EMPLOYEE_JOB_TABS.includes(active)) {
        setOpenSections((prev) => ({ ...prev, Jobs: true }));
      }
      if (EMPLOYEE_TOOL_TABS.includes(active)) {
        setOpenSections((prev) => ({ ...prev, Tools: true }));
      }
      if (EMPLOYEE_AI_TABS.includes(active)) {
        setOpenSections((prev) => ({ ...prev, "AI Tools": true }));
      }
    }
  }, [active, role]);

  const NavItem = ({ tab, icon }) => (
    <NavLink
      to={getDashboardPath(tab)}
      end
      onClick={onNavigate}
      className={({ isActive }) =>
        `flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition text-left w-full ${
          isActive
            ? "bg-blue-600 text-white shadow-sm"
            : "text-gray-600 hover:bg-gray-100"
        }`
      }
    >
      {icon}
      <span>{tab}</span>
    </NavLink>
  );

  const SectionNavItem = ({ tab }) => (
    <NavLink
      to={getDashboardPath(tab)}
      end
      onClick={onNavigate}
      className={({ isActive }) =>
        `block px-3 py-2 rounded-lg text-sm text-left transition ${
          isActive
            ? "underline underline-offset-4 decoration-2 text-blue-600 font-semibold bg-blue-50"
            : "text-gray-600 hover:bg-gray-100"
        }`
      }
    >
      {tab}
    </NavLink>
  );

  const renderSection = (title, tabs) => {
    const isOpen = openSections[title];
    const isActiveInside = tabs.includes(active);

    return (
      <div key={title} className="mt-2">
        <button
          type="button"
          onClick={() =>
            setOpenSections((prev) => ({
              ...prev,
              [title]: !prev[title],
            }))
          }
          className={`flex items-center w-full px-3 py-2 rounded-lg transition ${
            isActiveInside
              ? "bg-blue-50 text-blue-600"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <span className="text-sm font-medium text-left flex-1">{title}</span>
          {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>

        <div
          className={`overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-96 opacity-100 mt-1" : "max-h-0 opacity-0"
          }`}
        >
          <div className="space-y-1 pl-3">
            {tabs.map((tab) => (
              <SectionNavItem key={tab} tab={tab} />
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderEmpSection = (title, tabs, icon, keyName) => {
    const isOpen = openSections[keyName];

    return (
      <div key={keyName} className="mt-2">
        <button
          type="button"
          onClick={() =>
            setOpenSections((prev) => ({
              ...prev,
              [keyName]: !prev[keyName],
            }))
          }
          className="flex items-center w-full px-3 py-2 rounded-lg hover:bg-gray-100 transition"
        >
          {icon}
          <span className="ml-2 text-sm font-medium text-left flex-1">
            {title}
          </span>
          {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>

        {isOpen && (
          <div className="ml-4 sm:ml-6 space-y-1 mt-1">
            {tabs.map((tab) => (
              <NavItem key={tab} tab={tab} />
            ))}
          </div>
        )}
      </div>
    );
  };

  const iconMap = {
    "Profile Overview": <User size={16} />,
    "Candidate Profile": <ShieldUser size={16} />,
    "Career Preferences": <Target size={16} />,
    "Your Documents": <Folder size={16} />,
  };

  if (role === "EMPLOYEE") {
    return (
      <div className="flex flex-col h-full p-3 sm:p-4 overflow-hidden">
        <div className="text-sm font-semibold text-gray-500 mb-4 border-b pb-3 text-left">
          Candidate Dashboard
        </div>

        <nav className="flex-1 overflow-y-auto custom-scrollbar space-y-1 pr-1">
          {sidebarTabs
            .filter(
              (tab) =>
                ![
                  ...EMPLOYEE_JOB_TABS,
                  ...EMPLOYEE_TOOL_TABS,
                  ...EMPLOYEE_AI_TABS,
                ].includes(tab),
            )
            .map((tab) => (
              <NavItem key={tab} tab={tab} icon={iconMap[tab] || <User size={16} />} />
            ))}

          {renderEmpSection(
            "My Jobs",
            EMPLOYEE_JOB_TABS,
            <Briefcase size={16} />,
            "Jobs",
          )}
          {renderEmpSection(
            "Tools",
            EMPLOYEE_TOOL_TABS,
            <FileText size={16} />,
            "Tools",
          )}
          {renderEmpSection(
            "AI Tools",
            EMPLOYEE_AI_TABS,
            <Brain size={16} />,
            "AI Tools",
          )}
        </nav>
      </div>
    );
  }

  if (role === "EMPLOYER") {
    return (
      <div className="flex flex-col h-full p-3 sm:p-4 overflow-hidden">
        <div className="text-sm font-semibold text-gray-500 mb-4 border-b pb-3 text-left">
          Employer Dashboard
        </div>

        <nav className="flex-1 overflow-y-auto custom-scrollbar pr-1">
          {Object.entries(EMPLOYER_SECTIONS).map(([title, tabs]) =>
            renderSection(title, tabs),
          )}
        </nav>
      </div>
    );
  }

  if (role === "SUPER_ADMIN") {
    return (
      <div className="flex flex-col h-full p-3 sm:p-4 overflow-hidden">
        <div className="text-sm font-semibold text-gray-500 mb-4 border-b pb-3 text-left">
          Super Admin Dashboard
        </div>

        <nav className="flex-1 overflow-y-auto custom-scrollbar pr-1">
          {Object.entries(SUPER_ADMIN_SECTIONS).map(([title, tabs]) =>
            renderSection(title, tabs),
          )}
        </nav>
      </div>
    );
  }

  if (role === "ADMIN") {
    return (
      <div className="flex flex-col h-full p-3 sm:p-4 overflow-hidden">
        <div className="text-sm font-semibold text-gray-500 mb-4 border-b pb-3 text-left">
          Admin Dashboard
        </div>

        <nav className="flex-1 overflow-y-auto custom-scrollbar space-y-1 pr-1">
          {sidebarTabs.map((tab) => (
            <NavItem key={tab} tab={tab} />
          ))}
        </nav>
      </div>
    );
  }

  return null;
};

export default DashboardSidebar;
