import React from "react";
import { Link } from "react-router-dom";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const heroImg = 'https://res.cloudinary.com/dfvjhslxp/image/upload/location-swansea-beach-dunes-wide.jpg';

interface Package {
  id: string;
  title: string;
  description: string;
  inclusions: string[];
  price: string;
  nights: string;
  note?: string;
}

export function PackagesPage() {
  const packages: Package[] = [
    {
      id: 'in-the-air-then-at-rest',
      title: "In the Air, Then at Rest",
      description: "The East Coast from above. A therapist at the door. Nothing else required.",
      nights: "3 nights",
      price: "From $5,500 per stay",
      inclusions: [
        "3 nights accommodation",
        "Scenic helicopter flight over Great Oyster Bay, the Hazards, and Wineglass Bay",
        "Couples massage at the property",
        "Huon pine bath prepared on the deck",
      ],
      note: "Want to arrive by air? A helicopter transfer from Hobart to the property is available on request, with a hire car delivered to the property if you need one. Ask us when you book."
    },
    {
      id: 'the-long-lunch',
      title: "The Long Lunch",
      description: "Four East Coast cellar doors. Lunch in the vines. Pickup from the property and back before dark.",
      nights: "3 nights",
      price: "From $3,150 per stay",
      inclusions: [
        "3 nights accommodation",
        "Guided wine trail for two — four cellar doors, lunch included, pickup and return from the property",
        "Couples massage at the property",
      ],
      note: "The wine trail is an off-property experience. RHR does not serve alcohol on site."
    },
    {
      id: 'from-the-water',
      title: "From the Water",
      description: "Half a day on Great Oyster Bay with a local skipper. The rest of the day is for doing nothing at all.",
      nights: "3 nights",
      price: "From $3,250 per stay",
      inclusions: [
        "3 nights accommodation",
        "Half day fishing charter on Great Oyster Bay and Schouten Passage — flathead, trumpeter, squid",
        "Catch prepared and returned to the retreat with a recipe written for the kitchen at Rocky Hills",
        "Couples massage at the property",
      ]
    },
    {
      id: 'celebrate-here',
      title: "Celebrate Here",
      description: "A proposal, an anniversary, a reason you made up. We'll make sure it's ready when you arrive.",
      nights: "3 nights",
      price: "From $3,550 per stay",
      inclusions: [
        "3 nights accommodation",
        "Private photographer for a half day — on the property, on the headland, wherever the moment takes you",
        "Beach picnic hamper assembled from local producers",
        "Huon pine bath prepared on the deck",
      ]
    }
  ];

  return (
    <div style={{ backgroundColor: '#26333A', minHeight: '100vh' }}>

      <section className="relative h-[70vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={heroImg}
            alt="Rocky Hills Retreat Packages"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, rgba(38, 51, 58, 0) 40%, rgba(38, 51, 58, 0.7) 100%)' }}
          />
        </div>
        <div className="relative h-full flex items-end justify-center px-6 pb-16">
          <div className="max-w-4xl text-center">
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.5rem, 6vw, 4rem)', color: '#EDE9E3', letterSpacing: '-0.01em', lineHeight: '1.1' }}>
              Packages
            </h1>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.125rem', color: '#EDE9E3', lineHeight: '1.7', maxWidth: '700px', margin: '1.5rem auto 0' }}>
              Three nights. One experience worth making the trip for. We handle the rest.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-[1200px] mx-auto space-y-20">
          {packages.map((pkg) => (
            <div key={pkg.id} id={pkg.id} className="scroll-mt-24">
              <div className="p-10 lg:p-12" style={{ backgroundColor: '#2E3D45', borderRadius: '0.5rem', border: '1px solid rgba(143, 169, 179, 0.2)' }}>
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                  <div>
                    <h2 className="mb-4" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', color: '#EDE9E3' }}>
                      {pkg.title}
                    </h2>
                    <p className="mb-6" style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.05rem', color: '#B8AE9F', lineHeight: '1.8' }}>
                      {pkg.description}
                    </p>
                    <div className="flex items-baseline gap-4 mb-8">
                      <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: '#8FA9B3' }}>{pkg.price}</p>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1rem', color: '#B8AE9F' }}>{pkg.nights}</p>
                    </div>
                    <Link to="/booking" style={{ display: 'inline-block', backgroundColor: '#8FA9B3', color: '#26333A', padding: '0.875rem 2rem', fontFamily: "'Inter', sans-serif", fontSize: '1rem', fontWeight: 500, boxShadow: '0 4px 12px rgba(0,0,0,0.3)', transition: 'all 0.3s ease', textDecoration: 'none' }}>
                      Book This Package
                    </Link>
                  </div>
                  <div>
                    <h3 className="mb-6" style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', color: '#8FA9B3', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                      What's Included
                    </h3>
                    <ul className="space-y-4">
                      {pkg.inclusions.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="mt-2 flex-shrink-0" style={{ width: '6px', height: '6px', backgroundColor: '#8FA9B3', borderRadius: '50%' }} />
                          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.95rem', color: '#EDE9E3', lineHeight: '1.7' }}>{item}</p>
                        </li>
                      ))}
                    </ul>
                    {pkg.note && (
                      <p className="mt-6" style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: '#B8AE9F', fontStyle: 'italic', lineHeight: '1.6' }}>
                        {pkg.note}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-6" style={{ backgroundColor: '#2E3D45' }}>
        <div className="max-w-[900px] mx-auto text-center">
          <h2 className="mb-6" style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 2.5rem)', color: '#EDE9E3' }}>
            Don't See What You're Looking For?
          </h2>
          <p className="mb-8" style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.05rem', color: '#EDE9E3', lineHeight: '1.8', opacity: 0.8 }}>
            Every stay is different. If you want to combine experiences, extend your nights, or put something together that isn't listed here, get in touch. We'll build it around you.
          </p>
          <Link to="/contact" style={{ display: 'inline-block', backgroundColor: 'transparent', color: '#EDE9E3', padding: '0.875rem 2rem', border: '1px solid rgba(143, 169, 179, 0.5)', fontFamily: "'Inter', sans-serif", fontSize: '1rem', fontWeight: 500, transition: 'all 0.3s ease', textDecoration: 'none' }}>
            Talk to Us
          </Link>
        </div>
      </section>
    </div>
  );
}