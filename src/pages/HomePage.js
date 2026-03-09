import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Camera, Sparkles, ImageIcon } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Premium Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://i0.wp.com/officechai.com/wp-content/uploads/2015/08/infosys-mysore-library.jpg?w=1024&ssl=1"
          alt="Memories Background"
          className="w-full h-full object-cover opacity-66"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-rich-black/20 via-rich-dark/10 to-rich-gray/5"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-20 left-10 animate-float">
          <Camera className="w-8 h-8 text-rich-platinum/60" />
        </div>
        <div className="absolute top-40 right-20 animate-float" style={{animationDelay: '1s'}}>
          <Heart className="w-10 h-10 text-rich-gold/40" />
        </div>
        <div className="absolute bottom-40 left-20 animate-float" style={{animationDelay: '2s'}}>
          <ImageIcon className="w-10 h-10 text-rich-silver/50" />
        </div>
        <div className="absolute bottom-20 right-10 animate-float" style={{animationDelay: '3s'}}>
          <Sparkles className="w-7 h-7 text-rich-amber/60" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        <div className="animate-fade-in-up">
          {/* Logo Section */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-rich-gold rounded-full blur-xl opacity-50 animate-pulse-slow"></div>
              <Heart className="w-16 h-16 text-rich-gold animate-pulse-slow relative z-10" />
              <Camera className="w-8 h-8 text-rich-amber absolute -bottom-2 -right-2 animate-bounce-soft" />
              <Sparkles className="w-6 h-6 text-rich-platinum absolute -top-2 -right-2 animate-pulse" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            DebuggingMemories
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-black mb-12 max-w-2xl mx-auto leading-relaxed">
            Cherish your precious moments with friends<br />
            <span className="premium-accent font-semibold">Capture • Share • Relive</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link 
              to="/gallery"
              className="group premium-button text-lg px-8 py-4 flex items-center space-x-3 transform hover:scale-105 transition-all duration-300 shadow-2xl"
            >
              <span>Let's Explore</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              <Sparkles className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            </Link>

            <div className="flex items-center space-x-4 text-rich-silver">
              <div className="flex items-center space-x-2">
                <ImageIcon className="w-5 h-5" />
                <span className="text-sm">Beautiful Memories</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5" />
                <span className="text-sm">Forever Yours</span>
              </div>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <div className="w-16 h-16 bg-rich-gold/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-rich-gold/30">
                <Camera className="w-8 h-8 text-rich-gold" />
              </div>
              <h3 className="premium-text font-semibold mb-2">Capture</h3>
              <p className="text-rich-silver text-sm">Save your special moments</p>
            </div>

            <div className="text-center animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              <div className="w-16 h-16 bg-rich-ruby/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-rich-ruby/30">
                <Heart className="w-8 h-8 text-rich-ruby" />
              </div>
              <h3 className="premium-text font-semibold mb-2">Cherish</h3>
              <p className="text-rich-silver text-sm">Keep memories close to heart</p>
            </div>

            <div className="text-center animate-fade-in-up" style={{animationDelay: '0.6s'}}>
              <div className="w-16 h-16 bg-rich-royal/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-rich-royal/30">
                <Sparkles className="w-8 h-8 text-rich-royal" />
              </div>
              <h3 className="premium-text font-semibold mb-2">Relive</h3>
              <p className="text-rich-silver text-sm">Experience moments again</p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-soft">
          <div className="text-rich-silver text-sm mb-2">Scroll to explore</div>
          <div className="w-6 h-10 border-2 border-rich-gold/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-rich-gold rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;