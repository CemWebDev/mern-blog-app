import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import Button from '../components/UI/Button/Button';
import ConfirmModal from '../components/UI/Modal/Modal';
import {
  ArrowLeft,
  Edit,
  Trash2,
  User,
  Calendar,
  AlertCircle,
} from 'lucide-react';

import { usePosts, usePostActions } from '../hooks/usePosts';
import { relative } from '../utils/time';
import LikeButton from '../components/Posts/LikeButton';

export default function ViewPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { post, isLoading, isError, message } = usePosts();
  const { loadPostWithMeta, deleteExistingPost } = usePostActions();

  const authUser = useSelector((s) => s.auth.user);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (id) loadPostWithMeta(id);
  }, [id]);

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

  const createdAt = relative(post?.createdAt);

  const handleDeleteClick = () => setShowDeleteModal(true);

  const handleDeleteConfirm = async () => {
    if (!post?._id) return;
    try {
      await deleteExistingPost(post._id).unwrap();
      navigate('/posts');
    } catch (e) {
      console.error(e);
    } finally {
      setShowDeleteModal(false);
    }
  };

  if (isLoading || (!post && !isError)) {
    return (
      <div className="animate-pulse space-y-8">
        <div className="flex items-center justify-between">
          <div className="h-10 bg-gray-200 rounded-lg w-20" />
          <div className="flex gap-3">
            <div className="h-10 bg-gray-200 rounded-lg w-24" />
            <div className="h-10 bg-gray-200 rounded-lg w-16" />
          </div>
        </div>

        <div className="h-80 bg-gray-200 rounded-xl" />

        <div className="space-y-4">
          <div className="h-12 bg-gray-200 rounded-lg w-3/4" />
          <div className="flex gap-4">
            <div className="h-8 bg-gray-200 rounded-full w-32" />
            <div className="h-8 bg-gray-200 rounded-full w-40" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-8 space-y-3">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
          <div className="h-4 bg-gray-200 rounded w-4/6" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-3/4" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <>
        <div className="mb-6">
          <Button
            size="tall"
            variant="soft"
            onClick={() => navigate(-1)}
            leftIcon={<ArrowLeft className="w-4 h-4 shrink-0" />}
          >
            Geri
          </Button>
        </div>

        <div className="bg-white rounded-xl border border-red-200 p-8 text-center shadow-sm">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Yazı Bulunamadı
          </h3>
          <p className="text-gray-600 mb-6">
            {message ||
              'Aradığınız yazı bulunamadı veya erişim izniniz bulunmuyor.'}
          </p>
          <Button variant="primary" onClick={() => navigate('/posts')}>
            Yazılara Geri Dön
          </Button>
        </div>
      </>
    );
  }

  if (!post) return null;

  return (
    <>
      <div className="mb-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Button
            size="tall"
            variant="soft"
            onClick={() => navigate(-1)}
            leftIcon={<ArrowLeft className="w-4 h-4 shrink-0" />}
            className="w-full sm:w-auto"
          >
            Geri
          </Button>
          <div className="flex items-center justify-center sm:justify-end gap-2">
            <LikeButton
              postId={post._id}
              liked={!!post.liked}
              likeCount={post.likeCount ?? 0}
              size="md"
            />

            {canEdit && (
              <>
                <Button
                  size="md"
                  variant="primary"
                  onClick={() => navigate(`/posts/${post._id}/edit`)}
                  leftIcon={<Edit className="w-4 h-4 shrink-0" />}
                  className="min-w-0"
                >
                  <span className="hidden sm:inline">Düzenle</span>
                  <span className="sm:hidden">Düzenle</span>
                </Button>
                <Button
                  size="md"
                  variant="danger"
                  onClick={handleDeleteClick}
                  leftIcon={<Trash2 className="w-4 h-4 shrink-0" />}
                  className="min-w-0"
                >
                  <span className="hidden sm:inline">Sil</span>
                  <span className="sm:hidden">Sil</span>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {post.cover?.url && (
        <div className="mb-10">
          <div className="relative rounded-lg overflow-hidden shadow-xl">
            <img
              src={post.cover.url || '/placeholder.svg'}
              alt="Kapak Görseli"
              className="w-full h-72 sm:h-96 lg:h-[28rem] object-cover"
            />
          </div>
        </div>
      )}

      <header className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
              <User className="w-4 h-4 text-emerald-600" />
            </div>
            <span className="text-gray-600">
              <span className="font-medium text-gray-900">{authorName}</span>
            </span>
          </div>

          {createdAt && (
            <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
              <Calendar className="w-4 h-4 text-gray-400 mr-2" />
              <span className="text-gray-600">{createdAt}</span>
            </div>
          )}
        </div>
      </header>

      <article className="prose prose-lg max-w-none">
        <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
          <div className="whitespace-pre-line leading-8 text-gray-800 text-lg">
            {post.content}
          </div>
        </div>
      </article>

      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        title="Yazıyı Sil"
        message="Bu yazıyı silmek istediğinize emin misiniz? Bu işlem geri alınamaz ve tüm veriler kaybolacaktır."
        confirmText="Sil"
        cancelText="İptal"
        variant="danger"
      />
    </>
  );
}
