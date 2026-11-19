'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Table, { Badge, Spin } from '@/components/Table';
import EditModal from '@/components/EditModal';
import useFetch from '@/lib/useFetch';
import { api } from '@/lib/api';
export default function AdminEquipment() {
  const [d, load] = useFetch('/admin/equipment'); const [edit, setEdit] = useState(null);
  if (!d) return <Spin />;
  const status = async (id, s) => { await api(`/equipment/${id}/status`, { method: 'PATCH', body: { status: s } }); toast.success(`Marked ${s}`); load(); };
  const del = async (id) => { if (!confirm('Delete this equipment?')) return; await api(`/equipment/${id}`, { method: 'DELETE' }); toast.success('Deleted'); load(); };
  return (<><h1 className="dash-title mb-6">All Equipment</h1>
    <Table rows={d} cols={[['Equipment', (r) => r.name], ['Owner', (r) => r.owner?.email], ['Price', (r) => `$${r.price}/${r.rentalType}`], ['Status', (r) => <Badge v={r.status} />], ['Actions', (r) => <div className="flex gap-1 flex-wrap"><button onClick={() => status(r._id, 'approved')} className="btn btn-xs btn-success">Approve</button><button onClick={() => status(r._id, 'rejected')} className="btn btn-xs btn-warning">Reject</button><button onClick={() => setEdit(r)} className="btn btn-xs btn-info">Update</button><button onClick={() => del(r._id)} className="btn btn-xs btn-error">Delete</button></div>]]} />
    {edit && <EditModal item={edit} onClose={() => setEdit(null)} onSaved={load} />}</>);
}
