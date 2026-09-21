import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const WatchContext = createContext();
const API_BASE_URL = 'http://localhost:5002/api/users';

export function useWatch() {
  return useContext(WatchContext);
}

export function WatchProvider({ children }) {
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('yt_watch_history');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [watchLater, setWatchLater] = useState(() => {
    try {
      const saved = localStorage.getItem('yt_watch_later');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [likedVideos, setLikedVideos] = useState(() => {
    try {
      const saved = localStorage.getItem('yt_liked_videos');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [isHistoryPaused, setIsHistoryPaused] = useState(() => {
    return localStorage.getItem('yt_history_paused') === 'true';
  });

  // Save to LocalStorage on change
  useEffect(() => {
    localStorage.setItem('yt_watch_history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('yt_watch_later', JSON.stringify(watchLater));
  }, [watchLater]);

  useEffect(() => {
    localStorage.setItem('yt_liked_videos', JSON.stringify(likedVideos));
  }, [likedVideos]);

  useEffect(() => {
    localStorage.setItem('yt_history_paused', isHistoryPaused ? 'true' : 'false');
  }, [isHistoryPaused]);

  // --- WATCH HISTORY FUNCTIONS ---
  const addToHistory = (video) => {
    if (isHistoryPaused || !video) return;

    const videoId = video.id || video._id;
    const historyItem = {
      ...video,
      _id: videoId,
      id: videoId,
      watchedAt: new Date().toISOString()
    };

    setHistory(prev => {
      const filtered = prev.filter(item => (item.id || item._id) !== videoId);
      return [historyItem, ...filtered];
    });

    // Sync with backend asynchronously
    axios.post(`${API_BASE_URL}/history`, { video: historyItem }).catch(() => {});
  };

  const removeFromHistory = (videoId) => {
    setHistory(prev => prev.filter(item => (item.id || item._id) !== videoId));
    axios.delete(`${API_BASE_URL}/history/${videoId}`).catch(() => {});
  };

  const clearHistory = () => {
    setHistory([]);
    axios.delete(`${API_BASE_URL}/history`).catch(() => {});
  };

  const toggleHistoryPause = () => {
    setIsHistoryPaused(prev => !prev);
  };

  // --- WATCH LATER FUNCTIONS ---
  const addToWatchLater = (video) => {
    if (!video) return;
    const videoId = video.id || video._id;
    const watchLaterItem = {
      ...video,
      _id: videoId,
      id: videoId,
      addedAt: new Date().toISOString()
    };

    setWatchLater(prev => {
      const exists = prev.some(item => (item.id || item._id) !== videoId);
      if (exists) return prev;
      return [watchLaterItem, ...prev];
    });

    axios.post(`${API_BASE_URL}/watchlater`, { video: watchLaterItem }).catch(() => {});
  };

  const removeFromWatchLater = (videoId) => {
    setWatchLater(prev => prev.filter(item => (item.id || item._id) !== videoId));
    axios.delete(`${API_BASE_URL}/watchlater/${videoId}`).catch(() => {});
  };

  const toggleWatchLater = (video) => {
    if (!video) return;
    const videoId = video.id || video._id;
    if (isInWatchLater(videoId)) {
      removeFromWatchLater(videoId);
      return false;
    } else {
      addToWatchLater(video);
      return true;
    }
  };

  const isInWatchLater = (videoId) => {
    return watchLater.some(item => (item.id || item._id) === videoId);
  };

  const clearWatchLater = () => {
    setWatchLater([]);
  };

  // --- LIKED VIDEOS FUNCTIONS ---
  const toggleLikeVideo = (video) => {
    if (!video) return;
    const videoId = video.id || video._id;
    setLikedVideos(prev => {
      const exists = prev.some(item => (item.id || item._id) === videoId);
      if (exists) {
        return prev.filter(item => (item.id || item._id) !== videoId);
      } else {
        return [{ ...video, _id: videoId, id: videoId, likedAt: new Date().toISOString() }, ...prev];
      }
    });
  };

  const isLikedVideo = (videoId) => {
    return likedVideos.some(item => (item.id || item._id) === videoId);
  };

  const [subscriptions, setSubscriptions] = useState(() => {
    try {
      const saved = localStorage.getItem('yt_subscriptions');
      return saved ? JSON.parse(saved) : ['T-Series', 'SET India', 'Technical Guruji', 'CodeWithHarry'];
    } catch (e) {
      return ['T-Series', 'SET India', 'Technical Guruji', 'CodeWithHarry'];
    }
  });

  useEffect(() => {
    localStorage.setItem('yt_subscriptions', JSON.stringify(subscriptions));
  }, [subscriptions]);

  const toggleSubscribe = (channelName) => {
    if (!channelName) return;
    setSubscriptions(prev => {
      if (prev.includes(channelName)) {
        return prev.filter(c => c !== channelName);
      } else {
        return [...prev, channelName];
      }
    });
    axios.post(`${API_BASE_URL}/subscriptions`, { channel: channelName }).catch(() => {});
  };

  const isSubscribed = (channelName) => {
    return subscriptions.includes(channelName);
  };

  // --- PLAYLISTS FUNCTIONS ---
  const [playlists, setPlaylists] = useState(() => {
    try {
      const saved = localStorage.getItem('yt_playlists');
      return saved ? JSON.parse(saved) : [
        {
          id: 'pl_1',
          title: 'Web Dev Mastery 🚀',
          description: 'Best fullstack coding tutorials',
          isPrivate: false,
          videos: []
        }
      ];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('yt_playlists', JSON.stringify(playlists));
  }, [playlists]);

  const createPlaylist = (title, description = '', isPrivate = false) => {
    if (!title.trim()) return null;
    const newPlaylist = {
      id: `pl_${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      isPrivate,
      createdAt: new Date().toISOString(),
      videos: []
    };

    setPlaylists(prev => [newPlaylist, ...prev]);
    axios.post(`${API_BASE_URL}/playlists`, newPlaylist).catch(() => {});
    return newPlaylist;
  };

  const deletePlaylist = (playlistId) => {
    setPlaylists(prev => prev.filter(p => p.id !== playlistId));
    axios.delete(`${API_BASE_URL}/playlists/${playlistId}`).catch(() => {});
  };

  const toggleVideoInPlaylist = (playlistId, video) => {
    if (!video) return;
    const videoId = video.id || video._id;

    setPlaylists(prev => prev.map(pl => {
      if (pl.id === playlistId) {
        const exists = pl.videos.some(v => (v.id || v._id) === videoId);
        const updatedVideos = exists 
          ? pl.videos.filter(v => (v.id || v._id) !== videoId)
          : [{ ...video, id: videoId, _id: videoId }, ...pl.videos];
        return { ...pl, videos: updatedVideos };
      }
      return pl;
    }));

    axios.post(`${API_BASE_URL}/playlists/${playlistId}/video`, { video }).catch(() => {});
  };

  const isVideoInPlaylist = (playlistId, videoId) => {
    const pl = playlists.find(p => p.id === playlistId);
    return pl ? pl.videos.some(v => (v.id || v._id) === videoId) : false;
  };

  const value = {
    history,
    addToHistory,
    removeFromHistory,
    clearHistory,
    isHistoryPaused,
    toggleHistoryPause,
    
    watchLater,
    addToWatchLater,
    removeFromWatchLater,
    toggleWatchLater,
    isInWatchLater,
    clearWatchLater,

    likedVideos,
    toggleLikeVideo,
    isLikedVideo,

    subscriptions,
    toggleSubscribe,
    isSubscribed,

    playlists,
    createPlaylist,
    deletePlaylist,
    toggleVideoInPlaylist,
    isVideoInPlaylist
  };

  return (
    <WatchContext.Provider value={value}>
      {children}
    </WatchContext.Provider>
  );
}


