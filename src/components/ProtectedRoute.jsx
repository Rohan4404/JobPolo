// import React from "react";
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ element: Component, allowedRoles }) => {
//   const token = sessionStorage.getItem("token");
//   const role = sessionStorage.getItem("role");

//   // ⛔ If not logged in, redirect to login page
//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }

//   // ⛔ If logged in but role not allowed
//   if (!allowedRoles.includes(role)) {
//     alert("Access denied! You are not authorized to view this page.");
//     return <Navigate to="/" replace />;
//   }

//   // ✅ Authorized → Show Component
//   return <Component />;
// };

// export default ProtectedRoute;


import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");

  // ⛔ Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // ⛔ If roles provided → restrict
  if (allowedRoles && !allowedRoles.includes(role)) {
    alert("Access denied! You are not authorized to view this page.");
    return <Navigate to="/" replace />;
  }

  // ✅ Allow access
  return children;
};

export default ProtectedRoute;