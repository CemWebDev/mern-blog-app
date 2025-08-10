import { Image as ImageIcon } from 'lucide-react';

const GRADIENTS = [
  'from-emerald-400 via-emerald-500 to-teal-500',
  'from-sky-400 via-cyan-500 to-blue-600',
  'from-fuchsia-400 via-pink-500 to-rose-500',
  'from-amber-400 via-orange-500 to-red-500',
  'from-violet-400 via-purple-500 to-indigo-500',
];

function hash(str = '') {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h << 5) - h + str.charCodeAt(i);
  return Math.abs(h);
}

export default function CoverPlaceholder({
  title = '',
  showIcon = true,
  className = '',
}) {
  const idx = hash(title) % GRADIENTS.length;
  const initial = (title?.[0] || '•').toUpperCase();

  return (
    <div
      className={`relative w-full aspect-[16/9] overflow-hidden ${className}`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${GRADIENTS[idx]}`} />
      <div className="absolute -top-16 -right-10 w-64 h-64 rounded-full bg-white/20 blur-3xl opacity-50" />
      <div className="absolute -bottom-10 -left-16 w-72 h-72 rounded-full bg-white/10 blur-3xl opacity-60" />
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: 'radial-gradient(#ffffff 0.8px, transparent 0.8px)',
          backgroundSize: '14px 14px',
          backgroundPosition: '0 0',
        }}
      />
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="flex items-center gap-3">
          {showIcon && (
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-white/20 ring-1 ring-white/30 backdrop-blur-sm">
              <ImageIcon className="w-5 h-5 text-white/90" />
            </span>
          )}
          <span className="text-white/95 drop-shadow-sm text-4xl font-extrabold tracking-wide">
            {initial}
          </span>
        </div>
      </div>
    </div>
  );
}
