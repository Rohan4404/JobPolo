import { FaSeedling, FaShoppingBag, FaBus } from "react-icons/fa";
import {
  MdOutlineFactory,
  MdConstruction,
  MdOutlineSchool,
} from "react-icons/md";
import { TbBuildingSkyscraper } from "react-icons/tb";
import { RiHotelLine } from "react-icons/ri";
// import { LuSquareUserRound } from "react-icons/lu";
// import { FiFileText } from "react-icons/fi";
// import { BriefcaseBusiness } from "react-icons/hi2"; // or wherever this is from
// import { FaRegCircleCheck } from "react-icons/fa";
import { LuSquareUserRound } from "react-icons/lu";
import { FiFileText } from "react-icons/fi";
import { BriefcaseBusiness } from "lucide-react";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FaInstagram, FaApple } from "react-icons/fa";
import { SiTesla } from "react-icons/si";
import { GiFrenchFries } from "react-icons/gi";
import {
  FaLaptopCode,
  FaBullhorn,
  FaHandshake,
  FaThLarge,
} from "react-icons/fa";
export const menuItems = [
  // {
  //   id: 1,
  //   name: "Home",
  //   href: "/",
  // },
  // {
  //   id: 2,
  //   name: "Jobs",
  //   href: "/jobs",
  // },
  // {
  //   id: 3,
  //   name: "About Us",
  //   href: "/about-us",
  // },
  // {
  //   id: 4,
  //   name: "Contact Us",
  //   href: "/contact-us",
  // },

  { id: 1, name: "Apply for Job", href: "/jobs" },
  { id: 2, name: "Post a Job", href: "/login" },
];

export const logos = [
  { name: "Cheil Worlwide ", src: "/logo/CheilWorlwide.png" },
  { name: "Crayons Advertising Ltd.", src: "/logo/CrayonsAdvertisingLtd.png" },
  { name: "Dentsu Maracom", src: "/logo/DentsuMaracom.png" },
  { name: "Hakuhodo", src: "/logo/Hakuhodo.png" },
  { name: "Havas Media", src: "/logo/HavasMedia.png" },
  { name: "Mccann worldwide", src: "/logo/McCann.png" },
  { name: "Ogily & Mather", src: "/logo/oligy.png" },
  {
    name: "Vermillion Communication",
    src: "/logo/VermillionCommunication.png",
  },
];

// src/utils/jobsData.js
// export const jobsData = [
//   {
//     id: 1,
//     time: "10 min ago",
//     title: "Forward Security Director",
//     company: "Bauch, Schuppe and Schulist Co",
//     category: "Hotels & Tourism",
//     type: "Full time",
//     salary: "$40000-$42000",
//     location: "New-York, USA",
//     logo: "public/images/CompneyIcon.png", // ✅ custom logo
//   },
//   {
//     id: 2,
//     time: "12 min ago",
//     title: "Regional Creative Facilitator",
//     company: "Wisozk - Becker Co",
//     category: "Media",
//     type: "Part time",
//     salary: "$28000-$32000",
//     location: "Los Angeles, USA",
//     logo: "public/images/CompneyIcon.png",
//   },
//   {
//     id: 3,
//     time: "15 min ago",
//     title: "Internal Integration Planner",
//     company: "Mraz, Quigley and Feest Inc.",
//     category: "Construction",
//     type: "Full time",
//     salary: "$48000-$50000",
//     location: "Texas, USA",
//     logo: "public/images/CompneyIcon.png",
//   },
//   {
//     id: 4,
//     time: "24 min ago",
//     title: "District Intranet Director",
//     company: "VonRueden - Weber Co",
//     category: "Commerce",
//     type: "Full time",
//     salary: "$42000-$48000",
//     location: "Florida, USA",
//     logo: "public/images/CompneyIcon.png",
//   },
//   {
//     id: 5,
//     time: "26 min ago",
//     title: "Corporate Tactics Facilitator",
//     company: "Cormier, Turner and Flatley Inc",
//     category: "Commerce",
//     type: "Full time",
//     salary: "$38000-$40000",
//     location: "Boston, USA",
//     logo: "public/images/CompneyIcon.png",
//   },
//   {
//     id: 6,
//     time: "26 min ago",
//     title: "Corporate Tactics Facilitator",
//     company: "Cormier, Turner and Flatley Inc",
//     category: "Commerce",
//     type: "Full time",
//     salary: "$38000-$40000",
//     location: "Boston, USA",
//     logo: "public/images/CompneyIcon.png",
//   },
//   {
//     id: 7,
//     time: "26 min ago",
//     title: "Corporate Tactics Facilitator",
//     company: "Cormier, Turner and Flatley Inc",
//     category: "Commerce",
//     type: "Full time",
//     salary: "$38000-$40000",
//     location: "Boston, USA",
//     logo: "public/images/CompneyIcon.png",
//   },
//   {
//     id: 8,
//     time: "26 min ago",
//     title: "Corporate Tactics Facilitator",
//     company: "Cormier, Turner and Flatley Inc",
//     category: "Commerce",
//     type: "Full time",
//     salary: "$38000-$40000",
//     location: "Boston, USA",
//     logo: "public/images/CompneyIcon.png",
//   },
//   {
//     id: 9,
//     time: "26 min ago",
//     title: "Corporate Tactics Facilitator",
//     company: "Cormier, Turner and Flatley Inc",
//     category: "Commerce",
//     type: "Full time",
//     salary: "$38000-$40000",
//     location: "Boston, USA",
//     logo: "public/images/CompneyIcon.png",
//   },
//   {
//     id: 10,
//     time: "26 min ago",
//     title: "Corporate Tactics Facilitator",
//     company: "Cormier, Turner and Flatley Inc",
//     category: "Commerce",
//     type: "Full time",
//     salary: "$38000-$40000",
//     location: "Boston, USA",
//     logo: "public/images/CompneyIcon.png",
//   },
// ];

// export const jobsData = [
//   // Hotels & Tourism
//   {
//     id: 1,
//     time: "10 min ago",
//     title: "Forward Security Director",
//     company: "Bauch, Schuppe and Schulist Co",
//     category: "Hotels & Tourism",
//     type: "Full time",
//     salary: "$40000-$42000",
//     location: "New-York, USA",
//     logo: "/images/CompneyIcon.png",
//     experience: "5 Years",
//     degree: "Master",
//     description:
//       "As the Forward Security Director, you will take on the critical responsibility of leading and overseeing all security operations for a prestigious and expansive hotel chain renowned for its luxury accommodations and exceptional guest services. Your primary role will involve crafting and implementing comprehensive security strategies designed to safeguard both the physical premises and the well-being of guests and staff, while ensuring full compliance with local, state, and federal safety regulations. This position demands exceptional leadership abilities, an in-depth understanding of risk management principles, and the capability to train and motivate a diverse security team to maintain the highest standards of safety and emergency preparedness across multiple hotel locations.",
//     responsibilities: [
//       "Develop and meticulously implement a wide range of sophisticated security strategies tailored to the unique needs of various hotel operations, ensuring comprehensive protection against potential threats.",
//       "Conduct thorough audits and ensure unwavering compliance with an extensive array of local, state, and federal safety regulations to uphold the hotel chain's reputation for excellence and safety.",
//       "Design and deliver extensive training programs for security personnel, equipping them with advanced skills and knowledge to handle emergencies, de-escalate conflicts, and maintain a secure environment effectively.",
//     ],
//     skills: [
//       "Advanced Risk Management and Threat Assessment",
//       "Exceptional Leadership and Team Motivation",
//       "In-Depth Knowledge of Safety Compliance and Emergency Protocols",
//     ],
//   },
//   {
//     id: 16,
//     time: "12 min ago",
//     title: "Hotel Operations Manager",
//     company: "Luxury Stays Inc.",
//     category: "Hotels & Tourism",
//     type: "Full time",
//     salary: "$45000-$47000",
//     location: "Los Angeles, USA",
//     logo: "/images/CompneyIcon.png",
//     experience: "6 Years",
//     degree: "Master",
//     description:
//       "The Hotel Operations Manager will oversee daily operations of a luxury hotel, ensuring exceptional guest experiences and efficient staff management. This role involves coordinating with various departments, optimizing resource allocation, and implementing guest satisfaction initiatives to maintain the hotel's high standards.",
//     responsibilities: [
//       "Oversee daily hotel operations, ensuring seamless coordination across all departments.",
//       "Optimize resource allocation and staff schedules to enhance operational efficiency.",
//       "Implement guest satisfaction initiatives to improve service quality and guest retention.",
//     ],
//     skills: ["Operational Management", "Staff Coordination", "Guest Relations"],
//   },

