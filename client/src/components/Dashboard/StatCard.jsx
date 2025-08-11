export default function StatCard({ icon, label, value, muted = false, cta }) {
  return (
    <div className="rounded-lg border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-sm text-gray-600">{label}</p>
          <p
            className={`truncate text-lg font-semibold ${
              muted ? 'text-gray-700' : 'text-gray-900'
            }`}
          >
            {value}
          </p>
          {cta ? cta() : null}
        </div>
      </div>
    </div>
  );
}
