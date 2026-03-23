import { CVData } from './cv-types'

export const MOCK_CV: CVData = {
  slug: 'mia-liu',
  theme: 'dark',
  accentColor: '#18181b',
  bio: {
    firstName: 'Mia',
    lastName: 'Liu',
    title: 'Senior Product Designer | AI Strategy & Experience',
    location: 'Stockholm, Sweden',
    availability: 'Available',
    summary:
      'I design products where technical complexity and human behaviour collide — most recently shipping a clinical data tracking MLP at Bayer in four weeks with AI, and previously driving 14 paid upgrades on day one at Storykit through a single design decision, and designing for BlaBlaCar\'s 100M users across 22 countries.',
    email: 'uxmia1996@gmail.com',
    phone: '+46 (0)70 423 9158',
    website: 'mialiu.se',
    linkedin: 'linkedin.com/in/mia-liu',
    github: '',
    twitter: '',
  },
  experience: [
    {
      id: 'exp-1',
      title: 'Sr. UX Designer',
      company: 'Bayer Pharmaceuticals AG',
      startDate: 'Nov 2025',
      endDate: 'Feb 2026',
      impactLine:
        'Delivered a clinical MLP in 4 weeks, replacing a manual Excel workflow used daily by biomarker experts across 4 countries.',
      description:
        'Mapped the end-to-end user journey and prioritised MVP features based on impact and feasibility. Partnered with scientists and engineers to deliver scalable design solutions with measurable research efficiency gains.',
      skills: ['UX&UI Design', 'Product Discovery'],
    },
    {
      id: 'exp-2',
      title: 'Product Designer',
      company: 'Thermo-Calc Software AB',
      startDate: 'Feb 2025',
      endDate: 'June 2025',
      impactLine:
        'Led product discovery and UX strategy for the legacy-to-cloud transition used by 2K+ material scientists.',
      description:
        'Designed goal-oriented user flows that simplified complex configuration by 40%, improving task completion rate. Built and rolled out a scalable design system for long-term product expansion. Collaborated closely with PM and engineers to define success metrics and test usability improvements.',
      skills: ['Design Systems', 'User Research', 'Lovable'],
    },
    {
      id: 'exp-3',
      title: 'UX Designer',
      company: 'Scania',
      startDate: 'Sep 2023',
      endDate: 'Oct 2024',
      impactLine:
        'Reduced global Help Center support costs through a redesigned self-service experience.',
      description:
        'Led UX for a global Help Center redesign serving 100k+ users across 40 markets. Ran discovery research with support agents and end-users to identify top friction points. Delivered an information architecture overhaul that cut average resolution time by 30%.',
      skills: ['Stakeholder Management', 'Research', 'UX & UI Design'],
    },
    {
      id: 'exp-4',
      title: 'UI Design Lead (Design Systems & Product)',
      company: 'Storykit-AI Marketing Video',
      startDate: 'Oct 2022',
      endDate: 'Aug 2023',
      impactLine:
        'Generated 14 paid user upgrades on the first day of launch through a single strategically placed growth design element in the music library, proving direct ROI from user-centred design decisions.',
      description:
        'Led a full visual redesign for Storykit AI video editor and built a scalable design system from scratch, integrating Figma with GitHub for design-to-dev handoff. Introduced design tokens, accessibility guidelines, and component documentation. United product, marketing, and engineering behind a single brand vision.',
      skills: ['UI Design', 'Design System', 'AI Video', 'Interaction Design', 'Visual Design'],
    },
    {
      id: 'exp-5',
      title: 'Product Designer',
      company: 'BlaBlaCar - Car Sharing',
      startDate: 'Jan 2022',
      endDate: 'June 2022',
      impactLine:
        'Built high-fidelity Framer prototypes that increased user test reliability, surfaced critical feedback earlier, and reduced development costs for the Smart Pricing feature.',
      description:
        'Led prototype development for usability testing of a new driver pricing assistant -- Smart Pricing. Also established a CRM design system as a sub-brand of the core BlaBlaCar Pixar design system, ensuring brand consistency across email communications in 22 countries.',
      skills: ['Framer', 'Design System', 'Design Tokens', 'Interaction Design', 'Research', 'Stakeholder Management'],
    },
    {
      id: 'exp-6',
      title: 'UX & UI Design Lead',
      company: 'blankt Group AB — E-commerce',
      startDate: 'Jan 2021',
      endDate: 'March 2022',
      impactLine:
        'Launched a market-ready e-commerce platform and disruptive graphic editing tool from zero — delivering a complete visual identity, scalable design system, and validated user flows that became the foundation for investor conversations.',
      description:
        'Owned end-to-end design for a Stockholm-based B2C poster retailer entering a competitive customisation market. Ran rigorous usability testing to simplify a complex editing workflow, reducing friction at key drop-off points in the purchase journey. Built a full Figma design system with token architecture that connected design directly to the frontend team, enabling consistent, scalable output beyond the initial launch.',
      skills: ['Product Discovery', 'UX & UI Design', 'Strategy', 'Design System'],
    },
    {
      id: 'exp-7',
      title: 'UX Researcher & UI Designer (Contract)',
      company: 'DBond - Web3',
      startDate: 'Sep 2022',
      endDate: 'Nov 2022',
      impactLine:
        'Established a reusable research framework that gave the design and marketing teams their first structured understanding of investor behaviour — directly informing product positioning and the UI redesign of the trading platform.',
      description:
        'Joined a fast-growing Web3 infrastructure startup pioneering the ERC-3475 decentralised bond standard. Built the research practice from scratch: stakeholder interviews, user surveys, and competitor benchmarking across DeFi products. Translated qualitative and quantitative findings into design direction, then contributed to high-fidelity UI and a scalable design system connecting design to engineering via tokens — all delivered within a single quarter.',
      skills: ['Research', 'Stakeholder Management'],
    },
    {
      id: 'exp-8',
      title: 'UX/UI Designer',
      company: 'Your BEET',
      startDate: 'May 2021',
      endDate: 'Sep 2021',
      impactLine:
        'Delivered the design work that played a key role in securing investor funding — translating a plant-based food startup\'s vision into a validated mobile app experience from the ground up.',
      description:
        'Designed the mobile app for a Swedish climate-conscious food startup, working with marketing and engineering to establish product architecture and boundaries. Uncovered real user problems through in-depth interviews, going beyond stated needs to surface unspoken behaviours. Built user flows, wireframes, and hi-fidelity prototypes, validating each design hypothesis through structured usability tests.',
      skills: ['Product Discovery', 'UX & UI Design', 'Brand Identity', 'Visual Design', 'Mobile'],
    },
  ],
  skills: [
    'Product Design',
    'UX & UI Design',
    'Design Systems',
    'Interaction Design',
    'User Research',
    'Strategy',
    'Accessibility',
    'React',
    'Brand Identity',
    'Visual Design',
    'Figma',
    'Claude Code',
    'Design Engineering',
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'MSc Human-Computer Interaction Design (Double Degree)',
      institution: 'KTH Royal Institute of Technology',
      startDate: '2020',
      endDate: '2022',
    },
    {
      id: 'edu-2',
      degree: 'MSc Human-Computer Interaction Design (Double Degree)',
      institution: 'Université Paris-Saclay',
      startDate: '2020',
      endDate: '2022',
    },
    {
      id: 'edu-3',
      degree: 'B.Sc. Information Management',
      institution: 'QUFU Normal University',
      startDate: '2016',
      endDate: '2020',
    },
  ],
  languages: [
    { id: 'lang-1', name: 'English', level: 'Fluent' },
    { id: 'lang-2', name: 'Chinese (Mandarin)', level: 'Native' },
    { id: 'lang-3', name: 'Swedish', level: 'Basic' },
  ],
}

export function getCVBySlug(slug: string): CVData | null {
  if (slug === MOCK_CV.slug) return MOCK_CV
  return null
}
