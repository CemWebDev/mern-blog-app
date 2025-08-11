import { BookOpen, Sparkles } from 'lucide-react';

export default function PreviewCard({ accent = false, className = '' }) {
  return (
    <div
      className={`rounded-2xl border ${
        accent ? 'border-emerald-200' : 'border-gray-100'
      } bg-white p-5 shadow-sm ${className}`}
    >
      <div
        className={`mb-4 h-36 w-full rounded-xl ${
          accent
            ? 'bg-gradient-to-br from-emerald-100 to-teal-100'
            : 'bg-gray-100'
        }`}
      />
      <div className="h-5 w-2/3 rounded bg-gray-200 mb-2" />
      <div className="h-4 w-5/6 rounded bg-gray-200 mb-1.5" />
      <div className="h-4 w-3/5 rounded bg-gray-200" />
      <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
        <span className="inline-flex items-center gap-1">
          <BookOpen className="w-3.5 h-3.5" /> 5 dk
        </span>
        <span className="inline-flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" /> Popüler
        </span>
      </div>
    </div>
  );
}
