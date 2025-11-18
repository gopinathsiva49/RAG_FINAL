'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { api } from '@/lib/api'

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null) // null initially
  const router = useRouter()
  const [error, setError] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const result = await api.logout(token)

      if (result.error) {
        setError(result.error)
        return
      }

      localStorage.removeItem('token')
      router.push('/login')
    } catch (err) {
      console.error(err)
      setError('Something went wrong while logging out.')
    }
  }

  // While checking auth, prevent UI flash
  if (isAuthenticated === null) return null

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="text-center px-4">
        <h1 className="text-4xl font-bold text-foreground mb-4">Health AI Assistant</h1>
        <p className="text-lg text-muted-foreground mb-12">Your intelligent health companion</p>

        <Link 
          href="/chat" 
          className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors font-medium mb-6"
        >
          Start Chat
        </Link>

        {error && (
          <div className="text-destructive mb-4">{error}</div>
        )}

        <button
          onClick={handleLogout}
          className="px-6 py-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors font-medium"
        >
          Logout
        </button>
      </div>
    </div>
  )
}
