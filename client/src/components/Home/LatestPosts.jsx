import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as postsService from "../../services/postsService";
import PostCard from '../Posts/PostCard.jsx';
import PostSkeleton from '../Posts/PostSkeleton';
import Button from '../UI/Button/Button';
import { useAuth } from '../../hooks/useAuth.js';
export default function LatestPosts() {
  const { user } = useAuth();
  const [latest, setLatest] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState('');

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await postsService.getPosts({ limit: 3 });
        const items = Array.isArray(res) ? res : res?.items || [];
        if (mounted) setLatest(items);
      } catch (e) {
        if (mounted)
          setErr(e?.response?.data?.message || e?.message || 'Bir şeyler ters gitti.');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Son Yazılar</h2>
            <p className="text-gray-600">En yeni 3 yazı</p>
          </div>
          <Link to="/posts">
            <Button variant="soft" size="tall">Tümünü Gör</Button>
          </Link>
        </div>

        {err && (
          <div className="mb-6 rounded-xl border border-rose-200 bg-rose-50 p-4 text-rose-700">
            {err}
          </div>
        )}

        {loading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => <PostSkeleton key={i} />)}
          </div>
        ) : latest.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-2xl p-10 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Henüz yazı yok</h3>
            <p className="text-gray-600 mb-5">İlk yazıyı sen yayınla ve topluluğa katıl.</p>
            {user ? (
              <Link to="/new-post">
                <Button variant="primary" size="tall">Yazı Oluştur</Button>
              </Link>
            ) : (
              <Link to="/register">
                <Button variant="primary" size="tall">Ücretsiz Kaydol</Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {latest.map((p) => <PostCard key={p._id} post={p} />)}
          </div>
        )}
      </div>
    </section>
  );
}
