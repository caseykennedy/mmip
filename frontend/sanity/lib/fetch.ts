import { draftMode } from 'next/headers'

import {
  AllCategoriesQueryResult,
  AllTopicsQueryResult,
  GetHomepageQueryResult,
} from '@/sanity.types'
import { isPreviewEnvironment } from '@/sanity/lib/api'
import { sanityFetch } from '@/sanity/lib/live'

import { allCategoriesQuery, allTopicsQuery, getHomepageQuery } from './queries'

type FetchOptions<T> = {
  query: string
  params?: Record<string, any>
  tags?: string[]
  perspective?: 'drafts' | 'published'
  stega?: boolean
}

export async function fetchData<T>({
  query,
  params,
  tags,
  perspective,
  stega,
}: FetchOptions<T>): Promise<T> {
  const { isEnabled: isDraftMode } = await draftMode()

  const { data } = await sanityFetch({
    query,
    params,
    perspective: perspective ?? (isDraftMode || isPreviewEnvironment ? 'drafts' : 'published'),
    stega: stega ?? false,
    tags,
  })

  return data as T
}

// Fetch Homepage
// _____________________________________________________________

export function fetchHomeData() {
  return fetchData<GetHomepageQueryResult>({
    query: getHomepageQuery,
    params: {},
    tags: ['home'],
  })
}

// Fetch taxonomies
// _____________________________________________________________

export function fetchCategories() {
  return fetchData<AllCategoriesQueryResult>({
    query: allCategoriesQuery,
    params: {},
    tags: ['category'],
  })
}

export function fetchTopics() {
  return fetchData<AllTopicsQueryResult>({
    query: allTopicsQuery,
    params: {},
    tags: ['topic'],
  })
}
