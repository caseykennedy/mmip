// app/[...slug]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import PageBuilderPage from '@/app/components/shared/page-builder'
import { resolveRoute } from '@/lib/resolve-route'
import type { GetPageQueryResult } from '@/sanity.types'
import { fetchAllServices, fetchSettings } from '@/sanity/lib/fetch'
import { allServicesQuery } from '@/sanity/lib/queries'
import { resolveOpenGraphImage } from '@/sanity/lib/utils'

import ServicesTemplate from './services-template'

type Props = {
  params: Promise<{ slug: string[] }>
}

/**
 * Generate the static params for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
// export async function generateStaticParams() {
//   const { data } = await sanityFetch({
//     query: postPagesSlugs,
//     // Use the published perspective in generateStaticParams
//     perspective: 'published',

//     stega: false,
//   })
//   return data
// }

/**
 * ─────────────────────────────────────────
 * Generate Metadata
 * ─────────────────────────────────────────
 */
// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const { slug } = await params
//   const settings = await fetchSettings()
//   const resolved = await resolveRoute(slug)

//   if (resolved.type === 'not-found') return {}

//   const ogImage =
//     resolved.type === 'post' ? resolveOpenGraphImage(resolved.metadata.openGraphImage) : undefined
//   const baseOgImage = resolveOpenGraphImage(settings?.ogImage)

//   return {
//     title: resolved.metadata.title,
//     description: resolved.metadata.description,
//     openGraph: {
//       images: [ogImage ?? baseOgImage ?? ''],
//     },
//     robots:
//       resolved.type === 'post'
//         ? {
//             index: !resolved.metadata.hideSearchIndex,
//             follow: !resolved.metadata.hideSearchIndex,
//             googleBot: {
//               index: !resolved.metadata.hideSearchIndex,
//               follow: !resolved.metadata.hideSearchIndex,
//             },
//           }
//         : {},
//   }
// }

/**
 * ─────────────────────────────────────────
 * Page switch
 * ─────────────────────────────────────────
 */
export default async function Page() {
  const data = await fetchAllServices()

  if (!data || data.length === 0) {
    notFound()
  }

  console.log('DATA', data)

  return <ServicesTemplate data={data} />
}
