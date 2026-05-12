import { Link } from 'react-router-dom';
import { ImageWithFallback } from './figma/ImageWithFallback';
const interiorImg = 'https://res.cloudinary.com/dfvjhslxp/image/upload/retreat-bath-night.jpg';
const blueHourImg = 'https://res.cloudinary.com/dfvjhslxp/image/upload/location-bay-sunset-wide.jpg';

export function WinterCollectionPage() {
  return (
    <div style={{ backgroundColor: '#0B0F0F', minHeight: '100vh' }}>
      {/* Hero Section - Cinematic and Minimal */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background image with minimal overlay */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src={interiorImg}
            alt="Winter interior atmosphere"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-brand/70 via-primary-brand/50 to-primary-brand" />
        </div>
        <div className="relative h-full flex items-center justify-center px-6 text-center">
          <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <h6 className="text-muted-gold tracking-widest">SEASONAL COLLECTION</h6>
            <h1 className="text-5xl md:text-7xl lg:text-8xl text-bone heading-display">
              Winter Intimacies
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-bone/90 italic max-w-3xl mx-auto leading-relaxed">
              For nights when the cold draws you closer.<br />
              For mornings that deserve slowness.
            </p>
            <div className="h-px w-32 bg-muted-gold/50 mx-auto" />
            <p className="text-lg text-bone/70 max-w-2xl mx-auto">
              These are the small rituals that transform a stay into a memory. 
              Each one designed for connection, warmth, and the particular magic of winter.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-24 lg:py-32 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <p className="text-2xl md:text-3xl text-bone/80 italic leading-loose">
            Winter here is not something to endure.<br />
            It is something to inhabit, to lean into,<br />
            to let it shape your days into something tender.
          </p>
        </div>
      </section>

      {/* Winter Items Grid */}
      <section className="pb-24">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {winterItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="bg-card/40 backdrop-blur-sm border border-border p-8 group hover:border-muted-gold/50 transition-cinematic"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 border border-muted-gold/30 flex items-center justify-center flex-shrink-0 group-hover:border-muted-gold group-hover:bg-muted-gold/10 transition-cinematic">
                      <Icon size={24} className="text-muted-gold" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl text-bone heading-display mb-2">{item.name}</h3>
                      <span className={`text-xs tracking-widest ${getTierColor(item.tier)}`}>
                        {item.tier}
                      </span>
                    </div>
                    <div className="text-xl text-bone flex-shrink-0">
                      ${item.price}
                    </div>
                  </div>
                  
                  <p className="text-bone/60 mb-4 leading-relaxed">
                    {item.description}
                  </p>
                  
                  <p className="text-bone/50 italic text-sm border-t border-border/30 pt-4">
                    {item.curatorNote}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Atmospheric Middle Section */}
      <section className="relative py-32 lg:py-48 overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={blueHourImg}
            alt="Blue hour view"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary-brand/60" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center px-6 space-y-8">
          <p className="text-3xl md:text-4xl lg:text-5xl text-bone italic heading-display leading-relaxed">
            "This is the season for staying in.<br />
            For firelight and wool blankets.<br />
            For conversations that stretch into dawn."
          </p>
        </div>
      </section>

      {/* How to Add to Your Stay */}
      <section className="py-24 lg:py-32 bg-ink-black">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <h6 className="text-muted-gold tracking-widest">BOOKING INFORMATION</h6>
          <h2 className="text-4xl md:text-5xl text-bone heading-display">
            Add to Your Winter Stay
          </h2>
          <p className="text-lg text-bone/70 leading-relaxed max-w-2xl mx-auto">
            All winter collection items can be added during booking or requested at least 48 hours 
            before arrival. Some experiences require advance notice for setup and preparation.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
            <div className="space-y-3">
              <div className="w-12 h-12 border border-muted-gold/30 flex items-center justify-center mx-auto">
                <span className="text-muted-gold">1</span>
              </div>
              <h5 className="text-bone">Choose Your Additions</h5>
              <p className="text-bone/60 text-sm">
                Select items from the Winter Collection during booking
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 border border-muted-gold/30 flex items-center justify-center mx-auto">
                <span className="text-muted-gold">2</span>
              </div>
              <h5 className="text-bone">We Prepare</h5>
              <p className="text-bone/60 text-sm">
                Everything is arranged before you arrive
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 border border-muted-gold/30 flex items-center justify-center mx-auto">
                <span className="text-muted-gold">3</span>
              </div>
              <h5 className="text-bone">You Experience</h5>
              <p className="text-bone/60 text-sm">
                Enjoy intimate moments designed for connection
              </p>
            </div>
          </div>
          <a
            href="/booking"
            className="inline-block mt-12 px-12 py-5 bg-muted-gold text-primary-brand hover:bg-bone transition-cinematic tracking-widest"
          >
            CUSTOMIZE YOUR STAY
          </a>
        </div>
      </section>

      {/* Final Poetic Section */}
      <section className="py-24 lg:py-32 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-6">
            <p className="text-2xl md:text-3xl text-bone/90 italic leading-loose">
              Here, winter is not an inconvenience.
            </p>
            <p className="text-2xl md:text-3xl text-bone/90 italic leading-loose">
              It is the reason you came.
            </p>
            <p className="text-2xl md:text-3xl text-bone/90 italic leading-loose">
              It is the invitation to slow down,<br />
              draw close, and remember<br />
              what warmth feels like<br />
              when you've earned it.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
