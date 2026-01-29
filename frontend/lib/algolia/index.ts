import { algoliasearch } from 'algoliasearch'

export const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY!, // Note: this should be the SEARCH key, not admin
)

export const INDEXES = {
  posts: 'posts',
  services: 'services',
  tribes: 'tribes',
} as const
