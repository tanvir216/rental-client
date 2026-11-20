"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import { Spin } from "@/components/Table";
export default function Profile() {
  const [u, setU] = useState(null);
  useEffect(() => {
    api("/users/me")
      .then(setU)
      .catch((x) => toast.error(x.message || "Could not load profile"));
  }, []);
  if (!u) return <Spin />;
  const set = (k) => (e) => setU({ ...u, [k]: e.target.value });
  const save = async (e) => {
    e.preventDefault();
    try {
      await api("/users/me", {
        method: "PATCH",
        body: {
          name: u.name,
          photo: u.photo,
          phone: u.phone,
          address: u.address,
        },
      });
      try {
        await authClient.updateUser({
          name: u.name,
          image: u.photo || undefined,
        });
      } catch (_) {
        /* navbar refresh is best-effort */
      }
      toast.success("Profile updated");
    } catch (x) {
      toast.error(x.message);
    }
  };
  const f = "input input-bordered w-full";
  return (
    <form onSubmit={save} className="surface mx-auto max-w-2xl overflow-hidden">
      <div
        className="relative h-32"
        style={{
          background:
            "radial-gradient(300px 140px at 90% 0%, rgba(255,211,170,.5), transparent 60%), linear-gradient(120deg,#FF7F00,#B05400 60%,#522600)",
        }}
      />
      <div className="-mt-14 px-6 pb-8 sm:px-10">
        <div className="flex flex-col items-center text-center">
          <img
            src={u.photo}
            alt=""
            className="h-28 w-28 rounded-full object-cover shadow-xl"
            style={{ border: "5px solid var(--c-orange)" }}
          />
          <h1 className="dash-title mt-3">{u.name || "My Profile"}</h1>
          <span className="badge badge-primary mt-2 font-bold capitalize">
            {u.role}
          </span>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="field-label">Name</label>
            <input
              className={f}
              value={u.name || ""}
              onChange={set("name")}
              placeholder="Name"
              required
            />
          </div>
          <div>
            <label className="field-label">Email</label>
            <input className={f} value={u.email} disabled />
          </div>
          <div className="sm:col-span-2">
            <label className="field-label">Profile image</label>
            <input
              className={f}
              value={u.photo || ""}
              onChange={set("photo")}
              placeholder="Image URL"
            />
          </div>
          <div>
            <label className="field-label">Phone number</label>
            <input
              className={f}
              value={u.phone || ""}
              onChange={set("phone")}
              placeholder="Phone number"
            />
          </div>
          <div>
            <label className="field-label">Address</label>
            <input
              className={f}
              value={u.address || ""}
              onChange={set("address")}
              placeholder="Address"
            />
          </div>
        </div>
        <button className="btn btn-primary mt-7 w-full">Update Profile</button>
      </div>
    </form>
  );
}
