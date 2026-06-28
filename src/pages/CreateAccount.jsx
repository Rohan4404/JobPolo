// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { ArrowLeft } from "lucide-react";
// import { FcGoogle } from "react-icons/fc";
// import { FaLinkedinIn } from "react-icons/fa";
// import { motion } from "framer-motion";
// import "react-phone-input-2/lib/style.css";
// import { Country, State, City } from "country-state-city";
// import EmployeeForm from "../components/EmployeeForm";
// import EmployerForm from "../components/EmployerForm";
// import { toast } from "react-toastify";
// import { registerEmployee } from "../api/authService"; // adjust path if needed



// export default function CreateAccount() {
//   const navigate = useNavigate();
//   const [accountType, setAccountType] = useState("employee");
//   const [formData, setFormData] = useState({});
//   const [countries, setCountries] = useState([]);
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [selectedCountry, setSelectedCountry] = useState(null);
//   const [selectedState, setSelectedState] = useState(null);
//   const [selectedCity, setSelectedCity] = useState(null);
//   const [isOtpVerified, setIsOtpVerified] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);


//   useEffect(() => {
//     const countryData = Country.getAllCountries().map((c) => ({
//       value: c.isoCode,
//       label: c.name,
//     }));
//     setCountries(countryData);
//   }, []);

//   useEffect(() => {
//     if (selectedCountry) {
//       const stateData = State.getStatesOfCountry(selectedCountry.value).map(
//         (s) => ({
//           value: s.isoCode,
//           label: s.name,
//         })
//       );
//       setStates(stateData);
//       setSelectedState(null);
//       setCities([]);
//       setSelectedCity(null);
//     } else {
//       setStates([]);
//       setSelectedState(null);
//       setCities([]);
//       setSelectedCity(null);
//     }
//   }, [selectedCountry]);

//   useEffect(() => {
//     if (selectedState && selectedCountry) {
//       const cityData = City.getCitiesOfState(
//         selectedCountry.value,
//         selectedState.value
//       ).map((c) => ({
//         value: c.name,
//         label: c.name,
//       }));
//       setCities(cityData);
//       setSelectedCity(null);
//     } else {
//       setCities([]);
//       setSelectedCity(null);
//     }
//   }, [selectedState, selectedCountry]);

//   const inputClass =
//     "w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#1C42FF] focus:border-[#1C42FF] focus:outline-none";

//   const selectStyles = {
//     control: (base, state) => ({
//       ...base,
//       borderColor: state.isFocused ? "#1C42FF" : "#d1d5db",
//       boxShadow: state.isFocused ? "0 0 0 2px rgba(28,66,255,0.3)" : null,
//       "&:hover": { borderColor: "#1C42FF" },
//       borderRadius: "0.5rem",
//       minHeight: "42px",
//     }),
//     menu: (base) => ({
//       ...base,
//       zIndex: 9999,
//       maxHeight: "200px",
//     }),
//     menuList: (base) => ({
//       ...base,
//       maxHeight: "200px",
//       overflowY: "auto",
//     }),
//     option: (base) => ({
//       ...base,
//       padding: "8px 12px",
//       fontSize: "14px",
//     }),
//   };
// const handleSubmit = async (e) => {
//   e.preventDefault();

  

//   try {
//     setIsLoading(true);
//     const response = await registerEmployee(formData);
//     toast.success("Account created successfully");
//     navigate("/login");
//   } catch (error) {
//     toast.error(error.message || "Registration failed");
//   } finally {
//     setIsLoading(false);
//   }
// };


//   return (
//     <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
//       {/* Left side form */}
//       <div className="w-full md:w-1/2 overflow-y-auto max-h-screen">
//         <div className="p-4 sm:p-6 md:p-8 py-6 sm:py-8">
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
//               Create Account
//             </h2>
//           </div>

