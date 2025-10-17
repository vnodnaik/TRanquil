import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogIn, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { toast } from 'sonner';
import axios from 'axios';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const location = useLocation();
  const { user, login, signup, logout } = useAuth();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Employer', path: '/for-employer' },
    { name: 'Job Seeker', path: '/for-employee' },
    { name: 'Job Search', path: '/jobs' },
    { name: 'Contact Us', path: '/contact' }
  ];

  const isActive = (path) => location.pathname === path;

  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ name: '', email: '', password: '', role: 'jobseeker' });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userData = await login(loginForm.email, loginForm.password);
      toast.success('Login successful!');
      setShowAuthDialog(false);
      
      // Redirect based on role
      if (userData.role === 'employer') {
        window.location.href = '/employer-dashboard';
      } else {
        window.location.href = '/jobseeker-dashboard';
      }
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userData = await signup(signupForm.name, signupForm.email, signupForm.password, signupForm.role);
      toast.success('Account created successfully!');
      setShowAuthDialog(false);
      
      // Redirect based on role
      if (userData.role === 'employer') {
        window.location.href = '/employer-dashboard';
      } else {
        window.location.href = '/jobseeker-dashboard';
      }
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Signup failed. Please try again.');
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
      const API = `${BACKEND_URL}/api`;
      
      await axios.post(`${API}/auth/forgot-password`, {
        email: forgotPasswordEmail
      });
      
      toast.success(`Password reset link sent to ${forgotPasswordEmail}. Please check your email.`);
      setShowForgotPassword(false);
      setForgotPasswordEmail('');
    } catch (error) {
      toast.error('Failed to send reset link. Please try again.');
    }
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    window.location.href = '/';
  };

  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-50" data-testid="navbar">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2" data-testid="logo-link">
              <div className="text-2xl font-bold">
                <span style={{ color: '#FF6B35' }}>Tranquil</span>
                <span className="text-gray-800"> Peeplz</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  data-testid={`nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    isActive(link.path)
                      ? 'text-white'
                      : 'text-gray-700 hover:text-white hover:bg-opacity-90'
                  }`}
                  style={{
                    backgroundColor: isActive(link.path) ? '#FF6B35' : 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive(link.path)) {
                      e.target.style.backgroundColor = '#FF6B35';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(link.path)) {
                      e.target.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  {link.name}
                </Link>
              ))}
              
              {user ? (
                <div className="flex items-center gap-3 ml-4">
                  <Link
                    to={user.role === 'employer' ? '/employer-dashboard' : '/jobseeker-dashboard'}
                    data-testid="dashboard-link"
                    className="px-4 py-2 rounded-lg font-medium text-white flex items-center gap-2 transition-colors"
                    style={{ backgroundColor: '#FF6B35' }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#E55A2B'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#FF6B35'}
                  >
                    <User size={18} />
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    data-testid="logout-nav-btn"
                    className="px-4 py-2 rounded-lg font-medium bg-gray-200 hover:bg-gray-300 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthDialog(true)}
                  data-testid="login-signup-btn"
                  className="ml-4 px-4 py-2 rounded-lg font-medium text-white flex items-center gap-2 transition-colors"
                  style={{ backgroundColor: '#FF6B35' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#E55A2B'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#FF6B35'}
                >
                  <LogIn size={18} />
                  Login / Sign Up
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              data-testid="mobile-menu-button"
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden py-4 border-t" data-testid="mobile-menu">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  data-testid={`mobile-nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`block px-4 py-3 rounded-lg font-medium mb-2 transition-colors ${
                    isActive(link.path)
                      ? 'text-white'
                      : 'text-gray-700'
                  }`}
                  style={{
                    backgroundColor: isActive(link.path) ? '#FF6B35' : '#F3F4F6'
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <button
                onClick={() => {
                  setShowAuthDialog(true);
                  setIsOpen(false);
                }}
                className="w-full px-4 py-3 rounded-lg font-medium text-white flex items-center justify-center gap-2 mt-2"
                style={{ backgroundColor: '#FF6B35' }}
                data-testid="mobile-login-signup-btn"
              >
                <LogIn size={18} />
                Login / Sign Up
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Auth Dialog */}
      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent className="sm:max-w-md" data-testid="auth-dialog">
          <DialogHeader>
            <DialogTitle>Welcome to Tranquil Peeplz</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login" data-testid="login-tab">Login</TabsTrigger>
              <TabsTrigger value="signup" data-testid="signup-tab">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="login" data-testid="login-form">
              {!showForgotPassword ? (
                <form onSubmit={handleLogin} className="space-y-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="login-email">
                      Email
                    </label>
                    <input
                      type="email"
                      id="login-email"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      data-testid="login-email-input"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="login-password">
                      Password
                    </label>
                    <input
                      type="password"
                      id="login-password"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      data-testid="login-password-input"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setShowForgotPassword(true)}
                      className="text-sm font-medium hover:underline"
                      style={{ color: '#FF6B35' }}
                      data-testid="forgot-password-link"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <button
                    type="submit"
                    className="btn-primary w-full"
                    data-testid="login-submit-btn"
                  >
                    Login
                  </button>
                </form>
              ) : (
                <form onSubmit={handleForgotPassword} className="space-y-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="forgot-email">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="forgot-email"
                      value={forgotPasswordEmail}
                      onChange={(e) => setForgotPasswordEmail(e.target.value)}
                      required
                      placeholder="Enter your email address"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      data-testid="forgot-password-email-input"
                    />
                  </div>
                  <p className="text-sm text-gray-600">
                    We'll send you a link to reset your password.
                  </p>
                  <button
                    type="submit"
                    className="btn-primary w-full"
                    data-testid="forgot-password-submit-btn"
                  >
                    Send Reset Link
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(false)}
                    className="w-full text-sm font-medium hover:underline"
                    style={{ color: '#FF6B35' }}
                    data-testid="back-to-login-btn"
                  >
                    Back to Login
                  </button>
                </form>
              )}
            </TabsContent>
            <TabsContent value="signup" data-testid="signup-form">
              <form onSubmit={handleSignup} className="space-y-4 mt-4">
                <div>
                  <label className="block text-sm font-medium mb-2" htmlFor="signup-name">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="signup-name"
                    value={signupForm.name}
                    onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    data-testid="signup-name-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" htmlFor="signup-email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="signup-email"
                    value={signupForm.email}
                    onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    data-testid="signup-email-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" htmlFor="signup-password">
                    Password
                  </label>
                  <input
                    type="password"
                    id="signup-password"
                    value={signupForm.password}
                    onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    data-testid="signup-password-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2" htmlFor="signup-role">
                    I am a
                  </label>
                  <select
                    id="signup-role"
                    value={signupForm.role}
                    onChange={(e) => setSignupForm({ ...signupForm, role: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    data-testid="signup-role-select"
                  >
                    <option value="jobseeker">Job Seeker</option>
                    <option value="employer">Employer</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="btn-primary w-full"
                  data-testid="signup-submit-btn"
                >
                  Sign Up
                </button>
              </form>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navbar;