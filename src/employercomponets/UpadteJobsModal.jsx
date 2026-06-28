// import React, { useState, useEffect } from "react";
// import { X } from "lucide-react";
// import { FaRegHandPointRight, FaPlus, FaMinus } from "react-icons/fa6";
// import { updateEmployerJob, getAllCategories } from "../api/service2";
// import { toast } from "react-toastify";

// const UpdateJobModal = ({ job, onClose, onSuccess }) => {
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     requirements: "",
//     responsibilities: "",
//     education: "",
//     experienceRange: "",
//     salaryRange: "",
//     mode: "",
//     employmentType: "",
//     skillsRequired: [],
//     openings: "",
//     deadline: "",
//     companyEmail: "",
//     companyName: "",
//     logoFiles: null,
//     isActive: true,
//     categoryId: "", // ⭐ ADDED
//     addresses: [
//       {
//         building: "",
//         floor: "",
//         apartment: "",
//         landmark: "",
//         additionalInfo: "",
//         city: "",
//         state: "",
//         country: "",
//         pincode: "",
//       },
//     ],
//   });

//   const [loading, setLoading] = useState(false);

//   const [categories, setCategories] = useState([]);
//   const [loadingCategories, setLoadingCategories] = useState(true);
//   const [skillsText, setSkillsText] = useState("");
//   const [salaryInput, setSalaryInput] = useState("");
//   const [salaryType, setSalaryType] = useState("Annually");

//   const handleSkillsTyping = (e) => {
//     setSkillsText(e.target.value);
//   };
//   const handleSkillsBlur = () => {
//     const skillsArray = skillsText
//       .split(",")
//       .map((s) => s.trim())
//       .filter((s) => s);

//     setFormData((prev) => ({ ...prev, skillsRequired: skillsArray }));
//   };

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await getAllCategories();
//         setCategories(res.data.categories || []);
//       } catch (err) {
//         toast.error("Failed to load categories");
//       } finally {
//         setLoadingCategories(false);
//       }
//     };

//     fetchCategories();
//   }, []);

//   useEffect(() => {
//     setSkillsText(formData.skillsRequired.join(", "));
//   }, [formData.skillsRequired]);

//   // Auto-fill form when job data is loaded
//   useEffect(() => {
//     if (job) {
//       const formatDeadline = (dateString) => {
//         if (!dateString) return "";
//         const date = new Date(dateString);
//         return date.toISOString().split("T")[0];
//       };

//       setFormData({
//         title: job.title || "",
//         description: job.description || "",
//         requirements: job.requirements || "",
//         responsibilities: job.responsibilities || "",
//         education: job.education || "",
//         experienceRange: job.experienceRange || "",
//         salaryRange: job.salaryRange || "",
//         mode: job.mode || "",
//         employmentType: job.employmentType || "",
//         skillsRequired: job.skillsRequired || [],
//         openings: job.openings || "",
//         deadline: formatDeadline(job.deadline),
//         companyEmail: job.companyEmail || "",
//         companyName: job.companyName || "",
//         logoFiles: null,
//         isActive: job.is_active !== undefined ? job.is_active : true,
//         categoryId: job.categoryId || "",
//         addresses: job.jobPostAddresses?.length
//           ? job.jobPostAddresses.map((addr) => ({
//               building: addr.building || "",
//               floor: addr.floor || "",
//               apartment: addr.apartment || "",
//               landmark: addr.landmark || "",
//               additionalInfo: addr.additionalInfo || "",
//               city: addr.city || "",
//               state: addr.state || "",
//               country: addr.country || "",
//               pincode: addr.pincode || "",
//             }))
//           : [
//               {
//                 building: "",
//                 floor: "",
//                 apartment: "",
//                 landmark: "",
//                 additionalInfo: "",
//                 city: "",
//                 state: "",
//                 country: "",
//                 pincode: "",
//               },
//             ],
//       });

//       // ⭐ Fix salary initialization
//       const parts = (job.salaryRange || "").split(" ");
//       setSalaryInput(parts[0] || "");
//       setSalaryType(parts[1] || "Monthly");
//     }
//   }, [job]);

//   const handleChange = (e) => {
//     const { name, value, type, files } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "file" ? files[0] : value,
//     }));
//   };

//   const handleSkillsChange = (e) => {
//     const skillsArray = e.target.value
//       .split(",")
//       .map((s) => s.trim())
//       .filter((s) => s);
//     setFormData((prev) => ({ ...prev, skillsRequired: skillsArray }));
//   };

//   const handleAddressChange = (i, field, value) => {
//     setFormData((prev) => {
//       const updated = [...prev.addresses];
//       updated[i][field] = value;
//       return { ...prev, addresses: updated };
//     });
//   };

