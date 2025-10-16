import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Clock, TrendingUp, Shield, Zap, Briefcase } from 'lucide-react';

const Staffing = () => {
  return (
    <div className="staffing-page" data-testid="staffing-page">
      {/* Hero Section */}
      <section
        className="relative h-96 flex items-center justify-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1517048676732-d65bc937f952)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
        data-testid="staffing-hero"
      >
        <div className="absolute inset-0 bg-gray-900/70"></div>
        <div className="container mx-auto px-4 relative z-10 text-white text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4" data-testid="staffing-hero-title">
            <span style={{ color: '#FF6B35' }}>Staffing</span> Solutions
          </h1>
          <p className="text-lg max-w-2xl mx-auto">
            Flexible workforce solutions for temporary, contract, and project-based needs
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="section-padding" data-testid="staffing-overview">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Flexible Staffing Services</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our staffing solutions provide the flexibility you need to scale your workforce up or down based on 
              business demands. Whether you need temporary coverage, project-based talent, or contract-to-hire 
              arrangements, we deliver qualified professionals quickly and efficiently. Focus on your core business 
              while we handle all aspects of temporary workforce management.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-gray-50" data-testid="staffing-services">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Our Staffing Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card p-8" data-testid="service-temporary">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#FF6B35' }}>
                <Clock className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Temporary Staffing</h3>
              <p className="text-gray-600">
                Short-term workforce solutions for seasonal peaks, employee absences, or special projects. 
                Quick deployment of qualified staff when you need them most.
              </p>
            </div>
            <div className="card p-8" data-testid="service-contract">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#FF6B35' }}>
                <Briefcase className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Contract-to-Hire</h3>
              <p className="text-gray-600">
                Try before you commit. Evaluate candidates in your work environment before making a 
                permanent hiring decision. Reduces risk and ensures the right fit.
              </p>
            </div>
            <div className="card p-8" data-testid="service-project">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#FF6B35' }}>
                <Zap className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Project-Based Staffing</h3>
              <p className="text-gray-600">
                Specialized talent for specific projects or initiatives. Assemble expert teams quickly 
                for product launches, system implementations, or time-bound initiatives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding" data-testid="staffing-benefits">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Why Choose Our <span style={{ color: '#FF6B35' }}>Staffing</span> Solutions?
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={24} style={{ color: '#FF6B35' }} className="flex-shrink-0 mt-1" />
                  <div>
                    <strong className="block mb-1">Rapid Deployment</strong>
                    <span className="text-gray-600">Get qualified staff in as little as 24-48 hours for urgent needs</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={24} style={{ color: '#FF6B35' }} className="flex-shrink-0 mt-1" />
                  <div>
                    <strong className="block mb-1">Cost Efficiency</strong>
                    <span className="text-gray-600">No recruitment costs, benefits overhead, or long-term commitments</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={24} style={{ color: '#FF6B35' }} className="flex-shrink-0 mt-1" />
                  <div>
                    <strong className="block mb-1">Full Compliance Management</strong>
                    <span className="text-gray-600">We handle all payroll, taxes, insurance, and HR compliance</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={24} style={{ color: '#FF6B35' }} className="flex-shrink-0 mt-1" />
                  <div>
                    <strong className="block mb-1">Scalable Workforce</strong>
                    <span className="text-gray-600">Easily scale up or down based on business fluctuations</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={24} style={{ color: '#FF6B35' }} className="flex-shrink-0 mt-1" />
                  <div>
                    <strong className="block mb-1">Pre-Vetted Talent</strong>
                    <span className="text-gray-600">All candidates are screened, tested, and verified before placement</span>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1758691737387-a89bb8adf768"
                alt="Staffing team"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-gray-50" data-testid="staffing-process">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">How Our Staffing Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#FF6B35' }}>
                <span className="text-3xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Submit Request</h3>
              <p className="text-gray-600">
                Tell us your staffing needs, required skills, and timeline
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#FF6B35' }}>
                <span className="text-3xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">We Source Talent</h3>
              <p className="text-gray-600">
                Access our pre-screened talent pool and match qualified candidates
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#FF6B35' }}>
                <span className="text-3xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Fast Deployment</h3>
              <p className="text-gray-600">
                Candidates start working, we handle all administrative tasks
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#FF6B35' }}>
                <span className="text-3xl font-bold text-white">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Ongoing Support</h3>
              <p className="text-gray-600">
                Continuous monitoring and support throughout the assignment
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="section-padding" data-testid="staffing-industries">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Industries We Serve</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {['Manufacturing', 'Logistics', 'Retail', 'Hospitality', 'Healthcare', 'Technology', 'Finance', 'Administration'].map((industry) => (
              <div key={industry} className="card p-4 text-center">
                <p className="font-semibold">{industry}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gray-50 text-center" data-testid="staffing-cta">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">
            Need Flexible Staffing Solutions?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Contact us today to discuss your temporary staffing needs and get qualified professionals fast.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" data-testid="staffing-cta-contact">
              <button className="btn-primary">Request Staffing</button>
            </Link>
            <Link to="/for-employer" data-testid="staffing-cta-employer">
              <button className="btn-secondary">Learn More</button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Staffing;