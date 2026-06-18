import { TimelineItem, JournalItem, ProjectItem } from './types';

export const TIMELINE_DATA: TimelineItem[] = [
  // --- WORK EXPERIENCE ---
  {
    id: 'frame-theory',
    period: 'JUN 2026 — PRESENT',
    company: 'FRAME THEORY',
    role: 'BUSINESS DEVELOPMENT ASSOCIATE',
    details: 'At Frame Theory, I spend most of my time prospecting, sending cold emails, and networking on LinkedIn to start real conversations with founders and decision makers. Instead of pitching generic services, I look at where a brand is lagging online, break the ice, and set up strategy meetings with our leadership team to take things forward.',
    stack: ['Business Development', 'Lead Generation', 'Sales Prospecting', 'Cold Outreach'],
    category: 'work'
  },
  {
    id: 'bits-bytes-head',
    period: 'MAY 2026 — PRESENT',
    company: 'BITS&BYTES',
    role: 'HEAD OF GROUND OPERATIONS',
    details: 'I ran the on-ground logistics, infrastructure setup, and floor layout for a community of 1,500+ student developers. My job was to turn operational chaos into a smooth experience so hackers could focus on building their projects.',
    stack: ['Event Management', 'Cross-functional Team Leadership', 'Operations Management'],
    category: 'work'
  },
  {
    id: 'bits-bytes-writer',
    period: 'APR 2026 — MAY 2026',
    company: 'BITS&BYTES',
    role: 'CREATIVE CONTRIBUTOR & CONTENT WRITER',
    details: "I wrote copy and designed campaigns that captured the energy of the projects we built. Instead of posting generic corporate announcements, I focused on sharing the actual stories and build updates in a language developers and creators relate to.",
    stack: ['Brand Strategy', 'Cross-functional Team Leadership', 'Content Strategy', 'Storytelling'],
    category: 'work'
  },
  {
    id: 'xfrus',
    period: 'JUL 2025 — NOV 2025',
    company: 'XFRUS',
    role: 'WEB ENGINEER LEAD',
    details: 'Built the frontend for a web application that supports cybercrime victims right after an incident. Focused on making the UI as simple, responsive, and clear as possible, knowing users were dealing with high-stress security situations.',
    stack: ['Front-End Development', 'GitHub', 'React'],
    category: 'work'
  },
  {
    id: 'tata-group',
    period: 'JUL 2025 — AUG 2025',
    company: 'TATA GROUP',
    role: 'GENERATIVE AI ENGINEER (INTERN)',
    details: 'Analyzed financial and customer data to identify risk factors and predict loan defaults. Designed a simple risk-modeling framework to flag delinquent accounts early, and mapped out automated collections workflows that balance recovery goals with fair customer practices.',
    stack: ['Generative AI', 'Strategic Thinking', 'Exploratory Data Analysis', 'Predictive Analytics'],
    category: 'work'
  },
  {
    id: 'jpmorgan',
    period: 'JUN 2025 — JUL 2025',
    company: 'JPMORGAN CHASE',
    role: 'QUANTITATIVE RESEARCHER (INTERN)',
    details: "Interned in the quantitative research team, analyzing loan datasets to calculate default probabilities. Used dynamic programming to group credit scores into risk categories, helping build clearer predictive models.",
    stack: ['Quantitative Research', 'Statistics', 'Data Analysis', 'Dynamic Programming'],
    category: 'work'
  },

  // --- EDUCATION ---
  {
    id: 'iit-jodhpur',
    period: 'AUG 2024 — AUG 2028',
    company: 'IIT JODHPUR',
    role: 'BS. ARTIFICIAL INTELLIGENCE & DATA SCIENCE',
    details: 'Studying Artificial Intelligence and Data Science. My coursework covers core math, probability, programming, algorithms, and the fundamentals of machine learning.',
    stack: ['Data Analysis', 'Python', 'Machine Learning'],
    category: 'education'
  },
  {
    id: 'rlb',
    period: 'APR 2020 — APR 2024',
    company: 'RANI LAXMI BAI MEMORIAL SCHOOL',
    role: 'HIGH SCHOOL & INTERMEDIATE EDUCATION',
    details: 'Completed my high school education with a focus on physics, chemistry, mathematics, computer science, and English.',
    stack: ['Time Management', 'Written Communication'],
    category: 'education'
  },
  {
    id: 'cms',
    period: 'APR 2015 — APR 2020',
    company: 'CITY MONTESSORI SCHOOL, LUCKNOW',
    role: 'MIDDLE SCHOOL EDUCATION',
    details: 'Completed my middle school education, building a strong foundation in mathematics, science, and languages.',
    stack: ['Written Communication', 'Professional Communication'],
    category: 'education'
  },

  // --- CERTIFICATIONS ---
  {
    id: 'cert-vertex',
    period: 'ISSUED JUN 2026',
    company: 'GOOGLE',
    role: 'PROMPT DESIGN IN VERTEX AI',
    details: 'Completed prompt engineering, Vertex AI API integrations, and model parameter optimization.',
    stack: ['Prompt Design', 'Vertex AI'],
    category: 'certification'
  },
  {
    id: 'cert-responsible-ai',
    period: 'ISSUED MAY 2026',
    company: 'GOOGLE',
    role: 'INTRODUCTION TO RESPONSIBLE AI',
    details: "Studied Google's framework for responsible AI, focusing on managing algorithmic bias, model transparency, and governance.",
    stack: ['Responsible AI', 'Ethics'],
    category: 'certification'
  },
  {
    id: 'cert-llms',
    period: 'ISSUED MAY 2026',
    company: 'GOOGLE',
    role: 'INTRODUCTION TO LARGE LANGUAGE MODELS',
    details: 'Studied LLM structures, fine-tuning techniques, and how to balance latency and quality trade-offs.',
    stack: ['LLMs', 'Generative AI'],
    category: 'certification'
  },
  {
    id: 'cert-genai',
    period: 'ISSUED MAY 2026',
    company: 'GOOGLE',
    role: 'INTRODUCTION TO GENERATIVE AI',
    details: 'Learned the core concepts of deep learning, generative model architectures, and how to build apps using Vertex AI.',
    stack: ['Generative AI', 'Deep Learning'],
    category: 'certification'
  },
  {
    id: 'cert-pandas',
    period: 'ISSUED DEC 2025',
    company: 'KAGGLE',
    role: 'PANDAS',
    details: 'Learned data manipulation using Pandas, including grouping, joining datasets, and cleaning missing data.',
    stack: ['Pandas', 'Data Analysis'],
    category: 'certification'
  },
  {
    id: 'cert-python',
    period: 'ISSUED DEC 2025',
    company: 'KAGGLE',
    role: 'PYTHON',
    details: 'Solidified Python programming fundamentals, data structures, loops, file handling, and code modularity.',
    stack: ['Python', 'Computer Programming'],
    category: 'certification'
  },
  {
    id: 'cert-analytics',
    period: 'ISSUED JUL 2025',
    company: 'GOOGLE',
    role: 'ANALYTICS',
    details: 'Learned how to set up GA4, configure tracking parameters, monitor user streams, and analyze conversion funnels.',
    stack: ['Google Analytics', 'Data Analysis'],
    category: 'certification'
  },
  {
    id: 'cert-campaign',
    period: 'ISSUED JUL 2025',
    company: 'GOOGLE',
    role: 'CAMPAIGN MANAGER 360',
    details: 'Covered digital campaign setup, tracking parameters, and display marketing performance metrics in Campaign Manager 360.',
    stack: ['Campaign Manager 360', 'Analytic Reporting'],
    category: 'certification'
  },

  // --- VOLUNTEERING ---
  {
    id: 'vol-gdg',
    period: 'NOV 2025 — PRESENT',
    company: 'GOOGLE DEVELOPER GROUPS LUCKNOW',
    role: 'VOLUNTEER',
    details: 'Help organize developer events and operations for Google Developer Groups Lucknow, including DevFest. Focus on coordinating frontend development tasks, maintaining our web pages, and supporting logistics.',
    stack: ['Community Engagement', 'UI Engineering'],
    category: 'volunteering'
  },
  {
    id: 'vol-hack4good',
    period: 'APR 2026 — PRESENT',
    company: 'HACK4GOOD',
    role: 'VOLUNTEER',
    details: 'Coordinated venue logistics, managed attendee coordination, and captured real-time photo/video content to update the event\'s social media channels.',
    stack: ['Event Management', 'Public Relations'],
    category: 'volunteering'
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
    description: 'A dark-themed dashboard frontend designed for tracking daily workouts, health metrics, and personal wellness goals.',
    screenshots: [aurafit_1, aurafit_2, aurafit_3, aurafit_4, aurafit_5],
    repoUrl: 'https://github.com/theshantanujoshi/aurafit'
  },
  {
    id: 'codelore',
    title: 'CODELORE',
    client: '',
    role: '',
    year: '',
    description: 'A visual tool that maps codebase architectures. It generates interactive 3D graphs of code dependencies and function calls, helping developers understand new repositories quickly.',
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
    description: 'A 3D Star Wars database built with Next.js and React Three Fiber. Includes responsive UI story tracking and translation ciphers for Aurebesh as interactive easter eggs.',
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
