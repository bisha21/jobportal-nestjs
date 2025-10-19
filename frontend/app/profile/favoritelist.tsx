'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { FavoriteJob, useFavoriteJobs } from '@/services/query/favorite.query';
import { Loader2} from 'lucide-react';
import { ActionButton } from '@/components/reusable/action-btn';

export default function FavoriteTable() {
  const { data: favorites, isLoading } = useFavoriteJobs();

  if (isLoading)
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="animate-spin h-6 w-6 text-primary" />
      </div>
    );

  return (
    <Card className="p-4 w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          My Favorite Jobs
        </CardTitle>
      </CardHeader>

      <CardContent>
        {favorites?.length ? (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="p-2">Job Title</th>
                <th className="p-2">Company</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {favorites.map((fav) => (
                <tr key={fav.id} className="hover:bg-muted">
                  <td className="p-2">{fav.job.title}</td>
                  <td className="p-2">{fav.job.company.name}</td>
                  <td className="p-2">
                    <ActionButton<FavoriteJob>
                      row={fav}
                      delete={{ type: 'favorites' }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-sm text-muted-foreground py-4">
            No favorite jobs yet.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
