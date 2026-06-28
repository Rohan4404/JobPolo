// // EmployeeForm.jsx
// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import PhoneInput from "react-phone-input-2";
// import Select from "react-select";
// import { Eye, EyeOff } from "lucide-react";
// import { sendOtp } from "../api/authService"; // ⬅ adjust path
// import { toast } from "react-toastify";

// export default function EmployeeForm({
//   inputClass,
//   formData,
//   setFormData,
//   countries,
//   states,
//   cities,
//   selectedCountry,
//   setSelectedCountry,
//   selectedState,
//   setSelectedState,
//   selectedCity,
//   setSelectedCity,
//   selectStyles,
//   isOtpVerified,
//   setIsOtpVerified,
// }) {
//   const [otpSent, setOtpSent] = useState(false);
//   const [secondsLeft, setSecondsLeft] = useState(30);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPass, setShowConfirmPass] = useState(false);
//   const [sendingOtp, setSendingOtp] = useState(false);
//   const [phoneValue, setPhoneValue] = useState("");


//   useEffect(() => {
//     let timer;
//     if (otpSent && secondsLeft > 0) {
//       timer = setTimeout(() => setSecondsLeft(secondsLeft - 1), 1000);
//     }
//     return () => clearTimeout(timer);
//   }, [otpSent, secondsLeft]);

//   const sendOtpHandler = async () => {
//     if (!formData.email) return toast.error("Enter email first");

//     try {
//       setSendingOtp(true);
//       const res = await sendOtp(formData.email, "EMPLOYEE-REGISTER");
//       toast.success(res?.message || "OTP sent successfully!");
//       setOtpSent(true);
//       setSecondsLeft(30);
//     } catch (error) {
//       toast.error(error?.message || error?.error || "Failed to send OTP");
//       setOtpSent(false);
//     } finally {
//       setSendingOtp(false);
//     }
//   };

//   const resendOtp = () => {
//     if (secondsLeft > 0) return;
//     sendOtpHandler();
//   };

//   return (
//     <>
//       {/* PERSONAL INFO */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//       >
//         <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-3 sm:mb-4 text-center">
//           Personal Information
//         </h3>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           {/* First Name */}
//           <div>
//             <label className="field-label ">First Name *</label>
//             <input
//               type="text"
//               className={inputClass}
//               placeholder="John"
//               onChange={(e) =>
//                 setFormData({ ...formData, firstName: e.target.value })
//               }
//             />
//           </div>

//           {/* Last Name */}
//           <div>
//             <label className="field-label">Last Name *</label>
//             <input
//               type="text"
//               className={inputClass}
//               placeholder="Doe"
//               onChange={(e) =>
//                 setFormData({ ...formData, lastName: e.target.value })
//               }
//             />
//           </div>

//           {/* Email + Send OTP */}
//           <div className="col-span-1 sm:col-span-2">
//             <label className="field-label">Email *</label>
//             <div className="flex gap-3 items-center">
//               <input
//                 type="email"
//                 className={`${inputClass} flex-1`}
//                 placeholder="you@example.com"
//                 onChange={(e) =>
//                   setFormData({ ...formData, email: e.target.value })
//                 }
//               />
//               <button
//                 type="button"
//                 onClick={sendOtpHandler}
//                 disabled={sendingOtp}
//                 className={`btn-gradient text-white text-sm px-3 py-2 rounded-lg ${
//                   sendingOtp ? "opacity-50 cursor-not-allowed" : ""
//                 }`}
//               >
//                 {sendingOtp ? "Sending..." : "Send OTP"}
//               </button>
//             </div>

//             {/* OTP Section */}
//             {/* OTP Section */}
//             {otpSent && (
//               <div className="mt-2">
//                 <input
//                   type="text"
//                   className={inputClass}
//                   placeholder="Enter OTP"
//                   onChange={(e) =>
//                     setFormData({ ...formData, otp: e.target.value })
//                   }
//                 />

//                 <p className="text-xs text-gray-500 mt-1">
//                   Resend OTP in {secondsLeft}s
//                   {secondsLeft === 0 && (
//                     <button
//   type="button"
//   className="text-blue-600 ml-1"
//   onClick={resendOtp}
// >
//   Resend
// </button>

//                   )}
//                 </p>
//               </div>
//             )}
//           </div>

