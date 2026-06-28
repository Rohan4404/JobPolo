// import React from "react";

// const GoodLifeSection = () => {
//   return (
//     <section className="py-12 px-4 sm:px-6 md:px-8 lg:px-16">
//       {/* Top Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-8xl mx-auto">
//         {/* Left Image */}
//         <div>
//           <img
//             src="/images/GoodLifeLeftImg.png"
//             alt="Good Life"
//             className="rounded-2xl w-full h-64 sm:h-80 md:h-96 lg:h-[500px] object-cover shadow-lg"
//           />
//         </div>

//         {/* Right Content */}
//         <div className="flex flex-col items-start text-left mt-6 lg:mt-0">
//           <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-snug">
//             Good Life Begins With A Good Company
//           </h2>
//           <p className="text-gray-600 mt-4 text-sm sm:text-base md:text-lg">
//             Find the right company and opportunities that align with your goals.
//             Explore jobs, connect with top employers, and take your career to
//             the next level...
//           </p>

//           <div className="mt-6 flex flex-wrap gap-4">
//             <button className="btn-gradient text-white px-5 py-2 sm:px-6 sm:py-2.5 rounded-lg hover:bg-[#25796f] transition">
//               Search Job
//             </button>
//             <button className="text-gradient font-medium hover:underline">
//               Learn more
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Stats Section */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-8xl mx-auto mt-16">
//         {/* First Item - Start */}
//         <div className="flex flex-col justify-around text-left self-start h-full">
//           <h3 className="text-3xl sm:text-4xl font-bold text-gradient">12k+</h3>
//           <p className="text-gray-900 font-semibold mt-2 text-sm sm:text-base">
//             Clients worldwide
//           </p>
//           <p className="text-gray-600 text-xs sm:text-sm mt-1">
//             Trusted by thousands of clients across industries globally.
//           </p>
//         </div>

//         {/* Second Item - Center */}
//         <div className="flex flex-col justify-around text-left self-center h-full">
//           <h3 className="text-3xl sm:text-4xl font-bold text-gradient">20k+</h3>
//           <p className="text-gray-900 font-semibold mt-2 text-sm sm:text-base">
//             Active resumes
//           </p>
//           <p className="text-gray-600 text-xs sm:text-sm mt-1">
//             Thousands of professionals showcase their skills and experience.
//           </p>
//         </div>

//         {/* Third Item - End */}
//         <div className="flex flex-col justify-around text-left self-end h-full">
//           <h3 className="text-3xl sm:text-4xl font-bold text-gradient">18k+</h3>
//           <p className="text-gray-900 font-semibold mt-2 text-sm sm:text-base">
//             Companies
//           </p>
//           <p className="text-gray-600 text-xs sm:text-sm mt-1">
//             Top companies from various industries are hiring through us.
//           </p>
//         </div>
//       </div>

//       {/* Bottom Banner */}
//       <div className="bg-black rounded-2xl mt-16 overflow-hidden max-w-8xl mx-auto relative h-64 sm:h-80 md:h-50 lg:h-[410px]">
//         <img
//           src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=60&blur=50"
//           alt="Future"
//           className="absolute inset-0 w-full h-full object-cover opacity-50"
//         />
//         <div className="relative  p-6 sm:p-10 md:p-16 text-left flex flex-col justify-center h-full">
//           <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
//             Create A Better <br />
//             Future For Yourself
//           </h2>
//           <p className="text-gray-200 mt-4 max-w-full sm:max-w-lg md:max-w-xl text-xs sm:text-sm md:text-base">
//             Explore meaningful roles, connect with leading companies, and create
//             a career path that excites you.
//           </p>
//           <button className="mt-6 btn-gradient text-white px-5 py-2 sm:px-6 sm:py-2.5 rounded-lg hover:bg-[#25796f] transition w-max">
//             Search Job
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default GoodLifeSection;
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const GoodLifeSection = () => {
  const navigate = useNavigate();

  // ✅ Animation variants
  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.2 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="py-12 px-4 sm:px-6 md:px-6 lg:px-8">
      {/* Top Section */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-8xl mx-auto"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Left Image */}
        <motion.div variants={item}>
          <img
            src="/images/GoodLifeLeftImg.png"
            alt="Good Life"
            className="rounded-2xl w-full h-64 sm:h-80 md:h-96 lg:h-[500px] object-cover shadow-lg"
          />
        </motion.div>

        {/* Right Content */}
        <motion.div
          className="flex flex-col items-start text-left mt-6 lg:mt-0"
          variants={item}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-snug">
            Good Life Begins With A Good Company
          </h2>
          <p className="text-gray-600 mt-4 text-sm sm:text-base md:text-lg">
            Find the right company and opportunities that align with your goals.
            Explore jobs, connect with top employers, and take your career to
            the next level...
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            {/* ✅ Navigate to /jobs */}
            <button
              onClick={() => navigate("/jobs")}
              className="btn-gradient text-white px-5 py-2 sm:px-6 sm:py-2.5 rounded-lg hover:bg-[#25796f] transition"
            >
              Search Job
            </button>

            {/*Navigate to /about-us */}
            <button
              onClick={() => navigate("/about-us")}
              className="text-gradient font-medium hover:underline"
            >
              Learn more
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-8xl mx-auto mt-16"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div
          className="flex flex-col justify-around text-left self-start h-full"
          variants={item}
        >
          <h3 className="text-3xl sm:text-4xl font-bold text-gradient">12k+</h3>
          <p className="text-gray-900 font-semibold mt-2 text-sm sm:text-base">
            Clients worldwide
          </p>
          <p className="text-gray-600 text-xs sm:text-sm mt-1">
            Trusted by thousands of clients across industries globally.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col justify-around text-left self-center h-full"
          variants={item}
        >
          <h3 className="text-3xl sm:text-4xl font-bold text-gradient">20k+</h3>
          <p className="text-gray-900 font-semibold mt-2 text-sm sm:text-base">
            Active resumes
          </p>
          <p className="text-gray-600 text-xs sm:text-sm mt-1">
            Thousands of professionals showcase their skills and experience.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col justify-around text-left self-end h-full"
          variants={item}
        >
          <h3 className="text-3xl sm:text-4xl font-bold text-gradient">18k+</h3>
          <p className="text-gray-900 font-semibold mt-2 text-sm sm:text-base">
            Companies
          </p>
          <p className="text-gray-600 text-xs sm:text-sm mt-1">
            Top companies from various industries are hiring through us.
          </p>
        </motion.div>
      </motion.div>

      {/* Bottom Banner */}
      <motion.div
        className="bg-black rounded-2xl mt-16 overflow-hidden max-w-8xl mx-auto relative h-64 sm:h-80 md:h-50 lg:h-[410px]"
        variants={item}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <img
          src="/images/image4.png"
          alt="Future"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="relative p-6 sm:p-10 md:p-16 text-left flex flex-col justify-center h-full">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
            Create A Better <br />
            Future For Yourself
          </h2>
          <p className="text-gray-200 mt-4 max-w-full sm:max-w-lg md:max-w-xl text-xs sm:text-sm md:text-base">
            Explore meaningful roles, connect with leading companies, and create
            a career path that excites you.
          </p>
          <button
            onClick={() => navigate("/jobs")}
            className="mt-6 btn-gradient text-white px-5 py-2 sm:px-6 sm:py-2.5 rounded-lg hover:bg-[#25796f] transition w-max"
          >
            Search Job
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default GoodLifeSection;
