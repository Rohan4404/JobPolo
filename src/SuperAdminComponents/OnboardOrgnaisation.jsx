import React, { useState, useEffect } from "react";
import {
  FaRegHandPointRight,
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import { sendOtp } from "../api/authService";
import { employeerRegister } from "../api/service2";
import { toast } from "react-toastify";
import { DashboardCard } from "../components/dashboard/DashboardUI";

export default function EmployerOnboard() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [loading, setLoading] = useState(false);

  const [role, setRole] = useState("SUPER_ADMIN");

  const [formData, setFormData] = useState({
    role: role,
    email: "",
    firstName: "",
    lastName: "",
    countryCode: "+91",
    mobileNumber: "",
    alternativeMobileNumber: "",
    city: "",
    state: "",
    country: "India",
    pincode: "",
    linkedinUrl: "",
    TCPolicy: false,
    password: "",
    confirmPassword: "",
    otp: "",

    // Employer
    companyName: "",
    industry: "",
    functionArea: "",

    // Employee
    skills: "",
    experience: "",
    empIndustry: "",
    empFunctionArea: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRoleChange = (e) => {
    const selectedRole = e.target.value;
    setRole(selectedRole);
    setFormData((prev) => ({ ...prev, role: selectedRole }));
  };

  const handleSendOtp = async () => {
    if (!formData.email) {
      toast.error("Please enter email first.");
      return;
    }
    try {
      setSendingOtp(true);
      const res = await sendOtp(formData.email, "EMPLOYER-REGISTER");
      toast.success(res.message || "OTP sent successfully!");
    } catch (err) {
      toast.error(err.message || "Failed to send OTP.");
    } finally {
      setSendingOtp(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword)
      return toast.error("Passwords do not match!");

    if (!formData.TCPolicy)
      return toast.error("You must accept Terms & Conditions.");

    let payload = {
      role: role,
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      countryCode: formData.countryCode,
      mobileNumber: formData.mobileNumber,
      alternativeMobileNumber: formData.alternativeMobileNumber,
      city: formData.city,
      state: formData.state,
      country: formData.country,
      pincode: formData.pincode,
      linkedinUrl: formData.linkedinUrl,
      TCPolicy: formData.TCPolicy,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      otp: formData.otp,
    };

    if (role === "EMPLOYER") {
      payload.companyName = formData.companyName;
      payload.industry = formData.industry;
      payload.functionArea = formData.functionArea;
    }

    if (role === "EMPLOYEE") {
      payload.skills = formData.skills.split(",").map((s) => s.trim());
      payload.experience = formData.experience;
      payload.industry = formData.empIndustry;
      payload.functionArea = formData.empFunctionArea;
    }

    try {
      setLoading(true);
      const res = await employeerRegister(payload);
      toast.success(res.message || "User registered successfully!");
    } catch (err) {
      toast.error(err.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardCard padding={false} fill className="overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 shadow-sm px-4 sm:px-6 py-4 sm:py-5 rounded-t-xl flex-shrink-0">
        <div className="flex items-center gap-3">
          <FaUser className="text-white text-2xl sm:text-3xl flex-shrink-0" />
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
            Registration Form
          </h2>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="dashboard-nested-scroll bg-white shadow-sm rounded-b-xl p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8"
      >
          {/* Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-start">
            {/* ROLE */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Role <span className="text-red-500">*</span>
              </label>
              <select
                name="role"
                value={role}
                onChange={handleRoleChange}
                className="border-2 border-indigo-200 rounded-xl px-4 py-3 w-full 
                focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none"
              >
                <option value="EMPLOYER">Employer</option>
                <option value="EMPLOYEE">Employee</option>
                <option value="SUPER_ADMIN">Super Admin</option>
              </select>
            </div>

            {/* EMAIL + OTP Button */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="border-2 border-indigo-200 rounded-xl px-4 py-3 w-full pr-32 
                    focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none"
                required
              />
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={sendingOtp}
                className={`absolute right-2 top-9 text-white px-4 py-2 rounded-lg text-sm 
                    ${
                      sendingOtp
                        ? "bg-indigo-300"
                        : "bg-indigo-600 hover:bg-indigo-700"
                    }`}
              >
                {sendingOtp ? "Sending..." : "Send OTP"}
              </button>
            </div>

            {/* OTP */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                OTP <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                value={formData.otp}
                onChange={handleChange}
                className="border-2 border-indigo-200 rounded-xl px-4 py-3 w-full
                  focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none"
                required
              />
            </div>

            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={handleChange}
                className="border-2 border-indigo-200 rounded-xl px-4 py-3 w-full"
                required
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={handleChange}
                className="border-2 border-indigo-200 rounded-xl px-4 py-3 w-full"
                required
              />
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <select
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                  className="border-2 border-indigo-200 rounded-xl px-3 py-3"
                >
                  <option value="+91">+91</option>
                </select>
                <input
                  type="text"
                  name="mobileNumber"
                  placeholder="Enter mobile number"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  className="flex-1 border-2 border-indigo-200 rounded-xl px-4 py-3"
                  required
                />
              </div>
            </div>

            {/* Alternative Mobile */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Alternative Mobile Number
              </label>
              <input
                type="text"
                name="alternativeMobileNumber"
                placeholder="Enter alternative number"
                value={formData.alternativeMobileNumber}
                onChange={handleChange}
                className="border-2 border-indigo-200 rounded-xl px-4 py-3 w-full"
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="city"
                placeholder="Enter city"
                value={formData.city}
                onChange={handleChange}
                className="border-2 border-indigo-200 rounded-xl px-4 py-3 w-full"
                required
              />
            </div>

            {/* State */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="state"
                placeholder="Enter state"
                value={formData.state}
                onChange={handleChange}
                className="border-2 border-indigo-200 rounded-xl px-4 py-3 w-full"
                required
              />
            </div>

            {/* Pincode */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pincode <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="pincode"
                placeholder="Enter pincode"
                value={formData.pincode}
                onChange={handleChange}
                className="border-2 border-indigo-200 rounded-xl px-4 py-3 w-full"
                required
              />
            </div>

            {/* Country (Read-only) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={formData.country}
                readOnly
                className="border-2 border-indigo-200 rounded-xl px-4 py-3 w-full bg-gray-100"
              />
            </div>

            {/* LinkedIn URL */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                LinkedIn Profile URL
              </label>
              <input
                type="text"
                name="linkedinUrl"
                placeholder="https://linkedin.com/in/your-profile"
                value={formData.linkedinUrl}
                onChange={handleChange}
                className="border-2 border-indigo-200 rounded-xl px-4 py-3 w-full"
              />
            </div>

            {/* ================= EMPLOYER FIELDS ================= */}
            {role === "EMPLOYER" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    placeholder="Enter company name"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="border-2 border-indigo-200 rounded-xl px-4 py-3 w-full"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Industry <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="industry"
                    placeholder="e.g., IT, Finance, Healthcare"
                    value={formData.industry}
                    onChange={handleChange}
                    className="border-2 border-indigo-200 rounded-xl px-4 py-3 w-full"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Function Area <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="functionArea"
                    placeholder="e.g., HR, Marketing, Engineering"
                    value={formData.functionArea}
                    onChange={handleChange}
                    className="border-2 border-indigo-200 rounded-xl px-4 py-3 w-full"
                    required
                  />
                </div>
              </>
            )}

            {/* ================= EMPLOYEE FIELDS ================= */}
            {role === "EMPLOYEE" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Skills (comma separated)
                  </label>
                  <input
                    type="text"
                    name="skills"
                    placeholder="e.g., React, Node.js, Python"
                    value={formData.skills}
                    onChange={handleChange}
                    className="border-2 border-indigo-200 rounded-xl px-4 py-3 w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Experience (in years)
                  </label>
                  <input
                    type="number"
                    name="experience"
                    placeholder="e.g., 5"
                    value={formData.experience}
                    onChange={handleChange}
                    className="border-2 border-indigo-200 rounded-xl px-4 py-3 w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Industry
                  </label>
                  <input
                    type="text"
                    name="empIndustry"
                    placeholder="e.g., Software, Manufacturing"
                    value={formData.empIndustry}
                    onChange={handleChange}
                    className="border-2 border-indigo-200 rounded-xl px-4 py-3 w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Function Area
                  </label>
                  <input
                    type="text"
                    name="empFunctionArea"
                    placeholder="e.g., Development, Sales"
                    value={formData.empFunctionArea}
                    onChange={handleChange}
                    className="border-2 border-indigo-200 rounded-xl px-4 py-3 w-full"
                  />
                </div>
              </>
            )}

            {/* PASSWORD */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-3.5 text-indigo-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 border-2 border-indigo-200 rounded-xl px-4 py-3"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-indigo-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-3.5 text-indigo-500" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Re-enter password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 border-2 border-indigo-200 rounded-xl px-4 py-3"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3.5 text-indigo-600"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
          </div>

          {/* T&C */}
          <label className="flex items-center gap-3 mt-6 cursor-pointer">
            <input
              type="checkbox"
              name="TCPolicy"
              checked={formData.TCPolicy}
              onChange={handleChange}
              className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
              required
            />
            <span className="text-sm text-gray-700">
              I accept the <strong>Terms & Conditions</strong> and{" "}
              <strong>Privacy Policy</strong>
            </span>
          </label>

          {/* SUBMIT */}
          <div className="flex justify-start pt-6">
            <button
              type="submit"
              disabled={loading}
              className={`flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 ${
                loading
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white hover:from-blue-700 hover:via-blue-600 hover:to-indigo-700"
              }`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  Submitting...
                </>
              ) : (
                <>
                  Register
                  <FaRegHandPointRight className="text-xl" />
                </>
              )}
            </button>
          </div>
        </form>
    </DashboardCard>
  );
}
// import React, { useState } from "react";
// import {
//   FaRegHandPointRight,
//   FaUser,
//   FaLock,
//   FaEye,
//   FaEyeSlash,
// } from "react-icons/fa";

// import { sendOtp } from "../api/authService";
// import { employeerRegister } from "../api/service2";
// import { toast } from "react-toastify";

// export default function EmployerOnboard() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [sendingOtp, setSendingOtp] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     email: "",
//     firstName: "",
//     lastName: "",
//     countryCode: "+91",
//     mobileNumber: "",
//     companyName: "",
//     city: "",
//     state: "",
//     country: "INDIA",
//     pincode: "",
//     industry: "",
//     functionArea: "",
//     password: "",
//     confirmPassword: "",
//     otp: "",
//     TCPolicy: false,
//   });

//   /* --------- HANDLE CHANGE --------- */
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   /* --------- SEND OTP --------- */
//   const handleSendOtp = async () => {
//     if (!formData.email) {
//       toast.error("Please enter email first.");
//       return;
//     }

//     try {
//       setSendingOtp(true);
//       const res = await sendOtp(formData.email, "EMPLOYER-REGISTER");

//       console.log("Response otp os", res);
//       toast.success(res.message || "OTP sent successfully!");
//     } catch (err) {
//       toast.error(err.message || "Failed to send OTP.");
//     } finally {
//       setSendingOtp(false);
//     }
//   };

//   /* --------- SUBMIT --------- */
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.password !== formData.confirmPassword) {
//       toast.error("Passwords do not match!");
//       return;
//     }

//     if (!formData.TCPolicy) {
//       toast.error("You must accept Terms & Conditions.");
//       return;
//     }

//     setLoading(true);
//     const fd = new FormData();

//     Object.entries(formData).forEach(([key, value]) => {
//       fd.append(key, value);
//     });

//     try {
//       const res = await employeerRegister(fd);
//       toast.success(res.message || "Employer registered successfully!");
//     } catch (err) {
//       toast.error(err.message || "Registration failed!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 ">
//       <div className=" mx-auto ">
//         {/* Header */}
//         <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 shadow-xl p-6 rounded-t-xl relative overflow-hidden">
//           <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
//           <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-24 -mb-24"></div>
//           <div className="relative z-10 flex items-center gap-3">
//             <FaUser className="text-white text-3xl" />
//             <h1 className="text-4xl font-bold text-white">
//               Employer Onboarding
//             </h1>
//           </div>
//           <p className="text-blue-100 text-xl mt-1 text-start">
//             Register your employer account
//           </p>
//         </div>

//         {/* FORM */}
//         <form
//           onSubmit={handleSubmit}
//           className="bg-white shadow-xl p-6 rounded-b-xl space-y-8 overflow-y-auto max-h-[71vh] custom-scrollbar"
//         >
//           {/* ==================== REGISTRATION ==================== */}
//           <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
//             <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
//               <FaUser className="text-indigo-600" />
//               Employer Details
//             </h3>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {/* Email + Send OTP Button (SAME CSS) */}
//               <div className="relative md:col-span-2">
//                 <input
//                   type="email"
//                   name="email"
//                   placeholder="Email *"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="border-2 border-indigo-200 rounded-xl px-4 py-3 w-full pr-32
//                   focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={handleSendOtp}
//                   disabled={sendingOtp}
//                   className={`absolute right-2 top-[6px] text-white px-4 py-2 rounded-lg text-sm
//                     ${
//                       sendingOtp
//                         ? "bg-indigo-300"
//                         : "bg-indigo-600 hover:bg-indigo-700"
//                     }`}
//                 >
//                   {sendingOtp ? "Sending..." : "Send OTP"}
//                 </button>
//               </div>

//               {/* OTP */}
//               <input
//                 type="text"

//                 name="otp"
//                 placeholder="OTP *"
//                 value={formData.otp}
//                 onChange={handleChange}
//                 className="border-2 border-indigo-200 rounded-xl px-4 py-3
//                 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none"
//                 required
//               />

//               {/* First / Last Name */}
//               <input
//                 type="text"
//                 name="firstName"
//                 placeholder="First Name *"
//                 value={formData.firstName}
//                 onChange={handleChange}
//                 className="border-2 border-indigo-200 rounded-xl px-4 py-3"
//                 required
//               />
//               <input
//                 type="text"
//                 name="lastName"
//                 placeholder="Last Name *"
//                 value={formData.lastName}
//                 onChange={handleChange}
//                 className="border-2 border-indigo-200 rounded-xl px-4 py-3"
//                 required
//               />

//               {/* Mobile */}
//               <div className="flex gap-2">
//                 <select
//                   name="countryCode"
//                   value={formData.countryCode}
//                   onChange={handleChange}
//                   className="border-2 border-indigo-200 rounded-xl px-3 py-3"
//                 >
//                   <option value="+91">+91</option>
//                 </select>
//                 <input
//                   type="text"
//                   name="mobileNumber"
//                   placeholder="Mobile Number *"
//                   value={formData.mobileNumber}
//                   onChange={handleChange}
//                   className="flex-1 border-2 border-indigo-200 rounded-xl px-4 py-3"
//                   required
//                 />
//               </div>

//               {/* Company Name */}
//               <input
//                 type="text"
//                 name="companyName"
//                 placeholder="Company Name *"
//                 value={formData.companyName}
//                 onChange={handleChange}
//                 className="border-2 border-indigo-200 rounded-xl px-4 py-3"
//                 required
//               />

//               {/* Address Fields */}
//               <input
//                 type="text"
//                 name="city"
//                 placeholder="City *"
//                 value={formData.city}
//                 onChange={handleChange}
//                 className="border-2 border-indigo-200 rounded-xl px-4 py-3"
//                 required
//               />
//               <input
//                 type="text"
//                 name="state"
//                 placeholder="State *"
//                 value={formData.state}
//                 onChange={handleChange}
//                 className="border-2 border-indigo-200 rounded-xl px-4 py-3"
//                 required
//               />

//               <input
//                 type="text"
//                 name="pincode"
//                 placeholder="Pincode *"
//                 value={formData.pincode}
//                 onChange={handleChange}
//                 className="border-2 border-indigo-200 rounded-xl px-4 py-3"
//                 required
//               />
//               <input
//                 type="text"
//                 name="country"
//                 value={formData.country}
//                 readOnly
//                 className="border-2 border-indigo-200 rounded-xl px-4 py-3 bg-gray-100"
//               />

//               {/* Industry / Function */}
//               <input
//                 type="text"
//                 name="industry"
//                 placeholder="Industry *"
//                 value={formData.industry}
//                 onChange={handleChange}
//                 className="border-2 border-indigo-200 rounded-xl px-4 py-3"
//                 required
//               />
//               <input
//                 type="text"
//                 name="functionArea"
//                 placeholder="Function Area *"
//                 value={formData.functionArea}
//                 onChange={handleChange}
//                 className="border-2 border-indigo-200 rounded-xl px-4 py-3"
//                 required
//               />

//               {/* Password */}
//               <div className="relative">
//                 <FaLock className="absolute left-3 top-3.5 text-indigo-500" />

//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   placeholder="Password *"
//                   value={formData.password}
//                   onChange={handleChange}
//                   className="w-full pl-10 pr-12 border-2 border-indigo-200 rounded-xl px-4 py-3"
//                   required
//                 />

//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-3.5 text-indigo-600"
//                 >
//                   {showPassword ? <FaEyeSlash /> : <FaEye />}
//                 </button>
//               </div>

//               {/* Confirm Password */}
//               <div className="relative">
//                 <FaLock className="absolute left-3 top-3.5 text-indigo-500" />

//                 <input
//                   type={showConfirmPassword ? "text" : "password"}
//                   name="confirmPassword"
//                   placeholder="Confirm Password *"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   className="w-full pl-10 pr-12 border-2 border-indigo-200 rounded-xl px-4 py-3"
//                   required
//                 />

//                 <button
//                   type="button"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   className="absolute right-3 top-3.5 text-indigo-600"
//                 >
//                   {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
//                 </button>
//               </div>
//             </div>

//             {/* T&C */}
//             <label className="flex items-center gap-2 mt-4 cursor-pointer">
//               <input
//                 type="checkbox"
//                 name="TCPolicy"
//                 checked={formData.TCPolicy}
//                 onChange={handleChange}
//                 className="w-5 h-5 text-indigo-600 rounded"
//                 required
//               />
//               <span className="text-sm text-gray-700">
//                 I accept the <strong>Terms & Conditions</strong> and{" "}
//                 <strong>Privacy Policy</strong>
//               </span>
//             </label>
//           </div>

//           {/* SUBMIT */}
//           <div className="flex justify-start pt-4">
//             <button
//               type="submit"
//               disabled={loading}
//               className={`flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 ${
//                 loading
//                   ? "bg-gray-400 text-white cursor-not-allowed"
//                   : "bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white hover:from-blue-700 hover:via-blue-600 hover:to-indigo-700"
//               }`}
//             >
//               {loading ? (
//                 <>
//                   <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
//                   Submitting...
//                 </>
//               ) : (
//                 <>
//                   Register
//                   <FaRegHandPointRight className="text-xl" />
//                 </>
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
