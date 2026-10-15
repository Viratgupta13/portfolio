export const site = {
  name: 'Virat Gupta',
  email: 'viratkumargupta1313@gmail.com',
  github: 'https://github.com/Viratgupta13',
  linkedin: 'https://www.linkedin.com/in/viratgupta0913/',
  resume: '/Virat-Gupta-Resume.pdf',
  location: 'Bareilly, India',
};

const dev = 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons';
const logo = (n) => `${dev}/${n}/${n}-original.svg`;

export const skills = [
  { group: 'Languages', tools: [
    { n: 'Python', l: logo('python') }, { n: 'TypeScript', l: logo('typescript') },
    { n: 'JavaScript', l: logo('javascript') }, { n: 'C++', l: logo('cplusplus') },
  ] },
  { group: 'Frontend & Mobile', tools: [
    { n: 'React', l: logo('react') }, { n: 'Next.js', l: logo('nextjs') },
    { n: 'React Native', l: logo('react') }, { n: 'Expo' },
    { n: 'Tailwind CSS', l: logo('tailwindcss') },
  ] },
  { group: 'Backend', tools: [
    { n: 'Node.js', l: logo('nodejs') }, { n: 'Express.js', l: logo('express') },
    { n: 'Flask', l: logo('flask') }, { n: 'REST APIs' },
  ] },
  { group: 'Databases', tools: [
    { n: 'PostgreSQL', l: logo('postgresql') }, { n: 'Supabase', l: logo('supabase') },
    { n: 'MongoDB', l: logo('mongodb') }, { n: 'MySQL', l: logo('mysql') },
    { n: 'Firebase', l: logo('firebase') },
  ] },
  { group: 'AI/ML', tools: [
    { n: 'TensorFlow / Keras', l: logo('tensorflow') }, { n: 'scikit-learn', l: logo('scikitlearn') },
    { n: 'OpenCV', l: logo('opencv') }, { n: 'MobileNetV2' }, { n: 'TFLite' },
  ] },
  { group: 'Cloud & DevOps', tools: [
    { n: 'Docker', l: logo('docker') }, { n: 'Git', l: logo('git') },
    { n: 'GitHub Actions', l: logo('githubactions') }, { n: 'Stripe API' },
  ] },
  { group: 'Testing', tools: [{ n: 'Jest', l: logo('jest') }] },
];

export const jobs = [
  {
    id: 'job-homlyhouse', short: 'HomlyHouse', role: 'Full-Stack Developer', year: '2026',
    when: 'Jul 2026 – present', where: 'Remote',
    lede: 'Building a multi-role marketplace where money changes hands safely.',
    points: [
      'Built the marketplace end to end: <strong>vendor, agent, customer and admin panels</strong>, with Stripe subscription billing and dual checkout (Stripe + cash on delivery).',
      'Designed an <strong>escrow-based service payment flow</strong> with OTP and GPS verification.',
      'Hardened the backend: <strong>Helmet, rate limiting</strong> and environment-based CORS.',
      'Integrated Cloudinary for media and Nodemailer with Gmail OAuth for transactional email.',
      'Gave non-technical admins control of a dynamic blog and the landing-page hero carousel.',
    ],
    chips: ['Next.js', 'Node.js', 'Stripe', 'Cloudinary'],
  },
  {
    id: 'job-collegepur', short: 'CollegePur', role: 'Full-Stack Developer Intern', year: '2026',
    when: 'May – Jun 2026', where: 'Ghaziabad',
    lede: 'Replacing copy-pasted pages with one system, and rescuing a broken build.',
    points: [
      'Rebuilt the Study Abroad module on <strong>Next.js App Router</strong>: dynamic routes, shared layouts and centralised config instead of duplicated static pages.',
      'Built a Career Insights page with multi-criteria filtering, search and sorting.',
      'Cleaned, de-duplicated and schema-mapped scraped education data, ready for database ingestion (<strong>ETL</strong>).',
      'Diagnosed and fixed a <strong>broken 140-page production build</strong>, restoring the deployment pipeline.',
    ],
    chips: ['Next.js', 'App Router', 'ETL'],
  },
  {
    id: 'job-eccura', short: 'Eccura Technologies', role: 'Freelance Full-Stack Developer', year: '2025',
    when: 'Mar – Apr 2025', where: 'Bareilly',
    lede: 'Turning a static HTML company site into a typed Next.js 14 app.',
    points: [
      'Built the whole site from scratch: <strong>20+ pages</strong>, including 8 product pages, 6 service pages, a career portal and demo booking.',
      'Wrote one reusable <strong>ProductPageTemplate</strong>, cutting per-page code by about 80%.',
      'Added a review carousel, scroll-triggered stat counters (IntersectionObserver) and AOS reveal animations.',
      'Integrated payment-partner UI (EaseBuzz, SabPaisa) on a Tailwind design system with CSS custom properties.',
    ],
    chips: ['Next.js 14', 'TypeScript', 'Tailwind CSS'],
  },
];

