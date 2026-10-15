export function PrivacyPage() {
  const S = {
    bg: '#26333A', bgCard: '#2E3D45', accent: '#8FA9B3',
    bone: '#EDE9E3', muted: '#B8AE9F', border: 'rgba(143, 169, 179, 0.2)',
    playfair: "'Playfair Display', serif", inter: "'Inter', sans-serif",
  };

  const sections = [
    {
      title: 'Who We Are',
      body: `Rocky Hills Retreat is operated by Alterity Ventures Pty Ltd (ABN 11 659 409 588), Rocky Hills, Tasmania. In this policy, "we", "us" and "our" mean Alterity Ventures Pty Ltd trading as Rocky Hills Retreat.\n\nWe handle personal information in line with the Australian Privacy Principles in the Privacy Act 1988 (Cth). This policy explains what we collect, why, and what you can do about it.`,
    },
    {
      title: 'What We Collect',
      body: `We only collect what we need to look after your booking and stay in touch with you. This may include:\n\n- Your name, email address and phone number\n- Booking details such as dates, number of guests, add-ons and any requests you make\n- Your billing address, collected on our payment page\n- Messages you send us through our contact form, by email or by phone\n- Your answers to questions on our forms, such as when you are thinking of travelling\n- Information about how you use our website, such as pages visited and the device and browser you use\n\nWe do not see or store your full card details. Card payments are processed by our payment provider.`,
    },
    {
      title: 'How We Collect It',
      body: `We collect information directly from you when you:\n\n- Make or enquire about a booking on our website or by phone or email\n- Fill in our contact form or sign up to hear from us\n- Submit a form in one of our ads on Facebook or Instagram\n- Book with us through a third party booking platform, which passes your booking details to us\n\nWe also collect some information automatically through cookies and similar technologies when you visit our website. See Cookies and Analytics below.`,
    },
    {
      title: 'How We Use It',
      body: `We use your personal information to:\n\n- Confirm, manage and deliver your booking and any extras you order\n- Process payments, refunds and any additional charges\n- Send you information you have asked for, such as travel guides and arrival details\n- Reply to your questions and requests\n- Send you news and offers from Rocky Hills Retreat, where you have agreed to receive them\n- Understand how people use our website and improve it\n- Measure and improve our advertising\n- Meet our legal, tax and insurance obligations`,
    },
    {
      title: 'Marketing Emails',
      body: `We will only send you marketing emails if you have agreed to receive them or you have stayed with us before. Every marketing email includes an unsubscribe link, and you can also ask us to stop at any time by writing to stay@rockyhillsretreat.com.au.\n\nWe will still send you messages about a booking you have made, even if you unsubscribe from marketing.`,
    },
    {
      title: 'Who We Share It With',
      body: `We do not sell your personal information. We share it only with service providers who help us run the retreat, and only as much as they need. These include:\n\n- Our booking and property management system (OwnerRez)\n- Our payment processor (Stripe)\n- Our email marketing platform (Klaviyo)\n- Our website host (Vercel) and email providers\n- Google and Meta, for website analytics and advertising\n- Our property staff and contractors, who need your name and arrival details to prepare for your stay\n\nWe may also disclose information where the law requires it.`,
    },
    {
      title: 'Overseas Storage',
      body: `Some of our service providers store data outside Australia, mainly in the United States. When we use these providers, we take reasonable steps to make sure they protect your information in a way that is consistent with the Australian Privacy Principles.`,
    },
    {
      title: 'Cookies and Analytics',
      body: `Our website uses cookies and similar technologies, including Google Analytics and the Meta Pixel, managed through Google Tag Manager. These help us understand how visitors use the site and measure whether our ads are working. They may record pages you view, the device you use and actions such as starting a booking.\n\nYou can block or delete cookies in your browser settings. You can also manage how Meta and Google use your information for advertising in your account settings with those services.`,
    },
    {
      title: 'Keeping It Safe',
      body: `We take reasonable steps to protect your personal information from misuse, loss and unauthorised access. We use reputable providers with security measures in place, and we limit access to the people who need it.\n\nWe keep your information only as long as we need it for the purposes above, or as required by law (for example, tax records). After that we delete or de-identify it.`,
    },
    {
      title: 'Accessing and Correcting Your Information',
      body: `You can ask to see the personal information we hold about you, ask us to correct it, or ask us to delete it where we are not required to keep it. Write to us at stay@rockyhillsretreat.com.au and we will respond within 30 days.`,
    },
    {
      title: 'Complaints',
      body: `If you are concerned about how we have handled your personal information, please contact us first at stay@rockyhillsretreat.com.au and we will try to resolve it.\n\nIf you are not satisfied with our response, you can contact the Office of the Australian Information Commissioner at oaic.gov.au. If you live in New Zealand, you can also contact the Office of the Privacy Commissioner at privacy.org.nz.`,
    },
    {
      title: 'Changes to This Policy',
      body: `We may update this policy from time to time. The latest version will always be on this page, with the date it was last updated.`,
    },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: S.bg }}>
      <section className="py-24 px-6">
        <div className="max-w-[900px] mx-auto">

          <h1 style={{ fontFamily: S.playfair, fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: S.bone, letterSpacing: '-0.01em', marginBottom: '0.75rem' }}>
            Privacy Policy
          </h1>
          <p style={{ fontFamily: S.inter, fontSize: '0.875rem', color: S.muted, marginBottom: '3rem' }}>
            Alterity Ventures Pty Ltd &nbsp;|&nbsp; ABN 11 659 409 588 &nbsp;|&nbsp; Last updated October 2026
          </p>

          <p style={{ fontFamily: S.inter, fontSize: '1.05rem', color: S.bone, lineHeight: '1.8', marginBottom: '3rem' }}>
            We collect as little as we can, use it only to look after you, and never sell it.
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
              Questions about your privacy? Write to us at{' '}
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
