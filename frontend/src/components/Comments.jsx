import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { FaThumbsUp, FaTrash, FaPaperPlane, FaUserCircle } from 'react-icons/fa';

export default function Comments({ videoId }) {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState('');
  const [loading, setLoading] = useState(false);

  const initialMockComments = [
    {
      _id: 'c_101',
      username: 'CodeWithHarry',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Harry',
      text: 'Great video breakdown! Thanks for putting this together. 🚀',
      likes: 142,
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
    },
    {
      _id: 'c_102',
      username: 'TechEnthusiast',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TechEnthusiast',
      text: 'Super helpful content! Looking forward to the next upload.',
      likes: 45,
      createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
    }
  ];

  useEffect(() => {
    fetchComments();
  }, [videoId]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:5002/api/comments/${videoId}`);
      if (response.data && response.data.length > 0) {
        setComments(response.data);
      } else {
        setComments(initialMockComments);
      }
    } catch (err) {
      setComments(initialMockComments);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const username = user ? user.name : 'Guest User';
    const avatar = user ? user.avatar : `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(username)}`;

    const commentData = {
      _id: `c_${Date.now()}`,
      video: videoId,
      text: newCommentText.trim(),
      username,
      avatar,
      likes: 0,
      createdAt: new Date().toISOString()
    };

    setComments(prev => [commentData, ...prev]);
    setNewCommentText('');

    try {
      await axios.post(`http://localhost:5002/api/comments/${videoId}`, commentData);
    } catch (err) {
      // Fallback local state already updated
    }
  };

  const handleLikeComment = (commentId) => {
    setComments(prev => prev.map(c => {
      if (c._id === commentId) {
        return { ...c, likes: (c.likes || 0) + 1 };
      }
      return c;
    }));
    axios.post(`http://localhost:5002/api/comments/like/${commentId}`).catch(() => {});
  };

  const handleDeleteComment = (commentId) => {
    setComments(prev => prev.filter(c => c._id !== commentId));
    axios.delete(`http://localhost:5002/api/comments/${commentId}`).catch(() => {});
  };

  const formatTime = (isoString) => {
    if (!isoString) return 'recently';
    const diffHours = Math.floor((new Date() - new Date(isoString)) / (1000 * 60 * 60));
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours} hours ago`;
    const days = Math.floor(diffHours / 24);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  };

  return (
    <div style={{ marginTop: '32px', borderTop: '1px solid #272727', paddingTop: '24px', color: '#fff' }}>
      <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        Comments <span style={{ fontSize: '15px', color: '#aaa', fontWeight: 'normal' }}>({comments.length})</span>
      </h3>

      {/* Comment Form */}
      <form onSubmit={handleAddComment} style={{ display: 'flex', gap: '14px', marginBottom: '32px', alignItems: 'flex-start' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', backgroundColor: '#3ea6ff', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {user?.avatar ? (
            <img src={user.avatar} alt="User" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <FaUserCircle style={{ fontSize: '24px', color: '#0f0f0f' }} />
          )}
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input
            type="text"
            placeholder="Add a comment..."
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            style={{
              width: '100%',
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: '1px solid #3b3b3b',
              padding: '8px 0',
              color: '#fff',
              fontSize: '14px',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />

          {newCommentText.trim() && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setNewCommentText('')}
                style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer', padding: '8px 16px', borderRadius: '18px', fontWeight: 'bold' }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{ backgroundColor: '#3ea6ff', color: '#0f0f0f', border: 'none', padding: '8px 20px', borderRadius: '18px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <FaPaperPlane style={{ fontSize: '12px' }} /> Comment
              </button>
            </div>
          )}
        </div>
      </form>

      {/* Comments List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {comments.map(comment => (
          <div key={comment._id} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
            <img
              src={comment.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.username}`}
              alt={comment.username}
              style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0, backgroundColor: '#272727' }}
            />

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span style={{ fontWeight: 'bold', fontSize: '13.5px', color: '#fff' }}>@{comment.username}</span>
                <span style={{ fontSize: '12px', color: '#aaa' }}>{formatTime(comment.createdAt)}</span>
              </div>

              <p style={{ fontSize: '14px', color: '#eee', lineHeight: '1.4', margin: '0 0 8px 0' }}>{comment.text}</p>

              {/* Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#aaa', fontSize: '13px' }}>
                <button
                  onClick={() => handleLikeComment(comment._id)}
                  style={{ background: 'none', border: 'none', color: '#aaa', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
                >
                  <FaThumbsUp style={{ fontSize: '13px' }} />
                  <span>{comment.likes || 0}</span>
                </button>

                {(user?.name === comment.username || comment._id.startsWith('c_')) && (
                  <button
                    onClick={() => handleDeleteComment(comment._id)}
                    style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', fontSize: '13px' }}
                    title="Delete Comment"
                  >
                    <FaTrash />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}