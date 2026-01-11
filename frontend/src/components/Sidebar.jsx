import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Home.css';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const sidebarSections = [
    {
      title: '',
      items: [
        { name: 'Home', icon: '🏠', path: '/' },
        { name: 'Shorts', icon: '🎬', path: '/shorts' },
        { name: 'Subscriptions', icon: '📺', path: '/subscriptions' },
      ]
    },
    {
      title: 'You',
      items: [
        { name: 'Your channel', icon: '👤', path: '/channel' },
        { name: 'History', icon: '🕒', path: '/history' },
        { name: 'Watch later', icon: '⏱️', path: '/watch-later' },
        { name: 'Liked videos', icon: '👍', path: '/liked-videos' },
        { name: 'Playlists', icon: '📋', path: '/playlists' },
      ]
    },
    {
      title: 'Subscriptions',
      items: [
        { name: 'T-Series', icon: '🔴', path: '/t-series' },
        { name: 'SET India', icon: '🔴', path: '/set-india' },
        { name: 'Technical Guruji', icon: '🔴', path: '/technical-guruji' },
        { name: 'CarryMinati', icon: '🔴', path: '/carryminati' },
        { name: 'BB Ki Vines', icon: '🔴', path: '/bb-ki-vines' },
        { name: 'Sony Music', icon: '🔴', path: '/sony-music' },
      ]
    },
    {
      title: 'Explore',
      items: [
        { name: 'Trending', icon: '🔥', path: '/trending' },
        { name: 'Music', icon: '🎵', path: '/music' },
        { name: 'Films', icon: '🎬', path: '/films' },
        { name: 'Live', icon: '🔴', path: '/live' },
        { name: 'Gaming', icon: '🎮', path: '/gaming' },
        { name: 'News', icon: '📰', path: '/news' },
        { name: 'Sports', icon: '⚽', path: '/sports' },
        { name: 'Learning', icon: '📚', path: '/learning' },
        { name: 'Fashion & beauty', icon: '💄', path: '/fashion-beauty' },
      ]
    },
  ];

  const moreFromYouTube = [
    { name: 'YouTube Premium', icon: '💎', path: '/premium' },
    { name: 'YouTube Music', icon: '🎵', path: '/music-app' },
    { name: 'YouTube Kids', icon: '👶', path: '/kids' },
  ];

  const settingsItems = [
    { name: 'Settings', icon: '⚙️', path: '/settings' },
    { name: 'Report history', icon: '📊', path: '/report-history' },
    { name: 'Help', icon: '🆘', path: '/help' },
    { name: 'Send feedback', icon: '📝', path: '/feedback' },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="mobile-menu-btn" onClick={toggleSidebar}>
        <i className="fas fa-bars"></i>
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-content">
          {sidebarSections.map((section, index) => (
            <div key={index} className="sidebar-section">
              {section.title && <h3 className="section-title">{section.title}</h3>}
              {section.items.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) => 
                    `sidebar-item ${isActive ? 'active' : ''}`
                  }
                  onClick={() => window.innerWidth < 768 && setIsSidebarOpen(false)}
                >
                  <span className="sidebar-icon">{item.icon}</span>
                  <span className="sidebar-text">{item.name}</span>
                </NavLink>
              ))}
            </div>
          ))}

          {/* More from YouTube */}
          <div className="sidebar-section">
            <h3 className="section-title">More from YouTube</h3>
            {moreFromYouTube.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => 
                  `sidebar-item ${isActive ? 'active' : ''}`
                }
                onClick={() => window.innerWidth < 768 && setIsSidebarOpen(false)}
              >
                <span className="sidebar-icon premium-icon">{item.icon}</span>
                <span className="sidebar-text">{item.name}</span>
              </NavLink>
            ))}
          </div>

          {/* Settings */}
          <div className="sidebar-section">
            {settingsItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => 
                  `sidebar-item ${isActive ? 'active' : ''}`
                }
                onClick={() => window.innerWidth < 768 && setIsSidebarOpen(false)}
              >
                <span className="sidebar-icon settings-icon">{item.icon}</span>
                <span className="sidebar-text">{item.name}</span>
              </NavLink>
            ))}
          </div>

          {/* Footer Links */}
          <div className="sidebar-footer">
            <div className="footer-links">
              <a href="#">About</a>
              <a href="#">Press</a>
              <a href="#">Copyright</a>
              <a href="#">Contact us</a>
              <a href="#">Creators</a>
              <a href="#">Advertise</a>
              <a href="#">Developers</a>
            </div>
            <div className="footer-links">
              <a href="#">Terms</a>
              <a href="#">Privacy</a>
              <a href="#">Policy & Safety</a>
              <a href="#">How YouTube works</a>
              <a href="#">Test new features</a>
            </div>
            <div className="copyright">
              © {new Date().getFullYear()} Google LLC
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && window.innerWidth < 768 && (
        <div className="sidebar-overlay" onClick={toggleSidebar}></div>
      )}
    </>
  );
};

export default Sidebar;