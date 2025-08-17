import React, { useState, useEffect } from 'react';
import { Heart, ArrowDown, Crown, Star } from 'lucide-react';

const HeroSection = ({
    sectionRef,
    sectionAnimations,
    isDarkMode,
    handleHeartClick,
}) => {
    const [floatingEmojis, setFloatingEmojis] = useState([]);
    const [heartCount, setHeartCount] = useState(0);
    const [isTyping, setIsTyping] = useState(false);
    const [currentText, setCurrentText] = useState('');
    
    const fullText = "it's your special day my love! 💕";
    const isVisible = sectionAnimations.hero;

    useEffect(() => {
        if (isVisible) {
            setIsTyping(true);
            let i = 0;
            const timer = setInterval(() => {
                setCurrentText(fullText.slice(0, i));
                i++;
                if (i > fullText.length) {
                    clearInterval(timer);
                    setIsTyping(false);
                }
            }, 100);
            return () => clearInterval(timer);
        }
    }, [isVisible]);

    const createFloatingEmojis = () => {
        const emojis = ['✨', '💖', '🎉', '🥳', '💫', '🌟', '💕', '🎂'];
        const newEmojis = Array.from({ length: 12 }, (_, i) => ({
            id: Date.now() + i,
            emoji: emojis[Math.floor(Math.random() * emojis.length)],
            x: Math.random() * 100,
            y: Math.random() * 100,
            delay: i * 100,
            duration: 2000 + Math.random() * 1000
        }));
        setFloatingEmojis(newEmojis);
        setTimeout(() => setFloatingEmojis([]), 3000);
    };

    const handleEnhancedHeartClick = () => {
        handleHeartClick();
        setHeartCount(prev => prev + 1);
        createFloatingEmojis();
    };

    return (
        <section
            ref={sectionRef}
            data-section="hero"
            className="min-h-screen flex flex-col justify-center items-center relative px-4 overflow-hidden"
            
        >
            {/* Floating Emojis */}
            {floatingEmojis.map(emoji => (
                <div
                    key={emoji.id}
                    className="absolute pointer-events-none animate-float-up z-20"
                    style={{
                        left: `${emoji.x}%`,
                        top: `${emoji.y}%`,
                        animationDelay: `${emoji.delay}ms`,
                        fontSize: '28px'
                    }}
                >
                    {emoji.emoji}
                </div>
            ))}

            {/* Aesthetic Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Gradient Orbs */}
                <div className={`absolute top-20 left-20 w-60 h-60 bg-gradient-to-br from-pink-400/40 to-purple-400/40 rounded-full animate-float blur-2xl transition-all duration-2000 ${isVisible ? 'scale-100 opacity-60' : 'scale-0 opacity-0'}`}></div>
                <div className={`absolute bottom-32 right-32 w-40 h-40 bg-gradient-to-br from-cyan-400/40 to-blue-400/40 rounded-full animate-float-delayed blur-2xl transition-all duration-2000 delay-300 ${isVisible ? 'scale-100 opacity-60' : 'scale-0 opacity-0'}`}></div>
                <div className={`absolute top-1/3 right-20 w-32 h-32 bg-gradient-to-br from-yellow-400/40 to-orange-400/40 rounded-full animate-float-slow blur-xl transition-all duration-2000 delay-600 ${isVisible ? 'scale-100 opacity-60' : 'scale-0 opacity-0'}`}></div>
                
                {/* Floating Stars */}
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className={`absolute animate-twinkle transition-all duration-1000`}
                        style={{
                            left: `${15 + i * 10}%`,
                            top: `${10 + i * 8}%`,
                            animationDelay: `${i * 0.5}s`,
                            transform: isVisible ? 'scale(1)' : 'scale(0)',
                            transitionDelay: `${i * 200}ms`
                        }}
                    >
                        <Star className="text-yellow-300/70 w-4 h-4" fill="currentColor" />
                    </div>
                ))}
            </div>

            {/* Main Content */}
            <div className="text-center z-10 max-w-4xl mx-auto">
                {/* Pre-title */}
                <div className={`transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 mb-8 shadow-xl">
                        <Crown className="w-5 h-5 text-yellow-400" />
                        <span className={`${isDarkMode ? 'text-white' : 'text-gray-800'} font-semibold text-lg`}>
                            Princess Energy Activated ✨
                        </span>
                    </div>
                </div>

                {/* Main Title with Ultra Modern Style */}
                <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <h1 className="relative">
                        <span className="text-7xl md:text-9xl font-black leading-tight bg-gradient-to-r from-pink-400 via-cyan-400 to-yellow-400 bg-clip-text text-transparent animate-gradient-x drop-shadow-2xl">
                            Happy
                        </span>
                        <br />
                        <span className="text-6xl md:text-8xl font-black bg-gradient-to-r from-yellow-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent animate-gradient-x-reverse">
                            Birthday
                        </span>
                        
                        {/* Decorative Elements */}
                        <div className="absolute -top-8 -left-4 animate-bounce-gentle">
                            <div className="text-4xl">🎂</div>
                        </div>
                        <div className="absolute -top-6 -right-8 animate-bounce-gentle" style={{animationDelay: '0.5s'}}>
                            <div className="text-3xl">✨</div>
                        </div>
                    </h1>
                </div>

                {/* Name with Special Styling */}
                <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div className="relative inline-block mb-8">
                        <p className={`text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent drop-shadow-lg`}>
                            Soreku
                        </p>
                        <div className="absolute -inset-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-2xl blur-xl"></div>
                    </div>
                </div>

                {/* Typewriter Message */}
                <div className={`transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <p className={`text-xl md:text-2xl font-medium mb-12 ${isDarkMode ? 'text-purple-200' : 'text-slate-700'} min-h-[2rem]`}>
                        {currentText}
                        {isTyping && <span className="animate-pulse">|</span>}
                    </p>
                </div>

                {/* Interactive Heart Section */}
                <div className={`transition-all duration-1000 delay-800 ${isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
                    <div className="flex flex-col items-center gap-6">
                        {/* Heart Counter */}
                        <div className="px-6 py-3 rounded-full bg-gradient-to-r from-red-500/20 to-pink-500/20 backdrop-blur-sm border border-white/20">
                            <span className={`${isDarkMode ? 'text-white' : 'text-gray-800'} font-semibold flex items-center gap-2`}>
                                <Heart className="w-4 h-4 text-red-400" fill="currentColor" />
                                {heartCount} love sent
                            </span>
                        </div>

                        {/* Enhanced Heart Buttons */}
                        <div className="flex justify-center items-center space-x-3">
                            {[...Array(7)].map((_, i) => (
                                <Heart
                                    key={i}
                                    onClick={handleEnhancedHeartClick}
                                    className="text-red-400/80 drop-shadow-2xl cursor-pointer transition-all duration-500 ease-out hover:text-red-500 hover:scale-150 hover:drop-shadow-xl hover:rotate-12 active:scale-125 group"
                                    fill="currentColor"
                                    size={i === 3 ? 50 : 40} 
                                    style={{
                                        animationName: isVisible ? 'heartPulse' : 'none',
                                        animationDuration: '2.5s',
                                        animationIterationCount: 'infinite',
                                        animationTimingFunction: 'ease-in-out',
                                        animationDelay: `${i * 200}ms`, 
                                        filter: 'drop-shadow(0 0 10px rgba(248, 113, 113, 0.5))'
                                    }}
                                />
                            ))}
                        </div>

                        {/* Call to action */}
                        <p className={`text-sm ${isDarkMode ? 'text-purple-300/80' : 'text-slate-600'} font-medium animate-fade-in-alternate`}>
                            tap the hearts to spread the birthday love! 💕
                        </p>
                    </div>
                </div>

                
            </div>

            {/* Modern Scroll Indicator */}
            <div className={`absolute bottom-8 transition-all duration-1000 delay-1200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="flex flex-col items-center gap-3">
                    <span className={`text-xs ${isDarkMode ? 'text-purple-300' : 'text-slate-600'} font-medium tracking-wider uppercase`}>
                        Scroll untuk lanjut
                    </span>
                    <div className="relative">
                        <ArrowDown className={`${isDarkMode ? 'text-purple-400' : 'text-purple-600'} animate-bounce drop-shadow-lg`} size={32} />
                        <div className="absolute inset-0 animate-ping">
                            <ArrowDown className={`${isDarkMode ? 'text-purple-400' : 'text-purple-600'} opacity-20`} size={32} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;