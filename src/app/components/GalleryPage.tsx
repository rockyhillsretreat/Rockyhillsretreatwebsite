import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { img, P, C, LOCAL_MEDIA } from '../media';

const serif = "'Playfair Display', serif";
const sans = "'Inter', sans-serif";
const legacy = (file: string) => `https://res.cloudinary.com/dfvjhslxp/image/upload/f_auto,q_auto,w_{w}/${file}`;

type Photo = { id: string; caption: string; credit?: string; legacy?: boolean };

// Each section is one row of the filter. Order matters: the best image leads.
const sections: { name: string; photos: Photo[] }[] = [
  {
    name: 'The Retreat',
    photos: [
      { id: P.exteriorGums, caption: 'In the gums' },
      { id: P.rainbowLiving, caption: 'Rain clearing over the bay' },
      { id: P.livingPanorama, caption: 'Living and dining' },
      { id: P.facade, caption: 'North face' },
      { id: P.diningView, caption: 'The table' },
      { id: P.robeWindow, caption: 'Morning' },
      { id: P.books, caption: 'The shelf' },
      { id: P.kettle, caption: 'First coffee' },
      { id: P.bedToBath, caption: 'From the bed to the bath' },
      { id: P.bedroomNight, caption: 'Bedroom, evening' },
      { id: P.dinnerNight, caption: 'Dinner' },
      { id: 'interior-living-view.jpg', caption: 'Living space', legacy: true },
      { id: 'interior-dining-symmetrical.jpg', caption: 'Kitchen', legacy: true },
      { id: 'retreat-detail-roofline-sky.jpg', caption: 'Roofline', legacy: true },
    ],
  },
  {
    name: 'Deck & Bath',
    photos: [
      { id: P.bathOnDeck, caption: 'The bath on the deck' },
      { id: P.deckReading, caption: 'Afternoon on the deck' },
      { id: P.bathExterior, caption: 'Bath and bay' },
      { id: P.bathPortrait, caption: 'The bath' },
      { id: P.deckChairPortrait, caption: 'The deck chair' },
      { id: P.yogaDeck, caption: 'Morning stretch' },
      { id: P.binoculars, caption: 'Binoculars by the window' },
      { id: 'retreat-bath-running-golden.jpg', caption: 'Running the bath', legacy: true },
    ],
  },
  {
    name: 'The Land',
    photos: [
      { id: P.bayDusk, caption: 'Great Oyster Bay at dusk' },
      { id: P.schoutenWindow, caption: 'Schouten Island' },
      { id: P.houseGumsPortrait, caption: 'Dry sclerophyll forest' },
      { id: P.firstLightPortrait, caption: 'First light' },
      { id: P.sunsetGums, caption: 'Sunset through the gums' },
      { id: P.duskRoofline, caption: 'Dusk' },
      { id: P.duskTree, caption: 'Last light' },
      { id: P.starsPortrait, caption: 'Night sky' },
      { id: 'land-dry-sclerophyll-forest.jpg', caption: 'The bush', legacy: true },
      { id: 'land-detail-driftwood-rock.jpg', caption: 'Driftwood', legacy: true },
    ],
  },
  {
    name: 'The Coast',
    photos: [
      { id: C.whiteSandBay, caption: 'White sand, East Coast', credit: 'Adobe Stock' },
      { id: C.wineglassLookout, caption: 'Wineglass Bay', credit: 'Josh Fotheringham, Unsplash' },
      { id: C.hazardsAcrossBay, caption: 'The Hazards across the bay', credit: 'Nadia Levenets, Unsplash' },
      { id: C.paintedCliffs, caption: 'Painted Cliffs, Maria Island', credit: 'Adobe Stock' },
      { id: C.beachWaves, caption: 'Shoreline', credit: 'Adobe Stock' },
      { id: C.bayOfFiresBoat, caption: 'Bay of Fires', credit: 'Laya Clode, Unsplash' },
      { id: C.offshoreIslands, caption: 'Off the coast', credit: 'Adobe Stock' },
      { id: C.wineglassBeach, caption: 'Wineglass Bay beach', credit: 'Tim Lippis, Unsplash' },
      { id: C.mariaWombats, caption: 'Wombats, Maria Island', credit: 'Dalal, Unsplash' },
      { id: C.wallabiesGold, caption: 'Wallabies at golden hour', credit: 'Adobe Stock' },
      { id: 'bay-view-swansea-coast.jpg', caption: 'Swansea coast', legacy: true },
      { id: 'location-swansea-beach-dunes-wide.jpg', caption: 'Dunes', legacy: true },
    ],
  },
];

