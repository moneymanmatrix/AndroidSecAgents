import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

const githubFindings = [
  {
    id: 1,
    title: "Weekly Android Security Report - April 1-7, 2024",
    datePublished: "2023-04-07",
    link: "https://github.com/example/android-security-reports/blob/main/weekly/2024-04-07.md",
  },
  {
    id: 2,
    title: "Analysis of CVE-2024-12345: Buffer Overflow in Android System Component",
    datePublished: "2023-04-05",
    link: "https://github.com/example/android-security-reports/blob/main/cve-analysis/CVE-2024-12345.md",
  },
  {
    id: 3,
    title: "Secure Coding Patterns for Android Developers",
    datePublished: "2023-04-03",
    link: "https://github.com/example/android-security-reports/blob/main/guides/secure-coding-patterns.md",
  },
  {
    id: 4,
    title: "Monthly Android Security Summary - March 2024",
    datePublished: "2023-04-01",
    link: "https://github.com/example/android-security-reports/blob/main/monthly/2024-03.md",
  },
  {
    id: 5,
    title: "Android Vulnerability Exploitation Techniques and Mitigations",
    datePublished: "2023-03-28",
    link: "https://github.com/example/android-security-reports/blob/main/research/exploitation-techniques.md",
  },
]

export default function GitHubFindingsPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-2xl font-bold">GitHub Findings</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {githubFindings.map((finding) => (
          <Card key={finding.id}>
            <CardHeader>
              <CardTitle>{finding.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Published on: {finding.datePublished}</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <a href={finding.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <span>View on GitHub</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
