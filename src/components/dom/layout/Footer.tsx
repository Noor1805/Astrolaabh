export function Footer() {
  return (
    <footer className="relative z-20 border-t border-white/10 bg-brand-dark pt-16 pb-28 px-6 sm:px-12 overflow-hidden">
      {/* Infinite Marquee Ticker */}
      <div className="w-full overflow-hidden whitespace-nowrap pb-12 border-b border-white/5 opacity-40 select-none">
        <div className="inline-block animate-marquee font-display font-bold text-3xl sm:text-5xl tracking-widest text-zinc-600">
          <span>ASTRLABH ARCHITECTURE // BERYLLIUM PLANAR FIDELITY // LIMITED RUN 500 UNITS // </span>
          <span>ASTRLABH ARCHITECTURE // BERYLLIUM PLANAR FIDELITY // LIMITED RUN 500 UNITS // </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 pt-12">
        {/* Brand statement */}
        <div className="md:col-span-2 space-y-4">
          <h3 className="font-display font-bold text-2xl text-white tracking-tight">
            ASTRLABH <span className="text-brand-accent">//</span>
          </h3>
          <p className="font-sans text-sm text-zinc-400 max-w-md leading-relaxed">
            An avant-garde industrial laboratory engineering next-generation sensory hardware at the intersection of precision audio, generative material science, and spatial physics.
          </p>
          <div className="flex items-center gap-4 text-xs font-mono text-zinc-500 pt-2">
            <span>TOKYO</span>
            <span>//</span>
            <span>GENEVA</span>
            <span>//</span>
            <span>SAN FRANCISCO</span>
          </div>
        </div>

        {/* Navigation */}
        <div className="space-y-3 font-mono text-xs">
          <p className="text-white font-bold tracking-widest uppercase">DISCOVER</p>
          <ul className="space-y-2 text-zinc-400">
            <li><a href="#hero" className="hover:text-brand-accent transition-colors">Kinetic-01 Flagship</a></li>
            <li><a href="#narrative" className="hover:text-brand-accent transition-colors">Acoustic Research</a></li>
            <li><a href="#craftsmanship" className="hover:text-brand-accent transition-colors">Titanium Metallurgy</a></li>
            <li><a href="#specs" className="hover:text-brand-accent transition-colors">Diagnostic Suite</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-3 font-mono text-xs">
          <p className="text-white font-bold tracking-widest uppercase">DISPATCH PRIVILEGE</p>
          <p className="text-zinc-400 text-xs font-sans">
            Early allocations and architectural whitepapers released exclusively to subscribers.
          </p>
          <div className="flex gap-2 pt-1">
            <input
              type="email"
              placeholder="COLLECTOR@DOMAIN.COM"
              className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-accent w-full font-mono placeholder:text-zinc-600"
            />
            <button className="bg-white text-black hover:bg-brand-accent transition-colors px-4 py-2 rounded-lg font-bold">
              JOIN
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-zinc-600 pt-16 border-t border-white/5 mt-12 gap-4">
        <span>© 2026 ASTRLABH CREATIVE LAB. ALL DESIGNS REGISTERED.</span>
        <span>ENGINEERED WITH REACT THREE FIBER & THREE.JS</span>
      </div>
    </footer>
  );
}
