export const revenueData = [
  { month: 'Jan', revenue: 4200, users: 120 },
  { month: 'Feb', revenue: 5800, users: 185 },
  { month: 'Mar', revenue: 6100, users: 210 },
  { month: 'Apr', revenue: 5400, users: 195 },
  { month: 'May', revenue: 7800, users: 280 },
  { month: 'Jun', revenue: 9200, users: 340 },
]

export const projects = [
  { id: 1, name: 'InvoiceFlow', mrr: 2400, users: 180, status: 'active' as const },
  { id: 2, name: 'HabitStack', mrr: 1800, users: 95, status: 'active' as const },
  { id: 3, name: 'QuoteForge', mrr: 800, users: 42, status: 'beta' as const },
]

export const calendarEvents = [
  { id: 1, title: 'Launch HabitStack v2', date: '2026-06-06', type: 'launch' as const },
  { id: 2, title: 'Investor call — SeedFund', date: '2026-06-08', type: 'meeting' as const },
  { id: 3, title: 'InvoiceFlow billing cycle', date: '2026-06-10', type: 'billing' as const },
  { id: 4, title: 'Community AMA', date: '2026-06-12', type: 'event' as const },
]

export const communityProjects = [
  {
    id: 1,
    title: 'PayStack Mobile',
    author: 'Amina K.',
    description: 'Mobile-first payment gateway for West African merchants. 340 active users, $1.2k MRR. Looking for a React Native dev to build the iOS app.',
    mrr: 1200,
    users: 340,
    stage: 'Growth',
    seeking: 'Co-founder (Technical)',
    tags: ['fintech', 'mobile', 'africa'],
  },
  {
    id: 2,
    title: 'StudyPal AI',
    author: 'Jean-Pierre M.',
    description: 'AI tutoring platform for francophone university students. Pre-revenue, 800 waitlist signups. Need $15k seed to launch MVP.',
    mrr: 0,
    users: 800,
    stage: 'Pre-launch',
    seeking: 'Investment ($15k)',
    tags: ['edtech', 'ai', 'francophone'],
  },
  {
    id: 3,
    title: 'FarmConnect',
    author: 'David O.',
    description: 'WhatsApp-based marketplace connecting smallholder farmers to buyers. $600 MRR, 1.2k active farmers. Need marketing help to expand to Ghana.',
    mrr: 600,
    users: 1200,
    stage: 'Traction',
    seeking: 'Collaborator (Marketing)',
    tags: ['agritech', 'whatsapp', 'marketplace'],
  },
  {
    id: 4,
    title: 'FreelanceFlow',
    author: 'Sarah T.',
    description: 'Invoicing and project management tool built for African freelancers. $2.1k MRR, 210 paying users. Looking for $50k to hire and scale.',
    mrr: 2100,
    users: 210,
    stage: 'Scaling',
    seeking: 'Investment ($50k)',
    tags: ['saas', 'freelance', 'invoicing'],
  },
]

export interface IdeaResult {
  title: string
  problem: string
  targetUser: string
  monetization: string
  competition: string
  competitionLevel: 'low' | 'medium' | 'high'
  marketSignal: string
  africaRelevant?: boolean
}

export const sampleIdeas: Record<string, IdeaResult[]> = {
  fintech: [
    {
      title: 'MoMo Subscriptions Manager',
      problem: 'Mobile Money users have no way to track recurring payments or set spending alerts.',
      targetUser: 'Mobile Money power users in Ghana, Kenya, and Cameroon (25-40, urban)',
      monetization: 'Freemium — free for 3 subscriptions, $2/mo for unlimited + analytics',
      competition: 'Low — existing budgeting apps ignore MoMo-native workflows',
      competitionLevel: 'low',
      marketSignal: 'Mobile Money transactions grew 22% YoY across Sub-Saharan Africa; no dedicated subscription tracker exists',
      africaRelevant: true,
    },
    {
      title: 'Invoice-to-Payment Link Generator',
      problem: 'Freelancers waste 30 min/invoice creating and sending payment requests manually.',
      targetUser: 'Solo freelancers and micro-agencies (1-3 people) in emerging markets',
      monetization: '$5/mo flat or 1% per transaction — user chooses',
      competition: 'Medium — Paystack/Flutterwave exist but are merchant-focused, not freelancer-friendly',
      competitionLevel: 'medium',
      marketSignal: 'Google Trends: "invoice generator free" up 40% in 12 months; freelancer economy growing 15% YoY in Africa',
      africaRelevant: true,
    },
    {
      title: 'Micro-Savings Jar for Couples',
      problem: 'Couples saving for shared goals (rent, wedding, travel) lack a joint savings tool that works across different banks.',
      targetUser: 'Young couples (22-35) in urban areas, banked but underserved',
      monetization: '$3/mo per couple, or take a 0.5% yield on saved funds',
      competition: 'Low — joint savings features are buried in banking apps with bad UX',
      competitionLevel: 'low',
      marketSignal: 'r/personalfinance and Twitter threads on "couple savings apps" get consistent engagement; no standout product',
    },
  ],
  saas: [
    {
      title: 'Client Portal Builder for Agencies',
      problem: 'Small agencies juggle Notion, Google Drive, and email to share deliverables with clients.',
      targetUser: 'Freelance designers, dev shops, and marketing agencies (1-10 people)',
      monetization: '$12/mo per portal, $29/mo for white-label branding',
      competition: 'Medium — Copilot and Dubsado exist but are bloated and expensive',
      competitionLevel: 'medium',
      marketSignal: '"Client portal software" searches up 35% YoY; ProductHunt launches in this space get 500+ upvotes consistently',
    },
    {
      title: 'Changelog-as-a-Service',
      problem: 'Indie devs skip changelogs because existing tools (Canny, Beamer) are overpriced for solo products.',
      targetUser: 'Solo SaaS founders with 50-5000 users who want to communicate updates',
      monetization: 'Free tier (1 product), $5/mo for unlimited products + custom domain',
      competition: 'Low — Beamer is $49/mo, way too expensive for solopreneurs',
      competitionLevel: 'low',
      marketSignal: 'Indie Hackers forum: "free changelog tool" threads get 100+ comments; clear underserved niche',
    },
    {
      title: 'Waitlist + Launch Page Generator',
      problem: 'Founders spend days building landing pages before validating ideas.',
      targetUser: 'Pre-launch founders who want to validate demand before building',
      monetization: '$8/mo for custom domain + analytics, free tier with branding',
      competition: 'Medium — Carrd and Launchrock exist but lack integrated email + analytics',
      competitionLevel: 'medium',
      marketSignal: '"Waitlist page builder" searches doubled in 2025; consistent demand on ProductHunt and Twitter',
    },
  ],
}
