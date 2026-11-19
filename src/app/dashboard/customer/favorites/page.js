'use client';
import Link from 'next/link';
import toast from 'react-hot-toast';
import Table, { Spin } from '@/components/Table';
import useFetch from '@/lib/useFetch';
import { api } from '@/lib/api';
export default function Favorites() {
  const [d, load] = useFetch('/favorites');
  if (!d) return <Spin />;
  const remove = (id) => api(`/favorites/${id}`, { method: 'DELETE' }).then(() => { toast.success('Removed'); load(); });
  return (<><h1 className="dash-title mb-6">Favorites</h1>
    <Table rows={d} cols={[['Image', (r) => <img src={r.image} className="w-14 h-14 rounded object-cover" alt="" />], ['Equipment', (r) => r.name], ['Price', (r) => `$${r.price}/${r.rentalType}`], ['Actions', (r) => <div className="flex gap-2"><Link href={`/equipment/${r._id}`} className="btn btn-xs btn-primary">View Details</Link><button onClick={() => remove(r._id)} className="btn btn-xs btn-error">Remove</button></div>]]} /></>);
}
