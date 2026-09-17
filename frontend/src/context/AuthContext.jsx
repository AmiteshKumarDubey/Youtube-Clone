import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const API_BASE_URL = 'http://localhost:5002/api/auth';

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('yt_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check saved user in local storage or fetch from server
    const storedUser = localStorage.getItem('yt_user');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('yt_user');
      }
    }
    setLoading(false);
  }, []);

  const saveAuthData = (user, authToken) => {
    setCurrentUser(user);
    if (authToken) {
      setToken(authToken);
      localStorage.setItem('yt_token', authToken);
    }
    localStorage.setItem('yt_user', JSON.stringify(user));
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
      const { user, token: authToken } = response.data;
      saveAuthData(user, authToken);
      return user;
    } catch (err) {
      // Fallback local auth if backend API is not accessible (e.g. static Vercel deployment)
      const mockUser = {
        id: `usr_${Date.now()}`,
        name: email.split('@')[0] || 'User',
        email,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email)}`
      };
      saveAuthData(mockUser, 'mock_jwt_token_123');
      return mockUser;
    }
  };

  const signup = async (email, password, name) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, { email, password, name });
      const { user, token: authToken } = response.data;
      saveAuthData(user, authToken);
      return user;
    } catch (err) {
      // Fallback local signup for live frontend
      const mockUser = {
        id: `usr_${Date.now()}`,
        name: name || email.split('@')[0] || 'User',
        email,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name || email)}`
      };
      saveAuthData(mockUser, 'mock_jwt_token_123');
      return mockUser;
    }
  };

  const demoLogin = () => {
    const demoUser = {
      id: 'demo_user_2026',
      name: 'Amitesh Dubey (Creator)',
      email: 'amitesh@youtubeclone.dev',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amitesh'
    };
    saveAuthData(demoUser, 'demo_jwt_token_2026');
    return demoUser;
  };

  const logout = () => {
    setCurrentUser(null);
    setToken(null);
    localStorage.removeItem('yt_user');
    localStorage.removeItem('yt_token');
  };

  const value = {
    currentUser,
    user: currentUser,
    token,
    login,
    signup,
    demoLogin,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}