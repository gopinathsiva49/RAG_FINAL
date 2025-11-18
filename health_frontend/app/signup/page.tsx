'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '+91',
    phone: '',
    password: '',
    passwordConfirmation: '',
  })

  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    const { firstName, lastName, email, countryCode, phone, password, passwordConfirmation } = formData

    // Basic validations
    if (!firstName || !email || !password || !passwordConfirmation || !phone) {
      setError('All fields are required')
      return
    }

    if (password !== passwordConfirmation) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    if (!/^\d{7,12}$/.test(phone)) {
      setError("Invalid phone number")
      return
    }

    setIsLoading(true)

    const result = await api.signup(
      firstName,
      lastName,
      email,
      `${countryCode}${phone}`,
      password,
      passwordConfirmation
    )

    setIsLoading(false)

    if (result.error) {
      setError(result.error)
      return
    }

    if (result.data) {
      router.push('/login')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-xl shadow-md p-6 md:p-8">
          <h1 className="text-2xl font-bold text-card-foreground mb-6 text-center">Create Account</h1>

          {error && (
            <div className="bg-destructive/10 border border-destructive text-destructive rounded-lg p-3 mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* First Name */}
            <div>
              <label className="block text-sm font-medium mb-1">First Name</label>
              <input
                name="firstName"
                type="text"
                placeholder="John"
                value={formData.firstName}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full px-4 py-2 rounded-xl border"
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium mb-1">Last Name</label>
              <input
                name="lastName"
                type="text"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full px-4 py-2 rounded-xl border"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full px-4 py-2 rounded-xl border"
              />
            </div>

            {/* Phone Input */}
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>

              <div className="flex gap-2">
                {/* Country Code */}
                <input
                  name="countryCode"
                  type="text"
                  value={formData.countryCode}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-24 px-4 py-2 rounded-xl border"
                  placeholder="+91"
                />

                {/* Phone */}
                <input
                  name="phone"
                  type="tel"
                  placeholder="9876543210"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="flex-1 px-4 py-2 rounded-xl border"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                name="password"
                type="password"
                placeholder=""
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full px-4 py-2 rounded-xl border"
              />
            </div>

            {/* Password Confirmation */}
            <div>
              <label className="block text-sm font-medium mb-1">Confirm Password</label>
              <input
                name="passwordConfirmation"
                type="password"
                placeholder=""
                value={formData.passwordConfirmation}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full px-4 py-2 rounded-xl border"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white py-2 px-4 rounded-xl font-medium hover:bg-primary/90 mt-6 disabled:opacity-50"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-primary hover:underline font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
