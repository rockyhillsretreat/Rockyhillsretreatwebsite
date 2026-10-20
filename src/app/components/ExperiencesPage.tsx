import { Fragment } from "react";
import { Link } from "react-router-dom";
import { img, P, C, V } from "../media";
import { VideoLoop } from "./VideoLoop";

const serif = "'Playfair Display', serif";
const sans = "'Inter', sans-serif";
const slug = (t: string) => t.toLowerCase().replace(/\s+/g, "-");

// Signature experiences: add-ons to any stay. No prices shown: enquire.
const signature = [
  {
    id: "beach-picnic",
    title: "The Beach Picnic",
    kicker: "Add to any stay · Enquire for pricing",
    image: img(C.freycinetAerialBeach, 1400),
    description:
      "We pack a hamper from the producers we buy from all year, add a rug and a map with a cove marked on it, and leave it in the kitchen for the morning you want it. Swim, eat, fall asleep in the sun, drive back for the bath.",
    inclusions: [
      "Beach picnic hamper for two, Tasmanian producers only",
      "Our short list of quiet beaches within half an hour",
      "Huon pine bath prepared on the deck for your return",
    ],
  },
  {
    id: "from-the-water",
    title: "From the Water",
    kicker: "Add to any stay · Enquire for pricing",
    image: img(C.bichenoBoats, 1400),
    description:
      "Half a day on Great Oyster Bay and Schouten Passage with a local skipper. Flathead, squid, maybe a seal on the rocks. Your catch comes back to the retreat with a recipe written for this kitchen.",
    inclusions: [
      "Half day fishing charter on Great Oyster Bay",
      "Catch prepared and returned to the retreat with a recipe",
      "Couples massage at the property, remedial or relaxation",
    ],
  },
  {
    id: "in-the-air",
    title: "In the Air, Then at Rest",
    kicker: "Add to any stay · Enquire for pricing",
    image: img(C.wineglassAerial, 1400),
    description:
      "Wineglass Bay, the Hazards and Schouten Island from a helicopter. Then a therapist comes to the retreat and the rest of the day is yours.",
    inclusions: [
      "Scenic helicopter flight over Great Oyster Bay, the Hazards and Wineglass Bay",
      "Couples massage on the deck, with native Kunzea aromatherapy as an add-on",
      "Huon pine bath prepared on the deck",
    ],
    note: "Arriving by air? A helicopter transfer from Hobart can land you at the property, with a hire car delivered if you want one.",
  },
  {
    id: "the-long-lunch",
    title: "The Long Lunch",
    kicker: "Add to any stay · Enquire for pricing",
    image: img(P.dinnerNight, 1400),
    description:
      "Four East Coast cellar doors and lunch in the vines. You are picked up from the property and dropped back before dark.",
    inclusions: [
      "Guided wine trail for two, four cellar doors, lunch included",
      "Pickup and return from the property",
      "Couples massage at the property",
    ],
    note: "The wine trail is off-property. We don't stock alcohol at the retreat. You are welcome to bring your own.",
  },
  {
    id: "celebrate-here",
    title: "Celebrate Here",
    kicker: "Add to any stay · Enquire for pricing",
    image: img(P.bathExterior, 1400),
    description:
      "A proposal, an anniversary, a reason you made up. Tell us what you have in mind and we will have it ready when you arrive.",
    inclusions: [
      "Private photographer for half a day, on the property or the coast",
      "Beach picnic hamper from local producers",
      "Huon pine bath prepared on the deck",
    ],
  },
];

