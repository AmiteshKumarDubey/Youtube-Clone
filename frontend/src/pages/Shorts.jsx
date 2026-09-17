import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlay, FaFire } from 'react-icons/fa';

export default function Shorts() {
  const navigate = useNavigate();

  const mockShorts = [
    { id: 'short_1', title: 'Top 5 VS Code Tricks You Didn\'t Know! 🔥', views: '1.2M', channel: 'TechCode' },
    { id: 'short_2', title: 'Next.js 15 Fast Setup in 60 Seconds 🚀', views: '840K', channel: 'DevBytes' },
    { id: 'short_3', title: 'Insane AI Coding Magic! 🤖', views: '2.4M', channel: 'AI Future' },
    { id: 'short_4', title: 'Day in Life of a Software Engineer ☕', views: '500K', channel: 'CodeLife' }
  ];

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto', color: '#fff' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <FaFire style={{ color: '#ff0000', fontSize: '28px' }} />
        <h1 style={{ fontSize: '28px', fontWeight: 'bold' }}>YouTube Shorts</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
        {mockShorts.map(short => (
          <div 
            key={short.id}
            onClick={() => navigate(`/video/4TWR90KJl84`)}
            style={{
              background: '#1f1f1f',
              borderRadius: '16px',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'transform 0.2s ease, border 0.2s ease',
              border: '1px solid #333',
              height: '380px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '16px',
              position: 'relative'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
          >
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.95), transparent)',
              zIndex: 1
            }} />
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ff0000', fontSize: '13px', fontWeight: 'bold', marginBottom: '6px' }}>
                <FaPlay style={{ fontSize: '10px' }} /> SHORTS
              </div>
              <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '8px', lineHeight: '1.3' }}>{short.title}</h3>
              <p style={{ fontSize: '13px', color: '#aaa' }}>{short.channel} • {short.views} views</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
