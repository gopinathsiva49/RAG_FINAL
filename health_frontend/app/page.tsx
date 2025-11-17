import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">Health AI Assistant</h1>
        <p className="text-lg text-muted-foreground mb-8">Your intelligent health companion</p>
        <div className="flex gap-4 justify-center">
          <Link href="/login" className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            Login
          </Link>
          <Link href="/signup" className="px-6 py-2 bg-secondary text-secondary-foreground border border-border rounded-lg hover:bg-secondary/90 transition-colors">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  )
}
