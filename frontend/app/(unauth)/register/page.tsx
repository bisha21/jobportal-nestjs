'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateUserInput, createUserSchema } from '@/schemas/register';
import { useRegisterMutation } from '@/services/mutations/auth';
import { Form } from '@/components/ui/form';
import FormInput from '@/components/reusable/form-input';
import { Button } from '@/components/ui/button';

export default function RegistrationForm() {
  const { mutate: register, isPending } = useRegisterMutation();
  const form = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      phoneNumber: '',
      bio: '',
    },
  });

  const onSubmit = (values: CreateUserInput) => {
    register(values, {
      onSuccess: (data) => {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      },
      onError: (error) => {
        console.error('Registration failed:', error);
      },
    });
  };

  return (
    <div className="lg:min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-900">
      <div className="grid lg:grid-cols-2 items-center gap-10 max-w-6xl max-lg:max-w-lg w-full">
        <div>
          <h1 className="lg:text-5xl text-4xl font-bold text-slate-900 dark:text-gray-200 leading-tight">
            Join Our Community
          </h1>
          <p className="text-[15px] mt-6 text-slate-600 dark:text-gray-400 leading-relaxed">
            Create an account and enjoy exclusive access to our platform.
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-md lg:ml-auto w-full space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-slate-900 dark:text-gray-200 text-3xl font-semibold mb-8 text-center">
              Create Account
            </h2>

            <FormInput
              form={form}
              name="fullName"
              label="Full Name"
              placeholder="John Doe"
              type="text"
              required
              className="bg-slate-100 dark:bg-gray-700 text-slate-900 dark:text-gray-200"
            />

            <FormInput
              form={form}
              name="email"
              label="Email"
              placeholder="example@mail.com"
              type="email"
              required
              className="bg-slate-100 dark:bg-gray-700 text-slate-900 dark:text-gray-200"
            />

            <FormInput
              form={form}
              name="password"
              label="Password"
              placeholder="********"
              type="password"
              required
              className="bg-slate-100 dark:bg-gray-700 text-slate-900 dark:text-gray-200"
            />

            <FormInput
              form={form}
              name="phoneNumber"
              label="Phone Number"
              placeholder="+977 9812345678"
              type="text"
              required
              className="bg-slate-100 dark:bg-gray-700 text-slate-900 dark:text-gray-200"
            />

            <FormInput
              form={form}
              name="bio"
              label="Bio"
              placeholder="Tell us about yourself"
              type="text"
              render={(field) => (
                <textarea
                  {...field}
                  rows={4}
                  className="bg-slate-100 dark:bg-gray-700 text-slate-900 dark:text-gray-200"
                />
              )}
            />

            <Button
              type="submit"
              className="w-full py-2.5 text-[15px] font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              {isPending ? 'Registering...' : 'Register'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
