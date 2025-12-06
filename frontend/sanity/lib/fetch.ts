import { draftMode } from 'next/headers'

import { isPreviewEnvironment } from '@/sanity/lib/api'
import { sanityFetch } from '@/sanity/lib/live'

type FetchOptions<T> = {
  query: string
  params?: Record<string, any>
  tags?: string[]
  perspective?: 'drafts' | 'published'
  stega?: boolean
}

export async function fetchData<T>({
  query,
  params,
  tags,
  perspective,
  stega,
}: FetchOptions<T>): Promise<T> {
  const { isEnabled: isDraftMode } = await draftMode()

  const { data } = await sanityFetch({
    query,
    params,
    perspective: perspective ?? (isDraftMode || isPreviewEnvironment ? 'drafts' : 'published'),
    stega: stega ?? false,
    tags,
  })

  return data as T
}
