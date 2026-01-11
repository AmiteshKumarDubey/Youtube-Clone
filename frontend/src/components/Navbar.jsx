import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Three dots dropdown items
  const dropdownItems = [
    { icon: '🎬', text: 'YouTube Studio' },
    { icon: '⚙️', text: 'Settings' },
    { icon: '🔒', text: 'Restricted Mode' },
    { icon: '📊', text: 'Your data in YouTube' },
    { icon: '🆘', text: 'Help' },
    { icon: '📝', text: 'Send feedback' },
    { icon: '👁️', text: 'Keyboard shortcuts' },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-left">
        {/* Hamburger Menu */}
        <button className="hamburger-btn" onClick={() => navigate('/')}>
          <i className="fas fa-bars"></i>
        </button>
        
        {/* YouTube Logo */}
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
        <button className="nav-icon" title="Create">
          <i className="fas fa-video-plus"></i>
        </button>
        <button className="nav-icon" title="YouTube apps">
          <i className="fas fa-th"></i>
        </button>
        <button className="nav-icon" title="Notifications">
          <i className="fas fa-bell"></i>
          <span className="notification-badge">9+</span>
        </button>
        
        {/* Three Dots Button with Dropdown */}
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
                  onClick={() => {
                    setShowDropdown(false);
                    console.log(`Clicked: ${item.text}`);
                  }}
                >
                  <span className="dropdown-icon">{item.icon}</span>
                  <span className="dropdown-text">{item.text}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <button className="profile-btn" title="Profile">
          <i className="fas fa-user-circle"></i>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;