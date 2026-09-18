import React, { useState, useEffect, useRef } from 'react';
import { 
  FaThumbsUp, 
  FaThumbsDown, 
  FaCommentDots, 
  FaShare, 
  FaVolumeMute, 
  FaVolumeUp, 
  FaChevronUp, 
  FaChevronDown, 
  FaMusic,
  FaPlay,
  FaPause,
  FaPaperPlane,
  FaTimes,
  FaCheck
} from 'react-icons/fa';
import { getShortsVideos } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Shorts() {
  const [shorts, setShorts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [commentsList, setCommentsList] = useState({});
  const [newComment, setNewComment] = useState('');
  const { user } = useAuth();
  const videoRef = useRef(null);

  useEffect(() => {
    const data = getShortsVideos();
    setShorts(data);
    
    // Initial mock comments
    const initialComments = {};
    data.forEach(item => {
      initialComments[item._id] = [
        { id: 1, user: 'DevGuy', text: 'This trick saved me so much time! 🔥', time: '2 hours ago' },
        { id: 2, user: 'ReactFan', text: 'Cleanest code setup ever! 🚀', time: '5 hours ago' }
      ];
    });
    setCommentsList(initialComments);
  }, []);

  const currentShort = shorts[currentIndex];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      }
    }
  }, [currentIndex]);

  // Keyboard navigation (Up/Down arrows)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (showComments) return;
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        handlePrevious();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        handleNext();
      } else if (e.key === ' ') {
        e.preventDefault();
        togglePlayPause();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isPlaying, showComments, shorts.length]);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 2500);
  };

  const handleNext = () => {
    if (currentIndex < shorts.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsPlaying(true);
    } else {
      setCurrentIndex(0); // loop back to first
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setIsPlaying(true);
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleLike = () => {
    if (!currentShort) return;
    const updated = [...shorts];
    const item = updated[currentIndex];
    if (item.isLiked) {
      item.isLiked = false;
      item.likes -= 1;
    } else {
      item.isLiked = true;
      item.likes += 1;
      triggerToast('Added to Liked Shorts ❤️');
    }
    setShorts(updated);
  };

  const toggleSubscribe = () => {
    if (!currentShort) return;
    const updated = [...shorts];
    const item = updated[currentIndex];
    item.isSubscribed = !item.isSubscribed;
    triggerToast(item.isSubscribed ? `Subscribed to ${item.channel}!` : `Unsubscribed`);
    setShorts(updated);
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    triggerToast('🔗 Link copied to clipboard!');
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim() || !currentShort) return;

    const shortId = currentShort._id;
    const commentObj = {
      id: Date.now(),
      user: user ? user.name : 'Guest User',
      text: newComment.trim(),
      time: 'Just now'
    };

    setCommentsList(prev => ({
      ...prev,
      [shortId]: [commentObj, ...(prev[shortId] || [])]
    }));

    // Update comment count
    const updated = [...shorts];
    updated[currentIndex].commentsCount += 1;
    setShorts(updated);

    setNewComment('');
  };

  const formatCount = (num) => {
    if (!num) return '0';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  if (!currentShort) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', color: '#fff' }}>
        Loading Shorts...
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 'calc(100vh - 60px)',
      backgroundColor: '#0f0f0f',
      position: 'relative',
      padding: '16px 0',
      userSelect: 'none'
    }}>
      
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          top: '70px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#3ea6ff',
          color: '#0f0f0f',
          padding: '10px 20px',
          borderRadius: '20px',
          fontWeight: 'bold',
          fontSize: '14px',
          zIndex: 3000,
          boxShadow: '0 4px 14px rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          {toastMessage}
        </div>
      )}

      {/* Shorts Player Container */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: '16px',
        maxWidth: '520px',
        width: '100%',
        justifyContent: 'center',
        position: 'relative'
      }}>
        
        {/* Main 9:16 Video Frame */}
        <div 
          style={{
            position: 'relative',
            width: '360px',
            height: '640px',
            backgroundColor: '#000',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
            cursor: 'pointer',
            border: '1px solid #222'
          }}
          onClick={togglePlayPause}
        >
          <video
            ref={videoRef}
            src={currentShort.videoUrl}
            loop
            muted={isMuted}
            autoPlay
            playsInline
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />

          {/* Pause overlay icon */}
          {!isPlaying && (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'rgba(0,0,0,0.6)',
              padding: '20px',
              borderRadius: '50%',
              color: '#fff',
              fontSize: '24px',
              zIndex: 10,
              pointerEvents: 'none'
            }}>
              <FaPlay />
            </div>
          )}

          {/* Top Bar Controls */}
          <div style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            right: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 15
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', fontWeight: 'bold', fontSize: '15px' }}>
              <span style={{ color: '#ff0000', fontSize: '18px' }}>⚡</span> Shorts
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMuted(!isMuted);
              }}
              style={{
                background: 'rgba(0,0,0,0.5)',
                border: 'none',
                color: '#fff',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                fontSize: '16px'
              }}
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
            </button>
          </div>

          {/* Bottom Video Information Gradient & Overlay */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '20px 16px 16px 16px',
            background: 'linear-gradient(to top, rgba(0,0,0,0.95), rgba(0,0,0,0.4), transparent)',
            zIndex: 15,
            color: '#fff'
          }}>
            {/* Channel Info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <img
                src={currentShort.channelAvatar}
                alt={currentShort.channel}
                style={{ width: '38px', height: '38px', borderRadius: '50%', border: '1.5px solid #fff' }}
              />
              <span style={{ fontWeight: 'bold', fontSize: '14px' }}>@{currentShort.channel}</span>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSubscribe();
                }}
                style={{
                  backgroundColor: currentShort.isSubscribed ? '#333' : '#cc0000',
                  color: '#fff',
                  border: 'none',
                  padding: '6px 14px',
                  borderRadius: '18px',
                  fontWeight: 'bold',
                  fontSize: '12px',
                  cursor: 'pointer',
                  marginLeft: '4px',
                  transition: 'background 0.2s'
                }}
              >
                {currentShort.isSubscribed ? 'Subscribed' : 'Subscribe'}
              </button>
            </div>

            {/* Video Caption */}
            <p style={{
              fontSize: '13.5px',
              lineHeight: '1.4',
              marginBottom: '10px',
              textShadow: '0 1px 2px rgba(0,0,0,0.8)'
            }}>
              {currentShort.title}
            </p>

            {/* Audio Track info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#ccc' }}>
              <FaMusic style={{ fontSize: '11px' }} />
              <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '240px' }}>
                {currentShort.audioTitle}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons Column (Right Side of Short) */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
          alignItems: 'center',
          paddingBottom: '12px'
        }}>
          {/* Like */}
          <button
            onClick={toggleLike}
            style={{
              background: 'none',
              border: 'none',
              color: currentShort.isLiked ? '#ff4d4d' : '#fff',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              fontSize: '22px'
            }}
          >
            <div style={{
              backgroundColor: currentShort.isLiked ? 'rgba(255, 77, 77, 0.2)' : '#272727',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '4px',
              transition: 'transform 0.2s'
            }}>
              <FaThumbsUp />
            </div>
            <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#fff' }}>{formatCount(currentShort.likes)}</span>
          </button>

          {/* Dislike */}
          <button
            onClick={() => triggerToast('Feedback submitted')}
            style={{
              background: 'none',
              border: 'none',
              color: '#fff',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              fontSize: '20px'
            }}
          >
            <div style={{
              backgroundColor: '#272727',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '4px'
            }}>
              <FaThumbsDown />
            </div>
            <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#fff' }}>Dislike</span>
          </button>

          {/* Comments */}
          <button
            onClick={() => setShowComments(true)}
            style={{
              background: 'none',
              border: 'none',
              color: '#fff',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              fontSize: '20px'
            }}
          >
            <div style={{
              backgroundColor: '#272727',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '4px'
            }}>
              <FaCommentDots />
            </div>
            <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#fff' }}>{formatCount(currentShort.commentsCount)}</span>
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            style={{
              background: 'none',
              border: 'none',
              color: '#fff',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              fontSize: '20px'
            }}
          >
            <div style={{
              backgroundColor: '#272727',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '4px'
            }}>
              <FaShare />
            </div>
            <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#fff' }}>Share</span>
          </button>

          {/* Rotating Audio Vinyl Icon */}
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '8px',
            border: '2px solid #333',
            overflow: 'hidden',
            animation: isPlaying ? 'spin 5s linear infinite' : 'none',
            marginTop: '8px'
          }}>
            <img src={currentShort.channelAvatar} alt="disc" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          {/* Up & Down Scroll Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              style={{
                backgroundColor: '#272727',
                border: 'none',
                color: currentIndex === 0 ? '#555' : '#fff',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: currentIndex === 0 ? 'default' : 'pointer'
              }}
              title="Previous Short (Up Arrow)"
            >
              <FaChevronUp />
            </button>

            <button
              onClick={handleNext}
              style={{
                backgroundColor: '#272727',
                border: 'none',
                color: '#fff',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              title="Next Short (Down Arrow)"
            >
              <FaChevronDown />
            </button>
          </div>
        </div>
      </div>

      {/* Slide-over Comments Drawer */}
      {showComments && (
        <div style={{
          position: 'fixed',
          bottom: 0,
          right: 0,
          top: '56px',
          width: '380px',
          backgroundColor: '#181818',
          borderLeft: '1px solid #333',
          zIndex: 2500,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-6px 0 20px rgba(0,0,0,0.8)'
        }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 20px',
            borderBottom: '1px solid #2b2b2b'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff' }}>
              Comments ({commentsList[currentShort._id]?.length || 0})
            </h3>
            <button
              onClick={() => setShowComments(false)}
              style={{ background: 'none', border: 'none', color: '#aaa', fontSize: '18px', cursor: 'pointer' }}
            >
              <FaTimes />
            </button>
          </div>

          {/* Comment List */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {(commentsList[currentShort._id] || []).map(comment => (
              <div key={comment.id} style={{ display: 'flex', gap: '12px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: '#cc0000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  color: '#fff',
                  fontSize: '14px',
                  flexShrink: 0
                }}>
                  {comment.user.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '2px' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '13px', color: '#fff' }}>{comment.user}</span>
                    <span style={{ fontSize: '11px', color: '#777' }}>{comment.time}</span>
                  </div>
                  <p style={{ fontSize: '13.5px', color: '#ddd', lineHeight: '1.4' }}>{comment.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input Box */}
          <form onSubmit={handleAddComment} style={{ padding: '16px', borderTop: '1px solid #2b2b2b', display: 'flex', gap: '8px' }}>
            <input
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              style={{
                flex: 1,
                backgroundColor: '#222',
                border: '1px solid #3b3b3b',
                borderRadius: '20px',
                padding: '10px 14px',
                color: '#fff',
                fontSize: '14px',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: '#3ea6ff',
                color: '#0f0f0f',
                border: 'none',
                borderRadius: '50%',
                width: '38px',
                height: '38px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}

      {/* Animation keyframes for vinyl spin */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