//           {/* Mobile + Gender in one line */}
//           <div>
//             <label className="field-label">Mobile Number *</label>
//             <PhoneInput
//   country="in"
//   enableSearch
//   value={phoneValue}
//   onChange={(value, data) => {
//     setPhoneValue(value); // allow UI display without disappearing

//     const dial = data.dialCode;
//     let raw = value.replace(/\D/g, ""); // keep digits only

//     if (raw.startsWith(dial)) {
//       raw = raw.slice(dial.length); // remove dial code
//     }

//     setFormData({
//       ...formData,
//       countryCode: `+${dial}`,
//       mobileNumber: raw,
//     });
//   }}
//   inputStyle={{
//     width: "100%",
//     height: "42px",
//     borderRadius: "8px",
//   }}
// />

//           </div>

//           <div>
//             <label className="field-label">Gender *</label>
//             <select
//               className={inputClass}
//               onChange={(e) =>
//                 setFormData({ ...formData, gender: e.target.value })
//               }
//             >
//               <option value="">--Select--</option>
//               <option value="MALE">Male</option>
//               <option value="FEMALE">Female</option>
//               <option value="OTHER">Other</option>
//             </select>
//           </div>
//         </div>
//       </motion.div>

//       {/* LOCATION & WORK */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//       >
//         <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-3 sm:mb-4 text-center">
//           Location & Work
//         </h3>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           {/* Country */}
//           <div>
//             <label className="field-label">Country *</label>
//             <Select
//               options={countries}
//               value={selectedCountry}
//               onChange={(v) => {
//                 setSelectedCountry(v);
//                 setFormData({ ...formData, country: v.label });
//               }}
//               styles={selectStyles}
//               placeholder="Select Country"
//             />
//           </div>

//           {/* State */}
//           <div>
//             <label className="field-label">State *</label>
//             <Select
//               options={states}
//               value={selectedState}
//               onChange={(v) => {
//                 setSelectedState(v);
//                 setFormData({ ...formData, state: v.label });
//               }}
//               styles={selectStyles}
//               placeholder="Select State"
//               isDisabled={!selectedCountry}
//             />
//           </div>

//           {/* City */}
//           <div>
//             <label className="field-label">City *</label>
//             <Select
//               options={cities}
//               value={selectedCity}
//               onChange={(v) => {
//                 setSelectedCity(v);
//                 setFormData({ ...formData, city: v.label });
//               }}
//               styles={selectStyles}
//               placeholder="Select City"
//               isDisabled={!selectedState}
//             />
//           </div>

//           {/* Pincode */}
//           <div>
//             <label className="field-label">Pincode *</label>
//             <input
//               type="text"
//               className={inputClass}
//               onChange={(e) =>
//                 setFormData({ ...formData, pincode: e.target.value })
//               }
//             />
//           </div>

//           {/* Industry */}
//           <div>
//             <label className="field-label">Industry *</label>
//             <select
//               className={inputClass}
//               onChange={(e) =>
//                 setFormData({ ...formData, industry: e.target.value })
//               }
//             >
//               <option>--Select--</option>
//               <option>Advertising</option>
//               <option>IT</option>
//               <option>Finance</option>
//             </select>
//           </div>

//           {/* Function Area */}
//           <div>
//             <label className="field-label">Function Area *</label>
//             <select
//               className={inputClass}
//               onChange={(e) =>
//                 setFormData({ ...formData, functionArea: e.target.value })
//               }
//             >
//               <option>--Select--</option>
//               <option>Account</option>
//               <option>Engineering</option>
//               <option>HR</option>
//             </select>
//           </div>
//         </div>
//       </motion.div>

//       {/* WORK DETAILS */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//       >
//         <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-3 sm:mb-4 text-center">
//           Work Details
//         </h3>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <input
//             type="number"
//             placeholder="Current CTC (LPA)"
//             className={inputClass}
//             onChange={(e) =>
//               setFormData({ ...formData, currentCtc: e.target.value })
//             }
//           />
//           <input
//             type="number"
//             placeholder="Expected CTC (LPA)"
//             className={inputClass}
//             onChange={(e) =>
//               setFormData({ ...formData, expectedCtc: e.target.value })
//             }
//           />
//         </div>
//       </motion.div>

