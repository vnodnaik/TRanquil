import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    contact_type: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await axios.post(`${API}/contact`, formData);
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        contact_type: 'general'
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page" data-testid="contact-page">
      {/* Hero Section */}
      <section
        className="relative h-96 flex items-center justify-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1606836591695-4d58a73eba1e)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
        data-testid="contact-hero"
      >
        <div className="absolute inset-0 bg-gray-900/70"></div>
        <div className="container mx-auto px-4 relative z-10 text-white text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4" data-testid="contact-hero-title">
            Get In <span style={{ color: '#FF6B35' }}>Touch</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto">
            We'd love to hear from you. Let's start a conversation.
          </p>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="section-padding" data-testid="contact-content">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div data-testid="contact-info">
              <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
              <p className="text-gray-600 mb-8">
                Have a question or want to discuss your recruitment needs? We're here to help.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4" data-testid="info-address">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FFF5F2' }}>
                    <MapPin style={{ color: '#FF6B35' }} size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Office Address</h3>
                    <p className="text-gray-600">
                      123 Business Avenue, Suite 100<br />
                      New York, NY 10001
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4" data-testid="info-phone">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FFF5F2' }}>
                    <Phone style={{ color: '#FF6B35' }} size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                    <p className="text-sm text-gray-500 mt-1">Mon-Fri: 9:00 AM - 6:00 PM EST</p>
                  </div>
                </div>

                <div className="flex items-start gap-4" data-testid="info-email">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FFF5F2' }}>
                    <Mail style={{ color: '#FF6B35' }} size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-gray-600">contact@tranquilpeeplz.com</p>
                    <p className="text-sm text-gray-500 mt-1">We'll respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4" data-testid="info-hours">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FFF5F2' }}>
                    <Clock style={{ color: '#FF6B35' }} size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Business Hours</h3>
                    <p className="text-gray-600">
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 10:00 AM - 2:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="mt-8 rounded-lg overflow-hidden" data-testid="map-placeholder">
                <img
                  src="https://images.unsplash.com/photo-1740933084056-078fac872bff"
                  alt="Office location"
                  className="w-full h-64 object-cover"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div data-testid="contact-form-section">
              <div className="card p-8">
                <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} data-testid="contact-form">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2" htmlFor="name">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        data-testid="input-name"
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
                      <label className="block text-sm font-medium mb-2" htmlFor="contact_type">
                        I am a *
                      </label>
                      <select
                        id="contact_type"
                        name="contact_type"
                        value={formData.contact_type}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        data-testid="select-contact-type"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="employer">Employer</option>
                        <option value="employee">Job Seeker</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2" htmlFor="message">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        placeholder="Tell us how we can help you..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        data-testid="textarea-message"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full"
                      data-testid="submit-contact-btn"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-gray-50" data-testid="faq-section">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="card p-6" data-testid="faq-1">
              <h3 className="text-xl font-semibold mb-3" style={{ color: '#FF6B35' }}>
                How quickly can you fill a position?
              </h3>
              <p className="text-gray-700">
                Typically, we can present qualified candidates within 48-72 hours and fill positions within 2-4 weeks, depending on the role's complexity and requirements.
              </p>
            </div>
            <div className="card p-6" data-testid="faq-2">
              <h3 className="text-xl font-semibold mb-3" style={{ color: '#FF6B35' }}>
                What industries do you specialize in?
              </h3>
              <p className="text-gray-700">
                We work across all major industries including Technology, Healthcare, Finance, Manufacturing, Retail, Education, Hospitality, and Construction.
              </p>
            </div>
            <div className="card p-6" data-testid="faq-3">
              <h3 className="text-xl font-semibold mb-3" style={{ color: '#FF6B35' }}>
                Is there a fee for job seekers?
              </h3>
              <p className="text-gray-700">
                No, our services are completely free for job seekers. Employers pay for our recruitment services.
              </p>
            </div>
            <div className="card p-6" data-testid="faq-4">
              <h3 className="text-xl font-semibold mb-3" style={{ color: '#FF6B35' }}>
                What is your replacement guarantee?
              </h3>
              <p className="text-gray-700">
                We offer a 90-day replacement guarantee. If a placed candidate doesn't work out within the first 90 days, we'll find a replacement at no additional cost.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;