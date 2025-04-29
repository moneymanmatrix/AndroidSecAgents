"use client"

import { useState, useEffect } from "react"
import { X, Database } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

export function DemoModeBanner() {
  const [visible, setVisible] = useState(false)
  const [isOffline, setIsOffline] = useState(false)
  const [forceMock, setForceMock] = useState(false)

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window !== "undefined") {
      // Check network status
      const handleOnline = () => setIsOffline(false)
      const handleOffline = () => setIsOffline(true)

      window.addEventListener("online", handleOnline)
      window.addEventListener("offline", handleOffline)

      // Initial check
      setIsOffline(!navigator.onLine)

      // Check if we're forcing mock mode
      setForceMock(process.env.NODE_ENV === "development")

      // Show banner if offline or in development
      setVisible(!navigator.onLine || process.env.NODE_ENV === "development")

      return () => {
        window.removeEventListener("online", handleOnline)
        window.removeEventListener("offline", handleOffline)
      }
    }
  }, [])

  if (!visible) return null

  return (
    <Alert className="fixed bottom-4 right-4 z-50 max-w-md border-amber-500 bg-amber-50 text-amber-900 dark:bg-amber-950 dark:text-amber-200">
      <Database className="h-4 w-4" />
      <div className="flex-1">
        <AlertTitle>{isOffline ? "Offline Mode" : forceMock ? "Development Mode" : "Demo Mode"}</AlertTitle>
        <AlertDescription>
          {isOffline
            ? "You are currently offline. The app is running with sample data."
            : forceMock
              ? "Running in development mode with sample data. Set up Supabase for real data."
              : "Using sample data due to database connection issues."}
        </AlertDescription>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 h-6 w-6 text-amber-900 dark:text-amber-200"
        onClick={() => setVisible(false)}
      >
        <X className="h-4 w-4" />
      </Button>
    </Alert>
  )
}
