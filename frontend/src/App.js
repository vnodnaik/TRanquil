import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ForEmployer from './pages/ForEmployer';
import ForEmployee from './pages/ForEmployee';
import JobSearch from './pages/JobSearch';
import ContactUs from './pages/ContactUs';
import JobDetails from './pages/JobDetails';
import Recruitment from './pages/Recruitment';
import Staffing from './pages/Staffing';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Toaster } from './components/ui/sonner';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
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
        </Routes>
        <Footer />
        <Toaster position="top-right" />
      </BrowserRouter>
    </div>
  );
}

export default App;