//   const addAddress = () => {
//     setFormData((prev) => ({
//       ...prev,
//       addresses: [
//         ...prev.addresses,
//         {
//           building: "",
//           floor: "",
//           apartment: "",
//           landmark: "",
//           additionalInfo: "",
//           city: "",
//           state: "",
//           country: "",
//           pincode: "",
//         },
//       ],
//     }));
//   };

//   const removeAddress = (i) => {
//     if (formData.addresses.length === 1) {
//       toast.warn("At least one address is required.");
//       return;
//     }
//     setFormData((prev) => ({
//       ...prev,
//       addresses: prev.addresses.filter((_, idx) => idx !== i),
//     }));
//   };

//   const handleSalaryValueChange = (e) => {
//     const value = e.target.value;
//     setSalaryInput(value);

//     setFormData((prev) => ({
//       ...prev,
//       salaryRange: `${value} ${salaryType}`,
//     }));
//   };

//   const handleSalaryTypeChange = (e) => {
//     const type = e.target.value;
//     setSalaryType(type);

//     setFormData((prev) => ({
//       ...prev,
//       salaryRange: `${salaryInput} ${type}`,
//     }));
//   };

//   const handleSubmit = async () => {
//     if (!job?.id) {
//       toast.error("Job ID is missing!");
//       return;
//     }

//     if (!formData.categoryId) {
//       toast.error("Please select a category!");
//       return;
//     }

//     setLoading(true);
//     const fd = new FormData();

//     Object.entries(formData).forEach(([key, value]) => {
//       if (["addresses", "skillsRequired", "logoFiles"].includes(key)) return;
//       if (value !== null && value !== "") {
//         fd.append(key, value); // categoryId included
//       }
//     });

//     if (formData.logoFiles) {
//       fd.append("logoFiles", formData.logoFiles);
//     }

//     fd.append("addresses", JSON.stringify(formData.addresses));
//     fd.append("skillsRequired", JSON.stringify(formData.skillsRequired));

//     try {
//       const result = await updateEmployerJob(job.id, fd);
//       toast.success(result.message || "Job updated successfully!");
//       onSuccess?.();
//       onClose();
//     } catch (error) {
//       const errMsg =
//         error.response?.data?.message || "Failed to update job. Try again.";
//       toast.error(errMsg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!job) return null;

//   return (
//     <>
//       {/* Overlay */}
//       <div
//         className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
//         onClick={onClose}
//       />

//       {/* Modal */}
//       <div className="fixed inset-0 z-50 overflow-y-auto">
//         <div className="flex min-h-full items-center justify-center p-4">
//           <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-7xl max-h-[90vh] overflow-hidden">
//             {/* Header */}
//             <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-6 relative sticky top-0 z-10">
//               <button
//                 onClick={onClose}
//                 className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
//               >
//                 <X className="w-6 h-6 text-white" />
//               </button>

//               <h2 className="text-2xl font-bold text-white text-left">
//                 Update Job
//               </h2>
//               <p className="text-blue-100 text-sm mt-1 text-left">
//                 Edit and update job details
//               </p>
//             </div>

//             {/* Form Content */}
//             <div className="overflow-y-auto max-h-[calc(90vh-180px)] px-6 py-6">
//               <div className="space-y-6">
//                 {/* Job Title */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2 text-start">
//                     Job Title <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="title"
//                     value={formData.title}
//                     onChange={handleChange}
//                     placeholder="Enter job title"
//                     required
//                     className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>

//                 {/* Description & Requirements */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2 text-start">
//                       Description
//                     </label>
//                     <textarea
//                       name="description"
//                       value={formData.description}
//                       onChange={handleChange}
//                       rows="4"
//                       placeholder="Describe the job..."
//                       className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
//                     ></textarea>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2 text-start">
//                       Requirements
//                     </label>
//                     <textarea
//                       name="requirements"
//                       value={formData.requirements}
//                       onChange={handleChange}
//                       rows="4"
//                       placeholder="Enter requirements..."
//                       className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
//                     ></textarea>
//                   </div>
//                 </div>

//                 {/* Responsibilities */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2 text-start">
//                     Responsibilities
//                   </label>
//                   <textarea
//                     name="responsibilities"
//                     value={formData.responsibilities}
//                     onChange={handleChange}
//                     rows="3"
//                     placeholder="Enter job responsibilities..."
//                     className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
//                   ></textarea>
//                 </div>

