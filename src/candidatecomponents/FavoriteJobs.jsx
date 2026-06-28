import React, { useState } from "react";

const demoFavorites = [
  { id: 1, title: "Fullstack Engineer", company: "Tech Corp" },
  { id: 2, title: "UI Developer", company: "Design Studio" },
];

const FavoriteJobs = () => {
  const [favorites, setFavorites] = useState(demoFavorites);

  const remove = (id) => setFavorites((f) => f.filter((x) => x.id !== id));

  return (
    <div className="p-6 bg-white rounded-lg shadow min-h-[70vh]">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Favorite Jobs</h2>
        <p className="text-sm text-gray-500">{favorites.length} saved</p>
      </div>

      <div className="space-y-3">
        {favorites.map((job) => (
          <div
            key={job.id}
            className="border rounded-lg p-4 hover:shadow-md transition flex items-center justify-between"
          >
            <div>
              <h4 className="font-medium text-gray-900">{job.title}</h4>
              <p className="text-xs text-gray-500">{job.company}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => remove(job.id)}
                className="text-red-600 text-xs hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteJobs;
