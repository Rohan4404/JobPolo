

// import React, { useState, useEffect } from "react";
// import { FiSearch, FiMapPin } from "react-icons/fi";
// import { Range } from "react-range";

// const JobsFilter = ({ jobsData, onFilterChange }) => {
//   const [filters, setFilters] = useState({
//     title: "",
//     location: "",
//     category: [],
//     type: [],
//     experience: [],
//     date: "",
//     salary: { min: 0, max: 0 },
//   });

//   const [showAllCategories, setShowAllCategories] = useState(false);

//   const locations = [...new Set(jobsData.map((job) => job.location))];
//   const categories = [...new Set(jobsData.map((job) => job.category))];
//   const types = [...new Set(jobsData.map((job) => job.type))];
//   const experiences = ["No-experience", "Fresher", "Intermediate", "Expert"];
//   const dateOptions = ["All", "Last Hour", "Last 24 Hours", "Last 7 Days", "Last 30 Days"];

//   // salary range calculation
//   const salaries = jobsData.map((job) => {
//     const range = job.salary.match(/\d+/g);
//     return range ? range.map(Number) : [];
//   });
//   const flatSalaries = salaries.flat();
//   const minSalary = Math.min(...flatSalaries);
//   const maxSalary = Math.max(...flatSalaries);

//   useEffect(() => {
//     setFilters((prev) => ({
//       ...prev,
//       salary: { min: minSalary, max: maxSalary },
//     }));
//   }, [minSalary, maxSalary]);

//   const handleCheckboxChange = (field, value) => {
//     let updated = [...filters[field]];
//     if (updated.includes(value)) {
//       updated = updated.filter((v) => v !== value);
//     } else {
//       updated.push(value);
//     }
//     const newFilters = { ...filters, [field]: updated };
//     setFilters(newFilters);
//     onFilterChange(newFilters);
//   };

//   const handleChange = (field, value) => {
//     const newFilters = { ...filters, [field]: value };
//     setFilters(newFilters);
//     onFilterChange(newFilters);
//   };

//   const handleDateChange = (value) => {
//     const newFilters = { ...filters, date: filters.date === value ? "" : value };
//     setFilters(newFilters);
//     onFilterChange(newFilters);
//   };

//   const displayedCategories = showAllCategories ? categories : categories.slice(0, 5);

//   return (
//     <aside
//       className="w-full md:w-72 p-6 rounded-xl custom-scrollbar"
//       style={{ backgroundColor: "#1C42FF0D" }}
//     >
//       {/* Search */}
//       <div className="mb-6 text-left">
//         <label className="block text-sm font-medium mb-2 text-black">
//           Search by Job Title
//         </label>
//         <div className="relative">
//           <FiSearch className="absolute left-3 top-3 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Job title or company"
//             className="w-full border border-gray-300 pl-10 pr-3 py-2 rounded-lg outline-none"
//             value={filters.title}
//             onChange={(e) => handleChange("title", e.target.value)}
//           />
//         </div>
//       </div>

//       {/* Location */}
//       <div className="mb-6 text-left">
//         <label className="block text-sm font-medium mb-2 text-black">
//           Location
//         </label>

//         <div className="relative">
//           <FiMapPin className="absolute left-3 top-3 text-gray-400" />

//           <select
//             className="w-full border border-gray-300 pl-10 pr-8 py-2 rounded-lg outline-none bg-white text-sm cursor-pointer appearance-none"
//             value={filters.location}
//             onChange={(e) => handleChange("location", e.target.value)}
//           >
//             <option value="">Choose city</option>
//             {locations.map((loc, i) => (
//               <option key={i} value={loc} className="text-black">
//                 {loc}
//               </option>
//             ))}
//           </select>

//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//           </svg>
//         </div>
//       </div>

