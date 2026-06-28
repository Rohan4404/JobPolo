import axios from "axios";

export const API_BASE_URL = "https://jobpolobackend.jobpolo.com";
// export const API_BASE_URL = "https://localhost:6800";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
});
