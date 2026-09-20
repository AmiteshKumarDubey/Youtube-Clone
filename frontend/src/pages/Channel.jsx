import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAllVideos } from '../services/api';
import VideoCard from '../components/VideoCard';
import { useWatch } from '../context/WatchContext';
import { useAuth } from '../context/AuthContext';
import { FaCheckCircle, FaBell, FaSearch, FaPlay, FaGlobe, FaCalendarAlt, FaEye } from 'react-icons/fa';

export default function Channel() {
  const { name } = useParams();
  const { user } = useAuth();
  const { isSubscribed, toggleSubscribe } = useWatch();
  const navigate = useNavigate();

  const channelName = decodeURIComponent(name || (user ? user.name : 'Technical Guruji'));
  const [activeTab, setActiveTab] = useState('videos');
  const [channelVideos, setChannelVideos] = useState([]);
  const [subscriberCount, setSubscriberCount] = useState(1240000);
  const subscribed = isSubscribed(channelName);

  useEffect(() => {
    const all = getAllVideos();
    const filtered = all.filter(v => v.channel?.toLowerCase() === channelName.toLowerCase());
    setChannelVideos(filtered.length > 0 ? filtered : all.slice(0, 8));
  }, [channelName]);

  const handleSubscribeClick = () => {
    toggleSubscribe(channelName);
    setSubscriberCount(prev => subscribed ? prev - 1 : prev + 1);
  };

  const formatCount = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const avatarSeed = encodeURIComponent(channelName);
  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeed}`;

  return (
    <div style={{ backgroundColor: '#0f0f0f', minHeight: '100vh', color: '#fff', paddingBottom: '40px' }}>
      
      {/* Banner Cover Art */}
      <div style={{
        height: '180px',
        width: '100%',
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #6874e8 100%)',
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-end',
        padding: '20px',
        boxSizing: 'border-box'
      }}>
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 60%)'
        }} />
      </div>

      {/* Main Channel Header Container */}
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
          marginTop: '-36px',
          marginBottom: '24px'
        }}>
          
          {/* Avatar & Channel Details */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <img
              src={avatarUrl}
              alt={channelName}
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                border: '4px solid #0f0f0f',
                backgroundColor: '#1f1f1f',
                boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
                objectFit: 'cover'
              }}
            />

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>{channelName}</h1>
                <FaCheckCircle style={{ color: '#aaa', fontSize: '18px' }} title="Verified Channel" />
              </div>

              <div style={{ display: 'flex', gap: '12px', color: '#aaa', fontSize: '13px', margin: '6px 0', flexWrap: 'wrap' }}>
                <span>@{channelName.toLowerCase().replace(/\s+/g, '')}</span>
                <span>•</span>
                <span style={{ fontWeight: 'bold', color: '#fff' }}>{formatCount(subscriberCount)} subscribers</span>
                <span>•</span>
                <span>{channelVideos.length} videos</span>
              </div>

              <p style={{ color: '#ccc', fontSize: '13.5px', margin: 0, maxWidth: '600px', lineHeight: '1.4' }}>
                Welcome to the official {channelName} channel! Subscribe for daily high-quality videos, tech reviews, and programming tutorials.
              </p>
            </div>
          </div>

          {/* Subscribe Button */}
          <button
            onClick={handleSubscribeClick}
            style={{
              backgroundColor: subscribed ? '#272727' : '#cc0000',
              color: '#ffffff',
              border: 'none',
              padding: '12px 28px',
              borderRadius: '24px',
              fontWeight: 'bold',
              fontSize: '15px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'background 0.2s ease, transform 0.15s ease'
            }}
          >
            {subscribed ? <FaBell style={{ color: '#ff4d4d' }} /> : null}
            {subscribed ? 'Subscribed' : 'Subscribe'}
          </button>
        </div>

        {/* Navigation Tabs Bar */}
        <div style={{
          display: 'flex',
          gap: '24px',
          borderBottom: '1px solid #272727',
          marginBottom: '28px',
          overflowX: 'auto',
          scrollbarWidth: 'none'
        }}>
          {['videos', 'shorts', 'playlists', 'about'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: 'none',
                border: 'none',
                padding: '12px 4px',
                color: activeTab === tab ? '#fff' : '#aaa',
                fontWeight: activeTab === tab ? 'bold' : '500',
                fontSize: '15px',
                cursor: 'pointer',
                borderBottom: activeTab === tab ? '3px solid #fff' : '3px solid transparent',
                textTransform: 'capitalize',
                transition: 'color 0.2s'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content: Videos */}
        {activeTab === 'videos' && (
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>Uploads</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px' }}>
              {channelVideos.map(video => (
                <VideoCard key={video.id || video._id} video={video} />
              ))}
            </div>
          </div>
        )}

        {/* Tab Content: Shorts */}
        {activeTab === 'shorts' && (
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>Shorts Videos</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px' }}>
              {channelVideos.slice(0, 4).map((video, idx) => (
                <div
                  key={idx}
                  onClick={() => navigate('/shorts')}
                  style={{
                    backgroundColor: '#1f1f1f',
                    borderRadius: '12px',
                    height: '280px',
                    padding: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    cursor: 'pointer',
                    border: '1px solid #333',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#ff0000', fontSize: '12px', fontWeight: 'bold', marginBottom: '4px' }}>
                    <FaPlay style={{ fontSize: '9px' }} /> SHORTS
                  </div>
                  <h4 style={{ fontSize: '13px', fontWeight: 'bold', margin: 0, lineHeight: '1.3' }}>
                    {video.snippet?.title || video.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab Content: Playlists */}
        {activeTab === 'playlists' && (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: '#aaa' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>📋</div>
            <h3 style={{ fontSize: '18px', color: '#fff', marginBottom: '6px' }}>Created Playlists</h3>
            <p style={{ fontSize: '14px' }}>This channel has no public playlists available yet.</p>
          </div>
        )}

        {/* Tab Content: About */}
        {activeTab === 'about' && (
          <div style={{
            backgroundColor: '#181818',
            borderRadius: '16px',
            padding: '24px',
            maxWidth: '640px',
            border: '1px solid #272727'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>Description</h3>
            <p style={{ color: '#ccc', fontSize: '14px', lineHeight: '1.6', marginBottom: '24px' }}>
              Official YouTube channel for {channelName}. Sharing the latest tech news, unboxings, programming tutorials, and reviews!
            </p>

            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>Stats</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: '#ddd' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FaGlobe style={{ color: '#aaa' }} /> Location: India
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FaCalendarAlt style={{ color: '#aaa' }} /> Joined Jan 15, 2021
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FaEye style={{ color: '#aaa' }} /> 482,910,240 total views
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}