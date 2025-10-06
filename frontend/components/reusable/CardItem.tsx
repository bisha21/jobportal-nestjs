'use client';

import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Briefcase, Clock, DollarSign, MapPin, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CardItemProps<T> {
  row: T;
  columns: any[];
}

export function CardItem<T>({ row, columns }: CardItemProps<T>) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          {/* Company Logo */}
          {row.company?.logoUrl && (
            <div className="relative w-20 h-20 flex-shrink-0">
              <Image
                src={row.company.logoUrl}
                alt={row.company.name}
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
          )}

          {/* Card Details */}
          <div className="flex-1 space-y-3">
            <div>
              <h3 className="text-xl font-semibold mb-1">{row.title}</h3>
              <p className="text-sm text-muted-foreground">
                {row.company?.name}
              </p>
            </div>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              {row.category?.categoryName && (
                <div className="flex items-center gap-1.5">
                  <Briefcase className="h-4 w-4 text-teal-600" />
                  <span>{row.category.categoryName}</span>
                </div>
              )}
              {row.type && (
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-teal-600" />
                  <span>
                    {row.type === 'FULLTIME'
                      ? 'Full time'
                      : row.type === 'PARTTIME'
                      ? 'Part time'
                      : row.type}
                  </span>
                </div>
              )}
              {row.salaryMin && row.salaryMax && (
                <div className="flex items-center gap-1.5">
                  <DollarSign className="h-4 w-4 text-teal-600" />
                  <span>
                    ${row.salaryMin}-{row.salaryMax}
                  </span>
                </div>
              )}
              {row.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-teal-600" />
                  <span>{row.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col items-end gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
            >
              <Bookmark className="h-5 w-5" />
            </Button>
            <Button className="bg-teal-600 hover:bg-teal-700 text-white">
              Job Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
