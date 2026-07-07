import { useState } from "react";
import { Link } from "react-router-dom";
const fishingImg = 'https://res.cloudinary.com/dfvjhslxp/image/upload/bay-cove-headland-dusk.jpg';
const kayakImg = 'https://res.cloudinary.com/dfvjhslxp/image/upload/bay-view-swansea-coast.jpg';
const whaleImg = 'https://res.cloudinary.com/dfvjhslxp/image/upload/location-bay-sunset-wide.jpg';
const douglasImg = 'https://res.cloudinary.com/dfvjhslxp/image/upload/land-detail-driftwood-rock.jpg';
const foragingImg = 'https://res.cloudinary.com/dfvjhslxp/image/upload/bay-view-islands-cloud.jpg';
const stargazingImg = 'https://res.cloudinary.com/dfvjhslxp/image/upload/retreat-bath-night.jpg';
const oystersImg = 'https://res.cloudinary.com/dfvjhslxp/image/upload/bay-cove-headland-dusk.jpg';
const wineImg = 'https://res.cloudinary.com/dfvjhslxp/image/upload/bay-view-freycinet-framed.jpg';
const picnicImg = 'https://res.cloudinary.com/dfvjhslxp/image/upload/location-swansea-beach-dunes-wide.jpg';
const helicopterImg = 'https://res.cloudinary.com/dfvjhslxp/image/upload/bay-view-sunset-dramatic.jpg';
const massageImg = 'https://res.cloudinary.com/dfvjhslxp/image/upload/interior-leather-chair-sunlight.jpg';
const tourImg = 'https://res.cloudinary.com/dfvjhslxp/image/upload/interior-living-sunlight.jpg';
const heroImg = 'https://res.cloudinary.com/dfvjhslxp/image/upload/retreat-exterior-entry-native-garden.jpg';

