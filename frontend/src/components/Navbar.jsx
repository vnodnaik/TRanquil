import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogIn } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { toast } from 'sonner';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const location = useLocation();

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
  const [signupForm, setSignupForm] = useState({ name: '', email: '', password: '' });

  const handleLogin = (e) => {
    e.preventDefault();
    toast.success('Login functionality will be implemented soon!');
    setShowAuthDialog(false);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    toast.success('Signup functionality will be implemented soon!');
    setShowAuthDialog(false);
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
                <button
                  type="submit"
                  className="btn-primary w-full"
                  data-testid="login-submit-btn"
                >
                  Login
                </button>
              </form>
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