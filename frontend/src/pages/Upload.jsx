import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { FaCloudUploadAlt, FaVideo, FaImage, FaTag, FaCheck, FaSpinner } from 'react-icons/fa';
import { ALL_VIDEOS } from '../services/api';

export default function Upload() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('music');
  const [videoUrl, setVideoUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [success, setSuccess] = useState(false);

  const sampleVideoPreset = () => {
    setVideoUrl('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4');
    setThumbnailUrl('https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80');
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !videoUrl.trim()) return;

    setIsUploading(true);
    setUploadProgress(20);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 25;
      });
    }, 200);

    const newVideo = {
      id: `user_video_${Date.now()}`,
      _id: `user_video_${Date.now()}`,
      snippet: {
        title: title.trim(),
        description: description.trim(),
        channelTitle: user ? user.name : 'Creative Studio',
        publishedAt: new Date().toISOString(),
        thumbnails: {
          medium: {
            url: thumbnailUrl.trim() || 'https://picsum.photos/320/180?random=888',
            width: 320,
            height: 180
          },
          high: {
            url: thumbnailUrl.trim() || 'https://picsum.photos/480/360?random=888',
            width: 480,
            height: 360
          }
        },
        tags: [category]
      },
      statistics: {
        viewCount: '1',
        likeCount: '0',
        commentCount: '0'
      },
      contentDetails: {
        duration: 'PT12M30S'
      },
      videoUrl: videoUrl.trim(),
      category
    };

    try {
      await axios.post('http://localhost:5002/api/videos', {
        title: title.trim(),
        description: description.trim(),
        videoUrl: videoUrl.trim(),
        thumbnailUrl: thumbnailUrl.trim(),
        category,
        channel: user ? user.name : 'Creative Studio'
      });
    } catch (err) {
      // Fallback local addition
    }

    setTimeout(() => {
      setUploadProgress(100);
      setIsUploading(false);
      setSuccess(true);
      ALL_VIDEOS.unshift(newVideo);

      setTimeout(() => {
        navigate(`/video/${newVideo.id}`);
      }, 1500);
    }, 1200);
  };

  return (
    <div style={{ maxWidth: '840px', margin: '0 auto', padding: '32px 16px', color: '#fff' }}>
      <div style={{
        backgroundColor: '#1f1f1f',
        borderRadius: '16px',
        padding: '32px',
        border: '1px solid #333',
        boxShadow: '0 12px 32px rgba(0,0,0,0.5)'
      }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', borderBottom: '1px solid #333', paddingBottom: '16px' }}>
          <FaCloudUploadAlt style={{ color: '#cc0000', fontSize: '32px' }} />
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Upload Video</h1>
            <p style={{ color: '#aaa', fontSize: '13px', margin: 0 }}>Share your content with millions of viewers</p>
          </div>
        </div>

        {/* Success Alert */}
        {success && (
          <div style={{ backgroundColor: 'rgba(74, 222, 128, 0.15)', border: '1px solid #4ade80', color: '#4ade80', padding: '14px 18px', borderRadius: '12px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FaCheck style={{ fontSize: '18px' }} />
            <span>Video published successfully! Redirecting to video page...</span>
          </div>
        )}

        <form onSubmit={handleUploadSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Title */}
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '6px' }}>Video Title *</label>
            <input
              type="text"
              placeholder="e.g. Building a Fullstack React App in 2026"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{
                width: '100%',
                backgroundColor: '#121212',
                border: '1px solid #3b3b3b',
                borderRadius: '8px',
                padding: '12px 14px',
                color: '#fff',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Description */}
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '6px' }}>Description</label>
            <textarea
              placeholder="Tell viewers about your video..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              style={{
                width: '100%',
                backgroundColor: '#121212',
                border: '1px solid #3b3b3b',
                borderRadius: '8px',
                padding: '12px 14px',
                color: '#fff',
                fontSize: '14px',
                outline: 'none',
                resize: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Category */}
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '6px' }}>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{
                width: '100%',
                backgroundColor: '#121212',
                border: '1px solid #3b3b3b',
                borderRadius: '8px',
                padding: '12px 14px',
                color: '#fff',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            >
              <option value="music">🎵 Music</option>
              <option value="tech">💻 Tech & Coding</option>
              <option value="gaming">🎮 Gaming</option>
              <option value="education">📚 Education & Learning</option>
              <option value="entertainment">🎬 Entertainment</option>
              <option value="news">📰 News & Politics</option>
              <option value="sports">⚽ Sports</option>
            </select>
          </div>

          {/* Video URL & Preset Button */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label style={{ fontSize: '14px', fontWeight: 'bold' }}>Video Stream / File URL *</label>
              <button
                type="button"
                onClick={sampleVideoPreset}
                style={{ background: 'none', border: 'none', color: '#3ea6ff', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                ⚡ Autofill Sample MP4
              </button>
            </div>
            <input
              type="text"
              placeholder="https://commondatastorage.googleapis.com/.../sample.mp4"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              required
              style={{
                width: '100%',
                backgroundColor: '#121212',
                border: '1px solid #3b3b3b',
                borderRadius: '8px',
                padding: '12px 14px',
                color: '#fff',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Thumbnail URL */}
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', marginBottom: '6px' }}>Thumbnail Image URL</label>
            <input
              type="text"
              placeholder="https://images.unsplash.com/.../thumbnail.jpg"
              value={thumbnailUrl}
              onChange={(e) => setThumbnailUrl(e.target.value)}
              style={{
                width: '100%',
                backgroundColor: '#121212',
                border: '1px solid #3b3b3b',
                borderRadius: '8px',
                padding: '12px 14px',
                color: '#fff',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Live Preview Box */}
          {thumbnailUrl && (
            <div style={{ marginTop: '12px' }}>
              <label style={{ display: 'block', fontSize: '12px', color: '#aaa', marginBottom: '6px' }}>Thumbnail Preview</label>
              <div style={{ width: '280px', height: '158px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #333' }}>
                <img src={thumbnailUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
          )}

          {/* Progress Bar */}
          {isUploading && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#aaa', marginBottom: '4px' }}>
                <span>Uploading to YouTube Clone...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div style={{ width: '100%', height: '6px', backgroundColor: '#333', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: `${uploadProgress}%`, height: '100%', backgroundColor: '#cc0000', transition: 'width 0.2s' }} />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isUploading}
            style={{
              backgroundColor: isUploading ? '#555' : '#cc0000',
              color: '#ffffff',
              fontWeight: 'bold',
              fontSize: '15px',
              padding: '14px',
              borderRadius: '24px',
              border: 'none',
              cursor: isUploading ? 'default' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '12px'
            }}
          >
            {isUploading ? (
              <>
                <FaSpinner style={{ animation: 'spin 1s linear infinite' }} /> Publishing Video...
              </>
            ) : (
              'Publish Video'
            )}
          </button>
        </form>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}