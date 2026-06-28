import React, { useState, useEffect, useRef } from "react";
import { Plus, Trash2, Eye, Download, Save, Grid, Layout, Palette, Image, Link as LinkIcon, Type, Upload } from "lucide-react";
import { DashboardLoader } from "../components/dashboard/DashboardUI";

const PortfolioBuilder = () => {
  const [portfolioName, setPortfolioName] = useState("My Portfolio");
  const [currentView, setCurrentView] = useState("editor");
  const [theme, setTheme] = useState("light");
  const [layout, setLayout] = useState("grid");
  const [loading, setLoading] = useState(true);

  
  const [portfolio, setPortfolio] = useState({
    hero: {
      title: "",
      subtitle: "",
      tagline: "",
      backgroundStyle: "gradient"
    },
    about: {
      headline: "",
      description: "",
      imageUrl: ""
    },
    projects: [],
    contact: {
      email: "",
      website: "",
      social: {
        github: "",
        linkedin: "",
        twitter: "",
        instagram: "",
        behance: "",
        dribbble: ""
      }
    },
    customSections: []
  });

  const [savedPortfolios, setSavedPortfolios] = useState([]);
  const [showSaveDialog, setShowSaveDialog] = useState(false);

 useEffect(() => {
  const init = async () => {
    // Simulating network delay for loading
    await new Promise(resolve => setTimeout(resolve, 500));
    await loadSavedPortfolios();
    setLoading(false);
  };
  init();
}, []);


  const loadSavedPortfolios = async () => {
    try {
      const result = await window.storage.list("portfolio:");
      if (result && result.keys) {
        const portfolios = await Promise.all(
          result.keys.map(async (key) => {
            try {
              const data = await window.storage.get(key);
              return data ? { key, ...JSON.parse(data.value) } : null;
            } catch (e) {
              return null;
            }
          })
        );
        setSavedPortfolios(portfolios.filter(Boolean));
      }
    } catch (e) {
      // console.log("No saved portfolios yet or storage API issue", e);
    }
  };

  const savePortfolio = async () => {
    const portfolioData = {
      name: portfolioName,
      theme,
      layout,
      data: portfolio,
      lastModified: new Date().toISOString()
    };
    
    const key = `portfolio:${portfolioName.toLowerCase().replace(/\s+/g, "-")}`;
    const result = await window.storage.set(key, JSON.stringify(portfolioData));

    if (result) {
      await loadSavedPortfolios();
      setShowSaveDialog(false);
      alert("Portfolio saved successfully!");
    } else {
       alert("Failed to save portfolio. Storage API issue.");
    }
  };

  const loadPortfolio = async (key) => {
    const result = await window.storage.get(key);
    if (result) {
      const data = JSON.parse(result.value);
      setPortfolioName(data.name);
      setTheme(data.theme);
      setLayout(data.layout);
      setPortfolio(data.data);
    }
  };

  const deletePortfolio = async (key) => {
    if (confirm("Delete this portfolio?")) {
      await window.storage.delete(key);
      await loadSavedPortfolios();
    }
  };

  const addProject = () => {
    setPortfolio({
      ...portfolio,
      projects: [
        ...portfolio.projects,
        {
          id: Date.now(),
          title: "",
          description: "",
          imageUrl: "",
          tags: [],
          link: "",
          featured: false
        }
      ]
    });
  };

  const updateProject = (id, field, value) => {
    setPortfolio({
      ...portfolio,
      projects: portfolio.projects.map(p =>
        p.id === id ? { ...p, [field]: value } : p
      )
    });
  };

  const deleteProject = (id) => {
    setPortfolio({
      ...portfolio,
      projects: portfolio.projects.filter(p => p.id !== id)
    });
  };

  const addProjectTag = (id, tag) => {
    if (!tag.trim()) return;
    setPortfolio({
      ...portfolio,
      projects: portfolio.projects.map(p =>
        p.id === id ? { ...p, tags: [...(p.tags || []), tag] } : p
      )
    });
  };

  const removeProjectTag = (projectId, tagIndex) => {
    setPortfolio({
      ...portfolio,
      projects: portfolio.projects.map(p =>
        p.id === projectId ? { ...p, tags: p.tags.filter((_, i) => i !== tagIndex) } : p
      )
    });
  };

  const addCustomSection = () => {
    setPortfolio({
      ...portfolio,
      customSections: [
        ...portfolio.customSections,
        {
          id: Date.now(),
          title: "",
          content: "",
          type: "text"
        }
      ]
    });
  };

  const updateCustomSection = (id, field, value) => {
    setPortfolio({
      ...portfolio,
      customSections: portfolio.customSections.map(s =>
        s.id === id ? { ...s, [field]: value } : s
      )
    });
  };

  const deleteCustomSection = (id) => {
    setPortfolio({
      ...portfolio,
      customSections: portfolio.customSections.filter(s => s.id !== id)
    });
  };

  const themeStyles = {
    light: {
      bg: "bg-white",
      text: "text-gray-900",
      secondary: "text-gray-600",
      accent: "bg-blue-500",
      border: "border-gray-200"
    },
    dark: {
      bg: "bg-gray-900",
      text: "text-white",
      secondary: "text-gray-300",
      accent: "bg-purple-600",
      border: "border-gray-700"
    },
    minimal: {
      bg: "bg-gray-50",
      text: "text-gray-900",
      secondary: "text-gray-700",
      accent: "bg-black",
      border: "border-gray-300"
    },
    colorful: {
      bg: "bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100",
      text: "text-gray-900",
      secondary: "text-gray-700",
      accent: "bg-gradient-to-r from-pink-500 to-purple-600",
      border: "border-purple-300"
    }
  };

  const currentTheme = themeStyles[theme];

  const renderPreview = () => {
    return (
      <div className={`${currentTheme.bg} ${currentTheme.text}`}>
        {/* Hero Section */}
        <section className={`py-20 px-8 text-center ${
          portfolio.hero.backgroundStyle === "gradient" 
            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white" 
            : portfolio.hero.backgroundStyle === "solid"
            ? `${currentTheme.accent} text-white`
            : ""
        }`}>
          <h1 className="text-5xl font-bold mb-4">{portfolio.hero.title || "Your Name"}</h1>
          <p className="text-2xl mb-2 opacity-90">{portfolio.hero.subtitle || "Your Role"}</p>
          <p className="text-lg opacity-80">{portfolio.hero.tagline || "Your Tagline"}</p>
        </section>

        {/* About Section */}
        {(portfolio.about.headline || portfolio.about.description) && (
          <section className="py-16 px-8 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">{portfolio.about.headline || "About"}</h2>
            <div className="grid md:grid-cols-3 gap-8 items-start">
              {portfolio.about.imageUrl && (
                <div className="md:col-span-1">
                  <img 
                    src={portfolio.about.imageUrl} 
                    alt="Profile" 
                    className="w-full rounded-lg shadow-lg"
                    onError={(e) => e.target.style.display = 'none'}
                  />
                </div>
              )}
              <div className={portfolio.about.imageUrl ? "md:col-span-2" : "md:col-span-3"}>
                <p className={`${currentTheme.secondary} text-lg leading-relaxed whitespace-pre-wrap`}>
                  {portfolio.about.description}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Projects Section */}
        {portfolio.projects.length > 0 && (
          <section className="py-16 px-8 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-center">Projects</h2>
            <div className={layout === "grid" 
              ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8" 
              : "space-y-12"
            }>
              {portfolio.projects.map(project => (
                <div key={project.id} className={`rounded-lg overflow-hidden shadow-lg ${currentTheme.border} border transition-transform hover:scale-105`}>
                  {project.imageUrl && (
                    <img 
                      src={project.imageUrl} 
                      alt={project.title}
                      className="w-full h-48 object-cover"
                      onError={(e) => e.target.style.display = 'none'}
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{project.title || "Project Title"}</h3>
                    <p className={`${currentTheme.secondary} mb-4`}>
                      {project.description || "Project description goes here"}
                    </p>
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, i) => (
                          <span key={i} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    {project.link && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline flex items-center gap-1"
                      >
                        <LinkIcon size={16} />
                        View Project
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Custom Sections */}
        {portfolio.customSections.map(section => (
          <section key={section.id} className="py-16 px-8 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">{section.title}</h2>
            <div className={`${currentTheme.secondary} text-lg leading-relaxed whitespace-pre-wrap`}>
              {section.content}
            </div>
          </section>
        ))}

        {/* Contact Section */}
        <section className="py-16 px-8 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>
          {portfolio.contact.email && (
            <p className="text-xl mb-6">
              <a href={`mailto:${portfolio.contact.email}`} className="text-blue-600 hover:underline">
                {portfolio.contact.email}
              </a>
            </p>
          )}
          <div className="flex justify-center gap-6 flex-wrap">
            {Object.entries(portfolio.contact.social).map(([platform, url]) => 
              url ? (
                <a 
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline capitalize"
                >
                  {platform}
                </a>
              ) : null
            )}
          </div>
        </section>
      </div>
    );
  };

  if (loading) {
    return <DashboardLoader message="Loading portfolio builder..." />;
  }

  if (currentView === "preview") {
    return (
      <div className="pb-4">
        <div className="sticky top-0 bg-white shadow-md z-10 px-4 sm:px-6 py-3 flex flex-wrap justify-between items-center gap-3 mb-4 rounded-xl border border-blue-100">
          <h2 className="text-lg sm:text-xl font-bold text-blue-900">{portfolioName}</h2>
          <button
            onClick={() => setCurrentView("editor")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
          >
            Back to Editor
          </button>
        </div>
        {renderPreview()}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-blue-100 p-4 sm:p-6 flex flex-col pb-4">
          <div className="flex flex-wrap justify-between items-center gap-4 mb-4 pb-4 border-b border-blue-100">

  {/* LEFT */}
  <div>
    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
      ✨ Portfolio Builder
    </h1>
    <p className="text-indigo-700 text-sm mt-1">
      Create your stunning portfolio • Showcase your work • Get hired faster
    </p>
  </div>

  {/* RIGHT BUTTONS */}
  <div className="flex gap-3">
    <button
      onClick={() => setCurrentView("preview")}
      className="flex items-center gap-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white px-5 py-2.5 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all"
    >
      <Eye size={18} />
      Preview
    </button>

    <button
      onClick={() => setShowSaveDialog(true)}
      className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-5 py-2.5 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all"
    >
      <Save size={18} />
      Save
    </button>
  </div>

</div>
        
     

      {/* Settings Bar */}
      
       
       <div className="grid md:grid-cols-3 gap-4 mb-6">

  {/* Portfolio Name */}
  <div className="bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 rounded-xl p-4 shadow-sm">
    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
      Portfolio Name
    </label>
    <input
      type="text"
      value={portfolioName}
      onChange={(e) => setPortfolioName(e.target.value)}
      className="mt-2 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
      placeholder="My Portfolio"
    />
  </div>

  {/* Theme */}
  <div className="bg-gradient-to-br from-purple-50 to-pink-100 border border-purple-200 rounded-xl p-4 shadow-sm">
    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
      Theme
    </label>
    <select
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
      className="mt-2 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
    >
      <option value="light">Light</option>
      <option value="dark">Dark</option>
      <option value="minimal">Minimal</option>
      <option value="colorful">Colorful</option>
    </select>
  </div>

  {/* Layout */}
  <div className="bg-gradient-to-br from-emerald-50 to-teal-100 border border-emerald-200 rounded-xl p-4 shadow-sm">
    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
      Project Layout
    </label>
    <select
      value={layout}
      onChange={(e) => setLayout(e.target.value)}
      className="mt-2 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
    >
      <option value="grid">Grid</option>
      <option value="list">List</option>
    </select>
  </div>

</div>

  
          <div className="space-y-8">
            
            {/* Hero Section */}
            <section className="border-b pb-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Type size={24} />
                Hero Section
              </h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={portfolio.hero.title}
                  onChange={(e) => setPortfolio({
                    ...portfolio,
                    hero: { ...portfolio.hero, title: e.target.value }
                  })}
                  className="w-full px-4 py-3 border rounded-lg text-lg"
                />
                <input
                  type="text"
                  placeholder="Your Role (e.g., Designer, Developer, Artist)"
                  value={portfolio.hero.subtitle}
                  onChange={(e) => setPortfolio({
                    ...portfolio,
                    hero: { ...portfolio.hero, subtitle: e.target.value }
                  })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Your Tagline"
                  value={portfolio.hero.tagline}
                  onChange={(e) => setPortfolio({
                    ...portfolio,
                    hero: { ...portfolio.hero, tagline: e.target.value }
                  })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <select
                  value={portfolio.hero.backgroundStyle}
                  onChange={(e) => setPortfolio({
                    ...portfolio,
                    hero: { ...portfolio.hero, backgroundStyle: e.target.value }
                  })}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="gradient">Gradient</option>
                  <option value="solid">Solid Color</option>
                  <option value="none">None</option>
                </select>
              </div>
            </section>

            {/* About Section */}
            <section className="border-b pb-8">
              <h2 className="text-2xl font-bold mb-4">About Section</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Section Headline (e.g., About Me, My Story)"
                  value={portfolio.about.headline}
                  onChange={(e) => setPortfolio({
                    ...portfolio,
                    about: { ...portfolio.about, headline: e.target.value }
                  })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <textarea
                  placeholder="Tell your story, describe your work, share your passion..."
                  value={portfolio.about.description}
                  onChange={(e) => setPortfolio({
                    ...portfolio,
                    about: { ...portfolio.about, description: e.target.value }
                  })}
                  className="w-full px-4 py-2 border rounded-lg h-32"
                />
                <input
                  type="text"
                  placeholder="Profile Image URL (optional)"
                  value={portfolio.about.imageUrl}
                  onChange={(e) => setPortfolio({
                    ...portfolio,
                    about: { ...portfolio.about, imageUrl: e.target.value }
                  })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
            </section>

            {/* Projects Section */}
            <section className="border-b pb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Grid size={24} />
                  Projects
                </h2>
                <button
                  onClick={addProject}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Plus size={20} />
                  Add Project
                </button>
              </div>
              <div className="space-y-6">
                {portfolio.projects.map((project, index) => (
                  <div key={project.id} className="border rounded-lg p-6 space-y-4 bg-gray-50">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-lg">Project {index + 1}</h3>
                      <button
                        onClick={() => deleteProject(project.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Project Title"
                      value={project.title}
                      onChange={(e) => updateProject(project.id, "title", e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                    <textarea
                      placeholder="Project Description"
                      value={project.description}
                      onChange={(e) => updateProject(project.id, "description", e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg h-24"
                    />
                    <input
                      type="text"
                      placeholder="Project Image URL"
                      value={project.imageUrl}
                      onChange={(e) => updateProject(project.id, "imageUrl", e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Project Link (URL)"
                      value={project.link}
                      onChange={(e) => updateProject(project.id, "link", e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                    <div>
                      <input
                        type="text"
                        placeholder="Add tags (press Enter)"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addProjectTag(project.id, e.target.value);
                            e.target.value = "";
                          }
                        }}
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.tags && project.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-2 cursor-pointer"
                            onClick={() => removeProjectTag(project.id, i)}
                          >
                            {tag}
                            <span className="text-red-600">×</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
                {portfolio.projects.length === 0 && (
                  <p className="text-gray-500 text-center py-8">No projects yet. Click "Add Project" to get started!</p>
                )}
              </div>
            </section>

            {/* Custom Sections */}
            <section className="border-b pb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Custom Sections</h2>
                <button
                  onClick={addCustomSection}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  <Plus size={20} />
                  Add Section
                </button>
              </div>
              <div className="space-y-6">
                {portfolio.customSections.map((section, index) => (
                  <div key={section.id} className="border rounded-lg p-6 space-y-4 bg-gray-50">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-lg">Section {index + 1}</h3>
                      <button
                        onClick={() => deleteCustomSection(section.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Section Title (e.g., Awards, Publications, Services)"
                      value={section.title}
                      onChange={(e) => updateCustomSection(section.id, "title", e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                    <textarea
                      placeholder="Section Content"
                      value={section.content}
                      onChange={(e) => updateCustomSection(section.id, "content", e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg h-32"
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Contact Section */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Email"
                  value={portfolio.contact.email}
                  onChange={(e) => setPortfolio({
                    ...portfolio,
                    contact: { ...portfolio.contact, email: e.target.value }
                  })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.keys(portfolio.contact.social).map(platform => (
                    <input
                      key={platform}
                      type="text"
                      placeholder={`${platform.charAt(0).toUpperCase() + platform.slice(1)} URL`}
                      value={portfolio.contact.social[platform]}
                      onChange={(e) => setPortfolio({
                        ...portfolio,
                        contact: {
                          ...portfolio.contact,
                          social: { ...portfolio.contact.social, [platform]: e.target.value }
                        }
                      })}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  ))}
                </div>
              </div>
            </section>
          </div>

      {/* Saved Portfolios Sidebar */}
      {savedPortfolios.length > 0 && (
        <div className="max-w-7xl mx-auto mt-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Saved Portfolios</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {savedPortfolios.map(p => (
                <div key={p.key} className="border rounded-lg p-4 hover:shadow-md transition">
                  <h3 className="font-semibold mb-2">{p.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {new Date(p.lastModified).toLocaleDateString()}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => loadPortfolio(p.key)}
                      className="flex-1 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                    >
                      Load
                    </button>
                    <button
                      onClick={() => deletePortfolio(p.key)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Save Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Save Portfolio</h2>
            <input
              type="text"
              value={portfolioName}
              onChange={(e) => setPortfolioName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg mb-4"
              placeholder="Portfolio Name"
            />
            <div className="flex gap-3">
              <button
                onClick={savePortfolio}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save
              </button>
              <button
                onClick={() => setShowSaveDialog(false)}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioBuilder;