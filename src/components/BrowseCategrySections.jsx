import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getAllCategories } from "../api/service2";
import { Briefcase } from "lucide-react";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.2 } },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getAllCategories();
        setCategories(res.data.categories || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <section
      className="py-16 px-6 pt-6 mx-4 sm:mx-6 md:mx-6 lg:mx-8 rounded-2xl"
      style={{
        background:
          "linear-gradient(180deg, rgba(28, 66, 255, 0.2) 0%, rgba(0, 25, 148, 0.2) 100%)",
      }}
    >
      {/* Heading */}
      <motion.div
        className="text-left mb-12 max-w-4xl mx-auto"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.h2
          className="text-3xl md:text-4xl text-center font-bold text-gray-900"
          variants={item}
        >
          Browse by Category
        </motion.h2>

        <motion.p
          className="text-gray-600 mt-3 text-sm md:text-base text-center"
          variants={item}
        >
          Explore jobs by category to quickly find roles that match your skills
          and interests.
        </motion.p>
      </motion.div>

      {/* --- CATEGORY GRID --- */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:px-11 max-w-8xl mx-auto"
        variants={container}
        initial="hidden"
        whileInView="show"
      >
        {/* Loading Skeleton Cards */}
        {loading &&
          Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow p-8 min-h-[290px] animate-pulse flex flex-col items-center justify-center"
            >
              <div className="w-16 h-16 rounded-full bg-gray-300 mb-4"></div>
              <div className="w-32 h-4 bg-gray-300 rounded mb-3"></div>
              <div className="w-24 h-3 bg-gray-200 rounded mb-2"></div>
              <div className="w-16 h-3 bg-gray-200 rounded mb-4"></div>

              {/* Loading Text */}
              <p className="text-gray-500 text-sm font-medium mt-2">
                Loading...
              </p>
            </div>
          ))}

        {/* REAL CARDS */}
        {!loading &&
          categories.map((cat) => {
            const img = cat.categoryPreviewUrls;
            const name = cat.name;
            const desc = cat.description || "No description available";
            const jobsCount = cat.jobsCount || "N/A";

            return (
              <motion.div
                key={cat.id}
                className="bg-white rounded-xl shadow-[0px_3px_8px_0px_#30968914]
                p-8 flex flex-col items-center text-center min-h-[290px]
                hover:shadow-lg transition"
                variants={item}
              >
                <div className="mb-4">
                  {img ? (
                    <img
                      src={img}
                      alt={name}
                      className="w-16 h-16 rounded-full object-cover border"
                    />
                  ) : (
                    <Briefcase size={45} className="text-[#1C42FF]" />
                  )}
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {name}
                </h3>

                <p className="text-gray-600 text-sm mb-3 px-2 line-clamp-3">
                  {desc}
                </p>

                <span className="text-sm bg-[#E6F4F2] px-4 py-1 rounded-full">
                  {jobsCount} jobs
                </span>
              </motion.div>
            );
          })}
      </motion.div>
    </section>
  );
};

export default CategoriesPage;

// import React from "react";
// import { categories } from "../utlis/utlis";
// import { motion } from "framer-motion";

// const CategoriesPage = () => {
//   const container = {
//     hidden: {},
//     show: {
//       transition: { staggerChildren: 0.2 },
//     },
//   };

//   const item = {
//     hidden: { opacity: 0, y: 30 },
//     show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
//   };

//   return (
//     <section
//       className="py-16 px-6 pt-6"
//       style={{
//         background:
//           "linear-gradient(180deg, rgba(28, 66, 255, 0.2) 0%, rgba(0, 25, 148, 0.2) 100%)",
//       }}
//     >
//       {/* Heading */}
//       <motion.div
//         className="text-left mb-12 max-w-4xl mx-auto"
//         variants={container}
//         initial="hidden"
//         whileInView="show"
//         viewport={{ once: true, amount: 0.2 }}
//       >
//         <motion.h2
//           className="text-3xl md:text-4xl text-center font-bold text-gray-900"
//           variants={item}
//         >
//           Browse by Category
//         </motion.h2>
//         <motion.p
//           className="text-gray-600 mt-3 text-sm md:text-base text-center"
//           variants={item}
//         >
//           Explore jobs by category to quickly find roles that match your skills
//           and interests and grow your career opportunities.
//         </motion.p>
//       </motion.div>

//       {/* Grid */}
//       <motion.div
//         className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:pl-11 lg:pr-11 max-w-8xl mx-auto"
//         variants={container}
//         initial="hidden"
//         whileInView="show"
//         viewport={{ once: true, amount: 0.2 }}
//       >
//         {categories?.map((category, index) => {
//           const Icon = category.icon;
//           return (
//             <div key={category.id || index} className="hover-card">
//               {/* Motion div handles scroll animation only */}
//               <motion.div
//                 className="bg-white rounded-xl shadow-[0px_3px_8px_0px_#30968914]
//                 p-8 flex flex-col items-center justify-center text-center
//                 min-h-[275px]"
//                 variants={item}
//               >
//                 <div className="text-[#1C42FF] mb-4">
//                   <Icon size={45} />
//                 </div>
//                 <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                   {category?.name}
//                 </h3>
//                 <span className="text-sm bg-[#E6F4F2] text-gradient px-4 py-1 rounded-full">
//                   {category?.jobs} jobs
//                 </span>
//               </motion.div>
//             </div>
//           );
//         })}
//       </motion.div>
//     </section>
//   );
// };

// export default CategoriesPage;
