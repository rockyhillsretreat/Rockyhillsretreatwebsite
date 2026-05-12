import { useState } from "react";
import { Calendar } from "./ui/calendar";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface AddOn {
  id: string;
  name: string;
  price: number;
  category: string;
  tier: string;
  curatorNote: string;
}

export function BookingPage() {
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState(2);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  const addOns: AddOn[] = [
    // CULINARY PROVISIONS
    {
      id: "arrival-provisions",
      name: "Arrival Provisions",
      price: 65,
      category: "Culinary Provisions",
      tier: "Essential",
      curatorNote: "The larder stocked before you get here — sourdough from Barkmill, honey from Wild Hives, estate oil, local pantry essentials."
    },
    {
      id: "morning-box",
      name: "Morning Box",
      price: 55,
      category: "Culinary Provisions",
      tier: "Essential",
      curatorNote: "Sourdough, eggs, cultured butter, honey, juice, coffee. Ready on arrival."
    },
    {
      id: "long-table",
      name: "The Long Table",
      price: 110,
      category: "Culinary Provisions",
      tier: "Essential",
      curatorNote: "Tasmanian cheeses, local charcuterie, sourdough, olives, honey, crackers. Laid out, ready to graze."
    },
    {
      id: "dinner-provisions",
      name: "Dinner Provisions — From the Land & Sea",
      price: 85,
      category: "Culinary Provisions",
      tier: "Essential",
      curatorNote: "Seasonal protein, local vegetables, and full recipes and preparation notes. You cook, at your pace."
    },
    {
      id: "cellar-selection",
      name: "Cellar Selection",
      price: 105,
      category: "Culinary Provisions",
      tier: "Essential",
      curatorNote: "Two bottles from Milton Vineyard, four Moo Brew. Stocked on arrival."
    },
    {
      id: "full-cellar-stock",
      name: "Full Cellar Stock",
      price: 195,
      category: "Culinary Provisions",
      tier: "Essential",
      curatorNote: "Four bottles mixed, spirits, eight beers. For a longer stay."
    },
    {
      id: "beach-picnic-hamper",
      name: "Beach Picnic Hamper",
      price: 145,
      category: "Culinary Provisions",
      tier: "Essential",
      curatorNote: "Everything needed for a proper afternoon on the beach. Packed and ready."
    },
    
    // WILDERNESS EXPERIENCES
    {
      id: "guided-hike",
      name: "Guided Coastal Hike (Half-Day)",
      price: 180,
      category: "Wilderness Experiences",
      tier: "Experience",
      curatorNote: "Walk the edge where land meets longing. Your guide knows geology, birdlife, plant communities."
    },
    {
      id: "sea-kayaking",
      name: "Sea Kayaking (Guided)",
      price: 220,
      category: "Wilderness Experiences",
      tier: "Experience",
      curatorNote: "Out on Great Oyster Bay at your own pace. The water here is calm and the bay is wide."
    },
    {
      id: "stargazing",
      name: "Guided Stargazing",
      price: 160,
      category: "Wilderness Experiences",
      tier: "Experience",
      curatorNote: "The stars here remember when the world was quiet. No light pollution, no neighbours."
    },
    {
      id: "foraging",
      name: "Foraging with a Local Guide",
      price: 180,
      category: "Wilderness Experiences",
      tier: "Experience",
      curatorNote: "Learn to read the land like a love letter. Come back with a basket and a different understanding."
    },
    
    // EXTENDED EXPERIENCES
    {
      id: "fishing-charter",
      name: "Private Fishing Charter (Half-Day)",
      price: 1100,
      category: "Extended Experiences",
      tier: "Signature Experience",
      curatorNote: "Return with something caught, something earned."
    },
    {
      id: "horseback-riding",
      name: "Horseback Riding on the Coast (2 hours)",
      price: 480,
      category: "Extended Experiences",
      tier: "Experience",
      curatorNote: "Hooves on sand. Wind in your hair. The oldest kind of freedom."
    },
    {
      id: "local-artist",
      name: "Private Session with Local Artist (Painting or Pottery)",
      price: 950,
      category: "Extended Experiences",
      tier: "Signature Experience",
      curatorNote: "Create something that will outlast the memory of this place."
    },
    
    // CELEBRATION & ROMANCE
    {
      id: "proposal-package",
      name: "Proposal Package (Setup, Photography, Champagne)",
      price: 2400,
      category: "Celebration & Romance",
      tier: "Once-in-a-Lifetime",
      curatorNote: "We orchestrate the moment. You speak the words. The land witnesses."
    },
    {
      id: "anniversary-package",
      name: "Anniversary Package (Provisions, Flowers, Handwritten Letter)",
      price: 1800,
      category: "Celebration & Romance",
      tier: "Signature Experience",
      curatorNote: "For love that has weathered winters and still blooms."
    },
    {
      id: "photographer-session",
      name: "Private Photographer (2-hour portrait session)",
      price: 1200,
      category: "Celebration & Romance",
      tier: "Signature Experience",
      curatorNote: "So you remember not just the place, but the way you looked at each other here."
    },
    {
      id: "couples-journal",
      name: "Leather-Bound Couples Journal (monogrammed)",
      price: 180,
      category: "Celebration & Romance",
      tier: "Essential",
      curatorNote: "Write your story. Leave it here or take it with you."
    },
    
    // INTIMATE TOUCHES
    {
      id: "firewood-premium",
      name: "Premium Firewood Service (daily stocking)",
      price: 95,
      category: "Intimate Touches",
      tier: "Essential",
      curatorNote: "So you never have to leave warmth to tend it."
    },
    {
      id: "vinyl-curated",
      name: "Curated Vinyl Collection (5 records chosen for your mood)",
      price: 120,
      category: "Intimate Touches",
      tier: "Essential",
      curatorNote: "We ask you three questions. You receive the soundtrack to your silence."
    },
  ];

  const categories = Array.from(new Set(addOns.map(a => a.category)));

  const toggleAddOn = (id: string) => {
    setSelectedAddOns(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const calculateTotal = () => {
    const baseRate = 750; // per night
    const nights = checkIn && checkOut 
      ? Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
      : 0;
    const accommodationTotal = baseRate * nights;
    const addOnsTotal = selectedAddOns.reduce((sum, id) => {
      const addOn = addOns.find(a => a.id === id);
      return sum + (addOn?.price || 0);
    }, 0);
    return accommodationTotal + addOnsTotal;
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Once-in-a-Lifetime":
        return "text-muted-gold";
      case "Signature Experience":
        return "text-muted-gold/80";
      case "Essential":
        return "text-bone/60";
      case "Experience":
        return "text-bone/50";
      default:
        return "text-bone/50";
    }
  };

  return (
    <div className="min-h-screen bg-primary-brand pt-32 pb-20">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h6 className="text-muted-gold tracking-widest mb-4">RESERVATION</h6>
          <h1 className="text-5xl md:text-6xl lg:text-7xl text-bone heading-display mb-6">
            Book Your Stay
          </h1>
          <p className="text-xl text-bone/70 max-w-2xl mx-auto italic">
            Compose your perfect retreat. Every detail matters.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Booking Details */}
          <div className="lg:col-span-2 space-y-12">
            {/* Dates & Guests */}
            <div className="bg-card/40 backdrop-blur-sm border border-border p-8 space-y-8">
              <div>
                <h3 className="text-2xl text-bone heading-display mb-6">Your Dates</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <Label className="text-bone/70 mb-3 block">Check-In</Label>
                    <Calendar
                      mode="single"
                      selected={checkIn}
                      onSelect={setCheckIn}
                      className="rounded-none border border-border"
                    />
                  </div>
                  <div>
                    <Label className="text-bone/70 mb-3 block">Check-Out</Label>
                    <Calendar
                      mode="single"
                      selected={checkOut}
                      onSelect={setCheckOut}
                      className="rounded-none border border-border"
                    />
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-bone/70 mb-3 block">Number of Guests (Maximum 2)</Label>
                <Input
                  type="number"
                  min="1"
                  max="2"
                  value={guests}
                  onChange={(e) => setGuests(Math.min(2, Math.max(1, parseInt(e.target.value) || 1)))}
                  className="bg-input-background border-border text-bone w-32"
                />
              </div>
            </div>

            {/* Add-Ons by Category */}
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-3xl md:text-4xl text-bone heading-display mb-4">
                  Curated Additions
                </h3>
                <p className="text-bone/60 italic max-w-2xl mx-auto">
                  Each experience is designed to deepen your sense of place and presence.
                </p>
              </div>

              {categories.map((category) => (
                <div
                  key={category}
                  className="bg-card/40 backdrop-blur-sm border border-border p-8"
                >
                  <h4 className="text-xl text-muted-gold mb-6 tracking-widest">
                    {category}
                  </h4>
                  <div className="space-y-6">
                    {addOns
                      .filter((addOn) => addOn.category === category)
                      .map((addOn) => (
                        <div
                          key={addOn.id}
                          className="flex items-start gap-4 pb-6 border-b border-border/50 last:border-0 last:pb-0"
                        >
                          <Checkbox
                            id={addOn.id}
                            checked={selectedAddOns.includes(addOn.id)}
                            onCheckedChange={() => toggleAddOn(addOn.id)}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <label
                              htmlFor={addOn.id}
                              className="block text-bone hover:text-muted-gold transition-cinematic cursor-pointer mb-2"
                            >
                              {addOn.name}
                            </label>
                            <p className="text-sm text-bone/50 italic mb-2">
                              {addOn.curatorNote}
                            </p>
                            <div className="flex items-center gap-4">
                              <span className={`text-xs tracking-widest ${getTierColor(addOn.tier)}`}>
                                {addOn.tier}
                              </span>
                              <span className="text-bone/70">
                                ${addOn.price.toLocaleString()} AUD
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Guest Information */}
            <div className="bg-card/40 backdrop-blur-sm border border-border p-8 space-y-6">
              <h3 className="text-2xl text-bone heading-display mb-6">Your Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-bone/70 mb-2 block">First Name</Label>
                  <Input
                    type="text"
                    placeholder="Given name"
                    className="bg-input-background border-border text-bone"
                  />
                </div>
                <div>
                  <Label className="text-bone/70 mb-2 block">Last Name</Label>
                  <Input
                    type="text"
                    placeholder="Family name"
                    className="bg-input-background border-border text-bone"
                  />
                </div>
                <div>
                  <Label className="text-bone/70 mb-2 block">Email</Label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    className="bg-input-background border-border text-bone"
                  />
                </div>
                <div>
                  <Label className="text-bone/70 mb-2 block">Phone</Label>
                  <Input
                    type="tel"
                    placeholder="+61"
                    className="bg-input-background border-border text-bone"
                  />
                </div>
              </div>
              <div>
                <Label className="text-bone/70 mb-2 block">Special Requests or Dietary Requirements</Label>
                <textarea
                  rows={4}
                  placeholder="Tell us anything we should know..."
                  className="w-full bg-input-background border border-border text-bone p-4 resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 bg-ink-black border border-muted-gold/30 p-8 space-y-6">
              <h4 className="text-2xl text-bone heading-display border-b border-muted-gold/30 pb-4">
                Reservation Summary
              </h4>

              {checkIn && checkOut && (
                <div className="space-y-3 pb-4 border-b border-border/30">
                  <div className="flex justify-between text-bone/70">
                    <span>Check-In</span>
                    <span>{checkIn.toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between text-bone/70">
                    <span>Check-Out</span>
                    <span>{checkOut.toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between text-bone/70">
                    <span>Nights</span>
                    <span>
                      {Math.ceil(
                        (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-bone">
                    <span>Guests</span>
                    <span>{guests}</span>
                  </div>
                </div>
              )}

              {selectedAddOns.length > 0 && (
                <div className="space-y-3 pb-4 border-b border-border/30">
                  <h5 className="text-muted-gold text-sm tracking-widest">SELECTED ADD-ONS</h5>
                  {selectedAddOns.map((id) => {
                    const addOn = addOns.find((a) => a.id === id);
                    if (!addOn) return null;
                    return (
                      <div key={id} className="flex justify-between text-sm">
                        <span className="text-bone/60 flex-1 pr-4">{addOn.name}</span>
                        <span className="text-bone">${addOn.price.toLocaleString()}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="space-y-4 pt-4">
                <div className="flex justify-between text-xl text-bone">
                  <span className="heading-display">Total</span>
                  <span className="heading-display">${calculateTotal().toLocaleString()} AUD</span>
                </div>
                <p className="text-xs text-bone/50 italic">
                  All prices in Australian Dollars. 50% deposit required to confirm.
                </p>
              </div>

              <button className="w-full py-4 bg-muted-gold text-primary-brand hover:bg-bone transition-cinematic tracking-widest mt-6">
                COMPLETE RESERVATION
              </button>

              <div className="pt-6 border-t border-border/30 text-center">
                <p className="text-sm text-bone/60 italic leading-relaxed">
                  Your nights here will feel like the world has fallen away.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}