import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PostCard from '../Posts/PostCard.jsx';
import PostSkeleton from '../Posts/PostSkeleton';
import Button from '../UI/Button/Button';
import { useAuth } from '../../hooks/useAuth.js';
import { usePosts, usePostActions } from '../../hooks/usePosts.js';

export default function LatestPosts() {
  const { user } = useAuth();
  const { posts, isLoading, isError, message } = usePosts();
  const { getPosts } = usePostActions();

  useEffect(() => {
    getPosts({ limit: 3 });
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
            <Button variant="soft" size="tall">
              Tümünü Gör
            </Button>
          </Link>
        </div>

        {isError && (
          <div className="mb-6 rounded-xl border border-rose-200 bg-rose-50 p-4 text-rose-700">
            {message}
          </div>
        )}

        {isLoading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <PostSkeleton key={i} />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-2xl p-10 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Henüz yazı yok
            </h3>
            <p className="text-gray-600 mb-5">
              İlk yazıyı sen yayınla ve topluluğa katıl.
            </p>
            {user ? (
              <Link to="/new-post">
                <Button variant="primary" size="tall">
                  Yazı Oluştur
                </Button>
              </Link>
            ) : (
              <Link to="/register">
                <Button variant="primary" size="tall">
                  Ücretsiz Kaydol
                </Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.slice(0, 3).map((p) => (
              <PostCard key={p._id} post={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
