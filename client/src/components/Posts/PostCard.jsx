import { Link } from 'react-router-dom';
import { CalendarDays, UserIcon } from 'lucide-react';
import { truncate } from '../../utils/truncate';
import CoverPlaceholder from './CoverPlaceholder';
import LikeButton from './LikeButton';
import { usePostActions } from '../../hooks/usePosts';
import { useEffect } from 'react';

export default function PostCard({ post }) {
  const date = post?.createdAt ? new Date(post.createdAt) : null;
  const coverUrl = post?.cover?.url;
  const { getPostLikeMeta } = usePostActions();

  useEffect(() => {
    if (!post?._id) return;
    const missingCount = typeof post.likeCount !== 'number';
    const missingLiked = typeof post.liked !== 'boolean';
    if (missingCount || missingLiked) getPostLikeMeta(post._id);
  }, [post?._id, getPostLikeMeta]);

  return (
    <article className="bg-white border border-gray-100/50 rounded-3xl overflow-hidden shadow-sm backdrop-blur-sm">
      <Link
        to={`/posts/${post._id}`}
        className="block relative overflow-hidden"
      >
        {coverUrl ? (
          <div className="relative overflow-hidden">
            <img
              src={coverUrl || '/placeholder.svg'}
              alt={post.title}
              className="w-full aspect-[16/9] object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        ) : (
          <div className="relative">
            <CoverPlaceholder title={post.title} />
          </div>
        )}
      </Link>

      <div className="p-6 space-y-4">
        <Link to={`/posts/${post._id}`} className="block">
          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">
            {post.title}
          </h3>
        </Link>

        <p className="text-gray-600 leading-relaxed text-sm">
          {truncate(post.content)}
        </p>

        <div className="pt-5 border-t border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
              <div className="flex items-center text-xs bg-gray-50 px-3 py-2 rounded-full">
                <CalendarDays className="w-4 h-4 mr-2 text-blue-500" />
                <span className="font-semibold text-gray-700">
                  {date ? date.toLocaleDateString('tr-TR') : '-'}
                </span>
              </div>

              {post.author?.username && (
                <div className="flex items-center text-xs bg-gray-50 px-3 py-2 rounded-full">
                  <UserIcon className="w-4 h-4 mr-2 text-emerald-500" />
                  <span className="font-semibold text-gray-700">
                    {post.author.username}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4">
              <LikeButton
                postId={post._id}
                liked={!!post.liked}
                likeCount={
                  typeof post.likeCount === 'number' ? post.likeCount : 0
                }
                size="sm"
              />
              <Link
                to={`/posts/${post._id}`}
                className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 rounded-full whitespace-nowrap shadow-md"
              >
                Şimdi Oku →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
