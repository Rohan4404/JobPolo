import React, { useState } from "react";
import { X, Trash2, AlertTriangle } from "lucide-react";
import { deletePostType, deleteBlog } from "../api/service2";

const DeleteModal = ({ type, item, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: "", type: "success" });

  const showToast = (msg, type = "success") => {
    setToast({ show: true, msg, type });
    setTimeout(() => setToast({ show: false, msg: "", type }), 3000);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      let res;

      // 🔀 Decide API based on type
      if (type === "blogType") {
        res = await deletePostType(item.id);
      } else if (type === "post") {
        res = await deleteBlog(item.id);
      }

      showToast(res?.message || "Deleted successfully");

      setTimeout(() => {
        onSuccess?.();
        onClose();
      }, 1200);
    } catch (error) {
      showToast(
        error?.response?.data?.msg ||
          error?.response?.data?.message ||
          "Delete failed",
        "error"
      );
      setLoading(false);
    }
  };

  if (!item) return null;

  return (
    <>
      {/* Toast */}
      {toast.show && (
        <div className="fixed top-4 right-4 z-[60]">
          <div
            className={`px-6 py-4 rounded-lg shadow-lg text-white ${
              toast.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {toast.msg}
          </div>
        </div>
      )}

      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 text-start">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-5 rounded-t-2xl relative">
            <button
              onClick={onClose}
              disabled={loading}
              className="absolute top-4 right-4 text-white"
            >
              <X />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <AlertTriangle className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  Delete {type === "blogType" ? "Blog Type" : "Blog"}
                </h2>
                <p className="text-red-100 text-sm">
                  This action cannot be undone
                </p>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 text-start">
            <p className="mb-4 text-red-700 font-medium">
              Are you sure you want to delete this{" "}
              {type === "blogType" ? "blog type" : "blog"}?
            </p>

            <div className="bg-gray-50 p-4 rounded-lg border mb-6">
              <h3 className="font-bold">{item.name || item.title}</h3>

              {item.description && (
                <div
                  className="text-sm text-gray-600 mt-1 line-clamp-2"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
              )}

              {item.shortDescription && (
                <div
                  className="text-sm text-gray-600 mt-1 line-clamp-2"
                  dangerouslySetInnerHTML={{ __html: item.shortDescription }}
                />
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={onClose}
                disabled={loading}
                className="flex-1 border px-4 py-2 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={loading}
                className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg flex justify-center gap-2"
              >
                {loading ? (
                  "Deleting..."
                ) : (
                  <>
                    <Trash2 size={16} />
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
