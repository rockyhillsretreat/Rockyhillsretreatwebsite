import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const heroImg = 'https://res.cloudinary.com/dfvjhslxp/image/upload/land-detail-driftwood-rock.jpg';
const winterBayImg = 'https://res.cloudinary.com/dfvjhslxp/image/upload/bay-view-sunset-dramatic.jpg';
const bathNightImg = 'https://res.cloudinary.com/dfvjhslxp/image/upload/retreat-bath-night.jpg';
const interiorImg = 'https://res.cloudinary.com/dfvjhslxp/image/upload/interior-living-sunlight.jpg';
const exteriorDuskImg = 'https://res.cloudinary.com/dfvjhslxp/image/upload/retreat-exterior-dusk-silhoutte.jpg';
const wildlifeImg = 'https://res.cloudinary.com/dfvjhslxp/image/upload/wildlife-wallaby-understorey.jpg';

const categories = ['All', 'Sustainability', 'Place', 'Wildlife', 'Provenance'];

const entries = [

  {
    id: 1,
    category: 'Provenance',
    date: 'May 2026',
    title: 'Where the Provisions Come From',
    excerpt: 'Every stay includes a provisions kit sourced from Tasmanian producers. This is what is in it.',
    image: interiorImg,
    imageAlt: 'Morning light on concrete, Rocky Hills interior',
    featured: false,
    content: [
      'Every stay at Rocky Hills includes a provisions kit sourced from Tasmanian producers. The kitchen is fully equipped. Food arrives with recipe cards and preparation notes.',
      'Bacon and chipolatas come from Wursthaus in Hobart. Smoked ocean trout from Woodbridge Smokehouse on the Huon. We use trout rather than salmon because the Tasmanian ocean trout farming is more carefully managed and the eating quality is better for it.',
      'Honey is from Wild Hives. Olive oil and table olives from Riverstone near Cranbrook, about 30 minutes up the coast. Pasta from Bottega Crippa in Huonville, made from Tasmanian grain. Coffee from Villino in Hobart.',
      'Sourcing locally is partly about quality and partly about something harder to quantify. The Sustainable Tourism criteria include community economic benefit. Buying from Tasmanian producers within 150km of the property is how we meet that in practice.',
    ],
    pullQuote: 'Sourcing locally is partly about quality and partly about something harder to quantify.',
  },
  {
    id: 2,
    category: 'Sustainability',
    date: 'April 2026',
    title: 'The Solar System',
    excerpt: 'The off-grid solar system at Rocky Hills is about 15 years old. The batteries are at the end of their life. We are replacing them.',
    image: interiorImg,
    imageAlt: 'Rocky Hills interior, morning light',
    featured: false,
    content: [
      'The off-grid solar system at Rocky Hills is about 15 years old. The original lead-acid batteries are at the end of their useful life and no longer holding charge reliably. We are replacing the battery bank this year.',
      'The replacement will use lithium iron phosphate batteries, which have a significantly longer service life and better performance at the depth of discharge that an off-grid property requires. The Federal Cheaper Home Batteries Program rebate applies, which reduces the capital cost.',
      'For a property pursuing Sustainable Tourism Certification, being fully off-grid is one of the stronger credentials we have. The solar system handles all power needs for up to two guests. A diesel generator provides emergency backup, which we are transparent about in the scorecard. The goal is to not need it.',
      'Keeping that system in good condition is not optional. It is the infrastructure the whole property depends on.',
    ],
    pullQuote: 'The goal is to not need it.',
  },
  {
    id: 3,
    category: 'Wildlife',
    date: 'March 2026',
    title: 'What Lives on the Property',
    excerpt: 'The 250 acres are protected under a conservation covenant in perpetuity. This is what that looks like on the ground.',
    image: wildlifeImg,
    imageAlt: 'Wallaby on the property at Rocky Hills',
    featured: false,
    content: [
      'The 250 acres are protected under a conservation covenant in perpetuity. The land cannot be cleared, subdivided, or developed. That is permanent, regardless of who owns it.',
      'The bush is dry sclerophyll. Eucalyptus, wattle, native grasses. Pademelons appear at dusk along the western boundary. Brushtail possums move through after dark and are not shy about it. Echidnas turn up occasionally near the building and take their time about everything.',
      'Between June and September, humpback whales migrate north through Great Oyster Bay. On a clear morning you can follow them from the deck with the binoculars kept in the retreat. The Swift Parrot passes through annually. The Forty-spotted Pardalote, one of the rarest birds in Australia, is resident on the property year-round.',
      'This is not a managed wildlife experience. These animals live here. Guests are visiting their habitat.',
    ],
    pullQuote: 'These animals live here. Guests are visiting their habitat.',
  },
  {
    id: 4,
    category: 'Sustainability',
    date: 'February 2026',
    title: 'No Single-Use Plastics',
    excerpt: 'Eliminating single-use plastics is one of the cleaner wins in the certification criteria. We have been working through it category by category.',
    image: bathNightImg,
    imageAlt: 'The outdoor Huon pine bath at night, Rocky Hills Retreat',
    featured: false,
    content: [
      'Eliminating single-use plastics is one of the cleaner wins in the certification criteria. We have been working through it category by category.',
      'The bathroom amenities were the first priority. We moved to refillable glass dispensers for shampoo, conditioner, and body wash, and switched to travel sets from brands that use recyclable packaging. Individually wrapped soap sachets are gone.',
      'The provisions kit presented more of a challenge. Some items arrive from suppliers in vacuum-sealed plastic that we cannot control. We are in conversation with those suppliers about alternatives. In the meantime we document it as an open item in the scorecard rather than pretend the problem does not exist.',
      'The certification process is useful partly because it makes you look honestly at the gap between intention and practice. We had assumed we were doing better on packaging than we were.',
    ],
    pullQuote: 'The certification process makes you look honestly at the gap between intention and practice.',
  },
  {
    id: 5,
    category: 'Place',
    date: 'January 2026',
    title: 'Getting Here',
    excerpt: 'Rocky Hills is about 1.5 hours from Hobart. The drive is part of the arrival.',
    image: exteriorDuskImg,
    imageAlt: 'Entry door at dusk, Rocky Hills Retreat',
    featured: false,
    content: [
      'Rocky Hills is about 1.5 hours from Hobart. The drive is part of the arrival.',
      'You leave the highway at Swansea and follow the coast north. The Tasman Highway runs right along the edge of Great Oyster Bay here, with the Freycinet Peninsula visible across the water. The turnoff to the property is easy to miss the first time.',
      'The driveway is gravel for the final stretch. Most guests arrive in the late afternoon. There is no one to meet you. That is deliberate. The property is set up so that within about ten minutes of walking through the door, there is nothing left to organise.',
      'Swansea is 15 minutes south if you need anything. Most guests find they do not.',
    ],
    pullQuote: 'Within ten minutes of walking through the door, there is nothing left to organise.',
  },
  {
    id: 6,
    category: 'Sustainability',
    date: 'December 2025',
    title: 'Starting the Certification Process',
    excerpt: 'We are working toward Sustainable Tourism Certification through Ecotourism Australia. This is where we are starting from.',
    image: winterBayImg,
    imageAlt: 'Great Oyster Bay in winter, seen from Rocky Hills',
    featured: true,
    content: [
      'We are working toward Sustainable Tourism Certification through Ecotourism Australia. This is where we are starting from.',
      'Rocky Hills was built off-grid in 2009. Solar power, 100% rainwater, septic waste management, no mains connection of any kind. The conservation covenant protecting the 250 acres was put in place at the same time. Craig Rosevear designed the building with passive solar orientation from the start. None of this was retrofitted. That gives us a strong foundation for the environmental criteria, most of which the property already meets operationally.',
      'What we are working through now is the documentation, the guest communication, and a few areas where we can genuinely do better. The Strive 4 Sustainability Scorecard is our starting point. We will record what we find here as we go.',
      'Sustainable Tourism Certification is not a marketing exercise. The criteria are detailed and the assessment is independent. We are going through it because it is the right thing to do and because guests who care about this deserve to know we have been held to account for it.',
    ],
    pullQuote: 'None of this was retrofitted. That gives us a strong foundation.',
  },
];

