import { ArrowRight } from 'lucide-react';

const footerGroups = [
  { title: 'Shop', links: ['Gemstones', 'Jewellery', 'Collections', 'Gifting'] },
  { title: 'The House', links: ['Our Story', 'Our Approach', 'Certification', 'Authenticity'] },
  { title: 'Services', links: ['Consult an Astrologer', 'Gemstone Guidance', 'Custom Jewellery', 'Efficacy Meter'] },
  { title: 'Support', links: ['Contact', 'Shipping & Returns', 'FAQs', 'WhatsApp'] },
];

export function Footer() {
  return (
    <footer className="astro-footer">
      <div className="astro-footer-brand">
        <div className="astro-footer-emblem" aria-hidden="true">✦</div>
        <h2>ASTRO LAABH</h2>
        <p>Authentic gemstones, timeless Vedic guidance and personalized recommendations for your individual journey.</p>
        <form className="astro-footer-newsletter" onSubmit={(event) => event.preventDefault()}>
          <span>Stay in the know</span>
          <label>
            <span className="sr-only">Email address</span>
            <input type="email" placeholder="Email address" />
            <button type="submit" aria-label="Subscribe"><ArrowRight /></button>
          </label>
        </form>
      </div>

      <nav className="astro-footer-nav" aria-label="Footer navigation">
        {footerGroups.map((group) => (
          <div key={group.title}>
            <h3>{group.title}</h3>
            <ul>{group.links.map((link) => <li key={link}><a href="#hero">{link}</a></li>)}</ul>
          </div>
        ))}
      </nav>

      <div className="astro-footer-bottom">
        <span>© 2026 Astro Laabh</span>
        <span className="astro-footer-values">Authentic · Beautiful · Energized · Supported</span>
        <div><a href="#hero">Privacy</a><a href="#hero">Terms</a><a href="#hero">Instagram</a></div>
      </div>
    </footer>
  );
}
