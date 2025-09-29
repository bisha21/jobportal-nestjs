'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from './ui/button';
import { Form } from './ui/form';
import { CreateUserInput, createUserSchema } from '@/schemas/register';
import FormInput from './reusable/form-input';

export default function RegistrationForm() {
  const form = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
      bio: '',
    },
  });

  const onSubmit = (values: CreateUserInput) => {
    console.log('Form Submitted:', values);
    // 🔥 send to API
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-full mx-auto bg-card border border-border p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-center mb-4">
          Create an Account
        </h2>

        <FormInput
          form={form}
          name="fullName"
          label="Full Name"
          placeholder="John Doe"
          type="text"
          required
        />

        <FormInput
          form={form}
          name="email"
          label="Email"
          placeholder="example@mail.com"
          type="email"
          required
        />

        <FormInput
          form={form}
          name="password"
          label="Password"
          placeholder="********"
          type="password"
          required
        />

        <FormInput
          form={form}
          name="confirmPassword"
          label="Confirm Password"
          placeholder="********"
          type="password"
          required
        />

        <FormInput
          form={form}
          name="phoneNumber"
          label="Phone Number"
          placeholder="+977 9812345678"
          type="text"
          required
        />

        <FormInput
          form={form}
          name="bio"
          label="Bio"
          placeholder="Tell us about yourself"
          type="text"
          render={(field) => <textarea {...field} rows={4} />}
        />

        <Button
          type="submit"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Register
        </Button>
      </form>
    </Form>
  );
}
