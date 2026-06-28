// import React, { useEffect, useState } from "react";
// import {
//   Download,
//   MoreHorizontal,
//   Briefcase,
//   Calendar,
//   GraduationCap,
//   Clock,
//   Filter,
//   X,
// } from "lucide-react";
// import {
//   getActiveJobApplications,
//   getAllCategories,
//   getJobsFilters,
//   getUserProfilewith,
// } from "../api/service2";
// import ProfileModal from "./ProfileModal";

// /* ---------------- APPLICANT CARD ---------------- */

// const ApplicantCard = ({ applicant, onClick }) => {
//   const [showMenu, setShowMenu] = useState(false);
//   const getInitials = (name = "") =>
//     name
//       .split(" ")
//       .map((n) => n[0])
//       .join("")
//       .slice(0, 2)
//       .toUpperCase();

//   const handleDownload = (e) => {
//     e.stopPropagation();
//     if (!applicant.resumeUrls?.length) return;

//     applicant.resumeUrls.forEach((url, idx) => {
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = `Resume_${applicant.name}_${idx + 1}`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     });
//   };

//   useEffect(() => {
//     const close = () => setShowMenu(false);
//     window.addEventListener("click", close);
//     return () => window.removeEventListener("click", close);
//   }, []);

//   return (
//     <div
//       onClick={onClick}
//       className="group w-[25vw] min-w-[300px] max-w-sm bg-white border rounded-xl hover:shadow-xl transition cursor-pointer h-[38vh]"
//     >
//       <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 relative rounded-t-xl">
//         <div className="absolute top-3 right-3">
//           <MoreHorizontal
//             size={18}
//             className="text-white cursor-pointer"
//             onClick={(e) => {
//               e.stopPropagation();
//               setShowMenu((prev) => !prev);
//             }}
//           />

//           {showMenu && (
//             <div
//               onClick={(e) => e.stopPropagation()}
//               className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg border z-50"
//             >
//               <button
//                 onClick={() => {
//                   console.log("Shortlisted:", applicant);
//                   setShowMenu(false);
//                 }}
//                 className="w-full text-left px-3 py-2 hover:bg-gray-100 text-sm"
//               >
//                 Shortlist
//               </button>

//               <button
//                 onClick={() => {
//                   console.log("Rejected:", applicant);
//                   setShowMenu(false);
//                 }}
//                 className="w-full text-left px-3 py-2 hover:bg-red-100 text-red-600 text-sm"
//               >
//                 Reject
//               </button>
//             </div>
//           )}
//         </div>
//         <div className="flex items-center gap-3">
//           <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white flex items-center justify-center text-white font-bold text-xl">
//             {getInitials(applicant.name)}
//           </div>
//           <div className="text-white">
//             <h4 className="font-bold truncate">{applicant.name}</h4>
//             <p className="text-sm flex items-center gap-1">
//               <Briefcase size={14} /> {applicant.position}
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="p-4 space-y-2">
//         <InfoRow
//           icon={<Clock size={16} />}
//           label="Experience"
//           value={`${applicant.experienceNum} Years`}
//         />
//         <InfoRow
//           icon={<GraduationCap size={16} />}
//           label="Education"
//           value={applicant.education}
//         />
//         <InfoRow
//           icon={<Calendar size={16} />}
//           label="Applied On"
//           value={applicant.applied}
//         />

//         <button
//           onClick={handleDownload}
//           className="mt-3 w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-2 rounded-lg"
//         >
//           <Download size={16} /> Download Resume
//         </button>
//       </div>
//     </div>
//   );
// };

// const InfoRow = ({ icon, label, value }) => (
//   <div className="flex items-center gap-2">
//     <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
//       {icon}
//     </div>
//     <div>
//       <p className="text-xs text-gray-500">{label}</p>
//       <p className="text-sm font-semibold">{value}</p>
//     </div>
//   </div>
// );

// /* ---------------- MAIN PAGE ---------------- */

// const JobApplications = () => {
//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedApplicant, setSelectedApplicant] = useState(null);
//   const [showFilters, setShowFilters] = useState(false);

//   const [jobs, setJobs] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [employers, setEmployers] = useState([]);

