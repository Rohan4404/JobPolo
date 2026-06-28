import React, { useEffect, useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import ReactCountryFlag from "react-country-flag";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [countries, setCountries] = useState([]);
  const [selected, setSelected] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchCountries = async () => {
  //     try {
  //       const resp = await axios.get("https://restcountries.com/v3.1/all");
  //       const mapped = resp.data
  //         .map((c) => ({ name: c.name.common, code: c.cca2 }))
  //         .filter((c) => c.code && c.name)
  //         .sort((a, b) => a.name.localeCompare(b.name));
  //       setCountries(mapped);
  //       const defaultCountry = mapped.find((c) => c.code === "IN") || mapped[0];
  //       setSelected(defaultCountry);
  //     } catch (err) {
  //       console.error("Failed to load countries", err);
  //     }
  //   };
  //   fetchCountries();
  // }, []);

  const handleSelect = (country) => {
    setSelected(country);
    setDropdownOpen(false);
  };

  const handleNavClick = (item) => {
    if (item === "Dashboard") {
      navigate("/");
    }
    // Add other navigation logic if needed
  };

  return (
    <nav className="relative w-full bg-[#F1F2F4] shadow py-3 px-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between z-50">
      {/* Top row for mobile: Hamburger + phone */}
      <div className="flex justify-between sm:hidden items-center w-full mb-2">
        <button
          className="flex flex-col space-y-1"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="w-6 h-0.5 bg-gray-700"></span>
          <span className="w-6 h-0.5 bg-gray-700"></span>
          <span className="w-6 h-0.5 bg-gray-700"></span>
        </button>

        <div className="flex items-center space-x-4">
          <FaPhoneAlt className="text-blue-600" />
          <span className="text-sm font-medium">+91 8285714874</span>
        </div>
      </div>

      {/* Left nav items */}
      <ul
        className={`${
          menuOpen ? "flex" : "hidden"
        } sm:flex flex-col sm:flex-row w-full sm:w-auto bg-gray-50 sm:bg-transparent p-4 sm:p-0 space-y-2 sm:space-y-0 sm:space-x-6 rounded sm:rounded-none shadow sm:shadow-none`}
      >
        {[
          "Home",
          "Find Candidate",
          "Dashboard",
          "My Jobs",
          "Applications",
          "Customer Supports",
        ].map((item) => (
          <li
            key={item}
            onClick={() => handleNavClick(item)}
            className="hover:text-blue-600 cursor-pointer transition-colors duration-200 text-gray-700 text-sm sm:text-base"
          >
            {item}
          </li>
        ))}
      </ul>

      {/* Right side: country dropdown */}
      <div className="flex items-center space-x-4 mt-2 sm:mt-0">
        <div className="hidden sm:flex items-center text-gray-700">
          <FaPhoneAlt className="mr-2 text-blue-600" />
          <span className="font-medium text-sm">+91 8285714874</span>
        </div>

        <div className="relative">
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 transition"
          >
            {selected && (
              <ReactCountryFlag
                countryCode={selected.code}
                svg
                style={{ width: "1.5em", height: "1.5em" }}
                title={selected.name}
              />
            )}
            <span className="ml-2">{selected?.name || "Select Country"}</span>
            <IoMdArrowDropdown className="ml-1" />
          </button>
          {/* 
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 max-h-72 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              {countries.length > 0 ? (
                countries.map((c) => (
                  <div
                    key={c.code}
                    onClick={() => handleSelect(c)}
                    className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer"
                  >
                    <ReactCountryFlag
                      countryCode={c.code}
                      svg
                      style={{ width: "1.25em", height: "1.25em" }}
                      title={c.name}
                    />
                    <span className="ml-3 text-gray-800 text-sm">{c.name}</span>
                  </div>
                ))
              ) : (
                <p className="text-center py-2 text-gray-500 text-sm">
                  Loading countries...
                </p>
              )}
            </div>
          )} */}
        </div>
      </div>
    </nav>
  );
}