//           {/* Toggle Switch for Account Type */}
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3 }}
//             className="mb-6 sm:mb-8 bg-gray-200 p-1.5 rounded-full flex relative"
//           >
//             <div
//               className={`absolute top-1.5 bottom-1.5 w-1/2 bg-gradient-to-r from-[#1C42FF] to-[#001478] rounded-full transition-transform duration-300 ease-out ${
//                 accountType === "employer"
//                   ? "translate-x-full"
//                   : "translate-x-0"
//               }`}
//             />
//             <button
//               type="button"
//               onClick={() => setAccountType("employee")}
//               className={`flex-1 py-2 sm:py-3 px-3 sm:px-6 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-300 relative z-10 ${
//                 accountType === "employee" ? "text-white" : "text-gray-700"
//               }`}
//             >
//               I'm an Employee
//             </button>
//             <button
//               type="button"
//               onClick={() => setAccountType("employer")}
//               className={`flex-1 py-2 sm:py-3 px-3 sm:px-6 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-300 relative z-10 ${
//                 accountType === "employer" ? "text-white" : "text-gray-700"
//               }`}
//             >
//               I'm an Employer
//             </button>
//           </motion.div>

//           <form className="space-y-6 sm:space-y-8" onSubmit={handleSubmit}>

//   {accountType === "employee" ? (
//     <EmployeeForm
//   inputClass={inputClass}
//   formData={formData}
//   setFormData={setFormData}
//   countries={countries}
//   states={states}
//   cities={cities}
//   selectedCountry={selectedCountry}
//   setSelectedCountry={setSelectedCountry}
//   selectedState={selectedState}
//   setSelectedState={setSelectedState}
//   selectedCity={selectedCity}
//   setSelectedCity={setSelectedCity}
//   selectStyles={selectStyles}
//   isOtpVerified={isOtpVerified}
//   setIsOtpVerified={setIsOtpVerified}
// />

//   ) : (
//     <EmployerForm
//       inputClass={inputClass}
//       countries={countries}
//       states={states}
//       cities={cities}
//       selectedCountry={selectedCountry}
//       setSelectedCountry={setSelectedCountry}
//       selectedState={selectedState}
//       setSelectedState={setSelectedState}
//       selectedCity={selectedCity}
//       setSelectedCity={setSelectedCity}
//       selectStyles={selectStyles}
//     />
//   )}



//   {/* Submit */}
// <button
//   type="submit"
//   disabled={isLoading}
//   className={`w-full btn-gradient text-white py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base ${
//     isLoading ? "opacity-50 cursor-not-allowed" : ""
//   }`}
// >
//   {isLoading ? "Creating Account..." : `Create ${accountType === "employee" ? "Employee" : "Employer"} Account`}
// </button>


// </form>


//         </div>
//       </div>

//       {/* Right side modern panel */}
//       <div className="hidden md:flex w-1/2 h-screen fixed right-0 top-0 flex-col items-center justify-center bg-gradient-to-br from-[#1C42FF] to-[#001478] overflow-hidden text-white">
//         <div className="absolute w-72 h-72 bg-white/10 rounded-full top-10 left-10 animate-pulse"></div>
//         <div className="absolute w-56 h-56 bg-white/5 rounded-full bottom-20 right-20 animate-bounce"></div>
//         <div className="absolute w-96 h-96 bg-white/5 rounded-full top-1/3 right-1/4 rotate-45 animate-spin-slow"></div>
//         <div className="text-center px-8 z-10">
//           <h3 className="text-4xl font-bold mb-4">
//             {accountType === "employee"
//               ? "Over 175,324 candidates"
//               : "Join 10,000+ Employers"}
//           </h3>
//           <p className="text-gray-100 text-lg">
//             {accountType === "employee"
//               ? "waiting for good employers."
//               : "hiring the best talent."}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }



// CreateAccount.jsx
import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import "react-phone-input-2/lib/style.css";
import { Country, State, City } from "country-state-city";
import EmployeeForm from "../components/EmployeeForm";
import EmployerForm from "../components/EmployerForm";
import { toast } from "react-toastify";
import { registerEmployee } from "../api/authService";
import { registerEmployer } from "../api/authService";
import Navbar from "../components/Navbar";


// 🔹 helper: initial employee form shape (so nothing is undefined)
const initialEmployeeForm = {
  firstName: "",
  lastName: "",
  email: "",
  countryCode: "+91",
  mobileNumber: "",
  gender: "",
  country: "",
  state: "",
  city: "",
  pincode: "",
  industry: "",
  functionArea: "",
  currentCtc: "",
  expectedCtc: "",
  resumeFiles: null,
  workSampleFiles: null,
  password: "",
  confirmPassword: "",
  otp: "",
  TCPolicy: false,
};

