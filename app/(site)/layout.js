import SiteBar from '@/components/SiteBar';
import Motion from '@/components/Motion';
import { site } from '@/lib/data';

export default function SiteLayout({ children }) {
  return (
    <div className="site" id="top">
      <SiteBar />
      {children}
      <footer className="foot">
        <div className="wrap">
          <span>© <span id="yr">2026</span> {site.name}. All rights reserved.</span>
          <span>{site.location}</span>
        </div>
      </footer>
      <a className="totop" href="#top" aria-label="Back to top">↑</a>
      <Motion />
    </div>
  );
}
