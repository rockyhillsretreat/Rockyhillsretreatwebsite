import { Link } from 'react-router-dom';
import { Mail, Phone, Instagram, Facebook } from 'lucide-react';

export function Footer() {
  const quickLinks = [
    { to: '/', label: 'Home' },
    { to: '/retreat', label: 'The Retreat' },
    { to: '/packages', label: 'Packages' },
    { to: '/experiences', label: 'Experiences' },
    { to: '/provisions', label: 'Food & Providores' },
    { to: '/location', label: 'Location' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/journal', label: 'Journal' },
  ];

  const policyLinks = [
    { to: '/faqs', label: 'FAQs' },
    { to: '/policies', label: 'Terms & Policies' },
  ];

  return (
    <footer
      className="mt-20"
      style={{
        backgroundColor: '#2E3D45',
        borderTop: '1px solid rgba(143, 169, 179, 0.2)',
      }}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Link
              to="/"
              className="block transition-opacity hover:opacity-70"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.5rem',
                color: '#EDE9E3',
                letterSpacing: '0.02em',
              }}
            >
              Rocky Hills Retreat
            </Link>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.95rem',
                color: '#B8AE9F',
                lineHeight: '1.6',
              }}
            >
              A secluded hilltop retreat for two on Tasmania's east coast.
              <br />
              Quiet luxury, nature, and time to breathe.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="mb-4"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.875rem',
                color: '#EDE9E3',
                fontWeight: 600,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              Navigate
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="transition-colors hover:opacity-70"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.9rem',
                      color: '#B8AE9F',
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="mb-4"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.875rem',
                color: '#EDE9E3',
                fontWeight: 600,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:stay@rockyhillsretreat.com.au"
                  className="flex items-center gap-2 transition-colors hover:opacity-70"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.9rem',
                    color: '#B8AE9F',
                  }}
                >
                  <Mail size={16} style={{ color: '#8FA9B3' }} />
                  stay@rockyhillsretreat.com.au
                </a>
              </li>
              <li>
                <a
                  href="tel:+61499645344"
                  className="flex items-center gap-2 transition-colors hover:opacity-70"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.9rem',
                    color: '#B8AE9F',
                  }}
                >
                  <Phone size={16} style={{ color: '#8FA9B3' }} />
                  +61 499 645 344
                </a>
              </li>
              <li className="pt-2">
                <Link
                  to="/booking"
                  className="inline-block transition-colors"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.9rem',
                    color: '#8FA9B3',
                    fontWeight: 500,
                  }}
                >
                  Book Your Stay →
                </Link>
              </li>
              <li className="pt-3">
                <div className="flex items-center gap-4">
                  <a
                    href="https://www.instagram.com/rockyhillsretreat/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-opacity hover:opacity-70"
                    aria-label="Instagram"
                    style={{ color: '#8FA9B3' }}
                  >
                    <Instagram size={18} />
                  </a>
                  <a
                    href="https://www.facebook.com/rockyhillsretreat"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-opacity hover:opacity-70"
                    aria-label="Facebook"
                    style={{ color: '#8FA9B3' }}
                  >
                    <Facebook size={18} />
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4
              className="mb-4"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.875rem',
                color: '#EDE9E3',
                fontWeight: 600,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              Policies
            </h4>
            <ul className="space-y-2">
              {policyLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="transition-colors hover:opacity-70"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.9rem',
                      color: '#B8AE9F',
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{
            borderTop: '1px solid rgba(143, 169, 179, 0.2)',
          }}
        >
          <div className="text-center md:text-left">
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.85rem',
                color: '#B8AE9F',
                marginBottom: '0.5rem'
              }}
            >
              © {new Date().getFullYear()} Rocky Hills Retreat. All rights reserved.
            </p>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.8rem',
                color: '#8FA9B3',
                fontStyle: 'italic'
              }}
            >
              Working toward Sustainable Tourism Certification. Off-grid solar and rainwater. East Coast Tasmania.
            </p>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.8rem',
                color: '#8FA9B3',
                fontStyle: 'italic'
              }}
            >
              ABN 11 659 409 588
            </p>
          </div>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.85rem',
              color: '#B8AE9F',
            }}
          >
            Rocky Hills, Tasmania
          </p>
        </div>

        {/* Acknowledgement */}
        <div className="mt-8 pt-6" style={{ borderTop: '1px solid rgba(143, 169, 179, 0.15)' }}>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.75rem',
              color: '#8FA9B3',
              textAlign: 'center',
              lineHeight: '1.6'
            }}
          >
            Rocky Hills acknowledges the Mumirimina people of the Oyster Bay Nation (Paredarerme) and the Big River Nation (Lairmairrener) as the traditional custodians of this country. This land was never ceded.
          </p>
        </div>
      </div>
    </footer>
  );
}
