// components/forms/ResetPasswordForm.tsx
'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { resetPasswordSchema } from '@/schemas/forget-password';
import { useResetPasswordMutation } from '@/services/mutations/auth';
import FormInput from '@/components/reusable/form-input';
import z from 'zod';
import { Form } from '@/components/ui/form';
import FormHeader from '@/components/reusable/form-header';

export type ResetPasswordDto = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordForm() {
  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
  });

  const mutation = useResetPasswordMutation();

  const onSubmit = (data: ResetPasswordDto) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 transition-colors duration-300">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormHeader
              title="Reset Password"
              subtitle="Enter your email, OTP and new password"
            />

            <FormInput
              label="Email"
              form={form}
              name="email"
              type="email"
              placeholder="Enter your email"
              required
            />
            <FormInput
              label="OTP"
              form={form}
              name="otp"
              type="number"
              placeholder="Enter OTP"
              required
            />
            <FormInput
              label="Password"
              form={form}
              name="password"
              type="password"
              placeholder="Enter new password"
              required
            />
            <FormInput
              label="Confirm Password"
              form={form}
              name="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              required
            />

            <Button
              type="submit"
              className="w-full"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? 'Resetting...' : 'Reset Password'}
            </Button>

            {mutation.isError && (
              <p className="text-red-500 text-sm">{mutation.error.message}</p>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}
