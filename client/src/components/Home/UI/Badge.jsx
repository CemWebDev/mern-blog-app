export default function Badge({ icon, title }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700">
      <span className="text-emerald-600">{icon}</span>
      <span className="font-medium">{title}</span>
    </div>
  );
}
