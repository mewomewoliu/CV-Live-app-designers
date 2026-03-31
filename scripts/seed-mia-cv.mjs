import { createClient } from '@supabase/supabase-js'

const admin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

const USER_ID = '8ed5308b-f878-4d37-b1f1-6f9d804a21bd'

const cvData = {
  slug: 'mia-liu',
  theme: 'minimal',
  accentColor: '#18181b',
  bio: {
    firstName: 'Mia',
    lastName: 'Liu',
    title: 'Sr. Product Designer | AI Strategy & Experience',
    location: 'Stockholm, Sweden',
    summary: 'I design products where technical complexity and human behaviour collide — most recently shipping a clinical data tracking MLP at Bayer in four weeks, and previously driving 14 paid upgrades on day one at Storykit through a single design decision, and designing for BlaBlaCar\'s 100M users across 22 countries.',
    email: 'uxmia1996@gmail.com',
    phone: '+46 (0)70 423 9158',
    website: 'mialiu.se',
    linkedin: 'linkedin.com/in/mialiu',
    github: 'github.com/mialiu',
  },
  skills: [
    'PRODUCT DESIGN',
    'UX & UI DESIGN',
    'DESIGN SYSTEMS',
    'INTERACTION DESIGN',
    'USER RESEARCH',
    'STRATEGY',
    'ACCESSIBILITY',
    'BRAND IDENTITY',
    'VISUAL DESIGN',
    'FIGMA',
    'CLAUDE CODE',
    'DESIGN ENGINEERING',
  ],
  experience: [
    {
      id: 'exp-001',
      title: 'Sr. UX Designer',
      company: 'Bayer Pharmaceuticals AG',
      startDate: 'Nov 2025',
      endDate: 'Feb 2026',
      current: false,
      highlight: 'Delivered a clinical MLP in 4 weeks, replacing a manual Excel workflow used daily by biomarker experts across 4 countries.',
      description: 'Mapped the end-to-end user journey and prioritised MVP features based on impact and feasibility. Partnered with scientists and engineers to deliver scalable design solutions with measurable research efficiency gains.',
      skills: ['UX&UI DESIGN', 'PRODUCT DISCOVERY', 'AI PROTOTYPING'],
    },
    {
      id: 'exp-002',
      title: 'Product Designer',
      company: 'Thermo-Calc Software AB',
      startDate: 'Feb 2025',
      endDate: 'June 2025',
      current: false,
      highlight: 'Led product discovery and UX strategy for the legacy-to-cloud transition used by 2K+ material scientists.',
      description: 'Designed goal-oriented user flows that simplified complex configuration by 40%, improving task completion rate. Built and rolled out a scalable design system for long-term product expansion. Collaborated closely with PM and engineers to define success metrics and test usability improvements.',
      skills: ['DESIGN SYSTEMS', 'USER RESEARCH', 'LOVABLE'],
    },
    {
      id: 'exp-003',
      title: 'UX Designer',
      company: 'Scania Group',
      startDate: 'Sep 2023',
      endDate: 'Oct 2024',
      current: false,
      highlight: 'Reduced global Help Center support costs through a redesigned self-service experience.',
      description: 'Led UX for a global Help Center redesign serving 100k+ users across 40 markets. Ran discovery research with support agents and end-users to identify top friction points. Delivered an information architecture overhaul that cut average resolution time by 30%.',
      skills: ['STAKEHOLDER MANAGEMENT', 'RESEARCH', 'UX & UI DESIGN'],
    },
    {
      id: 'exp-004',
      title: 'UI Design Lead (Design Systems & Product)',
      company: 'Storykit-AI Marketing Video',
      startDate: 'Oct 2022',
      endDate: 'Aug 2023',
      current: false,
      highlight: 'Generated 14 paid user upgrades on the first day of launch through a single strategically placed growth design element in the music library, proving direct ROI from user-centred design decisions.',
      description: 'Led a full visual redesign for Storykit AI video editor and built a scalable design system from scratch, integrating Figma with GitHub for design-to-dev handoff. Introduced design tokens, accessibility guidelines, and component documentation. United product, marketing, and engineering behind a single brand vision.',
      skills: ['UI DESIGN', 'DESIGN SYSTEM', 'AI VIDEO', 'INTERACTION DESIGN', 'VISUAL DESIGN'],
    },
    {
      id: 'exp-005',
      title: 'Product Designer',
      company: 'BlaBlaCar - Car Sharing',
      startDate: 'Jan 2022',
      endDate: 'June 2022',
      current: false,
      highlight: 'Built high-fidelity Framer prototypes that increased user test reliability, surfaced critical feedback earlier, and reduced development costs for the Smart Pricing feature.',
      description: 'Led prototype development for usability testing of a new driver pricing assistant -- Smart Pricing. Also established a CRM design system as a sub-brand of the core BlaBlaCar Pixar design system, ensuring brand consistency across email communications in 22 countries.',
      skills: ['FRAMER', 'DESIGN SYSTEM', 'DESIGN TOKENS', 'INTERACTION DESIGN', 'STAKEHOLDER MANAGEMENT'],
    },
    {
      id: 'exp-006',
      title: 'UX & UI Design Lead',
      company: 'blankt Group AB — E-commerce',
      startDate: 'Jan 2021',
      endDate: 'March 2022',
      current: false,
      highlight: 'Launched a market-ready e-commerce platform and disruptive graphic editing tool from zero — delivering a complete visual identity, scalable design system, and validated user flows that became the foundation for investor conversations.',
      description: 'Owned end-to-end design for a Stockholm-based B2C poster retailer entering a competitive customisation market. Ran rigorous usability testing to simplify a complex editing workflow, reducing friction at key drop-off points in the purchase journey. Built a full Figma design system with token architecture that connected design directly to the frontend team, enabling consistent, scalable output beyond the initial launch.',
      skills: ['PRODUCT DISCOVERY', 'UX & UI DESIGN', 'STRATEGY', 'DESIGN SYSTEM'],
    },
    {
      id: 'exp-007',
      title: 'UX Researcher & UI Designer (Contractor)',
      company: 'DBond - Web3',
      startDate: 'Sep 2022',
      endDate: 'Nov 2022',
      current: false,
      highlight: 'Established a reusable research framework that gave the design and marketing teams their first structured understanding of investor behaviour — directly informing product positioning and the UI redesign of the trading platform.',
      description: 'Joined a fast-growing Web3 infrastructure startup pioneering the ERC-3475 decentralised bond standard. Built the research practice from scratch: stakeholder interviews, user surveys, and competitor benchmarking across DeFi products. Translated qualitative and quantitative findings into design direction, then contributed to high-fidelity UI and a scalable design system connecting design to engineering via tokens — all delivered within a single quarter.',
      skills: ['RESEARCH', 'STAKEHOLDER MANAGEMENT'],
    },
    {
      id: 'exp-008',
      title: 'UX/UI Designer',
      company: 'Your BEET',
      startDate: 'May 2021',
      endDate: 'Sep 2021',
      current: false,
      highlight: 'Delivered the design work that played a key role in securing investor funding — translating a plant-based food startup\'s vision into a validated mobile app experience from the ground up.',
      description: 'Designed the mobile app for a Swedish climate-conscious food startup, working with marketing and engineering to establish product architecture and boundaries. Uncovered real user problems through in-depth interviews, going beyond stated needs to surface unspoken behaviours. Built user flows, wireframes, and hi-fidelity prototypes, validating each design hypothesis through structured usability tests.',
      skills: ['PRODUCT DISCOVERY', 'UX & UI DESIGN', 'BRAND IDENTITY', 'VISUAL DESIGN', 'MOBILE'],
    },
  ],
  education: [
    {
      id: 'edu-001',
      degree: 'MSc Human-Computer Interaction Design (Double Degree)',
      school: 'KTH Royal Institute of Technology',
      startYear: '2020',
      endYear: '2022',
    },
    {
      id: 'edu-002',
      degree: 'MSc Human-Computer Interaction Design (Double Degree)',
      school: 'Université Paris-Saclay',
      startYear: '2020',
      endYear: '2022',
    },
    {
      id: 'edu-003',
      degree: 'B.Sc. Information Management',
      school: 'QUFU Normal University',
      startYear: '2016',
      endYear: '2020',
    },
  ],
  languages: [
    { id: 'lang-001', name: 'English', level: 'Fluent' },
    { id: 'lang-002', name: 'Chinese (Mandarin)', level: 'Native' },
    { id: 'lang-003', name: 'Swedish', level: 'Basic' },
  ],
}

// Upsert — update slug and cv_data for the existing row
const { error } = await admin
  .from('cvs')
  .update({ slug: cvData.slug, cv_data: cvData })
  .eq('user_id', USER_ID)

if (error) {
  console.error('Update error:', error.message)
  process.exit(1)
}

console.log('CV updated successfully for mewomewoliu@gmail.com')
console.log('Slug:', cvData.slug)
