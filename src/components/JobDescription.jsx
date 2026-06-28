import React from "react";
import { motion } from "framer-motion";

const JobDescription = ({ job }) => {
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <motion.div 
      variants={item}
      initial="hidden"
      animate="show"
      className="mb-6"
    >
      <h3 className="text-xl font-bold mb-4 text-left">Job Description</h3>
      <p className="text-gray-700 leading-relaxed text-left">
        {job?.description || "No detailed description is currently available for this particular job position."}
      </p>
    </motion.div>
  );
};

export default JobDescription;