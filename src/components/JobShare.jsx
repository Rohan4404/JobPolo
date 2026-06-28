import React from "react";
import { motion } from "framer-motion";
import { FiFacebook, FiTwitter, FiLinkedin } from "react-icons/fi";

const JobShare = ({ job }) => {
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const shareUrl = `https://yourwebsite.com/job-detail/${job.id}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=Check out this exciting job opportunity: ${job.title} at ${job.company}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;

  return (
    <motion.div 
      variants={item}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="mb-12"
    >
      <h3 className="text-xl font-bold mb-4 text-left">Share Job:</h3>
      <div className="flex gap-4 text-left">
        <a href={facebookUrl} target="_blank" rel="noopener noreferrer">
          <FiFacebook size={24} className="text-[#1C42FF] cursor-pointer" />
        </a>
        <a href={twitterUrl} target="_blank" rel="noopener noreferrer">
          <FiTwitter size={24} className="text-[#1C42FF] cursor-pointer" />
        </a>
        <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
          <FiLinkedin size={24} className="text-[#1C42FF] cursor-pointer" />
        </a>
      </div>
    </motion.div>
  );
};

export default JobShare;