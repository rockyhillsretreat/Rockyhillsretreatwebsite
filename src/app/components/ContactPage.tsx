import { useState } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Mail, Phone, MapPin } from "lucide-react";
const bgImg = 'https://res.cloudinary.com/dfvjhslxp/image/upload/retreat-exterior-entry-native-garden.jpg';

export function ContactPage() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', inquiryType: 'General Inquiry', message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send');
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please email us directly at stay@rockyhillsretreat.com.au');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ backgroundColor: '#26333A', minHeight: '100vh', position: 'relative' }}>
      {/* Background */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <ImageWithFallback
          src={bgImg}
          alt="Interior detail"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 space-y-6">
            <h1 className="text-5xl md:text-7xl lg:text-8xl text-bone heading-display">
              Contact
            </h1>
            <p className="text-xl md:text-2xl text-bone/80 italic max-w-2xl mx-auto leading-relaxed">
              Questions welcome. We reply carefully. Write to us.
            </p>
            <div className="h-px w-32 bg-muted-gold/50 mx-auto" />
          </div>

          {/* Contact Methods */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Email */}
            <div className="bg-card/40 backdrop-blur-sm border border-border p-8 space-y-4 group hover:border-muted-gold/50 transition-cinematic">
              <div className="w-12 h-12 border border-muted-gold/30 flex items-center justify-center group-hover:border-muted-gold transition-cinematic">
                <Mail size={24} className="text-muted-gold" />
              </div>
              <h3 className="text-2xl text-bone heading-display">Email</h3>
              <p className="text-bone/50 text-sm italic">
                For reservations, inquiries, or poetic correspondence.
              </p>
              <a
                href="mailto:stay@rockyhillsretreat.com.au"
                className="block text-bone hover:text-muted-gold transition-cinematic pt-4 border-t border-border/30"
              >
                stay@rockyhillsretreat.com.au
              </a>
            </div>

            {/* Phone */}
            <div className="bg-card/40 backdrop-blur-sm border border-border p-8 space-y-4 group hover:border-muted-gold/50 transition-cinematic">
              <div className="w-12 h-12 border border-muted-gold/30 flex items-center justify-center group-hover:border-muted-gold transition-cinematic">
                <Phone size={24} className="text-muted-gold" />
              </div>
              <h3 className="text-2xl text-bone heading-display">Phone</h3>
              <p className="text-bone/50 text-sm italic">
                For urgent matters. Available 9am to 6pm AEST.
              </p>
              <a
                href="tel:+61499645344"
                className="block text-bone hover:text-muted-gold transition-cinematic pt-4 border-t border-border/30"
              >
                +61 499 645 344
              </a>
            </div>

            {/* Location */}
            <div className="bg-card/40 backdrop-blur-sm border border-border p-8 space-y-4 group hover:border-muted-gold/50 transition-cinematic">
              <div className="w-12 h-12 border border-muted-gold/30 flex items-center justify-center group-hover:border-muted-gold transition-cinematic">
                <MapPin size={24} className="text-muted-gold" />
              </div>
              <h3 className="text-2xl text-bone heading-display">Location</h3>
              <p className="text-bone/50 text-sm italic">
                For those who prefer to visit in person.
              </p>
              <p className="text-bone/70 text-sm pt-4 border-t border-border/30 leading-relaxed">
                Rocky Hills Retreat<br />
                11901 Tasman Highway<br />
                Rocky Hills, TAS, 7190<br />
                Australia
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-ink-black border border-muted-gold/30 p-8 lg:p-12 mb-16">
            <div className="text-center mb-10">
              <h6 className="text-muted-gold tracking-widest mb-3">SEND A MESSAGE</h6>
              <h2 className="text-3xl md:text-4xl text-bone heading-display mb-4">
                We're Listening
              </h2>
              <p className="text-bone/60 text-sm italic">
                Response time: within 24 hours, often sooner.
              </p>
            </div>

            {success ? (
              <div className="text-center py-12 space-y-4">
                <p className="text-2xl text-bone heading-display">We'll be in touch.</p>
                <p className="text-bone/60 text-sm italic">Your message has been sent. We reply to every enquiry.</p>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-bone/70 mb-2 block">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      placeholder="Your first name"
                      required
                      className="w-full bg-input-background border border-border text-bone p-3"
                    />
                  </div>
                  <div>
                    <label className="text-bone/70 mb-2 block">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      placeholder="Your last name"
                      className="w-full bg-input-background border border-border text-bone p-3"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-bone/70 mb-2 block">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="w-full bg-input-background border border-border text-bone p-3"
                  />
                </div>

                <div>
                  <label className="text-bone/70 mb-2 block">Phone (Optional)</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+61"
                    className="w-full bg-input-background border border-border text-bone p-3"
                  />
                </div>

                <div>
                  <label className="text-bone/70 mb-2 block">Inquiry Type</label>
                  <select
                    name="inquiryType"
                    value={form.inquiryType}
                    onChange={handleChange}
                    className="w-full bg-input-background border border-border text-bone p-3 focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option>General Inquiry</option>
                    <option>Booking Question</option>
                    <option>Experience Add-Ons</option>
                    <option>Special Requests</option>
                    <option>Media / Press</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-bone/70 mb-2 block">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Tell us what you need. Or what you're hoping for. We read every word."
                    required
                    className="w-full bg-input-background border border-border text-bone p-4 resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                {error && (
                  <p className="text-sm text-bone/70 bg-destructive/20 border border-destructive/30 p-3">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-muted-gold text-primary-brand hover:bg-bone transition-cinematic tracking-widest disabled:opacity-60"
                >
                  {loading ? 'SENDING…' : 'SEND MESSAGE'}
                </button>
              </form>
            )}
          </div>

          {/* Poetic Close */}
          <div className="text-center space-y-6 py-16">
            <p className="text-2xl md:text-3xl text-bone/80 italic leading-loose heading-display">
              We believe in slow communication.<br />
              In words chosen carefully.<br />
              In questions that deserve thoughtful answers.
            </p>
            <div className="h-px w-32 bg-muted-gold/50 mx-auto" />
            <p className="text-bone/50 text-sm">
              Whatever you need, we're here.
            </p>
          </div>

          {/* FAQ Quick Links */}
          <div className="bg-card/40 backdrop-blur-sm border border-border p-8 space-y-6">
            <h3 className="text-2xl text-bone heading-display mb-6">Common Questions</h3>
            <div className="space-y-4 text-sm">
              <div className="pb-4 border-b border-border/30">
                <h5 className="text-bone mb-2">What's your cancellation policy?</h5>
                <p className="text-bone/60">
                  Full refund less a $150 cancellation fee if cancelled 31 or more days before arrival.
                  No refund within 30 days of arrival. See our full terms for details.
                </p>
              </div>
              <div className="pb-4 border-b border-border/30">
                <h5 className="text-bone mb-2">Is the retreat suitable for children?</h5>
                <p className="text-bone/60">
                  Rocky Hills is designed for adults. Children may be accommodated by prior arrangement. Please contact us before booking to discuss.
                </p>
              </div>
              <div className="pb-4 border-b border-border/30">
                <h5 className="text-bone mb-2">Do you allow pets?</h5>
                <p className="text-bone/60">
                  Unfortunately no. The retreat sits within protected wildlife habitat,
                  and domestic animals can disturb native species.
                </p>
              </div>
              <div className="pb-4 border-b border-border/30">
                <h5 className="text-bone mb-2">Is the space wheelchair accessible?</h5>
                <p className="text-bone/60">
                  Partially. The main living areas are accessible, but the outdoor bath
                  and some hiking trails are not. Please contact us to discuss your needs.
                </p>
              </div>
              <div>
                <h5 className="text-bone mb-2">When should I book?</h5>
                <p className="text-bone/60">
                  Summer (Nov-Feb) and Winter (June-August) book out quickly.
                  Spring and autumn offer more flexibility. We occasionally have last-minute availability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
