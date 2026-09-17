import React, { useState, useEffect } from 'react';
import { getSubscriptionVideos } from '../services/api';
import VideoCard from '../components/VideoCard';


const Subscriptions = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const subscriptionVideos = getSubscriptionVideos();
    setVideos(subscriptionVideos);
  }, []);

  return (
    <div className="page">
      <h1>Subscriptions</h1>
      <div className="subscriptions-grid">
        {videos.map(video => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default Subscriptions;