//   // Media
//   {
//     id: 2,
//     time: "12 min ago",
//     title: "Regional Creative Facilitator",
//     company: "Wisozk - Becker Co",
//     category: "Media",
//     type: "Part time",
//     salary: "$28000-$32000",
//     location: "Los Angeles, USA",
//     logo: "/images/CompneyIcon.png",
//     experience: "3 Years",
//     degree: "Bachelor",
//     description:
//       "The Regional Creative Facilitator position at Wisozk - Becker Co offers an exciting opportunity to lead and coordinate a diverse portfolio of creative projects spanning multiple regions, working closely with talented media production teams to bring innovative ideas to life. This role requires a deep expertise in design principles, content creation techniques, and project management, as you will be responsible for overseeing the development, execution, and timely delivery of high-quality multimedia content that aligns with the company’s strategic vision and client expectations across various markets.",
//     responsibilities: [
//       "Coordinate and manage an extensive array of regional creative projects, ensuring seamless collaboration with media production teams to meet ambitious creative and business objectives.",
//       "Foster strong partnerships with cross-functional teams, providing expert guidance and support to ensure the successful execution of complex multimedia content production processes.",
//       "Oversee the complete lifecycle of content creation projects, from initial concept development to final delivery, while adhering to strict timelines and maintaining the highest standards of quality.",
//     ],
//     skills: [
//       "Expertise in Advanced Design Principles and Visual Storytelling",
//       "Proficient Content Creation and Multimedia Production",
//       "Strategic Project Coordination and Deadline Management",
//     ],
//   },
//   {
//     id: 17,
//     time: "15 min ago",
//     title: "Media Content Producer",
//     company: "Creative Minds Studio",
//     category: "Media",
//     type: "Full time",
//     salary: "$35000-$40000",
//     location: "Chicago, USA",
//     logo: "/images/CompneyIcon.png",
//     experience: "4 Years",
//     degree: "Bachelor",
//     description:
//       "The Media Content Producer will create and manage high-quality multimedia content for various platforms, collaborating with creative teams to deliver engaging stories and visuals that align with brand goals.",
//     responsibilities: [
//       "Create and manage multimedia content for digital and broadcast platforms.",
//       "Collaborate with creative teams to develop engaging stories and visuals.",
//       "Ensure content meets brand standards and delivery deadlines.",
//     ],
//     skills: ["Content Creation", "Video Editing", "Brand Alignment"],
//   },

//   // Construction
//   {
//     id: 3,
//     time: "15 min ago",
//     title: "Internal Integration Planner",
//     company: "Mraz, Quigley and Feest Inc.",
//     category: "Construction",
//     type: "Full time",
//     salary: "$48000-$50000",
//     location: "Texas, USA",
//     logo: "/images/CompneyIcon.png",
//     experience: "6 Years",
//     degree: "Bachelor",
//     description:
//       "As an Internal Integration Planner at Mraz, Quigley and Feest Inc., you will play a pivotal role in planning and overseeing a wide range of internal integration projects within the construction sector, ensuring that all operational aspects are seamlessly aligned for successful project delivery. This position involves coordinating with multiple teams, managing complex schedules, and implementing innovative solutions to integrate new systems or processes, all while maintaining strict adherence to industry standards and client specifications across large-scale construction sites.",
//     responsibilities: [
//       "Develop detailed and comprehensive plans for a variety of construction integration projects, ensuring all operational components are meticulously organized and executed with precision.",
//       "Facilitate effective coordination with diverse construction teams and external stakeholders, fostering collaboration to achieve seamless integration of new systems and processes.",
//       "Monitor and manage project delivery timelines with rigorous attention to detail, ensuring that all milestones are met and that the final outcomes align with the highest industry standards.",
//     ],
//     skills: [
//       "Expert Project Planning and Organizational Skills",
//       "Advanced Team Coordination and Stakeholder Engagement",
//       "In-Depth Construction Management and Systems Integration",
//     ],
//   },
//   {
//     id: 18,
//     time: "18 min ago",
//     title: "Construction Site Supervisor",
//     company: "BuildPro Solutions",
//     category: "Construction",
//     type: "Full time",
//     salary: "$50000-$55000",
//     location: "Houston, USA",
//     logo: "/images/CompneyIcon.png",
//     experience: "5 Years",
//     degree: "Bachelor",
//     description:
//       "The Construction Site Supervisor will manage on-site construction activities, ensuring safety, quality, and timely completion of projects while coordinating with workers and contractors.",
//     responsibilities: [
//       "Manage on-site construction activities and ensure safety compliance.",
//       "Coordinate with workers and contractors to meet project deadlines.",
//       "Oversee quality control and report progress to management.",
//     ],
//     skills: ["Site Management", "Safety Compliance", "Team Leadership"],
//   },

//   // Commerce
//   {
//     id: 4,
//     time: "24 min ago",
//     title: "District Intranet Director",
//     company: "VonRueden - Weber Co",
//     category: "Commerce",
//     type: "Full time",
//     salary: "$42000-$48000",
//     location: "Florida, USA",
//     logo: "/images/CompneyIcon.png",
//     experience: "4 Years",
//     degree: "Master",
//     description:
//       "The District Intranet Director role at VonRueden - Weber Co entails leading the strategic management and operation of intranet systems across an expansive commerce district, ensuring robust digital infrastructure and efficient team coordination. This position requires a blend of advanced IT expertise and managerial acumen to oversee network performance, implement cutting-edge technological solutions, and support the district's business operations with a reliable and secure online platform that enhances communication and productivity.",
//     responsibilities: [
//       "Lead the strategic management and continuous operation of intranet systems across the district, ensuring optimal performance and reliability for all users.",
//       "Coordinate and direct a skilled team of IT professionals to implement and maintain cutting-edge technological solutions that enhance network capabilities.",
//       "Ensure the intranet platform remains secure and efficient, supporting seamless communication and productivity across all business operations within the district.",
//     ],
//     skills: [
//       "Advanced IT Management and Network Administration",
//       "Strategic Team Leadership and Project Oversight",
//       "Expertise in Cybersecurity and Digital Infrastructure",
//     ],
//   },
//   {
//     id: 5,
//     time: "26 min ago",
//     title: "Corporate Tactics Facilitator",
//     company: "Cormier, Turner and Flatley Inc",
//     category: "Commerce",
//     type: "Full time",
//     salary: "$38000-$40000",
//     location: "Boston, USA",
//     logo: "/images/CompneyIcon.png",
//     experience: "3 Years",
//     degree: "Bachelor",
//     description:
//       "As a Corporate Tactics Facilitator at Cormier, Turner and Flatley Inc., you will be entrusted with the vital task of facilitating and refining corporate strategies to significantly enhance business tactics and drive organizational growth. This role involves working closely with top-tier executives to identify opportunities for improvement, develop long-term strategic plans, and implement initiatives that boost operational efficiency and profitability across various departments within the company.",
//     responsibilities: [
//       "Facilitate comprehensive strategy sessions with senior executives, identifying key areas for tactical improvement and long-term business development.",
//       "Collaborate closely with cross-departmental teams to develop and refine strategic plans that align with the company’s overarching goals and vision.",
//       "Implement a series of innovative initiatives designed to enhance operational efficiency, reduce costs, and maximize profitability throughout the organization.",
//     ],
//     skills: [
//       "Strategic Planning and Business Development",
//       "Advanced Executive Collaboration and Communication",
//       "Innovative Process Optimization and Profit Maximization",
//     ],
//   },
//   {
//     id: 19,
//     time: "28 min ago",
//     title: "E-Commerce Manager",
//     company: "TradeMasters Ltd.",
//     category: "Commerce",
//     type: "Full time",
//     salary: "$40000-$45000",
//     location: "Miami, USA",
//     logo: "/images/CompneyIcon.png",
//     experience: "4 Years",
//     degree: "Bachelor",
//     description:
//       "The E-Commerce Manager will oversee online sales platforms, optimize digital marketing strategies, and enhance customer experience to drive revenue growth for the company.",
//     responsibilities: [
//       "Oversee online sales platforms and ensure optimal performance.",
//       "Optimize digital marketing strategies to boost online traffic.",
//       "Enhance customer experience to increase sales and retention.",
//     ],
//     skills: [
//       "E-Commerce Management",
//       "Digital Marketing",
//       "Customer Experience",
//     ],
//   },

