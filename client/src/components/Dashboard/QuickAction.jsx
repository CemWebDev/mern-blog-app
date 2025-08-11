export default function QuickAction({ title, desc, icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group w-full cursor-pointer text-left rounded-lg border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
          {icon}
        </div>
        <div>
          <p className="font-semibold text-gray-900">{title}</p>
          <p className="text-sm text-gray-600">{desc}</p>
        </div>
      </div>
    </button>
  );
}
