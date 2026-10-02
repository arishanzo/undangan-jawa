import React, { useState, useEffect, useRef } from 'react';

export default function AudioPlayer({ musicUrl, autoPlayTrigger }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (musicUrl) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      audioRef.current = new Audio(musicUrl);
      audioRef.current.loop = true;
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [musicUrl]);

  useEffect(() => {
    if (autoPlayTrigger && audioRef.current && !isPlaying) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.log('Autoplay prevented:', err));
    }
  }, [autoPlayTrigger]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.log('Playback error:', err));
    }
  };

  return (
    <button 
      className={`floating-music-btn ${isPlaying ? 'playing' : ''}`}
      onClick={togglePlay}
      title={isPlaying ? 'Jeda Musik' : 'Putar Musik'}
    >
      {isPlaying ? '🎵' : '🔇'}
    </button>
  );
}
