// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { X } from "lucide-react";

// export default function EmailVerificationModal({ isOpen, onClose, email = "emailaddress@gmail.com" }) {
//   const [verificationCode, setVerificationCode] = useState("");
//   const [isResending, setIsResending] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Add your verification logic here
//     console.log("Verification code:", verificationCode);
//     // onClose(); // Close modal after verification
//   };

//   const handleResend = async () => {
//     setIsResending(true);
//     // Add your resend logic here
//     setTimeout(() => {
//       setIsResending(false);
//       alert("Verification code resent!");
//     }, 1500);
//   };

//   if (!isOpen) return null;

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//           {/* Backdrop */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={onClose}
//             className="absolute inset-0 bg-black/50 backdrop-blur-sm"
//           />

//           {/* Modal */}
//           <motion.div
//             initial={{ scale: 0.9, opacity: 0, y: 20 }}
//             animate={{ scale: 1, opacity: 1, y: 0 }}
//             exit={{ scale: 0.9, opacity: 0, y: 20 }}
//             transition={{ duration: 0.3, ease: "easeOut" }}
//             className="relative max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden"
//           >
//             {/* Close Button */}
//             <button
//               onClick={onClose}
//               className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
//             >
//               <X size={24} />
//             </button>

//             {/* Content */}
//             <div className="p-6 sm:p-8">
//               {/* Icon */}
//               <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#1C42FF] to-[#001478] rounded-full flex items-center justify-center">
//                 <svg
//                   className="w-8 h-8 text-white"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//                   />
//                 </svg>
//               </div>

//               <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 text-center">
//                 Email Verification
//               </h2>

//               <p className="text-sm sm:text-base text-gray-600 mb-6 text-center">
//                 We've sent a verification code to{" "}
//                 <span className="font-semibold text-gray-800">{email}</span> to
//                 verify your email address and activate your account.
//               </p>

//               <form onSubmit={handleSubmit} className="space-y-5">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 text-left mb-2">
//                     Verification Code
//                   </label>
//                   <input
//                     type="text"
//                     value={verificationCode}
//                     onChange={(e) => setVerificationCode(e.target.value)}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C42FF] focus:border-[#1C42FF] focus:outline-none text-center text-lg tracking-widest font-semibold"
//                     placeholder="000000"
//                     maxLength={6}
//                     required
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   className="w-full btn-gradient text-white py-3 rounded-lg transition font-semibold hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
//                 >
//                   Verify my Account
//                 </button>
//               </form>

//               <div className="mt-6 text-sm sm:text-base text-gray-600 text-center">
//                 Didn't receive the code?{" "}
//                 <button
//                   onClick={handleResend}
//                   disabled={isResending}
//                   className="text-[#1C42FF] hover:underline font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {isResending ? "Sending..." : "Resend Code"}
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </AnimatePresence>
//   );
// }

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { sendOtp, forgotPassword } from "../api/authService";

export default function EmailVerificationModal({ isOpen, onClose }) {
  const email = sessionStorage.getItem("resetEmail"); // get email from session

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!otp || !password || !confirmPassword) {
      return alert("All fields are required.");
    }

    if (password !== confirmPassword) {
      return alert("Passwords do not match!");
    }

    setIsLoading(true);

    try {
      await forgotPassword({
        email,
        otp,
        password,
        confirmPassword,
      });

      alert("Password Reset Successful!");
      onClose();
      
      window.location.href = "/login";
    } catch (error) {
      alert(error.message || "Failed to reset password.");
    }

    setIsLoading(false);
  };

  const handleResend = async () => {
    setIsResending(true);

    try {
      await sendOtp(email, "FORGOT-PASSWORD");
      alert("OTP resent successfully!");
    } catch (error) {
      alert(error.message || "Failed to resend OTP.");
    }

    setIsResending(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
            >
              <X size={24} />
            </button>

            <div className="p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 text-center">
                Reset Password
              </h2>

              <p className="text-sm text-gray-600 mb-6 text-center">
                Enter the OTP sent to{" "}
                <span className="font-semibold">{email}</span>
                and set your new password.
              </p>

              <form onSubmit={handleResetPassword} className="space-y-5">
                {/* OTP FIELD */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    OTP
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#1C42FF] text-center tracking-widest text-lg"
                    placeholder="000000"
                    maxLength={6}
                    required
                  />
                </div>

                {/* NEW PASSWORD */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#1C42FF]"
                    placeholder="Enter new password"
                    required
                  />
                </div>

                {/* CONFIRM PASSWORD */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#1C42FF]"
                    placeholder="Confirm new password"
                    required
                  />
                </div>

                {/* RESET BUTTON */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn-gradient text-white py-3 rounded-lg font-semibold"
                >
                  {isLoading ? "Processing..." : "Reset Password"}
                </button>
              </form>

              <div className="mt-6 text-sm text-gray-600 text-center">
                Didn’t receive OTP?{" "}
                <button
                  onClick={handleResend}
                  disabled={isResending}
                  className="text-[#1C42FF] hover:underline font-medium"
                >
                  {isResending ? "Sending..." : "Resend OTP"}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
