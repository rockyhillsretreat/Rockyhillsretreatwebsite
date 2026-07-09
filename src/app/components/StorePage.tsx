import { useEffect, useState } from 'react';

interface Item {
  name: string;
  description: string;
  price: string;
}

interface SupplierGroup {
  supplier: string;
  items: Item[];
}

interface Section {
  category: string;
  suppliers: SupplierGroup[];
}

export function StorePage() {
  const [sections, setSections] = useState<Section[] | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/store-list')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load');
        return res.json();
      })
      .then(data => setSections(data.sections))
      .catch(() => setError('Could not load the store list right now. Please call or text +61 499 645 344 and we will send it directly.'));
  }, []);

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
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            color: '#EDE9E3',
            letterSpacing: '-0.01em',
            marginBottom: '1rem',
            textAlign: 'center',
          }}
        >
          The Store
        </h1>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '1rem',
            color: '#B8AE9F',
            lineHeight: '1.8',
            marginBottom: '3.5rem',
            textAlign: 'center',
          }}
        >
          Everything below is available in the fridge, freezer and pantry. No pre-ordering required. Items are settled at check-out. If it's not listed here, it's complimentary.
        </p>

        {error && (
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.95rem', color: '#D9A9A9', textAlign: 'center' }}>
            {error}
          </p>
        )}

        {!sections && !error && (
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.95rem', color: '#B8AE9F', textAlign: 'center' }}>
            Loading...
          </p>
        )}

        {sections?.map(section => (
          <div key={section.category} style={{ marginBottom: '3rem' }}>
            <h2
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.7rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#8FA9B3',
                borderBottom: '1px solid rgba(237,233,227,0.15)',
                paddingBottom: '0.75rem',
                marginBottom: '1.25rem',
              }}
            >
              {section.category}
            </h2>

            {section.suppliers.map(group => (
              <div key={group.supplier} style={{ marginBottom: '1.5rem' }}>
                {group.supplier !== 'Rocky Hills Retreat' && (
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontStyle: 'italic',
                      fontSize: '0.8rem',
                      color: '#8A8478',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {group.supplier}
                  </p>
                )}
                {group.items.map(item => (
                  <div
                    key={item.name}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                      gap: '1rem',
                      padding: '0.5rem 0',
                      borderBottom: '1px solid rgba(237,233,227,0.08)',
                    }}
                  >
                    <div>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.95rem', color: '#EDE9E3' }}>{item.name}</span>
                      {item.description && (
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: '#8A8478', marginLeft: '0.5rem' }}>
                          {item.description}
                        </span>
                      )}
                    </div>
                    <span
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: '0.95rem',
                        color: item.price === 'Complimentary' ? '#8FA9B3' : '#EDE9E3',
                        fontStyle: item.price === 'Complimentary' ? 'italic' : 'normal',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}

        <p
          style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: 'italic',
            fontSize: '1rem',
            color: '#8FA9B3',
            textAlign: 'center',
            marginTop: '2rem',
          }}
        >
          If it's not listed here, it's complimentary.
        </p>
      </div>
    </div>
  );
}
