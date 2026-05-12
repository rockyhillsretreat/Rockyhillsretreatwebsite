import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ChevronRight, Clock } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
const heroImg = 'https://res.cloudinary.com/dfvjhslxp/image/upload/land-detail-driftwood-rock.jpg';


const entries = [
  {
    date: "August 2025",
    title: "The Shape of Winter Light",
    content: [
      "The coast changes in winter. The sea darkens. The wind carries salt further inland.",
      "At dusk, the granite holds warmth longer than the air. You notice small things here.",
      "Silence becomes less empty and more alive."
    ]
  },
  {
    date: "July 2025",
    title: "Arrival",
    content: [
      "Most guests arrive just before dark.",
      "The final stretch of road slows people down. By the time they reach the retreat, the city has already started to fall away."
    ]
  }
];


export function JournalPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div style={{ backgroundColor: '#26333A', minHeight: '100vh' }}>
      {/* Hero */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={heroImg}
            alt="Journal"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(38, 51, 58, 0.4), rgba(38, 51, 58, 0.7))'
            }}
          />
        </div>
        <div className="relative h-full flex items-end justify-center px-6 pb-16">
          <div className="max-w-4xl text-center">
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                color: '#EDE9E3',
                letterSpacing: '-0.01em',
                lineHeight: '1.1'
              }}
            >
              Journal
            </h1>
          </div>
        </div>
      </section>

      {/* Journal Entries */}
      <section className="py-24 px-6">
        <div className="max-w-[900px] mx-auto space-y-20">
          {entries.map((entry, index) => (
            <article
              key={index}
              className="pb-20"
              style={{
                borderBottom: index < entries.length - 1 ? '1px solid rgba(143, 169, 179, 0.2)' : 'none'
              }}
            >
              <p
                className="mb-3"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.875rem',
                  color: '#8FA9B3',
                  fontWeight: 500,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase'
                }}
              >
                {entry.date}
              </p>
              <h2
                className="mb-8"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                  color: '#EDE9E3',
                  lineHeight: '1.2'
                }}
              >
                {entry.title}
              </h2>
              <div className="space-y-6">
                {entry.content.map((paragraph, i) => (
                  <p
                    key={i}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '1.05rem',
                      color: '#EDE9E3',
                      lineHeight: '1.8'
                    }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6" style={{ backgroundColor: '#2E3D45' }}>
        <div className="max-w-[900px] mx-auto text-center">
          <p
            className="mb-8"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1.05rem',
              color: '#EDE9E3',
              lineHeight: '1.8',
              fontStyle: 'italic'
            }}
          >
            Notes from the headland. Reflections on place, season, and the practice of doing less.
          </p>
        </div>
      </section>
    </div>
  );
}
