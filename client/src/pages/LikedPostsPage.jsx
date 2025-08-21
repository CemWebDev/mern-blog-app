import { useEffect } from 'react';
import { usePosts, usePostActions } from '../hooks/usePosts';
import { Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PostCard from '../components/Posts/PostCard';
import PostSkeleton from '../components/Posts/PostSkeleton';

const LikedPostsPage = () => {
  const { likedPosts, isLoading } = usePosts();
  const { getLikedPosts } = usePostActions();

  useEffect(() => {
    getLikedPosts();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-6 shadow-lg">
            <Heart className="w-8 h-8 text-white fill-current" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Beğenilen Gönderiler
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Beğendiğiniz tüm gönderiler burada. Favori içeriklerinize kolayca
            ulaşın.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <PostSkeleton key={i} />
            ))}
          </div>
        ) : likedPosts && likedPosts.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-b from-emerald-500 to-teal-600 rounded-full"></div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  {likedPosts.length} Beğenilen Gönderi
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {likedPosts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
              <Heart className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Henüz beğenilen gönderi yok
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Beğendiğiniz gönderiler burada görünecek. Hemen keşfetmeye
              başlayın!
            </p>
            <Link
              to="/posts"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Gönderileri Keşfet
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default LikedPostsPage;
