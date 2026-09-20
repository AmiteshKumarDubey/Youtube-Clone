import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getVideoDetails, fetchPopularVideos } from '../services/youtubeApi';
import { useWatch } from '../context/WatchContext';
import VideoCard from '../components/VideoCard';
import '../styles/VideoPage.css';

const VideoPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);

  const [loading, setLoading] = useState(true);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const { addToHistory, toggleWatchLater, isInWatchLater } = useWatch();

  useEffect(() => {
    const fetchVideoData = async () => {
      setLoading(true);
      try {
        const videoData = await getVideoDetails(id);
        setVideo(videoData);
        if (videoData) {
          addToHistory(videoData);
        }
        
        // Generate related videos (different from current video)
        generateRelatedVideos(videoData);
      } catch (error) {
        console.error('Error fetching video:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchVideoData();
  }, [id]);


  const generateRelatedVideos = async (currentVideo) => {
    try {
      // Get videos from same category
      const category = currentVideo.snippet?.tags?.[0] || 'music';
      const related = await fetchPopularVideos(1, category);
      
      // Filter out current video and get first 20
      const filteredRelated = related
        .filter(v => v.id !== currentVideo.id)
        .slice(0, 20);
      
      setRelatedVideos(filteredRelated);
    } catch (error) {
      console.log('Using fallback related videos');
      // Fallback
      const mockRelated = Array.from({ length: 20 }, (_, i) => ({
        id: `related-${Date.now()}-${i}`,
        snippet: {
          title: `Related Video ${i + 1} - Amazing Content`,
          channelTitle: ['T-Series', 'SET India', 'Technical Guruji', 'CarryMinati'][i % 4],
          thumbnails: {
            medium: {
              url: `https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg`,
              width: 320,
              height: 180
            }
          },
          publishedAt: new Date(Date.now() - (i * 86400000)).toISOString()
        },
        statistics: {
          viewCount: `${Math.floor(Math.random() * 10000000)}`,
          likeCount: `${Math.floor(Math.random() * 100000)}`
        }
      }));
      setRelatedVideos(mockRelated);
    }
  };

  const formatViews = (views) => {
    const num = parseInt(views || '0');
    if (num >= 1000000000) return `${(num / 1000000000).toFixed(1)}B`;
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatNumber = (num) => {
    return parseInt(num || '0').toLocaleString();
  };

  if (loading) {
    return (
      <div className="video-loading">
        <div className="youtube-spinner">
          <i className="fab fa-youtube"></i>
        </div>
        <p>Loading video...</p>
      </div>
    );
  }

  if (!video) {
    return <div className="video-not-found">Video not found</div>;
  }

  return (
    <div className="video-page-container">
      <div className="video-main-content">
        {/* Video Player */}
        <div className="video-player-wrapper">
          <div className="video-player">
            <iframe
              src={`https://www.youtube.com/embed/${id}`}
              title={video.snippet?.title || 'YouTube Video'}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Video Title */}
        <h1 className="video-title-main">{video.snippet?.title || 'Video Title'}</h1>

        {/* Video Actions Bar */}
        <div className="video-actions-bar">
          <div className="video-stats">
            <span className="views-count">{formatNumber(video.statistics?.viewCount)} views</span>
            <span className="dot-separator">•</span>
            <span className="upload-date">{formatDate(video.snippet?.publishedAt)}</span>
          </div>

          <div className="action-buttons">
            {/* Like/Dislike */}
            <div className="like-dislike-container">
              <button 
                className={`action-btn ${isLiked ? 'active' : ''}`}
                onClick={() => {
                  setIsLiked(!isLiked);
                  setIsDisliked(false);
                }}
              >
                <i className="fas fa-thumbs-up"></i>
                <span>{formatNumber(video.statistics?.likeCount)}</span>
              </button>
              
              <div className="separator"></div>
              
              <button 
                className={`action-btn ${isDisliked ? 'active' : ''}`}
                onClick={() => {
                  setIsDisliked(!isDisliked);
                  setIsLiked(false);
                }}
              >
                <i className="fas fa-thumbs-down"></i>
              </button>
            </div>

            {/* Share */}
            <button className="action-btn">
              <i className="fas fa-share"></i>
              <span>Share</span>
            </button>

            {/* Download */}
            <button className="action-btn">
              <i className="fas fa-download"></i>
              <span>Download</span>
            </button>

            {/* Save / Watch Later */}
            <button 
              className={`action-btn ${isInWatchLater(video.id) ? 'active' : ''}`}
              onClick={() => toggleWatchLater(video)}
            >
              <i className={`fas ${isInWatchLater(video.id) ? 'fa-check' : 'fa-clock'}`}></i>
              <span>{isInWatchLater(video.id) ? 'Saved' : 'Watch later'}</span>
            </button>


            {/* More */}
            <button className="action-btn">
              <i className="fas fa-ellipsis-h"></i>
            </button>
          </div>
        </div>

        {/* Channel Info */}
        <div className="channel-info-section">
          <div 
            className="channel-avatar-large"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate(`/channel/${encodeURIComponent(video.snippet?.channelTitle || '')}`)}
          >
            {video.snippet?.channelTitle?.charAt(0) || 'C'}
          </div>
          <div className="channel-details">
            <h3 
              className="channel-name"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/channel/${encodeURIComponent(video.snippet?.channelTitle || '')}`)}
            >
              {video.snippet?.channelTitle || 'Channel Name'}
            </h3>
            <p className="subscriber-count">
              {formatNumber(video.statistics?.subscriberCount || '10000000')} subscribers
            </p>
          </div>
          <button 
            className={`subscribe-btn ${isSubscribed(video.snippet?.channelTitle) ? 'subscribed' : ''}`}
            onClick={() => toggleSubscribe(video.snippet?.channelTitle)}
          >
            {isSubscribed(video.snippet?.channelTitle) ? (
              <>
                <i className="fas fa-check"></i>
                <span>Subscribed</span>
              </>
            ) : (
              <>
                <i className="fas fa-bell"></i>
                <span>Subscribe</span>
              </>
            )}
          </button>
        </div>


        {/* Video Description */}
        <div className="video-description-box">
          <div className="description-content">
            <p className="description-text">
              {video.snippet?.description || 'No description available.'}
            </p>
            <button className="show-more-btn">Show more</button>
          </div>
        </div>
      </div>

      {/* Related Videos Sidebar */}
      <div className="related-videos-sidebar">
        <div className="related-videos-header">
          <h3>Related videos</h3>
          <button className="autoplay-toggle">
            <span>Autoplay</span>
            <i className="fas fa-toggle-on"></i>
          </button>
        </div>
        
        <div className="related-videos-list">
          {relatedVideos.map((relatedVideo, index) => (
            <div key={relatedVideo.id} className="related-video-item">
              <VideoCard video={relatedVideo} isRelated={true} />
            </div>
          ))}
        </div>

        {/* Show More Videos Button */}
        <button 
          className="show-more-videos"
          onClick={async () => {
            // Load more related videos
            const currentCategory = video.snippet?.tags?.[0] || 'music';
            const moreVideos = await fetchPopularVideos(2, currentCategory);
            const filteredMore = moreVideos.filter(v => 
              !relatedVideos.some(rv => rv.id === v.id) && v.id !== video.id
            );
            setRelatedVideos(prev => [...prev, ...filteredMore.slice(0, 10)]);
          }}
        >
          <i className="fas fa-sync-alt"></i>
          Show more videos
        </button>
      </div>
    </div>
  );
};

export default VideoPage;