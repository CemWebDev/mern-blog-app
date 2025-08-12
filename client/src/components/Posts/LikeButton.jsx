
import { Heart } from 'lucide-react';
import { usePosts, usePostActions } from '../../hooks/usePosts';

export default function LikeButton({
  postId,
  liked = false,
  likeCount = 0,
  size = 'sm', 
  className = '',
}) {
  const { isToggling } = usePosts();
  const { toggleLike } = usePostActions();
  const busy = isToggling(postId);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!postId || busy) return;
    toggleLike(postId, !!liked); 
  };

  const pad  = size === 'sm' ? 'px-2 py-1'   : 'px-3 py-1.5';
  const gap  = size === 'sm' ? 'gap-1.5'     : 'gap-2';
  const icon = size === 'sm' ? 'w-4 h-4'     : 'w-5 h-5';
  const text = size === 'sm' ? 'text-xs'     : 'text-sm';

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={busy}
      aria-pressed={liked}
      title={liked ? 'Beğeniyi kaldır' : 'Beğen'}
      className={`inline-flex items-center ${gap} rounded-full ${pad}
        transition-all hover:bg-rose-100 cursor-pointer active:scale-[0.98]
        disabled:opacity-50 ${className}`}
    >
      <Heart
        className={`${icon} transition-colors
          ${liked ? 'text-rose-600 fill-current' : 'text-gray-500 hover:text-gray-700'}`}
      />
      <span className={`${text} ${liked ? 'text-rose-700' : 'text-gray-700'}`}>
        {Number.isFinite(likeCount) ? likeCount : 0}
      </span>
    </button>
  );
}
