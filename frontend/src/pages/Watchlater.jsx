import React from 'react';
import { useWatch } from '../context/WatchContext';
import { useAuth } from '../context/AuthContext';
import VideoCard from '../components/VideoCard';
import { FaClock, FaTrash, FaPlay, FaRandom } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function WatchLater() {
  const { watchLater, removeFromWatchLater, clearWatchLater } = useWatch();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handlePlayAll = () => {
    if (watchLater.length > 0) {
      const firstId = watchLater[0].id || watchLater[0]._id;
      navigate(`/video/${firstId}`);
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Clear all videos from Watch Later?')) {
      clearWatchLater();
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 16px', color: '#fff' }}>
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
          <FaClock style={{ fontSize: '28px', color: '#3ea6ff' }} />
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: 'bold', margin: 0 }}>Watch Later</h1>
            <p style={{ color: '#aaa', fontSize: '13px', marginTop: '2px' }}>
              {watchLater.length} saved video{watchLater.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {/* Play All & Clear Controls */}
        {watchLater.length > 0 && (
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
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

            <button
              onClick={handleClearAll}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#272727',
                color: '#ff4d4d',
                border: '1px solid #333',
                padding: '10px 18px',
                borderRadius: '20px',
                fontWeight: 'bold',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              <FaTrash />
              Clear Watch Later
            </button>
          </div>
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
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏱️</div>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>Save videos for later</h2>
          <p style={{ color: '#aaa', fontSize: '14px', marginBottom: '20px' }}>Sign in to access your saved Watch Later videos anytime, anywhere.</p>
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

      {/* Saved Videos Grid */}
      {user && watchLater.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px' }}>
          {watchLater.map((video) => (
            <div key={video.id || video._id} style={{ position: 'relative' }}>
              <VideoCard video={video} />

              {/* Remove button */}
              <button
                onClick={() => removeFromWatchLater(video.id || video._id)}
                title="Remove from Watch Later"
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
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {user && watchLater.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#aaa' }}>
          <div style={{ fontSize: '56px', marginBottom: '16px' }}>⏱️</div>
          <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#fff', marginBottom: '8px' }}>No saved videos</h2>
          <p style={{ fontSize: '14px', maxWidth: '400px', margin: '0 auto 20px auto' }}>Save videos to watch later by clicking the clock icon on any video thumbnail.</p>
          <button
            onClick={() => navigate('/')}
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
            Find Videos to Save
          </button>
        </div>
      )}
    </div>
  );
}