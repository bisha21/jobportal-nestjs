import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface TopCompany {
  name: string;
  logoUrl: string;
  jobCount: number;
}

interface TopCompaniesListProps {
  companies: TopCompany[];
}

export function TopCompaniesList({ companies }: TopCompaniesListProps) {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">Top Companies</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {companies.map((company, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={company.logoUrl || '/placeholder.svg'}
                    alt={company.name}
                  />
                  <AvatarFallback className="bg-secondary text-secondary-foreground">
                    {company.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {company.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {company.jobCount} active jobs
                  </p>
                </div>
              </div>
              <div className="text-sm font-mono text-muted-foreground">
                {company.jobCount}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
