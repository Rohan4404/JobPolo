import React, { useEffect, useState } from "react";
import { Upload, Plus, FileSpreadsheet, Trash2, Download } from "lucide-react";
import { bulkUploadJobs, getAllCategories } from "../api/service2";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import ExcelJS from "exceljs";

// import { saveAs } from "file-saver";

export default function BulkJobUpload() {
  const [bulkExcel, setBulkExcel] = useState(null);
  const [logoSections, setLogoSections] = useState([{ id: 1, file: null }]);
  const [bulkUploading, setBulkUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [categories, setCategories] = useState([]);

  console.log("upload result  is", uploadResult);

  const handleBulkExcelChange = (e) => {
    const file = e.target.files[0];
    if (file) setBulkExcel(file);
  };

  const handleLogoChange = (id, e) => {
    const file = e.target.files[0];
    setLogoSections((prev) =>
      prev.map((section) =>
        section.id === id ? { ...section, file } : section,
      ),
    );
  };

  const fetchCategories = async () => {
    try {
      const res = await getAllCategories();

      const list = res?.data?.categories || [];

      console.log("✅ Categories:", list);

      setCategories(list); // store full objects
    } catch (err) {
      console.error("❌ Error fetching categories:", err);
    }
  };

  const addLogoSection = () => {
    const newId = Math.max(...logoSections.map((s) => s.id), 0) + 1;
    setLogoSections((prev) => [...prev, { id: newId, file: null }]);
  };

  const removeLogoSection = (id) => {
    if (logoSections.length > 1) {
      setLogoSections((prev) => prev.filter((s) => s.id !== id));
    }
  };

  const handleBulkUpload = async () => {
    if (!bulkExcel) {
      toast.error("Please upload Excel file");
      return;
    }

    const fd = new FormData();
    fd.append("excelFile", bulkExcel);

    logoSections.forEach((section, index) => {
      if (section.file) {
        console.log(`Logo ${index + 1}:`, section.file);
        console.log("Logo name:", section.file.name);

        fd.append("logoFiles", section.file);
      }
    });

    try {
      setBulkUploading(true);
      const res = await bulkUploadJobs(fd);

      setUploadResult(res.data); // save result
      toast.success(res?.message || "Bulk jobs uploaded successfully");

      setBulkExcel(null);
      setLogoSections([{ id: 1, file: null }]);

      document.querySelectorAll('input[type="file"]').forEach((i) => {
        i.value = "";
      });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Bulk upload failed");
    } finally {
      setBulkUploading(false);
    }
  };


  const downloadTemplate = async () => {
    try {
      // 🔥 Fetch categories from API
      const res = await getAllCategories();
      const categoryList = res?.data?.categories || [];

      if (!categoryList.length) {
        toast.error("No categories found");
        return;
      }

      // ✅ Extract names
      const categoryNames = categoryList.map((c) => c.name);

      // ✅ Convert to Excel dropdown format
      const categoryString = `"${categoryNames.join(",")}"`;

      console.log("✅ Category Dropdown:", categoryString);

      // ============================
      // Excel Setup
      // ============================
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("BulkJobsTemplate");

      const headers = [
        "title",
        "description",
        "requirements",
        "responsibilities",
        "education",
        "mode",
        "companyName",
        "companyEmail",
        "categoryName",
        "employmentType",
        "skillsRequired",
        "openings",
        "deadline",
        "minExperience",
        "maxExperience",
        "salaryType",
        "minSalary",
        "maxSalary",
        "shiftType",
        "questionnaire",
        "city",
        "state",
        "country",
        "pincode",
        "logoFileName",
      ];

      worksheet.addRow(headers);

      // Header Styling
      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFF4B183" },
        };
        cell.alignment = { vertical: "middle", horizontal: "center" };
      });

      // Column Width
      worksheet.columns = headers.map(() => ({
        width: 28,
      }));

      // Example Row
      worksheet.addRow([
        "Backend Developer",
        "API development job",
        "Node.js, Prisma",
        "Build REST APIs",
        "B.Tech",
        "HYBRID",
        "ABC Pvt Ltd",
        "hr@abc.com",
        categoryNames[0] || "NEWS",
        "FULL_TIME",
        '["Node","React"]',
        5,
        "2025-12-31",
        1,
        3,
        "MONTHLY",
        30000,
        60000,
        "MORNING",
        '{"skills":["Node","React"]}',
        "Delhi",
        "DL",
        "India",
        "110001",
        "flownexus_logo.jpeg",
      ]);

      // ============================
      // Dropdown validations
      // ============================
      for (let i = 2; i <= 200; i++) {
        // Mode
        worksheet.getCell(`F${i}`).dataValidation = {
          type: "list",
          allowBlank: true,
          formulae: ['"HYBRID,ON_SITE,REMOTE"'],
        };

        // 🔥 Dynamic Categories
        worksheet.getCell(`I${i}`).dataValidation = {
          type: "list",
          allowBlank: true,
          formulae: [categoryString],
        };

        // Employment Type
        worksheet.getCell(`J${i}`).dataValidation = {
          type: "list",
          allowBlank: true,
          formulae: ['"CONTRACT,FULL_TIME,PART_TIME,INTERNSHIP,FREELANCE"'],
        };

        // Salary Type
        worksheet.getCell(`P${i}`).dataValidation = {
          type: "list",
          allowBlank: true,
          formulae: ['"MONTHLY,YEARLY"'],
        };

        // Shift Type
        worksheet.getCell(`S${i}`).dataValidation = {
          type: "list",
          allowBlank: true,
          formulae: ['"MORNING,EVENING,NIGHT,AFTERNOON,SPLIT,ROTATIONAL"'],
        };
      }

      // ============================
      // Download file
      // ============================
      const buffer = await workbook.xlsx.writeBuffer();

      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      saveAs(blob, "Bulk_Jobs_Template.xlsx");
    } catch (err) {
      console.error("❌ Template generation error:", err);
      toast.error("Failed to generate template");
    }
  };

  const downloadResultExcel = async (type = "all") => {
    if (!uploadResult) {
      toast.error("No upload result available");
      return;
    }

    let jobs = [];

    const uploaded = uploadResult.uploadedJobs || [];
    const failed = uploadResult.failedJobs || [];

    if (type === "all") {
      jobs = [...uploaded, ...failed];
    }

    if (type === "uploaded") {
      jobs = uploaded;
    }

    if (type === "failed") {
      jobs = failed;
    }

    if (type === "withLogo") {
      jobs = uploaded.filter((j) => j.logoStatus !== "SKIPPED");
    }

    if (type === "withoutLogo") {
      jobs = uploaded.filter((j) => j.logoStatus === "SKIPPED");
    }

    if (!jobs.length) {
      toast.warning("No data available for this filter");
      return;
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("BulkUploadResult");

    const headers = [
      "row",
      "jobId",
      "jobUniqueID",
      "title",
      "companyName",
      "companyEmail",
      "categoryId",
      "employmentType",
      "shiftType",
      "openings",
      "logoStatus",
      "logoUrl",
      "logoPreviewUrl",
      "errorType",
      "reason",
    ];

    worksheet.addRow(headers);

    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFF4B183" },
      };
    });

    jobs.forEach((job) => {
      const data = job.jobData || {};

      const row = worksheet.addRow([
        job.row || "",
        job.jobId || "",
        job.jobUniqueID || "",
        data.title || "",
        data.companyName || "",
        data.companyEmail || "",
        data.categoryId || "",
        data.employmentType || "",
        (data.shiftType || []).join(", "),
        data.openings || "",
        job.logoStatus || "",
        data.logoUrl || "",
        data.logoPreviewUrl || "",
        job.errorType || "",
        job.reason || "",
      ]);
      if (job.reason) {
        const reasonCell = row.getCell(15); // reason column

        reasonCell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFFFCCCC" }, // light red
        };

        reasonCell.font = {
          color: { argb: "FF9C0006" }, // dark red text
          bold: true,
        };

        reasonCell.alignment = { wrapText: true };
      }
    });

    worksheet.columns = headers.map(() => ({ width: 28 }));

    const buffer = await workbook.xlsx.writeBuffer();

    saveAs(
      new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }),
      `Bulk_Jobs_${type}.xlsx`,
    );
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6 text-start">
          <div className="flex items-center gap-4 mb-2">
            <div className="bg-indigo-600 p-3 rounded-lg">
              <Upload className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Bulk Job Upload
              </h1>
              <p className="text-gray-600 mt-1">
                Upload multiple jobs using Excel and company logos
              </p>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 h-[60vh] custom-scrollbar">
          {uploadResult && (
            <div className="bg-gray-50 border rounded-lg p-4 mb-6 grid grid-cols-2 md:grid-cols-5 gap-4 text-sm font-medium">
              <div>Total Jobs: {uploadResult.totalJobsInExcel}</div>
              <div>Processed: {uploadResult.totalJobProcessed}</div>
              <div>Posted: {uploadResult.totalJobPosted}</div>
              <div>With Logo: {uploadResult.totalJobPostedWithLogo}</div>
              <div>Without Logo: {uploadResult.totalJobPostedWithoutLogo}</div>
            </div>
          )}
          {/* Download Template Button */}
          <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
            {/* Left side result buttons */}
            {uploadResult && (
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => downloadResultExcel("all")}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
                >
                  Download All Jobs
                </button>

                <button
                  onClick={() => downloadResultExcel("uploaded")}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg"
                >
                  Uploaded Jobs
                </button>

                <button
                  onClick={() => downloadResultExcel("failed")}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg"
                >
                  Failed Jobs
                </button>

                <button
                  onClick={() => downloadResultExcel("withLogo")}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  Uploaded With Logo
                </button>

                <button
                  onClick={() => downloadResultExcel("withoutLogo")}
                  className="px-4 py-2 bg-yellow-600 text-white rounded-lg"
                >
                  Uploaded Without Logo
                </button>
              </div>
            )}

            {/* Right side template button */}
            <button
              onClick={downloadTemplate}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Download size={18} />
              Download Template
            </button>
          </div>

          {/* Excel Upload */}
          <div className="mb-8">
            <label className="flex items-center gap-2 text-lg font-semibold mb-3">
              <FileSpreadsheet className="w-5 h-5 text-green-600" />
              Excel File <span className="text-red-500">*</span>
            </label>

            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleBulkExcelChange}
              className="w-full px-4 py-4 border-2 border-dashed rounded-lg"
            />

            {bulkExcel && (
              <p className="mt-2 text-sm text-green-600 font-medium">
                {bulkExcel.name}
              </p>
            )}
          </div>

          {/* Logo Upload */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <label className="text-lg font-semibold">
                Company Logos{" "}
                <span className="text-gray-400 text-sm">(Optional)</span>
              </label>

              <button
                onClick={addLogoSection}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg"
              >
                <Plus size={16} /> Add More
              </button>
            </div>

            <div className="space-y-4">
              {logoSections.map((section, index) => (
                <div key={section.id} className="flex items-center gap-3">
                  <span className="w-8 h-8 flex items-center justify-center bg-indigo-100 rounded-full font-semibold">
                    {index + 1}
                  </span>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleLogoChange(section.id, e)}
                    className="flex-1 px-4 py-3 border rounded-lg"
                  />

                  {logoSections.length > 1 && (
                    <button
                      onClick={() => removeLogoSection(section.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Upload Button */}
          <button
            onClick={handleBulkUpload}
            disabled={bulkUploading || !bulkExcel}
            className={`w-50 flex justify-center items-center gap-2 px-4 py-2 rounded-lg font-semibold text-lg ${
              bulkUploading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            {bulkUploading ? "Uploading..." : "Upload Bulk Jobs"}
          </button>
        </div>
      </div>
    </div>
  );
}
