import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import VideoCard from '../components/VideoCard';
import { searchVideos } from '../services/youtubeApi';
import '../styles/Home.css';

const SearchResults = () => {
  const location = useLocation();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('q') || '';
    
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const results = await searchVideos(query);
        setVideos(results);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSearchResults();
  }, [location.search]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Searching videos...</p>
      </div>
    );
  }

  return (
    <div className="home-container">
      <div className="search-results-header">
        <h1>Search Results</h1>
        <p>{videos.length} videos found</p>
      </div>
      
      <div className="videos-grid">
        {videos.map((video, index) => (
          <VideoCard key={`${video.id}-${index}`} video={video} />
        ))}
      </div>
      
      {videos.length === 0 && (
        <div className="no-videos">
          <i className="fas fa-search"></i>
          <h3>No videos found</h3>
          <p>Try different keywords or browse categories</p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;