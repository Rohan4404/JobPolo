import React, { useEffect, useState } from "react";
import {
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import EmployerHeader from "../employercomponets/EmployerHeader";
import DashboardSidebar from "../employercomponets/DashboardSidebar";
import EmployerFooter from "../employercomponets/EmployerFooter";
import CommingSoonPage from "../employercomponets/CommingSoonPage";
import {
  getDefaultSlugForRole,
  tabToSlug,
} from "../config/dashboardNav";

export function DashboardRedirect() {
  const role = sessionStorage.getItem("role");
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const tabFromQuery = params.get("tab");

  if (tabFromQuery) {
    return <Navigate to={`/dashboard/${tabToSlug(tabFromQuery)}`} replace />;
  }

  return <Navigate to={`/dashboard/${getDefaultSlugForRole(role)}`} replace />;
}

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const role = sessionStorage.getItem("role");

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabFromQuery = params.get("tab");

    if (tabFromQuery && location.pathname === "/dashboard") {
      navigate(`/dashboard/${tabToSlug(tabFromQuery)}`, { replace: true });
    }
  }, [location.search, location.pathname, navigate]);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    html.classList.add("dashboard-active");
    body.classList.add("dashboard-active");

    return () => {
      html.classList.remove("dashboard-active");
      body.classList.remove("dashboard-active");
    };
  }, []);

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden bg-gray-50">
      <EmployerHeader
        onMenuToggle={() => setSidebarOpen((prev) => !prev)}
        sidebarOpen={sidebarOpen}
      />

      <div className="flex flex-1 min-h-0 overflow-hidden">
        {sidebarOpen && (
          <button
            type="button"
            aria-label="Close sidebar"
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside
          className={`
            flex-shrink-0
            w-64 sm:w-72 lg:w-64 xl:w-72
            bg-white border-r shadow-lg lg:shadow-none
            flex flex-col overflow-hidden
            fixed lg:relative inset-y-0 left-0 z-50 lg:z-auto
            top-[57px] sm:top-[65px] lg:top-auto
            bottom-0 lg:bottom-auto
            h-auto lg:h-full
            transform transition-transform duration-300 ease-in-out lg:transform-none
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          `}
        >
          <DashboardSidebar
            role={role}
            onNavigate={() => setSidebarOpen(false)}
          />
        </aside>

        <main className="flex-1 flex flex-col min-w-0 min-h-0 overflow-hidden w-full">
          <div className="flex-1 min-h-0 overflow-hidden">
            <div className="h-full min-h-0 overflow-hidden">
              <Outlet context={{ role }} />
            </div>
          </div>

          <div className="flex-shrink-0 border-t bg-white">
            <EmployerFooter />
          </div>
        </main>
      </div>
    </div>
  );
};

export function DashboardComingSoon() {
  return <CommingSoonPage />;
}

export default DashboardLayout;
