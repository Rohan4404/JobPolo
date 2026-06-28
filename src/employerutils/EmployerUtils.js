import { RiStackLine } from "react-icons/ri";
import { BsPersonCircle } from "react-icons/bs";
import { IoAddCircleOutline } from "react-icons/io5";
import {
  PiNotebookThin,
  PiUserListLight,
  PiGearSixLight,
  PiBookmarkSimpleThin,
  PiBriefcase,
} from "react-icons/pi";

// Store icon **as a component**, not JSX
export const menuItems = [
  // { name: "Overview", icon: RiStackLine },
  { name: "Employers Profile", icon: BsPersonCircle },
  { name: "Post a Job", icon: IoAddCircleOutline },
  { name: "My Jobs", icon: PiBriefcase },
  { name: "Job Applications", icon: PiUserListLight },
  { name: "Saved Candidate", icon: PiBookmarkSimpleThin },
  { name: "Plans & Billing", icon: PiNotebookThin },
  // { name: "Settings", icon: PiGearSixLight },
];

export const jobs = [
  {
    id: 1,
    title: "UI/UX Designer",
    type: "Full Time",
    days: 27,
    status: "Active",
    applications: 798,
  },
  {
    id: 2,
    title: "Senior UX Designer",
    type: "Internship",
    days: 8,
    status: "Active",
    applications: 185,
  },
  {
    id: 3,
    title: "Technical Support Specialist",
    type: "Part Time",
    days: 4,
    status: "Active",
    applications: 556,
  },
  {
    id: 4,
    title: "Junior Graphic Designer",
    type: "Full Time",
    days: 24,
    status: "Active",
    applications: 583,
  },
  {
    id: 5,
    title: "Front End Developer",
    type: "Full Time",
    days: 0,
    status: "Expire",
    applications: 740,
  },
  {
    id: 6,
    title: "Junior Graphic Designer",
    type: "Full Time",
    days: 24,
    status: "Active",
    applications: 583,
  },
  {
    id: 7,
    title: "Front End Developer",
    type: "Full Time",
    days: 0,
    status: "Expire",
    applications: 740,
  },
];

const jobTitles = [
  "UI/UX Designer",
  "Senior UX Designer",
  "Junior Graphic Designer",
  "Front End Developer",
  "Technical Support Specialist",
  "Interaction Designer",
  "Software Engineer",
  "Product Designer",
  "Project Manager",
  "Marketing Manager",
  "Backend Developer",
  "DevOps Engineer",
  "Data Analyst",
  "Content Writer",
  "HR Manager",
  "Sales Executive",
  "Business Analyst",
  "QA Engineer",
];
const jobTypes = [
  "Full Time",
  "Part Time",
  "Contract Base",
  "Internship",
  "Temporary",
];

export const generateJobs = (count) => {
  const jobs = [];
  for (let i = 0; i < count; i++) {
    const isActive = Math.random() > 0.3;
    const daysRemaining = isActive ? Math.floor(Math.random() * 30) + 1 : null;
    const expireDate = !isActive
      ? `Dec ${Math.floor(Math.random() * 28) + 1}, 2019`
      : null;

    jobs.push({
      id: i + 1,
      title: jobTitles[i % jobTitles.length],
      type: jobTypes[Math.floor(Math.random() * jobTypes.length)],
      status: isActive ? "Active" : "Expire",
      daysRemaining,
      expireDate,
      applications: Math.floor(Math.random() * 900) + 100,
    });
  }
  return jobs;
};
