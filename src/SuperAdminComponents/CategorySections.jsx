import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, ImageIcon } from "lucide-react";

import CategoryModal from "./CategoryModal";
import DeleteCategoryModal from "./DeleteCategoryModal";
import { getAllCategories } from "../api/service2";
import { DashboardCard } from "../components/dashboard/DashboardUI";

// Main Component
const CategorySections = () => {
  const [categories, setCategories] = useState([]);
  const [totalCategories, setTotalCategories] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await getAllCategories();
      setCategories(res.data.categories);
      setTotalCategories(res.data.categoryCount);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSuccess = () => {
    fetchCategories();
  };

  return (
    <>
        <DashboardCard padding={false} className="mb-4 sm:mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 sm:p-5 lg:p-6">
            <p className="text-blue-700 text-sm sm:text-base">
              Total categories:{" "}
              <span className="font-semibold text-blue-900">{totalCategories}</span>
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:bg-blue-700 transition-all font-medium w-full md:w-auto"
            >
              <Plus className="w-5 h-5" />
              Add Category
            </button>
          </div>
        </DashboardCard>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <svg
                className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <p className="text-gray-600">Loading categories...</p>
            </div>
          </div>
        )}

        {/* No Categories */}
        {!loading && categories.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ImageIcon className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No categories found
            </h3>
            <p className="text-gray-600 mb-6">
              Get started by creating your first job category
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all font-medium"
            >
              <Plus className="w-5 h-5" />
              Add Your First Category
            </button>
          </div>
        )}

        {/* Categories Grid */}

        <div className="px-2 sm:px-4">
          {!loading && categories.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ml-4">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden group"
                >
                  {/* Category Image */}
                  <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-600 relative overflow-hidden">
                    {category.categoryPreviewUrls ? (
                      <img
                        src={category.categoryPreviewUrls}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-6xl font-bold text-white opacity-80">
                          {category.name?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}

                    {/* Status Badge */}
                    <div className="absolute top-3 right-3">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                          category.is_active
                            ? "bg-green-500/90 text-white"
                            : "bg-red-500/90 text-white"
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            category.is_active ? "bg-white" : "bg-white"
                          }`}
                        ></span>
                        {category.is_active ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>

                  {/* Category Content */}
                  <div className="p-6 text-start">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {category.description}
                    </p>

                    <div className="space-y-2 text-xs text-gray-500 mb-4">
                      <p>
                        Created by:{" "}
                        <span className="font-medium text-gray-700">
                          {category.createdBy}
                        </span>
                      </p>
                      <p>
                        Created:{" "}
                        <span className="font-medium text-gray-700">
                          {new Date(category.createdAt).toLocaleDateString()}
                        </span>
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedCategory(category);
                          setShowUpdateModal(true);
                        }}
                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all font-medium text-sm"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setSelectedCategory(category);
                          setShowDeleteModal(true);
                        }}
                        className="flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium text-sm"
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
        <CategoryModal
          onClose={() => setShowAddModal(false)}
          onSuccess={handleSuccess}
        />
      )}

      {showUpdateModal && selectedCategory && (
        <CategoryModal
          category={selectedCategory}
          onClose={() => {
            setShowUpdateModal(false);
            setSelectedCategory(null);
          }}
          onSuccess={handleSuccess}
        />
      )}

      {showDeleteModal && selectedCategory && (
        <DeleteCategoryModal
          category={selectedCategory}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedCategory(null);
          }}
          onSuccess={handleSuccess}
        />
      )}

      <style>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default CategorySections;
