import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

export function ConfirmationPage() {
  useEffect(() => {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({ event: 'booking_complete' });
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#26333A' }}>
      <div className="max-w-[700px] mx-auto px-6 pt-40 pb-24 text-center">

        <div
          style={{
            width: 64, height: 64, borderRadius: '50%',
            backgroundColor: 'rgba(143, 169, 179, 0.15)',
            border: '2px solid #8FA9B3',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 2rem',
          }}
        >
          <Check size={28} style={{ color: '#8FA9B3' }} />
        </div>

        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            color: '#EDE9E3',
            letterSpacing: '-0.01em',
            marginBottom: '1.5rem',
          }}
        >
          You're booked.
        </h1>

        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '1.05rem',
            color: '#EDE9E3',
            lineHeight: '1.8',
            marginBottom: '1rem',
          }}
        >
          A confirmation has been sent to your email. Check your inbox for your booking details, arrival instructions, and what to expect.
        </p>

        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '1.05rem',
            color: '#B8AE9F',
            lineHeight: '1.8',
            marginBottom: '3rem',
          }}
        >
          If you selected any experiences, provisions, or add-ons, we will be in touch separately to confirm and arrange everything before you arrive.
        </p>

        <div
          style={{
            padding: '2rem',
            backgroundColor: '#2E3D45',
            borderRadius: '0.5rem',
            border: '1px solid rgba(143, 169, 179, 0.2)',
            marginBottom: '3rem',
            textAlign: 'left',
          }}
        >
          <h3
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.25rem',
              color: '#EDE9E3',
              marginBottom: '1rem',
            }}
          >
            Before you arrive
          </h3>
          {[
            'Check-in is from 2pm. Check-out by 10am.',
            'The property is self-contained. Full arrival instructions will be in your confirmation email.',
            'Your first morning is taken care of. Contact us before arrival if you would like additional provisions stocked.',
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3" style={{ marginBottom: '0.75rem' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#8FA9B3', marginTop: '0.55rem', flexShrink: 0 }} />
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.95rem', color: '#B8AE9F', lineHeight: '1.6' }}>{item}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            style={{
              display: 'inline-block',
              backgroundColor: '#8FA9B3',
              color: '#26333A',
              padding: '0.875rem 2rem',
              borderRadius: '0.5rem',
              fontFamily: "'Inter', sans-serif",
              fontSize: '1rem',
              fontWeight: 500,
              textDecoration: 'none',
            }}
          >
            Back to Rocky Hills
          </Link>
          <a
            href="mailto:stay@rockyhillsretreat.com.au"
            style={{
              display: 'inline-block',
              backgroundColor: 'transparent',
              color: '#EDE9E3',
              padding: '0.875rem 2rem',
              borderRadius: '0.5rem',
              border: '1px solid rgba(143, 169, 179, 0.4)',
              fontFamily: "'Inter', sans-serif",
              fontSize: '1rem',
              fontWeight: 500,
              textDecoration: 'none',
            }}
          >
            Questions? Email Us
          </a>
        </div>

      </div>
    </div>
  );
}
