'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginInput, loginSchema } from '@/schemas/login';
import { useLoginMutation } from '@/services/mutations/auth';
import { Button } from './ui/button';
import { Form } from './ui/form';
import FormInput from './reusable/form-input';
import Link from 'next/link';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginForm() {
  const { mutate: login, isPending } = useLoginMutation();
  const { login: authLogin } = useAuth();
  const router = useRouter();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = (values: LoginInput) => {
    login(values, {
      onSuccess: (data) => {
        authLogin(data.user, data.token);

        Cookies.set('authToken', data.token, {
          expires: 7,
          path: '/',
          sameSite: 'strict',
          secure: process.env.NODE_ENV === 'production',
        });

        const role = data.user.role?.toUpperCase();
        switch (role) {
          case 'ADMIN':
            router.push('/admin');
            break;
          case 'EMPLOYEE':
            router.push('/employee');
            break;
          default:
            router.push('/jobseeker');
            break;
        }
      },
      onError: (error: any) => {
        console.error('Login failed:', error);
        // Add toast notification here later
      },
    });
  };

  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google/login`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col lg:flex-row">
        {/* LEFT SIDE - Form */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
              <p className="mt-2 text-gray-600">
                Sign in to your Job Portal account
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormInput
                  form={form}
                  name="email"
                  type="email"
                  label="Email Address"
                  placeholder="you@example.com"
                />

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label
                      htmlFor="password"
                      className="text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <Link
                      href="/forget-password"
                      className="text-sm text-red-600 hover:text-red-700 font-medium"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <FormInput
                    form={form}
                    name="password"
                    type="password"
                    placeholder="••••••••"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all"
                >
                  {isPending ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>
            </Form>

            {/* Divider */}
            <div className="my-8 flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-sm text-gray-500 font-medium">OR</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Solid Google Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isGoogleLoading}
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 border border-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg transition-all disabled:opacity-70 shadow-sm hover:shadow"
            >
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png"
                width={24}
                height={24}
                alt="Google"
                className="object-contain"
              />
              <span>
                {isGoogleLoading
                  ? 'Redirecting to Google...'
                  : 'Continue with Google'}
              </span>
            </button>

            {/* Sign Up Link */}
            <p className="text-center mt-8 text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <Link
                href="/register"
                className="text-red-600 hover:text-red-700 font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* RIGHT SIDE - Illustration */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-red-50 to-indigo-100 items-center justify-center p-12">
          <div className="max-w-md text-center">
            <div
              className="w-full h-96 bg-contain bg-center bg-no-repeat mx-auto"
              style={{
                backgroundImage: `url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')`,
              }}
            />
            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-gray-800">
                Find Your Dream Job
              </h2>
              <p className="mt-3 text-gray-600">
                Join thousands of professionals connecting with top
                opportunities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