//                 {/* Advanced Info */}
//                 <div className="border-t pt-6">
//                   <h3 className="text-lg font-semibold text-gray-900 mb-4 text-start">
//                     Advanced Information
//                   </h3>
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     <input
//                       type="text"
//                       name="education"
//                       value={formData.education}
//                       onChange={handleChange}
//                       placeholder="Education (e.g. B.Tech / BE)"
//                       className="border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
//                     />
//                     <input
//                       type="text"
//                       name="experienceRange"
//                       value={formData.experienceRange}
//                       onChange={handleChange}
//                       placeholder="Experience (e.g. 2-5 years)"
//                       className="border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
//                     />
//                     <div className="flex items-center gap-3">
//                       {/* Salary Range Value */}
//                       <input
//                         type="text"
//                         placeholder="e.g. 3-4"
//                         value={salaryInput}
//                         onChange={handleSalaryValueChange}
//                         className="w-full border border-gray-300 rounded-lg px-4 py-2.5
//       focus:ring-2 focus:ring-blue-500"
//                       />

//                       {/* Salary Type Dropdown */}
//                       <select
//                         value={salaryType}
//                         onChange={handleSalaryTypeChange}
//                         className="border border-gray-300 rounded-lg px-4 py-2.5
//       focus:ring-2 focus:ring-blue-500 bg-white"
//                       >
//                         <option value="Monthly">Monthly</option>
//                         <option value="Annually">Annually</option>
//                       </select>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Job Type & Mode */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2 text-start">
//                       Work Mode
//                     </label>
//                     <select
//                       name="mode"
//                       value={formData.mode}
//                       onChange={handleChange}
//                       className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
//                     >
//                       <option value="">Select Mode</option>
//                       <option value="REMOTE">Remote</option>
//                       <option value="ONSITE">Onsite</option>
//                       <option value="HYBRID">Hybrid</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2 text-start">
//                       Employment Type
//                     </label>
//                     <select
//                       name="employmentType"
//                       value={formData.employmentType}
//                       onChange={handleChange}
//                       className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
//                     >
//                       <option value="">Employment Type</option>
//                       <option value="FULL_TIME">Full-time</option>
//                       <option value="PART_TIME">Part-time</option>
//                     </select>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   {/* Skills */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2 text-start">
//                       Skills Required
//                     </label>
//                     <input
//                       type="text"
//                       placeholder="e.g. React, Node.js, MongoDB"
//                       value={skillsText}
//                       onChange={handleSkillsTyping}
//                       onBlur={handleSkillsBlur}
//                       className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2 text-start">
//                       Category <span className="text-red-500">*</span>
//                     </label>

//                     <select
//                       name="categoryId"
//                       value={formData.categoryId}
//                       onChange={handleChange}
//                       disabled={loadingCategories}
//                       className="w-full border border-gray-300 rounded-lg px-4 py-2.5
//                focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     >
//                       {loadingCategories ? (
//                         <option>Loading categories...</option>
//                       ) : (
//                         <>
//                           <option value="">Select Category</option>
//                           {categories.map((cat) => (
//                             <option key={cat.id} value={cat.id}>
//                               {cat.name}
//                             </option>
//                           ))}
//                         </>
//                       )}
//                     </select>
//                   </div>
//                 </div>

//                 {/* Company Logo */}

//                 {/* Category Dropdown */}

//                 {/* Openings and Deadline */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2 text-start">
//                       Number of Openings
//                     </label>
//                     <input
//                       type="number"
//                       name="openings"
//                       value={formData.openings}
//                       onChange={handleChange}
//                       placeholder="Openings"
//                       min="1"
//                       className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2 text-start">
//                       Application Deadline
//                     </label>
//                     <input
//                       type="date"
//                       name="deadline"
//                       value={formData.deadline}
//                       onChange={handleChange}
//                       min={new Date().toISOString().split("T")[0]} // <-- disable past dates
//                       className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
//                     />
//                   </div>
//                 </div>

//                 {/* Company Info */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2 text-start">
//                       Company Name
//                     </label>
//                     <input
//                       type="text"
//                       name="companyName"
//                       value={formData.companyName}
//                       onChange={handleChange}
//                       placeholder="Company Name"
//                       className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2 text-start">
//                       Company Email
//                     </label>
//                     <input
//                       type="email"
//                       name="companyEmail"
//                       value={formData.companyEmail}
//                       onChange={handleChange}
//                       placeholder="Company Email"
//                       className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2 text-start">
//                     Company Logo{" "}
//                     {job.logoPreviewUrl && (
//                       <span className="text-xs text-gray-500">
//                         (Leave empty to keep current logo)
//                       </span>
//                     )}
//                   </label>
//                   {job.logoPreviewUrl && (
//                     <div className="mb-2 flex items-center gap-3">
//                       <img
//                         src={job.logoPreviewUrl}
//                         alt="Current logo"
//                         className="w-16 h-16 rounded-lg object-cover border"
//                       />
//                       <span className="text-sm text-gray-600">
//                         Current logo
//                       </span>
//                     </div>
//                   )}
//                   <input
//                     type="file"
//                     name="logoFiles"
//                     accept="image/*"
//                     onChange={handleChange}
//                     className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>

