// app/articles/page.tsx
import { Suspense } from 'react'

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import pluralize from 'pluralize-esm'

import { POST_TYPE } from '@/lib/constants'
// import { GetPostTypeQueryResult } from '@/sanity.types'
import { sanityFetch } from '@/sanity/lib/live'
import { getPostsByTypeQuery } from '@/sanity/lib/queries'

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

export default async function Page() {
  const { data: posts } = await sanityFetch({
    query: getPostsByTypeQuery,
    params: { postType: POST_TYPE.ARTICLE },
  })

  const hasPosts = posts && posts.length > 0

  return (
    <div className="container my-16">
      <h1 className="mb-8 text-4xl font-bold capitalize">{pluralize(POST_TYPE.ARTICLE)}</h1>

      {hasPosts ? (
        <ul className="space-y-6">
          {posts.map(post => (
            <li key={post._id}>
              <a
                href={`/${post.category.slug}/${post.slug}`}
                className="text-xl font-semibold underline hover:text-red-500"
              >
                {post.title}
              </a>
              {post.excerpt && <p className="mt-1 text-gray-600">{post.excerpt}</p>}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-lg text-gray-600">
          Sorry, no {pluralize(POST_TYPE.ARTICLE).toLowerCase()} found.
        </p>
      )}
    </div>
  )
}
