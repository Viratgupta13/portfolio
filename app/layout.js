import { Space_Grotesk, Instrument_Serif, Space_Mono, Caveat } from 'next/font/google';
import './globals.css';

const sans = Space_Grotesk({ weight: ['400', '500', '700'], subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const serif = Instrument_Serif({ weight: '400', style: ['normal', 'italic'], subsets: ['latin'], variable: '--font-serif', display: 'swap' });
const mono = Space_Mono({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-mono', display: 'swap' });
const script = Caveat({ weight: ['600', '700'], subsets: ['latin'], variable: '--font-script', display: 'swap' });

export const metadata = {
  title: 'Virat Gupta — Full-stack developer',
  description:
    'Virat Gupta, full-stack developer from Bareilly. I ship web and mobile apps and put machine learning inside them: SAABI, Ledgerly, Herbal Garden, RecallOS.',
};

const init = `document.documentElement.classList.add('js');try{var t=localStorage.getItem('theme');if(t)document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable} ${script.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: init }} />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
