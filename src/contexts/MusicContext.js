import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

// Global music context
const MusicContext = createContext();

export const useMusic = () => useContext(MusicContext);

export const MusicProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const [isVisible, setIsVisible] = useState(true); // Start visible so users can click play
  const audioRef = useRef(null);

  // Your favorite songs
  const songs = [
    {
      title: "O My Friend",
      artist: "SenSongsMp3.co",
      url: "https://res.cloudinary.com/dlrcuejfd/video/upload/v1773061270/05_-_O_My_Friend_-_SenSongsMp3.co_xyztbv.mp3"
    }
  ];

  const currentSong = songs[currentSongIndex];

  // Auto-play functionality (only once when first loading)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (audioRef.current && songs.length > 0 && !isPlaying) {
      // Auto-play after a short delay to ensure page load
      const timer = setTimeout(() => {
        audioRef.current.currentTime = 0; // Start from beginning
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          // Don't hide initially - let user see the player
        }).catch(error => {
          console.log('Auto-play was prevented:', error);
          // If auto-play fails, set up user interaction to start music
          const startMusic = () => {
            audioRef.current.currentTime = 0;
            audioRef.current.play().then(() => {
              setIsPlaying(true);
              setIsVisible(false);
            });
            document.removeEventListener('click', startMusic);
            document.removeEventListener('keydown', startMusic);
          };
          document.addEventListener('click', startMusic, { once: true });
          document.addEventListener('keydown', startMusic, { once: true });
        });
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []); // Empty array to run only once on mount

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextSong = () => {
    setCurrentSongIndex((prev) => (prev + 1) % songs.length);
  };

  const prevSong = () => {
    setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
  };

  const handleSongEnd = () => {
    nextSong();
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <MusicContext.Provider value={{
      songs,
      currentSong,
      isPlaying,
      currentSongIndex,
      volume,
      isVisible,
      audioRef,
      togglePlayPause,
      nextSong,
      prevSong,
      handleSongEnd,
      toggleVisibility,
      setVolume
    }}>
      {children}
    </MusicContext.Provider>
  );
};
