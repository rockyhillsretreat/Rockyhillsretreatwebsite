import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
const heroImage = 'https://res.cloudinary.com/dfvjhslxp/image/upload/retreat-exterior-night.jpg';
const goDarkBg = 'https://res.cloudinary.com/dfvjhslxp/image/upload/retreat-exterior-chimney-dusk.jpg';
const retreatImg = 'https://res.cloudinary.com/dfvjhslxp/image/upload/retreat-exterior-entry-native-garden.jpg';
const experiencesImg = 'https://res.cloudinary.com/dfvjhslxp/image/upload/retreat-bath-running-golden.jpg';
const provisionsImg = 'https://res.cloudinary.com/dfvjhslxp/image/upload/bay-view-islands-cloud.jpg';
const locationImg = 'https://res.cloudinary.com/dfvjhslxp/image/upload/location-bay-sunset-wide.jpg';
const tasmaniaImg = 'https://res.cloudinary.com/dfvjhslxp/image/upload/bay-view-swansea-coast.jpg';

export function HomePage() {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const highlights = [
    {
      title: 'The Retreat',
      description: 'Concrete, blackwood, fire, bath, bay',
      image: retreatImg,
      link: '/retreat',
    },
    {
      title: 'Experiences',
      description: 'Foraging, fishing, hiking, the coast',
      image: experiencesImg,
      link: '/experiences',
    },
    {
      title: 'Food & Providores',
      description: 'Local producers, delivered to your door',
      image: provisionsImg,
      link: '/provisions',
    },
    {
      title: 'The Land',
      description: '250 acres. Off-grid. Conservation covenant.',
      image: locationImg,
      link: '/location',
    },
  ];

  const packages = [
    {
      title: "In the Air, Then at Rest",
      summary: 'Three nights. The East Coast from above, a therapist at the door, and the Huon pine bath waiting on the deck.',
      price: 'From $5,500',
      link: '/packages',
    },
    {
      title: 'The Long Lunch',
      summary: 'Three nights built around four East Coast cellar doors, lunch in the vines, and a couples massage at the property.',
      price: 'From $3,150',
      link: '/packages',
    },
    {
      title: 'From the Water',
      summary: 'Three nights on Great Oyster Bay. Half a day with a local skipper, catch returned to the retreat, couples massage included.',
      price: 'From $3,250',
      link: '/packages',
    },
    {
      title: 'Celebrate Here',
      summary: 'Three nights for a proposal, an anniversary, or a reason you made up. Photographer, hamper, bath on the deck.',
      price: 'From $3,550',
      link: '/packages',
    },
  ];

  const testimonials = [
    {
      quote: "The most peaceful place we've ever stayed. Time seemed to slow down.",
      author: 'Sarah & Tom',
    },
    {
      quote: "Every detail was considered. The view, the quiet, the quality. Exceptional.",
      author: 'Emma',
    },
  ];

  const heroParallax = scrollY * 0.5;
  const contentParallax = scrollY * 0.3;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#26333A' }}>
      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        {/* Parallax Background Image */}
        <div
          className="absolute inset-0 w-full h-[120vh]"
          style={{
            transform: `translateY(${heroParallax}px)`,
            willChange: 'transform',
          }}
        >
          <img
            src={heroImage}
            alt="Rocky Hills Retreat Hero View"
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center 70%' }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(38, 51, 58, 0) 40%, rgba(38, 51, 58, 0.6) 100%)',
            }}
          />
        </div>

        {/* Hero Content */}
        <div
          className="absolute inset-0 flex flex-col justify-center items-center text-center px-6"
          style={{
            transform: `translateY(${contentParallax}px)`,
            willChange: 'transform',
          }}
        >
          <h1
            className="mb-6"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              color: '#F4EFE8',
              letterSpacing: '-0.01em',
              lineHeight: '1.1',
              maxWidth: '900px',
              opacity: Math.max(0, 1 - scrollY / 400),
              transition: 'opacity 0.1s ease-out',
            }}
          >
            Disappear here.
          </h1>
          <p
            className="mb-10"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1.25rem',
              color: '#F4EFE8',
              maxWidth: '600px',
              opacity: Math.max(0, 1 - scrollY / 400),
              transition: 'opacity 0.1s ease-out',
            }}
          >
            Go Dark. Mean It.
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4"
            style={{
              opacity: Math.max(0, 1 - scrollY / 400),
              transition: 'opacity 0.1s ease-out',
            }}
          >
            <Link
              to="/packages"
              style={{
                backgroundColor: '#8FA9B3',
                color: '#26333A',
                padding: '0.875rem 2rem',
                borderRadius: '0.5rem',
                fontFamily: "'Inter', sans-serif",
                fontSize: '1rem',
                fontWeight: 500,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                transition: 'all 0.3s ease',
              }}
            >
              The Offerings
            </Link>
            <Link
              to="/retreat"
              style={{
                backgroundColor: 'transparent',
                color: '#F4EFE8',
                padding: '0.875rem 2rem',
                border: '1px solid rgba(143, 169, 179, 0.5)',
                borderRadius: '0.5rem',
                fontFamily: "'Inter', sans-serif",
                fontSize: '1rem',
                fontWeight: 500,
                transition: 'all 0.3s ease',
              }}
            >
              The Retreat
            </Link>
          </div>
        </div>
      </section>

      {/* Introduction Section with Fade-in Parallax */}
