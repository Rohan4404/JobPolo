import React from "react";
import { motion } from "framer-motion";
import JobsHeroSection from "../components/JobsHeroSection";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PrivacyPolicy = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div
      className="w-full min-h-screen  flex flex-col"
      // style={{ maxHeight: "100vh", overflowY: "auto" }}
    >
      {/* Header Section */}
      <section className="w-full">
       
        <JobsHeroSection
          title="Privacy Policy"
          subtitle="Your privacy is important to us. Learn how we collect, use, and protect your information."
          py="py-12"
          px="px-6"
          className="mt-20"
        />
      </section>

      {/* Main Content Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="w-full bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div variants={itemVariants} className="space-y-12">
            {/* Introduction */}
            <motion.div 
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
            >
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text text-transparent text-left">
                Introduction
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg text-left">
                Welcome to www.jobpolo.com (the "Site"), owned and operated by DVHR TECH PVT. LTD. ("DVHR TECH PVT. LTD.", "we", "our", "us"). We are committed to protecting your privacy and maintaining the confidentiality of your personal information. This Privacy Policy explains how we collect, use, and share personal and non-personal data when you visit or use our online and mobile services, websites, and software (collectively, the "Services"). By accessing or using our Site, you agree to this Privacy Policy. Please read it carefully to understand our approach to your data.
              </p>
            </motion.div>

            {/* Changes to This Privacy Policy */}
            <motion.div 
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
            >
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text text-transparent text-left">
                Changes to This Privacy Policy
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg text-left">
                This Privacy Policy may be updated from time to time. We encourage you to review this page periodically for changes. Your continued use of the Site constitutes your acceptance of any updates to this Policy.
              </p>
            </motion.div>

            {/* What Information Do We Collect */}
            <motion.div 
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
            >
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text text-transparent text-left">
                What Information Do We Collect?
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg mb-6 text-left">
                We collect personal and non-personal data from you, third parties, and automatically through our Site and mobile applications.
              </p>
              
              <div className="space-y-6">
                <div className="border-l-4 border-blue-600 pl-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-left">
                    1. Personal Information:
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-3 text-left">
                    When you use our Services, you may provide us with personal data, including but not limited to:
                  </p>
                  <ul className="space-y-2 text-gray-700 text-lg">
                    <li className="flex items-start text-left">
                      <span className="text-blue-600 mr-3 mt-1">•</span>
                      <span>Name, email address, phone number, age, occupation, and contact details.</span>
                    </li>
                    <li className="flex items-start text-left">
                      <span className="text-blue-600 mr-3 mt-1">•</span>
                      <span>Financial data such as credit card or billing information.</span>
                    </li>
                    <li className="flex items-start text-left">
                      <span className="text-blue-600 mr-3 mt-1">•</span>
                      <span>Demographic data such as location, preferences, and interests.</span>
                    </li>
                    <li className="flex items-start text-left">
                      <span className="text-blue-600 mr-3 mt-1">•</span>
                      <span>Resume information, if you are a job seeker.</span>
                    </li>
                  </ul>
                </div>

                <div className="border-l-4 border-blue-600 pl-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-left">
                    2. Non-Personal Information:
                  </h3>
                  <ul className="space-y-2 text-gray-700 text-lg">
                    <li className="flex items-start text-left">
                      <span className="text-blue-600 mr-3 mt-1">•</span>
                      <span>Information about your device, such as IP address, browser type, and operating system.</span>
                    </li>
                    <li className="flex items-start text-left">
                      <span className="text-blue-600 mr-3 mt-1">•</span>
                      <span>User behavior data such as pages visited, search queries, and interactions with the Site.</span>
                    </li>
                  </ul>
                </div>

                <div className="border-l-4 border-blue-600 pl-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-left">
                    3. Third-Party Information:
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-lg text-left">
                    We may also collect data from third-party sources, including social media platforms or other services that you link to your profile.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* How We Collect Information */}
            <motion.div 
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
            >
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text text-transparent text-left">
                How We Collect Information
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg mb-6 text-left">
                We collect data in various ways:
              </p>
              <ul className="space-y-4 text-gray-700 text-lg">
                <li className="flex items-start text-left">
                  <span className="text-blue-600 mr-3 mt-1">•</span>
                  <span><strong className="text-gray-900">Directly from You:</strong> When you register on our Site, respond to communications, or fill out forms.</span>
                </li>
                <li className="flex items-start text-left">
                  <span className="text-blue-600 mr-3 mt-1">•</span>
                  <span><strong className="text-gray-900">Automatically:</strong> Through cookies, web beacons, and third-party tools that track your activity.</span>
                </li>
                <li className="flex items-start text-left">
                  <span className="text-blue-600 mr-3 mt-1">•</span>
                  <span><strong className="text-gray-900">From Third Parties:</strong> When you link social media accounts or use third-party services available on our Site.</span>
                </li>
              </ul>
            </motion.div>

            {/* Cookies and Other Tracking Technologies */}
            <motion.div 
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
            >
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text text-transparent text-left">
                Cookies and Other Tracking Technologies
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg text-left">
                Our Site uses cookies and similar technologies to enhance your experience. Cookies collect information such as browsing behavior, device type, and preferences. You can control cookie settings in your browser, but blocking or deleting cookies may affect your ability to use certain features of the Site.
              </p>
            </motion.div>

            {/* Google Analytics */}
            <motion.div 
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
            >
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text text-transparent text-left">
                Google Analytics
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg text-left">
                We use Google Analytics to track and report on Site traffic. This service helps us understand how you use the Site and improve your experience. You can opt out of Google Analytics by installing the opt-out browser add-on.
              </p>
            </motion.div>

            {/* Links to Other Sites */}
            <motion.div 
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
            >
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text text-transparent text-left">
                Links to Other Sites
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg text-left">
                Our Site may contain links to third-party websites that are not operated by us. We are not responsible for the privacy practices or content of those sites. We encourage you to read the privacy policies of any third-party sites you visit.
              </p>
            </motion.div>

            {/* Use of Information */}
            <motion.div 
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
            >
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text text-transparent text-left">
                Use of Information
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg mb-6 text-left">
                We use the information we collect to:
              </p>
              <ul className="space-y-3 text-gray-700 text-lg">
                <li className="flex items-start text-left">
                  <span className="text-blue-600 mr-3 mt-1">•</span>
                  <span>Improve and customize our Site and services.</span>
                </li>
                <li className="flex items-start text-left">
                  <span className="text-blue-600 mr-3 mt-1">•</span>
                  <span>Send you marketing communications, newsletters, and updates.</span>
                </li>
                <li className="flex items-start text-left">
                  <span className="text-blue-600 mr-3 mt-1">•</span>
                  <span>Provide customer support and assist with job placements.</span>
                </li>
                <li className="flex items-start text-left">
                  <span className="text-blue-600 mr-3 mt-1">•</span>
                  <span>Prevent fraudulent or illegal activities.</span>
                </li>
                <li className="flex items-start text-left">
                  <span className="text-blue-600 mr-3 mt-1">•</span>
                  <span>Comply with legal obligations and enforce our agreements.</span>
                </li>
              </ul>
            </motion.div>

            {/* Resume Information */}
            <motion.div 
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
            >
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text text-transparent text-left">
                Resume Information
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg text-left">
                If you choose to make your resume visible on the Site, potential employers can view it. You may also receive notifications when an employer is interested in your profile. You have the option to keep your resume confidential or make it visible. However, once visible, we cannot control how third parties use your resume.
              </p>
            </motion.div>

            {/* Changing Your Personal Information */}
            <motion.div 
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
            >
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text text-transparent text-left">
                Changing Your Personal Information
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg text-left">
                You can access and modify your personal information at any time by logging into your account. If you wish to close your account, we will delete your personal information as required by law, except where retention is necessary for legal or contractual purposes.
              </p>
            </motion.div>

            {/* Information Within Our Corporate Group or Business Transfer */}
            <motion.div 
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
            >
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text text-transparent text-left">
                Information Within Our Corporate Group or Business Transfer
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg text-left">
                We may share your information with affiliates within our corporate group or in connection with a sale, merger, or other business transfer.
              </p>
            </motion.div>

            {/* How Long Do We Store Your Information */}
            <motion.div 
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
            >
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text text-transparent text-left">
                How Long Do We Store Your Information?
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg text-left">
                We retain your personal information only as long as necessary to fulfill our obligations or as required by law. When we no longer need your data, we will delete it or anonymize it.
              </p>
            </motion.div>

            {/* Account Protection */}
            <motion.div 
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
            >
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text text-transparent text-left">
                Account Protection
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg text-left">
                You are responsible for maintaining the security of your account. If you believe your account has been compromised, you should change your password immediately.
              </p>
            </motion.div>

            {/* Children's Personal Information */}
            <motion.div 
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
            >
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text text-transparent text-left">
                Children's Personal Information
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg text-left">
                Our Site is not intended for children under the age of 18. We do not knowingly collect personal data from children under 18.
              </p>
            </motion.div>

            {/* Security */}
            <motion.div 
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
            >
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text text-transparent text-left">
                Security
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg text-left">
                We use industry-standard security measures to protect your personal information. However, no method of data transmission or storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </motion.div>

            {/* Contact Us - CENTERED */}
            <motion.div 
              variants={itemVariants}
              className="bg-gradient-to-r from-blue-600 to-blue-900 rounded-2xl shadow-lg p-8 text-white text-center"
            >
              <h2 className="text-3xl font-bold mb-6">
                Contact Us
              </h2>
              <p className="leading-relaxed text-lg mb-6">
                For any questions or concerns regarding this Privacy Policy, please contact us at:
              </p>
              <div className="space-y-6 max-w-2xl mx-auto">
                <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                  <p className="font-semibold text-xl mb-3">Mailing Address:</p>
                  <p className="text-lg leading-relaxed">
                    8th Floor, Unit No -887, Gaur City Mall,<br />
                    Greater Noida W Rd, Gaur City 1, Sector 4,<br />
                    Noida, Ghaziabad, Uttar Pradesh 201301
                  </p>
                </div>
                <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                  <p className="font-semibold text-xl mb-3">Email Address:</p>
                  <a href="mailto:verify@jobpolo.com" className="text-lg hover:underline">
                    verify@jobpolo.com
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      
    </div>
  );
};

export default PrivacyPolicy;