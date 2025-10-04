'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function GoogleSuccess() {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const token = params.get('token');
    const user = params.get('user');

    if (token && user) {
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', user);

      router.push('/'); // redirect after login
    } else {
      router.push('/'); // fallback
    }
  }, [router]);

  return <div>Logging you in...</div>;
}
