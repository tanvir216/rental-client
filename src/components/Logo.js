export default function Logo({ light = false }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span
        className="grid h-10 w-10 place-items-center rounded-xl shadow-lg"
        style={{
          background: "linear-gradient(135deg,#F28A2E,#F5A35C)",
          boxShadow: "0 8px 18px -8px rgba(242,138,46,.9)",
        }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#0e0e0e"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="3.2" />
          <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1" />
        </svg>
      </span>
      <span
        className={`font-display text-2xl font-black tracking-tight ${light ? "text-white" : ""}`}
      >
        Rent<span className="text-primary">Gear</span>
      </span>
    </span>
  );
}
