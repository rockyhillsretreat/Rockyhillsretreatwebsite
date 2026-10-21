import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Plane, Car, MapPin, Clock, Sun, Moon } from "lucide-react";
import { img, P, C } from "../media";

// Landing page for the NZ "Direct to Hobart" Meta ads (utm_campaign=nz_akl_hba_2026).
// Picks up where the ads leave off: the direct flight, the drive up the coast, the wildlife.
// Not in the main nav.

const serif = "'Playfair Display', serif";
const sans = "'Inter', sans-serif";

const btnPrimary: React.CSSProperties = {
  display: "inline-block",
  backgroundColor: "#8FA9B3",
  color: "#26333A",
  padding: "0.95rem 2rem",
  borderRadius: "0.5rem",
  fontFamily: sans,
  fontSize: "1rem",
  fontWeight: 500,
};

const btnGhost: React.CSSProperties = {
  display: "inline-block",
  border: "1px solid rgba(237,233,227,0.6)",
  color: "#EDE9E3",
  padding: "0.95rem 2rem",
  borderRadius: "0.5rem",
  fontFamily: sans,
  fontSize: "1rem",
};

const day = [
  { icon: Plane, when: "Morning", title: "Auckland to Hobart, direct", text: "Air New Zealand flies straight across. Tasmania is two hours behind, so you gain them on the way over." },
  { icon: Clock, when: "Before lunch", title: "Land in Hobart", text: "Pick up a hire car, or step into a helicopter we have booked for you." },
  { icon: Car, when: "Afternoon", title: "Up the coast road", text: "Ninety minutes north along the East Coast, past Orford. Thirty-five minutes if you fly." },
  { icon: Sun, when: "Before dinner", title: "On the deck", text: "Great Oyster Bay below you, Freycinet across the water, and nobody else in sight." },
];

const neighbours = [
  "Wombats on the grass",
  "Wallabies at dusk",
  "Echidnas on the track",
  "Quolls, possums and owls after dark",
];

const arrival = [
  { icon: Car, title: "Hire car", rows: [["From Hobart", "1.5 hours"], ["Final stretch", "Gravel driveway"]], note: "Directions sent when you book. Arrive before dark if you can, the wildlife is on the roads at dusk." },
  { icon: Plane, title: "Private helicopter", rows: [["From Hobart", "35 minutes"], ["One-way", "AUD $3,500"]], note: "Land on the property. A hire car can be delivered for your stay. Weather dependent." },
  { icon: MapPin, title: "Car service", rows: [["From Hobart", "1.5 hours"], ["One-way", "AUD $850"]], note: "Professional driver, door to door. Ask us to arrange it when you book." },
];

