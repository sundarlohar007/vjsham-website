'use client';

import { useState, useMemo } from 'react';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { createClient } from '@supabase/supabase-js';

const eventTypes = [
  "Club Night",
  "Festival",
  "Corporate Event",
  "Private Party",
  "Wedding",
  "Product Launch",
  "Fashion Show",
  "Concert/Tour",
  "Other",
];

const budgets = [
  "Under $500",
  "$500 - $1,000",
  "$1,000 - $2,500",
  "$2,500 - $5,000",
  "$5,000 - $10,000",
  "$10,000+",
];

export default function BookPage() {
  const supabase = useMemo(() => {
    if (typeof window === 'undefined') return null;
    return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    );
  }, []);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    eventType: '',
    date: '',
    venue: '',
    duration: '',
    budget: '',
    description: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    if (!supabase) {
      setSubmitStatus('error');
      setIsSubmitting(false);
      return;
    }
    
    try {
      const { error } = await supabase.from('bookings').insert([{
        name: formData.name,
        email: formData.email,
        event_type: formData.eventType,
        event_date: formData.date || null,
        venue: formData.venue || null,
        duration: formData.duration || null,
        budget: formData.budget || null,
        description: formData.description || null,
      }]);
      
      if (error) throw error;
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', eventType: '', date: '', venue: '', duration: '', budget: '', description: '' });
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-32 pb-24 px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-mono text-3xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Book</span>
            <span className="text-accent-primary"> Me</span>
          </h1>
          <p className="font-sans text-foreground-muted text-lg mb-10 md:mb-12">
            Ready to create an unforgettable visual experience? Fill out the form below 
            and I'll get back to you within 24-48 hours.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
            {/* Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="mb-2">
                <label className="block font-mono text-sm text-foreground-muted mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-3 sm:px-4 sm:py-3 bg-surface border border-surface-elevated rounded-xl text-foreground placeholder-foreground-muted focus:outline-none focus:border-accent-primary transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div className="mb-2">
                <label className="block font-mono text-sm text-foreground-muted mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-3 sm:px-4 sm:py-3 bg-surface border border-surface-elevated rounded-xl text-foreground placeholder-foreground-muted focus:outline-none focus:border-accent-primary transition-colors"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            
            {/* Event Type & Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="mb-2">
                <label className="block font-mono text-sm text-foreground-muted mb-2">
                  Event Type *
                </label>
                <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-3 sm:px-4 sm:py-3 bg-surface border border-surface-elevated rounded-xl text-foreground focus:outline-none focus:border-accent-primary transition-colors"
                >
                  <option value="">Select event type</option>
                  {eventTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div className="mb-2">
                <label className="block font-mono text-sm text-foreground-muted mb-2">
                  Event Date *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-3 sm:px-4 sm:py-3 bg-surface border border-surface-elevated rounded-xl text-foreground focus:outline-none focus:border-accent-primary transition-colors"
                />
              </div>
            </div>
            
            {/* Venue & Duration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="mb-2">
                <label className="block font-mono text-sm text-foreground-muted mb-2">
                  Venue / Location *
                </label>
                <input
                  type="text"
                  name="venue"
                  value={formData.venue}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-3 sm:px-4 sm:py-3 bg-surface border border-surface-elevated rounded-xl text-foreground placeholder-foreground-muted focus:outline-none focus:border-accent-primary transition-colors"
                  placeholder="Club Name, City"
                />
              </div>
              <div className="mb-2">
                <label className="block font-mono text-sm text-foreground-muted mb-2">
                  Duration *
                </label>
                <select
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-3 sm:px-4 sm:py-3 bg-surface border border-surface-elevated rounded-xl text-foreground focus:outline-none focus:border-accent-primary transition-colors"
                >
                  <option value="">Select duration</option>
                  <option value="2 hours">2 hours</option>
                  <option value="3 hours">3 hours</option>
                  <option value="4 hours">4 hours</option>
                  <option value="5+ hours">5+ hours</option>
                  <option value="Full night">Full night</option>
                </select>
              </div>
            </div>
            
            {/* Budget */}
            <div className="mb-2">
              <label className="block font-mono text-sm text-foreground-muted mb-2">
                Budget Range
              </label>
              <select
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-surface border border-surface-elevated rounded-xl text-foreground focus:outline-none focus:border-accent-primary transition-colors"
              >
                <option value="">Select budget range</option>
                {budgets.map((budget) => (
                  <option key={budget} value={budget}>{budget}</option>
                ))}
              </select>
            </div>
            
            {/* Description */}
            <div className="mb-2">
              <label className="block font-mono text-sm text-foreground-muted mb-2">
                Event Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-3 py-3 sm:px-4 sm:py-3 bg-surface border border-surface-elevated rounded-xl text-foreground placeholder-foreground-muted focus:outline-none focus:border-accent-primary transition-colors resize-none"
                placeholder="Tell me about your event, the vibe you're looking for, any specific visual requirements..."
              />
            </div>
            
            {/* Submit Button */}
            {submitStatus === 'success' && (
              <div className="p-4 bg-green-500/20 border border-green-500 rounded-xl text-green-400 text-center">
                Thank you! Your booking inquiry has been submitted. I'll get back to you soon!
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="p-4 bg-red-500/20 border border-red-500 rounded-xl text-red-400 text-center">
                Something went wrong. Please try again or contact me directly.
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-accent-primary text-background font-mono font-bold text-lg rounded-xl hover:bg-accent-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Sending...
                </span>
              ) : (
                "Send Inquiry"
              )}
            </button>
            
            <p className="text-center font-mono text-xs text-foreground-muted">
              I typically respond within 24-48 hours
            </p>
          </form>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
