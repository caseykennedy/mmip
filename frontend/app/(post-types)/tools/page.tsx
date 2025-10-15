// app/articles/page.tsx
import { Suspense } from 'react'

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import pluralize from 'pluralize-esm'

import { AllPostsByType } from '@/app/components/posts'
import { POST_TYPE } from '@/lib/constants'
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
  return <Suspense>{await AllPostsByType(POST_TYPE.TOOL)}</Suspense>
}
