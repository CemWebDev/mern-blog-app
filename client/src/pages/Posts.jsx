import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePostActions, usePosts } from '../hooks/usePosts';
import { useAuth } from '../hooks/useAuth';
import { toastError } from '../utils/toast';
import PostCard from '../components/Posts/PostCard';
import PostSkeleton from '../components/Posts/PostSkeleton';
import CreatePostCard from '../components/Posts/CreatePostCard';
import { useInfinity } from '../hooks/useInfinity';

const PAGE_SIZE = 12;

const Posts = () => {
  const {
    posts,
    isLoading,
    isLoadingMore,
    isError,
    message,
    hasMore,
    nextCursor,
  } = usePosts();

  const { getPosts } = usePostActions();
  const { user } = useAuth();
  useEffect(() => {
    getPosts({ scope: 'mine', limit: PAGE_SIZE });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isError && message) toastError(message);
  }, [isError, message]);

  const sentinelRef = useInfinity(
    () => {
      if (hasMore && !isLoading && !isLoadingMore) {
        getPosts({ scope: 'mine', limit: PAGE_SIZE, cursor: nextCursor });
      }
    },
    {
      enabled: hasMore,
      isFetching: isLoading || isLoadingMore,
      rootMargin: '200px 0px',
      threshold: 0,
    }
  );

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gönderileriniz</h1>
          <p className="text-gray-600">
            {isLoading ? 'Yükleniyor…' : `${posts?.length ?? 0} post`}
          </p>
        </div>
      </div>
      {isLoading ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <PostSkeleton key={i} />
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-2xl p-10 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Hiç yazınız yok
          </h3>
          <p className="text-gray-600 mb-5">
            Yazılarınızı yayınladığınızda, burada görünecekler.
          </p>
          {user && (
            <Link to="/new-post" className="inline-block">
              <span className="inline-flex items-center px-5 py-3 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition">
                İlk yazınızı oluşturun
              </span>
            </Link>
          )}
        </div>
      ) : (
        <>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {user && <CreatePostCard />}
            {posts.map((p) => (
              <PostCard key={p._id} post={p} />
            ))}
            {isLoadingMore &&
              Array.from({ length: 3 }).map((_, i) => (
                <PostSkeleton key={`more-${i}`} />
              ))}
          </div>
          {isLoadingMore && (
            <div className="flex items-center justify-center mt-6 text-gray-500 text-sm">
              <div className="w-4 h-4 mr-2 border-2 border-gray-300 border-t-emerald-500 rounded-full animate-spin" />
              Daha fazlası yükleniyor…
            </div>
          )}
          {!hasMore && !isLoadingMore && posts.length > PAGE_SIZE && (
            <div className="mt-8 text-center">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-gray-50 border border-gray-200 text-gray-600 text-sm">
                Hepsi bu kadar 👋
              </span>
            </div>
          )}
          {hasMore && !isLoadingMore && (
            <div ref={sentinelRef} className="h-10" />
          )}
        </>
      )}
    </>
  );
};

export default Posts;
