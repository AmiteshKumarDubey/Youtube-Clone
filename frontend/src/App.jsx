import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import VideoPage from './pages/VideoPage';
import SearchResults from './pages/SearchResults';
import './styles/Home.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
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
            <Route path="/history" element={<Home category="history" />} />
            <Route path="/watch-later" element={<Home category="watch-later" />} />
            <Route path="/liked-videos" element={<Home category="liked-videos" />} />
            <Route path="/explore/:category" element={<Home />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;