//                 {/* Job Status Toggle */}
//                 <div className="border border-gray-200 rounded-lg p-5 bg-gradient-to-r from-blue-50 to-indigo-50">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <label className="block text-sm font-semibold text-gray-900 mb-1">
//                         Job Status
//                       </label>
//                       <p className="text-xs text-gray-600">
//                         {formData.isActive
//                           ? "Job is currently active and visible to candidates"
//                           : "Job is inactive and not visible to candidates"}
//                       </p>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <span
//                         className={`text-sm font-medium ${
//                           formData.isActive ? "text-gray-500" : "text-gray-900"
//                         }`}
//                       >
//                         Inactive
//                       </span>
//                       <button
//                         type="button"
//                         onClick={() =>
//                           setFormData((prev) => ({
//                             ...prev,
//                             isActive: !prev.isActive,
//                           }))
//                         }
//                         className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
//                           formData.isActive ? "bg-blue-600" : "bg-gray-300"
//                         }`}
//                       >
//                         <span
//                           className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
//                             formData.isActive
//                               ? "translate-x-7"
//                               : "translate-x-1"
//                           }`}
//                         />
//                       </button>
//                       <span
//                         className={`text-sm font-medium ${
//                           formData.isActive ? "text-gray-900" : "text-gray-500"
//                         }`}
//                       >
//                         Active
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Address Section – MULTIPLE */}
//                 <div className="border-t pt-6 relative">
//                   <div className="flex items-center justify-between mb-4">
//                     <h3 className="text-lg font-semibold text-gray-900 text-start">
//                       Company Address
//                     </h3>

//                     {/* + Add Address Button */}
//                     <button
//                       type="button"
//                       onClick={addAddress}
//                       className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
//                     >
//                       <FaPlus className="w-4 h-4" />
//                       <span className="text-sm font-medium">Add Address</span>
//                     </button>
//                   </div>

//                   {formData.addresses.map((addr, index) => (
//                     <div
//                       key={index}
//                       className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 border border-gray-200 p-5 rounded-lg bg-gray-50 mb-4"
//                     >
//                       {/* Remove Button (only if >1) */}
//                       {formData.addresses.length > 1 && (
//                         <button
//                           type="button"
//                           onClick={() => removeAddress(index)}
//                           className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
//                         >
//                           <FaMinus className="w-4 h-4" />
//                         </button>
//                       )}

//                       <input
//                         type="text"
//                         placeholder="Building"
//                         value={addr.building}
//                         onChange={(e) =>
//                           handleAddressChange(index, "building", e.target.value)
//                         }
//                         className="border border-gray-300 rounded-lg px-4 py-2.5 bg-white focus:ring-2 focus:ring-blue-500"
//                       />
//                       <input
//                         type="text"
//                         placeholder="Floor"
//                         value={addr.floor}
//                         onChange={(e) =>
//                           handleAddressChange(index, "floor", e.target.value)
//                         }
//                         className="border border-gray-300 rounded-lg px-4 py-2.5 bg-white focus:ring-2 focus:ring-blue-500"
//                       />
//                       <input
//                         type="text"
//                         placeholder="Apartment"
//                         value={addr.apartment}
//                         onChange={(e) =>
//                           handleAddressChange(
//                             index,
//                             "apartment",
//                             e.target.value
//                           )
//                         }
//                         className="border border-gray-300 rounded-lg px-4 py-2.5 bg-white focus:ring-2 focus:ring-blue-500"
//                       />
//                       <input
//                         type="text"
//                         placeholder="Landmark"
//                         value={addr.landmark}
//                         onChange={(e) =>
//                           handleAddressChange(index, "landmark", e.target.value)
//                         }
//                         className="border border-gray-300 rounded-lg px-4 py-2.5 bg-white focus:ring-2 focus:ring-blue-500"
//                       />
//                       <input
//                         type="text"
//                         placeholder="City"
//                         value={addr.city}
//                         onChange={(e) =>
//                           handleAddressChange(index, "city", e.target.value)
//                         }
//                         className="border border-gray-300 rounded-lg px-4 py-2.5 bg-white focus:ring-2 focus:ring-blue-500"
//                       />
//                       <input
//                         type="text"
//                         placeholder="State"
//                         value={addr.state}
//                         onChange={(e) =>
//                           handleAddressChange(index, "state", e.target.value)
//                         }
//                         className="border border-gray-300 rounded-lg px-4 py-2.5 bg-white focus:ring-2 focus:ring-blue-500"
//                       />
//                       <input
//                         type="text"
//                         placeholder="Country"
//                         value={addr.country}
//                         onChange={(e) =>
//                           handleAddressChange(index, "country", e.target.value)
//                         }
//                         className="border border-gray-300 rounded-lg px-4 py-2.5 bg-white focus:ring-2 focus:ring-blue-500"
//                       />
//                       <input
//                         type="text"
//                         placeholder="Pincode"
//                         value={addr.pincode}
//                         onChange={(e) =>
//                           handleAddressChange(index, "pincode", e.target.value)
//                         }
//                         className="border border-gray-300 rounded-lg px-4 py-2.5 bg-white focus:ring-2 focus:ring-blue-500"
//                       />
//                       <input
//                         type="text"
//                         placeholder="Additional Info"
//                         value={addr.additionalInfo}
//                         onChange={(e) =>
//                           handleAddressChange(
//                             index,
//                             "additionalInfo",
//                             e.target.value
//                           )
//                         }
//                         className="border border-gray-300 rounded-lg px-4 py-2.5 bg-white focus:ring-2 focus:ring-blue-500"
//                       />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Footer */}
//             <div className="px-6 py-4 bg-gray-50 border-t flex justify-end gap-3 sticky bottom-0">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="px-6 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 onClick={handleSubmit}
//                 disabled={loading}
//                 className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors font-medium"
//               >
//                 {loading ? "Updating..." : "Update Job"}
//                 {!loading && <FaRegHandPointRight />}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default UpdateJobModal;

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { FaRegHandPointRight, FaPlus } from "react-icons/fa6";
import {
  FaMinus,
  FaBriefcase,
  FaUserTie,
  FaClock,
  FaMoneyBillWave,
  FaBuilding,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { CiCircleMinus } from "react-icons/ci";
import { updateEmployerJob, getAllCategories } from "../api/service2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"],
  ],
};

