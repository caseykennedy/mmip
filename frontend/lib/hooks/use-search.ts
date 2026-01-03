import { useEffect, useState } from 'react'

import { INDEXES, searchClient } from '@/lib/algolia'
import { SanityImage } from '@/types'

export interface SearchResult {
  objectID: string
  title: string
  slug: string
  excerpt: string
  postType: 'article' | 'guide' | 'tool'
  category: {
    name: string
    slug: string
  }
  topic: {
    name: string
    slug: string
  }
  region: string
  date: string
  url: string
  type: 'post' | 'service'
  coverImage: SanityImage
}

const attributesToRetrieve = [
  'title',
  'slug',
  'excerpt',
  'postType',
  'category',
  'topic',
  'region',
  'date',
  'url',
  'type',
  'coverImage',
]

// Original hook for command palette (no pagination)
export function useSearch(query: string): {
  results: SearchResult[]
  isLoading: boolean
  error: string | null
} {
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const searchAlgolia = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await searchClient.searchSingleIndex({
          indexName: INDEXES.posts,
          searchParams: {
            query: query.trim(), // Empty query will return recent posts
            hitsPerPage: 3, // Fewer results for command palette
            attributesToRetrieve,
          },
        })

        const newResults = response.hits as SearchResult[]
        setResults(newResults)
      } catch (err) {
        console.error('Search error:', err)
        setError('Search failed')
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }

    // If no query, search immediately for recent posts
    // If there's a query, debounce the search
    if (!query.trim()) {
      searchAlgolia()
    } else {
      const debounceTimer = setTimeout(searchAlgolia, 300)
      return () => clearTimeout(debounceTimer)
    }
  }, [query])

  return { results, isLoading, error }
}

// New hook for search page with pagination
export function useSearchWithPagination(query: string, page: number = 0) {
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(false)
  const [totalResults, setTotalResults] = useState(0)
  const [currentQuery, setCurrentQuery] = useState<string>('')

  useEffect(() => {
    const searchAlgolia = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const searchParams = {
          indexName: INDEXES.posts,
          searchParams: {
            query: query.trim(), // Empty string will return all results
            page,
            hitsPerPage: 12, // More results when showing all posts
            attributesToRetrieve,
          },
        }

        const response = await searchClient.searchSingleIndex(searchParams)
        const newResults = response.hits as SearchResult[]

        // Determine if this is a new search or pagination
        const isNewSearch = page === 0 || currentQuery !== query.trim()

        if (isNewSearch) {
          // New search - replace results and update current query
          setResults(newResults)
          setCurrentQuery(query.trim())
        } else {
          // Same search, next page - append results
          setResults(prev => [...prev, ...newResults])
        }

        setTotalResults(response.nbHits ?? 0)
        setHasMore(page < (response.nbPages ?? 1) - 1)
      } catch (err) {
        console.error('Search error:', err)
        setError('Search failed')
        // Only clear results on error if it's a new search, not pagination
        if (page === 0) {
          setResults([])
        }
        setHasMore(false)
        setTotalResults(0)
      } finally {
        setIsLoading(false)
      }
    }

    // No debouncing for empty query, slight debounce for searches
    const debounceTimer = setTimeout(searchAlgolia, query.trim() ? 300 : 0)
    return () => clearTimeout(debounceTimer)
  }, [currentQuery, query, page]) // Fixed dependencies

  return { results, isLoading, error, hasMore, totalResults }
}
