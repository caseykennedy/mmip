// Post type constants
export const POST_TYPE = {
  ARTICLE: 'article',
  GUIDE: 'guide',
  TOOL: 'tool',
  SERVICE: 'service',
} as const
export type PostTypeShape = (typeof POST_TYPE)[keyof typeof POST_TYPE]

// Site metadata constants
export const CURRENT_YEAR = new Date().getFullYear()
export const SITE_NAME = 'Resilient Relatives'
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
