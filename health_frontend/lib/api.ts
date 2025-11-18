const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

function handleUnauthorized(response: Response) {
  if (response.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/login";
    return true;
  }
  return false;
}

export const api = {
  async signup(firstName: string, lastName: string, email: string, phone: string, password: string, passwordConfirmation: string): Promise<ApiResponse<{ token: string }>> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: {
            first_name: firstName,
            last_name: lastName,
            email,
            phone,
            password,
            password_confirmation: passwordConfirmation
          }
        }),
      })

      if (handleUnauthorized(response)) return {}

      const data = await response.json()
      if (!response.ok) return { error: data.errors || 'Signup failed' }
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

      if (!response.ok) return { error: data.error || 'Login failed' }
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

      if (handleUnauthorized(response)) return {}

      const data = await response.json()
      if (!response.ok) return { error: data.message || 'Search failed' }

      return { data: data.answer ? { response: data.answer } : undefined, message: data.message }

    } catch (error) {
      return { error: 'Network error. Please try again.' }
    }
  },

  async logout(token: string): Promise<ApiResponse<{ response: string }>> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
      })

      if (handleUnauthorized(response)) return {}

      if (response.status === 204) {
        return { data: { response: "Logout successful" }, message: "Logout successful" }
      }

      let data = {}
      try {
        data = await response.json()
      } catch { }

      if (!response.ok) return { error: (data as any).message || "Logout failed" }

      return {
        data: (data as any).answer ? { response: (data as any).answer } : undefined,
        message: (data as any).message
      }

    } catch (error) {
      return { error: 'Network error. Please try again.' }
    }
  }
}