//   // IT & Software
//   {
//     id: 6,
//     time: "30 min ago",
//     title: "Frontend Developer",
//     company: "Tech Solutions",
//     category: "IT & Software",
//     type: "Full time",
//     salary: "$60000-$75000",
//     location: "San Francisco, USA",
//     logo: "/images/CompneyIcon.png",
//     experience: "4 Years",
//     degree: "Bachelor",
//     description:
//       "The Frontend Developer position at Tech Solutions offers an opportunity to design, develop, and maintain highly interactive and user-facing web applications that deliver exceptional digital experiences. You will collaborate extensively with talented designers and backend development teams, leveraging modern JavaScript frameworks and cutting-edge technologies to create responsive, accessible, and visually appealing interfaces that meet the evolving needs of a diverse user base.",
//     responsibilities: [
//       "Design, develop, and rigorously maintain a wide range of interactive user-facing web applications, ensuring a seamless and engaging digital experience.",
//       "Collaborate closely with design and backend development teams to integrate sophisticated features and functionalities into the web platform.",
//       "Continuously uphold and enhance code quality standards, conducting thorough testing and optimization to ensure optimal performance and accessibility.",
//     ],
//     skills: [
//       "Advanced JavaScript Programming and Framework Utilization",
//       "Expert Collaboration with Design and Development Teams",
//       "Proficiency in CSS, HTML, and Responsive Web Design",
//     ],
//   },
//   {
//     id: 9,
//     time: "38 min ago",
//     title: "Data Scientist",
//     company: "AI Innovations",
//     category: "IT & Software",
//     type: "Full time",
//     salary: "$80000-$95000",
//     location: "Seattle, USA",
//     logo: "/images/CompneyIcon.png",
//     experience: "5 Years",
//     degree: "Master",
//     description:
//       "As a Data Scientist at AI Innovations, you will be at the forefront of analyzing vast and complex datasets to develop innovative AI-driven solutions that transform business operations. This role involves collaborating closely with a team of skilled engineers to design, implement, and refine data-driven strategies that enhance decision-making processes, optimize performance, and deliver measurable value to clients across multiple industries.",
//     responsibilities: [
//       "Analyze vast and intricate datasets using advanced statistical methods to uncover actionable insights for AI-driven solutions.",
//       "Collaborate extensively with engineering teams to design and implement sophisticated data models that enhance business decision-making.",
//       "Refine and optimize data-driven strategies through continuous testing and iteration, ensuring they deliver maximum value and performance improvements.",
//     ],
//     skills: [
//       "Advanced Python Programming and Statistical Analysis",
//       "Expertise in Machine Learning and AI Model Development",
//       "Proficiency in Data Visualization and Strategic Implementation",
//     ],
//   },
//   {
//     id: 20,
//     time: "40 min ago",
//     title: "Backend Developer",
//     company: "CodeCraft Inc.",
//     category: "IT & Software",
//     type: "Full time",
//     salary: "$65000-$80000",
//     location: "Austin, USA",
//     logo: "/images/CompneyIcon.png",
//     experience: "5 Years",
//     degree: "Bachelor",
//     description:
//       "The Backend Developer will design and maintain server-side applications, ensuring robust performance and security while collaborating with frontend teams to deliver integrated solutions.",
//     responsibilities: [
//       "Design and maintain server-side applications with high performance.",
//       "Ensure robust security measures for all backend systems.",
//       "Collaborate with frontend teams for integrated solution delivery.",
//     ],
//     skills: ["Backend Development", "Server Management", "Security Protocols"],
//   },

//   // Media (additional job)
//   {
//     id: 7,
//     time: "32 min ago",
//     title: "UX Designer",
//     company: "DesignHub",
//     category: "Media",
//     type: "Freelance",
//     salary: "$25000-$30000",
//     location: "Chicago, USA",
//     logo: "/images/CompneyIcon.png",
//     experience: "2 Years",
//     degree: "Bachelor",
//     description:
//       "As a UX Designer at DesignHub, you will be responsible for crafting highly user-friendly interfaces and conducting extensive usability testing to enhance the overall user experience of media products. Working remotely, you will play a key role in designing intuitive layouts, conducting in-depth user research, and implementing feedback to create engaging and accessible digital experiences that resonate with a global audience and meet the creative standards of the media industry.",
//     responsibilities: [
//       "Craft and refine highly intuitive user interfaces, focusing on layout design and navigation to enhance the overall usability of media products.",
//       "Conduct comprehensive usability testing sessions, gathering detailed user feedback to identify areas for improvement and optimization.",
//       "Implement iterative design improvements based on extensive user research and stakeholder input, ensuring the final product meets industry-leading standards.",
//     ],
//     skills: [
//       "Expert UI/UX Design and User-Centered Design Principles",
//       "Advanced Usability Testing and User Research Methodologies",
//       "Proficiency in Prototyping and Iterative Design Processes",
//     ],
//   },

//   // Commerce (additional job)
//   {
//     id: 8,
//     time: "35 min ago",
//     title: "Marketing Specialist",
//     company: "Bright Ideas Co",
//     category: "Commerce",
//     type: "Part time",
//     salary: "$20000-$25000",
//     location: "Toronto, Canada",
//     logo: "/images/CompneyIcon.png",
//     experience: "2 Years",
//     degree: "Bachelor",
//     description:
//       "The Marketing Specialist role at Bright Ideas Co involves developing and executing comprehensive marketing campaigns that effectively promote brand awareness and drive customer engagement. You will be tasked with analyzing intricate market trends, conducting thorough competitor research, and supporting a wide range of brand growth initiatives to strengthen the company’s market position and foster long-term customer loyalty in a highly competitive commercial landscape.",
//     responsibilities: [
//       "Develop and execute comprehensive marketing campaign strategies, targeting diverse audiences to maximize brand visibility and engagement.",
//       "Conduct thorough market trend analysis and competitor research to identify strategic opportunities for enhancing marketing efforts.",
//       "Support a broad spectrum of brand growth initiatives, collaborating with teams to implement innovative tactics that boost customer loyalty and market share.",
//     ],
//     skills: [
//       "Strategic Marketing Campaign Development and Execution",
//       "In-Depth Market Trend Analysis and Competitor Research",
//       "Expertise in Branding and Customer Engagement Strategies",
//     ],
//   },

//   // Healthcare
//   {
//     id: 10,
//     time: "40 min ago",
//     title: "Nurse Practitioner",
//     company: "HealthCare Plus",
//     category: "Healthcare",
//     type: "Full time",
//     salary: "$55000-$65000",
//     location: "London, UK",
//     logo: "/images/CompneyIcon.png",
//     experience: "6 Years",
//     degree: "Master",
//     description:
//       "The Nurse Practitioner position at HealthCare Plus is a rewarding opportunity to provide advanced nursing care and expert patient management within a dynamic clinical setting. You will focus on delivering high-quality primary care services, conducting detailed health assessments, and developing personalized treatment plans to address the diverse healthcare needs of patients, while collaborating with multidisciplinary teams to ensure holistic and compassionate care.",
//     responsibilities: [
//       "Deliver advanced nursing care services, conducting thorough health assessments to diagnose and treat a wide range of patient conditions.",
//       "Manage comprehensive patient health records with precision, ensuring accurate documentation and seamless coordination with healthcare teams.",
//       "Develop and implement personalized treatment plans, focusing on primary care services to address the unique needs of each patient effectively.",
//     ],
//     skills: [
//       "Advanced Patient Care and Medical Diagnosis Techniques",
//       "Expert Health Record Management and Documentation",
//       "Proficiency in Primary Care Delivery and Team Collaboration",
//     ],
//   },
//   {
//     id: 21,
//     time: "42 min ago",
//     title: "Medical Assistant",
//     company: "HealthFirst Clinic",
//     category: "Healthcare",
//     type: "Full time",
//     salary: "$30000-$35000",
//     location: "Manchester, UK",
//     logo: "/images/CompneyIcon.png",
//     experience: "3 Years",
//     degree: "Associate",
//     description:
//       "The Medical Assistant will support healthcare professionals by performing clinical and administrative tasks, ensuring smooth patient flow and accurate record-keeping in a busy clinic environment.",
//     responsibilities: [
//       "Support healthcare professionals with clinical and administrative tasks.",
//       "Ensure smooth patient flow and timely service delivery.",
//       "Maintain accurate patient records and assist with scheduling.",
//     ],
//     skills: [
//       "Clinical Support",
//       "Administrative Skills",
//       "Patient Coordination",
//     ],
//   },

//   // Construction (additional job)
//   {
//     id: 11,
//     time: "45 min ago",
//     title: "Project Manager",
//     company: "Global Constructions",
//     category: "Construction",
//     type: "Contract",
//     salary: "$70000-$85000",
//     location: "Dubai, UAE",
//     logo: "/images/CompneyIcon.png",
//     experience: "7 Years",
//     degree: "Bachelor",
//     description:
//       "As a Project Manager at Global Constructions, you will oversee the entire lifecycle of large-scale construction projects, from meticulous planning and resource allocation to flawless execution and final delivery. This role requires coordinating with a wide array of stakeholders, managing substantial budgets, and ensuring all projects are completed on time while adhering to the highest quality standards and safety regulations in the competitive construction industry.",
//     responsibilities: [
//       "Oversee the meticulous planning and resource allocation for large-scale construction projects, ensuring all aspects are thoroughly prepared.",
//       "Coordinate effectively with a diverse group of stakeholders, including contractors and suppliers, to ensure smooth project execution and timely delivery.",
//       "Manage substantial project budgets and timelines with precision, ensuring compliance with quality standards and rigorous safety regulations throughout.",
//     ],
//     skills: [
//       "Expert Project Management and Resource Allocation",
//       "Advanced Stakeholder Coordination and Communication",
//       "Proficiency in Budget Management and Safety Compliance",
//     ],
//   },

//   // Education
//   {
//     id: 12,
//     time: "48 min ago",
//     title: "Teacher",
//     company: "Springfield School",
//     category: "Education",
//     type: "Part time",
//     salary: "$30000-$35000",
//     location: "Sydney, Australia",
//     logo: "/images/CompneyIcon.png",
//     experience: "3 Years",
//     degree: "Bachelor",
//     description:
//       "The Teacher role at Springfield School offers a fulfilling opportunity to educate and inspire students within a vibrant classroom setting, fostering a positive learning environment. You will be responsible for developing detailed and engaging lesson plans tailored to various subjects, conducting thorough assessments of student progress, and providing constructive feedback to support their academic and personal growth throughout the school year.",
//     responsibilities: [
//       "Educate and inspire students within a dynamic classroom setting, creating a positive and inclusive learning environment for all.",
//       "Develop detailed and engaging lesson plans across various subjects, tailored to meet the diverse needs and learning styles of students.",
//       "Conduct thorough assessments of student progress, providing constructive feedback and support to enhance their academic and personal development.",
//     ],
//     skills: [
//       "Innovative Teaching Methods and Classroom Management",
//       "Curriculum Development and Lesson Planning Expertise",
//       "Advanced Student Assessment and Feedback Techniques",
//     ],
//   },
//   {
//     id: 22,
//     time: "50 min ago",
//     title: "Education Coordinator",
//     company: "Learning Horizons Academy",
//     category: "Education",
//     type: "Full time",
//     salary: "$40000-$45000",
//     location: "Melbourne, Australia",
//     logo: "/images/CompneyIcon.png",
//     experience: "4 Years",
//     degree: "Bachelor",
//     description:
//       "The Education Coordinator will plan and implement educational programs, support teachers, and ensure curriculum alignment with educational standards across the institution.",
//     responsibilities: [
//       "Plan and implement educational programs for various age groups.",
//       "Support teachers with resources and professional development.",
//       "Ensure curriculum alignment with national educational standards.",
//     ],
//     skills: ["Program Planning", "Teacher Support", "Curriculum Development"],
//   },

//   // Financial Services
//   {
//     id: 13,
//     time: "50 min ago",
//     title: "Financial Analyst",
//     company: "MoneyMatters Inc",
//     category: "Financial Services",
//     type: "Full time",
//     salary: "$65000-$80000",
//     location: "New Delhi, India",
//     logo: "/images/CompneyIcon.png",
//     experience: "4 Years",
//     degree: "Master",
//     description:
//       "As a Financial Analyst at MoneyMatters Inc., you will be tasked with analyzing extensive financial data to provide critical insights that support informed investment decisions and strategic planning. This role involves preparing detailed reports, conducting in-depth financial forecasts, and presenting actionable recommendations to key stakeholders, all while navigating the complexities of the global financial markets to drive the company’s financial success.",
//     responsibilities: [
//       "Analyze extensive financial datasets using advanced tools to provide critical insights that inform strategic investment decisions.",
//       "Prepare detailed and comprehensive financial reports, presenting complex data in an accessible manner for key stakeholders and decision-makers.",
//       "Conduct in-depth financial forecasting and risk assessments, delivering actionable recommendations to enhance the company’s financial performance.",
//     ],
//     skills: [
//       "Advanced Financial Data Analysis and Forecasting",
//       "Expert Report Preparation and Stakeholder Presentation",
//       "Proficiency in Risk Assessment and Investment Strategy",
//     ],
//   },
//   {
//     id: 23,
//     time: "52 min ago",
//     title: "Investment Advisor",
//     company: "WealthWise Partners",
//     category: "Financial Services",
//     type: "Full time",
//     salary: "$70000-$90000",
//     location: "Mumbai, India",
//     logo: "/images/CompneyIcon.png",
//     experience: "5 Years",
//     degree: "Master",
//     description:
//       "The Investment Advisor will provide expert financial advice, develop investment portfolios, and guide clients through market trends to maximize their returns.",
//     responsibilities: [
//       "Provide expert financial advice tailored to client needs.",
//       "Develop and manage investment portfolios for optimal returns.",
//       "Guide clients through market trends and investment opportunities.",
//     ],
//     skills: ["Financial Advisory", "Portfolio Management", "Market Analysis"],
//   },

//   // Human Resources
//   {
//     id: 14,
//     time: "52 min ago",
//     title: "HR Coordinator",
//     company: "People First",
//     category: "Human Resources",
//     type: "Full time",
//     salary: "$40000-$50000",
//     location: "Berlin, Germany",
//     logo: "/images/CompneyIcon.png",
//     experience: "3 Years",
//     degree: "Bachelor",
//     description:
//       "The HR Coordinator position at People First involves coordinating a broad spectrum of human resources activities, including recruitment, employee relations, and talent development, to support a thriving organizational culture. You will ensure full compliance with labor laws and regulations, manage employee onboarding processes, and foster a supportive work environment that enhances employee satisfaction and retention across all departments.",
//     responsibilities: [
//       "Coordinate a comprehensive recruitment process, from job postings to candidate selection, to attract and retain top talent for the organization.",
//       "Manage employee relations by addressing concerns, mediating conflicts, and fostering a supportive work environment that boosts morale.",
//       "Ensure full compliance with a wide range of labor laws and regulations, overseeing onboarding processes to integrate new hires effectively.",
//     ],
//     skills: [
//       "Expert Recruitment and Talent Acquisition Strategies",
//       "Advanced Employee Relations and Conflict Resolution",
//       "Proficiency in Labor Law Compliance and Onboarding Processes",
//     ],
//   },
//   {
//     id: 24,
//     time: "55 min ago",
//     title: "HR Training Specialist",
//     company: "TalentGrowth Solutions",
//     category: "Human Resources",
//     type: "Full time",
//     salary: "$45000-$52000",
//     location: "Frankfurt, Germany",
//     logo: "/images/CompneyIcon.png",
//     experience: "4 Years",
//     degree: "Bachelor",
//     description:
//       "The HR Training Specialist will design and deliver training programs, assess employee development needs, and enhance organizational skills to improve workforce performance.",
//     responsibilities: [
//       "Design and deliver tailored training programs for employees.",
//       "Assess development needs and create skill enhancement plans.",
//       "Enhance organizational skills to boost overall workforce performance.",
//     ],
//     skills: [
//       "Training Program Design",
//       "Employee Development",
//       "Skill Assessment",
//     ],
//   },

//   // Transport
//   {
//     id: 15,
//     time: "55 min ago",
//     title: "Delivery Driver",
//     company: "FastTrack Logistics",
//     category: "Transport",
//     type: "Full time",
//     salary: "$20000-$25000",
//     location: "Paris, France",
//     logo: "/images/CompneyIcon.png",
//     experience: "1 Year",
//     degree: "High School",
//     description:
//       "The Delivery Driver role at FastTrack Logistics entails efficiently delivering goods across a variety of designated routes, ensuring timely and reliable service to customers. You will be responsible for maintaining your delivery vehicle in optimal condition, adhering to strict safety protocols, and providing excellent customer service to build strong relationships, all while navigating the challenges of urban and rural delivery environments.",
//     responsibilities: [
//       "Efficiently deliver goods across a wide range of designated routes, ensuring timely and reliable service to meet customer expectations consistently.",
//       "Maintain your delivery vehicle in optimal condition through regular inspections and upkeep, adhering to strict safety and maintenance protocols.",
//       "Provide exceptional customer service by addressing inquiries, resolving issues, and building strong relationships to enhance customer satisfaction.",
//     ],
//     skills: [
//       "Expert Navigation and Route Optimization Techniques",
//       "Vehicle Maintenance and Safety Protocol Adherence",
//       "Advanced Customer Service and Relationship Building",
//     ],
//   },
//   {
//     id: 25,
//     time: "58 min ago",
//     title: "Logistics Coordinator",
//     company: "SwiftDelivery Services",
//     category: "Transport",
//     type: "Full time",
//     salary: "$30000-$35000",
//     location: "Lyon, France",
//     logo: "/images/CompneyIcon.png",
//     experience: "2 Years",
//     degree: "High School",
//     description:
//       "The Logistics Coordinator will manage transportation schedules, coordinate with drivers, and ensure efficient delivery operations to meet client demands.",
//     responsibilities: [
//       "Manage transportation schedules and optimize delivery routes.",
//       "Coordinate with drivers to ensure timely pickups and deliveries.",
//       "Ensure efficient operations to meet client demands and deadlines.",
//     ],
//     skills: ["Logistics Management", "Route Optimization", "Team Coordination"],
//   },
// ];

