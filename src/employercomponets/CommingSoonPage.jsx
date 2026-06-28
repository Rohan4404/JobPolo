import React, { useState, useEffect } from "react";
import {
  Mail,
  Bell,
  ArrowRight,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";

const ComingSoon = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Set launch date (30 days from now)
  const launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 30);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubscribe = () => {
    if (email && email.includes("@")) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail("");
        setSubscribed(false);
      }, 3000);
    }
  };

  return (
    <div className="h-full min-h-0 dashboard-nested-scroll bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 flex flex-col items-center justify-start py-4 sm:py-6 relative">

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse delay-1000"></div>
        <div className="absolute w-64 h-64 bg-white/5 rounded-full blur-2xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse delay-500"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl w-full px-4">
        <div className="text-center mb-8 animate-fade-in">
          {/* Logo/Icon */}
          <div className="inline-block mb-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-2xl shadow-2xl flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Bell className="text-white" size={32} />
              </div>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg break-words">
            Coming Soon
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-2 max-w-2xl mx-auto px-4 break-words">
            Something Amazing is on the Way
          </p>
          <p className="text-sm sm:text-base md:text-lg text-white/80 max-w-xl mx-auto px-4 break-words">
            We're working hard to bring you an incredible experience. Stay tuned
            and be the first to know when we launch!
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 max-w-3xl mx-auto mb-8 px-4">
          {[
            { label: "Days", value: timeLeft.days },
            { label: "Hours", value: timeLeft.hours },
            { label: "Minutes", value: timeLeft.minutes },
            { label: "Seconds", value: timeLeft.seconds },
          ].map((item, index) => (
            <div
              key={item.label}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/20 shadow-2xl transform hover:scale-105 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-1 sm:mb-2">
                {String(item.value).padStart(2, "0")}
              </div>
              <div className="text-xs sm:text-sm md:text-base text-white/80 uppercase tracking-wider">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Email Subscription */}
        <div className="max-w-xl mx-auto mb-8 px-4">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-white/20 shadow-2xl">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 flex items-center justify-center gap-2">
              <Mail size={24} />
              Get Notified
            </h2>
            <p className="text-white/80 text-sm sm:text-base mb-6 text-center break-words">
              Subscribe to get updates and be the first to know when we launch
            </p>

            {!subscribed ? (
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm text-sm sm:text-base truncate"
                  title={email} // Show full email on hover
                />
                <button
                  onClick={handleSubscribe}
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-purple-600 rounded-xl font-semibold hover:bg-white/90 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base whitespace-nowrap"
                >
                  Notify Me
                  <ArrowRight size={18} />
                </button>
              </div>
            ) : (
              <div className="text-center p-4 bg-green-500/20 border border-green-500/40 rounded-xl">
                <p className="text-white font-semibold text-sm sm:text-base break-words">
                  ✓ Thank you! You'll be notified when we launch.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Social Media Links */}
        <div className="text-center px-4 mb-8">
          <p className="text-white/80 mb-4 text-sm sm:text-base break-words">
            Follow us on social media
          </p>
          <div className="flex justify-center gap-3 sm:gap-4 flex-wrap">
            {[
              { Icon: Facebook, color: "hover:bg-blue-600" },
              { Icon: Twitter, color: "hover:bg-blue-400" },
              { Icon: Linkedin, color: "hover:bg-blue-700" },
              { Icon: Instagram, color: "hover:bg-pink-600" },
            ].map(({ Icon, color }, index) => (
              <button
                key={index}
                className={`w-12 h-12 sm:w-14 sm:h-14 bg-white/10 backdrop-blur-lg rounded-full flex items-center justify-center border border-white/20 ${color} transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl group`}
              >
                <Icon
                  className="text-white group-hover:scale-110 transition-transform"
                  size={20}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-8 px-4">
          <div className="bg-white/10 backdrop-blur-lg rounded-full h-3 sm:h-4 overflow-hidden border border-white/20">
            <div
              className="h-full bg-gradient-to-r from-white to-white/60 rounded-full transition-all duration-1000 ease-out animate-progress"
              style={{ width: "65%" }}
            ></div>
          </div>
          <p className="text-white/60 text-xs sm:text-sm text-center mt-3 break-words">
            Development Progress: 65%
          </p>
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 65%;
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-progress {
          animation: progress 2s ease-out;
        }

        .delay-500 {
          animation-delay: 500ms;
        }

        .delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </div>
  );
};

export default ComingSoon;
