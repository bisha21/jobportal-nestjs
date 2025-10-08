import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface TopJob {
  title: string
  company: string
  applications: number
}

interface TopJobsTableProps {
  jobs: TopJob[]
}

export function TopJobsTable({ jobs }: TopJobsTableProps) {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Top Jobs by Applications</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground">Job Title</TableHead>
              <TableHead className="text-muted-foreground">Company</TableHead>
              <TableHead className="text-right text-muted-foreground">Applications</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map((job, index) => (
              <TableRow key={index} className="border-border">
                <TableCell className="font-medium text-foreground">{job.title}</TableCell>
                <TableCell className="text-muted-foreground">{job.company}</TableCell>
                <TableCell className="text-right text-foreground font-mono">{job.applications}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
