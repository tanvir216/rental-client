"use client";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import Table, { Badge, Spin } from "@/components/Table";
import EditModal from "@/components/EditModal";
import useFetch from "@/lib/useFetch";
import { api } from "@/lib/api";
export default function MyEquipment() {
  const [d, load] = useFetch("/my-equipment");
  const [edit, setEdit] = useState(null);
  if (!d) return <Spin />;
  const del = async (id) => {
    if (!confirm("Delete this equipment?")) return;
    await api(`/equipment/${id}`, { method: "DELETE" });
    toast.success("Deleted");
    load();
  };
  return (
    <>
      <h1 className="dash-title mb-6">My Equipment</h1>
      <Table
        rows={d}
        cols={[
          ["Equipment", (r) => r.name],
          ["Category", (r) => r.category],
          ["Price", (r) => `$${r.price}/${r.rentalType}`],
          ["Qty", (r) => r.availableQuantity],
          ["Status", (r) => <Badge v={r.status} />],
          [
            "Actions",
            (r) => (
              <div className="flex gap-1">
                <button
                  onClick={() => setEdit(r)}
                  className="btn btn-xs btn-info"
                >
                  Update
                </button>
                <button
                  onClick={() => del(r._id)}
                  className="btn btn-xs btn-error"
                >
                  Delete
                </button>
                <Link
                  href={`/equipment/${r._id}`}
                  className="btn btn-xs btn-primary"
                >
                  Details
                </Link>
              </div>
            ),
          ],
        ]}
      />
      {edit && (
        <EditModal item={edit} onClose={() => setEdit(null)} onSaved={load} />
      )}
    </>
  );
}
