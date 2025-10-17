import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Home = () => {
  const [industries, setIndustries] = useState([]);

  useEffect(() => {
    fetchIndustries();
  }, []);

  const fetchIndustries = async () => {
    try {
      const response = await axios.get(`${API}/industries`);
      setIndustries(response.data);
    } catch (error) {
      console.error('Error fetching industries:', error);
    }
  };

  const allIndustries = [
    { name: 'Technology', icon: 'laptop' },
    { name: 'Healthcare', icon: 'heart-pulse' },
    { name: 'Finance', icon: 'building-columns' },
    { name: 'Manufacturing', icon: 'industry' },
    { name: 'Retail', icon: 'shopping-cart' },
    { name: 'Education', icon: 'graduation-cap' },
    { name: 'Hospitality', icon: 'utensils' },
    { name: 'Construction', icon: 'hard-hat' },
    { name: 'Transportation', icon: 'truck' },
    { name: 'Real Estate', icon: 'building' },
    { name: 'Legal', icon: 'scale-balanced' },
    { name: 'Media', icon: 'film' }
  ];

  return (
    <div className="home-page" data-testid="home-page">
      {/* Hero Section */}
      <section
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1758518731694-41ea7fa6a2d9)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
        data-testid="hero-section"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/70"></div>
        <div className="container mx-auto px-4 relative z-10 text-white">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 fade-in-up" data-testid="hero-title">
              Find Your Perfect Match in{' '}
              <span style={{ color: '#FF6B35' }}>Recruitment & Staffing</span>
            </h1>
            <p className="text-lg mb-8 text-gray-200" data-testid="hero-subtitle">
              Connecting exceptional talent with outstanding opportunities. Whether you're hiring or job hunting, we make it seamless.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/jobs" data-testid="hero-find-jobs-btn">
                <button className="btn-primary flex items-center justify-center gap-2 w-full sm:w-auto">
                  Find Jobs <ArrowRight size={20} />
                </button>
              </Link>
              <Link to="/for-employer" data-testid="hero-hire-talent-btn">
                <button className="btn-secondary w-full sm:w-auto">
                  Hire Talent
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="section-padding bg-gray-50" data-testid="services-section">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4" data-testid="services-title">
            Our Services
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Comprehensive recruitment and staffing solutions tailored to your needs
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card p-8" data-testid="service-recruitment">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#FF6B35' }}>
                <i className="fas fa-users text-white text-3xl"></i>
              </div>
              <h3 className="text-2xl font-semibold mb-3">Recruitment</h3>
              <p className="text-gray-600 mb-4">
                Find the perfect candidates for permanent positions across all industries. Our expert recruiters understand your needs and deliver quality talent.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle2 size={18} style={{ color: '#FF6B35' }} />
                  Executive Search
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle2 size={18} style={{ color: '#FF6B35' }} />
                  Permanent Placement
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle2 size={18} style={{ color: '#FF6B35' }} />
                  Volume Recruitment
                </li>
              </ul>
              <Link to="/recruitment" data-testid="recruitment-learn-more">
                <button className="btn-primary flex items-center gap-2">
                  Learn More <ArrowRight size={18} />
                </button>
              </Link>
            </div>
            <div className="card p-8" data-testid="service-staffing">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#FF6B35' }}>
                <i className="fas fa-briefcase text-white text-3xl"></i>
              </div>
              <h3 className="text-2xl font-semibold mb-3">Staffing</h3>
              <p className="text-gray-600 mb-4">
                Flexible staffing solutions for temporary, contract, and project-based needs. Scale your workforce efficiently with our reliable temp staffing.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle2 size={18} style={{ color: '#FF6B35' }} />
                  Temporary Staffing
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle2 size={18} style={{ color: '#FF6B35' }} />
                  Contract-to-Hire
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <CheckCircle2 size={18} style={{ color: '#FF6B35' }} />
                  Project-Based Staffing
                </li>
              </ul>
              <Link to="/staffing" data-testid="staffing-learn-more">
                <button className="btn-primary flex items-center gap-2">
                  Learn More <ArrowRight size={18} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section-padding" data-testid="how-it-works-section">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4" data-testid="how-it-works-title">
            How It Works
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Simple, efficient, and transparent recruitment process
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center" data-testid="step-1">
              <div className="mb-6 flex justify-center">
                <img
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=300&h=300&fit=crop"
                  alt="Share Your Needs"
                  className="w-48 h-48 object-cover rounded-lg shadow-lg"
                />
              </div>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#FF6B35' }}>
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Share Your Needs</h3>
              <p className="text-gray-600">
                Tell us about your hiring requirements or career goals. We listen carefully to understand exactly what you need.
              </p>
            </div>
            <div className="text-center" data-testid="step-2">
              <div className="mb-6 flex justify-center">
                <img
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&h=300&fit=crop"
                  alt="We Find Matches"
                  className="w-48 h-48 object-cover rounded-lg shadow-lg"
                />
              </div>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#FF6B35' }}>
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">We Find Matches</h3>
              <p className="text-gray-600">
                Our expert team leverages our extensive network and advanced tools to find the perfect matches quickly.
              </p>
            </div>
            <div className="text-center" data-testid="step-3">
              <div className="mb-6 flex justify-center">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop"
                  alt="Interview Process"
                  className="w-48 h-48 object-cover rounded-lg shadow-lg"
                />
              </div>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#FF6B35' }}>
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Interview & Select</h3>
              <p className="text-gray-600">
                We coordinate interviews and help you evaluate candidates to make the best selection.
              </p>
            </div>
            <div className="text-center" data-testid="step-4">
              <div className="mb-6 flex justify-center">
                <img
                  src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=300&h=300&fit=crop"
                  alt="Start Working"
                  className="w-48 h-48 object-cover rounded-lg shadow-lg"
                />
              </div>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#FF6B35' }}>
                <span className="text-2xl font-bold text-white">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Start Working</h3>
              <p className="text-gray-600">
                We facilitate the entire process from interviews to onboarding, ensuring a smooth transition.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Short Section */}
      <section className="section-padding" data-testid="about-us-short-section">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              About <span style={{ color: '#FF6B35' }}>Tranquil Peeplz</span>
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Founded in 2009, Tranquil Peeplz has been a trusted partner in connecting exceptional talent with outstanding opportunities. 
              With over 15 years of excellence in the recruitment industry, we've successfully placed thousands of candidates in roles 
              where they thrive and helped countless companies build exceptional teams. Our success stems from our unwavering commitment 
              to understanding both our clients' needs and our candidates' aspirations.
            </p>
            <Link to="/about" data-testid="learn-more-about-btn">
              <button className=\"btn-primary\">Learn More About Us</button>
            </Link>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="section-padding bg-gray-50" data-testid="industries-section">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4" data-testid="industries-title">
            Industries We Cater To
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Specialized recruitment across diverse sectors
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allIndustries.map((industry, index) => (
              <div key={index} className="card p-6 text-center" data-testid={`industry-${industry.name.toLowerCase()}`}>
                <div className="text-4xl mb-3" style={{ color: '#FF6B35' }}>
                  <i className={`fas fa-${industry.icon}`}></i>
                </div>
                <h4 className="font-semibold">{industry.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding" data-testid="why-choose-section">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1709715357520-5e1047a2b691"
                alt="Team collaboration"
                className="rounded-lg shadow-xl"
                data-testid="why-choose-image"
              />
            </div>
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6" data-testid="why-choose-title">
                Why Choose <span style={{ color: '#FF6B35' }}>Tranquil Peeplz</span>
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4" data-testid="reason-1">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FFF5F2' }}>
                      <i className="fas fa-chart-line" style={{ color: '#FF6B35' }}></i>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Proven Track Record</h3>
                    <p className="text-gray-600">
                      15+ years of excellence in recruitment with thousands of successful placements across industries.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4" data-testid="reason-2">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FFF5F2' }}>
                      <i className="fas fa-users" style={{ color: '#FF6B35' }}></i>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Expert Team</h3>
                    <p className="text-gray-600">
                      Our dedicated recruitment specialists have deep industry knowledge and extensive networks.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4" data-testid="reason-3">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FFF5F2' }}>
                      <i className="fas fa-building" style={{ color: '#FF6B35' }}></i>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Quality Assured</h3>
                    <p className="text-gray-600">
                      Rigorous screening process ensures only the best candidates reach your desk.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solving Challenges Section */}
      <section className="section-padding bg-gray-50" data-testid="challenges-section">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4" data-testid="challenges-title">
            Solving Your Hiring Challenges
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            We understand the complexities of modern recruitment
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card p-6" data-testid="challenge-1">
              <h3 className="text-xl font-semibold mb-3">Time-Consuming Process</h3>
              <p className="text-gray-600">
                <strong style={{ color: '#FF6B35' }}>Challenge:</strong> Sorting through hundreds of resumes and conducting endless interviews.
                <br /><br />
                <strong style={{ color: '#FF6B35' }}>Solution:</strong> We pre-screen and present only qualified candidates, saving you valuable time.
              </p>
            </div>
            <div className="card p-6" data-testid="challenge-2">
              <h3 className="text-xl font-semibold mb-3">Skills Gap</h3>
              <p className="text-gray-600">
                <strong style={{ color: '#FF6B35' }}>Challenge:</strong> Finding candidates with the exact skills and experience you need.
                <br /><br />
                <strong style={{ color: '#FF6B35' }}>Solution:</strong> Our specialized recruiters have access to niche talent pools and passive candidates.
              </p>
            </div>
            <div className="card p-6" data-testid="challenge-3">
              <h3 className="text-xl font-semibold mb-3">High Turnover</h3>
              <p className="text-gray-600">
                <strong style={{ color: '#FF6B35' }}>Challenge:</strong> New hires leaving within the first year, costing time and money.
                <br /><br />
                <strong style={{ color: '#FF6B35' }}>Solution:</strong> Cultural fit assessment ensures long-term successful placements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="section-padding text-white text-center"
        style={{
          backgroundImage: 'linear-gradient(135deg, #FF6B35 0%, #E55A2B 100%)'
        }}
        data-testid="cta-section"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6" data-testid="cta-title">
            Ready to Get Started?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Whether you're looking to hire top talent or find your dream job, we're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" data-testid="cta-contact-btn">
              <button className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Contact Us Today
              </button>
            </Link>
            <Link to="/jobs" data-testid="cta-browse-jobs-btn">
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-all">
                Browse Jobs
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;