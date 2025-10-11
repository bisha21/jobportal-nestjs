// components/forms/ForgetPasswordForm.tsx
'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForgetPasswordMutation } from '@/services/mutations/auth';
import { forgetPasswordSchema } from '@/schemas/forget-password';
import FormInput from '@/components/reusable/form-input';
import { Button } from '@/components/ui/button';
import z from 'zod';
import { Form } from '@/components/ui/form';
import FormHeader from '@/components/reusable/form-header';

export type ForgetPasswordDto = z.infer<typeof forgetPasswordSchema>;

export default function ForgetPasswordForm() {
  const form = useForm<ForgetPasswordDto>({
    resolver: zodResolver(forgetPasswordSchema),
  });

  const mutation = useForgetPasswordMutation();

  const onSubmit = (data: ForgetPasswordDto) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 transition-colors duration-300">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormHeader
              title="Forget Password"
              subtitle="Enter your email to receive OTP"
            />

            <FormInput
              label="Email"
              form={form}
              name="email"
              type="email"
              placeholder="Enter your email"
              required
            />

            <Button
              type="submit"
              className="w-full"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? 'Sending...' : 'Send OTP'}
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