//       {/* Category */}
//       <div className="mb-6 text-left">
//         <h4 className="font-semibold mb-3 text-black">Category</h4>
//         <div className="space-y-2">
//           {displayedCategories.map((cat, i) => (
//             <label key={i} className="flex justify-between items-center text-sm cursor-pointer">
//               <div className="flex items-center gap-2">
//                 <input
//                   type="checkbox"
//                   checked={filters.category.includes(cat)}
//                   onChange={() => handleCheckboxChange("category", cat)}
//                   className="accent-[#1C42FF]"
//                 />
//                 {cat}
//               </div>
//               <span className="text-xs text-black bg-white px-2 py-0.5 rounded-full">
//                 {jobsData.filter((j) => j.category === cat).length}
//               </span>
//             </label>
//           ))}
//         </div>
//         {categories.length > 5 && (
//           <button
//             onClick={() => setShowAllCategories(!showAllCategories)}
//             className="mt-3 text-sm px-4 py-2 rounded-lg w-full text-white"
//             style={{
//               background: "linear-gradient(90deg, #1C42FF 0%, #001478 100%)",
//             }}
//           >
//             {showAllCategories ? "Show Less" : "Show More"}
//           </button>
//         )}
//       </div>

//       {/* Job Type */}
//       <div className="mb-6 text-left">
//         <h4 className="font-semibold mb-3 text-black">Job Type</h4>
//         <div className="space-y-2">
//           {types.map((t, i) => (
//             <label key={i} className="flex justify-between items-center text-sm cursor-pointer">
//               <div className="flex items-center gap-2">
//                 <input
//                   type="checkbox"
//                   checked={filters.type.includes(t)}
//                   onChange={() => handleCheckboxChange("type", t)}
//                   className="accent-[#1C42FF]"
//                 />
//                 {t}
//               </div>
//               <span className="text-xs text-black bg-white px-2 py-0.5 rounded-full">
//                 {jobsData.filter((j) => j.type === t).length}
//               </span>
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* Experience Level */}
//       <div className="mb-6 text-left">
//         <h4 className="font-semibold mb-3 text-black">Experience Level</h4>
//         <div className="space-y-2">
//           {experiences.map((exp, i) => (
//             <label key={i} className="flex justify-between items-center text-sm cursor-pointer">
//               <div className="flex items-center gap-2">
//                 <input
//                   type="checkbox"
//                   checked={filters.experience.includes(exp)}
//                   onChange={() => handleCheckboxChange("experience", exp)}
//                   className="accent-[#1C42FF]"
//                 />
//                 {exp}
//               </div>
//               <span className="text-xs text-black bg-white px-2 py-0.5 rounded-full">
//                 {jobsData.filter((j) => j.experience === exp).length || 0}
//               </span>
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* Date Posted */}
//       <div className="mb-6 text-left">
//         <h4 className="font-semibold mb-3 text-black">Date Posted</h4>
//         <div className="space-y-2">
//           {dateOptions.map((d, i) => (
//             <label key={i} className="flex justify-between items-center text-sm cursor-pointer">
//               <div className="flex items-center gap-2">
//                 <input
//                   type="radio"
//                   name="dateFilter"
//                   checked={filters.date === d}
//                   onChange={() => handleDateChange(d)}
//                   className="accent-[#1C42FF]"
//                 />
//                 {d}
//               </div>
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* Salary */}
//       <div className="mb-6 text-left">
//         <h4 className="font-semibold mb-3 text-black">Salary</h4>

//         <Range
//           step={1000}
//           min={0}
//           max={maxSalary}
//           values={[filters.salary.min, filters.salary.max]}
//           onChange={(values) => {
//             const newFilters = {
//               ...filters,
//               salary: { min: values[0], max: values[1] },
//             };
//             setFilters(newFilters);
//             onFilterChange(newFilters);
//           }}
//           renderTrack={({ props, children }) => (
//             <div
//               {...props}
//               className="h-2 rounded-lg w-full"
//               style={{
//                 background: `linear-gradient(90deg, #e5e7eb 0%, #1C42FF ${
//                   ((filters.salary.min - 0) / maxSalary) * 100
//                 }%, #001478 ${((filters.salary.max - 0) / maxSalary) * 100}%, #e5e7eb ${
//                   ((filters.salary.max - 0) / maxSalary) * 100
//                 }%)`,
//               }}
//             >
//               {children}
//             </div>
//           )}
//           renderThumb={({ props }) => (
//             <div
//               {...props}
//               className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 shadow-md cursor-pointer"
//             />
//           )}
//         />

