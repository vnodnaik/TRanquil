import React, { useState } from 'react';
import { Target, BookOpen, TrendingUp, Users, FileText, Briefcase, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ForEmployee = () => {
  const [resumeForm, setResumeForm] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    skills: '',
    cover_letter: ''
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setResumeForm({ ...resumeForm, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFile(file);
      toast.success(`Resume "${file.name}" selected`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // For now, we'll use the contact API to store resume submissions
      await axios.post(`${API}/contact`, {
        name: resumeForm.name,
        email: resumeForm.email,
        phone: resumeForm.phone,
        message: `Position: ${resumeForm.position}\nExperience: ${resumeForm.experience}\nSkills: ${resumeForm.skills}\nCover Letter: ${resumeForm.cover_letter}`,
        contact_type: 'employee'
      });

      toast.success('Resume submitted successfully! We\'ll review it and get back to you soon.');
      setResumeForm({
        name: '',
        email: '',
        phone: '',
        position: '',
        experience: '',
        skills: '',
        cover_letter: ''
      });
      setResumeFile(null);
    } catch (error) {
      console.error('Error submitting resume:', error);
      toast.error('Failed to submit resume. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: Target,
      title: 'Career Guidance',
      description: 'Expert advice on career planning, resume building, and interview preparation.'
    },
    {
      icon: Briefcase,
      title: 'Exclusive Opportunities',
      description: 'Access to jobs not advertised elsewhere, including hidden market positions.'
    },
    {
      icon: Users,
      title: 'Personal Support',
      description: 'Dedicated recruiter working for you throughout the job search process.'
    },
    {
      icon: TrendingUp,
      title: 'Salary Negotiation',
      description: 'We help you secure the best possible compensation package.'
    },
    {
      icon: FileText,
      title: 'Resume Optimization',
      description: 'Professional resume review and optimization to stand out from the crowd.'
    },
    {
      icon: BookOpen,
      title: 'Free Resources',
      description: 'Access to career resources, industry insights, and job search tips.'
    }
  ];

  const tips = [
    {
      title: 'Build a Strong Resume',
      points: [
        'Tailor your resume to each job application',
        'Use action verbs and quantify achievements',
        'Keep it concise (1-2 pages maximum)',
        'Proofread carefully for errors'
      ]
    },
    {
      title: 'Ace Your Interview',
      points: [
        'Research the company thoroughly',
        'Prepare answers to common questions',
        'Dress professionally and arrive early',
        'Ask thoughtful questions'
      ]
    },
    {
      title: 'Network Effectively',
      points: [
        'Connect with industry professionals on LinkedIn',
        'Attend industry events and conferences',
        'Join professional associations',
        'Follow up with contacts regularly'
      ]
    }
  ];

  return (
    <div className="for-employee-page" data-testid="for-employee-page">
      {/* Hero Section */}
      <section
        className="relative h-96 flex items-center justify-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1758873268631-fa944fc5cad2)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
        data-testid="employee-hero"
      >
        <div className="absolute inset-0 bg-gray-900/70"></div>
        <div className="container mx-auto px-4 relative z-10 text-white text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4" data-testid="employee-hero-title">
            Your Career, <span style={{ color: '#FF6B35' }}>Our Priority</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto">
            Find the perfect job opportunity with personalized support every step of the way
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding" data-testid="employee-benefits-section">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4" data-testid="benefits-title">
            Why Job Seekers Choose Us
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            We're more than just a job board - we're your career partner
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="card p-8" data-testid={`benefit-${index}`}>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#FFF5F2' }}>
                    <Icon style={{ color: '#FF6B35' }} size={32} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Submit Resume and How We Help - Side by Side */}
      <section className="section-padding bg-gray-50" data-testid="resume-and-help-section">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Get Started With Us</h2>
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Submit Resume Form */}
            <div data-testid="submit-resume-section">
              <div className="card p-8">
                <h3 className="text-2xl font-bold mb-6" data-testid="submit-resume-title">
                  Submit Your Resume
                </h3>
                <p className="text-gray-600 mb-6">
                  Let us help you find your dream job. Submit your resume and our team will match you with the perfect opportunities.
                </p>
                <form onSubmit={handleSubmit} data-testid="resume-form">
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2" htmlFor="name">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={resumeForm.name}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                          data-testid="resume-name-input"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2" htmlFor="email">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={resumeForm.email}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                          data-testid="resume-email-input"
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2" htmlFor="phone">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={resumeForm.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                          data-testid="resume-phone-input"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2" htmlFor="position">
                          Desired Position
                        </label>
                        <input
                          type="text"
                          id="position"
                          name="position"
                          value={resumeForm.position}
                          onChange={handleChange}
                          placeholder="e.g., Software Engineer"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                          data-testid="resume-position-input"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" htmlFor="experience">
                        Years of Experience
                      </label>
                      <input
                        type="text"
                        id="experience"
                        name="experience"
                        value={resumeForm.experience}
                        onChange={handleChange}
                        placeholder="e.g., 5 years"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        data-testid="resume-experience-input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" htmlFor="skills">
                        Key Skills
                      </label>
                      <textarea
                        id="skills"
                        name="skills"
                        value={resumeForm.skills}
                        onChange={handleChange}
                        rows={3}
                        placeholder="e.g., JavaScript, React, Node.js, Python"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        data-testid="resume-skills-input"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" htmlFor="resume-file">
                        Attach Resume
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          id="resume-file"
                          onChange={handleFileChange}
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                          data-testid="input-resume-file"
                        />
                        <label
                          htmlFor="resume-file"
                          className="flex items-center justify-center gap-2 w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-orange-500 transition-colors"
                          data-testid="resume-file-upload-label"
                        >
                          <Upload size={20} style={{ color: '#FF6B35' }} />
                          <span className="text-sm text-gray-600">
                            {resumeFile ? resumeFile.name : 'Click to upload resume'}
                          </span>
                        </label>
                      </div>
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full"
                      data-testid="submit-resume-btn"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Resume'}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* How We Help You Succeed */}
            <div data-testid="how-we-help-section">
              <div className="card p-8 h-full">
                <h3 className="text-2xl font-bold mb-6" data-testid="how-we-help-title">
                  How We Help You Succeed
                </h3>
                <div className="space-y-6">
                  <div data-testid="help-step-1">
                    <div className="flex gap-4 mb-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: '#FF6B35' }}>
                        1
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-2">Understand Your Goals</h4>
                        <p className="text-gray-600">
                          We start by understanding your career aspirations, skills, and preferences to find the perfect match.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div data-testid="help-step-2">
                    <div className="flex gap-4 mb-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: '#FF6B35' }}>
                        2
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-2">Match You with Opportunities</h4>
                        <p className="text-gray-600">
                          Our recruiters actively search for positions that align with your profile and career goals.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div data-testid="help-step-3">
                    <div className="flex gap-4 mb-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: '#FF6B35' }}>
                        3
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-2">Prepare You for Success</h4>
                        <p className="text-gray-600">
                          We provide interview coaching, resume tips, and insights about potential employers.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div data-testid="help-step-4">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: '#FF6B35' }}>
                        4
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-2">Support Throughout the Process</h4>
                        <p className="text-gray-600">
                          From application to offer negotiation and onboarding, we're with you every step.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t">
                  <img
                    src="https://images.unsplash.com/photo-1758691737387-a89bb8adf768"
                    alt="Professional team"
                    className="rounded-lg shadow-lg"
                    data-testid="help-image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Career Tips Section */}
      <section className="section-padding" data-testid="career-tips-section">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4" data-testid="tips-title">
            Career Success Tips
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Expert advice to help you land your dream job
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {tips.map((tip, index) => (
              <div key={index} className="card p-6" data-testid={`tip-${index}`}>
                <h3 className="text-xl font-semibold mb-4" style={{ color: '#FF6B35' }}>
                  {tip.title}
                </h3>
                <ul className="space-y-3">
                  {tip.points.map((point, pIndex) => (
                    <li key={pIndex} className="flex items-start gap-2 text-gray-700">
                      <span className="text-orange-500 mt-1">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Types Section */}
      <section className="section-padding bg-gray-50" data-testid="job-types-section">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12" data-testid="job-types-title">
            Types of Opportunities We Offer
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card p-6 text-center" data-testid="job-type-permanent">
              <h3 className="text-lg font-semibold mb-2">Permanent Positions</h3>
              <p className="text-sm text-gray-600">
                Full-time roles with benefits and long-term career growth
              </p>
            </div>
            <div className="card p-6 text-center" data-testid="job-type-contract">
              <h3 className="text-lg font-semibold mb-2">Contract Work</h3>
              <p className="text-sm text-gray-600">
                Project-based opportunities with flexibility
              </p>
            </div>
            <div className="card p-6 text-center" data-testid="job-type-temporary">
              <h3 className="text-lg font-semibold mb-2">Temporary Jobs</h3>
              <p className="text-sm text-gray-600">
                Short-term positions to gain experience
              </p>
            </div>
            <div className="card p-6 text-center" data-testid="job-type-contract-to-hire">
              <h3 className="text-lg font-semibold mb-2">Contract-to-Hire</h3>
              <p className="text-sm text-gray-600">
                Try before you commit with conversion opportunities
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
        data-testid="employee-cta"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6" data-testid="cta-title">
            Ready to Take the Next Step?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Browse our current openings or get in touch to discuss your career goals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/jobs" data-testid="cta-browse-jobs">
              <button className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Browse Jobs
              </button>
            </Link>
            <Link to="/contact" data-testid="cta-contact">
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-all">
                Contact a Recruiter
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForEmployee;