// import React, { useState } from "react";
// import { X } from "lucide-react";
// import { applyJob } from "../api/service2";
// import { toast } from "react-toastify";

// const ApplyJobModal = ({ job, onClose }) => {
//   const [howFitRole, setHowFitRole] = useState("");
//   const [resumeFile, setResumeFile] = useState(null);
//   const [workSampleFile, setWorkSampleFile] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const [questionnaire, setQuestionnaire] = useState({
//     dob: "",
//     skills: "",
//     expectedCTC: "",
//     noticePeriod: "",
//     willingToRelocate: false,
//   });

//   const handleChange = (e) => {
//     setQuestionnaire({
//       ...questionnaire,
//       [e.target.name]: e.target.type === "checkbox"
//         ? e.target.checked
//         : e.target.value,
//     });
//   };

//  const handleSubmit = async () => {
//   try {
//     setLoading(true);

//     // 🔹 Ensure mandatory fields exist
//     if (!job?.id) {
//       alert("Job ID missing!");
//       return;
//     }

//     const formData = new FormData();

//     // 🔹 Required fields
//     formData.append("jobId", job.id);
//     formData.append("howFitRole", howFitRole || "");

//     // 🔹 Resume file (if uploaded)
//     if (resumeFile) {
//       formData.append("resumeFiles", resumeFile);
//     }

//     // 🔹 Work sample file (optional)
//     if (workSampleFile) {
//       formData.append("workSampleFiles", workSampleFile);
//     }

//     // 🔹 Questionnaire object (MUST STRINGIFY)
//     const answersObj = {
//       dob: questionnaire.dob || null,
//       expectedCTC: questionnaire.expectedCTC || null,
//       noticePeriod: questionnaire.noticePeriod || null,
//       willingToRelocate: questionnaire.willingToRelocate || false,

//       // Convert skills string → array
//       skills:
//         questionnaire.skills?.length > 0
//           ? questionnaire.skills.split(",").map((s) => s.trim())
//           : [],
//     };

//     formData.append("questionnaireAnswers", JSON.stringify(answersObj));

//     // 🔹 Debug formData (recommended)
//     for (let pair of formData.entries()) {
//       console.log(pair[0], ":", pair[1]);
//     }

//     const res = await applyJob(formData);
//     toast.success("Application submitted successfully!");
// onClose();

// // 🔥 Notify parent + global refresh
// window.dispatchEvent(
//   new CustomEvent("job-applied", { detail: job.id })
// );

//   } catch (err) {
//     console.error("Error applying job:", err);

//     if (err?.response?.data?.msg) {
//       alert(err.response.data.msg); // show backend error
//     } else {
//       alert("Failed to apply. Please try again.");
//     }

//   } finally {
//     setLoading(false);
//   }
// };

//   return (
//     <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4">
//       <div className="bg-white rounded-xl w-full max-w-xl p-6 shadow-xl relative">

//         {/* CLOSE BUTTON */}
//         <button className="absolute right-4 top-4 text-gray-500 hover:text-gray-700" onClick={onClose}>
//           <X size={22} />
//         </button>

//         {/* HEADER */}
//         <h2 className="text-2xl font-bold text-blue-900 mb-1">Apply for {job.title}</h2>
//         <p className="text-gray-600 text-sm mb-4">{job.companyName}</p>

//         {/* HOW FIT FOR ROLE */}
//         <label className="font-semibold text-gray-800">Why are you a good fit?</label>
//         <textarea
//           className="w-full mt-1 p-3 border rounded-lg focus:ring focus:ring-blue-200"
//           rows="3"
//           placeholder="Explain why you are a good fit for this role..."
//           value={howFitRole}
//           onChange={(e) => setHowFitRole(e.target.value)}
//         />

//         {/* RESUME UPLOAD */}
//         <div className="mt-4">
//           <label className="font-semibold text-gray-800">Resume</label>
//           <input
//             type="file"
//             className="w-full mt-1 p-2 border rounded-lg"
//             onChange={(e) => setResumeFile(e.target.files[0])}
//           />
//         </div>

//         {/* WORK SAMPLE UPLOAD */}
//         <div className="mt-4">
//           <label className="font-semibold text-gray-800">Work Sample (optional)</label>
//           <input
//             type="file"
//             className="w-full mt-1 p-2 border rounded-lg"
//             onChange={(e) => setWorkSampleFile(e.target.files[0])}
//           />
//         </div>

//         {/* QUESTIONNAIRE */}
//         <div className="mt-4">
//           <h3 className="font-semibold text-gray-900 mb-2">Additional Details</h3>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//             <input
//               name="dob"
//               type="date"
//               className="p-2 border rounded-lg"
//               value={questionnaire.dob}
//               onChange={handleChange}
//             />

//             <input
//               name="skills"
//               type="text"
//               placeholder="Skills (comma separated)"
//               className="p-2 border rounded-lg"
//               value={questionnaire.skills}
//               onChange={handleChange}
//             />

//             <input
//               name="expectedCTC"
//               type="text"
//               placeholder="Expected CTC"
//               className="p-2 border rounded-lg"
//               value={questionnaire.expectedCTC}
//               onChange={handleChange}
//             />

//             <input
//               name="noticePeriod"
//               type="text"
//               placeholder="Notice Period"
//               className="p-2 border rounded-lg"
//               value={questionnaire.noticePeriod}
//               onChange={handleChange}
//             />
//           </div>

//           <label className="flex items-center gap-2 mt-3">
//             <input
//               name="willingToRelocate"
//               type="checkbox"
//               checked={questionnaire.willingToRelocate}
//               onChange={handleChange}
//             />
//             <span>Willing to relocate</span>
//           </label>
//         </div>

