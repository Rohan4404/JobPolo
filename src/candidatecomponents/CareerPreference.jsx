import React, { useEffect, useState } from "react";
import { getUserProfile } from "../api/service2";

const CareerPreference = () => {
  const [industry, setIndustry] = useState("");
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const profileRes = await getUserProfile();
        const userIndustry =
          profileRes?.data?.filteredUser?.employee?.industry;

        if (!userIndustry) {
          setIndustry("");
          setLoading(false);
          return;
        }

        setIndustry(userIndustry);

        const rssUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(
          userIndustry + " India market"
        )}`;

        const response = await fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
            rssUrl
          )}`
        );

        const data = await response.json();

        const parsedNews = (data.items || []).slice(0, 10).map((item) => ({
          title: item.title,
          // 🔥 strip HTML to avoid overflow
          description: item.description
            ? item.description.replace(/<[^>]+>/g, "")
            : "",
          link: item.link,
          pubDate: item.pubDate,
          source: item.author || "Google News",
        }));

        setNews(parsedNews);
      } catch (err) {
        console.error("Career news error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  if (loading) {
    return (
      <div className="section-loader">
        <div className="flex flex-col items-center">
          <div className="page-loader-spinner mb-3"></div>
          <p className="page-loader-text">Loading market news...</p>
        </div>
      </div>
    );
  }

  if (!industry) {
    return (
      <div className="flex justify-center items-center h-[80vh] text-blue-700">
        Industry not set in profile
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 
                    p-4 sm:p-6 text-left h-full overflow-y-auto overflow-x-hidden">

      {/* HEADER */}
      <div className="mb-6 max-w-full">
        <h1 className="text-3xl font-bold text-blue-900">
          Career Preferences
        </h1>
        <p className="text-blue-700 mt-2">
          Latest market news for <strong>{industry}</strong>
        </p>
      </div>

      {/* NEWS LIST */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100 
                      space-y-6 max-h-[70vh] overflow-y-auto 
                      w-full max-w-full overflow-x-hidden">

        {news.length > 0 ? (
          news.map((item, index) => (
            <div
              key={index}
              className="border-b last:border-none pb-4 max-w-full overflow-x-hidden"
            >
              <h3 className="font-semibold text-blue-900 break-words">
                {item.title}
              </h3>

              <p className="text-sm text-gray-600 mt-1 line-clamp-3 break-words">
                {item.description || "No description available"}
              </p>

              <div className="text-xs text-gray-500 mt-2 break-words">
                {item.source} •{" "}
                {item.pubDate
                  ? new Date(item.pubDate).toLocaleDateString()
                  : ""}
              </div>

              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-blue-600 text-sm mt-2 hover:underline break-words"
              >
                Read full article
              </a>
            </div>
          ))
        ) : (
          <p className="text-gray-600">
            No recent news found for this industry.
          </p>
        )}
      </div>
    </div>
  );
};

export default CareerPreference;
