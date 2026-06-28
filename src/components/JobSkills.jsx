import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const JobSkills = ({ job }) => {
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const skills = job?.skills || [
    "Effective Communication and Interpersonal Skills",
    "Strong Teamwork and Collaborative Abilities",
    "Proficient Problem-Solving and Critical Thinking",
  ];

  return (
    <motion.div 
      variants={item}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="mb-6"
    >
      <h3 className="text-xl font-bold mb-4 text-left">Professional Skills</h3>
      <ul className="space-y-3 text-gray-700 text-left">
        {skills.map((skill, index) => (
          <li key={index} className="flex items-start gap-2">
            <CheckCircle size={20} className="text-[#1C42FF] flex-shrink-0 mt-1" />
            {skill}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default JobSkills;