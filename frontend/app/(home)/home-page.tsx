import { Suspense } from 'react'

import Link from 'next/link'

import GetStartedCode from '@/app/components/get-started-code'
import { AllPosts } from '@/app/components/posts'

// interface Props {}

export default async function HomePage({}) {
  return (
    <>
      <div className="relative bg-gradient-to-r from-red-200 from-0% via-white via-40%">
        <div className="container">
          <div className="py-32">
            <div className="flex flex-col gap-4">
              <h1 className="display">Together, we protect our people.</h1>
              <p className="lead">
                Resilient Relatives is an Native-led resource addressing the MMIP crisis—empowering
                California Tribal communities to respond, advocate, and heal.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t">
        <div className="container">
          <aside className="py-12 sm:py-20">
            <Suspense>{await AllPosts()}</Suspense>
          </aside>
        </div>
      </div>
    </>
  )
}
