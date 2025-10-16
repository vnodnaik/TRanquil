import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Search, MapPin, Briefcase, DollarSign, Calendar } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const JobSearch = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    category: '',
    job_type: ''
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchJobs();
    fetchCategories();
  }, []);

  const fetchJobs = async (filterParams = {}) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filterParams.search) params.append('search', filterParams.search);
      if (filterParams.location) params.append('location', filterParams.location);
      if (filterParams.category) params.append('category', filterParams.category);
      if (filterParams.job_type) params.append('job_type', filterParams.job_type);

      const response = await axios.get(`${API}/jobs?${params.toString()}`);
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API}/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSearch = () => {
    fetchJobs(filters);
  };

  const handleReset = () => {
    setFilters({
      search: '',
      location: '',
      category: '',
      job_type: ''
    });
    fetchJobs();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  return (
    <div className="job-search-page" data-testid="job-search-page">
      {/* Hero Section */}
      <section className="bg-gray-50 py-12" data-testid="search-hero">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-center mb-8" data-testid="search-title">
            Find Your <span style={{ color: '#FF6B35' }}>Perfect Job</span>
          </h1>

          {/* Search Filters */}
          <div className="max-w-5xl mx-auto card p-6" data-testid="search-filters">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="search">
                  Keywords
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="text"
                    id="search"
                    name="search"
                    value={filters.search}
                    onChange={handleFilterChange}
                    placeholder="Job title or keyword"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    data-testid="filter-search"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="location">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={filters.location}
                    onChange={handleFilterChange}
                    placeholder="City or state"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    data-testid="filter-location"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="category">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={filters.category}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  data-testid="filter-category"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat, index) => (
                    <option key={index} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="job_type">
                  Job Type
                </label>
                <select
                  id="job_type"
                  name="job_type"
                  value={filters.job_type}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  data-testid="filter-job-type"
                >
                  <option value="">All Types</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Temporary">Temporary</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleSearch}
                className="btn-primary flex-1"
                data-testid="search-button"
              >
                Search Jobs
              </button>
              <button
                onClick={handleReset}
                className="btn-secondary"
                data-testid="reset-button"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Jobs Listing */}
      <section className="section-padding" data-testid="jobs-listing">
        <div className="container mx-auto px-4">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold" data-testid="results-count">
              {loading ? 'Loading...' : `${jobs.length} Jobs Found`}
            </h2>
          </div>

          {loading ? (
            <div className="flex justify-center py-12" data-testid="loading-spinner">
              <div className="loading-spinner"></div>
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-12" data-testid="no-jobs">
              <p className="text-xl text-gray-600 mb-4">No jobs found matching your criteria</p>
              <button onClick={handleReset} className="btn-primary">
                View All Jobs
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <Link
                  key={job.id}
                  to={`/jobs/${job.id}`}
                  data-testid={`job-card-${job.id}`}
                >
                  <div className="card p-6 hover:shadow-lg transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2" data-testid={`job-title-${job.id}`}>
                          {job.title}
                        </h3>
                        <p className="text-gray-600 font-medium mb-3" data-testid={`job-company-${job.id}`}>
                          {job.company}
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <MapPin size={16} style={{ color: '#FF6B35' }} />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Briefcase size={16} style={{ color: '#FF6B35' }} />
                            <span>{job.job_type}</span>
                          </div>
                          {job.salary_range && (
                            <div className="flex items-center gap-1">
                              <DollarSign size={16} style={{ color: '#FF6B35' }} />
                              <span>{job.salary_range}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Calendar size={16} style={{ color: '#FF6B35' }} />
                            <span>{formatDate(job.posted_date)}</span>
                          </div>
                        </div>
                        <div className="mt-3">
                          <span
                            className="inline-block px-3 py-1 rounded-full text-sm font-medium"
                            style={{ backgroundColor: '#FFF5F2', color: '#FF6B35' }}
                          >
                            {job.category}
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <button
                          className="btn-primary"
                          data-testid={`view-job-${job.id}`}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default JobSearch;