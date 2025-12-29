'use client'

import { useCallback, useEffect, useState } from 'react'
import { LuSearch } from 'react-icons/lu'

import { useRouter } from 'next/navigation'

import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'

interface HeroSearchProps {
  onSearch?: (query: string) => void
  initialValue?: string
}

export default function HeroSearch({ onSearch, initialValue = '' }: HeroSearchProps) {
  const [query, setQuery] = useState(initialValue)
  const router = useRouter()

  // Update local state when initialValue changes (on mount)
  useEffect(() => {
    setQuery(initialValue)
  }, [initialValue])

  // Debounce the onSearch callback for instant search
  useEffect(() => {
    if (!onSearch) return

    const timer = setTimeout(() => {
      onSearch(query.trim())
    }, 300)

    return () => clearTimeout(timer)
  }, [query]) // Removed onSearch from dependency array!

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      if (onSearch) {
        // If we're on search page, use the callback immediately
        onSearch(query.trim())
      } else {
        // If we're on home page, navigate to search
        router.push(`/search?q=${encodeURIComponent(query.trim())}`)
      }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="relative flex items-center gap-2">
        <label
          htmlFor="hero-search"
          className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground-heading"
        >
          <LuSearch className="size-5" />
        </label>
        <Input
          id="hero-search"
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search articles, guides, and tools..."
          className="h-16 pl-12 md:text-lg"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <Button type="submit">Search</Button>
        </div>
      </div>
    </form>
  )
}
