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

// Card themes
export const CARD_THEME: Record<string, string> = {
  article: 'bg-twilight-100 border-twilight-200 hover:border-twilight-500',
  guide: 'bg-terracota-100 border-terracota-200 hover:border-terracota-500',
  tool: 'bg-sage-100 border-sage-200 hover:border-sage-500',
  service: 'bg-gold-100 border-gold-200 hover:border-gold-500',
  default: 'bg-card border hover:border-hover',
}
