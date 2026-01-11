// src/components/VideoPlayer.jsx
import React, { useState } from 'react';
import '../styles/VideoPlayer.css';

const VideoPlayer = ({ videoId, title }) => {
  const [showFallback, setShowFallback] = useState(false);

  // For our mock videos, use placeholder
  if (videoId.includes('video_') || videoId.length < 11) {
    return (
      <div className="video-player-container">
        <div className="video-wrapper">
          <div className="mock-player">
            <div className="mock-player-content">
              <i className="fab fa-youtube"></i>
              <h3>{title}</h3>
              <p>This is a mock video player for demonstration</p>
              <button className="play-mock-btn">
                <i className="fas fa-play"></i> Play Video
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // For real YouTube videos
  return (
    <div className="video-player-container">
      <div className="video-wrapper">
        {!showFallback ? (
          <iframe
            className="video-iframe"
            src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`}
            title={title || 'YouTube video player'}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            onError={() => setShowFallback(true)}
          ></iframe>
        ) : (
          <div className="video-fallback">
            <div className="fallback-content">
              <i className="fab fa-youtube"></i>
              <p>Video unavailable</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;