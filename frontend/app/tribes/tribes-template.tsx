'use client'

import { Suspense, useMemo, useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import TribeCard from '@/app/components/shared/card/tribe-card'
import Section from '@/app/components/shared/section'
import { Button } from '@/app/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select'
import type { AllTribesQueryResult } from '@/sanity.types'

// const data = {
//   name: 'Services',
//   description:
//     'Browse verified services for MMIP support—from emergency response and legal advocacy to healing, shelter, and youth programs—offered by Tribes, inter-tribal partners, and vetted providers across California.',
// }

function TribesContent({ data }: { data: AllTribesQueryResult }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Initialize state directly from search params
  const [selectedRegion, setSelectedRegion] = useState<string>(
    () => searchParams.get('region') || 'all',
  )

  const [displayCount, setDisplayCount] = useState(12)

  // Update URL when filters change
  const updateSearchParams = (region: string) => {
    const params = new URLSearchParams(searchParams)

    if (region === 'all') {
      params.delete('region')
    } else {
      params.set('region', region)
    }

    const newUrl = params.toString() ? `?${params.toString()}` : window.location.pathname
    router.replace(newUrl, { scroll: false })
  }

  // Filter tribes based on selected filters
  const filteredTribes = useMemo(() => {
    return data.filter(tribe => {
      const regionMatch = selectedRegion === 'all' || tribe.region === selectedRegion
      return regionMatch
    })
  }, [data, selectedRegion])

  // Tribes to display (with load more functionality)
  const displayedTribes = useMemo(() => {
    return filteredTribes.slice(0, displayCount)
  }, [filteredTribes, displayCount])

  // Check if there are more tribes to load
  const hasMoreTribes = displayedTribes.length < filteredTribes.length

  // Load more function
  const loadMore = () => {
    setDisplayCount(prev => prev + 12)
  }

  // Reset display count when filters change
  const handleRegionChange = (value: string) => {
    setSelectedRegion(value)
    setDisplayCount(12)
    updateSearchParams(value)
  }

  // Clear all filters
  const clearFilters = () => {
    setSelectedRegion('all')
    setDisplayCount(12)
    updateSearchParams('all')
  }

  return (
    <>
      <Section className="pb-8 sm:pb-8 lg:pb-8">
        <div className="container flex flex-col gap-16">
          {/* Header */}
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl text-foreground-heading">Tribes</h1>
            <p className="max-w-reading text-lg text-foreground-subtle">
              Browse California Tribes and their information, including contact details, locations,
              and community resources.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col justify-end md:flex-row md:items-center">
            <div className="flex flex-wrap items-center justify-end gap-4">
              {/* Region Filter */}
              <Select value={selectedRegion} onValueChange={handleRegionChange}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="north">Northern CA</SelectItem>
                  <SelectItem value="central">Central CA</SelectItem>
                  <SelectItem value="south">Southern CA</SelectItem>
                </SelectContent>
              </Select>

              {/* Clear Filters Button */}
              {selectedRegion !== 'all' && (
                <Button variant="ghost" onClick={clearFilters} size="sm">
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
        </div>
      </Section>

      <Section className="border-t">
        <div className="container">
          {/* Tribes Grid */}
          {displayedTribes.length > 0 ? (
            <div className="space-y-8">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {displayedTribes.map(tribe => (
                  <TribeCard key={tribe._id} tribe={tribe} />
                ))}
              </div>

              {/* Load More Button */}
              {hasMoreTribes && (
                <div className="flex justify-center">
                  <Button onClick={loadMore} variant="outline" size="lg">
                    Load More Tribes
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex justify-center py-12">
              <p className="text-lg text-gray-500">
                No tribes found matching the selected filters.
              </p>
            </div>
          )}

          {/* Results Summary */}
          <div className="mt-8 text-center text-sm text-gray-500">
            Showing {displayedTribes.length} of {filteredTribes.length} tribes
          </div>
        </div>
      </Section>
    </>
  )
}

export default function TribesTemplate({ data }: { data: AllTribesQueryResult }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TribesContent data={data} />
    </Suspense>
  )
}
