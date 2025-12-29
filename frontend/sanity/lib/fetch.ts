import { draftMode } from 'next/headers'

import {
  AllCategoriesQueryResult,
  AllPostsQueryResult,
  AllTopicsQueryResult,
  GetCategoryWithAllPostsQueryResult,
  GetHomepageQueryResult,
  GetPostQueryResult,
  GetPostsByTypeQueryResult,
  GetTopicWithAllPostsQueryResult,
  MorePostsQueryResult,
  NavigationQueryResult,
  SettingsQueryResult,
} from '@/sanity.types'
import { isPreviewEnvironment } from '@/sanity/lib/api'
import { sanityFetch } from '@/sanity/lib/live'

import {
  allCategoriesQuery,
  allPostsQuery,
  allTopicsQuery,
  getCategoryWithAllPostsQuery,
  getHomepageQuery,
  getPostQuery,
  getPostsByTypeQuery,
  getTopicWithAllPostsQuery,
  morePostsQuery,
  navigationQuery,
  settingsQuery,
} from './queries'

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

// Fetch Settings
// _____________________________________________________________

export function fetchSettings() {
  return fetchData<SettingsQueryResult>({
    query: settingsQuery,
    params: {},
    tags: ['settings'],
  })
}

// Fetch Navigation
// _____________________________________________________________

export function fetchNavigation() {
  return fetchData<NavigationQueryResult>({
    query: navigationQuery,
    params: {},
    tags: ['navigation'],
  })
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

// Categories
export function fetchCategories() {
  return fetchData<AllCategoriesQueryResult>({
    query: allCategoriesQuery,
    params: {},
    tags: ['category'],
  })
}

export function fetchCategoryWithAllPosts(slug: string) {
  return fetchData<GetCategoryWithAllPostsQueryResult>({
    query: getCategoryWithAllPostsQuery,
    params: { slug },
    tags: ['category'],
  })
}

// Topics
export function fetchTopics() {
  return fetchData<AllTopicsQueryResult>({
    query: allTopicsQuery,
    params: {},
    tags: ['topic'],
  })
}

export function fetchTopicWithAllPosts(slug: string) {
  return fetchData<GetTopicWithAllPostsQueryResult>({
    query: getTopicWithAllPostsQuery,
    params: { slug },
    tags: ['topic'],
  })
}

// Fetch posts
// _____________________________________________________________

export function fetchAllPosts() {
  return fetchData<AllPostsQueryResult>({
    query: allPostsQuery,
    params: {},
    tags: ['post'],
  })
}

export function fetchPost(slug: string, categorySlug?: string) {
  return fetchData<GetPostQueryResult>({
    query: getPostQuery,
    params: { slug, categorySlug },
    tags: ['post'],
  })
}

export function fetchPostsByType(postType: string) {
  return fetchData<GetPostsByTypeQueryResult>({
    query: getPostsByTypeQuery,
    params: { postType },
    tags: ['post-types'],
  })
}

export function fetchMorePosts(skip: string, limit?: number) {
  return fetchData<MorePostsQueryResult>({
    query: morePostsQuery,
    params: { skip, limit },
    tags: ['post'],
  })
}
