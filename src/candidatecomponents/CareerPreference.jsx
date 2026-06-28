import React, { useEffect, useState } from "react";
import { getUserProfile } from "../api/service2";
import { DashboardLoader } from "../components/dashboard/DashboardUI";

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
    return <DashboardLoader message="Loading market news..." />;
  }

  if (!industry) {
    return (
      <p className="text-blue-700 text-center py-10">
        Industry not set in profile
      </p>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-blue-100 space-y-4 sm:space-y-6 pb-4 w-full max-w-full">
      <p className="text-blue-700 text-sm sm:text-base">
        Latest market news for <strong>{industry}</strong>
      </p>

      <div className="space-y-4 sm:space-y-6 w-full max-w-full">
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
