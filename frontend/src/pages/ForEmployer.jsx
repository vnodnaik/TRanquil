import React, { useState } from 'react';
import { Building2, Users, Clock, Award, CheckCircle2, TrendingUp, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ForEmployer = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    salary_range: '',
    job_type: 'Full-time',
    category: '',
    company: '',
    requirements: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const requirementsArray = formData.requirements
        .split('\n')
        .filter(req => req.trim() !== '');

      await axios.post(`${API}/jobs`, {
        ...formData,
        requirements: requirementsArray
      });

      toast.success('Job posted successfully!');
      setFormData({
        title: '',
        description: '',
        location: '',
        salary_range: '',
        job_type: 'Full-time',
        category: '',
        company: '',
        requirements: ''
      });
    } catch (error) {
      console.error('Error posting job:', error);
      toast.error('Failed to post job. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="for-employer-page" data-testid="for-employer-page">
      {/* Hero Section */}
      <section
        className="relative h-96 flex items-center justify-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1690264603288-4e41a4178565)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
        data-testid="employer-hero"
      >
        <div className="absolute inset-0 bg-gray-900/70"></div>
        <div className="container mx-auto px-4 relative z-10 text-white text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4" data-testid="employer-hero-title">
            Hire Top <span style={{ color: '#FF6B35' }}>Talent</span> Fast
          </h1>
          <p className="text-lg max-w-2xl mx-auto">
            Access qualified candidates and streamline your hiring process
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-gray-50" data-testid="employer-services-section">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Our Services</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Comprehensive recruitment and staffing solutions for your business
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card p-8">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#FF6B35' }}>
                <Users className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Recruitment Services</h3>
              <p className="text-gray-600 mb-4">
                Find permanent talent with our comprehensive recruitment solutions. We handle executive search, permanent placement, and volume recruitment.
              </p>
              <Link to="/recruitment">
                <button className="btn-secondary mt-2">Learn More</button>
              </Link>
            </div>
            <div className="card p-8">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#FF6B35' }}>
                <Briefcase className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Staffing Solutions</h3>
              <p className="text-gray-600 mb-4">
                Flexible staffing for temporary, contract, and project-based needs. Scale your workforce efficiently with our reliable staffing services.
              </p>
              <Link to="/staffing">
                <button className="btn-secondary mt-2">Learn More</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding" data-testid="employer-benefits-section">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12" data-testid="benefits-title">
            Why Employers Choose Us
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card p-8" data-testid="benefit-1">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#FFF5F2' }}>
                <Clock style={{ color: '#FF6B35' }} size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Save Time</h3>
              <p className="text-gray-600">
                Reduce your time-to-hire by 50%. We handle screening, interviews, and candidate management.
              </p>
            </div>
            <div className="card p-8" data-testid="benefit-2">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#FFF5F2' }}>
                <Users style={{ color: '#FF6B35' }} size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Quality Candidates</h3>
              <p className="text-gray-600">
                Access pre-vetted professionals with verified skills and experience matching your requirements.
              </p>
            </div>
            <div className="card p-8" data-testid="benefit-3">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#FFF5F2' }}>
                <Building2 style={{ color: '#FF6B35' }} size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Flexible Solutions</h3>
              <p className="text-gray-600">
                From temporary staffing to permanent hires, we offer solutions that fit your business needs.
              </p>
            </div>
            <div className="card p-8" data-testid="benefit-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#FFF5F2' }}>
                <Award style={{ color: '#FF6B35' }} size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Guaranteed Quality</h3>
              <p className="text-gray-600">
                90-day replacement guarantee. If a hire doesn't work out, we'll find a replacement at no extra cost.
              </p>
            </div>
            <div className="card p-8" data-testid="benefit-5">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#FFF5F2' }}>
                <TrendingUp style={{ color: '#FF6B35' }} size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Scalable Hiring</h3>
              <p className="text-gray-600">
                Whether you need one person or a hundred, we can scale our services to match your growth.
              </p>
            </div>
            <div className="card p-8" data-testid="benefit-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#FFF5F2' }}>
                <CheckCircle2 style={{ color: '#FF6B35' }} size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Compliance Support</h3>
              <p className="text-gray-600">
                We handle all compliance, payroll, and administrative tasks for temporary staff.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hiring Process and Post Job Form - Side by Side */}
      <section className="section-padding bg-gray-50" data-testid="process-and-form-section">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Get Started Today</h2>
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Hiring Process */}
            <div data-testid="employer-process-section">
              <div className="card p-8 h-full">
                <h3 className="text-2xl font-bold mb-6" data-testid="process-title">
                  Our Hiring Process
                </h3>
                <div className="space-y-6">
                  <div className="flex gap-4" data-testid="process-step-1">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: '#FF6B35' }}>
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Consultation</h4>
                      <p className="text-sm text-gray-600">
                        We meet with you to understand your company culture, role requirements, and ideal candidate profile.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4" data-testid="process-step-2">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: '#FF6B35' }}>
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Sourcing & Screening</h4>
                      <p className="text-sm text-gray-600">
                        Our recruiters tap into extensive networks and databases to find qualified candidates.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4" data-testid="process-step-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: '#FF6B35' }}>
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Candidate Presentation</h4>
                      <p className="text-sm text-gray-600">
                        We present shortlisted candidates with detailed profiles and assessments.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4" data-testid="process-step-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: '#FF6B35' }}>
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Interview Coordination</h4>
                      <p className="text-sm text-gray-600">
                        We facilitate the interview process and gather feedback from all parties.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4" data-testid="process-step-5">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: '#FF6B35' }}>
                      5
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Offer & Onboarding</h4>
                      <p className="text-sm text-gray-600">
                        We assist with offer negotiations and support the onboarding process.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Post Job Form */}
            <div data-testid="post-job-section">
              <div className="card p-8">
                <h3 className="text-2xl font-bold mb-6" data-testid="post-job-title">
                  Post a Job
                </h3>
                <form onSubmit={handleSubmit} data-testid="post-job-form">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2" htmlFor="company">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        data-testid="input-company"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" htmlFor="title">
                        Job Title *
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        data-testid="input-title"
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2" htmlFor="location">
                          Location *
                        </label>
                        <input
                          type="text"
                          id="location"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                          data-testid="input-location"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2" htmlFor="job_type">
                          Job Type *
                        </label>
                        <select
                          id="job_type"
                          name="job_type"
                          value={formData.job_type}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                          data-testid="select-job-type"
                        >
                          <option value="Full-time">Full-time</option>
                          <option value="Part-time">Part-time</option>
                          <option value="Contract">Contract</option>
                          <option value="Temporary">Temporary</option>
                          <option value="Internship">Internship</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" htmlFor="category">
                        Category *
                      </label>
                      <input
                        type="text"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        placeholder="e.g., Engineering"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        data-testid="input-category"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" htmlFor="description">
                        Job Description *
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        data-testid="textarea-description"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" htmlFor="requirements">
                        Requirements (one per line) *
                      </label>
                      <textarea
                        id="requirements"
                        name="requirements"
                        value={formData.requirements}
                        onChange={handleChange}
                        required
                        rows={4}
                        placeholder="5+ years of experience&#10;Bachelor's degree&#10;Strong communication skills"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        data-testid="textarea-requirements"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full"
                      data-testid="submit-job-btn"
                    >
                      {isSubmitting ? 'Posting...' : 'Post Job'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding text-center" data-testid="employer-cta">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Build Your Team?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Let's discuss your hiring needs and find the perfect solution for your business.
          </p>
          <Link to="/contact" data-testid="employer-cta-contact">
            <button className="btn-primary">Schedule a Consultation</button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ForEmployer;