import { useState, useEffect } from "react";
import VideoCard from "../components/VideoCard";
import { videoAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { FiThumbsUp } from "react-icons/fi";

export default function LikedVideos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchLikedVideos();
  }, []);

  const fetchLikedVideos = async () => {
    try {
      const response = await videoAPI.getAll();
      // Filter videos with high likes (simulating liked videos)
      const liked = response.data.filter(video => video.likes > 10000);
      setVideos(liked);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center mb-8">
        <FiThumbsUp className="text-3xl text-red-600 mr-4" />
        <h1 className="text-3xl font-bold">Liked Videos</h1>
      </div>

      {!user ? (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">❤️</div>
          <h2 className="text-2xl font-bold mb-2">Sign in to see liked videos</h2>
          <p className="text-gray-400">Videos you like will appear here</p>
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
              <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-sm">
                ❤️ {video.likes.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">👍</div>
          <h2 className="text-2xl font-bold mb-2">No liked videos yet</h2>
          <p className="text-gray-400">Like videos to see them here</p>
        </div>
      )}
    </div>
  );
}
