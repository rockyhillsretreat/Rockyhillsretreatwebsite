import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Check, Loader2 } from 'lucide-react';

// ── Types ──────────────────────────────────────────────────────────────────────

interface DayAvailability {
  date: string; // YYYY-MM-DD
  available: boolean;
}

interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes: string;
  voucher: string;
  adults: number;
}

// ── Constants ──────────────────────────────────────────────────────────────────

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAYS = ['Su','Mo','Tu','We','Th','Fr','Sa'];
const PROPERTY_ID = 'b607a4fc675641f4a6737795d38edc74';

const packages = [
  { id: 'in-the-air-then-at-rest', name: 'In the Air, Then at Rest', price: 'From $5,500', description: 'Scenic helicopter flight, couples massage, Huon pine bath. 3 nights.' },
  { id: 'the-long-lunch', name: 'The Long Lunch', price: 'From $3,150', description: 'Guided wine trail, four cellar doors, lunch included, couples massage. 3 nights.' },
  { id: 'from-the-water', name: 'From the Water', price: 'From $3,250', description: 'Half day fishing charter, catch returned to the retreat with recipe, couples massage. 3 nights.' },
  { id: 'celebrate-here', name: 'Celebrate Here', price: 'From $3,550', description: 'Private photographer, beach picnic hamper, Huon pine bath. 3 nights.' },
];

const experiences = [
  { id: 'sea-kayaking', name: 'Sea Kayaking', description: 'Guided sea kayaking along the Freycinet Peninsula coastline.' },
  { id: 'fishing-charter', name: 'Fishing Charter', description: 'Half day on Great Oyster Bay with a local skipper. Flathead, trumpeter, squid.' },
  { id: 'helicopter-flight', name: 'Scenic Helicopter Flight', description: 'The East Coast from above. Great Oyster Bay, the Hazards, Wineglass Bay.' },
  { id: 'helicopter-transfer', name: 'Helicopter Transfer from Hobart', description: 'Arrive by air. A helicopter transfer from Hobart lands you at the property direct.' },
  { id: 'hire-car', name: 'Hire Car Delivery', description: 'A hire car arranged and delivered to the property for your stay.' },
  { id: 'wine-trail', name: 'The Wine Trail, Guided', description: 'Four East Coast cellar doors, lunch included, pickup and return from the property.', note: 'Off-property experience. RHR does not serve alcohol on site.' },
  { id: 'couples-massage', name: 'Couples Massage', description: 'A therapist comes to you. Native Kunzea aromatherapy, face ritual, and foot treatment available as add-ons.' },
  { id: 'foraging', name: 'Guided Foraging Session', description: 'The property and surrounding headland, read with a local guide.' },
];

const provisions = [
  { id: 'fruit-box', name: 'Fruit Box', price: '$35', description: 'Seasonal Tasmanian fruit, sourced locally where possible.' },
  { id: 'vegetable-box', name: 'Vegetable Box', price: '$45', description: 'Seasonal vegetables from a local East Coast grower.' },
  { id: 'charcuterie-box', name: 'Charcuterie Box', price: '$185', description: 'Cured meats, cheeses, and local preserves.' },
];

const celebrations = [
  { id: 'photographer', name: 'Private Photographer', price: 'POA', description: 'A half day session on the property and surrounding headland.' },
  { id: 'beach-picnic', name: 'Beach Picnic Setup', price: '$120', description: 'Hamper assembled from local producers, set up on the beach before you arrive.' },
];

// ── Styles ─────────────────────────────────────────────────────────────────────

const S = {
  bg: '#26333A',
  bgDark: '#0B0F0F',
  bgCard: '#2E3D45',
  accent: '#8FA9B3',
  bone: '#EDE9E3',
  muted: '#B8AE9F',
  border: 'rgba(143, 169, 179, 0.2)',
  playfair: "'Playfair Display', serif",
  inter: "'Inter', sans-serif",
};

// ── Calendar Component ─────────────────────────────────────────────────────────

