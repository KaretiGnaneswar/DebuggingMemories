import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, Tag, Play } from 'lucide-react';

const MemoryCard = ({ memory }) => {
  return (
    <Link to={`/memory/${memory.id}`} className="block group">
      <div className="memory-card overflow-hidden">
        <div className="relative h-48 overflow-hidden">
          {memory.type === 'video' ? (
            <div className="relative w-full h-full">
              <video 
                className="w-full h-full object-cover"
                muted
                onMouseEnter={(e) => e.target.play()}
                onMouseLeave={(e) => e.target.pause()}
              >
                <source src={memory.media} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 bg-rich-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Play className="w-12 h-12 text-rich-gold" />
              </div>
            </div>
          ) : (
            <img 
              src={memory.media} 
              alt={memory.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          )}
        </div>
        
        <div className="p-4">
          <h3 className="text-xl font-bold text-rich-dark mb-2 group-hover:text-rich-gold transition-colors duration-200">
            {memory.title}
          </h3>
          
          <p className="text-rich-gray text-sm mb-3 line-clamp-2">
            {memory.description}
          </p>
          
          <div className="flex items-center space-x-4 text-sm text-rich-silver">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{new Date(memory.date).toLocaleDateString()}</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{memory.friends.length} friends</span>
            </div>
          </div>
          
          <div className="mt-3 flex flex-wrap gap-1">
            {memory.tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index}
                className="inline-flex items-center space-x-1 px-2 py-1 bg-rich-gold/20 text-rich-gold text-xs rounded-full border border-rich-gold/30"
              >
                <Tag className="w-3 h-3" />
                <span>{tag}</span>
              </span>
            ))}
            {memory.tags.length > 3 && (
              <span className="text-xs text-rich-silver">+{memory.tags.length - 3} more</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MemoryCard;
