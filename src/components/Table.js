export const Spin = () => <div className="grid place-items-center py-24"><span className="loading loading-ring loading-lg text-primary" style={{ width: 64, height: 64 }} /></div>;
// Full class names so Tailwind can see them
const tone = {
  success: 'bg-success/15 text-success border-success/30',
  info: 'bg-primary/15 brand-ink border-primary/40',
  warning: 'bg-warning/20 text-warning border-warning/40',
  error: 'bg-error/15 text-error border-error/30',
  ghost: 'bg-base-300 border-transparent',
};
const color = { paid: 'success', approved: 'success', completed: 'success', confirmed: 'info', pending: 'warning', rejected: 'error', cancelled: 'error', refunded: 'warning', refund_failed: 'error', needs_refund: 'warning' };
export const Badge = ({ v }) => <span className={`badge badge-md gap-1.5 border font-bold capitalize ${tone[color[v] || 'ghost']}`}><i className="inline-block h-1.5 w-1.5 rounded-full bg-current" />{v}</span>;
export const fmt = (d) => new Date(d).toLocaleDateString();
export default function Table({ cols, rows }) {
  if (!rows?.length) return <div className="surface grid place-items-center gap-2 py-16 text-center"><span className="text-4xl">📭</span><p className="font-display text-lg font-bold">No data found</p><p className="text-sm opacity-60">Nothing to show here yet.</p></div>;
  return (<div className="table-wrap"><table className="table">
    <thead><tr>{cols.map((c) => <th key={c[0]}>{c[0]}</th>)}</tr></thead>
    <tbody>{rows.map((r) => <tr key={r._id}>{cols.map((c) => <td key={c[0]}>{c[1](r)}</td>)}</tr>)}</tbody></table></div>);
}
