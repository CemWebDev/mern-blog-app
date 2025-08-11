import { Link } from 'react-router-dom';
import Button from '../UI/Button/Button';
export default function EmptyState() {
  return (
    <div className="rounded-sm cursor-pointer border border-gray-100 bg-white p-10 text-center shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Henüz yazın yok
      </h3>
      <p className="text-gray-600 mb-5">
        İlk yazını hazırlayıp toplulukla paylaşmaya başla.
      </p>
      <Link to="/new-post">
        <Button size="tall">İlk Yazını Oluştur</Button>
      </Link>
    </div>
  );
}