export function FromAucklandPage() {
  // Ad landing page only: keep it out of search results (vercel.json also sends X-Robots-Tag).
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex";
    document.head.appendChild(meta);
    return () => { meta.remove(); };
  }, []);

  return (
    <div style={{ backgroundColor: "#26333A", minHeight: "100vh" }}>
      {/* Hero: the ad's promise, then two ways forward, all above the fold */}
      <section className="relative w-full overflow-hidden" style={{ height: "88vh", minHeight: "520px" }}>
        <img
          src={img(C.wineglassHilltop, 2000)}
          alt="Wineglass Bay and the Hazards from the hills"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(38,51,58,0.15) 20%, rgba(38,51,58,0.85) 100%)" }} />
        <div className="relative h-full flex items-end px-6 pb-14">
          <div className="max-w-[1300px] w-full mx-auto">
            <p style={{ fontFamily: sans, fontSize: "0.8rem", color: "#EDE9E3", letterSpacing: "0.15em", textTransform: "uppercase" }}>
              Direct from Auckland
            </p>
            <h1 className="mt-3" style={{ fontFamily: serif, fontSize: "clamp(2.4rem, 6vw, 4.5rem)", color: "#F4EFE8", lineHeight: "1.05", maxWidth: "860px" }}>
              Jump the ditch to Tasmania's east coast.
            </h1>
            <p className="mt-5" style={{ fontFamily: sans, fontSize: "clamp(1rem, 2vw, 1.2rem)", color: "#EDE9E3", lineHeight: "1.7", maxWidth: "620px", opacity: 0.92 }}>
              Leave Auckland in the morning, land in Hobart before lunch, and be on the deck at Rocky Hills by the afternoon. An off-grid house for two above Great Oyster Bay.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/booking" style={btnPrimary}>Check dates</Link>
              <Link to="/contact" style={btnGhost}>Ask us anything</Link>
            </div>
          </div>
        </div>
      </section>

      {/* The day */}
      <section className="py-24 px-6">
        <div className="max-w-[1300px] mx-auto">
          <h2 className="mb-4" style={{ fontFamily: serif, fontSize: "clamp(2rem, 4vw, 2.75rem)", color: "#EDE9E3" }}>Auckland to the east coast in a day</h2>
          <p className="mb-14 max-w-[680px]" style={{ fontFamily: sans, fontSize: "1.05rem", color: "#B8AE9F", lineHeight: "1.8" }}>
            No connections through Melbourne or Sydney. One flight, one drive, and you're there.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {day.map((d, i) => (
              <div key={d.title} className="p-7" style={{ backgroundColor: "#2E3D45", border: "1px solid rgba(143,169,179,0.2)", borderRadius: "0.5rem" }}>
                <div className="flex items-center gap-3">
                  <d.icon size={22} style={{ color: "#8FA9B3", strokeWidth: 1.5 }} />
                  <span style={{ fontFamily: sans, fontSize: "0.75rem", color: "#8FA9B3", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                    {i + 1}. {d.when}
                  </span>
                </div>
                <h3 className="mt-5 mb-3" style={{ fontFamily: serif, fontSize: "1.45rem", color: "#EDE9E3" }}>{d.title}</h3>
                <p style={{ fontFamily: sans, fontSize: "0.95rem", color: "#B8AE9F", lineHeight: "1.7" }}>{d.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's waiting */}
      <section className="py-24 px-6" style={{ backgroundColor: "#2E3D45" }}>
        <div className="max-w-[1300px] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <h2 className="mb-6" style={{ fontFamily: serif, fontSize: "clamp(2rem, 4vw, 2.75rem)", color: "#EDE9E3" }}>Just the two of you</h2>
            <div className="space-y-5" style={{ fontFamily: sans, fontSize: "1.05rem", color: "#EDE9E3", lineHeight: "1.8", opacity: 0.9 }}>
              <p>One house on 250 acres of protected covenant land, fifteen minutes south of Swansea. Concrete, blackwood and glass, a bath on the deck, a fire for the cool evenings.</p>
              <p>Off-grid and quiet. No neighbours you can see, and nowhere else to be.</p>
            </div>
            <h3 className="mt-10 mb-4" style={{ fontFamily: serif, fontSize: "1.5rem", color: "#EDE9E3" }}>The neighbours are mostly marsupials</h3>
            <ul className="space-y-2" style={{ fontFamily: sans, fontSize: "1rem", color: "#B8AE9F", lineHeight: "1.7" }}>
              {neighbours.map((n) => (
                <li key={n} className="flex gap-3"><Moon size={16} style={{ color: "#8FA9B3", marginTop: 5, flexShrink: 0 }} />{n}</li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src={img(P.bedroomFire, 800)} alt="The fire lit in the bedroom at night" loading="lazy" className="w-full h-[420px] object-cover" style={{ borderRadius: "0.5rem" }} />
            <img src={img(P.bedroomWide, 800)} alt="The bedroom at night" loading="lazy" className="w-full h-[420px] object-cover mt-12" style={{ borderRadius: "0.5rem" }} />
          </div>
        </div>
      </section>

      {/* From Hobart */}
      <section className="py-24 px-6">
        <div className="max-w-[1300px] mx-auto">
          <h2 className="mb-4" style={{ fontFamily: serif, fontSize: "clamp(2rem, 4vw, 2.75rem)", color: "#EDE9E3" }}>From Hobart airport</h2>
          <p className="mb-12 max-w-[680px]" style={{ fontFamily: sans, fontSize: "1.05rem", color: "#B8AE9F", lineHeight: "1.8" }}>
            Three ways up the coast. We can book any of them for you.
          </p>
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

      {/* Closing call to action */}
      <section className="py-24 px-6 text-center" style={{ backgroundColor: "#2E3D45" }}>
        <h2 style={{ fontFamily: serif, fontSize: "clamp(2rem, 4vw, 2.75rem)", color: "#EDE9E3" }}>Pick your dates this summer</h2>
        <p className="mt-4 mx-auto max-w-[600px]" style={{ fontFamily: sans, fontSize: "1.05rem", color: "#B8AE9F", lineHeight: "1.8" }}>
          Two nights minimum. Tell us what you'd like and we'll sort the rest, from the helicopter to dinner on the deck.
        </p>
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Link to="/booking" style={btnPrimary}>Check dates</Link>
          <Link to="/experiences" style={btnGhost}>See what we can arrange</Link>
        </div>
        <p className="mt-12" style={{ fontFamily: sans, fontSize: "0.9rem", color: "#B8AE9F" }}>
          Coming from Australia?{" "}
          <Link to="/location" style={{ color: "#8FA9B3", textDecoration: "underline" }}>See getting here</Link>
        </p>
      </section>
    </div>
  );
}
