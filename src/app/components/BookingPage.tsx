import React, { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { NetBookingsWidget } from "./NetBookingsWidget";

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
  const [selectedProvisions, setSelectedProvisions] = useState<string[]>([]);
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>([]);
  const [selectedCelebrations, setSelectedCelebrations] = useState<string[]>(
    []
  );

  const provisions: ProvisionItem[] = [
    {
      id: "fruit-box",
      name: "Fruit Box",
      description:
        "Seasonal Tasmanian fruit, sourced locally where possible.",
      price: 35,
      leadTime: "Request at least 48 hours ahead.",
    },
    {
      id: "vegetable-box",
      name: "Vegetable Box",
      description:
        "Seasonal vegetables from a local East Coast grower.",
      price: 45,
      leadTime: "Request at least 48 hours ahead.",
    },
    {
      id: "charcuterie-box",
      name: "Charcuterie Box",
      description:
        "Cured meats, cheeses, and local preserves.",
      price: 185,
      leadTime: "Request at least 72 hours ahead.",
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
      id: "helicopter-transfer",
      name: "Helicopter Transfer from Hobart",
      description: "Arrive by air. A helicopter transfer from Hobart lands you at the property direct. No drive, no transition just coastline and arrival.",
    },
    {
      id: "hire-car",
      name: "Hire Car Delivery",
      description: "A hire car arranged and delivered to the property for your stay. Ideal if you're arriving by air or prefer not to organise a vehicle independently.",
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
      description: "A therapist comes to you. Remedial, relaxation, deep tissue, or pregnancy massage. Native Kunzea and sandalwood aromatherapy, face ritual, and foot treatment available as add-ons. Finished with the Huon pine bath on the deck if you choose.",
    },
    {
      id: "foraging",
      name: "Guided Foraging Session",
      description: "The property and surrounding headland, read with a local guide. What's edible, what's in season, where to look.",
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
      id: "beach-picnic",
      name: "Beach Picnic Setup",
      description: "Hamper assembled from local producers, set up on the beach before you arrive.",
      price: 120,
      leadTime: "Request at least 48 hours ahead.",
    },
  ];

  const packageOptions = [
    {
      id: "pkg-air-rest",
      name: "In the Air, Then at Rest",
      description: "Scenic helicopter flight, couples massage, Huon pine bath. 3 nights from $5,500.",
    },
    {
      id: "pkg-long-lunch",
      name: "The Long Lunch",
      description: "Guided wine trail, four cellar doors, lunch included, couples massage. 3 nights from $3,150.",
    },
    {
      id: "pkg-water",
      name: "From the Water",
      description: "Half day fishing charter, catch returned to the retreat with recipe, couples massage. 3 nights from $3,250.",
    },
    {
      id: "pkg-celebrate",
      name: "Celebrate Here",
      description: "Private photographer, beach picnic hamper, Huon pine bath. 3 nights from $3,550.",
    },
  ];

  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const toggle = (
    id: string,
    setFn: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setFn((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  const calculateTotal = () => {
    const pTotal = selectedProvisions.reduce((sum, id) => {
      return sum + (provisions.find((p) => p.id === id)?.price || 0);
    }, 0);

    const cTotal = selectedCelebrations.reduce((sum, id) => {
      return sum + (celebrations.find((c) => c.id === id)?.price || 0);
    }, 0);

    return pTotal + cTotal;
  };

  const toBeArranged = [
    ...(selectedPackage ? [packageOptions.find(p => p.id === selectedPackage)?.name] : []),
    ...selectedExperiences.map(
      (id) => experiences.find((e) => e.id === id)?.name
    ),
    ...selectedCelebrations
      .filter((id) =>
        celebrations.find((c) => c.id === id)?.isArranged
      )
      .map((id) => celebrations.find((c) => c.id === id)?.name),
  ].filter(Boolean) as string[];

  return (
    <div className="min-h-screen bg-primary-brand pt-32 pb-20">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
        {/* HEADER */}
        <div className="text-center mb-16">
          <h1 className="text-5xl text-bone heading-display mb-4">
            Book Your Stay
          </h1>
          <p className="text-bone/60 italic">
            Compose your perfect retreat.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-12">
            {/* NET BOOKINGS */}
            <div className="bg-card/40 border border-border p-8">
              <h3 className="text-xl text-bone mb-6">
                Your Dates
              </h3>

              {/* IMPORTANT: React-controlled widget mount */}
              <NetBookingsWidget />

              <p className="text-bone/50 text-sm italic mt-4">
                Two-night minimum. Seasonal pricing applies.
              </p>
            </div>

            {/* PACKAGES */}
            <div className="bg-card/40 border border-border p-8">
              <h3 className="text-xl text-bone mb-2">Packages</h3>
              <p className="text-bone/50 text-sm italic mb-6">Select a package and we'll be in touch to confirm details and arrange everything before your arrival.</p>
              <div className="space-y-6">
                {packageOptions.map((pkg) => (
                  <div key={pkg.id} className="flex justify-between items-start">
                    <div className="flex-1 pr-4">
                      <p className="text-bone">{pkg.name}</p>
                      <p className="text-bone/50 text-sm">{pkg.description}</p>
                    </div>
                    <Checkbox
                      checked={selectedPackage === pkg.id}
                      onCheckedChange={() =>
                        setSelectedPackage(selectedPackage === pkg.id ? null : pkg.id)
                      }
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* PROVISIONS */}
            <div className="bg-card/40 border border-border p-8">
              <h3 className="text-xl text-bone mb-6">
                Provisions
              </h3>

              <div className="space-y-6">
                {provisions.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div>
                      <p className="text-bone">{item.name}</p>
                      <p className="text-bone/50 text-sm">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-bone">
                        ${item.price}
                      </span>

                      <Checkbox
                        checked={selectedProvisions.includes(item.id)}
                        onCheckedChange={() =>
                          toggle(item.id, setSelectedProvisions)
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card/40 border border-border p-8">
              <h3 className="text-xl text-bone mb-2">Experiences</h3>
              <p className="text-bone/50 text-sm italic mb-6">Select anything you'd like more information on and we'll be in touch before your arrival.</p>

              <div className="space-y-6">
                {experiences.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div>
                      <p className="text-bone">{item.name}</p>
                      <p className="text-bone/50 text-sm">
                        {item.description}
                      </p>
                    </div>

                    <Checkbox
                      checked={selectedExperiences.includes(item.id)}
                      onCheckedChange={() =>
                        toggle(item.id, setSelectedExperiences)
                      }
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* CELEBRATIONS */}
            <div className="bg-card/40 border border-border p-8">
              <h3 className="text-xl text-bone mb-6">
                Celebrations
              </h3>

              <div className="space-y-6">
                {celebrations.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <div>
                      <p className="text-bone">{item.name}</p>
                      <p className="text-bone/50 text-sm">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      {item.price && (
                        <span className="text-bone">
                          ${item.price}
                        </span>
                      )}

                      <Checkbox
                        checked={selectedCelebrations.includes(
                          item.id
                        )}
                        onCheckedChange={() =>
                          toggle(item.id, setSelectedCelebrations)
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* DETAILS */}
            <div className="bg-card/40 border border-border p-8">
              <h3 className="text-xl text-bone mb-6">
                Your Details
              </h3>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <Input placeholder="First name" />
                <Input placeholder="Last name" />
                <Input placeholder="Email" />
                <Input placeholder="Phone" />
              </div>

              <div>
                <label className="text-bone/70 text-sm mb-2 block">Anything else we should know?</label>
                <textarea
                  rows={4}
                  placeholder="Dietary requirements, special occasions, access needs, or anything else..."
                  className="w-full bg-input-background border border-border text-bone p-4 resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                  style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.95rem', color: '#EDE9E3' }}
                />
              </div>
            </div>
            {/* GO DARK REMINDER */}
            <div
              className="p-8"
              style={{
                backgroundColor: '#0B0F0F',
                border: '1px solid rgba(143, 169, 179, 0.3)',
                borderRadius: '0.5rem',
              }}
            >
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.75rem',
                  color: '#8FA9B3',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: '0.75rem',
                  fontWeight: 600,
                }}
              >
                Winter Offer
              </p>
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '1.75rem',
                  color: '#EDE9E3',
                  marginBottom: '0.75rem',
                }}
              >
                Go Dark
              </h3>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.95rem',
                  color: '#B8AE9F',
                  lineHeight: '1.7',
                  marginBottom: '1rem',
                }}
              >
                3 nights midweek. June, July, August. $1,500 flat rate. Direct booking only.
              </p>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.875rem',
                  color: '#8FA9B3',
                  lineHeight: '1.6',
                  fontStyle: 'italic',
                }}
              >
                Enter <strong style={{ color: '#EDE9E3', fontStyle: 'normal' }}>GO DARK</strong> in the voucher field to claim.
              </p>
            </div>

          </div>

          {/* RIGHT */}
          <div className="sticky top-32 bg-ink-black border border-muted-gold/30 p-8">
            <h4 className="text-bone text-xl mb-4">
              Summary
            </h4>

            <p className="text-bone/60 text-sm mb-6">
              Total: ${calculateTotal()} AUD
            </p>

            {toBeArranged.length > 0 && (
              <div className="mb-6">
                <h5 className="text-xs text-muted-gold mb-2">
                  TO BE ARRANGED
                </h5>
                {toBeArranged.map((x, i) => (
                  <p key={i} className="text-bone/60 text-sm">
                    {x}
                  </p>
                ))}
              </div>
            )}

            <button className="w-full py-4 bg-muted-gold text-black">
              COMPLETE RESERVATION
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
