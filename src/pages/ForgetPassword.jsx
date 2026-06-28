// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { ArrowLeft } from "lucide-react";
// import { FcGoogle } from "react-icons/fc";
// import { FaLinkedinIn } from "react-icons/fa";
// import { motion } from "framer-motion";
// import EmailVerificationModal from "../components/EmailVerificationModal";

// export default function ForgetPassword() {
//   const navigate = useNavigate();
//   const [userType, setUserType] = useState("employee");
//   const [email, setEmail] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!email.trim()) return;

//     setIsLoading(true);
//     // Simulate sending reset link / code
//     console.log("Sending reset link to:", email);
//     // In a real app, make API call here
//     setTimeout(() => {
//       setIsLoading(false);
//       setIsModalOpen(true);
//     }, 1500);
//   };

//   const handleModalClose = () => {
//     setIsModalOpen(false);
//     // Optionally navigate after verification
//     // navigate("/login");
//   };

//   return (
//     <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
//       {/* Left side form */}
//       <motion.div
//         initial={{ x: -100, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ duration: 0.5 }}
//         className="w-full md:w-1/2 flex flex-col justify-center bg-white relative"
//       >
//         <div className="max-w-md w-full p-6 sm:p-8 mx-auto">
//           {/* Heading with back icon */}
//           <div
//             className="flex items-center gap-2 mb-4 sm:mb-6 cursor-pointer"
//             onClick={() => navigate("/login")}
//           >
//             <ArrowLeft
//               className="text-white btn-gradient rounded-full p-1"
//               size={20}
//             />
//             <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
//               Forgot Password
//             </h2>
//           </div>

//           {/* Toggle Switch for User Type */}
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3 }}
//             className="mb-6 sm:mb-8 bg-gray-200 p-1.5 rounded-full flex relative"
//           >
//             <div
//               className={`absolute top-1.5 bottom-1.5 w-1/2 bg-gradient-to-r from-[#1C42FF] to-[#001478] rounded-full transition-transform duration-300 ease-out ${
//                 userType === "employer" ? "translate-x-full" : "translate-x-0"
//               }`}
//             />
//             <button
//               type="button"
//               onClick={() => setUserType("employee")}
//               className={`flex-1 py-2 sm:py-3 px-3 sm:px-6 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-300 relative z-10 ${
//                 userType === "employee" ? "text-white" : "text-gray-700"
//               }`}
//             >
//               Employee
//             </button>
//             <button
//               type="button"
//               onClick={() => setUserType("employer")}
//               className={`flex-1 py-2 sm:py-3 px-3 sm:px-6 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-300 relative z-10 ${
//                 userType === "employer" ? "text-white" : "text-gray-700"
//               }`}
//             >
//               Employer
//             </button>
//           </motion.div>

//           <p className="text-sm sm:text-base text-gray-600 mb-6 text-center sm:text-left">
//             Enter your email address and we'll send you a link to reset your
//             password.
//           </p>

//           <form className="space-y-4 text-left" onSubmit={handleSubmit}>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 text-left">
//                 Email address
//               </label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="you@example.com"
//                 className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C42FF] focus:border-[#1C42FF] focus:outline-none text-left"
//                 required
//                 disabled={isLoading}
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full btn-gradient text-white py-2.5 sm:py-3 rounded-lg transition font-semibold text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
//               disabled={isLoading || !email.trim()}
//             >
//               {isLoading ? "Sending..." : "Send Reset OTP"}
//             </button>
//           </form>

//           <div className="mt-4 sm:mt-6 text-sm text-gray-600 text-center">
//             Remember your password?{" "}
//             <Link
//               to="/login"
//               className="text-[#1C42FF] hover:underline font-medium"
//             >
//               Sign In
//             </Link>
//           </div>

//           <div className="mt-3 text-sm text-gray-600 text-center">
//             Don't have an account?{" "}
//             <Link
//               to="/register"
//               className="text-[#1C42FF] hover:underline font-medium"
//             >
//               Create Account
//             </Link>
//           </div>

//           <div className="flex items-center my-4 sm:my-6">
//             <div className="flex-grow h-px bg-gray-300"></div>
//             <span className="px-3 text-gray-500 text-sm">or continue with</span>
//             <div className="flex-grow h-px bg-gray-300"></div>
//           </div>

