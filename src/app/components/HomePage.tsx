import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { img, P, C, V } from '../media';
import { VideoLoop } from './VideoLoop';
const heroImage = img(P.deckReading, 2400);
const retreatImg = img(P.exteriorGums, 900);
const experiencesImg = img(C.bayOfFiresBoat, 900);
const provisionsImg = img(P.fishersFreycinet, 900);
const locationImg = img(P.bayDusk, 900);
const tasmaniaImg = img(P.schoutenWindow, 1400);

export function HomePage() {
  const [scrollY, setScrollY] = useState(0);

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
      description: 'Concrete, blackwood, the bath, the bay',
      image: retreatImg,
      link: '/retreat',
    },
    {
      title: 'Experiences',
      description: 'Beaches, picnics, the water, the bush',
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

  const signatureExperiences = [
    {
      title: 'The Beach Picnic',
      summary: 'A hamper packed with Tasmanian produce, a rug, and a cove we will point you to. Back for the bath at sunset.',
      image: img(C.freycinetAerialBeach, 900),
      link: '/experiences#beach-picnic',
    },
    {
      title: 'From the Water',
      summary: 'Half a day on Great Oyster Bay with a local skipper. Flathead and squid, cooked back at the retreat.',
      image: img(C.freycinetSunsetRocks, 900),
      link: '/experiences#from-the-water',
    },
    {
      title: 'In the Air, Then at Rest',
      summary: 'Wineglass Bay and the Hazards from a helicopter, then a massage on the deck when you land.',
      image: img(C.wineglassAerialClassic, 900),
      link: '/experiences#in-the-air',
    },
    {
      title: 'Celebrate Here',
      summary: 'A proposal, an anniversary, a reason you made up. Photographer, hamper, and the bath ready on the deck.',
      image: img(P.bathOnDeck, 900),
      link: '/experiences#celebrate-here',
    },
  ];

  // Genuine Google reviews, quoted word for word (excerpts). Reviewer names are not shown.
  const testimonials = [
    {
      quote: "My wife and I booked Rocky Hills Retreat to celebrate our 20th wedding anniversary and we couldn\u2019t have been more thankful. The property feels like it\u2019s in the wilderness, nestled high amongst the tree tops with 270 degree views of the bushland and the water.",
      author: 'Google review',
    },
    {
      quote: "The best decision we made! A beautiful, secluded, ambient and peaceful retreat! With all of the trimmings to make us feel at home in luxury. Truly immersed in nature. We only had one regret, not booking another night!",
      author: 'Google review',
    },
    {
      quote: "A special place of laidback luxury and combines curiosity and creativity. Stunning surroundings. Great attention to detail.",
      author: 'Google review',
    },
  ];

  const heroParallax = scrollY * 0.5;
  const contentParallax = scrollY * 0.3;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#26333A' }}>
      {/* Hero Section with Parallax */}
      <section className="relative h-screen overflow-hidden">
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
            style={{ objectPosition: 'center 55%' }}
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
            Off-grid. Uninterrupted.
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4"
            style={{
              opacity: Math.max(0, 1 - scrollY / 400),
              transition: 'opacity 0.1s ease-out',
            }}
          >
            <Link
              to="/booking"
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
              Book Now
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

      {/* Signature Experiences */}
      <section className="py-24" style={{ backgroundColor: '#26333A' }}>
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <h2
            className="text-center mb-4"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 4vw, 2.5rem)',
              color: '#EDE9E3',
            }}
          >
            Signature Experiences
          </h2>
          <p
            className="text-center mb-16 mx-auto"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.05rem', color: '#B8AE9F', maxWidth: '640px', lineHeight: '1.7' }}
          >
            Add one to any stay. We arrange everything before you arrive.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {signatureExperiences.map((exp) => (
              <Link key={exp.title} to={exp.link} className="group" style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none' }}>
                <div className="overflow-hidden mb-5" style={{ borderRadius: '0.5rem' }}>
                  <img
                    src={exp.image}
                    alt={exp.title}
                    loading="lazy"
                    className="w-full h-[320px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="mb-2" style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', color: '#EDE9E3' }}>
                  {exp.title}
                </h3>
                <p className="mb-4" style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.95rem', color: '#B8AE9F', lineHeight: '1.6', flexGrow: 1 }}>
                  {exp.summary}
                </p>
                <span style={{ color: '#8FA9B3', fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', fontWeight: 500, textDecoration: 'underline' }}>
                  See the experience
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Summer on the coast: video band */}
      <section className="relative overflow-hidden" style={{ height: '70vh', minHeight: '420px' }}>
        <VideoLoop videoId={V.whiteSandBay} fallbackImage={img(C.whiteSandBay, 1920)} className="absolute inset-0 w-full h-full" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(38,51,58,0.75) 0%, rgba(38,51,58,0.1) 55%)' }} />
        <div className="relative h-full max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col justify-end pb-16">
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 5vw, 3.25rem)', color: '#F4EFE8', lineHeight: '1.1', maxWidth: '760px' }}>
            Long days. Cold water. Nobody else on the sand.
          </h2>
          <p className="mt-4" style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.1rem', color: '#EDE9E3', maxWidth: '600px', lineHeight: '1.7' }}>
            Summer on the East Coast means swims before breakfast and light on the bay until nearly nine.
          </p>
          <div className="mt-8">
            <Link
              to="/experiences"
              style={{ display: 'inline-block', backgroundColor: '#8FA9B3', color: '#26333A', padding: '0.875rem 2rem', borderRadius: '0.5rem', fontFamily: "'Inter', sans-serif", fontSize: '1rem', fontWeight: 500 }}
            >
              Summer Experiences
            </Link>
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
                On Tasmania's east coast, fifteen minutes south of Swansea. A hilltop position with views across Great
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

      {/* Wildlife: video band */}
      <section className="relative overflow-hidden" style={{ height: '70vh', minHeight: '420px' }}>
        <VideoLoop videoId={V.wallabiesGold} fallbackImage={img(C.wallabiesGold, 1920)} className="absolute inset-0 w-full h-full" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(38,51,58,0.8) 0%, rgba(38,51,58,0.05) 60%)' }} />
        <div className="relative h-full max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col justify-end pb-16">
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 5vw, 3.25rem)', color: '#F4EFE8', lineHeight: '1.1', maxWidth: '760px' }}>
            The neighbours come out at dusk.
          </h2>
          <p className="mt-4" style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.1rem', color: '#EDE9E3', maxWidth: '620px', lineHeight: '1.7' }}>
            Wallabies at the edge of the bush, echidnas in the afternoon, quolls and possums after dark. 250 acres of protected land, and they know it.
          </p>
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
          <p className="text-center -mt-10 mb-12" style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.95rem', color: '#B8AE9F' }}>
            Rated 4.5 on Google.{' '}
            <a
              href="https://www.google.com/maps/place/?q=place_id:ChIJVz4rYdKFcaoROWLPt2g6PWw"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#8FA9B3', textDecoration: 'underline' }}
            >
              Read all reviews
            </a>
          </p>
          <div className="grid md:grid-cols-3 gap-8">
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

      {/* Aurora: video band */}
      <section className="relative overflow-hidden" style={{ height: '75vh', minHeight: '440px' }}>
        <VideoLoop videoId={V.auroraWineglass} fallbackImage={img(C.auroraWineglass, 1920)} className="absolute inset-0 w-full h-full" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(11,15,15,0.75) 0%, rgba(11,15,15,0) 55%)' }} />
        <div className="relative h-full max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col justify-end pb-16">
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: '#EDE9E3', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            Aurora australis over Wineglass Bay
          </p>
          <h2 className="mt-3" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 5vw, 3.25rem)', color: '#F4EFE8', lineHeight: '1.1', maxWidth: '760px' }}>
            On the right night, the sky does this.
          </h2>
          <p className="mt-4" style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.1rem', color: '#EDE9E3', maxWidth: '620px', lineHeight: '1.7' }}>
            No light pollution for kilometres. The Milky Way most clear nights, and every so often, the southern lights.
          </p>
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
            Two-night minimum, or three for arrivals 20 December to 10 January.
          </p>
          <Link
            to="/booking"
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