export const jobsData = [
  // Hotels & Tourism
  {
    id: 1,
    time: "10 min ago",
    title: "Forward Security Director",
    company: "Bauch, Schuppe and Schulist Co",
    category: "Hotels & Tourism",
    type: "Full time",
    salary: "$40000-$42000",
    location: "New-York, USA",
    logo: "/images/CompneyIcon.png",
    experience: "5 Years",
    degree: "Master",
    description:
      "As the Forward Security Director, you will take on the critical responsibility of leading and overseeing all security operations for a prestigious and expansive hotel chain renowned for its luxury accommodations and exceptional guest services. Your primary role will involve crafting and implementing comprehensive security strategies designed to safeguard both the physical premises and the well-being of guests and staff, while ensuring full compliance with local, state, and federal safety regulations. This position demands exceptional leadership abilities, an in-depth understanding of risk management principles, and the capability to train and motivate a diverse security team to maintain the highest standards of safety and emergency preparedness across multiple hotel locations.",
    responsibilities: [
      "Develop and meticulously implement a wide range of sophisticated security strategies tailored to the unique needs of various hotel operations, ensuring comprehensive protection against potential threats.",
      "Conduct thorough audits and ensure unwavering compliance with an extensive array of local, state, and federal safety regulations to uphold the hotel chain's reputation for excellence and safety.",
      "Design and deliver extensive training programs for security personnel, equipping them with advanced skills and knowledge to handle emergencies, de-escalate conflicts, and maintain a secure environment effectively.",
    ],
    skills: [
      "Advanced Risk Management and Threat Assessment",
      "Exceptional Leadership and Team Motivation",
      "In-Depth Knowledge of Safety Compliance and Emergency Protocols",
    ],
  },
  {
    id: 2,
    time: "12 min ago",
    title: "Regional Creative Facilitator",
    company: "Wisozk - Becker Co",
    category: "Media",
    type: "Part time",
    salary: "$28000-$32000",
    location: "Los Angeles, USA",
    logo: "/images/CompneyIcon.png",
    experience: "3 Years",
    degree: "Bachelor",
    description:
      "The Regional Creative Facilitator position at Wisozk - Becker Co offers an exciting opportunity to lead and coordinate a diverse portfolio of creative projects spanning multiple regions, working closely with talented media production teams to bring innovative ideas to life. This role requires a deep expertise in design principles, content creation techniques, and project management, as you will be responsible for overseeing the development, execution, and timely delivery of high-quality multimedia content that aligns with the company’s strategic vision and client expectations across various markets.",
    responsibilities: [
      "Coordinate and manage an extensive array of regional creative projects, ensuring seamless collaboration with media production teams to meet ambitious creative and business objectives.",
      "Foster strong partnerships with cross-functional teams, providing expert guidance and support to ensure the successful execution of complex multimedia content production processes.",
      "Oversee the complete lifecycle of content creation projects, from initial concept development to final delivery, while adhering to strict timelines and maintaining the highest standards of quality.",
    ],
    skills: [
      "Expertise in Advanced Design Principles and Visual Storytelling",
      "Proficient Content Creation and Multimedia Production",
      "Strategic Project Coordination and Deadline Management",
    ],
  },
  {
    id: 3,
    time: "15 min ago",
    title: "Internal Integration Planner",
    company: "Mraz, Quigley and Feest Inc.",
    category: "Construction",
    type: "Full time",
    salary: "$48000-$50000",
    location: "Texas, USA",
    logo: "/images/CompneyIcon.png",
    experience: "6 Years",
    degree: "Bachelor",
    description:
      "As an Internal Integration Planner at Mraz, Quigley and Feest Inc., you will play a pivotal role in planning and overseeing a wide range of internal integration projects within the construction sector, ensuring that all operational aspects are seamlessly aligned for successful project delivery. This position involves coordinating with multiple teams, managing complex schedules, and implementing innovative solutions to integrate new systems or processes, all while maintaining strict adherence to industry standards and client specifications across large-scale construction sites.",
    responsibilities: [
      "Develop detailed and comprehensive plans for a variety of construction integration projects, ensuring all operational components are meticulously organized and executed with precision.",
      "Facilitate effective coordination with diverse construction teams and external stakeholders, fostering collaboration to achieve seamless integration of new systems and processes.",
      "Monitor and manage project delivery timelines with rigorous attention to detail, ensuring that all milestones are met and that the final outcomes align with the highest industry standards.",
    ],
    skills: [
      "Expert Project Planning and Organizational Skills",
      "Advanced Team Coordination and Stakeholder Engagement",
      "In-Depth Construction Management and Systems Integration",
    ],
  },
  {
    id: 4,
    time: "24 min ago",
    title: "District Intranet Director",
    company: "VonRueden - Weber Co",
    category: "Commerce",
    type: "Full time",
    salary: "$42000-$48000",
    location: "Florida, USA",
    logo: "/images/CompneyIcon.png",
    experience: "4 Years",
    degree: "Master",
    description:
      "The District Intranet Director role at VonRueden - Weber Co entails leading the strategic management and operation of intranet systems across an expansive commerce district, ensuring robust digital infrastructure and efficient team coordination. This position requires a blend of advanced IT expertise and managerial acumen to oversee network performance, implement cutting-edge technological solutions, and support the district's business operations with a reliable and secure online platform that enhances communication and productivity.",
    responsibilities: [
      "Lead the strategic management and continuous operation of intranet systems across the district, ensuring optimal performance and reliability for all users.",
      "Coordinate and direct a skilled team of IT professionals to implement and maintain cutting-edge technological solutions that enhance network capabilities.",
      "Ensure the intranet platform remains secure and efficient, supporting seamless communication and productivity across all business operations within the district.",
    ],
    skills: [
      "Advanced IT Management and Network Administration",
      "Strategic Team Leadership and Project Oversight",
      "Expertise in Cybersecurity and Digital Infrastructure",
    ],
  },
  {
    id: 5,
    time: "26 min ago",
    title: "Corporate Tactics Facilitator",
    company: "Cormier, Turner and Flatley Inc",
    category: "Commerce",
    type: "Full time",
    salary: "$38000-$40000",
    location: "Boston, USA",
    logo: "/images/CompneyIcon.png",
    experience: "3 Years",
    degree: "Bachelor",
    description:
      "As a Corporate Tactics Facilitator at Cormier, Turner and Flatley Inc., you will be entrusted with the vital task of facilitating and refining corporate strategies to significantly enhance business tactics and drive organizational growth. This role involves working closely with top-tier executives to identify opportunities for improvement, develop long-term strategic plans, and implement initiatives that boost operational efficiency and profitability across various departments within the company.",
    responsibilities: [
      "Facilitate comprehensive strategy sessions with senior executives, identifying key areas for tactical improvement and long-term business development.",
      "Collaborate closely with cross-departmental teams to develop and refine strategic plans that align with the company’s overarching goals and vision.",
      "Implement a series of innovative initiatives designed to enhance operational efficiency, reduce costs, and maximize profitability throughout the organization.",
    ],
    skills: [
      "Strategic Planning and Business Development",
      "Advanced Executive Collaboration and Communication",
      "Innovative Process Optimization and Profit Maximization",
    ],
  },
  {
    id: 6,
    time: "30 min ago",
    title: "Frontend Developer",
    company: "Tech Solutions",
    category: "IT & Software",
    type: "Full time",
    salary: "$60000-$75000",
    location: "San Francisco, USA",
    logo: "/images/CompneyIcon.png",
    experience: "4 Years",
    degree: "Bachelor",
    description:
      "The Frontend Developer position at Tech Solutions offers an opportunity to design, develop, and maintain highly interactive and user-facing web applications that deliver exceptional digital experiences. You will collaborate extensively with talented designers and backend development teams, leveraging modern JavaScript frameworks and cutting-edge technologies to create responsive, accessible, and visually appealing interfaces that meet the evolving needs of a diverse user base.",
    responsibilities: [
      "Design, develop, and rigorously maintain a wide range of interactive user-facing web applications, ensuring a seamless and engaging digital experience.",
      "Collaborate closely with design and backend development teams to integrate sophisticated features and functionalities into the web platform.",
      "Continuously uphold and enhance code quality standards, conducting thorough testing and optimization to ensure optimal performance and accessibility.",
    ],
    skills: [
      "Advanced JavaScript Programming and Framework Utilization",
      "Expert Collaboration with Design and Development Teams",
      "Proficiency in CSS, HTML, and Responsive Web Design",
    ],
  },
  {
    id: 7,
    time: "32 min ago",
    title: "UX Designer",
    company: "DesignHub",
    category: "Media",
    type: "Freelance",
    salary: "$25000-$30000",
    location: "Chicago, USA",
    logo: "/images/CompneyIcon.png",
    experience: "2 Years",
    degree: "Bachelor",
    description:
      "As a UX Designer at DesignHub, you will be responsible for crafting highly user-friendly interfaces and conducting extensive usability testing to enhance the overall user experience of media products. Working remotely, you will play a key role in designing intuitive layouts, conducting in-depth user research, and implementing feedback to create engaging and accessible digital experiences that resonate with a global audience and meet the creative standards of the media industry.",
    responsibilities: [
      "Craft and refine highly intuitive user interfaces, focusing on layout design and navigation to enhance the overall usability of media products.",
      "Conduct comprehensive usability testing sessions, gathering detailed user feedback to identify areas for improvement and optimization.",
      "Implement iterative design improvements based on extensive user research and stakeholder input, ensuring the final product meets industry-leading standards.",
    ],
    skills: [
      "Expert UI/UX Design and User-Centered Design Principles",
      "Advanced Usability Testing and User Research Methodologies",
      "Proficiency in Prototyping and Iterative Design Processes",
    ],
  },
  {
    id: 8,
    time: "35 min ago",
    title: "Marketing Specialist",
    company: "Bright Ideas Co",
    category: "Commerce",
    type: "Part time",
    salary: "$20000-$25000",
    location: "Toronto, Canada",
    logo: "/images/CompneyIcon.png",
    experience: "2 Years",
    degree: "Bachelor",
    description:
      "The Marketing Specialist role at Bright Ideas Co involves developing and executing comprehensive marketing campaigns that effectively promote brand awareness and drive customer engagement. You will be tasked with analyzing intricate market trends, conducting thorough competitor research, and supporting a wide range of brand growth initiatives to strengthen the company’s market position and foster long-term customer loyalty in a highly competitive commercial landscape.",
    responsibilities: [
      "Develop and execute comprehensive marketing campaign strategies, targeting diverse audiences to maximize brand visibility and engagement.",
      "Conduct thorough market trend analysis and competitor research to identify strategic opportunities for enhancing marketing efforts.",
      "Support a broad spectrum of brand growth initiatives, collaborating with teams to implement innovative tactics that boost customer loyalty and market share.",
    ],
    skills: [
      "Strategic Marketing Campaign Development and Execution",
      "In-Depth Market Trend Analysis and Competitor Research",
      "Expertise in Branding and Customer Engagement Strategies",
    ],
  },
  {
    id: 9,
    time: "38 min ago",
    title: "Data Scientist",
    company: "AI Innovations",
    category: "IT & Software",
    type: "Full time",
    salary: "$80000-$95000",
    location: "Seattle, USA",
    logo: "/images/CompneyIcon.png",
    experience: "5 Years",
    degree: "Master",
    description:
      "As a Data Scientist at AI Innovations, you will be at the forefront of analyzing vast and complex datasets to develop innovative AI-driven solutions that transform business operations. This role involves collaborating closely with a team of skilled engineers to design, implement, and refine data-driven strategies that enhance decision-making processes, optimize performance, and deliver measurable value to clients across multiple industries.",
    responsibilities: [
      "Analyze vast and intricate datasets using advanced statistical methods to uncover actionable insights for AI-driven solutions.",
      "Collaborate extensively with engineering teams to design and implement sophisticated data models that enhance business decision-making.",
      "Refine and optimize data-driven strategies through continuous testing and iteration, ensuring they deliver maximum value and performance improvements.",
    ],
    skills: [
      "Advanced Python Programming and Statistical Analysis",
      "Expertise in Machine Learning and AI Model Development",
      "Proficiency in Data Visualization and Strategic Implementation",
    ],
  },
  {
    id: 10,
    time: "40 min ago",
    title: "Nurse Practitioner",
    company: "HealthCare Plus",
    category: "Healthcare",
    type: "Full time",
    salary: "$55000-$65000",
    location: "London, UK",
    logo: "/images/CompneyIcon.png",
    experience: "6 Years",
    degree: "Master",
    description:
      "The Nurse Practitioner position at HealthCare Plus is a rewarding opportunity to provide advanced nursing care and expert patient management within a dynamic clinical setting. You will focus on delivering high-quality primary care services, conducting detailed health assessments, and developing personalized treatment plans to address the diverse healthcare needs of patients, while collaborating with multidisciplinary teams to ensure holistic and compassionate care.",
    responsibilities: [
      "Deliver advanced nursing care services, conducting thorough health assessments to diagnose and treat a wide range of patient conditions.",
      "Manage comprehensive patient health records with precision, ensuring accurate documentation and seamless coordination with healthcare teams.",
      "Develop and implement personalized treatment plans, focusing on primary care services to address the unique needs of each patient effectively.",
    ],
    skills: [
      "Advanced Patient Care and Medical Diagnosis Techniques",
      "Expert Health Record Management and Documentation",
      "Proficiency in Primary Care Delivery and Team Collaboration",
    ],
  },
  {
    id: 11,
    time: "45 min ago",
    title: "Project Manager",
    company: "Global Constructions",
    category: "Construction",
    type: "Contract",
    salary: "$70000-$85000",
    location: "Dubai, UAE",
    logo: "/images/CompneyIcon.png",
    experience: "7 Years",
    degree: "Bachelor",
    description:
      "As a Project Manager at Global Constructions, you will oversee the entire lifecycle of large-scale construction projects, from meticulous planning and resource allocation to flawless execution and final delivery. This role requires coordinating with a wide array of stakeholders, managing substantial budgets, and ensuring all projects are completed on time while adhering to the highest quality standards and safety regulations in the competitive construction industry.",
    responsibilities: [
      "Oversee the meticulous planning and resource allocation for large-scale construction projects, ensuring all aspects are thoroughly prepared.",
      "Coordinate effectively with a diverse group of stakeholders, including contractors and suppliers, to ensure smooth project execution and timely delivery.",
      "Manage substantial project budgets and timelines with precision, ensuring compliance with quality standards and rigorous safety regulations throughout.",
    ],
    skills: [
      "Expert Project Management and Resource Allocation",
      "Advanced Stakeholder Coordination and Communication",
      "Proficiency in Budget Management and Safety Compliance",
    ],
  },
  {
    id: 12,
    time: "48 min ago",
    title: "Teacher",
    company: "Springfield School",
    category: "Education",
    type: "Part time",
    salary: "$30000-$35000",
    location: "Sydney, Australia",
    logo: "/images/CompneyIcon.png",
    experience: "3 Years",
    degree: "Bachelor",
    description:
      "The Teacher role at Springfield School offers a fulfilling opportunity to educate and inspire students within a vibrant classroom setting, fostering a positive learning environment. You will be responsible for developing detailed and engaging lesson plans tailored to various subjects, conducting thorough assessments of student progress, and providing constructive feedback to support their academic and personal growth throughout the school year.",
    responsibilities: [
      "Educate and inspire students within a dynamic classroom setting, creating a positive and inclusive learning environment for all.",
      "Develop detailed and engaging lesson plans across various subjects, tailored to meet the diverse needs and learning styles of students.",
      "Conduct thorough assessments of student progress, providing constructive feedback and support to enhance their academic and personal development.",
    ],
    skills: [
      "Innovative Teaching Methods and Classroom Management",
      "Curriculum Development and Lesson Planning Expertise",
      "Advanced Student Assessment and Feedback Techniques",
    ],
  },
  {
    id: 13,
    time: "50 min ago",
    title: "Financial Analyst",
    company: "MoneyMatters Inc",
    category: "Financial Services",
    type: "Full time",
    salary: "$65000-$80000",
    location: "New Delhi, India",
    logo: "/images/CompneyIcon.png",
    experience: "4 Years",
    degree: "Master",
    description:
      "As a Financial Analyst at MoneyMatters Inc., you will be tasked with analyzing extensive financial data to provide critical insights that support informed investment decisions and strategic planning. This role involves preparing detailed reports, conducting in-depth financial forecasts, and presenting actionable recommendations to key stakeholders, all while navigating the complexities of the global financial markets to drive the company’s financial success.",
    responsibilities: [
      "Analyze extensive financial datasets using advanced tools to provide critical insights that inform strategic investment decisions.",
      "Prepare detailed and comprehensive financial reports, presenting complex data in an accessible manner for key stakeholders and decision-makers.",
      "Conduct in-depth financial forecasting and risk assessments, delivering actionable recommendations to enhance the company’s financial performance.",
    ],
    skills: [
      "Advanced Financial Data Analysis and Forecasting",
      "Expert Report Preparation and Stakeholder Presentation",
      "Proficiency in Risk Assessment and Investment Strategy",
    ],
  },
  {
    id: 14,
    time: "52 min ago",
    title: "HR Coordinator",
    company: "People First",
    category: "Human Resources",
    type: "Full time",
    salary: "$40000-$50000",
    location: "Berlin, Germany",
    logo: "/images/CompneyIcon.png",
    experience: "3 Years",
    degree: "Bachelor",
    description:
      "The HR Coordinator position at People First involves coordinating a broad spectrum of human resources activities, including recruitment, employee relations, and talent development, to support a thriving organizational culture. You will ensure full compliance with labor laws and regulations, manage employee onboarding processes, and foster a supportive work environment that enhances employee satisfaction and retention across all departments.",
    responsibilities: [
      "Coordinate a comprehensive recruitment process, from job postings to candidate selection, to attract and retain top talent for the organization.",
      "Manage employee relations by addressing concerns, mediating conflicts, and fostering a supportive work environment that boosts morale.",
      "Ensure full compliance with a wide range of labor laws and regulations, overseeing onboarding processes to integrate new hires effectively.",
    ],
    skills: [
      "Expert Recruitment and Talent Acquisition Strategies",
      "Advanced Employee Relations and Conflict Resolution",
      "Proficiency in Labor Law Compliance and Onboarding Processes",
    ],
  },
  {
    id: 15,
    time: "55 min ago",
    title: "Delivery Driver",
    company: "FastTrack Logistics",
    category: "Transport",
    type: "Full time",
    salary: "$20000-$25000",
    location: "Paris, France",
    logo: "/images/CompneyIcon.png",
    experience: "1 Year",
    degree: "High School",
    description:
      "The Delivery Driver role at FastTrack Logistics entails efficiently delivering goods across a variety of designated routes, ensuring timely and reliable service to customers. You will be responsible for maintaining your delivery vehicle in optimal condition, adhering to strict safety protocols, and providing excellent customer service to build strong relationships, all while navigating the challenges of urban and rural delivery environments.",
    responsibilities: [
      "Efficiently deliver goods across a wide range of designated routes, ensuring timely and reliable service to meet customer expectations consistently.",
      "Maintain your delivery vehicle in optimal condition through regular inspections and upkeep, adhering to strict safety and maintenance protocols.",
      "Provide exceptional customer service by addressing inquiries, resolving issues, and building strong relationships to enhance customer satisfaction.",
    ],
    skills: [
      "Expert Navigation and Route Optimization Techniques",
      "Vehicle Maintenance and Safety Protocol Adherence",
      "Advanced Customer Service and Relationship Building",
    ],
  },
  {
    id: 16,
    time: "12 min ago",
    title: "Hotel Operations Manager",
    company: "Luxury Stays Inc.",
    category: "Hotels & Tourism",
    type: "Full time",
    salary: "$45000-$47000",
    location: "Los Angeles, USA",
    logo: "/images/CompneyIcon.png",
    experience: "6 Years",
    degree: "Master",
    description:
      "The Hotel Operations Manager will oversee daily operations of a luxury hotel, ensuring exceptional guest experiences and efficient staff management. This role involves coordinating with various departments, optimizing resource allocation, and implementing guest satisfaction initiatives to maintain the hotel's high standards.",
    responsibilities: [
      "Oversee daily hotel operations, ensuring seamless coordination across all departments.",
      "Optimize resource allocation and staff schedules to enhance operational efficiency.",
      "Implement guest satisfaction initiatives to improve service quality and guest retention.",
    ],
    skills: ["Operational Management", "Staff Coordination", "Guest Relations"],
  },
  {
    id: 17,
    time: "15 min ago",
    title: "Media Content Producer",
    company: "Creative Minds Studio",
    category: "Media",
    type: "Full time",
    salary: "$35000-$40000",
    location: "Chicago, USA",
    logo: "/images/CompneyIcon.png",
    experience: "4 Years",
    degree: "Bachelor",
    description:
      "The Media Content Producer will create and manage high-quality multimedia content for various platforms, collaborating with creative teams to deliver engaging stories and visuals that align with brand goals.",
    responsibilities: [
      "Create and manage multimedia content for digital and broadcast platforms.",
      "Collaborate with creative teams to develop engaging stories and visuals.",
      "Ensure content meets brand standards and delivery deadlines.",
    ],
    skills: ["Content Creation", "Video Editing", "Brand Alignment"],
  },
  {
    id: 18,
    time: "18 min ago",
    title: "Construction Site Supervisor",
    company: "BuildPro Solutions",
    category: "Construction",
    type: "Full time",
    salary: "$50000-$55000",
    location: "Houston, USA",
    logo: "/images/CompneyIcon.png",
    experience: "5 Years",
    degree: "Bachelor",
    description:
      "The Construction Site Supervisor will manage on-site construction activities, ensuring safety, quality, and timely completion of projects while coordinating with workers and contractors.",
    responsibilities: [
      "Manage on-site construction activities and ensure safety compliance.",
      "Coordinate with workers and contractors to meet project deadlines.",
      "Oversee quality control and report progress to management.",
    ],
    skills: ["Site Management", "Safety Compliance", "Team Leadership"],
  },
  {
    id: 19,
    time: "28 min ago",
    title: "E-Commerce Manager",
    company: "TradeMasters Ltd.",
    category: "Commerce",
    type: "Full time",
    salary: "$40000-$45000",
    location: "Miami, USA",
    logo: "/images/CompneyIcon.png",
    experience: "4 Years",
    degree: "Bachelor",
    description:
      "The E-Commerce Manager will oversee online sales platforms, optimize digital marketing strategies, and enhance customer experience to drive revenue growth for the company.",
    responsibilities: [
      "Oversee online sales platforms and ensure optimal performance.",
      "Optimize digital marketing strategies to boost online traffic.",
      "Enhance customer experience to increase sales and retention.",
    ],
    skills: [
      "E-Commerce Management",
      "Digital Marketing",
      "Customer Experience",
    ],
  },
  {
    id: 20,
    time: "40 min ago",
    title: "Backend Developer",
    company: "CodeCraft Inc.",
    category: "IT & Software",
    type: "Full time",
    salary: "$65000-$80000",
    location: "Austin, USA",
    logo: "/images/CompneyIcon.png",
    experience: "5 Years",
    degree: "Bachelor",
    description:
      "The Backend Developer will design and maintain server-side applications, ensuring robust performance and security while collaborating with frontend teams to deliver integrated solutions.",
    responsibilities: [
      "Design and maintain server-side applications with high performance.",
      "Ensure robust security measures for all backend systems.",
      "Collaborate with frontend teams for integrated solution delivery.",
    ],
    skills: ["Backend Development", "Server Management", "Security Protocols"],
  },
  {
    id: 21,
    time: "42 min ago",
    title: "Medical Assistant",
    company: "HealthFirst Clinic",
    category: "Healthcare",
    type: "Full time",
    salary: "$30000-$35000",
    location: "Manchester, UK",
    logo: "/images/CompneyIcon.png",
    experience: "3 Years",
    degree: "Associate",
    description:
      "The Medical Assistant will support healthcare professionals by performing clinical and administrative tasks, ensuring smooth patient flow and accurate record-keeping in a busy clinic environment.",
    responsibilities: [
      "Support healthcare professionals with clinical and administrative tasks.",
      "Ensure smooth patient flow and timely service delivery.",
      "Maintain accurate patient records and assist with scheduling.",
    ],
    skills: [
      "Clinical Support",
      "Administrative Skills",
      "Patient Coordination",
    ],
  },
  {
    id: 22,
    time: "50 min ago",
    title: "Education Coordinator",
    company: "Learning Horizons Academy",
    category: "Education",
    type: "Full time",
    salary: "$40000-$45000",
    location: "Melbourne, Australia",
    logo: "/images/CompneyIcon.png",
    experience: "4 Years",
    degree: "Bachelor",
    description:
      "The Education Coordinator will plan and implement educational programs, support teachers, and ensure curriculum alignment with educational standards across the institution.",
    responsibilities: [
      "Plan and implement educational programs for various age groups.",
      "Support teachers with resources and professional development.",
      "Ensure curriculum alignment with national educational standards.",
    ],
    skills: ["Program Planning", "Teacher Support", "Curriculum Development"],
  },
  {
    id: 23,
    time: "52 min ago",
    title: "Investment Advisor",
    company: "WealthWise Partners",
    category: "Financial Services",
    type: "Full time",
    salary: "$70000-$90000",
    location: "Mumbai, India",
    logo: "/images/CompneyIcon.png",
    experience: "5 Years",
    degree: "Master",
    description:
      "The Investment Advisor will provide expert financial advice, develop investment portfolios, and guide clients through market trends to maximize their returns.",
    responsibilities: [
      "Provide expert financial advice tailored to client needs.",
      "Develop and manage investment portfolios for optimal returns.",
      "Guide clients through market trends and investment opportunities.",
    ],
    skills: ["Financial Advisory", "Portfolio Management", "Market Analysis"],
  },
  {
    id: 24,
    time: "55 min ago",
    title: "HR Training Specialist",
    company: "TalentGrowth Solutions",
    category: "Human Resources",
    type: "Full time",
    salary: "$45000-$52000",
    location: "Frankfurt, Germany",
    logo: "/images/CompneyIcon.png",
    experience: "4 Years",
    degree: "Bachelor",
    description:
      "The HR Training Specialist will design and deliver training programs, assess employee development needs, and enhance organizational skills to improve workforce performance.",
    responsibilities: [
      "Design and deliver tailored training programs for employees.",
      "Assess development needs and create skill enhancement plans.",
      "Enhance organizational skills to boost overall workforce performance.",
    ],
    skills: [
      "Training Program Design",
      "Employee Development",
      "Skill Assessment",
    ],
  },
  {
    id: 25,
    time: "58 min ago",
    title: "Logistics Coordinator",
    company: "SwiftDelivery Services",
    category: "Transport",
    type: "Full time",
    salary: "$30000-$35000",
    location: "Lyon, France",
    logo: "/images/CompneyIcon.png",
    experience: "2 Years",
    degree: "High School",
    description:
      "The Logistics Coordinator will manage transportation schedules, coordinate with drivers, and ensure efficient delivery operations to meet client demands.",
    responsibilities: [
      "Manage transportation schedules and optimize delivery routes.",
      "Coordinate with drivers to ensure timely pickups and deliveries.",
      "Ensure efficient operations to meet client demands and deadlines.",
    ],
    skills: ["Logistics Management", "Route Optimization", "Team Coordination"],
  },
];