export const cases = [
  {
    slug: 'saabi', no: '01', kind: 'Machine learning', title: 'SAABI',
    tag: 'Identify cattle and buffalo breeds from a photo',
    lede: 'An 8-breed classifier with calibrated confidence that also flags uncertain or non-cattle images.',
    award: '🏆 ICAR Shitij Innovation Program — Winner',
    chips: ['Python', 'Keras', 'TFLite', 'Flask'],
    video: '/assets/saabi-demo.mp4',
    shots: [],
    links: [
      { t: 'Live demo', u: 'https://saabi-qhel.onrender.com/' },
      { t: 'GitHub', u: 'https://github.com/Viratgupta13/saabi-cattle-breed-classifier' },
    ],
    nums: [['83.6%', 'top-1 accuracy'], ['96.1%', 'top-3 accuracy'], ['8×', 'less server RAM'], ['11 ms', 'latency']],
    highlights: [
      'Trained an <strong>8-breed</strong> Indian and exotic cattle/buffalo classifier with MobileNetV2 transfer learning: 83.6% top-1, 96.1% top-3, macro-F1 0.84 on 152 held-out images.',
      'Found a <strong>BGR/RGB preprocessing mismatch</strong> (training used OpenCV BGR, the web app fed RGB) that cut live accuracy from 88% to 69%, and fixed it by moving preprocessing into the model.',
      'Removed duplicate-image leakage and a reused validation set, so the honest figure is 83.6%, not the original 88%.',
      'Tried max-softmax rejection first; it accepted a temple photo as "Gir" at 83%. Replaced it with a <strong>feature-space (cosine to class centroid)</strong> check: AUROC 0.995 on a proxy set.',
      'Exported to <strong>TFLite</strong>: model 23.1 MB to 8.9 MB, server RAM about 628 MB to 75 MB, latency 43 ms to 11 ms, identical predictions.',
      'Deployed a Flask API with Docker and GitHub Actions CI on a free tier. The weakest pair is Gir vs Sahiwal (12 of 25 test errors).',
    ],
    gallery: ['/assets/saabi-confusion.jpg'],
    note: 'Look-alike animals were not tested for non-cattle rejection, and the free Render tier takes 30–60 s to wake after idle.',
  },
  {
    slug: 'ledgerly', no: '02', kind: 'Mobile app', title: 'Ledgerly',
    tag: 'An expense tracker that reads bank and UPI SMS on your phone',
    lede: 'Pre-sorts each payment into the category you used before, then asks you to review it once. SMS never leave the device.',
    award: null,
    chips: ['React Native', 'TypeScript', 'Supabase', 'Postgres'],
    video: null,
    shots: ['/assets/ledgerly-02-home.jpg', '/assets/ledgerly-04-inbox-scanned.jpg', '/assets/ledgerly-06-review-confirm.jpg'],
    links: [
      { t: 'Live site', u: 'https://ledgerly-virat12.vercel.app/' },
      { t: 'APK + demo video', u: 'https://github.com/Viratgupta13/ledgerly/releases/latest' },
      { t: 'GitHub', u: 'https://github.com/Viratgupta13/ledgerly' },
    ],
    nums: [['94', 'Jest tests'], ['12', 'RLS policies'], ['46 / 50', 'demo payments found'], ['38', 'known brands']],
    highlights: [
      'Wrote a pure-TypeScript <strong>SMS parser</strong> (classifier plus amount, payee, bank-reference and time extractors) that rejects OTPs, promos, recharge offers, failed payments and bill reminders. 94 Jest tests, 48 of them on the parser, run in GitHub Actions CI.',
      'The only SMS-reading library for React Native failed on Gradle 9. Instead of dropping it, I <strong>patched its build files</strong> with patch-package and verified it on a real phone.',
      'Designed a Supabase/Postgres schema with <strong>3 tables and 12 Row Level Security policies</strong>, idempotent imports via unique(user_id, bank_ref), and email-OTP sign-up.',
      'Redesigned from auto-confirm to <strong>review-first</strong>: categories are predicted from rules, learned history and 38 known brands, everything stays pending, and one Review &amp; Confirm screen shows the batch.',
      'Built a native swipeable tab pager (PanResponder, then raw touch events, then PagerView with a live-following tab bar) after a tab swipe fought the scroll views.',
      '"Try demo" swaps only the data layer for an in-memory store and runs 50 fake SMS through the same parser and pre-fill logic as production.',
    ],
    gallery: [],
    note: 'Tested on fixtures, not against labelled data, so there is no accuracy percentage. The release APK is signed with the debug key, fine for testers, not for the Play Store.',
  },
  {
    slug: 'herbal-garden', no: '03', kind: 'Mobile & web app', title: 'Herbal Garden',
    tag: 'Browse Ayurvedic herbs, track what you grow, quiz yourself',
    lede: 'One React Native codebase that runs on Android, iOS and the browser, with a live demo that needs no install.',
    award: null,
    chips: ['React Native', 'Expo', 'React Navigation', 'Reanimated'],
    video: null,
    shots: ['/assets/herbify-1-welcome.jpg', '/assets/herbify-2-home.jpg', '/assets/herbify-4-quiz.jpg'],
    links: [
      { t: 'Live demo', u: 'https://viratgupta13.github.io/herbal-garden/' },
      { t: 'GitHub', u: 'https://github.com/Viratgupta13/herbal-garden' },
    ],
    nums: [['15', 'herbs'], ['18', 'screens'], ['3', 'platforms, 1 codebase'], ['1.31 MB', 'web bundle']],
    highlights: [
      'Built search and filters, <strong>15 detailed herb pages</strong>, a personal garden tracker with care tasks, and an Ayurvedic quiz.',
      'Shipped the same codebase to <strong>Android, iOS and the web</strong>; the recruiter demo is the static web build on GitHub Pages, so nobody has to install an APK.',
      'Turned a <strong>33,000-file repo</strong> (node_modules had been committed) into a clean 88-file repo with one commit.',
      'Reduced image assets from 33 MB to 24 MB by downscaling oversized PNGs to 900 px wide.',
    ],
    gallery: [],
    note: 'Login and garden data live only on the device (AsyncStorage / localStorage). There is no backend, no tests and no users.',
  },
  {
    slug: 'recallos', no: '04', kind: 'Web app, in progress', title: 'RecallOS',
    tag: 'A spaced-repetition app that flags what you are about to forget',
    lede: 'Tracks how well you remember each topic and quizzes you with active-recall questions. Frontend done, backend in progress.',
    award: null,
    chips: ['React 19', 'TypeScript', 'Vite', 'Tailwind 4'],
    video: null,
    shots: ['/assets/recallos-02-dashboard.jpg'],
    links: [],
    nums: [['18', 'protected routes'], ['28', 'API endpoints typed'], ['~5.6k', 'lines of TypeScript'], ['16', 'mock topics']],
    highlights: [
      'Built the frontend <strong>contract-first</strong>: every service has a mock fallback that switches to the real API by setting one environment variable, so the UI was finished before the backend existed.',
      'Models forgetting directly: per-topic memory strength, next-review date, risk level and a <strong>Forgetting Radar</strong> that ranks what to revise first.',
      'Active-recall loop: question, typed answer, then a recall score with concepts remembered and concepts missing.',
      'Planned backend: LLM topic extraction from pasted notes, LLM question generation and grading, and an SM-2 / FSRS style scheduler.',
    ],
    gallery: ['/assets/recallos-09-forgetting-radar.jpg', '/assets/recallos-13-recall-score.jpg'],
    note: 'Nothing here is real AI grading yet: the recall score in mock mode is canned and ignores what you type. No backend, auth or deployment exists.',
  },
];

export const creds = {
  education: [
    { b: 'B.Tech in Information Technology', s: 'Shri Ram Murti Smarak College of Engineering and Technology', s2: '2023 – 2027 · Bareilly, Uttar Pradesh' },
  ],
  awards: [
    { b: 'Winner', s: 'PRARAMBH Hackathon (with IBM)' },
    { b: 'Winner', s: 'ICAR Shitij Innovation Program, ABI IVRI Incubator' },
  ],
  certs: [
    { b: 'Artificial Intelligence Fundamentals', s: 'IBM SkillsBuild' },
    { b: 'DevOps Fundamentals', s: 'TechVision Technologies' },
  ],
};
