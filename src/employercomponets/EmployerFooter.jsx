import React from "react";

const EmployerFooter = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full h-[40px] bg-white border-t shadow-[inset_0px_1px_0px_0px_#E4E5E8] flex justify-center items-center px-6 sm:px-12 md:px-20 lg:px-40">
      <p className="text-[#767F8C] text-center text-sm sm:text-base">
        © {year} JOB Polo - Job Polo. All rights Reserved
      </p>
    </footer>
  );
};

export default EmployerFooter;
