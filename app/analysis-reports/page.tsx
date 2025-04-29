import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const analysisReports = [
  {
    id: 1,
    cveId: "CVE-2024-12345",
    title: "Buffer Overflow in Android System Component",
    severity: "Critical",
    dateAnalyzed: "2023-04-04",
    affectedComponents: "System Server, Media Framework",
  },
  {
    id: 2,
    cveId: "CVE-2024-23456",
    title: "Privilege Escalation in Android Bluetooth Stack",
    severity: "High",
    dateAnalyzed: "2023-04-03",
    affectedComponents: "Bluetooth Service",
  },
  {
    id: 3,
    cveId: "CVE-2024-34567",
    title: "Information Disclosure in Android Keystore",
    severity: "Medium",
    dateAnalyzed: "2023-04-02",
    affectedComponents: "Keystore, Credential Storage",
  },
  {
    id: 4,
    cveId: "CVE-2024-45678",
    title: "Denial of Service in Android Wi-Fi Service",
    severity: "Low",
    dateAnalyzed: "2023-04-01",
    affectedComponents: "Wi-Fi Service, Connectivity",
  },
  {
    id: 5,
    cveId: "CVE-2024-56789",
    title: "Remote Code Execution in WebView Component",
    severity: "Critical",
    dateAnalyzed: "2023-03-31",
    affectedComponents: "WebView, Browser",
  },
]

function getSeverityColor(severity: string) {
  switch (severity) {
    case "Critical":
      return "bg-red-500 hover:bg-red-600"
    case "High":
      return "bg-orange-500 hover:bg-orange-600"
    case "Medium":
      return "bg-yellow-500 hover:bg-yellow-600 text-black"
    case "Low":
      return "bg-green-500 hover:bg-green-600"
    default:
      return ""
  }
}

export default function AnalysisReportsPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-2xl font-bold">Analysis Reports</h1>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>CVE ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Date Analyzed</TableHead>
              <TableHead>Affected Components</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {analysisReports.map((report) => (
              <TableRow key={report.id}>
                <TableCell>{report.cveId}</TableCell>
                <TableCell>{report.title}</TableCell>
                <TableCell>
                  <Badge className={getSeverityColor(report.severity)}>{report.severity}</Badge>
                </TableCell>
                <TableCell>{report.dateAnalyzed}</TableCell>
                <TableCell>{report.affectedComponents}</TableCell>
                <TableCell className="space-x-2">
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                  <Button size="sm">Find Solutions</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
