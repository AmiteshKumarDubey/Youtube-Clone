import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { WatchProvider } from './context/WatchContext';
import Sidebar from './components/Sidebar';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import VideoPage from './pages/VideoPage';
import SearchResults from './pages/SearchResults';
import History from './pages/History';
import Watchlater from './pages/Watchlater';
import LikedVideos from './pages/LikedVideos';
import Subscriptions from './pages/Subscriptions';
import Shorts from './pages/Shorts';
import Login from './pages/Login';
import Upload from './pages/Upload';
import './styles/Home.css';

function App() {
  return (
    <AuthProvider>
      <WatchProvider>
        <Router>
          <div className="app-container">
            <Sidebar />
            <div className="main-content">
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/shorts" element={<Shorts />} />
                <Route path="/subscriptions" element={<Subscriptions />} />
                <Route path="/history" element={<History />} />
                <Route path="/watch-later" element={<Watchlater />} />
                <Route path="/liked-videos" element={<LikedVideos />} />
                <Route path="/upload" element={<Upload />} />
                
                <Route path="/trending" element={<Home category="trending" />} />
                <Route path="/music" element={<Home category="music" />} />
                <Route path="/films" element={<Home category="films" />} />
                <Route path="/live" element={<Home category="live" />} />
                <Route path="/gaming" element={<Home category="gaming" />} />
                <Route path="/news" element={<Home category="news" />} />
                <Route path="/sports" element={<Home category="sports" />} />
                <Route path="/learning" element={<Home category="learning" />} />
                <Route path="/fashion-beauty" element={<Home category="fashion" />} />
                
                <Route path="/category/:category" element={<Home />} />
                <Route path="/video/:id" element={<VideoPage />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/channel" element={<Home category="channel" />} />
                <Route path="/explore/:category" element={<Home />} />
              </Routes>
            </div>
          </div>
        </Router>
      </WatchProvider>
    </AuthProvider>

  );
}

export default App;