//       {/* FILE UPLOADS */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//       >
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <div>
//             <label className="field-label">Upload Resume</label>
//             <input
//               type="file"
//               multiple
//               accept=".pdf,.png,.jpg"
//               className={inputClass}
//               onChange={(e) =>
//                 setFormData({ ...formData, resumeFiles: e.target.files })
//               }
//             />
//           </div>

//           <div>
//             <label className="field-label">Upload Other Documents</label>
//             <input
//               type="file"
//               multiple
//               accept=".pdf,.png,.jpg"
//               className={inputClass}
//               onChange={(e) =>
//                 setFormData({ ...formData, workSampleFiles: e.target.files })
//               }
//             />
//           </div>
//         </div>
//       </motion.div>

//       {/* PASSWORD + SHOW/HIDE + DISABLE REGISTER LOGIC */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//       >
//         <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-3 sm:mb-4 text-center">
//           Security
//         </h3>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           {/* Password */}
//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Password"
//               className={inputClass}
//               onChange={(e) =>
//                 setFormData({ ...formData, password: e.target.value })
//               }
//             />
//             <span
//               className="absolute right-3 top-3 cursor-pointer"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//             </span>
//           </div>

//           {/* Confirm Password */}
//           <div className="relative">
//             <input
//               type={showConfirmPass ? "text" : "password"}
//               placeholder="Confirm Password"
//               className={inputClass}
//               onChange={(e) =>
//                 setFormData({ ...formData, confirmPassword: e.target.value })
//               }
//             />
//             <span
//               className="absolute right-3 top-3 cursor-pointer"
//               onClick={() => setShowConfirmPass(!showConfirmPass)}
//             >
//               {showConfirmPass ? <EyeOff size={18} /> : <Eye size={18} />}
//             </span>
//           </div>
//         </div>

//         {/* T&C */}
//         <div className="flex items-center mt-2">
//           <input
//             type="checkbox"
//             className="h-4 w-4"
//             onChange={(e) =>
//               setFormData({ ...formData, TCPolicy: e.target.checked })
//             }
//           />
//           <label className="ml-2 text-sm text-gray-600">
//             I agree to the{" "}
//             <a
//               href="/terms&condition"
//               className="text-[#1C42FF] hover:underline"
//             >
//               Terms of Service
//             </a>
//           </label>
//         </div>
//       </motion.div>
//     </>
//   );
// }


// EmployeeForm.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PhoneInput from "react-phone-input-2";
import Select from "react-select";
import { Eye, EyeOff } from "lucide-react";
import { sendOtp } from "../api/authService";
import { toast } from "react-toastify";
import ModalWrapper from "../components/ModalWrapper";
import TermsConditions from "../pages/Terms&Condition";

