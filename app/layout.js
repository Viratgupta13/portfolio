import { Space_Grotesk } from 'next/font/google';
import './globals.css';

const sans = Space_Grotesk({ weight: ['400', '500', '700'], subsets: ['latin'], variable: '--font-sans', display: 'swap' });

export const metadata = {
  title: 'Virat Gupta — Full-stack developer',
  description:
    'Virat Gupta, full-stack developer from Bareilly. I ship web and mobile apps and put machine learning inside them: SAABI, Ledgerly, Herbal Garden, RecallOS.',
};

const init = `document.documentElement.classList.add('js');try{var t=localStorage.getItem('theme');if(t)document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={sans.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: init }} />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
