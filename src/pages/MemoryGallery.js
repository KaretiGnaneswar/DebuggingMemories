import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Camera, Sparkles, Star } from 'lucide-react';
import { getImages, getStaticImages } from '../data/imageLinks';

const MemoryGallery = () => {
  const scrollContainerRef = useRef(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Get images from Cloudinary
    const fetchImages = async () => {
      try {
        const imageList = await getImages();
        console.log('MemoryGallery - Images from API:', imageList);
        
        // Ensure we have an array
        const imagesArray = Array.isArray(imageList) ? imageList : [];
        setImages(imagesArray);
      } catch (error) {
        console.error('MemoryGallery - Error fetching images:', error);
        // Fallback to static links
        const staticImages = getStaticImages();
        console.log('MemoryGallery - Using static images:', staticImages);
        setImages(staticImages);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    // Auto-scroll functionality
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      const scrollAmount = 1;
      const scrollInterval = setInterval(() => {
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
          scrollContainer.scrollLeft = 0;
        } else {
          scrollContainer.scrollLeft += scrollAmount;
        }
      }, 30);
      
      return () => clearInterval(scrollInterval);
    }
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Same Background Colors */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-100"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/30 via-transparent to-white/30"></div>
        <div className="absolute top-0 left-0 w-32 sm:w-48 md:w-96 h-32 sm:h-48 md:h-96 bg-blue-200/20 rounded-full blur-2xl sm:blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-32 sm:w-48 md:w-96 h-32 sm:h-48 md:h-96 bg-blue-300/20 rounded-full blur-2xl sm:blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 sm:w-72 md:w-[600px] h-48 sm:h-72 md:h-[600px] bg-blue-100/30 rounded-full blur-2xl sm:blur-3xl"></div>
      </div>

      {/* Enhanced Animated Floating Elements */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 animate-float">
          <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400/60 animate-pulse" />
        </div>
        <div className="absolute top-20 sm:top-40 right-10 sm:right-20 animate-float" style={{animationDelay: '1s'}}>
          <Camera className="w-4 h-4 sm:w-6 sm:h-6 text-blue-500/60 animate-pulse" />
        </div>
        <div className="absolute bottom-20 sm:bottom-40 left-10 sm:left-20 animate-float" style={{animationDelay: '2s'}}>
          <Sparkles className="w-6 h-6 sm:w-10 sm:h-10 text-blue-300/60 animate-pulse" />
        </div>
        <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 animate-float" style={{animationDelay: '3s'}}>
          <Star className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600/60 animate-pulse" />
        </div>
        
        {/* Additional animated decorative elements */}
        <div className="absolute top-1/3 left-1/4 w-4 h-4 bg-blue-300/40 rounded-full animate-bounce-soft"></div>
        <div className="absolute top-2/3 right-1/4 w-3 h-3 bg-blue-400/40 rounded-full animate-bounce-soft" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute bottom-1/3 left-1/3 w-5 h-5 bg-blue-200/40 rounded-full animate-bounce-soft" style={{animationDelay: '3s'}}></div>
        
        {/* Mobile responsive floating elements */}
        <div className="md:hidden absolute top-1/4 left-1/4 w-3 h-3 bg-blue-300/30 rounded-full animate-pulse"></div>
        <div className="md:hidden absolute top-3/4 right-1/4 w-4 h-4 bg-blue-400/30 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex items-center justify-center min-h-screen px-4 sm:px-6 py-6 sm:py-8">
        <div className="w-full max-w-7xl">
          {/* Enhanced Title without Animation */}
          <div className="text-center mb-6 sm:mb-8 md:mb-12">
            <div className="inline-flex items-center space-x-2 sm:space-x-4 mb-3 sm:mb-4">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-blue-500 animate-pulse-slow" />
              <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-blue-900">
                Memory Collection
              </h1>
              <Camera className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-blue-500 animate-pulse-slow" />
            </div>
            <p className="text-base sm:text-lg md:text-xl text-blue-700 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              Browse through your precious memories
            </p>
            <div className="flex items-center justify-center space-x-2 mt-3 sm:mt-4">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 md:w-4 md:h-4 text-blue-400 animate-pulse" />
              <div className="w-10 sm:w-12 md:w-16 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 animate-pulse"></div>
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 md:w-4 md:h-4 text-blue-400 animate-pulse" />
            </div>
          </div>

          {/* Responsive Auto-scrolling Image Cards */}
          <div className="mb-6 sm:mb-8 md:mb-12">
            <div className="text-center mb-4 sm:mb-6 md:mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-900 mb-2">
                Recent Memories
              </h2>
              <p className="text-blue-700 text-xs sm:text-sm md:text-base">
                Click on any image to view the full gallery
              </p>
            </div>

            {/* Responsive Auto-scroll container */}
            <div 
              ref={scrollContainerRef}
              className="overflow-x-auto whitespace-nowrap pb-3 sm:pb-4 md:pb-6"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <div className="inline-flex space-x-2 sm:space-x-3 md:space-x-6">
                {images.map((image, index) => (
                  <Link 
                    key={index}
                    to={`/memory/${index + 1}`}
                    className="block transform hover:scale-105 active:scale-95 transition-all duration-300 animate-fade-in-up cursor-pointer"
                    style={{animationDelay: `${index * 0.2}s`}}
                  >
                    <div className="relative w-40 h-32 sm:w-48 sm:h-36 md:w-64 md:h-48 lg:w-72 lg:h-52 xl:w-80 xl:h-60 rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-lg sm:shadow-xl md:shadow-2xl group">
                      {/* Background Image */}
                      <img 
                        src={image} 
                        alt={`Memory ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-active:scale-105"
                      />
                      
                      {/* Enhanced Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/40 to-transparent transition-opacity duration-300 group-hover:from-blue-900/90 group-active:from-blue-900/95"></div>
                      
                      {/* Decorative Border */}
                      <div className="absolute inset-0 border border-blue-400/30 rounded-xl sm:rounded-2xl md:rounded-3xl transition-all duration-300 group-hover:border-blue-400/60 group-active:border-blue-400/80"></div>
                      
                      {/* Responsive Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4 lg:p-6 transform transition-transform duration-300 group-hover:translate-y-1 group-active:translate-y-0.5">
                        <h3 className="text-white font-bold text-xs sm:text-sm md:text-base lg:text-xl mb-1 sm:mb-2 animate-fade-in-up">
                          Memory {index + 1}
                        </h3>
                        <div className="flex items-center text-white/80 text-xs md:text-sm">
                          <span className="mr-1 md:mr-2">Click to view details</span>
                          <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-blue-300 animate-bounce-soft" />
                        </div>
                      </div>
                      
                      {/* Sparkle Effects */}
                      <div className="absolute top-2 md:top-4 right-2 md:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Sparkles className="w-4 h-4 md:w-6 md:h-6 text-blue-300 animate-pulse" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Footer with Animation */}
          <div className="text-center animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <div className="inline-flex items-center space-x-2 md:space-x-3">
              <Heart className="w-4 h-4 md:w-5 md:h-5 text-blue-500 animate-pulse" />
              <p className="text-blue-900 text-base md:text-lg font-medium">
                Find your memories, relive the moments
              </p>
              <Heart className="w-4 h-4 md:w-5 md:h-5 text-blue-500 animate-pulse" />
            </div>
            <div className="flex items-center justify-center space-x-2 mt-3 md:mt-4">
              <Star className="w-3 h-3 md:w-4 md:h-4 text-blue-400 animate-pulse" />
              <div className="w-16 md:w-24 h-0.5 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400 animate-pulse"></div>
              <Star className="w-3 h-3 md:w-4 md:h-4 text-blue-400 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoryGallery;
