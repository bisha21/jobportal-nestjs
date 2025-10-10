'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  useAddJobSkillMutation,
  useUpdateJobSkillMutation,
} from '@/services/mutations/jobskills';
import { Loader2, Edit, Save } from 'lucide-react';
import { useJobSkillQuery } from '@/services/query/jobskills.query';
import { ActionButton } from '@/components/reusable/action-btn';

export default function JobSkillsTable({ jobId }: { jobId: number }) {
  const { data: skills, isLoading } = useJobSkillQuery(jobId);

  const { mutate: addJobSkill, isPending: isAdding } = useAddJobSkillMutation();

  const { mutate: updateJobSkill, isPending: isUpdating } =
    useUpdateJobSkillMutation();

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedSkill, setEditedSkill] = useState('');
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = async () => {
    if (newSkill.trim() === '') return;
    await addJobSkill({ jobId, skill: newSkill.trim() });
    setNewSkill('');
  };

  const handleEdit = (id: number, name: string) => {
    setEditingId(id);
    setEditedSkill(name);
  };

  const handleSave = async (id: number) => {
    if (editedSkill.trim() === '') return;
    await updateJobSkill({ id, skill: editedSkill.trim(), jobId });
    setEditingId(null);
    setEditedSkill('');
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="animate-spin h-6 w-6 text-primary" />
      </div>
    );

  return (
    <div className="p-4 border rounded-xl shadow-sm bg-card w-full">
      <h3 className="text-lg font-semibold mb-4 text-center">Job Skills</h3>

      {/* Add Skill */}
      <div className="flex items-center gap-2 mb-4">
        <Input
          placeholder="Enter a new skill..."
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          className="flex-1"
        />
        <Button size="sm" onClick={handleAddSkill} disabled={isAdding}>
          {isAdding ? <Loader2 className="animate-spin h-4 w-4" /> : 'Add'}
        </Button>
      </div>

      {/* Skill Table */}
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b bg-muted">
            <th className="p-2">Skill</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {skills?.map((skill) => (
            <tr key={skill.id} className="hover:bg-muted transition-all">
              <td className="p-2">
                {editingId === skill.id ? (
                  <Input
                    value={editedSkill}
                    onChange={(e) => setEditedSkill(e.target.value)}
                  />
                ) : (
                  skill.skill
                )}
              </td>
              <td className="p-2 flex gap-2">
                {editingId === skill.id ? (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleSave(skill.id)}
                    disabled={isUpdating}
                  >
                    {isUpdating ? (
                      <Loader2 className="animate-spin h-4 w-4" />
                    ) : (
                      <Save className="h-4 w-4" />
                    )}
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(skill.id, skill.skill)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                )}

                <ActionButton row={skill} delete={{ type: 'jobskills' }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {!skills?.length && (
        <p className="text-center text-sm text-muted-foreground py-4">
          No job skills added yet.
        </p>
      )}
    </div>
  );
}
