import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Home.css';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const profileRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const dropdownItems = [
    { icon: '🎬', text: 'YouTube Studio' },
    { icon: '⚙️', text: 'Settings' },
    { icon: '🔒', text: 'Restricted Mode' },
    { icon: '📊', text: 'Your data in YouTube' },
    { icon: '🆘', text: 'Help' },
    { icon: '📝', text: 'Send feedback' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="hamburger-btn" onClick={() => navigate('/')}>
          <i className="fas fa-bars"></i>
        </button>
        
        <div className="youtube-logo" onClick={() => navigate('/')}>
          <i className="fab fa-youtube"></i>
          <span>YouTube</span>
        </div>
      </div>

      <div className="navbar-center">
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className="search-btn" onClick={handleSearch}>
            <i className="fas fa-search"></i>
          </button>
          <button className="voice-search-btn" title="Search with your voice">
            <i className="fas fa-microphone"></i>
          </button>
        </div>
      </div>

      <div className="navbar-right">
        <button className="nav-icon" title="Create" onClick={() => navigate(user ? '/upload' : '/login')}>
          <i className="fas fa-video-plus"></i>
        </button>
        <button className="nav-icon" title="Notifications">
          <i className="fas fa-bell"></i>
          {user && <span className="notification-badge">3</span>}
        </button>
        
        <div className="three-dots-container" ref={dropdownRef}>
          <button 
            className="three-dots-btn" 
            onClick={() => setShowDropdown(!showDropdown)}
            title="More options"
          >
            <i className="fas fa-ellipsis-v"></i>
          </button>
          
          {showDropdown && (
            <div className="dropdown-menu">
              {dropdownItems.map((item, index) => (
                <button 
                  key={index} 
                  className="dropdown-item"
                  onClick={() => setShowDropdown(false)}
                >
                  <span className="dropdown-icon">{item.icon}</span>
                  <span className="dropdown-text">{item.text}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {user ? (
          <div style={{ position: 'relative' }} ref={profileRef}>
            <button 
              className="profile-btn" 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              style={{ overflow: 'hidden', padding: 0, borderRadius: '50%', width: '36px', height: '36px', border: '1px solid #3ea6ff' }}
            >
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <i className="fas fa-user-circle"></i>
              )}
            </button>

            {showProfileMenu && (
              <div className="dropdown-menu" style={{ right: 0, width: '220px', padding: '12px 0' }}>
                <div style={{ padding: '0 16px 12px 16px', borderBottom: '1px solid #333', marginBottom: '8px' }}>
                  <div style={{ fontWeight: 'bold', color: '#fff', fontSize: '14px' }}>{user.name}</div>
                  <div style={{ color: '#aaa', fontSize: '12px' }}>{user.email}</div>
                </div>

                <button className="dropdown-item" onClick={() => { setShowProfileMenu(false); navigate('/history'); }}>
                  <span className="dropdown-icon">🕒</span>
                  <span className="dropdown-text">Watch History</span>
                </button>

                <button className="dropdown-item" onClick={() => { setShowProfileMenu(false); navigate('/watch-later'); }}>
                  <span className="dropdown-icon">⏱️</span>
                  <span className="dropdown-text">Watch Later</span>
                </button>

                <button className="dropdown-item" onClick={() => { setShowProfileMenu(false); navigate('/liked-videos'); }}>
                  <span className="dropdown-icon">👍</span>
                  <span className="dropdown-text">Liked Videos</span>
                </button>

                <div style={{ borderTop: '1px solid #333', marginTop: '8px', paddingTop: '8px' }}>
                  <button className="dropdown-item" onClick={() => { logout(); setShowProfileMenu(false); }}>
                    <span className="dropdown-icon">🚪</span>
                    <span className="dropdown-text">Sign out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button 
            onClick={() => navigate('/login')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              border: '1px solid #3ea6ff',
              color: '#3ea6ff',
              background: 'transparent',
              padding: '6px 12px',
              borderRadius: '18px',
              fontWeight: 'bold',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            <i className="fas fa-user-circle" style={{ fontSize: '18px' }}></i>
            Sign in
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;