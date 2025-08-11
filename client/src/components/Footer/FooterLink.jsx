import { Link } from 'react-router-dom';

export function FooterLink({ to, children, muted = false }) {
  const base = 'hover:text-emerald-700 transition';
  return (
    <Link
      to={to}
      className={`${base} ${muted ? 'text-gray-500' : 'text-gray-600'}`}
    >
      {children}
    </Link>
  );
}
