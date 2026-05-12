import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Mail, Phone, MapPin } from "lucide-react";
const bgImg = 'https://res.cloudinary.com/dfvjhslxp/image/upload/retreat-exterior-entry-native-garden.jpg';

export function ContactPage() {
  return (
    <div style={{ backgroundColor: '#26333A', minHeight: '100vh', position: 'relative' }}>
      {/* Background */}
      <div className="fixed inset-0 opacity-10">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
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
                For urgent matters. Available 9am–6pm AEST.
              </p>
              <a
                href="tel:+61234567890"
                className="block text-bone hover:text-muted-gold transition-cinematic pt-4 border-t border-border/30"
              >
                +61 (0) 234 567 890
              </a>
            </div>

            {/* MapPin */}
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
                PO Box 247<br />
                East Coast, TAS 7215<br />
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

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-bone/70 mb-2 block">First Name</Label>
                  <Input
                    type="text"
                    placeholder="Your first name"
                    className="bg-input-background border-border text-bone"
                  />
                </div>
                <div>
                  <Label className="text-bone/70 mb-2 block">Last Name</Label>
                  <Input
                    type="text"
                    placeholder="Your last name"
                    className="bg-input-background border-border text-bone"
                  />
                </div>
              </div>

              <div>
                <Label className="text-bone/70 mb-2 block">Email Address</Label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  className="bg-input-background border-border text-bone"
                />
              </div>

              <div>
                <Label className="text-bone/70 mb-2 block">Phone (Optional)</Label>
                <Input
                  type="tel"
                  placeholder="+61"
                  className="bg-input-background border-border text-bone"
                />
              </div>

              <div>
                <Label className="text-bone/70 mb-2 block">Inquiry Type</Label>
                <select className="w-full bg-input-background border border-border text-bone p-3 focus:outline-none focus:ring-2 focus:ring-ring">
                  <option>General Inquiry</option>
                  <option>Booking Question</option>
                  <option>Experience Add-Ons</option>
                  <option>Special Requests</option>
                  <option>Media / Press</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <Label className="text-bone/70 mb-2 block">Message</Label>
                <textarea
                  rows={6}
                  placeholder="Tell us what you need. Or what you're hoping for. We read every word."
                  className="w-full bg-input-background border border-border text-bone p-4 resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-muted-gold text-primary-brand hover:bg-bone transition-cinematic tracking-widest"
              >
                SEND MESSAGE
              </button>
            </form>
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
                  Full refund if cancelled 30+ days before arrival. 50% refund for 14-29 days. 
                  No refund within 14 days (though we're understanding in emergencies).
                </p>
              </div>
              <div className="pb-4 border-b border-border/30">
                <h5 className="text-bone mb-2">Is the retreat suitable for children?</h5>
                <p className="text-bone/60">
                  Rocky Hills Retreat is designed exclusively for couples. 
                  Guests must be 18+. No exceptions.
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
                  Winter (June-August) books out 3-6 months in advance. 
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
