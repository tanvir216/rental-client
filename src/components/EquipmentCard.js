import Link from "next/link";

export default function EquipmentCard({ e, showStatus = false }) {
  const ok = e.availableQuantity > 0;
  return (
    <div className="eq-card">
      <div className="eq-img">
        <img
          src={e.image}
          alt={e.name}
          loading="lazy"
          onError={(ev) => {
            ev.currentTarget.onerror = null;
            ev.currentTarget.src =
              "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 3'><rect width='4' height='3' fill='%23ebe7e1'/></svg>";
          }}
        />
        <span className="eq-chip">{e.category}</span>
        {showStatus && (
          <span
            className={`badge absolute right-3 top-3 border-0 font-bold ${ok ? "bg-success text-success-content" : "bg-error text-error-content"}`}
          >
            {ok ? "Available" : "Unavailable"}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="line-clamp-1 font-display text-xl font-bold">
          {e.name}
        </h3>
        <p className="flex items-center gap-1.5 text-sm opacity-70">
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span className="line-clamp-1">{e.location}</span>
        </p>
        <div className="mt-auto flex items-end justify-between gap-3 pt-1">
          <p className="font-display text-2xl font-extrabold brand-ink">
            ${Number(e.price).toLocaleString()}
            <span className="text-sm font-semibold opacity-60">
              {" "}
              / {String(e.rentalType || "").toLowerCase()}
            </span>
          </p>
          {typeof e.availableQuantity === "number" && ok && (
            <span className="text-xs font-semibold opacity-60">
              {e.availableQuantity} left
            </span>
          )}
        </div>
        <Link
          href={`/equipment/${e._id}`}
          className="btn btn-primary btn-sm w-full"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
