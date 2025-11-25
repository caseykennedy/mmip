import { createDataAttribute, CreateDataAttributeProps } from 'next-sanity'

import { dataset, projectId, studioUrl } from '@/sanity/lib/api'
import { ResolvedLinkType } from '@/types'

import createImageUrlBuilder from '@sanity/image-url'

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

export const urlForImage = (source: any) => {
  // Ensure that source image contains a valid reference
  if (!source?.asset?._ref) {
    return undefined
  }

  return imageBuilder?.image(source).auto('format').fit('max')
}

export function resolveOpenGraphImage(image: any, width = 1200, height = 627) {
  if (!image) return
  const url = urlForImage(image)?.width(1200).height(627).fit('crop').url()
  if (!url) return
  return { url, alt: image?.alt as string, width, height }
}

// Depending on the type of link, we need to fetch the corresponding page, post, or URL.  Otherwise return null.
export function linkResolver(link: ResolvedLinkType | undefined) {
  if (!link) return null

  // If linkType is missing but href exists (portable text case)
  const linkType = link.linkType ?? (link.href ? 'href' : undefined)
  if (!linkType) return null

  switch (linkType) {
    case 'href':
      return link.href || null
    case 'page':
      return link.page ? (link.page.name === 'Home' ? '/' : `/${link.page.slug}`) : null
    case 'post':
      return link.post ? `/posts/${link.post.slug}` : null
    case 'category':
      return link.category ? `/${link.category.slug}` : null
    default:
      return null
  }
}

// export function linkLabelResolver(link: Link | undefined) {
//   if (!link) return null

//   if (link.label) return link.label

//   // If linkType is not set but href is, lets set linkType to "href".  This comes into play when pasting links into the portable text editor because a link type is not assumed.
//   if (!link.linkType && link.href) {
//     link.linkType = 'href'
//   }

//   switch (link.linkType) {
//     case 'href':
//       return link.label || null
//     case 'page':
//       if (link.page && typeof link.page === 'string') {
//         return link.page.name
//       }
//     case 'post':
//       if (link.post && typeof link.post === 'string') {
//         return link.post.title
//       }
//     case 'category':
//       if (link.category && typeof link.category === 'string') {
//         return link.category.name
//       }
//     default:
//       return null
//   }
// }

type DataAttributeConfig = CreateDataAttributeProps &
  Required<Pick<CreateDataAttributeProps, 'id' | 'type' | 'path'>>

export function dataAttr(config: DataAttributeConfig) {
  return createDataAttribute({
    projectId,
    dataset,
    baseUrl: studioUrl,
  }).combine(config)
}
