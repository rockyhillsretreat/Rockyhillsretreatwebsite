import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Check } from 'lucide-react';

interface ExtraOption {
  id: string;
  type: string;
  name: string;
  description: string;
  price?: string;
}

const OPTIONS: ExtraOption[] = [
  {
    id: 'pkg-air-rest',
    type: 'Package',
    name: 'In the Air, Then at Rest',
    description: 'Scenic helicopter flight, couples massage, Huon pine bath.',
    price: 'From $5,500',
  },
  {
    id: 'exp-fishing',
    type: 'Experience',
    name: 'Fishing Charter',
    description: 'Half day on Great Oyster Bay with a local skipper.',
  },
  {
    id: 'exp-kayaking',
    type: 'Experience',
    name: 'Sea Kayaking',
    description: 'Guided kayaking along the Freycinet coastline.',
  },
  {
    id: 'prov-fruit',
    type: 'Provision',
    name: 'Fruit Box',
    description: 'Seasonal fruit, ready on arrival.',
    price: '$35',
  },
  {
    id: 'prov-veg',
    type: 'Provision',
    name: 'Vegetable Box',
    description: 'Seasonal vegetables, ready on arrival.',
    price: '$45',
  },
  {
    id: 'prov-charcuterie',
    type: 'Provision',
    name: 'Charcuterie Box',
    description: 'Tasmanian cheeses, local charcuterie, sourdough, olives, honey and crackers, laid out and ready to graze.',
    price: '$185',
  },
  {
    id: 'cel-picnic',
    type: 'Celebration',
    name: 'Beach Picnic Setup',
    description: 'Hamper assembled from local producers, set up on the beach before you arrive.',
  },
  {
    id: 'cel-photo',
    type: 'Celebration',
    name: 'Private Photographer',
    description: 'A half day session on the property and surrounding headland.',
  },
];

export function ExtrasPage() {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get('booking_id') || '';
  const guest = searchParams.get('guest') || '';
  const arrival = searchParams.get('arrival') || '';
  const guestEmail = searchParams.get('email') || '';

  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const toggle = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleSubmit = async () => {
    if (selected.size === 0) return;
    setSubmitting(true);
    setError('');
    try {
      const selections = OPTIONS
        .filter(o => selected.has(o.id))
        .map(o => ({ type: o.type, name: o.name }));
      const res = await fetch('/api/request-extras', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId, guest, arrival, guestEmail, selections }),
      });
      if (!res.ok) throw new Error('Request failed');
      setSubmitted(true);
    } catch (e) {
      setError('Something went wrong sending that. Please call or text +61 499 645 344 and we will sort it directly.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#26333A' }}>
        <div className="max-w-[700px] mx-auto px-6 pt-40 pb-24 text-center">
          <div
            style={{
              width: 64, height: 64, borderRadius: '50%',
              backgroundColor: 'rgba(143, 169, 179, 0.15)',
              border: '2px solid #8FA9B3',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 2rem',
            }}
          >
            <Check size={28} style={{ color: '#8FA9B3' }} />
          </div>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              color: '#EDE9E3',
              letterSpacing: '-0.01em',
              marginBottom: '1.5rem',
            }}
          >
            Thank you.
          </h1>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1.05rem',
              color: '#EDE9E3',
              lineHeight: '1.8',
              marginBottom: '1rem',
            }}
          >
            We've received your request and will be in touch to confirm details before you arrive.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#26333A' }}>
      <div className="max-w-[700px] mx-auto px-6 pt-32 pb-24">
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.7rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#8FA9B3',
            marginBottom: '1rem',
            textAlign: 'center',
          }}
        >
          Rocky Hills Retreat
        </p>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.2rem, 4.5vw, 3rem)',
            color: '#EDE9E3',
            letterSpacing: '-0.01em',
            marginBottom: '1rem',
            textAlign: 'center',
          }}
        >
          Add to your stay{guest ? `, ${guest}` : ''}
        </h1>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '1rem',
            color: '#B8AE9F',
            lineHeight: '1.8',
            marginBottom: '3rem',
            textAlign: 'center',
          }}
        >
          Select anything you would like added to your stay. All items are subject to availability — please allow at least 5 days before arrival. No payment is taken now, we will be in touch to confirm.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {OPTIONS.map(option => {
            const isSelected = selected.has(option.id);
            return (
              <button
                key={option.id}
                onClick={() => toggle(option.id)}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  textAlign: 'left',
                  padding: '1.25rem 1.5rem',
                  borderRadius: '4px',
                  border: isSelected ? '1px solid #8FA9B3' : '1px solid rgba(237,233,227,0.15)',
                  backgroundColor: isSelected ? 'rgba(143,169,179,0.1)' : 'rgba(255,255,255,0.02)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                <div
                  style={{
                    width: 20, height: 20, borderRadius: '3px', flexShrink: 0, marginTop: '2px',
                    border: isSelected ? '1px solid #8FA9B3' : '1px solid rgba(237,233,227,0.3)',
                    backgroundColor: isSelected ? '#8FA9B3' : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  {isSelected && <Check size={13} style={{ color: '#1E2E38' }} />}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8FA9B3', marginBottom: '4px' }}>
                    {option.type}
                  </p>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', color: '#EDE9E3', marginBottom: '4px' }}>
                    {option.name}
                  </p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.85rem', color: '#B8AE9F', lineHeight: '1.5' }}>
                    {option.description}{option.price ? ` ${option.price}.` : ''}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
        {error && (
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.9rem', color: '#D9A9A9', marginTop: '1.5rem', textAlign: 'center' }}>
            {error}
          </p>
        )}
        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <button
            onClick={handleSubmit}
            disabled={selected.size === 0 || submitting}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.85rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: selected.size === 0 ? 'rgba(30,46,56,0.5)' : '#1E2E38',
              backgroundColor: selected.size === 0 ? 'rgba(143,169,179,0.4)' : '#8FA9B3',
              padding: '0.9rem 2.5rem',
              borderRadius: '2px',
              border: 'none',
              cursor: selected.size === 0 ? 'default' : 'pointer',
            }}
          >
            {submitting ? 'Sending...' : `Request selected${selected.size ? ` (${selected.size})` : ''}`}
          </button>
        </div>
      </div>
    </div>
  );
}