const quillFormats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "bullet",
  "link",
  "image",
];

const UpdateJobModal = ({ job, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    responsibilities: "",
    education: "",
    minExperience: "",
    maxExperience: "",
    minSalary: "",
    maxSalary: "",
    salaryType: "YEARLY",
    mode: "",
    employmentType: "",
    skillsRequired: [],
    openings: "",
    deadline: "",
    companyEmail: "",
    companyName: "",
    logoFiles: null,
    categoryId: "",
    shiftType: [],
    isActive: true,
    questionnaire: {
      skills: [],
      expectedCTC: "",
      noticePeriod: "",
      dob: "",
      willingToRelocate: false,
    },
    addresses: [
      {
        building: "",
        floor: "",
        apartment: "",
        landmark: "",
        additionalInfo: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
      },
    ],
  });

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [skillsInput, setSkillsInput] = useState("");

  const shiftOptions = [
    { value: "MORNING", label: "Morning" },
    { value: "AFTERNOON", label: "Afternoon" },
    { value: "EVENING", label: "Evening" },
    { value: "NIGHT", label: "Night" },
  ];

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await getAllCategories();
        setCategories(res.data.categories || []);
      } catch (err) {
        toast.error("Failed to load categories.");
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCats();
  }, []);

  // Pre-fill form when job prop changes
  useEffect(() => {
    if (!job) return;

    const formatDate = (dateStr) =>
      !dateStr ? "" : new Date(dateStr).toISOString().split("T")[0];

    setFormData({
      title: job.title || "",
      description: job.description || "",
      requirements: job.requirements || "",
      responsibilities: job.responsibilities || "",
      education: job.education || "",
      minExperience: job.minExperience || "",
      maxExperience: job.maxExperience || "",
      minSalary: job.minSalary || "",
      maxSalary: job.maxSalary || "",
      salaryType: job.salaryType || "YEARLY",
      mode: job.mode || "",
      employmentType: job.employmentType || "",
      skillsRequired: job.skillsRequired || [],
      openings: job.openings || "",
      deadline: formatDate(job.deadline),
      companyEmail: job.companyEmail || "",
      companyName: job.companyName || "",
      logoFiles: null,
      categoryId: job.categoryId || "",
      shiftType: job.shiftType || [],
      isActive: job.is_active ?? true,
      questionnaire: {
        skills: job.questionnaire?.skills || [],
        expectedCTC: job.questionnaire?.expectedCTC || "",
        noticePeriod: job.questionnaire?.noticePeriod || "",
        dob: job.questionnaire?.dob || "",
        willingToRelocate: job.questionnaire?.willingToRelocate || false,
      },
      addresses:
        job.jobPostAddresses?.length > 0
          ? job.jobPostAddresses.map((a) => ({
              building: a.building || "",
              floor: a.floor || "",
              apartment: a.apartment || "",
              landmark: a.landmark || "",
              additionalInfo: a.additionalInfo || "",
              city: a.city || "",
              state: a.state || "",
              country: a.country || "",
              pincode: a.pincode || "",
            }))
          : [
              {
                building: "",
                floor: "",
                apartment: "",
                landmark: "",
                additionalInfo: "",
                city: "",
                state: "",
                country: "",
                pincode: "",
              },
            ],
    });

    setSkillsInput((job.skillsRequired || []).join(", "));
  }, [job]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSkillsTyping = (e) => setSkillsInput(e.target.value);
  const handleSkillsBlur = () => {
    const skills = skillsInput
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s);
    setFormData((prev) => ({ ...prev, skillsRequired: skills }));
  };

  const handleShiftChange = (value) => {
    setFormData((prev) => {
      const current = prev.shiftType || [];
      return {
        ...prev,
        shiftType: current.includes(value)
          ? current.filter((s) => s !== value)
          : [...current, value],
      };
    });
  };

  const handleAddressChange = (idx, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.addresses];
      updated[idx][field] = value;
      return { ...prev, addresses: updated };
    });
  };

  const addAddress = () => {
    setFormData((prev) => ({
      ...prev,
      addresses: [
        ...prev.addresses,
        {
          building: "",
          floor: "",
          apartment: "",
          landmark: "",
          additionalInfo: "",
          city: "",
          state: "",
          country: "",
          pincode: "",
        },
      ],
    }));
  };

  const removeAddress = (idx) => {
    if (formData.addresses.length === 1) {
      toast.warn("At least one address is required.");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      addresses: prev.addresses.filter((_, i) => i !== idx),
    }));
  };

  const handleSubmit = async () => {
    if (!job?.id) return toast.error("Job ID missing!");
    if (!formData.title || !formData.companyName || !formData.categoryId) {
      return toast.error("Title, Company Name, and Category are required!");
    }

    setLoading(true);
    const fd = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (
        [
          "addresses",
          "skillsRequired",
          "logoFiles",
          "shiftType",
          "questionnaire",
        ].includes(key)
      )
        return;
      if (value !== null && value !== "" && value !== undefined)
        fd.append(key, value);
    });

    if (formData.logoFiles) fd.append("logoFiles", formData.logoFiles);
    fd.append("addresses", JSON.stringify(formData.addresses));
    fd.append("skillsRequired", JSON.stringify(formData.skillsRequired));
    fd.append("shiftType", JSON.stringify(formData.shiftType || []));
    fd.append("questionnaire", JSON.stringify(formData.questionnaire));

    try {
      await updateEmployerJob(job.id, fd);
      toast.success("Job updated successfully!");
      onSuccess?.();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update job.");
    } finally {
      setLoading(false);
    }
  };

  if (!job) return null;
  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 overflow-y-auto text-left">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-7xl max-h-[92vh] overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full"
              >
                <X className="w-6 h-6 text-white" />
              </button>
              <h2 className="text-3xl font-bold text-white">Update Job</h2>
              <p className="text-blue-100 mt-1">
                Modify job details and save changes
              </p>
            </div>

            {/* Scrollable Form */}
            <div className="overflow-y-auto max-h-[calc(90vh-180px)] p-8 space-y-10 custom-scrollbar">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                {/* Basic Information */}
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Job Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Job Category *
                      </label>
                      <select
                        name="categoryId"
                        value={formData.categoryId}
                        onChange={handleChange}
                        disabled={loadingCategories}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                        required
                      >
                        {loadingCategories ? (
                          <option>Loading...</option>
                        ) : (
                          <>
                            <option value="">Select Category</option>
                            {categories.map((cat) => (
                              <option key={cat.id} value={cat.id}>
                                {cat.name}
                              </option>
                            ))}
                          </>
                        )}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Job Description
                    </label>
                    <ReactQuill
                      theme="snow"
                      value={formData.description}
                      onChange={(value) =>
                        setFormData((prev) => ({ ...prev, description: value }))
                      }
                      modules={quillModules}
                      formats={quillFormats}
                      placeholder="Describe the role, responsibilities..."
                      className="quill-box bg-white rounded-lg"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Requirements
                      </label>
                      <ReactQuill
                        theme="snow"
                        value={formData.requirements}
                        onChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            requirements: value,
                          }))
                        }
                        modules={quillModules}
                        formats={quillFormats}
                        placeholder="Required qualifications and experience..."
                        className="quill-box bg-white rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Responsibilities
                      </label>
                      <ReactQuill
                        theme="snow"
                        value={formData.responsibilities}
                        onChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            responsibilities: value,
                          }))
                        }
                        modules={quillModules}
                        formats={quillFormats}
                        placeholder="Key duties and daily tasks..."
                        className="quill-box bg-white rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                {/* Employment Details */}
                <div className="bg-gray-50 p-8 rounded-2xl space-y-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-6">
                    Employment Details
                  </h2>

                  {/* Work Mode */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Work Mode
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {["REMOTE", "ON_SITE", "HYBRID"].map((mode) => (
                        <label
                          key={mode}
                          className={`flex items-center justify-center gap-2 p-4 border-2 rounded-lg cursor-pointer transition ${
                            formData.mode === mode
                              ? "border-blue-600 bg-blue-50"
                              : "border-gray-200 hover:border-blue-300"
                          }`}
                        >
                          <input
                            type="radio"
                            name="mode"
                            value={mode}
                            checked={formData.mode === mode}
                            onChange={handleChange}
                            className="w-4 h-4 text-blue-600"
                          />
                          <span className="font-medium text-sm">
                            {mode === "REMOTE"
                              ? "Remote"
                              : mode === "ON_SITE"
                              ? "On-site"
                              : "Hybrid"}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Employment Type */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Employment Type
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {["FULL_TIME", "PART_TIME", "CONTRACT", "INTERN"].map(
                        (type, i) => (
                          <label
                            key={type}
                            className={`flex items-center justify-center gap-2 p-4 border-2 rounded-lg cursor-pointer transition ${
                              formData.employmentType === type
                                ? "border-blue-600 bg-blue-50"
                                : "border-gray-200 hover:border-blue-300"
                            }`}
                          >
                            <input
                              type="radio"
                              name="employmentType"
                              value={type}
                              checked={formData.employmentType === type}
                              onChange={handleChange}
                              className="w-4 h-4 text-blue-600"
                            />
                            <span className="font-medium text-sm">
                              {
                                [
                                  "Full-time",
                                  "Part-time",
                                  "Contract",
                                  "Internship",
                                ][i]
                              }
                            </span>
                          </label>
                        )
                      )}
                    </div>
                  </div>

                  {/* Shift Type */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Available Shifts
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {shiftOptions.map((shift) => (
                        <label
                          key={shift.value}
                          className="flex items-center gap-2 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
                        >
                          <input
                            type="checkbox"
                            checked={
                              formData.shiftType?.includes(shift.value) || false
                            }
                            onChange={() => handleShiftChange(shift.value)}
                            className="w-4 h-4 text-blue-600 rounded"
                          />
                          <span className="text-sm font-medium">
                            {shift.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Experience & Qualifications */}
                <div className="space-y-5">
                  <h2 className="text-xl font-bold text-gray-800 mb-6">
                    Experience & Qualifications
                  </h2>
                  <div className="grid md:grid-cols-3 gap-5">
                    <input
                      type="text"
                      name="education"
                      value={formData.education}
                      onChange={handleChange}
                      placeholder="e.g. Bachelor's Degree"
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <input
                      type="number"
                      name="minExperience"
                      value={formData.minExperience}
                      onChange={handleChange}
                      placeholder="Min Years"
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <input
                      type="number"
                      name="maxExperience"
                      value={formData.maxExperience}
                      onChange={handleChange}
                      placeholder="Max Years"
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Skills Required
                    </label>
                    <input
                      type="text"
                      value={skillsInput}
                      onChange={handleSkillsTyping}
                      onBlur={handleSkillsBlur}
                      placeholder="React, Node.js, Python (comma separated)"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>

                {/* Compensation & Openings */}
                <div className="bg-gray-50 p-8 rounded-2xl space-y-5">
                  <h2 className="text-xl font-bold text-gray-800 mb-6">
                    Compensation & Openings
                  </h2>
                  <div className="grid md:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Salary Type
                      </label>
                      <div className="flex gap-4">
                        {["MONTHLY", "YEARLY"].map((type) => (
                          <label
                            key={type}
                            className={`flex items-center gap-2 px-4 py-3 border-2 rounded-lg cursor-pointer transition ${
                              formData.salaryType === type
                                ? "border-blue-600 bg-blue-50"
                                : "border-gray-200"
                            }`}
                          >
                            <input
                              type="radio"
                              name="salaryType"
                              value={type}
                              checked={formData.salaryType === type}
                              onChange={handleChange}
                              className="w-4 h-4 text-blue-600"
                            />
                            <span className="text-sm font-medium">
                              {type === "MONTHLY" ? "Monthly" : "Yearly"}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Min Salary
                      </label>
                      <input
                        type="number"
                        name="minSalary"
                        value={formData.minSalary}
                        onChange={handleChange}
                        placeholder="50000"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Max Salary
                      </label>
                      <input
                        type="number"
                        name="maxSalary"
                        value={formData.maxSalary}
                        onChange={handleChange}
                        placeholder="100000"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Number of Openings
                      </label>
                      <input
                        type="number"
                        name="openings"
                        value={formData.openings}
                        onChange={handleChange}
                        min="1"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Application Deadline
                      </label>
                      <input
                        type="date"
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleChange}
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Company Details */}
                <div className="space-y-5">
                  <h2 className="text-xl font-bold text-gray-800 mb-6">
                    Company Details
                  </h2>
                  <div className="grid md:grid-cols-2 gap-5">
                    <input
                      type="email"
                      name="companyEmail"
                      value={formData.companyEmail}
                      onChange={handleChange}
                      placeholder="careers@company.com"
                      className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Company Logo (Leave empty to keep current)
                      </label>
                      {job.logoPreviewUrl && (
                        <div className="mb-3">
                          <img
                            src={job.logoPreviewUrl}
                            alt="Current logo"
                            className="h-16 rounded-lg border"
                          />
                        </div>
                      )}
                      <input
                        type="file"
                        name="logoFiles"
                        accept="image/*"
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                    </div>
                  </div>
                </div>

                {/* 6. Candidate Questionnaire */}
                <div className="p-8 bg-gray-50">
                  <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <FaUserTie className="text-blue-600" /> Candidate
                    Questionnaire (Optional)
                  </h2>
                  <p className="text-sm text-gray-600 mb-6">
                    Select the questions you want candidates to answer when they
                    apply.
                  </p>
                  <div className="space-y-4">
                    {[
                      {
                        key: "skills",
                        label: "Ask for Skills",
                        value: ["Node", "React"],
                      },
                      {
                        key: "expectedCTC",
                        label: "Expected CTC",
                        value: "12 LPA",
                      },
                      {
                        key: "noticePeriod",
                        label: "Notice Period",
                        value: "30 days",
                      },
                      {
                        key: "dob",
                        label: "Date of Birth",
                        value: "1994-10-10",
                      },
                      {
                        key: "willingToRelocate",
                        label: "Willing to Relocate?",
                        value: true,
                      },
                    ].map((item) => (
                      <label
                        key={item.key}
                        className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition"
                      >
                        <input
                          type="checkbox"
                          checked={
                            item.key === "willingToRelocate"
                              ? formData.questionnaire.willingToRelocate
                              : item.key === "skills"
                              ? formData.questionnaire.skills.length > 0
                              : !!formData.questionnaire[item.key]
                          }
                          onChange={(e) => {
                            setFormData((prev) => ({
                              ...prev,
                              questionnaire: {
                                ...prev.questionnaire,
                                [item.key]:
                                  item.key === "willingToRelocate"
                                    ? e.target.checked
                                    : e.target.checked
                                    ? item.value
                                    : item.key === "skills"
                                    ? []
                                    : "",
                              },
                            }));
                          }}
                          className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <div>
                          <span className="font-medium">{item.label}</span>
                          <p className="text-xs text-gray-500">
                            {item.key === "skills" &&
                              "Candidate will be asked to select Node, React, etc."}
                            {item.key === "expectedCTC" &&
                              "Candidate will provide their expected CTC"}
                            {item.key === "noticePeriod" &&
                              "Candidate will enter notice period"}
                            {item.key === "dob" &&
                              "Candidate will provide their DOB"}
                            {item.key === "willingToRelocate" &&
                              "Yes/No question for relocation"}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Addresses */}

                <div className="flex justify-between items-center mb-4 mt-4">
                  <h2 className="text-xl font-bold text-gray-800">
                    Office Locations
                  </h2>
                  <button
                    type="button"
                    onClick={addAddress}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <FaPlus /> Add Location
                  </button>
                </div>
                <div className="bg-gray-50 p-8 rounded-2xl">
                  <div className="space-y-5">
                    {formData.addresses.map((addr, idx) => (
                      <div
                        key={idx}
                        className="relative bg-white p-6 rounded-lg border border-gray-200"
                      >
                        {formData.addresses.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeAddress(idx)}
                            className="
    absolute 
    -top-6   /* moves icon above the box */
    -right-8  /* keeps it aligned outside */
    bg-[transparent]
    p-1 
    rounded-full 
    shadow 
    text-red-600
    hover:bg-red-50
  "
                          >
                            <CiCircleMinus size={22} />
                          </button>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {[
                            "building",
                            "floor",
                            "apartment",
                            "landmark",
                            "city",
                            "state",
                            "country",
                            "pincode",
                          ].map((field) => (
                            <input
                              key={field}
                              type="text"
                              placeholder={
                                field.charAt(0).toUpperCase() + field.slice(1)
                              }
                              value={addr[field]}
                              onChange={(e) =>
                                handleAddressChange(idx, field, e.target.value)
                              }
                              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                            />
                          ))}

                          {/* Additional Info in same row */}
                          <input
                            type="text"
                            placeholder="Additional Info"
                            value={addr.additionalInfo}
                            onChange={(e) =>
                              handleAddressChange(
                                idx,
                                "additionalInfo",
                                e.target.value
                              )
                            }
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </form>
            </div>

            {/* Footer */}
            <div className="p-4 bg-gray-50 border-t flex justify-end gap-4">
              <button
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`flex items-center gap-3 px-8 py-3 rounded-lg font-bold text-lg shadow-lg transition-all ${
                  loading
                    ? "bg-gray-400"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700"
                }`}
              >
                {loading ? (
                  "Updating..."
                ) : (
                  <>
                    Update Job <FaRegHandPointRight className="text-2xl" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateJobModal;