const initialEmployerForm = {
  firstName: "",
  lastName: "",
  email: "",
  countryCode: "+91",
  mobileNumber: "",
  companyName: "",
  industry: "",
  functionArea: "",
  country: "",
  state: "",
  city: "",
  pincode: "",
  password: "",
  confirmPassword: "",
  otp: "",
  TCPolicy: false,
};


export default function CreateAccount() {
  const navigate = useNavigate();
  const [accountType, setAccountType] = useState("employee");
  const [formData, setFormData] = useState(initialEmployeeForm);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  

  // 🔹 field-level error object
  const [errors, setErrors] = useState({});

  // ---------- COUNTRY / STATE / CITY ----------
  useEffect(() => {
    const countryData = Country.getAllCountries().map((c) => ({
      value: c.isoCode,
      label: c.name,
    }));
    setCountries(countryData);
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const stateData = State.getStatesOfCountry(selectedCountry.value).map(
        (s) => ({
          value: s.isoCode,
          label: s.name,
        })
      );
      setStates(stateData);
      setSelectedState(null);
      setCities([]);
      setSelectedCity(null);
    } else {
      setStates([]);
      setSelectedState(null);
      setCities([]);
      setSelectedCity(null);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState && selectedCountry) {
      const cityData = City.getCitiesOfState(
        selectedCountry.value,
        selectedState.value
      ).map((c) => ({
        value: c.name,
        label: c.name,
      }));
      setCities(cityData);
      setSelectedCity(null);
    } else {
      setCities([]);
      setSelectedCity(null);
    }
  }, [selectedState, selectedCountry]);

  const inputClass =
    "w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-[#1C42FF] focus:border-[#1C42FF] focus:outline-none";

  const selectStyles = {
    control: (base, state) => ({
      ...base,
      borderColor: state.isFocused ? "#1C42FF" : "#d1d5db",
      boxShadow: state.isFocused ? "0 0 0 2px rgba(28,66,255,0.3)" : null,
      "&:hover": { borderColor: "#1C42FF" },
      borderRadius: "0.5rem",
      minHeight: "42px",
    }),
    menu: (base) => ({
      ...base,
      zIndex: 9999,
      maxHeight: "200px",
    }),
    menuList: (base) => ({
      ...base,
      maxHeight: "200px",
      overflowY: "auto",
    }),
    option: (base) => ({
      ...base,
      padding: "8px 12px",
      fontSize: "14px",
    }),
  };

  // ---------- VALIDATION FOR EMPLOYEE ----------
  const validateEmployeeForm = (data) => {
    const newErrors = {};

    // Basic trim helper
    const isEmpty = (val) => !val || String(val).trim() === "";

    if (isEmpty(data.firstName)) newErrors.firstName = "First name is required";
    if (isEmpty(data.lastName)) newErrors.lastName = "Last name is required";

    if (isEmpty(data.email)) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (isEmpty(data.countryCode)) {
      newErrors.mobileNumber = "Country code missing";
    }
    if (isEmpty(data.mobileNumber) || String(data.mobileNumber).length < 10) {
      newErrors.mobileNumber = "Enter a valid mobile number";
    }

    if (isEmpty(data.gender)) newErrors.gender = "Gender is required";

    if (isEmpty(data.country)) newErrors.country = "Country is required";
    if (isEmpty(data.state)) newErrors.state = "State is required";
    if (isEmpty(data.city)) newErrors.city = "City is required";
    if (isEmpty(data.pincode)) newErrors.pincode = "Pincode is required";

    if (isEmpty(data.industry)) newErrors.industry = "Industry is required";
    if (isEmpty(data.functionArea))
      newErrors.functionArea = "Function area is required";

    if (isEmpty(data.password)) newErrors.password = "Password is required";
    if (isEmpty(data.confirmPassword))
      newErrors.confirmPassword = "Confirm password is required";
    if (
      !isEmpty(data.password) &&
      !isEmpty(data.confirmPassword) &&
      data.password !== data.confirmPassword
    ) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (isEmpty(data.otp)) newErrors.otp = "OTP is required";

    if (!data.TCPolicy) {
      newErrors.TCPolicy = "You must agree to the Terms of Service";
    }

    // resumeFiles/workSampleFiles left optional (backend accepts empty)

    return newErrors;
  };

  const validateEmployerForm = (data) => {
  const newErrors = {};
  const isEmpty = (v) => !v || String(v).trim() === "";

  if (isEmpty(data.companyName)) newErrors.companyName = "Company name is required";

  if (isEmpty(data.firstName)) newErrors.firstName = "First name is required";
  if (isEmpty(data.lastName)) newErrors.lastName = "Last name is required";

  if (isEmpty(data.email)) {
    newErrors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    newErrors.email = "Enter valid email";
  }

  if (isEmpty(data.country) || isEmpty(data.state) || isEmpty(data.city))
    newErrors.location = "Country, State, and City are required";

  if (isEmpty(data.pincode)) newErrors.pincode = "Pincode is required";

  if (isEmpty(data.mobileNumber) || String(data.mobileNumber).length < 10)
    newErrors.mobileNumber = "Enter valid mobile number";

  if (isEmpty(data.industry)) newErrors.industry = "Industry is required";
  if (isEmpty(data.functionArea)) newErrors.functionArea = "Function area is required";

  if (isEmpty(data.password)) newErrors.password = "Password is required";
  if (isEmpty(data.confirmPassword))
    newErrors.confirmPassword = "Confirm password is required";
  if (data.password !== data.confirmPassword)
    newErrors.confirmPassword = "Passwords do not match";

  if (isEmpty(data.otp)) newErrors.otp = "OTP is required";

  if (!data.TCPolicy) newErrors.TCPolicy = "You must accept Terms & Conditions";

  return newErrors;
};


  // memoized validity flag for disabling the button
  const isEmployeeValid = useMemo(() => {
    if (accountType !== "employee") return true; // don't block employer flow for now
    const validationErrors = validateEmployeeForm(formData);
    return Object.keys(validationErrors).length === 0;
  }, [formData, accountType]);

  const isEmployerValid = useMemo(() => {
  if (accountType !== "employer") return true;
  return Object.keys(validateEmployerForm(formData)).length === 0;
}, [formData, accountType]);

