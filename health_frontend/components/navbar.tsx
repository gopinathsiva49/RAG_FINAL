'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { api } from '@/lib/api'

export default function Navbar() {
  const router = useRouter()
  const [error, setError] = useState('')
  

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

  return (
    <nav className="bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-foreground">Health AI Assistant</h1>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}
