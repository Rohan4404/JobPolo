// import { API_BASE_URL } from "./client";
// import axios from "axios";

// export const createOrUpdateEmployerJob = async (formData) => {
//   const token = sessionStorage.getItem("token");

//   const URL = `${API_BASE_URL}/api/v1/job/employer/post-job`;

//   const response = await axios.post(URL, formData, {
//     headers: {
//       "x-access-token": token,
//     },
//   });

//   return response.data;
// };

// export const getJobs = async (page = 5, limit = 100) => {
//   const URL = `${API_BASE_URL}/api/v1/job/employee/get-jobs-with`;

//   const response = await axios.get(URL, {
//     params: {
//       page,
//       limit,
//     },
//   });

//   return response.data;
// };

// export const updateEmployerJob = async (jobId, formData) => {
//   const token =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxMDZjYmNhZS0yYTY2LTQ4MjgtOGJlYy01YzE5MWQyYmI1YjEiLCJlbWFpbCI6InJvaGFuc2hhcm1hOTlhbmNAZ21haWwuY29tIiwicm9sZSI6IkVNUExPWUVSIiwiaWF0IjoxNzYyMjQ1NzA3LCJleHAiOjE3NjQ4Mzc3MDd9.8rvu5IoulJgVkwwIkhxPWvlfDQqYkRBlNDTNf6108jM";

//   const URL = `${API_BASE_URL}/api/v1/job/employer/update-job/${jobId}`;

//   const response = await axios.put(URL, formData, {
//     headers: {
//       "x-access-token": token,
//     },
//   });

//   return response.data;
// };

// export const deleteEmployerJob = async (jobId) => {
//   const token =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxMDZjYmNhZS0yYTY2LTQ4MjgtOGJlYy01YzE5MWQyYmI1YjEiLCJlbWFpbCI6InJvaGFuc2hhcm1hOTlhbmNAZ21haWwuY29tIiwicm9sZSI6IkVNUExPWUVSIiwiaWF0IjoxNzYyMjQ1NzA3LCJleHAiOjE3NjQ4Mzc3MDd9.8rvu5IoulJgVkwwIkhxPWvlfDQqYkRBlNDTNf6108jM";

//   const URL = `${API_BASE_URL}/api/v1/job/employer/delete-job/${jobId}`;

//   const response = await axios.delete(URL, {
//     headers: {
//       "x-access-token": token,
//     },
//   });

//   return response.data;
// };

// export const getAllCategories = async () => {
//   const URL = `${API_BASE_URL}/api/v1/category/super-admin/get-category?is_active=true`;

//   const response = await axios.get(URL);

//   return response.data;
// };

// export const getUserProfile = async () => {
//   // Fetch user ID from sessionStorage
//   const userId = sessionStorage.getItem("userId");

//   if (!userId) {
//     throw new Error("User ID not found in sessionStorage");
//   }

//   const URL = `${API_BASE_URL}/api/v1/auth/employee/get-user-profile/${userId}`;

//   const response = await axios.get(URL);

//   return response.data;
// };

import { API_BASE_URL } from "./client";
import axios from "axios";

// 🔹 Global Helpers
const getToken = () => sessionStorage.getItem("token");
const getUserId = () => sessionStorage.getItem("userId");
const token = getToken();
const userId = getUserId();

console.log("token AND USER ID IS", token, userId);
// --------------------------------------------------
// CREATE or UPDATE EMPLOYER JOB
// --------------------------------------------------
export const createOrUpdateEmployerJob = async (formData) => {
  const token = getToken();

  const URL = `${API_BASE_URL}/api/v1/job/employer/post-job`;

  const response = await axios.post(URL, formData, {
    headers: {
      "x-access-token": token,
    },
  });

  return response.data;
};

// --------------------------------------------------
// GET JOBS
// --------------------------------------------------
export const getJobs = async (page = 1, limit = 10) => {
  const URL = `${API_BASE_URL}/api/v1/job/employee/get-jobs-with`;

  const response = await axios.get(URL, {
    params: { page, limit },
  });

  return response.data;
};

export const getJobsFilters = async ({
  page = 1,
  limit = 100,
  search,
  mode,
  city,
  employmentType,
  state,
  country,
  pincode,
  userId,
  is_active,
} = {}) => {
  const URL = `${API_BASE_URL}/api/v1/job/employee/get-jobs-with`;

  // Collect all filters, but only include ones that have a value
  const params = {};

  if (search) params.search = search;
  if (mode) params.mode = mode;
  if (city) params.city = city;
  if (employmentType) params.employmentType = employmentType;
  if (state) params.state = state;
  if (country) params.country = country;
  if (pincode) params.pincode = pincode;
  if (userId) params.userId = userId;
  if (typeof is_active === "boolean") params.is_active = is_active;

  // Always include page & limit
  params.page = page;
  params.limit = limit;

  const response = await axios.get(URL, { params });

  return response.data;
};

