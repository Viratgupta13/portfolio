import Words from '@/components/Words';
import HeroScatter from '@/components/HeroScatter';
import AvailabilityMachine from '@/components/AvailabilityMachine';
import { site, skills, jobs, creds } from '@/lib/data';

/* Selected work: real screenshots / recordings from /public/assets only. One place to rename a project. */
const WORK = [
  {
    slug: 'ledgerly', layout: 'phones', imgs: ['/assets/work-ledgerly-1.jpg', '/assets/work-ledgerly-2.jpg', '/assets/work-ledgerly-3.jpg'], n: '01', name: 'Ledgerly', kind: 'Personal finance app',
    blurb: "Turns your bank and UPI texts into a spending log you only have to review once. For people whose budgeting plan used to be 'vibes'.",
    tags: ['React Native', 'Expo', 'TypeScript', 'Supabase'],
    links: [['Live site', 'https://ledgerly-virat12.vercel.app/'], ['GitHub', 'https://github.com/Viratgupta13/ledgerly']],
  },
  {
    slug: 'saabi', layout: 'wide', imgs: ['/assets/work-saabi-1.jpg', '/assets/work-saabi-2.jpg', '/assets/work-saabi-3.jpg'], n: '02', name: 'SAABI', kind: 'AI breed identification',
    blurb: 'Upload a photo of cattle or a buffalo and it names the breed. Photos that are neither get flagged instead of guessed at.',
    tags: ['Python', 'Computer vision', 'MobileNetV2'],
    award: 'ICAR Shitij Innovation Program — Winner',
    links: [['Live demo', 'https://saabi-qhel.onrender.com/'], ['GitHub', 'https://github.com/Viratgupta13/saabi-cattle-breed-classifier']],
  },
  {
    slug: 'herbal-garden', layout: 'phones', imgs: ['/assets/work-herbify-1.jpg', '/assets/work-herbify-2.jpg', '/assets/work-herbify-3.jpg'], n: '03', name: 'Herbify', kind: 'Virtual herbal garden',
    blurb: 'Browse Ayurvedic herbs, keep a garden of the ones you grow, then quiz yourself. A garden where nothing dies of neglect.',
    tags: ['React Native', 'Expo'],
    links: [['Live demo', 'https://viratgupta13.github.io/herbal-garden/'], ['GitHub', 'https://github.com/Viratgupta13/herbal-garden']],
  },
  {
    slug: 'recallos', layout: 'wide', imgs: ['/assets/work-recallos-1.jpg', '/assets/work-recallos-2.jpg', '/assets/work-recallos-3.jpg'], n: '04', name: 'RecallOS', kind: 'Spaced-repetition app',
    blurb: "Ranks what you're about to forget and quizzes you on it. The frontend is built; the backend is what I'm working on next.",
    tags: ['React 19', 'TypeScript', 'Vite', 'Tailwind 4'],
    status: 'In progress',
    links: [],
  },
];


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
              <p className="about__open reveal"><i aria-hidden="true" /><span><b>Open to</b> full-time roles, internships, and interesting problems.</span></p>
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
          <div className="work__head reveal">
            <p className="eyebrow about__label">Selected work / 04</p>
            <h2 className="work__title">Things I&apos;ve made. Things I&apos;ve <em>broken.</em></h2>
            <p className="work__sub">A collection of work that escaped my notes app and became actual products.</p>
          </div>

          <div className="wr-wrap">
            <div className="wr-list">
              {WORK.map((w, i) => (
                <article className="wr reveal" key={w.slug} data-wr={w.slug} data-active={i === 0 ? '1' : undefined}>
                  <span className="wr__n">{w.n}</span>
                  <div className="wr__main">
                    <img className="wr__thumb" src={w.imgs[0]} alt="" loading="lazy" />
                    <h3 className="wr__name"><a href={`/work/${w.slug}`}>{w.name}<span className="wr__arrow" aria-hidden="true">↗</span></a></h3>
                    <div className="wr__meta">
                      {w.award && <span className="wr__award"><span aria-hidden="true">🏆</span> {w.award}</span>}
                      {w.status && <span className="wr__status">{w.status}</span>}
                      <span className="wr__kind">{w.kind}</span>
                      {w.tags.map((t) => <span className="wr__tag" key={t}>{t}</span>)}
                    </div>
                    <p className="wr__blurb">{w.blurb}</p>
                    <div className="wr__links">
                      {w.links.map(([t, u]) => <a key={u} href={u} target="_blank" rel="noopener noreferrer">{t} <span aria-hidden="true">↗</span></a>)}
                      <a className="wr__more" href={`/work/${w.slug}`}>Write-up <span aria-hidden="true">→</span></a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div className="wr-panel" aria-hidden="true">
              {WORK.map((w, i) => (
                <div className={`wp wp--${w.layout}${i === 0 ? ' on' : ''}`} data-wp={w.slug} key={w.slug}>
                  {w.imgs.map((src) => <img key={src} src={src} alt="" loading="lazy" />)}
                </div>
              ))}
            </div>
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
          <div className="closer__copy">
            <h2><span>Let's build</span><span>something.</span></h2>
            <p>Open to full-time roles, internships, and interesting problems. The fastest way to reach me is email, I answer all of them.</p>
            <a className="closer__mail" href={`mailto:${site.email}`}>{site.email}</a>
            <div className="closer__links">
              <a href={site.github} target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
              <a href={site.resume} download>Résumé <span aria-hidden="true">↓</span></a>
            </div>
          </div>
          <AvailabilityMachine />
        </div>
      </section>
    </main>
  );
}
