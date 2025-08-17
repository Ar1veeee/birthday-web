import React from 'react';
import { Sparkles } from 'lucide-react';

const Fireworks = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-20">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-400/30 via-purple-400/30 to-indigo-400/30 animate-pulse"></div>
            {[...Array(25)].map((_, i) => (
                <div
                    key={i}
                    className="absolute animate-ping"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${i * 100}ms`,
                        animationDuration: `${2 + Math.random()}s`
                    }}
                >
                    <div className="flex items-center justify-center">
                        <Sparkles className="text-yellow-400 drop-shadow-lg animate-spin" size={25 + Math.random() * 30} />
                        <div className="absolute w-8 h-8 bg-gradient-to-r from-yellow-400 to-red-400 rounded-full opacity-50 blur-lg animate-pulse"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Fireworks;