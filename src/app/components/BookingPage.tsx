import React, { useState } from "react";
import { Calendar } from "./ui/calendar";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface ProvisionItem {
  id: string;
  name: string;
  description: string;
  price: number;
  leadTime: string;
}

interface ExperienceItem {
  id: string;
  name: string;
  description: string;
  note?: string;
}

interface CelebrationItem {
  id: string;
  name: string;
  description: string;
  price?: number;
  leadTime?: string;
  isArranged?: boolean;
}

export function BookingPage() {
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests] = useState(2);
  const [selectedProvisions, setSelectedProvisions] = useState<string[]>([]);
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>([]);
  const [selectedCelebrations, setSelectedCelebrations] = useState<string[]>([]);

  const provisions: ProvisionItem[] = [
    {
      id: "fruit-box",
      name: "Fruit Box",
      description: "Seasonal Tasmanian fruit, sourced locally where possible. Four to five varieties depending on what's growing — stone fruit in summer, citrus and apples in winter.",
      price: 35,
      leadTime: "Request at least 48 hours ahead."
    },
    {
      id: "vegetable-box",
      name: "Vegetable Box",
      description: "Seasonal vegetables from a local East Coast grower. Enough for two dinners for two.",
      price: 45,
      leadTime: "Request at least 48 hours ahead."
    },
    {
      id: "charcuterie-box",
      name: "Charcuterie Box",
      description: "Wursthaus prosciutto, salami, coppa, and bresaola. Bay of Fires cheeses. Local preserves and pickles.",
      price: 185,
      leadTime: "Request at least 72 hours ahead."
    },
    {
      id: "dinner-box",
      name: "Dinner Box",
      description: "Your choice of protein from the freezer — Cape Grim scotch fillet, Wursthaus sausages, or a Wursthaus pie — alongside Bottega Crippa pasta with your choice of sauce, and the seasonal vegetable box. Full recipe included. Serves two.",
      price: 145,
      leadTime: "Request at least 72 hours ahead."
    },
    {
      id: "beach-picnic-hamper",
      name: "Beach Picnic Hamper",
      description: "Everything needed for a proper afternoon on the beach. Packed and ready using local producers.",
      price: 120,
      leadTime: "Request at least 48 hours ahead."
    },
  ];

  const experiences: ExperienceItem[] = [
    {
      id: "sea-kayaking",
      name: "Sea Kayaking",
      description: "Guided sea kayaking along the Freycinet Peninsula coastline. Award-winning local operator.",
    },
    {
      id: "fishing-charter",
      name: "Fishing Charter",
      description: "Half day on Great Oyster Bay and Schouten Passage with a local skipper. Flathead, trumpeter, squid.",
    },
    {
      id: "helicopter-flight",
      name: "Scenic Helicopter Flight",
      description: "The East Coast from above. Great Oyster Bay, the Hazards, Wineglass Bay, Schouten Island.",
    },
    {
      id: "wine-trail",
      name: "The Wine Trail, Guided",
      description: "Four East Coast cellar doors, lunch included, pickup and return from the property.",
      note: "Off-property experience. RHR does not serve alcohol on site.",
    },
    {
      id: "couples-massage",
      name: "Couples Massage",
      description: "A therapist comes to you. Remedial or relaxation. Available with the Huon pine bath on the deck.",
    },
  ];

  const celebrations: CelebrationItem[] = [
    {
      id: "photographer",
      name: "Private Photographer",
      description: "A half day session on the property and surrounding headland. For proposals, anniversaries, or simply being here together.",
      isArranged: true,
    },
    {
      id: "beach-picnic-setup",
      name: "Beach Picnic Setup",
      description: "Hamper assembled from local producers, set up on the beach before you arrive.",
      price: 120,
      leadTime: "Request at least 48 hours ahead.",
    },
  ];

  const toggleProvision = (id: string) => {
    setSelectedProvisions(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleExperience = (id: string) => {
    setSelectedExperiences(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleCelebration = (id: string) => {
    setSelectedCelebrations(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const calculateTotal = () => {
    const provisionsTotal = selectedProvisions.reduce((sum, id) => {
      return sum + (provisions.find(p => p.id === id)?.price || 0);
    }, 0);
    const celebrationsTotal = selectedCelebrations.reduce((sum, id) => {
      const item = celebrations.find(c => c.id === id);
      return sum + (item?.price || 0);
    }, 0);
    return provisionsTotal + celebrationsTotal;
  };

  const toBeArranged = [
    ...selectedExperiences.map(id => experiences.find(e => e.id === id)?.name),
    ...selectedCelebrations
      .filter(id => celebrations.find(c => c.id === id)?.isArranged)
      .map(id => celebrations.find(c => c.id === id)?.name),
  ].filter(Boolean) as string[];

  return (
    <div className="min-h-screen bg-primary-brand pt-32 pb-20">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="text-center mb-16">
          <h6 className="text-muted-gold tracking-widest mb-4">RESERVATION</h6>
          <h1 className="text-5xl md:text-6xl lg:text-7xl text-bone heading-display mb-6">Book Your Stay</h1>
          <p className="text-xl text-bone/70 max-w-2xl mx-auto italic">
            Compose your perfect retreat. Every detail matters.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">

            {/* Section 1: Dates */}
            <div className="bg-card/40 backdrop-blur-sm border border-border p-8 space-y-8">
              <h3 className="text-2xl text-bone heading-display mb-6">Your Dates</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <Label className="text-bone/70 mb-3 block">Check-In</Label>
                  <Calendar mode="single" selected={checkIn} onSelect={setCheckIn} className="rounded-none border border-border" />
                </div>
                <div>
                  <Label className="text-bone/70 mb-3 block">Check-Out</Label>
                  <Calendar mode="single" selected={checkOut} onSelect={setCheckOut} className="rounded-none border border-border" />
                </div>
              </div>
              <p className="text-bone/50 text-sm italic">Two-night minimum. From $750 per night.</p>
            </div>

            {/* Section 2: Curated Additions */}
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl text-bone heading-display mb-3">Curated Additions</h3>
                <p className="text-bone/60 italic">Each addition is arranged before you arrive. Confirm when you book.</p>
              </div>

              {/* Group 1: Provisions */}
              <div className="bg-card/40 backdrop-blur-sm border border-border p-8">
                <h4 className="text-xl text-[#8FA9B3] mb-8 tracking-widest">Provisions</h4>
                <div className="space-y-8">
                  {provisions.map((item) => (
                    <div key={item.id} className="pb-8 border-b border-border/30 last:border-0 last:pb-0">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex-1">
                          <h5 className="text-bone text-lg mb-2">{item.name}</h5>
                          <p className="text-bone/70 text-sm mb-1">{item.description}</p>
                          <p className="text-bone/50 text-xs italic">{item.leadTime}</p>
                        </div>
                        <div className="flex md:flex-col items-center md:items-end gap-3 md:gap-2 shrink-0">
                          <span className="text-bone text-lg">${item.price} AUD</span>
                          <div className="flex items-center gap-2">
                            <label htmlFor={item.id} className="text-[#8FA9B3] text-sm cursor-pointer hover:text-[#a0b9c3] transition-colors">Add</label>
                            <Checkbox
                              id={item.id}
                              checked={selectedProvisions.includes(item.id)}
                              onCheckedChange={() => toggleProvision(item.id)}
                              className="data-[state=checked]:bg-[#8FA9B3] data-[state=checked]:border-[#8FA9B3]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Group 2: Experiences */}
              <div className="bg-card/40 backdrop-blur-sm border border-border p-8">
                <h4 className="text-xl text-[#8FA9B3] mb-3 tracking-widest">Experiences</h4>
                <p className="text-bone/50 text-sm italic mb-8">All experiences are arranged on your behalf. We'll confirm availability and details after your booking is received.</p>
                <div className="space-y-8">
                  {experiences.map((item) => (
                    <div key={item.id} className="pb-8 border-b border-border/30 last:border-0 last:pb-0">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex-1">
                          <h5 className="text-bone text-lg mb-2">{item.name}</h5>
                          <p className="text-bone/70 text-sm">{item.description}</p>
                          {item.note && <p className="text-bone/50 text-xs italic mt-2">{item.note}</p>}
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <label htmlFor={item.id} className="text-[#8FA9B3] text-sm cursor-pointer hover:text-[#a0b9c3] transition-colors whitespace-nowrap">Ask us to arrange</label>
                          <Checkbox
                            id={item.id}
                            checked={selectedExperiences.includes(item.id)}
                            onCheckedChange={() => toggleExperience(item.id)}
                            className="data-[state=checked]:bg-[#8FA9B3] data-[state=checked]:border-[#8FA9B3]"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Group 3: Celebration */}
              <div className="bg-card/40 backdrop-blur-sm border border-border p-8">
                <h4 className="text-xl text-[#8FA9B3] mb-8 tracking-widest">Celebration</h4>
                <div className="space-y-8">
                  {celebrations.map((item) => (
                    <div key={item.id} className="pb-8 border-b border-border/30 last:border-0 last:pb-0">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="flex-1">
                          <h5 className="text-bone text-lg mb-2">{item.name}</h5>
                          <p className="text-bone/70 text-sm">{item.description}</p>
                          {item.leadTime && <p className="text-bone/50 text-xs italic mt-2">{item.leadTime}</p>}
                        </div>
                        {item.isArranged ? (
                          <div className="flex items-center gap-3 shrink-0">
                            <label htmlFor={item.id} className="text-[#8FA9B3] text-sm cursor-pointer hover:text-[#a0b9c3] transition-colors whitespace-nowrap">Ask us to arrange</label>
                            <Checkbox
                              id={item.id}
                              checked={selectedCelebrations.includes(item.id)}
                              onCheckedChange={() => toggleCelebration(item.id)}
                              className="data-[state=checked]:bg-[#8FA9B3] data-[state=checked]:border-[#8FA9B3]"
                            />
                          </div>
                        ) : (
                          <div className="flex md:flex-col items-center md:items-end gap-3 md:gap-2 shrink-0">
                            <span className="text-bone text-lg">${item.price} AUD</span>
                            <div className="flex items-center gap-2">
                              <label htmlFor={item.id} className="text-[#8FA9B3] text-sm cursor-pointer hover:text-[#a0b9c3] transition-colors">Add</label>
                              <Checkbox
                                id={item.id}
                                checked={selectedCelebrations.includes(item.id)}
                                onCheckedChange={() => toggleCelebration(item.id)}
                                className="data-[state=checked]:bg-[#8FA9B3] data-[state=checked]:border-[#8FA9B3]"
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 3: Your Details */}
            <div className="bg-card/40 backdrop-blur-sm border border-border p-8 space-y-6">
              <h3 className="text-2xl text-bone heading-display mb-6">Your Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-bone/70 mb-2 block">Given name</Label>
                  <Input type="text" className="bg-input-background border-border text-bone" />
                </div>
                <div>
                  <Label className="text-bone/70 mb-2 block">Family name</Label>
                  <Input type="text" className="bg-input-background border-border text-bone" />
                </div>
                <div>
                  <Label className="text-bone/70 mb-2 block">Email</Label>
                  <Input type="email" className="bg-input-background border-border text-bone" />
                </div>
                <div>
                  <Label className="text-bone/70 mb-2 block">Phone</Label>
                  <Input type="tel" className="bg-input-background border-border text-bone" />
                </div>
              </div>
              <div>
                <Label className="text-bone/70 mb-2 block">Tell us anything we should know</Label>
                <textarea rows={4} className="w-full bg-input-background border border-border text-bone p-4 resize-none focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
            </div>
          </div>

          {/* Right Column: Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 bg-ink-black border border-muted-gold/30 p-8 space-y-6">
              <h4 className="text-2xl text-bone heading-display border-b border-muted-gold/30 pb-4">
                Reservation Summary
              </h4>

              {/* Priced items */}
              {(selectedProvisions.length > 0 || selectedCelebrations.some(id => celebrations.find(c => c.id === id)?.price)) && (
                <div className="space-y-3 pb-4 border-b border-border/30">
                  {selectedProvisions.map((id) => {
                    const item = provisions.find(p => p.id === id);
                    if (!item) return null;
                    return (
                      <div key={id} className="flex justify-between text-sm">
                        <span className="text-bone/60 flex-1 pr-4">{item.name}</span>
                        <span className="text-bone">${item.price}</span>
                      </div>
                    );
                  })}
                  {selectedCelebrations.map((id) => {
                    const item = celebrations.find(c => c.id === id);
                    if (!item?.price) return null;
                    return (
                      <div key={id} className="flex justify-between text-sm">
                        <span className="text-bone/60 flex-1 pr-4">{item.name}</span>
                        <span className="text-bone">${item.price}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* To be arranged */}
              {toBeArranged.length > 0 && (
                <div className="space-y-3 pb-4 border-b border-border/30">
                  <h5 className="text-[#8FA9B3] text-xs tracking-widest">TO BE ARRANGED</h5>
                  {toBeArranged.map((name, index) => (
                    <div key={index} className="text-bone/60 text-sm">{name}</div>
                  ))}
                </div>
              )}

              <div className="space-y-4 pt-4">
                <div className="flex justify-between text-xl text-bone">
                  <span className="heading-display">Total</span>
                  <span className="heading-display">${calculateTotal().toLocaleString()} AUD</span>
                </div>
                <p className="text-xs text-bone/50 italic">
                  All prices in Australian Dollars. Excludes accommodation. 50% deposit required to confirm.
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
