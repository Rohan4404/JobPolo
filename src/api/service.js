import client from "./client"; // your configured Axios client

export const sendEmployeeOtp = async (email) => {
  try {
    const response = await client.get(`/api/v1/auth/employee/send-otp`, {
      params: {
        email,
        action: "LOGIN",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw error;
  }
};