//         <div className="flex justify-between items-center text-sm mt-2">
//           <span className="text-black">
//             ${filters.salary.min.toLocaleString()} - ${filters.salary.max.toLocaleString()}
//           </span>
//         </div>
//       </div>

//       {/* Tags */}
//       <div className="mb-6 text-left">
//         <h4 className="font-semibold mb-3 text-black">Tags</h4>

//         <div className="flex flex-wrap gap-2">
//           {["engineering", "design", "ui/ux", "marketing", "management", "soft", "construction"].map(
//             (tag, i) => (
//               <span
//                 key={i}
//                 className="px-3 py-1 rounded-full text-sm font-medium shadow-sm cursor-pointer hover:opacity-80 transition"
//                 style={{ backgroundColor: "#1C42FF1A" }}
//                 onClick={() => handleChange("title", tag)}
//               >
//                 <span
//                   style={{
//                     background: "linear-gradient(90deg, #1C42FF 0%, #001478 100%)",
//                     WebkitBackgroundClip: "text",
//                     backgroundClip: "text",
//                     WebkitTextFillColor: "transparent",
//                     color: "transparent",
//                   }}
//                 >
//                   {tag}
//                 </span>
//               </span>
//             )
//           )}
//         </div>
//       </div>
//     </aside>
//   );
// };

// export default JobsFilter;


// import React, { useState, useEffect } from "react";
// import { FiSearch, FiMapPin } from "react-icons/fi";
// import { Range } from "react-range";

// const JobsFilter = ({ jobsData, onFilterChange }) => {
//   const [filters, setFilters] = useState({
//     title: "",
//     location: "",
//     category: [],
//     type: [],
//     date: "",
//     salary: { min: 0, max: 0 },
//   });

//   const [showAllCategories, setShowAllCategories] = useState(false);

//   // ---------------------------------------------
//   // Extract VALUES from API structure
//   // ---------------------------------------------

//   const locations = [
//     ...new Set(
//       jobsData
//         .map((job) => job.jobPostAddresses?.[0]?.city)
//         .filter(Boolean)
//     ),
//   ];

//   const categories = [
//     ...new Set(jobsData.map((job) => job.industry).filter(Boolean)),
//   ];

//   const types = [
//     ...new Set(jobsData.map((job) => job.employmentType).filter(Boolean)),
//   ];

//   const dateOptions = ["All", "Last Hour", "Last 24 Hours", "Last 7 Days", "Last 30 Days"];

//   // ---------------------------------------------
//   // Salary calculation from salaryRange
//   // ---------------------------------------------

//   const salaries = jobsData.map((job) => {
//     if (!job.salaryRange) return [];
//     const nums = job.salaryRange.match(/\d+/g);
//     return nums ? nums.map(Number) : [];
//   });

//   const flatSalaries = salaries.flat();
//   const minSalary = flatSalaries.length ? Math.min(...flatSalaries) : 0;
//   const maxSalary = flatSalaries.length ? Math.max(...flatSalaries) : 100000;

//   useEffect(() => {
//     setFilters((prev) => ({
//       ...prev,
//       salary: { min: minSalary, max: maxSalary },
//     }));
//   }, [minSalary, maxSalary]);

//   // ---------------------------------------------
//   // Handlers
//   // ---------------------------------------------

//   const handleCheckboxChange = (field, value) => {
//     let updated = [...filters[field]];
//     if (updated.includes(value)) {
//       updated = updated.filter((v) => v !== value);
//     } else {
//       updated.push(value);
//     }
//     const newFilters = { ...filters, [field]: updated };
//     setFilters(newFilters);
//     onFilterChange(newFilters);
//   };

//   const handleChange = (field, value) => {
//     const newFilters = { ...filters, [field]: value };
//     setFilters(newFilters);
//     onFilterChange(newFilters);
//   };

//   const handleDateChange = (value) => {
//     const newFilters = { ...filters, date: filters.date === value ? "" : value };
//     setFilters(newFilters);
//     onFilterChange(newFilters);
//   };

//   const displayedCategories = showAllCategories ? categories : categories.slice(0, 5);

