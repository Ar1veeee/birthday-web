import React, { useState } from 'react';
import { Sparkles, Star, Heart, Zap } from 'lucide-react';
import { wishes } from '../../constants/content';

const WishesSection = ({
    sectionRef,
    sectionAnimations,
    scrollY,
    textClass,
    textTertiaryClass,
    isDarkMode
}) => {
    const [activeWish, setActiveWish] = useState(null);
    const [floatingHearts, setFloatingHearts] = useState([]);
    const [wishCount, setWishCount] = useState(0);

    const createFloatingHearts = () => {
        const hearts = Array.from({ length: 8 }, (_, i) => ({
            id: Date.now() + i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            delay: i * 150,
            emoji: ['💕', '✨', '💖', '🌟'][Math.floor(Math.random() * 4)]
        }));
        setFloatingHearts(hearts);
        setTimeout(() => setFloatingHearts([]), 3000);
    };

    const handleWishClick = (index) => {
        setActiveWish(index);
        setWishCount(prev => prev + 1);
        createFloatingHearts(index);
        setTimeout(() => setActiveWish(null), 2000);
    };

    return (
        <section
            ref={sectionRef}
            data-section="wishes"
            className="pt-32 pb-64 px-4 overflow-hidden"
            style={{ transform: `translateY(${scrollY * 0.05}px)` }}
        >
            {/* Floating Hearts Animation */}
            {floatingHearts.map(heart => (
                <div
                    key={heart.id}
                    className="absolute pointer-events-none animate-float-up z-10"
                    style={{
                        left: `${heart.x}%`,
                        top: `${heart.y}%`,
                        animationDelay: `${heart.delay}ms`,
                        fontSize: '24px'
                    }}
                >
                    {heart.emoji}
                </div>
            ))}

            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute animate-float-1 opacity-10"
                        style={{
                            left: `${10 + i * 15}%`,
                            top: `${20 + i * 12}%`,
                            animationDelay: `${i * 2}s`,
                            animationDuration: '6s'
                        }}
                    >
                        <Star className="text-purple-400 w-8 h-8" />
                    </div>
                ))}
            </div>

            <div className="max-w-7xl mx-auto">
                {/* Enhanced Header */}
                <div className={`text-center mb-20 transition-all duration-1000 ${sectionAnimations.wishes ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                    <div className="relative inline-block">
                        <h2 className={`text-5xl md:text-8xl font-black mb-6 ${textClass} relative`}>
                            <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent animate-gradient-x">
                                Wishes & Vibes
                            </span>
                            <div className="absolute -top-4 -right-8 animate-bounce-gentle">
                                <div className="text-4xl">✨</div>
                            </div>
                        </h2>
                        <div className="flex justify-center items-center gap-4 mb-6">
                            <div className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-white/10">
                                <span className={`${textClass} font-semibold flex items-center gap-2`}>
                                    <Heart className="w-4 h-4 text-pink-400" />
                                    {wishCount} wishes sent
                                </span>
                            </div>
                        </div>
                        <p className={`text-lg md:text-xl ${textClass} opacity-80 font-medium`}>
                            kirim energy positif buat kamu 🌟
                        </p>
                    </div>
                </div>

                {/* Wishes Grid with Modern Layout */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {wishes.map((wish, index) => (
                        <div
                            key={index}
                            onClick={() => handleWishClick(index)}
                            className={`group relative cursor-pointer transform transition-all duration-700 hover:scale-105 hover:-translate-y-6 ${activeWish === index ? 'scale-110 -translate-y-8' : ''
                                } ${sectionAnimations.wishes ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-20 scale-95 opacity-0'}`}
                            style={{
                                animationDelay: `${index * 150 + 300}ms`,
                                transform: `translateY(${Math.sin(scrollY * 0.01 + index) * 8}px)`,
                                transitionDelay: `${index * 100}ms`
                            }}
                        >
                            {/* Modern Card Design with Fixed Height */}
                            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/20 shadow-2xl overflow-hidden group-hover:shadow-purple-500/30 relative h-[480px] flex flex-col">
                                {/* Dynamic Background */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${wish.bgGradient} opacity-10 group-hover:opacity-25 transition-all duration-700`}></div>

                                {/* Glow Effect */}
                                <div className={`absolute inset-0 bg-gradient-to-r ${wish.glowGradient} opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-700`}></div>

                                {/* Card Content */}
                                <div className="relative z-10 p-8 flex flex-col flex-1">
                                    {/* Icon with Enhanced Animation */}
                                    <div className="relative mb-6 flex justify-center">
                                        <div className={`text-5xl transition-all duration-700 group-hover:scale-125 group-hover:rotate-12 drop-shadow-2xl ${activeWish === index ? 'animate-bounce scale-125 rotate-12' : ''
                                            }`}>
                                            {wish.icon}
                                        </div>

                                        {/* Pulse Ring */}
                                        <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${wish.pulseGradient} opacity-0 group-hover:opacity-30 animate-ping transition-all duration-700`}></div>
                                    </div>

                                    {/* Title */}
                                    <h3 className={`text-lg md:text-xl font-bold mb-4 text-center transition-all duration-500 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${wish.titleGradient} min-h-[3rem] flex items-center justify-center`}>
                                        <span className={`${isDarkMode ? 'text-white' : 'text-gray-800'} group-hover:hidden`}>
                                            {wish.title}
                                        </span>
                                        <span className={`hidden group-hover:inline bg-gradient-to-r ${wish.titleGradient} bg-clip-text text-transparent`}>
                                            {wish.title}
                                        </span>
                                    </h3>

                                    {/* Description */}
                                    <div className="flex-1 flex items-center">
                                        <p className={`text-sm leading-relaxed ${textTertiaryClass} group-hover:text-opacity-100 transition-all duration-500 text-center`}>
                                            {wish.description}
                                        </p>
                                    </div>

                                    {/* Vibe Tag */}
                                    <div className="mt-6 flex justify-center">
                                        <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-gradient-to-r ${wish.tagGradient} text-white`}>
                                            {wish.vibeIcon}
                                            {wish.vibe}
                                        </span>
                                    </div>
                                </div>

                                {/* Corner Decorations */}
                                <div className={`absolute top-4 right-4 opacity-20 group-hover:opacity-80 transition-all duration-700 ${activeWish === index ? 'animate-spin' : ''
                                    }`}>
                                    <Sparkles className="w-6 h-6 text-yellow-400" />
                                </div>

                                <div className={`absolute bottom-4 left-4 opacity-15 group-hover:opacity-60 transition-all duration-700 ${activeWish === index ? 'animate-pulse' : ''
                                    }`}>
                                    <Heart className="w-5 h-5 text-pink-400" />
                                </div>

                                {/* Interactive Indicator */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
                                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                                        <Zap className="w-8 h-8 text-yellow-400 animate-pulse" />
                                    </div>
                                </div>

                                {/* Success Animation Overlay */}
                                {activeWish === index && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500/30 to-purple-500/30 rounded-[2.5rem] animate-pulse">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-4xl animate-bounce">🎉</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom Stats */}
                <div className={`text-center mt-16 transition-all duration-1000 delay-1000 ${sectionAnimations.wishes ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
                    <div className="flex justify-center items-center gap-6 flex-wrap">
                        <div className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-white/10">
                            <Star className="w-4 h-4 text-yellow-400" />
                            <span className={`${textClass} font-semibold`}>{wishes.length} wish dibuat untukmu</span>
                        </div>
                    </div>
                    <p className={`${textClass} opacity-60 text-lg mt-4`}>
                        tap setiap wish untuk aktifkan good vibes ✨
                    </p>
                </div>
            </div>
        </section>
    );
};


export default WishesSection;