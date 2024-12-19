import { Suspense } from 'react'
import { getStories } from '@/lib/stories'
import { StoryForm } from './components/StoryForm'
import { StoryList } from './components/StoryList'

export const revalidate = 0 // disable cache for this page

async function StoriesContainer() {
  const stories = await getStories()
  return <StoryList initialStories={stories} />
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">CCC Year End Combined Service</h1>
        <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Share Your Testimony</h2>
          <StoryForm />
        </div>
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Testimonies</h2>
          <Suspense fallback={<div>Loading stories...</div>}>
            <StoriesContainer />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

