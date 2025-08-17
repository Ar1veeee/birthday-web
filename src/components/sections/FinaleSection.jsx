import React from 'react';
import { Heart } from 'lucide-react';

const FinaleSection = ({
    sectionRef,
    sectionAnimations,
    heartClicks,
    handleHeartClick,
    isDarkMode,
    textTertiaryClass
}) => {
    return (
        <section
            ref={sectionRef}
            data-section="finale"
            className="py-40 px-4 relative overflow-hidden"
        >
            <div className="max-w-5xl mx-auto text-center relative z-20">
                <div className={`${isDarkMode ? 'bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-indigo-500/30' : 'bg-white/80'} backdrop-blur-2xl rounded-[4rem] p-16 md:p-24 border-2 ${isDarkMode ? 'border-white/30' : 'border-pink-200/50'} shadow-2xl hover:shadow-purple-500/30 transition-all duration-700 hover:scale-105 relative overflow-hidden animate-grand-entrance ${sectionAnimations.finale ? 'translate-y-0 scale-100 opacity-100 rotate-0' : 'translate-y-20 scale-90 opacity-0 rotate-1'}`}>
                    <div className={`absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-indigo-500/10 animate-pulse blur-3xl transition-opacity duration-1000 delay-300 ${sectionAnimations.finale ? 'opacity-100' : 'opacity-0'}`}></div>
                    <div className="relative z-10">
                        <div className="mb-12">
                            <h2 className={`text-4xl md:text-5xl font-black mb-12 leading-tight ${isDarkMode ? 'text-white' : 'text-gray-800'} drop-shadow-lg animate-title-grand transition-all duration-1000 delay-500 ${sectionAnimations.finale ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                                Happy Birthday,<br />
                                <span className={`${isDarkMode ? 'bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent' : 'text-purple-600'} `}>
                                    My Beloved Girl! 🎉
                                </span>
                            </h2>
                            <div className={`absolute -top-8 left-1/4 animate-float transition-all duration-1000 delay-700 ${sectionAnimations.finale ? 'scale-100 opacity-60' : 'scale-0 opacity-0'}`}>
                                <Heart className="text-pink-400" size={30} fill="currentColor" />
                            </div>
                            <div className={`absolute -top-4 right-1/3 animate-float-delayed transition-all duration-1000 delay-900 ${sectionAnimations.finale ? 'scale-100 opacity-60' : 'scale-0 opacity-0'}`}>
                                <Heart className="text-red-400" size={25} fill="currentColor" />
                            </div>
                        </div>

                        <div className={`space-y-10 leading-relaxed ${isDarkMode ? 'text-white/95' : 'text-gray-700'}`}>
                            <p className={`italic font-light text-xl animate-text-reveal transition-all duration-1000 delay-1100 ${sectionAnimations.finale ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
                                "Ada orang pernah bilang. Kenapa senja selalu menyenangkan. Kadang dia hitam, kelam. Kadang dia merah merekah. Tapi langit selalu menerima apa adanya."
                            </p>
                            <p className={`text-xl animate-text-reveal-2 transition-all duration-1000 delay-1300 ${sectionAnimations.finale ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
                                Dan hari ini aku sadar, akulah senja itu penuh perubahan, tak selalu indah, kadang rapuh, kadang terluka.
                                Tapi kau, <span className={`${isDarkMode ? 'text-pink-300' : 'text-purple-600'} font-bold text-2xl`}>langitku</span>, selalu menerimaku apa adanya.
                                Terima kasih karena dalam luasmu aku belajar arti ketulusan,
                                dalam sabarmu aku menemukan rumah,
                                dan dalam cintamu aku percaya bahwa bahkan senja yang redup pun tetap layak dicintai.
                            </p>
                            <div className={`py-8 animate-love-declaration transition-all duration-1000 delay-1500 ${sectionAnimations.finale ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-5 scale-95 opacity-0'}`}>
                                <p className={`text-2xl md:text-4xl font-bold text-center ${isDarkMode ? 'bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent' : 'text-purple-700'} animate-pulse drop-shadow-lg`}>
                                    I Love You More Than Words Can Say 💖
                                </p>
                            </div>
                        </div>

                        <div className={`flex justify-center mt-16 space-x-6 flex-wrap gap-0 md:gap-4 transition-all duration-1000 delay-1700 ${sectionAnimations.finale ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-10 scale-75 opacity-0'}`}>
                            {[...Array(5)].map((_, i) => (
                                <Heart
                                    key={i}
                                    className={`text-red-400 animate-pulse hover:scale-200 hover:text-red-500 transition-all duration-500 cursor-pointer drop-shadow-xl animate-heart-entrance`}
                                    fill="currentColor"
                                    size={25}
                                    style={{
                                        animationDelay: `${i * 400 + 1900}ms`,
                                        filter: `drop-shadow(0 0 15px rgba(244, 63, 94, 0.6))`,
                                        transitionDelay: `${i * 100}ms`
                                    }}
                                    onClick={handleHeartClick}
                                />
                            ))}
                        </div>

                        {heartClicks >= 50 && (
                            <div className={`mt-12 animate-bounce animate-achievement ${sectionAnimations.finale ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
                                <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl p-6 shadow-2xl animate-glow-pulse">
                                    <p className={`text-2xl ${isDarkMode ? 'text-white' : 'text-gray-800'} font-bold`}>
                                        🎊 Achievement Unlocked: Ultimate Lover! 🎊
                                    </p>
                                    <p className={`text-lg ${textTertiaryClass} mt-2`}>
                                        Kamu sudah mengklik {heartClicks} hati! Cinta yang luar biasa! 💖
                                    </p>
                                </div>
                            </div>
                        )}
                        {heartClicks >= 100 && (
                            <div className={`mt-8 animate-pulse animate-legendary ${sectionAnimations.finale ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
                                <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 shadow-2xl animate-rainbow-border">
                                    <p className="text-2xl text-white font-bold animate-text-glow">
                                        🌟 LEGENDARY LOVE STATUS ACHIEVED! 🌟
                                    </p>
                                    <p className="text-lg text-white/90 mt-2">
                                        Cintamu melampaui batas-batas dunia! {heartClicks} clicks of pure love! 🚀
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="absolute inset-0 overflow-hidden -z-10">
                <div className={`absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse transition-all duration-1000 delay-500 ${sectionAnimations.finale ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}></div>
                <div className={`absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse transition-all duration-1000 delay-700 ${sectionAnimations.finale ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}></div>
                <div className={`absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-yellow-400/10 to-orange-400/10 rounded-full blur-2xl animate-pulse transition-all duration-1000 delay-900 ${sectionAnimations.finale ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}></div>
            </div>
        </section>
    );
};

export default FinaleSection;