// sanity/lib/resolveRoute.ts
import { PortableTextBlock } from 'next-sanity'

import type {
  GetCategoryQueryResult,
  GetPageQueryResult,
  GetPostQueryResult,
  Metadata,
  Post,
} from '@/sanity.types'
import { sanityFetch } from '@/sanity/lib/live'
import {
  allCategoriesQuery,
  getCategoryQuery,
  getPageQuery,
  getPostQuery,
} from '@/sanity/lib/queries'

import { portableTextToString } from './utils'

export type ResolvedRoute =
  | {
      type: 'page'
      data: NonNullable<GetPageQueryResult>
      metadata: { title: string; description: string }
    }
  | {
      type: 'category'
      data: NonNullable<GetCategoryQueryResult>
      metadata: { title: string; description: string }
    }
  | {
      type: 'post'
      data: NonNullable<GetPostQueryResult>
      metadata: {
        title: string
        description: string
        openGraphImage?: Metadata['openGraphImage'] | Post['coverImage']
        hideSearchIndex?: boolean
      }
    }
  | {
      type: 'not-found'
    }

export async function resolveRoute(slugParts: string[]): Promise<ResolvedRoute> {
  if (!slugParts?.length) {
    return { type: 'not-found' }
  }

  const [categoriesResult, firstPageResult] = await Promise.all([
    sanityFetch({ query: allCategoriesQuery }),
    slugParts.length === 1
      ? sanityFetch({ query: getPageQuery, params: { slug: slugParts[0] } })
      : Promise.resolve({ data: null }),
  ])

  const categories = categoriesResult.data || []
  const categorySlugs = categories.map(c => c.slug)

  //
  // ──────────────────────────────
  // One-Part Slug → Page or Category
  // ──────────────────────────────
  //
  if (slugParts.length === 1) {
    const [slug] = slugParts

    // Is category?
    if (categorySlugs.includes(slug)) {
      const { data: category } = await sanityFetch({
        query: getCategoryQuery,
        params: { slug },
      })

      if (category?._id) {
        return {
          type: 'category',
          data: category,
          metadata: {
            title: category.name || 'Category',
            description: category.description || '',
          },
        }
      }
    }

    // Is standalone page?
    if (firstPageResult.data?._id) {
      const page = firstPageResult.data
      return {
        type: 'page',
        data: page,
        metadata: {
          title: page.metadata?.metaTitle || page.name || page.heading || 'Page',
          description: page.metadata?.metaDescription || page.subheading || '',
        },
      }
    }

    return { type: 'not-found' }
  }

  //
  // ──────────────────────────────
  // Two-Part Slug → Category + Post
  // ──────────────────────────────
  //
  if (slugParts.length === 2) {
    const [categorySlug, postSlug] = slugParts

    if (!categorySlugs.includes(categorySlug)) {
      return { type: 'not-found' }
    }

    const { data: post } = await sanityFetch({
      query: getPostQuery,
      params: { slug: postSlug, categorySlug },
    })

    if (post?._id) {
      return {
        type: 'post',
        data: post,
        metadata: {
          title: post.metadata?.metaTitle || post.title || 'Post',
          description:
            post.metadata?.metaDescription ||
            portableTextToString(post.excerpt as PortableTextBlock[]) ||
            '',
          openGraphImage: post.metadata?.openGraphImage || post.coverImage || undefined,
          hideSearchIndex: post.metadata?.hideSearchIndex || false,
        },
      }
    }

    return { type: 'not-found' }
  }

  //
  // Too deep
  //
  return { type: 'not-found' }
}
