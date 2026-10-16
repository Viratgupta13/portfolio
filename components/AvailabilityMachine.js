/* The "availability machine": four words on a slowly turning ring. Each word reveals its own
   alternate phrase on hover (pure CSS :hover), so neighbours never react together. */
const C = 300, R = 205, RI = 150;           // centre, word radius, inner guide radius (viewBox 600)
const pt = (f, r) => [C - r * Math.cos(2 * Math.PI * f), C - r * Math.sin(2 * Math.PI * f)];
const arc = (f1, f2, r) => { const [x1, y1] = pt(f1, r), [x2, y2] = pt(f2, r); return `M ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 ${f2 - f1 > 0.5 ? 1 : 0} 1 ${x2.toFixed(1)} ${y2.toFixed(1)}`; };
const circle = (r) => `M ${C - r} ${C} a ${r} ${r} 0 1 1 ${2 * r} 0 a ${r} ${r} 0 1 1 ${-2 * r} 0`;

/* f = position along the ring (0 = 9 o'clock, clockwise). Sizes differ on purpose: asymmetric, art-directed. */
const WORDS = [
  { id: 'build',  w: 'BUILD',  f: 0.115, from: 0.01, to: 0.225, size: 94, style: 'solid',   alt: ['make something real'] },
  { id: 'ship',   w: 'SHIP',   f: 0.335, from: 0.265, to: 0.405, size: 70, style: 'outline', alt: ['yes, it works'] },
  { id: 'learn',  w: 'LEARN',  f: 0.565, from: 0.47,  to: 0.66,  size: 82, style: 'mixed',   alt: ['read the documentation', '(eventually)'] },
  { id: 'repeat', w: 'REPEAT', f: 0.845, from: 0.755, to: 0.93,  size: 62, style: 'solid',   alt: ['one last iteration'] },
];
const DOTS = [0.25, 0.43, 0.715, 0.965];

export default function AvailabilityMachine() {
  return (
    <div className="mach">
      <svg className="mach__svg" viewBox="0 0 600 600" role="img" aria-label="BUILD, SHIP, LEARN, REPEAT: a ring of words around the label open to what's next">
        <defs>
          <path id="mo" d={circle(R)} />
        </defs>

        {/* hairline guides: the instrument the words sit on */}
        <circle className="mach__guide" cx={C} cy={C} r={RI - 18} />
        <circle className="mach__guide mach__guide--dash" cx={C} cy={C} r={R} />

        <g className="mach__ring">
          {DOTS.map((f) => { const [x, y] = pt(f, R); return <circle key={f} className="mach__dot" cx={x} cy={y} r="5" />; })}

          <text className="mach__mono"><textPath href="#mo" startOffset="43%" textAnchor="middle">2026</textPath></text>
          <text className="mach__mono"><textPath href="#mo" startOffset="68%" textAnchor="middle">BAREILLY, IN</textPath></text>
          <text className="mach__mono"><textPath href="#mo" startOffset="98.5%" textAnchor="middle">(01 — 04)</textPath></text>

          {WORDS.map((k) => (
            <g className={`mach__w mach__w--${k.id}`} key={k.id}>
              <path className="mach__hit" d={arc(k.from, k.to, R - 10)} />
              <text className={`mach__main mach__main--${k.style}`} style={{ fontSize: k.size }}>
                <textPath href="#mo" startOffset={`${k.f * 100}%`} textAnchor="middle">
                  {k.id === 'learn' ? <>L<tspan className="mach__out">E</tspan>ARN</> : k.w}
                </textPath>
              </text>
            </g>
          ))}
        </g>

        {/* alternate phrases: straight and upright, so they stay readable however the ring is turned */}
        {WORDS.map((k) => (
          <text key={k.id} className={`mach__alt mach__alt--${k.id}`} textAnchor="middle">
            {k.alt.map((ln, i) => <tspan key={ln} x={C} y={(k.alt.length === 1 ? 430 : 414) + i * 32}>{ln}</tspan>)}
          </text>
        ))}
      </svg>

      {/* the centre never moves: it is the one thing that has to stay readable */}
      <p className="mach__pill"><span>Open to</span><span>what&apos;s next</span></p>
    </div>
  );
}
