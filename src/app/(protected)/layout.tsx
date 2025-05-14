'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const refreshToken = Cookies.get('token');
    console.log('token', refreshToken);
    if (!refreshToken) {
      toast.error('Silahkan login terlebih dahulu');
      router.push('/signin');
    }
  }, [router]);

  return <>{children}</>;
}
