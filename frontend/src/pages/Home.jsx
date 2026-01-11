import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import VideoCard from '../components/VideoCard';
import { fetchPopularVideos } from '../services/youtubeApi';
import '../styles/Home.css';

const Home = () => {
  const { category } = useParams();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [activeCategory, setActiveCategory] = useState(category || 'all');
  const observer = useRef();

  // Load initial videos
  useEffect(() => {
    setLoading(true);
    setVideos([]);
    setPage(1);
    setHasMore(true);
    setActiveCategory(category || 'all');
    
    loadVideos(category || 'all', 1);
  }, [category]);

  const loadVideos = async (category, pageNum) => {
    try {
      console.log(`📥 Loading ${category} videos, page ${pageNum}...`);
      const data = await fetchPopularVideos(pageNum, category);
      
      if (pageNum === 1) {
        setVideos(data);
      } else {
        // Filter duplicates
        const existingIds = new Set(videos.map(v => v.id));
        const newVideos = data.filter(v => !existingIds.has(v.id));
        setVideos(prev => [...prev, ...newVideos]);
      }
      
      // Always show more for "All" category
      if (category === 'all') {
        setHasMore(true);
      } else {
        setHasMore(data.length > 0);
      }
      
      console.log(`✅ Loaded ${data.length} videos, total: ${videos.length + data.length}`);
    } catch (error) {
      console.error('Error loading videos:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMoreVideos = useCallback(() => {
    if (loadingMore || !hasMore) return;
    
    console.log('🔄 Loading more videos...');
    setLoadingMore(true);
    const nextPage = page + 1;
    setPage(nextPage);
    
    loadVideos(activeCategory, nextPage);
  }, [loadingMore, hasMore, page, activeCategory]);

  // Infinite scroll observer - FIXED
  const lastVideoRef = useCallback(node => {
    if (loadingMore) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        console.log('🎯 Last video visible, loading more...');
        loadMoreVideos();
      }
    }, {
      rootMargin: '100px', // Load before reaching bottom
    });
    
    if (node) observer.current.observe(node);
  }, [loadingMore, hasMore, loadMoreVideos]);

  // Categories
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'music', name: 'Music' },
    { id: 'gaming', name: 'Gaming' },
    { id: 'live', name: 'Live' },
    { id: 'news', name: 'News' },
    { id: 'comedy', name: 'Comedy' },
    { id: 'recent', name: 'Recently uploaded' },
    { id: 'watched', name: 'Watched' },
    { id: 'new', name: 'New to you' },
    { id: 'trending', name: 'Trending' },
    { id: 'sports', name: 'Sports' },
    { id: 'learning', name: 'Learning' },
  ];

  if (loading && videos.length === 0) {
    return (
      <div className="loading-container">
        <div className="youtube-spinner">
          <i className="fab fa-youtube"></i>
        </div>
        <p>Loading YouTube videos...</p>
      </div>
    );
  }

  return (
    <div className="home-container">
      {/* Category Filter Bar */}
      <div className="category-bar">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id);
              setVideos([]);
              setPage(1);
              setHasMore(true);
              setLoading(true);
              loadVideos(cat.id, 1);
            }}
            className={`category-btn ${activeCategory === cat.id ? 'active' : ''}`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Videos Grid */}
      <div className="videos-grid">
        {videos.map((video, index) => {
          // Last video pe observer lagao
          if (videos.length === index + 1) {
            return (
              <div ref={lastVideoRef} key={`${video.id}-${index}`}>
                <VideoCard video={video} />
              </div>
            );
          }
          return <VideoCard key={`${video.id}-${index}`} video={video} />;
        })}
      </div>

      {/* Loading More Indicator */}
      {loadingMore && (
        <div className="loading-more">
          <div className="small-spinner"></div>
          <p>Loading more videos...</p>
        </div>
      )}

      {/* Manual Load More Button - Agar infinite scroll kaam nahi kare */}
      {!loadingMore && videos.length > 0 && (
        <div className="manual-load-more">
          <button 
            onClick={loadMoreVideos}
            className="load-more-manual-btn"
          >
            <i className="fas fa-sync-alt"></i> Load More Videos
          </button>
        </div>
      )}

      {/* No Videos Message */}
      {!loading && videos.length === 0 && (
        <div className="no-videos">
          <i className="fas fa-video-slash"></i>
          <h3>No videos found</h3>
          <p>Try selecting a different category or search for something else.</p>
        </div>
      )}
    </div>
  );
};

export default Home;