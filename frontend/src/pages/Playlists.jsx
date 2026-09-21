import React, { useState } from 'react';
import { useWatch } from '../context/WatchContext';
import { useAuth } from '../context/AuthContext';
import VideoCard from '../components/VideoCard';
import { FaList, FaPlus, FaTrash, FaLock, FaGlobe, FaPlay, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Playlists() {
  const { playlists, createPlaylist, deletePlaylist } = useWatch();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  const handleCreate = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    createPlaylist(title, description, isPrivate);
    setTitle('');
    setDescription('');
    setIsPrivate(false);
    setShowModal(false);
  };

  const activePlaylist = selectedPlaylist ? playlists.find(p => p.id === selectedPlaylist.id) : (playlists[0] || null);

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
          <FaList style={{ fontSize: '28px', color: '#3ea6ff' }} />
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: 'bold', margin: 0 }}>Playlists</h1>
            <p style={{ color: '#aaa', fontSize: '13px', marginTop: '2px' }}>
              Create and manage custom video collections
            </p>
          </div>
        </div>

        {user && (
          <button
            onClick={() => setShowModal(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#3ea6ff',
              color: '#0f0f0f',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '20px',
              fontWeight: 'bold',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            <FaPlus />
            New Playlist
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
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📋</div>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>Organize your favorite videos</h2>
          <p style={{ color: '#aaa', fontSize: '14px', marginBottom: '20px' }}>Sign in to create playlists and save custom collections.</p>
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

      {/* Playlists View */}
      {user && playlists.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
          {playlists.map(pl => (
            <div
              key={pl.id}
              style={{
                backgroundColor: '#181818',
                borderRadius: '16px',
                border: '1px solid #272727',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '220px'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>{pl.title}</h3>
                  <span style={{ fontSize: '12px', color: '#aaa', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {pl.isPrivate ? <FaLock /> : <FaGlobe />}
                    {pl.isPrivate ? 'Private' : 'Public'}
                  </span>
                </div>

                <p style={{ color: '#aaa', fontSize: '13px', lineHeight: '1.4', marginBottom: '12px' }}>
                  {pl.description || 'No description provided.'}
                </p>

                <div style={{ fontSize: '13px', color: '#3ea6ff', fontWeight: 'bold' }}>
                  {pl.videos?.length || 0} video{(pl.videos?.length !== 1) ? 's' : ''}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #2b2b2b', paddingTop: '12px' }}>
                <button
                  onClick={() => {
                    if (pl.videos && pl.videos.length > 0) {
                      navigate(`/video/${pl.videos[0].id || pl.videos[0]._id}`);
                    } else {
                      alert('Playlist is empty! Add videos to play.');
                    }
                  }}
                  style={{
                    backgroundColor: '#ffffff',
                    color: '#000',
                    border: 'none',
                    borderRadius: '16px',
                    padding: '6px 14px',
                    fontWeight: 'bold',
                    fontSize: '13px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer'
                  }}
                >
                  <FaPlay style={{ fontSize: '10px' }} /> Play
                </button>

                <button
                  onClick={() => {
                    if (window.confirm(`Delete playlist "${pl.title}"?`)) {
                      deletePlaylist(pl.id);
                    }
                  }}
                  style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', fontSize: '15px' }}
                  title="Delete Playlist"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty Playlists State */}
      {user && playlists.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#aaa' }}>
          <div style={{ fontSize: '56px', marginBottom: '16px' }}>📋</div>
          <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#fff', marginBottom: '8px' }}>No playlists yet</h2>
          <p style={{ fontSize: '14px', maxWidth: '400px', margin: '0 auto 20px auto' }}>Create a playlist to save videos into custom categories.</p>
          <button
            onClick={() => setShowModal(true)}
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
            Create Playlist
          </button>
        </div>
      )}

      {/* Create Playlist Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.8)',
          zIndex: 3000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div style={{
            backgroundColor: '#1f1f1f',
            borderRadius: '16px',
            padding: '28px',
            width: '100%',
            maxWidth: '440px',
            border: '1px solid #333',
            boxShadow: '0 12px 32px rgba(0,0,0,0.6)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>Create New Playlist</h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: '#aaa', fontSize: '18px', cursor: 'pointer' }}>
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#ccc', marginBottom: '6px' }}>Title</label>
                <input
                  type="text"
                  placeholder="Enter playlist title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    backgroundColor: '#121212',
                    border: '1px solid #3b3b3b',
                    borderRadius: '8px',
                    padding: '12px',
                    color: '#fff',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#ccc', marginBottom: '6px' }}>Description (optional)</label>
                <textarea
                  placeholder="What is this playlist about?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{
                    width: '100%',
                    backgroundColor: '#121212',
                    border: '1px solid #3b3b3b',
                    borderRadius: '8px',
                    padding: '12px',
                    color: '#fff',
                    fontSize: '14px',
                    height: '80px',
                    resize: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input
                  type="checkbox"
                  id="privacy"
                  checked={isPrivate}
                  onChange={(e) => setIsPrivate(e.target.checked)}
                />
                <label htmlFor="privacy" style={{ fontSize: '14px', color: '#ddd', cursor: 'pointer' }}>
                  Make Playlist Private
                </label>
              </div>

              <button
                type="submit"
                style={{
                  backgroundColor: '#3ea6ff',
                  color: '#0f0f0f',
                  border: 'none',
                  borderRadius: '24px',
                  padding: '12px',
                  fontWeight: 'bold',
                  fontSize: '15px',
                  cursor: 'pointer',
                  marginTop: '8px'
                }}
              >
                Create
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
