import React, { useState, useEffect } from 'react';
import { Camera, Heart, Download, Share2, Eye, ArrowLeft, ArrowRight, Play, Pause, Check, Facebook, Twitter, Instagram, Link2, Mail } from 'lucide-react';

const GallerySection = ({
    sectionRef,
    sectionAnimations,
    scrollY,
    photos,
    currentPhotoIndex,
    setCurrentPhotoIndex,
    textClass,
    isDarkMode
}) => {
    const [isSlideshow, setIsSlideshow] = useState(false);
    const [likedPhotos, setLikedPhotos] = useState(new Set());
    const [viewCount, setViewCount] = useState(photos?.length * 47 || 141);
    const [showShareModal, setShowShareModal] = useState(false);
    const [downloadStatus, setDownloadStatus] = useState({});
    const [copyStatus, setCopyStatus] = useState(false);
    const [customAlert, setCustomAlert] = useState({ show: false, message: '' });

    const showCustomAlert = (message) => {
        setCustomAlert({ show: true, message });
        setTimeout(() => {
            setCustomAlert({ show: false, message: '' });
        }, 4000);
    };

    const styles = `
        @keyframes progress {
            from { width: 0% }
            to { width: 100% }
        }
        
        .animate-progress {
            animation: progress 3s linear infinite;
        }
        
        .animate-float {
            animation: float 4s ease-in-out infinite;
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }
        
        .animate-gradient-x {
            background-size: 200% 200%;
            animation: gradient-x 3s ease-in-out infinite;
        }
        
        @keyframes gradient-x {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }
        
        .animate-bounce-slow {
            animation: bounce 2s infinite;
        }
        
        .animate-pulse-slow {
            animation: pulse 3s infinite;
        }
        
        @keyframes modalSlideUp {
            from { transform: translateY(100%); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        .animate-modal-slide {
            animation: modalSlideUp 0.3s ease-out;
        }
    `;

    useEffect(() => {
        const styleElement = document.createElement('style');
        styleElement.textContent = styles;
        document.head.appendChild(styleElement);

        return () => {
            document.head.removeChild(styleElement);
        };
    }, []);

    useEffect(() => {
        if (!isSlideshow) return;

        const interval = setInterval(() => {
            setCurrentPhotoIndex(prev => (prev + 1) % photosData.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [isSlideshow, setCurrentPhotoIndex]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (showShareModal && e.target.classList.contains('modal-backdrop')) {
                setShowShareModal(false);
            }
        };

        if (showShareModal) {
            document.addEventListener('click', handleClickOutside);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
            document.body.style.overflow = 'unset';
        };
    }, [showShareModal]);

    const nextPhoto = () => {
        setCurrentPhotoIndex(prev => (prev + 1) % photosData.length);
    };

    const prevPhoto = () => {
        setCurrentPhotoIndex(prev => prev === 0 ? photosData.length - 1 : prev - 1);
    };

    const toggleLike = (photoIndex) => {
        const newLiked = new Set(likedPhotos);
        if (newLiked.has(photoIndex)) {
            newLiked.delete(photoIndex);
        } else {
            newLiked.add(photoIndex);
        }
        setLikedPhotos(newLiked);
    };

    const handlePhotoView = (index) => {
        setCurrentPhotoIndex(index);
        setViewCount(prev => prev + Math.floor(Math.random() * 3) + 1);
    };

    const shareOptions = [
        {
            name: 'Facebook',
            icon: Facebook,
            color: 'bg-blue-600 hover:bg-blue-700',
            action: () => {
                const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(`Check out this amazing photo: ${photosData[currentPhotoIndex]?.caption}`)}`;
                window.open(url, '_blank', 'width=600,height=400');
            }
        },
        {
            name: 'Twitter',
            icon: Twitter,
            color: 'bg-blue-400 hover:bg-blue-500',
            action: () => {
                const text = `Check out this amazing photo: ${photosData[currentPhotoIndex]?.caption} ${photosData[currentPhotoIndex]?.tags?.map(tag => `#${tag}`).join(' ') || '#memories #love'}`;
                const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`;
                window.open(url, '_blank', 'width=600,height=400');
            }
        },
        {
            name: 'Instagram',
            icon: Instagram,
            color: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600',
            action: async () => {
                const text = `${photosData[currentPhotoIndex]?.caption}\n\n${photosData[currentPhotoIndex]?.tags?.map(tag => `#${tag}`).join(' ') || '#memories #love'}\n\n📸 Check out more at: ${window.location.href}`;

                try {
                    await navigator.clipboard.writeText(text);

                    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

                    if (isMobile) {
                        window.location.href = 'instagram://app';

                        setTimeout(() => {
                            window.open('https://www.instagram.com/', '_blank');
                        }, 2000);
                    } else {
                        window.open('https://www.instagram.com/', '_blank');
                    }

                    showCustomAlert('Caption copied to clipboard! 📋\nInstagram is opening - you can paste and post! 🚀');

                } catch (err) {
                    console.error('Failed to copy to clipboard:', err);
                    showCustomAlert('Please copy this caption manually:\n\n' + text);
                }
            }
        },
        {
            name: 'Email',
            icon: Mail,
            color: 'bg-gray-600 hover:bg-gray-700',
            action: () => {
                const subject = `Check out this photo: ${photosData[currentPhotoIndex]?.caption}`;
                const body = `I wanted to share this amazing photo with you!\n\n${photosData[currentPhotoIndex]?.caption}\nTaken on: ${photosData[currentPhotoIndex]?.date}\nLocation: ${photosData[currentPhotoIndex]?.location}\n\nView it here: ${window.location.href}`;
                window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            }
        }
    ];

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopyStatus(true);
            setTimeout(() => setCopyStatus(false), 2000);
        } catch (err) {
            console.error('Failed to copy link:', err);
        }
    };

    const downloadPhoto = async (photoUrl, fileName) => {
        setDownloadStatus(prev => ({ ...prev, [currentPhotoIndex]: 'downloading' }));

        try {
            const response = await fetch(photoUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = fileName || `photo-${currentPhotoIndex + 1}.jpg`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

            setDownloadStatus(prev => ({ ...prev, [currentPhotoIndex]: 'completed' }));
            setTimeout(() => {
                setDownloadStatus(prev => ({ ...prev, [currentPhotoIndex]: null }));
            }, 2000);
        } catch (error) {
            console.error('Download failed:', error);
            setDownloadStatus(prev => ({ ...prev, [currentPhotoIndex]: 'error' }));
            setTimeout(() => {
                setDownloadStatus(prev => ({ ...prev, [currentPhotoIndex]: null }));
            }, 2000);
        }
    };

    const defaultPhotos = [
        {
            url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&h=600&fit=crop",
            caption: "Our First Date",
            date: "January 15, 2024",
            location: "Sunset Beach",
            mood: "💕 nervous but excited",
            tags: ["firstdate", "sunset", "memories"]
        },
        {
            url: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=800&h=600&fit=crop",
            caption: "Adventure Together",
            date: "February 20, 2024",
            location: "Mountain Trail",
            mood: "🏔️ feeling adventurous",
            tags: ["hiking", "adventure", "together"]
        },
        {
            url: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=800&h=600&fit=crop",
            caption: "Cozy Evening",
            date: "March 10, 2024",
            location: "Our Favorite Cafe",
            mood: "☕ warm and cozy",
            tags: ["cafe", "cozy", "evening"]
        }
    ];

    const photosData = photos && photos.length > 0 ? photos : defaultPhotos;

    return (
        <>
            <section
                ref={sectionRef}
                data-section="gallery"
                className="pt-15 pb-64 px-4 relative overflow-hidden"
                style={{ transform: `translateY(${scrollY * 0.1}px)` }}
            >
                {/* Floating Camera Icons */}
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(4)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute animate-float opacity-20"
                            style={{
                                left: `${20 + i * 20}%`,
                                top: `${30 + i * 10}%`,
                                animationDelay: `${i * 1.5}s`,
                                animationDuration: '4s'
                            }}
                        >
                            <Camera className="text-pink-400 w-6 h-6" />
                        </div>
                    ))}
                </div>

                <div className="max-w-8xl mx-auto">
                    {/* Enhanced Header */}
                    <div className={`text-center mb-20 transition-all duration-1000 ${sectionAnimations?.gallery ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                        <div className="relative inline-block">
                            <h2 className={`text-5xl md:text-8xl font-black mb-6 ${textClass} relative`}>
                                <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x">
                                    Our Film Roll
                                </span>
                                <div className="absolute -top-6 -right-6 animate-bounce">
                                    <div className="text-4xl">📸</div>
                                </div>
                            </h2>
                            <div className="flex justify-center items-center space-x-4 mb-4">
                                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10">
                                    <Eye className="w-4 h-4 text-pink-400" />
                                    <span className={`${textClass} font-semibold text-sm`}>{viewCount.toLocaleString()} views</span>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-500/20 to-pink-500/20 backdrop-blur-sm border border-white/10">
                                    <Heart className="w-4 h-4 text-red-400" />
                                    <span className={`${textClass} font-semibold text-sm`}>{likedPhotos.size + 127} likes</span>
                                </div>
                            </div>
                            <p className={`text-lg md:text-xl ${textClass} opacity-80 font-medium`}>
                                main character moments caught in 4K ✨
                            </p>
                        </div>
                    </div>

                    {/* Main Photo Display with Instagram-like UI */}
                    <div className={`mb-16 transition-all duration-1200 delay-500 ${sectionAnimations?.gallery ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-10 scale-95 opacity-0'}`}>
                        <div className="relative max-w-5xl mx-auto">
                            {/* Instagram-style Photo Container */}
                            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
                                {/* Photo Header */}
                                <div className="flex items-center justify-between p-6 border-b border-white/10">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 p-[2px]">
                                            <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                                                <Heart className="w-6 h-6 text-pink-400" />
                                            </div>
                                        </div>
                                        <div>
                                            <p className={`${textClass} font-bold`}>our_love_story</p>
                                            <p className={`${textClass} opacity-60 text-sm`}>{photosData[currentPhotoIndex]?.location || 'somewhere magical'}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => setIsSlideshow(!isSlideshow)}
                                            className="p-2 rounded-full hover:bg-white/10 transition-all"
                                        >
                                            {isSlideshow ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white" />}
                                        </button>
                                        <button
                                            onClick={() => setShowShareModal(true)}
                                            className="p-2 rounded-full hover:bg-white/10 transition-all"
                                        >
                                            <Share2 className="w-5 h-5 text-white" />
                                        </button>
                                    </div>
                                </div>

                                {/* Main Photo */}
                                <div className="relative group">
                                    {/* Navigation Arrows */}
                                    <button
                                        onClick={prevPhoto}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100"
                                    >
                                        <ArrowLeft className="w-6 h-6 text-white" />
                                    </button>

                                    <button
                                        onClick={nextPhoto}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-all opacity-0 group-hover:opacity-100"
                                    >
                                        <ArrowRight className="w-6 h-6 text-white" />
                                    </button>

                                    <img
                                        src={photosData[currentPhotoIndex]?.url}
                                        alt={`Memory ${currentPhotoIndex + 1}`}
                                        className="w-full h-[500px] md:h-[700px] object-cover transition-all duration-500 group-hover:scale-[1.02]"
                                    />

                                    {/* Photo Overlay Info */}
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
                                        <h3 className="text-white text-2xl md:text-3xl font-bold mb-2 drop-shadow-lg">
                                            {photosData[currentPhotoIndex]?.caption}
                                        </h3>
                                        <div className="flex items-center justify-between">
                                            <p className="text-white/90 text-lg">{photosData[currentPhotoIndex]?.date}</p>
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-2">
                                                    <Camera className="w-4 h-4 text-white/70" />
                                                    <span className="text-white/70 text-sm">{currentPhotoIndex + 1}/{photosData.length}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Progress Bar for Slideshow */}
                                    {isSlideshow && (
                                        <div className="absolute top-0 left-0 right-0 h-1 bg-white/20">
                                            <div className="h-full bg-gradient-to-r from-pink-400 to-purple-500 animate-progress"></div>
                                        </div>
                                    )}
                                </div>

                                {/* Photo Actions (Instagram-like) */}
                                <div className="p-6 border-t border-white/10">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-6">
                                            <button
                                                onClick={() => toggleLike(currentPhotoIndex)}
                                                className="transition-all duration-300 hover:scale-125"
                                            >
                                                <Heart
                                                    className={`w-7 h-7 ${likedPhotos.has(currentPhotoIndex) ? 'text-red-500 fill-current animate-bounce' : isDarkMode ? 'text-white hover:text-red-400' : 'text-black hover:text-red-400'}`}
                                                />
                                            </button>
                                            <button
                                                onClick={() => setShowShareModal(true)}
                                                className="hover:scale-110 transition-all"
                                            >
                                                <Share2 className={`w-6 h-6 ${isDarkMode ? 'text-white hover:text-blue-400' : 'text-black hover:text-blue-400'}`} />
                                            </button>
                                            <button
                                                onClick={() => downloadPhoto(photosData[currentPhotoIndex]?.url, `${photosData[currentPhotoIndex]?.caption?.replace(/\s+/g, '-').toLowerCase()}.jpg`)}
                                                className="hover:scale-110 transition-all relative"
                                                disabled={downloadStatus[currentPhotoIndex] === 'downloading'}
                                            >
                                                {downloadStatus[currentPhotoIndex] === 'downloading' ? (
                                                    <div className="animate-spin w-6 h-6 border-2 border-green-400 border-t-transparent rounded-full"></div>
                                                ) : downloadStatus[currentPhotoIndex] === 'completed' ? (
                                                    <Check className="w-6 h-6 text-green-400" />
                                                ) : (
                                                    <Download className={`w-6 h-6 ${isDarkMode ? 'text-white hover:text-green-400' : 'text-black hover:text-green-400'}`} />
                                                )}
                                            </button>
                                        </div>
                                        <div className={`${isDarkMode ? 'text-white/60 text-sm' : 'text-black/60 text-sm'}`}>
                                            {photosData[currentPhotoIndex]?.mood || '💕 feeling cute'}
                                        </div>
                                    </div>

                                    {/* Hashtags */}
                                    <div className="flex flex-wrap gap-2">
                                        {photosData[currentPhotoIndex]?.tags?.map((tag, index) => (
                                            <span key={index} className="text-blue-400 text-sm hover:text-blue-300 cursor-pointer">
                                                #{tag}
                                            </span>
                                        )) || (
                                                <>
                                                    <span className="text-blue-400 text-sm">#couplegoals</span>
                                                    <span className="text-blue-400 text-sm">#memories</span>
                                                    <span className="text-blue-400 text-sm">#love</span>
                                                </>
                                            )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Thumbnail Grid */}
                    <div className={`transition-all duration-1000 delay-1200 ${sectionAnimations?.gallery ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
                        <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-3 md:gap-4 max-w-6xl mx-auto">
                            {photosData.map((photo, index) => (
                                <div
                                    key={index}
                                    onClick={() => handlePhotoView(index)}
                                    className={`relative group overflow-hidden rounded-2xl transition-all duration-500 hover:scale-105 hover:rotate-1 cursor-pointer ${index === currentPhotoIndex
                                            ? 'ring-3 ring-pink-400 scale-105 shadow-2xl shadow-pink-500/50'
                                            : 'hover:ring-2 hover:ring-purple-300/50 hover:shadow-xl'
                                        }`}
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <div className="relative">
                                        <img
                                            src={photo.url}
                                            alt={`Thumbnail ${index + 1}`}
                                            className="w-full aspect-square object-cover transition-all duration-500 group-hover:brightness-110 group-hover:scale-110"
                                        />

                                        {/* Overlay Effects */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

                                        {/* Current Photo Indicator */}
                                        {index === currentPhotoIndex && (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm">
                                                    <Heart className="text-white animate-pulse drop-shadow-lg" fill="currentColor" size={20} />
                                                </div>
                                            </div>
                                        )}

                                        {/* Like Indicator */}
                                        {likedPhotos.has(index) && (
                                            <div className="absolute top-2 right-2">
                                                <Heart className="text-red-400 drop-shadow-lg animate-pulse" fill="currentColor" size={16} />
                                            </div>
                                        )}

                                        {/* Hover Info */}
                                        <div className="absolute bottom-0 left-0 right-0 p-2 translate-y-full group-hover:translate-y-0 transition-all duration-300">
                                            <p className="text-white text-xs font-semibold truncate drop-shadow-lg">
                                                {photo.caption}
                                            </p>
                                        </div>

                                        {/* Quick Actions on Hover */}
                                        <div className="absolute top-2 left-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                            <div
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    downloadPhoto(photo.url, `${photo.caption?.replace(/\s+/g, '-').toLowerCase()}.jpg`);
                                                }}
                                                className="p-1 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm cursor-pointer"
                                            >
                                                <Download className="w-3 h-3 text-white" />
                                            </div>
                                            <div
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setCurrentPhotoIndex(index);
                                                    setShowShareModal(true);
                                                }}
                                                className="p-1 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm cursor-pointer"
                                            >
                                                <Share2 className="w-3 h-3 text-white" />
                                            </div>
                                        </div>

                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Gallery Stats */}
                        <div className="text-center mt-12 space-y-4">
                            <div className="flex justify-center items-center gap-8 flex-wrap">
                                <div className={`flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10`}>
                                    <Camera className="w-5 h-5 text-pink-400" />
                                    <span className={`${textClass} font-semibold`}>{photosData.length} memories captured</span>
                                </div>
                                <div className={`flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/20 to-indigo-500/20 backdrop-blur-sm border border-white/10`}>
                                    <Heart className="w-5 h-5 text-red-400" />
                                    <span className={`${textClass} font-semibold`}>{likedPhotos.size + 127} total likes</span>
                                </div>
                            </div>
                            <p className={`${textClass} opacity-60 text-lg`}>
                                swipe through our journey • each pic tells our story 📖✨
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Share Modal */}
            {showShareModal && (
                <div className="fixed inset-0 z-50 flex items-end justify-center modal-backdrop bg-black/50 backdrop-blur-sm">
                    <div className="bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl rounded-t-3xl border border-white/20 shadow-2xl w-full max-w-md animate-modal-slide">
                        {/* Modal Header */}
                        <div className="p-6 border-b border-gray-200/50">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold text-gray-800">Share Photo</h3>
                                <button
                                    onClick={() => setShowShareModal(false)}
                                    className="p-2 rounded-full hover:bg-gray-200/50 transition-all"
                                >
                                    <ArrowRight className="w-5 h-5 text-gray-600 rotate-45" />
                                </button>
                            </div>
                            <p className="text-gray-600 mt-1 text-sm">
                                {photosData[currentPhotoIndex]?.caption}
                            </p>
                        </div>

                        {/* Share Options */}
                        <div className="p-6">
                            <div className="grid grid-cols-2 gap-3 mb-6">
                                {shareOptions.map((option, index) => {
                                    const IconComponent = option.icon;
                                    return (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                option.action();
                                                setShowShareModal(false);
                                            }}
                                            className={`flex items-center gap-3 p-4 rounded-2xl text-white transition-all duration-300 hover:scale-105 shadow-lg ${option.color}`}
                                        >
                                            <IconComponent className="w-5 h-5" />
                                            <span className="font-semibold">{option.name}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Copy Link */}
                            <div className="border-t border-gray-200/50 pt-4">
                                <button
                                    onClick={copyLink}
                                    className="flex items-center gap-3 w-full p-4 rounded-2xl border-2 border-dashed border-gray-300 hover:border-gray-400 hover:bg-gray-50/50 transition-all duration-300"
                                >
                                    {copyStatus ? (
                                        <>
                                            <Check className="w-5 h-5 text-green-600" />
                                            <span className="font-semibold text-green-600">Link Copied!</span>
                                        </>
                                    ) : (
                                        <>
                                            <Link2 className="w-5 h-5 text-gray-600" />
                                            <span className="font-semibold text-gray-700">Copy Link</span>
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Quick Actions */}
                            <div className="mt-4 flex gap-3">
                                <button
                                    onClick={() => {
                                        downloadPhoto(photosData[currentPhotoIndex]?.url, `${photosData[currentPhotoIndex]?.caption?.replace(/\s+/g, '-').toLowerCase()}.jpg`);
                                        setShowShareModal(false);
                                    }}
                                    className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
                                    disabled={downloadStatus[currentPhotoIndex] === 'downloading'}
                                >
                                    {downloadStatus[currentPhotoIndex] === 'downloading' ? (
                                        <>
                                            <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                                            <span>Downloading...</span>
                                        </>
                                    ) : downloadStatus[currentPhotoIndex] === 'completed' ? (
                                        <>
                                            <Check className="w-4 h-4" />
                                            <span>Downloaded</span>
                                        </>
                                    ) : (
                                        <>
                                            <Download className="w-4 h-4" />
                                            <span>Download</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Bottom Handle */}
                        <div className="flex justify-center pb-4">
                            <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
                        </div>
                    </div>
                </div>
            )}

            {/* Custom Alert Toast */}
            {customAlert.show && (
                <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-60 max-w-sm">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-sm border border-white/20 animate-modal-slide">
                        <div className="flex items-start gap-3">
                            <Instagram className="w-5 h-5 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="font-semibold text-sm leading-relaxed whitespace-pre-line">
                                    {customAlert.message}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default GallerySection;