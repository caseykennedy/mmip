import { Suspense } from 'react'

import ResolvedLink from '@/app/components/resolved-link'
import { CallToAction } from '@/sanity.types'

type CtaProps = {
  block: CallToAction
  index: number
}

export default function Cta({ block }: CtaProps) {
  return (
    <div className="container my-12">
      <div className="max-w-3xl rounded-2xl border border-gray-100 bg-gray-50">
        <div className="flex flex-col gap-6 p-12">
          <div className="flex max-w-xl flex-col gap-3">
            <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
              {block.heading}
            </h2>
            <p className="text-lg leading-8 text-gray-600">{block.text}</p>
          </div>

          <Suspense fallback={null}>
            <div className="flex items-center gap-x-6 lg:mt-0 lg:shrink-0">
              <ResolvedLink
                link={block.link}
                className="mr-6 flex items-center gap-2 rounded-full bg-black px-6 py-3 text-white transition-colors duration-200 hover:bg-red-500 focus:bg-cyan-500"
              >
                {block.buttonText}
              </ResolvedLink>
            </div>
          </Suspense>
        </div>
      </div>
    </div>
  )
}
