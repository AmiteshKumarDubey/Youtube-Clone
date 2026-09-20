import React, { useState, useEffect } from 'react';
import { getAllVideos } from '../services/api';
import VideoCard from '../components/VideoCard';
import { useWatch } from '../context/WatchContext';
import { useAuth } from '../context/AuthContext';
import { FaTv, FaBell, FaCheck, FaUserPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ALL_CHANNELS = [
  { name: 'T-Series', subscribers: '265M', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TSeries' },
  { name: 'SET India', subscribers: '170M', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SETIndia' },
  { name: 'Technical Guruji', subscribers: '23M', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TechnicalGuruji' },
  { name: 'CodeWithHarry', subscribers: '4.5M', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Harry' },
  { name: 'CarryMinati', subscribers: '41M', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carry' },
  { name: 'Beebom', subscribers: '3.8M', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Beebom' },
  { name: 'Sony Music', subscribers: '62M', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SonyMusic' }
];

const Subscriptions = () => {
  const { subscriptions, toggleSubscribe, isSubscribed } = useWatch();
  const { user } = useAuth();
  const [subscriptionVideos, setSubscriptionVideos] = useState([]);
  const [selectedChannelFilter, setSelectedChannelFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    const all = getAllVideos();
    if (selectedChannelFilter === 'all') {
      const filtered = all.filter(v => subscriptions.includes(v.channel));
      setSubscriptionVideos(filtered.length > 0 ? filtered : all.slice(0, 12));
    } else {
      const filtered = all.filter(v => v.channel === selectedChannelFilter);
      setSubscriptionVideos(filtered);
    }
  }, [subscriptions, selectedChannelFilter]);

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '24px 16px', color: '#fff' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '24px',
        borderBottom: '1px solid #272727',
        paddingBottom: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <FaTv style={{ fontSize: '28px', color: '#ff0000' }} />
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: 'bold', margin: 0 }}>Subscriptions</h1>
            <p style={{ color: '#aaa', fontSize: '13px', marginTop: '2px' }}>
              Latest videos from channels you follow
            </p>
          </div>
        </div>
      </div>

      {/* Subscribed Channels Avatar Bar */}
      <div style={{
        display: 'flex',
        gap: '16px',
        overflowX: 'auto',
        paddingBottom: '16px',
        marginBottom: '28px',
        scrollbarWidth: 'none'
      }}>
        <button
          onClick={() => setSelectedChannelFilter('all')}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            minWidth: '72px'
          }}
        >
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: selectedChannelFilter === 'all' ? '#3ea6ff' : '#272727',
            color: selectedChannelFilter === 'all' ? '#0f0f0f' : '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '14px',
            border: selectedChannelFilter === 'all' ? '2px solid #3ea6ff' : 'none'
          }}>
            ALL
          </div>
          <span style={{ fontSize: '12px', color: '#fff', fontWeight: 'bold' }}>All Videos</span>
        </button>

        {ALL_CHANNELS.map(channel => {
          const subscribed = isSubscribed(channel.name);
          const isSelected = selectedChannelFilter === channel.name;

          return (
            <div
              key={channel.name}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                minWidth: '76px',
                position: 'relative'
              }}
            >
              <div 
                onClick={() => setSelectedChannelFilter(channel.name)}
                style={{
                  position: 'relative',
                  cursor: 'pointer'
                }}
              >
                <img
                  src={channel.avatar}
                  alt={channel.name}
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    border: isSelected ? '2px solid #3ea6ff' : subscribed ? '2px solid #cc0000' : '2px solid #333',
                    opacity: subscribed ? 1 : 0.6,
                    objectFit: 'cover'
                  }}
                />
                {subscribed && (
                  <div style={{
                    position: 'absolute',
                    bottom: '2px',
                    right: '2px',
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: '#00e676',
                    border: '2px solid #0f0f0f'
                  }} />
                )}
              </div>

              <span 
                onClick={() => navigate(`/channel/${encodeURIComponent(channel.name)}`)}
                style={{
                  fontSize: '11px',
                  color: '#ddd',
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '74px',
                  cursor: 'pointer'
                }}
              >
                {channel.name}
              </span>

              <button
                onClick={() => toggleSubscribe(channel.name)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: subscribed ? '#aaa' : '#3ea6ff',
                  fontSize: '10px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                {subscribed ? 'Subscribed' : '+ Subscribe'}
              </button>
            </div>
          );
        })}
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
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📺</div>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>Don't miss new videos</h2>
          <p style={{ color: '#aaa', fontSize: '14px', marginBottom: '20px' }}>Sign in to see updates from your favorite YouTube channels.</p>
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

      {/* Videos Grid */}
      {user && subscriptionVideos.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px' }}>
          {subscriptionVideos.map(video => (
            <VideoCard key={video.id || video._id} video={video} />
          ))}
        </div>
      )}

      {/* Empty Subscriptions State */}
      {user && subscriptions.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#aaa' }}>
          <div style={{ fontSize: '56px', marginBottom: '16px' }}>🔴</div>
          <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#fff', marginBottom: '8px' }}>No Subscriptions Yet</h2>
          <p style={{ fontSize: '14px', maxWidth: '400px', margin: '0 auto 20px auto' }}>Subscribe to channels to see their latest videos listed here.</p>
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
            Discover Channels
          </button>
        </div>
      )}
    </div>
  );
};

export default Subscriptions;