//           <div className="flex flex-col sm:flex-row gap-3">
//             <button
//               className="w-full sm:w-1/2 flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition text-sm"
//               disabled={isLoading}
//             >
//               <FaLinkedinIn className="text-blue-700" /> LinkedIn
//             </button>
//             <button
//               className="w-full sm:w-1/2 flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition text-sm"
//               disabled={isLoading}
//             >
//               <FcGoogle /> Google
//             </button>
//           </div>
//         </div>
//       </motion.div>

//       {/* Right side modern panel */}
//       <div className="hidden md:flex w-full md:w-1/2 h-64 md:h-screen md:fixed right-0 top-0 items-center justify-center bg-gradient-to-br from-[#1C42FF] to-[#001478] overflow-hidden text-white">
//         {/* Abstract floating shapes */}
//         <div className="absolute w-48 h-48 sm:w-72 sm:h-72 bg-white/10 rounded-full top-10 left-10 animate-pulse"></div>
//         <div className="absolute w-40 h-40 sm:w-56 sm:h-56 bg-white/5 rounded-full bottom-20 right-20 animate-bounce"></div>
//         <div className="absolute w-64 h-64 sm:w-96 sm:h-96 bg-white/5 rounded-full top-1/3 right-1/4 rotate-45 animate-spin-slow"></div>

//         {/* Text content */}
//         <div className="text-center px-4 sm:px-8 z-10">
//           <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
//             {userType === "employee" ? "Forgot Something?" : "Need Help?"}
//           </h3>
//           <p className="text-gray-100 text-base sm:text-lg">
//             {userType === "employee"
//               ? "Don't worry! Enter your email and we'll help you reset your password quickly and securely so you can get back to exploring opportunities."
//               : "No problem! We'll send you a secure link to reset your password and get you back to managing your job postings and candidates."}
//           </p>
//         </div>
//       </div>

//       {/* Email Verification Modal */}
//       <EmailVerificationModal
//         isOpen={isModalOpen}
//         onClose={handleModalClose}
//         email={email}
//       />
//     </div>
//   );
// }


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaLinkedinIn } from "react-icons/fa";
import { motion } from "framer-motion";
import EmailVerificationModal from "../components/EmailVerificationModal";
import { sendOtp } from "../api/authService";

export default function ForgetPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!email.trim()) return;

  setIsLoading(true);

  try {
    await sendOtp(email, "FORGOT-PASSWORD");

    sessionStorage.setItem("resetEmail", email); // Store email for modal

    setIsModalOpen(true);
  } catch (error) {
    alert(error.message || "Failed to send OTP");
  }

  setIsLoading(false);
};

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Left side form */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full md:w-1/2 flex flex-col justify-center bg-white relative"
      >
        <div className="max-w-md w-full p-6 sm:p-8 mx-auto">
          {/* Heading */}
          <div
            className="flex items-center gap-2 mb-4 sm:mb-6 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            <ArrowLeft className="text-white btn-gradient rounded-full p-1" size={20} />
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Forgot Password
            </h2>
          </div>

        
          <p className="text-sm sm:text-base text-gray-600 mb-6 text-center sm:text-left">
            Enter your email address and we'll send you a reset OTP.
          </p>

          {/* Form */}
          <form className="space-y-4 text-left" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 text-left">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1C42FF]"
                required
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              className="w-full btn-gradient text-white py-2.5 sm:py-3 rounded-lg transition font-semibold text-sm sm:text-base disabled:opacity-50"
              disabled={isLoading || !email.trim()}
            >
              {isLoading ? "Sending..." : "Send Reset OTP"}
            </button>
          </form>

          {/* Links */}
          <div className="mt-4 sm:mt-6 text-sm text-gray-600 text-center">
            Remember your password?{" "}
            <Link to="/login" className="text-[#1C42FF] hover:underline font-medium">
              Sign In
            </Link>
          </div>

          <div className="mt-3 text-sm text-gray-600 text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#1C42FF] hover:underline font-medium">
              Create Account
            </Link>
          </div>
          
        </div>
      </motion.div>

      {/* Right side (UI only) */}
      <div className="hidden md:flex w-full md:w-1/2 h-64 md:h-screen md:fixed right-0 top-0 items-center justify-center bg-gradient-to-br from-[#1C42FF] to-[#001478] text-white">
        <div className="text-center px-4 sm:px-8 z-10">
          <h3 className="text-3xl font-bold mb-4">
            Forgot Something?

          </h3>
          <p className="text-gray-100 text-lg">
            Don't worry — enter your email and we'll help you reset your password.
          </p>
        </div>
      </div>

      {/* OTP Modal */}
      <EmailVerificationModal isOpen={isModalOpen} onClose={handleModalClose} />
    </div>
  );
}
