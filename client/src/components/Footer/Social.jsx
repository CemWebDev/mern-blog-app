export function Social({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 text-gray-600 hover:text-emerald-700 hover:border-emerald-300 transition bg-white"
    >
      {children}
    </a>
  );
}
