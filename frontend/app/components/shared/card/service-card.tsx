import { LuMapPin } from 'react-icons/lu'

import Link from 'next/link'
import { PortableTextBlock } from 'next-sanity'

import CustomPortableText from '@/app/components/shared/portable-text'
import { Badge } from '@/app/components/ui/badge'
import Tile from '@/app/components/ui/tile'
import { cn } from '@/lib/utils'
import type { GetServiceQueryResult } from '@/sanity.types'

type ServiceCardData = {
  className?: string
  service: Pick<
    NonNullable<GetServiceQueryResult>,
    'name' | 'shortDescription' | 'serviceType' | 'slug' | 'contactInfo'
  >
}

export default function ServiceCard({ className, service }: ServiceCardData) {
  return (
    <article className={cn('flex w-full flex-1', className)}>
      <Link aria-label={service.name} href={`/services/${service.slug}`}>
        <Tile className={cn('flex flex-col gap-8', className)}>
          <div className="flex grow flex-col gap-2">
            <h3 className="font-sans text-lg font-medium">{service.name}</h3>
            {service.shortDescription && (
              <CustomPortableText
                paragraphClassName="line-clamp-3 text-sm text-foreground-subtle"
                value={service.shortDescription as PortableTextBlock[]}
              />
            )}
          </div>
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-1 text-foreground-subtle">
              <LuMapPin className="size-4" />
              <p className="text-sm">
                {service.contactInfo?.city}, {service.contactInfo?.state}
              </p>
            </div>
            <Badge variant="outline" className="bg-sand-200/50 font-normal">
              {service.serviceType.name}
            </Badge>
          </div>
        </Tile>
      </Link>
    </article>
  )
}
