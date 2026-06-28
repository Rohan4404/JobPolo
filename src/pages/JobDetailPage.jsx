// import React from "react";
// import { useLocation } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import JobsHeroSection from "../components/JobsHeroSection";
// import JobDescription from "../components/JobDescription";
// import JobResponsibilities from "../components/JobResponsibilities";
// import JobSkills from "../components/JobSkills";
// import JobTags from "../components/JobTags";
// import JobShare from "../components/JobShare";
// import RelatedJobs from "../components/RelatedJobs";
// import JobSidebar from "../components/JobSidebar";
// import JobHeader from "../components/JobHeader";


// const JobDetailPage = () => {
//   const location = useLocation();
//   const { job } = location.state || {};

//   if (!job) {
//     return <div className="text-left">Job data not found. Please select a job from the list.</div>;
//   }

//   return (
//     <div className="min-h-screen bg-[var(--background)] text-[var(--text)]">
//       <Navbar />
//       <JobsHeroSection
//         title="Job Details"
//         subtitle={`Explore detailed and comprehensive information about the ${job.title} opportunity at ${job.company}.`}
//       />
//       <div className="max-w-screen-2xl mx-auto px-2 sm:px-4 lg:px-6 py-6">
//          <JobHeader job={job} />
//         <div className="flex flex-col lg:flex-row lg:items-start lg:gap-6">
          
//           <main className="w-full lg:flex-1 min-w-0">
           
//             <JobDescription job={job} />
//             <JobResponsibilities job={job} />
//             <JobSkills job={job} />
//             <JobTags job={job} />
//             <JobShare job={job} />
//             <RelatedJobs job={job} />
//           </main>
//           <JobSidebar job={job} />
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default JobDetailPage;

import React from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import JobsHeroSection from "../components/JobsHeroSection";
import JobDescription from "../components/JobDescription";
import JobResponsibilities from "../components/JobResponsibilities";
import JobSkills from "../components/JobSkills";
import JobTags from "../components/JobTags";
import JobShare from "../components/JobShare";
import RelatedJobs from "../components/RelatedJobs";
import JobSidebar from "../components/JobSidebar";
import JobHeader from "../components/JobHeader";

const JobDetailPage = () => {
  const location = useLocation();
  const { job } = location.state || {};
  console.log("JOB DATA =", job);
  // 🛑 SAFE JOB NORMALIZATION LAYER
// const safeJob = {
//   ...job,

//   // BASIC STRINGS
//   title: job?.title || "",
//   description: job?.description || "",

//   // COMPANY STRING + LOGO FIX
//   company:
//     typeof job?.company === "string"
//       ? job.company
//       : job?.company?.name || "Company",

//   logo:
//     job?.company?.logo ||
//     job?.companyLogo ||
//     job?.logo ||
//     "/default-logo.png",

//   // CATEGORY FIX
//   category:
//     typeof job?.category === "string"
//       ? job.category
//       : job?.category?.name || "General",

//   // INDUSTRY FIX
//   industry:
//     typeof job?.industry === "string"
//       ? job.industry
//       : job?.industry?.name || "Not specified",

//   // TYPE FIX
//   type: job?.employmentType || job?.type || "Not specified",

//   // RESPONSIBILITIES FIX
//   responsibilities: Array.isArray(job?.responsibilities)
//     ? job.responsibilities
//     : typeof job?.responsibilities === "string"
//     ? job.responsibilities.split(",")
//     : [],

//   // SKILLS FIX
//   skills: Array.isArray(job?.skills)
//     ? job.skills
//     : typeof job?.skills === "string"
//     ? job.skills.split(",")
//     : [],

//   // TAGS FIX
//   tags: Array.isArray(job?.tags)
//     ? job.tags
//     : typeof job?.tags === "string"
//     ? job.tags.split(",")
//     : [],

//   // LOCATION FIX
//   location:
//     job?.jobPostAddresses?.[0]
//       ? `${job.jobPostAddresses[0].city || ""}, ${job.jobPostAddresses[0].state || ""}, ${job.jobPostAddresses[0].country || ""}`
//       : job?.location || "Not specified",

//   // SALARY FIX
//   salary: job?.salaryRange || "Not disclosed",
// };

const safeJob = {
  ...job,

  // COMPANY
  company: job?.companyName || "Unknown Company",

  // CATEGORY (industry object)
  categoryName: job?.category?.name || job?.industry?.name || "Not specified",

  // LOGO
  logo: job?.logoUrl || job?.logoPreviewUrl || "/images/CompneyIcon.png",

  // LOCATION
  location:
    job?.jobPostAddresses?.length > 0
      ? job.jobPostAddresses[0].city || "Not specified"
      : "Not specified",

  // RESPONSIBILITIES → always array
  responsibilities:
    typeof job?.responsibilities === "string"
      ? job.responsibilities.split(",")
      : Array.isArray(job?.responsibilities)
      ? job.responsibilities
      : [],

  // SKILLS → from API field skillsRequired
  skills:
    Array.isArray(job?.skillsRequired)
      ? job.skillsRequired
      : typeof job?.skillsRequired === "string"
      ? job.skillsRequired.split(",")
      : [],

  // JOB TYPE
  jobType: job?.employmentType || job?.type || "Not specified",

  // SALARY
  salary:
    job?.minSalary && job?.maxSalary
      ? `₹${job.minSalary} - ₹${job.maxSalary} (${job.salaryType || "YEARLY"})`
      : "Not disclosed",
};



  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  if (!job) {
    return <div className="text-left">Job data not found. Please select a job from the list.</div>;
  }

  return (
    <div
      className="w-full min-h-screen custom-scrollbar flex flex-col "
      style={{ maxHeight: "100vh", overflowY: "auto" }}
    >
      {/* Header Section - same as AboutUs */}
      <section className="w-full">
        <Navbar />
        <JobsHeroSection
          title="Job Details"
          subtitle={`Explore detailed and comprehensive information about the ${job.title} opportunity at ${job.company}.`}
          py="py-12"
          px="px-6"
          className="mt-20"
        />
      </section>
      <motion.div 
        variants={item}
        initial="hidden"
        animate="show"
        className="w-full px-2 sm:px-4 lg:px-6 py-6"
      >
         <JobHeader job={safeJob}  />
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-6">
          
          <main className="w-full lg:flex-1 min-w-0">
           
            <JobDescription job={safeJob} />
            <JobResponsibilities job={safeJob} />
            <JobSkills job={safeJob} />
            <JobTags job={safeJob} />
            <JobShare job={safeJob} />
            <RelatedJobs job={safeJob} />
          </main>
          <JobSidebar job={safeJob} />
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default JobDetailPage;