import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, Search, AlertCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { createServerClient } from "@/lib/supabase-server"
import { AnimatedTitle } from "@/components/animated-title"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { getMockData } from "@/lib/mock-data"

async function getVulnerabilities() {
  try {
    const supabase = createServerClient()
    const { data, error } = await supabase.from("vulnerabilities").select("*").order("date_found", { ascending: false })

    if (error) {
      console.error("Error fetching vulnerabilities:", error)
      return getMockData("vulnerabilities")
    }

    // Ensure we always return an array, even if data is null or undefined
    return Array.isArray(data) && data.length > 0 ? data : getMockData("vulnerabilities")
  } catch (error) {
    console.error("Failed to fetch vulnerabilities:", error)
    return getMockData("vulnerabilities")
  }
}

export default async function ScrapedDataPage() {
  let scrapedData = []
  let error = null
  let isUsingMockData = false

  try {
    scrapedData = await getVulnerabilities()
    // Check if we're using mock data
    isUsingMockData = scrapedData === getMockData("vulnerabilities")
  } catch (err) {
    console.error("Error in ScrapedDataPage:", err)
    error = "Failed to load vulnerability data. Using demo data instead."
    scrapedData = getMockData("vulnerabilities")
    isUsingMockData = true
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <AnimatedTitle title="Scraped Data" subtitle="View and analyze data collected by the Scraper Agent" />
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

      <Card className="mb-6 border border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Filter Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by title or CVE..." className="pl-8 bg-background/50" />
            </div>
            <Button variant="secondary">Apply Filters</Button>
          </div>
        </CardContent>
      </Card>

      <div className="rounded-md border border-border/50 overflow-hidden animate-slide-up">
        <Table>
          <TableHeader className="bg-card/50 backdrop-blur-sm">
            <TableRow>
              <TableHead>Source URL</TableHead>
              <TableHead>Title/Headline</TableHead>
              <TableHead>Date Found</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {scrapedData.map((item, index) => (
              <TableRow
                key={item.id}
                className="animate-fade-in hover:bg-muted/30"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <TableCell className="max-w-[200px] truncate">
                  <a
                    href={item.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline flex items-center gap-1"
                  >
                    {item.source_url.substring(0, 30)}...
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </TableCell>
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell>{new Date(item.date_found).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge
                    variant={item.status === "New" ? "default" : "secondary"}
                    className={item.status === "New" ? "bg-accent-orange text-white" : ""}
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Analyze
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
