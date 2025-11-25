// app/[...slug]/page.tsx
import { Suspense } from 'react'

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { type PortableTextBlock } from 'next-sanity'

import Avatar from '@/app/components/avatar'
import CoverImage from '@/app/components/cover-image'
import PageBuilderPage from '@/app/components/page-builder'
import PortableText from '@/app/components/portable-text'
import { MorePosts } from '@/app/components/posts'
import { GetPageQueryResult } from '@/sanity.types'
import { sanityFetch } from '@/sanity/lib/live'
import {
  allCategoriesQuery,
  getCategoryQuery,
  getPageQuery,
  getPostQuery,
  pagesSlugs,
} from '@/sanity/lib/queries'

type Props = {
  params: Promise<{ slug: string[] }>
}

/**
 * Generate the static params for the page.
 * https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
// export async function generateStaticParams() {
//   const { data } = await sanityFetch({
//     query: pagesSlugs,
//     // // Use the published perspective in generateStaticParams
//     perspective: 'published',
//     stega: false,
//   })
//   return data
// }

/**
 * Generate metadata for the page.
 * https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const resolvedParams = await params
//   const { data: page } = await sanityFetch({
//     query: getPageQuery,
//     params: resolvedParams,
//     // Metadata should never contain stega
//     stega: false,
//   })

//   return {
//     title: page?.name,
//     description: page?.heading,
//   }
// }

export default async function Page({ params }: Props) {
  const { slug: slugParts } = await params

  console.log('slugParts', slugParts)

  if (!slugParts || slugParts.length === 0) return notFound()

  const [{ data: categories }, { data: oneOffPage }] = await Promise.all([
    sanityFetch({ query: allCategoriesQuery }),
    slugParts.length === 1
      ? sanityFetch({ query: getPageQuery, params: { slug: slugParts[0] } })
      : Promise.resolve({ data: null }),
  ])
  const CATEGORY_LIST = categories.map(c => c.slug)

  console.log('categories', CATEGORY_LIST)

  // --- Case 1: Category overview ---
  if (slugParts.length === 1) {
    const [firstSlug] = slugParts
    if (CATEGORY_LIST.includes(firstSlug)) {
      const { data: category } = await sanityFetch({
        query: getCategoryQuery,
        params: { slug: firstSlug },
      })
      return (
        <div className="container my-16">
          <h1 className="text-4xl">{category?.name}</h1>
        </div>
      )
    }

    // One-off page
    if (oneOffPage?._id) {
      return (
        <div className="my-12 lg:my-24">
          <div className="">
            <div className="container">
              <div className="border-b border-gray-100 pb-6">
                <div className="max-w-3xl">
                  <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-7xl">
                    {oneOffPage.heading}
                  </h2>
                  <p className="mt-4 text-base font-light uppercase leading-relaxed text-gray-600 lg:text-lg">
                    {oneOffPage.subheading}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <PageBuilderPage page={oneOffPage as GetPageQueryResult} />
        </div>
      )
    }
  }

  // --- Case 2: Category + post ---
  if (slugParts.length === 2) {
    const [categorySlug, postSlug] = slugParts
    if (!CATEGORY_LIST.includes(categorySlug)) return notFound()

    const { data: post } = await sanityFetch({
      query: getPostQuery,
      params: { slug: postSlug, categorySlug: categorySlug },
    })

    if (!post?._id) {
      return notFound()
    }

    return (
      <>
        <div className="">
          <div className="container my-12 grid gap-12 lg:my-24">
            <div>
              <div className="mb-6 grid gap-6 border-b border-gray-100 pb-6">
                <div className="flex max-w-3xl flex-col gap-6">
                  <h1 className="">{post.title}</h1>
                </div>
                <div className="flex max-w-3xl items-center gap-4">
                  {post.authors && post.authors?.[0].firstName && post.authors?.[0].lastName && (
                    <Avatar person={post.authors[0]} date={post.date} />
                  )}
                </div>
              </div>
              <article className="grid max-w-4xl gap-6">
                <div className="">
                  <CoverImage image={post.coverImage} priority />
                </div>
                {post.content?.length && (
                  <PortableText
                    className="max-w-reading"
                    value={post.content as PortableTextBlock[]}
                  />
                )}
              </article>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-100">
          <div className="container my-12 grid gap-12 lg:my-24">
            <aside>
              <Suspense>{await MorePosts({ skip: post._id, limit: 2 })}</Suspense>
            </aside>
          </div>
        </div>
      </>
    )
  }

  return notFound()
}
