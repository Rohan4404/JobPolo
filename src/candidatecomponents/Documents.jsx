import React, { useEffect, useState } from "react";
import { X, FileText, Image as ImageIcon } from "lucide-react";
import { getUserProfile } from "../api/service2";

const Documents = () => {
  const [documents, setDocuments] = useState(null);
  const [loading, setLoading] = useState(true);

  // popup
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupUrl, setPopupUrl] = useState("");

  useEffect(() => {
    const loadDocs = async () => {
      try {
        const res = await getUserProfile();
        setDocuments(res.data.filteredUser.employee || {});
      } catch (err) {
        console.error("Error loading documents", err);
      } finally {
        setLoading(false);
      }
    };
    loadDocs();
  }, []);

  if (loading) {
    return (
      <div className="section-loader">
        <div className="flex flex-col items-center">
          <div className="page-loader-spinner mb-3"></div>
          <p className="page-loader-text">Loading documents...</p>
        </div>
      </div>
    );
  }

  if (!documents) {
    return (
      <div className="flex justify-center items-center h-[80vh] text-blue-700">
        No documents found
      </div>
    );
  }

  const {
    resumePreviewUrls = [],
    workSamplePreviewUrls = [],
    portfolioUrl,
    portfolioPreviewUrl,
  } = documents;

  /* ================= UI ================= */

  return (
    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 p-4 sm:p-6 text-left min-h-screen overflow-y-auto">


      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-blue-900">Documents</h1>
        <p className="text-blue-700 mt-2">
          View and download your uploaded documents
        </p>
      </div>

      {/* CARD */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100 space-y-10 max-h-[70vh] overflow-y-auto">


        {/* RESUMES */}
        <DocumentSection
          title="Resumes"
          items={resumePreviewUrls}
          onOpen={(url) => { setPopupUrl(url); setPopupOpen(true); }}
        />

        {/* WORK SAMPLES */}
        <DocumentSection
          title="Work Samples"
          items={workSamplePreviewUrls}
          onOpen={(url) => { setPopupUrl(url); setPopupOpen(true); }}
        />

        {/* PORTFOLIO */}
        <div>
          <h3 className="section-title">Portfolio</h3>

          {portfolioPreviewUrl || portfolioUrl ? (
            <button
              onClick={() => {
                setPopupUrl(portfolioPreviewUrl || portfolioUrl);
                setPopupOpen(true);
              }}
              className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition"
            >
              View Portfolio
            </button>
          ) : (
            <p className="bg-gray-50 p-4 rounded-lg text-gray-700">
              No data provided
            </p>
          )}
        </div>
      </div>

      {/* POPUP */}
      {popupOpen && (
        <div className="fixed inset-0 bg-black/70 z-[9999] flex items-center justify-center">
          <div className="bg-white w-[90vw] h-[90vh] rounded-xl shadow-lg flex flex-col">

            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="font-bold text-blue-900">Document Preview</h2>

              <div className="flex gap-3">
                <a
                  href={popupUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                >
                  Download
                </a>

                <button onClick={() => setPopupOpen(false)}>
                  <X />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 bg-gray-50 overscroll-contain">

              {popupUrl.toLowerCase().includes(".pdf") ? (
                <iframe
                  src={popupUrl}
                  className="w-full h-full rounded"
                  title="document-preview"
                />
              ) : (
                <img
                  src={popupUrl}
                  alt="document"
                  className="w-full rounded"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Documents;


const DocumentSection = ({ title, items, onOpen }) => (
  <div>
    <h3 className="text-lg font-bold text-blue-900 border-b-2 border-blue-500 pb-2 mb-3">
      {title}
    </h3>

    {items.length > 0 ? (
      <div className="flex flex-wrap gap-3">
        {items.map((url, i) => {
          const isPdf = url.toLowerCase().includes(".pdf");

          return (
            <button
              key={i}
              onClick={() => onOpen(url)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition"
            >
              {isPdf ? <FileText size={16} /> : <ImageIcon size={16} />}
              {title.slice(0, -1)} {i + 1}
            </button>
          );
        })}
      </div>
    ) : (
      <p className="bg-gray-50 p-4 rounded-lg text-gray-700">
        No data provided
      </p>
    )}
  </div>
);
