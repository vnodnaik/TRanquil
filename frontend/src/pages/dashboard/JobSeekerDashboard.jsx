import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import { Briefcase, Clock, Users, LogOut, RefreshCw, Star } from 'lucide-react';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const JobSeekerDashboard = () => {
  const { user, token, logout, switchRole } = useAuth();
  const [stats, setStats] = useState({ totalApplications: 0, pending: 0, reviewed: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await axios.get(`${API}/applications/my-applications`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      const applications = response.data;
      const totalApplications = applications.length;
      const pending = applications.filter(app => app.status === 'Pending').length;
      const reviewed = applications.filter(app => app.status === 'Reviewed' || app.status === 'Shortlisted').length;
      
      setStats({ totalApplications, pending, reviewed });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSwitchRole = async () => {
    try {
      await switchRole();
      toast.success('Switched to Employer mode');
      window.location.href = '/employer-dashboard';
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
    <div className="min-h-screen bg-gray-50" data-testid="jobseeker-dashboard">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2" style={{ color: '#FF6B35' }}>
                Job Seeker Dashboard
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
                Switch to Employer
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
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow" data-testid="stat-total-applications">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Total Applications</p>
                    <p className="text-4xl font-bold mt-3">{stats.totalApplications}</p>
                  </div>
                  <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FFF5F2' }}>
                    <Briefcase style={{ color: '#FF6B35' }} size={28} />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow" data-testid="stat-pending">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Pending Review</p>
                    <p className="text-4xl font-bold mt-3">{stats.pending}</p>
                  </div>
                  <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FFF5F2' }}>
                    <Clock style={{ color: '#FF6B35' }} size={28} />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow" data-testid="stat-reviewed">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Reviewed/Shortlisted</p>
                    <p className="text-4xl font-bold mt-3">{stats.reviewed}</p>
                  </div>
                  <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FFF5F2' }}>
                    <Users style={{ color: '#FF6B35' }} size={28} />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Link to="/jobseeker-dashboard/applications" data-testid="link-my-applications">
                  <div className="bg-white rounded-lg shadow-sm p-8 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
                    <div className="flex flex-col items-center text-center gap-4">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FF6B35' }}>
                        <Briefcase className="text-white" size={28} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-xl mb-2">My Applications</h3>
                        <p className="text-sm text-gray-600">Track your job applications and status</p>
                      </div>
                    </div>
                  </div>
                </Link>

                <Link to="/jobseeker-dashboard/recommendations" data-testid="link-recommendations">
                  <div className="bg-white rounded-lg shadow-sm p-8 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
                    <div className="flex flex-col items-center text-center gap-4">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FF6B35' }}>
                        <Star className="text-white" size={28} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-xl mb-2">Recommendations</h3>
                        <p className="text-sm text-gray-600">Jobs matched to your profile</p>
                      </div>
                    </div>
                  </div>
                </Link>

                <Link to="/jobseeker-dashboard/profile" data-testid="link-edit-profile">
                  <div className="bg-white rounded-lg shadow-sm p-8 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
                    <div className="flex flex-col items-center text-center gap-4">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FF6B35' }}>
                        <Users className="text-white" size={28} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-xl mb-2">Edit Profile</h3>
                        <p className="text-sm text-gray-600">Update your information and resume</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default JobSeekerDashboard;