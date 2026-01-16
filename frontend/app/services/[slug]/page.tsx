import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { fetchService, fetchSettings } from '@/sanity/lib/fetch'
import { resolveOpenGraphImage } from '@/sanity/lib/utils'

import ServiceTemplate from '../service-template'

type Props = {
  params: Promise<{ slug: string }>
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params

  // For now, we'll fetch without a category slug
  // You may need to adjust this based on your routing needs
  const service = await fetchService(slug)

  if (!service) {
    notFound()
  }

  return <ServiceTemplate service={service} />
}

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const { slug } = await params
//   const [service, settings] = await Promise.all([fetchService(slug), fetchSettings()])

//   if (!service) {
//     return {}
//   }

//   // Get description from shortDescription if available
//   const description = service.shortDescription?.[0]?.children?.[0]?.text || undefined
//   const ogImage = resolveOpenGraphImage(service.metadata?.ogImage, settings?.ogImage)

//   return {
//     title: service.metadata?.title || service.name,
//     description: service.metadata?.description || description,
//     openGraph: {
//       images: ogImage ? [ogImage] : [],
//     },
//   }
// }
