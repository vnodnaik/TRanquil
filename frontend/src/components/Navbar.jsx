import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'For Employer', path: '/for-employer' },
    { name: 'For Employee', path: '/for-employee' },
    { name: 'Job Search', path: '/jobs' },
    { name: 'Contact Us', path: '/contact' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
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
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;