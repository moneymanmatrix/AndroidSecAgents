import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const tools = [
  {
    id: 1,
    name: "AndroidVulnScanner",
    category: "Static Analysis",
    description: "Scans Android APKs for common security vulnerabilities",
    sourceLink: "https://github.com/example/AndroidVulnScanner",
  },
  {
    id: 2,
    name: "DynamicAndroidAnalyzer",
    category: "Dynamic Analysis",
    description: "Runtime analysis tool for detecting security issues in Android apps",
    sourceLink: "https://github.com/example/DynamicAndroidAnalyzer",
  },
  {
    id: 3,
    name: "AndroidReverseKit",
    category: "Reverse Engineering",
    description: "Toolkit for reverse engineering Android applications",
    sourceLink: "https://github.com/example/AndroidReverseKit",
  },
  {
    id: 4,
    name: "PermissionAnalyzer",
    category: "Static Analysis",
    description: "Analyzes Android app permissions and identifies potential misuse",
    sourceLink: "https://github.com/example/PermissionAnalyzer",
  },
  {
    id: 5,
    name: "NetworkTrafficMonitor",
    category: "Dynamic Analysis",
    description: "Monitors and analyzes network traffic from Android applications",
    sourceLink: "https://github.com/example/NetworkTrafficMonitor",
  },
]

export default function ToolsPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-2xl font-bold">Tools</h1>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tool Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Source Link</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tools.map((tool) => (
              <TableRow key={tool.id}>
                <TableCell className="font-medium">{tool.name}</TableCell>
                <TableCell>{tool.category}</TableCell>
                <TableCell>{tool.description}</TableCell>
                <TableCell>
                  <a
                    href={tool.sourceLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {tool.sourceLink}
                  </a>
                </TableCell>
                <TableCell>
                  <Button size="sm">View Details</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
