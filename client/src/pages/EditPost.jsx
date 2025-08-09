import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { usePostActions, usePosts } from '../hooks/usePosts';
import { useAuth } from '../hooks/useAuth';
import { resetPostsState } from '../features/posts/postSlice';
import Button from '../components/UI/Button/Button';
import Input from '../components/UI/Input/Input';
import Textarea from '../components/UI/Input/TextArea';
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

  useEffect(() => {
    if (id) getPost(id);
    return () => dispatch(resetPostsState());
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
      await postSchema.validate(form, { abortEarly: false });
      setErrors({});

      const promise = updateExistingPost(id, form);

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

  const isDisabled =
    isLoading ||
    !form.title.trim() ||
    !form.content.trim() ||
    (form.title === post.title && form.content === post.content);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <Button size="tall" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Geri
        </Button>
        <Button size="tall" onClick={onSubmit} disabled={isDisabled}>
          <Save className="w-4 h-4 mr-2" />
          Kaydet
        </Button>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-6">Yazıyı Düzenle</h1>

      <form onSubmit={onSubmit} className="space-y-6">
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
          <Button type="submit" size="tall" disabled={isDisabled}>
            Kaydet
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
