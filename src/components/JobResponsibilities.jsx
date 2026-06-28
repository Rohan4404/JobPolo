import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const JobResponsibilities = ({ job }) => {
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const responsibilities = job?.responsibilities || [
    "Perform the core duties relevant to the role with dedication and precision.",
    "Collaborate effectively with team members to achieve collective goals.",
    "Meet all project deadlines and objectives with a high level of commitment.",
  ];

  return (
    <motion.div 
      variants={item}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="mb-6"
    >
      <h3 className="text-xl font-bold mb-4 text-left">Key Responsibilities</h3>
      <ul className="space-y-3 text-gray-700 text-left">
        {responsibilities.map((resp, index) => (
          <li key={index} className="flex items-start gap-2">
            <CheckCircle size={20} className="text-[#1C42FF] flex-shrink-0 mt-1" />
            {resp}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default JobResponsibilities;