export function PoliciesPage() {
  const S = {
    bg: '#26333A', bgCard: '#2E3D45', accent: '#8FA9B3',
    bone: '#EDE9E3', muted: '#B8AE9F', border: 'rgba(143, 169, 179, 0.2)',
    playfair: "'Playfair Display', serif", inter: "'Inter', sans-serif",
  };

  const sections = [
    {
      title: 'Who Can Stay',
      body: `A maximum of 2 overnight guests are permitted. Children may be accommodated by prior arrangement — please contact us before booking to discuss. Pets are not permitted. Should you wish to invite a small number of day visitors (up to 4 additional people) please check with us first.\n\nAll guests must be 18 years of age or older unless accompanied by a parent or legal guardian.`,
    },
    {
      title: 'Getting Here',
      body: `The property is accessed via a 2km unsealed gravel driveway which may be rough, uneven and challenging for first-time visitors, particularly after rain. A standard sedan is suitable. Low-clearance vehicles, sports cars and large vehicles are not recommended. Rocky Hills Retreat accepts no liability for any vehicle damage sustained on the driveway.\n\nIf the Tasmanian Fire Service declares a fire danger rating of Extreme or Catastrophic on your arrival day, we will assist you to find alternative accommodation in Swansea and your tariff for that day will be refunded in full.`,
    },
    {
      title: 'Check-in and Check-out',
      body: `Check-in is from 2pm. Check-out is strictly 10am.\n\nEarly check-in or late check-out may be available on request, subject to availability. Failure to check out by 10am without prior arrangement may result in an additional night's charge.`,
    },
    {
      title: 'Payment',
      body: `Full payment is required at the time of booking. Any additional charges (including items consumed from The Store) will be invoiced after check-out and charged to the card on file.\n\nAll prices are in Australian dollars and include GST where applicable.`,
    },
    {
      title: 'Cancellation',
      body: `Cancellations 31 or more days before arrival: full refund less a $150 cancellation fee.\n\nCancellations within 30 days of arrival, non-arrivals and postponements made within 30 days: no refund.\n\nCancellations must be submitted in writing to stay@rockyhillsretreat.com.au. The cancellation date is the date the written request is received.\n\nWe strongly recommend comprehensive travel insurance that covers accommodation cancellation.`,
    },
    {
      title: 'Property Hazards and Assumption of Risk',
      body: `Rocky Hills Retreat is a working property in a natural bushland setting. By booking, guests acknowledge and accept that the property contains inherent risks including but not limited to:\n\n- The outdoor deck and platform areas are elevated and do not have full perimeter railings. Guests must exercise appropriate care, particularly at night or in wet conditions.\n- The outdoor Huon pine bath is filled with hot water. Guests are solely responsible for safe use of the bath including monitoring water temperature before entering.\n- The wood-burning fireplace involves open flame. Guests must not leave fires unattended and must ensure fires are fully extinguished before leaving the property or retiring.\n- The property sits within 250 acres of dry sclerophyll bushland. During periods of elevated fire danger, guests must monitor Tasmanian Fire Service ratings and follow all official advice.\n- The driveway and surrounding land contain uneven terrain, rocky surfaces, steep gradients and natural hazards. Guests explore the property at their own risk.\n- Native wildlife including snakes may be present on the property. Guests must not approach, handle or interfere with wildlife.\n- The property is in a remote location. Emergency services response times may be longer than in metropolitan areas.\n\nGuests with mobility limitations, medical conditions or other considerations that may be relevant to safe enjoyment of the property are encouraged to contact us prior to booking.`,
    },
    {
      title: 'Off-Grid Systems',
      body: `Rocky Hills Retreat operates entirely off-grid. All power is generated on site through a solar and battery storage system. Guests acknowledge that:\n\n- Power availability may be affected by weather conditions, battery capacity and usage. Occasional interruptions to power supply do not constitute a breach of these terms and do not entitle guests to a refund.\n- Water is harvested rainwater, filtered and safe to drink. In the event of an extended dry period, water conservation measures may be requested.\n- The septic waste system requires that only appropriate materials are disposed of via the toilet and drains. Guests will be liable for any costs arising from misuse of the septic system.\n- Satellite internet is provided as a courtesy. Connectivity and speed are not guaranteed and outages do not constitute a breach of these terms.\n- Mobile phone reception is limited in the area. Telstra performs best. Guests should not rely on mobile connectivity for emergency communication and should ensure they are familiar with the location of the property's landline or satellite communication device on arrival.`,
    },
    {
      title: 'Leaving the Retreat',
      body: `It is a condition of your stay that you leave the retreat in the same condition you found it. If additional cleaning is required or damage has occurred, you will be charged accordingly. Alterity Ventures Pty Ltd reserves the right to charge the card on file for any such costs.\n\nBefore you leave:\n- Stack the dishwasher and turn it on\n- Remove all rubbish to the bins in the car park behind the besser brick wall\n- Return all furniture to its original position. Lift furniture when moving to avoid floor damage\n- Smoke outdoors only, and dispose of cigarette butts in the receptacles provided\n- Do not throw food scraps outside\n- Ensure the fire is fully extinguished\n- Ensure the outdoor bath fire is fully extinguished and the area is clear`,
    },
    {
      title: 'Wildlife and Conservation',
      body: `The property is subject to a permanent Conservation Covenant over 115.5 hectares. This is a legally binding instrument under Tasmanian law. Guests must not:\n\n- Disturb, feed, handle or interfere with native wildlife\n- Remove plants, rocks, timber, soil or any natural materials from the property\n- Light fires outside designated areas\n- Bring or use pesticides, herbicides, poisons or chemicals on the property\n- Use the property for hunting or trapping of any kind\n\nViolation of Conservation Covenant conditions may result in legal liability for the guest.`,
    },
    {
      title: 'Force Majeure',
      body: `Rocky Hills Retreat will not be liable for failure to provide accommodation where this is caused by circumstances beyond our reasonable control, including but not limited to natural disasters, fire, flood, extreme weather, pandemic, government order, road closure or failure of essential services. In such circumstances we will use reasonable endeavours to offer alternative dates or a credit. Refunds in force majeure circumstances are at our discretion.`,
    },
    {
      title: 'Conduct',
      body: `Rocky Hills is a place of quiet. Guests are asked to be mindful of the natural environment at all times. The following are not permitted:\n\n- Events, parties or gatherings beyond the booked guest count\n- Noise that is audible beyond the property boundary between 10pm and 8am\n- Any activity that constitutes a nuisance to neighbouring properties\n- Illegal activities of any kind\n\nAlterity Ventures Pty Ltd reserves the right to terminate a booking without refund where guests engage in conduct that is unlawful, dangerous or in serious breach of these terms.`,
    },
    {
      title: 'Liability',
      body: `To the maximum extent permitted by law, Alterity Ventures Pty Ltd, its directors, employees and agents accept no liability for:\n\n- Personal injury or death sustained on the property or in the course of accessing the property\n- Loss of or damage to personal property\n- Any indirect, consequential or economic loss arising from a stay at the property\n\nNothing in these terms excludes, restricts or modifies any right or remedy, or any guarantee, warranty or condition that cannot be excluded under the Australian Consumer Law or any other applicable legislation.\n\nWhere liability cannot be excluded, our liability is limited to the resupply of the relevant service or the cost of having the service supplied again, at our election.`,
    },
    {
      title: 'Bookings Made on Your Behalf',
      body: `Bookings made by Rocky Hills Retreat staff on a guest's behalf, including bookings made by phone, email or other means, are subject to these terms and conditions in full. Receipt of a booking confirmation constitutes acceptance of these terms.`,
    },
    {
      title: 'Third Party Experiences and Services',
      body: `Rocky Hills Retreat may facilitate the arrangement of third party experiences and services on behalf of guests, including but not limited to scenic flights, fishing charters, massage therapy, guided foraging, wine trail tours and hire car delivery.

In facilitating these arrangements, Rocky Hills Retreat acts as agent only. The third party operator is solely responsible for the delivery of the experience or service. Rocky Hills Retreat accepts no liability for any injury, loss, damage, cancellation or failure to perform by any third party operator.

Third party experiences are subject to availability, weather and the third party operator's own terms and conditions. Rocky Hills Retreat will use reasonable endeavours to arrange alternatives or refunds where a third party experience cannot proceed, but accepts no liability where this is not possible.

Guests participate in third party experiences entirely at their own risk.`,
    },
    {
      title: 'Disputes',
      body: `In the event of a dispute, guests agree to contact us in the first instance at stay@rockyhillsretreat.com.au to seek resolution. These terms are governed by the laws of Tasmania, Australia. Any dispute that cannot be resolved by agreement will be subject to the exclusive jurisdiction of the courts of Tasmania.`,
    },
    {
      title: 'Privacy',
      body: `Guest information collected during the booking process is used solely for the purposes of managing your reservation and communicating with you about your stay. We handle personal information in accordance with the Australian Privacy Act 1988. We do not sell or share guest data with third parties except where required for the operation of your booking (such as payment processing).`,
    },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: S.bg }}>
      <section className="py-24 px-6">
        <div className="max-w-[900px] mx-auto">

          <h1 style={{ fontFamily: S.playfair, fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: S.bone, letterSpacing: '-0.01em', marginBottom: '0.75rem' }}>
            Terms & Conditions
          </h1>
          <p style={{ fontFamily: S.inter, fontSize: '0.875rem', color: S.muted, marginBottom: '3rem' }}>
            Alterity Ventures Pty Ltd &nbsp;|&nbsp; ABN 11 659 409 588 &nbsp;|&nbsp; Last updated June 2026
          </p>

          <p style={{ fontFamily: S.inter, fontSize: '1.05rem', color: S.bone, lineHeight: '1.8', marginBottom: '3rem' }}>
            Rocky Hills Retreat is a very special place. By booking with us you agree to the following terms and conditions so that it continues to stay that way.
          </p>

          <div>
            {sections.map((section, i) => (
              <div key={i} style={{ padding: '2rem 0', borderBottom: `1px solid ${S.border}` }}>
                <h2 style={{ fontFamily: S.playfair, fontSize: '1.375rem', color: S.bone, marginBottom: '1rem' }}>
                  {section.title}
                </h2>
                {section.body.split('\n').map((para, j) => {
                  if (para.startsWith('- ')) {
                    return (
                      <div key={j} className="flex items-start gap-3" style={{ marginBottom: '0.5rem' }}>
                        <div style={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: S.accent, marginTop: '0.6rem', flexShrink: 0 }} />
                        <p style={{ fontFamily: S.inter, fontSize: '0.95rem', color: S.muted, lineHeight: '1.7' }}>{para.slice(2)}</p>
                      </div>
                    );
                  }
                  return para.trim() ? (
                    <p key={j} style={{ fontFamily: S.inter, fontSize: '0.95rem', color: S.muted, lineHeight: '1.8', marginBottom: '0.75rem' }}>
                      {para}
                    </p>
                  ) : null;
                })}
              </div>
            ))}
          </div>

          <div style={{ marginTop: '3rem', padding: '1.5rem', backgroundColor: S.bgCard, borderRadius: '0.5rem', border: `1px solid ${S.border}` }}>
            <p style={{ fontFamily: S.inter, fontSize: '0.875rem', color: S.muted, lineHeight: '1.7' }}>
              Questions about these terms? Write to us at{' '}
              <a href="mailto:stay@rockyhillsretreat.com.au" style={{ color: S.accent }}>stay@rockyhillsretreat.com.au</a>
              {' '}or call{' '}
              <a href="tel:+61499645344" style={{ color: S.accent }}>+61 499 645 344</a>.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}
