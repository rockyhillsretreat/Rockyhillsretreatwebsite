import { MapPin, Clock, Plane, Car, Cloud } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
const heroImg = 'https://res.cloudinary.com/dfvjhslxp/image/upload/location-freycinet-sunset-trees.jpg';
const coastalImg = 'https://res.cloudinary.com/dfvjhslxp/image/upload/bay-view-swansea-coast.jpg';
const duskImg = 'https://res.cloudinary.com/dfvjhslxp/image/upload/location-bay-sunset-wide.jpg';

export function LocationPage() {
  return (
    <div style={{ backgroundColor: '#26333A', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={heroImg}
            alt="Tasmania's east coast"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-brand/20 to-primary-brand" />
        </div>
        <div className="relative h-full flex items-center justify-center px-6 text-center">
          <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <h1 className="text-5xl md:text-7xl lg:text-8xl text-bone heading-display">
              Location
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-bone/90 italic max-w-3xl mx-auto leading-relaxed">
              A coastline that holds its breath.<br />
              Where the wild meets the carefully hidden.
            </p>
          </div>
        </div>
      </section>

      {/* Where We Are */}
      <section className="py-24 lg:py-32 px-6">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8">
              <h6 className="text-muted-gold tracking-widest">WHERE WE ARE</h6>
              <h2 className="text-4xl md:text-5xl text-bone heading-display">
                Tasmania's<br />East Coast
              </h2>
              <div className="space-y-6 text-bone/70">
                <p>
                  Rocky Hills sits on the traditional country of the Big River Nation and Oyster Bay Nation, between Swansea and the Freycinet Peninsula. We acknowledge this country and those who have known it longest.
                </p>
                <p>
                  Swansea is nearby. Hobart is ninety minutes south. There is one road in.
                </p>
                <p>
                  That's the point.
                </p>
              </div>
            </div>
            <div className="relative h-[600px] overflow-hidden">
              <ImageWithFallback
                src={coastalImg}
                alt="Coastal landscape"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Getting Here */}
      <section className="py-24 lg:py-32 bg-ink-black">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h6 className="text-muted-gold tracking-widest mb-4">ARRIVAL OPTIONS</h6>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-bone heading-display">
              How to Reach Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* By Air - Helicopter */}
            <div className="bg-card/40 backdrop-blur-sm border border-border p-8 space-y-6">
              <div className="w-12 h-12 border border-muted-gold/30 flex items-center justify-center">
                <Plane size={24} className="text-muted-gold" />
              </div>
              <h3 className="text-2xl text-bone heading-display">Private Helicopter</h3>
              <div className="space-y-4 text-bone/70 text-sm">
                <div className="flex justify-between pb-3 border-b border-border/30">
                  <span>From Hobart</span>
                  <span className="text-bone">35 minutes</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-border/30">
                  <span>From Launceston</span>
                  <span className="text-bone">50 minutes</span>
                </div>
                <div className="flex justify-between">
                  <span>Price (one-way)</span>
                  <span className="text-bone">$3,000</span>
                </div>
              </div>
              <p className="text-xs text-bone/50 italic pt-4 border-t border-border/30">
                The most dramatic arrival. Land directly on the property. A hire car can be arranged and delivered to the property for your stay. Weather dependent.
              </p>
            </div>

            {/* By Car - Luxury Service */}
            <div className="bg-card/40 backdrop-blur-sm border border-border p-8 space-y-6">
              <div className="w-12 h-12 border border-muted-gold/30 flex items-center justify-center">
                <Car size={24} className="text-muted-gold" />
              </div>
              <h3 className="text-2xl text-bone heading-display">Luxury Car Service</h3>
              <div className="space-y-4 text-bone/70 text-sm">
                <div className="flex justify-between pb-3 border-b border-border/30">
                  <span>From Hobart</span>
                  <span className="text-bone">1.5 hours</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-border/30">
                  <span>From Launceston</span>
                  <span className="text-bone">2.5 hours</span>
                </div>
                <div className="flex justify-between">
                  <span>Price (one-way)</span>
                  <span className="text-bone">$850</span>
                </div>
              </div>
              <p className="text-xs text-bone/50 italic pt-4 border-t border-border/30">
                Mercedes-Benz S-Class. Professional driver. Ask us to arrange when you book.
              </p>
            </div>

            {/* Self-Drive */}
            <div className="bg-card/40 backdrop-blur-sm border border-border p-8 space-y-6">
              <div className="w-12 h-12 border border-muted-gold/30 flex items-center justify-center">
                <MapPin size={24} className="text-muted-gold" />
              </div>
              <h3 className="text-2xl text-bone heading-display">Self-Drive</h3>
              <div className="space-y-4 text-bone/70 text-sm">
                <div className="flex justify-between pb-3 border-b border-border/30">
                  <span>From Hobart</span>
                  <span className="text-bone">1.5 hours</span>
                </div>
                <div className="flex justify-between pb-3 border-b border-border/30">
                  <span>From Launceston</span>
                  <span className="text-bone">2.5 hours</span>
                </div>
                <div className="flex justify-between">
                  <span>Road conditions</span>
                  <span className="text-bone">Sealed + gravel</span>
                </div>
              </div>
              <p className="text-xs text-bone/50 italic pt-4 border-t border-border/30">
                Detailed directions provided upon booking. Final 2km is unsealed road. 4WD recommended but not essential.
              </p>
            </div>
          </div>

          <div className="mt-16 p-8 bg-primary-brand/40 border border-muted-gold/20">
            <div className="flex items-start gap-4">
              <Car size={24} className="text-muted-gold flex-shrink-0 mt-1" />
              <div className="space-y-2">
                <h5 className="text-bone">Hire Car Delivery</h5>
                <p className="text-bone/60 text-sm leading-relaxed">
                  Helicopter transfers from Hobart are available on request, with a hire car delivered to the property if you need one during your stay. Ask us when you book and we'll arrange everything.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-8 bg-primary-brand/40 border border-muted-gold/20">
            <div className="flex items-start gap-4">
              <Cloud size={24} className="text-muted-gold flex-shrink-0 mt-1" />
              <div className="space-y-2">
                <h5 className="text-bone">Weather Considerations</h5>
                <p className="text-bone/60 text-sm leading-relaxed">
                  Tasmania's weather can change rapidly. We recommend checking forecasts before departure and
                  allowing extra time for travel. Helicopter transfers are weather-dependent and may be rescheduled.
                  Winter roads can be icy - drive carefully and arrive before dark if possible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby & What to Expect */}
      <section className="py-24 lg:py-32 px-6">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* What's Nearby */}
            <div className="space-y-8">
              <h3 className="text-3xl text-bone heading-display">What's Nearby</h3>
              <div className="space-y-6">
                <div className="pb-6 border-b border-border/30">
                  <div className="flex justify-between items-baseline mb-2">
                    <h5 className="text-bone">Swansea - Nearest Town</h5>
                    <span className="text-bone/60 text-sm">25 minutes</span>
                  </div>
                  <p className="text-bone/50 text-sm">
                    Small coastal village with general store, café, and fuel station.
                    We recommend stocking up here if self-catering.
                  </p>
                </div>

                <div className="pb-6 border-b border-border/30">
                  <div className="flex justify-between items-baseline mb-2">
                    <h5 className="text-bone">Freycinet National Park</h5>
                    <span className="text-bone/60 text-sm">45 minutes</span>
                  </div>
                  <p className="text-bone/50 text-sm">
                    World-famous Wineglass Bay, walking trails, pristine beaches.
                    Day trips easily arranged.
                  </p>
                </div>

                <div className="pb-6 border-b border-border/30">
                  <div className="flex justify-between items-baseline mb-2">
                    <h5 className="text-bone">Bay of Fires</h5>
                    <span className="text-bone/60 text-sm">1.5 hours north</span>
                  </div>
                  <p className="text-bone/50 text-sm">
                    Orange-lichen-covered granite, white sand, turquoise water.
                    Worth the drive.
                  </p>
                </div>

                <div className="pb-6 border-b border-border/30">
                  <div className="flex justify-between items-baseline mb-2">
                    <h5 className="text-bone">Wineries & Distilleries</h5>
                    <span className="text-bone/60 text-sm">5 - 60 minutes</span>
                  </div>
                  <p className="text-bone/50 text-sm">
                    Many cellar doors and distilleries within driving distance.
                    Tastings by appointment.
                  </p>
                </div>
              </div>

              <p className="text-bone/50 text-sm italic mt-8 pt-6 border-t border-border/30">
                Rocky Hills sits on the country of the Mumirimina clan of the Oyster Bay Nation (Paredarerme) and the Big River Nation (Lairmairrener), who have cared for this land and this coastline for tens of thousands of years. We acknowledge their continuing connection to country and pay our respects to Elders past and present. This country was never ceded.
              </p>
            </div>

            {/* What to Expect */}
            <div className="space-y-8">
              <h3 className="text-3xl text-bone heading-display">What to Expect</h3>
              <div className="space-y-6 text-bone/70">
                <div className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 bg-muted-gold mt-2.5 flex-shrink-0" />
                  <p>
                    <strong className="text-bone">Mobile reception:</strong> Limited.
                    WiFi available at the retreat.
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 bg-muted-gold mt-2.5 flex-shrink-0" />
                  <p>
                    <strong className="text-bone">Nearest major hospital:</strong> Royal Hobart Hospital, approximately 2 hours. Emergency services accessible. First aid kit on site.
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 bg-muted-gold mt-2.5 flex-shrink-0" />
                  <p>
                    <strong className="text-bone">Wildlife:</strong> Wallabies, wombats, echidnas common.
                    Tasmanian devils and quolls occasionally spotted at dusk. Keep respectful distance.
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 bg-muted-gold mt-2.5 flex-shrink-0" />
                  <p>
                    <strong className="text-bone">Weather:</strong> Changeable. Layers essential.
                    Winter temperatures 2-12°C. Fireplace keeps the space warm.
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 bg-muted-gold mt-2.5 flex-shrink-0" />
                  <p>
                    <strong className="text-bone">Light pollution:</strong> None.
                    The Milky Way is visible on clear nights. Bring a torch for night walks.
                  </p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 bg-muted-gold mt-2.5 flex-shrink-0" />
                  <p>
                    <strong className="text-bone">What to bring:</strong> Warm clothing, walking boots,
                    camera, books, journal. Everything else is provided.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Time to Visit */}
      <section className="py-24 lg:py-32 bg-card/20 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <h6 className="text-muted-gold tracking-widest">SEASONAL GUIDE</h6>
          <h2 className="text-4xl md:text-5xl text-bone heading-display">
            When to Come
          </h2>
          <p className="text-lg text-bone/70 leading-relaxed">
            Rocky Hills Retreat is designed for year round comfort but every season reveals something different.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 text-left">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Clock size={20} className="text-muted-gold" />
                <h5 className="text-bone tracking-widest">WINTER (JUN TO AUG)</h5>
              </div>
              <p className="text-bone/60 text-sm leading-relaxed">
                Peak season. Cold nights, roaring fires, steaming baths.
                The retreat at its most romantic. Book 3-6 months in advance.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Clock size={20} className="text-muted-gold" />
                <h5 className="text-bone tracking-widest">SPRING (SEP TO NOV)</h5>
              </div>
              <p className="text-bone/60 text-sm leading-relaxed">
                Wildflowers emerge. Longer days. Still cool enough for fires.
                Wildlife more active. Excellent for hiking.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Clock size={20} className="text-muted-gold" />
                <h5 className="text-bone tracking-widest">SUMMER (DEC TO FEB)</h5>
              </div>
              <p className="text-bone/60 text-sm leading-relaxed">
                Warmest months but still mild. Outdoor bath under stars.
                Longer evenings. Swimming possible (ocean is cold).
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Clock size={20} className="text-muted-gold" />
                <h5 className="text-bone tracking-widest">AUTUMN (MAR TO MAY)</h5>
              </div>
              <p className="text-bone/60 text-sm leading-relaxed">
                Golden light. Crisp mornings. Forest changing color.
                Quieter season, easier availability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Poetic Section */}
      <section className="relative py-32 lg:py-48 overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={duskImg}
            alt="Coastal dusk"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative max-w-4xl mx-auto text-center px-6 space-y-12">
          <p className="text-3xl md:text-4xl lg:text-5xl text-bone italic heading-display leading-relaxed">
            The journey here is part of the experience.<br />
            <br />
            Leave early. Drive slowly.<br />
            Let the landscape change you<br />
            before you even arrive.
          </p>
        </div>
      </section>
    </div>
  );
}
