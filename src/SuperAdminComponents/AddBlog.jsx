import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  ImageIcon,
  Filter,
  RotateCcw,
} from "lucide-react";

import AddBlogModal from "./AddBlogModal";
import DeleteModal from "./DeleteModal";
import PostDetailModal from "./PostDetailModal";

import { getAllPosts, getAllCategories, getPostTypes } from "../api/service2";

const AddBlog = () => {
  const [posts, setPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [loading, setLoading] = useState(false);

  /* ---------------- Filters ---------------- */
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [postType, setPostType] = useState("");
  const [isPublished, setIsPublished] = useState("");
  const [isActive, setIsActive] = useState("");
  const [postUniqueID, setPostUniqueID] = useState("");

  const [page, setPage] = useState(1);
  const limit = 10;

  /* ---------------- Dropdown Data ---------------- */
  const [categories, setCategories] = useState([]);
  const [postTypes, setPostTypes] = useState([]);

  /* ---------------- UI ---------------- */
  const [showFilters, setShowFilters] = useState(false);

  /* ---------------- Modals ---------------- */
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const [showDetailModal, setShowDetailModal] = useState(false);
  const [viewPost, setViewPost] = useState(null);
  const getPlainText = (html = "", maxLength = 5) => {
    const text = html.replace(/<[^>]*>/g, ""); // remove HTML tags
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };
  /* ---------------- Fetch Posts ---------------- */
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await getAllPosts({
        search: search || undefined,
        category: category || undefined,
        postType: postType || undefined,
        postUniqueID: postUniqueID || undefined,
        isPublished: isPublished === "" ? undefined : isPublished === "true",
        is_active: isActive === "" ? undefined : isActive === "true",
        page,
        limit,
      });

      setPosts(res?.data?.list || []);
      setTotalPosts(res?.data?.pagination?.totalRecords || 0);
    } catch (err) {
      console.error("Error fetching posts", err);
    }
    setLoading(false);
  };

  /* ---------------- Fetch Filters Data ---------------- */
  const fetchFiltersData = async () => {
    try {
      const [catRes, typeRes] = await Promise.all([
        getAllCategories(),
        getPostTypes({ page: 1, limit: 50 }),
      ]);

      setCategories(catRes?.data?.categories || []);
      setPostTypes(typeRes?.data?.list || []);
    } catch (err) {
      console.error("Filter fetch error", err);
    }
  };

  /* ---------------- Reset Filters ---------------- */
  const resetFilters = () => {
    setSearch("");
    setCategory("");
    setPostType("");
    setIsPublished("");
    setIsActive("");
    setPostUniqueID("");
    setPage(1);
  };

  /* ---------------- Effects ---------------- */
  useEffect(() => {
    fetchFiltersData();
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [page]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
      fetchPosts();
    }, 400);

    return () => clearTimeout(timer);
  }, [search, category, postType, isPublished, isActive, postUniqueID]);

  const handleSuccess = () => fetchPosts();

  /* ====================================================== */

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="mx-auto">
        {/* Header */}
        <div className="bg-white shadow-lg p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Left */}
            <div className="text-start">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Your Blogs
              </h1>
              <p className="text-gray-600 mt-1">
                Total Posts{" "}
                <span className="font-semibold text-blue-600">
                  ({totalPosts})
                </span>
              </p>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters((p) => !p)}
                className="flex items-center gap-2 border px-4 py-2 rounded-lg bg-white shadow"
              >
                <Filter size={16} />
                Filters
              </button>

              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2 rounded-lg shadow font-medium"
              >
                <Plus size={18} /> Add Blog
              </button>
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-6 flex flex-wrap gap-3 items-center">
              <input
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-3 py-2 border rounded-lg w-48"
              />

              <input
                placeholder="Post Unique ID"
                value={postUniqueID}
                onChange={(e) => setPostUniqueID(e.target.value)}
                className="px-3 py-2 border rounded-lg w-44"
              />

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-3 py-2 border rounded-lg w-44"
              >
                <option value="">All Categories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>

              <select
                value={postType}
                onChange={(e) => setPostType(e.target.value)}
                className="px-3 py-2 border rounded-lg w-40"
              >
                <option value="">All Post Types</option>
                {postTypes.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name}
                  </option>
                ))}
              </select>

              <select
                value={isPublished}
                onChange={(e) => setIsPublished(e.target.value)}
                className="px-3 py-2 border rounded-lg w-36"
              >
                <option value="">Published?</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>

              <select
                value={isActive}
                onChange={(e) => setIsActive(e.target.value)}
                className="px-3 py-2 border rounded-lg w-32"
              >
                <option value="">Active?</option>
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>

              <button
                onClick={resetFilters}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border bg-gray-100"
              >
                <RotateCcw size={16} /> Reset
              </button>
            </div>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="py-20 text-center text-gray-600">
            Loading posts...
          </div>
        )}

        {/* Empty */}
        {!loading && posts.length === 0 && (
          <div className="bg-white rounded-2xl shadow p-12 text-center">
            <ImageIcon className="mx-auto mb-4 text-blue-600" size={48} />
            <p className="text-gray-600">No posts found</p>
          </div>
        )}

        {/* Cards */}
        {/* Cards */}
        {!loading && posts.length > 0 && (
          <div className="h-[70vh] overflow-y-auto px-4 custom-scrollbar">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {posts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => {
                    setViewPost(post);
                    setShowDetailModal(true);
                  }}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer"
                >
                  {/* IMAGE */}
                  <div className="h-40 rounded-t-xl overflow-hidden bg-gray-100">
                    {post.postPreviewUrls?.length > 0 ? (
                      <img
                        src={post.postPreviewUrls[0]}
                        alt={post.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-5xl font-bold">
                        {post.title?.charAt(0)}
                      </div>
                    )}
                  </div>

                  {/* BODY */}
                  <div className="p-5 text-start">
                    <h3 className="font-bold text-lg mb-2">{post.title}</h3>

                    <p className="text-sm text-gray-600 mb-3">
                      {getPlainText(post.shortDescription, 30)}
                    </p>

                    <div className="text-xs text-gray-500 mb-3">
                      <p>{post.category?.name}</p>
                      <p>{post.postType?.name}</p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPost(post);
                          setShowUpdateModal(true);
                        }}
                        className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm
               flex items-center justify-center gap-2"
                      >
                        <Edit2 size={14} />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPost(post);
                          setShowDeleteModal(true);
                        }}
                        className="flex-1 bg-red-600 text-white py-2 rounded-lg text-sm
               flex items-center justify-center gap-2"
                      >
                        <Trash2 size={14} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Pagination */}
        {totalPosts > limit && (
          <div className="flex justify-center gap-4 mt-8">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Prev
            </button>

            <span className="px-4 py-2 font-medium">Page {page}</span>

            <button
              disabled={posts.length < limit}
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      {showAddModal && (
        <AddBlogModal
          onClose={() => setShowAddModal(false)}
          onSuccess={handleSuccess}
        />
      )}

      {showUpdateModal && selectedPost && (
        <AddBlogModal
          blog={selectedPost}
          onClose={() => {
            setShowUpdateModal(false);
            setSelectedPost(null);
          }}
          onSuccess={handleSuccess}
        />
      )}

      {showDeleteModal && selectedPost && (
        <DeleteModal
          type="post"
          item={selectedPost}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedPost(null);
          }}
          onSuccess={handleSuccess}
        />
      )}

      {showDetailModal && viewPost && (
        <PostDetailModal
          isOpen={showDetailModal}
          post={viewPost}
          onClose={() => {
            setShowDetailModal(false);
            setViewPost(null);
          }}
          onEdit={(post) => {
            setShowDetailModal(false);
            setSelectedPost(post);
            setShowUpdateModal(true);
          }}
        />
      )}
    </div>
  );
};

export default AddBlog;
