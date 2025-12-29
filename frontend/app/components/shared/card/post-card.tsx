import Link from 'next/link'
import { PortableTextBlock } from 'next-sanity'

import CustomPortableText from '@/app/components/shared/portable-text'
import SanityImage from '@/app/components/shared/sanity-image'
import { Badge } from '@/app/components/ui/badge'
import { cn } from '@/lib/utils'
import { AllPostsQueryResult } from '@/sanity.types'

type PostCardData = {
  className?: string
  orientation?: 'horizontal' | 'vertical'
  post: Pick<
    AllPostsQueryResult[0],
    'title' | 'excerpt' | 'coverImage' | 'category' | 'topic' | 'postType' | 'slug'
  >
}

export const CARD_THEME: Record<string, string> = {
  article: 'bg-sage-100 border-sage-200 hover:border-sage-500',
  guide: 'bg-terracota-100 border-terracota-200 hover:border-terracota-500',
  tool: 'bg-twilight-100 border-twilight-200 hover:border-twilight-500',
  service: 'bg-gold-100 border-gold-200 hover:border-gold-500',
  default: 'bg-card border-border hover:border-border-hover',
}

export default function PostCard({ className, orientation = 'vertical', post }: PostCardData) {
  const isHorizontal = orientation === 'horizontal'
  const themeClasses = CARD_THEME[post.postType ?? 'default']

  return (
    <Link
      href={`/${post.category.slug}/${post.slug}`}
      className={cn(
        'flex flex-1 flex-col gap-6 rounded-lg border p-4 transition-colors',
        { 'items-center md:flex-row': isHorizontal },
        themeClasses,
        className,
      )}
    >
      <div className={cn({ 'flex-1': isHorizontal })}>
        <SanityImage
          source={post.coverImage}
          alt={post.coverImage?.alt}
          className="aspect-video w-full rounded-md"
        />
      </div>

      <div className={cn('flex flex-col gap-2', { 'flex-1': isHorizontal })}>
        <div className="mb-1 flex flex-row items-center gap-1">
          <Badge variant={post.postType} className="capitalize text-white">
            {post.postType}
          </Badge>
          <Badge variant={post.postType} className="bg-transparent">
            {post.topic.name}
          </Badge>
        </div>
        <h4 className="max-w-[34ch] font-sans text-xl font-medium">{post.title}</h4>
        {post.excerpt && (
          <CustomPortableText
            paragraphClassName="line-clamp-3"
            value={post.excerpt as PortableTextBlock[]}
          />
        )}
      </div>
    </Link>
  )
}
