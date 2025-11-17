'use client'

import { useState, useRef, useEffect } from 'react'
import { api } from '@/lib/api'

interface Message {
  id: string
  type: 'user' | 'ai'
  text: string
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      text: 'Hello! I\'m your Health AI Assistant. I can help answer your health-related questions. What would you like to know today?',
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: input,
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    const token = localStorage.getItem('token')
    if (!token) {
      setIsLoading(false)
      return
    }

    const result = await api.search(input, token)
    setIsLoading(false)

    const aiResponse = result.data?.response || result.error || 'Unable to process your request. Please try again.'
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'ai',
      text: aiResponse,
    }
    setMessages(prev => [...prev, aiMessage])
  }

  return (
    <div className="flex flex-col h-screen" style={{ backgroundColor: '#f3f3f3' }}>
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 flex flex-col items-center">
        <div className="w-full max-w-[700px] space-y-4">
          {messages.map(message => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`px-4 py-3 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-none'
                    : 'bg-white text-foreground border border-border rounded-bl-none'
                }`}
                style={message.type === 'user' ? {} : { borderColor: '#e5e5e5' }}
              >
                <p className="text-sm md:text-base leading-relaxed">{message.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white text-foreground px-4 py-3 rounded-lg rounded-bl-none border border-border" style={{ borderColor: '#e5e5e5' }}>
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '100ms' }}></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="border-t border-border p-4 md:p-6" style={{ backgroundColor: '#f3f3f3' }}>
        <form onSubmit={handleSendMessage} className="max-w-[700px] mx-auto flex gap-3">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask me a health question..."
            className="flex-1 px-4 py-3 rounded-lg border border-input bg-white text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-0"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}
