import React from 'react';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = ({ isDarkMode, setIsDarkMode }) => {
    return (
        <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="fixed top-6 right-6 z-50 p-4 rounded-2xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl border border-white/20 hover:scale-110 hover:-rotate-12 transition-all duration-500 shadow-2xl hover:shadow-purple-500/25"
        >
            {isDarkMode ?
                <Sun className="text-yellow-300 animate-pulse" size={20} /> :
                <Moon className="text-purple-600 animate-bounce" size={20} />
            }
        </button>
    );
};

export default ThemeToggle;