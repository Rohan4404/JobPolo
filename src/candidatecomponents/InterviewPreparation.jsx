import React, { useEffect, useState } from "react";
import { Map, CheckCircle, Circle, Brain, Star } from "lucide-react";
import { getUserProfile, getJobs } from "../api/service2";
import { DashboardCard, DashboardLoader } from "../components/dashboard/DashboardUI";

/* ================= ROADMAP SOURCES ================= */

const TECH_ROADMAP_MAP = {
  frontend: "frontend",
  react: "frontend",
  backend: "backend",
  node: "backend",
  fullstack: "fullstack",
  devops: "devops",
  data: "ai-data-scientist",
  ai: "ai-data-scientist",
};

const MARKETING_ROADMAP = [
  "Marketing Fundamentals",
  "Consumer Psychology",
  "Brand Strategy",
  "Advertising Basics",
  "Digital Marketing Overview",
  "SEO Fundamentals",
  "Google Ads & SEM",
  "Social Media Marketing",
  "Meta Ads (Facebook & Instagram)",
  "Content Marketing",
  "Influencer Marketing",
  "Email Marketing",
  "Marketing Analytics",
  "A/B Testing & CRO",
  "Performance Marketing",
  "Campaign Planning",
  "Budgeting & ROI",
  "Marketing Automation",
  "Case Studies",
  "Mock Interview Practice",
].map((label, index) => ({ id: `m-${index}`, label }));

/* ================= AI QUESTIONS ================= */

const generateAIQuestions = (topic) => [
  `Explain ${topic} in simple terms.`,
  `Why is ${topic} important in real-world scenarios?`,
  `Give a real example where ${topic} was used successfully.`,
  `What mistakes do beginners make in ${topic}?`,
  `How would you measure success for ${topic}?`,
];

/* ================= COMPONENT ================= */

const InterviewPreparation = () => {
  const [loading, setLoading] = useState(true);
  const [industry, setIndustry] = useState("");
  const [roadmap, setRoadmap] = useState([]);
  const [completed, setCompleted] = useState({});
  const [matchedSkills, setMatchedSkills] = useState([]);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      const profileRes = await getUserProfile();
      const industryName =
        profileRes?.data?.filteredUser?.employee?.industry || "";
      setIndustry(industryName);

      const jobRes = await getJobs(1, 10);
      const skills =
        jobRes?.jobs?.flatMap((j) => j.skills || []) || [];
      setMatchedSkills(skills.map((s) => s.toLowerCase()));

      const saved =
        JSON.parse(localStorage.getItem("roadmapProgress")) || {};
      setCompleted(saved);

      const lowerIndustry = industryName.toLowerCase();

      if (
        lowerIndustry.includes("marketing") ||
        lowerIndustry.includes("advertising") ||
        lowerIndustry.includes("brand")
      ) {
        setRoadmap(MARKETING_ROADMAP);
        return;
      }

      const key = Object.keys(TECH_ROADMAP_MAP).find((k) =>
        lowerIndustry.includes(k)
      );

      if (key) {
        const res = await fetch(
          `https://raw.githubusercontent.com/kamranahmedse/developer-roadmap/master/src/data/roadmaps/${TECH_ROADMAP_MAP[key]}.json`
        );
        const data = await res.json();
        setRoadmap(Object.values(data.nodes).slice(0, 20));
        return;
      }

      setRoadmap([]);
    } catch (err) {
      console.error("Interview prep error", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleStep = (id) => {
    const updated = { ...completed, [id]: !completed[id] };
    setCompleted(updated);
    localStorage.setItem("roadmapProgress", JSON.stringify(updated));
  };

  const progressPercent =
    roadmap.length === 0
      ? 0
      : Math.round(
          (Object.values(completed).filter(Boolean).length /
            roadmap.length) *
            100
        );

  /* ================= LOADER ================= */

  if (loading) {
    return <DashboardLoader message="Preparing your interview roadmap..." />;
  }

  return (
    <>
      <div className="mb-4 sm:mb-6 flex-shrink-0">
        <p className="text-blue-700 text-sm sm:text-base">
          Industry roadmap for{" "}
          <strong className="text-blue-900">{industry || "your profile"}</strong>
        </p>
        <div className="mt-3 bg-blue-100 rounded-full h-3 overflow-hidden">
          <div
            className="h-3 bg-gradient-to-r from-blue-500 to-blue-700 transition-all"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-sm text-blue-600 mt-1">Progress: {progressPercent}%</p>
      </div>

      <DashboardCard>

        <h3 className="text-lg font-bold text-blue-900 border-b-2 border-blue-500 pb-2 mb-4">
          Roadmap Steps
        </h3>

        {roadmap.length > 0 ? (
          <div className="space-y-5">
            {roadmap.map((step, index) => {
              const label = step.label || step.name || "Step";
              const id = step.id || index;

              const isMatched = matchedSkills.some((s) =>
                label.toLowerCase().includes(s)
              );

              return (
                <div
                  key={id}
                  className={`p-4 rounded-lg border ${
                    isMatched
                      ? "border-amber-400 bg-amber-50"
                      : "border-blue-100 bg-gray-50"
                  }`}
                >
                  <div className="flex gap-4">
                    <button onClick={() => toggleStep(id)}>
                      {completed[id] ? (
                        <CheckCircle className="text-green-600" />
                      ) : (
                        <Circle className="text-gray-400" />
                      )}
                    </button>

                    <div className="flex-1">
                      <h4 className="font-semibold text-blue-900 flex items-center gap-2">
                        Step {index + 1}: {label}
                        {isMatched && (
                          <Star size={16} className="text-amber-500" />
                        )}
                      </h4>

                      {/* QUESTIONS */}
                      <div className="mt-3 bg-white p-3 rounded-lg border border-gray-200">
                        <h5 className="text-sm font-semibold text-indigo-700 flex items-center gap-1">
                          <Brain size={16} />
                          Interview Questions
                        </h5>

                        <ul className="list-disc list-inside text-sm text-gray-700 mt-2 space-y-1">
                          {generateAIQuestions(label).map((q, i) => (
                            <li key={i}>{q}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="bg-gray-50 p-4 rounded-lg text-gray-700">
            No roadmap available for this industry yet.
          </p>
        )}
      </DashboardCard>
    </>
  );
};

export default InterviewPreparation;
