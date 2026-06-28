// import React, { useState, useEffect } from "react";
// import { FaArrowRight } from "react-icons/fa";
// import { data } from "../utlis/utlis";

// import { getAllPosts, getAllCategories, getPostTypes } from "../api/service2";
// import { motion } from "framer-motion";

// export default function NewsAndBlog() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const postsPerPage = 10;
//   const totalPages = Math.ceil(data.length / postsPerPage);

//   const currentPosts = data.slice(
//     (currentPage - 1) * postsPerPage,
//     currentPage * postsPerPage,
//   );

//   const handleNext = () =>
//     currentPage < totalPages && setCurrentPage(currentPage + 1);
//   const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
//   const handlePageClick = (page) => setCurrentPage(page);

//   const [expanded, setExpanded] = useState({});
//   const toggleExpand = (id) =>
//     setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, [currentPage]);

//   const container = {
//     hidden: {},
//     show: { transition: { staggerChildren: 0.15 } },
//   };

//   const item = {
//     hidden: { opacity: 0, y: 30 },
//     show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
//   };

//   return (
//     <section className="w-full min-h-[60%] py-10  px-4 sm:px-6 md:px-6 lg:px-8 bg-[#ffffff]">
//       {/* Header */}
//       <motion.div
//         className="flex flex-col md:flex-row md:items-center md:justify-between mb-8"
//         variants={container}
//         initial="hidden"
//         whileInView="show"
//         viewport={{ once: true, amount: 0.3 }}
//       >
//         <motion.div className="text-left" variants={item}>
//           <h2 className="text-3xl md:text-4xl font-bold text-black">
//             News and Blog
//           </h2>
//           <p className="mt-2 text-gray-700 text-sm md:text-base max-w-2xl">
//             Stay updated with the latest career insights, recruitment tips, and
//             HR trends.
//           </p>
//         </motion.div>
//       </motion.div>

//       {/* Blog Cards */}
//       <motion.div
//         key={currentPage}
//         className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-items-center max-w-[1600px] mx-auto"
//         variants={container}
//         initial="hidden"
//         animate="show"
//       >
//         {currentPosts.map((itemData) => {
//           const isExpanded = expanded[itemData.id];
//           return (
//             <div className="hover-card" key={`${currentPage}-${itemData.id}`}>
//               <motion.div
//                 variants={item}
//                 className={`w-full max-w-[280px] bg-white rounded-2xl shadow-md transition-all duration-300 ease-in-out overflow-hidden flex flex-col hover:shadow-lg hover:scale-[1.02] ${
//                   isExpanded ? "shadow-lg scale-[1.02]" : ""
//                 }`}
//               >
//                 {/* Image */}
//                 <div className="relative overflow-hidden">
//                   <motion.img
//                     src={itemData.image}
//                     alt={itemData.title}
//                     className="w-full h-[160px] object-cover transition-transform duration-500 ease-in-out hover:scale-105"
//                   />
//                   <span className="absolute top-3 left-3 bg-[#1C42FF] text-white text-[10px] font-semibold px-2 py-1 rounded-full uppercase">
//                     {itemData.type}
//                   </span>
//                 </div>

//                 {/* Content */}
//                 <motion.div
//                   layout
//                   className={`flex flex-col flex-grow px-4 py-3 text-left transition-all duration-300 ease-in-out ${
//                     isExpanded ? "h-auto" : "min-h-[180px]"
//                   }`}
//                 >
//                   <p className="text-gray-500 text-xs mb-1">{itemData.date}</p>
//                   <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2">
//                     {itemData.title}
//                   </h3>

//                   {/* Text (conditionally expanded) */}
//                   <motion.p
//                     layout
//                     className={`text-gray-600 text-xs mt-1 transition-all duration-300 ease-in-out flex-grow ${
//                       isExpanded ? "line-clamp-none" : "line-clamp-3"
//                     }`}
//                   >
//                     {isExpanded ? itemData.fullText : itemData.shortText}
//                   </motion.p>

//                   <button
//                     onClick={() => toggleExpand(itemData.id)}
//                     className="mt-2 text-blue-600 text-xs font-medium flex items-center gap-1 hover:text-blue-700 transition-colors duration-200"
//                   >
//                     {isExpanded ? "Show less" : "Read more"}
//                     <FaArrowRight size={10} />
//                   </button>
//                 </motion.div>
//               </motion.div>
//             </div>
//           );
//         })}
//       </motion.div>

//       {/* Pagination */}
//       <div className="flex flex-col items-center mt-10 text-sm text-gray-600 gap-2">
//         <p>
//           Showing {(currentPage - 1) * postsPerPage + 1}-
//           {Math.min(currentPage * postsPerPage, data.length)} of {data.length}{" "}
//           posts
//         </p>
//         <div className="flex items-center gap-2 justify-center flex-wrap">
//           <button
//             onClick={handlePrev}
//             disabled={currentPage === 1}
//             className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100 transition-colors duration-200 ease-in-out"
//           >
//             Prev
//           </button>
//           {[...Array(totalPages)].map((_, idx) => (
//             <button
//               key={idx}
//               onClick={() => handlePageClick(idx + 1)}
//               className={`px-3 py-1 border rounded transition-all duration-200 ease-in-out ${
//                 currentPage === idx + 1
//                   ? "bg-[#1C42FF] text-white border-[#1C42FF]"
//                   : "hover:bg-gray-100"
//               }`}
//             >
//               {idx + 1}
//             </button>
//           ))}
//           <button
//             onClick={handleNext}
//             disabled={currentPage === totalPages}
//             className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100 transition-colors duration-200 ease-in-out"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }

