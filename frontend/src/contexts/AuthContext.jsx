import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      fetchCurrentUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get(`${API}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const response = await axios.post(`${API}/auth/login`, { email, password });
    const { access_token, user: userData } = response.data;
    setToken(access_token);
    setUser(userData);
    localStorage.setItem('token', access_token);
    return userData;
  };

  const signup = async (name, email, password, role) => {
    const response = await axios.post(`${API}/auth/signup`, {
      name,
      email,
      password,
      role
    });
    const { access_token, user: userData } = response.data;
    setToken(access_token);
    setUser(userData);
    localStorage.setItem('token', access_token);
    return userData;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  const switchRole = async () => {
    try {
      const response = await axios.put(
        `${API}/auth/switch-role`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchCurrentUser();
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const response = await axios.put(
        `${API}/auth/profile`,
        profileData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const value = {
    user,
    token,
    loading,
    login,
    signup,
    logout,
    switchRole,
    updateProfile,
    isAuthenticated: !!user,
    isEmployer: user?.role === 'employer',
    isJobSeeker: user?.role === 'jobseeker'
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};