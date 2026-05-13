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
      description:
        "Guided kayaking along the Freycinet coastline.",
    },
    {
      id: "fishing-charter",
      name: "Fishing Charter",
      description:
        "Half day fishing with a local skipper.",
    },
  ];

  const celebrations: CelebrationItem[] = [
    {
      id: "photographer",
      name: "Private Photographer",
      description:
        "Half-day session for special occasions.",
      isArranged: true,
    },
    {
      id: "beach-picnic",
      name: "Beach Picnic Setup",
      description:
        "Curated picnic set up before your arrival.",
      price: 120,
      leadTime: "Request at least 48 hours ahead.",
    },
  ];

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

            {/* EXPERIENCES */}
            <div className="bg-card/40 border border-border p-8">
              <h3 className="text-xl text-bone mb-6">
                Experiences
              </h3>

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

              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="First name" />
                <Input placeholder="Last name" />
                <Input placeholder="Email" />
                <Input placeholder="Phone" />
              </div>
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
