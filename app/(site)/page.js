import Words from '@/components/Words';
import HeroScatter from '@/components/HeroScatter';
import { site, skills, jobs, cases, creds } from '@/lib/data';

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
);

export default function Home() {
  return (
    <main>
      <section className="hero" data-hero="true">
        <div className="hero__grid" aria-hidden="true">
          <div className="hero__lines" />
          <div className="hero__glow" />
        </div>
        <div className="hero__light" aria-hidden="true" />
        <div className="wrap hero__inner">
          <p className="eyebrow hero__eyebrow">Bareilly, India</p>
          <h1 className="name">
            <span className="name__line"><span>Virat</span></span>
            <span className="name__line"><span>Gupta</span></span>
          </h1>
          <p className="headline morph" data-morph="true">
            <span className="morph__base">
              <Words text="Full-stack developer building" />{' '}
              <b><Words text="web, mobile & AI-powered products." /></b>
            </span>
            <span className="morph__alt" aria-hidden="true">
              <span className="f-serif">I</span>{' '}
              <span className="f-bold">build things.</span>{' '}
              <span className="f-mono">Some of them</span>{' '}
              <span className="f-script">are</span>{' '}
              <span className="f-serif f-it">even</span>{' '}
              <span className="f-outline">intentional.</span>
            </span>
          </p>
          <div className="hero__actions">
            <a className="cta" href="#work">
              <span className="cta__fill" aria-hidden="true" />
              <span className="cta__text">See the work</span>
              <span className="cta__icon" aria-hidden="true"><Arrow /></span>
            </a>
            <a className="ghost" href="#desk">
              <span className="ghost__dot" aria-hidden="true" />
              There’s a far more fun version of this<span className="ghost__badge">highly recommended</span>
            </a>
          </div>
        </div>
        <HeroScatter />
      </section>

      <section className="about" id="about">
        <div className="wrap">
          <p className="eyebrow about__label reveal">About / 01</p>
          <h2 className="about__title reveal">
            Oh, there&apos;s a <em>person</em> here.
          </h2>

          <div className="about__grid">
            <div className="vg reveal">
              <div className="vg__block">
                <span className="vg__mark">VG<i>.</i></span>
                <span className="vg__cap">The human behind the code</span>
              </div>
              <span className="vg__star" aria-hidden="true">*</span>
            </div>

            <div className="about__copy">
              <p className="about__meta reveal">Full-stack developer · Serial idea collector</p>
              <p className="about__lede reveal">{"I'm Virat. I build web and mobile products, obsess over tiny details, and occasionally turn a straightforward task into an unnecessarily elaborate side quest."}</p>
              <p className="about__body reveal">{"I like the entire process of making things — from the first ‘what if?’ to the part where everything finally works. Somewhere between writing code, fixing bugs, and questioning my own decisions, I'm figuring out what makes software genuinely useful."}</p>
            </div>
          </div>

          <div className="about__off">
            <h3 className="reveal">Outside the terminal?</h3>
            <div className="about__offcopy">
              <p className="reveal">{"Music on repeat. Too many tabs open. Ideas that probably deserve their own Notion page. And a strong belief that not every thought needs to become a startup. (Still working on that last one.)"}</p>
              <ul className="atags reveal" aria-label="A few labels">
                <li className="atag">Music enthusiast</li>
                <li className="atag atag--on">Professional overthinker</li>
                <li className="atag">Serial idea collector</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="skills" id="skills">
        <div className="wrap">
          <div className="section__head reveal"><p className="eyebrow">Toolbox / 02</p><h2>What I build with</h2></div>
          <div className="skills__grid">
            {skills.map((g) => (
              <div className="skillgroup" key={g.group}>
                <h3>{g.group}</h3>
                <div className="s-tools">
                  {g.tools.map((t) => (
                    t.l
                      ? <span className="s-tool" key={t.n}><img src={t.l} alt="" width="30" height="30" loading="lazy" />{t.n}</span>
                      : <span className="s-tool s-tool--text" key={t.n}>{t.n}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="experience">
        <div className="wrap xp__grid">
          <aside className="xp__index">
            <div className="section__head reveal"><p className="eyebrow">Experience / 03</p><h2>Where I've been</h2></div>
            <ol className="xp__list" aria-label="Roles">
              {jobs.map((j, i) => (
                <li key={j.id}>
                  <a className="xp__item" href={`#${j.id}`} data-xp-item="true" data-on={i === 0 ? '1' : '0'}>
                    <span className="xp__bullet" aria-hidden="true" />
                    <span><b>{j.short}</b><span>{j.role} · {j.year}</span></span>
                  </a>
                </li>
              ))}
            </ol>
          </aside>
          <div className="xp__detail">
            {jobs.map((j) => (
              <article className="job reveal" id={j.id} key={j.id} data-job="true" data-open="0">
                <p className="job__when"><b>{j.when}</b>{j.where}</p>
                <h3>
                  <button type="button" className="job__toggle" aria-expanded="false">
                    <span>{j.role} <span className="job__at">— {j.short}</span></span>
                    <span className="job__chev" aria-hidden="true" />
                    <span className="job__sr">Show details</span>
                  </button>
                </h3>
                <div className="job__body">
                  <p className="job__lede">{j.lede}</p>
                  <ul className="job__points">
                    {j.points.map((p, i) => <li key={i} dangerouslySetInnerHTML={{ __html: p }} />)}
                  </ul>
                  <div className="s-chips">{j.chips.map((c) => <span className="s-chip" key={c}>{c}</span>)}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="work" id="work">
        <div className="wrap">
          <div className="section__head reveal">
            <p className="eyebrow">Selected work</p>
            <h2>Four things worth opening</h2>
            <p>Each of these has a full write-up: highlights, stack, screenshots and links.</p>
          </div>
          <div className="cases">
            {cases.map((c) => (
              <article className="case reveal" key={c.slug}>
                <a className={`case__shot${c.shots.length > 1 ? ' multi' : ''}`} data-case-shot="true" tabIndex={-1} aria-hidden="true" href={`/work/${c.slug}`}>
                  {c.video
                    ? <video src={c.video} autoPlay muted loop playsInline preload="metadata" />
                    : c.shots.map((s) => <img key={s} src={s} alt="" loading="lazy" />)}
                </a>
                <div className="case__body">
                  <p className="case__no">{c.no} / {c.kind}</p>
                  <h3>{c.title}</h3>
                  <p className="case__tag">{c.tag}</p>
                  <p className="case__lede">{c.lede}</p>
                  {c.award && <p className="case__award">{c.award}</p>}
                  <div className="s-chips">{c.chips.map((x) => <span className="s-chip" key={x}>{x}</span>)}</div>
                  <a className="case__go" href={`/work/${c.slug}`}>Read the write-up <span aria-hidden="true">→</span></a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="section__head reveal"><p className="eyebrow">The rest of it</p><h2>Education, awards, certifications</h2></div>
          <div className="creds">
            <div className="cred reveal"><h3>Education</h3><ul>{creds.education.map((e) => <li key={e.b}><b>{e.b}</b><span>{e.s}</span><span>{e.s2}</span></li>)}</ul></div>
            <div className="cred reveal"><h3>Awards</h3><ul>{creds.awards.map((e) => <li key={e.b + e.s}><b>{e.b}</b><span>{e.s}</span></li>)}</ul></div>
            <div className="cred reveal"><h3>Certifications</h3><ul>{creds.certs.map((e) => <li key={e.b}><b>{e.b}</b><span>{e.s}</span></li>)}</ul></div>
          </div>
        </div>
      </section>

      <section className="closer" id="contact" data-closer="true">
        <div className="closer__field" data-closer-field="true" aria-hidden="true" />
        <div className="wrap closer__inner">
          <h2><span>Let's build</span><span>something.</span></h2>
          <p>Open to internships and interesting problems. The fastest way to reach me is email, I answer all of them.</p>
          <a className="closer__mail" href={`mailto:${site.email}`}>{site.email}</a>
          <div className="closer__links">
            <a href={site.github} target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
            <a href={site.resume} download>Résumé <span aria-hidden="true">↓</span></a>
          </div>
          <div className="door" id="desk">
            <div className="door__copy">
              <p className="door__title">Oh, and this page is the boring half.</p>
              <p>The main portfolio is finished. This one is a little less serious. There's a desk you can pan around, windows to drag, a notes wall and a few things hidden away.</p>
              <p>Some of it keeps score. Try not to take that personally.</p>
              <p>There are things here that aren't meant to be obvious. If you find one, you find one.</p>
            </div>
            <div className="door__go">
              <a href="/canvas">Open the canvas <span aria-hidden="true">→</span></a>
              <p className="door__note">Only Desktops supported. This place has a lot going on.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
