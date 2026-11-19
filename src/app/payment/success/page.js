'use client';
import Link from 'next/link';
import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import PrivateRoute from '@/components/PrivateRoute';
import { api } from '@/lib/api';
function Success() {
  const sid = useSearchParams().get('session_id'); const [state, setState] = useState('loading'); const [msg, setMsg] = useState('');
  useEffect(() => { if (sid) api('/payments/confirm', { method: 'POST', body: { sessionId: sid } }).then(() => setState('ok')).catch((x) => { setMsg(x.message || ''); setState('fail'); }); }, [sid]);
  return (
    <div className="container-x grid min-h-[70vh] place-items-center py-12"><div className="surface w-full max-w-lg p-10 text-center">
      {state === 'loading' && <span className="loading loading-ring text-primary" style={{ width: 64, height: 64 }} />}
      {state === 'ok' && <><span className="mx-auto grid h-24 w-24 place-items-center rounded-full text-5xl" style={{ background: 'linear-gradient(135deg,#FF7F00,#FFA95B)', boxShadow: '0 0 0 12px rgba(255,127,0,.15)' }}>🎉</span><h1 className="page-title mt-6">Payment successful</h1><p className="py-4 opacity-70">Your booking is confirmed.</p><Link href="/dashboard/customer/rentals" className="btn btn-primary">View My Rentals</Link></>}
      {state === 'fail' && <><span className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-error/15 text-5xl">⚠️</span><h1 className="page-title mt-6 !text-2xl">Payment could not be verified</h1>{msg && <p className="mt-3 text-sm opacity-70">{msg}</p>}<Link href="/equipment" className="btn btn-primary mt-6">Back to Equipment</Link></>}
    </div></div>);
}
export default function Page() { return <PrivateRoute roles={['customer']}><Suspense><Success /></Suspense></PrivateRoute>; }
