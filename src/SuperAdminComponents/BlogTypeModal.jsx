import React, { useState, useRef, useEffect } from "react";
import { X, Plus, Edit2, AlertTriangle } from "lucide-react";
import { AddBlogType, updatePostType } from "../api/service2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const BlogTypeModal = ({ category, onClose, onSuccess }) => {
  const isUpdate = !!category;

  const [formData, setFormData] = useState({
    name: category?.name || "",
    description: category?.description || "",
    is_active: category?.is_active ?? true,
  });

  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const quillRef = useRef(null);
  const showToastMessage = (message, type = "success") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const isEmptyQuill = (value) => {
    return (
      !value ||
      value === "<p><br></p>" ||
      value.replace(/<(.|\n)*?>/g, "").trim() === ""
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ VALIDATION FIRST
    if (!formData.name.trim()) {
      showToastMessage("Blog Type Name is required", "error");
      return;
    }

    if (isEmptyQuill(formData.description)) {
      showToastMessage("Description is required", "error");
      return;
    }

    setLoading(true);

    try {
      let res;

      if (isUpdate) {
        res = await updatePostType(category.id, formData);
      } else {
        res = await AddBlogType(formData);
      }

      showToastMessage(res?.message || "Success");

      setTimeout(() => {
        onSuccess?.();
        onClose();
      }, 1200);
    } catch (error) {
      showToastMessage(
        error?.response?.data?.msg ||
          error?.response?.data?.message ||
          "Something went wrong",
        "error",
      );
      setLoading(false);
    }
  };
  const autoResizeQuill = (ref, maxHeight = 220) => {
    if (!ref?.current) return;

    const editor = ref.current.getEditor();
    const editorEl = editor.root;

    editorEl.style.height = "auto";
    const scrollHeight = editorEl.scrollHeight;

    if (scrollHeight > maxHeight) {
      editorEl.style.height = `${maxHeight}px`;
      editorEl.style.overflowY = "auto";
    } else {
      editorEl.style.height = `${scrollHeight}px`;
      editorEl.style.overflowY = "hidden";
    }
  };
  useEffect(() => {
    if (isUpdate && formData.description) {
      setTimeout(() => {
        autoResizeQuill(quillRef, 220);
      }, 0);
    }
  }, [isUpdate]);

  return (
    <>
      {/* Toast */}
      {showToast && (
        <div className="fixed top-4 right-4 z-[60]">
          <div
            className={`flex items-center gap-3 px-6 py-4 rounded-lg shadow-lg ${
              toastType === "success"
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {toastType === "success" ? (
              <span>✔</span>
            ) : (
              <AlertTriangle className="w-5 h-5" />
            )}
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5 rounded-t-2xl relative">
            <button
              onClick={onClose}
              disabled={loading}
              className="absolute top-4 right-4 text-white"
            >
              <X />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                {isUpdate ? (
                  <Edit2 className="text-white" />
                ) : (
                  <Plus className="text-white" />
                )}
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  {isUpdate ? "Update Blog Type" : "Add Blog Type"}
                </h2>
                <p className="text-blue-100 text-sm">
                  {isUpdate
                    ? "Edit existing blog type"
                    : "Create a new blog type"}
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5 text-start">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Blog Type Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Description */}
            {/* Description (Quill) */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description *
              </label>

              <ReactQuill
                ref={quillRef}
                theme="snow"
                value={formData.description}
                onChange={(value) => {
                  setFormData((prev) => ({
                    ...prev,
                    description: value,
                  }));
                }}
                className={`quill-box ${
                  isEmptyQuill(formData.description)
                    ? "border border-red-500 rounded-lg"
                    : ""
                }`}
              />
            </div>

            {/* Active Toggle */}
            {isUpdate && (
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      is_active: e.target.checked,
                    })
                  }
                />
                <span className="text-sm">
                  {formData.is_active ? "Active" : "Inactive"}
                </span>
              </label>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-3">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="flex-1 border px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                {loading
                  ? isUpdate
                    ? "Updating..."
                    : "Adding..."
                  : isUpdate
                    ? "Update"
                    : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
<style>
  {`
  .quill-box .ql-editor {
    min-height: 140px;
    line-height: 1.5;
  }

  .quill-box .ql-container {
    border-radius: 0.5rem;
  }
`}
</style>;

export default BlogTypeModal;
