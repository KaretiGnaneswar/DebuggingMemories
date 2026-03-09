import React from "react";
import { Heart } from "lucide-react";

const DevelopedBy = () => {
  return (
    <footer className="relative z-30 text-center py-5 px-4">
      <p className="text-xs sm:text-sm text-gray-400 flex items-center justify-center gap-2">
        Built with
        <Heart className="w-4 h-4 text-red-500 animate-pulse" />
        by
        <span className="font-semibold text-yellow-400 hover:text-yellow-300 transition">
          Gnaneswar
        </span>
        <span className="text-gray-500">&</span>
        <span className="font-semibold text-yellow-400 hover:text-yellow-300 transition">
          Bavajan
        </span>
        <span className="text-gray-500">• DebuggingMemories © 2026</span>
      </p>
    </footer>
  );
};

export default DevelopedBy;