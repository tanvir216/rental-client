'use client';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from './AuthProvider';
// Waits for session restore first, so reloading a private route never kicks a logged-in user to /login
export default function PrivateRoute({ roles, children }) {
  const { user, role, ready } = useAuth();
  const router = useRouter(); const path = usePathname();
  const denied = ready && user && roles && !roles.includes(role);
  useEffect(() => { if (ready && !user) router.replace(`/login?next=${encodeURIComponent(path)}`); else if (denied) router.replace('/'); }, [ready, user, denied, router, path]);
  if (!ready || !user || denied) return <div className="min-h-[60vh] grid place-items-center"><span className="loading loading-ring loading-lg text-primary" style={{ width: 64, height: 64 }} /></div>;
  return children;
}
