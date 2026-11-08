const phrases = [
  'VEDIC WISDOM',
  'PERSONALIZED GEMSTONES',
  'AUTHENTIC STONES',
  'ENERGY & INTENTION',
  'ASTROLOGICAL GUIDANCE',
  'HANDPICKED GEMSTONES',
  'ANCIENT WISDOM',
  'PERSONALIZED GUIDANCE',
];

export function HeroMarquee() {
  const content = phrases.map((phrase, index) => (
    <span className="hero-marquee-item" key={`${phrase}-${index}`}>
      {phrase}<i aria-hidden="true" />
    </span>
  ));

  return (
    <div className="hero-marquee" aria-label="Astrolaabh gemstone guidance">
      <div className="hero-marquee-track">{content}{content}</div>
    </div>
  );
}
