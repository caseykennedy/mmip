'use client'

import { useState } from 'react'

import { Button } from '@/app/components/ui/button'

import SearchComponent from '../components/shared/search-input'

// Only show in development
export default function AdminPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  if (process.env.NODE_ENV !== 'development') {
    return <div>Not available in production</div>
  }

  const handleReindex = async () => {
    setIsLoading(true)
    try {
      // Call the server action or API route directly
      const response = await fetch('/api/search/index', {
        method: 'GET', // Use the GET endpoint you created for dev
      })
      const result = await response.json()
      setResult(result)
      console.log('Reindex result:', result)
    } catch (error) {
      console.error('Reindex error:', error)
      setResult({ error: 'Failed to reindex' })
    }
    setIsLoading(false)
  }

  return (
    <div className="container p-8">
      <h1>Admin Tools</h1>
      <div className="mt-8">
        <Button onClick={handleReindex} disabled={isLoading}>
          {isLoading ? 'Reindexing...' : 'Reindex Algolia Search'}
        </Button>
        {result && (
          <pre className="mt-4 rounded bg-gray-100 p-4">{JSON.stringify(result, null, 2)}</pre>
        )}
      </div>
      <div>
        <SearchComponent />
      </div>
    </div>
  )
}
