
// import React from "react";
// import { motion } from "framer-motion";

// export default function ResetPassword() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50">
//       <motion.div
//         initial={{ x: -100, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ duration: 0.5 }}
//         className="max-w-md w-full bg-white p-8 rounded-2xl shadow-md"
//       >
//         <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
//           Reset Password
//         </h2>

//         <p className="text-sm text-gray-600 mb-6 text-center">
//           Create a strong password to protect your account. Make sure it’s unique and hard to guess so your profile and job applications remain safe.
//         </p>

//         <form className="space-y-4 text-left">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 text-left">
//               New Password
//             </label>
//             <input
//               type="password"
//               className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-offset-2 focus:ring-[#1C42FF] focus:outline-none text-left"
//               placeholder="Enter new password"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 text-left">
//               Confirm Password
//             </label>
//             <input
//               type="password"
//               className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-offset-2 focus:ring-[#1C42FF] focus:outline-none text-left"
//               placeholder="Confirm new password"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full btn-gradient text-white py-2 rounded-lg transition"
//           >
//             Reset Password
//           </button>
//         </form>
//       </motion.div>
//     </div>
//   );
// }


import React, { useState,useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { forgotPassword } from "../api/authService";

export default function ResetPassword() {
  const { state } = useLocation();
  const navigate = useNavigate();

 useEffect(() => {
  if (!state?.email || !state?.otp) {
    navigate("/forgot-password");
  }
}, []);


  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return alert("Passwords do not match!");
    }

    setLoading(true);

    try {
      await forgotPassword({
        email: state.email,
        otp: state.otp,
        password,
        confirmPassword,
      });

      alert("Password reset successful!");
      navigate("/login");
    } catch (error) {
      alert(error.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white p-8 rounded-2xl shadow-md"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Reset Password</h2>

        <form className="space-y-4" onSubmit={handleReset}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#1C42FF]"
              placeholder="Enter new password"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#1C42FF]"
              placeholder="Confirm new password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-gradient text-white py-2 rounded-lg"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
