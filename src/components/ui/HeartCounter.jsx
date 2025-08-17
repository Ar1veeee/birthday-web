import React from 'react';

const HeartCounter = ({ heartClicks, cardBgClass, borderClass, textClass }) => {
  return (
    <div className="fixed top-24 right-6 z-40 animate-pulse">
      <div className={`${cardBgClass} rounded-2xl px-6 py-3 border ${borderClass} shadow-lg hover:shadow-pink-500/25 transform hover:scale-110 transition-all duration-300`}>
        <span className={`text-lg ${textClass} font-bold bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent`}>
          💖 {heartClicks}
        </span>
      </div>
    </div>
  );
};

export default HeartCounter;