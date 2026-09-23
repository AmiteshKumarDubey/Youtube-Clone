import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Home.css';

const SEARCH_SUGGESTIONS_POOL = [
  'iPhone 16 Pro Max unboxing',
  'CarryMinati Minecraft scary villager',
  'Lo-Fi hip hop beats to relax / study to',
  'Virat Kohli 50th century highlights',
  'Full stack web development course 2024',
  'Stranger Things season 5 finale trailer',
  'GTA 6 trailer official 4K',
  'Animal Arjan Vailly song 4K',
  'Coldplay Yellow official music video',
  'ISRO space mission launch live stream',
  'The Kapil Sharma Show funniest moments',
  'React JS full course for beginners',
  'Tailwind CSS vs Vanilla CSS tutorial',
  'MS Dhoni last ball IPL finish',
  'Unbox Therapy newest tech gadgets',
];

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Voice Search Modal State
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceQueryText, setVoiceQueryText] = useState('');

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);
  const profileRef = useRef(null);

  // Handle Search Input Change & Autocomplete Filter
  const handleInputChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);

    if (val.trim().length > 0) {
      const filtered = SEARCH_SUGGESTIONS_POOL.filter(item =>
        item.toLowerCase().includes(val.toLowerCase())
      );
      setSuggestions(filtered.length > 0 ? filtered : SEARCH_SUGGESTIONS_POOL.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const executeSearch = (queryToUse) => {
    const finalQuery = queryToUse || searchQuery;
    if (finalQuery.trim()) {
      setShowSuggestions(false);
      navigate(`/search?q=${encodeURIComponent(finalQuery.trim())}`);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    executeSearch();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  const selectSuggestion = (term) => {
    setSearchQuery(term);
    setShowSuggestions(false);
    executeSearch(term);
  };

  // Voice Search Handler
  const handleVoiceSearchOpen = () => {
    setShowVoiceModal(true);
    setIsListening(true);
    setVoiceQueryText('');

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setVoiceQueryText(transcript);
          setSearchQuery(transcript);
          setIsListening(false);
          setTimeout(() => {
            setShowVoiceModal(false);
            executeSearch(transcript);
          }, 1200);
        };
        recognition.onerror = () => setIsListening(false);
        recognition.onend = () => setIsListening(false);
        recognition.start();
      } catch (err) {
        console.log('Voice recognition error:', err);
      }
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
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

      <div className="navbar-center" ref={searchRef}>
        <div className="search-container" style={{ position: 'relative' }}>
          <input
            type="text"
            className="search-input"
            placeholder="Search"
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={() => searchQuery.trim() && setShowSuggestions(true)}
            onKeyPress={handleKeyPress}
          />
          <button className="search-btn" onClick={handleSearch}>
            <i className="fas fa-search"></i>
          </button>
          <button className="voice-search-btn" title="Search with your voice" onClick={handleVoiceSearchOpen}>
            <i className="fas fa-microphone"></i>
          </button>

          {/* Autocomplete Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="search-suggestions-dropdown">
              {suggestions.map((item, idx) => (
                <div 
                  key={idx} 
                  className="suggestion-item" 
                  onClick={() => selectSuggestion(item)}
                >
                  <i className="fas fa-history"></i>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          )}
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

      {/* Voice Search Modal */}
      {showVoiceModal && (
        <div className="voice-modal-overlay" onClick={() => setShowVoiceModal(false)}>
          <div className="voice-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="voice-modal-close" onClick={() => setShowVoiceModal(false)}>
              <i className="fas fa-times"></i>
            </button>

            <h2 style={{ fontSize: '20px', fontWeight: '500', margin: '8px 0 4px 0' }}>Search with your voice</h2>
            <p style={{ color: '#aaa', fontSize: '14px' }}>
              {isListening ? 'Listening...' : voiceQueryText ? `Recognized: "${voiceQueryText}"` : 'Click microphone or pick a sample voice query below'}
            </p>

            <button 
              className={`mic-pulse-btn ${isListening ? 'listening' : ''}`}
              onClick={() => setIsListening(!isListening)}
            >
              <i className="fas fa-microphone"></i>
            </button>

            {voiceQueryText && (
              <div style={{ fontSize: '18px', color: '#3ea6ff', fontWeight: 'bold', marginBottom: '16px' }}>
                "{voiceQueryText}"
              </div>
            )}

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginTop: '12px' }}>
              {['React JS Tutorial', 'Lo-Fi Beats 24/7', 'CarryMinati', 'GTA 6 Trailer', 'iPhone 16 Pro'].map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => selectSuggestion(sample)}
                  style={{
                    background: '#303030',
                    border: 'none',
                    color: '#fff',
                    padding: '8px 14px',
                    borderRadius: '16px',
                    fontSize: '13px',
                    cursor: 'pointer',
                    transition: '0.2s'
                  }}
                  onMouseOver={(e) => e.target.style.background = '#444'}
                  onMouseOut={(e) => e.target.style.background = '#303030'}
                >
                  <i className="fas fa-microphone" style={{ fontSize: '11px', marginRight: '6px', color: '#ff0000' }}></i>
                  {sample}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;