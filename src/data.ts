import { TimelineItem, JournalItem, ProjectItem } from './types';

export const TIMELINE_DATA: TimelineItem[] = [
  {
    id: 'bits-bytes-head',
    num: '01',
    period: 'MAY 2026 — PRESENT',
    company: 'BITS&BYTES',
    role: 'HEAD OF GROUND OPERATIONS',
    details: 'Spearheading on ground logistics, infrastructure deployment, and floor dynamics for a 1,500+ student dev ecosystem; bridging structural chaos with rigid execution to keep builds and vibes moving flawlessly.',
    stack: ['Event Management', 'Team Leadership', 'Operations']
  },
  {
    id: 'hack4good',
    num: '02',
    period: 'MAY 2026 — PRESENT',
    company: 'HACK4GOOD',
    role: 'VOLUNTEER',
    details: 'Managing on-ground developer engagement, keeping the energy up during high-intensity AI sprints, and capturing content in real time. Supporting basecamp logistics and documenting the work as it happens to strengthen the digital presence.',
    stack: ['Public Relations', 'Event Management']
  },
  {
    id: 'bits-bytes-writer',
    num: '03',
    period: 'APR 2026 — MAY 2026',
    company: 'BITS&BYTES',
    role: 'CREATIVE CONTRIBUTOR',
    details: 'Ensured our digital presence stayed as permissionless (and slightly unhinged) as the forks we were building. Translated technical jargon into layman\'s words to communicate what we were up to—crafting stories over standard announcements.',
    stack: ['Brand Strategy', 'Content Writing', 'Public Relations']
  },
  {
    id: 'gdsc',
    num: '04',
    period: 'NOV 2025 — PRESENT',
    company: 'GDSC LUCKNOW',
    role: 'MEMBER',
    details: 'Connected with engineers, designers, and builders through Google Developer Groups Lucknow to share ideas on software architecture, cloud systems, and current engineering practices.',
    stack: ['Professional Communication', 'Community Engagement']
  },
  {
    id: 'xfrus',
    num: '05',
    period: 'JUL 2025 — NOV 2025',
    company: 'XFRUS',
    role: 'WEB ENGINEER LEAD',
    details: 'Engineered the secure frontend architecture for a post incident cybercrime support system, building optimized, intuitive interfaces to assist victims under high pressure scenarios.',
    stack: ['Front-End Development', 'GitHub', 'React']
  },
  {
    id: 'tata-group',
    num: '06',
    period: 'JUL 2025 — AUG 2025',
    company: 'TATA GROUP',
    role: 'GENERATIVE AI ENGINEER',
    details: 'Conducted exploratory data analysis using GenAI tools for Tata iQ. Proposed a no-code predictive modeling framework to assess customer delinquency risk, and designed an AI-driven collections strategy incorporating ethical AI principles and automation.',
    stack: ['Generative AI', 'Strategic Thinking', 'Exploratory Data Analysis']
  },
  {
    id: 'jpmorgan',
    num: '07',
    period: 'JUN 2025 — JUL 2025',
    company: 'JPMORGAN CHASE',
    role: 'QUANTITATIVE RESEARCHER',
    details: 'Focused on quantitative research methods. Analyzed a book of loans to estimate a customer\'s probability of default and used dynamic programming to convert FICO scores into categorical data to predict defaults.',
    stack: ['Quantitative Research', 'Statistics', 'Data Analysis', 'Dynamic Programming']
  },
  {
    id: 'certifications',
    num: '08',
    period: '2025 — 2026',
    company: 'CERTIFICATIONS',
    role: 'AI, DATA & ANALYTICS',
    details: 'Obtained advanced professional certifications including Introduction to Generative AI (Google), Introduction to Large Language Models (Google), Responsible AI (Google), Google Analytics, Google Campaign Manager 360, alongside Python and Pandas specializations from Kaggle.',
    stack: ['Generative AI', 'LLMs', 'Pandas', 'Google Analytics']
  },
  {
    id: 'iit-jodhpur',
    num: '09',
    period: 'AUG 2024 — AUG 2028',
    company: 'IIT JODHPUR',
    role: 'BS. ARTIFICIAL INTELLIGENCE & DATA SCIENCE',
    details: 'Focus areas include Foundational Data Science, Linear Algebra, Calculus, Probability & Statistics, Programming & Data Structures, and Fundamentals of AI & ML.',
    stack: ['Data Analysis', 'Python', 'Machine Learning']
  }
];

const journalModules = import.meta.glob('./assets/journal/journal_*.jpg', { eager: true, query: '?url', import: 'default' });

export const JOURNAL_DATA: JournalItem[] = Array.from({ length: 50 }).map((_, i) => {
  const num = i + 1;
  const path = `./assets/journal/journal_${num}.jpg`;
  const url = journalModules[path] as string;
  
  return {
    id: `gallery-${num}`,
    num: String(num).padStart(3, '0'),
    category: 'VISUAL STUDY',
    title: `ARCHIVE ${String(num).padStart(2, '0')}`,
    excerpt: '',
    content: '',
    imageUrl: url,
    imageAlt: `Gallery image ${num}`
  };
});



import aurafit_1 from './assets/projects/aurafit_1.png';
import aurafit_2 from './assets/projects/aurafit_2.png';
import aurafit_3 from './assets/projects/aurafit_3.png';
import aurafit_4 from './assets/projects/aurafit_4.png';
import aurafit_5 from './assets/projects/aurafit_5.png';

import codelore_1 from './assets/projects/codelore_1.png';
import codelore_2 from './assets/projects/codelore_2.png';
import codelore_3 from './assets/projects/codelore_3.png';
import codelore_4 from './assets/projects/codelore_4.png';
import codelore_5 from './assets/projects/codelore_5.png';
import codelore_6 from './assets/projects/codelore_6.png';
import codelore_7 from './assets/projects/codelore_7.png';
import codelore_8 from './assets/projects/codelore_8.png';
import codelore_9 from './assets/projects/codelore_9.png';
import codelore_10 from './assets/projects/codelore_10.png';
import codelore_11 from './assets/projects/codelore_11.png';
import codelore_12 from './assets/projects/codelore_12.png';
import codelore_13 from './assets/projects/codelore_13.png';
import codelore_14 from './assets/projects/codelore_14.png';

import holocron_1 from './assets/projects/holocron_1.png';
import holocron_2 from './assets/projects/holocron_2.png';
import holocron_3 from './assets/projects/holocron_3.png';
import holocron_4 from './assets/projects/holocron_4.png';
import holocron_5 from './assets/projects/holocron_5.png';
import holocron_6 from './assets/projects/holocron_6.png';
import holocron_7 from './assets/projects/holocron_7.png';
import holocron_8 from './assets/projects/holocron_8.png';


export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'aurafit',
    title: 'AURAFIT',
    client: 'WELLNESS PLATFORM',
    role: 'FRONTEND ARCHITECT',
    year: '2024',
    description: 'This is the premium frontend design for AuraFit, a high-performance wellness and fitness metrics tracking platform.',
    screenshots: [aurafit_1, aurafit_2, aurafit_3, aurafit_4, aurafit_5],
    repoUrl: 'https://github.com/theshantanujoshi/aurafit'
  },
  {
    id: 'codelore',
    title: 'CODELORE',
    client: '',
    role: '',
    year: '',
    description: 'Codelore is an AI-powered visualizer that maps complex repository architectures instantly. It generates interactive 3D dependency graphs and execution traces to help developers understand codebases in minutes.',
    screenshots: [
      codelore_1, codelore_2, codelore_3, codelore_4, codelore_5, 
      codelore_6, codelore_7, codelore_8, codelore_9, codelore_10, 
      codelore_11, codelore_12, codelore_13, codelore_14
    ],
    repoUrl: 'https://github.com/theshantanujoshi/codelore-ui'
  },
  {
    id: 'holocron',
    title: 'HOLOCRON',
    client: '',
    role: '',
    year: '',
    description: 'A 3D Star Wars universe explorer built with Next.js and R3F. I implemented dynamic UI story tracking and integrated thematic Aurebesh cipher easter eggs to deepen the immersive experience.',
    screenshots: [
      holocron_1, holocron_2, holocron_3, holocron_4, holocron_5, 
      holocron_6, holocron_7, holocron_8
    ],
    repoUrl: 'https://github.com/adhit-r/holocron'
  }
];

export const LINKS_DATA = [
  { id: 'resume', label: 'Resume', icon: 'FileText', url: 'https://drive.google.com/file/d/1-aySDKr-qELNRwXdDJYEp8wrK51INs04/view' },
  { id: 'booking', label: 'Book a Meeting', icon: 'Calendar', url: 'https://calendly.com/theshantanujoshi' },
  { id: 'linkedin', label: 'LinkedIn', icon: 'Linkedin', url: 'https://www.linkedin.com/in/theshantanujoshi/' },
  { id: 'github', label: 'GitHub', icon: 'Github', url: 'https://github.com/theshantanujoshi' },
  { id: 'email', label: 'Email', icon: 'Mail', url: 'mailto:shanjoshi39@gmail.com' },
  { id: 'phone', label: 'Phone', icon: 'Phone', url: 'tel:+919936328758', copyText: '+91 9936328758' },
  { id: 'twitter', label: 'Twitter', icon: 'Twitter', url: 'https://x.com/okayjoshiji' },
  { id: 'substack', label: 'Substack', icon: 'BookOpen', url: 'https://okayjoshiji.substack.com/' },
  { id: 'instagram', label: 'Instagram', icon: 'Instagram', url: 'https://www.instagram.com/ashanthumain/' },
  { id: 'discord', label: 'Discord', icon: 'Discord', url: '#', copyText: '@baakisabmast' }
];
