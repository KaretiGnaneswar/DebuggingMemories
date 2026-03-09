import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Camera, Sparkles } from 'lucide-react';

const Header = () => {
  return (
    <header className="glass-effect sticky top-0 z-50 px-6 py-4 mb-8 animate-slide-in">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-rich-gold rounded-full blur-xl opacity-50 animate-pulse-slow"></div>
            <Heart className="w-8 h-8 text-rich-gold animate-pulse-slow relative z-10" />
            <Camera className="w-4 h-4 text-rich-amber absolute -bottom-1 -right-1 animate-bounce-soft" />
            <Sparkles className="w-3 h-3 text-rich-platinum absolute -top-1 -right-1 animate-pulse" />
          </div>
          <h1 className="text-3xl font-bold text-rich-gold group-hover:text-rich-amber transition-all duration-300 animate-fade-in-up">
            DebuggingMemories
          </h1>
        </Link>
        
        <nav className="flex items-center space-x-6">
          <Link 
            to="/gallery" 
            className="premium-text hover:text-rich-gold transition-all duration-200 font-medium transform hover:scale-110 hover:rotate-1"
          >
            Search
          </Link>
          <Link 
            to="/photo-video-gallery" 
            className="premium-text hover:text-rich-gold transition-all duration-200 font-medium transform hover:scale-110 hover:rotate-1"
          >
            Gallery
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
