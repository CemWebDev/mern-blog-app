import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

export default function CreatePostCard() {
  return (
    <Link to="/new-post" className="group block">
      <article className="bg-white border-2 border-dashed border-emerald-200 rounded-2xl overflow-hidden h-full hover:border-emerald-300 hover:shadow-md transition">
        <div className="w-full aspect-[16/9] bg-emerald-50 grid place-items-center">
          <div className="flex items-center gap-3 text-emerald-700">
            <span className="inline-grid place-items-center w-10 h-10 rounded-xl bg-white ring-1 ring-emerald-200 group-hover:scale-105 transition">
              <Plus className="w-5 h-5" />
            </span>
            <span className="font-semibold">Yeni yazı oluştur</span>
          </div>
        </div>
        <div className="p-5">
          <p className="text-gray-600">Fikirlerini paylaşmaya başla</p>
        </div>
      </article>
    </Link>
  );
}
