'use client'

import { Suspense, useMemo, useState } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import ServiceCard from '@/app/components/shared/card/service-card'
import Section from '@/app/components/shared/section'
import { Button } from '@/app/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select'
import type { AllServicesQueryResult } from '@/sanity.types'

// const data = {
//   name: 'Services',
//   description:
//     'Browse verified services for MMIP support—from emergency response and legal advocacy to healing, shelter, and youth programs—offered by Tribes, inter-tribal partners, and vetted providers across California.',
// }

function ServicesContent({ data }: { data: AllServicesQueryResult }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Initialize state directly from search params
  const [selectedRegion, setSelectedRegion] = useState<string>(
    () => searchParams.get('region') || 'all',
  )
  const [selectedServiceType, setSelectedServiceType] = useState<string>(
    () => searchParams.get('serviceType') || 'all',
  )
  const [displayCount, setDisplayCount] = useState(12)

  // Update URL when filters change
  const updateSearchParams = (region: string, serviceType: string) => {
    const params = new URLSearchParams(searchParams)

    if (region === 'all') {
      params.delete('region')
    } else {
      params.set('region', region)
    }

    if (serviceType === 'all') {
      params.delete('serviceType')
    } else {
      params.set('serviceType', serviceType)
    }

    const newUrl = params.toString() ? `?${params.toString()}` : window.location.pathname
    router.replace(newUrl, { scroll: false })
  }

  // Get unique service types from services
  const availableServiceTypes = useMemo(() => {
    const serviceTypesMap = new Map<string, { name: string; slug: string }>()

    data.forEach(service => {
      if (service.serviceType && service.serviceType.slug) {
        serviceTypesMap.set(service.serviceType.slug, {
          name: service.serviceType.name,
          slug: service.serviceType.slug,
        })
      }
    })

    return Array.from(serviceTypesMap.values())
  }, [data])

  // Filter services based on selected filters
  const filteredServices = useMemo(() => {
    return data.filter(service => {
      const regionMatch = selectedRegion === 'all' || service.region === selectedRegion
      const serviceTypeMatch =
        selectedServiceType === 'all' || service.serviceType?.slug === selectedServiceType
      return regionMatch && serviceTypeMatch
    })
  }, [data, selectedRegion, selectedServiceType])

  // Services to display (with load more functionality)
  const displayedServices = useMemo(() => {
    return filteredServices.slice(0, displayCount)
  }, [filteredServices, displayCount])

  // Check if there are more services to load
  const hasMoreServices = displayedServices.length < filteredServices.length

  // Load more function
  const loadMore = () => {
    setDisplayCount(prev => prev + 12)
  }

  // Reset display count when filters change
  const handleRegionChange = (value: string) => {
    setSelectedRegion(value)
    setDisplayCount(12)
    updateSearchParams(value, selectedServiceType)
  }

  const handleServiceTypeChange = (value: string) => {
    setSelectedServiceType(value)
    setDisplayCount(12)
    updateSearchParams(selectedRegion, value)
  }

  // Clear all filters
  const clearFilters = () => {
    setSelectedRegion('all')
    setSelectedServiceType('all')
    setDisplayCount(12)
    updateSearchParams('all', 'all')
  }

  return (
    <>
      <Section className="pb-8 sm:pb-8 lg:pb-8">
        <div className="container flex flex-col gap-16">
          {/* Header */}
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl text-foreground-heading">Services</h1>
            <p className="max-w-reading text-lg text-foreground-subtle">Services</p>
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

              {/* Service Type Filter */}
              <Select value={selectedServiceType} onValueChange={handleServiceTypeChange}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by service type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Service Types</SelectItem>
                  {availableServiceTypes.map(serviceType => (
                    <SelectItem key={serviceType.slug} value={serviceType.slug}>
                      {serviceType.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Clear Filters Button */}
              {(selectedRegion !== 'all' || selectedServiceType !== 'all') && (
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
          {/* Services Grid */}
          {displayedServices.length > 0 ? (
            <div className="space-y-8">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {displayedServices.map(service => (
                  <ServiceCard key={service._id} service={service} />
                ))}
              </div>

              {/* Load More Button */}
              {hasMoreServices && (
                <div className="flex justify-center">
                  <Button onClick={loadMore} variant="outline" size="lg">
                    Load More Services
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex justify-center py-12">
              <p className="text-lg text-gray-500">
                No services found matching the selected filters.
              </p>
            </div>
          )}

          {/* Results Summary */}
          <div className="mt-8 text-center text-sm text-gray-500">
            Showing {displayedServices.length} of {filteredServices.length} services
          </div>
        </div>
      </Section>
    </>
  )
}

export default function ServicesTemplate({ data }: { data: AllServicesQueryResult }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ServicesContent data={data} />
    </Suspense>
  )
}
