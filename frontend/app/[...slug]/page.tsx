// app/[...slug]/page.tsx
import { Suspense } from 'react'

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PortableTextBlock } from 'next-sanity'

import Avatar from '@/app/components/avatar'
import CoverImage from '@/app/components/cover-image'
import PageBuilderPage from '@/app/components/page-builder'
import PortableText from '@/app/components/portable-text'
import { MorePosts } from '@/app/components/posts'
import { resolveRoute } from '@/lib/resolve-route'
import type { GetCategoryQueryResult, GetPageQueryResult, GetPostQueryResult } from '@/sanity.types'
import { resolveOpenGraphImage } from '@/sanity/lib/utils'

type Props = {
  params: Promise<{ slug: string[] }>
}

/**
 * ─────────────────────────────────────────
 * Generate Metadata
 * ─────────────────────────────────────────
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const resolved = await resolveRoute(slug)

  if (resolved.type === 'not-found') return {}

  const ogImage =
    resolved.type === 'post' ? resolveOpenGraphImage(resolved.metadata.openGraphImage) : undefined

  return {
    title: resolved.metadata.title,
    description: resolved.metadata.description,
    openGraph: {
      images: [ogImage ?? '/og-default.jpg'],
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
 * Page Renderer
 * ─────────────────────────────────────────
 */
export default async function Page({ params }: Props) {
  const { slug } = await params
  const resolved = await resolveRoute(slug)

  switch (resolved.type) {
    case 'page':
      return <RenderPage page={resolved.data} />
    case 'category':
      return <RenderCategory category={resolved.data} />
    case 'post':
      return <RenderPost post={resolved.data} />
    case 'not-found':
      return notFound()

    default:
      return notFound()
  }
}

/**
 * ─────────────────────────────────────────
 * Render: One-off Static Page
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

/**
 * ─────────────────────────────────────────
 * Render: Category Overview
 * ─────────────────────────────────────────
 */
function RenderCategory({ category }: { category: NonNullable<GetCategoryQueryResult> }) {
  return (
    <div className="container my-16">
      <h1 className="text-4xl">{category.name}</h1>
    </div>
  )
}

/**
 * ─────────────────────────────────────────
 * Render: Post inside a Category
 * ─────────────────────────────────────────
 */
async function RenderPost({ post }: { post: NonNullable<GetPostQueryResult> }) {
  return (
    <>
      <div>
        <div className="container my-12 grid gap-12 lg:my-24">
          <div>
            <div className="mb-6 grid gap-6 border-b border-gray-100 pb-6">
              <div className="flex max-w-3xl flex-col gap-6">
                <h1>{post.title}</h1>
              </div>

              <div className="flex max-w-3xl items-center gap-4">
                {post.authors?.[0]?.firstName && post.authors?.[0]?.lastName && (
                  <Avatar person={post.authors[0]} date={post.date} />
                )}
              </div>
            </div>

            <article className="grid max-w-4xl gap-6">
              <div>
                <CoverImage image={post.coverImage} priority />
              </div>

              {post.body?.length && (
                <PortableText className="max-w-reading" value={post.body as PortableTextBlock[]} />
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
