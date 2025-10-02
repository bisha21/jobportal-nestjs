'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';

interface JobFiltersProps {
  onFilterChange: (query: string) => void;
  categories: Array<{ id: number; categoryName: string }>;
  companies: Array<{ id: number; name: string }>;
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

  const buildQuery = (newFilters: typeof filters) => {
    const params = new URLSearchParams();

    if (newFilters.companyId)
      params.set('companyId', newFilters.companyId.toString());
    if (newFilters.categoryId)
      params.set('categoryId', newFilters.categoryId.toString());
    if (newFilters.title) params.set('title', newFilters.title);
    if (newFilters.salaryRange[0] > 0)
      params.set('salaryMin', newFilters.salaryRange[0].toString());
    if (newFilters.salaryRange[1] < 99999)
      params.set('salaryMax', newFilters.salaryRange[1].toString());
    if (newFilters.experience) params.set('experience', newFilters.experience);

    return params.toString();
  };

  const handleCategoryChange = (id: number) => {
    const updated = filters.categoryId === id ? 0 : id;
    const newFilters = { ...filters, categoryId: updated };
    setFilters(newFilters);
    onFilterChange(buildQuery(newFilters));
  };

  const handleCompanyChange = (id: number) => {
    const updated = filters.companyId === id ? 0 : id;
    const newFilters = { ...filters, companyId: updated };
    setFilters(newFilters);
    onFilterChange(buildQuery(newFilters));
  };

  const handleTitleChange = (value: string) => {
    const newFilters = { ...filters, title: value };
    setFilters(newFilters);
    onFilterChange(buildQuery(newFilters));
  };

  const handleSalaryChange = (value: number[]) => {
    const newFilters = { ...filters, salaryRange: value };
    setFilters(newFilters);
    onFilterChange(buildQuery(newFilters));
  };

  const handleExperienceChange = (value: string) => {
    const newFilters = { ...filters, experience: value };
    setFilters(newFilters);
    onFilterChange(buildQuery(newFilters));
  };

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

          {/* Reset Filters */}
          <Button
            onClick={() => {
              const resetFilters = {
                title: '',
                categoryId: 0,
                companyId: 0,
                experience: '',
                salaryRange: [0, 99999],
              };
              setFilters(resetFilters);
              onFilterChange(buildQuery(resetFilters));
            }}
            variant="outline"
            className="w-full"
          >
            Reset Filters
          </Button>
        </CardContent>
      </Card>
    </aside>
  );
}