//         {/* SUBMIT BUTTON */}
//         <button
//           onClick={handleSubmit}
//           disabled={loading}
//           className="w-full mt-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:opacity-90 transition"
//         >
//           {loading ? "Submitting..." : "Submit Application"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ApplyJobModal;

import React, { useState } from "react";
import { X, UploadCloud, Briefcase, CheckCircle } from "lucide-react";
import { applyJob } from "../api/service2";
import { toast } from "react-toastify";
import confetti from "canvas-confetti";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const ApplyJobModal = ({ job, onClose }) => {
  const [howFitRole, setHowFitRole] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [workSampleFile, setWorkSampleFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const todayISO = new Date().toLocaleDateString("en-CA");
  const todayReadable = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const [questionnaire, setQuestionnaire] = useState({
    dob: todayISO, // ✅ auto-filled
    skills: "",
    expectedCTC: "",
    noticePeriod: "",
    willingToRelocate: false,
  });

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (!job?.id) {
        toast.error("Job information missing. Please refresh.");
        return;
      }

      if (!howFitRole || howFitRole === "<p><br></p>") {
        toast.error("Please explain why you are a good fit.");
        return;
      }

      const formData = new FormData();
      formData.append("jobId", job.id);
      formData.append("howFitRole", howFitRole);

      if (resumeFile) formData.append("resumeFiles", resumeFile);
      if (workSampleFile) formData.append("workSampleFiles", workSampleFile);

      formData.append("questionnaireAnswers", JSON.stringify(questionnaire));

      await applyJob(formData);

      toast.success("🎉 Application submitted successfully!");
      setSuccess(true);

      confetti({ particleCount: 180, spread: 70, origin: { y: 0.6 } });

      window.dispatchEvent(
        new CustomEvent("job-applied", { detail: job.id })
      );

      setTimeout(onClose, 1800);
    } catch (err) {
      toast.error(
        err?.response?.data?.msg || "Failed to apply. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- QUILL TOOLBAR ---------------- */
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["blockquote", "code-block"],
      ["link"],
      ["clean"],
    ],
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white relative">
          <button
            disabled={loading}
            onClick={onClose}
            className={`absolute right-4 top-4 ${
              loading ? "opacity-40 cursor-not-allowed" : "hover:opacity-80"
            }`}
          >
            <X size={22} />
          </button>

          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Briefcase size={22} /> Apply for {job.title}
          </h2>

          <p className="text-sm opacity-90">{job.companyName}</p>

          <p className="text-xs mt-2 bg-white/20 inline-block px-3 py-1 rounded-full">
            Applying on: {todayReadable}
          </p>
        </div>

        {/* SUCCESS */}
        {success ? (
          <div className="p-10 text-center">
            <CheckCircle size={70} className="text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold">Application Submitted</h3>
            <p className="text-gray-600 mt-2">
              We’ve successfully received your application.
            </p>
          </div>
        ) : (
          <>
            {/* BODY */}
            <div className="p-6 space-y-6 max-h-[65vh] overflow-y-auto">

              {/* MODERN EDITOR */}
              <div>
                <label className="font-semibold text-gray-800 mb-2 block">
                  Why are you a good fit?
                </label>
                <ReactQuill
                  value={howFitRole}
                  onChange={setHowFitRole}
                  modules={quillModules}
                  theme="snow"
                  placeholder="Describe your skills, experience, and why you fit this role..."
                  className="bg-white rounded-lg"
                />
              </div>

              {/* FILE UPLOADS */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <label className="font-semibold flex items-center gap-2">
                    <UploadCloud size={18} /> Resume
                  </label>
                  <input type="file" className="mt-2 w-full text-sm" onChange={(e) => setResumeFile(e.target.files[0])} />
                </div>

                <div className="border rounded-lg p-4">
                  <label className="font-semibold flex items-center gap-2">
                    <UploadCloud size={18} /> Work Sample
                  </label>
                  <input type="file" className="mt-2 w-full text-sm" onChange={(e) => setWorkSampleFile(e.target.files[0])} />
                </div>
              </div>

              {/* ADDITIONAL DETAILS */}
              <div>
                <h3 className="font-semibold mb-3">Additional Details</h3>

                <div className="grid sm:grid-cols-2 gap-3">
                  {/* AUTO DATE */}
                  <input
                    type="date"
                    value={questionnaire.dob}
                    readOnly
                    className="p-3 border rounded-lg bg-gray-100 cursor-not-allowed"
                  />

                  <input
                    placeholder="Skills (comma separated)"
                    className="p-3 border rounded-lg"
                    onChange={(e) =>
                      setQuestionnaire({ ...questionnaire, skills: e.target.value })
                    }
                  />

                  <input
                    placeholder="Expected CTC"
                    className="p-3 border rounded-lg"
                    onChange={(e) =>
                      setQuestionnaire({ ...questionnaire, expectedCTC: e.target.value })
                    }
                  />

                  <input
                    placeholder="Notice Period"
                    className="p-3 border rounded-lg"
                    onChange={(e) =>
                      setQuestionnaire({ ...questionnaire, noticePeriod: e.target.value })
                    }
                  />
                </div>

                <label className="flex items-center gap-2 mt-4 text-sm">
                  <input
                    type="checkbox"
                    className="accent-blue-600"
                    onChange={(e) =>
                      setQuestionnaire({
                        ...questionnaire,
                        willingToRelocate: e.target.checked,
                      })
                    }
                  />
                  Willing to relocate
                </label>
              </div>
            </div>

            {/* FOOTER */}
            <div className="p-6 border-t">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`w-full py-3 rounded-lg font-semibold text-white ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90"
                }`}
              >
                {loading ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ApplyJobModal;
