import React, { useState, useEffect, useRef } from 'react';
import { photos, loveQuotes, specialMessages } from './constants/content';

// Import components UI
import Particles from './components/ui/Particles';
import MusicControl from './components/ui/MusicControl';
import ThemeToggle from './components/ui/ThemeToggle';
import SpecialMessagePopup from './components/ui/SpecialMessagePopup';
import HeartCounter from './components/ui/HeartCounter';
import HandshakeAnimation from './components/ui/HandshakeAnimation';
import RomanticPreloader from './components/ui/RomanticPreloader';

// Import components Effects
import Fireworks from './components/effects/Fireworks';
import MeteorShower from './components/effects/MeteorShower';
import RainbowTrail from './components/effects/RainbowTrail';

// Import components Sections
import HeroSection from './components/sections/HeroSection';
import QuotesSection from './components/sections/QuotesSection';
import GallerySection from './components/sections/GallerySection';
import WishesSection from './components/sections/WishesSection';
import FinaleSection from './components/sections/FinaleSection';

// Import global style
import './index.css';

const App = () => {
  const [showContent, setShowContent] = useState(true);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [particles, setParticles] = useState([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [showFireworks, setShowFireworks] = useState(false);
  const [heartClicks, setHeartClicks] = useState(0);
  const [showSpecialMessage, setShowSpecialMessage] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [showMeteors, setShowMeteors] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [textGlow, setTextGlow] = useState(false);
  const [showRainbowTrail, setShowRainbowTrail] = useState(false);
  const [sectionAnimations, setSectionAnimations] = useState({
    hero: false,
    quotes: false,
    gallery: false,
    wishes: false,
    finale: false
  });
  const [showHandshake, setShowHandshake] = useState(false);
  const [showPreloader, setShowPreloader] = useState(false)
  const [handsConnected, setHandsConnected] = useState(false);
  const [handshakeTriggered, setHandshakeTriggered] = useState(false);
  const audioRef = useRef(null);
  const sectionRefs = useRef({
    hero: null,
    quotes: null,
    gallery: null,
    wishes: null,
    finale: null
  });

  const MESSAGE_CHANGE_SPEED = 800;
  useEffect(() => {
    if (showSpecialMessage) {
      const randomIndex = Math.floor(Math.random() * specialMessages.length);
      setCurrentMessageIndex(randomIndex);
      const intervalId = setInterval(() => {
        setCurrentMessageIndex(prevIndex => (prevIndex + 1) % specialMessages.length);
      }, MESSAGE_CHANGE_SPEED);
      return () => clearInterval(intervalId);
    }
  }, [showSpecialMessage]);

  useEffect(() => {
    const createParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 80; i++) {
        newParticles.push({
          id: Math.random(),
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 4 + 1,
          speedX: (Math.random() - 0.5) * 0.8,
          speedY: (Math.random() - 0.5) * 0.8,
          opacity: Math.random() * 0.6 + 0.2,
          color: ['#ff6b9d', '#c44569', '#f8b500', '#6c5ce7', '#a55eea', '#26de81', '#fd79a8'][Math.floor(Math.random() * 7)],
          type: Math.random() > 0.7 ? 'star' : 'circle',
          pulse: Math.random() * 2 + 1
        });
      }
      setParticles(newParticles);
    };
    createParticles();
    const interval = setInterval(() => {
      setParticles(prev => prev.map(p => ({
        ...p,
        x: (p.x + p.speedX + window.innerWidth) % window.innerWidth,
        y: (p.y + p.speedY + window.innerHeight) % window.innerHeight,
        pulse: p.pulse + 0.1
      })));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (Math.random() > 0.95) {
        setShowRainbowTrail(true);
        setTimeout(() => setShowRainbowTrail(false), 500);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      const scrollPercentage = (currentScrollY / window.innerHeight) * 100;

      if (scrollPercentage > 20 && scrollPercentage < 150 && !handshakeTriggered) {
        try {
          console.log('🚀 Attempting to trigger preloader...');
          setShowPreloader(true);
          setHandshakeTriggered(true);
          console.log('✅ Preloader triggered successfully');
        } catch (error) {
          console.error('❌ Error triggering preloader:', {
            message: error.message,
            stack: error.stack,
            scrollPercentage,
            handshakeTriggered
          });
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handshakeTriggered]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionName = entry.target.getAttribute('data-section');
            setSectionAnimations(prev => ({ ...prev, [sectionName]: true }));
            if (sectionName === 'quotes') setTimeout(() => setTextGlow(true), 500);
            if (sectionName === 'gallery') {
              setTimeout(() => setShowMeteors(true), 800);
              setTimeout(() => setShowMeteors(false), 3000);
            }
            if (sectionName === 'finale') {
              setTimeout(() => setShowFireworks(true), 1000);
              setTimeout(() => setShowFireworks(false), 4000);
            }
          }
        });
      },
      { threshold: 0.2, rootMargin: '-50px 0px -50px 0px' }
    );
    Object.values(sectionRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSectionAnimations(prev => ({ ...prev, hero: true }));
      setShowContent(true);
      setTextGlow(true);
      setTimeout(() => {
        setShowMeteors(true);
        setTimeout(() => setShowMeteors(false), 2500);
      }, 2000);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setCurrentPhotoIndex(prev => (prev + 1) % photos.length), 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setCurrentQuoteIndex(prev => (prev + 1) % loveQuotes.length), 5000);
    return () => clearInterval(interval);
  }, []);

  const handleHeartClick = () => {
    const newClicks = heartClicks + 1;
    setHeartClicks(newClicks);
    if (newClicks > 0 && newClicks % 3 === 0) {
      setShowSpecialMessage(true);
      setTimeout(() => setShowSpecialMessage(false), 4000);
    }
    if (newClicks === 15) {
      setShowFireworks(true);
      setTimeout(() => setShowFireworks(false), 6000);
    }
    if (newClicks === 30) {
      setShowMeteors(true);
      setTimeout(() => setShowMeteors(false), 8000);
    }
  };

  const toggleMusic = async () => {
    if (!audioRef.current) return;
    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error playing audio:', error);
      alert('Audio cannot be played. Please ensure /public/audio/audio-2.mp3 exists.');
      setIsPlaying(false);
    }
  };

  const handleHandshakeClick = async () => {
    if (audioRef.current && !isPlaying) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error('Failed to play audio on click:', error);
      }
    }
    setShowHandshake(false);
  };

  const handleStartExperience = () => {
    setShowPreloader(false);
    setShowHandshake(true);
    setTimeout(() => setHandsConnected(true), 2000);
  };

  const themeClass = isDarkMode ? 'bg-gradient-to-br from-gray-900 via-purple-900 via-pink-900 to-indigo-900' : 'bg-gradient-to-br from-pink-50 via-purple-50 via-rose-50 to-indigo-100';
  const textClass = isDarkMode ? 'text-white' : 'text-gray-800';
  const cardBgClass = isDarkMode ? 'bg-white/10 backdrop-blur-xl' : 'bg-white/90 backdrop-blur-lg';
  const borderClass = isDarkMode ? 'border-white/20' : 'border-pink-200/50';
  const textSecondaryClass = isDarkMode ? 'text-white/95' : 'text-gray-700';
  const textTertiaryClass = isDarkMode ? 'text-white/85' : 'text-gray-600';

  return (
    <div className={`min-h-screen transition-all duration-1000 overflow-x-hidden relative ${themeClass}`}>
      <audio ref={audioRef} loop preload="metadata">
        <source src="/audio/audio.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <MusicControl
        toggleMusic={toggleMusic}
        isPlaying={isPlaying}
        cardBgClass={cardBgClass}
        borderClass={borderClass}
        isDarkMode={isDarkMode}
      />

      <ThemeToggle
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      {showSpecialMessage &&
        <SpecialMessagePopup
          cardBgClass={cardBgClass}
          borderClass={borderClass}
          textClass={textClass}
          message={specialMessages[currentMessageIndex]}
        />}

      {heartClicks > 0 &&
        <HeartCounter
          heartClicks={heartClicks}
          cardBgClass={cardBgClass}
          borderClass={borderClass}
          textClass={textClass}
        />}

      {showFireworks && <Fireworks />}
      {showMeteors && <MeteorShower />}
      {showRainbowTrail && <RainbowTrail mousePos={mousePos} />}

      <Particles particles={particles} />

      <main>
        <HeroSection
          sectionRef={el => sectionRefs.current.hero = el}
          sectionAnimations={sectionAnimations}
          isDarkMode={isDarkMode}
          handleHeartClick={handleHeartClick}
        />
        <QuotesSection
          sectionRef={el => sectionRefs.current.quotes = el}
          sectionAnimations={sectionAnimations}
          currentQuoteIndex={currentQuoteIndex}
          setCurrentQuoteIndex={setCurrentQuoteIndex}
          textClass={textClass}
          textSecondaryClass={textSecondaryClass}
          isDarkMode={isDarkMode}
        />
        <GallerySection
          sectionRef={el => sectionRefs.current.gallery = el}
          sectionAnimations={sectionAnimations}
          scrollY={scrollY}
          photos={photos}
          currentPhotoIndex={currentPhotoIndex}
          setCurrentPhotoIndex={setCurrentPhotoIndex}
          textClass={textClass}
          isDarkMode={isDarkMode}
        />
        <WishesSection
          sectionRef={el => sectionRefs.current.wishes = el}
          sectionAnimations={sectionAnimations}
          scrollY={scrollY}
          textClass={textClass}
          textTertiaryClass={textTertiaryClass}
          isDarkMode={isDarkMode}
        />
        <FinaleSection
          sectionRef={el => sectionRefs.current.finale = el}
          sectionAnimations={sectionAnimations}
          heartClicks={heartClicks}
          handleHeartClick={handleHeartClick}
          isDarkMode={isDarkMode}
          textTertiaryClass={textTertiaryClass}
        />
      </main>

      {showPreloader && (
        <RomanticPreloader
          onStartExperience={handleStartExperience}
          audioRef={audioRef}
          setIsPlaying={setIsPlaying}
        />
      )}

      {showHandshake && (
        <HandshakeAnimation
          handleHandshakeClick={handleHandshakeClick}
          handsConnected={handsConnected}
          cardBgClass={cardBgClass}
          borderClass={borderClass}
          textClass={textClass}
          textSecondaryClass={textSecondaryClass}
          showHandshake={true}
          audioRef={audioRef}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
      )}

    </div>
  );
};

export default App;