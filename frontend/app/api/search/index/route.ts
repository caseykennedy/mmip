import { algoliasearch } from 'algoliasearch'
import { NextRequest, NextResponse } from 'next/server'
import { PortableTextBlock } from 'next-sanity'

import { portableTextToString } from '@/lib/utils'
import { fetchAllPosts } from '@/sanity/lib/fetch'

const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.ALGOLIA_ADMIN_API_KEY!,
)

const POSTS_INDEX = 'posts'

export async function POST(request: NextRequest) {
  try {
    // Verify webhook signature/secret if using webhooks
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.SANITY_WEBHOOK_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { indexType = 'all' } = body

    console.log('Starting Algolia indexing...', { indexType })

    const results = []

    // Index posts
    if (indexType === 'all' || indexType === 'posts') {
      const posts = await fetchAllPosts()

      if (posts?.length) {
        const postsForIndex = posts.map(post => ({
          objectID: post._id,
          title: post.title,
          slug: post.slug,
          excerpt: portableTextToString(post.excerpt as PortableTextBlock[]),
          postType: post.postType,
          category: {
            name: post.category.name,
            slug: post.category.slug,
          },
          topic: {
            name: post.topic.name,
            slug: post.topic.slug,
          },
          region: post.region,
          date: post.date,
          url: `/${post.category?.slug}/${post.slug}`,
          type: 'post',
          coverImage: post.coverImage,
        }))

        const postResult = await client.saveObjects({
          indexName: POSTS_INDEX,
          objects: postsForIndex,
        })

        results.push({ index: POSTS_INDEX, count: postsForIndex.length, result: postResult })
      }
    }

    console.log('Algolia indexing completed:', results)

    return NextResponse.json({
      success: true,
      message: 'Search index updated successfully',
      results,
    })
  } catch (error) {
    console.error('Algolia indexing error:', error)
    return NextResponse.json(
      {
        error: 'Failed to update search index',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    )
  }
}

// Optional: Manual trigger endpoint for development
export async function GET() {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 403 })
  }

  // Trigger reindex manually in development
  return POST(
    new NextRequest('http://localhost:3000/api/search/index', {
      method: 'POST',
      headers: { authorization: `Bearer ${process.env.SANITY_WEBHOOK_SECRET}` },
      body: JSON.stringify({ indexType: 'all' }),
    }),
  )
}
