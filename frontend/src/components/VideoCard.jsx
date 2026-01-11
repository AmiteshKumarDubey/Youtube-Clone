import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const VideoCard = ({ video }) => {
  const { id, snippet, statistics, contentDetails } = video;
  const videoId = id || snippet?.videoId || Math.random().toString(36).substring(2);
  
  const formatViews = (views) => {
    const num = parseInt(views || '0');
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M views`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K views`;
    return `${num} views`;
  };

  const formatTime = (publishedAt) => {
    const date = new Date(publishedAt);
    const now = new Date();
    const diffMonths = (now.getFullYear() - date.getFullYear()) * 12 + (now.getMonth() - date.getMonth());
    
    if (diffMonths >= 12) {
      const years = Math.floor(diffMonths / 12);
      return `${years} year${years > 1 ? 's' : ''} ago`;
    }
    if (diffMonths > 0) return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
    
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return 'Today';
  };

  const getDuration = () => {
    if (contentDetails?.duration) {
      const match = contentDetails.duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
      const hours = (match[1] || '').replace('H', '');
      const minutes = (match[2] || '').replace('M', '');
      const seconds = (match[3] || '').replace('S', '');
      
      if (hours) return `${hours}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
      if (minutes) return `${minutes}:${seconds.padStart(2, '0')}`;
      return `0:${seconds.padStart(2, '0')}`;
    }
    return '10:30';
  };

  const getChannelInitial = () => {
    return snippet?.channelTitle?.charAt(0)?.toUpperCase() || 'Y';
  };

  return (
    <Link to={`/video/${videoId}`} className="video-card">
      <div className="thumbnail-container">
        <img 
          src={snippet?.thumbnails?.medium?.url || `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`}
          alt={snippet?.title}
          className="thumbnail"
          onError={(e) => {
            e.target.src = `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`;
          }}
        />
        <div className="video-duration">{getDuration()}</div>
      </div>
      
      <div className="video-info">
        <div className="channel-avatar">
          {getChannelInitial()}
        </div>
        
        <div className="video-details">
          <h3 className="video-title">
            {snippet?.title || 'YouTube Video Title'}
          </h3>
          <p className="channel-name">
            {snippet?.channelTitle || 'YouTube Channel'}
          </p>
          <div className="video-stats">
            <span>{formatViews(statistics?.viewCount)}</span>
            <span className="dot-separator">•</span>
            <span>{formatTime(snippet?.publishedAt)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;