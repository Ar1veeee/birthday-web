import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, Star } from 'lucide-react';

const HandshakeAnimation = ({
    handleHandshakeClick,
    handsConnected,
    textSecondaryClass = "text-slate-600",
    showHandshake = true,
    audioRef,
    isPlaying,
    setIsPlaying
}) => {
    const [leftHandVisible, setLeftHandVisible] = useState(false);
    const [rightHandVisible, setRightHandVisible] = useState(false);
    const [showHandsConnected, setShowHandsConnected] = useState(false);

    useEffect(() => {
        if (showHandshake) {
            setTimeout(() => setLeftHandVisible(true), 500);
            setTimeout(() => setRightHandVisible(true), 300);
            
            setTimeout(async () => {
                if (audioRef?.current && !isPlaying) {
                    try {
                        await audioRef.current.play();
                        setIsPlaying(true);
                        console.log('Music started automatically when handshake appeared');
                    } catch (error) {
                        console.log('Auto-play blocked by browser, will play on user interaction');
                    }
                }
            }, 500); 
            
        } else {
            setLeftHandVisible(false);
            setRightHandVisible(false);
        }
    }, [showHandshake, audioRef, isPlaying, setIsPlaying]);

    useEffect(() => {
        if (handsConnected) {
          const timer = setTimeout(() => {
            setShowHandsConnected(true);
          }, 4000);
          
          return () => clearTimeout(timer);
        } else {
          setShowHandsConnected(false);
        }
    }, [handsConnected]);

    const handleClick = () => {
        if (audioRef?.current && !isPlaying) {
            audioRef.current.play().catch(console.error);
            setIsPlaying(true);
        }
        handleHandshakeClick();
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center cursor-pointer"
            onClick={handleClick}
        >
            {/* Modern backdrop with glassmorphism */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/15 to-pink-500/10 backdrop-blur-md"></div>

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/60 rounded-full animate-float-1"></div>
                <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-pink-400/60 rounded-full animate-float-2"></div>
                <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-purple-400/60 rounded-full animate-float-3"></div>
            </div>

            {/* Main handshake container */}
            <div className="relative flex items-center justify-center w-full h-full px-8 py-20">

                {/* Left person - dengan animasi entrance */}
                <div
                    className={`absolute top-1/2 -translate-y-1/2 transition-all duration-[12s] ease-[cubic-bezier(0.34,1.56,0.64,1)] 
                        ${handsConnected
                        ? 'left-1/2 -translate-x-[40px] opacity-5'
                        : leftHandVisible
                            ? 'left-1/6 md:left-1/3 opacity-100 scale-100'
                            : 'left-0 -translate-x-full opacity-0 scale-50'
                        }`}
                >
                    <div className="relative group">
                        <div className={`text-6xl md:text-7xl transition-all duration-100 ${handsConnected ? 'animate-pulse' : leftHandVisible ? 'animate-bounce-soft animate-slide-in-left' : ''}`}>
                            🫱
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-2xl scale-150 opacity-60 group-hover:opacity-80 transition-opacity"></div>
                        <div className={`absolute -top-4 -left-4 transition-all duration-500 delay-300 ${leftHandVisible ? 'animate-float-gentle opacity-100' : 'opacity-0'}`}>
                            <Heart className="text-blue-500/70 drop-shadow-sm" size={16} />
                        </div>
                        <div className={`absolute -bottom-2 -right-2 transition-all duration-500 delay-500 ${leftHandVisible ? 'animate-float-gentle-delay opacity-100' : 'opacity-0'}`}>
                            <Sparkles className="text-cyan-500/70 drop-shadow-sm" size={14} />
                        </div>
                        <div className={`absolute -bottom-16 left-1/2 -translate-x-1/2 ${textSecondaryClass} text-xs font-medium tracking-wide whitespace-nowrap transition-all duration-500 delay-700 ${leftHandVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                            <span className="px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                                💗 Aku Rara
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right person - dengan animasi entrance */}
                <div
                    className={`absolute top-1/2 -translate-y-1/2 transition-all duration-[12s] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${handsConnected
                        ? 'right-1/2 translate-x-[40px] opacity-5'
                        : rightHandVisible
                            ? 'right-1/6 md:right-1/3 opacity-100 scale-150'
                            : 'right-0 translate-x-full opacity-0 scale-50'
                        }`}
                >
                    <div className="relative group">
                        <div className={`text-6xl md:text-7xl transition-all duration-100 ${handsConnected ? 'animate-pulse' : rightHandVisible ? 'animate-bounce-soft-delay animate-slide-in-right' : ''}`}>
                            🫲
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-purple-400/20 rounded-full blur-2xl scale-150 opacity-60 group-hover:opacity-80 transition-opacity"></div>
                        <div className={`absolute -top-4 -right-4 transition-all duration-500 delay-300 ${rightHandVisible ? 'animate-float-gentle opacity-100' : 'opacity-0'}`}>
                            <Star className="text-pink-500/70 drop-shadow-sm" size={16} />
                        </div>
                        <div className={`absolute -bottom-2 -left-2 transition-all duration-500 delay-500 ${rightHandVisible ? 'animate-float-gentle-delay opacity-100' : 'opacity-0'}`}>
                            <Sparkles className="text-purple-500/70 drop-shadow-sm" size={14} />
                        </div>
                        <div className={`absolute -bottom-16 left-1/2 -translate-x-1/2 ${textSecondaryClass} text-xs font-medium tracking-wide whitespace-nowrap transition-all duration-500 delay-700 ${rightHandVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                            <span className="px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                                💙 Kenalin Aku Alief
                            </span>
                        </div>
                    </div>
                </div>

                {/* Handshake icon when connected */}
                {showHandsConnected && (
                    <div
                        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all ease-out ${handsConnected ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
                    >
                        <div className="relative group">
                            <div className="text-8xl md:text-9xl animate-pulse drop-shadow-2xl animate-bounce-soft-delay">
                                🤝
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 via-purple-400/30 to-pink-400/30 rounded-full blur-3xl scale-150 opacity-80 animate-pulse"></div>
                            <div className="absolute -top-8 -left-8 animate-float-celebration">
                                <Heart className="text-red-500/80 drop-shadow-lg" size={24} />
                            </div>
                            <div className="absolute -top-6 -right-6 animate-float-celebration-delay">
                                <Sparkles className="text-yellow-500/80 drop-shadow-lg" size={20} />
                            </div>
                            <div className="absolute -bottom-4 -left-6 animate-float-celebration-delay">
                                <Star className="text-purple-500/80 drop-shadow-lg" size={18} />
                            </div>
                            <div className="absolute -bottom-6 -right-4 animate-float-celebration">
                                <Heart className="text-pink-500/80 drop-shadow-lg" size={16} />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Click instruction with entrance animation */}
            <div className={`absolute bottom-12 left-1/2 -translate-x-1/2 text-center transition-all duration-1000 delay-1000 ${
                showHandshake && (leftHandVisible || rightHandVisible) ? 'opacity-70 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
                {!handsConnected && (
                    <p className={`${textSecondaryClass} text-sm animate-pulse`}>
                        {/* Update text karena musik sudah auto-play */}
                        Tap anywhere to continue
                    </p>
                )}
            </div>
        </div>
    );
};

export default HandshakeAnimation;