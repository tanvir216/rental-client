'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { api } from '@/lib/api';
const cats = ['Construction Equipment', 'Photography Equipment', 'Vehicles & Transportation', 'Agriculture Equipment', 'Electronics', 'Event Equipment'];
export default function AddEquipment() {
  const router = useRouter(); const [busy, setBusy] = useState(false);
  const submit = async (e) => {
    e.preventDefault(); setBusy(true);
    const f = new FormData(e.target), body = Object.fromEntries(f);
    try {
      const fd = new FormData(); fd.append('image', f.get('imageFile'));
      const up = await (await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`, { method: 'POST', body: fd })).json();
      if (!up.success) throw new Error('Image upload failed');
      delete body.imageFile; body.image = up.data.url;
      await api('/equipment', { method: 'POST', body }); toast.success('Submitted for approval'); router.push('/dashboard/owner/equipment');
    } catch (x) { toast.error(x.message); setBusy(false); }
  };
  const i = 'input input-bordered w-full';
  return (<form onSubmit={submit} className="surface mx-auto grid max-w-4xl gap-4 p-6 sm:p-10 md:grid-cols-2">
    <div className="md:col-span-2"><h1 className="dash-title">Add Equipment</h1><span className="palette-bar mt-3 block w-24" /></div>
    <input name="name" required placeholder="Equipment name" className={i} />
    <select name="category" required className="select select-bordered w-full">{cats.map((c) => <option key={c}>{c}</option>)}</select>
    <input name="location" required placeholder="Location" className={i} />
    <input name="price" type="number" min="1" required placeholder="Rental price ($)" className={i} />
    <select name="rentalType" className="select select-bordered w-full"><option>Daily</option><option>Weekly</option><option>Monthly</option></select>
    <input name="availableQuantity" type="number" min="1" required placeholder="Available quantity" className={i} />
    <select name="condition" className="select select-bordered w-full"><option>New</option><option>Like New</option><option>Good</option><option>Fair</option></select>
    <input name="brand" required placeholder="Brand" className={i} /><input name="model" required placeholder="Model" className={i} />
    <input name="imageFile" type="file" accept="image/*" required className="file-input file-input-bordered w-full" />
    <textarea name="description" required placeholder="Description" className="textarea textarea-bordered md:col-span-2" />
    <textarea name="terms" required placeholder="Rental terms and conditions" className="textarea textarea-bordered md:col-span-2" />
    <button disabled={busy} className="btn btn-primary btn-lg md:col-span-2">{busy ? 'Uploading...' : 'Add Equipment'}</button></form>);
}