export const companyInfo = {
  Instagram: {
    id: 1,
    icon: FaInstagram,
    description:
      "A photo and video-sharing social networking service owned by Meta Platforms, enabling users to upload and share media content.",
  },
  Tesla: {
    icon: SiTesla,
    description:
      "Designs, builds, sells, and services electric vehicles and energy solutions to accelerate the world's transition to sustainable energy.",
  },
  "McDonald's": {
    icon: GiFrenchFries,
    description:
      "Global fast-food chain committed to feeding and empowering communities while sustaining the planet through ethical sourcing.",
  },
  Apple: {
    icon: FaApple,
    description:
      "American multinational technology company known for revolutionizing personal computing, mobile devices, and consumer electronics.",
  },
};

//categories
export const categories = [
  {
    id: 1,
    name: "IT Industry",
    jobs: 1842,
    icon: FaLaptopCode,
  },
  {
    id: 2,
    name: "Advertising",
    jobs: 732,
    icon: FaBullhorn,
  },
  {
    id: 3,
    name: "Sales",
    jobs: 1560,
    icon: FaHandshake,
  },
  {
    id: 4,
    name: "Other",
    jobs: 980,
    icon: FaThLarge,
  },
  // {
  //   id: 5,
  //   name: "Hotels & Tourism",
  //   jobs: 1022,
  //   icon: RiHotelLine,
  // },
  // {
  //   id: 6,
  //   name: "Education",
  //   jobs: 1496,
  //   icon: MdOutlineSchool,
  // },
  // {
  //   id: 7,
  //   name: "Financial Services",
  //   jobs: 1529,
  //   icon: TbBuildingSkyscraper,
  // },
  // {
  //   id: 8,
  //   name: "Transport",
  //   jobs: 1244,
  //   icon: FaBus,
  // },
];

