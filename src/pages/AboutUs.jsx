import React from "react";
import AboutUsInfoBlock from "../components/AboutUsInfoBlock";
import HowItWorks from "../components/HowItWorks";
import GoodLifePlaySection from "../components/GoodLifePlaySection";
import FAQ from "../components/FAQ";
import NewsAndBlogPage from "../components/NewsAndBlogPage";
import Footer from "../components/Footer";
import AboutUsInforBlock2 from "../components/AboutUsInforBlock2";
import HeaderSection from "../components/HeaderSection";
import Navbar from "../components/Navbar";
import JobsHeroSection from "../components/JobsHeroSection";

function AboutUs() {
  return (
    <div
      className="w-full min-h-screen custom-scrollbar flex flex-col gap-8"
      style={{ maxHeight: "100vh", overflowY: "auto" }}
    >
      {/* <section className="w-full">
        <HeaderSection title="About Us" />
      </section> */}
      <section className="w-full">
        <Navbar />
        <JobsHeroSection
          title="About Us"
          subtitle="Learn more about our journey, mission, and the team behind the vision."
          py="py-12"
          px="px-6"
          className="mt-20"
        />
      </section>
      <section className="w-full">
        <AboutUsInfoBlock />
      </section>
      <section className="w-full">
        <HowItWorks />
      </section>
      <section className="w-full">
        <GoodLifePlaySection />
      </section>
      <section className="w-full">
        <FAQ />
      </section>
      <section className="w-full">
        <AboutUsInforBlock2 />
      </section>
      <section className="w-full">
        <NewsAndBlogPage />
      </section>
      <section className="w-full">
        <Footer />
      </section>
    </div>
  );
}

export default AboutUs;
