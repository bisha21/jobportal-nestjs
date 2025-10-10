'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUserSkillQuery } from '@/services/query/userskill.query';
import {
  useAddUserSkillMutation,
  useUpdateUserSkillMutation,
  useDeleteUserSkillMutation,
} from '@/services/mutations/userskill';
import { Loader2 } from 'lucide-react';

export default function SkillList() {
  const { data: skills, isLoading } = useUserSkillQuery();
  const addSkillMutation = useAddUserSkillMutation();
  const updateSkillMutation = useUpdateUserSkillMutation();
  const deleteSkillMutation = useDeleteUserSkillMutation();

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedSkill, setEditedSkill] = useState('');
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = async () => {
    if (newSkill.trim() === '') return;
    await addSkillMutation.mutateAsync(newSkill.trim());
    setNewSkill('');
  };

  const handleEdit = (id: number, name: string) => {
    setEditingId(id);
    setEditedSkill(name);
  };

  const handleSave = async (id: number) => {
    if (editedSkill.trim() === '') return;
    await updateSkillMutation.mutateAsync({ id, skill: editedSkill.trim() });
    setEditingId(null);
    setEditedSkill('');
  };

  // ✅ Delete skill
  const handleDelete = async (id: number) => {
    await deleteSkillMutation.mutateAsync(id);
  };

  // ✅ Loading state
  if (isLoading)
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="animate-spin h-6 w-6 text-primary" />
      </div>
    );

  return (
    <div className="flex flex-col gap-4 p-4 border rounded-xl shadow-sm bg-card w-full ">
      <h3 className="text-lg font-semibold mb-2 text-center">My Skills</h3>

      {/* ➕ Add Skill Section */}
      <div className="flex items-center gap-2">
        <Input
          placeholder="Enter a new skill..."
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          className="flex-1"
        />
        <Button
          size="sm"
          onClick={handleAddSkill}
          disabled={addSkillMutation.isPending}
        >
          {addSkillMutation.isPending ? (
            <Loader2 className="animate-spin h-4 w-4" />
          ) : (
            'Add'
          )}
        </Button>
      </div>

      {/* 🧠 Skill List */}
      <div className="flex flex-col gap-2 mt-2">
        {skills?.length ? (
          skills.map((skill) => (
            <div
              key={skill.id}
              className="flex items-center gap-2 p-2 bg-muted rounded-md"
            >
              {editingId === skill.id ? (
                <>
                  <Input
                    value={editedSkill}
                    onChange={(e) => setEditedSkill(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSave(skill.id)}
                    disabled={updateSkillMutation.isPending}
                  >
                    {updateSkillMutation.isPending ? (
                      <Loader2 className="animate-spin h-4 w-4" />
                    ) : (
                      'Save'
                    )}
                  </Button>
                </>
              ) : (
                <>
                  <span className="flex-1 font-medium text-sm px-2">
                    {skill.skill}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(skill.id, skill.skill)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(skill.id)}
                    disabled={deleteSkillMutation.isPending}
                  >
                    {deleteSkillMutation.isPending && editingId === skill.id ? (
                      <Loader2 className="animate-spin h-4 w-4" />
                    ) : (
                      'Delete'
                    )}
                  </Button>
                </>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-sm text-muted-foreground py-4">
            No skills added yet.
          </p>
        )}
      </div>
    </div>
  );
}
