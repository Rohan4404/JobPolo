import React, { useState, useRef } from "react";
import html2pdf from "html2pdf.js";
import { Download, Eye, Sparkles, FileText, Briefcase, GraduationCap, Award, Code, User, Mail, Phone, MapPin, Linkedin, Github, Trash2, Plus, Wand2, Star, TrendingUp } from "lucide-react";
/////
const ResumeBuilder = () => {
  const previewRef = useRef(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [template, setTemplate] = useState("modern");
  const [activeTab, setActiveTab] = useState("personal");
  const [aiMode, setAiMode] = useState(false);
  const [loading, setLoading] = useState(true);

  const [resume, setResume] = useState({
    personal: {
      name: "",
      role: "",
      email: "",
      phone: "",
      city: "",
      linkedin: "",
      github: "",
      website: "",
    },
    summary: "",
    skills: [],
    experience: [
      { role: "", company: "", duration: "", location: "", points: [""] },
    ],
    projects: [
      { title: "", tech: "", description: "", link: "" },
    ],
    education: [
      { degree: "", institute: "", year: "", gpa: "" },
    ],
    certifications: [],
    languages: [],
    achievements: [],
  });

  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // ATS Score Calculation - Dynamic based on actual content
  const calculateATS = () => {
    let score = 0;
    let maxScore = 100;
    
    // Personal Information (20 points)
    if (resume.personal.name && resume.personal.name.length > 2) score += 5;
    if (resume.personal.email && resume.personal.email.includes('@')) score += 5;
    if (resume.personal.phone && resume.personal.phone.length >= 10) score += 5;
    if (resume.personal.role && resume.personal.role.length > 3) score += 5;
    
    // Professional Summary (15 points)
    if (resume.summary.length > 50) score += 5;
    if (resume.summary.length > 100) score += 5;
    if (resume.summary.length > 150) score += 5;
    
    // Skills (20 points)
    const skillCount = resume.skills.length;
    if (skillCount >= 3) score += 5;
    if (skillCount >= 6) score += 5;
    if (skillCount >= 10) score += 5;
    if (skillCount >= 15) score += 5;
    
    // Work Experience (25 points)
    const validExperience = resume.experience.filter(exp => 
      exp.role && exp.company && exp.duration
    );
    if (validExperience.length >= 1) score += 8;
    if (validExperience.length >= 2) score += 8;
    if (validExperience.length >= 3) score += 9;
    
    // Experience bullet points
    const hasDetailedExperience = resume.experience.some(exp => 
      exp.points && exp.points.filter(p => p && p.length > 20).length >= 2
    );
    if (hasDetailedExperience) score += 5;
    
    // Projects (10 points)
    const validProjects = resume.projects.filter(proj => 
      proj.title && proj.description && proj.description.length > 20
    );
    if (validProjects.length >= 1) score += 5;
    if (validProjects.length >= 2) score += 5;
    
    // Education (10 points)
    const validEducation = resume.education.filter(edu => 
      edu.degree && edu.institute && edu.year
    );
    if (validEducation.length >= 1) score += 10;
    
    return Math.min(score, maxScore);
  };

  const atsScore = calculateATS();
  
  // Job Match Score - Based on profile completeness and keyword richness
  const calculateJobMatch = () => {
    let score = 0;
    
    // Keywords in summary (30 points)
    const summaryKeywords = resume.summary.toLowerCase();
    const hasActionWords = ['led', 'managed', 'developed', 'created', 'improved', 'increased'].some(word => 
      summaryKeywords.includes(word)
    );
    if (hasActionWords) score += 15;
    if (resume.summary.length > 100) score += 15;
    
    // Skills variety (40 points)
    const skillCount = resume.skills.length;
    score += Math.min(skillCount * 3, 40);
    
    // Complete profile (30 points)
    if (resume.personal.linkedin || resume.personal.github) score += 10;
    if (resume.certifications.length > 0) score += 10;
    if (resume.languages.length > 0) score += 10;
    
    return Math.min(score, 100);
  };
  
  const jobMatch = calculateJobMatch();

  const getScoreColor = (score) => {
    if (score >= 80) return "text-emerald-600";
    if (score >= 60) return "text-amber-600";
    if (score >= 40) return "text-orange-600";
    return "text-rose-600";
  };

  const getScoreBg = (score) => {
    if (score >= 80) return "from-emerald-50 to-emerald-100 border-emerald-300";
    if (score >= 60) return "from-amber-50 to-amber-100 border-amber-300";
    if (score >= 40) return "from-orange-50 to-orange-100 border-orange-300";
    return "from-rose-50 to-rose-100 border-rose-300";
  };

  const getScoreBarColor = (score) => {
    if (score >= 80) return "bg-gradient-to-r from-emerald-500 to-emerald-600";
    if (score >= 60) return "bg-gradient-to-r from-amber-500 to-amber-600";
    if (score >= 40) return "bg-gradient-to-r from-orange-500 to-orange-600";
    return "bg-gradient-to-r from-rose-500 to-rose-600";
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Needs Work";
  };

  // Helpers
  const updatePersonal = (k, v) =>
    setResume({ ...resume, personal: { ...resume.personal, [k]: v } });

  const addTag = (field, value) => {
    if (!value.trim()) return;
    setResume({ ...resume, [field]: [...resume[field], value] });
  };

  const removeTag = (field, index) => {
    setResume({
      ...resume,
      [field]: resume[field].filter((_, i) => i !== index),
    });
  };

  const addExperience = () => {
    setResume({
      ...resume,
      experience: [...resume.experience, { role: "", company: "", duration: "", location: "", points: [""] }],
    });
  };

  const removeExperience = (index) => {
    setResume({
      ...resume,
      experience: resume.experience.filter((_, i) => i !== index),
    });
  };

  const updateExperience = (index, field, value) => {
    const updated = [...resume.experience];
    updated[index][field] = value;
    setResume({ ...resume, experience: updated });
  };

  const addExpPoint = (expIndex) => {
    const updated = [...resume.experience];
    updated[expIndex].points.push("");
    setResume({ ...resume, experience: updated });
  };

  const updateExpPoint = (expIndex, pointIndex, value) => {
    const updated = [...resume.experience];
    updated[expIndex].points[pointIndex] = value;
    setResume({ ...resume, experience: updated });
  };

  const removeExpPoint = (expIndex, pointIndex) => {
    const updated = [...resume.experience];
    updated[expIndex].points = updated[expIndex].points.filter((_, i) => i !== pointIndex);
    setResume({ ...resume, experience: updated });
  };

  const addProject = () => {
    setResume({
      ...resume,
      projects: [...resume.projects, { title: "", tech: "", description: "", link: "" }],
    });
  };

  const removeProject = (index) => {
    setResume({
      ...resume,
      projects: resume.projects.filter((_, i) => i !== index),
    });
  };

  const updateProject = (index, field, value) => {
    const updated = [...resume.projects];
    updated[index][field] = value;
    setResume({ ...resume, projects: updated });
  };

  const addEducation = () => {
    setResume({
      ...resume,
      education: [...resume.education, { degree: "", institute: "", year: "", gpa: "" }],
    });
  };

  const removeEducation = (index) => {
    setResume({
      ...resume,
      education: resume.education.filter((_, i) => i !== index),
    });
  };

  const updateEducation = (index, field, value) => {
    const updated = [...resume.education];
    updated[index][field] = value;
    setResume({ ...resume, education: updated });
  };

  const downloadPDF = () => {
    html2pdf()
      .from(previewRef.current)
      .set({
        filename: `${resume.personal.name || 'Resume'}.pdf`,
        margin: [10, 10, 10, 10],
        html2canvas: { scale: 3, useCORS: true },
        jsPDF: { format: "a4", orientation: "portrait" },
      })
      .save();
  };

  const tabs = [
    { id: "personal", label: "Personal", icon: User },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "projects", label: "Projects", icon: Code },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "skills", label: "Skills", icon: Star },
    { id: "extras", label: "Extras", icon: Award },
  ];

  const aiSuggestions = {
    summary: "Results-driven professional with 5+ years of experience in software development, specializing in full-stack web applications. Proven track record of delivering scalable solutions and leading cross-functional teams.",
    skills: ["React", "Node.js", "Python", "SQL", "AWS", "Docker", "Git", "REST APIs"],
    achievements: [
      "Increased application performance by 40% through optimization",
      "Led team of 5 developers to successful project delivery",
      "Reduced deployment time by 60% using CI/CD pipelines",
    ],
  };

  // Loading state
  if (loading) {
    return (
      <div className="section-loader">
        <div className="flex flex-col items-center">
          <div className="page-loader-spinner mb-3"></div>
          <p className="page-loader-text">Resume Builder Pro...</p>
        </div>
      </div>
    );
  }

  return (
 <div className="w-full  flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 p-4 text-left">





      {/* Floating Header */}
     <div className="w-full h-full flex flex-col">
        
         
        

{/* Main Content */}
<div className="flex-1">



  {/* RIGHT CONTENT */}
  
    
    <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100 h-[82vh] flex-1 flex flex-col">
     <div className="flex flex-wrap gap-4 justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-3">
                <Sparkles className="text-indigo-500" />
                Resume Builder Pro
              </h1>
              <p className="text-indigo-700 text-sm mt-1">
                ATS-Optimized • AI-Powered • Job-Ready in Minutes
              </p>
            </div>

            <div className="flex gap-3">
              <button
                className="flex items-center gap-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all"
                onClick={() => setPreviewOpen(true)}
              >
                <Eye size={20} />
                Preview
              </button>
              <button
                className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all"
                onClick={downloadPDF}
              >
                <Download size={20} />
                Export PDF
              </button>
            </div>
          </div>

          {/* ATS Scores */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 mb-6">
            <div className={`bg-gradient-to-br ${getScoreBg(atsScore)} border-2 rounded-xl p-4 backdrop-blur transition-all duration-300`}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">ATS Score</p>
                  <p className={`text-3xl font-bold ${getScoreColor(atsScore)} transition-all duration-300`}>
                    {atsScore}%
                  </p>
                  <p className={`text-xs font-semibold ${getScoreColor(atsScore)} mt-1`}>
                    {getScoreLabel(atsScore)}
                  </p>
                </div>
                <TrendingUp className={getScoreColor(atsScore)} size={32} />
              </div>
              <div className="mt-3 bg-gray-200 rounded-full h-2.5 ">
                <div
                  className={`h-2.5 rounded-full transition-all duration-500 ${getScoreBarColor(atsScore)}`}
                  style={{ width: `${atsScore}%` }}
                />
              </div>
              <p className="text-xs text-gray-600 mt-2">
                {atsScore < 40 && "Add more details to improve"}
                {atsScore >= 40 && atsScore < 60 && "Keep adding content"}
                {atsScore >= 60 && atsScore < 80 && "Almost there!"}
                {atsScore >= 80 && "Great! Ready for ATS systems"}
              </p>
            </div>

            <div className={`bg-gradient-to-br ${getScoreBg(jobMatch)} border-2 rounded-xl p-4 transition-all duration-300`}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">Job Match</p>
                  <p className={`text-3xl font-bold ${getScoreColor(jobMatch)} transition-all duration-300`}>
                    {jobMatch}%
                  </p>
                  <p className={`text-xs font-semibold ${getScoreColor(jobMatch)} mt-1`}>
                    {getScoreLabel(jobMatch)}
                  </p>
                </div>
                <Star className={getScoreColor(jobMatch)} size={32} />
              </div>
              <div className="mt-3 bg-gray-200 rounded-full h-2.5 ">
                <div
                  className={`h-2.5 rounded-full transition-all duration-500 ${getScoreBarColor(jobMatch)}`}
                  style={{ width: `${jobMatch}%` }}
                />
              </div>
              <p className="text-xs text-gray-600 mt-2">
                {jobMatch < 40 && "Add more skills & keywords"}
                {jobMatch >= 40 && jobMatch < 60 && "Improve your summary"}
                {jobMatch >= 60 && jobMatch < 80 && "Looking good!"}
                {jobMatch >= 80 && "Excellent match potential"}
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-indigo-300 rounded-xl p-4 transition-all duration-300">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">Completeness</p>
                  <p className="text-3xl font-bold text-indigo-600 transition-all duration-300">
                    {Math.round((
                      (resume.personal.name ? 1 : 0) + 
                      (resume.personal.email ? 1 : 0) + 
                      (resume.summary.length > 50 ? 1 : 0) + 
                      (resume.skills.length > 0 ? 1 : 0) + 
                      (resume.experience[0].role ? 1 : 0) +
                      (resume.projects[0].title ? 1 : 0) +
                      (resume.education[0].degree ? 1 : 0)
                    ) / 7 * 100)}%
                  </p>
                  <p className="text-xs font-semibold text-indigo-600 mt-1">
                    {Math.round(((resume.personal.name ? 1 : 0) + (resume.personal.email ? 1 : 0) + (resume.summary.length > 50 ? 1 : 0) + (resume.skills.length > 0 ? 1 : 0) + (resume.experience[0].role ? 1 : 0) + (resume.projects[0].title ? 1 : 0) + (resume.education[0].degree ? 1 : 0)) / 7 * 100) < 50 ? "Getting Started" : Math.round(((resume.personal.name ? 1 : 0) + (resume.personal.email ? 1 : 0) + (resume.summary.length > 50 ? 1 : 0) + (resume.skills.length > 0 ? 1 : 0) + (resume.experience[0].role ? 1 : 0) + (resume.projects[0].title ? 1 : 0) + (resume.education[0].degree ? 1 : 0)) / 7 * 100) < 80 ? "In Progress" : "Complete"}
                  </p>
                </div>
                <FileText className="text-indigo-600" size={32} />
              </div>
              <div className="mt-3 bg-gray-200 rounded-full h-2.5 ">
                <div
                  className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500"
                  style={{ width: `${Math.round(((resume.personal.name ? 1 : 0) + (resume.personal.email ? 1 : 0) + (resume.summary.length > 50 ? 1 : 0) + (resume.skills.length > 0 ? 1 : 0) + (resume.experience[0].role ? 1 : 0) + (resume.projects[0].title ? 1 : 0) + (resume.education[0].degree ? 1 : 0)) / 7 * 100)}%` }}
                />
              </div>
              <p className="text-xs text-gray-600 mt-2">
                {Math.round(((resume.personal.name ? 1 : 0) + (resume.personal.email ? 1 : 0) + (resume.summary.length > 50 ? 1 : 0) + (resume.skills.length > 0 ? 1 : 0) + (resume.experience[0].role ? 1 : 0) + (resume.projects[0].title ? 1 : 0) + (resume.education[0].degree ? 1 : 0)) / 7 * 100) < 50 && "Fill in basic information"}
                {Math.round(((resume.personal.name ? 1 : 0) + (resume.personal.email ? 1 : 0) + (resume.summary.length > 50 ? 1 : 0) + (resume.skills.length > 0 ? 1 : 0) + (resume.experience[0].role ? 1 : 0) + (resume.projects[0].title ? 1 : 0) + (resume.education[0].degree ? 1 : 0)) / 7 * 100) >= 50 && Math.round(((resume.personal.name ? 1 : 0) + (resume.personal.email ? 1 : 0) + (resume.summary.length > 50 ? 1 : 0) + (resume.skills.length > 0 ? 1 : 0) + (resume.experience[0].role ? 1 : 0) + (resume.projects[0].title ? 1 : 0) + (resume.education[0].degree ? 1 : 0)) / 7 * 100) < 80 && "Add more sections"}
                {Math.round(((resume.personal.name ? 1 : 0) + (resume.personal.email ? 1 : 0) + (resume.summary.length > 50 ? 1 : 0) + (resume.skills.length > 0 ? 1 : 0) + (resume.experience[0].role ? 1 : 0) + (resume.projects[0].title ? 1 : 0) + (resume.education[0].degree ? 1 : 0)) / 7 * 100) >= 80 && "All sections filled!"}
              </p>
            </div>
          </div>  
{/* TOP TABS */}
<div className="flex flex-wrap gap-2 mb-4 border-b pb-2">
  {tabs.map((tab) => {
    const Icon = tab.icon;
    return (
      <button
        key={tab.id}
        onClick={() => setActiveTab(tab.id)}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
          activeTab === tab.id
            ? "bg-blue-600 text-white"
            : "bg-gray-100 text-gray-700"
        }`}
      >
        <Icon size={16} />
        {tab.label}
      </button>
    );
  })}
</div>
      {/* 🔥 ONLY THIS PART SCROLLS (NOT PAGE) */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-6">

                {/* Personal Details */}
                {activeTab === "personal" && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center gap-2">
                      <User className="text-indigo-500" />
                      Personal Details
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        className="input-modern"
                        placeholder="Full Name *"
                        value={resume.personal.name}
                        onChange={(e) => updatePersonal("name", e.target.value)}
                      />
                      <input
                        className="input-modern"
                        placeholder="Professional Title *"
                        value={resume.personal.role}
                        onChange={(e) => updatePersonal("role", e.target.value)}
                      />
                      <input
                        className="input-modern"
                        placeholder="Email Address *"
                        type="email"
                        value={resume.personal.email}
                        onChange={(e) => updatePersonal("email", e.target.value)}
                      />
                      <input
                        className="input-modern"
                        placeholder="Phone Number *"
                        value={resume.personal.phone}
                        onChange={(e) => updatePersonal("phone", e.target.value)}
                      />
                      <input
                        className="input-modern"
                        placeholder="City, Country"
                        value={resume.personal.city}
                        onChange={(e) => updatePersonal("city", e.target.value)}
                      />
                      <input
                        className="input-modern"
                        placeholder="LinkedIn Profile"
                        value={resume.personal.linkedin}
                        onChange={(e) => updatePersonal("linkedin", e.target.value)}
                      />
                      <input
                        className="input-modern"
                        placeholder="GitHub Profile"
                        value={resume.personal.github}
                        onChange={(e) => updatePersonal("github", e.target.value)}
                      />
                      <input
                        className="input-modern"
                        placeholder="Personal Website"
                        value={resume.personal.website}
                        onChange={(e) => updatePersonal("website", e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="text-indigo-700 font-semibold mb-2 block">Professional Summary *</label>
                      <textarea
                        className="input-modern h-32"
                        placeholder="Write a compelling 2-3 line summary highlighting your key strengths and experience..."
                        value={resume.summary}
                        onChange={(e) => setResume({ ...resume, summary: e.target.value })}
                      />
                      {aiMode && (
                        <button
                          className="mt-2 text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-1 font-medium"
                          onClick={() => setResume({ ...resume, summary: aiSuggestions.summary })}
                        >
                          <Sparkles size={14} />
                          Use AI suggestion
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Experience */}
                {activeTab === "experience" && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center gap-2">
                        <Briefcase className="text-indigo-500" />
                        Work Experience
                      </h2>
                      <button
                        onClick={addExperience}
                        className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:scale-105 transition"
                      >
                        <Plus size={18} />
                        Add Experience
                      </button>
                    </div>

                    {resume.experience.map((exp, idx) => (
                      <div key={idx} className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 space-y-3">
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-semibold text-indigo-700">Experience #{idx + 1}</h3>
                          {resume.experience.length > 1 && (
                            <button
                              onClick={() => removeExperience(idx)}
                              className="text-red-400 hover:text-red-300"
                            >
                              <Trash2 size={18} />
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <input
                            className="input-modern"
                            placeholder="Job Title"
                            value={exp.role}
                            onChange={(e) => updateExperience(idx, "role", e.target.value)}
                          />
                          <input
                            className="input-modern"
                            placeholder="Company Name"
                            value={exp.company}
                            onChange={(e) => updateExperience(idx, "company", e.target.value)}
                          />
                          <input
                            className="input-modern"
                            placeholder="Duration (e.g., Jan 2020 - Present)"
                            value={exp.duration}
                            onChange={(e) => updateExperience(idx, "duration", e.target.value)}
                          />
                          <input
                            className="input-modern"
                            placeholder="Location"
                            value={exp.location}
                            onChange={(e) => updateExperience(idx, "location", e.target.value)}
                          />
                        </div>

                        <div>
                          <label className="text-indigo-700 text-sm font-medium mb-2 block">Key Achievements</label>
                          {exp.points.map((point, pIdx) => (
                            <div key={pIdx} className="flex gap-2 mb-2">
                              <input
                                className="input-modern flex-1"
                                placeholder="• Start with action verbs (Led, Developed, Increased...)"
                                value={point}
                                onChange={(e) => updateExpPoint(idx, pIdx, e.target.value)}
                              />
                              {exp.points.length > 1 && (
                                <button
                                  onClick={() => removeExpPoint(idx, pIdx)}
                                  className="text-red-400 hover:text-red-300"
                                >
                                  <Trash2 size={16} />
                                </button>
                              )}
                            </div>
                          ))}
                          <button
                            onClick={() => addExpPoint(idx)}
                            className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-1 mt-2 font-medium"
                          >
                            <Plus size={14} />
                            Add bullet point
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Projects */}
                {activeTab === "projects" && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center gap-2">
                        <Code className="text-indigo-500" />
                        Projects
                      </h2>
                      <button
                        onClick={addProject}
                        className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:scale-105 transition"
                      >
                        <Plus size={18} />
                        Add Project
                      </button>
                    </div>

                    {resume.projects.map((proj, idx) => (
                      <div key={idx} className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 space-y-3">
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-semibold text-indigo-700">Project #{idx + 1}</h3>
                          {resume.projects.length > 1 && (
                            <button
                              onClick={() => removeProject(idx)}
                              className="text-red-400 hover:text-red-300"
                            >
                              <Trash2 size={18} />
                            </button>
                          )}
                        </div>

                        <input
                          className="input-modern"
                          placeholder="Project Title"
                          value={proj.title}
                          onChange={(e) => updateProject(idx, "title", e.target.value)}
                        />
                        <input
                          className="input-modern"
                          placeholder="Technologies Used (e.g., React, Node.js, MongoDB)"
                          value={proj.tech}
                          onChange={(e) => updateProject(idx, "tech", e.target.value)}
                        />
                        <textarea
                          className="input-modern h-24"
                          placeholder="Project description and key accomplishments..."
                          value={proj.description}
                          onChange={(e) => updateProject(idx, "description", e.target.value)}
                        />
                        <input
                          className="input-modern"
                          placeholder="Project Link (GitHub/Live Demo)"
                          value={proj.link}
                          onChange={(e) => updateProject(idx, "link", e.target.value)}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Education */}
                {activeTab === "education" && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center gap-2">
                        <GraduationCap className="text-indigo-500" />
                        Education
                      </h2>
                      <button
                        onClick={addEducation}
                        className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-lg hover:shadow-lg hover:scale-105 transition"
                      >
                        <Plus size={18} />
                        Add Education
                      </button>
                    </div>

                    {resume.education.map((edu, idx) => (
                      <div key={idx} className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 space-y-3">
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-semibold text-indigo-700">Education #{idx + 1}</h3>
                          {resume.education.length > 1 && (
                            <button
                              onClick={() => removeEducation(idx)}
                              className="text-red-400 hover:text-red-300"
                            >
                              <Trash2 size={18} />
                            </button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <input
                            className="input-modern"
                            placeholder="Degree (e.g., B.S. Computer Science)"
                            value={edu.degree}
                            onChange={(e) => updateEducation(idx, "degree", e.target.value)}
                          />
                          <input
                            className="input-modern"
                            placeholder="Institution Name"
                            value={edu.institute}
                            onChange={(e) => updateEducation(idx, "institute", e.target.value)}
                          />
                          <input
                            className="input-modern"
                            placeholder="Graduation Year"
                            value={edu.year}
                            onChange={(e) => updateEducation(idx, "year", e.target.value)}
                          />
                          <input
                            className="input-modern"
                            placeholder="GPA (optional)"
                            value={edu.gpa}
                            onChange={(e) => updateEducation(idx, "gpa", e.target.value)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Skills */}
                {activeTab === "skills" && (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center gap-2">
                      <Star className="text-indigo-500" />
                      Technical Skills
                    </h2>

                    <div>
                      <input
                        className="input-modern"
                        placeholder="Type a skill and press Enter"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addTag("skills", e.target.value);
                            e.target.value = "";
                          }
                        }}
                      />
                      {aiMode && (
                        <button
                          className="mt-2 text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-1 font-medium"
                          onClick={() => setResume({ ...resume, skills: [...resume.skills, ...aiSuggestions.skills] })}
                        >
                          <Sparkles size={14} />
                          Add suggested skills
                        </button>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {resume.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-indigo-100 border border-indigo-300 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium hover:shadow-md transition"
                        >
                          {skill}
                          <button
                            onClick={() => removeTag("skills", idx)}
                            className="hover:text-red-500 transition"
                          >
                            <Trash2 size={14} />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Extras */}
                {activeTab === "extras" && (
                  <div className="space-y-6">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center gap-2">
                      <Award className="text-indigo-500" />
                      Additional Information
                    </h2>

                    {/* Certifications */}
                    <div>
                      <label className="text-indigo-700 font-semibold mb-2 block">Certifications</label>
                      <input
                        className="input-modern"
                        placeholder="Type certification and press Enter"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addTag("certifications", e.target.value);
                            e.target.value = "";
                          }
                        }}
                      />
                      <div className="flex flex-wrap gap-2 mt-2">
                        {resume.certifications.map((cert, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-2 bg-blue-100 border border-blue-300 text-blue-700 px-3 py-1 rounded-lg text-sm font-medium"
                          >
                            {cert}
                            <button onClick={() => removeTag("certifications", idx)} className="hover:text-red-500">
                              <Trash2 size={12} />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Languages */}
                    <div>
                      <label className="text-indigo-700 font-semibold mb-2 block">Languages</label>
                      <input
                        className="input-modern"
                        placeholder="Type language and press Enter (e.g., English - Native)"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addTag("languages", e.target.value);
                            e.target.value = "";
                          }
                        }}
                      />
                      <div className="flex flex-wrap gap-2 mt-2">
                        {resume.languages.map((lang, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-2 bg-emerald-100 border border-emerald-300 text-emerald-700 px-3 py-1 rounded-lg text-sm font-medium"
                          >
                            {lang}
                            <button onClick={() => removeTag("languages", idx)} className="hover:text-red-500">
                              <Trash2 size={12} />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    <div>
                      <label className="text-indigo-700 font-semibold mb-2 block">Key Achievements</label>
                      <input
                        className="input-modern"
                        placeholder="Type achievement and press Enter"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addTag("achievements", e.target.value);
                            e.target.value = "";
                          }
                        }}
                      />
                      {aiMode && (
                        <button
                          className="mt-2 text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-1 font-medium"
                          onClick={() => setResume({ ...resume, achievements: [...resume.achievements, ...aiSuggestions.achievements] })}
                        >
                          <Sparkles size={14} />
                          Add suggested achievements
                        </button>
                      )}
                      <div className="space-y-2 mt-2">
                        {resume.achievements.map((ach, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-300 text-amber-700 px-3 py-2 rounded-lg text-sm font-medium"
                          >
                            <span className="flex-1">{ach}</span>
                            <button onClick={() => removeTag("achievements", idx)} className="hover:text-red-500">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          
        </div>
      </div>

      {/* Preview Modal */}
      {previewOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-4xl bg-white h-[90vh] rounded-2xl shadow-2xl flex flex-col">
            <div className="flex justify-between items-center p-4 border-b bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
              <h3 className="text-xl font-bold text-white">Resume Preview</h3>
              <button
                onClick={() => setPreviewOpen(false)}
                className="text-white hover:bg-white/20 px-4 py-2 rounded-lg transition"
              >
                ✕ Close
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 bg-gray-50">
              <div ref={previewRef} className="bg-white max-w-3xl mx-auto p-8 shadow-lg">
                {/* Header */}
                <div className="border-b-2 border-gray-800 pb-4 mb-4">
                  <h1 className="text-4xl font-bold text-gray-900 mb-1">
                    {resume.personal.name || "Your Name"}
                  </h1>
                  <p className="text-xl text-gray-700 mb-2">
                    {resume.personal.role || "Professional Title"}
                  </p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
                    {resume.personal.email && (
                      <span className="flex items-center gap-1">
                        <Mail size={14} /> {resume.personal.email}
                      </span>
                    )}
                    {resume.personal.phone && (
                      <span className="flex items-center gap-1">
                        <Phone size={14} /> {resume.personal.phone}
                      </span>
                    )}
                    {resume.personal.city && (
                      <span className="flex items-center gap-1">
                        <MapPin size={14} /> {resume.personal.city}
                      </span>
                    )}
                    {resume.personal.linkedin && (
                      <span className="flex items-center gap-1">
                        <Linkedin size={14} /> LinkedIn
                      </span>
                    )}
                    {resume.personal.github && (
                      <span className="flex items-center gap-1">
                        <Github size={14} /> GitHub
                      </span>
                    )}
                  </div>
                </div>

                {/* Summary */}
                {resume.summary && (
                  <div className="mb-4">
                    <h2 className="text-lg font-bold text-gray-900 mb-2 uppercase tracking-wide">
                      Professional Summary
                    </h2>
                    <p className="text-gray-700 leading-relaxed">{resume.summary}</p>
                  </div>
                )}

                {/* Skills */}
                {resume.skills.length > 0 && (
                  <div className="mb-4">
                    <h2 className="text-lg font-bold text-gray-900 mb-2 uppercase tracking-wide">
                      Technical Skills
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {resume.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="bg-gray-100 border border-gray-300 px-3 py-1 rounded text-sm text-gray-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Experience */}
                {resume.experience[0].role && (
                  <div className="mb-4">
                    <h2 className="text-lg font-bold text-gray-900 mb-2 uppercase tracking-wide">
                      Work Experience
                    </h2>
                    {resume.experience.map((exp, idx) => (
                      exp.role && (
                        <div key={idx} className="mb-3">
                          <div className="flex justify-between items-start mb-1">
                            <div>
                              <h3 className="font-bold text-gray-900">{exp.role}</h3>
                              <p className="text-gray-700">{exp.company}</p>
                            </div>
                            <div className="text-right text-sm text-gray-600">
                              <p>{exp.duration}</p>
                              {exp.location && <p>{exp.location}</p>}
                            </div>
                          </div>
                          <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                            {exp.points.map((point, pIdx) => (
                              point && <li key={pIdx}>{point}</li>
                            ))}
                          </ul>
                        </div>
                      )
                    ))}
                  </div>
                )}

                {/* Projects */}
                {resume.projects[0].title && (
                  <div className="mb-4">
                    <h2 className="text-lg font-bold text-gray-900 mb-2 uppercase tracking-wide">
                      Projects
                    </h2>
                    {resume.projects.map((proj, idx) => (
                      proj.title && (
                        <div key={idx} className="mb-3">
                          <h3 className="font-bold text-gray-900">{proj.title}</h3>
                          {proj.tech && (
                            <p className="text-sm text-gray-600 italic mb-1">{proj.tech}</p>
                          )}
                          <p className="text-gray-700 text-sm">{proj.description}</p>
                          {proj.link && (
                            <p className="text-blue-600 text-sm mt-1">{proj.link}</p>
                          )}
                        </div>
                      )
                    ))}
                  </div>
                )}

                {/* Education */}
                {resume.education[0].degree && (
                  <div className="mb-4">
                    <h2 className="text-lg font-bold text-gray-900 mb-2 uppercase tracking-wide">
                      Education
                    </h2>
                    {resume.education.map((edu, idx) => (
                      edu.degree && (
                        <div key={idx} className="mb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                              <p className="text-gray-700">{edu.institute}</p>
                            </div>
                            <div className="text-right text-sm text-gray-600">
                              <p>{edu.year}</p>
                              {edu.gpa && <p>GPA: {edu.gpa}</p>}
                            </div>
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                )}

                {/* Certifications */}
                {resume.certifications.length > 0 && (
                  <div className="mb-4">
                    <h2 className="text-lg font-bold text-gray-900 mb-2 uppercase tracking-wide">
                      Certifications
                    </h2>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                      {resume.certifications.map((cert, idx) => (
                        <li key={idx}>{cert}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Languages */}
                {resume.languages.length > 0 && (
                  <div className="mb-4">
                    <h2 className="text-lg font-bold text-gray-900 mb-2 uppercase tracking-wide">
                      Languages
                    </h2>
                    <p className="text-gray-700 text-sm">
                      {resume.languages.join(" • ")}
                    </p>
                  </div>
                )}

                {/* Achievements */}
                {resume.achievements.length > 0 && (
                  <div className="mb-4">
                    <h2 className="text-lg font-bold text-gray-900 mb-2 uppercase tracking-wide">
                      Key Achievements
                    </h2>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                      {resume.achievements.map((ach, idx) => (
                        <li key={idx}>{ach}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Styles */}
      <style>{`
        .input-modern {
          width: 100%;
          background: rgba(255, 255, 255, 0.9);
          border: 2px solid #e0e7ff;
          border-radius: 12px;
          padding: 12px 16px;
          color: #1e3a8a;
          font-size: 14px;
          transition: all 0.3s;
        }
        .input-modern::placeholder {
          color: #9ca3af;
        }
        .input-modern:focus {
          outline: none;
          border-color: #6366f1;
          background: rgba(255, 255, 255, 1);
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }
        
        
      `}</style>
    </div>
  );
};

export default ResumeBuilder;