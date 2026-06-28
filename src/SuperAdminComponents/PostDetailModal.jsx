import React, { useState, useEffect } from "react";
import { X, Calendar, User, Tag, Eye } from "lucide-react";

const PostDetailModal = ({ isOpen, post, onClose, onEdit }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [post]);

  if (!isOpen || !post) return null;

  const images = post.postImageUrls || [];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 text-start">
      <div className="bg-white rounded-lg max-w-7xl w-full max-h-[90vh]  shadow-2xl custom-scrollbar">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">{post.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Image Gallery */}
          {images.length > 0 && (
            <div className="mb-6">
              <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={images[currentImageIndex]}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />

                {images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2.5 h-2.5 rounded-full ${
                          currentImageIndex === index
                            ? "bg-white"
                            : "bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Meta */}
          <div className="flex flex-wrap gap-3 mb-5">
            {post.category?.name && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                <Tag className="w-4 h-4" />
                {post.category.name}
              </span>
            )}

            {post.postType?.name && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                <Eye className="w-4 h-4" />
                {post.postType.name}
              </span>
            )}

            {post.isPublished && (
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
                Published
              </span>
            )}
          </div>

          {/* Short Description */}
          {post.shortDescription && (
            <div className="mb-5">
              <h3 className="font-semibold mb-1">Short Description</h3>
              <div
                className="text-gray-600"
                dangerouslySetInnerHTML={{
                  __html: post.shortDescription,
                }}
              />
            </div>
          )}

          {/* Content */}
          {post.content && (
            <div className="mb-6">
              <h3 className="font-semibold mb-1">Content</h3>
              <div
                className="text-gray-600"
                dangerouslySetInnerHTML={{
                  __html: post.content,
                }}
              />
            </div>
          )}

          {/* Footer Info */}
          <div className="border-t pt-4 space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Created by <strong>{post.createdBy}</strong>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(post.createdAt).toLocaleString()}
            </div>
            <div className="text-xs text-gray-400 mt-1">
              ID: {post.postUniqueID}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="sticky bottom-0 bg-gray-50 border-t px-6 py-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg hover:bg-gray-200"
          >
            Close
          </button>

          {onEdit && (
            <button
              onClick={() => onEdit(post)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Edit Post
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetailModal;
