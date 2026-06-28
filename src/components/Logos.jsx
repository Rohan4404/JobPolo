import React from "react";
import { logos } from "../utlis/utlis";

export default function Logos() {
  return (
    <section className="relative py-[1rem] bg_theme overflow-hidden">
      {/* Left & Right Fade Masks */}
      <div className="pointer-events-none absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#ffffff] to-transparent z-10"></div>
      <div className="pointer-events-none absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#ffffff] to-transparent z-10"></div>

      {/* Scrolling Logos */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex w-max animate-infinite-marquee">
          {[...logos, ...logos].map((logo, index) => (
            <div
              key={index}
              className="flex items-center justify-center px-8 shrink-0"
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="w-20 h-20 object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
