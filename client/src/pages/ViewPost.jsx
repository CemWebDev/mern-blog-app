import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  fetchPost,
  deletePost,
  resetPostsState,
} from '../features/posts/postSlice';
import Button from '../components/UI/Button/Button';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { usePosts } from '../hooks/usePosts';

export default function ViewPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { post, isLoading, isError, message } = usePosts();
  const authUser = useSelector((s) => s.auth.user);

  useEffect(() => {
    if (id) dispatch(fetchPost(id));
    return () => dispatch(resetPostsState());
  }, [dispatch, id]);

  const canEdit = useMemo(() => {
    if (!authUser || !post) return false;
    const authorId =
      typeof post.author === 'string'
        ? post.author
        : post.author?._id || post.author?.id;
    return authorId && authorId === authUser.id;
  }, [authUser, post]);

  const authorName = useMemo(() => {
    if (!post) return '';
    if (typeof post.author === 'string') return 'Yazar';
    return post.author?.username || post.author?.email || 'Yazar';
  }, [post]);

  const createdAt = post?.createdAt
    ? new Date(post.createdAt).toLocaleString()
    : '';

  const handleDelete = async () => {
    if (!post?._id) return;
    if (!window.confirm('Bu yazıyı silmek istediğine emin misin?')) return;
    try {
      await dispatch(deletePost(post._id)).unwrap();
      navigate('/posts');
    } catch (e) {
      console.error(e);
    }
  };

  if (isLoading || (!post && !isError)) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="h-52 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="mb-4">
          <Button
            className="bg-gray-500 hover:bg-gray-600"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Geri
          </Button>
        </div>
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-rose-700">
          {message || 'Yazı bulunamadı.'}
        </div>
      </div>
    );
  }

  if (!post) return null;

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <Button size="tall" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Geri
        </Button>

        {canEdit && (
          <div className="flex gap-2">
            <Button
              size="tall"
              onClick={() => navigate(`/posts/${post._id}/edit`)}
            >
              <Edit className="w-4 h-4 mr-2" /> Düzenle
            </Button>
            <Button variant="warning" size="tall" onClick={handleDelete}>
              <Trash2 className="w-4 h-4 mr-2" /> Sil
            </Button>
          </div>
        )}
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{post.title}</h1>
      <div className="text-sm text-gray-500 mb-6">
        <span className="mr-2">
          Yazar: <b className="text-gray-700">{authorName}</b>
        </span>
        {createdAt && <span>• {createdAt}</span>}
      </div>
      <article className="prose max-w-none">
        <p className="whitespace-pre-line leading-7 text-gray-800">
          {post.content}
        </p>
      </article>
    </>
  );
}
