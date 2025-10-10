'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type LoginInput, loginSchema } from '@/schemas/login';
import Link from 'next/link';
import Image from 'next/image';
import FormInput from '@/components/reusable/form-input';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useLoginMutation } from '@/services/mutations/auth';
import { Briefcase } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
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
        if (data.user.roles === 'Admin') router.replace('/admin');
        else if (data.user.roles === 'Employee') router.replace('/employee');
        else if (data.user.roles === 'Jobseeker') router.replace('/jobseeker');
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
    <div className="min-h-screen flex items-center justify-center transition-colors duration-300 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:via-slate-900 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white dark:bg-gray-900 shadow-2xl sm:rounded-2xl flex justify-center flex-1 transition-colors duration-300 border border-slate-200 dark:border-gray-800">
        {/* LEFT SIDE (Login Form) */}
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="mt-10 flex flex-col items-center">
            <div className="mb-8 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 dark:from-indigo-600 dark:to-purple-600 flex items-center justify-center shadow-lg">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                Job Portal
              </h1>
            </div>

            <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2 transition-colors duration-300">
              Welcome Back
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 transition-colors duration-300">
              Login to your account and find your dream job
            </p>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full max-w-xs space-y-8"
              >
                {/* Email */}
                <div className="relative">
                  <FormInput
                    form={form}
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    className="peer mt-2 w-full bg-transparent border-b-2 border-gray-300 dark:border-gray-700 px-0 py-2 placeholder-transparent focus:border-blue-600 dark:focus:border-indigo-500 focus:outline-none transition-colors duration-300 text-gray-900 dark:text-gray-100"
                    required
                  />
                  <label
                    htmlFor="email"
                    className="absolute top-0 left-0 origin-left -translate-y-1/2 bg-transparent transform text-sm text-gray-800 dark:text-gray-300 opacity-75 transition-all duration-150 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 dark:peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-600 dark:peer-focus:text-indigo-400"
                  >
                    Email Address
                  </label>
                </div>

                {/* Password */}
                <div className="relative">
                  <FormInput
                    form={form}
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="peer mt-2 w-full bg-transparent border-b-2 border-gray-300 dark:border-gray-700 px-0 py-2 placeholder-transparent focus:border-blue-600 dark:focus:border-indigo-500 focus:outline-none transition-colors duration-300 text-gray-900 dark:text-gray-100"
                    required
                  />
                  <label
                    htmlFor="password"
                    className="absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 dark:text-gray-300 opacity-75 transition-all duration-150 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 dark:peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:text-sm peer-focus:text-blue-600 dark:peer-focus:text-indigo-400"
                  >
                    Password
                  </label>
                </div>

                {/* Login button and Forgot Password */}
                <div className="flex items-center justify-between mt-8">
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="flex items-center justify-center px-8 py-3 border-0 text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-indigo-600 dark:to-purple-600 hover:from-blue-700 hover:to-indigo-700 dark:hover:from-indigo-700 dark:hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                  >
                    {isPending ? 'Logging in...' : 'Log In'}
                  </Button>
                  <Link
                    href="/forgot-password"
                    className="font-normal text-blue-600 dark:text-indigo-400 hover:text-blue-700 dark:hover:text-indigo-300 transition-colors duration-300"
                  >
                    Forgot Password?
                  </Link>
                </div>

                {/* Divider */}
                <div className="flex justify-evenly items-center space-x-2 w-full mt-6">
                  <span className="bg-gray-300 dark:bg-gray-700 h-px flex-grow transition-colors duration-300"></span>
                  <span className="flex-none uppercase text-xs text-gray-600 dark:text-gray-400 font-semibold transition-colors duration-300">
                    or continue with
                  </span>
                  <span className="bg-gray-300 dark:bg-gray-700 h-px flex-grow transition-colors duration-300"></span>
                </div>

                {/* Social Login Buttons */}
                <div className="mt-6 flex flex-col items-center gap-3">
                  <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="flex items-center justify-start pl-14 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm max-w-xs w-full px-6 py-3 text-sm font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-blue-600 dark:hover:border-indigo-500 transition-all duration-300"
                  >
                    <Image
                      src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png"
                      width={20}
                      height={20}
                      alt="Google"
                      className="mr-3"
                    />
                    Continue with Google
                  </button>

                  <button
                    type="button"
                    className="flex items-center justify-start pl-14 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm max-w-xs w-full px-6 py-3 text-sm font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-blue-600 dark:hover:border-indigo-500 transition-all duration-300"
                  >
                    <Image
                      src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
                      width={20}
                      height={20}
                      alt="Facebook"
                      className="mr-3"
                    />
                    Continue with Facebook
                  </button>
                </div>

                {/* Sign up link */}
                <div className="text-center mt-8">
                  <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                    {"Don't have an account? "}
                    <Link
                      href="/register"
                      className="font-semibold text-blue-600 dark:text-indigo-400 hover:text-blue-700 dark:hover:text-indigo-300 transition-colors duration-300"
                    >
                      Sign up here
                    </Link>
                  </p>
                </div>
              </form>
            </Form>
          </div>
        </div>

        {/* RIGHT SIDE (Image Section) */}
        <div className="hidden lg:flex flex-1 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 text-center items-center justify-center transition-colors duration-300 rounded-r-2xl">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat opacity-90 dark:opacity-70 transition-opacity duration-300"
            style={{
              backgroundImage:
                "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
