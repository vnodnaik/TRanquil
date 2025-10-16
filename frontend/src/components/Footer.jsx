import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-auto" data-testid="footer">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              <span style={{ color: '#FF6B35' }}>Tranquil</span> Peeplz
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Your trusted partner in recruitment and staffing solutions. Connecting talent with opportunity.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-orange-500 transition-colors" data-testid="social-linkedin">
                <Linkedin size={20} />
              </a>
              <a href="#" className="hover:text-orange-500 transition-colors" data-testid="social-twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-orange-500 transition-colors" data-testid="social-facebook">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-orange-500 transition-colors text-sm" data-testid="footer-link-about">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="text-gray-400 hover:text-orange-500 transition-colors text-sm" data-testid="footer-link-jobs">
                  Job Search
                </Link>
              </li>
              <li>
                <Link to="/for-employer" className="text-gray-400 hover:text-orange-500 transition-colors text-sm" data-testid="footer-link-employer">
                  For Employers
                </Link>
              </li>
              <li>
                <Link to="/for-employee" className="text-gray-400 hover:text-orange-500 transition-colors text-sm" data-testid="footer-link-employee">
                  For Job Seekers
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="hover:text-orange-500 transition-colors cursor-pointer">Permanent Recruitment</li>
              <li className="hover:text-orange-500 transition-colors cursor-pointer">Temporary Staffing</li>
              <li className="hover:text-orange-500 transition-colors cursor-pointer">Executive Search</li>
              <li className="hover:text-orange-500 transition-colors cursor-pointer">Contract Recruitment</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2 text-gray-400">
                <MapPin size={18} className="mt-1 flex-shrink-0" style={{ color: '#FF6B35' }} />
                <span>123 Business Avenue, Suite 100, New York, NY 10001</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <Phone size={18} style={{ color: '#FF6B35' }} />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <Mail size={18} style={{ color: '#FF6B35' }} />
                <span>contact@tranquilpeeplz.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Tranquil Peeplz. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;