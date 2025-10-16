import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { MapPin, Briefcase, DollarSign, Calendar, ArrowLeft, Building2 } from 'lucide-react';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const JobDetails = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [formData, setFormData] = useState({
    applicant_name: '',
    email: '',
    phone: '',
    cover_letter: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchJobDetails();
  }, [jobId]);

  const fetchJobDetails = async () => {
    try {
      const response = await axios.get(`${API}/jobs/${jobId}`);
      setJob(response.data);
    } catch (error) {
      console.error('Error fetching job details:', error);
      toast.error('Job not found');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post(`${API}/applications`, {
        job_id: jobId,
        ...formData
      });

      toast.success('Application submitted successfully!');
      setShowApplicationForm(false);
      setFormData({
        applicant_name: '',
        email: '',
        phone: '',
        cover_letter: ''
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" data-testid="job-details-loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center" data-testid="job-not-found">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Job Not Found</h2>
          <Link to="/jobs">
            <button className="btn-primary">Back to Job Search</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="job-details-page" data-testid="job-details-page">
      {/* Back Button */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <Link
            to="/jobs"
            className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors"
            data-testid="back-to-jobs"
          >
            <ArrowLeft size={20} />
            <span>Back to Job Search</span>
          </Link>
        </div>
      </div>

      <section className="section-padding" data-testid="job-details-content">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Job Header */}
            <div className="card p-8 mb-8">
              <h1 className="text-3xl font-bold mb-4" data-testid="job-detail-title">
                {job.title}
              </h1>
              <div className="flex items-center gap-2 mb-6" data-testid="job-detail-company">
                <Building2 style={{ color: '#FF6B35' }} size={24} />
                <span className="text-xl font-medium">{job.company}</span>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2 text-gray-700">
                  <MapPin size={20} style={{ color: '#FF6B35' }} />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Briefcase size={20} style={{ color: '#FF6B35' }} />
                  <span>{job.job_type}</span>
                </div>
                {job.salary_range && (
                  <div className="flex items-center gap-2 text-gray-700">
                    <DollarSign size={20} style={{ color: '#FF6B35' }} />
                    <span>{job.salary_range}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-gray-700">
                  <Calendar size={20} style={{ color: '#FF6B35' }} />
                  <span>Posted {formatDate(job.posted_date)}</span>
                </div>
              </div>

              <div className="mb-6">
                <span
                  className="inline-block px-4 py-2 rounded-full font-medium"
                  style={{ backgroundColor: '#FFF5F2', color: '#FF6B35' }}
                >
                  {job.category}
                </span>
              </div>

              <button
                onClick={() => setShowApplicationForm(!showApplicationForm)}
                className="btn-primary w-full md:w-auto"
                data-testid="apply-now-btn"
              >
                {showApplicationForm ? 'Hide Application Form' : 'Apply Now'}
              </button>
            </div>

            {/* Application Form */}
            {showApplicationForm && (
              <div className="card p-8 mb-8" data-testid="application-form">
                <h2 className="text-2xl font-bold mb-6">Apply for this Position</h2>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2" htmlFor="applicant_name">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="applicant_name"
                        name="applicant_name"
                        value={formData.applicant_name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        data-testid="input-applicant-name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" htmlFor="email">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        data-testid="input-email"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" htmlFor="phone">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        data-testid="input-phone"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" htmlFor="cover_letter">
                        Cover Letter *
                      </label>
                      <textarea
                        id="cover_letter"
                        name="cover_letter"
                        value={formData.cover_letter}
                        onChange={handleChange}
                        required
                        rows={8}
                        placeholder="Tell us why you're a great fit for this position..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        data-testid="textarea-cover-letter"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full"
                      data-testid="submit-application-btn"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Application'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Job Description */}
            <div className="card p-8 mb-8" data-testid="job-description-section">
              <h2 className="text-2xl font-bold mb-4">Job Description</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{job.description}</p>
            </div>

            {/* Requirements */}
            <div className="card p-8" data-testid="job-requirements-section">
              <h2 className="text-2xl font-bold mb-4">Requirements</h2>
              <ul className="space-y-3">
                {job.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-3" data-testid={`requirement-${index}`}>
                    <span className="text-orange-500 mt-1">•</span>
                    <span className="text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JobDetails;