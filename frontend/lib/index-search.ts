// For manual reindexing or initial setup
export async function reindexSearch(secret?: string) {
  const response = await fetch('/api/search/index', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${secret || 'dev-override'}`, // fallback for dev
    },
    body: JSON.stringify({ indexType: 'all' }),
  })

  return response.json()
}
