const links = [['About', 'about'], ['Skills', 'skills'], ['Experience', 'experience'], ['Work', 'work'], ['Contact', 'contact']];

export default function SiteBar() {
  return (
    <>
      <header className="bar" data-site-bar="true">
        <a className="mark" href="/" aria-label="Top of page">VG</a>
        <nav>
          {links.map(([t, id]) => <a key={id} href={`/#${id}`}>{t}</a>)}
        </nav>
        <button type="button" className="themepick" aria-label="Switch theme" title="Switch theme">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" strokeLinecap="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M18.8 5.2l-1.4 1.4M6.6 17.4l-1.4 1.4" />
          </svg>
        </button>
        <a className="bar__cta" href="/Virat-Gupta-Resume.pdf" download><span>Résumé</span><span className="long"> PDF ↓</span></a>
        <button type="button" className="burger" aria-expanded="false" aria-controls="site-drawer" aria-label="Open menu"><span aria-hidden="true" /><span aria-hidden="true" /><span aria-hidden="true" /></button>
      </header>
      <div className="drawer__scrim" />
      <div id="site-drawer" className="drawer" inert={true}>
        <nav aria-label="Sections">
          {links.map(([t, id]) => <a key={id} href={`/#${id}`}>{t}</a>)}
          <a className="drawer__desk" href="/canvas">The desk<span className="drawer__badge">highly recommended</span></a>
        </nav>
      </div>
    </>
  );
}
