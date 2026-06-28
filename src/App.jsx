import React, { Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import PageNotFound from "./pages/pageNotFound";
import CreateAccount from "./pages/CreateAccount";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import SignIn from "./pages/SignIn";
import AboutUs from "./pages/AboutUs";
import JobsPage from "./pages/JobsPage";
import JobDetailPage from "./pages/JobDetailPage";
import ContactUsPage from "./pages/ContactUsPage";
import PrivacyPolicy from "./pages/PrivacyPolicyPage";
import TermsConditions from "./pages/Terms&Condition";
import ProtectedRoute from "./components/ProtectedRoute";
import NotificationsPage from "./pages/NotificationsPage";
import DashboardLayout from "./layouts/DashboardLayout";
import { dashboardChildRoutes } from "./routes/dashboardRoutes";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmployerSettings from "./employercomponets/EmployerSettings";

const App = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        pauseOnHover
        theme="colored"
      />

      <Suspense
        fallback={
          <div className="text-white font-bold w-full text-2xl sm:text-4xl md:text-6xl flex items-center justify-center min-h-screen">
            Loading...
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            {dashboardChildRoutes}
          </Route>
          <Route
            path="/dashboard-inner"
            element={<Navigate to="/dashboard" replace />}
          />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/job-details" element={<JobDetailPage />} />
          <Route path="/contact-us" element={<ContactUsPage />} />
          <Route path="/register" element={<CreateAccount />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms&condition" element={<TermsConditions />} />
          <Route
            path="/employer/settings"
            element={
              <ProtectedRoute>
                <EmployerSettings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <NotificationsPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
