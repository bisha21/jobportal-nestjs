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

export default function LoginForm() {
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
    <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
      {/* LEFT SIDE (Login Form) */}
      <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
        <div className="mt-10 flex flex-col items-center">
          <h1 className="text-4xl font-semibold text-gray-800 mb-6">
            Login to Job Portal
          </h1>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full max-w-xs space-y-6"
            >
              {/* Email */}
              <div className="relative">
                <FormInput
                  form={form}
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  className="peer mt-2 w-full bg-transparent border-b-2 border-gray-300 px-0 py-1 placeholder-transparent focus:border-gray-500 focus:outline-none"
                  required
                />
                <label
                  htmlFor="email"
                  className="absolute top-0 left-0 origin-left -translate-y-1/2 bg-transparent transform text-sm text-gray-800 opacity-75 transition-all duration-150 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:text-sm peer-focus:text-gray-800"
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
                  className="peer mt-2 w-full bg-transparent border-b-2 border-gray-300 px-0 py-1 placeholder-transparent focus:border-gray-500 focus:outline-none"
                  required
                />
                <label
                  htmlFor="password"
                  className="absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-150 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:text-sm peer-focus:text-gray-800"
                >
                  Password
                </label>
              </div>

              {/* Login button and Forgot Password */}
              <div className="flex items-center justify-between mt-8">
                <Button
                  type="submit"
                  className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-normal rounded-md text-white bg-red-600 hover:bg-red-700 w-1/2"
                >
                  {isPending ? 'Logging in...' : 'Log In'}
                </Button>
                <Link
                  href="/forget-password"
                  className="font-normal text-red-500"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Divider */}
              <div className="flex justify-evenly items-center space-x-2 w-full mt-4">
                <span className="bg-gray-300 h-px flex-grow t-2 relative top-2"></span>
                <span className="flex-none uppercase text-md text-gray-900 mt-4 font-semibold">
                  or
                </span>
                <span className="bg-gray-300 h-px flex-grow t-2 relative top-2"></span>
              </div>

              {/* Social Login Buttons */}
              <div className="mt-4 flex flex-col items-center gap-3">
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="flex items-center justify-start pl-14 bg-white border border-gray-800 rounded-md shadow-sm max-w-xs w-full px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100 hover:border-blue-700"
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
                  className="flex items-center justify-start pl-14 bg-white border border-gray-800 rounded-md shadow-sm max-w-xs w-full px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100 hover:border-blue-700"
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
            </form>
          </Form>
        </div>
      </div>

      {/* RIGHT SIDE (Image Section) */}
      <div className="hidden lg:flex flex-1 bg-indigo-100 text-center items-center justify-center">
        <div
          className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')",
          }}
        ></div>
      </div>
    </div>
  );
}
