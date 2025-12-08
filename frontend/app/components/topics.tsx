import Link from 'next/link'

import Tile from '@/app/components/ui/tile'
import { fetchTopics } from '@/sanity/lib/fetch'

import SanityImage from './sanity-image'

export default async function Topics() {
  const data = await fetchTopics()

  if (!data || data.length === 0) {
    return null
  }

  return (
    <div>
      <h2 className="mb-6 text-2xl">Browse by topic</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {data.map(topic => {
          return (
            <Link key={topic._id} href={`${topic.slug}`}>
              <Tile className="group flex flex-col gap-2">
                {topic.image && topic.image.metadata && (
                  <div className="relative flex items-center justify-center py-6">
                    <SanityImage
                      source={topic.image}
                      alt={topic.image?.alt}
                      fill={false}
                      sizes="100vw"
                    />
                  </div>
                )}
                <div className="flex flex-row justify-center">
                  <p className="text-center text-lg font-medium">{topic.name}</p>
                </div>
              </Tile>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
