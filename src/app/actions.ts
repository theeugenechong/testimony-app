'use server'

import { addStory, deleteStory } from '@/lib/stories'

export async function submitStory(formData: FormData) {
  const content = formData.get('content') as string
  const author = formData.get('author') as string

  if (!content || !author) {
    return { error: 'Please provide both content and author name.' }
  }

  const result = await addStory({ content, author })
  if (!result.success) {
    return { error: result.error }
  }
  return { success: true }
}

export async function deleteStoryAction(id: string) {
  const result = await deleteStory(id)
  if (!result.success) {
    return { error: result.error }
  }
  return { success: true }
}

