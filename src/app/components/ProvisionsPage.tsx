import { ImageWithFallback } from "./figma/ImageWithFallback";
const heroImg = 'https://res.cloudinary.com/dfvjhslxp/image/upload/bay-view-islands-cloud.jpg';

export function ProvisionsPage() {
  const boxes = [
    {
      name: 'Fruit Box',
      price: '$35',
      description: 'Seasonal Tasmanian fruit. Four to five varieties depending on what\'s growing. Contents confirmed closer to your arrival date.',
      note: 'Request at least 48 hours ahead.',
    },
    {
      name: 'Vegetable Box',
      price: '$45',
      description: 'Seasonal vegetables from a local East Coast grower. Enough for two dinners for two. Root vegetables, brassicas and greens depending on the season.',
      note: 'Request at least 48 hours ahead.',
    },
    {
      name: 'Charcuterie Box',
      price: '$185',
      description: 'Cured meats, two Tasmanian cheeses, condiments, lavosh and seasonal fruit. Everything you need to graze without leaving the deck.',
      note: 'Request at least 72 hours ahead.',
    },
    {
      name: 'Picnic Box',
      price: '$145',
      description: 'Packed for an afternoon on the headland or down at the bay. Charcuterie, cheese, something sweet, two non-alcoholic drinks and a blanket. Contents vary by season.',
      note: 'Request at least 48 hours ahead.',
    },
  ];

  return (
    <div style={{ backgroundColor: '#26333A', minHeight: '100vh' }}>
      {/* Hero */}
      <section className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={heroImg}
            alt="Food & Providores"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, rgba(38, 51, 58, 0.4), rgba(38, 51, 58, 0.7))' }}
          />
        </div>
        <div className="relative h-full flex items-end justify-center px-6 pb-16">
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              color: '#EDE9E3',
              letterSpacing: '-0.01em',
              lineHeight: '1.1',
              textAlign: 'center',
            }}
          >
            Food & Providores
          </h1>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 px-6">
        <div className="max-w-[900px] mx-auto">
          <p className="mb-6" style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.05rem', color: '#EDE9E3', lineHeight: '1.8' }}>
            The kitchen at Rocky Hills is stocked before you arrive. What's in it was chosen because it belongs here. Producers we know, ingredients from the island, nothing generic.
          </p>
          <p className="mb-6" style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.05rem', color: '#EDE9E3', lineHeight: '1.8' }}>
            Coffee is from Villino in Moonah. Tea from Tea Equation in Launceston. Pasta and sauces from Bottega Crippa in the Huon Valley. Honeycomb and chocolate from Kenyak in West Moonah. The fridge holds Pure Tassie water, NON and Elta Ego for something more considered, and smoked mussels and pickled shellfish from Freycinet Marine Farm, 45 minutes north. The freezer holds Wursthaus for nights when you don't want to think about dinner.
          </p>
          <p className="mb-6" style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.05rem', color: '#EDE9E3', lineHeight: '1.8' }}>
            Some of what's here is included in your stay. The rest is available to purchase from The Store and will be added to your account at checkout. A full list is in the compendium waiting for you at the property.
          </p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.05rem', color: '#EDE9E3', lineHeight: '1.8' }}>
            We stock no alcohol. Mayfield Vineyard and Tasman Seasalt are just across the road. Milton Vineyard is 25 minutes north at Cranbrook and Devil's Corner is 30 minutes north at Apslawn. Both are worth the drive.
          </p>
        </div>
      </section>

      {/* Add-on Boxes */}
      <section className="py-12 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div style={{ paddingBottom: '4rem', borderBottom: '1px solid rgba(143, 169, 179, 0.2)' }}>
            <h2
              className="mb-2"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 3.5vw, 2.5rem)', color: '#EDE9E3' }}
            >
              Add-ons
            </h2>
            <p className="mb-10" style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', color: '#8FA9B3', fontStyle: 'italic' }}>
              Available to order before your arrival. Confirm when you book. Request at least 48 hours ahead unless noted.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {boxes.map((box) => (
                <div
                  key={box.name}
                  className="p-6"
                  style={{
                    backgroundColor: '#2E3D45',
                    borderRadius: '0.5rem',
                    border: '1px solid rgba(143, 169, 179, 0.2)',
                  }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.125rem', color: '#EDE9E3', fontWeight: 600 }}>
                      {box.name}
                    </h3>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.125rem', color: '#8FA9B3', fontWeight: 500, flexShrink: 0, marginLeft: '1rem' }}>
                      {box.price}
                    </p>
                  </div>
                  <p className="mb-3" style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.95rem', color: '#B8AE9F', lineHeight: '1.7' }}>
                    {box.description}
                  </p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.875rem', color: '#8FA9B3', fontStyle: 'italic' }}>
                    {box.note}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* The Store */}
          <div style={{ paddingTop: '4rem', paddingBottom: '4rem', borderBottom: '1px solid rgba(143, 169, 179, 0.2)' }}>
            <h2
              className="mb-4"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 3.5vw, 2.5rem)', color: '#EDE9E3' }}
            >
              The Store
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.05rem', color: '#EDE9E3', lineHeight: '1.8', maxWidth: '900px' }}>
              A small collection of Tasmanian-made goods available during your stay. Ask us what's in, or find the full list in the compendium.
            </p>
          </div>

          {/* Something Else */}
          <div style={{ paddingTop: '4rem' }}>
            <h2
              className="mb-4"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 3.5vw, 2.5rem)', color: '#EDE9E3' }}
            >
              Something Else
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.05rem', color: '#EDE9E3', lineHeight: '1.8', maxWidth: '900px' }}>
              Have a request not on this list? We'll do our best.{' '}
              <a href="mailto:stay@rockyhillsretreat.com.au" style={{ color: '#8FA9B3', textDecoration: 'underline' }}>
                Write to us
              </a>
              {' '}when you book.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
