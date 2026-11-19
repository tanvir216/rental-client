'use client';
import { useState } from 'react';
import Table, { Badge, Spin, fmt } from '@/components/Table';
import Analytics from '@/components/Analytics';
import useFetch from '@/lib/useFetch';
export default function Rentals() {
  const [page, setPage] = useState(1); const [d] = useFetch(`/my-bookings?page=${page}&limit=10`);
  if (!d) return <Spin />;
  return (<><Analytics url="/analytics/customer" stats={[['Total Rentals', 'bookings'], ['Total Spent', 'spent', '$']]} chartKey="monthlySpending" dataKey="spent" title="Monthly spending" /><h1 className="dash-title my-6">My Rentals</h1>
    <Table rows={d.items} cols={[['Equipment', (r) => r.equipmentName], ['Start', (r) => fmt(r.startDate)], ['End', (r) => fmt(r.endDate)], ['Booked on', (r) => fmt(r.createdAt)], ['Total', (r) => '$' + r.totalAmount], ['Payment', (r) => <Badge v={r.paymentStatus} />], ['Status', (r) => <Badge v={r.bookingStatus} />]]} />
    <div className="pager join mt-6 gap-2">{Array.from({ length: Math.ceil(d.total / 10) }, (_, i) => <button key={i} onClick={() => setPage(i + 1)} className={`join-item btn btn-sm ${page === i + 1 ? 'btn-active' : ''}`}>{i + 1}</button>)}</div></>);
}
