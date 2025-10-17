import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import { Briefcase, Users, FileText, LogOut, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const EmployerDashboard = () => {
  const { user, token, logout } = useAuth();
  const [stats, setStats] = useState({ totalJobs: 0, activeJobs: 0, totalApplications: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const jobsResponse = await axios.get(`${API}/jobs/my-jobs`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const jobs = jobsResponse.data;
      const totalJobs = jobs.length;
      const activeJobs = jobs.filter(job => job.is_active).length;
      
      let totalApplications = 0;
      for (const job of jobs) {
        const appsResponse = await axios.get(`${API}/applications/job/${job.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        totalApplications += appsResponse.data.length;
      }
      
      setStats({ totalJobs, activeJobs, totalApplications });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSwitchRole = async () => {
    try {
      await switchRole();
      toast.success('Switched to Job Seeker mode');
      window.location.href = '/jobseeker-dashboard';
    } catch (error) {
      toast.error('Failed to switch role');
    }
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-50" data-testid="employer-dashboard">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2" style={{ color: '#FF6B35' }}>
                Employer Dashboard
              </h1>
              <p className="text-gray-600">Welcome back, {user?.name}!</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleSwitchRole}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                data-testid="switch-role-btn"
              >
                <RefreshCw size={18} />
                Switch to Job Seeker
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                data-testid="logout-btn"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="loading-spinner"></div>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6" data-testid="stat-total-jobs">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Total Jobs Posted</p>
                    <p className="text-3xl font-bold mt-2">{stats.totalJobs}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FFF5F2' }}>
                    <Briefcase style={{ color: '#FF6B35' }} size={24} />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6" data-testid="stat-active-jobs">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Active Jobs</p>
                    <p className="text-3xl font-bold mt-2">{stats.activeJobs}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FFF5F2' }}>
                    <Briefcase style={{ color: '#FF6B35' }} size={24} />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6" data-testid="stat-applications">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Total Applications</p>
                    <p className="text-3xl font-bold mt-2">{stats.totalApplications}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FFF5F2' }}>
                    <FileText style={{ color: '#FF6B35' }} size={24} />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-6">
              <Link to="/employer-dashboard/my-jobs" data-testid="link-my-jobs">
                <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FF6B35' }}>
                      <Briefcase className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">My Jobs</h3>
                      <p className="text-sm text-gray-600">View and manage your job postings</p>
                    </div>
                  </div>
                </div>
              </Link>

              <Link to="/employer-dashboard/applications" data-testid="link-applications">
                <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FF6B35' }}>
                      <FileText className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Applications</h3>
                      <p className="text-sm text-gray-600">Review candidate applications</p>
                    </div>
                  </div>
                </div>
              </Link>

              <Link to="/for-employer" data-testid="link-post-job">
                <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FF6B35' }}>
                      <Users className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Post New Job</h3>
                      <p className="text-sm text-gray-600">Create a new job posting</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EmployerDashboard;