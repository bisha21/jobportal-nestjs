import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface RecentApplication {
  applicant: string;
  email: string;
  jobTitle: string;
  status: string;
  appliedAt: string;
}

interface RecentApplicationsTableProps {
  applications: RecentApplication[];
}

const statusColors = {
  PENDING: 'bg-chart-1/20 text-chart-1 border-chart-1/30',
  APPROVED: 'bg-chart-3/20 text-chart-3 border-chart-3/30',
  REJECTED: 'bg-destructive/20 text-destructive border-destructive/30',
};

export function RecentApplicationsTable({
  applications,
}: RecentApplicationsTableProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Recent Applications</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-muted-foreground">Applicant</TableHead>
              <TableHead className="text-muted-foreground">Email</TableHead>
              <TableHead className="text-muted-foreground">Job Title</TableHead>
              <TableHead className="text-muted-foreground">Status</TableHead>
              <TableHead className="text-right text-muted-foreground">
                Applied At
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((application, index) => (
              <TableRow key={index} className="border-border">
                <TableCell className="font-medium text-foreground">
                  {application.applicant}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {application.email}
                </TableCell>
                <TableCell className="text-foreground">
                  {application.jobTitle}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      statusColors[
                        application.status as keyof typeof statusColors
                      ]
                    }
                  >
                    {application.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right text-muted-foreground font-mono text-xs">
                  {formatDate(application.appliedAt)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