export const testimonials = [
  {
    id: 1,
    name: "Lucky Thakur",
    role: "Satisfied Client",
    title: "Outstanding Service",
    text: "I had a great experience with DV HR solution! The team was highly professional, responsive, and supportive throughout the entire hiring process. They understood my career goals and matched me with a fantastic opportunity that perfectly aligns with my skills and interests.Their coordination with...",
    image: "/images/PersonImage.png",
  },
  {
    id: 2,
    name: "Manu Tomar",
    role: "Happy Client",
    title: "Simple and Effective",
    text: "I was in search of a job. Deepak was incredibly helpful and supportive... he found me a job that matched my skills and preferences. Highly recommend his services to anyone looking for a job.",
    image: "/images/PersonImage.png",
  },
  {
    id: 3,
    name: "Shubham Singh",
    role: "Delighted Client",
    title: "Highly Recommend!",
    text: "Helpful and positive behaviour. Deepak ji helps me to join a new organisation according to my skills and experience in one go.",
    image: "/images/PersonImage.png",
  },

  {
    id: 4,
    name: "Ashwini Salvi",
    role: "Satisfied Client",
    title: "Outstanding Service",
    text: "Deepak helped me right after the time of Covid. The companies were yet getting in place. And the second wave was yet persistent. As I come from mainline advertising, I was actively looking for a role in digital and Deepak helped me right with the correct requirement to work on awesome clients. Th...",
    image: "/images/PersonImage.png",
  },
  {
    id: 5,
    name: "B “Phoenix” singhr",
    role: "Happy Client",
    title: "Simple and Effective",
    text: "Very helpful. I was looking for a job change and happened to get a text from Deepak. Next thing I know got an interview with a good company which went of smoothly. The whole experience was very smooth. Would recommend his services to candidates looking for job opportunities well matched to their ...",
    image: "/images/PersonImage.png",
  },
  {
    id: 6,
    name: "Saurav Bhandari",
    role: "Delighted Client",
    title: "Highly Recommend!",
    text: "Great HR solutions. Deepak Sir has helped me for my interview journey. Thanks a lot for all your support and guidance.",
    image: "/images/PersonImage.png",
  },
];

