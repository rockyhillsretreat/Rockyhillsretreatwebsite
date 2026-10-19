import { Link } from "react-router-dom";
import { Plane, Car, MapPin, Sun, Waves, Bird, Flame, Backpack } from "lucide-react";
import { img, P, C, V } from "../media";
import { VideoLoop } from "./VideoLoop";

const serif = "'Playfair Display', serif";
const sans = "'Inter', sans-serif";

const nearby = [
  {
    name: "Freycinet & Wineglass Bay",
    time: "45 min",
    text: "The Hazards, Wineglass Bay, Honeymoon Bay, Coles Bay for lunch. The obvious day out, and worth it.",
    image: img(C.wineglassLookout, 900),
  },
  {
    name: "Maria Island",
    time: "Ferry from Triabunna",
    text: "No cars. Wombats on the lawns, the Painted Cliffs at low tide, and the old convict village at Darlington.",
    image: img(C.paintedCliffs, 900),
  },
  {
    name: "Swansea",
    time: "Nearest town",
    text: "Bakery, general store, fuel, a beach at the end of the main street. Kate's Berry Farm is just out of town.",
    image: img(C.beachWaves, 900),
  },
  {
    name: "Cellar doors",
    time: "5 to 60 min",
    text: "Devil's Corner, Milton and a run of small vineyards along the coast road. Lunch in the vines, back before dark.",
    image: img(C.goldenPaddock, 900),
  },
  {
    name: "Bicheno",
    time: "Up the coast",
    text: "Fishing boats in the Gulch, the blowhole, and penguins coming ashore at dusk.",
    image: img(C.bichenoBoats, 900),
  },
  {
    name: "Bay of Fires",
    time: "1.5 hours north",
    text: "Orange lichen on granite, white sand, very clear water. A long day, and a good one.",
    image: img(C.bayOfFiresLichen, 900),
  },
];

const arrival = [
  {
    icon: Car,
    title: "Self-Drive",
    rows: [["From Hobart", "1.5 hours"], ["From Launceston", "2.5 hours"], ["Final stretch", "Gravel driveway"]],
    note: "Directions sent when you book. 4WD recommended but not essential. Arrive before dark if you can, the wildlife is on the roads at dusk.",
  },
  {
    icon: Plane,
    title: "Private Helicopter",
    rows: [["From Hobart", "35 minutes"], ["From Launceston", "50 minutes"], ["Price (one-way)", "$3,000"]],
    note: "Land on the property. A hire car can be delivered for your stay. Weather dependent.",
  },
  {
    icon: MapPin,
    title: "Car Service",
    rows: [["From Hobart", "1.5 hours"], ["From Launceston", "2.5 hours"], ["Price (one-way)", "$850"]],
    note: "Professional driver, door to door. Ask us to arrange when you book.",
  },
];

const knowBefore = [
  { icon: Sun, title: "Weather", text: "Summer days are warm and the sun is strong. Evenings cool off quickly on the hill, so pack a layer." },
  { icon: Waves, title: "The water", text: "Clear and cold. Most beaches are unpatrolled. Swim where you can stand and check conditions before you go in." },
  { icon: Bird, title: "Wildlife", text: "Wallabies and echidnas on the property, quolls and possums at night. Drive slowly after dark." },
  { icon: Flame, title: "Bushfire season", text: "Summer is fire season in Tasmania. Check TasALERT before you travel and follow any advice from the Tasmania Fire Service." },
  { icon: Backpack, title: "What to bring", text: "Swimmers, a hat, sunscreen, walking shoes, a torch for the walk to the car. Everything else is here." },
  { icon: MapPin, title: "Reception", text: "Mobile signal is limited. Wi-Fi at the retreat. Download maps before you leave Hobart." },
];

