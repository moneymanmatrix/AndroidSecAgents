"use client"

import { useEffect, useState } from "react"
import { AlertCircle, X } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

export function EnvWarning() {
  const [visible, setVisible] = useState(false)
  const [missingVars, setMissingVars] = useState<string[]>([])

  useEffect(() => {
    // Check which environment variables are missing
    const missing = []
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) missing.push("NEXT_PUBLIC_SUPABASE_URL")
    if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) missing.push("NEXT_PUBLIC_SUPABASE_ANON_KEY")

    if (missing.length > 0) {
      setMissingVars(missing)
      setVisible(true)
    }
  }, [])

  if (!visible) return null

  return (
    <Alert className="fixed bottom-4 right-4 z-50 max-w-md border-amber-500 bg-amber-50 text-amber-900 dark:bg-amber-950 dark:text-amber-200">
      <AlertCircle className="h-4 w-4" />
      <div className="flex-1">
        <AlertTitle>Environment Variables Missing</AlertTitle>
        <AlertDescription>
          <p className="mb-2">The following environment variables are missing:</p>
          <ul className="list-disc pl-5 mb-2">
            {missingVars.map((variable) => (
              <li key={variable}>{variable}</li>
            ))}
          </ul>
          <p>Using mock data for demonstration. Set these variables in your environment to connect to Supabase.</p>
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
