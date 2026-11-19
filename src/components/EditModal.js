'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { api } from '@/lib/api';
export default function EditModal({ item, onClose, onSaved }) {
  const [f, setF] = useState(item);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const save = async (e) => {
    e.preventDefault();
    try { await api(`/equipment/${item._id}`, { method: 'PUT', body: { name: f.name, price: f.price, availableQuantity: f.availableQuantity, location: f.location, description: f.description } }); toast.success('Updated'); onSaved(); onClose(); }
    catch (x) { toast.error(x.message); }
  };
  return (<dialog className="modal modal-open"><form onSubmit={save} className="modal-box space-y-3">
    <h3 className="font-display text-2xl font-extrabold">Update equipment</h3><span className="palette-bar block w-20" />
    <input className="input input-bordered w-full" value={f.name} onChange={set('name')} required />
    <div className="grid grid-cols-2 gap-2"><input type="number" className="input input-bordered" value={f.price} onChange={set('price')} required /><input type="number" className="input input-bordered" value={f.availableQuantity} onChange={set('availableQuantity')} required /></div>
    <input className="input input-bordered w-full" value={f.location} onChange={set('location')} required />
    <textarea className="textarea textarea-bordered w-full" value={f.description} onChange={set('description')} />
    <div className="modal-action"><button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button><button className="btn btn-primary">Save</button></div>
  </form></dialog>);
}
