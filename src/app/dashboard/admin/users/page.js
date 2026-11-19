'use client';
import toast from 'react-hot-toast';
import Table, { Spin, fmt } from '@/components/Table';
import useFetch from '@/lib/useFetch';
import { api } from '@/lib/api';
import { useAuth } from '@/components/AuthProvider';
export default function Users() {
  const [d, load] = useFetch('/users'); const { user } = useAuth();
  if (!d) return <Spin />;
  const role = async (id, r) => { try { await api(`/users/${id}/role`, { method: 'PATCH', body: { role: r } }); toast.success('Role changed'); } catch (x) { toast.error(x.message); } load(); };
  const del = async (id) => { if (!confirm('Delete this user?')) return; try { await api(`/users/${id}`, { method: 'DELETE' }); toast.success('User deleted'); } catch (x) { toast.error(x.message); } load(); };
  return (<><h1 className="dash-title mb-6">All Users</h1>
    <Table rows={d} cols={[['Name', (r) => r.name], ['Email', (r) => r.email], ['Role', (r) => <select disabled={r.email === user?.email} className="select select-bordered select-xs" value={r.role} onChange={(e) => role(r._id, e.target.value)}><option>customer</option><option>owner</option><option>admin</option></select>], ['Registered', (r) => fmt(r.createdAt)], ['Actions', (r) => <button disabled={r.email === user?.email} onClick={() => del(r._id)} className="btn btn-xs btn-error">Delete</button>]]} /></>);
}
