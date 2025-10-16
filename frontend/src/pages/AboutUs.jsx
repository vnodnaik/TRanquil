import React from 'react';
import { Heart, Eye, Target, Users, Award, Lightbulb } from 'lucide-react';

const AboutUs = () => {
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
      bio: '15+ years in recruitment industry'
    },
    {
      name: 'Michael Chen',
      role: 'Head of Operations',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      bio: 'Operations excellence expert'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Lead Recruiter',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
      bio: 'Specialized in tech recruitment'
    },
    {
      name: 'David Kumar',
      role: 'Business Development',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      bio: 'Building strategic partnerships'
    }
  ];

  const coreValues = [
    {
      icon: Heart,
      title: 'Integrity',
      description: 'We operate with honesty and transparency in all our interactions'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for the highest quality in everything we do'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'We believe in the power of teamwork and partnership'
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We continuously improve our processes and embrace new technologies'
    }
  ];

  return (
    <div className="about-page" data-testid="about-page">
      {/* Hero Section */}
      <section
        className="relative h-96 flex items-center justify-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1568992687947-868a62a9f521)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
        data-testid="about-hero"
      >
        <div className="absolute inset-0 bg-gray-900/70"></div>
        <div className="container mx-auto px-4 relative z-10 text-white text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4" data-testid="about-hero-title">
            About <span style={{ color: '#FF6B35' }}>Tranquil Peeplz</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto">
            Building bridges between talent and opportunity since 2009
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="section-padding" data-testid="our-story-section">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-6 text-center" data-testid="story-title">
              Our Story
            </h2>
            <div className="space-y-6 text-gray-700 text-lg">
              <p>
                Tranquil Peeplz was founded in 2009 with a simple yet powerful vision: to revolutionize the recruitment industry by putting people first. What started as a small team of passionate recruiters has grown into a leading staffing solutions provider.
              </p>
              <p>
                Over the years, we've successfully placed thousands of candidates in roles where they thrive, and helped countless companies build exceptional teams. Our success stems from our unwavering commitment to understanding both our clients' needs and our candidates' aspirations.
              </p>
              <p>
                Today, we serve clients across multiple industries, from startups to Fortune 500 companies, always maintaining the personal touch and dedication that defined us from day one.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Culture */}
      <section className="section-padding bg-gray-50" data-testid="mission-vision-section">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card p-8 text-center" data-testid="mission-card">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#FF6B35' }}>
                <Target className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Mission</h3>
              <p className="text-gray-700">
                To connect exceptional talent with outstanding opportunities, creating lasting partnerships that drive success for both employers and job seekers.
              </p>
            </div>
            <div className="card p-8 text-center" data-testid="vision-card">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#FF6B35' }}>
                <Eye className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Vision</h3>
              <p className="text-gray-700">
                To be the most trusted and innovative recruitment partner globally, transforming the way companies hire and professionals advance their careers.
              </p>
            </div>
            <div className="card p-8 text-center" data-testid="culture-card">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#FF6B35' }}>
                <Heart className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Culture</h3>
              <p className="text-gray-700">
                We foster a culture of respect, collaboration, and continuous learning where every team member is valued and empowered to make a difference.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding" data-testid="core-values-section">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12" data-testid="values-title">
            Our Core Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="text-center" data-testid={`value-${value.title.toLowerCase()}`}>
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#FFF5F2' }}>
                    <Icon style={{ color: '#FF6B35' }} size={32} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="section-padding bg-gray-50" data-testid="team-section">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4" data-testid="team-title">
            Meet Our Team
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            The passionate professionals behind Tranquil Peeplz
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="card overflow-hidden" data-testid={`team-member-${index}`}>
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="font-medium mb-2" style={{ color: '#FF6B35' }}>
                    {member.role}
                  </p>
                  <p className="text-sm text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding text-center" data-testid="about-cta">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">
            Want to Join Our Journey?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            We're always looking for talented individuals to join our team and exceptional companies to partner with.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" data-testid="about-cta-contact">
              <button className="btn-primary">Get In Touch</button>
            </a>
            <a href="/jobs" data-testid="about-cta-careers">
              <button className="btn-secondary">View Careers</button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;