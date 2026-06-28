// import React, { useState } from "react";

// const ContactForm = () => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     message: "",
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form submitted:", formData);
//   };

//   return (
//     <div className="w-full lg:w-1/2 bg-[#1C42FF1A] p-6 lg:p-8 rounded-2xl">
//       <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">
//         Contact Info
//       </h2>
//       <p className="text-gray-600 mb-6 text-sm text-center">
//         Nibh dis faucibus proin lacus tristique
//       </p>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <div>
//             <label
//               htmlFor="firstName"
//               className="block text-sm font-medium text-gray-700 mb-1 text-left"
//             >
//               First Name
//             </label>
//             <input
//               type="text"
//               id="firstName"
//               name="firstName"
//               placeholder="Your name"
//               value={formData.firstName}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1C42FF] bg-white"
//               required
//             />
//           </div>
//           <div>
//             <label
//               htmlFor="lastName"
//               className="block text-sm font-medium text-gray-700 mb-1 text-left"
//             >
//               Last Name
//             </label>
//             <input
//               type="text"
//               id="lastName"
//               name="lastName"
//               placeholder="Your last name"
//               value={formData.lastName}
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1C42FF] bg-white"
//               required
//             />
//           </div>
//         </div>
//         <div>
//           <label
//             htmlFor="email"
//             className="block text-sm font-medium text-gray-700 mb-1 text-left"
//           >
//             Email Address
//           </label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             placeholder="Your E-mail address"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1C42FF] bg-white"
//             required
//           />
//         </div>
//         <div>
//           <label
//             htmlFor="message"
//             className="block text-sm font-medium text-gray-700 mb-1 text-left"
//           >
//             Message
//           </label>
//           <textarea
//             id="message"
//             name="message"
//             placeholder="Your message..."
//             value={formData.message}
//             onChange={handleChange}
//             rows={4}
//             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1C42FF] bg-white"
//             required
//           ></textarea>
//         </div>
//         <button
//           type="submit"
//           className="btn-gradient w-full py-3 rounded-md text-white font-semibold"
//         >
//           Send Message
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ContactForm;


import React, { useState } from "react";
import { motion } from "framer-motion";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <motion.div 
      variants={item}
      initial="hidden"
      animate="show"
      className="w-full lg:w-1/2 bg-[#1C42FF1A] p-6 lg:p-8 rounded-2xl"
    >
      <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">
        Send Us a Message
      </h2>
      <p className="text-gray-600 mb-6 text-sm text-center">
        Have a question or ready to discuss an opportunity? Get in touch with our team—we're here to help and respond within 24 hours.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700 mb-1 text-left"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Your name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1C42FF] bg-white"
              required
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700 mb-1 text-left"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Your last name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1C42FF] bg-white"
              required
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1 text-left"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your E-mail address"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1C42FF] bg-white"
            required
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-1 text-left"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Your message..."
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1C42FF] bg-white"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="btn-gradient w-full py-3 rounded-md text-white font-semibold"
        >
          Send Message
        </button>
      </form>
    </motion.div>
  );
};

export default ContactForm;