export function LocationPage() {
  return (
    <div style={{ backgroundColor: "#26333A", minHeight: "100vh" }}>
      {/* Hero */}
      <section className="relative w-full overflow-hidden" style={{ height: "80vh", minHeight: "480px" }}>
        <img src={img(C.hazardsAcrossBay, 2400)} alt="The Hazards across Great Oyster Bay" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(38,51,58,0) 35%, rgba(38,51,58,0.8) 100%)" }} />
        <div className="relative h-full flex items-end px-6 pb-16">
          <div className="max-w-[1300px] w-full mx-auto">
            <p style={{ fontFamily: sans, fontSize: "0.8rem", color: "#EDE9E3", letterSpacing: "0.15em", textTransform: "uppercase" }}>East Coast, Tasmania</p>
            <h1 className="mt-3" style={{ fontFamily: serif, fontSize: "clamp(2.5rem, 6vw, 4.5rem)", color: "#F4EFE8", lineHeight: "1.05", maxWidth: "820px" }}>
              Above Great Oyster Bay, looking at the Hazards.
            </h1>
          </div>
        </div>
      </section>

      {/* Where we are */}
      <section className="py-24 px-6">
        <div className="max-w-[1300px] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <h2 className="mb-6" style={{ fontFamily: serif, fontSize: "clamp(2rem, 4vw, 2.75rem)", color: "#EDE9E3" }}>One road in.</h2>
            <div className="space-y-5" style={{ fontFamily: sans, fontSize: "1.05rem", color: "#EDE9E3", lineHeight: "1.8", opacity: 0.9 }}>
              <p>Rocky Hills sits on a hill between Swansea and the sea, ninety minutes up the coast from Hobart. From the deck you look across Great Oyster Bay to the Freycinet Peninsula and Schouten Island.</p>
              <p>It is close enough to everything on the East Coast to make a day of it, and far enough from all of it that you probably won't.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src={img(P.schoutenPortrait, 800)} alt="Schouten Island through the window" loading="lazy" className="w-full h-[460px] object-cover" style={{ borderRadius: "0.5rem" }} />
            <img src={img(P.houseGumsPortrait, 800)} alt="The retreat in the gums" loading="lazy" className="w-full h-[460px] object-cover mt-12" style={{ borderRadius: "0.5rem" }} />
          </div>
        </div>
      </section>

      {/* Your summer radius */}
      <section className="py-24 px-6" style={{ backgroundColor: "#2E3D45" }}>
        <div className="max-w-[1300px] mx-auto">
          <div className="mb-14 max-w-[720px]">
            <h2 style={{ fontFamily: serif, fontSize: "clamp(2rem, 4vw, 2.75rem)", color: "#EDE9E3" }}>Within a day's drive</h2>
            <p className="mt-4" style={{ fontFamily: sans, fontSize: "1.05rem", color: "#B8AE9F", lineHeight: "1.8" }}>
              The best of the East Coast, measured from the front door.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {nearby.map((n) => (
              <div key={n.name} className="group">
                <div className="relative overflow-hidden mb-5" style={{ borderRadius: "0.5rem" }}>
                  <img src={n.image} alt={n.name} loading="lazy" className="w-full h-[280px] object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute top-4 left-4" style={{ backgroundColor: "rgba(38,51,58,0.85)", color: "#EDE9E3", fontFamily: sans, fontSize: "0.8rem", padding: "0.35rem 0.75rem", borderRadius: "999px" }}>
                    {n.time}
                  </span>
                </div>
                <h3 className="mb-2" style={{ fontFamily: serif, fontSize: "1.5rem", color: "#EDE9E3" }}>{n.name}</h3>
                <p style={{ fontFamily: sans, fontSize: "0.95rem", color: "#B8AE9F", lineHeight: "1.7" }}>{n.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-14 text-center">
            <Link to="/experiences" style={{ display: "inline-block", backgroundColor: "#8FA9B3", color: "#26333A", padding: "0.875rem 2rem", borderRadius: "0.5rem", fontFamily: sans, fontSize: "1rem", fontWeight: 500 }}>
              See what we can arrange
            </Link>
          </div>
        </div>
      </section>

      {/* Video band */}
      <section className="relative overflow-hidden" style={{ height: "60vh", minHeight: "380px" }}>
        <VideoLoop videoId={V.offshoreIslands} fallbackImage={img(C.offshoreIslands, 1920)} className="absolute inset-0 w-full h-full" />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(38,51,58,0.35)" }} />
        <div className="relative h-full flex items-center justify-center px-6 text-center">
          <p style={{ fontFamily: serif, fontSize: "clamp(1.75rem, 4vw, 3rem)", color: "#F4EFE8", fontStyle: "italic", maxWidth: "820px", lineHeight: "1.3" }}>
            Leave Hobart after lunch. Swim before dinner.
          </p>
        </div>
      </section>

      {/* Getting here */}
      <section className="py-24 px-6">
        <div className="max-w-[1300px] mx-auto">
          <h2 className="mb-12" style={{ fontFamily: serif, fontSize: "clamp(2rem, 4vw, 2.75rem)", color: "#EDE9E3" }}>Getting here</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {arrival.map((a) => (
              <div key={a.title} className="p-8" style={{ backgroundColor: "#2E3D45", border: "1px solid rgba(143,169,179,0.2)", borderRadius: "0.5rem" }}>
                <a.icon size={26} style={{ color: "#8FA9B3", strokeWidth: 1.5 }} />
                <h3 className="mt-5 mb-5" style={{ fontFamily: serif, fontSize: "1.6rem", color: "#EDE9E3" }}>{a.title}</h3>
                <div className="space-y-3">
                  {a.rows.map(([k, v]) => (
                    <div key={k} className="flex justify-between pb-3" style={{ borderBottom: "1px solid rgba(143,169,179,0.15)", fontFamily: sans, fontSize: "0.9rem" }}>
                      <span style={{ color: "#B8AE9F" }}>{k}</span>
                      <span style={{ color: "#EDE9E3" }}>{v}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-5" style={{ fontFamily: sans, fontSize: "0.85rem", color: "#B8AE9F", lineHeight: "1.6", fontStyle: "italic" }}>{a.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Know before you go */}
      <section className="py-24 px-6" style={{ backgroundColor: "#2E3D45" }}>
        <div className="max-w-[1300px] mx-auto">
          <h2 className="mb-12" style={{ fontFamily: serif, fontSize: "clamp(2rem, 4vw, 2.75rem)", color: "#EDE9E3" }}>Know before you go</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
            {knowBefore.map((k) => (
              <div key={k.title} className="flex gap-4">
                <k.icon size={22} style={{ color: "#8FA9B3", strokeWidth: 1.5, flexShrink: 0, marginTop: 4 }} />
                <div>
                  <h3 className="mb-2" style={{ fontFamily: sans, fontSize: "1.05rem", color: "#EDE9E3", fontWeight: 600 }}>{k.title}</h3>
                  <p style={{ fontFamily: sans, fontSize: "0.95rem", color: "#B8AE9F", lineHeight: "1.7" }}>{k.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seasons */}
      <section className="py-24 px-6">
        <div className="max-w-[1300px] mx-auto">
          <h2 className="mb-12" style={{ fontFamily: serif, fontSize: "clamp(2rem, 4vw, 2.75rem)", color: "#EDE9E3" }}>When to come</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { s: "Summer", m: "Dec to Feb", t: "Long light, warm days, cold clear water. Beaches, boats, the bath at sunset. Book early for January.", image: img(P.bathExterior, 700) },
              { s: "Autumn", m: "Mar to May", t: "Settled weather, golden afternoons, quieter roads. Some of the best swimming of the year.", image: img(C.sunsetClouds, 700) },
              { s: "Winter", m: "Jun to Aug", t: "Fire on, bath steaming, the Milky Way overhead. The retreat at its most private.", image: img(P.dinnerNight, 700) },
              { s: "Spring", m: "Sep to Nov", t: "Wildflowers, wildlife with young, whales heading back south through the bay.", image: img(P.sunsetGums, 700) },
            ].map((x) => (
              <div key={x.s} className="overflow-hidden" style={{ backgroundColor: "#2E3D45", borderRadius: "0.5rem", border: "1px solid rgba(143,169,179,0.2)" }}>
                <img src={x.image} alt={x.s} loading="lazy" className="w-full h-[180px] object-cover" />
                <div className="p-6">
                  <p style={{ fontFamily: sans, fontSize: "0.75rem", color: "#8FA9B3", letterSpacing: "0.12em", textTransform: "uppercase" }}>{x.m}</p>
                  <h3 className="mt-1 mb-3" style={{ fontFamily: serif, fontSize: "1.5rem", color: "#EDE9E3" }}>{x.s}</h3>
                  <p style={{ fontFamily: sans, fontSize: "0.9rem", color: "#B8AE9F", lineHeight: "1.7" }}>{x.t}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Acknowledgement */}
      <section className="py-16 px-6" style={{ backgroundColor: "#2E3D45" }}>
        <p className="max-w-[900px] mx-auto text-center" style={{ fontFamily: sans, fontSize: "0.875rem", color: "#B8AE9F", lineHeight: "1.8" }}>
          Rocky Hills sits on the country of the Mumirimina clan of the Oyster Bay Nation (Paredarerme) and the Big River Nation (Lairmairrener), who have cared for this land and this coastline for tens of thousands of years. We acknowledge their continuing connection to country and pay our respects to Elders past and present. This country was never ceded.
        </p>
      </section>
    </div>
  );
}
