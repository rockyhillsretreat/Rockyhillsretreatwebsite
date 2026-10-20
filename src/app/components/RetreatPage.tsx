import { Bed, Bath, Flame, Utensils, Mountain, Sun, Droplets, Sparkles } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Link } from "react-router-dom";
import { img, P } from '../media';
const heroImg = img(P.facade, 2400);
const interiorImg = img(P.duskRoofline, 1200);
const bedroomImg = img(P.bedToBath, 900);
const bathImg = img(P.diningView, 900);
const livingImg = img(P.rainbowLiving, 900);
const extraGallery = [
  { src: img(P.livingPanorama, 900), alt: 'Living and dining, facing the bay' },
  { src: img(P.robeWindow, 900), alt: 'Morning at the window' },
  { src: img(P.books, 900), alt: 'The bookshelf' },
];

export function RetreatPage() {
  const features = [
    { icon: Bed, label: "King bed with Tasmanian wool bedding" },
    { icon: Bath, label: "Huon pine soaking tub" },
    { icon: Flame, label: "Wood fireplace for cool evenings" },
    { icon: Utensils, label: "Fully equipped kitchen" },
    { icon: Sparkles, label: "Outdoor fire pit and deck" },
    { icon: Mountain, label: "Views across Great Oyster Bay" },
    { icon: Sun, label: "Solar powered, rainwater supplied" },
    { icon: Droplets, label: "250 acres, conservation covenant" }
  ];

  return (
    <div style={{ backgroundColor: '#26333A', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={heroImg}
            alt="Rocky Hills Retreat architecture"
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
          <div className="max-w-4xl text-center space-y-6">
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                color: '#EDE9E3',
                letterSpacing: '-0.01em',
                lineHeight: '1.1'
              }}
            >
              Built into the hill. Open to the bay.
            </h1>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-24 px-6" style={{ backgroundColor: '#26333A' }}>
        <div className="max-w-[900px] mx-auto">
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1.05rem',
              color: '#EDE9E3',
              lineHeight: '1.8',
              textAlign: 'left'
            }}
          >
            Designed by Rosevear Architects in 2004 and completed in 2009, Rocky Hills is a single-bedroom retreat set into 250 acres of dry sclerophyll bushland above Great Oyster Bay. Concrete block, double-glazed glass, a 73-tonne concrete roof. Materials chosen to last, and to disappear into the land they sit on.
          </p>
        </div>
      </section>

      {/* The Space */}
      <section className="py-24 px-6" style={{ backgroundColor: '#2E3D45' }}>
        <div className="max-w-[1200px] mx-auto">
          <h2
            className="mb-12"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 4vw, 2.5rem)',
              color: '#EDE9E3',
              textAlign: 'center'
            }}
          >
            The Space
          </h2>
          <div className="space-y-6 max-w-[900px] mx-auto" style={{ color: '#EDE9E3' }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.05rem', lineHeight: '1.8' }}>
              One bedroom. One bathroom with a Huon pine soaking tub, designed by Craig Rosevear and handcrafted by Stuart Houghton, shaped after the hull of a traditional Huon pine boat. A living area that faces the water. A fireplace. A kitchen stocked before you arrive.
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.05rem', lineHeight: '1.8' }}>
              The retreat sleeps two. It is not designed for more.
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.05rem', lineHeight: '1.8' }}>
              In summer the glass slides back and the deck becomes the main room. The bath faces west, so it fills with the last of the light at the end of a beach day. The concrete keeps the inside cool through the warm afternoons, and the evenings are still cool enough for the fire.
            </p>
          </div>
        </div>
      </section>

      {/* The Architecture */}
      <section className="py-24 px-6" style={{ backgroundColor: '#26333A' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2
                className="mb-6"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                  color: '#EDE9E3'
                }}
              >
                The Architecture
              </h2>
              <div className="space-y-6" style={{ color: '#EDE9E3' }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.05rem', lineHeight: '1.8' }}>
                  The brief was simple: disappear into the land, open to the water. Besser block walls and a poured concrete roof - part of a fire-safe design with no conventional gutters and no combustible cladding. Heat-treated double-glazed windows on the north and east faces track the light from morning to dusk. Blackwood joinery throughout. Nothing decorative. Every material chosen because it belongs here and will still be here in a hundred years.
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.05rem', lineHeight: '1.8' }}>
                  The site sits under a conservation covenant protecting it from logging in perpetuity. A site management plan developed with the Private Land Conservation Program protects the flora and fauna of the 250-acre property.
                </p>
              </div>
            </div>
            <div className="overflow-hidden" style={{ borderRadius: '0.5rem' }}>
              <ImageWithFallback
                src={interiorImg}
                alt="Retreat interior architecture"
                className="w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Off the Grid */}
      <section className="py-24 px-6" style={{ backgroundColor: '#2E3D45' }}>
        <div className="max-w-[1200px] mx-auto">
          <h2
            className="mb-12"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 4vw, 2.5rem)',
              color: '#EDE9E3',
              textAlign: 'center'
            }}
          >
            Off the Grid
          </h2>
          <div className="space-y-6 max-w-[900px] mx-auto" style={{ color: '#EDE9E3' }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.05rem', lineHeight: '1.8' }}>
              A purpose-built array of solar panels runs through an inverter-charger and battery bank, with a backup diesel generator for extended low-light periods. Rainwater is captured directly off the concrete roof via a central downpipe into tanks beneath the house. A separate tank near the carpark stores water for bushfire use. Waste is managed on-site via septic.
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.05rem', lineHeight: '1.8' }}>
              There is no mains connection of any kind. Water is tank water.
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.05rem', lineHeight: '1.8' }}>
              Summer is when the system is at its best. Long days keep the batteries full, the tanks are topped up from spring rain, and the generator rarely has a reason to start. Treat the water like it matters, because here it does.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6" style={{ backgroundColor: '#26333A' }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex flex-col items-center text-center space-y-4">
                  <div
                    className="w-16 h-16 flex items-center justify-center transition-all"
                    style={{
                      border: '1px solid rgba(143, 169, 179, 0.3)',
                      borderRadius: '0.5rem'
                    }}
                  >
                    <Icon size={28} style={{ color: '#8FA9B3', strokeWidth: 1.5 }} />
                  </div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', color: '#B8AE9F' }}>
                    {feature.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How This Place Works */}
      <section className="py-24 px-6" style={{ backgroundColor: '#2E3D45' }}>
        <div className="max-w-[1200px] mx-auto">
          <h2
            className="mb-12"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 4vw, 2.5rem)',
              color: '#EDE9E3',
              textAlign: 'center'
            }}
          >
            How This Place Works
          </h2>
          <div className="space-y-6 max-w-[900px] mx-auto" style={{ color: '#EDE9E3' }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.05rem', lineHeight: '1.8' }}>
              Rocky Hills is a fully committed sustainable property. The 250-acre property is under conservation covenant - protected from development or logging in perpetuity. We are working toward carbon neutrality. These are ongoing commitments, not completed ones.
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.05rem', lineHeight: '1.8' }}>
              When you stay here, you are part of a system that tries to do things properly.
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.05rem', lineHeight: '1.8', marginTop: '2rem', fontStyle: 'italic' }}>
              Rocky Hills sits on the country of the Mumirimina clan of the Oyster Bay Nation (Paredarerme) and the Big River Nation (Lairmairrener) peoples who have cared for this land, this water, and this sky for tens of thousands of years. We acknowledge their continuing connection to country and pay our respects to Elders past and present. This country was never ceded.
            </p>
          </div>
        </div>
      </section>

      {/* What Lives Here (Wildlife) */}
      <section className="py-24 px-6" style={{ backgroundColor: '#26333A' }}>
        <div className="max-w-[1200px] mx-auto">
          <h2
            className="mb-12"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 4vw, 2.5rem)',
              color: '#EDE9E3',
              textAlign: 'center'
            }}
          >
            What Lives Here
          </h2>
          <div className="space-y-6 max-w-[900px] mx-auto" style={{ color: '#EDE9E3' }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.05rem', lineHeight: '1.8' }}>
              The 250 acres surrounding Rocky Hills is permanently protected under a conservation covenant registered on the title in perpetuity. It cannot be cleared, logged, or developed beyond its current footprint. That protection is why the following animals are here.
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.05rem', lineHeight: '1.8' }}>
              On the land: Bennett's wallabies and Tasmanian pademelons graze in the late afternoon, moving out of the understorey as the light drops. Wombats come through at night - patient, unhurried, entirely uninterested in your presence. Common brushtail possums, echidnas in the understorey during the day. Wedge-tailed eagles work the thermals overhead most mornings. Yellow-tailed Black Cockatoos move through in flocks, their call carrying across the bush before you see them. Two species in particular make this forest essential: the Swift Parrot, critically endangered, breeds only in Tasmania, and depends on exactly this type of dry sclerophyll eucalypt woodland. The Forty-spotted Pardalote, one of Australia's rarest birds, is found in precisely this habitat on the East Coast. Their presence here is not incidental. It is the result of land left undisturbed.
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.05rem', lineHeight: '1.8' }}>
              From the deck: Great Oyster Bay is visible from the property, approximately two kilometres down to the shore. White-bellied sea eagles work the foreshore on calm mornings. Dolphins in the channel when the water is flat.
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.05rem', lineHeight: '1.8' }}>
              In summer: the wallabies come out earlier as the evenings stretch, and the echidnas are busy in the warm weather. Long twilight on the deck is the best time to sit still and watch. The whales pass through on their way back south in spring, so an early summer stay can still catch the tail of it.
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.05rem', lineHeight: '1.8' }}>
              These encounters are possible because this land is quiet and undisturbed. Your quiet presence is what keeps them that way.
            </p>

            {/* Seasonal callout box */}
            <div
              className="mt-8 p-6"
              style={{
                backgroundColor: '#2E3D45',
                borderLeft: '3px solid #8FA9B3',
                borderRadius: '0.25rem'
              }}
            >
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.95rem', lineHeight: '1.7', color: '#B8AE9F' }}>
                Summer guests: bring a torch for the walk back from the car after dark, and keep to the paths. Quolls and possums are out at night. The Swift Parrot and Forty-spotted Pardalote are present year-round.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-6" style={{ backgroundColor: '#26333A' }}>
        <div className="max-w-[900px] mx-auto text-center">
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
            Check Availability
          </Link>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-24 px-6" style={{ backgroundColor: '#2E3D45' }}>
        <div className="max-w-[1400px] mx-auto">
          <h2
            className="mb-12 text-center"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 4vw, 2.5rem)',
              color: '#EDE9E3'
            }}
          >
            The Retreat
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="overflow-hidden" style={{ borderRadius: '0.5rem' }}>
              <ImageWithFallback
                src={bedroomImg}
                alt="From the bed to the bath on the deck"
                className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="overflow-hidden" style={{ borderRadius: '0.5rem' }}>
              <ImageWithFallback
                src={bathImg}
                alt="The dining table and the view"
                className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="overflow-hidden" style={{ borderRadius: '0.5rem' }}>
              <ImageWithFallback
                src={livingImg}
                alt="Living room, rainbow over the bay"
                className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {extraGallery.map((g) => (
              <div key={g.alt} className="overflow-hidden" style={{ borderRadius: '0.5rem' }}>
                <img src={g.src} alt={g.alt} loading="lazy" className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/gallery"
              style={{
                display: 'inline-block',
                backgroundColor: 'transparent',
                color: '#EDE9E3',
                padding: '0.75rem 1.75rem',
                border: '1px solid rgba(143, 169, 179, 0.5)',
                borderRadius: '0.5rem',
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.95rem',
                fontWeight: 500,
                transition: 'all 0.3s ease',
                textDecoration: 'none'
              }}
            >
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
