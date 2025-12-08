import { RiArrowRightLine } from 'react-icons/ri'

import Link from 'next/link'

import Tile from '@/app/components/ui/tile'
import { fetchCategories } from '@/sanity/lib/fetch'

import SanityImage from './sanity-image'

import { stegaClean } from '@sanity/client/stega'

export default async function Categories() {
  const data = await fetchCategories()

  if (!data || data.length === 0) {
    return null
  }

  return (
    <div>
      <h2 className="mb-6 text-2xl">Explore by category</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {data.map(cat => {
          return (
            <Link key={cat._id} href={`${cat.slug}`}>
              <Tile className="group flex flex-col gap-6">
                {cat.image && cat.image.metadata && (
                  <div className="relative flex items-center justify-center py-8">
                    <SanityImage
                      source={cat.image}
                      alt={stegaClean(cat.image?.alt)}
                      fill={false}
                      sizes="100vw"
                    />
                  </div>
                )}
                <div className="flex flex-row items-center justify-between">
                  <p className="text-xl font-medium">{cat.name}</p>
                  <div className="bg-muted flex size-10 items-center justify-center rounded-full transition-colors group-hover:bg-secondary">
                    <RiArrowRightLine className="size-5 text-white" />
                  </div>
                </div>
              </Tile>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
