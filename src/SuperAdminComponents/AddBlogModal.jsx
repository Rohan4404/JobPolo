import React, { useState, useEffect } from "react";
import { X, Plus, Edit2 } from "lucide-react";
import {
  AddBlog,
  updateBlog,
  getAllCategories,
  getPostTypes,
} from "../api/service2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import { useRef } from "react";
const BlogModal = ({ blog, onClose, onSuccess }) => {
  const isUpdate = !!blog;

  const [formData, setFormData] = useState({
    title: blog?.title || "",
    shortDescription: blog?.shortDescription || "",
    content: blog?.content || "",
    categoryId: blog?.categoryId || "",
    postTypeId: blog?.postTypeId || "",
    postImage: null,
    isPublished: blog?.isPublished ?? true,
    is_active: blog?.is_active ?? true,
  });

  const [categories, setCategories] = useState([]);
  const [postTypes, setPostTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const shortDescRef = useRef(null);
  const contentRef = useRef(null);
  /* ---------------- Fetch Data ---------------- */

  const fetchCategories = async () => {
    try {
      const res = await getAllCategories();
      setCategories(res?.data?.categories || []);
    } catch {
      toast.error("Failed to load categories");
    }
  };

  const fetchPostTypes = async () => {
    try {
      const res = await getPostTypes({ page: 1, limit: 50 });
      setPostTypes(res?.data?.list || []);
    } catch {
      toast.error("Failed to load post types");
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchPostTypes();
  }, []);

  const isEmptyQuill = (value) => {
    return (
      !value ||
      value === "<p><br></p>" ||
      value.replace(/<(.|\n)*?>/g, "").trim() === ""
    );
  };
  /* ---------------- Submit ---------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ VALIDATION
    if (!formData.title.trim()) {
      toast.error("Title is required");
      return;
    }

    if (isEmptyQuill(formData.shortDescription)) {
      toast.error("Short Description is required");
      return;
    }

    if (isEmptyQuill(formData.content)) {
      toast.error("Content is required");
      return;
    }

    if (!formData.categoryId) {
      toast.error("Category is required");
      return;
    }

    if (!formData.postTypeId) {
      toast.error("Post Type is required");
      return;
    }

    setLoading(true);

    try {
      let res;

      if (isUpdate) {
        res = await updateBlog(blog.id, formData);
      } else {
        res = await AddBlog(formData);
      }

      toast.success(res?.message || "Success");

      setTimeout(() => {
        onSuccess?.();
        onClose();
      }, 1200);
    } catch (error) {
      toast.error(
        error?.response?.data?.msg ||
          error?.response?.data?.message ||
          "Something went wrong",
      );
      setLoading(false);
    }
  };

  const autoResizeQuill = (ref, maxHeight = 400) => {
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

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white h-[93vh] w-full max-w-7xl rounded-2xl shadow-2xl">
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
              <div className="text-start">
                <h2 className="text-xl font-bold text-white ">
                  {isUpdate ? "Update Blog" : "Add Blog"}
                </h2>
                <p className="text-blue-100 text-sm">
                  {isUpdate ? "Edit blog post" : "Create a new blog post"}
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-start">
            {/* Title */}
            <div>
              <label className="text-sm font-semibold b-1 block">
                Tittle <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            {/* Short Description + Content */}
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Short Description */}
              <div className="flex-1">
                <label className="text-sm font-semibold mb-1 block">
                  Short Description <span className="text-red-500">*</span>
                </label>
                <ReactQuill
                  ref={shortDescRef}
                  theme="snow"
                  value={formData.shortDescription}
                  onChange={(v) => {
                    setFormData((p) => ({ ...p, shortDescription: v }));
                    autoResizeQuill(shortDescRef, 250);
                  }}
                  className="quill-short"
                />
              </div>

              {/* Content */}
              <div className="flex-1">
                <label className="text-sm font-semibold mb-1 block">
                  Content <span className="text-red-500">*</span>
                </label>
                <ReactQuill
                  ref={contentRef}
                  theme="snow"
                  value={formData.content}
                  onChange={(v) => {
                    setFormData((p) => ({ ...p, content: v }));
                    autoResizeQuill(contentRef, 500);
                  }}
                  className="quill-content"
                />
              </div>
            </div>

            {/* Category + Post Type */}
            <div className="flex flex-col md:flex-row gap-4">
              {/* Category */}
              <div className="flex-1">
                <label className="text-sm font-semibold mb-1 block">
                  Select Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.categoryId}
                  onChange={(e) =>
                    setFormData({ ...formData, categoryId: e.target.value })
                  }
                  required
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="">Select Category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Post Type */}
              <div className="flex-1">
                <label className="text-sm font-semibold mb-1 block">
                  Select Post Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.postTypeId}
                  onChange={(e) =>
                    setFormData({ ...formData, postTypeId: e.target.value })
                  }
                  required
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="">Select Post Type</option>
                  {postTypes.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Image */}
            <input
              type="file"
              required
              accept="image/*"
              onChange={(e) =>
                setFormData({ ...formData, postImage: e.target.files[0] })
              }
            />

            {/* Toggles */}
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  required
                  checked={formData.isPublished}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      isPublished: e.target.checked,
                    })
                  }
                />
                Published
              </label>

              {isUpdate && (
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    required
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        is_active: e.target.checked,
                      })
                    }
                  />
                  Active
                </label>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-3">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="flex-1 border px-4 py-2 rounded-lg disabled:opacity-60"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading && (
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      opacity="0.25"
                    />
                    <path
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      opacity="0.75"
                    />
                  </svg>
                )}
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

      {/* Quill height control */}
      <style>
        {`
  .ql-editor {
    transition: height 0.15s ease;
    overflow-y: hidden;
  }

  .quill-short .ql-editor {
    min-height: 210px;
    max-height: 210px;
  }

  .quill-content .ql-editor {
    min-height: 210px;
    max-height: 210px;
  }
`}
      </style>
    </>
  );
};

export default BlogModal;
