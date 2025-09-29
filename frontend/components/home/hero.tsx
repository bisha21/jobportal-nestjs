'use client';

import { Search } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import PageHeader from '../reusable/pageheader';

const HeroSection = () => {
  return (
    <section className="text-center py-16 bg-background text-foreground">
      <div className="flex flex-col gap-6 max-w-3xl mx-auto">
        {/* Badge */}
        <span className="bg-accent text-accent-foreground mx-auto py-2 px-6 rounded-full font-medium shadow-sm text-sm">
          🚀 No.1 Job Portal Website
        </span>

        {/* Heading */}
        <PageHeader>
          Search, Apply & <br />
          Get Your <span className="text-primary">Dream Job</span>
        </PageHeader>

        {/* Subtext */}
        <p className="text-muted-foreground text-lg">
          Find your perfect opportunity among thousands of jobs. Connect with
          top companies and take the next step in your career.
        </p>

        {/* Search Box */}
        <div className="flex w-full max-w-2xl mx-auto items-center bg-card rounded-full shadow-lg border border-border overflow-hidden">
          <Input
            className="flex-1 border-none focus:ring-0 bg-transparent text-foreground placeholder-muted-foreground rounded-none px-4 py-3"
            placeholder="Search for jobs (e.g. Developer, Designer...)"
          />
          <Button className="rounded-none rounded-r-full bg-primary text-primary-foreground px-6 py-6 hover:bg-primary/90 transition">
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
