import React, { useState, useEffect } from 'react';
import { Heart, Music, Sparkles, Star } from 'lucide-react';

const RomanticPreloader = ({ 
  onStartExperience, 
  audioRef, 
  setIsPlaying 
}) => {
  const [heartBeats, setHeartBeats] = useState(0);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const heartInterval = setInterval(() => {
      setHeartBeats(prev => prev + 1);
    }, 1000);

    const showButtonTimer = setTimeout(() => {
      setShowPlayButton(true);
    }, 1500); 

    return () => {
      clearInterval(heartInterval);
      clearTimeout(showButtonTimer);
    };
  }, []);

  const handleStartClick = async () => {
    if (audioRef?.current) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        console.log('Music started on user interaction');
      } catch (error) {
        console.error('Error playing audio:', error);
      }
    }

    setFadeOut(true);
    
    setTimeout(() => {
      onStartExperience();
    }, 800);
  };



  return (
    <div className={`fixed inset-0 z-[60] transition-all duration-800 ${
      fadeOut ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
    }`}>
      {/* Romantic gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-300">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-pink-400/20 to-purple-400/20 rounded-full blur-3xl animate-float-4"></div>
          <div className="absolute bottom-32 right-24 w-24 h-24 bg-gradient-to-r from-indigo-400/20 to-blue-400/20 rounded-full blur-2xl animate-float-2"></div>
          <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-float-3"></div>
        </div>
      </div>

      {/* Floating romantic particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className={`absolute animate-float-gentle-delay opacity-60`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`
            }}
          >
            {i % 3 === 0 ? (
              <Heart className="text-pink-400/60" size={Math.random() * 12 + 8} />
            ) : i % 3 === 1 ? (
              <Star className="text-purple-400/60" size={Math.random() * 10 + 6} />
            ) : (
              <Sparkles className="text-indigo-400/60" size={Math.random() * 8 + 4} />
            )}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative h-full flex flex-col items-center justify-center p-8 text-center">
        
        {/* Main beating heart */}
        <div className="relative mb-8">
          <div 
            className={`text-8xl md:text-9xl transition-all duration-300 ${
              heartBeats % 2 === 0 ? 'scale-100' : 'scale-110'
            }`}
            style={{
              filter: 'drop-shadow(0 0 20px rgba(236, 72, 153, 0.3))'
            }}
          >
            ❤️
          </div>
          
          {/* Pulse rings around heart */}
          <div className="absolute inset-0 -m-4">
            <div className={`absolute inset-0 border-2 border-pink-400/30 rounded-full transition-all duration-1000 ${
              heartBeats % 2 === 0 ? 'scale-100 opacity-30' : 'scale-150 opacity-0'
            }`}></div>
            <div className={`absolute inset-0 border border-pink-300/20 rounded-full transition-all duration-1000 delay-200 ${
              heartBeats % 2 === 0 ? 'scale-110 opacity-20' : 'scale-200 opacity-0'
            }`}></div>
          </div>
        </div>

        {/* Romantic message */}
        <div className="space-y-4 mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 animate-fade-in-translate">
            Ada yang Spesial Untukmu
          </h1>
          <p className="text-lg md:text-xl text-gray-600 animate-fade-in-delay max-w-lg">
            Sebuah kejutan romantis yang dibuat dengan cinta 💕
          </p>
        </div>

        {/* Play button with romantic styling */}
        {showPlayButton && (
          <div className="relative animate-fade-in-slow">
            <button
              onClick={handleStartClick}
              className="group relative px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
            >
              {/* Button glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
              
              <div className="relative flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <Music className="animate-bounce" size={20} />
                </div>
                <span>Mulai Kejutan</span>
              </div>
              
              {/* Sparkle effects on hover */}
              <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Sparkles className="text-yellow-300 animate-spin" size={16} />
              </div>
              <div className="absolute -bottom-2 -left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                <Star className="text-pink-300 animate-pulse" size={14} />
              </div>
            </button>

            {/* Instruction text */}
            <p className="mt-4 text-sm text-gray-500 animate-pulse">
              Ketuk tombol di atas untuk memulai ✨
            </p>

            {/* Hearts floating around button */}
            <div className="absolute -top-8 -left-8 animate-float-celebration text-pink-400/60">
              <Heart size={12} />
            </div>
            <div className="absolute -top-6 -right-10 animate-float-celebration-delay text-purple-400/60">
              <Heart size={10} />
            </div>
            <div className="absolute -bottom-8 -right-6 animate-float-celebration text-pink-400/60">
              <Heart size={14} />
            </div>
            <div className="absolute -bottom-6 -left-10 animate-float-celebration-delay text-purple-400/60">
              <Heart size={8} />
            </div>
          </div>
        )}


      </div>

      {/* Bottom romantic quote */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
        <p className="text-sm text-gray-500 italic opacity-70">
          "Cinta itu seperti musik, indah ketika dimainkan bersama" 🎵
        </p>
      </div>
    </div>
  );
};

export default RomanticPreloader;