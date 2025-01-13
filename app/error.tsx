"use client"

import { useEffect } from "react"
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline"

import { Button } from "@/components/ui/button"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="container flex flex-col items-center justify-center gap-4 px-4 py-16 text-center">
        <ExclamationTriangleIcon className="w-12 h-12 text-destructive" />
        <h2 className="text-2xl font-bold tracking-tight">
          Something went wrong!
        </h2>
        <p className="text-muted-foreground">
          We apologize for the inconvenience. Please try refreshing the page.
        </p>
        <div className="flex gap-2">
          <Button variant="default" onClick={() => reset()}>
            Try again
          </Button>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Refresh page
          </Button>
        </div>
      </div>
    </div>
  )
}
