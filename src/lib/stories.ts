import { supabase } from './supabase'

export interface Story {
  id: string
  content: string
  author: string
  created_at: string
}

const profanityList = ['explicit', 'offensive', 'inappropriate'] // Add more words as needed

function containsProfanity(text: string): boolean {
  const lowerText = text.toLowerCase()
  return profanityList.some(word => lowerText.includes(word))
}

export async function getStories(): Promise<Story[]> {
  const { data, error } = await supabase
    .from('stories')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching stories:', error)
    return []
  }

  return data || []
}

export async function addStory(story: Omit<Story, 'id' | 'created_at'>): Promise<{ success: boolean; error?: string }> {
  if (containsProfanity(story.content) || containsProfanity(story.author)) {
    return { success: false, error: 'Your story contains inappropriate content.' }
  }

  const { error } = await supabase
    .from('stories')
    .insert([story])
    .select()

  if (error) {
    console.error('Error adding story:', error)
    return { success: false, error: 'Failed to add the story. Please try again.' }
  }

  return { success: true }
}

export async function deleteStory(id: string): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase
    .from('stories')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting story:', error)
    return { success: false, error: 'Failed to delete the story.' }
  }

  return { success: true }
}

