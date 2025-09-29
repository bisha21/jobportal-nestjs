'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginInput, loginSchema } from '@/schemas/login';
import FormInput from './reusable/form-input';
import { Button } from './ui/button';
import { GoalIcon } from 'lucide-react';
import { Form } from './ui/form';

export default function LoginForm() {
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: LoginInput) => {
    console.log('Login Data:', values);
    // 🔥 call login API here
  };

  const handleGoogleLogin = () => {
    console.log('Continue with Google clicked');
    // 🔥 implement Google OAuth logic
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-full mx-auto bg-card border border-border p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {/* Email */}
        <FormInput
          form={form}
          name="email"
          label="Email"
          placeholder="example@mail.com"
          type="email"
          required
        />

        {/* Password */}
        <FormInput
          form={form}
          name="password"
          label="Password"
          placeholder="********"
          type="password"
          required
        />

        {/* Login Button */}
        <Button
          type="submit"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Login
        </Button>

        {/* Divider */}
        <div className="flex items-center gap-2 my-4">
          <div className="flex-1 border-t border-border"></div>
          <span className="text-muted-foreground text-sm">OR</span>
          <div className="flex-1 border-t border-border"></div>
        </div>

        {/* Google Login */}
        <Button
          type="button"
          variant="outline"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 border-border"
        >
          <GoalIcon className="h-5 w-5" />
          Continue with Google
        </Button>
      </form>
    </Form>
  );
}
