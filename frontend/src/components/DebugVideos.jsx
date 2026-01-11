import { useState, useEffect } from 'react';

const DebugVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVideos = async () => {
      console.log('🔍 DEBUG: Fetching from backend...');
      try {
        const response = await fetch('http://localhost:5002/api/videos');
        const data = await response.json();
        console.log('✅ DEBUG: Backend data:', data);
        setVideos(data.slice(0, 6)); // Show first 6
      } catch (error) {
        console.error('❌ DEBUG: Error:', error);
      } finally {
        setLoading(false);
      }
    };
    loadVideos();
  }, []);

  if (loading) return <div>Loading debug data...</div>;

  return (
    <div className="p-4 bg-gray-900 rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-green-400">🎯 DEBUG MODE - Backend Videos</h2>
      <div className="grid grid-cols-3 gap-4">
        {videos.map(video => (
          <div key={video._id} className="bg-gray-800 p-3 rounded">
            <img 
              src={video.thumbnailUrl} 
              alt={video.title}
              className="w-full h-32 object-cover rounded mb-2"
            />
            <h3 className="font-semibold text-sm line-clamp-2">{video.title}</h3>
            <p className="text-gray-400 text-xs">{video.username}</p>
            <p className="text-gray-500 text-xs">{video.views} views</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DebugVideos;