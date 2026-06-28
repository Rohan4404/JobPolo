import React, { useState, useRef, useEffect } from "react";
import { TfiEmail } from "react-icons/tfi";
import { FaBell, FaUser, FaEye, FaEyeSlash } from "react-icons/fa6";
import { FaRegUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { IoMdSettings } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";
import { sendOtp } from "../api/authService";
import { resetPassword } from "../api/service2";

import { useSelector } from "react-redux";

function EmployerHeader() {
  const { firstName, lastName, role } = useSelector((state) => state.user);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
const notificationRef = useRef(null);

  const [resetFormData, setResetFormData] = useState({
    password: "",
    confirmPassword: "",
    otp: "",
  });
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setIsDropdownOpen(false);
    }

    if (
      notificationRef.current &&
      !notificationRef.current.contains(event.target)
    ) {
      setShowNotifications(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);

  const handleLogout = () => {
    sessionStorage.clear();
    toast.info("You have been logged out successfully.");
    navigate("/");
  };

  const handleResetPassword = () => {
    setIsDropdownOpen(false);
    setShowResetModal(true);
  };

  // const handleSettings = () => {
  //   navigate("/employer/settings"); // your route
  //   setIsDropdownOpen(false);
  // };

  const handleSettings = () => {
    const role = sessionStorage.getItem("role");

    if (role === "SUPER_ADMIN" || role === "EMPLOYER") {
      navigate("/employer/settings");
    }

    setIsDropdownOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setResetFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSendOtp = async () => {
    const email = sessionStorage.getItem("email");

    if (!email) {
      toast.error("Email not found in session!");
      return;
    }

    try {
      setOtpLoading(true);
      toast.info("Sending OTP...");
      const res = await sendOtp(email, "RESET-PASSWORD");
      toast.success(res.message || "OTP sent successfully");
    } catch (err) {
      toast.error(err.message || "Failed to send OTP");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !resetFormData.password ||
      !resetFormData.confirmPassword ||
      !resetFormData.otp
    ) {
      toast.error("Please fill all fields");
      return;
    }

    if (resetFormData.password !== resetFormData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (resetFormData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);

    try {
      const res = await resetPassword(
        resetFormData.password,
        resetFormData.confirmPassword,
        resetFormData.otp,
      );

      toast.success(res.message || "Password reset successfully!");

      // Close modal + reset fields
      setShowResetModal(false);
      setResetFormData({ password: "", confirmPassword: "", otp: "" });
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to reset password";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowResetModal(false);
    setResetFormData({ password: "", confirmPassword: "", otp: "" });
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-center p-3 sm:px-6 bg-[#ffffff] gap-4 sm:gap-0">
        {/* Left section */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="/icons/logo.png"
            alt="Job Polo Logo"
            className="w-32 h-10 sm:w-36 sm:h-11 md:w-40 md:h-12 object-contain"
          />
        </Link>

        {/* Right section */}
        <div className="flex items-center space-x-5">
          {/* User Name */}
          <div className="hidden sm:block text-right">
            <p className="text-sm font-semibold text-gray-800">
              {firstName || "--"} {lastName || ""}
            </p>
            <p className="text-xs text-gray-500">
              {role ? role.replace(/_/g, " ") : ""}
            </p>
          </div>
         <div className="relative" ref={notificationRef}>
  <div className="relative">
  <FaBell
    size={24}
    onClick={() => setShowNotifications((prev) => !prev)}
    className={`cursor-pointer transition-all ${
      showNotifications
        ? "text-blue-600"
        : "text-[#18191C] hover:text-blue-600"
    }`}
  />

  {/* 🔴 Notification Dot (optional) */}
  {!showNotifications && (
    <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
  )}
</div>

  {/* 🔔 NOTIFICATION DROPDOWN */}
  {showNotifications && (
    <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden">
      
      {/* Header */}
      <div className="p-4 border-b font-semibold text-gray-800 flex justify-between">
        Notifications
        <span className="text-xs text-blue-600 cursor-pointer hover:underline">
          Mark all read
        </span>
      </div>

      {/* Notifications List */}
      <div className="max-h-80 overflow-y-auto custom-scrollbar">

        {/* ITEM */}
        <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
          <p className="text-sm text-gray-800">
            🎉 Your profile is 100% complete
          </p>
          <p className="text-xs text-gray-500 mt-1">2 min ago</p>
        </div>

        <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
          <p className="text-sm text-gray-800">
            💼 New job matches your profile
          </p>
          <p className="text-xs text-gray-500 mt-1">10 min ago</p>
        </div>

      </div>

      {/* Footer */}
      <div
        onClick={() => {
          navigate("/notifications");
          setShowNotifications(false);
        }}
        className="p-3 text-center text-blue-600 text-sm font-medium cursor-pointer hover:bg-gray-50 border-t"
      >
        View all notifications →
      </div>
    </div>
  )}
</div>

          {/* Profile Icon with Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white hover:shadow-lg transition-all duration-200"
            >
              <FaUser size={18} />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                {/* Settings Option */}
                <button
                  onClick={handleSettings}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700 transition-colors"
                >
                  <IoMdSettings size={20} className="text-gray-600" />
                  <span className="font-medium">Settings</span>
                </button>

                <button
                  onClick={handleSettings}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700 transition-colors"
                >
                  <FaRegUserCircle size={20} className="text-gray-600" />
                  <span className="font-medium">Upadte Profile</span>
                </button>

                {/* Reset Password Option */}
                <button
                  onClick={handleResetPassword}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700 transition-colors"
                >
                  <RiLockPasswordFill size={20} className="text-gray-600" />
                  <span className="font-medium">Reset Password</span>
                </button>

                {/* Divider */}
                <div className="border-t border-gray-200 my-2"></div>

                {/* Logout Option */}
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-3 text-left hover:bg-red-50 flex items-center gap-3 text-red-600 transition-colors"
                >
                  <BiLogOut size={20} />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reset Password Modal */}
      {showResetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-md relative">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">
                Reset Password
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <AiOutlineClose size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <form
              onSubmit={handleResetSubmit}
              className="p-6 space-y-4 text-left"
            >
              {/* New Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={resetFormData.password}
                    onChange={handleInputChange}
                    placeholder="Enter new password"
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-gray-800"
                  >
                    {showPassword ? (
                      <FaEye size={20} />
                    ) : (
                      <FaEyeSlash size={20} />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>

                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={resetFormData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm new password"
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-gray-800"
                  >
                    {showConfirmPassword ? (
                      <FaEye size={20} />
                    ) : (
                      <FaEyeSlash size={20} />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  OTP Code
                </label>

                <div className="relative">
                  <input
                    type="text"
                    name="otp"
                    value={resetFormData.otp}
                    onChange={handleInputChange}
                    placeholder="Enter OTP"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    required
                  />

                  {/* Bottom-right blue text */}
                  <p
                    className="absolute right-2 -bottom-6 text-blue-600 text-sm hover:underline hover:cursor-pointer"
                    onClick={!otpLoading ? handleSendOtp : undefined}
                  >
                    {otpLoading ? "Sending OTP..." : "Send OTP?"}
                  </p>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Resetting..." : "Reset Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default EmployerHeader;
