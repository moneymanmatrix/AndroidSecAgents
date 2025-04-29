import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const solutions = [
  {
    id: 1,
    vulnerabilityType: "CVE-2024-12345",
    solution: "Apply security patch from April 2024 Android Security Bulletin",
    complexity: "Easy",
    dateAdded: "2023-04-04",
  },
  {
    id: 2,
    vulnerabilityType: "Privilege Escalation",
    solution: "Implement custom SELinux policy to restrict system access",
    complexity: "Hard",
    dateAdded: "2023-04-03",
  },
  {
    id: 3,
    vulnerabilityType: "Information Disclosure",
    solution: "Update encryption implementation and key rotation policy",
    complexity: "Medium",
    dateAdded: "2023-04-02",
  },
  {
    id: 4,
    vulnerabilityType: "Remote Code Execution",
    solution: "Disable WebView JavaScript execution in sensitive contexts",
    complexity: "Medium",
    dateAdded: "2023-04-01",
  },
  {
    id: 5,
    vulnerabilityType: "Denial of Service",
    solution: "Implement request rate limiting and input validation",
    complexity: "Easy",
    dateAdded: "2023-03-31",
  },
]

function getComplexityColor(complexity: string) {
  switch (complexity) {
    case "Easy":
      return "bg-green-500 hover:bg-green-600"
    case "Medium":
      return "bg-yellow-500 hover:bg-yellow-600 text-black"
    case "Hard":
      return "bg-red-500 hover:bg-red-600"
    default:
      return ""
  }
}

export default function SolutionsPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-2xl font-bold">Solutions</h1>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vulnerability Type/CVE</TableHead>
              <TableHead>Suggested Solution</TableHead>
              <TableHead>Complexity</TableHead>
              <TableHead>Date Added</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {solutions.map((solution) => (
              <TableRow key={solution.id}>
                <TableCell>{solution.vulnerabilityType}</TableCell>
                <TableCell>{solution.solution}</TableCell>
                <TableCell>
                  <Badge className={getComplexityColor(solution.complexity)}>{solution.complexity}</Badge>
                </TableCell>
                <TableCell>{solution.dateAdded}</TableCell>
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
