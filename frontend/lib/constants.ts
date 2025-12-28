// Post type constants
export const POST_TYPE = {
  articles: 'article',
  guides: 'guide',
  tools: 'tool',
} as const
export type PostTypeShape = (typeof POST_TYPE)[keyof typeof POST_TYPE]

// Site metadata constants
export const CURRENT_YEAR = new Date().getFullYear()
export const SITE_NAME = 'Resilient Relatives'
export const SITE_DESCRIPTION =
  'Resilient Relatives is a Native-led resource addressing the MMIP crisis—empowering California Tribal communities to respond, advocate, and heal.'
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
