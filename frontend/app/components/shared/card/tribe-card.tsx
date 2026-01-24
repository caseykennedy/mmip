import { LuMapPin } from 'react-icons/lu'

import Link from 'next/link'
import { PortableTextBlock } from 'next-sanity'

import CustomPortableText from '@/app/components/shared/portable-text'
// import { Badge } from '@/app/components/ui/badge'
import Tile from '@/app/components/ui/tile'
import { cn } from '@/lib/utils'
import type { GetTribeQueryResult } from '@/sanity.types'

type Props = {
  className?: string
  tribe: Pick<
    NonNullable<GetTribeQueryResult>,
    'name' | 'shortDescription' | 'slug' | 'contactInfo'
  >
}

export default function TribeCard({ className, tribe }: Props) {
  return (
    <Link aria-label={tribe.name} href={`/tribes/${tribe.slug}`}>
      <article className={cn('flex size-full', className)}>
        <Tile className={cn('flex flex-1 flex-col gap-8', className)}>
          <div className="flex grow flex-col gap-2">
            <h3 className="font-sans text-lg font-medium">{tribe.name}</h3>
            {tribe.shortDescription && (
              <CustomPortableText
                paragraphClassName="line-clamp-3 text-sm text-foreground-subtle"
                value={tribe.shortDescription as PortableTextBlock[]}
              />
            )}
          </div>
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-1 text-foreground-subtle">
              <LuMapPin className="size-4" />
              <p className="text-sm">
                {tribe.contactInfo?.city}, {tribe.contactInfo?.state}
              </p>
            </div>
          </div>
        </Tile>
      </article>
    </Link>
  )
}
