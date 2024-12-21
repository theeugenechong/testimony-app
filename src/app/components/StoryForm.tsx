'use client'

import { useState, useRef } from 'react'
// import { useRouter } from 'next/navigation'
import { submitStory } from '../actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'

export function StoryForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  // const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(event.currentTarget)
    const result = await submitStory(formData)

    setIsSubmitting(false)

    if (result.success) {
      const form = event.target as HTMLFormElement
      form.reset()
      // The list will update automatically due to real-time subscription
    } else {
      setError(result.error || 'An error occurred while submitting your story.')
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          We wanna hear your testimony!
        </label>
        <Textarea
          id="content"
          name="content"
          rows={4}
          required
          className="mt-1"
          placeholder="Share your testimony here..."
        />
      </div>
      <div>
        <label htmlFor="author" className="block text-sm font-medium text-gray-700">
          Your Name
        </label>
        <Input
          type="text"
          id="author"
          name="author"
          required
          className="mt-1"
          placeholder="Anonymous"
        />
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Testimony'}
      </Button>
    </form>
  )
}