export const data = [
  {
    id: 1,
    type: "News",
    date: "30 March 2025",
    title: "Boosting Employee Engagement: Proven Strategies for HR Teams",
    shortText: "Discover practical ways to improve engagement and morale...",
    fullText:
      "Learn actionable strategies for HR teams to enhance employee engagement, foster collaboration, and improve overall workplace satisfaction in 2025.",
    image: "/images/NewAndBlogImage1.png",
  },
  {
    id: 2,
    type: "Blog",
    date: "30 March 2025",
    title: "Top 6 Job Interview Mistakes and How to Avoid Them",
    shortText: "Learn the common pitfalls candidates face...",
    fullText:
      "Prepare for your next opportunity by understanding common interview mistakes, and how to confidently navigate your interviews for success.",
    image: "/images/NewAndBlogImage1.png",
  },
  {
    id: 3,
    type: "News",
    date: "29 March 2025",
    title: "AI in Recruitment: Transforming the Hiring Process",
    shortText: "Understand the growing role of AI in HR...",
    fullText:
      "Explore how AI is revolutionizing recruitment, from automating screening to predicting candidate fit, and learn how companies are adapting to these changes.",
    image: "/images/NewAndBlogImage1.png",
  },
  {
    id: 4,
    type: "Blog",
    date: "28 March 2025",
    title: "5 Habits of Highly Productive Remote Teams",
    shortText: "Remote work requires discipline and structure...",
    fullText:
      "Discover five habits that help remote teams maintain productivity, clear communication, and strong collaboration while working from different locations.",
    image: "/images/NewAndBlogImage1.png",
  },
  {
    id: 5,
    type: "News",
    date: "27 March 2025",
    title: "Hybrid Work Trends in 2025: Opportunities and Challenges",
    shortText: "Balancing office and remote work is key...",
    fullText:
      "Explore the trends, benefits, and challenges of hybrid work models, and learn how organizations are optimizing employee experience in 2025.",
    image: "/images/NewAndBlogImage1.png",
  },
  {
    id: 6,
    type: "News",
    date: "27 March 2025",
    title: "Hybrid Work Trends in 2025: Opportunities and Challenges",
    shortText: "Balancing office and remote work is key...",
    fullText:
      "Explore the trends, benefits, and challenges of hybrid work models, and learn how organizations are optimizing employee experience in 2025.",
    image: "/images/NewAndBlogImage1.png",
  },
  {
    id: 7,
    type: "News",
    date: "27 March 2025",
    title: "Hybrid Work Trends in 2025: Opportunities and Challenges",
    shortText: "Balancing office and remote work is key...",
    fullText:
      "Explore the trends, benefits, and challenges of hybrid work models, and learn how organizations are optimizing employee experience in 2025.",
    image: "/images/NewAndBlogImage1.png",
  },
  {
    id: 8,
    type: "News",
    date: "27 March 2025",
    title: "Hybrid Work Trends in 2025: Opportunities and Challenges",
    shortText: "Balancing office and remote work is key...",
    fullText:
      "Explore the trends, benefits, and challenges of hybrid work models, and learn how organizations are optimizing employee experience in 2025.",
    image: "/images/NewAndBlogImage1.png",
  },
  {
    id: 9,
    type: "News",
    date: "27 March 2025",
    title: "Hybrid Work Trends in 2025: Opportunities and Challenges",
    shortText: "Balancing office and remote work is key...",
    fullText:
      "Explore the trends, benefits, and challenges of hybrid work models, and learn how organizations are optimizing employee experience in 2025.",
    image: "/images/NewAndBlogImage1.png",
  },
  {
    id: 10,
    type: "News",
    date: "27 March 2025",
    title: "Hybrid Work Trends in 2025: Opportunities and Challenges",
    shortText: "Balancing office and remote work is key...",
    fullText:
      "Explore the trends, benefits, and challenges of hybrid work models, and learn how organizations are optimizing employee experience in 2025.",
    image: "/images/NewAndBlogImage1.png",
  },
  {
    id: 11,
    type: "News",
    date: "27 March 2025",
    title: "Hybrid Work Trends in 2025: Opportunities and Challenges",
    shortText: "Balancing office and remote work is key...",
    fullText:
      "Explore the trends, benefits, and challenges of hybrid work models, and learn how organizations are optimizing employee experience in 2025.",
    image: "/images/NewAndBlogImage1.png",
  },
  {
    id: 12,
    type: "News",
    date: "27 March 2025",
    title: "Hybrid Work Trends in 2025: Opportunities and Challenges",
    shortText: "Balancing office and remote work is key...",
    fullText:
      "Explore the trends, benefits, and challenges of hybrid work models, and learn how organizations are optimizing employee experience in 2025.",
    image: "/images/NewAndBlogImage1.png",
  },
];

export const steps = [
  {
    id: 1,
    number: "1",
    title: "Elit gravida lorem amet porta risus vitae at",
    link: "Learn more",
  },
  {
    number: "02",
    title: "Build Connections",
    link: "Join Our Community",
    href: "/community",
  },
  {
    number: "03",
    title: "Grow With Us",
    link: "Start Your Journey",
    href: "/journey",
  },
];

export const HowItworksteps = [
  {
    id: 1,
    icon: LuSquareUserRound,
    title: "Create Your Profile",
    text: "Sign up in minutes and build your professional profile to get started.",
  },
  {
    icon: FiFileText,
    title: "Upload Resume",
    text: "Upload your CV so top HRs and recruiters can match you with jobs faster.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Explore Jobs",
    text: "Browse jobs from multiple companies connected with our HR partners.",
  },
  {
    icon: FaRegCircleCheck,
    title: "Apply & Get Hired",
    text: "Apply directly, connect with HR, and land your dream job quickly.",
  },
];

export const faqs = [
  {
    id: "01",
    question: "Can I upload my CV?",
    answer:
      "Yes, you can upload your CV during account creation. Make sure it’s updated and includes your latest experience and skills.",
  },
  {
    id: "02",
    question: "How long does the recruitment process take?",
    answer:
      "The recruitment process typically takes 2–4 weeks, depending on the role and the number of applicants.",
  },
  {
    id: "03",
    question: "What is the recruitment and selection process?",
    answer:
      "Our process includes application review, interviews with HR and relevant managers, and assessments to evaluate skills and fit.",
  },
  {
    id: "04",
    question: "Do you recruit graduates, apprentices, and students?",
    answer:
      "Yes, we recruit across all levels including graduates, apprentices, and students seeking internships or entry-level positions.",
  },
  {
    id: "05",
    question: "Can I receive notifications for future job openings?",
    answer:
      "Absolutely! You can subscribe to job alerts to be notified about roles matching your skills and interests.",
  },
];
