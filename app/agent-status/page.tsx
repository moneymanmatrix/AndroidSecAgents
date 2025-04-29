import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, AlertCircle, CheckCircle, Clock } from "lucide-react"
import { createServerClient } from "@/lib/supabase-server"
import { AnimatedTitle } from "@/components/animated-title"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { getMockData } from "@/lib/mock-data"

async function getAgents() {
  try {
    const supabase = createServerClient()
    const { data, error } = await supabase.from("agents").select("*").order("name")

    if (error) {
      console.error("Error fetching agents:", error)
      return getMockData("agents")
    }

    // Ensure we always return an array, even if data is null or undefined
    return Array.isArray(data) && data.length > 0 ? data : getMockData("agents")
  } catch (error) {
    console.error("Failed to fetch agents:", error)
    return getMockData("agents")
  }
}

function getStatusBadge(status: string) {
  switch (status) {
    case "Running":
      return (
        <Badge className="bg-primary text-primary-foreground flex gap-1 items-center">
          <Activity className="h-3 w-3" />
          Running
        </Badge>
      )
    case "Completed":
      return (
        <Badge className="bg-green-500 text-white flex gap-1 items-center">
          <CheckCircle className="h-3 w-3" />
          Completed
        </Badge>
      )
    case "Error":
      return (
        <Badge className="bg-accent-red text-white flex gap-1 items-center">
          <AlertCircle className="h-3 w-3" />
          Error
        </Badge>
      )
    case "Idle":
    default:
      return (
        <Badge variant="outline" className="flex gap-1 items-center">
          <Clock className="h-3 w-3" />
          Idle
        </Badge>
      )
  }
}

export default async function AgentStatusPage() {
  let agents = []
  let error = null
  let isUsingMockData = false

  try {
    agents = await getAgents()
    // Check if we're using mock data
    isUsingMockData = agents === getMockData("agents")
  } catch (err) {
    console.error("Error in AgentStatusPage:", err)
    error = "Failed to load agent data. Using demo data instead."
    agents = getMockData("agents")
    isUsingMockData = true
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <AnimatedTitle title="Agent Status" subtitle="Monitor the status of all security agents in the system" />
      </div>

      {(error || isUsingMockData) && (
        <Alert className="mb-4 border-amber-500 bg-amber-50 text-amber-900 dark:bg-amber-950 dark:text-amber-200">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Demo Mode Active</AlertTitle>
          <AlertDescription>
            {error || "Using sample data for demonstration. Database connection unavailable."}
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {agents.map((agent, index) => (
          <Card
            key={agent.id}
            className="border border-border/50 hover:border-primary/50 transition-all duration-200 overflow-hidden animate-slide-up"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <CardHeader className="bg-card/50 backdrop-blur-sm">
              <CardTitle className="flex items-center justify-between">
                <span>{agent.name}</span>
                {getStatusBadge(agent.status)}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-sm text-muted-foreground">
                Last activity: {new Date(agent.last_run).toLocaleString()}
              </p>
              <p className="mt-2 text-sm">{agent.summary}</p>
            </CardContent>
            <CardFooter className="bg-card/30 backdrop-blur-sm">
              <Button
                asChild
                variant="outline"
                className="w-full hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <a href={`/${agent.name.toLowerCase().replace(/\s+/g, "-")}`}>View Latest Data</a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
