import React from 'react';
import { useWatch } from '../context/WatchContext';
import { useAuth } from '../context/AuthContext';
import VideoCard from '../components/VideoCard';
import { FaThumbsUp, FaPlay, FaHeart, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function LikedVideos() {
  const { likedVideos, toggleLikeVideo } = useWatch();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handlePlayAll = () => {
    if (likedVideos.length > 0) {
      const firstId = likedVideos[0].id || likedVideos[0]._id;
      navigate(`/video/${firstId}`);
    }
  };

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '24px 16px', color: '#fff' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        marginBottom: '28px',
        borderBottom: '1px solid #272727',
        paddingBottom: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <FaThumbsUp style={{ fontSize: '28px', color: '#ff4d4d' }} />
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: 'bold', margin: 0 }}>Liked Videos</h1>
            <p style={{ color: '#aaa', fontSize: '13px', marginTop: '2px' }}>
              {likedVideos.length} video{likedVideos.length !== 1 ? 's' : ''} liked
            </p>
          </div>
        </div>

        {likedVideos.length > 0 && (
          <button
            onClick={handlePlayAll}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#ffffff',
              color: '#000000',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '20px',
              fontWeight: 'bold',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            <FaPlay />
            Play All
          </button>
        )}
      </div>

      {/* Unauthenticated View */}
      {!user && (
        <div style={{
          backgroundColor: '#181818',
          borderRadius: '16px',
          padding: '40px 24px',
          textAlign: 'center',
          maxWidth: '480px',
          margin: '40px auto',
          border: '1px solid #272727'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>❤️</div>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>Sign in to see Liked Videos</h2>
          <p style={{ color: '#aaa', fontSize: '14px', marginBottom: '20px' }}>Videos you like will be saved to your profile for easy access.</p>
          <button
            onClick={() => navigate('/login')}
            style={{
              backgroundColor: '#3ea6ff',
              color: '#0f0f0f',
              border: 'none',
              padding: '10px 24px',
              borderRadius: '20px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Sign In Now
          </button>
        </div>
      )}

      {/* Liked Videos Grid */}
      {user && likedVideos.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px' }}>
          {likedVideos.map(video => (
            <div key={video.id || video._id} style={{ position: 'relative' }}>
              <VideoCard video={video} />

              {/* Unlike button overlay */}
              <button
                onClick={() => toggleLikeVideo(video)}
                title="Remove from Liked Videos"
                style={{
                  position: 'absolute',
                  top: '8px',
                  left: '8px',
                  backgroundColor: 'rgba(0,0,0,0.85)',
                  color: '#ff4d4d',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 10,
                  fontSize: '13px'
                }}
              >
                <FaHeart />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {user && likedVideos.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#aaa' }}>
          <div style={{ fontSize: '56px', marginBottom: '16px' }}>👍</div>
          <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#fff', marginBottom: '8px' }}>No liked videos yet</h2>
          <p style={{ fontSize: '14px', maxWidth: '400px', margin: '0 auto 20px auto' }}>Like videos to save them to this list.</p>
          <button
            onClick={() => navigate('/')}
            style={{
              backgroundColor: '#cc0000',
              color: '#fff',
              border: 'none',
              padding: '10px 24px',
              borderRadius: '20px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Explore Videos
          </button>
        </div>
      )}
    </div>
  );
}