const isEmployeeFormValid = () => {
  const required = [
    "firstName","lastName","email","countryCode","mobileNumber",
    "gender","country","state","city","pincode",
    "industry","functionArea",
    "currentCtc","expectedCtc",
    "password","confirmPassword","otp"
  ];

  return required.every((key) => formData[key] && formData[key] !== "") &&
         formData.password === formData.confirmPassword &&
         formData.TCPolicy === true;
};

const isEmployerFormValid = () => {
  const required = [
    "firstName","lastName","email","countryCode","mobileNumber",
    "country","state","city","pincode",
    "companyName","industry","functionArea",
    "password","confirmPassword","otp"
  ];

  return required.every((key) => formData[key] && formData[key] !== "") &&
         formData.password === formData.confirmPassword &&
         formData.TCPolicy === true;
};


  // ---------- SUBMIT ----------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (accountType === "employee") {
      const validationErrors = validateEmployeeForm(formData);
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length > 0) {
        toast.error("Please fix the highlighted fields.");
        return;
      }
    }

    try {
      setIsLoading(true);

      if (accountType === "employee") {
        const response = await registerEmployee(formData);
        toast.success(response?.message || "Account created successfully");
      } else {
  const validationErrors = validateEmployerForm(formData);
  setErrors(validationErrors);

  if (Object.keys(validationErrors).length > 0) {
    toast.error("Please fix the highlighted fields.");
    setIsLoading(false);
    return;
  }

  const response = await registerEmployer(formData);
  toast.success(response?.message || "Employer account created successfully");
}


      navigate("/login");
    } catch (error) {
      console.error("REGISTER ERROR FRONT:", error);

      // Backend usually sends: { success, status, message, error }
      const msg =
        error?.message ||
        error?.error ||
        "Registration failed. Please check details and try again.";

      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormInvalid =
  accountType === "employer"
    ? !isEmployerFormValid()
    : !isEmployeeFormValid();

  return (
     <>
  <Navbar />
    <div className="h-screen flex flex-col md:flex-row bg-gray-50 overflow-hidden">
      {/* Left side form */}
     <div className="w-full md:w-1/2 h-full pt-[60px] flex flex-col bg-gray-50 relative z-10">

  {/* 🔥 FIXED HEADER (NO SCROLL) */}
  <div className="px-4 sm:px-6 md:px-8 py-6 bg-gray-50 z-20">

    {/* Heading */}
    <div
      className="flex items-center gap-2 mb-4 cursor-pointer"
      onClick={() => navigate("/login")}
    >
      <ArrowLeft
        className="text-white btn-gradient rounded-full p-1"
        size={20}
      />
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
        Create Account
      </h2>
    </div>

    {/* Toggle */}
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-200 p-1.5 rounded-full flex relative"
    >
      <div
        className={`absolute top-1.5 bottom-1.5 w-1/2 bg-gradient-to-r from-[#1C42FF] to-[#001478] rounded-full transition-transform duration-300 ${
          accountType === "employer"
            ? "translate-x-full"
            : "translate-x-0"
        }`}
      />

      <button
        type="button"
        onClick={() => {
          setAccountType("employee");
          setFormData(initialEmployeeForm);
          setErrors({});
        }}
        className={`flex-1 py-2 sm:py-3 px-3 sm:px-6 rounded-full text-xs sm:text-sm font-semibold relative z-10 ${
          accountType === "employee" ? "text-white" : "text-gray-700"
        }`}
      >
        I'm an Employee
      </button>

      <button
        type="button"
        onClick={() => {
          setAccountType("employer");
          setFormData(initialEmployerForm);
          setErrors({});
        }}
        className={`flex-1 py-2 sm:py-3 px-3 sm:px-6 rounded-full text-xs sm:text-sm font-semibold relative z-10 ${
          accountType === "employer" ? "text-white" : "text-gray-700"
        }`}
      >
        I'm an Employer
      </button>
    </motion.div>
  </div>

  {/* 🔥 SCROLLABLE FORM ONLY */}
  <div className="flex-1 overflow-y-auto hide-scrollbar px-4 sm:px-6 md:px-8 pb-10">

    <form className="space-y-6 sm:space-y-8" onSubmit={handleSubmit}>

      {accountType === "employee" ? (
        <EmployeeForm
          inputClass={inputClass}
          formData={formData}
          setFormData={setFormData}
          countries={countries}
          states={states}
          cities={cities}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          selectedState={selectedState}
          setSelectedState={setSelectedState}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          selectStyles={selectStyles}
          errors={errors}
        />
      ) : (
        <EmployerForm
          inputClass={inputClass}
          formData={formData}
          setFormData={setFormData}
          countries={countries}
          states={states}
          cities={cities}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          selectedState={selectedState}
          setSelectedState={setSelectedState}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          selectStyles={selectStyles}
          errors={errors}
        />
      )}

      {/* ✅ BUTTON FIXED */}
      <div
        className="w-full relative group"
        onClick={() => {
          if (isFormInvalid) {
            toast.error("Please fill all required details");
          }
        }}
      >
        <button
          type="submit"
          disabled={isLoading || isFormInvalid}
          className={`w-full btn-gradient text-white py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base 
          ${
            isLoading || isFormInvalid
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer"
          }`}
        >
          {isLoading
            ? "Creating Account..."
            : `Create ${accountType === "employee" ? "Employee" : "Employer"} Account`}
        </button>

        {/* Hover Tooltip */}
        {isFormInvalid && (
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition">
            Please fill all details
          </div>
        )}
      </div>

    </form>
  </div>

  {/* Bottom scroll hint */}
  <div className="pointer-events-none absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-gray-50 to-transparent" />
</div>

      {/* Right side modern panel */}
      <div className="hidden md:flex w-1/2 h-screen fixed right-0 top-0 flex-col items-center justify-center bg-gradient-to-br from-[#1C42FF] to-[#001478] overflow-hidden text-white">
        <div className="absolute w-72 h-72 bg-white/10 rounded-full top-10 left-10 animate-pulse"></div>
        <div className="absolute w-56 h-56 bg-white/5 rounded-full bottom-20 right-20 animate-bounce"></div>
        <div className="absolute w-96 h-96 bg-white/5 rounded-full top-1/3 right-1/4 rotate-45 animate-spin-slow"></div>
        <div className="text-center px-8 z-10">
          <h3 className="text-4xl font-bold mb-4">
            {accountType === "employee"
              ? "Over 175,324 candidates"
              : "Join 10,000+ Employers"}
          </h3>
          <p className="text-gray-100 text-lg">
            {accountType === "employee"
              ? "waiting for good employers."
              : "hiring the best talent."}
          </p>
        </div>
      </div>
    </div>
    </>
  );
}
