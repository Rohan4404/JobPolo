import React from "react";
import { motion } from "framer-motion";
import JobsHeroSection from "../components/JobsHeroSection";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const TermsConditions = () => {
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
          title="Terms & Conditions"
          subtitle="Please read these terms and conditions carefully before using our service."
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
            {/* Important Disclaimer */}
            <motion.div 
              variants={itemVariants}
              className="bg-red-50 border-l-4 border-red-600 rounded-2xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold mb-4 text-red-900 text-left">
                Important Notice
              </h2>
              <p className="text-red-800 leading-relaxed text-lg text-left font-semibold">
                "WE DO NOT GUARANTEE OR OFFER ANY WARRANTY OF ANY INTERVIEW CALLS OR ASSURE ANY JOB OFFERS WITH ANY OF OUR SERVICES OR FROM ANY PROSPECTIVE EMPLOYER/ORGANIZATION WHICH DOWNLOADS THE RESUME/INSERTION OR INFORMATION/DATA AND USES IT TO CONTACT THE USER. THE USER IS ADVISED TO BE CAUTIOUS OF CALLS/EMAILS ASKING FOR PAYMENT FROM OTHER WEBSITES THAT CLAIM TO OFFER SIMILAR SERVICES UNDER THE NAME OF WWW.JOBPOLO.COM"
              </p>
            </motion.div>

            {/* Introduction */}
            <motion.div 
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
            >
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text text-transparent text-left">
                Introduction
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg text-left mb-4">
                PLEASE READ THESE TERMS AND CONDITIONS OF USE CAREFULLY. BY ACCESSING THIS WEBSITE AND ANY PAGES THEREOF, YOU AGREE TO BE BOUND BY THE TERMS AND CONDITIONS OF USE BELOW AND/OR ANY SUCH TERMS AND CONDITIONS OF USE AS ARE COMMUNICATED ON THE PAGES THEREOF. IF YOU DO NOT AGREE TO THE TERMS AND CONDITIONS OF USE BELOW AND/OR ANY SUCH TERMS AND CONDITIONS OF USE AS ARE COMMUNICATED ON THE PAGES THEREOF, DO NOT ACCESS THIS WEBSITE, OR ANY PAGES THEREOF.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg text-left">
                These Terms & Conditions of Use are published in accordance with the Information Technology Act, 2000 and provisions of Rule 3 (1) of the Information Technology (Intermediaries guidelines) Rules, 2011, regulations, guidelines, bye laws and notifications made thereafter that require publishing the rules and regulations, privacy policy and Terms & Conditions of Use for access or usage of this website. The domain name www.jobpolo.com (Website) is owned and operated by DVHR Tech Pvt. Ltd. By accessing this Website or any of its pages, you are agreeing to these Terms & Conditions of Use.
              </p>
            </motion.div>

            {/* Definitions */}
            <motion.div 
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
            >
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text text-transparent text-left">
                Definitions
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg text-left">
                For the purpose of these Terms & Conditions of Use, wherever the context so requires "You" or "User" shall mean any natural or legal person who has agreed to become a User of the Website by providing Registration Data while registering on the Website as Registered User while assessing or feeding any resume and or insertion or information or data into the computers, computer systems or computer network of DVHR Tech Pvt. Ltd. Website allows the User to surf the Website or making purchases without registering on the Website. The term "We", "Us", "Our" shall mean DVHR Tech Pvt. Ltd.
              </p>
            </motion.div>

            {/* Website Usage */}
            <motion.div 
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
            >
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text text-transparent text-left">
                Website Usage
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg text-left mb-4">
                The Website is made available for use only by a person or individual searching for job or employment/job openings ("Job Seeker/User"). The Website is made also available for use by various persons, individuals and/or organizations seeking information related to hiring or seeking to make available information regarding employment openings, on their behalf or other's behalf ("Employer/User").
              </p>
              <p className="text-gray-700 leading-relaxed text-lg text-left">
                When you use any of the services provided by Us through the Website, including but not limited to job postings, resume services etc. You will be subject to the rules, guidelines, policies, terms, and conditions applicable to such service, and they shall be deemed to be incorporated into this Terms & Conditions of Use and shall be considered as part and parcel of this Terms & Conditions of Use. We reserve the right, at our sole discretion, to change, modify, add or remove portions of these Terms & Conditions of Use, at any time without any prior written notice to You.
              </p>
            </motion.div>

            {/* Links and Pages */}
            <motion.div 
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
            >
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text text-transparent text-left">
                Links and Pages
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg text-left">
                THIS WEBSITE MAY CONTAIN LINKS AND PAGES TO WEBSITES CONTROLLED OR OFFERED BY THIRD PARTY. WE HEREBY DISCLAIM LIABILITY FOR, ANY INFORMATION, MATERIALS, PRODUCTS OR SERVICES POSTED OR OFFERED AT ANY OF THE THIRD PARTY WEBSITES LINKED TO THIS WEBSITE. WE DO NOT ENDORSE OR RECOMMEND ANY PRODUCTS OR SERVICES OFFERED OR INFORMATION CONTAINED AT THAT WEBSITE, NOR ARE WE LIABLE FOR ANY FAILURE OF PRODUCTS OR SERVICES OFFERED OR ADVERTISED AT THOSE WEBSITES.
              </p>
            </motion.div>

            {/* Membership Eligibility */}
            <motion.div 
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
            >
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text text-transparent text-left">
                Membership Eligibility
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg text-left">
                Use of the Website is available only to persons who can form legally binding contracts under Indian Contract Act, 1872. Persons who are "incompetent to contract" within the meaning of the Indian Contract Act, 1872 including minors, un-discharged insolvents etc. are not eligible to use the Website. If you are a minor i.e. under the age of 18 years, you shall not register as a User of the Website and shall not transact on or use the Website. We reserve the right to terminate your membership and/or refuse to provide You with access to the Website if it is brought to our notice or if it is discovered that You are under the age of 18 years.
              </p>
            </motion.div>

            {/* Account and Registration Obligations */}
            <motion.div 
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
            >
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text text-transparent text-left">
                Your Account and Registration Obligations
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg text-left">
                If you use the Website, You shall be responsible for maintaining the confidentiality of your Display Name, username and Password and You shall be responsible for all activities that occur under your Display Name, username and Password. You agree that if You provide any information that is untrue, inaccurate, not current or incomplete or We have reasonable grounds to suspect that such information is untrue, inaccurate, not current or incomplete, or not in accordance with the this Terms and Conditions of Use, We shall have the right to indefinitely suspend or terminate or block access of your membership on the Website and refuse to provide You with access to the Website.
              </p>
            </motion.div>

            {/* Platform for Transaction and Communication */}
            <motion.div 
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
            >
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text text-transparent text-left">
                Platform for Transaction and Communication
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg text-left mb-6">
                The Website is a platform that Users and or Job Seekers and Employers utilize for taking services with respect to services provided by us and they interact with one another for their transactions. We are not and cannot be a party to or control in any manner any transaction between the Website's Users or transaction between Job Seekers and Employers.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg text-left font-semibold mb-4">
                Henceforward:
              </p>
              <ul className="space-y-3 text-gray-700 text-lg">
                <li className="flex items-start text-left">
                  <span className="text-blue-600 mr-3 mt-1">•</span>
                  <span>All commercial/contractual terms are offered by and agreed to between Users of the Website alone.</span>
                </li>
                <li className="flex items-start text-left">
                  <span className="text-blue-600 mr-3 mt-1">•</span>
                  <span>We do not make any representation or Warranty as to specifics (such as quality, value, salability, etc.) of the services proposed to be sold or offered to be sold or purchased on the Website of the third party.</span>
                </li>
                <li className="flex items-start text-left">
                  <span className="text-blue-600 mr-3 mt-1">•</span>
                  <span>The User shall not upload, post, transmit, publish, or distribute any material or information that is unlawful, or which may potentially be perceived as being harmful, threatening, abusive, harassing, defamatory, libelous, vulgar, obscene, or racially, ethnically, or otherwise objectionable.</span>
                </li>
              </ul>
            </motion.div>

            {/* Use of the Website */}
            <motion.div 
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
            >
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text text-transparent text-left">
                Use of the Website
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg text-left mb-6">
                You are requesting and authorizing Us to make available your resume to any Employer/User/Person that may have an interest in your resume by creating a public resume through the Website. We may also automatically recommend You the jobs via the e-mail or messages. You agree, undertake and confirm that your use of Website shall be strictly governed by the following binding principles:
              </p>
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-left">
                  You shall not host, display, upload, modify, publish, transmit, update or share any information which:
                </h3>
                <ul className="space-y-3 text-gray-700 text-lg">
                  <li className="flex items-start text-left">
                    <span className="text-blue-600 mr-3 mt-1">•</span>
                    <span>Belongs to another person and to which You do not have any right to</span>
                  </li>
                  <li className="flex items-start text-left">
                    <span className="text-blue-600 mr-3 mt-1">•</span>
                    <span>Is grossly harmful, harassing, blasphemous, defamatory, obscene, pornographic, paedophilic, libellous, invasive of another's privacy, hateful, or racially, ethnically objectionable</span>
                  </li>
                  <li className="flex items-start text-left">
                    <span className="text-blue-600 mr-3 mt-1">•</span>
                    <span>Infringes any patent, trademark, copyright or other proprietary rights</span>
                  </li>
                  <li className="flex items-start text-left">
                    <span className="text-blue-600 mr-3 mt-1">•</span>
                    <span>Contains software viruses or any other computer code, files or programs designed to interrupt, destroy or limit the functionality of any computer resource</span>
                  </li>
                  <li className="flex items-start text-left">
                    <span className="text-blue-600 mr-3 mt-1">•</span>
                    <span>Threatens the unity, integrity, defense, security or sovereignty of India</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Consent to Use of Data */}
            <motion.div 
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
            >
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text text-transparent text-left">
                Consent to Use of Data
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg text-left mb-4">
                You agree that We can collect certain personal information about you such as your IP Address, etc. and can automatically store it in the database of the Website. However, if You register yourself on the Website, you shall be required to provide certain personal information for the registration and/or access the web pages.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg text-left">
                You agree and consent that any synchronization of your social media accounts with that of User account shall be available to be viewed by other recruiters, employers, User and third parties for the purposes of providing services and other related activities.
              </p>
            </motion.div>

            {/* Privacy */}
            <motion.div 
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
            >
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text text-transparent text-left">
                Privacy
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg text-left mb-4">
                We view protection of your privacy as a very important principle. We understand clearly that You and your Personal Information is one of Our most important assets. We store and process your Information including any sensitive financial information collected (as defined under the Information Technology Act, 2000), if any, on computers that may be protected by physical as well as reasonable technological security measures and procedures in accordance with Information Technology Act 2000 and Rules there under.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg text-left">
                Further User hereby express that it has no objection upon any call/SMS/Communication by Us, any third party on its behalf or any other party authorized by Us, communicating to User with regard to the Services & Products like Job Search, Job Alert, JobPolo Career Services etc. Notwithstanding User's registration with National Do Not Call Registry, User hereby expresses his interest and accord its willful consent to receive communication (including commercial communication) in relation to Our Services.
              </p>
            </motion.div>

            {/* Disclaimer of Warranties and Liability */}
            <motion.div 
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
            >
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text text-transparent text-left">
                Disclaimer of Warranties and Liability
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg text-left mb-4">
                This Website, all the materials and products (including but not limited to software) and services, included on or otherwise made available to You through this site are provided on "as is" and "as available" basis without any representation or warranties, express or implied except otherwise specified in writing.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg text-left">
                We neither guarantee nor offer any warranty about the credentials bonafides, status or otherwise of the prospective employer/organization which downloads the resume/insertion or information/data and uses it to contact the User. We would not be held liable for loss of any data technical or otherwise, or of the resume/insertion or information/data or particulars supplied by the User due to acts of god as well as reasons beyond its control.
              </p>
            </motion.div>

            {/* Service Payment */}
            <motion.div 
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
            >
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text text-transparent text-left">
                Service Payment
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg text-left mb-4">
                Payments for the services offered by Us shall be on a 100% (Hundred Percent) advance basis. Refund if any will be at the sole discretion of Us. We offer no guarantees whatsoever for the accuracy or timeliness of the refunds reaching the users card/bank accounts.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg text-left">
                All payments made against the purchases/services on Website by you shall be compulsorily in Indian Rupees acceptable in the Republic of India. Website will not facilitate transaction with respect to any other form of currency with respect to the purchases made on Website.
              </p>
            </motion.div>

            {/* Indemnity */}
            <motion.div 
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
            >
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text text-transparent text-left">
                Indemnity
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg text-left">
                You shall indemnify and hold harmless Us, our owner, licensee, affiliates, subsidiaries, group companies (as applicable) and their respective officers, directors, agents, and employees, from any claim or demand, or actions including reasonable attorneys' fees, made by any third party or penalty imposed due to or arising out of your breach of this Terms & Conditions of Use, Privacy Policy and other Policies, or your violation of any law, rules or regulations or the rights (including infringement of intellectual property rights) of a third party.
              </p>
            </motion.div>

            {/* Limitation of Liability */}
            <motion.div 
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
            >
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text text-transparent text-left">
                Limitation of Liability
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg text-left font-semibold">
                IN NO EVENT WE WILL BE LIABLE FOR ANY DAMAGES, INCLUDING WITHOUT LIMITATION DIRECT OR INDIRECT, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGES, LOSSES OR EXPENSES ARISING IN CONNECTION WITH THIS TERMS & CONDITIONS OF USE OR WEBSITE OR ANY LINKED WEBSITE OR USE THEREOF OR INABILITY TO USE BY ANY PARTY.
              </p>
            </motion.div>

            {/* Applicable Law */}
            <motion.div 
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
            >
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text text-transparent text-left">
                Applicable Law
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg text-left">
                Terms & Conditions of Use shall be governed by and interpreted and construed in accordance with the laws of India. The place of jurisdiction shall be exclusively in New Delhi.
              </p>
            </motion.div>

            {/* Trademark and Copyright */}
            <motion.div 
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
            >
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-900 bg-clip-text text-transparent text-left">
                Trademark, Copyright and Restriction
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg text-left mb-4">
                This Website is controlled and operated by Us. All material on this Website, including images, illustrations, audio clips, and video clips, are protected by copyrights, trademarks, and other intellectual property rights.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg text-left">
                We respect the intellectual property of others. In case, You feel that your Trademark has been infringed, You can write to us at contact@jobpolo.com.
              </p>
            </motion.div>

            {/* Grievance Officer - CENTERED */}
            <motion.div 
              variants={itemVariants}
              className="bg-gradient-to-r from-blue-600 to-blue-900 rounded-2xl shadow-lg p-8 text-white text-center"
            >
              <h2 className="text-3xl font-bold mb-6">
                Grievance Officer
              </h2>
              <p className="leading-relaxed text-lg mb-6">
                In accordance with Information Technology Act 2000 and rules made there under, the name and contact details of the Grievance Officer are provided below:
              </p>
              <div className="space-y-6 max-w-2xl mx-auto">
                <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                  <p className="font-semibold text-xl mb-3">The Compliance Officer</p>
                  <p className="text-lg mb-2">Mr. Deepak Kumar Gupta</p>
                  <p className="text-lg mb-2">DVHR Tech Pvt. Ltd.</p>
                  <p className="text-lg leading-relaxed">
                    8th Floor, Unit No -887, Gaur City Mall,<br />
                    Greater Noida W Rd, Gaur City 1, Sector 4,<br />
                    Noida, Ghaziabad, Uttar Pradesh 201301
                  </p>
                </div>
                <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                  <p className="font-semibold text-xl mb-3">Contact Information</p>
                  <p className="text-lg mb-2">Phone: +91 7503451933</p>
                  <a href="mailto:deepak.gupta@jobpolo.com" className="text-lg hover:underline block mb-2">
                    Email: deepak.gupta@jobpolo.com
                  </a>
                  <p className="text-lg">Time: 0900-1800 Hrs (Monday – Friday except all Holidays)</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      
    </div>
  );
};

export default TermsConditions;