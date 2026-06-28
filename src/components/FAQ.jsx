// import React, { useState } from "react";
// import { IoIosAddCircleOutline } from "react-icons/io";
// import { IoCloseCircleOutline } from "react-icons/io5";
// import { faqs } from "../utlis/utlis";

// const FAQPage = () => {
//   const [openIndex, setOpenIndex] = useState(null);

//   const toggleFAQ = (index) => setOpenIndex(openIndex === index ? null : index);

//   return (
//     <div className="flex flex-col items-center w-full max-w-[1440px] mx-auto px-4 sm:px-6 pt-9 pb-[85px] gap-[40px] sm:gap-[60px]">
//       {/* Heading */}
//       <div className="text-center mb-1 px-2">
//         <h1 className="font-[Figtree] font-bold text-[28px] sm:text-[40px] lg:text-[50px] leading-[120%] text-[#000000]">
//           Frequently Asked Questions
//         </h1>
//         <p className="font-[Figtree] font-normal text-[14px] sm:text-[16px] leading-[150%] text-[#000000] mt-4 sm:mt-8">
//           At eu lobortis pretium tincidunt amet lacus ut aenean aliquet
//         </p>
//       </div>

//       {/* FAQ List */}
//       <div className="w-full max-w-[1296px] flex flex-col gap-4 sm:gap-6 px-2 sm:px-0">
//         {faqs.map((faq, index) => (
//           <div
//             key={faq.id}
//             className={`flex flex-col rounded-[20px] cursor-pointer border-b-[2px] border-[#1C42FF33] transition-all duration-300 sm:px-10 px-4 ${
//               openIndex === index ? "bg-[#1C42FF1A] py-6 sm:py-8" : "py-4"
//             }`}
//             onClick={() => toggleFAQ(index)}
//           >
//             <div className="flex justify-between items-start w-full gap-4">
//               {/* Number + Question */}
//               <div className="flex flex-1 items-start gap-4 sm:gap-6 text-left">
//                 {/* Number */}
//                 <span
//                   className={`shrink-0 font-[Inter] font-semibold text-[20px] sm:text-[28px] leading-[120%] ${
//                     openIndex === index ? "text-gradient" : "text-[#6C757D]"
//                   }`}
//                 >
//                   {faq.id}
//                 </span>

//                 {/* Question */}
//                 <span
//                   className={`font-[Figtree] font-semibold text-[16px] sm:text-[20px] lg:text-[24px] leading-[150%] text-left break-words ${
//                     openIndex === index ? "text-gradient" : "text-[#000000]"
//                   }`}
//                 >
//                   {faq.question}
//                 </span>
//               </div>

//               {/* Icon */}
//               <div className="flex items-center justify-center shrink-0">
//                 {openIndex === index ? (
//                   <IoCloseCircleOutline
//                     size={32}
//                     className="text-[#1C42FF] sm:w-10 sm:h-10"
//                   />
//                 ) : (
//                   <IoIosAddCircleOutline
//                     size={32}
//                     className="text-[#1C42FF] sm:w-10 sm:h-10"
//                   />
//                 )}
//               </div>
//             </div>

//             {/* Answer */}
//             {openIndex === index && (
//               <p className="font-[Figtree] font-normal text-[14px] sm:text-[16px] leading-[150%] mt-2 pl-[36px] sm:pl-[55px] break-words text-[#00000099] text-left w-full">
//                 {faq.answer}
//               </p>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FAQPage;
import React, { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoCloseCircleOutline } from "react-icons/io5";
import { faqs } from "../utlis/utlis";
import { motion, AnimatePresence } from "framer-motion";

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => setOpenIndex(openIndex === index ? null : index);

  // ✅ Animation variants
  const faqItem = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const answerVariants = {
    hidden: { opacity: 0, height: 0 },
    show: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  return (
    <div className="flex flex-col items-center w-full   pt-9 pb-[85px] gap-[40px] sm:gap-[60px] px-4 sm:px-6 md:px-6 lg:px-8">
      {/* Heading */}
      <div className="text-center mb-1 ">
        <motion.h1
          className="font-[Figtree] font-bold text-[28px] sm:text-[40px] lg:text-[50px] leading-[120%] text-[#000000]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          Frequently Asked Questions
        </motion.h1>
        <motion.p
          className="font-[Figtree] font-normal text-[14px] sm:text-[20px] leading-[150%] text-[#000000] mt-4 sm:mt-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        >
          Get answers to the most common questions about applying for jobs on
          our platform.
        </motion.p>
      </div>

      {/* FAQ List */}
      <div className="w-full max-w-[1500px] flex flex-col gap-4 sm:gap-6 ">
        {faqs.map((faq, index) => (
          <div key={faq.id || index} className="hover-card">
            <motion.div
              // key={}
              className={`flex flex-col rounded-[20px] cursor-pointer border-b-[2px] border-[#1C42FF33] transition-all duration-300 sm:px-12 px-4 transform hover:shadow-lg hover:scale-[1.02] hover:border-[#1C42FF66] ${
                openIndex === index ? "bg-[#1C42FF1A] py-6 sm:py-8" : "py-4"
              }`}
              onClick={() => toggleFAQ(index)}
              variants={faqItem}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="flex justify-between items-start w-full gap-4">
                {/* Number + Question */}
                <div className="flex flex-1 items-start gap-4 sm:gap-6 text-left">
                  <span
                    className={`shrink-0 font-[Inter] font-semibold text-[20px] sm:text-[28px] leading-[120%] transition-colors duration-300 ${
                      openIndex === index ? "text-gradient" : "text-[#6C757D]"
                    }`}
                  >
                    {faq.id}
                  </span>

                  <span
                    className={`font-[Figtree] font-semibold text-[16px] sm:text-[20px] lg:text-[24px] leading-[150%] text-left break-words transition-colors duration-300 ${
                      openIndex === index ? "text-gradient" : "text-[#000000]"
                    }`}
                  >
                    {faq.question}
                  </span>
                </div>

                {/* Icon */}
                <div className="flex items-center justify-center shrink-0 transition-transform duration-300">
                  {openIndex === index ? (
                    <IoCloseCircleOutline
                      size={32}
                      className="text-[#1C42FF] sm:w-10 sm:h-10 rotate-180 transition-transform duration-300"
                    />
                  ) : (
                    <IoIosAddCircleOutline
                      size={32}
                      className="text-[#1C42FF] sm:w-10 sm:h-10 transition-transform duration-300"
                    />
                  )}
                </div>
              </div>

              {/* Answer */}
              <AnimatePresence>
                {openIndex === index && (
                  <motion.p
                    className="font-[Figtree] font-normal text-[14px] sm:text-[16px] leading-[150%] mt-2 pl-[36px] sm:pl-[55px] break-words text-[#00000099] text-left w-full"
                    variants={answerVariants}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                  >
                    {faq.answer}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;
