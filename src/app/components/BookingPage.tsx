import React, { useEffect, useState } from "react";
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
  const [selectedProvisions, setSelectedProvisions] = useState<string[]>([]);
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>([]);
  const [selectedCelebrations, setSelectedCelebrations] = useState<string[]>([]);

  useEffect(() => {
    // prevent double loading
    if (document.getElementById("netbookings-script")) return;

    const script = document.createElement("script");
    script.id = "netbookings-script";
    script.src =
      "https://secure.netbookings.com.au/widgets/accom/dist/index.js";
    script.defer = true;

    script.onload = () => {
      // optional re-init if widget needs it
      console.log("NetBookings script loaded");
    };

    document.body.appendChild(script);
  }, []);

  const provisions: ProvisionItem[] = [
    {
      id: "fruit-box",
      name: "Fruit Box",
      description:
        "Seasonal Tasmanian fruit, sourced locally where possible.",
      price: 35,
      leadTime: "Request at least 48 hours ahead.",
    },
  ];

  const experiences: ExperienceItem[] = [
    {
      id: "sea-kayaking",
      name: "Sea Kayaking",
      description:
        "Guided sea kayaking along the Freycinet Peninsula coastline.",
    },
  ];

  const celebrations: CelebrationItem[] = [
    {
      id: "photographer",
      name: "Private Photographer",
      description:
        "A half day session on the property and surrounding headland.",
      isArranged: true,
    },
  ];

  const toggle = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    id: string
  ) => {
    setter((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const calculateTotal = () => {
    return selectedProvisions.reduce((sum, id) => {
      const item = provisions.find((p) => p.id === id);
      return sum + (item?.price || 0);
    }, 0);
  };

  return (
    <div className="min-h-screen bg-primary-brand pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl text-bone mb-10">Book Your Stay</h1>

        {/* NetBookings widget mount point */}
        <div className="bg-card/40 p-6 border border-border">
          <div
            id="nbaccom"
            data-server="https://secure.netbookings.com.au"
            data-db="tourism"
            data-business="1451"
            data-ga4=""
            data-currency_code="AUD"
          />
        </div>

        {/* Provisions */}
        <div className="mt-10 space-y-6">
          {provisions.map((item) => (
            <div key={item.id} className="flex justify-between">
              <div>
                <Label>{item.name}</Label>
                <p className="text-sm text-white/60">{item.description}</p>
              </div>
              <Checkbox
                checked={selectedProvisions.includes(item.id)}
                onCheckedChange={() => toggle(setSelectedProvisions, item.id)}
              />
            </div>
          ))}
        </div>

        <div className="mt-10 text-bone">
          Total: ${calculateTotal()} AUD
        </div>

        <button className="mt-6 bg-muted-gold px-6 py-3">
          COMPLETE RESERVATION
        </button>
      </div>
    </div>
  );
}