const url = (p: Photo, w: number) => (p.legacy ? legacy(p.id).replace('{w}', String(w)) : img(p.id, w));

export function GalleryPage() {
  const [filter, setFilter] = useState('All');
  const [open, setOpen] = useState<number | null>(null);

  const photos = sections.filter((s) => filter === 'All' || s.name === filter).flatMap((s) => s.photos)
    .filter((p) => !(LOCAL_MEDIA && p.legacy));

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + photos.length) % photos.length)), [photos.length]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, close, step]);

  const btn: React.CSSProperties = {
    position: 'absolute', top: '50%', transform: 'translateY(-50%)', width: '3.25rem', height: '3.25rem', borderRadius: '50%',
    backgroundColor: 'rgba(46,61,69,0.85)', border: '1px solid rgba(143,169,179,0.5)', color: '#EDE9E3',
    display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
  };

  return (
    <div style={{ backgroundColor: '#26333A', minHeight: '100vh' }}>
      <section className="pt-20 pb-10 px-6">
        <div className="max-w-[1440px] mx-auto">
          <h1 style={{ fontFamily: serif, fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: '#EDE9E3' }}>Gallery</h1>
          <p className="mt-3" style={{ fontFamily: sans, fontSize: '1.05rem', color: '#B8AE9F' }}>
            The retreat, the deck, the land around it and the coast below.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            {['All', ...sections.map((s) => s.name)].map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => setFilter(name)}
                style={{
                  fontFamily: sans, fontSize: '0.9rem', padding: '0.5rem 1.1rem', borderRadius: '999px', cursor: 'pointer',
                  backgroundColor: filter === name ? '#8FA9B3' : 'transparent',
                  color: filter === name ? '#26333A' : '#EDE9E3',
                  border: '1px solid rgba(143,169,179,0.5)',
                }}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-[1440px] mx-auto" style={{ columnGap: '1rem' }}>
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4" style={{ columnGap: '1rem' }}>
            {photos.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setOpen(i)}
                className="group block w-full mb-4 overflow-hidden text-left"
                style={{ breakInside: 'avoid', borderRadius: '0.5rem', border: 0, padding: 0, background: 'none', cursor: 'zoom-in', position: 'relative' }}
                aria-label={`Open ${p.caption}`}
              >
                <img src={url(p, 700)} alt={p.caption} loading="lazy" className="w-full h-auto block transition-transform duration-700 group-hover:scale-105" />
                <span
                  className="absolute left-0 right-0 bottom-0 px-4 py-3 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: 'linear-gradient(to top, rgba(11,15,15,0.7), transparent)', color: '#EDE9E3', fontFamily: sans, fontSize: '0.85rem' }}
                >
                  {p.caption}
                </span>
              </button>
            ))}
          </div>
          <p className="mt-10 text-center" style={{ fontFamily: sans, fontSize: '0.8rem', color: '#8FA9B3' }}>
            Retreat photography by Raw Captis Photography and Melanie Kate Photography. Coast images credited in each caption.
          </p>
        </div>
      </section>

      {open !== null && photos[open] && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={close}
          style={{ position: 'fixed', inset: 0, zIndex: 100, backgroundColor: 'rgba(11,15,15,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <img
            src={url(photos[open], 2000)}
            alt={photos[open].caption}
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '92vw', maxHeight: '82vh', objectFit: 'contain', borderRadius: '0.25rem' }}
          />
          <div style={{ position: 'absolute', bottom: '1.5rem', left: 0, right: 0, textAlign: 'center', fontFamily: sans, color: '#EDE9E3', fontSize: '0.95rem' }}>
            {photos[open].caption}
            {photos[open].credit && <span style={{ color: '#B8AE9F', fontSize: '0.8rem' }}> · {photos[open].credit}</span>}
            <span style={{ color: '#8FA9B3', fontSize: '0.8rem', marginLeft: '0.75rem' }}>{open + 1} / {photos.length}</span>
          </div>
          <button type="button" aria-label="Close" onClick={close} style={{ ...btn, top: '2rem', right: '2rem', transform: 'none' }}><X size={22} /></button>
          <button type="button" aria-label="Previous" onClick={(e) => { e.stopPropagation(); step(-1); }} style={{ ...btn, left: '1.5rem' }}><ChevronLeft size={26} /></button>
          <button type="button" aria-label="Next" onClick={(e) => { e.stopPropagation(); step(1); }} style={{ ...btn, right: '1.5rem' }}><ChevronRight size={26} /></button>
        </div>
      )}
    </div>
  );
}
