import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Camera, Sparkles, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="glass-effect sticky top-0 z-50 px-4 sm:px-6 py-3 sm:py-4 mb-6 sm:mb-8 animate-slide-in">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group" onClick={closeMenu}>
          <div className="relative">
            <div className="absolute inset-0 bg-rich-gold rounded-full blur-xl opacity-50 animate-pulse-slow"></div>
            <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-rich-gold animate-pulse-slow relative z-10" />
            <Camera className="w-3 h-3 sm:w-4 sm:h-4 text-rich-amber absolute -bottom-1 -right-1 animate-bounce-soft" />
            <Sparkles className="w-2 h-2 sm:w-3 sm:h-3 text-rich-platinum absolute -top-1 -right-1 animate-pulse" />
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-rich-gold group-hover:text-rich-amber transition-all duration-300 animate-fade-in-up">
            DebuggingMemories
          </h1>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden sm:flex items-center space-x-6">
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
          <Link 
            to="/team" 
            className="premium-text hover:text-rich-gold transition-all duration-200 font-medium transform hover:scale-110 hover:rotate-1"
          >
            Homies
          </Link>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={toggleMenu}
          className="sm:hidden p-2 rounded-lg text-rich-gold hover:text-rich-amber hover:bg-white/10 transition-all duration-200 transform active:scale-95"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`sm:hidden transition-all duration-300 ease-in-out overflow-hidden ${
        isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <nav className="pt-4 pb-2 border-t border-rich-gold/20 mt-4">
          <Link 
            to="/gallery" 
            className="block py-3 px-4 premium-text hover:text-rich-gold hover:bg-white/10 transition-all duration-200 font-medium rounded-lg transform active:scale-95"
            onClick={closeMenu}
          >
            Search
          </Link>
          <Link 
            to="/photo-video-gallery" 
            className="block py-3 px-4 premium-text hover:text-rich-gold hover:bg-white/10 transition-all duration-200 font-medium rounded-lg transform active:scale-95 mt-2"
            onClick={closeMenu}
          >
            Gallery
          </Link>
          <Link 
            to="/team" 
            className="block py-3 px-4 premium-text hover:text-rich-gold hover:bg-white/10 transition-all duration-200 font-medium rounded-lg transform active:scale-95 mt-2"
            onClick={closeMenu}
          >
            Homies
          </Link>
          <Link 
            to="/" 
            className="block py-3 px-4 premium-text hover:text-rich-gold hover:bg-white/10 transition-all duration-200 font-medium rounded-lg transform active:scale-95 mt-2"
            onClick={closeMenu}
          >
            Home
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
