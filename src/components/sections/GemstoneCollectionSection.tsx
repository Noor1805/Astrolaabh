import goldSapphire from '../../assets/gold.webp';
import blueSapphire from '../../assets/sapphire.webp';
import ruby from '../../assets/ruby.webp';
import emerald from '../../assets/emerald.webp';

interface Gemstone {
  name: string;
  hindiName: string;
  image: string;
  origin: string;
  planet: string;
  benefits: [string, string, string, string];
  price: string;
}

const availableGemstones: Gemstone[] = [
  {
    name: 'Yellow Sapphire',
    hindiName: 'पुखराज · Pukhraj',
    image: goldSapphire,
    origin: 'Ceylon (Sri Lanka)',
    planet: 'Jupiter (Guru)',
    benefits: ['Prosperity', 'Wisdom', 'Career growth', 'Marriage'],
    price: '₹14,000',
  },
  {
    name: 'Blue Sapphire',
    hindiName: 'नीलम · Neelam',
    image: blueSapphire,
    origin: 'Sri Lanka, Kashmir',
    planet: 'Saturn (Shani)',
    benefits: ['Discipline', 'Good fortune', 'New openings', 'Protection'],
    price: '₹22,000',
  },
  {
    name: 'Ruby',
    hindiName: 'माणिक · Manik',
    image: ruby,
    origin: 'Burma, Mozambique',
    planet: 'Sun (Surya)',
    benefits: ['Leadership', 'Recognition', 'Decisiveness', 'Vitality'],
    price: '₹18,000',
  },
  {
    name: 'Emerald',
    hindiName: 'पन्ना · Panna',
    image: emerald,
    origin: 'Zambia, Colombia',
    planet: 'Mercury (Budh)',
    benefits: ['Intellect', 'Communication', 'Creativity', 'Business'],
    price: '₹16,000',
  },
];

const gemstones = [
  availableGemstones[0],
  availableGemstones[1],
  availableGemstones[2],
  availableGemstones[3],
  availableGemstones[0],
  availableGemstones[1],
  availableGemstones[2],
  availableGemstones[3],
  availableGemstones[0],
];

function GemstoneCard({ gemstone }: { gemstone: Gemstone }) {
  return (
    <article className="collection-card">
      <div className="collection-card-image">
        <img src={gemstone.image} alt={gemstone.name} loading="lazy" decoding="async" />
        <span aria-hidden="true" />
      </div>
      <div className="collection-card-content">
        <header className="collection-card-heading">
          <h3>{gemstone.name}</h3>
          <p>{gemstone.hindiName}</p>
        </header>

        <dl className="collection-card-meta">
          <div><dt>Origin</dt><dd>{gemstone.origin}</dd></div>
          <div><dt>Planet</dt><dd>{gemstone.planet}</dd></div>
        </dl>

        <div className="collection-card-benefits">
          <h4>Worn for</h4>
          <ul>
            {gemstone.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
          </ul>
        </div>

        <div className="collection-card-footer">
          <p><span>from</span> <strong>{gemstone.price}</strong></p>
          <a href="#appointment" aria-label={`View ${gemstone.name} and book a consultation`}>View <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </article>
  );
}

export function GemstoneCollectionSection() {
  return (
    <section id="gemstone-collection" className="gemstone-collection" aria-labelledby="gemstone-collection-heading">
      <header className="collection-heading">
        <p className="collection-eyebrow">Graha Ratna · The Nine</p>
        <h2 id="gemstone-collection-heading">What Each Stone Is Worn For</h2>
        <p className="collection-description">
          Nine sacred gemstones, nine planetary energies.
          <span>Discover their origin, ruling planet, and the unique benefits they bring.</span>
        </p>
        <div className="collection-divider" aria-hidden="true"><span /><i /><span /></div>
      </header>

      <div className="collection-grid">
        {gemstones.map((gemstone, index) => <GemstoneCard gemstone={gemstone} key={`${gemstone.name}-${index}`} />)}
      </div>

      <a className="collection-all-link" href="#appointment">View all stones <span aria-hidden="true">→</span></a>
    </section>
  );
}

export default GemstoneCollectionSection;
