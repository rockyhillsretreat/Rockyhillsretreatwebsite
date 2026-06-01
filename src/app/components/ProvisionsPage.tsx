import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Link } from "react-router-dom";
const heroImg = 'https://res.cloudinary.com/dfvjhslxp/image/upload/bay-view-islands-cloud.jpg';

export function ProvisionsPage() {
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
            style={{
              background: 'linear-gradient(to bottom, rgba(38, 51, 58, 0.4), rgba(38, 51, 58, 0.7))'
            }}
          />
        </div>
        <div className="relative h-full flex items-end justify-center px-6 pb-16">
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
              Food & Providores
            </h1>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 px-6">
        <div className="max-w-[900px] mx-auto text-center">
          <p
            className="mb-6"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1.05rem',
              color: '#EDE9E3',
              lineHeight: '1.8'
            }}
          >
            The kitchen at Rocky Hills is stocked before you arrive. Coffee, loose-leaf teas, pasta and sauces, smoked mussels, honeycomb, chocolate, non-alcoholic drinks for every occasion. Most of it comes from Tasmania. All of it was chosen because it belongs here.
          </p>
          <p
            className="mb-6"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1.05rem',
              color: '#EDE9E3',
              lineHeight: '1.8'
            }}
          >
            The pantry holds dried pasta and handmade sauces from Bottega Crippa in the Huon Valley, loose-leaf teas blended by Tea Equation in Launceston, and honeycomb and chocolate from Kenyak in West Moonah. The fridge is stocked with Pure Tassie water, NON and Elta Ego for something more considered, and smoked mussels and pickled shellfish from Freycinet Marine Farm, ten minutes up the coast. Coffee is from Villino's PodFolk roastery in Moonah. The freezer holds Wursthaus pies, soups, bacon and sausages for nights when you don't want to think about dinner.
          </p>
          <p
            className="mb-6"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1.05rem',
              color: '#EDE9E3',
              lineHeight: '1.8'
            }}
          >
            Some items are included in your stay. Others are available to purchase from The Store and will be added to your account at checkout. A full list is in the compendium.
          </p>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1.05rem',
              color: '#EDE9E3',
              lineHeight: '1.8'
            }}
          >
            We stock no alcohol. If you want wine, Milton Vineyard is 25 minutes north at Cranbrook and Devil's Corner is 30 minutes north at Apslawn. Both are worth the drive.
          </p>
        </div>
      </section>

      {/* Provisions Sections */}
      <section className="py-12 px-6">
        <div className="max-w-[1200px] mx-auto space-y-20">

          {/* Add-on Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              {/* Fruit Box */}
              <div
                className="p-6"
                style={{
                  backgroundColor: '#2E3D45',
                  borderRadius: '0.5rem',
                  border: '1px solid rgba(143, 169, 179, 0.2)'
                }}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '1.125rem',
                        color: '#EDE9E3',
                        fontWeight: 600,
                        marginBottom: '0.25rem'
                      }}
                    >
                      Fruit Box
                    </h3>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.75rem',
                        color: '#8FA9B3',
                        fontWeight: 500
                      }}
                    >
                      Add-on — confirm when you book
                    </p>
                  </div>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '1.125rem',
                      color: '#8FA9B3',
                      fontWeight: 500,
                      flexShrink: 0,
                      marginLeft: '1rem'
                    }}
                  >
                    $35
                  </p>
                </div>
                <p
                  className="mb-3"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.95rem',
                    color: '#B8AE9F',
                    lineHeight: '1.7'
                  }}
                >
                  Seasonal Tasmanian fruit, sourced locally where possible. Four to five varieties depending on what's growing - stone fruit in summer, citrus and apples in winter. Contents confirmed closer to your arrival date.
                </p>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.875rem',
                    color: '#8FA9B3',
                    fontStyle: 'italic'
                  }}
                >
                  Request at least 48 hours ahead.
                </p>
              </div>

              {/* Vegetable Box */}
              <div
                className="p-6"
                style={{
                  backgroundColor: '#2E3D45',
                  borderRadius: '0.5rem',
                  border: '1px solid rgba(143, 169, 179, 0.2)'
                }}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '1.125rem',
                        color: '#EDE9E3',
                        fontWeight: 600,
                        marginBottom: '0.25rem'
                      }}
                    >
                      Vegetable Box
                    </h3>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.75rem',
                        color: '#8FA9B3',
                        fontWeight: 500
                      }}
                    >
                      Add-on — confirm when you book
                    </p>
                  </div>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '1.125rem',
                      color: '#8FA9B3',
                      fontWeight: 500,
                      flexShrink: 0,
                      marginLeft: '1rem'
                    }}
                  >
                    $45
                  </p>
                </div>
                <p
                  className="mb-3"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.95rem',
                    color: '#B8AE9F',
                    lineHeight: '1.7'
                  }}
                >
                  Seasonal vegetables from a local East Coast grower. Enough for two dinners for two. Expect root vegetables, brassicas, and greens depending on the season.
                </p>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.875rem',
                    color: '#8FA9B3',
                    fontStyle: 'italic'
                  }}
                >
                  Request at least 48 hours ahead.
                </p>
              </div>

              {/* Charcuterie Box */}
              <div
                className="p-6"
                style={{
                  backgroundColor: '#2E3D45',
                  borderRadius: '0.5rem',
                  border: '1px solid rgba(143, 169, 179, 0.2)'
                }}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '1.125rem',
                        color: '#EDE9E3',
                        fontWeight: 600,
                        marginBottom: '0.25rem'
                      }}
                    >
                      Charcuterie Box
                    </h3>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.75rem',
                        color: '#8FA9B3',
                        fontWeight: 500
                      }}
                    >
                      Add-on — confirm when you book
                    </p>
                  </div>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '1.125rem',
                      color: '#8FA9B3',
                      fontWeight: 500,
                      flexShrink: 0,
                      marginLeft: '1rem'
                    }}
                  >
                    $185
                  </p>
                </div>
                <p
                  className="mb-3"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.95rem',
                    color: '#B8AE9F',
                    lineHeight: '1.7'
                  }}
                >
                  Wursthaus prosciutto, salami, coppa, and bresaola. Two Bruny Island cheeses - Saint, a soft oozy white mould, and Raw Milk C2, Australia's first raw milk cheese. Bruny Island Apple Pepperberry Paste and Bread & Butter Pickle. Tasman Sea salt lavosh and seasonal Tasmanian fruit.
                </p>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.875rem',
                    color: '#8FA9B3',
                    fontStyle: 'italic'
                  }}
                >
                  Request at least 72 hours ahead.
                </p>
              </div>

            </div>

            <p
              className="mt-6"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.875rem',
                color: '#B8AE9F',
                lineHeight: '1.6',
                fontStyle: 'italic',
                maxWidth: '900px'
              }}
            >
              Add-on boxes are confirmed when you book. We'll let you know if anything isn't available for your dates.
            </p>
          </div>

          {/* The Pasta Shelf */}
          <div className="pb-16" style={{ borderBottom: '1px solid rgba(143, 169, 179, 0.2)' }}>
            <h2
              className="mb-2"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(2rem, 3.5vw, 2.5rem)',
                color: '#EDE9E3'
              }}
            >
              The Pasta Shelf
            </h2>
            <p
              className="mb-4"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.875rem',
                color: '#8FA9B3',
                fontWeight: 500
              }}
            >
              Available to purchase
            </p>
            <p
              className="mb-8"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '1.05rem',
                color: '#EDE9E3',
                lineHeight: '1.8',
                maxWidth: '900px'
              }}
            >
              Tasmanian pasta and sauces. Everything you need for a proper dinner without leaving the retreat.
            </p>

            <div className="space-y-8 max-w-[900px]">
              <div>
                <h3
                  className="mb-3"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '1rem',
                    color: '#8FA9B3',
                    fontWeight: 500
                  }}
                >
                  Pasta:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {["Bottega Crippa casarecce", "Bottega Crippa mafaldine"].map((item, i) => (
                    <p key={i} style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.95rem', color: '#EDE9E3' }}>{item}</p>
                  ))}
                </div>
              </div>

              <div>
                <h3
                  className="mb-3"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '1rem',
                    color: '#8FA9B3',
                    fontWeight: 500
                  }}
                >
                  Bottega Crippa Pasta Sauces:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "Basil passata",
                    "Cygnet mushroom",
                    "Puttanesca",
                    "Lamb ragu",
                    "Nonna's ragu",
                    "Mushroom and Italian sausage"
                  ].map((item, i) => (
                    <p key={i} style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.95rem', color: '#EDE9E3' }}>{item}</p>
                  ))}
                </div>
              </div>

              <div>
                <h3
                  className="mb-3"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '1rem',
                    color: '#8FA9B3',
                    fontWeight: 500
                  }}
                >
                  Pantry:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "Basil pesto",
                    "Tasmanian EVOO",
                    "Capers",
                    "Parmesan",
                    "Cream"
                  ].map((item, i) => (
                    <p key={i} style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.95rem', color: '#EDE9E3' }}>{item}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Grazing */}
          <div className="pb-16" style={{ borderBottom: '1px solid rgba(143, 169, 179, 0.2)' }}>
            <h2
              className="mb-2"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(2rem, 3.5vw, 2.5rem)',
                color: '#EDE9E3'
              }}
            >
              Grazing
            </h2>
            <p
              className="mb-4"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.875rem',
                color: '#8FA9B3',
                fontWeight: 500
              }}
            >
              Available to purchase
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[900px]">
              {[
                "Bay of Fires semi-hard cheese (150g)",
                "Bay of Fires clothbound cheddar (150g)",
                "Wursthaus marinated olives",
                "Tasman Sea salt lavosh",
                "Wild Hives honey",
                "Tasmania Preserve",
                "Potato chips"
              ].map((item, i) => (
                <p
                  key={i}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.95rem',
                    color: '#EDE9E3',
                    lineHeight: '1.6'
                  }}
                >
                  {item}
                </p>
              ))}
            </div>
          </div>

          {/* Chocolate & Sweet */}
          <div className="pb-16" style={{ borderBottom: '1px solid rgba(143, 169, 179, 0.2)' }}>
            <h2
              className="mb-2"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(2rem, 3.5vw, 2.5rem)',
                color: '#EDE9E3'
              }}
            >
              Chocolate & Sweet
            </h2>
            <p
              className="mb-4"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.875rem',
                color: '#8FA9B3',
                fontWeight: 500
              }}
            >
              Available to purchase
            </p>
            <p
              className="mb-8"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '1.05rem',
                color: '#EDE9E3',
                lineHeight: '1.8',
                maxWidth: '900px'
              }}
            >
              A little sweetness at the end of the night.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[900px]">
              {[
                "Kenyak honeycomb milk chocolate, Tarkine",
                "Kenyak honeycomb dark chocolate, Balmoral",
                "Kenyak dark chocolate bar",
                "Kenyak Doc's hot chocolate",
                "Wild Hives honey"
              ].map((item, i) => (
                <p
                  key={i}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.95rem',
                    color: '#EDE9E3',
                    lineHeight: '1.6'
                  }}
                >
                  {item}
                </p>
              ))}
            </div>
          </div>

          {/* Cellar & Coast */}
          <div className="pb-16" style={{ borderBottom: '1px solid rgba(143, 169, 179, 0.2)' }}>
            <h2
              className="mb-2"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(2rem, 3.5vw, 2.5rem)',
                color: '#EDE9E3'
              }}
            >
              Cellar & Coast
            </h2>
            <p
              className="mb-4"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.875rem',
                color: '#8FA9B3',
                fontWeight: 500
              }}
            >
              Available to purchase
            </p>
            <p
              className="mb-8"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '1.05rem',
                color: '#EDE9E3',
                lineHeight: '1.8',
                maxWidth: '900px'
              }}
            >
              Rocky Hills stocks only non-alcoholic drinks. Guests are welcome to bring their own wine or spirits we'll have everything else you need.
            </p>

            <div className="space-y-8 max-w-[900px]">
              <div>
                <h3
                  className="mb-3"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '1rem',
                    color: '#8FA9B3',
                    fontWeight: 500
                  }}
                >
                  Sparkling & Soft:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "TasPop cola (330ml)",
                    "TasPop lemonade (330ml)",
                    "Henry's ginger beer",
                    "Pure Tassie still water, 375ml glass",
                    "Pure Tassie sparkling water, 375ml glass",
                    "Pure Tassie still water, 750ml glass",
                    "Pure Tassie sparkling water, 750ml glass"
                  ].map((item, i) => (
                    <p key={i} style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.95rem', color: '#EDE9E3' }}>{item}</p>
                  ))}
                </div>
              </div>

              <div>
                <h3
                  className="mb-3"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '1rem',
                    color: '#8FA9B3',
                    fontWeight: 500
                  }}
                >
                  Beer:
                </h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.95rem', color: '#EDE9E3' }}>Heaps Normal Quiet XPA</p>
              </div>

              <div>
                <h3
                  className="mb-3"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '1rem',
                    color: '#8FA9B3',
                    fontWeight: 500
                  }}
                >
                  NON Series:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "NON 1 Salted Raspberry and Chamomile",
                    "NON 3 Toasted Cinnamon and Yuzu",
                    "NON 7 Stewed Cherry and Coffee"
                  ].map((item, i) => (
                    <p key={i} style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.95rem', color: '#EDE9E3' }}>{item}</p>
                  ))}
                </div>
              </div>

              <div>
                <h3
                  className="mb-3"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '1rem',
                    color: '#8FA9B3',
                    fontWeight: 500
                  }}
                >
                  Cocktails:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "Elta Ego non-alc Negroni",
                    "Elta Ego non-alc Mojito",
                    "Elta Ego non-alc Dark and Stormy"
                  ].map((item, i) => (
                    <p key={i} style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.95rem', color: '#EDE9E3' }}>{item}</p>
                  ))}
                </div>
              </div>

              <div>
                <h3
                  className="mb-3"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '1rem',
                    color: '#8FA9B3',
                    fontWeight: 500
                  }}
                >
                  Hot:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "Kenyak Doc's hot chocolate",
                    "Tasmanian tea selection"
                  ].map((item, i) => (
                    <p key={i} style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.95rem', color: '#EDE9E3' }}>{item}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Personal Care */}
          <div className="pb-16" style={{ borderBottom: '1px solid rgba(143, 169, 179, 0.2)' }}>
            <h2
              className="mb-2"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(2rem, 3.5vw, 2.5rem)',
                color: '#EDE9E3'
              }}
            >
              Personal Care
            </h2>
            <p
              className="mb-4"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.875rem',
                color: '#8FA9B3',
                fontWeight: 500
              }}
            >
              Available to purchase
            </p>
            <p
              className="mb-8"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '1.05rem',
                color: '#EDE9E3',
                lineHeight: '1.8',
                maxWidth: '900px'
              }}
            >
              The things you might have forgotten.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[900px]">
              {[
                "Sunscreen SPF50",
                "Curaprox toothbrush kit",
                "Insect repellent",
                "Paracetamol",
                "Tampons",
                "Condoms"
              ].map((item, i) => (
                <p
                  key={i}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.95rem',
                    color: '#EDE9E3',
                    lineHeight: '1.6'
                  }}
                >
                  {item}
                </p>
              ))}
            </div>
          </div>

          {/* The Store */}
          <div className="pb-16" style={{ borderBottom: '1px solid rgba(143, 169, 179, 0.2)' }}>
            <h2
              className="mb-2"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(2rem, 3.5vw, 2.5rem)',
                color: '#EDE9E3'
              }}
            >
              The Store
            </h2>
            <p
              className="mb-4"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.875rem',
                color: '#8FA9B3',
                fontWeight: 500
              }}
            >
              Available to purchase
            </p>
            <p
              className="mb-8"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '1.05rem',
                color: '#EDE9E3',
                lineHeight: '1.8',
                maxWidth: '900px'
              }}
            >
              Things made in Tasmania, worth taking home.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[900px]">
              {[
                "Mongrel pure Tasmanian Merino wool socks",
                "Holster Sundreamer sandals, S/M/L"
              ].map((item, i) => (
                <p
                  key={i}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.95rem',
                    color: '#EDE9E3',
                    lineHeight: '1.6'
                  }}
                >
                  {item}
                </p>
              ))}
            </div>
            <p
              className="mt-6"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.875rem',
                color: '#B8AE9F',
                lineHeight: '1.6',
                fontStyle: 'italic',
                maxWidth: '900px'
              }}
            >
              Store items can be purchased during your stay or added to your booking. We'll have your size ready.
            </p>
          </div>

          {/* Something Else */}
          <div className="pb-16">
            <h2
              className="mb-4"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(2rem, 3.5vw, 2.5rem)',
                color: '#EDE9E3'
              }}
            >
              Something Else
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '1.05rem',
                color: '#EDE9E3',
                lineHeight: '1.8',
                maxWidth: '900px'
              }}
            >
              Have a request not on this list? We'll do our best.{' '}
              <a
                href="mailto:rockyhillsretreat@gmail.com"
                style={{
                  color: '#8FA9B3',
                  textDecoration: 'underline',
                  transition: 'color 0.2s'
                }}
              >
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

