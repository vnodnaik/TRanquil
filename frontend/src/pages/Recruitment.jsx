import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Users, Award, Target, Clock } from 'lucide-react';

const Recruitment = () => {
  return (
    <div className="recruitment-page" data-testid="recruitment-page">
      {/* Hero Section */}
      <section
        className="relative h-96 flex items-center justify-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1698047681820-f26b00b6c639)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
        data-testid="recruitment-hero"
      >
        <div className="absolute inset-0 bg-gray-900/70"></div>
        <div className="container mx-auto px-4 relative z-10 text-white text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4" data-testid="recruitment-hero-title">
            <span style={{ color: '#FF6B35' }}>Recruitment</span> Services
          </h1>
          <p className="text-lg max-w-2xl mx-auto">
            Finding the perfect permanent talent for your organization
          </p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="section-padding" data-testid="recruitment-overview">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Permanent Recruitment Solutions</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our recruitment services focus on finding and placing exceptional talent in permanent positions. 
              We understand that hiring the right people is critical to your company's success. With our extensive 
              network, rigorous screening processes, and industry expertise, we deliver candidates who not only 
              meet your requirements but exceed your expectations.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-gray-50" data-testid="recruitment-services">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Our Recruitment Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card p-8" data-testid="service-executive">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#FF6B35' }}>
                <Award className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Executive Search</h3>
              <p className="text-gray-600">
                Identify and attract top-tier leadership talent. Our executive search service targets 
                C-suite and senior management positions with discretion and precision.
              </p>
            </div>
            <div className="card p-8" data-testid="service-permanent">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#FF6B35' }}>
                <Users className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Permanent Placement</h3>
              <p className="text-gray-600">
                Full-time hiring solutions across all levels and departments. We match skilled professionals 
                with organizations where they can grow and thrive long-term.
              </p>
            </div>
            <div className="card p-8" data-testid="service-volume">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#FF6B35' }}>
                <Target className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Volume Recruitment</h3>
              <p className="text-gray-600">
                Large-scale hiring campaigns for rapid expansion. Efficient processes to hire multiple 
                candidates simultaneously without compromising on quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding" data-testid="recruitment-benefits">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1690264603288-4e41a4178565"
                alt="Recruitment interview"
                className="rounded-lg shadow-xl"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Why Choose Our <span style={{ color: '#FF6B35' }}>Recruitment</span> Service?
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={24} style={{ color: '#FF6B35' }} className="flex-shrink-0 mt-1" />
                  <div>
                    <strong className="block mb-1">Extensive Talent Network</strong>
                    <span className="text-gray-600">Access to passive candidates and top talent not actively job searching</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={24} style={{ color: '#FF6B35' }} className="flex-shrink-0 mt-1" />
                  <div>
                    <strong className="block mb-1">Rigorous Screening</strong>
                    <span className="text-gray-600">Multi-stage evaluation including skills assessment and cultural fit analysis</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={24} style={{ color: '#FF6B35' }} className="flex-shrink-0 mt-1" />
                  <div>
                    <strong className="block mb-1">Industry Expertise</strong>
                    <span className="text-gray-600">Specialized recruiters with deep knowledge of your sector</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={24} style={{ color: '#FF6B35' }} className="flex-shrink-0 mt-1" />
                  <div>
                    <strong className="block mb-1">Faster Time-to-Hire</strong>
                    <span className="text-gray-600">Streamlined processes that reduce your hiring time by up to 50%</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={24} style={{ color: '#FF6B35' }} className="flex-shrink-0 mt-1" />
                  <div>
                    <strong className="block mb-1">90-Day Guarantee</strong>
                    <span className="text-gray-600">Free replacement if the hire doesn't work out within the first 90 days</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-gray-50" data-testid="recruitment-process">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Our Recruitment Process</h2>
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: '#FF6B35' }}>
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Understand Your Needs</h3>
                <p className="text-gray-600">
                  In-depth consultation to understand your company culture, role requirements, and ideal candidate profile.
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: '#FF6B35' }}>
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Talent Sourcing</h3>
                <p className="text-gray-600">
                  Leverage our extensive network and databases to identify qualified candidates, including passive talent.
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: '#FF6B35' }}>
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Screening & Assessment</h3>
                <p className="text-gray-600">
                  Comprehensive evaluation including skills testing, reference checks, and cultural fit assessment.
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: '#FF6B35' }}>
                4
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Present Shortlist</h3>
                <p className="text-gray-600">
                  Deliver detailed candidate profiles with our recommendations for the top candidates.
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: '#FF6B35' }}>
                5
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Facilitate Interviews</h3>
                <p className="text-gray-600">
                  Coordinate interview schedules and provide guidance throughout the selection process.
                </p>
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: '#FF6B35' }}>
                6
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Offer & Onboarding Support</h3>
                <p className="text-gray-600">
                  Assist with offer negotiations and provide ongoing support during the onboarding phase.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding text-center" data-testid="recruitment-cta">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Find Your Next Great Hire?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Let's discuss your recruitment needs and how we can help you build an exceptional team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" data-testid="recruitment-cta-contact">
              <button className="btn-primary">Get Started</button>
            </Link>
            <Link to="/for-employer" data-testid="recruitment-cta-employer">
              <button className="btn-secondary">Post a Job</button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Recruitment;