//   const [filters, setFilters] = useState({
//     status: "APPLIED",
//     search: "",
//     jobId: "",
//     categoryId: "",
//     employeeId: "",
//     employerId: "",
//     startDate: "",
//     endDate: "",
//   });

//   /* ---------- LOAD FILTER DATA ONCE ---------- */
//   useEffect(() => {
//     const loadFilters = async () => {
//       try {
//         const [jobsRes, catRes, usersRes] = await Promise.all([
//           getJobsFilters({ page: 1, limit: 100 }),
//           getAllCategories(),
//           getUserProfilewith({ page: 1, limit: 100 }),
//         ]);

//         setJobs(jobsRes?.data?.jobs || []);
//         setCategories(catRes?.data?.categories || []);

//         const users = usersRes?.data?.users || [];
//         setEmployees(users.filter((u) => u.employee));
//         setEmployers(users.filter((u) => u.employer));
//       } catch (err) {
//         console.error("Failed to load filters", err);
//       }
//     };

//     loadFilters();
//   }, []);

//   /* ---------- DEBOUNCED FETCH ---------- */
//   useEffect(() => {
//     const delay = setTimeout(() => {
//       fetchApplications();
//     }, 500);

//     return () => clearTimeout(delay);
//   }, [
//     filters.search,
//     filters.status,
//     filters.jobId,
//     filters.categoryId,
//     filters.employeeId,
//     filters.employerId,
//     filters.startDate,
//     filters.endDate,
//   ]);

//   const fetchApplications = async () => {
//     setLoading(true);
//     try {
//       const res = await getActiveJobApplications({
//         page: 1,
//         limit: 50,
//         ...filters,
//         search: filters.search?.trim() || undefined,
//       });
//       setApplications(res?.data?.jobApplications || []);
//     } catch (err) {
//       console.error("Fetch failed", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetFilters = () => {
//     setFilters({
//       status: "APPLIED",
//       search: "",
//       jobId: "",
//       categoryId: "",
//       employeeId: "",
//       employerId: "",
//       startDate: "",
//       endDate: "",
//     });
//   };

//   const uniqueJobs = Array.from(
//     new Map(jobs.map((j) => [j.title, j])).values(),
//   );
//   return (
//     <div className="min-h-screen bg-gray-50 text-start">
//       <div className="max-w-7xl mx-auto">
//         {/* HEADER */}
//         <div className="bg-white shadow p-6 flex justify-between items-center">
//           <div>
//             <h1 className="text-2xl font-bold">Job Applications</h1>
//             <p className="text-gray-500">Total: {applications.length}</p>
//           </div>

//           <button
//             onClick={() => setShowFilters(!showFilters)}
//             className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg"
//           >
//             {showFilters ? <X size={16} /> : <Filter size={16} />}
//             Filters
//           </button>
//         </div>

//         {/* FILTER PANEL */}
//         {showFilters && (
//           <div className="bg-white p-4 border-b grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
//             <input
//               placeholder="Search applicant / job"
//               value={filters.search}
//               onChange={(e) =>
//                 setFilters({ ...filters, search: e.target.value })
//               }
//               className="border rounded px-3 py-2"
//             />

//             <select
//               value={filters.status}
//               onChange={(e) =>
//                 setFilters({ ...filters, status: e.target.value })
//               }
//               className="border rounded px-3 py-2"
//             >
//               <option value="APPLIED">Applied</option>
//               <option value="SHORTLISTED">Shortlisted</option>
//               <option value="REJECTED">Rejected</option>
//             </select>

//             <select
//               value={filters.jobId}
//               onChange={(e) =>
//                 setFilters({ ...filters, jobId: e.target.value })
//               }
//               className="border rounded px-3 py-2"
//             >
//               <option value="">All Jobs</option>
//               {uniqueJobs.map((j) => (
//                 <option key={j.id} value={j.id}>
//                   {j.title}
//                 </option>
//               ))}
//             </select>

//             <select
//               value={filters.categoryId}
//               onChange={(e) =>
//                 setFilters({ ...filters, categoryId: e.target.value })
//               }
//               className="border rounded px-3 py-2"
//             >
//               <option value="">All Categories</option>
//               {categories.map((c) => (
//                 <option key={c.id} value={c.id}>
//                   {c.name}
//                 </option>
//               ))}
//             </select>

//             <select
//               value={filters.employeeId}
//               onChange={(e) =>
//                 setFilters({ ...filters, employeeId: e.target.value })
//               }
//               className="border rounded px-3 py-2"
//             >
//               <option value="">All Employees</option>
//               {employees.map((e) => (
//                 <option key={e.employee.id} value={e.employee.id}>
//                   {e.firstName} {e.lastName}
//                 </option>
//               ))}
//             </select>

//             <select
//               value={filters.employerId}
//               onChange={(e) =>
//                 setFilters({ ...filters, employerId: e.target.value })
//               }
//               className="border rounded px-3 py-2"
//             >
//               <option value="">All Employers</option>
//               {employers.map((e) => (
//                 <option key={e.employer.id} value={e.employer.id}>
//                   {e.employer.companyName}
//                 </option>
//               ))}
//             </select>

//             <input
//               type="date"
//               value={filters.startDate}
//               onChange={(e) =>
//                 setFilters({ ...filters, startDate: e.target.value })
//               }
//               className="border rounded px-3 py-2"
//             />

//             <input
//               type="date"
//               value={filters.endDate}
//               onChange={(e) =>
//                 setFilters({ ...filters, endDate: e.target.value })
//               }
//               className="border rounded px-3 py-2"
//             />

//             <button
//               onClick={resetFilters}
//               className="bg-gray-200 rounded px-4 py-2"
//             >
//               Reset Filters
//             </button>
//           </div>
//         )}

//         {/* LIST */}
//         {loading && <div className="p-10 text-center">Loading...</div>}

//         {!loading && applications.length === 0 && (
//           <div className="p-10 text-center text-gray-500">
//             No applications found
//           </div>
//         )}

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 h-[70vh] custom-scrollbar">
//           {applications.map((app) => (
//             <ApplicantCard
//               key={app.id}
//               applicant={{
//                 name: `${app.employee?.user?.firstName || ""} ${app.employee?.user?.lastName || ""}`,
//                 position: app.job?.title || "—",
//                 experienceNum: app.employee?.experience || 0,
//                 education: app.job?.education || "—",
//                 applied: new Date(app.appliedAt).toLocaleDateString(),
//                 resumeUrls: app.resumeUrls || [],
//               }}
//               onClick={() => setSelectedApplicant(app)}
//             />
//           ))}
//         </div>

//         {selectedApplicant && (
//           <ProfileModal
//             applicant={selectedApplicant}
//             onClose={() => setSelectedApplicant(null)}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default JobApplications;

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  Download,
  MoreHorizontal,
  Filter,
  X,
  CheckCircle,
  XCircle,
  Search,
  RefreshCw,
  ChevronUp,
  ChevronDown,
  Bookmark,
} from "lucide-react";
import {
  getActiveJobApplications,
  getAllCategories,
  getJobsFilters,
  getUserProfilewith,
  saveQuery,
  getSavedQueries,
} from "../api/service2";
import ProfileModal from "./ProfileModal";