//   return (
//     <aside
//       className="w-full md:w-72 p-6 rounded-xl "
//       style={{ backgroundColor: "#1C42FF0D" }}
//     >
//       {/* Search */}
//       <div className="mb-6 text-left">
//         <label className="block text-sm font-medium mb-2 text-black">
//           Search by Job Title
//         </label>
//         <div className="relative">
//           <FiSearch className="absolute left-3 top-3 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Job title or company"
//             className="w-full border border-gray-300 pl-10 pr-3 py-2 rounded-lg outline-none"
//             value={filters.title}
//             onChange={(e) => handleChange("title", e.target.value)}
//           />
//         </div>
//       </div>

//       {/* Location */}
//       <div className="mb-6 text-left">
//         <label className="block text-sm font-medium mb-2 text-black">
//           Location
//         </label>

//         <div className="relative">
//           <FiMapPin className="absolute left-3 top-3 text-gray-400" />

//           <select
//             className="w-full border border-gray-300 pl-10 pr-8 py-2 rounded-lg outline-none bg-white text-sm cursor-pointer appearance-none"
//             value={filters.location}
//             onChange={(e) => handleChange("location", e.target.value)}
//           >
//             <option value="">Choose City</option>
//             {locations.map((loc, i) => (
//               <option key={i} value={loc} className="text-black">
//                 {loc}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Category */}
//       <div className="mb-6 text-left">
//         <h4 className="font-semibold mb-3 text-black">Category</h4>
//         <div className="space-y-2">
//           {displayedCategories.map((cat, i) => (
//             <label key={i} className="flex justify-between items-center text-sm cursor-pointer">
//               <div className="flex items-center gap-2">
//                 <input
//                   type="checkbox"
//                   checked={filters.category.includes(cat)}
//                   onChange={() => handleCheckboxChange("category", cat)}
//                   className="accent-[#1C42FF]"
//                 />
//                 {cat}
//               </div>
//               <span className="text-xs text-black bg-white px-2 py-0.5 rounded-full">
//                 {jobsData.filter((j) => j.industry === cat).length}
//               </span>
//             </label>
//           ))}
//         </div>

//         {categories.length > 5 && (
//           <button
//             onClick={() => setShowAllCategories(!showAllCategories)}
//             className="mt-3 text-sm px-4 py-2 rounded-lg w-full text-white"
//             style={{ background: "linear-gradient(90deg, #1C42FF 0%, #001478 100%)" }}
//           >
//             {showAllCategories ? "Show Less" : "Show More"}
//           </button>
//         )}
//       </div>

//       {/* Job Type */}
//       <div className="mb-6 text-left">
//         <h4 className="font-semibold mb-3 text-black">Job Type</h4>
//         <div className="space-y-2">
//           {types.map((t, i) => (
//             <label key={i} className="flex justify-between items-center text-sm cursor-pointer">
//               <div className="flex items-center gap-2">
//                 <input
//                   type="checkbox"
//                   checked={filters.type.includes(t)}
//                   onChange={() => handleCheckboxChange("type", t)}
//                   className="accent-[#1C42FF]"
//                 />
//                 {t}
//               </div>
//               <span className="text-xs text-black bg-white px-2 py-0.5 rounded-full">
//                 {jobsData.filter((j) => j.employmentType === t).length}
//               </span>
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* Date Posted */}
//       <div className="mb-6 text-left">
//         <h4 className="font-semibold mb-3 text-black">Date Posted</h4>
//         <div className="space-y-2">
//           {dateOptions.map((d, i) => (
//             <label key={i} className="flex justify-between items-center text-sm cursor-pointer">
//               <div className="flex items-center gap-2">
//                 <input
//                   type="radio"
//                   name="dateFilter"
//                   checked={filters.date === d}
//                   onChange={() => handleDateChange(d)}
//                   className="accent-[#1C42FF]"
//                 />
//                 {d}
//               </div>
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* Salary */}
//       <div className="mb-6 text-left">
//         <h4 className="font-semibold mb-3 text-black">Salary Range</h4>

//    <Range
//   step={1000}
//   min={0}
//   max={maxSalary}
//   values={[filters.salary.min, filters.salary.max]}
//   onChange={(values) => {
//     const newFilters = { ...filters, salary: { min: values[0], max: values[1] } };
//     setFilters(newFilters);
//     onFilterChange(newFilters);
//   }}

