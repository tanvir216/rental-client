'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAuth } from '@/components/AuthProvider';
import { api } from '@/lib/api';
function Details() {
  const { id } = useParams(); const { role, user } = useAuth();
  const [e, setE] = useState(null); const [open, setOpen] = useState(false); const [form, setForm] = useState({ quantity: 1 }); const [busy, setBusy] = useState(false); const [err, setErr] = useState('');
  useEffect(() => { api(`/equipment/${id}`).then(setE).catch((x) => { setErr(x.message || 'Equipment not found'); toast.error(x.message); }); }, [id]);
  if (err) return <div className="container-x grid min-h-[60vh] place-items-center py-12 text-center"><div className="surface max-w-md p-10"><span className="text-5xl">🔍</span><h1 className="page-title mt-4 !text-3xl">Equipment not found</h1><p className="mt-3 text-sm opacity-70">{err}</p><Link href="/equipment" className="btn btn-primary mt-6">Back to Equipment</Link></div></div>;
  if (!e) return <div className="min-h-[60vh] grid place-items-center"><span className="loading loading-ring loading-lg text-primary" style={{ width: 64, height: 64 }} /></div>;
  const days = form.startDate && form.endDate ? Math.max(1, Math.round((new Date(form.endDate) - new Date(form.startDate)) / 864e5) + 1) : 0;
  const units = e.rentalType === 'Weekly' ? Math.ceil(days / 7) : e.rentalType === 'Monthly' ? Math.ceil(days / 30) : days;
  const total = units * e.price * (form.quantity || 0);
  const set = (k) => (ev) => setForm({ ...form, [k]: ev.target.value });
  const fav = () => api('/favorites', { method: 'POST', body: { equipmentId: id } }).then(() => toast.success('Added to favorites')).catch((x) => toast.error(x.message));
  const book = async (ev) => {
    ev.preventDefault();
    if (form.endDate < form.startDate) return toast.error('End date must be after start date');
    if (+form.quantity > e.availableQuantity) return toast.error('Not enough quantity available');
    setBusy(true);
    try { const { url } = await api('/create-checkout-session', { method: 'POST', body: { ...form, equipmentId: id } }); window.location.href = url; }
    catch (x) { toast.error(x.message); setBusy(false); }
  };
  const field = 'input input-bordered w-full';
  return (
    <div className="container-x py-10 sm:py-14">
      <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="relative lg:sticky lg:top-28">
          <span className="absolute -inset-3 -z-10 rounded-[2rem]" style={{ background: 'linear-gradient(135deg,#FF7F00,#FFD3AA)', opacity: 0.35, filter: 'blur(22px)' }} />
          <img src={e.image} alt={e.name} className="aspect-[4/3] w-full rounded-3xl object-cover shadow-2xl" style={{ border: '4px solid var(--c-orange)' }} />
        </div>
        <div className="space-y-5">
          <div><span className="eyebrow">Equipment details</span><h1 className="page-title mt-3">{e.name}</h1></div>
          <div className="flex flex-wrap gap-2"><span className="badge badge-primary badge-lg font-bold">{e.category}</span><span className="badge badge-outline badge-lg">{e.condition}</span><span className="badge badge-outline badge-lg">{e.brand} {e.model}</span></div>
          <p className="leading-relaxed opacity-80">{e.description}</p>
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl p-5 text-white" style={{ background: 'linear-gradient(135deg,#000,#522600)' }}>
            <p className="font-display text-4xl font-black text-[#FFA95B]">${e.price} <span className="text-base font-semibold text-[#ffe7cf]/70">/ {e.rentalType}</span></p>
            <div className="text-sm text-[#ffe7cf]/85"><p>📍 {e.location}</p><p className="mt-1">Available: <b className="text-[#FFA95B]">{e.availableQuantity}</b></p></div>
          </div>
          <div className="surface flex items-center gap-3 p-4"><img src={e.owner?.photo} className="h-12 w-12 rounded-full object-cover ring-2 ring-primary" alt="" /><div><p className="text-xs font-bold uppercase tracking-wider opacity-60">Owner</p><p className="font-semibold">{e.owner?.name} <span className="font-normal opacity-70">({e.owner?.email})</span></p></div></div>
          <div className="collapse collapse-arrow surface"><input type="checkbox" /><div className="collapse-title font-display font-bold">Rental terms and conditions</div><div className="collapse-content"><p className="text-sm leading-relaxed opacity-80">{e.terms}</p></div></div>
          {!user && <div className="pt-1"><Link href={`/login?next=${encodeURIComponent('/equipment/' + id)}`} className="btn btn-primary btn-lg">Login to book</Link></div>}
          {role === 'customer' && <div className="flex flex-wrap gap-3 pt-1"><button className="btn btn-primary btn-lg" disabled={e.availableQuantity < 1} onClick={() => setOpen(true)}>Book Now</button><button className="btn btn-outline btn-lg" onClick={fav}>♡ Add to Favorites</button></div>}
        </div>
      </div>
      <dialog className={`modal ${open ? 'modal-open' : ''}`}><div className="modal-box max-w-lg">
        <h3 className="font-display text-2xl font-extrabold">Book {e.name}</h3><span className="palette-bar mb-5 mt-2 block w-20" />
        <form onSubmit={book} className="space-y-3">
          <div className="grid grid-cols-2 gap-3"><div><label className="field-label">Start date</label><input type="date" required className={field} onChange={set('startDate')} min={new Date().toISOString().slice(0, 10)} /></div><div><label className="field-label">End date</label><input type="date" required className={field} onChange={set('endDate')} min={form.startDate} /></div></div>
          <div><label className="field-label">Quantity</label><input type="number" min="1" max={e.availableQuantity} required value={form.quantity} onChange={set('quantity')} className={field} placeholder="Quantity" /></div>
          <input required placeholder="Contact number" className={field} onChange={set('phone')} />
          <input required placeholder="Delivery address" className={field} onChange={set('address')} />
          <textarea placeholder="Additional notes" className="textarea textarea-bordered w-full" onChange={set('notes')} />
          <div className="flex items-center justify-between rounded-2xl p-4" style={{ background: 'var(--soft)' }}><span className="text-sm font-semibold opacity-70">Estimated total</span><span className="font-display text-3xl font-black brand-ink">${total}</span></div>
          <div className="modal-action"><button type="button" className="btn btn-ghost" onClick={() => setOpen(false)}>Cancel</button><button disabled={busy} className="btn btn-primary">{busy ? 'Redirecting...' : 'Confirm & Pay'}</button></div>
        </form></div></dialog>
    </div>);
}
export default function Page() { return <Details />; }