function Calendar({
  unavailableDates,
  checkIn,
  checkOut,
  onSelectDate,
  loading,
}: {
  unavailableDates: Set<string>;
  checkIn: string | null;
  checkOut: string | null;
  onSelectDate: (date: string) => void;
  loading: boolean;
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const formatDate = (y: number, m: number, d: number) =>
    `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

  const isUnavailable = (dateStr: string) => unavailableDates.has(dateStr);
  const isPast = (y: number, m: number, d: number) => new Date(y, m, d) < today;
  const isCheckIn = (dateStr: string) => dateStr === checkIn;
  const isCheckOut = (dateStr: string) => dateStr === checkOut;
  const isInRange = (dateStr: string) => {
    if (!checkIn || !checkOut) return false;
    return dateStr > checkIn && dateStr < checkOut;
  };

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} style={{ color: S.accent, background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem' }}>
          <ChevronLeft size={20} />
        </button>
        <span style={{ fontFamily: S.playfair, fontSize: '1.125rem', color: S.bone }}>
          {MONTHS[viewMonth]} {viewYear}
        </span>
        <button onClick={nextMonth} style={{ color: S.accent, background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem' }}>
          <ChevronRight size={20} />
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 size={24} style={{ color: S.accent, animation: 'spin 1s linear infinite' }} />
          <span style={{ fontFamily: S.inter, fontSize: '0.875rem', color: S.muted, marginLeft: '0.5rem' }}>Loading availability...</span>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-7 gap-1 mb-2">
            {DAYS.map(d => (
              <div key={d} style={{ fontFamily: S.inter, fontSize: '0.75rem', color: S.muted, textAlign: 'center', padding: '0.25rem' }}>{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {cells.map((day, i) => {
              if (!day) return <div key={`empty-${i}`} />;
              const dateStr = formatDate(viewYear, viewMonth, day);
              const past = isPast(viewYear, viewMonth, day);
              const unavailable = isUnavailable(dateStr);
              const disabled = past || unavailable;
              const isStart = isCheckIn(dateStr);
              const isEnd = isCheckOut(dateStr);
              const inRange = isInRange(dateStr);

              let bg = 'transparent';
              let color = S.bone;
              let opacity = 1;

              if (disabled) { color = S.muted; opacity = 0.35; }
              if (inRange) bg = 'rgba(143, 169, 179, 0.15)';
              if (isStart || isEnd) bg = S.accent;
              if (isStart || isEnd) color = S.bgDark;

              return (
                <button
                  key={dateStr}
                  disabled={disabled}
                  onClick={() => !disabled && onSelectDate(dateStr)}
                  style={{
                    background: bg,
                    color,
                    opacity,
                    border: unavailable ? '1px solid rgba(143,169,179,0.1)' : '1px solid transparent',
                    borderRadius: '0.25rem',
                    padding: '0.375rem 0',
                    fontFamily: S.inter,
                    fontSize: '0.875rem',
                    cursor: disabled ? 'not-allowed' : 'pointer',
                    textAlign: 'center',
                    position: 'relative',
                  }}
                >
                  {day}
                  {unavailable && !past && (
                    <span style={{ position: 'absolute', bottom: 2, left: '50%', transform: 'translateX(-50%)', width: 4, height: 4, borderRadius: '50%', background: 'rgba(143,169,179,0.4)', display: 'block' }} />
                  )}
                </button>
              );
            })}
          </div>
          <div className="flex gap-4 mt-3">
            <div className="flex items-center gap-1">
              <div style={{ width: 12, height: 12, borderRadius: 2, background: S.accent }} />
              <span style={{ fontFamily: S.inter, fontSize: '0.7rem', color: S.muted }}>Selected</span>
            </div>
            <div className="flex items-center gap-1">
              <div style={{ width: 12, height: 12, borderRadius: 2, background: 'rgba(143,169,179,0.15)', border: '1px solid rgba(143,169,179,0.2)' }} />
              <span style={{ fontFamily: S.inter, fontSize: '0.7rem', color: S.muted }}>Unavailable</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ── CheckboxItem Component ─────────────────────────────────────────────────────

function CheckboxItem({
  id, name, description, price, note, checked, onChange,
}: {
  id: string; name: string; description: string; price?: string; note?: string;
  checked: boolean; onChange: (id: string) => void;
}) {
  return (
    <div
      onClick={() => onChange(id)}
      style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        padding: '1rem', borderRadius: '0.375rem', cursor: 'pointer',
        backgroundColor: checked ? 'rgba(143, 169, 179, 0.08)' : 'transparent',
        border: checked ? `1px solid rgba(143, 169, 179, 0.4)` : `1px solid rgba(143, 169, 179, 0.1)`,
        transition: 'all 0.2s ease',
        marginBottom: '0.5rem',
      }}
    >
      <div style={{ flex: 1, paddingRight: '1rem' }}>
        <p style={{ fontFamily: S.inter, fontSize: '0.95rem', color: S.bone, marginBottom: '0.25rem', fontWeight: 500 }}>{name}</p>
        <p style={{ fontFamily: S.inter, fontSize: '0.85rem', color: S.muted, lineHeight: '1.6' }}>{description}</p>
        {note && <p style={{ fontFamily: S.inter, fontSize: '0.8rem', color: S.accent, fontStyle: 'italic', marginTop: '0.25rem' }}>{note}</p>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
        {price && <span style={{ fontFamily: S.playfair, fontSize: '1rem', color: S.accent }}>{price}</span>}
        <div style={{
          width: 20, height: 20, borderRadius: 4, border: `2px solid ${checked ? S.accent : 'rgba(143,169,179,0.4)'}`,
          background: checked ? S.accent : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.2s ease', flexShrink: 0,
        }}>
          {checked && <Check size={12} style={{ color: S.bgDark }} />}
        </div>
      </div>
    </div>
  );
}

// ── Section Component ──────────────────────────────────────────────────────────

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div style={{ backgroundColor: S.bgCard, borderRadius: '0.5rem', border: `1px solid ${S.border}`, padding: '2rem', marginBottom: '1.5rem' }}>
      <h3 style={{ fontFamily: S.playfair, fontSize: '1.5rem', color: S.bone, marginBottom: subtitle ? '0.375rem' : '1.25rem' }}>{title}</h3>
      {subtitle && <p style={{ fontFamily: S.inter, fontSize: '0.875rem', color: S.muted, fontStyle: 'italic', marginBottom: '1.25rem' }}>{subtitle}</p>}
      {children}
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────

export function BookingPage() {
  // Availability
  const [unavailableDates, setUnavailableDates] = useState<Set<string>>(new Set());
  const [availabilityLoading, setAvailabilityLoading] = useState(true);

  // Date selection
  const [checkIn, setCheckIn] = useState<string | null>(null);
  const [checkOut, setCheckOut] = useState<string | null>(null);
  const [selectingCheckout, setSelectingCheckout] = useState(false);

  // Add-ons
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [selectedExperiences, setSelectedExperiences] = useState<string[]>([]);
  const [selectedProvisions, setSelectedProvisions] = useState<string[]>([]);
  const [selectedCelebrations, setSelectedCelebrations] = useState<string[]>([]);

  // Form
  const [form, setForm] = useState<BookingFormData>({ firstName: '', lastName: '', email: '', phone: '', notes: '', voucher: '', adults: 2 });

  // Submission
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load availability on mount
  useEffect(() => {
    fetch('/api/availability')
      .then(r => r.json())
      .then(data => {
        // OwnerRez returns availability array with date and available fields
        const blocked = new Set<string>();
        const days: any[] = data.days || data.availability || data || [];
        if (Array.isArray(days)) {
          days.forEach((d: any) => {
            if (d.available === false || d.status === 'unavailable' || d.status === 'booked') {
              blocked.add(d.date || d.day);
            }
          });
        }
        setUnavailableDates(blocked);
      })
      .catch(err => console.error('Availability fetch failed:', err))
      .finally(() => setAvailabilityLoading(false));
  }, []);

  // Date selection logic
  const handleDateSelect = (date: string) => {
    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(date);
      setCheckOut(null);
      setSelectingCheckout(true);
    } else if (selectingCheckout) {
      if (date <= checkIn) {
        setCheckIn(date);
        setCheckOut(null);
      } else {
        // Check no unavailable dates in range
        const hasBlockedInRange = Array.from(unavailableDates).some(d => d > checkIn && d < date);
        if (hasBlockedInRange) {
          setError('Your selected range includes unavailable dates. Please choose different dates.');
          return;
        }
        setCheckOut(date);
        setSelectingCheckout(false);
        setError(null);
      }
    }
  };

  const nights = checkIn && checkOut
    ? Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  const toggle = (id: string, setFn: React.Dispatch<React.SetStateAction<string[]>>) => {
    setFn(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const formatDate = (d: string) => {
    const [y, m, day] = d.split('-');
    return `${parseInt(day)} ${MONTHS[parseInt(m) - 1]} ${y}`;
  };

  const hasAddOns = selectedPackage || selectedExperiences.length || selectedProvisions.length || selectedCelebrations.length;

  const handleSubmit = async () => {
    setError(null);

    if (!checkIn || !checkOut) return setError('Please select your check-in and check-out dates.');
    if (nights < 2) return setError('Minimum stay is 2 nights.');
    if (!form.firstName || !form.lastName || !form.email) return setError('Please fill in your first name, last name, and email.');
    if (!/\S+@\S+\.\S+/.test(form.email)) return setError('Please enter a valid email address.');

    setSubmitting(true);

    try {
      // Step 1: Log add-ons to Airtable via Make (non-blocking)
      if (hasAddOns) {
        fetch('/api/log-addons', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            phone: form.phone,
            arrival: checkIn,
            departure: checkOut,
            nights,
            selectedPackage: selectedPackage ? packages.find(p => p.id === selectedPackage)?.name : null,
            selectedExperiences: selectedExperiences.map(id => experiences.find(e => e.id === id)?.name),
            selectedProvisions: selectedProvisions.map(id => provisions.find(p => p.id === id)?.name),
            selectedCelebrations: selectedCelebrations.map(id => celebrations.find(c => c.id === id)?.name),
            voucher: form.voucher,
            notes: form.notes,
          }),
        }).catch(err => console.error('Add-on logging failed (non-fatal):', err));
      }

      // Step 2: Create quote in OwnerRez
      const quoteRes = await fetch('/api/create-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          arrival: checkIn,
          departure: checkOut,
          adults: form.adults,
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          notes: form.notes,
          voucher: form.voucher,
        }),
      });

      const quoteData = await quoteRes.json();

      if (!quoteRes.ok) {
        setError(quoteData.error || 'Something went wrong creating your booking. Please try again or contact us directly.');
        setSubmitting(false);
        return;
      }

      // Step 3: Redirect to OwnerRez payment page
      if (quoteData.paymentUrl) {
        window.location.href = quoteData.paymentUrl;
      } else {
        // Fallback if no payment URL returned
        window.location.href = `https://app.ownerrez.com/booking/${PROPERTY_ID}`;
      }

    } catch (err: any) {
      setError('Something went wrong. Please try again or contact us at stay@rockyhillsretreat.com.au');
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: S.bg }}>
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 pt-32 pb-24">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 style={{ fontFamily: S.playfair, fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: S.bone, letterSpacing: '-0.01em', marginBottom: '1rem' }}>
            Book Your Stay
          </h1>
          <p style={{ fontFamily: S.inter, fontSize: '1.05rem', color: S.muted, lineHeight: '1.8' }}>
            From $800 per night. Two-night minimum. Book direct for the best rate.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-0">

            {/* Dates */}
            <Section title="Choose Your Dates" subtitle={selectingCheckout ? 'Now select your check-out date.' : checkIn ? 'Dates selected. Scroll down to continue.' : 'Select your check-in date first.'}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div style={{ padding: '1rem', borderRadius: '0.375rem', border: `1px solid ${checkIn ? S.accent : S.border}`, backgroundColor: 'rgba(0,0,0,0.2)' }}>
                  <p style={{ fontFamily: S.inter, fontSize: '0.75rem', color: S.accent, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Check-in</p>
                  <p style={{ fontFamily: S.playfair, fontSize: '1.125rem', color: checkIn ? S.bone : S.muted }}>
                    {checkIn ? formatDate(checkIn) : 'Select date'}
                  </p>
                </div>
                <div style={{ padding: '1rem', borderRadius: '0.375rem', border: `1px solid ${checkOut ? S.accent : S.border}`, backgroundColor: 'rgba(0,0,0,0.2)' }}>
                  <p style={{ fontFamily: S.inter, fontSize: '0.75rem', color: S.accent, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Check-out</p>
                  <p style={{ fontFamily: S.playfair, fontSize: '1.125rem', color: checkOut ? S.bone : S.muted }}>
                    {checkOut ? formatDate(checkOut) : 'Select date'}
                  </p>
                </div>
              </div>

              <Calendar
                unavailableDates={unavailableDates}
                checkIn={checkIn}
                checkOut={checkOut}
                onSelectDate={handleDateSelect}
                loading={availabilityLoading}
              />

              {checkIn && checkOut && (
                <div style={{ marginTop: '1rem', padding: '0.75rem 1rem', borderRadius: '0.375rem', backgroundColor: 'rgba(143,169,179,0.08)', border: `1px solid rgba(143,169,179,0.2)` }}>
                  <p style={{ fontFamily: S.inter, fontSize: '0.875rem', color: S.accent }}>
                    {nights} night{nights !== 1 ? 's' : ''} selected
                    {nights < 2 && <span style={{ color: '#e87878', marginLeft: '0.5rem' }}> (minimum 2 nights)</span>}
                  </p>
                </div>
              )}
            </Section>

            {/* Packages */}
            <Section title="Signature Packages" subtitle="Select a package and we will confirm details and arrange everything before your arrival.">
              {packages.map(pkg => (
                <CheckboxItem
                  key={pkg.id}
                  id={pkg.id}
                  name={pkg.name}
                  description={pkg.description}
                  price={pkg.price}
                  checked={selectedPackage === pkg.id}
                  onChange={() => setSelectedPackage(selectedPackage === pkg.id ? null : pkg.id)}
                />
              ))}
            </Section>

            {/* Experiences */}
            <Section title="Experiences" subtitle="Select anything you would like more information on and we will be in touch before your arrival.">
              {experiences.map(exp => (
                <CheckboxItem
                  key={exp.id}
                  id={exp.id}
                  name={exp.name}
                  description={exp.description}
                  note={exp.note}
                  checked={selectedExperiences.includes(exp.id)}
                  onChange={() => toggle(exp.id, setSelectedExperiences)}
                />
              ))}
            </Section>

            {/* Provisions */}
            <Section title="Provisions" subtitle="Add-ons available to order. Request at least 48 hours before arrival.">
              {provisions.map(prov => (
                <CheckboxItem
                  key={prov.id}
                  id={prov.id}
                  name={prov.name}
                  description={prov.description}
                  price={prov.price}
                  checked={selectedProvisions.includes(prov.id)}
                  onChange={() => toggle(prov.id, setSelectedProvisions)}
                />
              ))}
            </Section>

            {/* Celebrations */}
            <Section title="Celebrations" subtitle="For proposals, anniversaries, or a reason you made up.">
              {celebrations.map(cel => (
                <CheckboxItem
                  key={cel.id}
                  id={cel.id}
                  name={cel.name}
                  description={cel.description}
                  price={cel.price}
                  checked={selectedCelebrations.includes(cel.id)}
                  onChange={() => toggle(cel.id, setSelectedCelebrations)}
                />
              ))}
            </Section>

            {/* Your Details */}
            <Section title="Your Details">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {[
                  { key: 'firstName', label: 'First Name', placeholder: 'First name', type: 'text' },
                  { key: 'lastName', label: 'Last Name', placeholder: 'Last name', type: 'text' },
                  { key: 'email', label: 'Email Address', placeholder: 'your@email.com', type: 'email' },
                  { key: 'phone', label: 'Phone (Optional)', placeholder: '+61', type: 'tel' },
                ].map(field => (
                  <div key={field.key}>
                    <label style={{ fontFamily: S.inter, fontSize: '0.8rem', color: S.muted, display: 'block', marginBottom: '0.375rem' }}>{field.label}</label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={(form as any)[field.key]}
                      onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                      style={{
                        width: '100%', padding: '0.625rem 0.875rem',
                        backgroundColor: 'rgba(0,0,0,0.3)', border: `1px solid ${S.border}`,
                        borderRadius: '0.375rem', color: S.bone,
                        fontFamily: S.inter, fontSize: '0.95rem', outline: 'none',
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className="mb-4">
                <label style={{ fontFamily: S.inter, fontSize: '0.8rem', color: S.muted, display: 'block', marginBottom: '0.375rem' }}>Voucher / Promo Code</label>
                <input
                  type="text"
                  placeholder="e.g. GO DARK"
                  value={form.voucher}
                  onChange={e => setForm(f => ({ ...f, voucher: e.target.value }))}
                  style={{
                    width: '100%', padding: '0.625rem 0.875rem',
                    backgroundColor: 'rgba(0,0,0,0.3)', border: `1px solid ${S.border}`,
                    borderRadius: '0.375rem', color: S.bone,
                    fontFamily: S.inter, fontSize: '0.95rem', outline: 'none',
                  }}
                />
              </div>
              <div>
                <label style={{ fontFamily: S.inter, fontSize: '0.8rem', color: S.muted, display: 'block', marginBottom: '0.375rem' }}>Anything else we should know?</label>
                <textarea
                  rows={4}
                  placeholder="Dietary requirements, special occasions, access needs..."
                  value={form.notes}
                  onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                  style={{
                    width: '100%', padding: '0.625rem 0.875rem', resize: 'none',
                    backgroundColor: 'rgba(0,0,0,0.3)', border: `1px solid ${S.border}`,
                    borderRadius: '0.375rem', color: S.bone,
                    fontFamily: S.inter, fontSize: '0.95rem', outline: 'none',
                  }}
                />
              </div>
            </Section>

            {/* Go Dark reminder */}
            <div style={{ backgroundColor: S.bgDark, borderRadius: '0.5rem', border: `1px solid rgba(143,169,179,0.3)`, padding: '1.5rem', marginBottom: '1.5rem' }}>
              <p style={{ fontFamily: S.inter, fontSize: '0.7rem', color: S.accent, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem', fontWeight: 600 }}>Winter Offer</p>
              <h3 style={{ fontFamily: S.playfair, fontSize: '1.5rem', color: S.bone, marginBottom: '0.5rem' }}>Go Dark</h3>
              <p style={{ fontFamily: S.inter, fontSize: '0.9rem', color: S.muted, lineHeight: '1.7', marginBottom: '0.75rem' }}>
                3 nights midweek. June, July, August. $1,500 flat rate. Direct booking only.
              </p>
              <p style={{ fontFamily: S.inter, fontSize: '0.85rem', color: S.accent, fontStyle: 'italic' }}>
                Enter <strong style={{ color: S.bone, fontStyle: 'normal' }}>GO DARK</strong> in the voucher field above to claim.
              </p>
            </div>

          </div>

          {/* RIGHT COLUMN - Summary */}
          <div>
            <div style={{ position: 'sticky', top: '6rem', backgroundColor: S.bgDark, borderRadius: '0.5rem', border: `1px solid rgba(143,169,179,0.3)`, padding: '2rem' }}>
              <h4 style={{ fontFamily: S.playfair, fontSize: '1.25rem', color: S.bone, marginBottom: '1.5rem' }}>Summary</h4>

              {checkIn && checkOut ? (
                <div style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: `1px solid ${S.border}` }}>
                  <p style={{ fontFamily: S.inter, fontSize: '0.8rem', color: S.accent, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Dates</p>
                  <p style={{ fontFamily: S.inter, fontSize: '0.9rem', color: S.bone }}>{formatDate(checkIn)}</p>
                  <p style={{ fontFamily: S.inter, fontSize: '0.8rem', color: S.muted, margin: '0.125rem 0' }}>to</p>
                  <p style={{ fontFamily: S.inter, fontSize: '0.9rem', color: S.bone }}>{formatDate(checkOut)}</p>
                  <p style={{ fontFamily: S.inter, fontSize: '0.85rem', color: S.accent, marginTop: '0.375rem' }}>{nights} nights</p>
                </div>
              ) : (
                <p style={{ fontFamily: S.inter, fontSize: '0.875rem', color: S.muted, fontStyle: 'italic', marginBottom: '1.5rem' }}>No dates selected yet.</p>
              )}

              {hasAddOns && (
                <div style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: `1px solid ${S.border}` }}>
                  <p style={{ fontFamily: S.inter, fontSize: '0.8rem', color: S.accent, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>Add-ons</p>
                  {selectedPackage && (
                    <p style={{ fontFamily: S.inter, fontSize: '0.85rem', color: S.bone, marginBottom: '0.25rem' }}>
                      {packages.find(p => p.id === selectedPackage)?.name}
                    </p>
                  )}
                  {selectedExperiences.map(id => (
                    <p key={id} style={{ fontFamily: S.inter, fontSize: '0.85rem', color: S.bone, marginBottom: '0.25rem' }}>
                      {experiences.find(e => e.id === id)?.name}
                    </p>
                  ))}
                  {selectedProvisions.map(id => (
                    <p key={id} style={{ fontFamily: S.inter, fontSize: '0.85rem', color: S.bone, marginBottom: '0.25rem' }}>
                      {provisions.find(p => p.id === id)?.name}
                    </p>
                  ))}
                  {selectedCelebrations.map(id => (
                    <p key={id} style={{ fontFamily: S.inter, fontSize: '0.85rem', color: S.bone, marginBottom: '0.25rem' }}>
                      {celebrations.find(c => c.id === id)?.name}
                    </p>
                  ))}
                </div>
              )}

              <p style={{ fontFamily: S.inter, fontSize: '0.8rem', color: S.muted, lineHeight: '1.6', marginBottom: '1.5rem' }}>
                Accommodation is paid on the next step. Add-ons are confirmed and invoiced separately before your arrival.
              </p>

              {error && (
                <div style={{ padding: '0.75rem', borderRadius: '0.375rem', backgroundColor: 'rgba(232,120,120,0.1)', border: '1px solid rgba(232,120,120,0.3)', marginBottom: '1rem' }}>
                  <p style={{ fontFamily: S.inter, fontSize: '0.85rem', color: '#e87878', lineHeight: '1.5' }}>{error}</p>
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={submitting || !checkIn || !checkOut || nights < 2}
                style={{
                  width: '100%', padding: '0.875rem',
                  backgroundColor: (!checkIn || !checkOut || nights < 2) ? 'rgba(143,169,179,0.3)' : S.accent,
                  color: S.bgDark,
                  border: 'none', borderRadius: '0.375rem',
                  fontFamily: S.inter, fontSize: '0.95rem', fontWeight: 600,
                  cursor: (!checkIn || !checkOut || nights < 2 || submitting) ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                }}
              >
                {submitting ? (
                  <>
                    <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
                    Processing...
                  </>
                ) : 'Proceed to Payment'}
              </button>

              <p style={{ fontFamily: S.inter, fontSize: '0.75rem', color: S.muted, textAlign: 'center', marginTop: '0.75rem', lineHeight: '1.5' }}>
                You will be redirected to a secure payment page to complete your booking.
              </p>

              <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: `1px solid ${S.border}` }}>
                <p style={{ fontFamily: S.inter, fontSize: '0.8rem', color: S.muted, lineHeight: '1.6' }}>
                  Questions? <a href="mailto:stay@rockyhillsretreat.com.au" style={{ color: S.accent }}>stay@rockyhillsretreat.com.au</a>
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
