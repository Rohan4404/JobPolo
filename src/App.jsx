import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import EmployerDashbord from "./employerpages/EmployerDashbord";
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
import DashboardInner from "./employercomponets/DashboardInner";
import ProtectedRoute from "./components/ProtectedRoute";
import NotificationsPage from "./pages/NotificationsPage";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmployerSettings from "./employercomponets/EmployerSettings";

const App = () => {
  return (
    <>
      {/* ✅ Global Toast Notification Handler */}
      <ToastContainer
        position="top-right"
        autoClose={2500}
        pauseOnHover
        theme="colored"
      />

      <Suspense
        fallback={
          <div className="text-white font-bold w-full text-6xl flex items-center justify-center h-screen">
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
                <EmployerDashbord />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard-inner"
            element={
              <ProtectedRoute>
                <DashboardInner />
              </ProtectedRoute>
            }
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
          <Route path="*" element={<PageNotFound />} />
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
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
