import { Palette, Activity } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Link } from "react-router-dom";
const heroImg = 'https://res.cloudinary.com/dfvjhslxp/image/upload/interior-living-sunlight.jpg';
const studioImg = 'https://res.cloudinary.com/dfvjhslxp/image/upload/interior-leather-chair-sunlight.jpg';

export function StudioPage() {
  return (
    <div style={{ backgroundColor: '#26333A', minHeight: '100vh' }}>
      {/* Header Space Section */}
      <section className="pt-20 pb-24 px-6" style={{ backgroundColor: '#26333A' }}>
        <div className="max-w-[1200px] mx-auto text-center space-y-8">
          <h1 
            style={{ 
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.5rem, 6vw, 3.5rem)',
              color: '#EDE9E3',
              letterSpacing: '-0.01em',
              lineHeight: '1.1'
            }}
          >
            Art Studio & Yoga Space
          </h1>
        </div>
      </section>

      {/* Hero Image */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={heroImg}
            alt="Art Studio & Yoga Space"
            className="w-full h-full object-cover"
          />
          <div 
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, rgba(38, 51, 58, 0.4), rgba(38, 51, 58, 0.7))' }}
          />
        </div>
        <div className="relative h-full flex items-center justify-center px-6 text-center">
          <div className="max-w-4xl mx-auto space-y-6">
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(3rem, 7vw, 5rem)',
                color: '#EDE9E3',
                letterSpacing: '-0.01em',
                lineHeight: '1.1'
              }}
            >
              The Studio
            </h1>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '1.25rem',
                color: '#EDE9E3',
                lineHeight: '1.7',
                maxWidth: '700px',
                margin: '0 auto',
                fontStyle: 'italic'
              }}
            >
              A space for making, moving, and being still.
            </p>
            <div 
              style={{
                height: '1px',
                width: '80px',
                backgroundColor: 'rgba(143, 169, 179, 0.5)',
                margin: '2rem auto 0'
              }}
            />
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section style={{ padding: '6rem 1.5rem' }}>
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h6
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.875rem',
              color: '#8FA9B3',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase'
            }}
          >
            CREATIVE SPACE
          </h6>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1.125rem',
              color: '#EDE9E3',
              lineHeight: '1.8'
            }}
          >
            The studio was not built for performance. It was built for process. A place to draw, stretch, sit, make. 
            The materials are there. The quiet is there. What you do with them is entirely yours.
          </p>
        </div>
      </section>

      {/* Offerings Grid */}
      <section style={{ padding: '6rem 1.5rem', backgroundColor: '#2E3D45' }}>
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                icon: Palette,
                title: "The Art Studio",
                description: "A light-filled space with materials for drawing, painting, and making. No instruction unless you want it. Just space, time, and quiet."
              },
              {
                icon: Activity,
                title: "Yoga Space",
                description: "Mats, blocks, stillness. Practice alone or book a private session with a local teacher who understands slow movement."
              }
            ].map((offering, index) => {
              const Icon = offering.icon;
              return (
                <div
                  key={index}
                  style={{
                    padding: '2.5rem',
                    backgroundColor: 'rgba(38, 51, 58, 0.5)',
                    borderRadius: '0.5rem',
                    border: '1px solid rgba(143, 169, 179, 0.2)'
                  }}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      border: '1px solid rgba(143, 169, 179, 0.3)',
                      borderRadius: '0.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1.5rem'
                    }}
                  >
                    <Icon size={24} style={{ color: '#8FA9B3' }} />
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: '1.75rem',
                      color: '#EDE9E3',
                      marginBottom: '1rem'
                    }}
                  >
                    {offering.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '1rem',
                      color: '#B8AE9F',
                      lineHeight: '1.7'
                    }}
                  >
                    {offering.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What's Available */}
      <section style={{ padding: '6rem 1.5rem' }}>
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h6
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.875rem',
                  color: '#8FA9B3',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: '1.5rem'
                }}
              >
                WHAT'S AVAILABLE
              </h6>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  color: '#EDE9E3',
                  marginBottom: '2rem'
                }}
              >
                Materials & Equipment
              </h2>
              <div style={{ marginBottom: '2rem' }}>
                <h4
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '1rem',
                    color: '#8FA9B3',
                    fontWeight: 600,
                    marginBottom: '1rem'
                  }}
                >
                  Art Supplies
                </h4>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {[
                    'Watercolors, acrylics, drawing pencils',
                    'Canvas boards and quality paper',
                    'Brushes, palettes, easel',
                    'Natural pigments from local earth'
                  ].map((item, i) => (
                    <li
                      key={i}
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '1rem',
                        color: '#B8AE9F',
                        lineHeight: '1.8',
                        paddingLeft: '1.5rem',
                        position: 'relative',
                        marginBottom: '0.5rem'
                      }}
                    >
                      <span
                        style={{
                          position: 'absolute',
                          left: '0',
                          top: '0.7rem',
                          width: '4px',
                          height: '4px',
                          backgroundColor: '#8FA9B3',
                          borderRadius: '50%'
                        }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '1rem',
                    color: '#8FA9B3',
                    fontWeight: 600,
                    marginBottom: '1rem'
                  }}
                >
                  Yoga & Movement
                </h4>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {[
                    'Premium yoga mats and props',
                    'Meditation cushions and blankets',
                    'Sound system for guided practice',
                    'Private sessions available on request'
                  ].map((item, i) => (
                    <li
                      key={i}
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '1rem',
                        color: '#B8AE9F',
                        lineHeight: '1.8',
                        paddingLeft: '1.5rem',
                        position: 'relative',
                        marginBottom: '0.5rem'
                      }}
                    >
                      <span
                        style={{
                          position: 'absolute',
                          left: '0',
                          top: '0.7rem',
                          width: '4px',
                          height: '4px',
                          backgroundColor: '#8FA9B3',
                          borderRadius: '50%'
                        }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div
              style={{
                position: 'relative',
                height: '600px',
                borderRadius: '0.5rem',
                overflow: 'hidden'
              }}
            >
              <ImageWithFallback
                src={studioImg}
                alt="Studio space"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Private Sessions */}
      <section style={{ padding: '6rem 1.5rem', backgroundColor: '#2E3D45' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h6
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.875rem',
              color: '#8FA9B3',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '2rem'
            }}
          >
            PRIVATE INSTRUCTION
          </h6>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              color: '#EDE9E3',
              marginBottom: '2rem'
            }}
          >
            Guided Sessions Available
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1.125rem',
              color: '#B8AE9F',
              lineHeight: '1.8',
              marginBottom: '3rem'
            }}
          >
            We work with local yoga teachers and artists who understand this landscape. 
            Private sessions can be arranged: gentle movement practices, meditation, or creative guidance.
            These are not scheduled experiences. They are conversations first.
          </p>
          <Link
            to="/contact"
            style={{
              display: 'inline-block',
              padding: '0.875rem 2rem',
              border: '1px solid #8FA9B3',
              color: '#8FA9B3',
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.95rem',
              fontWeight: 500,
              borderRadius: '0.5rem',
              textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}
          >
            Enquire About Sessions
          </Link>
        </div>
      </section>
    </div>
  );
}
