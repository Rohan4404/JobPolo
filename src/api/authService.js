import { apiClient } from "./client";


export const sendOtp = async (email, action) => {
  if (!email) throw new Error("Email is required to send OTP.");
  if (!action) throw new Error("Action type is required to send OTP.");

  try {
    console.log(`➡️ Sending OTP to ${email} with action: ${action}`);
    const response = await apiClient.post(
      `/api/v1/auth/employee/send-otp?email=${encodeURIComponent(email)}&action=${encodeURIComponent(action)}`
    );
    console.log("✅ OTP Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ OTP Error:", error.response?.data || error);
    throw error.response?.data || { message: "Failed to send OTP" };
  }
};

export const loginUser = async ({ email, password, otp, googleToken }) => {
  if (!email) throw new Error("Email is required to log in.");

  try {
    // 🧠 Dynamically build the request body
    const payload = { email };

    if (password) {
      payload.password = password;
    } else if (otp) {
      payload.otp = otp;
    } else if (googleToken) {
      payload.googleToken = googleToken;
    } else {
      throw new Error("Please provide either password, OTP, or Google token.");
    }

    console.log("➡️ Login Payload:", payload);

    const response = await apiClient.post("/api/v1/auth/employee/login", payload);

    console.log("✅ Login Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Login Error:", error.response?.data || error);
    throw error.response?.data || { message: "Login failed" };
  }
};

export const forgotPassword = async ({ email, password, confirmPassword, otp }) => {
  if (!email || !otp || !password || !confirmPassword) {
    throw new Error("All fields are required.");
  }

  try {
    const response = await apiClient.post("/api/v1/auth/employee/forgot-password", {
      email,
      password,
      confirmPassword,
      otp,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to reset password." };
  }
};

export const registerEmployee = async (formData) => {
  try {
    const fd = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === "resumeFiles" || key === "workSampleFiles") {
        if (value && value.length > 0) {
          Array.from(value).forEach((file) => fd.append(key, file));
        }
      } else if (value !== undefined && value !== null) {
        fd.append(key, value);
      }
    });

    console.log("📌 Final FormData sent:");
    for (let p of fd.entries()) console.log("FD:", p[0], p[1]);

    const response = await apiClient.post(
      "/api/v1/auth/employee/register",
      fd,
      {
        transformRequest: (data) => data, // ← important
      }
    );

    return response.data;

  } catch (error) {
    console.error("❌ REGISTER ERROR:", error.response?.data || error);
    throw error.response?.data || { message: "Registration failed" };
  }
};

export const registerEmployer = async (formData) => {
  try {
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    const response = await apiClient.post(
      `/api/v1/auth/employer/register`,
      data,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    return response.data;
  } catch (error) {
    console.error("❌ EMPLOYER REGISTER ERROR:", error.response?.data || error);
    throw error.response?.data || { message: "Employer registration failed" };
  }
};

