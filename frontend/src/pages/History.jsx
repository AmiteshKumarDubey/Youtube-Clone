import React, { useState } from 'react';
import { useWatch } from '../context/WatchContext';
import { useAuth } from '../context/AuthContext';
import VideoCard from '../components/VideoCard';
import { FaHistory, FaTrash, FaPause, FaPlay, FaSearch, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function History() {
  const { history, removeFromHistory, clearHistory, isHistoryPaused, toggleHistoryPause } = useWatch();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const filteredHistory = history.filter(item => {
    if (!searchQuery.trim()) return true;
    const title = item.snippet?.title || item.title || '';
    const channel = item.snippet?.channelTitle || item.channel || '';
    return title.toLowerCase().includes(searchQuery.toLowerCase()) || 
           channel.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleClearAll = () => {
    if (window.confirm('Clear all watch history?')) {
      clearHistory();
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
          <FaHistory style={{ fontSize: '28px', color: '#cc0000' }} />
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: 'bold', margin: 0 }}>Watch History</h1>
            <p style={{ color: '#aaa', fontSize: '13px', marginTop: '2px' }}>
              {history.length} video{history.length !== 1 ? 's' : ''} watched
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={toggleHistoryPause}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: isHistoryPaused ? '#ff4d4d' : '#272727',
              color: '#fff',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '18px',
              fontWeight: 'bold',
              fontSize: '13px',
              cursor: 'pointer'
            }}
          >
            {isHistoryPaused ? <FaPlay /> : <FaPause />}
            {isHistoryPaused ? 'Resume History' : 'Pause History'}
          </button>

          {history.length > 0 && (
            <button
              onClick={handleClearAll}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(204, 0, 0, 0.2)',
                color: '#ff4d4d',
                border: '1px solid rgba(204, 0, 0, 0.4)',
                padding: '8px 16px',
                borderRadius: '18px',
                fontWeight: 'bold',
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              <FaTrash />
              Clear All History
            </button>
          )}
        </div>
      </div>

      {/* History Search Bar */}
      {history.length > 0 && (
        <div style={{ position: 'relative', maxWidth: '420px', marginBottom: '24px' }}>
          <FaSearch style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#777' }} />
          <input
            type="text"
            placeholder="Search watch history..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              backgroundColor: '#1f1f1f',
              border: '1px solid #333',
              borderRadius: '20px',
              padding: '10px 16px 10px 40px',
              color: '#fff',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#aaa', cursor: 'pointer' }}
            >
              <FaTimes />
            </button>
          )}
        </div>
      )}

      {/* Unauthenticated view */}
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
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔒</div>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>Sign in to view Watch History</h2>
          <p style={{ color: '#aaa', fontSize: '14px', marginBottom: '20px' }}>Your watch history will automatically sync across devices when signed in.</p>
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

      {/* History Grid */}
      {user && filteredHistory.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px' }}>
          {filteredHistory.map((item) => (
            <div key={item.id || item._id} style={{ position: 'relative', group: 'true' }}>
              <VideoCard video={item} />
              
              {/* Individual Delete Button */}
              <button
                onClick={() => removeFromHistory(item.id || item._id)}
                title="Remove from Watch History"
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
      {user && history.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#aaa' }}>
          <div style={{ fontSize: '56px', marginBottom: '16px' }}>📺</div>
          <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#fff', marginBottom: '8px' }}>Keep track of what you watch</h2>
          <p style={{ fontSize: '14px', maxWidth: '400px', margin: '0 auto 20px auto' }}>Watch history isn't showing any videos. Videos you watch will appear here.</p>
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