import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const knowledgeItems = [
  {
    id: 1,
    title: "Android Security Architecture Overview",
    sourceType: "Documentation",
    tags: "Architecture, Security Model, Sandboxing",
    dateAdded: "2023-04-04",
  },
  {
    id: 2,
    title: "Common Vulnerabilities in Android Applications",
    sourceType: "Article",
    tags: "Vulnerabilities, Best Practices, App Security",
    dateAdded: "2023-04-03",
  },
  {
    id: 3,
    title: "Android Permission System Deep Dive",
    sourceType: "Blog",
    tags: "Permissions, Runtime Permissions, Privacy",
    dateAdded: "2023-04-02",
  },
  {
    id: 4,
    title: "Secure Coding Guidelines for Android",
    sourceType: "Documentation",
    tags: "Coding, Guidelines, Best Practices",
    dateAdded: "2023-04-01",
  },
  {
    id: 5,
    title: "Android Encryption and Key Management",
    sourceType: "Article",
    tags: "Encryption, Keystore, TEE",
    dateAdded: "2023-03-31",
  },
]

export default function KnowledgeBasePage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-2xl font-bold">Knowledge Base</h1>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Source Type</TableHead>
              <TableHead>Tags/Keywords</TableHead>
              <TableHead>Date Added</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {knowledgeItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.sourceType}</TableCell>
                <TableCell>{item.tags}</TableCell>
                <TableCell>{item.dateAdded}</TableCell>
                <TableCell>
                  <Button size="sm">View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
