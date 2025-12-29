import Image from 'next/image'
import Link from 'next/link'

import { Badge } from '@/app/components/ui/badge'
import { type SearchResult } from '@/lib/hooks/use-search'
import { cn } from '@/lib/utils'

type PostCardData = {
  className?: string
  orientation?: 'horizontal' | 'vertical'
  post: SearchResult
}

export const CARD_THEME: Record<string, string> = {
  article: 'bg-sage-100 border-sage-200 hover:border-sage-500',
  guide: 'bg-terracota-100 border-terracota-200 hover:border-terracota-500',
  tool: 'bg-twilight-100 border-twilight-200 hover:border-twilight-500',
  service: 'bg-gold-100 border-gold-200 hover:border-gold-500',
  default: 'bg-card border-border hover:border-border-hover',
}

export default function SearchCard({ className, orientation = 'horizontal', post }: PostCardData) {
  const isHorizontal = orientation === 'horizontal'
  const themeClasses = CARD_THEME[post.postType ?? 'default']

  return (
    <Link
      href={`/${post.categorySlug}/${post.slug}`}
      className={cn(
        'flex flex-1 flex-col gap-6 rounded-lg border p-4 transition-colors',
        { 'items-center md:flex-row': isHorizontal },
        themeClasses,
        className,
      )}
    >
      {post.coverImage && (
        <div className={cn({ 'max-w-72 flex-1': isHorizontal })}>
          <Image
            src={post.coverImage || '/default-image.png'}
            alt={post.title || post.name || 'Image alt'}
            width={240}
            height={80}
            className="aspect-video w-full rounded-lg"
          />
        </div>
      )}

      <div className={cn('flex flex-col gap-2', { 'flex-1': isHorizontal })}>
        <div className="mb-1 flex flex-row items-center gap-1">
          <Badge variant={post.postType} className="capitalize text-white">
            {post.postType}
          </Badge>
          <Badge variant={post.postType} className="bg-transparent">
            {post.topicName}
          </Badge>
        </div>
        <h4 className="max-w-[34ch] font-sans text-xl font-medium">{post.title}</h4>
        {post.excerpt && (
          <p className="line-clamp-2 text-base text-foreground-subtle">{post.excerpt}</p>
        )}
      </div>
    </Link>
  )
}
