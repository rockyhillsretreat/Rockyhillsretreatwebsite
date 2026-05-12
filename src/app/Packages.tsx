import React, { useState } from 'react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

interface PackageItem {
  id: string;
  title: string;
  nights: number;
  description: string;
  price: number;
  inclusions: string[];
  image: string;
}

interface Experience {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
}

interface FoodItem {
  id: string;
  title: string;
  price: number;
  description: string;
  sourcing: string;
  image: string;
}

export default function Packages() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>([]);
  const [selectedFood, setSelectedFood] = useState<string[]>([]);
  const [mercedesTransfer, setMercedesTransfer] = useState<{ arrival: boolean; departure: boolean }>({
    arrival: false,
    departure: false,
  });
  const [heliTransfer, setHeliTransfer] = useState<{ arrival: boolean; departure: boolean }>({
    arrival: false,
    departure: false,
  });

  const packages: PackageItem[] = [
    {
      id: 'quiet-reset',
      title: '2-Night Quiet Reset',
      nights: 2,
      description: 'Two nights to slow down. A sunrise walk, a yoga session, simple meals, and a gentle rhythm.',
      price: 1850,
      inclusions: [
        '2 nights accommodation',
        'Late checkout (12pm)',
        'One private yoga session',
        'Sunrise hike',
        'Breakfast basket each morning',
        'Fireside dinner kit (1 night)',
        'Mercedes transfer (arrival)',
      ],
      image: 'https://rockyhillsretreat.com.au/wp-content/uploads/2023/09/RockyHillsRetreat_MelanieKate-1.jpg',
    },
    {
      id: 'coastal-immersion',
      title: '3-Night Coastal Immersion',
      nights: 3,
      description: 'Three nights shaped by coastline, morning yoga, starlight, wine, and a photography moment.',
      price: 3250,
      inclusions: [
        '3 nights accommodation',
        'Yoga each morning',
        'Guided stargazing',
        'Coastal picnic',
        'Photography session',
        'In-house wine tasting',
        'Breakfast basket each morning',
        'Mercedes transfers both ways',
      ],
      image: 'https://rockyhillsretreat.com.au/wp-content/uploads/2023/09/RockyHillsRetreat_MelanieKate-47.jpg',
    },
    {
      id: 'heli-chef',
      title: '4-Night Heli + Chef Experience',
      nights: 4,
      description: 'Four nights of depth, landscape, craft, and ease. A heli tour, private chef, yoga, starlight, and coastal moments.',
      price: 6750,
      inclusions: [
        '4 nights accommodation',
        'Scenic heli tour',
        "Chef's local produce experience",
        'Yoga each morning',
        'Guided stargazing',
        'Sunrise hike',
        'Photography session',
        'Coastal picnic',
        'Breakfast basket each morning',
        'Fireside dinner kits (2 nights)',
        'Mercedes arrival transfer',
        'Helicopter departure transfer',
      ],
      image: 'https://rockyhillsretreat.com.au/wp-content/uploads/2023/09/RockyHillsRetreat_MelanieKate-18.jpg',
    },
  ];

  const experiences: Experience[] = [
    {
      id: 'yoga',
      title: 'Private Morning Yoga',
      description: 'Tailored, slow practice in the art studio.',
      price: 100,
      image: 'https://rockyhillsretreat.com.au/wp-content/uploads/2023/09/RockyHillsRetreat_MelanieKate-8.jpg',
    },
    {
      id: 'photography',
      title: 'Photography Session',
      description: 'A guided session capturing you and the landscape.',
      price: 380,
      image: 'https://rockyhillsretreat.com.au/wp-content/uploads/2023/09/RockyHillsRetreat_MelanieKate-20.jpg',
    },
    {
      id: 'stargazing',
      title: 'Guided Stargazing',
      description: 'An astronomer-led night under the Tasmanian sky.',
      price: 250,
      image: 'https://rockyhillsretreat.com.au/wp-content/uploads/2023/09/RockyHillsRetreat_MelanieKate-79.jpg',
    },
    {
      id: 'chef',
      title: "Chef's Local Produce Experience",
      description: 'Cook beside a private chef using east-coast ingredients.',
      price: 500,
      image: 'https://rockyhillsretreat.com.au/wp-content/uploads/2023/09/RockyHillsRetreat_MelanieKate-14.jpg',
    },
    {
      id: 'hike',
      title: 'Sunrise Hike',
      description: 'A slow guided walk at first light.',
      price: 100,
      image: 'https://rockyhillsretreat.com.au/wp-content/uploads/2023/09/RockyHillsRetreat_MelanieKate-47.jpg',
    },
    {
      id: 'wine',
      title: 'In-House Wine Tasting',
      description: 'A curated tasting of Tasmanian wines with small snacks.',
      price: 250,
      image: 'https://rockyhillsretreat.com.au/wp-content/uploads/2023/09/RockyHillsRetreat_MelanieKate-14.jpg',
    },
    {
      id: 'heli-tour',
      title: 'Heli Scenic Tour',
      description: 'A private flight over Freycinet, Maria Island, and the coastline.',
      price: 1800,
      image: 'https://rockyhillsretreat.com.au/wp-content/uploads/2023/09/RockyHillsRetreat_MelanieKate-17.jpg',
    },
  ];

  const foodItems: FoodItem[] = [
    {
      id: 'breakfast',
      title: 'Breakfast Basket',
      price: 45,
      description: 'Includes eggs, sourdough, cultured butter, berries, yoghurt, granola.',
      sourcing: 'Local farm eggs (Swansea), freshly baked sourdough (Little Sea Bakery), berries from nearby growers.',
      image: 'https://rockyhillsretreat.com.au/wp-content/uploads/2023/09/RockyHillsRetreat_MelanieKate-14.jpg',
    },
    {
      id: 'dinner',
      title: 'Fireside Dinner Kit',
      price: 75,
      description: 'Choice of steak or salmon, vegetables, potatoes, infused butter, and a simple dessert.',
      sourcing: 'East-coast butcher, seasonal growers, Tasmanian dairy producers.',
      image: 'https://rockyhillsretreat.com.au/wp-content/uploads/2023/09/RockyHillsRetreat_MelanieKate-14.jpg',
    },
    {
      id: 'platter',
      title: 'Afternoon Platter',
      price: 50,
      description: 'Cheeses, crackers, fruit, olives, nuts.',
      sourcing: 'Pyengana and Bruny Island cheeses, olives and fruit from local farms.',
      image: 'https://rockyhillsretreat.com.au/wp-content/uploads/2023/09/RockyHillsRetreat_MelanieKate-14.jpg',
    },
    {
      id: 'picnic',
      title: 'Coastal Picnic Basket',
      price: 60,
      description: 'Filled rolls, fruit, baked goods, drinks.',
      sourcing: 'Local baker, fruit growers, and small producers.',
      image: 'https://rockyhillsretreat.com.au/wp-content/uploads/2023/09/RockyHillsRetreat_MelanieKate-47.jpg',
    },
  ];

  const pantryEssentials = [
    'Ground coffee + plunger',
    'Tea selection',
    'Olive oil, salt, pepper, spices',
    'Milk (full + oat)',
    'Granola + yoghurt',
    'Local honey',
    'Chocolate',
    'Sparkling water',
    'Basic condiments',
  ];

  const toggleExperience = (id: string) => {
    setSelectedExperiences((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleFood = (id: string) => {
    setSelectedFood((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const calculateTotal = () => {
    let total = 0;

    // Package price
    if (selectedPackage) {
      const pkg = packages.find((p) => p.id === selectedPackage);
      if (pkg) total += pkg.price;
    }

    // Experiences
    selectedExperiences.forEach((expId) => {
      const exp = experiences.find((e) => e.id === expId);
      if (exp) total += exp.price;
    });

    // Food
    selectedFood.forEach((foodId) => {
      const food = foodItems.find((f) => f.id === foodId);
      if (food) total += food.price;
    });

    // Transfers
    if (mercedesTransfer.arrival) total += 375;
    if (mercedesTransfer.departure) total += 375;
    if (heliTransfer.arrival) total += 1250;
    if (heliTransfer.departure) total += 1250;

    return total;
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F4EFE8' }}>
      {/* SECTION A - HERO */}
      <section className="w-full">
        <div className="w-full h-[60vh] overflow-hidden">
          <ImageWithFallback
            src="https://rockyhillsretreat.com.au/wp-content/uploads/2023/09/RockyHillsRetreat_MelanieKate-1.jpg"
            alt="Rocky Hills Retreat"
            className="w-full h-full object-cover"
            style={{ borderRadius: '0' }}
          />
        </div>
        <div className="py-20 text-center" style={{ backgroundColor: '#F4EFE8' }}>
          <h1
            className="mb-4"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: '#4B4946',
              fontSize: '3.5rem',
              lineHeight: '1.2',
            }}
          >
            Retreat Packages
          </h1>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              color: '#4B4946',
              fontSize: '1.125rem',
              lineHeight: '1.6',
            }}
          >
            Quiet luxury, curated experiences, and local Tasmanian produce.
          </p>
        </div>
      </section>

      {/* SECTION B - INTRO */}
      <section className="py-20" style={{ backgroundColor: '#F4EFE8' }}>
        <div className="max-w-[760px] mx-auto px-6 text-center">
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              color: '#4B4946',
              fontSize: '1.25rem',
              lineHeight: '1.8',
            }}
          >
            A retreat is a pause.
            <br />
            A place to slow your breathing.
            <br />
            These packages help you shape the stay you want — stillness, immersion, or something in between.
          </p>
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <div className="flex flex-col lg:flex-row max-w-[1440px] mx-auto px-6 gap-8 pb-20">
        {/* Left Column - Main Content */}
        <div className="flex-1">
          {/* SECTION C - FEATURED PACKAGES */}
          <section className="py-20" style={{ backgroundColor: '#E7E4DF', borderRadius: '6px' }}>
            <div className="px-6 lg:px-12">
              <div className="space-y-[100px]">
                {packages.map((pkg) => (
                  <div key={pkg.id} className="space-y-6">
                    <div className="overflow-hidden" style={{ borderRadius: '6px' }}>
                      <ImageWithFallback
                        src={pkg.image}
                        alt={pkg.title}
                        className="w-full h-[400px] object-cover"
                      />
                    </div>
                    <div className="space-y-4">
                      <h2
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          color: '#4B4946',
                          fontSize: '2rem',
                          lineHeight: '1.3',
                        }}
                      >
                        {pkg.title} — ${pkg.price.toLocaleString()}
                      </h2>
                      <p
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          color: '#4B4946',
                          fontSize: '1.125rem',
                          lineHeight: '1.7',
                        }}
                      >
                        {pkg.description}
                      </p>
                      <div className="space-y-2 pt-4">
                        {pkg.inclusions.map((inclusion, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-3"
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              color: '#65615C',
                              fontSize: '0.95rem',
                              lineHeight: '1.6',
                            }}
                          >
                            <span>•</span>
                            <span>{inclusion}</span>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => setSelectedPackage(pkg.id)}
                        className="mt-6 px-8 py-3 transition-all"
                        style={{
                          backgroundColor: selectedPackage === pkg.id ? '#B89A73' : '#C4A888',
                          color: '#4B4946',
                          borderRadius: '7px',
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '1rem',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                        }}
                      >
                        {selectedPackage === pkg.id ? 'Selected' : 'View Package'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Placeholder sections - will complete in next todos */}
          <div className="mt-20" id="experiences-section"></div>
          {/* SECTION D - ADD EXPERIENCES */}
          <section className="py-20" style={{ backgroundColor: '#F4EFE8', borderRadius: '6px' }}>
            <div className="px-6 lg:px-12">
              <h2
                className="mb-12 text-center"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: '#4B4946',
                  fontSize: '2.25rem',
                  lineHeight: '1.3',
                }}
              >
                Add Experiences
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                {experiences.map((exp) => (
                  <div
                    key={exp.id}
                    className="space-y-4 cursor-pointer transition-all"
                    onClick={() => toggleExperience(exp.id)}
                    style={{
                      opacity: selectedExperiences.includes(exp.id) ? 1 : 0.8,
                    }}
                  >
                    <div className="overflow-hidden" style={{ borderRadius: '6px' }}>
                      <ImageWithFallback
                        src={exp.image}
                        alt={exp.title}
                        className="w-full h-[280px] object-cover transition-transform hover:scale-105"
                      />
                    </div>
                    <div className="space-y-2">
                      <h3
                        style={{
                          fontFamily: "'Playfair Display', serif",
                          color: '#4B4946',
                          fontSize: '1.25rem',
                        }}
                      >
                        {exp.title}
                      </h3>
                      <p
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          color: '#65615C',
                          fontSize: '0.95rem',
                          lineHeight: '1.6',
                        }}
                      >
                        {exp.description}
                      </p>
                      <div className="flex items-center justify-between pt-2">
                        <span
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            color: '#4B4946',
                            fontSize: '1.125rem',
                          }}
                        >
                          ${exp.price}
                        </span>
                        <button
                          className="px-5 py-2 transition-all"
                          style={{
                            backgroundColor: selectedExperiences.includes(exp.id) ? '#B89A73' : '#C4A888',
                            color: '#4B4946',
                            borderRadius: '6px',
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '0.875rem',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                          }}
                        >
                          {selectedExperiences.includes(exp.id) ? 'Added' : 'Add to Stay'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Transfers Section */}
              <div className="mt-16 pt-16" style={{ borderTop: '1px solid #C4A888' }}>
                <h3
                  className="mb-8"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    color: '#4B4946',
                    fontSize: '1.75rem',
                  }}
                >
                  Transfers
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Mercedes Transfer */}
                  <div className="p-6" style={{ backgroundColor: '#E7E4DF', borderRadius: '6px' }}>
                    <h4
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        color: '#4B4946',
                        fontSize: '1.25rem',
                        marginBottom: '0.5rem',
                      }}
                    >
                      Mercedes Transfer
                    </h4>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        color: '#4B4946',
                        fontSize: '1.125rem',
                        marginBottom: '1rem',
                      }}
                    >
                      $375 each way
                    </p>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={mercedesTransfer.arrival}
                          onChange={(e) =>
                            setMercedesTransfer({ ...mercedesTransfer, arrival: e.target.checked })
                          }
                          className="w-5 h-5"
                          style={{ accentColor: '#C4A888' }}
                        />
                        <span style={{ fontFamily: "'Inter', sans-serif", color: '#65615C' }}>
                          Arrival
                        </span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={mercedesTransfer.departure}
                          onChange={(e) =>
                            setMercedesTransfer({ ...mercedesTransfer, departure: e.target.checked })
                          }
                          className="w-5 h-5"
                          style={{ accentColor: '#C4A888' }}
                        />
                        <span style={{ fontFamily: "'Inter', sans-serif", color: '#65615C' }}>
                          Departure
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Helicopter Transfer */}
                  <div className="p-6" style={{ backgroundColor: '#E7E4DF', borderRadius: '6px' }}>
                    <h4
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        color: '#4B4946',
                        fontSize: '1.25rem',
                        marginBottom: '0.5rem',
                      }}
                    >
                      Helicopter Transfer
                    </h4>
                    <p
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        color: '#4B4946',
                        fontSize: '1.125rem',
                        marginBottom: '1rem',
                      }}
                    >
                      $1,250 each way
                    </p>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={heliTransfer.arrival}
                          onChange={(e) =>
                            setHeliTransfer({ ...heliTransfer, arrival: e.target.checked })
                          }
                          className="w-5 h-5"
                          style={{ accentColor: '#C4A888' }}
                        />
                        <span style={{ fontFamily: "'Inter', sans-serif", color: '#65615C' }}>
                          Arrival
                        </span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={heliTransfer.departure}
                          onChange={(e) =>
                            setHeliTransfer({ ...heliTransfer, departure: e.target.checked })
                          }
                          className="w-5 h-5"
                          style={{ accentColor: '#C4A888' }}
                        />
                        <span style={{ fontFamily: "'Inter', sans-serif", color: '#65615C' }}>
                          Departure
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="mt-20" id="food-section"></div>
          {/* SECTION E - FOOD & PROVIDORE */}
          <section className="py-20" style={{ backgroundColor: '#F4EFE8', borderRadius: '6px' }}>
            <div className="px-6 lg:px-12">
              <h2
                className="mb-6 text-center"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: '#4B4946',
                  fontSize: '2.25rem',
                  lineHeight: '1.3',
                }}
              >
                Food Options
              </h2>
              <p
                className="max-w-[700px] mx-auto text-center mb-16"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: '#65615C',
                  fontSize: '1rem',
                  lineHeight: '1.8',
                }}
              >
                We partner with east-coast Tasmanian growers, bakers, butchers, and makers.
                <br />
                Your pantry includes coffee, teas, oils, spices, granola, yoghurt, milk, honey, chocolate, and sparkling water.
                <br />
                Add fresh local produce for simple, beautiful meals.
              </p>

              <div className="space-y-8">
                {foodItems.map((food) => (
                  <div
                    key={food.id}
                    className="flex flex-col md:flex-row gap-6 p-6 cursor-pointer transition-all"
                    style={{
                      backgroundColor: selectedFood.includes(food.id) ? '#E7E4DF' : '#FFFFFF',
                      borderRadius: '6px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    }}
                    onClick={() => toggleFood(food.id)}
                  >
                    <div className="md:w-[200px] flex-shrink-0">
                      <ImageWithFallback
                        src={food.image}
                        alt={food.title}
                        className="w-full h-[150px] object-cover"
                        style={{ borderRadius: '6px' }}
                      />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <h3
                          style={{
                            fontFamily: "'Playfair Display', serif",
                            color: '#4B4946',
                            fontSize: '1.5rem',
                          }}
                        >
                          {food.title} — ${food.price}
                        </h3>
                        <button
                          className="px-5 py-2 flex-shrink-0"
                          style={{
                            backgroundColor: selectedFood.includes(food.id) ? '#B89A73' : '#C4A888',
                            color: '#4B4946',
                            borderRadius: '6px',
                            fontFamily: "'Inter', sans-serif",
                            fontSize: '0.875rem',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                          }}
                        >
                          {selectedFood.includes(food.id) ? 'Added' : 'Add'}
                        </button>
                      </div>
                      <p
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          color: '#65615C',
                          fontSize: '1rem',
                          lineHeight: '1.6',
                        }}
                      >
                        {food.description}
                        <br />
                        <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>Sourcing: {food.sourcing}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Pantry Essentials List */}
          <section className="py-20" style={{ backgroundColor: '#F4EFE8' }}>
            <div className="px-6 lg:px-12 max-w-[800px] mx-auto text-center">
              <h3
                className="mb-8"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  color: '#4B4946',
                  fontSize: '1.5rem',
                }}
              >
                Included in Your Pantry
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                {pantryEssentials.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2"
                    style={{
                      backgroundColor: '#E7E4DF',
                      borderRadius: '4px',
                      fontFamily: "'Inter', sans-serif",
                      color: '#4B4946',
                      fontSize: '0.95rem',
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Right Column - Summary Sidebar */}
        <div className="lg:w-[320px] lg:flex-shrink-0">
          <div
            className="sticky top-8 p-8"
            style={{
              backgroundColor: '#4B4946',
              color: '#F4EFE8',
              borderRadius: '6px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}
          >
            <h3
              className="mb-6 pb-4"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.75rem',
                borderBottom: '1px solid rgba(244, 239, 232, 0.2)',
              }}
            >
              Your Stay
            </h3>

            <div className="space-y-6">
              {/* Selected Package */}
              <div>
                <span
                  className="block text-sm uppercase tracking-wider mb-2"
                  style={{ opacity: 0.7, fontFamily: "'Inter', sans-serif" }}
                >
                  Package
                </span>
                {selectedPackage ? (
                  <div className="flex justify-between items-start">
                    <span style={{ fontFamily: "'Inter', sans-serif" }}>
                      {packages.find((p) => p.id === selectedPackage)?.title}
                    </span>
                    <span style={{ fontFamily: "'Inter', sans-serif" }}>
                      ${packages.find((p) => p.id === selectedPackage)?.price.toLocaleString()}
                    </span>
                  </div>
                ) : (
                  <span style={{ fontFamily: "'Inter', sans-serif", opacity: 0.5, fontStyle: 'italic' }}>
                    None selected
                  </span>
                )}
              </div>

              {/* Selected Experiences */}
              {(selectedExperiences.length > 0 ||
                mercedesTransfer.arrival ||
                mercedesTransfer.departure ||
                heliTransfer.arrival ||
                heliTransfer.departure) && (
                <div>
                  <span
                    className="block text-sm uppercase tracking-wider mb-2"
                    style={{ opacity: 0.7, fontFamily: "'Inter', sans-serif" }}
                  >
                    Experiences
                  </span>
                  <div className="space-y-2 text-sm">
                    {selectedExperiences.map((id) => {
                      const exp = experiences.find((e) => e.id === id);
                      return (
                        <div key={id} className="flex justify-between">
                          <span>{exp?.title}</span>
                          <span>${exp?.price}</span>
                        </div>
                      );
                    })}
                    {mercedesTransfer.arrival && (
                      <div className="flex justify-between">
                        <span>Mercedes (Arr)</span>
                        <span>$375</span>
                      </div>
                    )}
                    {mercedesTransfer.departure && (
                      <div className="flex justify-between">
                        <span>Mercedes (Dep)</span>
                        <span>$375</span>
                      </div>
                    )}
                    {heliTransfer.arrival && (
                      <div className="flex justify-between">
                        <span>Heli (Arr)</span>
                        <span>$1,250</span>
                      </div>
                    )}
                    {heliTransfer.departure && (
                      <div className="flex justify-between">
                        <span>Heli (Dep)</span>
                        <span>$1,250</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Selected Food */}
              {selectedFood.length > 0 && (
                <div>
                  <span
                    className="block text-sm uppercase tracking-wider mb-2"
                    style={{ opacity: 0.7, fontFamily: "'Inter', sans-serif" }}
                  >
                    Food
                  </span>
                  <div className="space-y-2 text-sm">
                    {selectedFood.map((id) => {
                      const food = foodItems.find((f) => f.id === id);
                      return (
                        <div key={id} className="flex justify-between">
                          <span>{food?.title}</span>
                          <span>${food?.price}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Total */}
              <div
                className="pt-6 mt-6 flex justify-between items-end"
                style={{ borderTop: '1px solid rgba(244, 239, 232, 0.2)' }}
              >
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem' }}>Total</span>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem' }}>
                  ${calculateTotal().toLocaleString()}
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', opacity: 0.6, fontStyle: 'italic' }}>
                Does not include accommodation unless package selected.
              </p>

              <button
                className="w-full py-3 mt-4 transition-all hover:bg-[#F4EFE8] hover:text-[#4B4946]"
                style={{
                  backgroundColor: '#C4A888',
                  color: '#4B4946',
                  borderRadius: '6px',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  fontSize: '1rem',
                }}
              >
                Request Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