/* ---------------- STATUS BADGE ---------------- */
const StatusBadge = ({ status }) => {
  const map = {
    APPLIED: "bg-indigo-50 text-indigo-700",
    SHORTLISTED: "bg-green-50 text-green-700",
    REJECTED: "bg-red-50 text-red-700",
  };
  return (
    <span
      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${map[status] || "bg-gray-100 text-gray-600"}`}
    >
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </span>
  );
};

/* ---------------- AVATAR ---------------- */
const Avatar = ({ name = "" }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-semibold flex-shrink-0">
      {initials}
    </div>
  );
};

/* ---------------- ACTION MENU ---------------- */
const ActionMenu = ({ applicant, onShortlist, onReject, onSave }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpen((p) => !p);
        }}
        className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition"
      >
        <MoreHorizontal size={16} />
      </button>
      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute right-0 mt-1 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
        >
          <button
            onClick={() => {
              onSave(applicant);
              setOpen(false);
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-indigo-600 hover:bg-indigo-50 transition"
          >
            <Bookmark
              size={14}
              fill={applicant.isSaved ? "currentColor" : "none"}
            />

            {applicant.isSaved ? "Saved" : "Save"}
          </button>
          <button
            onClick={() => {
              onShortlist(applicant);
              setOpen(false);
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-green-700 hover:bg-green-50 transition"
          >
            <CheckCircle size={14} /> Shortlist
          </button>
          <button
            onClick={() => {
              onReject(applicant);
              setOpen(false);
            }}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition"
          >
            <XCircle size={14} /> Reject
          </button>
        </div>
      )}
    </div>
  );
};

/* ---------------- SORT HEADER ---------------- */
const SortTh = ({
  label,
  field,
  sortField,
  sortDir,
  onSort,
  className = "",
}) => (
  <th
    onClick={() => onSort(field)}
    className={`px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide cursor-pointer select-none whitespace-nowrap hover:text-gray-700 transition ${className}`}
  >
    <span className="inline-flex items-center gap-1 ">
      {label}
      {sortField === field ? (
        sortDir === "asc" ? (
          <ChevronUp size={12} />
        ) : (
          <ChevronDown size={12} />
        )
      ) : (
        <ChevronUp size={12} className="opacity-20" />
      )}
    </span>
  </th>
);

/* ---------------- MAIN PAGE ---------------- */
const JobApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [employers, setEmployers] = useState([]);

  const [sortField, setSortField] = useState("applied");
  const [sortDir, setSortDir] = useState("desc");

  const [filters, setFilters] = useState({
    status: "APPLIED",
    search: "",
    jobId: "",
    categoryId: "",
    employeeId: "",
    employerId: "",
    startDate: "",
    endDate: "",
  });

  /* ---------- LOAD FILTER DATA ONCE ---------- */
  useEffect(() => {
    const loadFilters = async () => {
      try {
        const [jobsRes, catRes, usersRes] = await Promise.all([
          getJobsFilters({ page: 1, limit: 100 }),
          getAllCategories(),
          getUserProfilewith({ page: 1, limit: 100 }),
        ]);
        setJobs(jobsRes?.data?.jobs || []);
        setCategories(catRes?.data?.categories || []);
        const users = usersRes?.data?.users || [];
        setEmployees(users.filter((u) => u.employee));
        setEmployers(users.filter((u) => u.employer));
      } catch (err) {
        console.error("Failed to load filters", err);
      }
    };
    loadFilters();
  }, []);

  /* ---------- DEBOUNCED FETCH ---------- */
  useEffect(() => {
    const delay = setTimeout(() => fetchApplications(), 500);
    return () => clearTimeout(delay);
  }, [
    filters.search,
    filters.status,
    filters.jobId,
    filters.categoryId,
    filters.employeeId,
    filters.employerId,
    filters.startDate,
    filters.endDate,
  ]);

  const fetchApplications = async () => {
    setLoading(true);

    try {
      const [applicationsRes, savedRes] = await Promise.all([
        getActiveJobApplications({
          page: 1,
          limit: 50,
          ...filters,
          search: filters.search?.trim() || undefined,
        }),
        getSavedQueries({
          type: "JOB_APPLICATION",
          page: 1,
          limit: 1000,
        }),
      ]);

      const applications = applicationsRes?.data?.jobApplications || [];

      const savedIds = new Set(
        (savedRes?.data?.saved || []).map((item) => item.value),
      );

      const updatedApplications = applications.map((app) => ({
        ...app,
        isSaved: savedIds.has(app.id),
      }));

      setApplications(updatedApplications);
    } catch (err) {
      console.error("Fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (app) => {
    setApplications((prev) =>
      prev.map((item) =>
        item.id === app.id ? { ...item, isSaved: !item.isSaved } : item,
      ),
    );

    try {
      const res = await saveQuery(app.id, "JOB_APPLICATION");

      if (res?.success) {
        toast.success(res?.message || "Application saved successfully.");
      }
    } catch (err) {
      fetchApplications(); // rollback

      toast.error(
        err?.response?.data?.message ||
          err?.response?.data?.msg ||
          "Unable to save application",
      );
    }
  };
  const resetFilters = () =>
    setFilters({
      status: "APPLIED",
      search: "",
      jobId: "",
      categoryId: "",
      employeeId: "",
      employerId: "",
      startDate: "",
      endDate: "",
    });

  const handleDownload = (app, e) => {
    e?.stopPropagation();
    (app.resumeUrls || []).forEach((url, idx) => {
      const link = document.createElement("a");
      link.href = url;
      link.download = `Resume_${app.employee?.user?.firstName}_${idx + 1}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };

  const handleShortlist = (app) => console.log("Shortlisted:", app);
  const handleReject = (app) => console.log("Rejected:", app);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const uniqueJobs = Array.from(
    new Map(jobs.map((j) => [j.title, j])).values(),
  );

  /* ---------- SORT ---------- */
  const sorted = [...applications].sort((a, b) => {
    const dir = sortDir === "asc" ? 1 : -1;
    const getName = (x) =>
      `${x.employee?.user?.firstName || ""} ${x.employee?.user?.lastName || ""}`.trim();

    if (sortField === "name") return getName(a).localeCompare(getName(b)) * dir;
    if (sortField === "position")
      return (a.job?.title || "").localeCompare(b.job?.title || "") * dir;
    if (sortField === "experience")
      return (
        ((a.employee?.experience || 0) - (b.employee?.experience || 0)) * dir
      );
    if (sortField === "applied")
      return (new Date(a.appliedAt) - new Date(b.appliedAt)) * dir;
    if (sortField === "status")
      return (a.status || "").localeCompare(b.status || "") * dir;
    return 0;
  });

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <div className="max-w-7xl mx-auto w-full flex flex-col flex-1 min-h-0">
        {/* HEADER */}
        <div className="bg-white border-b px-6 py-4 flex flex-wrap justify-between items-center gap-3">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Job Applications
            </h1>
            <p className="text-sm text-gray-500 mt-0.5 text-start">
              {applications.length} application
              {applications.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {/* Inline search */}
            <div className="relative">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                placeholder="Search applicant / job…"
                value={filters.search}
                onChange={(e) =>
                  setFilters({ ...filters, search: e.target.value })
                }
                className="pl-8 pr-3 py-2 border rounded-lg text-sm w-52 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
            </div>

            {/* Status quick filter */}
            <select
              value={filters.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
              className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              <option value="">All statuses</option>
              <option value="APPLIED">Applied</option>
              <option value="SHORTLISTED">Shortlisted</option>
              <option value="REJECTED">Rejected</option>
            </select>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 border rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 transition"
            >
              {showFilters ? <X size={14} /> : <Filter size={14} />}
              {showFilters ? "Hide filters" : "More filters"}
            </button>
          </div>
        </div>

        {/* FILTER PANEL */}
        {showFilters && (
          <div className="bg-white border-b px-6 py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            <select
              value={filters.jobId}
              onChange={(e) =>
                setFilters({ ...filters, jobId: e.target.value })
              }
              className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              <option value="">All Jobs</option>
              {uniqueJobs.map((j) => (
                <option key={j.id} value={j.id}>
                  {j.title}
                </option>
              ))}
            </select>

            <select
              value={filters.categoryId}
              onChange={(e) =>
                setFilters({ ...filters, categoryId: e.target.value })
              }
              className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            <select
              value={filters.employeeId}
              onChange={(e) =>
                setFilters({ ...filters, employeeId: e.target.value })
              }
              className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              <option value="">All Employees</option>
              {employees.map((e) => (
                <option key={e.employee.id} value={e.employee.id}>
                  {e.firstName} {e.lastName}
                </option>
              ))}
            </select>

            <select
              value={filters.employerId}
              onChange={(e) =>
                setFilters({ ...filters, employerId: e.target.value })
              }
              className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              <option value="">All Employers</option>
              {employers.map((e) => (
                <option key={e.employer.id} value={e.employer.id}>
                  {e.employer.companyName}
                </option>
              ))}
            </select>

            <input
              type="date"
              value={filters.startDate}
              onChange={(e) =>
                setFilters({ ...filters, startDate: e.target.value })
              }
              className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />

            <input
              type="date"
              value={filters.endDate}
              onChange={(e) =>
                setFilters({ ...filters, endDate: e.target.value })
              }
              className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />

            <button
              onClick={resetFilters}
              className="flex items-center gap-2 border rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 transition"
            >
              <RefreshCw size={14} /> Reset filters
            </button>
          </div>
        )}

        {/* TABLE */}
        <div className="p-4 pb-[8vw] flex-1 min-h-0 flex">
          <div className="bg-white border rounded-xl overflow-hidden flex flex-col flex-1 min-h-0">
            {loading ? (
              <div className="p-12 text-center text-gray-400 text-sm">
                Loading…
              </div>
            ) : sorted.length === 0 ? (
              <div className="p-12 text-center text-gray-400 text-sm">
                No applications found
              </div>
            ) : (
              <div className="overflow-auto flex-1 min-h-0">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-gray-50 text-start">
                      <SortTh
                        label="Applicant"
                        field="name"
                        sortField={sortField}
                        sortDir={sortDir}
                        onSort={handleSort}
                        className="w-52"
                      />
                      <SortTh
                        label="Position"
                        field="position"
                        sortField={sortField}
                        sortDir={sortDir}
                        onSort={handleSort}
                      />
                      <SortTh
                        label="Experience"
                        field="experience"
                        sortField={sortField}
                        sortDir={sortDir}
                        onSort={handleSort}
                      />
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                        Education
                      </th>
                      <SortTh
                        label="Applied On"
                        field="applied"
                        sortField={sortField}
                        sortDir={sortDir}
                        onSort={handleSort}
                      />
                      <SortTh
                        label="Status"
                        field="status"
                        sortField={sortField}
                        sortDir={sortDir}
                        onSort={handleSort}
                      />
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Resume
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {sorted.map((app) => {
                      const firstName = app.employee?.user?.firstName || "";
                      const lastName = app.employee?.user?.lastName || "";
                      const fullName = `${firstName} ${lastName}`.trim();

                      return (
                        <tr
                          key={app.id}
                          onClick={() => setSelectedApplicant(app)}
                          className="hover:bg-indigo-50/40 cursor-pointer transition-colors"
                        >
                          {/* Applicant */}
                          <td className="px-4 py-3 text-start">
                            <div className="flex items-center gap-2.5 text-start">
                              <Avatar name={fullName} />
                              <span className="font-medium text-gray-900 truncate max-w-[140px] text-start">
                                {fullName}
                              </span>
                            </div>
                          </td>

                          {/* Position */}
                          <td className="px-4 py-3 text-gray-700 max-w-[160px] truncate text-start">
                            {app.job?.title || "—"}
                          </td>

                          {/* Experience */}
                          <td className="px-4 py-3 text-gray-700 whitespace-nowrap text-start">
                            {app.employee?.experience ?? 0} yr
                            {app.employee?.experience !== 1 ? "s" : ""}
                          </td>

                          {/* Education */}
                          <td className="px-4 py-3 text-gray-700 max-w-[140px] truncate text-start">
                            {app.job?.education || "—"}
                          </td>

                          {/* Applied On */}
                          <td className="px-4 py-3 text-gray-600 whitespace-nowrap text-start">
                            {new Date(app.appliedAt).toLocaleDateString(
                              "en-IN",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              },
                            )}
                          </td>

                          {/* Status */}
                          <td className="px-4 py-3 text-start">
                            <StatusBadge status={app.status} />
                          </td>

                          {/* Resume */}
                          <td className="px-4 py-3  ">
                            <button
                              onClick={(e) => handleDownload(app, e)}
                              disabled={!app.resumeUrls?.length}
                              title="Download resume"
                              className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-gray-200 text-indigo-600 hover:bg-indigo-50 disabled:opacity-30 disabled:cursor-not-allowed transition "
                            >
                              <Download size={14} />
                            </button>
                          </td>

                          {/* Actions */}
                          <td
                            className="px-4 py-3  "
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ActionMenu
                              applicant={app}
                              onShortlist={handleShortlist}
                              onReject={handleReject}
                              onSave={handleSave}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* PROFILE MODAL */}
      {selectedApplicant && (
        <ProfileModal
          applicant={selectedApplicant}
          onClose={() => setSelectedApplicant(null)}
        />
      )}
    </div>
  );
};

export default JobApplications;
