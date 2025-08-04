// Constants
// ==============================

export const PostType = {
  GUIDE: 'guide',
  STORY: 'story',
  TOOL: 'tool',
  LINK: 'link',
} as const

export type PostTypeShape = (typeof PostType)[keyof typeof PostType]

export const currentYear = new Date().getFullYear()
export const siteName = 'customer.io'
