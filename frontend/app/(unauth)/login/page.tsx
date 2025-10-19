"use client";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginInput, loginSchema } from '@/schemas/login';
import { useLoginMutation } from '@/services/mutations/auth';

import Link from 'next/link';
import Image from 'next/image';
import { Form } from '@/components/ui/form';
import FormInput from '@/components/reusable/form-input';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();
  const { mutate: login, isPending } = useLoginMutation();
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: LoginInput) => {
    login(values, {
      onSuccess: (data) => {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        if (data.user.role === 'ADMIN') router.replace('/admin');
        if (data.user.role === 'EMPLOYEE') router.replace('/employee');
        if (data.user.role === 'JOBSEEKER') router.replace('/');
        toast.success('Login successful!');
      },
      onError: (error) => {
        console.error('Login failed:', error);
      },
    });
  };

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}auth/google/login`;
  };

  return (
    <div className="lg:min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-900">
      <div className="grid lg:grid-cols-2 items-center gap-10 max-w-6xl max-lg:max-w-lg w-full">
        {/* LEFT TEXT SECTION */}
        <div>
          <h1 className="lg:text-5xl text-4xl font-bold text-slate-900 dark:text-gray-200 leading-tight">
            Seamless Login for Exclusive Access
          </h1>
          <p className="text-[15px] mt-6 text-slate-600 dark:text-gray-400 leading-relaxed">
            Immerse yourself in a hassle-free login journey with our intuitively
            designed login form. Effortlessly access your account.
          </p>
          <p className="text-[15px] mt-6 lg:mt-12 text-slate-600 dark:text-gray-400">
            Don&apos;t have an account{' '}
            <Link
              href="/register"
              className="text-blue-600 font-medium hover:underline ml-1"
            >
              Register here
            </Link>
          </p>
        </div>

        {/* LOGIN FORM */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-md lg:ml-auto w-full space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-slate-900 dark:text-gray-200 text-3xl font-semibold mb-8 text-center">
              Sign in
            </h2>

            <FormInput
              form={form}
              name="email"
              type="email"
              placeholder="Email Address"
              className="bg-slate-100 dark:bg-gray-700 w-full text-sm text-slate-900 dark:text-gray-200 px-4 py-3 rounded-md outline-0 border border-gray-200 dark:border-gray-600 focus:border-blue-600 focus:bg-transparent"
              required
            />

            <FormInput
              form={form}
              name="password"
              type="password"
              placeholder="Password"
              className="bg-slate-100 dark:bg-gray-700 w-full text-sm text-slate-900 dark:text-gray-200 px-4 py-3 rounded-md outline-0 border border-gray-200 dark:border-gray-600 focus:border-blue-600 focus:bg-transparent"
              required
            />

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-3 block text-sm text-slate-900 dark:text-gray-200"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <Link
                  href="/forget-password"
                  className="text-blue-600 hover:text-blue-500 font-medium"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full py-2.5 text-[15px] font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              {isPending ? 'Logging in...' : 'Log In'}
            </Button>

            {/* Social Login */}
            <div className="my-6 flex items-center gap-4">
              <hr className="w-full border-slate-300" />
              <p className="text-sm text-slate-900 dark:text-gray-200 text-center">
                or
              </p>
              <hr className="w-full border-slate-300" />
            </div>

            <div className="space-x-6 flex justify-center">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="border rounded-md p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png"
                  width={20}
                  height={20}
                  alt="Google"
                />
              </button>
              <button
                type="button"
                className="border rounded-md p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
                  width={20}
                  height={20}
                  alt="Facebook"
                />
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
