// import { InstallPrompt, PushNotificationManager } from '@/app/components/push-manager'

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { SITE_DESCRIPTION } from '@/lib/constants'
import { fetchHomeData } from '@/sanity/lib/fetch'
import { sanityFetch } from '@/sanity/lib/live'
import { getHomepageQuery } from '@/sanity/lib/queries'

import HomePage from './home-page'

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({
    query: getHomepageQuery,
    // Metadata should never contain stega
    stega: false,
  })

  const { seo, hero } = data ?? {}

  const title = seo?.metaTitle || hero?.heading
  const description = seo?.metaDescription || hero?.subheading

  return {
    title: {
      template: `%s | ${title}`,
      default: title ?? 'Resilient Relatives',
    },
    description: description ?? SITE_DESCRIPTION,
  }
}

export default async function Page() {
  const data = await fetchHomeData()

  if (!data) {
    return notFound()
  }
  return (
    <>
      {/* <PushNotificationManager /> */}
      {/* <InstallPrompt /> */}
      <HomePage data={data} />
    </>
  )
}