// Summer days out, grouped
const days: { heading: string; intro: string; items: { title: string; text: string; cta: string; image: string; tall?: boolean }[] }[] = [
  {
    heading: "Beach days",
    intro: "The East Coast has some of the clearest water in the country. It is cold. You will go in anyway.",
    items: [
      {
        title: "Wineglass Bay",
        text: "The walk over the saddle from the Freycinet car park, about an hour return to the lookout, longer if you go down to the sand. Go early, before the day trippers.",
        cta: "We'll send you the best time to go.",
        image: img(C.wineglassBeach, 900),
      },
      {
        title: "Quiet coves near the retreat",
        text: "Swansea has a run of small beaches where you can have the water to yourself on a weekday. We will mark our favourites on your map.",
        cta: "Ask us for the map.",
        image: img(C.lighthouseSunset, 900),
      },
      {
        title: "Beach picnic hamper",
        text: "Cheese, smoked fish, bread, fruit, something sweet. All from Tasmanian producers. Packed, ready, and in the fridge the morning you want it.",
        cta: "Add at booking. From $145.",
        image: img(C.bayOfFiresLichenRocks, 900),
      },
    ],
  },
  {
    heading: "On the water",
    intro: "Great Oyster Bay is in front of the deck. For a day's fishing, see From the Water above.",
    items: [
      {
        title: "Wineglass Bay cruise",
        text: "Around the Freycinet Peninsula to the other side of Wineglass Bay. Dolphins are often seen, seals on the rocks, sea eagles overhead.",
        cta: "We'll book it for you.",
        image: img(C.wineglassView, 900),
      },
      {
        title: "Sea kayaking, Freycinet",
        text: "Guided paddles under the Hazards with an award-winning local operator. Calm summer mornings are the time.",
        cta: "We'll book it for you.",
        image: img(C.freycinetBay, 900),
      },
    ],
  },
  {
    heading: "Islands and wildlife",
    intro: "Some of the best of it is a short drive or a boat ride away. Some of it comes to you.",
    items: [
      {
        title: "Maria Island",
        text: "A ferry from Triabunna, no cars on the island, wombats grazing by the paths and the Painted Cliffs at low tide. Tasmanian devils live here too.",
        cta: "Take a day. We'll give you the ferry times.",
        image: img(C.paintedCliffs, 900),
      },
      {
        title: "Wildlife at dusk",
        text: "Wallabies come out of the bush as the light drops. Echidnas are busy in the warm weather. Quolls and possums after dark. You don't have to go anywhere.",
        cta: "Sit on the deck. Bring the binoculars.",
        image: img(C.wallabyForest, 900),
      },
      {
        title: "Douglas-Apsley National Park",
        text: "Gorges, dry forest and the Apsley Waterhole, a swimming hole you can reach on a short walk. Good for a hot day.",
        cta: "We'll give you everything you need before you go.",
        image: img(C.pademelonGrass, 900),
      },
    ],
  },
  {
    heading: "At the retreat",
    intro: "Not every day needs a plan.",
    items: [
      {
        title: "Massage on the deck",
        text: "A therapist comes to you. Remedial, relaxation or deep tissue, with Kunzea and sandalwood aromatherapy if you want it. The bath is waiting when you're done.",
        cta: "Ask us to arrange.",
        image: img(P.yogaDeck, 900),
      },
      {
        title: "Self-guided stargazing",
        text: "No light pollution. Binoculars in the retreat, a guide sent to your phone, and a clearing past the shed where the house lights disappear. Keep an eye to the south.",
        cta: "Included with every stay.",
        image: img(P.duskTree, 900),
      },
      {
        title: "Cellar doors and the farm gate",
        text: "Devil's Corner and Milton are close. Freycinet Marine Farm sells oysters by the water. Kate's Berry Farm in Swansea is at its best in summer.",
        cta: "We'll suggest an order and where to have lunch.",
        image: img(C.sunsetClouds, 900),
      },
    ],
  },
];

