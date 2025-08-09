import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePostActions, usePosts } from '../hooks/usePosts';
import { useAuth } from '../hooks/useAuth';
import { toastError } from '../utils/toast';
import PostCard from '../components/Posts/PostCard';
import PostSkeleton from '../components/Posts/PostSkeleton';
import Button from '../components/UI/Button/Button';
import { PlusCircle } from 'lucide-react';

const Posts = () => {
  const { posts, isLoading, isError, message } = usePosts();
  const { getPosts } = usePostActions();
  const { user } = useAuth();

  useEffect(() => {
    getPosts({ scope: 'mine' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isError && message) toastError(message);
  }, [isError, message]);

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Posts</h1>
          <p className="text-gray-600">
            {isLoading ? 'Yükleniyor…' : `${posts.length} post`}
          </p>
        </div>

        {user && (
          <Link to="/new-post">
            <Button variant="default" size="tall">
              <PlusCircle className="w-4 h-4 mr-2" />
              Yayınla
            </Button>
          </Link>
        )}
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
            No posts yet
          </h3>
          <p className="text-gray-600 mb-5">
            When you publish posts, they’ll appear here.
          </p>
          {user && (
            <Link to="/posts/new">
              <Button>Write your first post</Button>
            </Link>
          )}
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <PostCard key={p._id} post={p} />
          ))}
        </div>
      )}
    </>
  );
};

export default Posts;
