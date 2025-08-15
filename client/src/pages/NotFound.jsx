import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="mt-4 text-lg text-gray-500">Aradığınız sayfa bulunamadı.</p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
      >
        Anasayfa’ya Dön
      </Link>
    </div>
  );
}