export function JournalPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const featuredEntry = entries.find(e => e.featured);
  const filteredEntries = entries
    .filter(e => !e.featured)
    .filter(e => selectedCategory === 'All' || e.category === selectedCategory);

  return (
    <div style={{ backgroundColor: '#26333A', minHeight: '100vh' }}>

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ height: '65vh', minHeight: '480px' }}>
        <div className="absolute inset-0">
          <ImageWithFallback
            src={heroImg}
            alt="Rocky Hills headland"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(38,51,58,0.1) 30%, rgba(38,51,58,0.85) 100%)'
            }}
          />
        </div>
        <div className="relative h-full flex flex-col items-center justify-end px-6 pb-20 text-center">
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.75rem',
            color: '#8FA9B3',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
            fontWeight: 500,
          }}>
            Notes from the headland
          </p>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(3rem, 7vw, 5rem)',
            color: '#EDE9E3',
            letterSpacing: '-0.02em',
            lineHeight: 1.05,
          }}>
            Journal
          </h1>
        </div>
      </section>

      {/* Featured Entry */}
      {featuredEntry && (
        <section style={{ padding: '5rem 1.5rem 0' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.7rem',
              color: '#8FA9B3',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              fontWeight: 600,
              marginBottom: '2.5rem',
            }}>
              Latest Entry
            </p>
            <div
              className="grid"
              style={{
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '0',
                display: 'grid',
              }}
            >
              {/* Image */}
              <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
                <ImageWithFallback
                  src={featuredEntry.image}
                  alt={featuredEntry.imageAlt}
                  className="w-full h-full object-cover"
                  style={{ transition: 'transform 0.6s ease' }}
                />
              </div>

              {/* Text panel */}
              <div style={{
                backgroundColor: '#2E3D45',
                padding: 'clamp(2.5rem, 5vw, 4rem)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.7rem',
                    color: '#8FA9B3',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                  }}>
                    {featuredEntry.category}
                  </span>
                  <span style={{ color: 'rgba(143,169,179,0.3)', fontSize: '0.7rem' }}>/</span>
                  <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.7rem',
                    color: 'rgba(237,233,227,0.45)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    fontWeight: 400,
                  }}>
                    {featuredEntry.date}
                  </span>
                </div>

                <h2 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(1.75rem, 3vw, 2.75rem)',
                  color: '#EDE9E3',
                  lineHeight: 1.15,
                  marginBottom: '1.75rem',
                }}>
                  {featuredEntry.title}
                </h2>

                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '1rem',
                  color: 'rgba(237,233,227,0.7)',
                  lineHeight: 1.85,
                  marginBottom: '2rem',
                }}>
                  {featuredEntry.content[0]} {featuredEntry.content[1]}
                </p>

                {/* Pull quote */}
                <blockquote style={{
                  borderLeft: '2px solid #8FA9B3',
                  paddingLeft: '1.25rem',
                  margin: '0 0 2rem',
                }}>
                  <p style={{
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: 'italic',
                    fontSize: 'clamp(1.1rem, 1.5vw, 1.3rem)',
                    color: '#8FA9B3',
                    lineHeight: 1.5,
                  }}>
                    "{featuredEntry.pullQuote}"
                  </p>
                </blockquote>

                <button
                  onClick={() => setExpandedId(expandedId === featuredEntry.id ? null : featuredEntry.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#8FA9B3',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.8rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    fontWeight: 500,
                    width: 'fit-content',
                  }}
                >
                  {expandedId === featuredEntry.id ? 'Close' : 'Continue reading'}
                  <span style={{ fontSize: '1rem' }}>{expandedId === featuredEntry.id ? '↑' : '→'}</span>
                </button>

                {expandedId === featuredEntry.id && (
                  <div style={{ marginTop: '1.5rem' }}>
                    {featuredEntry.content.slice(2).map((para, i) => (
                      <p key={i} style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '1rem',
                        color: 'rgba(237,233,227,0.7)',
                        lineHeight: 1.85,
                        marginBottom: '1rem',
                      }}>
                        {para}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Category filter */}
      <section style={{ padding: '4rem 1.5rem 2rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  background: selectedCategory === cat ? '#8FA9B3' : 'transparent',
                  border: `1px solid ${selectedCategory === cat ? '#8FA9B3' : 'rgba(143,169,179,0.3)'}`,
                  color: selectedCategory === cat ? '#26333A' : 'rgba(237,233,227,0.6)',
                  padding: '0.45rem 1.1rem',
                  borderRadius: '2px',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.7rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Entry grid */}
      <section style={{ padding: '1rem 1.5rem 6rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 480px), 1fr))',
              gap: '1px',
              backgroundColor: 'rgba(143,169,179,0.12)',
            }}
          >
            {filteredEntries.map(entry => (
              <article
                key={entry.id}
                style={{ backgroundColor: '#26333A' }}
              >
                {/* Entry image */}
                <div style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
                  <ImageWithFallback
                    src={entry.image}
                    alt={entry.imageAlt}
                    className="w-full h-full object-cover"
                    style={{
                      transition: 'transform 0.6s ease',
                    }}
                  />
                </div>

                {/* Entry body */}
                <div style={{ padding: 'clamp(1.75rem, 4vw, 2.5rem)' }}>
                  <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <span style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.65rem',
                      color: '#8FA9B3',
                      letterSpacing: '0.13em',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                    }}>
                      {entry.category}
                    </span>
                    <span style={{ color: 'rgba(143,169,179,0.25)', fontSize: '0.6rem' }}>/</span>
                    <span style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.65rem',
                      color: 'rgba(237,233,227,0.4)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}>
                      {entry.date}
                    </span>
                  </div>

                  <h3 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)',
                    color: '#EDE9E3',
                    lineHeight: 1.2,
                    marginBottom: '1rem',
                  }}>
                    {entry.title}
                  </h3>

                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.95rem',
                    color: 'rgba(237,233,227,0.6)',
                    lineHeight: 1.8,
                    marginBottom: '1.5rem',
                  }}>
                    {entry.excerpt}
                  </p>

                  {/* Pull quote */}
                  <p style={{
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: 'italic',
                    fontSize: '1rem',
                    color: '#8FA9B3',
                    lineHeight: 1.55,
                    borderTop: '1px solid rgba(143,169,179,0.2)',
                    paddingTop: '1.25rem',
                    marginBottom: '1.5rem',
                  }}>
                    "{entry.pullQuote}"
                  </p>

                  <button
                    onClick={() => setExpandedId(expandedId === entry.id ? null : entry.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      color: 'rgba(143,169,179,0.7)',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.7rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      fontWeight: 500,
                    }}
                  >
                    {expandedId === entry.id ? 'Close' : 'Read more'}
                    <span>{expandedId === entry.id ? '↑' : '→'}</span>
                  </button>

                  {expandedId === entry.id && (
                    <div style={{ marginTop: '1.5rem' }}>
                      {entry.content.map((para, i) => (
                        <p key={i} style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '0.95rem',
                          color: 'rgba(237,233,227,0.65)',
                          lineHeight: 1.85,
                          marginBottom: '1rem',
                        }}>
                          {para}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Footer note */}
      <section style={{ padding: '4rem 1.5rem 6rem', borderTop: '1px solid rgba(143,169,179,0.12)' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(1.05rem, 1.5vw, 1.2rem)',
            color: 'rgba(237,233,227,0.45)',
            lineHeight: 1.8,
          }}>
            Rocky Hills is a committed sustainable property, built off-grid in 2009 and operating under a permanent conservation covenant. We are currently working toward Sustainable Tourism Certification through Ecotourism Australia. This journal documents that process alongside the life of the property.
          </p>
        </div>
      </section>

    </div>
  );
}
