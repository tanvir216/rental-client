"use client";
import toast from "react-hot-toast";
import Table, { Badge, Spin, fmt } from "@/components/Table";
import useFetch from "@/lib/useFetch";
import { api } from "@/lib/api";
export default function OwnerRentals() {
  const [d, load] = useFetch("/owner-bookings");
  if (!d) return <Spin />;
  const upd = async (id, status) => {
    try {
      const r = await api(`/bookings/${id}/status`, {
        method: "PATCH",
        body: { status },
      });
      if (r.refund === "refunded")
        toast.success("Cancelled and payment refunded");
      else if (r.refund === "failed")
        toast.error(
          "Cancelled, but the refund failed. Please refund manually in Stripe.",
        );
      else toast.success("Status updated");
    } catch (x) {
      toast.error(x.message);
    }
    load();
  };
  return (
    <>
      <h1 className="dash-title mb-6">My Equipment Rental</h1>
      <Table
        rows={d}
        cols={[
          [
            "Customer",
            (r) => (
              <div>
                {r.customer.name}
                <br />
                <span className="text-xs opacity-70">
                  {r.customer.email} {r.customer.phone}
                </span>
              </div>
            ),
          ],
          ["Equipment", (r) => r.equipmentName],
          ["Duration", (r) => `${fmt(r.startDate)} - ${fmt(r.endDate)}`],
          ["Qty", (r) => r.quantity],
          ["Amount", (r) => "$" + r.totalAmount],
          ["Payment", (r) => <Badge v={r.paymentStatus} />],
          [
            "Status",
            (r) => (
              <select
                className="select select-bordered select-xs"
                disabled={r.bookingStatus !== "confirmed"}
                value={r.bookingStatus}
                onChange={(e) => upd(r._id, e.target.value)}
              >
                <option>confirmed</option>
                <option>completed</option>
                <option>cancelled</option>
              </select>
            ),
          ],
        ]}
      />
    </>
  );
}