import React, { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { data } from "../utlis/utlis";

import { getAllPosts, getAllCategories, getPostTypes } from "../api/service2";
import { motion } from "framer-motion";

export default function NewsAndBlog() {
  const [currentPage, setCurrentPage] = useState(1);

  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);

  console.log("all post is", posts);
  const postsPerPage = 10;
  const totalPages = pagination?.totalPages || 1;

  const currentPosts = data.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage,
  );

  const handleNext = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);
  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handlePageClick = (page) => setCurrentPage(page);

  const [expanded, setExpanded] = useState({});
  const toggleExpand = (id) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);

        const res = await getAllPosts({
          page: currentPage,
          limit: postsPerPage,
          is_active: true,
        });

        // console.log("res is", res);

        setPosts(res?.data?.list || []);
        setPagination(res?.pagination || {});
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage]);

  return (
    <section className="w-full min-h-[60%] py-10 px-4 sm:px-6 md:px-6 lg:px-8 bg-[#ffffff]">
      {/* Header */}
      <motion.div
        className="flex flex-col md:flex-row md:items-center md:justify-between mb-8"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div className="text-left" variants={item}>
          <h2 className="text-3xl md:text-4xl font-bold text-black">
            News and Blog
          </h2>
          <p className="mt-2 text-gray-700 text-sm md:text-base max-w-2xl">
            Stay updated with the latest career insights, recruitment tips, and
            HR trends.
          </p>
        </motion.div>
      </motion.div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-10 h-10 border-4 border-[#1C42FF] border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {/* Blog Cards */}
          <motion.div
            key={currentPage}
            className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center max-w-[1600px] mx-auto"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {posts.map((itemData) => {
              const isExpanded = expanded[itemData.id];

              return (
                <div className="hover-card" key={itemData.id}>
                  <motion.div
                    variants={item}
                    className={` w-[18vw] bg-white rounded-2xl shadow-md transition-all duration-300 overflow-hidden flex flex-col hover:shadow-lg hover:scale-[1.02] ${
                      isExpanded ? "shadow-lg scale-[1.02]" : ""
                    }`}
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden">
                      <motion.img
                        src={itemData.postPreviewUrls?.[0]}
                        alt={itemData.title}
                        className="w-full h-[200px] sm:h-[220px] object-cover transition-transform duration-500 hover:scale-105"
                      />

                      {/* Post Type Badge */}
                      <span className="absolute top-3 left-3 bg-[#1C42FF] text-white text-[10px] font-semibold px-2 py-1 rounded-full uppercase">
                        {itemData.postType?.name}
                      </span>
                    </div>

                    {/* Content */}
                    <motion.div
                      layout
                      className={`flex flex-col flex-grow px-4 py-3 text-left transition-all duration-300 ${
                        isExpanded ? "h-auto" : "min-h-[180px]"
                      }`}
                    >
                      {/* Date */}
                      <p className="text-gray-500 text-xs mb-1">
                        {new Date(itemData.createdAt).toLocaleDateString()}
                      </p>

                      {/* Title */}
                      <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2">
                        {itemData.title}
                      </h3>

                      {/* Description */}
                      <motion.p
                        layout
                        className={`text-gray-600 text-xs mt-1 flex-grow ${
                          isExpanded ? "line-clamp-none" : "line-clamp-3"
                        }`}
                      >
                        {isExpanded
                          ? itemData.content
                          : itemData.shortDescription}
                      </motion.p>

                      {/* Expand Button */}
                      <button
                        onClick={() => toggleExpand(itemData.id)}
                        className="mt-2 text-blue-600 text-xs font-medium flex items-center gap-1 hover:text-blue-700"
                      >
                        {isExpanded ? "Show less" : "Read more"}
                        <FaArrowRight size={10} />
                      </button>
                    </motion.div>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>

          {/* Pagination */}
          <div className="flex flex-col items-center mt-10 text-sm text-gray-600 gap-2">
            <p>
              Showing {(currentPage - 1) * postsPerPage + 1} -
              {Math.min(
                currentPage * postsPerPage,
                pagination?.totalRecords || 0,
              )}{" "}
              of {pagination?.totalRecords || 0} posts
            </p>

            <div className="flex items-center gap-2 justify-center flex-wrap">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100"
              >
                Prev
              </button>

              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePageClick(idx + 1)}
                  className={`px-3 py-1 border rounded ${
                    currentPage === idx + 1
                      ? "bg-[#1C42FF] text-white border-[#1C42FF]"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}

              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
