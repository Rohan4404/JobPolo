import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PhoneInput from "react-phone-input-2";
import Select from "react-select";
import { Eye, EyeOff } from "lucide-react";
import { sendOtp } from "../api/authService";
import { toast } from "react-toastify";
import ModalWrapper from "../components/ModalWrapper";
import TermsConditions from "../pages/Terms&Condition";

export default function EmployerForm({
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
  selectStyles
}) {
  const [otpSent, setOtpSent] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [phoneValue, setPhoneValue] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  // Disable Send OTP until email format becomes valid
  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
  useEffect(() => {
  if (!otpSent || secondsLeft <= 0) return;

  const timer = setInterval(() => {
    setSecondsLeft((prev) => prev - 1);
  }, 1000);

  return () => clearInterval(timer);
}, [otpSent, secondsLeft]);

  // Auto-fetch City/State from Pincode
  useEffect(() => {
    const fetchLocation = async () => {
      if (!formData.pincode || formData.pincode.length !== 6) return;

      try {
        const res = await fetch(
          `https://api.postalpincode.in/pincode/${formData.pincode}`
        );
        const data = await res.json();

        if (data[0].Status === "Success") {
          const post = data[0].PostOffice[0];
          setFormData({
            ...formData,
            city: post.District,
            state: post.State,
            country: "India"
          });

          toast.info(`📍 Auto-filled: ${post.District}, ${post.State}`);
        }
      } catch (err) {
        console.log("PIN API error", err);
      }
    };
    fetchLocation();
  }, [formData.pincode]);

  // Send OTP Handler
const sendOtpHandler = async () => {
  if (!formData.email) return toast.error("Enter email first");
  if (!isValidEmail(formData.email)) return toast.error("Enter valid email");
  if (secondsLeft > 0) return; // 🔥 prevent spam

  try {
    setSendingOtp(true);

    const res = await sendOtp(formData.email, "EMPLOYER-REGISTER");

    toast.success(res?.message || "OTP sent successfully!");

    setOtpSent(true);
    setSecondsLeft(150);

  } catch (error) {
    toast.error(error?.message || "Failed to send OTP");
  } finally {
    setSendingOtp(false);
  }
};
const formatTime = (time) => {
  const min = Math.floor(time / 60);
  const sec = time % 60;
  return `${min}:${sec < 10 ? "0" : ""}${sec}`;
};

  return (
    <>
      {/* PERSONAL INFO */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>
        <h3 className="form-title">Personal Details</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <div>
            <label className="field-label">First Name *</label>
            <input className={inputClass} placeholder="John"
              onChange={(e)=>setFormData({...formData, firstName:e.target.value})}/>
          </div>

          <div>
            <label className="field-label">Last Name *</label>
            <input className={inputClass} placeholder="Doe"
              onChange={(e)=>setFormData({...formData, lastName:e.target.value})}/>
          </div>

          <div className="sm:col-span-2">
            <label className="field-label">Email *</label>
            <div className="flex gap-2">
              <input type="email" className={`${inputClass} flex-1`} placeholder="you@example.com"
                onChange={(e)=>setFormData({...formData, email:e.target.value})}/>

        <button
  type="button"
  onClick={sendOtpHandler}
  disabled={sendingOtp || secondsLeft > 0 || !isValidEmail(formData.email)}
  className={`btn-gradient text-white text-sm px-3 py-2 rounded-lg min-w-[140px]
  ${
    sendingOtp || secondsLeft > 0 || !isValidEmail(formData.email)
      ? "opacity-50 cursor-not-allowed"
      : "cursor-pointer"
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

            {otpSent && (
              <div className="mt-2">
                <input className={inputClass} placeholder="Enter OTP"
                  onPaste={(e)=>e.preventDefault()}
                  onChange={(e)=>setFormData({...formData, otp:e.target.value})}/>
       
              </div>
            )}
          </div>

          <div>
            <label className="field-label">Mobile Number *</label>
            <PhoneInput
              country="in"
              enableSearch
              value={phoneValue}
              onChange={(value,data)=>{
                setPhoneValue(value);
                const dial = data.dialCode;
                let raw = value.replace(/\D/g,"");
                if(raw.startsWith(dial)) raw = raw.slice(dial.length);
                setFormData({...formData, countryCode:`+${dial}`, mobileNumber:raw});
              }}
              inputStyle={{width:"100%",height:"42px",borderRadius:"8px"}}
            />
          </div>

        </div>
      </motion.div>

      {/* COMPANY INFO */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>
        <h3 className="form-title">Company Information</h3>

        <label className="field-label">Company Name *</label>
        <input className={inputClass} placeholder="Your Company Ltd."
          onChange={(e)=>setFormData({...formData, companyName:e.target.value})}/>

        <label className="field-label mt-3">Industry *</label>
        <select className={inputClass}
          onChange={(e)=>setFormData({...formData, industry:e.target.value})}>
          <option>--Select--</option>
          <option>Advertising</option>
          <option>IT</option>
          <option>Finance</option>
        </select>

        <label className="field-label mt-3">Function Area *</label>
        <select className={inputClass}
          onChange={(e)=>setFormData({...formData, functionArea:e.target.value})}>
          <option>--Select--</option>
          <option>Account</option>
          <option>HR</option>
          <option>Engineering</option>
        </select>
      </motion.div>

      {/* LOCATION */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>
        <h3 className="form-title">Location</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <div>
            <label className="field-label">Pincode *</label>
            <input className={inputClass} placeholder="6-digit"
              onChange={(e)=>setFormData({...formData, pincode:e.target.value})}/>
          </div>

          <div>
            <label className="field-label">Country *</label>
            <Select styles={selectStyles} options={countries} value={selectedCountry}
              onChange={(v)=>{ setSelectedCountry(v); setFormData({...formData, country:v.label})}}/>
          </div>

          <div>
            <label className="field-label">State *</label>
            <Select styles={selectStyles} options={states} value={selectedState}
              onChange={(v)=>{ setSelectedState(v); setFormData({...formData, state:v.label})}}
              isDisabled={!selectedCountry}/>
          </div>

          <div>
            <label className="field-label">City *</label>
            <Select styles={selectStyles} options={cities} value={selectedCity}
              onChange={(v)=>{ setSelectedCity(v); setFormData({...formData, city:v.label})}}
              isDisabled={!selectedState}/>
          </div>

        </div>
      </motion.div>

      {/* SECURITY */}
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>
        <h3 className="form-title">Security</h3>

        <div className="relative mt-2">
          <input type={showPass ? "text" : "password"} className={inputClass} placeholder="Password"
            onChange={(e)=>setFormData({...formData, password:e.target.value})}/>
          <span className="absolute right-3 top-3 cursor-pointer"
            onClick={()=>setShowPass(!showPass)}>
            {showPass ? <EyeOff size={18}/> : <Eye size={18}/>}
          </span>
        </div>

        <div className="relative mt-3">
          <input type={showConfirmPass ? "text" : "password"} className={inputClass} placeholder="Confirm Password"
            onChange={(e)=>setFormData({...formData, confirmPassword:e.target.value})}/>
          <span className="absolute right-3 top-3 cursor-pointer"
            onClick={()=>setShowConfirmPass(!showConfirmPass)}>
            {showConfirmPass ? <EyeOff size={18}/> : <Eye size={18}/>}
          </span>
        </div>

        <div className="flex items-center mt-3">
          <input type="checkbox" className="h-4 w-4"
            onChange={(e)=>setFormData({...formData, TCPolicy:e.target.checked})}/>
          <label className="ml-2 text-sm text-gray-600">
            I agree to the{" "}
            <button
  type="button"
  onClick={() => setShowTerms(true)}
  className="text-blue-600 hover:underline"
>
  Terms of Service
</button>
          </label>
        </div>
        {showTerms && (
  <ModalWrapper onClose={() => setShowTerms(false)}>
    <TermsConditions />
  </ModalWrapper>
)}
      </motion.div>
      
    </>
  );
}