//   renderTrack={({ props, children }) => (
//     <div
//       {...props}
//       style={{
//         ...props.style,
//         height: "6px",
//         background: "#dbeafe",
//         borderRadius: "8px",
//         position: "relative",
//       }}
//     >
//       {children}
//     </div>
//   )}

//   renderThumb={({ props, index }) => (
//     <div
//       {...props}
//       key={index}
//       style={{
//         ...props.style,
//         width: "20px",
//         height: "20px",
//         borderRadius: "50%",
//         background: "linear-gradient(90deg,#1C42FF,#001478)",
//         boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
//       }}
//     />
//   )}
// />



//         <div className="flex justify-between items-center text-sm mt-2 text-black">
//           <span>
//             ₹{filters.salary.min.toLocaleString()} - ₹{filters.salary.max.toLocaleString()}
//           </span>
//         </div>
//       </div>
//     </aside>
//   );
// };

// export default JobsFilter;



import React, { useState, useEffect } from "react";
import { FiSearch, FiMapPin } from "react-icons/fi";
import { Range } from "react-range";

const JobsFilter = ({ jobsData, onFilterChange }) => {
  const [filters, setFilters] = useState({
    title: "",
    location: "",
    category: [],   // category names (from job.category.name)
    type: [],       // employmentType
    mode: [],       // REMOTE / ONSITE / HYBRID
    date: "",
    salary: { min: 0, max: 0 },
  });

  const [showAllCategories, setShowAllCategories] = useState(false);

  // ---------------------------------------------
  // OPTIONS FROM API
  // ---------------------------------------------

  const locations = [
    ...new Set(
      jobsData
        .map((job) => job.jobPostAddresses?.[0]?.city)
        .filter(Boolean)
    ),
  ];

  const categories = [
    ...new Set(
      jobsData
        .map((job) => job.category?.name)
        .filter(Boolean)
    ),
  ];

  const types = [
    ...new Set(
      jobsData
        .map((job) => job.employmentType)
        .filter(Boolean)
    ),
  ];

  const modes = [
    ...new Set(
      jobsData
        .map((job) => job.mode)
        .filter(Boolean)
    ),
  ];

  const dateOptions = [
    "All",
    "Last Hour",
    "Last 24 Hours",
    "Last 7 Days",
    "Last 30 Days",
  ];

  // ---------------------------------------------
  // SALARY RANGE (minSalary / maxSalary from API)
  // ---------------------------------------------

  const salaryNumbers = jobsData
    .flatMap((job) => [
      typeof job.minSalary === "number" ? job.minSalary : null,
      typeof job.maxSalary === "number" ? job.maxSalary : null,
    ])
    .filter((n) => n !== null);

  const minSalary = salaryNumbers.length ? Math.min(...salaryNumbers) : 0;
  const maxSalary = salaryNumbers.length ? Math.max(...salaryNumbers) : 100000;

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      salary: { min: minSalary, max: maxSalary },
    }));
  }, [minSalary, maxSalary]);

  // ---------------------------------------------
  // Handlers
  // ---------------------------------------------

  const handleCheckboxChange = (field, value) => {
    let updated = [...filters[field]];
    if (updated.includes(value)) {
      updated = updated.filter((v) => v !== value);
    } else {
      updated.push(value);
    }
    const newFilters = { ...filters, [field]: updated };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleChange = (field, value) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleDateChange = (value) => {
    const newFilters = {
      ...filters,
      date: filters.date === value ? "" : value,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const displayedCategories = showAllCategories
    ? categories
    : categories.slice(0, 5);

  return (
    <aside
      className="w-full md:w-72 p-6 rounded-xl"
      style={{ backgroundColor: "#1C42FF0D" }}
    >
      {/* Search */}
      <div className="mb-6 text-left">
        <label className="block text-sm font-medium mb-2 text-black">
          Search by Job Title
        </label>
        <div className="relative">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Job title or company"
            className="w-full border border-gray-300 pl-10 pr-3 py-2 rounded-lg outline-none"
            value={filters.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
        </div>
      </div>

      {/* Location */}
      <div className="mb-6 text-left">
        <label className="block text-sm font-medium mb-2 text-black">
          Location
        </label>

        <div className="relative">
          <FiMapPin className="absolute left-3 top-3 text-gray-400" />

          <select
            className="w-full border border-gray-300 pl-10 pr-8 py-2 rounded-lg outline-none bg-white text-sm cursor-pointer appearance-none"
            value={filters.location}
            onChange={(e) => handleChange("location", e.target.value)}
          >
            <option value="">Choose City</option>
            {locations.map((loc, i) => (
              <option key={i} value={loc} className="text-black">
                {loc}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Category */}
      <div className="mb-6 text-left">
        <h4 className="font-semibold mb-3 text-black">Category</h4>
        <div className="space-y-2">
          {displayedCategories.map((cat, i) => (
            <label
              key={i}
              className="flex justify-between items-center text-sm cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.category.includes(cat)}
                  onChange={() => handleCheckboxChange("category", cat)}
                  className="accent-[#1C42FF]"
                />
                {cat}
              </div>
              <span className="text-xs text-black bg-white px-2 py-0.5 rounded-full">
                {jobsData.filter((j) => j.category?.name === cat).length}
              </span>
            </label>
          ))}
        </div>

        {categories.length > 5 && (
          <button
            onClick={() => setShowAllCategories(!showAllCategories)}
            className="mt-3 text-sm px-4 py-2 rounded-lg w-full text-white"
            style={{
              background:
                "linear-gradient(90deg, #1C42FF 0%, #001478 100%)",
            }}
          >
            {showAllCategories ? "Show Less" : "Show More"}
          </button>
        )}
      </div>

      {/* Job Type */}
      <div className="mb-6 text-left">
        <h4 className="font-semibold mb-3 text-black">Job Type</h4>
        <div className="space-y-2">
          {types.map((t, i) => (
            <label
              key={i}
              className="flex justify-between items-center text-sm cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.type.includes(t)}
                  onChange={() => handleCheckboxChange("type", t)}
                  className="accent-[#1C42FF]"
                />
                {t}
              </div>
              <span className="text-xs text-black bg-white px-2 py-0.5 rounded-full">
                {jobsData.filter((j) => j.employmentType === t).length}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Work Mode (REMOTE / ONSITE / HYBRID) */}
      <div className="mb-6 text-left">
        <h4 className="font-semibold mb-3 text-black">Work Mode</h4>
        <div className="space-y-2">
          {modes.map((m, i) => (
            <label
              key={i}
              className="flex justify-between items-center text-sm cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filters.mode.includes(m)}
                  onChange={() => handleCheckboxChange("mode", m)}
                  className="accent-[#1C42FF]"
                />
                {m}
              </div>
              <span className="text-xs text-black bg-white px-2 py-0.5 rounded-full">
                {jobsData.filter((j) => j.mode === m).length}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Date Posted */}
      <div className="mb-6 text-left">
        <h4 className="font-semibold mb-3 text-black">Date Posted</h4>
        <div className="space-y-2">
          {dateOptions.map((d, i) => (
            <label
              key={i}
              className="flex justify-between items-center text-sm cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="dateFilter"
                  checked={filters.date === d}
                  onChange={() => handleDateChange(d)}
                  className="accent-[#1C42FF]"
                />
                {d}
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Salary */}
      <div className="mb-6 text-left">
        <h4 className="font-semibold mb-3 text-black">Salary Range</h4>

        <Range
          step={1000}
          min={minSalary}
          max={maxSalary}
          values={[filters.salary.min, filters.salary.max]}
          onChange={(values) => {
            const newFilters = {
              ...filters,
              salary: { min: values[0], max: values[1] },
            };
            setFilters(newFilters);
            onFilterChange(newFilters);
          }}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "6px",
                background: "#dbeafe",
                borderRadius: "8px",
                position: "relative",
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props, index }) => (
            <div
              {...props}
              key={index}
              style={{
                ...props.style,
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                background: "linear-gradient(90deg,#1C42FF,#001478)",
                boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
              }}
            />
          )}
        />

        <div className="flex justify-between items-center text-sm mt-2 text-black">
          <span>
            ₹{filters.salary.min.toLocaleString()} - ₹
            {filters.salary.max.toLocaleString()}
          </span>
        </div>
      </div>
    </aside>
  );
};

export default JobsFilter;
