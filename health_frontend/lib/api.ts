const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api/v1'

interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

export const api = {
  async signup(name: string, email: string, password: string): Promise<ApiResponse<{ token: string }>> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })
      const data = await response.json()
      if (!response.ok) {
        return { error: data.message || 'Signup failed' }
      }
      return { data }
    } catch (error) {
      return { error: 'Network error. Please try again.' }
    }
  },

  async login(email: string, password: string): Promise<ApiResponse<{ token: string }>> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()
      if (!response.ok) {
        return { error: data.message || 'Login failed' }
      }
      return { data }
    } catch (error) {
      return { error: 'Network error. Please try again.' }
    }
  },

  async search(query: string, token: string): Promise<ApiResponse<{ response: string }>> {
    try {
      const response = await fetch(`${API_BASE_URL}/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
        body: JSON.stringify({ query }),
      })
      const data = await response.json()
      if (!response.ok) {
        return { error: data.message || 'Search failed' }
      }
      return { data: data.answer ? { response: data.answer } : undefined, message: data.message }
    } catch (error) {
      return { error: 'Network error. Please try again.' }
    }
  },
}
