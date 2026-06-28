import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { sendOtp, loginUser } from "../api/authService"; // ✅ imported from service
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch } from "react-redux";
import { setUser } from "../../src/reduxFeatures/slice/userSlice";
import Navbar from "../components/Navbar";
// import { toast } from "react-hot";

export default function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpLogin, setIsOtpLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [timer, setTimer] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const dispatch = useDispatch();
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const remembered = localStorage.getItem("rememberMe");

    if (remembered === "true") {
      const savedEmail = localStorage.getItem("email");
      if (savedEmail) {
        setEmail(savedEmail);
        setRememberMe(true);
      }
    }
  }, []);
  // 🕒 Countdown timer
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // ✅ Send OTP handler
  const handleSendOtp = async () => {
    if (!email) return toast.warning("Please enter your email first.");
    setSendingOtp(true);
    try {
      const data = await sendOtp(email, "LOGIN");
      toast.success(data.message || "OTP sent successfully!");
      setOtpSent(true);
      setTimer(150); // 2 min 30 sec
    } catch (error) {
      console.error("OTP Send Error:", error);
      toast.error(error?.msg || error?.message || "Failed to send OTP.");
    } finally {
      setSendingOtp(false);
    }
  };

  // ✅ Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await loginUser({
        email,
        password: !isOtpLogin ? password : undefined,
        otp: isOtpLogin ? otp : undefined,
      });

      // console.log("Login data is", data);

      // ✅ Extract data from API response
      const token = data?.data?.token;
      const user = data?.data?.user;

      // console.log("user data is", user);
      const role = user?.role || "EMPLOYEE"; // Keep same case as API
      const Id = user?.id;
      const Email = user?.email;

      // console.log("email of the tken is", Email);
      const message = data?.message || "Login successful!";

      if (token && user) {
        dispatch(
          setUser({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
          }),
        );
        // ✅ Store token, role, and user infoss
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("email", Email);
        sessionStorage.setItem("role", role); // No lowercase conversion
        sessionStorage.setItem("user", JSON.stringify(user));
        sessionStorage.setItem("userId", Id);

        if (rememberMe) {
          localStorage.setItem("rememberMe", "true");
          localStorage.setItem("email", Email);
        } else {
          localStorage.removeItem("rememberMe");
          localStorage.removeItem("email");
        }

        // ✅ Show API message using toast
        toast.success(message);

        // ✅ Redirect to dashboard
        const redirectTo = location.state?.redirectTo || "/dashboard";

        setTimeout(() => {
          navigate(redirectTo);
        }, 1000);
      } else {
        toast.error(data.message || "Invalid credentials.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  return (
    <>
      <Navbar />
      <div className=" min-h-screen flex flex-col md:flex-row bg-gray-50">
        {/* Left form */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-1/2 flex flex-col justify-center bg-white relative"
        >
          <div className="max-w-md w-full p-6 sm:p-8 mx-auto">
            {/* Header */}
            <div
              className="flex items-center gap-2 mb-4 sm:mb-6 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <ArrowLeft
                className="text-white btn-gradient rounded-full p-1"
                size={20}
              />
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                Sign In
              </h2>
            </div>

            {/* Login type toggle */}
            <div className="flex items-center justify-center mb-4 gap-3 text-sm">
              <button
                type="button"
                onClick={() => setIsOtpLogin(false)}
                className={`px-3 py-1 rounded-full font-medium ${
                  !isOtpLogin
                    ? "bg-gradient-to-r from-[#1C42FF] to-[#001478] text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                Password Login
              </button>
              <button
                type="button"
                onClick={() => setIsOtpLogin(true)}
                className={`px-3 py-1 rounded-full font-medium ${
                  isOtpLogin
                    ? "bg-gradient-to-r from-[#1C42FF] to-[#001478] text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                OTP Login
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4 text-left">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C42FF] focus:border-[#1C42FF] focus:outline-none"
                  required
                />
              </div>

              {/* Password or OTP */}
              {!isOtpLogin ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="**********"
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg pr-12 focus:ring-2 focus:ring-[#1C42FF] focus:border-[#1C42FF] focus:outline-none"
                      required
                    />

                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </span>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    OTP
                  </label>

                  <div className="flex items-center gap-2">
                    <div className="relative w-full">
                      <input
                        type={showOtp ? "text" : "password"}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter OTP"
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg pr-12 focus:ring-2 focus:ring-[#1C42FF] focus:border-[#1C42FF] focus:outline-none"
                        required
                        disabled={!otpSent}
                      />

                      {/* OTP Show / Hide */}
                      <span
                        onClick={() => setShowOtp(!showOtp)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
                      >
                        {showOtp ? <EyeOff size={20} /> : <Eye size={20} />}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={sendingOtp || timer > 0}
                      className="min-w-[110px] mt-1 px-3 py-2 rounded-lg text-white bg-gradient-to-r from-[#1C42FF] to-[#001478] hover:opacity-90 transition text-sm font-medium disabled:opacity-50"
                    >
                      {sendingOtp
                        ? "Sending..."
                        : timer > 0
                          ? `Resend in ${formatTime(timer)}`
                          : otpSent
                            ? "Resend OTP"
                            : "Send OTP"}
                    </button>
                  </div>
                </div>
              )}

              {/* Remember + Forgot */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <label className="flex items-center text-sm text-gray-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="mr-2 h-4 w-4 text-[#1C42FF]"
                  />
                  Remember Me
                </label>
                <Link
                  to="/forget-password"
                  className="hover:underline text-[#1C42FF] text-sm"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-gradient text-white py-2.5 sm:py-3 rounded-lg transition font-semibold text-sm sm:text-base"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            {/* Footer */}
            <div className="mt-4 text-sm text-gray-600 text-center sm:text-left">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-[#1C42FF] hover:underline font-medium"
              >
                Create Account
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Right panel */}
        <div className="hidden md:flex w-full md:w-1/2 h-64 md:h-screen md:fixed right-0 top-0 items-center justify-center bg-gradient-to-br from-[#1C42FF] to-[#001478] text-white overflow-hidden">
          <div className="absolute w-48 h-48 sm:w-72 sm:h-72 bg-white/10 rounded-full top-10 left-10 animate-pulse"></div>
          <div className="absolute w-40 h-40 sm:w-56 sm:h-56 bg-white/5 rounded-full bottom-20 right-20 animate-bounce"></div>
          <div className="absolute w-64 h-64 sm:w-96 sm:h-96 bg-white/5 rounded-full top-1/3 right-1/4 rotate-45 animate-spin-slow"></div>

          <div className="text-center px-4 sm:px-8 z-10">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              Welcome Back!
            </h3>
            <p className="text-gray-100 text-base sm:text-lg">
              Sign in to access your personalized dashboard and continue where
              you left off.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
