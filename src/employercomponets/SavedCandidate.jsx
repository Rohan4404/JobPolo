import React, { useState } from "react";
import { DashboardCard } from "../components/dashboard/DashboardUI";
import {
  ArrowRight,
  Bookmark,
  MoreVertical,
  Mail,
  Download,
} from "lucide-react";

const candidatesData = [
  {
    id: 1,
    name: "Guy Hawkins",
    position: "Technical Support Specialist",
    saved: true,
  },
  { id: 2, name: "Jacob Jones", position: "Product Designer", saved: true },
  {
    id: 3,
    name: "Cameron Williamson",
    position: "Marketing Officer",
    saved: true,
  },
  { id: 4, name: "Robert Fox", position: "Marketing Manager", saved: true },
  {
    id: 5,
    name: "Kathryn Murphy",
    position: "Junior Graphic Designer",
    saved: true,
  },
  {
    id: 6,
    name: "Darlene Robertson",
    position: "Visual Designer",
    saved: true,
  },
  {
    id: 7,
    name: "Kristin Watson",
    position: "Senior UX Designer",
    saved: true,
  },
  {
    id: 8,
    name: "Jenny Wilson",
    position: "Interaction Designer",
    saved: true,
  },
  {
    id: 9,
    name: "Marvin McKinney",
    position: "Networking Engineer",
    saved: true,
  },
  { id: 10, name: "Theresa Webb", position: "Software Engineer", saved: true },
];

const SavedCandidates = () => {
  const [candidates, setCandidates] = useState(candidatesData);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  const toggleBookmark = (id) => {
    setCandidates(
      candidates.map((c) => (c.id === id ? { ...c, saved: !c.saved } : c))
    );
  };

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  return (
    <DashboardCard className="space-y-2">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-2 flex-shrink-0">
        <p className="text-sm text-blue-700">
          All candidates visible until 24 March, 2021
        </p>
      </div>

      {candidates.map((candidate) => (
            <div
              key={candidate.id}
              className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                hoveredId === candidate.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 bg-white hover:bg-gray-50"
              }`}
              onMouseEnter={() => setHoveredId(candidate.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Left: Avatar and Info */}
              <div className="flex items-center gap-3 flex-1">
                <div className="w-12 h-12 bg-gray-400 rounded flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm text-left">
                    {candidate.name}
                  </h3>
                  <p className="text-gray-500 text-xs text-left">
                    {candidate.position}
                  </p>
                </div>
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-2">
                {/* Bookmark */}
                <button
                  onClick={() => toggleBookmark(candidate.id)}
                  className="p-2 hover:bg-gray-100 rounded transition-colors"
                >
                  <Bookmark
                    size={18}
                    className={
                      candidate.saved
                        ? "fill-blue-600 text-blue-600"
                        : "text-gray-400"
                    }
                  />
                </button>

                {/* View Profile Button */}
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded text-sm font-medium hover:bg-blue-100 transition-colors">
                  View Profile
                  <ArrowRight size={16} />
                </button>

                {/* More Menu */}
                <div className="relative">
                  <button
                    onClick={() => toggleMenu(candidate.id)}
                    className="p-2 hover:bg-gray-100 rounded transition-colors"
                  >
                    <MoreVertical size={18} className="text-gray-600" />
                  </button>

                  {/* Dropdown Menu */}
                  {openMenuId === candidate.id && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setOpenMenuId(null)}
                      ></div>
                      <div className="absolute right-0 top-10 bg-white rounded-lg shadow-lg border py-2 w-40 z-20">
                        <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 text-gray-700">
                          <Mail size={14} />
                          Send Email
                        </button>
                        <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 text-gray-700">
                          <Download size={14} />
                          Download Cv
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
    </DashboardCard>
  );
};

export default SavedCandidates;
