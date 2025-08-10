import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { usePostActions, usePosts } from '../hooks/usePosts';
import { useAuth } from '../hooks/useAuth';
import { resetPostsState } from '../features/posts/postSlice';
import Button from '../components/UI/Button/Button';
import Input from '../components/UI/Input/Input';
import Textarea from '../components/UI/Input/TextArea';
import CoverPicker from '../components/Posts/CoverPicker';
import CoverPlaceholder from '../components/Posts/CoverPlaceholder';
import { postSchema } from '../schemas/postSchema';
import { toastError, toastSuccess, toastPromise } from '../utils/toast';
import { ArrowLeft, Save } from 'lucide-react';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { getPost, updateExistingPost } = usePostActions();
  const { post, isLoading, isError, message } = usePosts();
  const { user } = useAuth();

  const [form, setForm] = useState({ title: '', content: '' });
  const [errors, setErrors] = useState({});

  const [coverFile, setCoverFile] = useState(null);
  const [removeCover, setRemoveCover] = useState(false);

  useEffect(() => {
    if (id) getPost(id);
    return () => dispatch(resetPostsState());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, id]);

  const canEdit = useMemo(() => {
    if (!user || !post) return false;
    const authorId =
      typeof post.author === 'string'
        ? post.author
        : post.author?._id || post.author?.id;
    return authorId && authorId === user.id;
  }, [user, post]);

  useEffect(() => {
    if (post) {
      setForm({
        title: post.title || '',
        content: post.content || '',
      });
      setCoverFile(null);
      setRemoveCover(false);
    }
  }, [post]);

  useEffect(() => {
    if (isError && message) toastError(message);
  }, [isError, message]);

  useEffect(() => {
    if (post && !canEdit) {
      toastError('Bu yazıyı düzenleme yetkin yok.');
      navigate(`/posts/${id}`);
    }
  }, [post, canEdit, navigate, id]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (coverFile && coverFile.size > 5 * 1024 * 1024) {
        toastError('Kapak görseli en fazla 5MB olmalı.');
        return;
      }

      await postSchema.validate(form, { abortEarly: false });
      setErrors({});

      const fd = new FormData();
      fd.append('title', form.title.trim());
      fd.append('content', form.content.trim());
      if (coverFile) fd.append('cover', coverFile);
      if (removeCover) fd.append('removeCover', '1');

      const promise = updateExistingPost(id, fd);

      await toastPromise(promise, {
        loading: 'Güncelleniyor…',
        success: 'Yazı güncellendi!',
        error: 'Güncelleme başarısız.',
      });

      toastSuccess('Yönlendiriliyorsun…');
      navigate(`/posts/${id}`);
    } catch (error) {
      if (error?.name === 'ValidationError') {
        const out = {};
        for (const v of error.inner) if (!out[v.path]) out[v.path] = v.message;
        setErrors(out);
        toastError('Formu kontrol et: eksik/hatalı alanlar var.');
        return;
      }
      toastError(error?.message || 'Bir şeyler ters gitti.');
    }
  };

  if (isLoading && !post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="h-52 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  if (!post) return null;

  const changedText =
    form.title !== (post.title || '') || form.content !== (post.content || '');
  const changedCover = !!coverFile || removeCover;

  const isDisabled =
    isLoading ||
    !form.title.trim() ||
    !form.content.trim() ||
    (!changedText && !changedCover);
  const showPlaceholder =
    !coverFile && (removeCover || !post.cover?.url);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <Button
          size="tall"
          variant="soft"
          onClick={() => navigate(-1)}
          leftIcon={<ArrowLeft className="w-4 h-4" />}
        >
          Geri
        </Button>
        <Button
          size="tall"
          variant="primary"
          type="submit"
          form="editForm"
          isLoading={isLoading}
          disabled={isDisabled}
          leftIcon={!isLoading && <Save className="w-4 h-4" />}
        >
          Kaydet
        </Button>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-6">Yazıyı Düzenle</h1>
      <div className="mb-4">
        {showPlaceholder ? (
          <CoverPlaceholder
            title={form.title || post.title || 'Post'}
            className="h-48 rounded-xl"
          />
        ) : null}
      </div>

      <form id="editForm" onSubmit={onSubmit} className="space-y-6">
        <Input
          label="Başlık"
          name="title"
          type="text"
          value={form.title}
          onChange={onChange}
          placeholder="Başlığı güncelle…"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-rose-600">{errors.title}</p>
        )}

        <CoverPicker
          value={coverFile}
          onChange={(file) => {
            setCoverFile(file);
            setRemoveCover(false);
          }}
          initialUrl={post.cover?.url || null}
          onClear={() => {
            setCoverFile(null);
            if (post.cover?.url) setRemoveCover(true);
          }}
        />

        <Textarea
          label="İçerik"
          name="content"
          value={form.content}
          onChange={onChange}
          rows={12}
          placeholder="İçeriği güncelle…"
        />
        {errors.content && (
          <p className="mt-1 text-sm text-rose-600">{errors.content}</p>
        )}

        <div className="text-sm text-gray-500">
          Başlık: {form.title.length} • İçerik: {form.content.length}
        </div>

        <div className="pt-6 border-t border-gray-100">
          <Button
            type="submit"
            size="tall"
            variant="primary"
            isLoading={isLoading}
            disabled={isDisabled}
            leftIcon={!isLoading && <Save className="w-4 h-4" />}
          >
            Kaydet
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
