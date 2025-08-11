export default function FeatureCard({ icon, title, text }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="absolute -inset-x-6 -top-6 h-24 bg-gradient-to-b from-emerald-50 to-transparent opacity-0 transition group-hover:opacity-100" />
      <div className="flex items-center gap-3">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
          {icon}
        </div>
        <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
      </div>
      <p className="mt-3 text-gray-600">{text}</p>
    </div>
  );
}
