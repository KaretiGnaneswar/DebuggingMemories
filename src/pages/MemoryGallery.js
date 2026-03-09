import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Camera, Sparkles, Star } from 'lucide-react';
import { getImages, getStaticImages } from '../data/imageLinks';
import MusicPlayer from '../components/MusicPlayer';

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
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-3xl"></div>
      </div>

      {/* Enhanced Animated Floating Elements */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        <div className="absolute top-20 left-10 animate-float">
          <Heart className="w-8 h-8 text-blue-400/60 animate-pulse" />
        </div>
        <div className="absolute top-40 right-20 animate-float" style={{animationDelay: '1s'}}>
          <Camera className="w-6 h-6 text-blue-500/60 animate-pulse" />
        </div>
        <div className="absolute bottom-40 left-20 animate-float" style={{animationDelay: '2s'}}>
          <Sparkles className="w-10 h-10 text-blue-300/60 animate-pulse" />
        </div>
        <div className="absolute bottom-20 right-10 animate-float" style={{animationDelay: '3s'}}>
          <Star className="w-7 h-7 text-blue-400/60 animate-pulse" />
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
      <div className="relative z-20 flex items-center justify-center min-h-screen px-4 py-8">
        <div className="w-full max-w-7xl">
          {/* Enhanced Title without Animation */}
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center space-x-2 md:space-x-4 mb-4">
              <Heart className="w-6 h-6 md:w-8 md:h-8 text-blue-500 animate-pulse-slow" />
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-blue-900">
                Memory Collection
              </h1>
              <Camera className="w-6 h-6 md:w-8 md:h-8 text-blue-500 animate-pulse-slow" />
            </div>
            <p className="text-lg md:text-xl text-blue-700 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              Browse through your precious memories
            </p>
            <div className="flex items-center justify-center space-x-2 mt-4">
              <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-blue-400 animate-pulse" />
              <div className="w-12 md:w-16 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 animate-pulse"></div>
              <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-blue-400 animate-pulse" />
            </div>
          </div>

          {/* Responsive Auto-scrolling Image Cards */}
          <div className="mb-8 md:mb-12">
            <div className="text-center mb-6 md:mb-8 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-2">
                Recent Memories
              </h2>
              <p className="text-blue-700 text-sm md:text-base">
                Click on any image to view the full gallery
              </p>
            </div>

            {/* Responsive Auto-scroll container */}
            <div 
              ref={scrollContainerRef}
              className="overflow-x-auto whitespace-nowrap pb-4 md:pb-6"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <div className="inline-flex space-x-3 md:space-x-6">
                {images.map((image, index) => (
                  <Link 
                    key={index}
                    to={`/memory/${index + 1}`}
                    className="block transform hover:scale-105 transition-all duration-500 animate-fade-in-up"
                    style={{animationDelay: `${index * 0.2}s`}}
                  >
                    <div className="relative w-56 h-40 md:w-72 md:h-52 lg:w-80 lg:h-60 rounded-2xl md:rounded-3xl overflow-hidden shadow-xl md:shadow-2xl group">
                      {/* Background Image */}
                      <img 
                        src={image} 
                        alt={`Memory ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      {/* Enhanced Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/40 to-transparent transition-opacity duration-300 group-hover:from-blue-900/90"></div>
                      
                      {/* Decorative Border */}
                      <div className="absolute inset-0 border border-blue-400/30 rounded-2xl md:rounded-3xl transition-all duration-300 group-hover:border-blue-400/60"></div>
                      
                      {/* Responsive Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-3 md:p-6 transform transition-transform duration-300 group-hover:translate-y-1">
                        <h3 className="text-white font-bold text-sm md:text-xl mb-1 md:mb-2 animate-fade-in-up">
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
      
      {/* Music Player */}
      <MusicPlayer songs={songs} autoPlay={true} initiallyHidden={true} />
    </div>
  );
};

export default MemoryGallery;
