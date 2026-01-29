import Link from 'next/link'
import pluralize from 'pluralize-esm'

import { Badge } from '@/app/components/ui/badge'
import { CARD_THEME } from '@/lib/constants'
import { type SearchResult } from '@/lib/hooks/use-search'
import { cn } from '@/lib/utils'

import SanityImage from '../sanity-image'

type PostCardData = {
  className?: string
  orientation?: 'horizontal' | 'vertical'
  post: SearchResult
}

export default function SearchCard({ className, orientation = 'vertical', post }: PostCardData) {
  const isHorizontal = orientation === 'horizontal'
  const themeClasses = CARD_THEME[post.postType ?? 'default']

  console.log('post.coverImage', post.coverImage)

  return (
    <article className={cn('flex w-full flex-1', className)}>
      <Link
        aria-label={post.title}
        href={`/${post.category?.slug}/${post.slug}`}
        className={cn(
          'flex flex-1 flex-col gap-6 rounded-xl border p-4 transition-colors',
          { 'items-center md:flex-row': isHorizontal },
          themeClasses,
          className,
        )}
      >
        <div className={cn({ 'max-w-72 flex-1': isHorizontal })}>
          <SanityImage
            source={post.coverImage}
            alt={post.coverImage?.alt}
            className="aspect-[3/2] w-full rounded-lg"
          />
        </div>

        <div className={cn('flex flex-col gap-2', { 'flex-1': isHorizontal })}>
          <div className="mb-1 flex flex-row items-center gap-1">
            <Badge variant={post.postType} className="capitalize text-white">
              {post.postType}
            </Badge>
            <Badge variant={post.postType} className="truncate bg-transparent">
              {post.topic?.name}
            </Badge>
          </div>
          <h4 className="max-w-[34ch] font-sans text-xl font-medium">{post.title}</h4>
          {post.excerpt && (
            <p className="line-clamp-2 text-base text-foreground-subtle">{post.excerpt}</p>
          )}
        </div>
      </Link>
    </article>
  )
}
