import { internalGroqTypeReferenceTo, SanityImageMetadata } from '@/sanity.types'

export type PageReference = { slug: string | null; name?: string | null }
export type PostReference = { slug: string | null; title?: string | null }

export type ResolvedLinkType = {
  _type: 'link'
  linkType?: 'page' | 'post' | 'category' | 'href' | null
  label?: string | null // allow null from Sanity
  openInNewTab?: boolean | null // allow null from Sanity
  href?: string | null
  page?: PageReference | null
  post?: PostReference | null
  category?: PageReference | null
}

export type SanityImage = {
  alt: string
  asset: {
    _ref: string
    _type: 'reference'
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
  } | null
  metadata: SanityImageMetadata | null
  url: string | null
  extension: string | null
}
