import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Users, Tag, Share2, Heart } from 'lucide-react';

const MemoryDetail = ({ memories }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const memory = memories.find(m => m.id === parseInt(id));
  
  if (!memory) {
    return (
      <div className="text-center py-12">
        <div className="glass-effect rounded-2xl p-8 max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4">Memory Not Found</h2>
          <p className="text-white/80 mb-6">This memory doesn't exist or has been deleted.</p>
          <Link to="/" className="vibrant-button inline-block">
            Back to Gallery
          </Link>
        </div>
      </div>
    );
  }

  const shareMemory = () => {
    if (navigator.share) {
      navigator.share({
        title: memory.title,
        text: memory.description,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-6 animate-fade-in">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-white hover:text-vibrant-yellow active:text-vibrant-yellow/80 transition-colors duration-200 mb-4 sm:mb-6 transform active:scale-95"
      >
        <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="text-sm sm:text-base">Back</span>
      </button>

      <div className="glass-effect rounded-xl sm:rounded-2xl overflow-hidden">
        {/* Media Section */}
        <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] bg-black/20">
          {memory.type === 'video' ? (
            <video 
              className="w-full h-full object-contain"
              controls
              autoPlay
              muted
            >
              <source src={memory.media} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img 
              src={memory.media} 
              alt={memory.title}
              className="w-full h-full object-contain"
            />
          )}
        </div>

        {/* Content Section */}
        <div className="p-4 sm:p-6 md:p-8">
          {/* Title and Actions */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 sm:mb-6 gap-4">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
                {memory.title}
              </h1>
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-white/80 text-sm sm:text-base">
                <div className="flex items-center space-x-1 mb-2 sm:mb-0">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-xs sm:text-sm">{new Date(memory.date).toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}</span>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={shareMemory}
                className="p-2 sm:p-3 bg-vibrant-purple text-white rounded-full hover:bg-vibrant-blue active:bg-vibrant-blue/80 transition-colors duration-200 transform hover:scale-105 active:scale-95"
                title="Share memory"
              >
                <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                className="p-2 sm:p-3 bg-vibrant-pink text-white rounded-full hover:bg-vibrant-red active:bg-vibrant-red/80 transition-colors duration-200 transform hover:scale-105 active:scale-95"
                title="Like memory"
              >
                <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6 sm:mb-8">
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">About this memory</h3>
            <p className="text-white/90 leading-relaxed text-sm sm:text-base">
              {memory.description}
            </p>
          </div>

          {/* Friends */}
          {memory.friends && memory.friends.length > 0 && (
            <div className="mb-6 sm:mb-8">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3 flex items-center space-x-2">
                <Users className="w-4 h-4 sm:w-6 sm:h-6" />
                <span className="text-sm sm:text-base">Friends</span>
              </h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {memory.friends.map((friend, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-vibrant-purple/20 to-vibrant-pink/20 rounded-full"
                  >
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-vibrant-purple to-vibrant-pink rounded-full flex items-center justify-center text-white font-semibold text-xs sm:text-sm">
                      {friend.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-white font-medium text-xs sm:text-sm">{friend}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {memory.tags && memory.tags.length > 0 && (
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3 flex items-center space-x-2">
                <Tag className="w-4 h-4 sm:w-6 sm:h-6" />
                <span className="text-sm sm:text-base">Tags</span>
              </h3>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {memory.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center space-x-1 px-2 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-r from-vibrant-green/20 to-vibrant-blue/20 text-vibrant-green rounded-full font-medium text-xs sm:text-sm"
                  >
                    <span>#{tag}</span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Memories */}
      <div className="mt-8 sm:mt-12">
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">More Memories</h3>
        <div className="text-center py-6 sm:py-8">
          <Link to="/" className="vibrant-button inline-block text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 transform hover:scale-105 active:scale-95 transition-all duration-200">
            View All Memories
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MemoryDetail;
