import { useState, useEffect } from "react";
import VideoCard from "../components/VideoCard";
import { videoAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { FiHistory, FiTrash2 } from "react-icons/fi";

export default function History() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      // In real app: Fetch from user's history in database
      const response = await videoAPI.getAll();
      setVideos(response.data.slice(0, 12)); // Show first 12 as history
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = () => {
    if (window.confirm("Clear all watch history?")) {
      setVideos([]);
      alert("History cleared!");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <FiHistory className="text-3xl text-red-600 mr-4" />
          <h1 className="text-3xl font-bold">Watch History</h1>
        </div>
        {videos.length > 0 && (
          <button
            onClick={clearHistory}
            className="flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg"
          >
            <FiTrash2 className="mr-2" />
            Clear all history
          </button>
        )}
      </div>

      {!user ? (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold mb-2">Sign in to view history</h2>
          <p className="text-gray-400 mb-6">Your watch history is private</p>
        </div>
      ) : loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1,2,3,4,5,6,7,8].map((i) => (
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
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">📺</div>
          <h2 className="text-2xl font-bold mb-2">No watch history</h2>
          <p className="text-gray-400">Videos you watch will appear here</p>
        </div>
      )}
    </div>
  );
}