<section className="py-24" style={{ backgroundColor: '#26333A' }}>
  <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
    <div
      className="max-w-[900px] mx-auto py-10"
      style={{
        transform: `translateY(${Math.max(0, (500 - scrollY) * 0.08)}px)`,
        opacity: Math.min(1, Math.max(0, (scrollY - 300) / 300)),
        transition: 'opacity 0.3s ease-out',
      }}
    >
      <p
        className="mb-0"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '1.5rem',
          color: '#EDE9E3',
          lineHeight: '1.8',
          textAlign: 'center',
          fontStyle: 'italic',
        }}
      >
        Be Off-Grid.<br />
        Everything else follows from that.<br />
        And the land. Slow. Particular.<br />
        You came a long way to get here. Now Stop.
      </p>
    </div>
  </div>
</section>

      {/* Go Dark Winter Section - Seasonal (June-August) with Parallax Background */}
      <section className="relative py-24 overflow-hidden" style={{ backgroundColor: '#0B0F0F', minHeight: '70vh' }}>
        {/* Parallax Background Image */}
        <div
          className="absolute inset-0"
          style={{
            transform: `translateY(${(scrollY - 600) * 0.3}px) scale(1.1)`,
            willChange: 'transform',
          }}
        >
          <img
            src={goDarkBg}
            alt="Winter at Rocky Hills"
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center' }}
          />
          {/* Dark overlay for readability */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(11, 15, 15, 0.75), rgba(11, 15, 15, 0.85))',
            }}
          />
        </div>

        {/* Content */}
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
          <div
            className="max-w-[900px] mx-auto text-center"
            style={{
              transform: `translateY(${Math.max(0, (800 - scrollY) * 0.05)}px)`,
              opacity: Math.min(1, Math.max(0, (scrollY - 400) / 200)),
              transition: 'opacity 0.3s ease-out',
            }}
          >
            <h2
              className="mb-6"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                color: '#EDE9E3',
                letterSpacing: '-0.01em',
                textShadow: '0 2px 12px rgba(0, 0, 0, 0.5)',
              }}
            >
              It's winter. Go Dark.
            </h2>
            <p
              className="mb-8"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '1.05rem',
                color: '#EDE9E3',
                lineHeight: '1.8',
                textShadow: '0 1px 8px rgba(0, 0, 0, 0.5)',
              }}
            >
              Three nights midweek. June, July, August. $1,500 flat rate. The humpbacks are moving through the bay. The sky above 250 acres is genuinely dark. The bath is waiting.
            </p>
            <Link
              to="/go-dark"
              style={{
                display: 'inline-block',
                backgroundColor: '#8FA9B3',
                color: '#0B0F0F',
                padding: '0.75rem 1.75rem',
                borderRadius: '0.5rem',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.95rem',
                fontWeight: 500,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
                transition: 'all 0.3s ease',
              }}
            >
              See the offer
            </Link>
          </div>
        </div>
      </section>

      {/* Eco Statement Section */}
      <section className="py-20" style={{ backgroundColor: '#2E3D45' }}>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="max-w-[900px] mx-auto">
            <p
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.5rem',
                color: '#EDE9E3',
                lineHeight: '1.8',
                textAlign: 'center',
                fontStyle: 'italic',
              }}
            >
              Fully off-grid. Built to take less than it gives.
            </p>
          </div>
        </div>
      </section>

      {/* Highlights Section with Staggered Parallax */}
      <section className="py-24" style={{ backgroundColor: '#2E3D45' }}>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <h2
            className="text-center mb-16"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 4vw, 2.5rem)',
              color: '#EDE9E3',
              transform: `translateY(${Math.max(0, (1000 - scrollY) * 0.05)}px)`,
              opacity: Math.min(1, Math.max(0, (scrollY - 600) / 200)),
              transition: 'opacity 0.3s ease-out',
            }}
          >
            Explore
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((highlight, index) => (
              <Link
                key={index}
                to={highlight.link}
                className="group transition-all"
                style={{
                  transform: `translateY(${Math.max(0, (1200 - scrollY) * (0.03 + index * 0.01))}px)`,
                  opacity: Math.min(1, Math.max(0, (scrollY - 700 - index * 50) / 150)),
                  transition: 'opacity 0.3s ease-out',
                }}
              >
                <div className="overflow-hidden mb-4" style={{ borderRadius: '0.5rem' }}>
                  <ImageWithFallback
                    src={highlight.image}
                    alt={highlight.title}
                    className="w-full h-[280px] object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '1.5rem',
                    color: '#EDE9E3',
                    marginBottom: '0.5rem',
                  }}
                >
                  {highlight.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.95rem',
                    color: '#B8AE9F',
                    lineHeight: '1.6',
                  }}
                >
                  {highlight.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Teaser */}
      <section className="py-24" style={{ backgroundColor: '#26333A' }}>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <h2
            className="text-center mb-16"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 4vw, 2.5rem)',
              color: '#EDE9E3',
            }}
          >
            Signature Packages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1000px] mx-auto">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className="p-8 transition-all hover:shadow-soft-lg"
                style={{
                  backgroundColor: '#2E3D45',
                  borderRadius: '0.5rem',
                  border: '1px solid rgba(198, 184, 163, 0.15)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <h3
                  className="mb-3"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '1.75rem',
                    color: '#EDE9E3',
                  }}
                >
                  {pkg.title}
                </h3>
                <p
                  className="mb-4"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.95rem',
                    color: '#B8AE9F',
                    lineHeight: '1.6',
                    flexGrow: 1,
                  }}
                >
                  {pkg.summary}
                </p>
                <p
                  className="mb-6"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '1.5rem',
                    color: '#8FA9B3',
                  }}
                >
                  {pkg.price}
                </p>
                <Link
                  to={pkg.link}
                  style={{
                    display: 'inline-block',
                    color: '#8FA9B3',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    textDecoration: 'underline',
                    transition: 'all 0.3s ease',
                  }}
                >
                  View Package
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Teaser with Parallax Image */}
      <section className="relative py-24 overflow-hidden" style={{ backgroundColor: '#2E3D45' }}>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative z-10">
              <h2
                className="mb-6"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                  color: '#EDE9E3',
                }}
              >
                Where to Find Us
              </h2>
              <p
                className="mb-8"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '1.05rem',
                  color: '#EDE9E3',
                  lineHeight: '1.8',
                }}
              >
                On the east coast of Tasmania, between Swansea and the sea. A hilltop position with views across Great
                Oyster Bay and the surrounding bushland.
              </p>
              <Link
                to="/location"
                style={{
                  display: 'inline-block',
                  backgroundColor: '#8FA9B3',
                  color: '#26333A',
                  padding: '0.75rem 1.75rem',
                  borderRadius: '0.5rem',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                  transition: 'all 0.3s ease',
                }}
              >
                Getting Here
              </Link>
            </div>
            <div
              className="overflow-hidden relative z-10"
              style={{
                borderRadius: '0.5rem',
                transform: `translateY(${Math.min(0, (scrollY - 2000) * 0.1)}px)`,
                transition: 'transform 0.1s ease-out',
              }}
            >
              <ImageWithFallback
                src={tasmaniaImg}
                alt="Tasmania Location"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24" style={{ backgroundColor: '#26333A' }}>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <h2
            className="text-center mb-16"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 4vw, 2.5rem)',
              color: '#EDE9E3',
            }}
          >
            Guest Reflections
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-8"
                style={{
                  backgroundColor: '#2E3D45',
                  borderRadius: '0.5rem',
                  border: '1px solid rgba(198, 184, 163, 0.15)',
                }}
              >
                <p
                  className="mb-4"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '1.25rem',
                    color: '#EDE9E3',
                    lineHeight: '1.6',
                    fontStyle: 'italic',
                  }}
                >
                  "{testimonial.quote}"
                </p>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.95rem',
                    color: '#B8AE9F',
                  }}
                >
                  {testimonial.author}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Book Now Section */}
      <section className="py-24" style={{ backgroundColor: '#2E3D45' }}>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 text-center">
          <h2
            className="mb-4"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 4vw, 2.5rem)',
              color: '#EDE9E3',
            }}
          >
            Ready when you are.
          </h2>
          <p
            className="mb-8"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1.125rem',
              color: '#B8AE9F',
            }}
          >
            Two-night minimum.
          </p>
          <Link
            to="/contact"
            style={{
              display: 'inline-block',
              backgroundColor: '#8FA9B3',
              color: '#26333A',
              padding: '0.875rem 2rem',
              borderRadius: '0.5rem',
              fontFamily: "'Inter', sans-serif",
              fontSize: '1rem',
              fontWeight: 500,
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.3s ease',
            }}
          >
            Check Availability
          </Link>
        </div>
      </section>

      {/* Acknowledgement */}
      <section className="py-16" style={{ backgroundColor: '#26333A' }}>
        <div className="max-w-[900px] mx-auto px-6 text-center">
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.875rem',
              color: '#B8AE9F',
              lineHeight: '1.8',
            }}
          >
            Rocky Hills sits on the country of the Mumirimina clan of the Oyster Bay Nation (Paredarerme) and the Big River Nation (Lairmairrener), who have cared for this land and this water for tens of thousands of years. We acknowledge their continuing connection to country and pay our respects to Elders past and present. This country was never ceded.
          </p>
        </div>
      </section>
    </div>
  );
}