export function ExperiencesPage() {
  return (
    <div style={{ backgroundColor: "#26333A", minHeight: "100vh" }}>
      {/* Hero: video */}
      <section className="relative w-full overflow-hidden" style={{ height: "78vh", minHeight: "480px" }}>
        <VideoLoop videoId={V.beachWaves} fallbackImage={img(C.beachWaves, 1920)} className="absolute inset-0 w-full h-full" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(38,51,58,0.1) 30%, rgba(38,51,58,0.75) 100%)" }} />
        <div className="relative h-full flex items-end justify-center px-6 pb-20">
          <div className="max-w-4xl text-center">
            <h1 style={{ fontFamily: serif, fontSize: "clamp(2.5rem, 6vw, 4.25rem)", color: "#F4EFE8", letterSpacing: "-0.01em", lineHeight: "1.05" }}>
              Experiences
            </h1>
            <p style={{ fontFamily: sans, fontSize: "1.2rem", color: "#F4EFE8", marginTop: "1.25rem" }}>
              Salt in your hair by lunch. Back on the deck by sunset.
            </p>
          </div>
        </div>
      </section>

      {/* Jump links */}
      <nav className="px-6 py-6" style={{ borderBottom: "1px solid rgba(143,169,179,0.2)" }} aria-label="On this page">
        <div className="max-w-[1400px] mx-auto flex flex-wrap gap-x-8 gap-y-3 justify-center" style={{ fontFamily: sans, fontSize: "0.9rem" }}>
          {[{ id: "signature", label: "Signature Experiences" }, ...days.map((d) => ({ id: slug(d.heading), label: d.heading })), { id: "add-ons", label: "Add-ons" }].map((l, i) => (
            <button
              key={l.id}
              type="button"
              onClick={() => document.getElementById(l.id)?.scrollIntoView({ behavior: "smooth" })}
              style={{ color: i === 0 ? "#8FA9B3" : "#B8AE9F", background: "none", border: 0, cursor: "pointer", fontFamily: sans, fontSize: "0.9rem" }}
            >
              {l.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Signature Experiences */}
      <section id="signature" className="py-24 px-6 scroll-mt-24">
        <div className="max-w-[1300px] mx-auto">
          <div className="mb-16 max-w-[760px]">
            <h2 style={{ fontFamily: serif, fontSize: "clamp(2rem, 4vw, 2.75rem)", color: "#EDE9E3" }}>Signature Experiences</h2>
            <p className="mt-4" style={{ fontFamily: sans, fontSize: "1.05rem", color: "#B8AE9F", lineHeight: "1.8" }}>
              Add one to any stay. We book it, we time it, and we have the bath ready when you get back.
            </p>
          </div>
          <div className="space-y-20">
            {signature.map((s, i) => (
              <article key={s.id} id={s.id} className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center scroll-mt-24">
                <div className={`overflow-hidden ${i % 2 ? "md:order-2" : ""}`} style={{ borderRadius: "0.5rem" }}>
                  <img src={s.image} alt={s.title} loading="lazy" className="w-full h-[360px] md:h-[460px] object-cover" />
                </div>
                <div>
                  <p style={{ fontFamily: sans, fontSize: "0.8rem", color: "#8FA9B3", letterSpacing: "0.1em", textTransform: "uppercase" }}>{s.kicker}</p>
                  <h3 className="mt-3 mb-4" style={{ fontFamily: serif, fontSize: "clamp(1.85rem, 3vw, 2.5rem)", color: "#EDE9E3", lineHeight: "1.15" }}>{s.title}</h3>
                  <p className="mb-6" style={{ fontFamily: sans, fontSize: "1.05rem", color: "#EDE9E3", lineHeight: "1.8", opacity: 0.9 }}>{s.description}</p>
                  <ul className="space-y-3 mb-6">
                    {s.inclusions.map((inc) => (
                      <li key={inc} className="flex items-start gap-3">
                        <span className="mt-2 flex-shrink-0" style={{ width: 6, height: 6, backgroundColor: "#8FA9B3", borderRadius: "50%" }} />
                        <span style={{ fontFamily: sans, fontSize: "0.95rem", color: "#B8AE9F", lineHeight: "1.7" }}>{inc}</span>
                      </li>
                    ))}
                  </ul>
                  {s.note && (
                    <p className="mb-6" style={{ fontFamily: sans, fontSize: "0.85rem", color: "#B8AE9F", fontStyle: "italic", lineHeight: "1.6" }}>{s.note}</p>
                  )}
                  <Link to="/contact" style={{ display: "inline-block", backgroundColor: "#8FA9B3", color: "#26333A", padding: "0.8rem 1.75rem", borderRadius: "0.5rem", fontFamily: sans, fontSize: "0.95rem", fontWeight: 500 }}>
                    Enquire
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Summer days out */}
      {days.map((group, gi) => (
        <Fragment key={group.heading}>
        <section
          id={slug(group.heading)}
          className="py-24 px-6 scroll-mt-24"
          style={{ backgroundColor: gi % 2 === 0 ? "#2E3D45" : "#26333A" }}
        >
          <div className="max-w-[1400px] mx-auto">
            <div className="mb-12 max-w-[760px]">
              <h2 style={{ fontFamily: serif, fontSize: "clamp(2rem, 4vw, 2.75rem)", color: "#EDE9E3" }}>{group.heading}</h2>
              <p className="mt-3" style={{ fontFamily: sans, fontSize: "1.05rem", color: "#B8AE9F", lineHeight: "1.8" }}>{group.intro}</p>
            </div>
            <div className={`grid grid-cols-1 md:grid-cols-2 ${group.items.length === 2 ? "" : "lg:grid-cols-3"} gap-8`}>
              {group.items.map((item) => (
                <div key={item.title} className="group flex flex-col">
                  <div className="overflow-hidden mb-5" style={{ borderRadius: "0.5rem" }}>
                    <img src={item.image} alt={item.title} loading="lazy" className="w-full h-[300px] object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <h3 className="mb-2" style={{ fontFamily: serif, fontSize: "1.5rem", color: "#EDE9E3" }}>{item.title}</h3>
                  <p className="mb-4" style={{ fontFamily: sans, fontSize: "0.95rem", color: "#B8AE9F", lineHeight: "1.7", flexGrow: 1 }}>{item.text}</p>
                  <p style={{ fontFamily: sans, fontSize: "0.75rem", color: "#8FA9B3", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase" }}>{item.cta}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        </Fragment>
      ))}

      {/* Add-ons */}
      <section id="add-ons" className="py-20 px-6 scroll-mt-24" style={{ backgroundColor: "#2E3D45" }}>
        <div className="max-w-[900px] mx-auto">
          <h2 className="mb-10" style={{ fontFamily: serif, fontSize: "clamp(1.75rem, 3vw, 2.25rem)", color: "#EDE9E3" }}>Bookable Add-ons</h2>
          {[
            { t: "Beach Picnic / Celebration Hamper", d: "Assembled from local producers. Add at booking.", p: "From $145" },
            { t: "Welcome Provisions Upgrade", d: "Premium pantry additions from Wursthaus and local makers. Add at booking.", p: "From $65" },
          ].map((a) => (
            <div key={a.t} className="flex justify-between items-start py-6 gap-6" style={{ borderBottom: "1px solid rgba(143,169,179,0.2)" }}>
              <div>
                <h3 className="mb-2" style={{ fontFamily: sans, fontSize: "1.125rem", color: "#EDE9E3", fontWeight: 600 }}>{a.t}</h3>
                <p style={{ fontFamily: sans, fontSize: "0.95rem", color: "#B8AE9F", lineHeight: "1.7" }}>{a.d}</p>
              </div>
              <p style={{ fontFamily: sans, fontSize: "1.125rem", color: "#8FA9B3", fontWeight: 500, flexShrink: 0 }}>{a.p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-[900px] mx-auto text-center">
          <h2 className="mb-6" style={{ fontFamily: serif, fontSize: "clamp(2rem, 4vw, 2.5rem)", color: "#EDE9E3" }}>Want something we haven't listed?</h2>
          <p className="mb-8" style={{ fontFamily: sans, fontSize: "1.05rem", color: "#EDE9E3", lineHeight: "1.8", opacity: 0.85 }}>
            Most things can be arranged with 48 hours' notice. Combine experiences, add nights, or tell us the idea and we'll build it.
          </p>
          <Link to="/contact" style={{ display: "inline-block", backgroundColor: "#8FA9B3", color: "#26333A", padding: "0.875rem 2rem", borderRadius: "0.5rem", fontFamily: sans, fontSize: "1rem", fontWeight: 500 }}>
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
