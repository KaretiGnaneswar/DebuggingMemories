import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getImages, getVideos } from '../data/imageLinks';
import MusicPlayer from '../components/MusicPlayer';

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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between h-auto sm:h-16 py-3 sm:py-0">
            <h1 className="text-xl sm:text-2xl font-bold text-blue-900 text-center sm:text-left mb-3 sm:mb-0">
              DebuggingMemories Gallery
            </h1>
            
            {/* Tab Navigation */}
            <div className="flex justify-center sm:justify-start space-x-1 bg-blue-100/50 rounded-full p-1">
              <button
                onClick={() => setActiveTab('photos')}
                className={`px-4 sm:px-6 py-2 rounded-full font-medium transition-all duration-200 text-sm sm:text-base ${
                  activeTab === 'photos'
                    ? 'bg-white text-blue-900 shadow-md'
                    : 'text-blue-700 hover:text-blue-900'
                }`}
              >
                Photos
              </button>
              <button
                onClick={() => setActiveTab('videos')}
                className={`px-4 sm:px-6 py-2 rounded-full font-medium transition-all duration-200 text-sm sm:text-base ${
                  activeTab === 'videos'
                    ? 'bg-white text-blue-900 shadow-md'
                    : 'text-blue-700 hover:text-blue-900'
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
              <Link 
                key={index}
                to={`/memory/${index + 1}`}
                className="transform hover:scale-105 transition-all duration-300"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="relative w-full h-40 sm:h-48 lg:h-52 rounded-2xl overflow-hidden shadow-xl group">
                  {/* Background Image */}
                  <img 
                    src={item} 
                    alt={`${activeTab} ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/40 to-transparent transition-opacity duration-300 group-hover:from-blue-900/90"></div>
                  
                  {/* Decorative Border */}
                  <div className="absolute inset-0 border border-blue-400/30 rounded-2xl transition-all duration-300 group-hover:border-blue-400/60"></div>
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 transform transition-transform duration-300 group-hover:translate-y-1">
                    <h3 className="text-white font-bold text-sm sm:text-lg mb-1">
                      {activeTab === 'photos' ? `Photo ${index + 1}` : `Video ${index + 1}`}
                    </h3>
                    <div className="flex items-center text-white/80 text-xs sm:text-sm">
                      <span>Click to view details</span>
                    </div>
                  </div>
                </div>
              </Link>
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

      {/* Music Player */}
      <MusicPlayer />
    </div>
  );
};

export default PhotoVideoGallery;
