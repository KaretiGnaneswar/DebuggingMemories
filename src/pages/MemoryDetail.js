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
    <div className="max-w-4xl mx-auto animate-fade-in">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-white hover:text-vibrant-yellow transition-colors duration-200 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back</span>
      </button>

      <div className="glass-effect rounded-2xl overflow-hidden">
        {/* Media Section */}
        <div className="relative h-96 md:h-[500px] bg-black/20">
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
        <div className="p-8">
          {/* Title and Actions */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {memory.title}
              </h1>
              <div className="flex items-center space-x-4 text-white/80">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-5 h-5" />
                  <span>{new Date(memory.date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={shareMemory}
                className="p-3 bg-vibrant-purple text-white rounded-full hover:bg-vibrant-blue transition-colors duration-200"
                title="Share memory"
              >
                <Share2 className="w-5 h-5" />
              </button>
              <button
                className="p-3 bg-vibrant-pink text-white rounded-full hover:bg-vibrant-red transition-colors duration-200"
                title="Like memory"
              >
                <Heart className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-3">About this memory</h3>
            <p className="text-white/90 leading-relaxed text-lg">
              {memory.description}
            </p>
          </div>

          {/* Friends */}
          {memory.friends && memory.friends.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-3 flex items-center space-x-2">
                <Users className="w-6 h-6" />
                <span>Friends</span>
              </h3>
              <div className="flex flex-wrap gap-3">
                {memory.friends.map((friend, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-vibrant-purple/20 to-vibrant-pink/20 rounded-full"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-vibrant-purple to-vibrant-pink rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {friend.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-white font-medium">{friend}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {memory.tags && memory.tags.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold text-white mb-3 flex items-center space-x-2">
                <Tag className="w-6 h-6" />
                <span>Tags</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {memory.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center space-x-1 px-4 py-2 bg-gradient-to-r from-vibrant-green/20 to-vibrant-blue/20 text-vibrant-green rounded-full font-medium"
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
      <div className="mt-12">
        <h3 className="text-2xl font-bold text-white mb-6">More Memories</h3>
        <div className="text-center py-8">
          <Link to="/" className="vibrant-button inline-block">
            View All Memories
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MemoryDetail;
