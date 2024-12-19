'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { deleteStoryAction } from '../actions'
import { Story } from '@/lib/stories'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

interface StoryListProps {
  initialStories: Story[]
}

export function StoryList({ initialStories }: StoryListProps) {
  const [stories, setStories] = useState(initialStories)
  const { isLoggedIn } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const channel = supabase
      .channel('stories')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'stories' }, (payload) => {
        setStories((currentStories) => [payload.new as Story, ...currentStories])
      })
      .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'stories' }, (payload) => {
        setStories((currentStories) => currentStories.filter(story => story.id !== payload.old.id))
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const handleDelete = async (id: string) => {
    const result = await deleteStoryAction(id)
    if (result.success) {
      setStories(stories.filter(story => story.id !== id))
    } else {
      alert(result.error)
    }
  }

  return (
    <ul className="space-y-6">
      {stories.length === 0 ? (
        <p className="text-gray-500">No testimonies yet. Be the first to share!</p>
      ) : (
        stories.map((story) => (
          <li key={story.id} className="border-b pb-4 last:border-b-0">
            <p className="mb-2">{story.content}</p>
            <div className="text-sm text-gray-500 flex justify-between items-center">
              <div>
                <span className="font-medium">{story.author}</span> &middot;{' '}
                <time dateTime={story.created_at}>
                  {new Date(story.created_at).toLocaleString()}
                </time>
              </div>
              {isLoggedIn && (
                <Button variant="destructive" size="sm" onClick={() => handleDelete(story.id)}>
                  Delete
                </Button>
              )}
            </div>
          </li>
        ))
      )}
    </ul>
  )
}

