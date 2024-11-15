import { useState, useEffect } from 'react'
import { getLoggedInUser } from '@/lib/appwrite'
import { AppwriteUser } from '@/lib/types'

export const useUser = () => {
  const [user, setUser] = useState<AppwriteUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getLoggedInUser() as AppwriteUser
        setUser(userData)
      } catch (error) {
        console.error('Error fetching user data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  return { user, loading }
}