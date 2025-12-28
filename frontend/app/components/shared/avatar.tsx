import { Image } from 'next-sanity/image'

import DateComponent from '@/app/components/shared/date'
import { urlForImage } from '@/sanity/lib/utils'

type Props = {
  person: {
    firstName: string | null
    lastName: string | null
    picture?: any
  }
  date: string
}

export default function Avatar({ person, date }: Props) {
  const { firstName, lastName, picture } = person

  return (
    <div className="flex items-center">
      {picture?.asset?._ref ? (
        <div className="mr-4 size-9">
          <Image
            alt={picture?.alt || ''}
            className="h-full rounded-full object-cover"
            height={54}
            width={54}
            src={urlForImage(picture)?.height(108).width(108).fit('crop').url() as string}
          />
        </div>
      ) : (
        <div className="mr-1">By </div>
      )}
      <div className="flex flex-col">
        {firstName && lastName && (
          <div className="font-bold">
            {firstName} {lastName}
          </div>
        )}
        <div className="text-sm text-foreground-subtle">
          <DateComponent dateString={date} />
        </div>
      </div>
    </div>
  )
}
