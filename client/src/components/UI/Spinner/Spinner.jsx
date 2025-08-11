const sizes = {
  sm: 'w-4 h-4 border-2',
  md: 'w-6 h-6 border-2',
  lg: 'w-10 h-10 border-3',
};

export default function Spinner({ size = 'md', label, className = '' }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <div
        aria-hidden="true"
        className={`${sizes[size]} rounded-full border-gray-300 border-t-emerald-600 animate-spin`}
      />
      {label && <span className="text-sm text-gray-600">{label}</span>}
    </div>
  );
}
