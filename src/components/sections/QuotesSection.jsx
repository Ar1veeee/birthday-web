import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Quote, ArrowLeft, ArrowRight } from 'lucide-react';
import { loveQuotes } from '../../constants/content';

const QuotesSection = ({
    sectionRef,
    sectionAnimations,
    currentQuoteIndex,
    setCurrentQuoteIndex,
    textClass,
    textSecondaryClass,
    isDarkMode
}) => {
    const [isAutoPlay, setIsAutoPlay] = useState(true);
    const [showHearts, setShowHearts] = useState(false);

    useEffect(() => {
        if (!isAutoPlay) return;
        
        const interval = setInterval(() => {
            setCurrentQuoteIndex(prev => (prev + 1) % loveQuotes.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlay, setCurrentQuoteIndex]);

    useEffect(() => {
        setShowHearts(true);
        const timer = setTimeout(() => setShowHearts(false), 2000);
        return () => clearTimeout(timer);
    }, [currentQuoteIndex]);

    const nextQuote = () => {
        setIsAutoPlay(false);
        setCurrentQuoteIndex(prev => (prev + 1) % loveQuotes.length);
    };

    const prevQuote = () => {
        setIsAutoPlay(false);
        setCurrentQuoteIndex(prev => prev === 0 ? loveQuotes.length - 1 : prev - 1);
    };

    return (
        <section
            ref={sectionRef}
            data-section="quotes"
            className="pt-32 pb-0 px-4 relative overflow-hidden"
        >
            {/* Floating Hearts Animation */}
            {showHearts && (
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className={`absolute animate-float-up opacity-60`}
                            style={{
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${i * 0.3}s`,
                                fontSize: Math.random() * 20 + 15 + 'px'
                            }}
                        >
                            💕
                        </div>
                    ))}
                </div>
            )}

            <div className="max-w-7xl mx-auto">
                {/* Header with modern styling */}
                <div className={`text-center mb-20 transition-all duration-1000 ${sectionAnimations.quotes ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                    <div className="relative inline-block">
                        <h2 className={`text-5xl md:text-8xl font-black mb-6 ${textClass} relative`}>
                            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent animate-gradient-x">
                                Love Notes
                            </span>
                            <div className="absolute -top-4 -right-4 animate-spin-slow">
                                <Sparkles className="text-pink-400 w-8 h-8 md:w-12 md:h-12" />
                            </div>
                        </h2>
                        <p className={`text-lg md:text-xl ${textSecondaryClass} opacity-80 font-medium tracking-wide`}>
                            vibes that hit different ✨
                        </p>
                    </div>
                </div>

                {/* Main Quote Card with Glassmorphism */}
                <div className={`relative text-center mb-16 transition-all duration-1200 delay-300 ${sectionAnimations.quotes ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-10 scale-95 opacity-0'}`}>
                    <div className="relative max-w-6xl mx-auto">
                        {/* Navigation Arrows */}
                        <button
                            onClick={prevQuote}
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-110 group"
                        >
                            <ArrowLeft className="w-6 h-6 text-white group-hover:text-pink-300 transition-colors" />
                        </button>
                        
                        <button
                            onClick={nextQuote}
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-110 group"
                        >
                            <ArrowRight className="w-6 h-6 text-white group-hover:text-pink-300 transition-colors" />
                        </button>

                        {/* Quote Card */}
                        <div className="relative">
                            <div className={`bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-[4rem] p-12 md:p-20 border border-white/20 shadow-2xl hover:scale-[1.02] transition-all duration-700 relative overflow-hidden group`}>
                                {/* Dynamic Background Gradient */}
                                <div className={`absolute inset-0 bg-gradient-to-r ${loveQuotes[currentQuoteIndex].bgGradient} opacity-20 rounded-[4rem] transition-all duration-1000`}></div>
                                
                                {/* Animated Border */}
                                <div className="absolute inset-0 rounded-[4rem] bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 opacity-30 blur-xl group-hover:opacity-50 transition-all duration-700"></div>

                                <div className="relative z-10">
                                    {/* Quote Icon */}
                                    <div className="flex justify-center mb-8">
                                        <div className="relative">
                                            <Quote className="w-16 h-16 md:w-20 md:h-20 text-pink-300 opacity-60" />
                                            <div className="absolute inset-0 animate-ping">
                                                <Quote className="w-16 h-16 md:w-20 md:h-20 text-pink-300 opacity-20" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Main Emoji with enhanced animation */}
                                    <div className={`text-8xl md:text-[12rem] mb-12 transform transition-all duration-1000 hover:scale-125 ${sectionAnimations.quotes ? 'scale-100 opacity-100 rotate-0' : 'scale-0 opacity-0 rotate-180'}`}>
                                        <span className="inline-block animate-bounce-gentle drop-shadow-2xl">
                                            {loveQuotes[currentQuoteIndex].emoji}
                                        </span>
                                    </div>

                                    {/* Quote Text with typewriter effect styling */}
                                    <div className="relative">
                                        <p className={`text-2xl md:text-5xl leading-relaxed font-bold mb-12 transition-all duration-1000 delay-500 ${sectionAnimations.quotes ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                                            <span className="bg-gradient-to-r from-white via-pink-200 to-purple-200 bg-clip-text text-transparent">
                                                "{loveQuotes[currentQuoteIndex].text}"
                                            </span>
                                        </p>
                                        
                                        {/* Category Tag */}
                                        <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r ${loveQuotes[currentQuoteIndex].tagGradient} text-white font-semibold text-sm md:text-base mb-12 transition-all duration-1000 delay-700 ${sectionAnimations.quotes ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                                            <Heart className="w-4 h-4" />
                                            {loveQuotes[currentQuoteIndex].vibe}
                                            <Sparkles className="w-4 h-4" />
                                        </div>
                                    </div>

                                    {/* Enhanced Navigation Dots */}
                                    <div className={`flex justify-center items-center space-x-4 mt-12 transition-all duration-1000 delay-900 ${sectionAnimations.quotes ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'}`}>
                                        {loveQuotes.map((quote, index) => (
                                            <button
                                                key={index}
                                                onClick={() => {
                                                    setIsAutoPlay(false);
                                                    setCurrentQuoteIndex(index);
                                                }}
                                                className={`relative transition-all duration-500 hover:scale-150 group ${index === currentQuoteIndex ? 'scale-125' : ''}`}
                                            >
                                                <div className={`w-5 h-5 rounded-full transition-all duration-500 ${
                                                    index === currentQuoteIndex
                                                        ? `bg-gradient-to-r ${quote.dotGradient} shadow-lg shadow-pink-500/50`
                                                        : isDarkMode ? 'bg-white/30 hover:bg-white/60' : 'bg-gray-400/50 hover:bg-gray-600'
                                                }`} />
                                                {index === currentQuoteIndex && (
                                                    <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${quote.dotGradient} animate-ping opacity-50`} />
                                                )}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Auto-play indicator */}
                                    <div className="mt-8 flex justify-center">
                                        <button
                                            onClick={() => setIsAutoPlay(!isAutoPlay)}
                                            className={`text-sm opacity-60 hover:opacity-100 transition-all ${isAutoPlay ? 'text-green-400' : 'text-gray-400'}`}
                                        >
                                            {isAutoPlay ? '⏸️ auto-play on' : '▶️ auto-play off'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quote Counter */}
                <div className={`text-center transition-all duration-1000 delay-1200 ${sectionAnimations.quotes ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
                    <p className={`${textSecondaryClass} opacity-60 text-lg`}>
                        {currentQuoteIndex + 1} of {loveQuotes.length} • swipe for more feels
                    </p>
                </div>
            </div>
        </section>
    );
};

export default QuotesSection;