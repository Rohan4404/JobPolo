import React, { useEffect } from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";

const ModalWrapper = ({ children, onClose }) => {

  // 🔒 Lock background scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      onClick={onClose} // ✅ click outside closes
      className="fixed inset-0 z-[99999999] flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
    >
      <motion.div
        initial={{ scale: 0.96, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()} // ✅ prevent inside click close
        className="relative w-full max-w-6xl max-h-[80vh] rounded-2xl overflow-hidden
                   bg-white shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
      >

        {/* ✅ FIXED CLOSE BUTTON (always visible) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 bg-black text-white p-2 rounded-full 
                     hover:scale-110 hover:bg-gray-800 transition shadow-lg"
        >
          <X size={18} />
        </button>

        {/* ✅ ONLY THIS SCROLLS */}
        <div className="overflow-y-auto max-h-[90vh] custom-scrollbar px-4 sm:px-6 pt-12 pb-12">
          {children}
        </div>

        {/* 🔥 PREMIUM FADE EFFECT */}
        <div className="pointer-events-none absolute top-0 left-0 w-full h-10 bg-gradient-to-b from-white to-transparent" />
        <div className="pointer-events-none absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-white to-transparent" />

      </motion.div>
    </div>
  );
};

export default ModalWrapper;