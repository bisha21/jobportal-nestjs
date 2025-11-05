'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Category, Company } from '@/services/query/jobs.query';

interface JobFiltersProps {
  onFilterChange: (filters: Record<string, any>) => void;
  categories: Category[];
  companies: Company[];
}

export function JobFilters({
  onFilterChange,
  categories,
  companies,
}: JobFiltersProps) {
  const [filters, setFilters] = useState({
    title: '',
    categoryId: 0,
    companyId: 0,
    experience: '',
    salaryRange: [0, 99999] as number[],
  });

  const [showMoreCategories, setShowMoreCategories] = useState(false);

  const handleChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    const apiFilters = {
      ...newFilters,
      salaryMin: newFilters.salaryRange[0],
      salaryMax: newFilters.salaryRange[1],
    };
    delete apiFilters.salaryRange;
    onFilterChange(apiFilters);
  };

  const handleCategoryChange = (id: number) =>
    handleChange({
      ...filters,
      categoryId: filters.categoryId === id ? 0 : id,
    });

  const handleCompanyChange = (id: number) =>
    handleChange({ ...filters, companyId: filters.companyId === id ? 0 : id });

  const handleTitleChange = (title: string) =>
    handleChange({ ...filters, title });

  const handleExperienceChange = (exp: string) =>
    handleChange({ ...filters, experience: exp });

  const handleSalaryChange = (salaryRange: number[]) =>
    handleChange({ ...filters, salaryRange });

  const handleReset = () =>
    handleChange({
      title: '',
      categoryId: 0,
      companyId: 0,
      experience: '',
      salaryRange: [0, 99999],
    });

  return (
    <aside className="space-y-6">
      <Card>
        <CardContent className="p-4 space-y-4">
          {/* Search */}
          <div>
            <h3 className="font-semibold mb-3">Search by Job Title</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Job title or company"
                className="pl-9"
                value={filters.title}
                onChange={(e) => handleTitleChange(e.target.value)}
              />
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-3">Categories</h3>
            <div className="space-y-2">
              {categories
                .slice(0, showMoreCategories ? categories.length : 5)
                .map((cat) => (
                  <div key={cat.id} className="flex items-center gap-2">
                    <Checkbox
                      id={`cat-${cat.id}`}
                      checked={filters.categoryId === cat.id}
                      onCheckedChange={() => handleCategoryChange(cat.id)}
                    />
                    <Label
                      htmlFor={`cat-${cat.id}`}
                      className="text-sm cursor-pointer"
                    >
                      {cat.categoryName}
                    </Label>
                  </div>
                ))}
            </div>
            {categories.length > 5 && (
              <Button
                variant="default"
                className="w-full mt-3 bg-teal-600 hover:bg-teal-700 text-white"
                onClick={() => setShowMoreCategories(!showMoreCategories)}
              >
                {showMoreCategories ? 'Show Less' : 'Show More'}
              </Button>
            )}
          </div>

          {/* Companies */}
          <div>
            <h3 className="font-semibold mb-3">Companies</h3>
            <div className="space-y-2">
              {companies.map((comp) => (
                <div key={comp.id} className="flex items-center gap-2">
                  <Checkbox
                    id={`comp-${comp.id}`}
                    checked={filters.companyId === comp.id}
                    onCheckedChange={() => handleCompanyChange(comp.id)}
                  />
                  <Label
                    htmlFor={`comp-${comp.id}`}
                    className="text-sm cursor-pointer"
                  >
                    {comp.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <h3 className="font-semibold mb-3">Experience Level</h3>
            {['Fresher', '1-2 years', '3+ years'].map((exp) => (
              <div key={exp} className="flex items-center gap-2">
                <Checkbox
                  id={`exp-${exp}`}
                  checked={filters.experience === exp}
                  onCheckedChange={() => handleExperienceChange(exp)}
                />
                <Label
                  htmlFor={`exp-${exp}`}
                  className="text-sm cursor-pointer"
                >
                  {exp}
                </Label>
              </div>
            ))}
          </div>

          {/* Salary Range */}
          <div>
            <h3 className="font-semibold mb-3">Salary Range</h3>
            <Slider
              value={filters.salaryRange}
              onValueChange={handleSalaryChange}
              max={99999}
              step={1000}
            />
            <div className="flex justify-between text-sm mt-1">
              <span>${filters.salaryRange[0]}</span>
              <span>${filters.salaryRange[1]}</span>
            </div>
          </div>

          <Button onClick={handleReset} variant="outline" className="w-full">
            Reset Filters
          </Button>
        </CardContent>
      </Card>
    </aside>
  );
}
