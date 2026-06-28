import React, { useState, useEffect } from "react";
import {
  FaRegHandPointRight,
  FaPlus,
  FaMinus,
  FaBriefcase,
  FaBuilding,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaClock,
  FaUserTie,
} from "react-icons/fa";
import { createOrUpdateEmployerJob, getAllCategories } from "../api/service2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import { DashboardCard } from "../components/dashboard/DashboardUI";

export default function PostAJob() {
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
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [errors, setErrors] = useState({});

  const shiftOptions = [
    { value: "MORNING", label: "Morning" },
    { value: "AFTERNOON", label: "Afternoon" },
    { value: "EVENING", label: "Evening" },
    { value: "NIGHT", label: "Night" },
  ];

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

  // Fetch categories on mount
  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await getAllCategories();
        setCategories(res.data.categories || []);
      } catch (err) {
        toast.error("Failed to load job categories.");
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCats();
  }, []);
  useEffect(() => {
    const loadIndiaStates = async () => {
      try {
        // default India in address
        setFormData((prev) => ({
          ...prev,
          addresses: prev.addresses.map((addr) => ({
            ...addr,
            country: "India",
          })),
        }));

        // fetch India states
        const res = await fetch(
          "https://countriesnow.space/api/v0.1/countries/states",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              country: "India",
            }),
          },
        );

        const data = await res.json();

        setStates(data.data.states || []);
      } catch (err) {
        console.log("Failed to load India states");
      }
    };

    loadIndiaStates();
  }, []);

  const handleCountryChange = async (idx, country) => {
    handleAddressChange(idx, "country", country);
    handleAddressChange(idx, "state", "");
    handleAddressChange(idx, "city", "");

    const res = await fetch(
      "https://countriesnow.space/api/v0.1/countries/states",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country }),
      },
    );

    const data = await res.json();
    setStates(data.data.states || []);
  };

  const handleStateChange = async (idx, state) => {
    const country = formData.addresses[idx].country;

    handleAddressChange(idx, "state", state);
    handleAddressChange(idx, "city", "");

    const res = await fetch(
      "https://countriesnow.space/api/v0.1/countries/state/cities",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country, state }),
      },
    );

    const data = await res.json();
    setCities(data.data || []);
  };

  const fetchPincode = async (city, idx) => {
    try {
      const res = await fetch(
        `https://api.postalpincode.in/postoffice/${city}`,
      );
      const data = await res.json();

      if (data[0].Status === "Success") {
        const pincode = data[0].PostOffice[0].Pincode;
        handleAddressChange(idx, "pincode", pincode);
      }
    } catch {
      console.log("Pincode fetch failed");
    }
  };
  // const handleSkillsTyping = (e) => {
  //   setSkillsInput(e.target.value);
  // };

  const handleSkillsKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      // e.preventDefault();

      let value = e.target.value;

      if (!value.trim()) return;

      // const parts = value.split(",");

      // take all except last (last may be incomplete)
      const newSkills = parts
        .slice(0, -1)
        .map((s) => s.trim())
        .filter(Boolean);

      if (newSkills.length > 0) {
        setFormData((prev) => ({
          ...prev,
          skillsRequired: [
            ...prev.skillsRequired,
            ...newSkills.filter(
              (skill) => !prev.skillsRequired.includes(skill),
            ),
          ],
        }));
      }

      // ✅ keep last unfinished part in input
      setSkillsInput(parts[parts.length - 1]);
    }
  };

  const handleSkillsBlur = () => {
    if (!skillsInput.trim()) return;

    const newSkills = skillsInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    setFormData((prev) => ({
      ...prev,
      skillsRequired: [
        ...prev.skillsRequired,
        ...newSkills.filter((skill) => !prev.skillsRequired.includes(skill)),
      ],
    }));

    setSkillsInput("");
  };
  const handleShiftChange = (value) => {
    setFormData((prev) => {
      const current = prev.shiftType || [];
      if (current.includes(value)) {
        return { ...prev, shiftType: current.filter((s) => s !== value) };
      } else {
        return { ...prev, shiftType: [...current, value] };
      }
    });
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleAddressChange = (addrIdx, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.addresses];
      updated[addrIdx][field] = value;
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

  const requiredFields = [
    "title",
    "description",
    "companyName",
    "companyEmail",
    "employmentType",
    "skillsRequired",
    "openings",
    "deadline",
    "categoryId",
    "minExperience",
    "maxExperience",
    "shiftType",
    "mode",
    "responsibilities",
    "requirements",
  ];
  const removeAddress = (addrIdx) => {
    if (formData.addresses.length === 1) {
      toast.warn("At least one address is required.");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      addresses: prev.addresses.filter((_, i) => i !== addrIdx),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let updatedFormData = { ...formData };
    const newErrors = {};

    const fieldLabels = {
      title: "Job Title",
      description: "Job Description",
      responsibilities: "Responsibilities",
      requirements: "Requirements",
      companyName: "Company Name",
      companyEmail: "Company Email",
      employmentType: "Employment Type",
      skillsRequired: "Skills Required",
      openings: "Openings",
      deadline: "Application Deadline",
      categoryId: "Category",
      minExperience: "Minimum Experience",
      maxExperience: "Maximum Experience",
      shiftType: "Shift Type",
      mode: "Work Mode",
    };
    const requiredFields = [
      "title",
      "description",
      "requirements",
      "responsibilities",
      "companyName",
      "companyEmail",
      "employmentType",
      "skillsRequired",
      "openings",
      "deadline",
      "categoryId",
      "minExperience",
      "maxExperience",
      "shiftType",
      "mode",
    ];
    const isEmptyQuill = (value) => !value || value === "<p><br></p>";

    const isEmpty = (value) =>
      value === null ||
      value === undefined ||
      (typeof value === "string" && value.trim() === "") ||
      (Array.isArray(value) && value.length === 0);

    // 🔥 ADD TYPED SKILLS (IMPORTANT FIX)
    if (skillsInput.trim()) {
      const newSkills = skillsInput
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      updatedFormData.skillsRequired = [
        ...formData.skillsRequired,
        ...newSkills.filter(
          (skill) => !formData.skillsRequired.includes(skill),
        ),
      ];
    }

    // ✅ Required validation
    for (let field of requiredFields) {
      const value = updatedFormData[field];

      if (
        isEmpty(value) ||
        ((field === "description" ||
          field === "responsibilities" ||
          field === "requirements") &&
          isEmptyQuill(value))
      ) {
        newErrors[field] = `${fieldLabels[field]} is required`;
      }
    }

    // ✅ Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      updatedFormData.companyEmail &&
      !emailRegex.test(updatedFormData.companyEmail.trim())
    ) {
      newErrors.companyEmail = "Enter a valid Contact Email";
    }

    // ✅ Experience validation
    if (
      Number(updatedFormData.minExperience) >
      Number(updatedFormData.maxExperience)
    ) {
      newErrors.maxExperience =
        "Max Experience must be greater than Min Experience";
    }

    // ✅ Salary validation
    if (Number(updatedFormData.minSalary) > Number(updatedFormData.maxSalary)) {
      newErrors.maxSalary = "Max Salary must be greater than Min Salary";
    }

    // ✅ Deadline validation
    const today = new Date().toISOString().split("T")[0];
    if (updatedFormData.deadline && updatedFormData.deadline < today) {
      newErrors.deadline = "Deadline cannot be in the past";
    }
    // ✅ Address validation
    updatedFormData.addresses.forEach((addr, i) => {
      if (!addr.pincode || !addr.city || !addr.state || !addr.country) {
        newErrors[`address_${i}`] =
          "Pincode, City, State and Country are required";
      }
    });

    // ❌ Stop if errors
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fix the highlighted errors");
      return;
    }

    // ✅ Clear errors
    setErrors({});
    setLoading(true);

    const fd = new FormData();

    Object.entries(updatedFormData).forEach(([key, value]) => {
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

      if (value !== null && value !== "" && value !== undefined) {
        fd.append(key, typeof value === "string" ? value.trim() : value);
      }
    });

    // ✅ File
    if (updatedFormData.logoFiles) {
      fd.append("logoFiles", updatedFormData.logoFiles);
    }

    // ✅ Arrays
    fd.append("addresses", JSON.stringify(updatedFormData.addresses));
    fd.append("skillsRequired", JSON.stringify(updatedFormData.skillsRequired));
    fd.append("shiftType", JSON.stringify(updatedFormData.shiftType || []));
    fd.append("questionnaire", JSON.stringify(updatedFormData.questionnaire));

    try {
      const res = await createOrUpdateEmployerJob(fd);
      toast.success(res.message || "Job posted successfully!");

      // RESET
      setFormData({
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

      setSkillsInput("");
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        err.message ||
        "Something went wrong. Please try again.";

      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };
  return (
    <DashboardCard padding={false} className="overflow-hidden">
      <form onSubmit={handleSubmit} className="divide-y divide-blue-100 text-left pb-6">
            {/* Section 1: Basic Job Information */}
            <div className="p-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <FaBriefcase className="text-blue-600" />
                Basic Information
              </h2>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Job Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Senior Software Engineer"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Company Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="Your Company Name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Job Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="categoryId"
                      value={formData.categoryId}
                      onChange={handleChange}
                      disabled={loadingCategories}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
                      required
                    >
                      {loadingCategories ? (
                        <option>Loading categories...</option>
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
                    Job Description <span className="text-red-500">*</span>
                  </label>
                  <div
                    className={`rounded-lg ${
                      errors.description ? "border border-red-500 p-2" : ""
                    }`}
                  >
                    <ReactQuill
                      theme="snow"
                      value={formData.description}
                      onChange={(value) =>
                        setFormData((prev) => ({ ...prev, description: value }))
                      }
                      className="quill-box"
                      placeholder="Describe the role, responsibilities..."
                      modules={quillModules}
                      formats={quillFormats}
                    />
                  </div>

                  {errors.description && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.description}
                    </p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  {/* Requirements */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Requirements <span className="text-red-500">*</span>
                    </label>
                    <div
                      className={`rounded-lg ${
                        errors.requirements ? "border border-red-500 p-2" : ""
                      }`}
                    >
                      <ReactQuill
                        theme="snow"
                        value={formData.requirements}
                        onChange={(value) => {
                          setFormData((prev) => ({
                            ...prev,
                            requirements: value,
                          }));

                          // clear error on typing
                          setErrors((prev) => ({ ...prev, requirements: "" }));
                        }}
                        className={`quill-box ${
                          errors.requirements
                            ? "border border-red-500 rounded-lg"
                            : ""
                        }`}
                        placeholder="Required qualifications and experience..."
                        modules={quillModules}
                        formats={quillFormats}
                      />
                    </div>

                    {errors.requirements && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.requirements}
                      </p>
                    )}
                  </div>

                  {/* Responsibilities */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Responsibilities <span className="text-red-500">*</span>
                    </label>
                    <div
                      className={`rounded-lg ${
                        errors.responsibilities
                          ? "border border-red-500 p-2"
                          : ""
                      }`}
                    >
                      <ReactQuill
                        theme="snow"
                        value={formData.responsibilities}
                        onChange={(value) => {
                          setFormData((prev) => ({
                            ...prev,
                            responsibilities: value,
                          }));

                          setErrors((prev) => ({
                            ...prev,
                            responsibilities: "",
                          }));
                        }}
                        className={`quill-box ${
                          errors.responsibilities
                            ? "border border-red-500 rounded-lg"
                            : ""
                        }`}
                        placeholder="Key duties and daily tasks..."
                        modules={quillModules}
                        formats={quillFormats}
                      />
                    </div>
                    {errors.responsibilities && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.responsibilities}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Employment Details */}
            <div className="p-8 bg-gray-50">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <FaUserTie className="text-blue-600" />
                Employment Details
              </h2>

              <div className="space-y-6">
                {/* Work Mode */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Work Mode <span className="text-red-500">*</span>
                  </label>

                  <div
                    className={`grid grid-cols-3 gap-3 ${
                      errors.mode ? "border border-red-500 p-3 rounded-lg" : ""
                    }`}
                  >
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
                          onChange={(e) => {
                            handleChange(e);
                            setErrors((prev) => ({ ...prev, mode: "" })); // clear error
                          }}
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

                  {errors.mode && (
                    <p className="text-red-500 text-xs mt-1">{errors.mode}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Employment Type <span className="text-red-500">*</span>
                  </label>

                  <div
                    className={`grid grid-cols-2 md:grid-cols-4 gap-3 ${
                      errors.employmentType
                        ? "border border-red-500 p-3 rounded-lg"
                        : ""
                    }`}
                  >
                    {[
                      { value: "FULL_TIME", label: "Full-time" },
                      { value: "PART_TIME", label: "Part-time" },
                      { value: "CONTRACT", label: "Contract" },
                      { value: "INTERNSHIP", label: "Internship" },
                      { value: "FREELANCE", label: "Freelance" },
                    ].map((type) => (
                      <label
                        key={type.value}
                        className={`flex items-center justify-center gap-2 p-4 border-2 rounded-lg cursor-pointer transition ${
                          formData.employmentType === type.value
                            ? "border-blue-600 bg-blue-50"
                            : "border-gray-200 hover:border-blue-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="employmentType"
                          value={type.value}
                          checked={formData.employmentType === type.value}
                          onChange={(e) => {
                            handleChange(e);
                            setErrors((prev) => ({
                              ...prev,
                              employmentType: "",
                            }));
                          }}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="font-medium text-sm">
                          {type.label}
                        </span>
                      </label>
                    ))}
                  </div>

                  {errors.employmentType && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.employmentType}
                    </p>
                  )}
                </div>

                {/* Shift Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Available Shifts <span className="text-red-500">*</span>
                  </label>
                  <div
                    className={`grid grid-cols-2 md:grid-cols-4 gap-3 ${
                      errors.shiftType
                        ? "border border-red-500 p-3 rounded-lg"
                        : ""
                    }`}
                  >
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
                          onChange={() => {
                            handleShiftChange(shift.value);

                            setErrors((prev) => ({
                              ...prev,
                              shiftType: "",
                            }));
                          }}
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                        <span className="text-sm font-medium">
                          {shift.label}
                        </span>
                      </label>
                    ))}
                  </div>
                  {errors.shiftType && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.shiftType}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Section 3: Experience & Qualifications */}
            <div className="p-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <FaClock className="text-blue-600" />
                Experience & Qualifications
              </h2>

              <div className="grid md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Education
                  </label>
                  <input
                    type="text"
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    placeholder="e.g. Bachelor's Degree"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Min Experience (Years)
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="minExperience"
                    value={formData.minExperience}
                    onChange={handleChange}
                    placeholder="0"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Max Experience (Years)
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="maxExperience"
                    value={formData.maxExperience}
                    onChange={handleChange}
                    required
                    placeholder="10"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Skills Required <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={skillsInput}
                  onChange={(e) => setSkillsInput(e.target.value)}
                  // onBlur={handleSkillsBlur}
                  onKeyDown={handleSkillsKeyDown}
                  required={formData.skillsRequired.length === 0}
                  placeholder="React, Node.js, Python"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            {/* Section 4: Salary & Openings */}
            <div className="p-8 bg-gray-50">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <FaMoneyBillWave className="text-blue-600" />
                Compensation & Openings
              </h2>

              <div className="space-y-5">
                <div className="grid md:grid-cols-3 gap-5">
                  {/* ✅ Salary Type (NOT required) */}
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

                  {/* ✅ Min Salary */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Min Salary
                    </label>
                    <input
                      type="number"
                      name="minSalary"
                      value={formData.minSalary}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value >= 0) handleChange(e);
                      }}
                      min="1"
                      step="1"
                      inputMode="numeric"
                      placeholder="50000"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>

                  {/* ✅ Max Salary */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Max Salary
                    </label>
                    <input
                      type="number"
                      name="maxSalary"
                      value={formData.maxSalary}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value >= 0) handleChange(e);
                      }}
                      min="1"
                      step="1"
                      inputMode="numeric"
                      placeholder="100000"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  {/* ✅ Openings */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Number of Openings <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="openings"
                      value={formData.openings}
                      onChange={handleChange}
                      required
                      min="1"
                      placeholder="1"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>

                  {/* ✅ Deadline */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Application Deadline{" "}
                      <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="date"
                      name="deadline"
                      value={formData.deadline}
                      onChange={handleChange}
                      required
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 5: Company Details */}
            <div className="p-8">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <FaBuilding className="text-blue-600" />
                Company Details
              </h2>

              <div className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Contact Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="companyEmail"
                      value={formData.companyEmail}
                      onChange={handleChange}
                      required
                      placeholder="careers@company.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Company Logo
                    </label>
                    <input
                      type="file"
                      name="logoFiles"
                      accept="image/*"
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 bg-gray-50">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <FaUserTie className="text-blue-600" />
                Candidate Questionnaire (Optional)
              </h2>

              <p className="text-sm text-gray-600 mb-6">
                Select the questions you want candidates to answer when they
                apply.
              </p>

              <div className="space-y-4">
                {/* Skills */}
                <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                  <input
                    type="checkbox"
                    checked={formData.questionnaire.skills.length > 0}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        questionnaire: {
                          ...prev.questionnaire,
                          skills: e.target.checked ? ["Node", "React"] : [],
                        },
                      }));
                    }}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <div>
                    <span className="font-medium">Ask for Skills</span>
                    <p className="text-xs text-gray-500">
                      Candidate will be asked to select Node, React, etc.
                    </p>
                  </div>
                </label>

                {/* Expected CTC */}
                <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                  <input
                    type="checkbox"
                    checked={!!formData.questionnaire.expectedCTC}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        questionnaire: {
                          ...prev.questionnaire,
                          expectedCTC: e.target.checked ? "12 LPA" : "",
                        },
                      }));
                    }}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <div>
                    <span className="font-medium">Expected CTC</span>
                    <p className="text-xs text-gray-500">
                      Candidate will provide their expected CTC (example: 12
                      LPA)
                    </p>
                  </div>
                </label>

                {/* Notice Period */}
                <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                  <input
                    type="checkbox"
                    checked={!!formData.questionnaire.noticePeriod}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        questionnaire: {
                          ...prev.questionnaire,
                          noticePeriod: e.target.checked ? "30 days" : "",
                        },
                      }));
                    }}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <div>
                    <span className="font-medium">Notice Period</span>
                    <p className="text-xs text-gray-500">
                      Candidate will enter their current notice period (example:
                      30 days)
                    </p>
                  </div>
                </label>

                {/* Date of Birth */}
                <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                  <input
                    type="checkbox"
                    checked={!!formData.questionnaire.dob}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        questionnaire: {
                          ...prev.questionnaire,
                          dob: e.target.checked ? "1994-10-10" : "",
                        },
                      }));
                    }}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <div>
                    <span className="font-medium">Date of Birth</span>
                    <p className="text-xs text-gray-500">
                      Candidate will provide their DOB
                    </p>
                  </div>
                </label>

                {/* Willing to Relocate */}
                <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                  <input
                    type="checkbox"
                    checked={formData.questionnaire.willingToRelocate}
                    onChange={(e) => {
                      setFormData((prev) => ({
                        ...prev,
                        questionnaire: {
                          ...prev.questionnaire,
                          willingToRelocate: e.target.checked,
                        },
                      }));
                    }}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <div>
                    <span className="font-medium">Willing to Relocate?</span>
                    <p className="text-xs text-gray-500">
                      Yes/No question for relocation willingness
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Section 6: Addresses */}
            <div className="p-8 bg-gray-50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-blue-600" />
                  Office Locations
                </h2>
                <button
                  type="button"
                  onClick={addAddress}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
                >
                  <FaPlus /> Add Location
                </button>
              </div>

              <div className="space-y-5">
                {formData.addresses.map((addr, idx) => (
                  <div
                    key={idx}
                    className="relative bg-white rounded-lg p-6 border border-gray-200"
                  >
                    {formData.addresses.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeAddress(idx)}
                        className="absolute top-4 right-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                      >
                        <FaMinus />
                      </button>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Building
                        </label>
                        <input
                          type="text"
                          value={addr.building}
                          onChange={(e) =>
                            handleAddressChange(idx, "building", e.target.value)
                          }
                          placeholder="Building Name/No"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Floor
                        </label>
                        <input
                          type="text"
                          value={addr.floor}
                          onChange={(e) =>
                            handleAddressChange(idx, "floor", e.target.value)
                          }
                          placeholder="Floor"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Apartment/Suite
                        </label>
                        <input
                          type="text"
                          value={addr.apartment}
                          onChange={(e) =>
                            handleAddressChange(
                              idx,
                              "apartment",
                              e.target.value,
                            )
                          }
                          placeholder="Suite/Unit"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Landmark
                        </label>
                        <input
                          type="text"
                          value={addr.landmark}
                          onChange={(e) =>
                            handleAddressChange(idx, "landmark", e.target.value)
                          }
                          placeholder="Nearby Landmark"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                        />
                      </div>

                      {/* COUNTRY */}
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Country <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={addr.country || "India"}
                          required
                          onChange={(e) =>
                            handleCountryChange(idx, e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        >
                          <option value="">Select Country</option>
                          <option value="India">India</option>
                          {countries.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* STATE */}
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          State <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={addr.state}
                          required
                          onChange={(e) =>
                            handleStateChange(idx, e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        >
                          <option value="">Select State</option>
                          {states.map((s) => (
                            <option key={s.name} value={s.name}>
                              {s.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* CITY */}
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          City <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={addr.city}
                          required
                          onChange={(e) => {
                            const city = e.target.value;
                            handleAddressChange(idx, "city", city);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        >
                          <option value="">Select City</option>
                          {cities.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* PINCODE (AUTO FILLED) */}
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Pincode <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={addr.pincode}
                          pattern="\d{6}"
                          maxLength={6}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "");
                            handleAddressChange(idx, "pincode", value);
                          }}
                          placeholder="Enter Pincode"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Additional Info
                        </label>
                        <input
                          type="text"
                          value={addr.additionalInfo}
                          onChange={(e) =>
                            handleAddressChange(
                              idx,
                              "additionalInfo",
                              e.target.value,
                            )
                          }
                          placeholder="Any additional location details"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit */}
            <div className="p-8">
              <button
                type="submit"
                disabled={loading}
                className={`w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-lg text-lg font-semibold shadow-lg transition-all ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl"
                }`}
              >
                {loading ? (
                  <>Posting Job...</>
                ) : (
                  <>
                    Post Job Now <FaRegHandPointRight className="text-2xl" />
                  </>
                )}
              </button>
            </div>
          </form>
    </DashboardCard>
  );
}
