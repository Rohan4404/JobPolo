// import { useState, useRef, useEffect } from "react";
// import { Menu, X } from "lucide-react";
// import { menuItems } from "../utlis/utlis";
// import { Link, useLocation } from "react-router-dom";

// const Navbar = () => {
//   const [open, setOpen] = useState(false);
//   const location = useLocation();
//   const sidebarRef = useRef(null);

//   const isActive = (path) => {
//     return location.pathname === path;
//   };

//   // Close on outside click
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
//         setOpen(false);
//       }
//     };

//     if (open) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [open]);

//   return (
//     <>
//       <header className="fixed w-full shadow-[0px_3px_8px_0px_#30968914] z-[100] bg-white text-[#000000]">
//         <div className="max-w-[91rem] mx-auto flex justify-between items-center px-4 sm:px-6 py-4">
//           {/* Logo */}
//           <Link to="/" className="flex-shrink-0">
//             <img
//               src="/icons/logo.png"
//               alt="Job Logo"
//               className="w-32 h-10 sm:w-36 sm:h-11 md:w-40 md:h-12 object-contain"
//             />
//           </Link>

//           {/* Desktop Menu - Centered */}
//           <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-8 lg:space-x-10">
//             {menuItems.map((item) => (
//               <Link
//                 key={item.id}
//                 to={item.href}
//                 className={`transition text-base font-medium whitespace-nowrap ${
//                   isActive(item.href) ? "" : "hover:text-[#021fb1]"
//                 }`}
//                 style={
//                   isActive(item.href)
//                     ? {
//                         background:
//                           "linear-gradient(90deg, #1c42ff 0%, #001478 100%)",
//                         WebkitBackgroundClip: "text",
//                         WebkitTextFillColor: "transparent",
//                         backgroundClip: "text",
//                       }
//                     : {}
//                 }
//               >
//                 {item.name}
//               </Link>
//             ))}
//           </nav>

//           {/* Desktop Auth Buttons */}
//           <div className="hidden md:flex space-x-4 items-center flex-shrink-0">
//             <Link
//               to="/login"
//               className="px-5 py-1.5 rounded-md hover:text-[#021fb1] text-base font-medium whitespace-nowrap"
//             >
//               Login
//             </Link>
//             <Link
//               to="/register"
//               className="px-5 py-2 rounded-md text-base font-medium text-white btn-gradient hover:opacity-90 transition whitespace-nowrap"
//             >
//               Register
//             </Link>
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setOpen(!open)}
//             className="md:hidden focus:outline-none z-20 relative"
//           >
//             {open ? <X size={28} /> : <Menu size={28} />}
//           </button>
//         </div>
//       </header>

//       {/* Mobile Sidebar Overlay */}
//       {open && (
//         <div
//           ref={sidebarRef}
//           className="md:hidden fixed inset-0 bg-black/90 z-50 flex flex-col justify-center items-center text-white transition-opacity duration-300"
//         >
//           {/* Inner Content Card for better contrast */}
//           <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 space-y-6 max-w-sm w-full mx-4">
//             {/* Mobile Menu Items */}
//             {menuItems.map((item, index) => (
//               <section key={index}>
//                 <Link
//                   to={item.href}
//                   className="block text-base sm:text-lg hover:text-[#021fb1] py-2 text-center"
//                   onClick={() => setOpen(false)}
//                 >
//                   {item.name}
//                 </Link>
//               </section>
//             ))}

//             {/* Mobile Auth Buttons */}
//             <div className="flex flex-col gap-3 mt-6 pt-6 border-t border-white/20">
//               <Link
//                 to="/login"
//                 className="px-4 py-2.5 rounded-md text-center hover:text-[#021fb1] font-medium text-black bg-white"
//                 onClick={() => setOpen(false)}
//               >
//                 Login
//               </Link>
//               <Link
//                 to="/register"
//                 className="px-4 py-2.5 rounded-md text-center text-white btn-gradient hover:opacity-90 transition-colors font-medium"
//                 onClick={() => setOpen(false)}
//               >
//                 Register
//               </Link>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Navbar;


import { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { menuItems } from "../utlis/utlis";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const sidebarRef = useRef(null);
  const transparentPages = ["/login", "/register"];
const isTransparent = transparentPages.includes(location.pathname);

  const isActive = (path) => {
    return location.pathname === path;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <>
      <header
  className={`fixed w-full z-[100] px-4 sm:px-6 md:px-6 lg:px-8 transition-all duration-300
  ${
    isTransparent
      ? "bg-transparent shadow-none"

      : "bg-white shadow-[0px_3px_8px_0px_#30968914]"
  }`}
>
        <div className=" flex justify-between items-center  py-4">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src="/icons/logo.png"
              alt="Job Logo"
              className="w-32 h-10 sm:w-36 sm:h-11 md:w-40 md:h-12 object-contain"
            />
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-10">
            {menuItems.map((item) => (
              <Link
                key={item.id}
                to={item.href}
                className={`relative group text-base font-semibold tracking-wide whitespace-nowrap  
                  transition-all duration-300 pb-1
                  ${!isTransparent && !isActive(item.href) && "hover:text-[#021fb1]"}
                `}
              >
                {/* TEXT WITH GRADIENT ON ACTIVE */}
               <span
  className={`
    inline-block transition-all duration-300 group-hover:-translate-y-[2px]
    ${
      isTransparent
        ? "text-black group-hover:text-transparent"
        : isActive(item.href)
        ? "!text-transparent"
        : ""
    }
  `}
  style={
    isTransparent
      ? {
          background: "linear-gradient(90deg, #1c42ff 0%, #001478 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "black",
        }
      : isActive(item.href)
      ? {
          background: "linear-gradient(90deg, #1c42ff 0%, #001478 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }
      : {}
  }
>
                  {item.name}
                </span>

                {/* Underline */}
                <span
                  className={`absolute left-0 -bottom-1 h-[2.5px] w-full rounded-full 
                    transition-all duration-300 origin-center
                    ${
                      isActive(item.href)
                        ? "bg-gradient-to-r from-[#1c42ff] to-[#001478] scale-100 shadow-[0_0_8px_#1c42ff]"
                        : "scale-0 bg-gradient-to-r from-[#89b3ff] to-[#001478] group-hover:scale-100 group-hover:shadow-[0_0_6px_#1c42ff]"
                    }
                  `}
                ></span>
              </Link>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex space-x-4 items-center flex-shrink-0">
            <Link
              to="/login"
              className="px-5 py-1.5 rounded-md hover:text-[#021fb1] text-base font-medium whitespace-nowrap"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-5 py-2 rounded-md text-base font-medium text-white btn-gradient hover:opacity-90 transition whitespace-nowrap"
            >
              Register
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden focus:outline-none z-20 relative"
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Sidebar */}
      {open && (
        <div
          ref={sidebarRef}
          className="md:hidden fixed inset-0 bg-black/90 z-50 flex flex-col justify-center items-center text-white transition-opacity duration-300"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 space-y-6 max-w-sm w-full mx-4">
            {menuItems.map((item, index) => (
              <section key={index}>
                <Link
                  to={item.href}
                  className="block text-base sm:text-lg hover:text-[#021fb1] py-2 text-center"
                  onClick={() => setOpen(false)}
                >
                  {item.name}
                </Link>
              </section>
            ))}

            <div className="flex flex-col gap-3 mt-6 pt-6 border-t border-white/20">
              <Link
                to="/login"
                className="px-4 py-2.5 rounded-md text-center hover:text-[#021fb1] font-medium text-black bg-white"
                onClick={() => setOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2.5 rounded-md text-center text-white btn-gradient hover:opacity-90 transition-colors font-medium"
                onClick={() => setOpen(false)}
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
