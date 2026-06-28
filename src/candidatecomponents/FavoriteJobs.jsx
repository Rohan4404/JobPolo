import React, { useState } from "react";
import { DashboardCard } from "../components/dashboard/DashboardUI";

const demoFavorites = [
  { id: 1, title: "Fullstack Engineer", company: "Tech Corp" },
  { id: 2, title: "UI Developer", company: "Design Studio" },
];

const FavoriteJobs = () => {
  const [favorites, setFavorites] = useState(demoFavorites);

  const remove = (id) => setFavorites((f) => f.filter((x) => x.id !== id));

  return (
    <DashboardCard className="space-y-3">
      <div className="flex items-center justify-between mb-2 flex-shrink-0">
        <p className="text-sm text-blue-700 font-medium">
          {favorites.length} saved
        </p>
      </div>

      {favorites.map((job) => (
        <div
          key={job.id}
          className="border border-blue-100 rounded-xl p-4 hover:shadow-md transition flex items-center justify-between bg-white"
        >
          <div>
            <h4 className="font-medium text-blue-900">{job.title}</h4>
            <p className="text-xs text-blue-600">{job.company}</p>
          </div>
          <button
            onClick={() => remove(job.id)}
            className="text-red-600 text-xs hover:underline"
          >
            Remove
          </button>
        </div>
      ))}
    </DashboardCard>
  );
};

export default FavoriteJobs;