export function ExperiencesPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const experiences = {
    water: [
      {
        title: "Fishing on Great Oyster Bay",
        description: "Half or full day on Great Oyster Bay and Schouten Passage. Flathead, trumpeter, squid. We work with a local skipper and will sort everything before you arrive.",
        cta: "Ask us to arrange.",
        image: fishingImg
      },
      {
        title: "Sea Kayaking, Freycinet Peninsula",
        description: "Guided sea kayaking along the Freycinet Peninsula coastline, 45 minutes from the property. Award-winning local operator.",
        cta: "We'll book it for you.",
        image: kayakImg
      },
      {
        title: "Whale Watching (Seasonal, May–November)",
        description: "Humpbacks and southern rights migrate through Great Oyster Bay from May through November. The property's elevation makes it a natural vantage point. Your skipper can take you out during peak season.",
        cta: "Ask us to arrange.",
        image: whaleImg
      }
    ],
    land: [
      {
        title: "Douglas-Apsley National Park",
        description: "Tasmania's most overlooked national park, 30 minutes north. Gorges, swimming holes, ancient dry forest.",
        cta: "We'll give you everything you need before you go.",
        image: douglasImg
      },
      {
        title: "Foraging with a Local Guide",
        description: "The property and surrounding headland, read with a local guide. What's edible, what's in season, where to look. Back with a basket and a different understanding of this place.",
        cta: "Ask us to arrange. From $280 per session.",
        image: foragingImg
      },
      {
        title: "Stargazing (Off-Grid, No Light Pollution)",
        description: "No light pollution. We leave a telescope and star map. The Milky Way core is visible February through October.",
        cta: "Ask us to arrange.",
        image: stargazingImg
      }
    ],
    provenance: [
      {
        title: "Freycinet Marine Farm (45 minutes north)",
        description: "45 minutes north on Great Oyster Bay. Family farm, decades in the same water. Mussels and oysters eaten where they're grown.",
        cta: "We'll give you directions and let Julia know you're coming.",
        image: oystersImg
      },
      {
        title: "East Coast Wine Trail",
        description: "Milton Vineyard and Devil's Corner are both within 20 minutes. We'll suggest an order, what to taste, and where to have lunch.",
        cta: "Ask us to arrange.",
        image: wineImg
      },
      {
        title: "Picnic Provisions",
        description: "We can arrange a beach picnic or celebration hamper using local producers.",
        cta: "Ask us when you book.",
        image: picnicImg
      }
    ],
    curated: [
      {
        title: "Arrive by Air",
        description: "Skip the drive. A helicopter transfer from Hobart lands you at the property direct the East Coast coastline unfolding beneath you before you've even unpacked. A hire car can be arranged and delivered to the property for the duration of your stay.",
        cta: "Ask us to arrange.",
        image: helicopterImg
      },
      {
        title: "Helicopter Tour Over Freycinet",
        description: "The East Coast from above. Great Oyster Bay, the Hazards, Wineglass Bay, Schouten Island. There is no better way to understand the scale of this coastline.",
        cta: "Ask us to arrange.",
        image: helicopterImg
      },
      {
        title: "In-Retreat Massage",
        description: "A therapist comes to you. Remedial, relaxation, deep tissue, or pregnancy massage tailored to what you need. Add Kunzea and sandalwood aromatherapy, a face ritual, or a foot treatment. The Huon pine bath on the deck is waiting when you're done.",
        cta: "Ask us to arrange.",
        image: massageImg
      },
      {
        title: "Private Winery Tour with Lunch",
        description: "Four cellar doors. Lunch included. Pickup from the property. We'll book the day so you don't have to think about it.",
        cta: "Ask us to arrange.",
        image: tourImg
      }
    ]
  };

  return (
    <div style={{ backgroundColor: '#26333A', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Experiences at Rocky Hills"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(38, 51, 58, 0) 40%, rgba(38, 51, 58, 0.7) 100%)'
            }}
          />
        </div>
        <div className="relative h-full flex items-end justify-center px-6 pb-20">
          <div className="max-w-4xl text-center">
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                color: '#EDE9E3',
                letterSpacing: '-0.01em',
                lineHeight: '1.1'
              }}
            >
              Experiences
            </h1>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '1.125rem',
                color: '#EDE9E3',
                marginTop: '1.5rem',
                maxWidth: '700px',
                marginLeft: 'auto',
                marginRight: 'auto'
              }}
            >
              We've done the thinking. You do the choosing.
            </p>
          </div>
        </div>
      </section>

      {/* Seasonal Note */}
      <section className="pt-12 pb-6 px-6" style={{ backgroundColor: '#26333A' }}>
        <div className="max-w-[900px] mx-auto text-center">
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.95rem',
              color: '#EDE9E3',
              lineHeight: '1.7'
            }}
          >
            Experiences vary by season. Some are winter-specific — the whale migration, the dark sky, the quiet trails. Ask us what is running during your stay.
          </p>
        </div>
      </section>

      {/* Experience Sections */}
      {Object.keys(experiences).map((category, index) => (
        <section
          key={index}
          className="py-24 px-6"
          style={{
            backgroundColor: index % 2 === 0 ? '#26333A' : '#2E3D45'
          }}
        >
          <div className="max-w-[1400px] mx-auto">
            {/* Section Header - Left Aligned */}
            <div className="mb-16">
              <h2
                className="mb-3"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                  color: '#EDE9E3',
                  letterSpacing: '-0.01em'
                }}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </h2>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '1.05rem',
                  color: '#B8AE9F',
                  lineHeight: '1.8',
                  maxWidth: '900px'
                }}
              >
                {category === 'water' ? "Great Oyster Bay is at your door. We'll point you toward the people who know it best." :
                 category === 'land' ? "250 acres of conservation covenant. Dry eucalypt forest, gorge country, and one of the last uncleared stretches of native bush on the East Coast. Some of this starts at the boundary fence." :
                 category === 'provenance' ? "The East Coast has an extraordinary food story. We'll help you find it." :
                 "For when you want something arranged, not found."}
              </p>
            </div>

            {/* Experience Tiles */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {experiences[category].map((tile, tileIndex) => (
                <div
                  key={tileIndex}
                  className="group overflow-hidden"
                  style={{
                    borderRadius: '0.5rem',
                    backgroundColor: index % 2 === 0 ? '#2E3D45' : '#26333A',
                    border: `1px solid ${index % 2 === 0 ? 'rgba(143, 169, 179, 0.3)' : 'rgba(143, 169, 179, 0.2)'}`,
                    boxShadow: index % 2 === 0 ? '0 4px 16px rgba(0, 0, 0, 0.2)' : 'none',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  {/* Image */}
                  <div
                    className="overflow-hidden"
                    style={{ height: index % 2 === 0 ? '320px' : '280px' }}
                  >
                    <img
                      src={tile.image}
                      alt={tile.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6" style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <h3
                      className="mb-3"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '1.25rem',
                        color: '#EDE9E3',
                        fontWeight: 600
                      }}
                    >
                      {tile.title}
                    </h3>
                    <p
                      className="mb-4"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.95rem',
                        color: '#B8AE9F',
                        lineHeight: '1.7',
                        flexGrow: 1
                      }}
                    >
                      {tile.description}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.75rem',
                        color: '#8FA9B3',
                        fontWeight: 500,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        marginTop: 'auto'
                      }}
                    >
                      {tile.cta}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Bookable Add-ons Section */}
      <section className="py-20 px-6" style={{ backgroundColor: '#26333A' }}>
        <div className="max-w-[900px] mx-auto">
          <h2
            className="mb-12"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
              color: '#EDE9E3'
            }}
          >
            Bookable Add-ons
          </h2>

          <div className="space-y-6">
            <div
              className="flex justify-between items-start pb-6"
              style={{
                borderBottom: '1px solid rgba(143, 169, 179, 0.2)'
              }}
            >
              <div className="flex-1 pr-8">
                <h3
                  className="mb-2"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '1.125rem',
                    color: '#EDE9E3',
                    fontWeight: 600
                  }}
                >
                  Beach Picnic / Celebration Hamper
                </h3>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.95rem',
                    color: '#B8AE9F',
                    lineHeight: '1.7'
                  }}
                >
                  Assembled from local producers. Available on request at booking.
                </p>
              </div>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '1.125rem',
                  color: '#8FA9B3',
                  fontWeight: 500,
                  flexShrink: 0
                }}
              >
                From $120
              </p>
            </div>

            <div
              className="flex justify-between items-start pb-6"
              style={{
                borderBottom: '1px solid rgba(143, 169, 179, 0.2)'
              }}
            >
              <div className="flex-1 pr-8">
                <h3
                  className="mb-2"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '1.125rem',
                    color: '#EDE9E3',
                    fontWeight: 600
                  }}
                >
                  Welcome Provisions Upgrade
                </h3>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.95rem',
                    color: '#B8AE9F',
                    lineHeight: '1.7'
                  }}
                >
                  Premium pantry additions from Wursthaus and local makers. Add at booking.
                </p>
              </div>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '1.125rem',
                  color: '#8FA9B3',
                  fontWeight: 500,
                  flexShrink: 0
                }}
              >
                From $65
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-6" style={{ backgroundColor: '#2E3D45' }}>
        <div className="max-w-[900px] mx-auto text-center">
          <h2
            className="mb-6"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 4vw, 2.5rem)',
              color: '#EDE9E3'
            }}
          >
            Ready to arrange something?
          </h2>
          <p
            className="mb-8"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1.05rem',
              color: '#EDE9E3',
              lineHeight: '1.8'
            }}
          >
            Most experiences can be arranged with 48 hours' notice. Contact us when you book or anytime before arrival.
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
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
              transition: 'all 0.3s ease',
              textDecoration: 'none'
            }}
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
