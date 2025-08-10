import { Link } from 'react-router-dom';
import { CalendarDays, User as UserIcon } from 'lucide-react';
import { truncate } from '../../utils/truncate';
import CoverPlaceholder from './CoverPlaceholder';

export default function PostCard({ post }) {
  const date = post?.createdAt ? new Date(post.createdAt) : null;
  const coverUrl = post?.cover?.url;

  return (
    <article className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <Link to={`/posts/${post._id}`} className="block">
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={post.title}
            className="w-full aspect-[16/9] object-cover"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <CoverPlaceholder title={post.title} />
        )}
      </Link>

      <div className="p-5">
        <Link to={`/posts/${post._id}`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {post.title}
          </h3>
        </Link>

        <p className="text-gray-600 mb-4">{truncate(post.content)}</p>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center">
              <CalendarDays className="w-4 h-4 mr-1.5" />
              {date ? date.toLocaleDateString('tr-TR') : '-'}
            </span>
            {post.author?.username && (
              <span className="inline-flex items-center">
                <UserIcon className="w-4 h-4 mr-1.5" />
                {post.author.username}
              </span>
            )}
          </div>
          <Link
            to={`/posts/${post._id}`}
            className="text-emerald-600 hover:text-emerald-700 font-medium"
          >
            Read →
          </Link>
        </div>
      </div>
    </article>
  );
}
