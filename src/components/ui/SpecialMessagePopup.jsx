import React from 'react';

const SpecialMessagePopup = ({ cardBgClass, borderClass, textClass, message }) => {
    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 animate-bounce">
            <div className={`${cardBgClass} rounded-3xl p-8 border-2 ${borderClass} shadow-2xl hover:shadow-pink-500/30 transform hover:scale-105 transition-all duration-1000`}>
                <div className="text-center">
                    <div className="text-6xl mb-4 animate-bounce">💖</div>
                    <p className={`text-xl ${textClass} font-semibold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-white`}>
                        {message}
                    </p>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-3xl opacity-30 blur-lg animate-pulse -z-10"></div>
            </div>
        </div>
    );
};

export default SpecialMessagePopup;