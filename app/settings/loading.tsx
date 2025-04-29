import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function SettingsLoading() {
  return (
    <div className="animate-pulse">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-36 mt-4 sm:mt-0" />
      </div>

      <Skeleton className="h-10 w-full mb-6" />

      <Card className="border border-border/50 mb-6">
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent className="space-y-6">
          {Array(4)
            .fill(null)
            .map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-36" />
                  <Skeleton className="h-4 w-64" />
                </div>
                <Skeleton className="h-6 w-12" />
              </div>
            ))}
        </CardContent>
      </Card>

      <Card className="border border-border/50">
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent className="space-y-6">
          {Array(3)
            .fill(null)
            .map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-36" />
                  <Skeleton className="h-4 w-64" />
                </div>
                <Skeleton className="h-6 w-12" />
              </div>
            ))}
        </CardContent>
      </Card>
    </div>
  )
}
