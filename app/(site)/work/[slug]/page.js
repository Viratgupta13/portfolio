import { notFound } from 'next/navigation';
import { cases, site } from '@/lib/data';

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const c = cases.find((x) => x.slug === slug);
  return c ? { title: `${c.title} — Virat Gupta`, description: c.lede } : {};
}

export default async function WriteUp({ params }) {
  const { slug } = await params;
  const i = cases.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const c = cases[i];
  const next = cases[(i + 1) % cases.length];
  return (
    <main className="wu">
      <section>
        <div className="wrap">
          <a className="wu__back reveal" href="/#work">← All work</a>
          <p className="case__no reveal" style={{ marginTop: '1.5rem' }}>{c.no} / {c.kind}</p>
          <h1 className="reveal">{c.title}</h1>
          <p className="wu__tag reveal">{c.tag}</p>
          {c.award && <p className="case__award reveal">{c.award}</p>}
          <div className="wu__nums reveal">
            {c.nums.map(([n, l]) => <div className="wu__num" key={l}><b>{n}</b><span>{l}</span></div>)}
          </div>
        </div>
      </section>
      <section>
        <div className="wrap wu__body">
          <div>
            <div className="section__head reveal"><p className="eyebrow">Highlights</p></div>
            <ul className="job__points reveal">
              {c.highlights.map((h, k) => <li key={k} dangerouslySetInnerHTML={{ __html: h }} />)}
            </ul>
            <div className="s-chips reveal">{c.chips.map((x) => <span className="s-chip" key={x}>{x}</span>)}</div>
            {c.links.length > 0 && (
              <div className="wu__links reveal">
                {c.links.map((l) => <a key={l.u} href={l.u} target="_blank" rel="noopener noreferrer">{l.t} <span aria-hidden="true">↗</span></a>)}
              </div>
            )}
            {c.note && <p className="wu__note reveal"><b>Honest limits.</b> {c.note}</p>}
          </div>
          <div className="wu__shots">
            {(c.video || c.shots.length > 0) && (
              <div className={`case__shot reveal${c.shots.length > 1 ? ' multi' : ''}`} style={{ aspectRatio: c.shots.length > 1 ? '4/3' : '16/10' }}>
                {c.video ? <video src={c.video} autoPlay muted loop playsInline preload="metadata" /> : c.shots.map((s) => <img key={s} src={s} alt="" />)}
              </div>
            )}
            {c.gallery.map((g) => <div className="case__shot reveal" key={g} style={{ aspectRatio: 'auto' }}><img src={g} alt="" /></div>)}
          </div>
        </div>
      </section>
      <section>
        <div className="wrap wu__next reveal">
          <a className="case__go" href="/#work">← Back to work</a>
          <a className="case__go" href={`/work/${next.slug}`}>Next: {next.title} <span aria-hidden="true">→</span></a>
        </div>
      </section>
    </main>
  );
}
