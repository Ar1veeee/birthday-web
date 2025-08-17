import React from 'react';

const RainbowTrail = ({ mousePos }) => {
    return (
        <div
            className="fixed pointer-events-none z-10 animate-ping"
            style={{ left: mousePos.x - 25, top: mousePos.y - 25 }}
        >
            <div className="w-12 h-12 bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 via-blue-400 to-purple-400 rounded-full opacity-60 blur-lg"></div>
        </div>
    );
};

export default RainbowTrail;