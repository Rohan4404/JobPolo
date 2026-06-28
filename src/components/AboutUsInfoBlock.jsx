// import React from "react";

// function AboutUsInfoBlock() {
//   return (
//     <section className="w-full bg-[#ffffff] flex justify-center">
//       <div className="max-w-[1700px] w-full px-6 md:px-12 lg:px-12 flex flex-col gap-10 py-[60px]">
//         {/* Top Content */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-8">
//           {/* Left Heading */}
//           <h1 className="font-[600] text-[32px] sm:text-[36px] lg:text-[40px] leading-[100%] tracking-normal text-[#000000] font-figtree text-left">
//             Et nunc ut tempus duis nisl sed massa
//           </h1>

//           {/* Right Paragraph */}
//           <p className="text-[#000000] text-[14px] sm:text-[15px] lg:text-[16px] leading-[24px] font-figtree text-left">
//             Nunc sed a nisl purus. Nibh dis faucibus proin lacus tristique. Sit
//             congue non vitae odio sit erat in. Felis eu ultrices a sed massa.
//             Commodo fringilla sed tempor risus laoreet ultricies ipsum.
//             Habitasse morbi faucibus in iaculis lectus. Nisi enim feugiat enim
//             volutpat. Sem quis viverra viverra odio mauris nunc.
//           </p>
//         </div>

//         {/* Blurred Image */}
//         <div className="w-full flex justify-center">
//           <div
//             className="w-full max-w-[1500px] h-[300px] sm:h-[500px] lg:h-[500px] rounded-[20px] bg-cover bg-center"
//             style={{
//               backgroundImage: "url('/images/NewAndBlogImage2.png')",
//             }}
//           ></div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default AboutUsInfoBlock;

import React from "react";
import { motion } from "framer-motion";

function AboutUsInfoBlock() {
  // ✅ Animation variants
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.2 } },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="w-full bg-[#ffffff] flex justify-center px-4 sm:px-6 md:px-6 lg:px-8">
      <motion.div
        className=" w-full  flex flex-col gap-10 py-[60px]"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Top Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-8">
          {/* Left Heading */}
          <motion.h1
            className="font-[600] text-[32px] sm:text-[36px] lg:text-[40px] leading-[120%] tracking-normal text-[#000000] font-figtree text-left"
            variants={item}
          >
            Connecting Talent with the Right Opportunities
          </motion.h1>

          {/* Right Paragraph */}
          <motion.p
            className="text-[#000000] text-[14px] sm:text-[15px] lg:text-[16px] leading-[24px] font-figtree text-left"
            variants={item}
          >
            {/* At Job Polo, we bridge the gap between job seekers and top companies
            by working closely with multiple HR professionals across industries.
            Our platform is designed to help employees find the right career
            opportunities faster, while giving companies access to a pool of
            talented candidates. With a network of trusted HR connections, we
            make the hiring process seamless, transparent, and efficient. */}
            DV HR is the most trusted recruitment consultancy upgraded into an
            online job portal in India. Founded in 2017, DV HR is known for
            excellent service in the recruitment industry. DV HR connects
            jobseekers and HR by accurately matching candidate profiles to the
            relevant job openings. DV HR aims to provide best possible job
            matching to candidates. DV HR is continuously working to fill the
            gap between talent & opportunities and provide end to-end
            recruitment solutions.
          </motion.p>
        </div>

        {/* Blurred Image */}

        <div className="hover-card">
          <motion.div
            className="w-full flex justify-center hover-card"
            variants={item}
          >
            <div
              className="w-full max-w-[1500px] h-[300px] sm:h-[500px] lg:h-[500px] rounded-[20px] bg-cover bg-center"
              style={{
                backgroundImage: "url('/images/NewAndBlogImage2.png')",
              }}
            ></div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default AboutUsInfoBlock;
