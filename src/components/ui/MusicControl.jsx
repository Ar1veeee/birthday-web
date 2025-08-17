import React from 'react';
import { Music } from 'lucide-react';

const MusicControl = ({ toggleMusic, isPlaying, cardBgClass, borderClass, isDarkMode }) => {
    return (
        <button
            onClick={toggleMusic}
            className={`fixed top-6 left-6 z-50 p-4 rounded-2xl ${cardBgClass} border ${borderClass} hover:scale-110 hover:rotate-12 transition-all duration-500 group shadow-2xl hover:shadow-pink-500/25`}
        >
            <Music
                className={`${isPlaying ? 'text-pink-400 animate-bounce-soft-delay' : isDarkMode ? 'text-white' : 'text-gray-600'} group-hover:text-pink-400 transition-all duration-300`}
                size={20}
            />
            {isPlaying && (
                <>
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-pink-500 to-red-500 rounded-full animate-ping"></div>
                    <div className="absolute -inset-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-2xl animate-pulse blur-lg"></div>
                </>
            )}
        </button>
        
    );
    
};

export default MusicControl;