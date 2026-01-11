import { useState, useEffect } from "react";
import VideoCard from "../components/VideoCard";
import { videoAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { FiClock, FiPlus } from "react-icons/fi";

export default function WatchLater() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchWatchLater();
  }, []);

  const fetchWatchLater = async () => {
    try {
      const response = await videoAPI.getAll();
      setVideos(response.data.slice(4, 10)); // Sample data
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <FiClock className="text-3xl text-red-600 mr-4" />
          <h1 className="text-3xl font-bold">Watch Later</h1>
        </div>
        <button className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg">
          <FiPlus className="mr-2" />
          Add videos
        </button>
      </div>

      {!user ? (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold mb-2">Sign in to save videos</h2>
          <p className="text-gray-400">Save videos to watch later</p>
        </div>
      ) : loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1,2,3,4].map((i) => (
            <div key={i} className="bg-gray-900 rounded-xl animate-pulse">
              <div className="aspect-video bg-gray-800 rounded-xl"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-800 rounded mb-3"></div>
                <div className="h-3 bg-gray-800 rounded w-3/4 mb-2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : videos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {videos.map((video) => (
            <div key={video._id} className="relative group">
              <VideoCard video={video} />
              <button className="absolute top-2 right-2 bg-black/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <FiClock />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">⏰</div>
          <h2 className="text-2xl font-bold mb-2">No videos saved</h2>
          <p className="text-gray-400 mb-6">Save videos to watch later by clicking "Watch Later"</p>
        </div>
      )}
    </div>
  );
}