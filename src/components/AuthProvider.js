'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { authClient } from '@/lib/auth-client';
const Ctx = createContext({});
export const useAuth = () => useContext(Ctx);
export default function AuthProvider({ children }) {
  const { data, isPending } = authClient.useSession();
  const [role, setRole] = useState(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (isPending) return;
    if (!data?.user) { localStorage.removeItem('token'); localStorage.removeItem('role'); setRole(null); setReady(true); return; }
    (async () => {
      try {
        const r = await fetch('/api/token', { method: 'POST' });
        const d = await r.json();
        if (r.ok) { localStorage.setItem('token', d.token); localStorage.setItem('role', d.role); setRole(d.role); }
      } catch (e) { console.error(e); }
      setReady(true);
    })();
  }, [data, isPending]);
  const logout = async () => { await authClient.signOut(); localStorage.removeItem('token'); localStorage.removeItem('role'); setRole(null); };
  return <Ctx.Provider value={{ user: data?.user, role, ready, logout }}>{children}</Ctx.Provider>;
}
