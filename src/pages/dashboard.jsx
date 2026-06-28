// import React from "react";
// import HeroSection from "../components/HeroSections";
// import JobsSection from "../components/JobsSection";
// import BrowseCategrySections from "../components/BrowseCategrySections";
// import GoodLifeSection from "../components/GoodLifeSection";
// import TerminalClientSection from "../components/TerminalClientSection";
// import NewsAndBlogPage from "../components/NewsAndBlogPage";
// import Footer from "../components/Footer";
// import Navbar from "../components/Navbar";

// const Dashboard = () => {
//   return (
//     <div
//       className="w-full min-h-screen custom-scrollbar flex flex-col gap-8"
//       style={{ maxHeight: "100vh", overflowY: "auto" }}
//     >
//       <section className="w-full">
//         <Navbar />
//       </section>
//       {/* Hero Section */}
//       <section className="w-full">
//         <HeroSection />
//       </section>
//       {/* Jobs Section */}
//       <section className="w-full">
//         <JobsSection />
//       </section>
//       {/* Browse Category Section */}
//       <section className="w-full">
//         <BrowseCategrySections />
//       </section>
//       {/* Good Life Section */}
//       <section className="w-full">
//         <GoodLifeSection />
//       </section>
//       {/* Terminal Client Section */}
//       <section className="w-full">
//         <TerminalClientSection />
//       </section>
//       {/* News and Blog Section */}
//       <section className="w-full">
//         <NewsAndBlogPage />
//       </section>
//       {/* Footer */}
//       <section className="w-full">
//         <Footer />
//       </section>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useState,useRef } from "react";
import HeroSection from "../components/HeroSections";
import JobsSection from "../components/JobsSection";
import BrowseCategrySections from "../components/BrowseCategrySections";
import GoodLifeSection from "../components/GoodLifeSection";
import TerminalClientSection from "../components/TerminalClientSection";
import NewsAndBlogPage from "../components/NewsAndBlogPage";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  // 🔥 Add these filters here
  const [filters, setFilters] = useState({
    keyword: "",
    location: "",
    category: "",
  });

  const [searchLoading, setSearchLoading] = useState(false);
const jobsRef = useRef(null);

const triggerSearch = () => {
  setSearchLoading(true);

  if (jobsRef.current) {
    jobsRef.current.scrollIntoView({ behavior: "smooth" });
  }

  setTimeout(() => {
    setSearchLoading(false);
  }, 700);
};

  return (
    <div
      className="w-full min-h-screen custom-scrollbar flex flex-col gap-8"
      style={{ maxHeight: "100vh", overflowY: "auto" }}
    >
      <section className="w-full">
        <Navbar />
      </section>

      {/* Hero Section → send filters + setFilters */}
      <section className="w-full">
        <HeroSection
  filters={filters}
  setFilters={setFilters}
  onSearch={triggerSearch}
/>

      </section>

      {/* Jobs Section → receive filters */}
      <section className="w-full" ref={jobsRef}>
  <JobsSection filters={filters} searchLoading={searchLoading} />
</section>


      <section className="w-full">
        <BrowseCategrySections />
      </section>

      <section className="w-full">
        <GoodLifeSection />
      </section>

      <section className="w-full">
        <TerminalClientSection />
      </section>

      <section className="w-full">
        <NewsAndBlogPage />
      </section>

      <section className="w-full">
        <Footer />
      </section>
    </div>
  );
};

export default Dashboard;
