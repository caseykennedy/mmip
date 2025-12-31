// app/[...slug]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import PageBuilderPage from '@/app/components/shared/page-builder'
import { resolveRoute } from '@/lib/resolve-route'
import type { GetPageQueryResult } from '@/sanity.types'
import { fetchSettings } from '@/sanity/lib/fetch'
import { resolveOpenGraphImage } from '@/sanity/lib/utils'

import CategoryTemplate from './_components/category-template'
import PostTemplate from './_components/post-template'
import PostTypeTemplate from './_components/post-type-template'

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
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const settings = await fetchSettings()
  const resolved = await resolveRoute(slug)

  if (resolved.type === 'not-found') return {}

  const ogImage =
    resolved.type === 'post' ? resolveOpenGraphImage(resolved.metadata.openGraphImage) : undefined
  const baseOgImage = resolveOpenGraphImage(settings?.ogImage)

  return {
    title: resolved.metadata.title,
    description: resolved.metadata.description,
    openGraph: {
      images: [ogImage ?? baseOgImage ?? ''],
    },
    robots:
      resolved.type === 'post'
        ? {
            index: !resolved.metadata.hideSearchIndex,
            follow: !resolved.metadata.hideSearchIndex,
            googleBot: {
              index: !resolved.metadata.hideSearchIndex,
              follow: !resolved.metadata.hideSearchIndex,
            },
          }
        : {},
  }
}

/**
 * ─────────────────────────────────────────
 * Page switch
 * ─────────────────────────────────────────
 */
export default async function Page({ params }: Props) {
  const { slug } = await params
  const resolved = await resolveRoute(slug)

  switch (resolved.type) {
    case 'page':
      return <RenderPage page={resolved.data} />
    case 'post-type':
      return <PostTypeTemplate data={resolved} />
    case 'category':
      return <CategoryTemplate data={resolved.data} />
    case 'topic':
      return <CategoryTemplate data={resolved.data} />
    case 'post':
      return <PostTemplate post={resolved.data} />
    case 'not-found':
      return notFound()
    default:
      return notFound()
  }
}

/**
 * ─────────────────────────────────────────
 * Render: One-off static page
 * ─────────────────────────────────────────
 */
function RenderPage({ page }: { page: NonNullable<GetPageQueryResult> }) {
  return (
    <div className="my-12 lg:my-24">
      <div className="container border-b border-gray-100 pb-6">
        <div className="max-w-3xl">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-7xl">
            {page.heading}
          </h2>
          <p className="mt-4 text-base font-light uppercase leading-relaxed text-gray-600 lg:text-lg">
            {page.subheading}
          </p>
        </div>
      </div>

      <PageBuilderPage page={page} />
    </div>
  )
}
