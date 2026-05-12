import { Link } from 'react-router-dom';

export function GoDarkPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0B0F0F' }}>
      {/* Hero Section */}
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-[1000px] mx-auto text-center">
          <h1
            className="mb-8"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(3rem, 8vw, 5rem)',
              color: '#EDE9E3',
              letterSpacing: '-0.01em',
              lineHeight: '1.1',
            }}
          >
            Go Dark.
          </h1>
          <h2
            className="mb-16"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
              color: '#EDE9E3',
              fontWeight: 400,
              lineHeight: '1.4',
            }}
          >
            Winter at Rocky Hills. June, July, August. The East Coast at its most honest.
          </h2>
        </div>
      </section>

      {/* Body Copy Section */}
      <section className="pb-24 px-6">
        <div className="max-w-[900px] mx-auto">
          <div className="space-y-6">
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '1.05rem',
                color: '#EDE9E3',
                lineHeight: '1.8',
              }}
            >
              In June the humpbacks start moving north through Great Oyster Bay. You can see the channel from the deck. In July the trails at Freycinet are empty, the cellar doors are quiet, and the sky above 250 acres of private bushland is the kind of dark that cities have forgotten exists. The Huon pine bath faces west. On a clear winter night, with the fire going inside, you sit in that bath and the Milky Way does what it does without any competition.
            </p>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '1.05rem',
                color: '#EDE9E3',
                lineHeight: '1.8',
              }}
            >
              The East Coast in winter belongs to almost nobody. That is precisely the point. Go Dark is a 3-night midweek stay - Monday to Thursday - timed to the darkest months on purpose. A different kind of stillness from the one summer offers. The thermal mass of the building holds the warmth in. The fire holds the rest. Outside, wombats move through the property after dark. The Yellow-tailed Black Cockatoos come through in the morning, their call carrying across the bush before anything else is awake.
            </p>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '1.05rem',
                color: '#EDE9E3',
                lineHeight: '1.8',
              }}
            >
              You came here to stop. Winter is when that is most true.
            </p>
          </div>
        </div>
      </section>

      {/* Offer Details Section */}
      <section className="py-24 px-6" style={{ backgroundColor: 'rgba(38, 51, 58, 0.3)' }}>
        <div className="max-w-[700px] mx-auto text-center">
          <div className="space-y-4 mb-12">
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '1.125rem',
                color: '#8FA9B3',
                lineHeight: '1.8',
              }}
            >
              3 nights - Sunday to Tuesday arrival
            </p>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '1.125rem',
                color: '#8FA9B3',
                lineHeight: '1.8',
              }}
            >
              May, June, July and August only
            </p>
            <p
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '2rem',
                color: '#8FA9B3',
                fontWeight: 400,
              }}
            >
              $1,500 flat rate
            </p>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '1.125rem',
                color: '#8FA9B3',
                lineHeight: '1.8',
              }}
            >
              Direct booking only
            </p>
          </div>

          <a
            href="book here"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              backgroundColor: '#8FA9B3',
              color: '#0B0F0F',
              padding: '0.875rem 2.5rem',
              borderRadius: '0.5rem',
              fontFamily: "'Inter', sans-serif",
              fontSize: '1rem',
              fontWeight: 500,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
              transition: 'all 0.3s ease',
              marginBottom: '1.5rem',
            }}
          >
            Book Direct
          </a>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.875rem',
              color: '#B8AE9F',
              lineHeight: '1.6',
            }}
          >
            Go Dark is available for direct bookings only. Not available through third-party platforms.
          </p>
        </div>
      </section>

      {/* Bottom Spacer */}
      <section className="py-16"></section>
    </div>
  );
}