export default function EmployeeForm({
  inputClass,
  formData,
  setFormData,
  countries,
  states,
  cities,
  selectedCountry,
  setSelectedCountry,
  selectedState,
  setSelectedState,
  selectedCity,
  setSelectedCity,
  selectStyles,
  errors = {}, // 🔹 new
}) {
  const [otpSent, setOtpSent] = useState(false);
 const [secondsLeft, setSecondsLeft] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [phoneValue, setPhoneValue] = useState("");
  const [showTerms, setShowTerms] = useState(false);

 useEffect(() => {
  if (!otpSent || secondsLeft <= 0) return;

  const timer = setInterval(() => {
    setSecondsLeft((prev) => prev - 1);
  }, 1000);

  return () => clearInterval(timer);
}, [otpSent, secondsLeft]);

  const sendOtpHandler = async () => {
    if (!formData.email) return toast.error("Enter email first");

    try {
      setSendingOtp(true);
      const res = await sendOtp(formData.email, "EMPLOYEE-REGISTER");
      toast.success(res?.message || "OTP sent successfully!");
      setOtpSent(true);
      setSecondsLeft(150);
    } catch (error) {
      toast.error(error?.message || error?.error || "Failed to send OTP");
      setOtpSent(false);
    } finally {
      setSendingOtp(false);
    }
  };

  const resendOtp = () => {
    if (secondsLeft > 0) return;
    sendOtpHandler();
  };
  const formatTime = (time) => {
  const min = Math.floor(time / 60);
  const sec = time % 60;
  return `${min}:${sec < 10 ? "0" : ""}${sec}`;
};

  return (
    <>
      {/* PERSONAL INFO */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-3 sm:mb-4 text-center">
          Personal Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* First Name */}
          <div>
            <label className="field-label">First Name *</label>
            <input
              type="text"
              className={`${inputClass} ${
                errors.firstName ? "border-red-500" : ""
              }`}
              placeholder="John"
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
            />
            {errors.firstName && (
              <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="field-label">Last Name *</label>
            <input
              type="text"
              className={`${inputClass} ${
                errors.lastName ? "border-red-500" : ""
              }`}
              placeholder="Doe"
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
            />
            {errors.lastName && (
              <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>
            )}
          </div>

          {/* Email + Send OTP */}
          <div className="col-span-1 sm:col-span-2">
            <label className="field-label">Email *</label>
            <div className="flex gap-3 items-center">
              <input
                type="email"
                className={`${inputClass} flex-1 ${
                  errors.email ? "border-red-500" : ""
                }`}
                placeholder="you@example.com"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <button
  type="button"
  onClick={sendOtpHandler}
  disabled={sendingOtp || secondsLeft > 0}
  className={`btn-gradient text-white text-sm px-3 py-2 rounded-lg min-w-[140px] ${
    sendingOtp || secondsLeft > 0 ? "opacity-50 cursor-not-allowed" : ""
  }`}
>
  {sendingOtp
    ? "Sending..."
    : otpSent
      ? secondsLeft > 0
        ? `Resend in ${formatTime(secondsLeft)}`
        : "Resend OTP"
      : "Send OTP"}
</button>
            </div>
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email}</p>
            )}

            {/* OTP Section */}
            {otpSent && (
              <div className="mt-2">
                <input
                  type="text"
                  className={`${inputClass} ${
                    errors.otp ? "border-red-500" : ""
                  }`}
                  placeholder="Enter OTP"
                  onChange={(e) =>
                    setFormData({ ...formData, otp: e.target.value })
                  }
                />
                {errors.otp && (
                  <p className="text-xs text-red-500 mt-1">{errors.otp}</p>
                )}

              </div>
            )}
          </div>

          {/* Mobile + Gender in one line */}
          <div>
            <label className="field-label">Mobile Number *</label>
            <PhoneInput
              country="in"
              enableSearch
              value={phoneValue}
              onChange={(value, data) => {
                setPhoneValue(value); // keep UI value

                const dial = data.dialCode;
                let raw = value.replace(/\D/g, "");
                if (raw.startsWith(dial)) {
                  raw = raw.slice(dial.length);
                }

                setFormData({
                  ...formData,
                  countryCode: `+${dial}`,
                  mobileNumber: raw,
                });
              }}
              inputStyle={{
                width: "100%",
                height: "42px",
                borderRadius: "8px",
                borderColor: errors.mobileNumber ? "red" : undefined,
              }}
            />
            {errors.mobileNumber && (
              <p className="text-xs text-red-500 mt-1">
                {errors.mobileNumber}
              </p>
            )}
          </div>

          <div>
            <label className="field-label">Gender *</label>
            <select
              className={`${inputClass} ${
                errors.gender ? "border-red-500" : ""
              }`}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
            >
              <option value="">--Select--</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
            {errors.gender && (
              <p className="text-xs text-red-500 mt-1">{errors.gender}</p>
            )}
          </div>
        </div>
      </motion.div>

      {/* LOCATION & WORK */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-3 sm:mb-4 text-center">
          Location & Work
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Country */}
          <div>
            <label className="field-label">Country *</label>
            <Select
              options={countries}
              value={selectedCountry}
              onChange={(v) => {
                setSelectedCountry(v);
                setFormData({ ...formData, country: v?.label || "" });
              }}
              styles={selectStyles}
              placeholder="Select Country"
            />
            {errors.country && (
              <p className="text-xs text-red-500 mt-1">{errors.country}</p>
            )}
          </div>

          {/* State */}
          <div>
            <label className="field-label">State *</label>
            <Select
              options={states}
              value={selectedState}
              onChange={(v) => {
                setSelectedState(v);
                setFormData({ ...formData, state: v?.label || "" });
              }}
              styles={selectStyles}
              placeholder="Select State"
              isDisabled={!selectedCountry}
            />
            {errors.state && (
              <p className="text-xs text-red-500 mt-1">{errors.state}</p>
            )}
          </div>

          {/* City */}
          <div>
            <label className="field-label">City *</label>
            <Select
              options={cities}
              value={selectedCity}
              onChange={(v) => {
                setSelectedCity(v);
                setFormData({ ...formData, city: v?.label || "" });
              }}
              styles={selectStyles}
              placeholder="Select City"
              isDisabled={!selectedState}
            />
            {errors.city && (
              <p className="text-xs text-red-500 mt-1">{errors.city}</p>
            )}
          </div>

          {/* Pincode */}
          <div>
            <label className="field-label">Pincode *</label>
            <input
              type="text"
              className={`${inputClass} ${
                errors.pincode ? "border-red-500" : ""
              }`}
              onChange={(e) =>
                setFormData({ ...formData, pincode: e.target.value })
              }
            />
            {errors.pincode && (
              <p className="text-xs text-red-500 mt-1">{errors.pincode}</p>
            )}
          </div>

          {/* Industry */}
          <div>
            <label className="field-label">Industry *</label>
            <select
              className={`${inputClass} ${
                errors.industry ? "border-red-500" : ""
              }`}
              onChange={(e) =>
                setFormData({ ...formData, industry: e.target.value })
              }
            >
              <option>--Select--</option>
              <option>Advertising</option>
              <option>IT</option>
              <option>Finance</option>
            </select>
            {errors.industry && (
              <p className="text-xs text-red-500 mt-1">{errors.industry}</p>
            )}
          </div>

          {/* Function Area */}
          <div>
            <label className="field-label">Function Area *</label>
            <select
              className={`${inputClass} ${
                errors.functionArea ? "border-red-500" : ""
              }`}
              onChange={(e) =>
                setFormData({ ...formData, functionArea: e.target.value })
              }
            >
              <option>--Select--</option>
              <option>Account</option>
              <option>Engineering</option>
              <option>HR</option>
            </select>
            {errors.functionArea && (
              <p className="text-xs text-red-500 mt-1">{errors.functionArea}</p>
            )}
          </div>
        </div>
      </motion.div>

      {/* WORK DETAILS */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-3 sm:mb-4 text-center">
          Work Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Current CTC (LPA)"
            className={inputClass}
            onChange={(e) =>
              setFormData({ ...formData, currentCtc: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Expected CTC (LPA)"
            className={inputClass}
            onChange={(e) =>
              setFormData({ ...formData, expectedCtc: e.target.value })
            }
          />
        </div>
      </motion.div>

      {/* FILE UPLOADS */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="field-label">Upload Resume</label>
            <input
              type="file"
              multiple
              accept=".pdf,.png,.jpg"
              className={inputClass}
              onChange={(e) =>
                setFormData({ ...formData, resumeFiles: e.target.files })
              }
            />
          </div>

          <div>
            <label className="field-label">Upload Other Documents</label>
            <input
              type="file"
              multiple
              accept=".pdf,.png,.jpg"
              className={inputClass}
              onChange={(e) =>
                setFormData({ ...formData, workSampleFiles: e.target.files })
              }
            />
          </div>
        </div>
      </motion.div>

      {/* PASSWORD + SHOW/HIDE */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-3 sm:mb-4 text-center">
          Security
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={`${inputClass} ${
                errors.password ? "border-red-500" : ""
              }`}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <span
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirmPass ? "text" : "password"}
              placeholder="Confirm Password"
              className={`${inputClass} ${
                errors.confirmPassword ? "border-red-500" : ""
              }`}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
            />
            <span
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setShowConfirmPass(!showConfirmPass)}
            >
              {showConfirmPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
            {errors.confirmPassword && (
              <p className="text-xs text-red-500 mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>
        </div>

        {/* T&C */}
        <div className="flex items-center mt-2">
          <input
            type="checkbox"
            className={`h-4 w-4 ${
              errors.TCPolicy ? "border-red-500 border-2" : ""
            }`}
            onChange={(e) =>
              setFormData({ ...formData, TCPolicy: e.target.checked })
            }
          />
          <label className="ml-2 text-sm text-gray-600">
  I agree to the{" "}
  <button
    type="button"
    onClick={() => setShowTerms(true)}
    className="text-[#1C42FF] hover:underline"
  >
    Terms of Service
  </button>
</label>
        </div>
        {errors.TCPolicy && (
          <p className="text-xs text-red-500 mt-1">{errors.TCPolicy}</p>
        )}

        {showTerms && (
  <ModalWrapper onClose={() => setShowTerms(false)}>
    <TermsConditions />
  </ModalWrapper>
)}
      </motion.div>
    </>
  );
}
