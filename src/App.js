import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import MemoryGallery from './pages/MemoryGallery';
import PhotoVideoGallery from './pages/PhotoVideoGallery';
import MemoryDetail from './pages/MemoryDetail';
import { getImages, getStaticImages } from './data/imageLinks';
import './index.css';

function App() {
  const [memories, setMemories] = useState([]);
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    // Create floating hearts
    const createHeart = () => {
      const newHeart = {
        id: Date.now(),
        left: Math.random() * 100,
        animationDuration: 8 + Math.random() * 4,
        size: 20 + Math.random() * 20,
      };
      setHearts(prev => [...prev, newHeart]);
      
      // Remove heart after animation
      setTimeout(() => {
        setHearts(prev => prev.filter(heart => heart.id !== newHeart.id));
      }, 12000);
    };

    // Create hearts periodically
    const heartInterval = setInterval(createHeart, 3000);
    createHeart(); // Create first heart immediately

    // Load memories using async images
    const loadMemories = async () => {
      try {
        const imageList = await getImages();
        console.log('App.js - Images from API:', imageList);
        
        // Ensure we have an array
        const imagesArray = Array.isArray(imageList) ? imageList : [];
        
        const sampleMemories = imagesArray.map((image, index) => ({
          id: index + 1,
          title: `Memory ${index + 1}`,
          date: `2023-${String(index + 1).padStart(2, '0')}-15`,
          friends: ["Alex", "Sarah", "Mike", "John", "Emma", "Lisa", "David", "Anna", "Tom", "Chris", "Sophie", "Rachel", "Mark"].slice(0, Math.floor(Math.random() * 4) + 2),
          description: `Amazing memory captured on this special day! Memory ${index + 1} was unforgettable.`,
          media: image,
          type: "image",
          tags: ["memories", "special", "friends", "fun", "adventure", "celebration"].slice(0, Math.floor(Math.random() * 3) + 2)
        }));
        
        setMemories(sampleMemories);
      } catch (error) {
        console.error('App.js - Error loading memories:', error);
        // Fallback to static images
        const staticImages = getStaticImages();
        console.log('App.js - Using static images:', staticImages);
        
        const sampleMemories = staticImages.map((image, index) => ({
          id: index + 1,
          title: `Memory ${index + 1}`,
          date: `2023-${String(index + 1).padStart(2, '0')}-15`,
          friends: ["Alex", "Sarah", "Mike", "John", "Emma", "Lisa", "David", "Anna", "Tom", "Chris", "Sophie", "Rachel", "Mark"].slice(0, Math.floor(Math.random() * 4) + 2),
          description: `Amazing memory captured on this special day! Memory ${index + 1} was unforgettable.`,
          media: image,
          type: "image",
          tags: ["memories", "special", "friends", "fun", "adventure", "celebration"].slice(0, Math.floor(Math.random() * 3) + 2)
        }));
        
        setMemories(sampleMemories);
      }
    };

    loadMemories();

    return () => clearInterval(heartInterval);
  }, []);

  return (
    <Router>
      <div className="min-h-screen relative">
        {/* Floating Hearts Background */}
        <div className="floating-hearts">
          {hearts.map(heart => (
            <div
              key={heart.id}
              className="heart-particle"
              style={{
                left: `${heart.left}%`,
                fontSize: `${heart.size}px`,
                animationDuration: `${heart.animationDuration}s`,
              }}
            >
              ❤️
            </div>
          ))}
        </div>

        <Routes>
          <Route 
            path="/" 
            element={<HomePage />} 
          />
          <Route 
            path="/gallery" 
            element={
              <>
                <Header />
                <main className="container mx-auto px-4 py-8 relative z-10">
                  <MemoryGallery />
                </main>
              </>
            } 
          />
          <Route 
            path="/photo-video-gallery" 
            element={
              <>
                <Header />
                <main className="relative z-10">
                  <PhotoVideoGallery />
                </main>
              </>
            } 
          />
          <Route 
            path="/memory/:id" 
            element={
              <>
                <Header />
                <main className="container mx-auto px-4 py-8 relative z-10">
                  <MemoryDetail memories={memories} />
                </main>
              </>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