// --------------------------------------------------
// UPDATE EMPLOYER JOB
// --------------------------------------------------
export const updateEmployerJob = async (jobId, formData) => {
  const token = getToken();

  const URL = `${API_BASE_URL}/api/v1/job/employer/update-job/${jobId}`;

  const response = await axios.put(URL, formData, {
    headers: {
      "x-access-token": token,
    },
  });

  return response.data;
};

// --------------------------------------------------
// DELETE EMPLOYER JOB
// --------------------------------------------------
export const deleteEmployerJob = async (jobId) => {
  const token = getToken();

  const URL = `${API_BASE_URL}/api/v1/job/employer/delete-job/${jobId}`;

  const response = await axios.delete(URL, {
    headers: {
      "x-access-token": token,
    },
  });

  return response.data;
};

// --------------------------------------------------
// GET ALL ACTIVE CATEGORIES
// --------------------------------------------------
export const getAllCategories = async () => {
  const URL = `${API_BASE_URL}/api/v1/category/super-admin/get-category?is_active=true`;

  const response = await axios.get(URL);

  return response.data;
};

export const addCategory = async (formData) => {
  const token = getToken(); // ⬅️ Get token

  const URL = `${API_BASE_URL}/api/v1/category/super-admin/add-category`;

  const response = await axios.post(URL, formData, {
    headers: {
      "x-access-token": token,
    },
  });

  return response.data;
};

export const updateCategory = async (formData) => {
  const token = getToken();

  const URL = `${API_BASE_URL}/api/v1/category/super-admin/update-category`;

  const response = await axios.put(URL, formData, {
    headers: {
      "x-access-token": token,
    },
  });

  return response.data;
};

export const deleteCategory = async (categoryID) => {
  const token = getToken();

  const URL = `${API_BASE_URL}/api/v1/category/super-admin/delete-category/${categoryID}`;

  const response = await axios.delete(URL, {
    headers: {
      "x-access-token": token,
    },
  });

  return response.data;
};

// --------------------------------------------------
// GET USER PROFILE USING SESSION USER ID
// --------------------------------------------------
export const getUserProfile = async () => {
  const userId = getUserId();
  const token = getToken();

  if (!userId) {
    throw new Error("User ID not found in sessionStorage");
  }

  if (!token) {
    throw new Error("Token not found in sessionStorage");
  }

  const URL = `${API_BASE_URL}/api/v1/auth/employee/get-user-profile/${userId}`;

  const response = await axios.get(URL, {
    headers: {
      "x-access-token": token,
    },
  });

  return response.data;
};

export const resetPassword = async (password, confirmPassword, otp) => {
  const userId = getUserId();
  const token = getToken();

  if (!userId) throw new Error("User ID not found in sessionStorage");
  if (!token) throw new Error("Token not found in sessionStorage");

  const URL = `${API_BASE_URL}/api/v1/auth/employee/reset-password`;

  const payload = {
    userId,
    password,
    confirmPassword,
    otp,
  };

  const response = await axios.post(URL, payload, {
    headers: {
      "x-access-token": token,
    },
  });

  return response.data;
};

export const employeerRegister = async (formData) => {
  const URL = `${API_BASE_URL}/api/v1/auth/employer/register`;

  const response = await axios.post(URL, formData);

  return response.data;
};

export const getUserProfilewith = async (
  page = 1,
  limit = 20,
  arg3 = "",
  arg4 = "",
) => {
  const token = getToken();
  const URL = `${API_BASE_URL}/api/v1/auth/super-admin/get-users-with`;

  // VALID ROLES
  const validRoles = ["SUPER_ADMIN", "EMPLOYER", "EMPLOYEE"];

  // Detect what arg3 & arg4 are
  let role = "";
  let userId = "";

  if (validRoles.includes(arg3)) {
    // Case: (page, limit, role, userId)
    role = arg3;
    userId = arg4;
  } else {
    // Case: (page, limit, userId)
    userId = arg3;
  }

  const params = { page, limit };

  if (userId) params.userId = userId;
  if (role) params.role = role;

  // console.log("Final Sent Params:", params);

  const response = await axios.get(URL, {
    params,
    headers: {
      "x-access-token": token,
    },
  });

  return response.data;
};

export const updateUserStatusAndDelete = async ({ actionType, userId }) => {
  console.log("action and user id", actionType, userId);

  const token = getToken();
  const URL = `${API_BASE_URL}/api/v1/auth/super-admin/delete-or-cancel-user`;

  const response = await axios.delete(URL, {
    params: {
      actionType,
      userId,
    },
    headers: {
      "x-access-token": token,
    },
  });

  return response.data;
};

