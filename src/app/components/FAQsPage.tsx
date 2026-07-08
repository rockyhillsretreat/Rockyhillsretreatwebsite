import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

interface FAQCategory {
  category: string;
  questions: { question: string; answer: string }[];
}

export function FAQsPage() {
  const faqCategories: FAQCategory[] = [
    {
      category: "The Stay",
      questions: [
        {
          question: "How many guests does the retreat accommodate?",
          answer: "Two. Rocky Hills is designed for couples or pairs travelling together. It is not suitable for groups of more than two."
        },
        {
          question: "What is the minimum stay?",
          answer: "Two nights. We recommend three or more to settle in properly."
        },
        {
          question: "What time is check-in and check-out?",
          answer: "Check-in from 2pm. Check-out by 10am. Early check-in or late check-out may be possible. Ask us."
        },
        {
          question: "Is the retreat suitable for children?",
          answer: "Rocky Hills is designed for adults. Children may be accommodated by prior arrangement. Please contact us before booking to discuss."
        },
        {
          question: "Can we bring a pet?",
          answer: "No pets. The property sits in habitat for native wildlife."
        },
        {
          question: "Is the retreat good in winter?",
          answer: "Winter is when Rocky Hills is most itself. The building was designed around thermal mass the concrete and besser block hold the day's warmth well into the night. The wood fire, the gas heater, the Huon pine bath on the deck under a genuinely dark sky. The humpbacks move through Great Oyster Bay from May through July. The East Coast trails are empty. If you want stillness, winter delivers it more completely than summer."
        }
      ]
    },
    {
      category: "The Food",
      questions: [
        {
          question: "Do you provide meals?",
          answer: "All provisions and food packages are delivered to the retreat with full recipes and preparation notes. We like to leave you in peace. Order ahead we'll have everything ready on arrival."
        },
        {
          question: "Can we add provisions after booking?",
          answer: "Yes. Contact us at least 48 hours before arrival to add provisions, experiences, or cellar selections."
        },
        {
          question: "Do you cater for dietary requirements?",
          answer: "Most provisions can be adapted. Let us know when you book and we'll do our best."
        }
      ]
    },
    {
      category: "The Property",
      questions: [
        {
          question: "Is the property really off-grid?",
          answer: "Yes. Solar panels and battery storage supply all power. Water is harvested rainwater. Waste is managed on-site via septic. There is no mains connection of any kind."
        },
        {
          question: "What happens if the power goes out?",
          answer: "The system includes an automatic backup generator that activates if the battery drops below a safe level."
        },
        {
          question: "Is there WiFi?",
          answer: "Yes. Satellite internet is available throughout the retreat. It is blisteringly fast by city standards, and very reliable."
        },
        {
          question: "Is there phone reception?",
          answer: "Patchy. Telstra performs best in the area. Consider this part of the experience."
        },
        {
          question: "How far is the nearest town?",
          answer: "Swansea is a short drive. It has a supermarket, a bottle shop, cafes, and a bakery."
        }
      ]
    },
    {
      category: "The Eco Credentials",
      questions: [
        {
          question: "Whose country is Rocky Hills on?",
          answer: "Rocky Hills sits on the country of the Mumirimina clan of the Oyster Bay Nation, whose language is Paredarerme, and the Big River Nation, whose language is Lairmairrener. These peoples have been the custodians of this land, this coastline, and this water for tens of thousands of years. We acknowledge their continuing connection to country and pay our respects to Elders past and present. This country was never ceded."
        },
        {
          question: "Are you a certified sustainable property?",
          answer: "Not yet, but we are working toward it. The process covers environmental management, energy, water, waste, community, and cultural practices. Our off-grid infrastructure means we already meet a significant portion of the operational criteria."
        },
        {
          question: "Are you carbon neutral?",
          answer: "Not yet. We're working toward it. The off-grid infrastructure means our operational emissions are very low but we're being careful about what we claim and when we claim it."
        },
        {
          question: "Why off-grid?",
          answer: "Because the property sits on country that asks something of you. Off-grid felt like the right response to that. The solar, the rainwater, the septic they're all part of the same logic. You don't extract from a place like this without noticing."
        }
      ]
    }
  ];

  return (
    <div style={{ backgroundColor: '#26333A', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section className="py-24 px-6">
        <div className="max-w-[900px] mx-auto text-center">
          <h1
            className="mb-6"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              color: '#EDE9E3',
              letterSpacing: '-0.01em',
              lineHeight: '1.1'
            }}
          >
            FAQs
          </h1>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1.05rem',
              color: '#EDE9E3',
              lineHeight: '1.8'
            }}
          >
            The questions we get asked most. If yours isn't here, write to us.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="pb-24 px-6">
        <div className="max-w-[900px] mx-auto space-y-12">
          {faqCategories.map((category, index) => (
            <div key={index}>
              <h2
                className="mb-6"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.875rem',
                  color: '#8FA9B3',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase'
                }}
              >
                {category.category}
              </h2>
              <Accordion type="single" collapsible className="space-y-4">
                {category.questions.map((item, qIndex) => (
                  <AccordionItem
                    key={qIndex}
                    value={`item-${index}-${qIndex}`}
                    style={{
                      backgroundColor: '#2E3D45',
                      border: '1px solid rgba(143, 169, 179, 0.2)',
                      borderRadius: '0.5rem',
                      padding: '0 1.5rem'
                    }}
                  >
                    <AccordionTrigger
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '1rem',
                        color: '#EDE9E3',
                        fontWeight: 500,
                        textAlign: 'left'
                      }}
                    >
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.95rem',
                        color: '#B8AE9F',
                        lineHeight: '1.7',
                        paddingTop: '0.5rem',
                        paddingBottom: '1rem'
                      }}
                    >
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-6" style={{ backgroundColor: '#2E3D45' }}>
        <div className="max-w-[900px] mx-auto text-center">
          <h2
            className="mb-6"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 4vw, 2.5rem)',
              color: '#EDE9E3'
            }}
          >
            Still have questions?
          </h2>
          <p
            className="mb-8"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '1.05rem',
              color: '#EDE9E3',
              lineHeight: '1.8'
            }}
          >
            We reply to every enquiry. Write to us.
          </p>
          <Link
            to="/contact"
            style={{
              display: 'inline-block',
              backgroundColor: '#8FA9B3',
              color: '#26333A',
              padding: '0.875rem 2rem',
              borderRadius: '0.5rem',
              fontFamily: "'Inter', sans-serif",
              fontSize: '1rem',
              fontWeight: 500,
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
              transition: 'all 0.3s ease',
              textDecoration: 'none'
            }}
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
