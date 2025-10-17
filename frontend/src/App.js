import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ForEmployer from './pages/ForEmployer';
import ForEmployee from './pages/ForEmployee';
import JobSearch from './pages/JobSearch';
import ContactUs from './pages/ContactUs';
import JobDetails from './pages/JobDetails';
import Recruitment from './pages/Recruitment';
import Staffing from './pages/Staffing';
import EmployerDashboard from './pages/dashboard/EmployerDashboard';
import JobSeekerDashboard from './pages/dashboard/JobSeekerDashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Toaster } from './components/ui/sonner';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/for-employer" element={<ForEmployer />} />
            <Route path="/for-employee" element={<ForEmployee />} />
            <Route path="/jobs" element={<JobSearch />} />
            <Route path="/jobs/:jobId" element={<JobDetails />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/recruitment" element={<Recruitment />} />
            <Route path="/staffing" element={<Staffing />} />
            
            {/* Protected Dashboard Routes */}
            <Route 
              path="/employer-dashboard" 
              element={
                <ProtectedRoute requireEmployer>
                  <EmployerDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/jobseeker-dashboard" 
              element={
                <ProtectedRoute requireJobSeeker>
                  <JobSeekerDashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
          <Footer />
          <Toaster position="top-right" />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;