// --------------------------------------------------
// APPLY JOB (EMPLOYEE)
// --------------------------------------------------
export const applyJob = async (formData) => {
  const token = getToken();
  const URL = `${API_BASE_URL}/api/v1/job/employee/apply-job`;

  const response = await axios.post(URL, formData, {
    headers: {
      "x-access-token": token,
      // "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// export const saveQuery = async (jobId) => {
//   const token = getToken();

//   const URL = `${API_BASE_URL}/api/v1/job/common/saved-details/JOB/${jobId}`;

//   const payload = {
//     saveViewType: "JOB",
//   };

//   const response = await axios.post(URL, payload, {
//     headers: {
//       "x-access-token": token,
//     },
//   });

//   return response.data;
// };

// --------------------------------------------------
// GET SAVED JOBS
// --------------------------------------------------

export const saveQuery = async (jobId, saveViewType = "JOB") => {
  const token = getToken();

  const URL = `${API_BASE_URL}/api/v1/job/common/saved-details/${saveViewType}/${jobId}`;

  const payload = {
    saveViewType,
  };

  const response = await axios.post(URL, payload, {
    headers: {
      "x-access-token": token,
    },
  });

  return response.data;
};
// export const getSavedQueries = async ({
//   page = 0,
//   limit = 20,
//   search = "",
//   startDate = "",
//   endDate = "",
// } = {}) => {
//   const token = getToken();

//   const URL = `${API_BASE_URL}/api/v1/job/common/get-save-view-activity`;

//   const params = {
//     activityType: "SAVED",
//     page,
//     limit,
//     type: "JOB",
//     is_active: true,
//     sort: "NEWEST",
//     startDate,
//     endDate,
//     search,
//   };

//   const response = await axios.get(URL, {
//     params,
//     headers: {
//       "x-access-token": token,
//     },
//   });

//   return response.data;
// };

export const getSavedQueries = async ({
  page = 0,
  limit = 20,
  search = "",
  startDate = "",
  endDate = "",
  type = "JOB",
  sort = "NEWEST",
} = {}) => {
  const token = getToken();

  const URL = `${API_BASE_URL}/api/v1/job/common/get-save-view-activity`;

  const params = {
    activityType: "SAVED",
    page,
    limit,
    type,
    is_active: true,
    sort,
    startDate,
    endDate,
    search,
  };

  const response = await axios.get(URL, {
    params,
    headers: {
      "x-access-token": token,
    },
  });

  return response.data;
};



export const getAppliedJobs = async (params = {}) => {
  const token = sessionStorage.getItem("token");

  const URL = `${API_BASE_URL}/api/v1/job/common/get-save-view-activity`;

  const response = await axios.get(URL, {
    params: {
      activityType: "VIEWED", // ✅ DIFFERENT
      type: "JOB_APPLICATION", // ✅ DIFFERENT
      page: 0,
      limit: 50,
      is_active: true,
      sort: "NEWEST",
      ...params,
    },
    headers: {
      "x-access-token": token,
    },
  });

  return response.data;
};

// --------------------------------------------------
// WITHDRAW JOB APPLICATION
// --------------------------------------------------
export const withdrawJobApplication = async (applicationId, reason) => {
  const token = sessionStorage.getItem("token");

  const URL = `${API_BASE_URL}/api/v1/job/employee/withdraw-job-application`;

  const response = await axios.post(URL, null, {
    params: {
      applicationId,
      reason,
    },
    headers: {
      "x-access-token": token,
    },
  });

  return response.data;
};

export const getActiveJobApplications = async ({
  page = 1,
  limit = 10,
  status,
  search,
  startDate,
  endDate,
  appliedBy,
  employeeId,
  jobId,
  employerId,
  categoryId,
} = {}) => {
  const token = getToken();

  const URL = `${API_BASE_URL}/api/v1/job/common/get-active-job-applications/`;

  const params = {};

  if (status) params.status = status;
  if (search) params.search = search;
  if (startDate) params.startDate = startDate;
  if (endDate) params.endDate = endDate;
  if (appliedBy) params.appliedBy = appliedBy;
  if (employeeId) params.employeeId = employeeId;
  if (jobId) params.jobId = jobId;
  if (employerId) params.employerId = employerId;
  if (categoryId) params.categoryId = categoryId;

  params.page = page;
  params.limit = limit;

  const response = await axios.get(URL, {
    params,
    headers: {
      "x-access-token": token,
    },
  });

  return response.data;
};

// ------------------- JOB UPLOAD (SUPER ADMIN)------------------
export const bulkUploadJobs = async (formData) => {
  const token = sessionStorage.getItem("token");

  const URL = `${API_BASE_URL}/api/v1/job/super-admin/bulk-upload-job-post`;

  const response = await axios.post(URL, formData, {
    headers: {
      "x-access-token": token,
      // DO NOT set content-type manually for FormData
    },
  });

  return response.data;
};

export const AddBlogType = async (form) => {
  const token = sessionStorage.getItem("token");

  const URL = `${API_BASE_URL}/api/v1/post/super-admin/add-post-type`;

  const body = {
    name: form.name,
    description: form.description,
  };

  const response = await axios.post(URL, body, {
    headers: {
      "x-access-token": token,
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

export const updatePostType = async (id, form) => {
  const token = sessionStorage.getItem("token");

  const URL = `${API_BASE_URL}/api/v1/post/super-admin/update-post-type/${id}`;

  const body = {
    name: form.name,
    description: form.description,
    is_active: form.is_active, // boolean
  };

  const response = await axios.put(URL, body, {
    headers: {
      "x-access-token": token,
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

export const getPostTypes = async ({ is_active, search, page, limit } = {}) => {
  const token = sessionStorage.getItem("token");

  const URL = `${API_BASE_URL}/api/v1/post/super-admin/get-post-types`;

  // Build params only if present
  const params = {};
  if (is_active !== undefined) params.is_active = is_active;
  if (search) params.search = search;
  if (page) params.page = page;
  if (limit) params.limit = limit;

  const response = await axios.get(URL, {
    headers: {
      "x-access-token": token,
    },
    params,
  });

  return response.data;
};

export const deletePostType = async (id) => {
  const token = sessionStorage.getItem("token");

  const URL = `${API_BASE_URL}/api/v1/post/super-admin/delete-post-type/${id}`;

  const response = await axios.delete(URL, {
    headers: {
      "x-access-token": token,
    },
  });

  return response.data;
};

export const AddBlog = async (form) => {
  const token = sessionStorage.getItem("token");

  const URL = `${API_BASE_URL}/api/v1/post/super-admin/add-post`;

  const formData = new FormData();

  formData.append("postImage", form.postImage); // file
  formData.append("title", form.title);
  formData.append("shortDescription", form.shortDescription);
  formData.append("content", form.content);
  formData.append("categoryId", form.categoryId);
  formData.append("postTypeId", form.postTypeId);
  formData.append("isPublished", form.isPublished);

  const response = await axios.post(URL, formData, {
    headers: {
      "x-access-token": token,
      // ❌ DO NOT set Content-Type manually for FormData
    },
  });

  return response.data;
};

export const updateBlog = async (id, form) => {
  const token = sessionStorage.getItem("token");

  const URL = `${API_BASE_URL}/api/v1/post/super-admin/update-post/${id}`;

  const formData = new FormData();

  // ✅ Only send image if user selected a new one
  if (form.postImage) {
    formData.append("postImage", form.postImage); // file
  }

  formData.append("title", form.title);
  formData.append("shortDescription", form.shortDescription);
  formData.append("content", form.content);
  formData.append("categoryId", form.categoryId);
  formData.append("postTypeId", form.postTypeId);
  formData.append("isPublished", form.isPublished);
  formData.append("is_active", form.is_active);

  const response = await axios.put(URL, formData, {
    headers: {
      "x-access-token": token,
      // ❌ Do NOT set Content-Type manually
    },
  });

  return response.data;
};

export const getAllPosts = async ({
  category,
  postType,
  isPublished,
  is_active,
  search,
  postUniqueID,
  page,
  limit,
} = {}) => {
  const token = sessionStorage.getItem("token");

  const URL = `${API_BASE_URL}/api/v1/post/common/get-all-posts`;

  // ✅ Build params dynamically (send only if present)
  const params = {};

  if (category) params.category = category;
  if (postType) params.postType = postType;
  if (postUniqueID) params.postUniqueID = postUniqueID;
  if (search) params.search = search;

  if (isPublished !== undefined) params.isPublished = isPublished;
  if (is_active !== undefined) params.is_active = is_active;

  if (page) params.page = page;
  if (limit) params.limit = limit;

  const response = await axios.get(URL, {
    params,
    headers: {
      "x-access-token": token,
    },
  });

  return response.data;
};

export const deleteBlog = async (id) => {
  const token = sessionStorage.getItem("token");

  const URL = `${API_BASE_URL}/api/v1/post/super-admin/delete-post/${id}`;

  const response = await axios.delete(URL, {
    headers: {
      "x-access-token": token,
    },
  });

  return response.data;
};
