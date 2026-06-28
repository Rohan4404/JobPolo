import React from "react";
import Navbar from "../components/Navbar";

export default function HeaderSection({ title }) {
  return (
    <div className="w-full flex flex-col items-center bg-[linear-gradient(360deg,rgba(187,198,255,0.2)_6.99%,rgba(255,255,255,0.2)_100%)]">
      {/* Navbar Container */}
      <div className="w-full max-w-[1296px] flex justify-between items-center py-5 px-6 md:px-0">
        <Navbar />
      </div>

      {/* Dynamic Title Section */}
      <div className="w-full max-w-[1440px] flex justify-center items-center px-6 md:px-[166px] pb-10 md:pb-[40px] h-[200px] md:h-[322px]">
        <h1 className="font-[Figtree] font-bold text-[36px] md:text-[50px] lg:text-[60px] leading-[100%] tracking-[0%] text-center text-black">
          {title}
        </h1>
      </div>
    </div>
  );
}
