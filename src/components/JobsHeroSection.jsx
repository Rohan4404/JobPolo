import React from "react";

const JobsHeroSection = ({
  title = "Jobs",
  subtitle = "Find the perfect opportunity by filtering categories, location, salary and more.",
  bgClass = "bg_theme",
  textColor = "text-[var(--text)]",
  py = "py-12",
  px = "px-6",
  className = "", // <-- add this
}) => {
  return (
    <div className={`${bgClass} ${py} ${px} text-center ${className}`}>
      <h1 className={`text-3xl md:text-5xl font-bold ${textColor}`}>{title}</h1>
      <p className={`mt-3 text-gray-600 text-sm md:text-base ${textColor}`}>
        {subtitle}
      </p>
    </div>
  );
};
export default JobsHeroSection;
