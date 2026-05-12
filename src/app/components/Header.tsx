import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/retreat', label: 'The Retreat' },
    { to: '/packages', label: 'Packages' },
    { to: '/go-dark', label: 'Go Dark' },
    { to: '/provisions', label: 'Providores' },
    { to: '/experiences', label: 'Experiences' },
    { to: '/location', label: 'Location' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/journal', label: 'Journal' },
    { to: '/faqs', label: 'FAQs' },
    { to: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className="sticky top-0 z-50 transition-all"
      style={{
        backgroundColor: 'rgba(38, 51, 58, 0.95)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgba(143, 169, 179, 0.2)',
      }}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between py-5">
          {/* Logo */}
          <Link
            to="/"
            className="transition-opacity hover:opacity-70"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.5rem',
              color: '#EDE9E3',
              letterSpacing: '0.02em',
            }}
          >
            Rocky Hills Retreat
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="transition-all relative"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.9rem',
                  color: isActive(link.to) ? '#EDE9E3' : '#B8AE9F',
                  fontWeight: isActive(link.to) ? 500 : 400,
                }}
              >
                {link.label}
                {isActive(link.to) && (
                  <span
                    className="absolute -bottom-1 left-0 right-0 h-[2px]"
                    style={{ backgroundColor: '#8FA9B3' }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Book Button - Desktop */}
          <Link
            to="/booking"
            className="hidden xl:block btn-primary"
            style={{
              backgroundColor: '#8FA9B3',
              color: '#26333A',
              padding: '0.625rem 1.5rem',
              borderRadius: '0.5rem',
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.875rem',
              fontWeight: 500,
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.3s ease',
            }}
          >
            Book Your Stay
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 transition-colors"
            style={{ color: '#EDE9E3' }}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="xl:hidden"
          style={{
            backgroundColor: '#2E3D45',
            borderTop: '1px solid rgba(143, 169, 179, 0.2)',
          }}
        >
          <nav className="px-6 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 transition-colors"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '1rem',
                  color: isActive(link.to) ? '#EDE9E3' : '#B8AE9F',
                  fontWeight: isActive(link.to) ? 500 : 400,
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/booking"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center mt-6"
              style={{
                backgroundColor: '#8FA9B3',
                color: '#26333A',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.875rem',
                fontWeight: 500,
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
              }}
            >
              Book Your Stay
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
