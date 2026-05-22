'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const isAdmin = localStorage.getItem('reelnest_admin');

    if (isAdmin === 'true') {
      setOk(true);
    } else {
      router.push('/admin/login');
    }
  }, [router]);

  if (!ok) {
    return (
      <div className="min-h-screen bg-[#070b14] text-white flex items-center justify-center">
        Checking admin access...
      </div>
    );
  }

  return <>{children}</>;
}