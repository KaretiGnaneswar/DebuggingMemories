import React from 'react';
import { useMusic } from '../contexts/MusicContext';

const MusicPlayer = () => {
  const {
    songs,
    currentSong,
    isPlaying,
    volume,
    isVisible,
    audioRef,
    togglePlayPause,
    nextSong,
    prevSong,
    handleSongEnd,
    toggleVisibility,
    setVolume
  } = useMusic();

  if (!songs || songs.length === 0) {
    return null;
  }

  return (
    <>
      {/* Hidden audio element for auto-play */}
      <audio
        ref={audioRef}
        src={currentSong.url}
        onEnded={handleSongEnd}
        loop={false}
        style={{ display: 'none' }}
      />
      
      {/* Toggle button (always visible when player is hidden) */}
      {!isVisible && (
        <button
          onClick={toggleVisibility}
          className="fixed bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white p-3 sm:p-4 rounded-full shadow-lg z-50 transition-all duration-200"
          title="Show Music Player"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.983 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd"/>
          </svg>
        </button>
      )}

      {/* Full music player (when visible) */}
      {isVisible && (
        <div className="fixed bottom-4 right-4 left-4 sm:left-auto sm:w-80 max-w-sm bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-4 shadow-xl border border-blue-200/50 z-50">
          
          {/* Hide button */}
          <button
            onClick={toggleVisibility}
            className="absolute top-2 right-2 text-blue-600 hover:text-blue-800 transition-colors p-1"
            title="Hide Music Player"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
            </svg>
          </button>
      
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-3 sm:space-y-0">
            {/* Song Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm sm:text-base font-medium text-blue-900 truncate">
                {currentSong.title}
              </p>
              <p className="text-xs sm:text-sm text-blue-600 truncate">
                {currentSong.artist}
              </p>
            </div>
            
            {/* Controls */}
            <div className="flex items-center justify-center space-x-2 sm:space-x-3">
              <button
                onClick={prevSong}
                className="p-1.5 sm:p-2 rounded-full hover:bg-blue-100 transition-colors"
                title="Previous song"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-700" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.445 14.832A1 1 0 0010 14v-8a1 1 0 00-1.555-.832L3 9.168V6a1 1 0 00-2 0v8a1 1 0 002 0v-3.168l5.445 4z"/>
                </svg>
              </button>
              
              <button
                onClick={togglePlayPause}
                className="p-2 sm:p-3 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors shadow-md"
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/>
                  </svg>
                ) : (
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"/>
                  </svg>
                )}
              </button>
              
              <button
                onClick={nextSong}
                className="p-1.5 sm:p-2 rounded-full hover:bg-blue-100 transition-colors"
                title="Next song"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-700" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 10.832V14a1 1 0 002 0V6a1 1 0 00-2 0v3.168L4.555 5.168z"/>
                </svg>
              </button>
            </div>
          </div>
          
          {/* Volume Control */}
          <div className="mt-3 flex items-center space-x-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd"/>
            </svg>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="flex-1 h-1.5 sm:h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default MusicPlayer;
