import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usePosts, usePostActions } from '../hooks/usePosts';
import { useSelector } from 'react-redux';
import WelcomeCard from '../components/Dashboard/WelcomeCard';
import Button from '../components/UI/Button/Button';
import PostCard from '../components/Posts/PostCard';
import PostSkeleton from '../components/Posts/PostSkeleton';
import StatCard from '../components/Dashboard/StatCard';

import {
  PlusCircle,
  FileText,
  Settings,
  BarChart3,
  ArrowRight,
  Edit3,
  ChevronRight,
} from 'lucide-react';
import EmptyState from '../components/Dashboard/EmptyState';
import QuickAction from '../components/Dashboard/QuickAction';

export default function Dashboard() {
  const navigate = useNavigate();

  const { posts, isLoading } = usePosts();
  const { getPosts } = usePostActions();

  useEffect(() => {
    getPosts({ scope: 'mine', limit: 6 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {profile } = useSelector((state) => state.users)
  const totalPosts = profile?.postCount ?? 0;


  return (
    <div className="space-y-12">
      <WelcomeCard />
      <div className="grid gap-4 md:grid-cols-3">
        <QuickAction
          title="Yeni Yazı"
          desc="Fikrini şimdi paylaş."
          icon={<PlusCircle className="w-5 h-5" />}
          onClick={() => navigate('/new-post')}
        />
        <QuickAction
          title="Yazılarım"
          desc="Tüm yazılarını gör."
          icon={<FileText className="w-5 h-5" />}
          onClick={() => navigate('/posts')}
        />
        <QuickAction
          title="Profil"
          desc="Hesap ayarların."
          icon={<Settings className="w-5 h-5" />}
          onClick={() => navigate('/profile')}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          icon={<BarChart3 className="w-5 h-5" />}
          label="Toplam Yazın"
          value={totalPosts}
        />
        <StatCard
          icon={<Edit3 className="w-5 h-5" />}
          label="Son İşlemler"
          value={totalPosts > 0 ? 'Yayın / Düzenleme' : 'Henüz yok'}
          muted
        />
        <StatCard
          icon={<ArrowRight className="w-5 h-5" />}
          label="Hızlı Başla"
          value="Yeni yazı oluştur"
          cta={() => (
            <Link to="/new-post">
              <Button size="md" className="mt-3">
                Başla
              </Button>
            </Link>
          )}
        />
      </div>
      <section>
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Son Yazıların</h2>
            <p className="text-gray-600">
              En son yayınladığın yazılardan birkaçı.
            </p>
          </div>

          <Link to="/posts" className="shrink-0">
            <Button
              variant="ghost"
              size="sm"
              rightIcon={<ChevronRight className="w-4 h-4" />}
              className="text-emerald-700 hover:text-emerald-800"
              aria-label="Tüm yazıları gör"
            >
              Tümünü gör
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <PostSkeleton key={i} />
            ))}
          </div>
        ) : totalPosts === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.slice(0, 3).map((p) => (
              <PostCard key={p._id} post={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
