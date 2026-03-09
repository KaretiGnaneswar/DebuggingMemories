import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getImages, getVideos } from '../data/imageLinks';
import DevelopedBy from '../components/DevelopedBy';

// VideoPlayer component for inline video playback
const VideoPlayer = ({ videoUrl, index }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const videoRef = React.useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative w-full h-40 sm:h-48 lg:h-52 rounded-2xl overflow-hidden shadow-xl group">
      <video
        ref={videoRef}
        src={videoUrl}
        className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${!isPlaying ? 'opacity-90' : 'opacity-100'}`}
        muted
        loop
        playsInline
        preload="metadata"
        onClick={togglePlay}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
        style={{ 
          objectFit: 'cover',
          filter: isPlaying ? 'none' : 'brightness(0.9)'
        }}
      />
      
      {/* Play/Pause Overlay - Only show when not playing */}
      {!isPlaying && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer"
          onClick={togglePlay}
        >
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg transform transition-transform duration-200 hover:scale-110">
            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
            </svg>
          </div>
        </div>
      )}
      
      {/* Playing Indicator */}
      {isPlaying && (
        <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
          Playing
        </div>
      )}
      
      {/* Video Controls - Show on hover */}
      {showControls && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center"
          >
            {isPlaying ? (
              <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/>
              </svg>
            ) : (
              <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
              </svg>
            )}
          </button>
        </div>
      )}
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-blue-900/20 to-transparent transition-opacity duration-300 group-hover:from-blue-900/70 group-active:from-blue-900/80 pointer-events-none"></div>
      
      {/* Decorative Border */}
      <div className="absolute inset-0 border border-blue-400/30 rounded-2xl transition-all duration-300 group-hover:border-blue-400/60 group-active:border-blue-400/80 pointer-events-none"></div>
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 transform transition-transform duration-300 group-hover:translate-y-1 group-active:translate-y-0.5 pointer-events-none">
        <h3 className="text-white font-bold text-sm sm:text-lg mb-1">
          Video {index + 1}
        </h3>
        <div className="flex items-center text-white/80 text-xs sm:text-sm">
          <span>Click to {isPlaying ? 'pause' : 'play'}</span>
        </div>
      </div>
    </div>
  );
};

const PhotoVideoGallery = () => {
  // Gallery component for displaying images and videos
  const [activeTab, setActiveTab] = useState('photos');
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMedia = () => {
    // Get images and videos from direct links
    const imageList = getImages();
    const videoList = getVideos();
    
    console.log('Images from links:', imageList);
    console.log('Videos from links:', videoList);
    
    // Ensure we have arrays
    const imagesArray = Array.isArray(imageList) ? imageList : [];
    const videosArray = Array.isArray(videoList) ? videoList : [];
    
    setImages(imagesArray);
    setVideos(videosArray);
    setIsLoading(false);
  };

  useEffect(() => {
    // Get images and videos from Cloudinary
    fetchMedia();
  }, []);

  // Filter based on active tab
  const currentItems = activeTab === 'photos' ? images : videos;
  
  // Debug logging
  console.log('Active tab:', activeTab);
  console.log('Images array:', images);
  console.log('Videos array:', videos);
  console.log('Current items:', currentItems);
  console.log('Current items length:', currentItems.length);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-blue-700 text-lg animate-pulse">Loading your memories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Top Navbar */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-blue-200/50 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-16">
            {/* Tab Navigation - Split into two equal halves */}
            <div className="flex w-full max-w-md justify-center space-x-2">
              <button
                onClick={() => setActiveTab('photos')}
                className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-200 text-base ${
                  activeTab === 'photos'
                    ? 'bg-blue-900 text-white shadow-lg'
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
              >
                Photos
              </button>
              <button
                onClick={() => setActiveTab('videos')}
                className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all duration-200 text-base ${
                  activeTab === 'videos'
                    ? 'bg-blue-900 text-white shadow-lg'
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
              >
                Videos
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Content */}
      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Section Title */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-2">
            {activeTab === 'photos' ? 'Photo Collection' : 'Video Collection'}
          </h2>
          <p className="text-blue-700 text-sm sm:text-base">
            {activeTab === 'photos' 
              ? 'Browse through your beautiful photo memories' 
              : 'Watch your precious video moments'}
          </p>
        </div>

        {/* Memory Count */}
        <div className="text-center mb-4 sm:mb-6">
          <p className="text-blue-600 text-sm sm:text-base">
            Found <span className="font-bold text-blue-900">{currentItems.length}</span> {activeTab}
          </p>
        </div>

        {/* Gallery Grid */}
        {currentItems.length === 0 ? (
          <div className="text-center py-8 sm:py-12">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 max-w-sm mx-auto shadow-xl border border-blue-200/50">
              <h3 className="text-lg sm:text-xl font-bold text-blue-900 mb-4">
                No {activeTab} found
              </h3>
              <p className="text-blue-700 text-sm sm:text-base">
                {activeTab === 'photos' 
                  ? 'No photo memories available yet.' 
                  : 'No video memories available yet.'}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {currentItems.map((item, index) => (
              <div 
                key={index}
                className="transform hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                {activeTab === 'photos' ? (
                  <Link to={`/memory/${index + 1}`}>
                    <div className="relative w-full h-40 sm:h-48 lg:h-52 rounded-2xl overflow-hidden shadow-xl group">
                      {/* Background Image */}
                      <img 
                        src={item} 
                        alt={`${activeTab} ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-active:scale-105"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/40 to-transparent transition-opacity duration-300 group-hover:from-blue-900/90 group-active:from-blue-900/95"></div>
                      
                      {/* Decorative Border */}
                      <div className="absolute inset-0 border border-blue-400/30 rounded-2xl transition-all duration-300 group-hover:border-blue-400/60 group-active:border-blue-400/80"></div>
                      
                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 transform transition-transform duration-300 group-hover:translate-y-1 group-active:translate-y-0.5">
                        <h3 className="text-white font-bold text-sm sm:text-lg mb-1">
                          Photo {index + 1}
                        </h3>
                        <div className="flex items-center text-white/80 text-xs sm:text-sm">
                          <span>Click to view details</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <VideoPlayer videoUrl={item} index={index} />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Background Decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/20 rounded-full blur-2xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-blue-300/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-blue-100/30 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-blue-200/20 rounded-full blur-2xl"></div>
      </div>
      
      <DevelopedBy />
    </div>
  );
};

export default PhotoVideoGallery;
