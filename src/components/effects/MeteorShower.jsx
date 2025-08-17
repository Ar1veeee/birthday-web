import React from 'react';

const MeteorShower = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-15">
            {[...Array(12)].map((_, i) => (
                <div
                    key={i}
                    className="absolute animate-ping opacity-70"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 50}%`,
                        animationDelay: `${i * 200}ms`,
                        animationDuration: '3s'
                    }}
                >
                    <div className="w-1 h-20 bg-gradient-to-b from-white via-blue-400 to-transparent transform rotate-45 animate-pulse"></div>
                </div>
            ))}
        </div>
    );
};

export default MeteorShower;