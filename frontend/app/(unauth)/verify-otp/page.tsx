// components/forms/VerifyOtpForm.tsx
'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useVerifyOtpMutation } from '@/services/mutations/auth';
import FormInput from '@/components/reusable/form-input';
import { verifyOtpSchema } from '@/schemas/forget-password';
import { Button } from '@/components/ui/button';
import z from 'zod';
import { Form } from '@/components/ui/form';
import FormHeader from '@/components/reusable/form-header';

export type VerifyOtpDto = z.infer<typeof verifyOtpSchema>;

export default function VerifyOtpForm() {
  const form = useForm({
    resolver: zodResolver(verifyOtpSchema),
  });

  const mutation = useVerifyOtpMutation();

  const onSubmit = (data: VerifyOtpDto) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 transition-colors duration-300">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormHeader
              title="Verify OTP"
              subtitle="Enter your email and OTP to verify"
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

            <Button
              type="submit"
              className="w-full"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? 'Verifying...' : 'Verify OTP'}
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
