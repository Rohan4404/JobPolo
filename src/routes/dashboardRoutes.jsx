import React from "react";
import { Route } from "react-router-dom";
import { DashboardRedirect } from "../layouts/DashboardLayout";
import DashboardContent from "./DashboardContent";

export const dashboardChildRoutes = (
  <>
    <Route index element={<DashboardRedirect />} />
    <Route path=":slug" element={<DashboardContent />} />
  </>
);
