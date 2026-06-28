import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, ImageIcon } from "lucide-react";

import BlogTypeModal from "./BlogTypeModal";
import DeleteModal from "./DeleteModal";

import { getPostTypes } from "../api/service2";

const BlogTypeList = () => {
  const [blogTypes, setBlogTypes] = useState([]);
  const [totalBlogTypes, setTotalBlogTypes] = useState(0);
  const [loading, setLoading] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedBlogType, setSelectedBlogType] = useState(null);
  const [search, setSearch] = useState("");
  const [isActiveFilter, setIsActiveFilter] = useState(""); // "", true, false
  // ✅ Fetch Blog Types (API Correct)
  const fetchBlogTypes = async () => {
    setLoading(true);
    try {
      const res = await getPostTypes({
        page: 1,
        limit: 10,
        search: search || undefined,
        is_active: isActiveFilter === "" ? undefined : isActiveFilter,
      });

      setBlogTypes(res?.data?.list || []);
      setTotalBlogTypes(res?.data?.pagination?.totalRecords || 0);
    } catch (err) {
      console.error("Error fetching blog types:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogTypes();
  }, []);

  const handleSuccess = () => {
    fetchBlogTypes();
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchBlogTypes();
    }, 400);

    return () => clearTimeout(timer);
  }, [search, isActiveFilter]);
  const getPlainText = (html = "", maxLength = 5) => {
    const text = html.replace(/<[^>]*>/g, ""); // remove HTML tags
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="mx-auto">
        {/* Header */}
        <div className="bg-white shadow-lg p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* LEFT: Title */}
            <div className="min-w-[220px] text-start">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Add Blogs
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your blog types{" "}
                <span className="font-semibold text-blue-600">
                  ({totalBlogTypes})
                </span>
              </p>
            </div>

            {/* RIGHT: Search + Filter + Button */}
            <div className="flex flex-col lg:flex-row lg:items-center gap-4 justify-end w-full">
              {/* Search */}
              <input
                type="text"
                placeholder="Search blog type..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full lg:w-64 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />

              {/* Status Filter */}
              <select
                value={isActiveFilter}
                onChange={(e) =>
                  setIsActiveFilter(
                    e.target.value === "" ? "" : e.target.value === "true",
                  )
                }
                className="w-full lg:w-40 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Status</option>
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>

              {/* Add Blog Type Button */}
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg font-medium whitespace-nowrap"
              >
                <Plus className="w-5 h-5" />
                Add Blogs
              </button>
            </div>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <p className="text-gray-600">Loading blog types...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && blogTypes.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ImageIcon className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No blog types found</h3>
            <p className="text-gray-600 mb-6">
              Start by creating your first blog type
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg"
            >
              <Plus className="w-5 h-5" />
              Add Blogs
            </button>
          </div>
        )}

        {/* Blog Type Cards */}
        {!loading && blogTypes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 pb-4">
            {blogTypes.map((blogType) => (
              <div
                key={blogType.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all"
              >
                {/* Header */}
                <div className="h-40 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center relative rounded-t-2xl">
                  <span className="text-6xl font-bold text-white opacity-90">
                    {blogType.name?.charAt(0)}
                  </span>

                  <span
                    className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium ${
                      blogType.is_active
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {blogType.is_active ? "Active" : "Inactive"}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 text-start">
                  <h3 className="text-xl font-bold mb-2">{blogType.name}</h3>

                  {/* <div
                    className="text-gray-600 text-sm mb-4 line-clamp-2"
                    dangerouslySetInnerHTML={{
                      __html: blogType.description,
                    }}
                  /> */}

                  <p className="text-sm text-gray-600 mb-3">
                    {getPlainText(blogType.description, 30)}
                  </p>

                  <div className="text-xs text-gray-500 mb-4">
                    <p>
                      Created by{" "}
                      <span className="font-medium">{blogType.createdBy}</span>
                    </p>
                    <p>{new Date(blogType.createdAt).toLocaleDateString()}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedBlogType(blogType);
                        setShowUpdateModal(true);
                      }}
                      className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-sm"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setSelectedBlogType(blogType);
                        setShowDeleteModal(true);
                      }}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      {showAddModal && (
        <BlogTypeModal
          onClose={() => setShowAddModal(false)}
          onSuccess={handleSuccess}
        />
      )}

      {showUpdateModal && selectedBlogType && (
        <BlogTypeModal
          category={selectedBlogType}
          onClose={() => {
            setShowUpdateModal(false);
            setSelectedBlogType(null);
          }}
          onSuccess={handleSuccess}
        />
      )}

      {showDeleteModal && selectedBlogType && (
        <DeleteModal
          type="blogType"
          item={selectedBlogType}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedBlogType(null);
          }}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
};

export default BlogTypeList;
